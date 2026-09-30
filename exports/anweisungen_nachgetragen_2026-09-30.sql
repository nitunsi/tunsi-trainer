-- Fehlende Anweisungen bei Lückentext-Karten nachgetragen, 2026-09-30, mit Freigabe von Nils.
-- Tabelle course_exercises, Spalte instruction. Vorher überall NULL.
-- Quelle der Formulierungen: Übungsaufgaben im Uni-Wien-Skript "Tunesisch-Arabisch I"
-- (uniwien_source_pages), Stellen je Gruppe unten. Tounsi-Beispiele in Trainer-Konvention
-- (kh, j, 7), nicht in der Schreibung des Skripts.
--
-- Erster Durchgang (9 Zeilen): K4 nisba_plural, ids 532-540
--   "Ersetze den Ländernamen durch das passende Nisbaadjektiv (Nationalität). Achte auf Singular und Plural."
--   Quelle: Lektion 4, Übung IV (PDF-Seite 62)
--
-- Zweiter Durchgang (55 Zeilen):
--   520-530   K4 wiederholung_pronomen  Lektion 4, Übung III
--   546-558   K4 praep_suffixe_1        Lektion 4, Übung VI
--   559-571   K4 praep_suffixe_2        Lektion 4, Übung VI (Fortsetzung)
--   747,748,749,755  K5 madabb          Lektion 5, Übung V
--   865-872   K5 partizip_luecken       Lektion 5, Übung XVI
--   1533-1536 K10 kull                  keine Quelle, allgemeine Anweisung
--   1701,1702 K12 relativpronomen       keine Quelle, allgemeine Anweisung
-- Zuordnung an Beispielen geprüft, nicht an jeder Karte einzeln (vor allem praep_suffixe_1/2).
--
-- Zurücksetzen (alle 64 Zeilen):
UPDATE course_exercises SET instruction = NULL
WHERE id IN (532,533,534,535,536,537,538,539,540,
             520,521,522,523,524,525,526,527,528,529,530,
             546,547,548,549,550,551,552,553,554,555,556,557,558,
             559,560,561,562,563,564,565,566,567,568,569,570,571,
             747,748,749,755, 865,866,867,868,869,870,871,872,
             1533,1534,1535,1536, 1701,1702);
