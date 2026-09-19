-- P2 -- vocab_tokens (Wortebene des Bestands)
-- Projekt: lzecflvfalxkodytnwzf (tunsi-trainer / Supabase), angewandt am 2026-09-16
-- via mcp__Supabase__apply_migration, Migrationsname:
--   p2_translit_tokens_function_and_vocab_tokens_view
--
-- Ziel (siehe exports/plan_quellenabgleich_2026-09-16.md, Abschnitt P2 und "Die vier
-- Zustaende statt fehlt/vorhanden/unsicher"): der `baustein`-Bucket des kuenftigen
-- Quellenabgleichs braucht die Wortebene des Bestands. Ein Skelett-Vergleich auf ganzen
-- `vocabulary`-Zeilen zieht mehrwortige Phrasen zusammen (`kol youm` -> `klm`, nicht
-- `kl`+`m`) und macht dadurch Woerter wie `kull`/`kif` unsichtbar, obwohl sie in mehreren
-- Phrasen im Bestand stecken (`kull`: 656x haeufigstes fehlendes Wort im TUNICO-Korpus).
--
-- Dies ist die tatsaechlich gelaufene Migration -- lief beim ersten Versuch durch, kein
-- Fehlversuch wie bei P1.
--
-- MESSUNG (Plan-Vorgabe: "erst einfachen View bauen und die Laufzeit des Bucket-Joins
-- messen; ueber ~300ms auf generierte Spalte vocabulary.darija_tokens + GIN-Index
-- ausweichen"). Nach Anlage von Funktion+View unten wurde per EXPLAIN (ANALYZE) genau die
-- im Auftrag beschriebene Abfrage gemessen: alle Korpus-Lemmata aus
-- tunico_corpus_wordforms (Pipe-Buendel an "|" aufgetrennt), die KEINEN Skelett-Treffer auf
-- einer einwortigen vocabulary-Zeile haben, aber EINEN Treffer in vocab_tokens haben
-- (Wortlaut der Messabfrage am Dateiende). Drei Wiederholungen:
--   123.5 ms / 116.5 ms / 112.9 ms Execution Time
--   (Referenzwert aus dem Plan fuer den vergleichbaren Anti-Join allein gegen
--   vocabulary.translit_skeleton, ohne vocab_tokens: 95 ms)
-- Alle drei Laeufe klar unter der 300-ms-Schwelle -> der einfache View genuegt. Schritt 3
-- des Plans (generierte Spalte + GIN-Index, inkl. des P1-Sicherheitsverfahrens fuer
-- Abhaengigkeiten/View-Sicherung) entfaellt ersatzlos und wurde nicht gebaut.
--
-- Rechte (Schritt 3 unten): vor der Migration geprueft, wie `vocab_lookup` berechtigt ist
-- (information_schema.role_table_grants / pg_class.relacl) -- postgres+anon+authenticated+
-- service_role haben dort je ALLE sieben Relationsprivilegien, Owner postgres. Identisches
-- Muster wie `qualitaets_checks`/`vocabulary` aus P1. `vocab_tokens` erhaelt exakt dasselbe
-- Muster.

CREATE OR REPLACE FUNCTION public._translit_tokens(p_darija text)
RETURNS text[]
LANGUAGE sql
IMMUTABLE
AS $function$
  SELECT COALESCE(
    array_agg(public._translit_skeleton(u.tok) ORDER BY u.ord)
      FILTER (WHERE public._translit_skeleton(u.tok) <> ''),
    ARRAY[]::text[]
  )
  FROM unnest(regexp_split_to_array(p_darija, '[\s/]+')) WITH ORDINALITY AS u(tok, ord);
$function$;

-- Schritt 2: View auf Wortebene. Eigene Aufsplittung (nicht ueber _translit_tokens），
-- weil hier zusaetzlich das Rohwort (token) und die 1-basierte Position gebraucht werden,
-- die die Funktion (nur Skelett-Array) nicht liefert. Position und ist_einwortig zaehlen
-- nur die Tokens, deren Skelett nicht leer ist (gleiche Verwerfungsregel wie in der Funktion).
CREATE VIEW public.vocab_tokens AS
WITH t AS (
  SELECT
    v.id AS vocabulary_id,
    u.ord AS raw_position,
    u.tok AS token,
    public._translit_skeleton(u.tok) AS token_skeleton
  FROM public.vocabulary v,
       LATERAL unnest(regexp_split_to_array(v.darija, '[\s/]+')) WITH ORDINALITY AS u(tok, ord)
  WHERE v.darija IS NOT NULL
)
SELECT
  vocabulary_id,
  (row_number() OVER (PARTITION BY vocabulary_id ORDER BY raw_position))::int AS position,
  token,
  token_skeleton,
  length(token_skeleton) AS skelett_laenge,
  (count(*) OVER (PARTITION BY vocabulary_id)) = 1 AS ist_einwortig
FROM t
WHERE token_skeleton <> '';

-- Schritt 3: Rechte gleichziehen mit vocab_lookup (siehe information_schema.role_table_grants /
-- pg_class.relacl vor dieser Migration: postgres+anon+authenticated+service_role je ALLE
-- sieben Relationsprivilegien, Owner postgres -- identisches Muster wie qualitaets_checks
-- und vocabulary aus P1).
ALTER VIEW public.vocab_tokens OWNER TO postgres;
GRANT ALL ON TABLE public.vocab_tokens TO postgres, anon, authenticated, service_role;

-- =============================================================================
-- Messabfrage (NICHT Teil der Migration, nur zur Dokumentation/Reproduktion -- siehe
-- Messwerte oben). Direkt im Anschluss an obige Migration per execute_sql gelaufen,
-- dreimal wiederholt, Ergebnis stabil (112-123 ms), 99 Treffer (Korpus-Lemmata im
-- baustein-Bucket):
--
-- explain (analyze, buffers)
-- with corpus as (
--   select distinct trim(lemma_part) as lemma, public._translit_skeleton(trim(lemma_part)) as skel
--   from tunico_corpus_wordforms,
--        lateral unnest(string_to_array(lemma_chatalpha, '|')) as lemma_part
--   where lemma_chatalpha is not null and trim(lemma_part) <> ''
-- )
-- select c.lemma, c.skel
-- from corpus c
-- where c.skel <> ''
--   and not exists (
--     select 1 from vocabulary v
--     where v.translit_skeleton = c.skel
--       and array_length(public._translit_tokens(v.darija), 1) = 1
--   )
--   and exists (
--     select 1 from vocab_tokens vt where vt.token_skeleton = c.skel
--   );
--
-- Anti-Join-Haelfte ("keinen Treffer auf einwortiger vocabulary-Zeile") nutzt weiterhin den
-- Index idx_vocab_translit_skeleton ueber die gespeicherte Spalte vocabulary.translit_skeleton
-- (Index Scan im Plan) -- die P1-Falle "_translit_skeleton(v.darija) statt v.translit_skeleton
-- schreiben" wurde hier bewusst vermieden, array_length(_translit_tokens(darija),1)=1 ist nur
-- ein zusaetzlicher Filter NACH dem Index-Treffer, auf den wenigen Kandidatenzeilen.
