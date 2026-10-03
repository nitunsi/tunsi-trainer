-- Ausgeführt 2026-10-03: Anweisungstext der 9 Plural-Karten (chunk nisba_plural: 587, 2043-2050) gekürzt
UPDATE course_exercises SET instruction = regexp_replace(instruction, '^Jetzt im Plural: ', 'Plural: ') WHERE chunk_key='nisba_plural' AND instruction LIKE 'Jetzt im Plural: %';
-- Undo:
-- UPDATE course_exercises SET instruction = regexp_replace(instruction, '^Plural: ', 'Jetzt im Plural: ') WHERE chunk_key='nisba_plural' AND instruction LIKE 'Plural: %';

-- Ausgeführt 2026-10-03: Anweisung der 9 Nisba-Karten (532-540) gekürzt
UPDATE course_exercises SET instruction = 'Land → Nationalität (Nisba), Sg./Pl. beachten.' WHERE instruction = 'Ersetze den Ländernamen durch das passende Nisbaadjektiv (Nationalität). Achte auf Singular und Plural.' AND exercise_type = 'fill_blank';
-- Undo:
-- UPDATE course_exercises SET instruction = 'Ersetze den Ländernamen durch das passende Nisbaadjektiv (Nationalität). Achte auf Singular und Plural.' WHERE instruction = 'Land → Nationalität (Nisba), Sg./Pl. beachten.' AND exercise_type = 'fill_blank';
