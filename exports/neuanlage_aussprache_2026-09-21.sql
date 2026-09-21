-- Neuanlage der Aussprache-Luecken + Kursverknuepfung
-- Projekt lzecflvfalxkodytnwzf (tunsi-trainer / Supabase), 2026-09-21
-- Freigabe Nils: "Ok aber nicht faellig setzen. Ggf mit kurs verknuepfen"
--
-- =============================================================================
-- (0) DER DUPLIKAT-CHECK HAT DIE LISTE KORRIGIERT -- 8 gemeldete Luecken, 6 echte
--
-- Die Vorrunde hatte 8 fehlende Woerter gemeldet. Der Pflicht-Duplikat-Check ueber
-- ALLE DREI Felder (SKILL.md, Schritt 1/Eingang B) hat zwei davon widerlegt:
--
--   samahni "Entschuldige mich" -> existiert als 563 sama7ni سَمَحْنِي
--     Der erste Durchgang hat sie verfehlt, weil er ueber das Skelett der
--     KURSSCHREIBUNG suchte: "samahni" ergibt smhn, unsere Zeile sama7ni ergibt
--     sm7n. Die Uni-Wien-Vorlage schreibt ح als h, unsere Konvention als 7.
--     Lehrbuchbeispiel fuer die Regel "die Lautschrift der Quelle ist ein
--     Strukturhinweis, keine Vorlage".
--
--   sba7 "Morgen" -> die Zeile gibt es als bestimmte Form: 1478 es-sbe7 الصُّبَاح
--     "der Morgen". Skelett ssb7 statt sb7, deshalb im ersten Durchgang nicht
--     gefunden. Eine zweite Zeile fuer die unbestimmte Form waere ein
--     Beinahe-Duplikat desselben Lexems -- stattdessen verknuepft.
--
-- Weitere Funde des Checks, die KEINE Duplikate sind (dokumentiert, damit die
-- naechste Sitzung nicht neu prueft):
--   3rousa "Braut" gegen 1958 sbiyya "junges Maedchen / ledige Frau / Braut" --
--     Glossen ueberschneiden sich, aber صْبِيَّة und عْرُوسَة sind zwei Woerter.
--   sin gegen 4146 7arf "Buchstabe" -- 7arf ist das Gattungswort, sin der Name
--     des Buchstabens س.
--   sabir gegen 2598 balou twil "geduldig (woertl.: langer Atem)" -- Redewendung,
--     nicht dasselbe Wort.
--
-- =============================================================================
-- (1) SCHRITT 2: interne Gegenprobe VOR dem Schreiben
--
-- Fuer jedes Paar (Vorschlag darija, Vorschlag arabic_script) galt:
--   public._arabic_to_chatalpha(arab) = darija   UND
--   public._translit_skeleton(darija) = public._arabic_skeleton(arab)
-- Alle sechs bestanden. Einzige Abweichung: mazel sba7 rechnet auf "mazal sba7"
-- zurueck -- ein reiner Vokalunterschied, laut SKILL.md kein Befund, und die
-- bestehende Zeile 1849 mazel مَازَلْ traegt dieselbe Konvention.

-- =============================================================================
-- (2) SCHRITT 3: externe Belege, und wo das Audio NICHT hingehoert
--
-- 3rousa   Ninja 3rousa عْرُوسَةْ "bride" (Audio 18657) + TUNICO 3rusa "Braut"
-- sour     Ninja sour سُورْ "wall, fence" (Audio 5125) + TUNICO sur "Zaun; Mauer"
-- sabir    Ninja sabir صَابِرْ "patient" (Audio 6030) + TUNICO sabir "geduldig"
-- soura    NUR TUNICO, und dort in ZWEI getrennten Eintraegen:
--            sura = "Sure (des Korans)"  (س)
--            sura = "Form, Aussehen, Bild" (ص)
--          Die Kursglosse "Sure; Form" vermischt beide. Die Uebung steht im Chunk
--          aussprache_1, dem س-Block (daneben sur سور, sin سين, sidi سيدي) --
--          deshalb سُورَة, die Sure. Die ص-Variante ist NICHT angelegt.
-- sin      keine der drei Quellen fuehrt Buchstabennamen. Kein Treffer ist hier
--          das Ergebnis, nicht das Versaeumnis -- steht so in der internal_note.
-- mazel sba7  Phrase, erwartbar kein Woerterbucheintrag.
--
-- AUDIO-FALLE (س gegen ص), zweimal zugeschlagen und beide Male abgefangen:
--   Ninjas "sin"   ist صِينْ   "China"   -> das ist unsere Zeile 1976 siyn, NICHT سِين
--   Ninjas "soura" ist صُورَةْ "picture" -> das ist das ص-Wort, NICHT سُورَة
-- Beiden Neuzeilen wurde deshalb bewusst KEIN Audio angehaengt.

-- =============================================================================
-- (3) SCHRITT 5: INSERT -- 6 Zeilen, ids 4598-4603
-- Generierte Spalten (translit_skeleton, arabic_skeleton, skelett_varianten)
-- nicht mitgeschickt (SKILL.md Rezept 4). lesson_id je Zeile ueber die
-- thematische Nachbarzeile bestimmt, nicht hartkodiert:
--   4598 3rousa      L35 Familie & Personen (wie 1958 sbiyya)
--   4599 sour        L39 Wohnen & Haus      (wie 1003 7it "Wand")
--   4600 soura       L44 Gesellschaft & Religion
--   4601 sin         L43 Arbeit, Schule & Bildung (wie 4146 7arf "Buchstabe")
--   4602 sabir       L34 Farben & Adjektive
--   4603 mazel sba7  L33 Zeit & Kalender    (wie 1478/1849)
--
-- NICHT FAELLIG GESETZT (ausdruecklicher Wunsch Nils): keine progress-Zeile
-- angelegt, keine next_review gesetzt. Gegenprobe nach dem Lauf: 0 progress-Zeilen
-- fuer 4598-4603. Damit stehen die Zeilen in Bucket 0 ("nie gestartet") und
-- tauchen nicht in der Faelligkeitsschlange auf.
-- Das weicht bewusst von der Standardvorlage in COURSE_MODE.md ab, die im selben
-- Zug "progress mitziehen -- fuer next_review = NULL faellig setzen" vorsieht.

-- (INSERT-Anweisung siehe Sitzungsprotokoll; die sechs Zeilen tragen ihre
--  Begruendung jeweils in der eigenen internal_note.)

-- =============================================================================
-- (4) KURSVERKNUEPFUNG, zwei Ebenen
--
-- (4a) course_exercises.vocabulary_id -- 8 weitere Uebungen verknuepft:
--        695 3rusa     -> 4598      697 sur       -> 4599
--        698 sura      -> 4600      699 sin       -> 4601
--        712 sabir     -> 4602      714 ma-zal sba7 -> 4603
--        704 samahni   ->  563 (Bestandszeile, siehe oben)
--        705 sba7      -> 1478 (Bestandszeile, bestimmte Form)
--      pronunciation ohne Verknuepfung: 12 -> 4.
--      Die verbleibenden 4 sind 3 Eigennamen (481 mas3oud, 694 sami, 696 samir --
--      gehoeren nicht in den Vokabelbestand) und 702 "la bas", das dem Nutzer
--      vorliegt (Bedeutung passt zu 252 labes, Schreibung weicht ab).
--
-- (4b) course_lessons.vocab_lesson_refs -- L2 und L4 ergaenzt.
--      Aufgenommen wurde, was die Uebungen der Lektion per vocabulary_id
--      REFERENZIEREN, aber in der Liste fehlte. Kein Textabgleich, also auch keine
--      Homograph-Gefahr (COURSE_MODE.md warnt genau davor) -- die Verknuepfung
--      steht bereits in course_exercises.
--      Beide Teile getrennt geparst und neu zusammengesetzt, weil ein blosses
--      ||','||neue_ids das Pflichtformat ids:...|darija:... zerlegt.
--      L2: 100 -> 120 ids, L4: 63 -> 82 ids. Format danach geprueft:
--      beide passen auf ^ids:[0-9]+(,[0-9]+)*\|darija:

with basis as (
  select cl.id, cl.course_number,
         regexp_replace(split_part(cl.vocab_lesson_refs,'|',1), '^ids:', '') as ids_str,
         regexp_replace(split_part(cl.vocab_lesson_refs,'|',2), '^darija:', '') as dar_str
  from course_lessons cl where cl.course_number in (2,4)
),
alt as (
  select b.id, b.dar_str,
         array(select distinct x from unnest(string_to_array(b.ids_str, ',')) x where btrim(x) <> '') as alt_ids
  from basis b
),
fehlend as (
  select a.id,
         array_agg(distinct e.vocabulary_id::text) as add_ids,
         string_agg(distinct v.darija, ',') as add_darija
  from alt a
  join course_exercises e on e.course_lesson_id = a.id and e.vocabulary_id is not null
  join vocabulary v on v.id = e.vocabulary_id
  where not (e.vocabulary_id::text = any(a.alt_ids))
  group by a.id
)
update course_lessons cl
set vocab_lesson_refs = 'ids:' || array_to_string(a.alt_ids || f.add_ids, ',')
                     || '|darija:' || coalesce(concat_ws(',', nullif(btrim(a.dar_str),''), f.add_darija), '')
from alt a join fehlend f on f.id = a.id
where cl.id = a.id;

-- =============================================================================
-- (5) NICHT ANGEFASST -- 3 tote ids in den refs, Altbestand
--
-- 3672 (L2), 4450 und 4451 (L4) zeigen auf Vokabelzeilen, die es nicht mehr gibt.
-- Sie standen schon vor dieser Runde drin -- die Ergaenzung oben kann keine
-- erzeugen, sie zieht ihre ids aus einem Join gegen vocabulary. Das ist der in
-- SKILL.md gelistete offene Posten "verwaiste ids in course_lessons.
-- vocab_lesson_refs". Nach dem Vorbild von P4 gehoert dazu die Suche nach der
-- Ersatzzeile, nicht das blosse Streichen -- also eine eigene Runde.

-- =============================================================================
-- ABNAHME (gemessen):
--   vocabulary                       3.783   (vorher 3.777, +6)
--   progress-Zeilen fuer 4598-4603       0   (nicht faellig, wie gewuenscht)
--   qualitaets_checks Gruppe A           0   (unveraendert sauber)
--   Check 21                             1   Check 22   231   (beide unveraendert;
--                                            die 6 Neuen sind voll vokalisiert)
--   pronunciation ohne vocabulary_id     4   (vorher 12)
--   vocab_lesson_refs L2 / L4       120 / 82 ids, Pflichtformat intakt
--   verwaiste ids in L2/L4-refs          3   (unveraendert, Altbestand)
