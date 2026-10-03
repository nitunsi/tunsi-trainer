-- Ausgeführt 2026-10-03: Anweisungstext der 9 Plural-Karten (chunk nisba_plural: 587, 2043-2050) gekürzt
UPDATE course_exercises SET instruction = regexp_replace(instruction, '^Jetzt im Plural: ', 'Plural: ') WHERE chunk_key='nisba_plural' AND instruction LIKE 'Jetzt im Plural: %';
-- Undo:
-- UPDATE course_exercises SET instruction = regexp_replace(instruction, '^Plural: ', 'Jetzt im Plural: ') WHERE chunk_key='nisba_plural' AND instruction LIKE 'Plural: %';
