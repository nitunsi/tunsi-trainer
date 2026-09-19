-- P1 -- translit_skeleton/arabic_skeleton gegen das Veralten sichern
-- Projekt: lzecflvfalxkodytnwzf (tunsi-trainer / Supabase), angewandt am 2026-09-16
-- via mcp__Supabase__apply_migration, Migrationsname:
--   p1_translit_skeleton_arabic_skeleton_generated
--
-- Dies ist die tatsaechlich gelaufene, erfolgreiche Fassung (zweiter Versuch).
-- Ein erster Versuch schlug fehl (siehe Bericht) und wurde von Postgres komplett und
-- folgenlos zurueckgerollt: die urspruengliche Statement-Reihenfolge legte
-- qualitaets_checks VOR vokalisierung_kandidaten neu an, obwohl qualitaets_checks
-- (Check 23, "offene Vokalisierungs-Kandidaten") selbst von vokalisierung_kandidaten liest
-- -- Fehler 42P01 "relation vokalisierung_kandidaten does not exist". Einzige Aenderung
-- gegenueber dem ersten (fehlgeschlagenen) Versuch: die Erstellungsreihenfolge der beiden
-- Views in Schritt 5 wurde vertauscht (vokalisierung_kandidaten zuerst).
--
-- Die beiden View-Definitionen werden NICHT hier im Text eingebettet, sondern per
-- pg_get_viewdef() aus dem laufenden Katalog erfasst (v_qc_def/v_vk_def), unmittelbar
-- bevor die Views gedroppt werden, und danach unveraendert wieder eingesetzt. Das ist
-- absichtlich so gebaut: es vermeidet jedes Abtippen/Transportrisiko fuer die ~14.700
-- Zeichen lange qualitaets_checks-Definition. Wortgetreue Wiederherstellung wurde nach
-- der Migration per SHA-256-Vergleich gegen exports/viewdefs_vor_p1_2026-09-16.sql
-- bestaetigt (siehe Bericht) -- diese Datei bleibt die unabhaengige Sicherung.

BEGIN;

DO $mig$
DECLARE
  v_qc_def text;
  v_vk_def text;
BEGIN
  -- 0. Aktuelle View-Definitionen aus dem Katalog erfassen (identisch zu
  --    exports/viewdefs_vor_p1_2026-09-16.sql, hier live fuer die Wiederherstellung unten
  --    verwendet -- kein manuelles Abtippen, daher keine Transkriptionsgefahr)
  v_qc_def := pg_get_viewdef('public.qualitaets_checks'::regclass, true);
  v_vk_def := pg_get_viewdef('public.vokalisierung_kandidaten'::regclass, true);

  -- 1. abhaengige Views droppen (qualitaets_checks zuerst, da sie selbst auf
  --    vokalisierung_kandidaten verweist -- Abhaengige vor Abhaengigkeit droppen)
  DROP VIEW public.qualitaets_checks;
  DROP VIEW public.vokalisierung_kandidaten;

  -- 2. Indizes droppen
  DROP INDEX public.idx_vocab_translit_skeleton;
  DROP INDEX public.idx_vocab_arabic_skeleton;

  -- 3. Spalten droppen und als generierte Spalten neu anlegen
  ALTER TABLE public.vocabulary DROP COLUMN translit_skeleton;
  ALTER TABLE public.vocabulary DROP COLUMN arabic_skeleton;

  ALTER TABLE public.vocabulary
    ADD COLUMN translit_skeleton text GENERATED ALWAYS AS (public._translit_skeleton(darija)) STORED;
  ALTER TABLE public.vocabulary
    ADD COLUMN arabic_skeleton text GENERATED ALWAYS AS (public._arabic_skeleton(arabic_script)) STORED;

  -- 4. Indizes neu anlegen
  CREATE INDEX idx_vocab_translit_skeleton ON public.vocabulary USING btree (translit_skeleton);
  CREATE INDEX idx_vocab_arabic_skeleton ON public.vocabulary USING btree (arabic_skeleton);

  -- 5. Views wortgleich wiederherstellen, in umgekehrter Reihenfolge (vokalisierung_kandidaten
  --    zuerst, weil qualitaets_checks-Check 23 sie referenziert) + Eigentuemer + Grants
  EXECUTE format('CREATE VIEW public.vokalisierung_kandidaten AS %s', v_vk_def);
  EXECUTE format('CREATE VIEW public.qualitaets_checks AS %s', v_qc_def);

  ALTER VIEW public.qualitaets_checks OWNER TO postgres;
  ALTER VIEW public.vokalisierung_kandidaten OWNER TO postgres;

  GRANT ALL ON TABLE public.qualitaets_checks TO postgres, anon, authenticated, service_role;
  GRANT ALL ON TABLE public.vokalisierung_kandidaten TO postgres, anon, authenticated, service_role;
END;
$mig$;

COMMIT;
