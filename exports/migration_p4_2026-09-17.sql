-- P4 -- import_entscheidungen (Entscheidungs-Protokoll) + Migration aus tunico_candidates
-- Projekt: lzecflvfalxkodytnwzf (tunsi-trainer / Supabase), angewandt am 2026-09-17
-- via mcp__Supabase__apply_migration, Migrationsname:
--   p4_import_entscheidungen_table_and_migration
--
-- Ziel (siehe exports/plan_quellenabgleich_2026-09-16.md, Abschnitt P4): tunico_candidates
-- ist heute zugleich Vorschlagsliste (veraltet, stirbt spaeter mit dem kuenftigen View aus
-- P5) und Entscheidungs-Protokoll (was Nils tatsaechlich beurteilt hat). Dieses Paket trennt
-- das: das Protokoll zieht in eine eigene Tabelle um. tunico_candidates bleibt UNVERAENDERT
-- als Sicherheitsnetz stehen -- kein DROP, kein UPDATE, kein DELETE darauf, in diesem Skript
-- kommt ausschliesslich SELECT auf tunico_candidates vor.
--
-- Dies ist die tatsaechlich gelaufene Migration -- lief beim ersten Versuch durch.
--
-- NACHZAEHLUNG vor der Migration (siehe Bericht fuer die volle Herleitung): 954 Zeilen
-- gesamt, 575 pending (nicht migriert -- reiner Listenzustand, den der kuenftige View neu
-- erzeugt), 379 entschieden (338 activated, 40 added, 1 skipped). Deckt sich exakt mit dem
-- im Auftrag genannten Stand vom 2026-09-16 -- keine Abweichung.
--
-- DESIGN-ENTSCHEIDUNG "eine Quellzeile = eine Zielzeile" (nicht nach skeleton/lemma
-- gruppiert): unter den 379 entschiedenen Zeilen kommen 56 (lemma_chatalpha, status)-Paare
-- mehrfach vor, 48 davon mit UNTERSCHIEDLICHEM vocabulary_id -- z.B. "3am" -> 3187 und 4073,
-- "dar" -> 3402 und 702, "fsid" -> 3548 und 3552 (ueberwiegend Praesens/Vergangenheits-Paare
-- mit zufaellig gleicher chatalpha-Schreibung, meist ueber `cat` unterscheidbar). Genau die
-- Kollisionslage, die vocabulary_ids ueberhaupt als Array noetig macht. Eine Zusammenfuehrung
-- nach skeleton wuerde Zeilen/vocabulary_ids verlieren und die Abnahme "count(*) entspricht
-- exakt der Zahl entschiedener Quellzeilen" verletzen. Deshalb bleibt die Kardinalitaet 1:1
-- zu den 379 tunico_candidates-Zeilen; vocabulary_ids ist bei 378 von 379 Zeilen ein
-- Einelement-Array. `skeleton` ist deshalb bewusst NICHT unique (mehrere Protokollzeilen
-- koennen dasselbe Skelett tragen) -- normaler Index statt Unique-Index, wie im Auftrag
-- vorgegeben ("ein Index auf skeleton", kein "Unique-Index").
--
-- `skeleton` als GENERIERTE Spalte (GENERATED ALWAYS AS (_translit_skeleton(lemma)) STORED),
-- nicht als gewoehnliche Spalte: dieselbe Schnappschuss-Logik wie in P1
-- (vocabulary.translit_skeleton/arabic_skeleton) -- _translit_skeleton ist IMMUTABLE, eine
-- gewoehnliche Spalte koennte veralten, eine generierte Spalte kann es strukturell nicht.
--
-- NULL vocabulary_id (nur die 1 skipped-Zeile, tunico_candidates.id=35 "3ayyish", nie ein
-- vocabulary_id gesetzt): abgebildet als LEERES Array '{}', nicht als NULL. Begruendung:
-- "entschieden, verknuepfte Menge ist leer" ist ein anderer Zustand als "unbekannt/nicht
-- gesetzt" -- mit vocabulary_ids NOT NULL DEFAULT '{}' muss kein kuenftiger Schreiber
-- (Trainer, P6) je auf NULL pruefen, nur auf cardinality(vocabulary_ids) = 0.
--
-- RECHTE/RLS: vor der Migration geprueft (pg_policies, pg_class.relrowsecurity,
-- information_schema.role_table_grants, pg_roles.rolbypassrls) -- tunico_candidates hat RLS
-- an, genau eine Policy "app_access" (PERMISSIVE, FOR ALL, TO anon, authenticated,
-- USING true, WITH CHECK true), Owner postgres, GRANT ALL an
-- postgres/anon/authenticated/service_role. postgres und service_role haben
-- rolbypassrls=true und brauchen deshalb keine eigene Policy. import_entscheidungen
-- uebernimmt dieses Muster eins zu eins (gleicher Policy-Name, gleiche Rollen, gleiche
-- USING/WITH CHECK-Ausdruecke, gleiche GRANT-Liste, gleicher Owner).
--
-- id/created_at "nach Hausbrauch": tunico_candidates selbst nutzt integer + nextval()
-- (klassisch serial), die juengere Schwestertabelle peacecorps_candidates dagegen bereits
-- `GENERATED ALWAYS AS IDENTITY`. Hier wie bei peacecorps_candidates als Identity-Spalte
-- angelegt (Postgres-Standardweg seit PG10, funktional gleichwertig zu serial, aber ohne
-- eigene benannte Sequenz). created_at: timestamptz NOT NULL DEFAULT now(), wie bei
-- tunico_candidates/peacecorps_candidates (nicht wie das aeltere vocabulary.created_at ohne
-- Zeitzone). decided_at bekommt zusaetzlich DEFAULT now() (im Auftrag nicht gefordert, aber
-- risikolose Ergaenzung fuer kuenftige Schreiber, die den Migrationswert dieser Spalte sonst
-- jedesmal von Hand mitgeben muessten); bei der Migration selbst wird der ORIGINALWERT aus
-- tunico_candidates.decided_at explizit mitgegeben, der Default kommt hier nie zum Zug.
--
-- created_at der migrierten Zeilen bekommt bewusst den MIGRATIONSZEITPUNKT (Default now()),
-- nicht das alte tunico_candidates.created_at (2026-08-08, Anlage der Kandidatenliste) --
-- das ist der Moment, in dem die Protokollzeile in DIESER Tabelle entstanden ist. Die
-- fachlich relevante Zeit ("wann hat Nils entschieden") steht unveraendert in decided_at,
-- 1:1 aus der Quelle uebernommen.

BEGIN;

CREATE TABLE public.import_entscheidungen (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  lemma text NOT NULL,
  skeleton text GENERATED ALWAYS AS (public._translit_skeleton(lemma)) STORED,
  entscheidung text NOT NULL
    CONSTRAINT import_entscheidungen_entscheidung_check
    CHECK (entscheidung IN ('verknuepft','angelegt','uebersprungen')),
  vocabulary_ids integer[] NOT NULL DEFAULT '{}'::integer[],
  comment text,
  decided_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.import_entscheidungen IS
  'Entscheidungs-Protokoll aus dem Quellenabgleich (P4, 2026-09-17): haelt fest, was Nils zu einem Kandidaten-Lemma entschieden hat (entscheidung: verknuepft/angelegt/uebersprungen) und mit welchen vocabulary-Zeilen (vocabulary_ids als Array, weil ein Lemma auf mehrere Homonyme passen kann, z.B. "sabb" -> #4506 "er goss" UND #4508 "er beleidigte"). Migriert aus den 379 damals bereits entschiedenen Zeilen von tunico_candidates (activated/added/skipped); die 575 pending-Zeilen dort wurden bewusst NICHT uebernommen, die kommen kuenftig aus einem View (P5). tunico_candidates bleibt unveraendert als Sicherheitsnetz bestehen.';

CREATE INDEX idx_import_entscheidungen_skeleton ON public.import_entscheidungen USING btree (skeleton);

-- Rechte/RLS exakt wie tunico_candidates gleichgezogen (siehe Begruendung oben)
ALTER TABLE public.import_entscheidungen OWNER TO postgres;
GRANT ALL ON TABLE public.import_entscheidungen TO postgres, anon, authenticated, service_role;

ALTER TABLE public.import_entscheidungen ENABLE ROW LEVEL SECURITY;

CREATE POLICY app_access ON public.import_entscheidungen
  AS PERMISSIVE FOR ALL TO anon, authenticated
  USING (true) WITH CHECK (true);

-- Migration der 379 bereits entschiedenen Zeilen (activated/added/skipped) aus
-- tunico_candidates. Die 575 pending-Zeilen bleiben aussen vor (reiner Listenzustand).
-- Eine Quellzeile = eine Zielzeile (keine Gruppierung nach skeleton/lemma) -- siehe
-- Design-Entscheidung oben. created_at bekommt den Default (Migrationszeitpunkt),
-- decided_at wird explizit aus der Quelle uebernommen.
INSERT INTO public.import_entscheidungen (lemma, entscheidung, vocabulary_ids, comment, decided_at)
SELECT
  t.lemma_chatalpha,
  CASE t.status
    WHEN 'activated' THEN 'verknuepft'
    WHEN 'added'     THEN 'angelegt'
    WHEN 'skipped'   THEN 'uebersprungen'
  END,
  CASE WHEN t.vocabulary_id IS NULL THEN '{}'::integer[] ELSE ARRAY[t.vocabulary_id] END,
  t.comment,
  t.decided_at
FROM public.tunico_candidates t
WHERE t.status IN ('activated','added','skipped');

COMMIT;

-- =============================================================================
-- ABNAHME (NICHT Teil der Migration, per execute_sql direkt im Anschluss gelaufen --
-- Ergebnisse siehe Bericht):
--
-- 1. select count(*) from import_entscheidungen;                      -> 379
-- 2. Gegenprobe je Entscheidungsart gegen status in der Quelle:
--      activated=338=verknuepft, added=40=angelegt, skipped=1=uebersprungen  -> exakt gleich
-- 3. EXCEPT-Vergleich vocabulary_id (Quelle, activated+added) vs. unnest(vocabulary_ids)
--    (Ziel, verknuepft+angelegt) in beide Richtungen:                 -> 0 und 0 (378=378)
-- 4. tunico_candidates unveraendert:                                  -> weiterhin 954,
--    Verteilung activated=338/added=40/pending=575/skipped=1 identisch zu vorher
-- 5. select count(*) from vocabulary;                                 -> weiterhin 3775
-- 6. qualitaets_checks: Gruppe A 18 Checks, 0 mit Treffer (weiterhin 0); Gruppe B 8 Checks,
--    Treffer unveraendert nr21=2, nr22=231, alle anderen 0 (Summe 233, identisch vorher/nachher)
-- 7. Homonymfall in eigener, nie committeter Transaktion getestet (BEGIN; INSERT ...;
--    SELECT ...; ROLLBACK; -- keine COMMIT irgendwo im Testlauf):
--      INSERT INTO import_entscheidungen (lemma, entscheidung, vocabulary_ids, comment, decided_at)
--      VALUES ('sabb', 'verknuepft', ARRAY[4506,4508], 'Testzeile ...', now());
--    Ergebnis, gelesen INNERHALB derselben, nicht committeten Transaktion:
--      lemma='sabb', skeleton='sbb' (automatisch generiert), vocabulary_ids=[4506,4508],
--      Join v.id = ANY(vocabulary_ids) liefert BEIDE Homonyme:
--        4506:sabb = er goss
--        4508:sabb = er beleidigte
--    Danach in unabhaengigem Aufruf bestaetigt: 0 Testzeilen uebrig, import_entscheidungen
--    weiterhin exakt 379 Zeilen -- die Testzeile wurde nie sichtbar/dauerhaft.
--
-- Sanity-Check vor der Migration (informativ, kein Bestandteil der Abnahme-Kriterien):
-- 8 der 378 vocabulary_id-Werte unter activated/added zeigen auf inzwischen nicht mehr
-- existierende vocabulary-Zeilen (vermutlich durch spaetere Duplikat-Merges geloescht,
-- da tunico_candidates.vocabulary_id nie eine FK-Constraint hatte). Das ist unveraendert so
-- migriert (die Aufgabe verlangt Verlustfreiheit gegenueber der Quelle, nicht Konsistenz
-- gegenueber dem heutigen vocabulary-Bestand) -- siehe Bericht fuer die betroffenen ids.
