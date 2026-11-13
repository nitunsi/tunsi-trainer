# Offene Punkte – Stand 10.11.2026 (Abend)

## A. Schreibweise in Kurs und Vokabeln angleichen (Nils)
- Kurs: rund 300 verbartige Wörter mit o/e/ou in rund 700 aktiven Übungen (z. B. ma-noshrob-sh, ma-tqoum-sh, n3oumou, ma-nekol). 53 davon haben eine direkte Tabellenform mit a/i/u.
- Vokabelzeilen außerhalb der Tabellen (Nomen, Wendungen) schreiben noch ou/e/o.
- **Entschieden (Nils 10.11.): überall** – alle Wörter in Kurs und Vokabeln, und die Längenanzeige auch überall.
- Länge (ā/ī/ū/ǟ/ä) auch in Kurssätzen und Lösungen anzeigen. Bisher nur Vokabeln, Tabellen und Regelkarten.
- Vorschlag Prüfung im Trainer: „Kurswort weicht von der Tabellenform ab“.
- **Stand 12.11. später (Vokabeln o → u, ou → u, Kurs, Prüfung erledigt; e → a/i für Wörter mit Audio und langem e erledigt):** 163 + 75 Wörter e → a/i (aus dem Arabischen), lisse bleibt. **Danach (Nils: „generell umstellen, auch Lehnwörter“):** weitere 71 Wörter (Lehnwörter und Wörter ohne Audio) und 99 Phrasen umgestellt, Kurs nachgezogen; Artikel/Partikel (el-, esh, besh, ena, enti) bleiben bewusst; SQL-Prüfung 5 (hathi) vorerst so gelassen (Nils). SQL-Ansicht qualitaets_checks Nr. 5 kennt noch die Ausnahme hethi statt hathi (Treffer 878). Sicherungen backup_2026_11_12_* (ab 22.11. löschen), Plan-Tabellen plan_2026_11_12_*, Hilfsfunktion public.kurs_ersetzen (nach Abschluss löschen).
- **Stand 12.11. (Vokabeln „ou“ → „u“ erledigt):** 495 Zeilen umgestellt, Lehnwörter bleiben (15), Ausnahmen bis Klärung: gouandouet, dekhel ba3dhou. Tabelle mazel-Familie und Lektions-Verweise (course_lessons.vocab_lesson_refs) nachgezogen. Sicherungen backup_2026_11_12_ou, _ou_conj, _ou_refs. Noch offen: einzelnes „o“ (292 Zeilen, Liste mit Ist/Soll), Kurstexte/Übungen, Prüfung „Kurswort weicht von Tabellenform ab“, Hinweis: Kurstext „hut“ gegen Vokabel „7uth“ (Prüfung zeigt es jetzt).

## B. Kurs
- Regelkarten ab L7 in Häppchen: D1 (L7), E3 (L8), Y1/Y2 (L9), E1/E2 (L10), F7 (L11), R1/K1/K2 (L12), B1/B2/Q2 (L13).
- L6: lange Übungen (qaid_fragen2, modalverben_fragen, Partizip-Drills, 200–330 Zeichen).

## C. Offene Entscheidungen
- Semia: 3asser, barresh, rakkedh, tza33ab, qarrit, lazim, nghammedh.
- barbash Plural ybarbshu oder ybarbishu; qbil Präsens I. oder III. Stamm.
- tsawwar/tfakkar: Präsens nitsawwar gegen titsawwir; Vorsilbe y- (belegt) gegen ni-/ti-.
- tulid 3pl: tuldu oder tūlidu.
- hani jet → hani jit (1270).
- Endung -a am Wortende, Stand 11.11.: Nils hört jä, bkä, nsä, bdä, blä (Anzeige stimmt) und ya ohne ä (Ausnahme gesetzt). Endung -ya nie ä (Nils 11.11., gilt auch für mya). Noch offen, Nils hört später: wfa, fsa, kra (Verb und Nomen). Audio-Links hat Nils.
- Vorsilbe mit/ohne Vokal als Häppchen (nahbat gegen n7ibb, Sukun gegen Fatha auf dem n) und „ou“ → ū in Regelformeln: bei G bzw. A.

## D. Technik und Aufräumen
- Skill-ZIP neu packen, Datum in CLAUDE.md (Stand noch 07.11.).
- Sicherungstabellen backup_2026_11_10_* ab 21.11. löschen.
- Supabase: DO-Blöcke lösen eine Rückfrage aus, die nicht ankommt → einfache UPDATE/INSERT-Befehle nehmen. In SKILL.md festhalten.
- Neue Verbfamilien bekommen kein Arabisch für die Tabellenformen automatisch (Generator ist im Code, aber nicht angebunden).

## E. Wurzeln (nach A; Nils 10.11.: „klingt gut“)
Stand: Verben 818 von 824 mit Wurzel, übrige Vokabeln (~3.000) 0.
1. Wurzeln für Nomen/Adjektive eintragen (Vorschlag aus dem Arabischen erzeugen; Lehnwörter/Partikeln ausdrücklich „keine Wurzel“). Erst als Vorschlag zeigen.
2. Wortfamilie auf jeder Karte (alle Vokabeln mit gleicher Wurzel unter dem Wurzel-Block).
3. Stämme verbinden (kassar ↔ tkassar, 3allim ↔ t3allim), Häppchen „II. → V. Stamm“.
Später, wenn 1 steht:
4. Musterkarten (ma·1·2·a·3 = Ort, ma·1·2·u·3 = Partizip Passiv).
5. Plural nach Muster (kteb → ktub).
6. Wurzel-Lexikon unter Mehr.
Prüfungen (jeweils erst vorschlagen):
- wurzel_ar-Buchstaben in Reihenfolge im Arabischen des Wortes
- gleiche Wortfamilie, unterschiedliche Wurzel
- Verben ohne Wurzel (6)

## F. ~~Ausgeblendetes~~ – ERLEDIGT 12.11. (189 Kursübungen und 81 Vokabeln gelöscht, 99 + 4 Vokabeln wieder eingeblendet; Sicherungen backup_2026_11_11_*, ab 22.11. löschen)
(alter Stand zur Erinnerung:)
Stand: 184 Vokabelzeilen ausgeblendet (13 davon mit Audio), 189 Kursübungen ausgeblendet (meist Konjugations-Drills).
Optionen, zu entscheiden:
- behalten wie jetzt (nicht abgefragt, nicht geprüft, Lernstand bleibt)
- nach einer Frist löschen (z. B. nach dem 21.11. wie die Backups), vorher Liste zeigen
- einzeln durchsehen: lohnt sich eine Zeile als Wechselkarte oder Häppchen?
Vor dem Löschen beachten: Audio der 13 Zeilen auf die sichtbare Zeile derselben Form übertragen; Kursverweise und Lernstand prüfen (Prüfung „Verwaiste Verweise“).
Bei A (Schreibweise) die ausgeblendeten nicht mitziehen, wenn sie gelöscht werden sollen.

## G. Lektion 14 „Arabisch lesen“ erweitern: ā/ǟ-Regel (Nils 11.11.)
Ziel: Nils soll verstehen, woran man im Arabischen Länge und Klang erkennt, um besser zu lesen.
Nils 11.11.: Es gibt schon eine Lektion „Arabisch lesen“ (L14, 128 Lückenübungen: Alif-Lam, Zähne, Bögen, Punkte, Formen, Wortende, Sonderbuchstaben, Vokalzeichen, Hamza, Vorsilben). Keine neue Serie, sondern L14 ergänzen.
Stand L14: lehrt Buchstaben, Punkte, Kurzvokale, Sukun, Schadda, Tanwin, „ا/و/ي nach Kurzvokal = langer Vokal“ (Chunk lesen_vokalzeichen, 10 Übungen). Fehlt: Länge und Klang in unserer Anzeige (ā/ī/ū, ā dunkel gegen ǟ hell, -a am Wortende kurz/ä, Sonderfälle وْ mit Sukun, stummes Alif nach و, آ, ى). Die Lektion nutzt noch alte Schreibweise (kteb, korsi, setta, zouz).
Vorschlag: neuer Chunk lesen_laenge in L14 als Häppchen-Regelkarten (Frage/Antwort/ein Satz) + Anzeige in den Antworten mit ā etc.; zusätzlich Vorlesen-Karten mit Audio. Schreibweise in L14 beim Angleichen (A) mitziehen. Optional kurze Lesehilfe-Seite (Mehr → Lesehilfe).
Inhalt (aus SKILL.md „Vokallänge“ und laengeSlots):
- Lang: ا / و / ي nach passendem Vokalzeichen (شَافْ shāf, يْشُوف yshūf, بِيع bīi3); kurz: Fatha/Kasra/Damma allein.
- Sonderfälle: وْ mit Sukun = langes ū, stummes Alif nach Schluss-و (كتبوا), آ am Wortanfang, ى am Ende (kurz).
- Klang: ā dunkel neben ص ض ط ظ ق خ غ ر ح ع (shrāb), ǟ hell sonst (shǟf); -a am Wortende kurz, hell = ä (mshä).
- Üben: Karten „Lang oder kurz?“ und „ā oder ǟ?“ mit Audio.

## I. Aus früheren Listen und dem Skill (nachgetragen 12.11., Nils: „Audio Backup z. B.“)
**Audio-Sicherung abschließen und Ninja-Ordner verkleinern** (beschlossen 2.11., steht in SKILL.md → Offene Punkte), Reihenfolge einhalten:
1. Sicherung in Colab durchlaufen lassen (`tools/audio_sichern.ipynb` → `paket_NNN.tar` + `manifest.csv` in Nils' Drive). Danach `DROP VIEW public.audio_sicherung_liste;` und Colab-Zugriff auf Drive entziehen (myaccount.google.com/permissions).
2. Wiederherstellung testen (Stichprobe ~20 Dateien je Quelle, manifest.csv durchspielen, eine Aufnahme über Ersatz-Ordner im Trainer abspielen).
3. Erst danach Ordner `ninja-audio` verkleinern (446 Dateien nötig, 991 / 374 MB überflüssig; Löschen per Storage-API-Skript in Colab mit Service-Key, Liste vorher zeigen).
Status heute: unbekannt, ob Schritt 1 gelaufen ist (Nils fragen).
Weitere Punkte, die nicht in A–H standen:
- ERLEDIGT 12.11.: Hörlisten-Aufnahmen und 7arra durchgesehen (2 ersetzt, 16 Audio entfernt, shrab 4195 zugeschnitten 0,25–0,75 s, 7arra ok; Sicherung backup_2026_11_12_audio, _audio4195).
- Semia: lazim/yilzim (Vokabel 1501, Karten 2466/2467), tqeldi, si'lit, tisbe7 (854, das e), nghammedh, qarrit, 7ara (2150: Peperoni oder „Vierzahl“), plausible Ausrufe als Vokabeln (vorher fragen, ob fällig).
- Übersichtskarte „Wort + Verb im Präsens“ (n7ibb, yilzim, najjem, khalli): Platz in der Lektion, Belegsatz für yilzimha timshi.
- Wort des Tages / Wochenleiste auf der Lernen-Seite (nur wenn gewünscht).
- Bewusst so gelassen: Vokabeln 4732–4745 nicht fällig; Regelkarten 2474–2484 (L12/L13) nicht freigeschaltet, bis Nils dort ist; Prüfung 22 (Einzelwörter ohne Vokalzeichen) nur in der SQL-Ansicht; Gruppen 1–6 bleiben.
- Offene Entscheidung: -ou nach Konsonant in Tabellen (3andou, 7lou sind Suffix, kein Plural): nur mit Wortart-Prüfung angehbar. Gehört zu A.
- Zurückgestellt: Ninja-Transliteration in Trainer-Konvention (kein Bedarf).
- Prüfdurchgang: exports/pruefliste_2026-09-12.md (Fundlisten), qualitaets_checks live ziehen.

## Reihenfolge nach der Pause
A (Schreibweise überall + Länge überall) → E1/E2 → B → Rest.

- Semia: Arabisch von jey (جَايْ) und ija (إِجَا) auf den Karten J1c/J1d prüfen; es gibt dazu keine Vokabelzeile (ggf. anlegen, vorher fragen).
- taf taf (4672, 4673): Nils hört langes dunkles ā, Anzeige jetzt ā (Ausnahme LAENGE_DUNKEL). Nicht für Semia (Nils 11.11.). Arabisch ist abgeleitet, nicht belegt; wir fragen sie nicht danach.

## H. Arabisch der Tabellenformen: Rest (Nils 11.11.: „rest erstmal auf todo liste“)
Stand: rund 3.560 Tabellenformen mit abgeleitetem Arabisch (ar_abg). Es fehlt bei 13 Wechselkarten-Formen in 4 Familien:
- 3asser (6): wartet auf Semia.
- tsawwir, tfakkir (je 3): Präsensformen uneinheitlich (nitsawwar/titsawwir gegen ytsawwer); erst Formen klären, dann Arabisch.
- wallat (1): niwalliw – nachsehen, warum der Generator abbricht (mehrfach/II).
Ausserdem Tabellenformen, die nie als Wechselkarte vorkommen (Grundformen ohne Vokabelzeile mit vokalisiertem Arabisch): Stichprobe, ob dort Arabisch fehlt.
Sicherungen: backup_2026_11_11_ar2, _ar3, _ar4 (ab 22.11. löschen).

## J. Vokabeln ohne Arabisch (Nils 13.11.) – ERLEDIGT 13.11. (115 Zeilen aus der Tabellenzelle übernommen, Notiz „abgeleitet“; Sicherung backup_2026_11_13_ar_leer; Prüfung: bestehende Prüfung „ohne Arabisch, Umschrift oder Deutsch“ nimmt Wechselkarten nicht mehr aus, PR 417)
Stand 13.11.: 115 sichtbare Vokabelzeilen haben kein arabic_script. Alle sind Wechselkarten-Formen mit Konjugationstabelle (ids ab 4747, z. B. qrubt, wlidt, duqt, brit, ji3t; Perfekt 1sg/2sg), 36 davon mit Lernstand, keine mit Audio. Die Tabellenzelle trägt meist schon `ar`/`ar_abg`; vorgesehen: Arabisch aus der Zelle in die Vokabelzeile übernehmen (als Vorschlag zeigen, Ist/Soll, ar_abg-Kennzeichen beachten: abgeleitet, nicht belegt), mit Prüfung „Vokabel ohne Arabisch“ im Trainer (Ziel 0).
Offen vorher klären: Arabisch bei 1sg/2sg identisch (z. B. ktibt) – eine Zeile pro Person, Arabisch gleich, Homonym markieren?

## Reihenfolge-Vorschlag 13.11.
1. J (Arabisch fehlt) – klein, mit Prüfung, macht Wechselkarten vollständig.
2. Skill-ZIP + CLAUDE.md-Datum – 10 Minuten, hält die Regeln synchron.
3. E (Wurzeln Nomen/Adjektive) – groß, Vorschläge in Etappen.
4. B (Regelkarten ab L7), G (L14 ā/ǟ-Kapitel), Semia-Fragen laufend.

## K. Audios herunterladen (Nils 13.11.)
Alle Audios (Ninja, Sprachenlernen24, TUNICO, eigene) lokal bzw. in Nils' Drive sichern, damit der Trainer nicht von fremden Servern abhängt. Gehört zu I (Audio-Sicherung in Colab, `tools/audio_sichern.ipynb`): Status klären (lief Schritt 1?), danach Restore-Test, danach Ordner `ninja-audio` verkleinern. Neu zu klären: sollen die Aufnahmen vom Trainer künftig aus der Sicherung statt von den Quellseiten abgespielt werden?

## E (Fortschritt 13.11.): Wurzeln für Nomen/Adjektive
Stand 13.11.: 1.928 Vokabeln mit Wurzel (vorher 921), 50 als „keine Wurzel“ (Lehnwörter, Namen, Partikel; wurzel_quelle beginnt mit „keine:“), 1.950 noch offen. Vorgehen: TUNICO-Abgleich über Konsonantengerüst, Wurzel nur bei genau einem Eintrag mit passender deutscher Bedeutung (Hilfstabellen plan_w_cand, plan_w_final2; Funktionen wurzel_lat/wurzel_arab, löschen nach Abschluss). Sicherungen backup_2026_11_13_wurzel_t1/_t2/_rest. wurzel_geprueft bleibt false.
Noch offen: (a) 195 Wörter mit genau einer TUNICO-Wurzel ohne Bedeutungsbeleg, (b) 146 unklare + 21 mehrdeutige, (c) gut 1.500 ohne TUNICO-Treffer (zweite Runde aus dem Arabischen), (d) Wörter mit w/y-Wurzel, deren Gerüst abweicht (matar t-y-r von Hand), (e) Familienvergleich: 410 Wurzeln mit ≥2 Wörtern, größte k-t-b (23), m-sh-y (13), b-r-d, 3-m-l, 3-l-m (je 12) – auf Ausreißer prüfen; (f) Prüfungen (erst vorschlagen): wurzel_ar-Buchstaben in Reihenfolge im Arabischen (bei Gemination Shadda beachten), gleiche Wortfamilie mit unterschiedlicher Wurzel; (g) Lehnwörter mit Wurzel nachtragen als „keine“ (Stichproben: farmasi, makina, stik, jwilya).
Zurückgestellt: ukht, wthin, massu, khit (426), yezzi (1907) – Wurzel von Hand.

### E: Vorbereitet 13.11. (in der Datenbank, noch nichts geschrieben)
- plan_w_lehn (25): Wörter mit TUNICO-Wurzel, deren französische Bedeutung dem Wort gleicht (Lehnwort-Verdacht) → „keine Wurzel“ vorschlagen: milyar, radio, film, sardina, bankaji, kamyuna, kartaba, marshi, numru, bank, makina, balkun; dazu von Hand mitru, sikritir. Bleiben mit Wurzel: Namen/Herleitungen (tunsi, libi, marruki), Arabisches (muslim, imam, sukkur, dinar).
- plan_w_c3 (192): genau eine TUNICO-Wurzel, aber keine passende deutsche Bedeutung → durchsehen, Probe: überwiegend richtig, Ausreißer 3tawni, faks (Lehnwort).
- plan_w_fam (176): Wörter ohne Wurzel, deren arabisches Konsonantengerüst (exakt / ohne Vorsilbe / ohne Endung) zu einer schon vergebenen Wurzel passt → Wurzel der Familie übernehmen (97 exakt, 43 ohne Endung, 36 ohne Vorsilbe).
- plan_w_arab (778 in Stufen A 301 / B 87 / C 99 / D 291): Gerüst aus dem Arabischen. Stufe A (genau 3 Konsonanten) ist nur etwa zu zwei Dritteln richtig (Plurale auf -at, Lehnwörter, Verbformen): nur als Vorschlagsliste zum Durchsehen, nicht automatisch schreiben.
- Familienvergleich: k-t-b, t-w-l, 3-l-m, b-3-d, b-r-d, w-l-d geprüft (tali auf t-l-w korrigiert).

### E: Zweiter Durchgang 13.11. (Punkt 1, TUNICO über Varianten und Formen)
Abgleich über lemma/variants/inflected (Plural, Dual) für Wörter ohne Treffer: 53 Wörter, 43 Wurzeln geschrieben (Quelle „(Variante/Form)“, Sicherung backup_2026_11_13_wurzel_p2), 8 als „keine“ (talvza, pisinat, fistat, tnabir, mak, fih, hakkaka, hathukum), natsha offen.
**Korrektur der Zählung:** Von 1.893 offenen Zeilen sind 1.107 Wortverbindungen/Sätze (brauchen keine Wurzel), 53 Lehnwörter, 444 haben noch einen TUNICO-Kandidaten (192 ohne Bedeutungsbeleg, rund 170 mehrdeutig/unklar, Rest Verb-/Ortsformen), nur etwa 290 Einzelwörter kommen in TUNICO gar nicht vor (nicht „gut 1.500“). Stand: 1.966 mit Wurzel, 63 „keine“.

### E: Stand 13.11. abends
Wurzeln 2.158 (Familie übernommen 130, TUNICO-Bedeutung locker, von Hand ausgewählt 62), „keine Wurzel“ 1.186 (1.107 Wortverbindungen + Lehnwörter/Namen/Partikel), offen 578. Sicherungen backup_2026_11_13_wurzel_fam / _c3 / _phrasen / _p2 / _rest / _t1 / _t2. Wurzel nicht geschrieben (c3, rund 130): Ausreißer-Rate ca. 50 % (TUNICO-Bedeutung passt nicht), nur von Hand auswählen. Offen: ca. 290 Einzelwörter ohne TUNICO, ca. 170 mehrdeutig, ca. 130 aus c3, natsha, khit, ukht, wthin, massu, yezzi, khanfus, kashkul, sbars, jzayri(yya).
Nach Abschluss löschen: Hilfstabellen plan_w_*, plan_tunico_tok, plan_2026_11_13_*, Funktionen wurzel_lat, wurzel_arab, kurs_ersetzen.

### E2 erledigt 13.11.: Wortfamilie unter dem Wurzel-Block (PR 419). Zeigt Nomen/Adjektive zuerst, ohne Verbformen/Wechselkarten/Ausgeblendete, max. 8 (+N). Noch offen: E3 Stämme verbinden (kassar ↔ tkassar), später Muster/Plural/Lexikon.

### E2b: homonyme Wurzeln (13.11., Nils: ni7lif zeigte Alfagras und Schwein als Familie)
Neue Spalte vocabulary.wurzel_gruppe (leer = Hauptgruppe); die Wortfamilie zeigt nur gleiche Wurzel + gleiche Gruppe. Gesetzt: alfagras/schwein (7-l-f), esel (7mar), seide (7rir), frei (7urriyya), schwimmen (3uma), dumm (ablad, blid), kamel (jmal), heuschrecke (jrada), kapern (kabbar), grossvater (jadd, jadda, jaddat, jdud Großväter); bustaji, fatura, ghadi auf „keine“; 7it auf 7-y-t. Sicherung backup_2026_11_13_wurzel_gruppe. Noch offen: restliche Familien durchsehen (plan_w_verdacht: 280 Einzelgänger in 111 Familien, Heuristik ungenau; die Familien mit 3 bis 7 Wörtern ab k-r-t bis z sind noch nicht gesichtet).

### E2b Fortsetzung 13.11.: restliche Familien (3 bis 9 Wörter ab k-r-t, alle Zweier-Familien) gesichtet; weitere Gruppen gesetzt (u. a. fisch, wolke, samstag, messer, zucker, schwager, bein, bild, mauer, blume, eile, spritze, bitter, dickkopf, baas, widder, salat, schwaegerin, ja, sahur, tafel, alaun, sack, fahrkarte, weg); Lehnwörter/Namen auf „keine“ (almaniyya, alman, amrikeniyya, amriken, makina, marshi, marshiyat, bank, bankaji, batata, jirba, sikritara, sikritir, milyar, radio, film, sardina, kamyuna, kartaba, numru, balkun, mitru, nimsawi(yya), sbabit, sbabti, siman); mthallma auf th-l-m. Sicherungen backup_2026_11_13_wurzel_gruppe2/_3. Nicht gesichtet: Familien mit 10+ Wörtern (k-t-b, m-sh-y, w-l-d, 3-m-l …) und Einzelgänger ohne Familie.

### E: Prüfung „Wurzelbuchstaben nicht in Reihenfolge im Arabischen“ gebaut 13.11. (PR 422, Ziel 0, Ausnahmen WURZEL_AR_OK mit Grund). Noch offen: Prüfung „gleiche Wortfamilie, unterschiedliche Wurzel“ (Vorschlag), 578 offene Wurzeln von Hand.

### E: Prüfung „gleiche Familie, andere Wurzel“ geprüft 13.11.: Abgleich über das Konsonantengerüst liefert 47 Cluster, fast nur Zufallstreffer (Weak-Buchstaben fehlen im Gerüst) → nicht gebaut. Stattdessen von Hand: Lehnwörter/Namen auf „keine“ (umu, biru, imayl, mayu, banu, malyun, libya, libi, libiyya, duru), ukht auf ʔ-kh-w. Sicherung backup_2026_11_13_wurzel_dritte.

### E: Einzelwörter von Hand durchgearbeitet 13.11. (Nils: „arbeite das so durch, ich prüfe im Lernen“)
Sechs Gruppen (backup_2026_11_13_wurzel_hand1…hand6): Wurzeln nach Arabisch/Kenntnis gesetzt (wurzel_quelle „von Hand (Nils 2026-11-13, im Lernen prüfen)“), Lehnwörter/Pronomen/Fragewörter/Namen/Nationalitäten/Partikel auf „keine“. Offen blieben 41 Einzelwörter mit unklarer Wurzel: shiraz, swari, mrawil, duwwiyu, jrana, ya7ra, yalkallak, tsha3bat, na7bu7, fnyan, bal3uth, malya, glayyib, bgalbu, tashyi7, natsha, wamya, fas, rayidh, qurdha, shalba, nazalli, 7uth, ma3buka, farzazzu, mbalbaz, fad, m7ar7ir, nayy, madhmut, mkashbar, tkhalwidh, huksh, badhrut, m7azraz, mwazwiz, shih/shiha/shihin, msugir/msugrin, yufa, washwasha. Beim Lernen melden, wenn eine Wurzel falsch wirkt.

### G: Lautgesetz-Karten angelegt 13.11. (L14, Abschnitt lesen_lautgesetze, Übungen 2542–2548, Karten LG1–LG7: th-Laute, ج, ق/ڨ, Hamza, aw/ay, Kurzvokal-Ausfall, ā dunkel/hell; regelkarte.hochsprache=true; grammar_notes-Abschnitt „Laute: Hochsprache und Tunesisch“, chunk_order ergänzt; Sicherung backup_2026_11_13_l14). NICHT freigeschaltet (course_exercise_progress je Karte fehlt, bewusst). Offen: Audio-Beispiele, Freischalten, Vorlese-Karten; später Musterkarten (Wurzel + Schablone).
Fund beim Anlegen: In Regelkarten-Meta stehen noch „ou“-Reste hinter ** (z. B. yilz**mou**, Y1): die Kurs-Umstellung hat Wörter mit ** geteilt. Prüfen/umstellen: meta.regelkarte tabelle/bsp/text.

### A: „ou“-Rest in Kurstexten erledigt 13.11. (abends)
course_lessons.grammar_notes/dialog_text (14 Lektionen) und Regelkarte 2446 auf „u“ umgestellt; geschützt: Journal, Sousse, Bourguiba (auch fi-bourgiba), Mou7sin, radyou. Erklärsätze von Hand (L1, L14, Endungstabellen, yifhim + u, langes ū in L5/L8/Karte 2446), 3allouch → 3allush, houwa → huwwa. Sicherungen backup_2026_11_13_ou_rest_lekt / _ou_rest_meta (ab 27.11. löschen). Trainer-Prüfungen: alles 0 außer 3asser (Semia). Offen: e → a im Kurstext ((h)ethuma → hathuma), bouliss ↔ bulis; Prüfung „alte Schreibung“ auf Regelkarten-Meta/Lektionstexte ausweiten (Vorschlag). SKILL.md: Wurzel-Konventionen, DO-Blöcke, Textersetzung ergänzt; ZIP neu gepackt.

### Anzeige Länge/Klang (13.11. abends, Commits 5a440f3 … 5858897)
- Länge/Klang jetzt auch in Kurssätzen, Lösungen, Dialogen und in Phrasen ohne volles Arabisch (Wort für Wort aus den Vokabeln). Grammatiknotizen noch nicht.
- hatha/hathi/hathuma/hathika/hathukum/hathaka: hǟ-, Endung -a (Nils). Offen: hathaka als hǟthǟka oder hǟthaka.
- Wortende: ä nur bei Verbformen und schwachem Wurzelende (y/w/ʔ, nicht geminiert); sonst a (shnuwwa, huma, tawwa, banka). wfa nicht heraushörbar (bleibt wfä nach Regel). Bekannte Grenze: Verbformen in Phrasen, die in keiner Tabelle stehen (tetmanna), enden auf a; walla „oder“ wird in Phrasen wie das Verb wallä behandelt.
- e → a in grammar_notes (id 3, 7, 9): (h)eth… → (h)ath…, hethuma → hathuma; Sicherung backup_2026_11_13_eth_lekt (ab 27.11. löschen).
- Vokalisierung: Probelauf in exports/vokalisierung_probe_2026-11-13.md (418 Zeilen: A 58 sicher, B 10 mit Artikel, C 140 teilweise, D 210 offen). Nichts geschrieben. Nächster Schritt: A/B nach Durchsicht schreiben, C/D per Solver (tools/vokalisierer.js) + Gegenprobe; teilvokalisierte Einzelwörter (تُرقُد) erfasst der Probelauf noch nicht.
- Lehnwörter (Nils 13.11.): a vor zwei Konsonanten kurz trotz Alif (banka, fanta, taxi, fransa …), Liste LAENGE_LEHN in trainer.html; faranda zeigt fāranda (erstes a in offener Silbe bleibt lang – prüfen), gouandouet unverändert (alte Schreibung, Ausnahme offen).
- twansa (2105): Arabisch تْوَانْسَة, Anzeige twǟnsa. Vokalisierung Gruppe A (58 Phrasen) geschrieben, Notiz „Vokalzeichen aus den Einzelvokabeln abgeleitet“; Sicherung backup_2026_11_13_vok_a (ab 27.11. löschen). Viele dieser Phrasen sind weiter nur teilweise vokalisiert (Wörter mit einzelnen Zeichen blieben). Offen: Gruppe B (10) zeigen, C/D per Solver.
- Vokalisierung Gruppe B (10) geschrieben, ohne Artikel-Schadda (Bestand: 104 ohne, 16 mit); Sicherung backup_2026_11_13_vok_b.
- Altes e in Phrasen: 79 Zeilen umgestellt, bestätigt durch das eigene Arabisch (backup_2026_11_13_phr_e). Offen laut exports/phrasen_e_probe_2026-11-13.md: 37 Widersprüche (Phrase vokalisiert a, Einzelvokabel i: najjem, tkallem, bekri, -ek = -ak/-ik), 58 ungeprüft, 190 von Hand; el khdem (Berufe) und dekhel ba3dhu bewusst ausgelassen. Danach Solver (tools/vokalisierer.js kennt noch o/ou).
- Altes e in Phrasen, zweiter Teil (Nils: 3andik; Einzelvokabel gilt): weitere 94 Zeilen umgestellt, bei 18 das Arabisch angeglichen (a → i), Sicherung backup_2026_11_13_phr_e2. Nach dem Arabischen statt der Vokabel: tzad (1944), wakhkhir (2732), 7adhdhir (3568), el-ysar (2830, 2836), ta7riq (3233), salim (1515). Arabisch noch mit a trotz i in der Umschrift: 1740, 2404, 2405, 2408, 2409, 2532, 2902, 2930, 3075, 3211, 2410, 3317. Offen: 190 Zeilen von Hand (Gruppe X), el khdem, dekhel ba3dhu; danach Solver.
