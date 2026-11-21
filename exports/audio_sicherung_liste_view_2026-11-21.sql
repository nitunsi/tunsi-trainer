-- Definition der Ansicht public.audio_sicherung_liste (Stand 2026-11-21, vor dem Löschen).
-- Zweck: Adressliste für tools/audio_sichern.py (Audio-Sicherung in Colab). Nur Lesen.
-- Wiederherstellen: dieses Skript ausführen, danach (nur für einen neuen Sicherungslauf!) anon lesen lassen:
--   GRANT SELECT ON public.audio_sicherung_liste TO anon;   -- danach wieder REVOKE/DROP, sobald der Lauf fertig ist.
CREATE OR REPLACE VIEW public.audio_sicherung_liste AS
 SELECT 'ninja'::text AS quelle,
    'eintrag'::text AS bereich,
    e.id::text AS ref,
    e.audio_url AS url,
    e.arabic_script AS arabisch,
    e.darija AS umschrift,
    e.english AS deutsch_engl,
    NULL::text AS lektion,
    e.term_start AS t_start,
    e.term_end AS t_end,
    e.example_term_start AS ex_start,
    e.example_term_end AS ex_end
   FROM derja_ninja_entries e
  WHERE e.audio_url IS NOT NULL AND e.audio_url <> ''::text
UNION ALL
 SELECT 'sl24'::text AS quelle,
    'vokabel'::text AS bereich,
    i.id::text AS ref,
    i.audio_url AS url,
    i.arabic AS arabisch,
    NULL::text AS umschrift,
    i.german AS deutsch_engl,
    (((i.niveau || ' L'::text) || i.lektion) || ' '::text) || COALESCE(i.lektion_titel, ''::text) AS lektion,
    NULL::numeric AS t_start,
    NULL::numeric AS t_end,
    NULL::numeric AS ex_start,
    NULL::numeric AS ex_end
   FROM sl24_import i
  WHERE i.audio_url IS NOT NULL AND i.audio_url <> ''::text
UNION ALL
 SELECT 'sl24'::text AS quelle,
    'satz'::text AS bereich,
    i.id::text AS ref,
    s.value ->> 'audio'::text AS url,
    s.value ->> 'ar'::text AS arabisch,
    NULL::text AS umschrift,
    s.value ->> 'de'::text AS deutsch_engl,
    (((i.niveau || ' L'::text) || i.lektion) || ' '::text) || COALESCE(i.lektion_titel, ''::text) AS lektion,
    NULL::numeric AS t_start,
    NULL::numeric AS t_end,
    NULL::numeric AS ex_start,
    NULL::numeric AS ex_end
   FROM sl24_import i,
    LATERAL jsonb_array_elements(
        CASE
            WHEN jsonb_typeof(i.saetze) = 'array'::text THEN i.saetze
            ELSE '[]'::jsonb
        END) s(value)
  WHERE (s.value ->> 'audio'::text) ~~ 'http%'::text
UNION ALL
 SELECT 'sl24'::text AS quelle,
    'inhalt:'::text || n.bereich AS bereich,
    n.id::text AS ref,
    n.audio_url AS url,
    n.arabisch,
    NULL::text AS umschrift,
    n.deutsch AS deutsch_engl,
    (((n.niveau || ' '::text) || n.nr) || ' '::text) || COALESCE(n.titel, ''::text) AS lektion,
    NULL::numeric AS t_start,
    NULL::numeric AS t_end,
    NULL::numeric AS ex_start,
    NULL::numeric AS ex_end
   FROM sl24_inhalt n
  WHERE n.audio_url IS NOT NULL AND n.audio_url <> ''::text;
