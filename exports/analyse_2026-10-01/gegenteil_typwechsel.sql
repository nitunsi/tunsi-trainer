-- Ausgeführt 2026-10-01: 15 Karten kongruenz_gegenteil von fill_blank auf answer_pattern (Selbstbewertung)
UPDATE course_exercises SET exercise_type = 'answer_pattern' WHERE chunk_key = 'kongruenz_gegenteil' AND exercise_type = 'fill_blank' AND id BETWEEN 1066 AND 1080;
-- Undo:
-- UPDATE course_exercises SET exercise_type = 'fill_blank' WHERE chunk_key = 'kongruenz_gegenteil' AND exercise_type = 'answer_pattern' AND id BETWEEN 1066 AND 1080;
