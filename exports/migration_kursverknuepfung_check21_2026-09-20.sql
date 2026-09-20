-- Zwei Runden am 2026-09-20, Projekt lzecflvfalxkodytnwzf (tunsi-trainer / Supabase)
-- (1) vocabulary_id der pronunciation-Uebungen nachgetragen
-- (2) Qualitaets-Check 21 (Verb-Selbstcheck) von 2 auf 1 gesenkt
--
-- =============================================================================
-- (0) BEFUND VORWEG -- eine Fehlannahme korrigiert
--
-- Ausgangsfrage war "course_exercises.vocabulary_id ist zu 91,5 % leer, das muesste
-- man fuellen". Das ist FALSCH. COURSE_MODE.md legt fest, dass das Feld an die
-- pronunciation-Uebungen gehoert ("muss vocabulary_id verlinkt haben"), und genau die
-- sind vom Kurs-SRS ausgenommen (COURSE_SRS_TYPES). Die SRS-Typen sind Satzuebungen:
--
--   translate_de_tn   679 Uebungen,  1 verknuepft   Loesung z.B. "mistir mizyana, ama zghira."
--   grammar_drill     381          , 51
--   fill_blank        312          ,  1
--   answer_pattern    277          ,  1
--   fixed_response    266          ,  0
--
-- Bei einem Satz ist keine einzelne Vokabel gemeint -- das Feld ist dort absichtlich
-- leer, nicht lueckenhaft. Gegenprobe: ein Textabgleich Loesung->vocabulary.darija
-- bringt ueber alle SRS-Typen zusammen 4 weitere Treffer.
--
-- Die echte Luecke war klein und klar umrissen: 21 der 105 pronunciation-Uebungen
-- hatten keine Verknuepfung.
--
-- =============================================================================
-- (1) pronunciation-Uebungen verknuepft -- 9 von 21
--
-- METHODE: Kandidat nur, wenn NEBEN der Schreibung (exakt oder ueber
-- _translit_skeleton) auch die deutsche Glosse uebereinstimmt. Ein Skelett-Treffer
-- allein ist laut SKILL.md kein Wort-Treffer -- die Gegenprobe zeigt warum: zu "sur"
-- (Zaun) liefert das Skelett "sr" sieben Zeilen, darunter "sawwar" (er fotografierte)
-- und "yesir" (sehr), keine davon ist das gesuchte Wort.

with paare(ex_id, vocab_id, grund) as (values
  (700, 4298, 'exakte Schreibung, Glosse "mein Herr" = "mein Herr (respektvolle Anrede)"'),
  (710, 2239, 'exakte Schreibung, Glosse "geschehen, passieren" = "er passiert / er wird"'),
  (711, 1718, 'exakte Schreibung, Glosse "es geschah" = "er passierte / er wurde"'),
  (715,  594, 'exakte Schreibung, Glosse "Saft" = "Saft"'),
  (417, 4073, 'zwei Zeilen mit darija "3am"; Glosse "Jahr" entscheidet gegen 1705 "er schwamm"'),
  (707, 2364, 'Skelett 3sfr + Glosse "Vogel" = "Vogel / Spatz"; Schreibung 3asfur/3asfour'),
  (713,  248, 'Skelett sb7lkhr + Glosse "Guten Morgen" identisch'),
  (706,  507, 'Skelett sfr + Glosse "null (Zahl)" = "null / 0"; Schreibung sfir/sfer'),
  (703, 2099, 'Skelett tns + Glosse "Tunesien"; Schreibung tunis/tounis (u/ou-Konvention)')
)
update course_exercises e
set vocabulary_id = p.vocab_id
from paare p
where e.id = p.ex_id
  and e.exercise_type = 'pronunciation'
  and e.vocabulary_id is null
  and exists (select 1 from vocabulary v where v.id = p.vocab_id);
-- ERGEBNIS: 9 Zeilen. pronunciation ohne Verknuepfung 21 -> 12.

-- NICHT geschrieben, dem Nutzer vorgelegt:
--   702 "la bas" = es geht gut  -> vermutlich 252 "labes" لْبَاس "Gut / Wie geht's?".
--     Bedeutung passt, aber die Schreibung unterscheidet sich um mehr als eine
--     Konvention (Leerzeichen, fehlendes Alif von لا). Nicht geraten.
--
-- 11 ohne Treffer im Bestand, davon 3 Eigennamen (mas3oud, sami, samir -- gehoeren
-- nicht in den Vokabelbestand) und 8 echte Luecken:
--   695 3rusa (Braut; 3677 3irs ist "Hochzeit", nicht dasselbe Wort)
--   697 sur (Zaun/Mauer)          698 sura (Sure/Form)
--   699 sin (der Buchstabe س)     704 samahni (Entschuldige mich)
--   705 sba7 (Morgen -- nur die Phrase 248 "sba7 lkhiyr" existiert, das Einzelwort nicht)
--   712 sabir (geduldig)          714 ma-zal sba7 (Es ist noch Morgen)
-- Neuanlage braucht laut stehender Regel vorher eine Rueckfrage (und die Frage nach
-- der Faelligkeit), deshalb hier nur notiert.

-- =============================================================================
-- (2) Qualitaets-Check 21 -- Verb-Selbstcheck
--
-- Check 21 listet Zeilen, die in ihrer EIGENEN conjugation-Tabelle nicht vorkommen.
-- Zwei Treffer, zwei voellig verschiedene Ursachen.
--
-- FALL 1198 na3mlou "wir machen" -- ERLEDIGT.
-- Die Tabelle schrieb present.1pl als "na3mlu", die Zeile selbst heisst "na3mlou".
-- Entscheidung Nils vom 2026-09-13 (dokumentiert in der internal_note von 4045): die
-- ZEILE gilt, weil sie abgefragt wird und den Lernfortschritt traegt; die Tabelle ist
-- Anzeige. Hier gefahrlos anwendbar, weil KEINE zweite Zeile mit der Schreibung
-- "na3mlu" existiert (geprueft: 0) und in der Gruppe 3ml (1198, 1236, 1272, 1365,
-- 3646, 4165) nur 1198 auf present.1pl zeigt. Genau diese Bedingung war bei 4039/4045
-- verletzt. Die Tabelle haengt an allen sechs Zeilen der Gruppe, deshalb dort ueberall
-- gesetzt -- sonst zeigte der Trainer fuer dasselbe Wort zwei Schreibungen.

update vocabulary
set conjugation = jsonb_set(conjugation, '{present,1pl,darija}', '"na3mlou"'),
    internal_note = concat_ws(' ', internal_note,
      '2026-09-20: conjugation.present.1pl von "na3mlu" auf "na3mlou" angeglichen (Check 21). '
      || 'Die Zeile 1198 na3mlou gilt, die Tabelle ist Anzeige (Entscheidung Nils 2026-09-13). '
      || 'Keine zweite Zeile mit der Schreibung "na3mlu" vorhanden, also kein Fall wie 4039/4045.')
where conjugation->'present'->'1pl'->>'darija' = 'na3mlu';
-- ERGEBNIS: 6 Zeilen (die ganze Verbgruppe), Check 21 von 2 auf 1.

-- FALL 4045 yijra "es geschieht" -- BEWUSST NICHT ANGEFASST, liegt zur Entscheidung vor.
-- جرى traegt zwei Bedeutungen mit derselben Form. An derselben Tabelle haengen
-- 559 jra, 1771 jrit, 1772 nijri, 2465 ejri, 4039 yijri "er laeuft" und 4045 yijra
-- "es geschieht". present.3sg_m hat genau EINE Zelle, und die gehoert 4039. Eine
-- Angleichung an 4045 wuerde 4039 aus der eigenen Tabelle werfen -- am 2026-09-13
-- genau so passiert und wieder zurueckgenommen. Das ist eine Modellgrenze (eine Zelle
-- je Slot, zwei Zeilen), kein Schreibfehler. Loesungswege waeren: eigene Tabelle fuer
-- die uebertragene Bedeutung, ein Ausnahme-Flag wie conj_rotate, oder Check 21 diesen
-- Fall dauerhaft ausnehmen. Keiner davon ohne Entscheidung des Nutzers.

-- =============================================================================
-- (3) Check 22 -- 231 unvokalisierte Einzelwoerter: VERMESSEN, NICHT GESCHRIEBEN
--
-- Potenzial gemessen statt geschaetzt. Kandidatenquelle nach tools/README.md sind die
-- echten Vokalquellen (tunico_import.lemma_chatalpha/variants_chatalpha,
-- peacecorps_dict_import.forms_chatalpha), verglichen ueber _translit_skeleton:
--
--   135 der 231 Zeilen haben ueberhaupt eine Quellform mit passendem Skelett
--        (90 in beiden Quellen, 23 nur Peace Corps, 22 nur TUNICO)
--    96 haben gar keine
--   702 Kandidatenpaare insgesamt, also im Schnitt gut 5 je Zeile
--
-- Das ist eine OBERGRENZE, kein Ertrag -- und eine weiche. Die Stichprobe zeigt, dass
-- das vokalfreie Skelett ueberwiegend Fremdes anzieht, genau wie tools/README.md warnt:
--   1055 menu  (Menue)      -> aman, amana, amani, amin
--   1210 sousa (Sousse)     -> asasi, asasiyya, awussu, sas
--   4370 ysum  (er fastet)  -> asami, asma, aswam, ism
--
-- Es gibt auch keinen schnellen sicheren Teilausschnitt: die 20 Paare, in denen die
-- Quellform ZEICHENGLEICH mit unserer darija ist, tragen per Definition keine
-- zusaetzliche Vokalinformation -- und unsere darija als Solver-Ziel ist laut
-- tools/README.md gerade der falsche Weg (قَلَم gegen قْلَمْ). Nutzbar sind nur die
-- Paare, die ABWEICHEN, und dort steckt die ganze Urteilsarbeit.
-- Check 22 braucht damit eine eigene Runde nach der Runde-63-Methode (REST-Auszug auf
-- Platte, Solver in Node, die sieben Pflichtfilter, Kollisionsprobe).

-- =============================================================================
-- ABNAHME nach beiden Runden (gemessen):
--   vocabulary                        3.777   (unveraendert, keine Vokabel angelegt)
--   qualitaets_checks Gruppe A            0   (unveraendert sauber)
--   Check 21                              1   (vorher 2)
--   Check 22                            231   (unveraendert, bewusst)
--   pronunciation gesamt                105, davon ohne vocabulary_id 12 (vorher 21)
