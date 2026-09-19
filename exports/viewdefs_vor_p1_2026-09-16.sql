-- Sicherung der View-Definitionen VOR Paket P1 ("translit_skeleton gegen das Veralten sichern")
-- Projekt: lzecflvfalxkodytnwzf (tunsi-trainer / Supabase)
-- Gezogen am: 2026-09-16, unmittelbar vor der P1-Migration
-- Zweck: `qualitaets_checks` und `vokalisierung_kandidaten` haengen (laut pg_depend, siehe
--   CLAUDE.md-Auftrag P1) an vocabulary.translit_skeleton / vocabulary.arabic_skeleton und
--   muessen fuer die Umstellung dieser beiden Spalten auf GENERATED ALWAYS ... STORED gedroppt
--   und danach exakt wiederhergestellt werden. Diese Datei ist die Grundlage dafuer -- und
--   unabhaengig von P1 als alleinstehende Sicherung wertvoll (qualitaets_checks ist ~14.700
--   Zeichen lang und stand bisher in keinem Backup).
--
-- Herkunft der Definitionen: `pg_get_viewdef('public.<view>'::regclass, true)`, jeweils per
-- CREATE OR REPLACE VIEW ... AS <def> zu einem ausfuehrbaren Statement zusammengesetzt.
-- Wortgetreue Uebernahme verifiziert: die Definitionen wurden ueber die MCP-SQL-Bruecke als
-- hex-kodierter Text transportiert (um jede Mehrdeutigkeit durch verschachteltes
-- JSON-Escaping/Zeilenumbrueche auszuschliessen) und lokal dekodiert; der SHA-256-Hash der
-- dekodierten Datei wurde gegen einen serverseitig ueber denselben Text berechneten SHA-256
-- geprueft. Ergebnis: beide Hashes stimmen exakt ueberein.
--   qualitaets_checks:        14793 Zeichen / 14929 Bytes (UTF-8, enthaelt arabische Buchstaben)
--                              SHA-256 87c1ef67ec14a2308267969df36007d88f8110dd0030a06eeb36f4c526adfe7b
--   vokalisierung_kandidaten:  2700 Zeichen /  2726 Bytes
--                              SHA-256 b7cd1593a8aa4e23797bb2fb519756c3788e82c301e48a61f18f41a655f6a473
--
-- Eigentuemer beider Views: postgres.

-- =============================================================================
-- View 1/2: qualitaets_checks
-- =============================================================================
CREATE OR REPLACE VIEW public.qualitaets_checks AS
 WITH lw AS (
         SELECT '(frz\.|franz\.|ital\.|engl\.|lehnwort)'::text AS re
        ), t(nr, gruppe, check_name, ids) AS (
         SELECT 1 AS "?column?",
            'A'::text AS text,
            'Ziffern 2/5/9 oder Grossbuchstaben in der darija'::text AS text,
            array_agg(vocabulary.id ORDER BY vocabulary.id) AS array_agg
           FROM vocabulary
          WHERE vocabulary.darija ~ '[259]'::text OR vocabulary.darija ~ '[A-Z]'::text
        UNION ALL
         SELECT 2,
            'A'::text AS text,
            '"ch" statt "sh" (ohne Lehnwoerter)'::text AS text,
            array_agg(vocabulary.id ORDER BY vocabulary.id) AS array_agg
           FROM vocabulary,
            lw
          WHERE vocabulary.darija ~ 'ch'::text AND vocabulary.german !~* lw.re
        UNION ALL
         SELECT 3,
            'A'::text AS text,
            'Artikel vor Sonnenbuchstabe nicht assimiliert'::text AS text,
            array_agg(vocabulary.id ORDER BY vocabulary.id) AS array_agg
           FROM vocabulary
          WHERE vocabulary.darija ~ '(^|[^a-z0-9])[a-z]{0,2}-?(el|il)-(th|sh|d|t|z|s|j|n|r)'::text
        UNION ALL
         SELECT 4,
            'A'::text AS text,
            'Konsonanten-Gegencheck arabic_script vs darija'::text AS text,
            array_agg(DISTINCT s.id) AS array_agg
           FROM ( SELECT vocabulary.id
                   FROM vocabulary
                  WHERE vocabulary.arabic_script ~ 'ح'::text AND vocabulary.darija !~ '7'::text
                UNION
                 SELECT vocabulary.id
                   FROM vocabulary
                  WHERE vocabulary.arabic_script ~ 'خ'::text AND vocabulary.darija !~* 'kh'::text
                UNION
                 SELECT vocabulary.id
                   FROM vocabulary
                  WHERE vocabulary.arabic_script ~ 'ع'::text AND vocabulary.darija !~ '3'::text
                UNION
                 SELECT vocabulary.id
                   FROM vocabulary
                  WHERE vocabulary.arabic_script ~ 'غ'::text AND vocabulary.darija !~* 'g'::text
                UNION
                 SELECT vocabulary.id
                   FROM vocabulary,
                    lw
                  WHERE vocabulary.arabic_script ~ 'ش'::text AND vocabulary.darija !~* 'sh'::text AND vocabulary.german !~* lw.re
                UNION
                 SELECT vocabulary.id
                   FROM vocabulary
                  WHERE vocabulary.arabic_script ~ 'ق'::text AND vocabulary.darija !~* '[qgk]'::text
                UNION
                 SELECT vocabulary.id
                   FROM vocabulary
                  WHERE vocabulary.arabic_script ~ 'ض'::text AND vocabulary.darija !~* 'dh'::text
                UNION
                 SELECT vocabulary.id
                   FROM vocabulary,
                    lw
                  WHERE vocabulary.arabic_script ~ 'ج'::text AND vocabulary.darija !~* 'j'::text AND vocabulary.german !~* lw.re
                UNION
                 SELECT vocabulary.id
                   FROM vocabulary,
                    lw
                  WHERE vocabulary.arabic_script ~ 'ز'::text AND vocabulary.darija !~* 'z'::text AND vocabulary.german !~* lw.re
                UNION
                 SELECT vocabulary.id
                   FROM vocabulary,
                    lw
                  WHERE vocabulary.arabic_script ~ 'ه'::text AND vocabulary.darija !~* 'h'::text AND vocabulary.german !~* lw.re
                UNION
                 SELECT vocabulary.id
                   FROM vocabulary,
                    lw
                  WHERE vocabulary.arabic_script ~ 'س'::text AND vocabulary.darija !~* 's'::text AND vocabulary.german !~* lw.re
                UNION
                 SELECT vocabulary.id
                   FROM vocabulary,
                    lw
                  WHERE vocabulary.arabic_script ~ '[ظذ]'::text AND vocabulary.darija !~* 'th'::text AND vocabulary.german !~* lw.re) s
        UNION ALL
         SELECT 5,
            'A'::text AS text,
            '"(f.)" im Deutschen, darija endet nicht auf -a'::text AS text,
            array_agg(vocabulary.id ORDER BY vocabulary.id) AS array_agg
           FROM vocabulary
          WHERE vocabulary.german ~* '\(f\.\)'::text AND vocabulary.darija !~ 'a$'::text AND vocabulary.darija !~* '^(w-)?(ukht|umm|bint|saq|yidd|3in|wdin|farmasi|kar|tunis|mistir|susa|kirsh|shams|nar|dar|bit|blad|hethi|shah)(\y|$)'::text
        UNION ALL
         SELECT 6,
            'A'::text AS text,
            'eigenstaendiges "wa"/"u" statt "w-"'::text AS text,
            array_agg(vocabulary.id ORDER BY vocabulary.id) AS array_agg
           FROM vocabulary
          WHERE vocabulary.darija ~ '\y(wa|u)\y'::text AND vocabulary.darija !~ '\yahla\s+wa\s+sahla\y'::text
        UNION ALL
         SELECT 7,
            'A'::text AS text,
            'Plural-Endung -iou/-eou/-aou (Regel 21)'::text AS text,
            array_agg(vocabulary.id ORDER BY vocabulary.id) AS array_agg
           FROM vocabulary
          WHERE vocabulary.darija ~ '(iou|eou|aou)(\y|$)'::text
        UNION ALL
         SELECT 8,
            'A'::text AS text,
            'halb verdoppelter Digraph (ohne die 4 belegten Morphemgrenzen)'::text AS text,
            array_agg(vocabulary.id ORDER BY vocabulary.id) AS array_agg
           FROM vocabulary
          WHERE vocabulary.darija ~ '(ddh|tth|ssh|kkh|ggh|7h|thh)'::text AND vocabulary.darija !~ '(dhdh|thth|shsh|khkh|ghgh|77)'::text AND (vocabulary.id <> ALL (ARRAY[722, 3042, 3073, 4254]))
        UNION ALL
         SELECT 9,
            'A'::text AS text,
            'Sonderbuchstabe passt nicht zur Transliteration (Regel 23)'::text AS text,
            array_agg(vocabulary.id ORDER BY vocabulary.id) AS array_agg
           FROM vocabulary
          WHERE vocabulary.arabic_script ~ 'ق'::text AND vocabulary.darija ~ 'g'::text AND vocabulary.darija !~ 'gh'::text OR vocabulary.arabic_script ~ '[ڨگ]'::text AND vocabulary.darija !~ 'g'::text OR vocabulary.arabic_script ~ '[ڤڥ]'::text AND vocabulary.darija !~ 'v'::text OR vocabulary.arabic_script ~ 'پ'::text AND vocabulary.darija !~ 'p'::text
        UNION ALL
         SELECT 10,
            'A'::text AS text,
            'identisches arabic_script ohne homonym_ok'::text AS text,
            array_agg(vocabulary.id ORDER BY vocabulary.id) AS array_agg
           FROM vocabulary
          WHERE (btrim(vocabulary.arabic_script) IN ( SELECT btrim(vocabulary_1.arabic_script) AS btrim
                   FROM vocabulary vocabulary_1
                  WHERE vocabulary_1.arabic_script IS NOT NULL
                  GROUP BY (btrim(vocabulary_1.arabic_script))
                 HAVING count(*) > 1 AND NOT bool_or(vocabulary_1.homonym_ok)))
        UNION ALL
         SELECT 11,
            'A'::text AS text,
            'rohes arabisches Zeichen im gespeicherten Skelett'::text AS text,
            array_agg(vocabulary.id ORDER BY vocabulary.id) AS array_agg
           FROM vocabulary
          WHERE vocabulary.arabic_skeleton ~ '[^a-z0-9]'::text
        UNION ALL
         SELECT 20,
            'B'::text AS text,
            'ungueltige Schadda auf dem ersten Buchstaben (Lautlehre 3)'::text AS text,
            array_agg(vocabulary.id ORDER BY vocabulary.id) AS array_agg
           FROM vocabulary
          WHERE vocabulary.arabic_script ~ '(^|\s)[بتثجحخدذرزسشصضطظعغفقكلمنهويائأإآةى][ًٌٍَُِْٰ]*ّ'::text
        UNION ALL
         SELECT 21,
            'B'::text AS text,
            'Verb-Selbstcheck: Zeile fehlt in der eigenen conjugation'::text AS text,
            array_agg(v.id ORDER BY v.id) AS array_agg
           FROM vocabulary v
          WHERE v.conjugation IS NOT NULL AND NOT v.conj_rotate AND NOT (EXISTS ( SELECT 1
                   FROM jsonb_each(v.conjugation) b(bn, bv),
                    LATERAL jsonb_each(b.bv) s(sn, cell)
                  WHERE jsonb_typeof(b.bv) = 'object'::text AND lower(btrim(s.cell ->> 'darija'::text)) = lower(btrim(v.darija))))
        UNION ALL
         SELECT 22,
            'B'::text AS text,
            'unvokalisierte Einzelwoerter'::text AS text,
            array_agg(vocabulary.id ORDER BY vocabulary.id) AS array_agg
           FROM vocabulary
          WHERE vocabulary.arabic_script IS NOT NULL AND vocabulary.arabic_script !~ '[ًٌٍَُِّْ]'::text AND vocabulary.arabic_script !~ '\s'::text
        )
 SELECT t.nr,
    t.gruppe,
    t.check_name,
    COALESCE(array_length(t.ids, 1), 0) AS treffer,
    COALESCE(t.ids[1:15], ARRAY[]::integer[]) AS erste_ids
   FROM t
UNION ALL
 SELECT 12 AS nr,
    'A'::text AS gruppe,
    'unbekanntes arabisches Zeichen (Waechter)'::text AS check_name,
    count(*)::integer AS treffer,
    ARRAY[]::integer[] AS erste_ids
   FROM unbekannte_arabische_zeichen
UNION ALL
 SELECT 13 AS nr,
    'A'::text AS gruppe,
    'rohes Zeichen im Ninja-Skelett'::text AS check_name,
    count(*)::integer AS treffer,
    ARRAY[]::integer[] AS erste_ids
   FROM derja_ninja_entries
  WHERE derja_ninja_entries.arabic_skeleton ~ '[^a-z0-9]'::text
UNION ALL
 SELECT 23 AS nr,
    'B'::text AS gruppe,
    'offene Vokalisierungs-Kandidaten (Ninja, eindeutig)'::text AS check_name,
    count(*)::integer AS treffer,
    ARRAY[]::integer[] AS erste_ids
   FROM vokalisierung_kandidaten
UNION ALL
 SELECT 24 AS nr,
    'B'::text AS gruppe,
    'Gemination: darija und arabic_script widersprechen sich'::text AS check_name,
    count(*)::integer AS treffer,
    (array_agg(chatalpha_konflikte.id ORDER BY chatalpha_konflikte.id))[1:15] AS erste_ids
   FROM chatalpha_konflikte
  WHERE chatalpha_konflikte.klasse = 'gemination'::text
UNION ALL
 SELECT 25 AS nr,
    'B'::text AS gruppe,
    'Konsonant: darija und arabic_script widersprechen sich'::text AS check_name,
    count(*)::integer AS treffer,
    (array_agg(chatalpha_konflikte.id ORDER BY chatalpha_konflikte.id))[1:15] AS erste_ids
   FROM chatalpha_konflikte
  WHERE chatalpha_konflikte.klasse = 'konsonanten'::text
UNION ALL
 SELECT 26 AS nr,
    'A'::text AS gruppe,
    '"3" in der darija, aber kein ع im arabic_script (Hamza als 3)'::text AS check_name,
    count(*)::integer AS treffer,
    (array_agg(vocabulary.id ORDER BY vocabulary.id))[1:15] AS erste_ids
   FROM vocabulary
  WHERE vocabulary.darija ~ '3'::text AND vocabulary.arabic_script IS NOT NULL AND vocabulary.arabic_script !~ 'ع'::text
UNION ALL
 SELECT 27 AS nr,
    'A'::text AS gruppe,
    'Chat-Alphabet q/z/j ohne arabische Entsprechung (Gegenrichtung)'::text AS check_name,
    count(*)::integer AS treffer,
    (array_agg(x.id ORDER BY x.id))[1:15] AS erste_ids
   FROM ( SELECT vocabulary.id,
            regexp_replace(lower(vocabulary.darija), 'kh|sh|gh|th|dh|ch'::text, ''::text, 'g'::text) AS d2,
            vocabulary.arabic_script
           FROM vocabulary
          WHERE vocabulary.arabic_script IS NOT NULL AND vocabulary.darija IS NOT NULL) x
  WHERE x.d2 ~ 'q'::text AND x.arabic_script !~ 'ق'::text OR x.d2 ~ 'z'::text AND x.arabic_script !~ 'ز'::text OR x.d2 ~ 'j'::text AND x.arabic_script !~ '[جچ]'::text
UNION ALL
 SELECT 28 AS nr,
    'A'::text AS gruppe,
    'Artikel assimiliert vor Mondbuchstabe (Gegenrichtung zu Check 3)'::text AS check_name,
    count(*)::integer AS treffer,
    (array_agg(vocabulary.id ORDER BY vocabulary.id))[1:15] AS erste_ids
   FROM vocabulary
  WHERE vocabulary.darija ~ '\ye(b|k|f|m|h|w|y|7|q|3)-'::text
UNION ALL
 SELECT 29 AS nr,
    'B'::text AS gruppe,
    'Klammer in der darija (gehoert ins german)'::text AS check_name,
    count(*)::integer AS treffer,
    (array_agg(vocabulary.id ORDER BY vocabulary.id))[1:15] AS erste_ids
   FROM vocabulary
  WHERE vocabulary.darija ~ '\('::text
UNION ALL
 SELECT 30 AS nr,
    'B'::text AS gruppe,
    'homonym_ok verwaist (keine der drei Partnerarten vorhanden)'::text AS check_name,
    count(*)::integer AS treffer,
    (array_agg(b.id ORDER BY b.id))[1:15] AS erste_ids
   FROM ( SELECT vocabulary.id,
            vocabulary.homonym_ok,
            regexp_replace(btrim(regexp_replace(vocabulary.arabic_script, '[ًٌٍَُِّْٰٟ]'::text, ''::text, 'g'::text)), '^ال'::text, ''::text) AS ar_key,
            regexp_replace(lower(vocabulary.german), '[^a-zäöüß]'::text, ''::text, 'g'::text) AS g_key,
            regexp_replace(lower(vocabulary.darija), '[^a-z0-9]'::text, ''::text, 'g'::text) AS t_key
           FROM vocabulary
          WHERE vocabulary.arabic_script IS NOT NULL) b
  WHERE b.homonym_ok AND NOT (EXISTS ( SELECT 1
           FROM ( SELECT vocabulary.id,
                    regexp_replace(btrim(regexp_replace(vocabulary.arabic_script, '[ًٌٍَُِّْٰٟ]'::text, ''::text, 'g'::text)), '^ال'::text, ''::text) AS ar_key,
                    regexp_replace(lower(vocabulary.german), '[^a-zäöüß]'::text, ''::text, 'g'::text) AS g_key,
                    regexp_replace(lower(vocabulary.darija), '[^a-z0-9]'::text, ''::text, 'g'::text) AS t_key
                   FROM vocabulary
                  WHERE vocabulary.arabic_script IS NOT NULL) w
          WHERE w.id <> b.id AND (w.ar_key = b.ar_key OR w.g_key = b.g_key OR w.t_key = b.t_key)))
UNION ALL
 SELECT 31 AS nr,
    'A'::text AS gruppe,
    'ar_key-Gruppe mit gleicher Bedeutung, ohne homonym_ok (Dublette)'::text AS check_name,
    count(*)::integer AS treffer,
    ARRAY[]::integer[] AS erste_ids
   FROM ( SELECT regexp_replace(btrim(regexp_replace(vocabulary.arabic_script, '[ًٌٍَُِّْٰٟ]'::text, ''::text, 'g'::text)), '^ال'::text, ''::text) AS ar_key
           FROM vocabulary
          WHERE vocabulary.arabic_script IS NOT NULL AND btrim(vocabulary.arabic_script) <> ''::text
          GROUP BY (regexp_replace(btrim(regexp_replace(vocabulary.arabic_script, '[ًٌٍَُِّْٰٟ]'::text, ''::text, 'g'::text)), '^ال'::text, ''::text))
         HAVING count(*) > 1 AND NOT bool_or(vocabulary.homonym_ok) AND count(DISTINCT regexp_replace(lower(vocabulary.german), '[^a-zäöüß]'::text, ''::text, 'g'::text)) = 1) x
UNION ALL
 SELECT 32 AS nr,
    'A'::text AS gruppe,
    'conjugation-Tabelle verstoesst gegen die Transliterationsregeln'::text AS check_name,
    count(DISTINCT f.id)::integer AS treffer,
    (array_agg(DISTINCT f.id))[1:15] AS erste_ids
   FROM ( SELECT v.id,
            s.cell ->> 'darija'::text AS form
           FROM vocabulary v,
            LATERAL jsonb_each(v.conjugation) b(bn, bv),
            LATERAL jsonb_each(b.bv) s(sn, cell)
          WHERE v.conjugation IS NOT NULL AND jsonb_typeof(b.bv) = 'object'::text AND (s.cell ->> 'darija'::text) IS NOT NULL) f
  WHERE f.form ~ '[259]'::text OR f.form ~ '[A-Z]'::text OR f.form ~ 'ch'::text OR f.form ~ '(^|[^a-z0-9])[a-z]{0,2}-?(el|il)-(th|sh|d|t|z|s|j|n|r)'::text OR f.form ~ '(iou|eou|aou)$'::text OR f.form ~ '(ddh|ssh|kkh|ggh)'::text OR f.form ~ '(.)\1\1'::text;

-- =============================================================================
-- View 2/2: vokalisierung_kandidaten
-- =============================================================================
CREATE OR REPLACE VIEW public.vokalisierung_kandidaten AS
 SELECT id,
    darija,
    german,
    ist_ar,
    neu_ar,
    ninja_chatalpha,
    ninja_en,
    pos_tag,
    audio_url,
    term_start,
    term_end,
    vokale_unser,
    vokale_ninja,
    wortart_verdacht,
    _arabic_to_chatalpha(neu_ar) AS abgeleitet,
    lower(darija) = _arabic_to_chatalpha(neu_ar) AS ableitung_exakt
   FROM ( WITH unvok AS (
                 SELECT vocabulary.id,
                    vocabulary.darija,
                    vocabulary.german,
                    vocabulary.arabic_script,
                    vocabulary.arabic_skeleton
                   FROM vocabulary
                  WHERE vocabulary.arabic_script IS NOT NULL AND vocabulary.arabic_script !~ '[ًٌٍَُِّْ]'::text AND vocabulary.arabic_script !~ '\s'::text
                ), paar AS (
                 SELECT u.id,
                    u.darija,
                    u.german,
                    u.arabic_script AS ist_ar,
                    n.arabic_script AS neu_ar,
                    n.chatalpha AS ninja_chatalpha,
                    n.english AS ninja_en,
                    n.pos_tag,
                    n.audio_url,
                    n.term_start,
                    n.term_end
                   FROM unvok u
                     JOIN derja_ninja_entries n ON n.arabic_skeleton = u.arabic_skeleton
                  WHERE n.arabic_script ~ '[ًٌٍَُِّْ]'::text AND btrim(regexp_replace(n.arabic_script, '[ًٌٍَُِّْٰٟ]'::text, ''::text, 'g'::text)) = btrim(u.arabic_script)
                ), eindeutig AS (
                 SELECT paar.id
                   FROM paar
                  GROUP BY paar.id
                 HAVING count(DISTINCT paar.neu_ar) = 1
                )
         SELECT DISTINCT p.id,
            p.darija,
            p.german,
            p.ist_ar,
            p.neu_ar,
            p.ninja_chatalpha,
            p.ninja_en,
            p.pos_tag,
            p.audio_url,
            p.term_start,
            p.term_end,
            regexp_replace(replace(replace(lower(p.darija), 'ou'::text, 'u'::text), 'o'::text, 'u'::text), '[^aeiu]'::text, ''::text, 'g'::text) AS vokale_unser,
            regexp_replace(replace(replace(lower(p.ninja_chatalpha), 'ou'::text, 'u'::text), 'o'::text, 'u'::text), '[^aeiu]'::text, ''::text, 'g'::text) AS vokale_ninja,
            p.german ~* '^(er|sie|es|ich|du|wir|ihr) '::text AND p.ninja_en !~* '^to '::text AS wortart_verdacht
           FROM paar p
             JOIN eindeutig e USING (id)) k
  WHERE NOT (EXISTS ( SELECT 1
           FROM vocabulary v
          WHERE v.id = k.id AND COALESCE(v.internal_note, ''::text) ~ 'ninja-vokalisierung verworfen'::text));
-- ---------------------------------------------------------------------------
-- Grants auf beide Views, Stand 2026-09-16 vor P1
-- Quelle: information_schema.role_table_grants (table_schema='public',
--   table_name in ('qualitaets_checks','vokalisierung_kandidaten')), gegengeprueft mit
--   pg_class.relacl. Fuer JEDE der vier Rollen (postgres, anon, authenticated, service_role)
--   sind ALLE sieben Relations-Privilegien gesetzt (SELECT, INSERT, UPDATE, DELETE, TRUNCATE,
--   REFERENCES, TRIGGER) -- entspricht exakt "GRANT ALL". is_grantable=YES nur fuer postgres
--   (Owner beider Views), NO fuer die drei anderen Rollen.
--   relacl (roher Beleg):
--     qualitaets_checks:       {postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
--     vokalisierung_kandidaten:{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
--
-- Ausfuehrbare Wiederherstellung (so nach dem Neuanlegen der Views in der Migration
-- angewendet):

GRANT ALL ON TABLE public.qualitaets_checks TO postgres;
GRANT ALL ON TABLE public.qualitaets_checks TO anon;
GRANT ALL ON TABLE public.qualitaets_checks TO authenticated;
GRANT ALL ON TABLE public.qualitaets_checks TO service_role;

GRANT ALL ON TABLE public.vokalisierung_kandidaten TO postgres;
GRANT ALL ON TABLE public.vokalisierung_kandidaten TO anon;
GRANT ALL ON TABLE public.vokalisierung_kandidaten TO authenticated;
GRANT ALL ON TABLE public.vokalisierung_kandidaten TO service_role;
