-- Gelöscht am 2026-09-29 mit Freigabe von Nils: course_exercises id 96
-- Grund: exaktes Duplikat von id 84 (Lektion 1, Abschnitt "begruessung"), gleiche Frage und
-- Antwort. Im Modus "Antwort-Paare" (lädt alle fixed_response) kam die Formel doppelt dran.
-- Vorher geprüft: kein course_exercise_progress, keine Verknüpfung, keine Vokabel dran.
--
-- Zurückholen (falls doch gewollt):
INSERT INTO course_exercises
  (id, course_lesson_id, position, exercise_type, instruction, prompt, solution,
   partner_status, partner_comment, source, meta, chunk_key, vocabulary_id)
VALUES
  (96, NULL, 1, 'fixed_response', 'Was antwortet man darauf? (feste Formel)', 'sba7 el khir',
   'sbe7 el nour / sbe7 el-ward / sbe7 el-foll', NULL, NULL, 'constructed',
   '{"prompt_de": "Guten Morgen", "solution_de": "Morgen des Lichts / der Rosen / des Jasmins (Antwort auf Guten Morgen)"}'::jsonb,
   NULL, NULL);
