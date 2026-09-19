-- Nacharbeit zu P4 -- verwaiste vocabulary_ids in import_entscheidungen umbiegen
-- Projekt: lzecflvfalxkodytnwzf (tunsi-trainer / Supabase), angewandt am 2026-09-18
--
-- BEFUND (aus der P4-Migration):
-- 8 der 378 uebernommenen vocabulary_id-Werte zeigten auf Zeilen, die es nicht mehr gibt.
-- Ursache: tunico_candidates.vocabulary_id hatte nie eine FK-Constraint, spaetere
-- Duplikat-Zusammenfuehrungen haben die Zielzeile geloescht, ohne die Entscheidung
-- mitzuziehen. Das Muster ist durchgehend der unmittelbare ID-Nachbar, also die beim
-- Merge behaltene Zeile (4144->4143, 4158->4157, 4174->4178, 272->275).
--
-- VORGEHEN:
-- Umgebogen wurden NUR die Faelle mit GENAU EINEM exakten Schreibtreffer
-- (lower(vocabulary.darija) = lower(import_entscheidungen.lemma)). Die Ersatz-ID wird
-- in der Anweisung selbst ermittelt, nicht als Literal eingesetzt -- damit ist die
-- Eindeutigkeitsbedingung Teil des ausgefuehrten SQL und nicht nur eine Behauptung
-- im Kommentar.
--
-- Zwei Faelle hatten KEINEN exakten Schreibtreffer und wurden bewusst NICHT angefasst,
-- sondern dem Nutzer vorgelegt:
--   tayyib #4028 (Kandidat 106, cat=verb_pres, "kochen / gut / ordentlich")
--     -> in Frage kommt 405 ytayyeb = er kocht (Praesens, passt zur Kategorie)
--        gegen 1646 tayyab = er kochte (Vergangenheit) und 2921 tayeb = gar/gekocht (Adj.)
--   7lu #4159 (Kandidat 325, cat=adj, "suess / huebsch / reizend / schoen")
--     -> in Frage kommt 378 7lou = suess / mild (Maskulinum, nur andere Vokalschreibung)
--        gegen 1086 7loua = suess (f.) und 3892 7alwa = Suessigkeit
--
-- NICHT angefasst: vocabulary (keine Vokabeldaten geaendert), tunico_candidates
-- (bleibt als Sicherheitsnetz mit den Originalwerten stehen, weiterhin 954 Zeilen).

WITH verwaist AS (
  SELECT e.id, e.lemma, unnest(e.vocabulary_ids) AS alt_id
  FROM import_entscheidungen e
),
tot AS (
  SELECT * FROM verwaist v
  WHERE NOT EXISTS (SELECT 1 FROM vocabulary y WHERE y.id = v.alt_id)
),
eindeutig AS (
  SELECT t.id, t.lemma, t.alt_id,
         (SELECT x.id FROM vocabulary x WHERE lower(x.darija) = lower(t.lemma)) AS neu_id
  FROM tot t
  WHERE (SELECT count(*) FROM vocabulary x WHERE lower(x.darija) = lower(t.lemma)) = 1
)
UPDATE import_entscheidungen e
SET vocabulary_ids = array_replace(e.vocabulary_ids, d.alt_id, d.neu_id),
    comment = coalesce(e.comment || ' | ', '')
              || 'ID ' || d.alt_id || ' geloescht (Duplikat-Merge), umgebogen auf '
              || d.neu_id || ' am 2026-09-18'
FROM eindeutig d
WHERE e.id = d.id
  AND NOT (d.neu_id = ANY (e.vocabulary_ids));   -- Schutz gegen Dubletten im Array

-- ERGEBNIS: 6 Zeilen geaendert
--   65  jim3a     272  -> 275
--   306 t3ashsha  4029 -> 4519
--   344 fannan    4158 -> 4157
--   349 7abs      4144 -> 4143
--   354 7abb      3781 -> 4176
--   357 kammil    4174 -> 4178
--
-- ABNAHME nach dem Lauf (gemessen):
--   import_entscheidungen          379 Zeilen   (unveraendert)
--   Verknuepfungen gesamt          378          (unveraendert)
--   davon noch verwaist              2          (tayyib #4028, 7lu #4159 -- die beiden offenen)
--   tunico_candidates              954 Zeilen   (unveraendert)
--   vocabulary                    3775 Zeilen   (unveraendert)
--   qualitaets_checks    Gruppe A 0, Gruppe B 21=2 / 22=231 (unveraendert)

-- =============================================================================
-- NACHTRAG 2026-09-19 -- die beiden offenen Faelle entschieden (auf Zuruf des Nutzers).
-- Beide hatten keinen exakten Schreibtreffer, aber die WORTART des urspruenglichen
-- Kandidaten loest sie eindeutig auf:
--
--   tayyib #4028 -> 405  ytayyeb "er kocht"
--     Kandidat 106 hat cat=verb_pres, ist also die Praesensform. Damit scheiden
--     1646 tayyab (Vergangenheit) und 2921 tayeb (Adjektiv "gar/gekocht") aus.
--
--   7lu #4159 -> 378  7lou "suess / mild"
--     Kandidat 325 hat cat=adj und die Glosse "suess / huebsch / reizend / schoen",
--     ist also das Maskulinum. Damit scheiden 1086 7loua (Femininum) und
--     3892 7alwa (Nomen "Suessigkeit") aus.
--
-- Die Begruendung steht jeweils im comment der Zeile, nicht nur hier.
--
-- ABNAHME: import_entscheidungen 379 Zeilen, 378 Verknuepfungen,
--          davon verwaist 0 (vorher 2), vocabulary unveraendert 3775,
--          tunico_candidates unveraendert 954.
