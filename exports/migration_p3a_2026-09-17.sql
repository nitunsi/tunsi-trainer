-- P3a -- quellen_lemmata (Materialized View), TUNICO-Seite
-- Projekt: lzecflvfalxkodytnwzf (tunsi-trainer / Supabase), angewandt am 2026-09-17
-- via mcp__Supabase__apply_migration, Migrationsname: p3a_quellen_lemmata_tunico
--
-- Plan: exports/plan_quellenabgleich_2026-09-16.md, Abschnitt "P3a -- TUNICO-Seite".
-- Ziel: eine Zeile je (Quelle, Lemma), zunaechst nur quelle = 'tunico'. rang_pc und
-- audio_url bleiben leer (kommen aus P3b, Peace Corps + Ninja, per weiterem
-- UNION-ALL-Zweig auf tunico_quellen_lemmata analoger CTEs). arabisch bleibt fuer
-- TUNICO grundsaetzlich leer: weder tunico_corpus_wordforms noch tunico_import haben
-- eine Arabisch-Spalte (siehe skills/tunsi/IMPORTS.md -> TUNICO: "Kein arabisches
-- Original") -- das weicht von der Uebersichtstabelle im Plan ab, die tunico_import
-- faelschlich mit einem Arabisch-Haekchen fuehrt; siehe Bericht.
--
-- Dies ist die tatsaechlich gelaufene, erfolgreiche Fassung. Auf dem Weg dorthin
-- wurden per execute_sql (read-only) zwei Fehler in Zwischenfassungen gefunden und
-- VOR dieser Migration korrigiert, nicht erst danach:
--
-- 1. Frequenz-Verdopplung ueber den Wortart-Unnest. Eine Zwischenfassung berechnete
--    freq_korpus und die Wortart-Mehrheitsentscheidung in derselben Aggregation, mit
--    `sum(frequency)` ueber einen `LATERAL unnest(wortarten)`-Join. Sobald eine
--    Quellzeile mehr als einen distinkten Wortart-Kandidaten hatte (z.B. Zeile 103,
--    "kif|kif|kif|kif" mit pos "interrogative noun preposition conjunction" -> 2
--    distinkte Klassen), vervielfachte der Unnest die zugehoerige frequency: 'kif'
--    kam so auf 630 statt korrekt 480 (Zeilen 73/221 + 103/150 + 138/109). Fix: die
--    Frequenz-/Obergrenzen-/Toponym-Aggregation (tunico_final) und die Wortart-
--    Mehrheitsentscheidung (tunico_wortart) sind jetzt getrennte CTEs, erst am Ende
--    zusammengefuehrt.
-- 2. Unaufgeloester Mehrwort-pos-Wert bei EINEM einzelnen (nicht gebuendelten) Lemma.
--    id 1528, lemma_chatalpha "qrib" (kein Pipe, n_lemma=1), pos "adverb adjective"
--    (2 Woerter). Die erste Fassung nahm bei n_lemma=1 den ganzen pos-String
--    ungeteilt als einen Kandidaten -- "adverb adjective" traf keine der 30 bekannten
--    Einzelwerte und fiel unklassifiziert durch. Fix: Fall 2 unten behandelt auch
--    einzelne Lemmata mit mehrteiligem (oder fehlendem) pos-Wert, indem es JEDEN
--    pos-Token als eigenen Kandidaten fuer dieses eine Lemma zulaesst -- fuer "qrib"
--    fuehrt das zu einem echten Widerspruch (Adverb vs. Adjektiv) und damit
--    korrekterweise zu wortart='unklar', statt den Widerspruch stillschweigend zu
--    verschlucken.
--
-- MESSUNG, die den Bau bestimmt hat (vor dieser Migration per execute_sql geprueft):
-- * lemma_chatalpha ist bei 5.390 von 9.874 Zeilen NULL; 2.102 Zeilen sind untereinander
--   NICHT-NULL-distinkt (deckungsgleich mit dem Plan). Nach Aufsplitten aller
--   Pipe-Buendel (Schritt 1) und Verwerfen leerer Segmente: 2.023 distinkte
--   Roh-Lemmata -- exakt der im Plan genannte Wert.
-- * pos <-> lemma_chatalpha Positionsausrichtung: von 283 echten Buendeln (lemma_chatalpha
--   enthaelt "|") stimmt bei 282 die Anzahl der lemma-Teile mit der Anzahl der
--   pos-Teile ueberein, WENN pos NICHT kollabiert (also am rohen einzelnen Leerzeichen)
--   gesplittet wird -- die TUNICO-Kodierung nutzt fuehrende/mehrfache Leerzeichen im
--   pos-String exakt als Platzhalter fuer leere Pipe-Segmente. Einzige Ausnahme:
--   id 2058 ("3ayyit|3ayyif", pos "verb", 2 Lemma-Teile vs. 1 pos-Wert) -- hier wird
--   der eine pos-Wert an beide Lemma-Teile ausgestrahlt (Fall 3 unten).
-- * 116 verschiedene rohe pos-Werte insgesamt (deckungsgleich mit dem Plan), aber nur
--   30 verschiedene EINZELTOKEN nach dem Positions-Split -- die Mapping-Tabelle unten
--   deckt alle 30 ab (nach Fix 2 oben: 0 nicht abgebildete Nicht-NULL-Tokens).
-- * Verknuepfung zu tunico_import (Glossen): von 2.005 finalen Lemmata haben 1.989
--   einen exakten lemma_chatalpha-Treffer, 4 weitere nur einen translit_skeleton-Treffer
--   (Fallback), 12 gar keinen. Skelett ALLEIN waere als Erstschluessel ungeeignet:
--   1.455 von 2.005 Lemmata haben MEHR ALS EINEN Skelett-Treffer in tunico_import
--   (Skelette kollidieren zu stark, siehe SKILL.md-Warnung zu Skelett-Joins) --
--   deshalb exakter Lemma-Match zuerst, Skelett nur als Fallback wenn der exakte
--   Match leer bleibt.
-- * Rechte vor der Migration geprueft (information_schema.role_table_grants /
--   pg_class.relacl von vocab_lookup/vocab_tokens, wie schon in P1/P2): Owner
--   postgres, ALLE sieben Relationsprivilegien an postgres+anon+authenticated+
--   service_role. quellen_lemmata erhaelt nach dieser Migration nachweislich
--   dasselbe relacl (per pg_class-Vergleich bestaetigt, siehe Bericht) -- GRANT ALL
--   auf eine Materialized View wird von Postgres klaglos angenommen, obwohl INSERT/
--   UPDATE/DELETE/TRUNCATE dort nie ausfuehrbar sind; information_schema.role_table_
--   grants zeigt Materialized Views grundsaetzlich NICHT an (SQL-Standard-Sicht kennt
--   den Relkind 'm' nicht) -- das ist eine Einschraenkung dieser System-Sicht, kein
--   Zeichen fehlender Rechte. Deshalb hier direkt gegen pg_class.relacl geprueft.
--
-- Nach dieser Migration (Abnahme, siehe Bericht fuer die volle Herleitung):
-- kull/ma3nitha/kif/bnadim/7asilu je genau 1x; 0 Zeilen mit "|" in lemma; 2.005 Zeilen
-- (2.023 minus 18 Klitika-Formen wie "-kum"/"l-"/"ra-", einzeln aufgelistet und
-- geprueft); wortart-Verteilung siehe Bericht, unklar 125/2005 (~6,2 %); qualitaets_checks
-- Gruppe A weiterhin 0, Gruppe B unveraendert (21=2, 22=231); vocabulary weiterhin 3.775;
-- Quelltabellen tunico_corpus_wordforms (9.874) und tunico_import (7.543) unveraendert.

CREATE MATERIALIZED VIEW public.quellen_lemmata AS
WITH tunico_pos_split AS (
  SELECT
    w.id, w.frequency, w.lemma_chatalpha, w.pos,
    string_to_array(w.lemma_chatalpha, '|') AS lemma_arr,
    array_length(string_to_array(w.lemma_chatalpha, '|'), 1) AS n_lemma,
    string_to_array(w.pos, ' ') AS pos_arr_raw,
    array_length(string_to_array(w.pos, ' '), 1) AS n_pos_raw
  FROM public.tunico_corpus_wordforms w
),
tunico_exploded AS (
  -- Fall 1: Positionsgleich -- deckt normale Buendel UND den Trivialfall "1 Lemma,
  -- 1 pos-Wert" ab (282 von 283 Buendeln + praktisch alle unbebuendelten Zeilen).
  -- Leere Buendel-Segmente (fuehrendes/doppeltes "|") werden unten (tunico_gefiltert)
  -- verworfen, ihr pos-Platzhalter (Leerstring an derselben Position) faellt damit
  -- automatisch mit weg.
  SELECT s.id AS quell_row_id, s.frequency, (s.n_lemma > 1) AS aus_mehrgliedrigem_buendel,
    btrim(s.lemma_arr[g.ord]) AS lemma_part,
    nullif(btrim(s.pos_arr_raw[g.ord]), '') AS pos_part
  FROM tunico_pos_split s, LATERAL generate_series(1, s.n_lemma) AS g(ord)
  WHERE s.n_lemma = s.n_pos_raw
  UNION ALL
  -- Fall 2: genau 1 Lemma, aber pos hat eine ANDERE Tokenzahl als 1 (kein pos-Wert,
  -- oder z.B. "adverb adjective" fuer das einzelne Lemma "qrib") -- alle pos-Token
  -- gelten als Kandidat fuer dieses eine Lemma; ein echter Widerspruch zwischen den
  -- Kandidaten wird unten (tunico_wortart) wie eine Buendel-interne Wiederholung
  -- behandelt und ergibt wortart='unklar', kein stillschweigendes Verwerfen.
  SELECT s.id, s.frequency, false,
    btrim(s.lemma_arr[1]),
    nullif(btrim(s.pos_arr_raw[p.ord]), '')
  FROM tunico_pos_split s, LATERAL generate_series(1, GREATEST(s.n_pos_raw,1)) AS p(ord)
  WHERE s.n_lemma = 1 AND s.n_lemma <> COALESCE(s.n_pos_raw,-1)
  UNION ALL
  -- Fall 3: mehrere Lemmata, aber genau 1 pos-Wert -> an alle Lemmata desselben
  -- Buendels ausstrahlen (der einzige gemessene Fall: id 2058, "3ayyit|3ayyif" / "verb").
  SELECT s.id, s.frequency, true,
    btrim(s.lemma_arr[g.ord]),
    nullif(btrim(s.pos), '')
  FROM tunico_pos_split s, LATERAL generate_series(1, s.n_lemma) AS g(ord)
  WHERE s.n_lemma > 1 AND s.n_lemma <> s.n_pos_raw AND s.n_pos_raw = 1
  UNION ALL
  -- Fall 4 (Sicherheitsnetz, misst 0 Zeilen im aktuellen Bestand): mehrere Lemmata,
  -- Tokenzahl passt nicht und ist auch nicht 1 -> keine verlaessliche Positions-
  -- zuordnung moeglich, pos bleibt NULL (-> wortart 'unklar' statt Ratewert).
  SELECT s.id, s.frequency, true,
    btrim(s.lemma_arr[g.ord]),
    NULL::text
  FROM tunico_pos_split s, LATERAL generate_series(1, s.n_lemma) AS g(ord)
  WHERE s.n_lemma > 1 AND s.n_lemma <> s.n_pos_raw AND (s.n_pos_raw IS NULL OR s.n_pos_raw <> 1)
),
tunico_gefiltert AS (
  -- leere Buendel-Slots und Klitika (Praefix-/Suffix-Bindestrich: "-kum", "l-",
  -- "ra-", "b-", "fi-", "il-", "ma-", "ti-", "w-", "wa7d-", "b3ath-", "-ha", "-hum",
  -- "-i", "-ik", "-na", "-u", "dakhil ba3th-" -- vollstaendige Liste, geprueft vor
  -- dieser Migration) verwerfen. Klitika sind KEIN Fehler in der Quelle, sondern
  -- gebundene Morpheme, die TUNICO im selben Buendel wie die zugehoerige Vollform
  -- fuehrt -- keine eigenstaendige Trainer-Vokabel.
  SELECT * FROM tunico_exploded
  WHERE lemma_part <> '' AND lemma_part !~ '^-' AND lemma_part !~ '-$'
),
tunico_klassifiziert AS (
  -- Wortart-Mapping: sichtbare Regel statt CASE-Wust im Vorschlag. Alle 30 nach dem
  -- Positions-Split beobachteten pos-Einzeltoken sind unten aufgefuehrt (gegengeprueft:
  -- 0 nicht abgebildete Nicht-NULL-Tokens im aktuellen Bestand); was nicht in dieser
  -- Liste steht (inkl. kein pos-Wert oder Wortart-Widerspruch, siehe tunico_wortart)
  -- bleibt 'unklar'. Entscheidungen, die nicht selbsterklaerend sind:
  --   * activeParticiple/passiveParticiple/participle/elative -> Adjektiv (Partizipien
  --     und der Elativ funktionieren im Tunesischen ueberwiegend attributiv/adjektivisch;
  --     eine eigene Trainer-Klasse "Partizip" haette die Klassenzahl unnoetig erhoeht)
  --   * pluralNoun/collectiveNoun/dualNoun -> Nomen (Numerus ist keine eigene Wortart)
  --   * ordinal -> Numerale (Ordinalzahl ist eine Numerale-Unterart)
  --   * properNoun/toponym -> Eigenname (toponym zusaetzlich separat geflaggt, s.u.)
  --   * definiteArticle/indefinite/alle Pronomen-Varianten/preposition/conjunction/
  --     particle/interrogative/responseParticle/vocativeParticle -> Partikel/
  --     Funktionswort (geschlossene Klasse grammatischer Funktionswoerter, analog zur
  --     Buendelung im Plan-Text)
  SELECT *,
    CASE pos_part
      WHEN 'verb' THEN 'Verb' WHEN 'noun' THEN 'Nomen' WHEN 'pluralNoun' THEN 'Nomen'
      WHEN 'collectiveNoun' THEN 'Nomen' WHEN 'dualNoun' THEN 'Nomen'
      WHEN 'properNoun' THEN 'Eigenname' WHEN 'toponym' THEN 'Eigenname'
      WHEN 'adjective' THEN 'Adjektiv' WHEN 'activeParticiple' THEN 'Adjektiv'
      WHEN 'passiveParticiple' THEN 'Adjektiv' WHEN 'participle' THEN 'Adjektiv'
      WHEN 'elative' THEN 'Adjektiv' WHEN 'adverb' THEN 'Adverb'
      WHEN 'numeral' THEN 'Numerale' WHEN 'ordinal' THEN 'Numerale'
      WHEN 'interjection' THEN 'Interjektion'
      WHEN 'preposition' THEN 'Partikel/Funktionswort' WHEN 'conjunction' THEN 'Partikel/Funktionswort'
      WHEN 'particle' THEN 'Partikel/Funktionswort' WHEN 'interrogative' THEN 'Partikel/Funktionswort'
      WHEN 'definiteArticle' THEN 'Partikel/Funktionswort' WHEN 'indefinite' THEN 'Partikel/Funktionswort'
      WHEN 'demonstrativePronoun' THEN 'Partikel/Funktionswort' WHEN 'personalPronoun' THEN 'Partikel/Funktionswort'
      WHEN 'relativePronoun' THEN 'Partikel/Funktionswort' WHEN 'pronoun' THEN 'Partikel/Funktionswort'
      WHEN 'pronominalSuffix' THEN 'Partikel/Funktionswort' WHEN 'responseParticle' THEN 'Partikel/Funktionswort'
      WHEN 'vocativeParticle' THEN 'Partikel/Funktionswort' WHEN 'pluralDemonstrative' THEN 'Partikel/Funktionswort'
      ELSE NULL
    END AS wortart_kandidat,
    (pos_part = 'toponym') AS ist_toponym_kandidat
  FROM tunico_gefiltert
),
tunico_je_zeile_lemma AS (
  -- Mehrfachnennung DESSELBEN Lemmas INNERHALB einer Quellzeile (z.B. "wa7id|wa7id|
  -- wa7id", "kif|kif|kif|kif") einmal zaehlen -- sonst wuerde deren freq vervielfacht
  -- statt einmal gezaehlt (siehe Fix 1 oben).
  SELECT quell_row_id, lemma_part, max(frequency) AS frequency,
    bool_or(aus_mehrgliedrigem_buendel) AS aus_mehrgliedrigem_buendel,
    bool_or(ist_toponym_kandidat) AS ist_toponym,
    array_agg(DISTINCT wortart_kandidat) FILTER (WHERE wortart_kandidat IS NOT NULL) AS wortarten
  FROM tunico_klassifiziert GROUP BY quell_row_id, lemma_part
),
tunico_final AS (
  -- freq_korpus: Summe je DISTINKTER Quellzeile (nicht je Buendel-Mitglied, siehe
  -- tunico_je_zeile_lemma) -- verschiedene Quellzeilen sind verschiedene beobachtete
  -- Wortformen desselben Lemmas und daher additiv (Beleg: "ma3nitha" aus 3 Zeilen mit
  -- unterschiedlichem form_chatalpha/form_orig, 434+407+12=853).
  -- freq_ist_obergrenze: true sobald IRGENDEINE beitragende Quellzeile ein Buendel mit
  -- mehr als einem Mitglied war (roh, vor Klitik-/Dedup-Filterung) -- die Frequenz
  -- dieser Zeile war fuer das Lemma nicht exklusiv reserviert (siehe Plan: "kull shayy"
  -- und "7atta shayy" teilen sich 239).
  SELECT lemma_part AS lemma, sum(frequency) AS freq_korpus,
    bool_or(aus_mehrgliedrigem_buendel) AS freq_ist_obergrenze,
    bool_or(ist_toponym) AS ist_toponym, min(quell_row_id) AS quell_id
  FROM tunico_je_zeile_lemma GROUP BY lemma_part
),
tunico_wortart AS (
  -- Getrennt von tunico_final (siehe Fix 1). Genau 1 distinkte Trainer-Klasse unter
  -- allen beitragenden Zeilen/Positionen -> diese Klasse; 0 (kein pos-Wert je erkannt)
  -- oder >1 (echter Widerspruch, z.B. "kif" als Nomen UND Partikel/Funktionswort in
  -- verschiedenen Zeilen) -> 'unklar'.
  SELECT lemma_part AS lemma,
    CASE WHEN count(DISTINCT w) = 1 THEN min(w) ELSE 'unklar' END AS wortart
  FROM tunico_je_zeile_lemma, LATERAL unnest(COALESCE(wortarten, ARRAY[NULL::text])) AS w
  GROUP BY lemma_part
),
tunico_dict_match AS (
  -- Verknuepfung zum Woerterbuch tunico_import: primaer exakt ueber lemma_chatalpha,
  -- NUR falls das leer bleibt Fallback auf translit_skeleton (Skelett-Match kollidiert
  -- zu haeufig fuer einen Primaerschluessel, siehe Messung oben).
  SELECT f.lemma,
    COALESCE(
      (SELECT array_agg(ti.id) FROM public.tunico_import ti WHERE ti.lemma_chatalpha = f.lemma),
      (SELECT array_agg(ti.id) FROM public.tunico_import ti WHERE ti.translit_skeleton = public._translit_skeleton(f.lemma))
    ) AS dict_ids
  FROM tunico_final f
),
tunico_quellen_lemmata AS (
  -- Deutsche/englische Glosse: alle senses->de bzw. ->en ueber ALLE gematchten
  -- tunico_import-Zeilen hinweg flach ziehen, deduplizieren, mit "; " verbinden --
  -- 289 von 2.005 Lemmata haben mehr als einen exakten Woerterbuch-Treffer
  -- (Homographen/Mehrfacheintraege), keiner davon wird verworfen.
  SELECT 'tunico'::text AS quelle, f.quell_id, f.lemma,
    public._translit_skeleton(f.lemma) AS skeleton, f.freq_korpus,
    NULL::integer AS rang_pc, tw.wortart,
    (SELECT string_agg(DISTINCT v, '; ' ORDER BY v) FROM public.tunico_import ti,
       jsonb_array_elements(ti.senses) se, jsonb_array_elements_text(se->'de') v
     WHERE ti.id = ANY(dm.dict_ids)) AS gloss_de,
    (SELECT string_agg(DISTINCT v, '; ' ORDER BY v) FROM public.tunico_import ti,
       jsonb_array_elements(ti.senses) se, jsonb_array_elements_text(se->'en') v
     WHERE ti.id = ANY(dm.dict_ids)) AS gloss_en,
    NULL::text AS arabisch, NULL::text AS audio_url,
    f.ist_toponym, f.freq_ist_obergrenze
  FROM tunico_final f
  JOIN tunico_wortart tw ON tw.lemma = f.lemma
  JOIN tunico_dict_match dm ON dm.lemma = f.lemma
)
-- Aeusserstes SELECT bewusst nur "SELECT * FROM <eine CTE>": P3b haengt Peace Corps
-- und Ninja als weitere CTEs (peacecorps_quellen_lemmata, ninja_quellen_lemmata) an
-- und erweitert genau diese Stelle um zwei UNION-ALL-Zweige mit identischer
-- Spaltenliste -- der ganze Block oberhalb bleibt unangetastet.
SELECT * FROM tunico_quellen_lemmata
WITH DATA;

CREATE INDEX idx_quellen_lemmata_skeleton ON public.quellen_lemmata USING btree (skeleton);

-- Rechte 1:1 von vocab_lookup/vocab_tokens uebernommen (siehe Messung oben).
ALTER MATERIALIZED VIEW public.quellen_lemmata OWNER TO postgres;
GRANT ALL ON TABLE public.quellen_lemmata TO postgres, anon, authenticated, service_role;

-- =============================================================================
-- Abnahme-/Kontrollabfragen (NICHT Teil der Migration, direkt im Anschluss per
-- execute_sql gelaufen -- siehe Bericht fuer alle Ergebniswerte):
--
-- select count(*), count(*) filter (where lemma like '%|%') from public.quellen_lemmata;
-- select lemma, count(*) from public.quellen_lemmata
--   where lemma in ('kull','ma3nitha','kif','bnadim','7asilu') group by lemma;
-- select wortart, count(*) from public.quellen_lemmata group by wortart order by 2 desc;
-- select count(*) filter (where gloss_de is not null) from public.quellen_lemmata;
-- select * from public.qualitaets_checks where treffer > 0 order by gruppe, nr;
-- select count(*) from public.vocabulary;
--
-- Laufzeit-Messung REFRESH MATERIALIZED VIEW (Server-Zeit per clock_timestamp(),
-- nicht MCP-Rundlaufzeit -- CREATE TEMP TABLE + Messung in einem einzigen
-- execute_sql-Call, siehe SKILL.md-Falle "CREATE TEMP TABLE ueber mehrere Calls"):
--
-- create temp table _t(t0 timestamptz, t1 timestamptz);
-- insert into _t(t0) values (clock_timestamp());
-- refresh materialized view public.quellen_lemmata;
-- update _t set t1 = clock_timestamp();
-- select extract(epoch from (t1-t0))*1000 as dauer_ms from _t;
--
-- Zwei Laeufe: 4709 ms, 4849 ms.
