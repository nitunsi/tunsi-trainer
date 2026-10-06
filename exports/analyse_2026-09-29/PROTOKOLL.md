# Analyse Tounsi Trainer — Protokoll vom 2026-09-29

Der Durchlauf selbst war unbeaufsichtigt und rein lesend (**Supabase:** nur `SELECT` und
`EXPLAIN`, kein Schreibzugriff, `trainer.html` unverändert). Die Umsetzung danach lief mit
deiner Freigabe Schritt für Schritt, ihr Stand steht direkt unten im **Nachtrag**. Der Rest
des Dokuments ist der Befund von 06:30 UTC und wurde nicht umgeschrieben.

Alle Zahlen sind live gezogen, Stand 2026-09-29 ~06:30 UTC. Sie veralten, deshalb gehören
sie nicht in die Regeldateien.

---

## Nachtrag — Stand nach der Umsetzung (2026-09-29, abends)

| Was | Stand |
|---|---|
| B1–B5 (Kurs-Prüfung, Freischaltung, Löschen, Backup, Flaggen) | **Eingebaut und gemergt:** PR #86, Commit `1c9c2a3` auf `main`. Der Patch `trainer_fixes.patch` ist damit umgesetzt und nur noch Beleg. |
| `http`-Extension (C3) | **Entfernt** (`DROP EXTENSION http`, Migration `drop_unused_http_extension`). Es waren 19 Funktionen, nicht 14 (siehe C3). Der erste Versuch per `REVOKE` blieb wirkungslos, weil die Funktionen `supabase_admin` gehören (Migration `revoke_http_extension_from_api_roles`, ohne Wirkung). Kontrolle danach: `login_user` läuft, Gruppe A der Qualitäts-Checks bei 0, Zeilenzahlen unverändert. |
| Offline-Warteschlange (B6) | **Erledigt** (PR folgt): abgelehnte Einträge (400/404/409/410/422) werden beiseitegelegt, Icon zeigt `⚠ n`, Klick bietet Verwerfen an. |
| MC-/Sätze-Modus (B7) | **Erledigt** (PR folgt): aus dem Menü genommen, Code bleibt liegen. |
| 6 „verwaiste“ Grußformeln (C2) | **Korrektur:** Die Übungen 96–101 sind absichtlich lektionsübergreifend und laufen im Modus 🔗 Antwort-Paare (lädt alle `fixed_response`). „Im Trainer nicht erreichbar“ war falsch. **Übung 96 gelöscht** (exaktes Duplikat von 84, Wiederherstellung: `exports/loeschung_uebung96_2026-09-29.sql`). Übung 98 („sa77a“) trägt den deutschen Erklärtext von 97 (Gesundheit nach dem Essen), der von den Bedeutungen in der Vokabelliste abweicht (nach Dusche/Hammam/Schwimmen …). **Entschieden: bleibt so.** |
| Didaktik (B8) | **Entschieden:** falsch → Level 0 bleibt. |
| Datenbank offen für jeden mit der URL (C3, Punkt 5) | Bewusst so gelassen (Zwei-Personen-App, privater Link). |

**Nach dem Merge geprüft (Nils im Browser, Kontrolle per Lesezugriff auf die Datenbank):**
- Flaggen: id 246 „3aslema“ ist geflaggt, es gibt nur diese eine Zeile mit der Schreibung ✓
- Neu angelegte Vokabel wieder gelöscht: Gesamtzahl 3.784 wie vorher, keine verwaisten
  `progress`-Zeilen ✓. Nicht getestet: Löschen einer Vokabel **mit** Kurs-Verknüpfung
  (bei einer neu angelegten hängt nie eine Übung dran).
- Kurs-Antwort: zwei `grammar_drill` (Selbstbewertung) richtig beantwortet, Level 1 gespeichert ✓.
  Nicht getestet: die geänderte Textprüfung (` — `-Übungen sind noch nicht freigeschaltet).
- Export: `tounsi_backup_2026-09-29.sql` geprüft. Zeilenzahlen stimmen mit der Datenbank
  überein (u. a. 3.784 Vokabeln, 2.110 `progress`, 269 `course_exercise_progress`), kein
  `TRUE` mehr in `progress`, keine Passwort-Hashes, Stichprobe von je zwei Zeilen pro
  Tabelle besteht die Typprüfung per `EXPLAIN`. Nicht geprüft: jede einzelne Anweisung,
  und ein echtes Einspielen in eine leere Datenbank.

---

## Nachtrag 2 — Stand 2026-10-01

Alles danach lief mit deiner Freigabe pro Schritt; jede Datenbankänderung mit Guard `feld = alt`, danach per frischem Abruf geprüft. Belege und Undo (alt → neu je Feld) liegen in `exports/analyse_2026-10-01/` und `exports/anweisungen_nachgetragen_2026-09-30.sql`.

| Was | Stand |
|---|---|
| Kurs-Ansicht, Hinweis-Karten, Dialog-Label „Frage zum Dialog“, Knopf „📖 Dialog“, langer Strich in Lösungen (`courseSolutionCore`) | **Gemergt**, PR #87–#92. Beim kurzen Strich war mein erster Test (#86) wirkungslos; erst #91 hat 224–228 lösbar gemacht. |
| Korrekturen Durchgänge 1–4 (9, 55, 16 `passives_partizip`, 689/690) | **Geschrieben**, Beleg `anweisungen_nachgetragen_2026-09-30.sql` |
| 238 Dialog-Fragen Karte für Karte geprüft | 183 ✓ · 15 ✗ · 20 ✎ · 20 ⚠. **43 Felder in 39 Karten korrigiert**, `dialogfragen_pruefung.md`. Alle 238 Antworten sind `source = constructed`. |
| Transliteration im Kurs gegen die Trainer-Regeln | **410 Übungsfelder (334 Übungen) + 23 Lektionsfelder umgestellt**, 139 Wortpaare, 433/433 getroffen. `translit_vorschlag.md`, `translit_aenderungen.json`. |
| Demonstrativa, `7aja`, `7ashti` | **13 Felder:** `hethi`/`hetha` nach Genus, `haza` → `7aja` (Tippfehler), Name Hadi und `hathaka` bleiben. `demonstrativa_*`. Offen: `bi-hara` in Übung 1403. |
| `nazzim` → `najjim` („können“) | **19 Felder** (16 Übungen, 3 Lektionen); `nazzim` = „organisieren“ bleibt (1524, 1759, Kurs 9). `najjim_*`. |
| Stichprobe Karten im Trainer (92 Kurskarten, alle 975 textgeprüften, 3.784 Vokabeln) | Anzeige ohne Befund. **Befund:** 43 Karten mit zweiteiliger Lösung (`A / B`) wurden bei vollständiger Eingabe als falsch gewertet. |
| Fix `checkAnswer` | **Gemergt**, PR #94: ganze Lösung wird zusätzlich akzeptiert; alle 975 nehmen die eigene Lösung an (vorher 58 Ablehnungen). |
| 15 Karten `kongruenz_gegenteil` (1066–1080) | `fill_blank` → `answer_pattern` (Selbstbewertung), `gegenteil_typwechsel.sql`. |
| Dialog-Fenster bei Fragen zum Dialog | **Gemergt**, PR #95: nur der passende Dialog/Text statt aller. Zuordnung aus dem Text abgeleitet: 235 von 238 eindeutig, 3 zeigen zwei Blöcke. |
| Lückentext: ergänzte Wörter in der Lösung hervorgehoben | **Gemergt**, PR #96. 97/97 Lückenkarten markieren genau so viele Stellen wie Lücken. |
| Sicherheit: `http`-Extension | Entfernt (siehe Nachtrag 1). |

**Noch nicht im Browser getestet** (Nils testet, sobald die Karten fällig sind): Eingabe der ganzen Lösung bei Zahlen-Paaren, Selbstbewertung bei Gegenteil + Plural, Dialog-Fenster-Filter, Markierung der Lückenwörter.

**Offen:** `bi-hara` (Übung 1403); Regel-Ergänzung für `COURSE_MODE.md` (siehe F7), dazu neu: „Kurs-Transliteration nach Trainer-Regeln, `najjim` = können“; `yhibb` → `y7ibb` (Karte 215), Vokale nicht angefasst.

---

## Nachtrag 3 — Stand 2026-10-02

Wie Nachtrag 2: jede Datenbankänderung mit Freigabe, Guard `feld = alt`, Neuabruf zur Kontrolle. Belege/Undo in `exports/analyse_2026-10-01/`.

| Was | Stand |
|---|---|
| Vokabel-Lernen: nie gestartete Vokabeln nicht mehr automatisch vorschlagen | **Gemergt**, PR #98. Neue Vokabeln kommen nur dran, wenn die Fälligkeit manuell gesetzt wurde; sonst „Alles erledigt“. |
| Kurs-Wiederholung in 10er-Blöcken, „Nochmal“ im Kurs-/Mix-Modus, **keine automatische Freischaltung** neuer Abschnitte | **Gemergt**, PR #99. Freischalten nur über „Diesen Abschnitt jetzt freischalten“ in der Kurs-Ansicht. Vorher lief „Nochmal“ im Kurs-Modus über die Vokabel-Logik („Keine Vokabeln fällig“). |
| Fälligkeit zählt nach **Berliner Kalendertag**, nicht nach Uhrzeit | **Gemergt**, PR #100. Termin heute 03:00 ist ab 00:00 lernbar; die gespeicherte Uhrzeit (03:00) bleibt. Gilt für Vokabeln und Kurs (Queue, Statistik, Level-Aufstieg, Vorziehen). „Nächste Wiederholung: heute noch“ bei einem Termin um 01:00 des Folgetags war ein Rundungsfehler und ist behoben. |
| Prüfung der heute im Quellenabgleich angelegten/fällig gesetzten Vokabeln (12 + 4606) | 4606 `malik` war Mischeintrag „Engel; König“, jetzt nur **König** (Ninja-Audio, Quelle ninja). Fünf weitere Korrekturen: 3147 `khsara`, 2327 `7ajjem` (english), 4157 `fannan` („/“ in der Klammer), 1523 `sghar` (english), 4539 `zad`. Sieben waren in Ordnung. |
| Partner-Queue: 3749 `a7na mananesh` von Semia abgelehnt („ein na zu viel“) | **`manash`** (TUNICO `mānāš`): Vokabel 3749 (arabic `احنا ماناش`, Status zurück auf `pending`), Übungen 171/124/169, Lektion 2. Die Rückmeldungen 3748 (Kommentar `mahiash`) und 2658 `we7a` („unbekannt“, Ninja/TUNICO/Peace Corps belegen `wa7a`) brauchten keine Änderung außer unten. |
| `e7na` → `a7na` im Kurs | 29 Felder. `e7na` kommt nirgends mehr vor. |
| Pronomen im Kurs an die Vokabeln angeglichen | 180 Felder: `houa`/`huwwa`/`huwa` → `houwwa`, `heya`/`hiya` → `hiyya`, `huma` → `houma`, `intuma` → `entouma`, `inti` → `enti`. `pronomen_angleichung.json`. |
| `ana` → `ena` im Kurs | 63 Felder. **Nicht ersetzt:** `ana` als Fragewort „welche(r)“ (`fi-ana waqt`, `ana bit zghir? illi …`, 41 Stellen). Vokabeln 494 `heya` → `hiyya` (هِيَّ), 3338 `inti bidek` → `enti bidek`. |
| 3748 „sie ist nicht“ | Variante ergänzt: `hiyya mahish / hiyya mahiyash`, arabic `هِيَّ مَهِيشْ / هِيَّ مَاهِيَاشْ`. **Nur `mahish` ist in Ninja/TUNICO belegt**, `mahiyash` beruht auf Semias Kommentar und der Aussprache (Semia schreibt `mahiash`, das Quiz akzeptiert es per Tippfehler-Toleranz). |

**Beim Schreiben aufgefallen:** `execute_sql` lief bei längeren `internal_note`-Texten wiederholt in Zeitüberschreitungen oder wurde abgebrochen (3748); kurze Einzelanweisungen gingen durch. `vocabulary.ninja_id` hat einen Fremdschlüssel auf `derja_ninja_import`, nicht auf `derja_ninja_entries` — für das Ninja-Audio genügen `ninja_audio_url/start/end`.

**Offen:** Vokabel `khsir` („er verlor“) fehlt im Verbmodell (nur `khsart`, `yikhsar`); die sieben Ninja-Sätze mit `ana` als „ich“ (Vokabeln) tragen noch `ana`, die Pronomen-Vokabel heißt `ena`; `bi-hara` in Übung 1403; Regel-Ergänzung für `COURSE_MODE.md` (siehe Nachtrag 2, dazu: Kurs-Pronomen nach den Vokabeln, `ana` = Fragewort nicht ersetzen); `yhibb` → `y7ibb` (Karte 215).

---

## Nachtrag 4 — Stand 2026-10-03

Nur Trainer-Code, alles gemergt.

| Was | Stand |
|---|---|
| Statistik → Prüf-Aktivität: Block nicht anzeigen, wenn nur „✅ Letzte 7 Tage“ zutrifft | **Gemergt**, PR #103. Der Block erscheint bei Vorschlag, Falsch, Unklar, Kommentar, Prüfungen oder überfälliger Prüfung. |
| Prüf-Aktivität: Überschrift mit „Vor x …“ immer anzeigen | **Gemergt**, PR #104. Die Kopfzeile steht immer, das Kachel-Raster nur, wenn etwas zu tun ist. |
| **Folgefehler der Pronomen-Angleichung (Nachtrag 3):** Raster der Konjugationsübungen zeigte `ana` | `ena n7ib` | **Behoben**, PR #105. Der Code kannte die Pronomen fest (`GRAMMAR_DRILL_PERSONS`, `parseGrammarDrillSolution`: `ana, houa, heya, e7na`), erkannte die neuen Schreibungen nicht und setzte sein altes Label vor die ganze Lösung. Jetzt `ena, enti, houwwa, hiyya, a7na, entouma, houma`, alte Formen bleiben als Fallback. Geprüft an allen 381 Konjugationsübungen (72 als Raster, alle stimmig). Nils hat es am Handy auf der Produktivseite bemerkt. |
| Konjugationsübung: beim Aufdecken die Fragetabelle ausblenden | **Gemergt**, PR #106. Es bleibt eine Tabelle (die Lösung) statt zwei. |
| Kurs, walla-Fragen (18 Karten, Kurs 4): „Hinweis zeigen“-Knopf | **Ganz ausgeblendet**, PR #107/#108: kein Knopf und keine Tounsi-Ausgangswörter (`courseHintFirst`-Zweig), nur die deutsche Frage und das Eingabefeld. Dazwischen war ich zweimal anders gelesen (Wörter ganz weg → Wörter direkt gezeigt → wieder weg); Nils wollte den Hinweis insgesamt nicht. |
| Plural-Karten (587, 2043–2050): „Jetzt im Plural:“ → „Plural:“ | **9 Zeilen geschrieben**, `plural_anweisung.sql`. |
| Typ-Label „Lücke füllen“ ohne Lücke | `courseTypeLabel`: ohne `___` im Prompt „Umformen“ (195 Karten) oder „Übersetzen“ (6, Anweisung beginnt mit „Übersetze“); „Lücke füllen“ bleibt für 96. Auch im Lektions-Test. |
| Zu lange Anweisungen (Kurs-Karten) | Nisba-Karten (532–540) gekürzt; danach **alle langen Anweisungen**: 201 Karten, 42 verschiedene Texte, mittlere Länge 94 → 56 Zeichen. Muster und Wortlisten bleiben, nur die Floskeln gehen („Bilden Sie … nach dem Muster“ → „Kurzdialog nach Muster“). Dabei in 310 `inti`/`ana` → `enti`/`ena` (Pronomen waren in `instruction` nicht erfasst) und `xrif` → `khrif`, `Fruehling` → `Frühling`. `anweisungen_gekuerzt.json` (Undo = neu → alt), 201/201 getroffen, Neuabruf ohne Abweichung. |
| Partner-Queue („Prüfen“): neue Reihenfolge, **`pending` nur noch von Hand** | Code (Branch, bei Merge live): **1.** fällig vor nicht fällig (nur ja/nein, Kalendertag, Lernstand von Nils), **2.** Partner-Status: pending vor übersprungen vor ohne Status, **3.** Quellenlage: unbestätigte zuerst (`belegStufe`), **4.** Fälligkeitsdatum, älteste zuerst; ohne Datum zufällig. Vorher: pending > übersprungen > ohne Status, Fälligkeit nur innerhalb des Status. Fälligkeit = fest der Lernstand von Nils (Konstante `PARTNER_QUEUE_DUE_USER_ID`), unabhängig vom angemeldeten Nutzer. `pending` wird **nirgends mehr automatisch gesetzt**, auch nicht beim manuellen Anlegen; Nils setzt es nur noch von Hand, die Queue berücksichtigt es weiter. Daten: **alle 75 `pending` → ohne Status** (Undo: `pending_zu_null_ids.json`, enthält id und `status_updated_at`; Zurücksetzen = `partner_status = 'pending'` für diese ids). |
| Kurs-Karten ohne deutsche Übersetzung in der Antwort | **Geschrieben:** 19 Negations-Karten (151–169, `negation_uebersetzung.json`), 145 Antworten-Karten (`answer_pattern`, Format `Tounsi (Frage — Antwort)` → die Karte zeigt „Frage auf Deutsch / Deine Antwort (Tounsi) / Antwort auf Deutsch“; `antworten_uebersetzung.json`) und 16 Umform-/Lücken-Karten (`… — Übersetzung`, `umform_uebersetzung.json`). **Quellenabgleich gegen die Uni-Wien-Rohdaten (`uniwien_source_pages`) und TUNICO:** 996 `is-sibba` war ein Übertragungsfehler für `iṣ-ṣʕība` (→ `is-s3iba`, „die schwierigen Wörter“), 998 `yjib` für `yġīb` (→ `yghib`, „abwesend sein“, vorher falsch übersetzt), 999 `ysib` für `yṭīb`/`yfīb` (→ `ytib`, „gar werden“), 1126 `masit` = „fad“ (TUNICO), 1312 `ghalla` = „Obst“ (nicht Getreide). Alle fünf korrigiert (`uniwien_korrekturen_antworten.json`). **Lückendialoge 1315–1319:** `yšīx` = „sich amüsieren“ (Uni Wien I S. 84 und II S. 104, TUNICO `shakh`), Ort `bāb bḥar`/`bāb swīqa` = Tore der Medina von Tunis; Übersetzungen ergänzt (`luecken_dialoge_uebersetzung.json`). In 1315 stand `yshuf`/`ybat` (3. Person), die Aufgabe verlangt aber (2.P.Sg.) → `tshuf`/`tbat` korrigiert. Die Übersetzungen stammen von Claude und sind nicht gegengelesen. **Dialogfragen:** alle 238 (Kurs 4–13, `fixed_response`, chunk_key `dialoge*`) haben jetzt `meta.prompt_de`/`meta.solution_de` (`dialogfragen_uebersetzung.json`, Guard `meta IS NULL`); der Trainer zeigt beim Aufdecken „Frage auf Deutsch / Antwort auf Deutsch“ (`courseMetaGermanHtml`, auch im Lektions-Test). Unsicher: 895 `b-rabbi` (ohne Zusatz übersetzt), 1566 `flayr` und 1571 `sallush` unübersetzt, 1553 `harabish` = „Medikamente“ vermutet, 1572 „Café Mribat“. |

**Lehre für `COURSE_MODE.md`:** Eine Schreibänderung an Kursdaten (hier die Pronomen) kann an fest im Code stehenden Listen scheitern. Vor dem Schreiben im `trainer.html` nach der alten Schreibung suchen (`grep`), nicht nur in der Datenbank. In dem Fall stand sie an genau einer Stelle (`GRAMMAR_DRILL_PERSONS`).

**Offen:** unverändert wie in Nachtrag 3.

---

## Kurzfassung — die fünf Punkte, die zählen

| # | Befund | Wirkung | Status |
|---|---|---|---|
| 1 | **200 Kurs-Übungen lassen sich nicht richtig beantworten.** Die Lösung trägt die deutsche Übersetzung als Anhang (`tishrub qahwa walla tay? — Trinkst du Kaffee oder Tee?`), `checkAnswer` vergleicht gegen den ganzen String. | Richtige Antwort wird als falsch gewertet → Level 0. Noch **keine** davon freigeschaltet, du läufst aber darauf zu (141 `fill_blank`, 59 `translate_de_tn`). | Fix im Patch, an allen 991 textgeprüften Übungen nachgerechnet |
| 2 | **Kurs-Freischaltung setzt gelernte Übungen auf Level 0 zurück**, sobald zu einem schon freigeschalteten Abschnitt eine neue Übung dazukommt (Upsert mit `merge-duplicates` über den ganzen Chunk). | Latenter Datenverlust. Heute kein Abschnitt betroffen, aber der erste Nachtrag löst es aus. Beispiel aus der Simulation: 1 neue Übung in „begruessung" → 8 Übungen auf L3+ zurück auf L0. | Fix im Patch, simuliert |
| 3 | **🗑 im Bearbeiten-Sheet löscht erst den Lernstand, dann die Vokabel**, und das zweite scheitert bei Kurs-Verknüpfung. PR #79 hat das nur im Duplikat-Manager repariert. | Lernstand (beider Nutzer) weg, Vokabel bleibt stehen, rohe Constraint-Meldung. | Fix im Patch (gleicher Weg wie `deleteDupeVocab`) |
| 4 | **Das „Vollbackup (restore-fähig)" lässt sich nicht einspielen** und ist unvollständig: `progress.last_correct` wird als `TRUE` exportiert (Spalte ist `timestamptz`), und es fehlen `course_exercise_progress`, `chunk_order`, `chunk_key`, `vocabulary_id` (Kurs), außerdem Audio, Konjugation, `homonym_ok`, Belege und Notizen (Vokabeln). | Im Ernstfall kommt der Vokabel-Fortschritt nicht zurück, der Kurs-Fortschritt gar nicht. | Fix im Patch, per `EXPLAIN` belegt: alt scheitert, neu besteht die Typprüfung |
| 5 | **Die Datenbank ist für jeden mit der URL offen.** RLS-Policies stehen durchgehend auf `true` für `anon`, der Login ist clientseitig. Session-Restore vertraut nur dem Nutzernamen aus `localStorage`. | Wer die Vercel-URL kennt, kann alles lesen, ändern und in 10er-Schritten löschen (der Massenlösch-Trigger bremst nur). Die Passwort-Hashes sind korrekt gesperrt. | **Entscheidung von dir nötig**, siehe unten |

Dazu kommen kleinere Bugs (Flaggen trifft die falsche Zeile, 16 Wörter mit Apostroph
brechen den Flaggen-Knopf, u. a.), siehe Abschnitt B.

---

## A · Was genau gelaufen ist

- `trainer.html` (8.433 Zeilen, ein Skriptblock): Syntaxprüfung per `vm.Script` ✓.
  Gründlich gelesen: Antwortprüfung, SRS-Kern, Laden/Paging, Offline-Queue/Sync, Login/Session,
  Partner-Modus, Übungsmotor (Karten, MC, Korrektur-Knöpfe), Statistik, Kurs-SRS (Laden,
  Freischalten, Prüfen, Korrektur), Bearbeiten/Löschen/Anlegen, Aktivierung, Quellenabgleich
  (Fällig-Setzen, Anlegen), Export/Backup.
  Nur überflogen: Vokabelliste/Bulk-Leiste, Transliterations-Helfer und -Screen,
  Prüfungen-Screen, Kurs-Übersicht/Browse/Test-Tab, Lektionen-Admin, Paare-Modus.
- Datenbank: `qualitaets_checks`, Security- und Policy-Lage, Fremdschlüssel, Trigger,
  Konsistenz Kurs/Vokabeln/Progress, Nutzungsdaten.
- Nachrechnungen außerhalb des Kontexts: Kursübungen per REST (GET, anon-Key) auf die Platte,
  `checkAnswer` über `tools/extract.js` aus `trainer.html` gezogen (23 Regeln ✓) und gegen
  alle Lösungen laufen lassen.

---

## B · Befunde im Code

Zeilennummern beziehen sich auf den aktuellen `trainer.html` (Stand `a396200`).

### B1 — Kurs: deutscher Anhang macht Übungen unlösbar · hoch · Fix im Patch
`chkCourseEx` (Z. 5372) ruft `checkAnswer(val, exercise.solution)`. `normalize` entfernt
Klammern (deshalb sind die 11 Lösungen mit `(deutscher Satz)` am Ende unproblematisch),
aber nicht den Teil nach ` — `.

Nachgerechnet an allen 991 `translate_de_tn`/`fill_blank`:
- heute: **200** Lösungen lehnen ihre eigene Tounsi-Antwort ab (141 fill_blank, 59 translate).
- mit Fix (`solution.split(' — ')[0]`): **0** Ablehnungen, **0** deutsche Übersetzungen
  fälschlich akzeptiert. Angezeigt wird weiterhin die ganze Lösung mit Übersetzung.

### B2 — Kurs: Freischalten überschreibt Fortschritt · hoch (latent) · Fix im Patch
`courseEnsureFrontierUnlocked` (Z. 4949) hält einen Chunk nur dann für freigeschaltet,
wenn **jede** SRS-Übung eine Progress-Zeile hat. Kommt eine Übung dazu, passiert eins von
zwei Dingen:
- vorheriger Chunk gemeistert → `courseUnlockChunk` schickt **alle** Übungen des Chunks
  mit `correct_count:0` und `merge-duplicates` → gelernte Übungen fallen auf L0;
- sonst → die neue Übung wird nie freigeschaltet, der Chunk gilt nie als gemeistert, und
  **alle folgenden Chunks bleiben gesperrt**.

Das gilt auch für den 🔓-Knopf (`courseManualUnlockChunk`). Der Fix schaltet nur fehlende
Übungen frei (`ignore-duplicates`) und zieht teilweise freigeschaltete Chunks sofort nach.
Stand heute: kein Chunk teilweise freigeschaltet, der Fehler hat also noch nicht zugeschlagen.

### B3 — Löschen im Bearbeiten-Sheet · hoch · Fix im Patch
`deleteVocabSheet` (Z. 4616) löscht `progress` aller Nutzer vorab, dann die Vokabel. Bei
den heute 149 Vokabeln mit Kurs-Übung scheitert das zweite (`course_exercises.vocabulary_id`,
ON DELETE NO ACTION). Das Vorab-Löschen ist überflüssig, denn `progress` hängt per CASCADE
dran. Der Fix übernimmt 1:1 den Ablauf aus `deleteDupeVocab` (PR #79).

### B4 — Backup nicht restore-fähig · hoch · Fix im Patch
`buildBackupSQL`, Z. 6237: `last_correct` wird als `bool` geschrieben. Per `EXPLAIN` gegen
die echte Tabelle geprüft:
`ERROR 42804: column "last_correct" is of type timestamp with time zone but expression is of type boolean`,
das heißt **jeder** progress-INSERT im Backup scheitert. Mit Fix besteht die Typprüfung.

Fehlend und im Patch ergänzt: Tabelle `course_exercise_progress`; `course_lessons.chunk_order`;
`course_exercises.chunk_key`/`vocabulary_id`; bei `vocabulary` die Spalten `english`,
`ninja_audio_*`, `ninja_checked_at`, `homonym_ok`, `internal_note`, `external_confirmed(_source)`,
`conjugation`, `conj_rotate`, `created_at`.
Bewusst **nicht** aufgenommen: `ninja_id`, `tunico_verb_id`, weil deren Fremdschlüssel auf
Quelltabellen zeigen, die nicht im Backup sind (Restore in eine leere DB bräche sonst ab).
Die generierten Spalten (`translit_skeleton` …) rechnet Postgres selbst.
Weiterhin nicht im Backup: `import_entscheidungen` (386 Zeilen) und die Quell-Importtabellen.
Das wäre eine eigene Entscheidung.

Hinweis: `fetchAllPaged` (Export) prüft nicht gegen `content-range`, anders als
`sbApiPaged`. Das ist nicht im Patch, weil es nur beim Export greift.

### B5 — Flaggen trifft bei gleicher Schreibung die falsche Zeile · mittel · Fix im Patch
Die Flaggen-Knöpfe in MC (Z. 2480), Prüfen-Leiste (Z. 2603) und Weiter-Leiste (Z. 2674)
gehen über `toggleFlag(tr)` → `vocabIdMap[tr]`. Das ist die **letzte** id mit dieser
Schreibung. Heute gibt es **24 Schreibungen mit 48 Zeilen**, bei der Hälfte flaggt der Knopf also
die andere Zeile. Bei `conj_rotate`-Karten steht dort die konjugierte Form, dann flaggt er
gar nichts oder ein fremdes Wort, das zufällig so heißt.
Zusätzlich brechen **16 Wörter mit Apostroph** (`sou'al`, `yis'al` …, 5 davon aktiv) in der
Prüfen-Leiste das `onclick` (unescaptes `'`). Der Fix nimmt überall `toggleFlagById(v.id)`,
das es für den Kurs schon gibt, und damit sind beide Probleme erledigt.
Rest (nicht im Patch): Die Anzeige „geflaggt ja/nein" (`flaggedVocab`, Z. 662) ist weiter auf
die Schreibung geschlüsselt und kann bei Homonymen falsch leuchten.

### B6 — Offline-Queue kann sich festfressen · mittel · offen
`syncFlush` (Z. 1565) bricht beim ersten Fehler ab, weil es „Netz weg" annimmt. Ein Eintrag,
der aus inhaltlichen Gründen dauerhaft scheitert (HTTP 4xx, z. B. Vokabel inzwischen
gelöscht → FK-Fehler beim POST), blockiert alle späteren Einträge für immer. Das ⏳-Icon
zählt dann nur noch hoch. Vorschlag: bei 4xx den Eintrag in einen „Fehler"-Store
verschieben statt `break`. Nicht im Patch, weil es eine Verhaltensentscheidung ist.

### B7 — Kleinere Punkte
- **Bearbeiten-Sheet legt Progress an** (Z. ~4567): Speichern einer nie gestarteten Vokabel
  (z. B. nur Tippfehler im Deutsch) erzeugt eine `progress`-Zeile mit `next_review NULL`.
  Die Vokabel fällt damit aus dem „neue Wörter"-Topf von `buildSrsQueue`. Heute 59 solche
  Zeilen. Level-Feld `ei-lvl` hat `max="5"`, das SRS kennt 0–6 (Z. 8381).
- **MC-Modus schreibt kein SRS**: `aMC` loggt nur `review_log`, ruft `srsAnswer` nicht.
  `review_log` enthält keine einzige `mc`/`sentences`-Zeile, beide Modi werden also nicht
  genutzt. Entweder SRS nachrüsten oder die Modi aus dem Menü nehmen.
- **Partner-Check**: `partnerAct` (Z. 2071) ohne try/catch und ohne Sperre gegen
  Doppeltippen (überspringt dann eine Karte). Ein leerer Kommentar beim Nachbearbeiten löscht
  den alten nicht. Die Fälligkeits-Abfrage (Z. 1794) filtert `progress` nicht nach Nutzer
  (Semia hat 10 Zeilen, praktisch folgenlos).
- **Quellenabgleich „Anlegen"** (Z. 8237): Knopf wird während des Speicherns nicht
  gesperrt, Doppeltippen legt die Vokabel doppelt an. Neu angelegte Zeilen landen nicht in
  `ALL_VOCAB`, sind also bis zum Neuladen nicht bearbeitbar.
- **Kursinhalte**: 14 `translate_de_tn` laufen in Gegenrichtung (Tounsi-Prompt, deutsche
  Lösung, ids 873–884 …), was funktioniert, aber falsch typisiert ist. 77 von 87 Lückentexten
  verlangen den **ganzen Satz**, nicht nur die Lücke. Beides ist Inhalt, nicht Code.
- `homonymNote`/`synonymNote` escapen nicht (anders als `schreibungNote`), ebenso die
  Partner-Karten. Das ist nur mit euren eigenen Daten ein Thema.
- `smoothSchedule`: Zähler `skippedWindow` wird nie erhöht (kosmetisch).

### B8 — Didaktische Beobachtung (keine Fehler)
Falsch = sofort **Level 0**, egal von wo. Eine L6-Vokabel (90 Tage) fällt nach einem
Vertipper auf „morgen". Übliche SRS-Varianten gehen 1–2 Stufen zurück. Mit 1.367 Vokabeln
auf L6 lohnt die Überlegung. Die Korrektur-Knöpfe fangen Vertipper zwar ab, aber nur, wenn
man sie drückt.

---

## C · Befunde in der Datenbank

### C1 — Qualitäts-Checks
`qualitaets_checks`: **Gruppe A komplett 0.** Gruppe B: Check 21 = 1 (id 4045),
Check 22 = 64 unvokalisierte Einzelwörter. Rest 0.

### C2 — Konsistenz (alles nur gezählt, nichts geändert)
| Prüfung | Treffer |
|---|---|
| Kurs-Übungen ohne Lektion und ohne Chunk (ids 96–101, `fixed_response`, Grußformeln) | 6, im Trainer nie erreichbar |
| `pronunciation` ohne `vocabulary_id` (481 mas3oud, 694 sami, 696 samir: Eigennamen) | 3 |
| Kurs-Übung zeigt auf gelöschte Vokabel | 0 |
| doppelte `position` je Lektion | 0 |
| `progress` mit Level außerhalb 0–6 | 0 |
| Vokabeln ohne Arabisch / Deutsch / mit Leerzeichen am Rand | 0 / 0 / 0 |
| Lektion 25 „Kurze Phrasen", Lektion 90 „TUNICO-Import (unsortiert)" | je 0 Vokabeln |
| Ids 26–33 (`___ tounsi.` usw.): Lösung `ena / enti / houa` akzeptiert jedes der drei Pronomen, auch wo nur eines passt | Inhalt prüfen |

Vorschläge (nicht ausgeführt, bräuchten deine Freigabe): die 6 verwaisten Grußformel-Übungen
einer Lektion/einem Chunk zuordnen oder löschen; die 3 Eigennamen bewusst ohne Vokabel lassen.

### C3 — Sicherheit
- **RLS ist wirkungslos**: Auf allen App-Tabellen erlauben die Policies `ALL` mit `true`
  für `anon`, teils doppelt (`allow all` + `app_access`). `anon` darf `users` ändern (z. B.
  `is_admin`, `password_hash` überschreiben) und `vocabulary` löschen.
  `password_hash` ist für `anon` korrekt nicht lesbar ✓ (`login_user` als SECURITY DEFINER).
- **Session-Restore** (Z. 1667) meldet an, wer in `localStorage` einen Nutzernamen stehen hat,
  ohne Passwort und ohne Token. Registrierung ist offen.
- **`http`-Extension im Schema `public`, 19 Funktionen für `anon` ausführbar** (im ersten
  Durchlauf stand hier 14, das waren nur die mit `http` im Namen; dazu kamen `urlencode` ×3,
  `text_to_bytea`, `bytea_to_text`): Damit konnte jeder über eure Datenbank beliebige
  HTTP-Requests absetzen. Das war das Einzige hier, was über „jemand verändert unsere
  Vokabeln" hinausgeht. **Erledigt, siehe Nachtrag: Extension entfernt.**
- Massenlösch-Schutz (`trg_prevent_mass_delete`, max. 10 Zeilen) fehlt auf
  `course_exercise_progress`, `import_entscheidungen`, `peacecorps_candidates`,
  `uniwien_source_pages`.
- Supabase-Advisor zusätzlich: 10 SECURITY-DEFINER-Views, 16 Funktionen ohne festen
  `search_path`, `pg_trgm`/`fuzzystrmatch` in `public`, Materialized View `quellen_lemmata`
  per API lesbar, `vocabulary_backup_2026_07_25` mit RLS aber ohne Policy (gewollt gesperrt,
  vermutlich löschbar), dazu die zweite Sicherung `vocabulary_backup_2026_08_02`, die offen ist.

Einschätzung: Für eine private Zwei-Personen-App mit unbekannter URL ist das ein bewusst
tragbares Risiko, und ein echter Umbau (Supabase Auth + Policies auf `auth.uid()`) wäre
ein eigenes Projekt. Die `http`-Rechte sind inzwischen erledigt (siehe Nachtrag).

Beobachtung aus dem Entzugsversuch: Funktionen, die Erweiterungen mitbringen, gehören
`supabase_admin`, und `postgres` kann deren Rechte nicht entziehen. Der Befehl läuft dann
ohne Fehlermeldung durch und tut nichts. Immer mit `has_function_privilege` gegenprüfen.

---

## D · Nutzung (Nils)

- Lerntage in den letzten 30 Tagen: **31 von 31** (jeden Tag).
- Wochen seit 20.07.: 900–1.700 Antworten/Woche. Trefferquote stieg von ~70–77 % (Juli/Aug)
  auf **82–84 %** seit Mitte September. Kursanteil seit 07.09.: 220–340/Woche.
- Vokabel-Level (gestartet): L1 13 · L2 40 · L3 84 · L4 113 · L5 419 · **L6 1.367**.
  Nie gestartet: 1.748 von 3.784.
- Jetzt fällig: Vokabeln 0, Kurs 29.
- Kurs: 23 Chunks freigeschaltet (Lektionen 1–3). Die 200 Übungen aus B1 liegen alle
  **hinter** dieser Front.
- `review_log`: nur `flash` (14.832) und `course` (926). 117 `flash`-Zeilen ohne Vokabel
  stammen von gelöschten Wörtern (SET NULL), das ist in Ordnung.

---

## E · Der Patch

`exports/analyse_2026-09-29/trainer_fixes.patch`, 5 Änderungen an `trainer.html`:
B1, B2, B3, B4, B5. Keine Versionsnummer geändert.

Geprüft:
- `git apply --check` gegen `a396200` ✓, Syntax per `vm.Script` ✓
- B1: 991 Lösungen nachgerechnet (siehe oben)
- B2: Simulation mit echten Kursdaten + einer eingeschobenen Übung: alt 9 Zeilen
  `merge-duplicates` (8 gelernte), neu 1 Zeile `ignore-duplicates`, neue Übung freigeschaltet
- B4: `EXPLAIN` gegen die Live-Tabellen: alt Fehler 42804, neu alle fünf INSERT-Arten ✓
- B3, B5: nur gelesen, nicht im Browser geklickt

**Eingebaut:** PR #86 (Commit `1c9c2a3`). Der Patch ist nur noch Beleg, ein erneutes
`git apply` würde fehlschlagen.

---

## F · Entscheidungen

1. ~~Patch einbauen~~ — **erledigt** (PR #86).
2. ~~`http`-Extension~~ — **erledigt**, entfernt.
3. ~~Offline-Queue (B6)~~ — **erledigt**, abgelehnte Einträge werden beiseitegelegt.
4. ~~MC-/Sätze-Modus~~ — **erledigt**, aus dem Menü genommen.
5. ~~Grußformel-Übungen 96–101~~ — **erledigt** (96 gelöscht, Text von 98 bleibt wie er ist).
6. ~~Didaktik (B8)~~ — **entschieden:** falsch → Level 0 bleibt.
7. Regel-Ergänzung — **offen:** für COURSE_MODE.md: „Kurslösungen: Übersetzung nie mit ` — ` an eine
   textgeprüfte Lösung hängen" (bzw. mit Fix egal) und „Übungen zu freigeschalteten Chunks
   nachtragen erst nach Fix B2".

---

## Nachtrag 5 (2026-10-05) · Restpunkte

- **1403:** `bi-hara` → `b-hara` (Konstruktion `7ashti b-…`, Vokabel 4322 `hara`; kein Quellenbeleg).
- **Ninja-Sätze:** `ana` → `ena` in den Vokabeln 2628, 2647, 2982, 2983, 2990; 3337 `ana bidi` bleibt.
- **Karte 215:** `yhibb` → `y7ibb` (nur diese Karte, die übrigen `yhibb`-Stellen bleiben).
- **`khsir`:** gestrichen (keine Karte verlangt es).
- **Regeln** in `COURSE_MODE.md` ergänzt (Pronomen, Transliteration, Übersetzungs-Anhang).
- Undo: `exports/analyse_2026-10-01/restpunkte_undo.sql`.
- **Karte 895:** `meta.solution_de` „Sie trinken Kaffee.“ → „Sie trinken Kaffee, bitte.“ (`b-rabbi` = Vokabel 1393 `brabbi`, „Bitte“, extern bestätigt). Damit entfällt die Unsicherheit bei 895.
- **Audio (Code):** Audio der aktuellen und der nächsten drei Karten wird vorgeladen (`audioPreloadAhead`, Cache pro URL); neuer Schalter „🔊 AN/🔇 AUS“ neben „TR AN/AUS“ (Vokabel-Lernen und Kurs, `localStorage` `audio-autoplay`, Standard aus) spielt das Wort beim Aufdecken/Prüfen ab. Getestet mit gestubbtem `Audio` im Browser (Reihenfolge, Start/Ende, Schalter); Wiedergabe mit echten Ninja-Dateien und iOS-Safari nicht getestet.
- **Audio-Schalter (Layout):** vor dem Prüfen ersetzt der Schalter (nur 🔊/🔇, gleiche Breite wie die Flagge) den Flaggen-Knopf in der unteren Leiste; nach dem Prüfen steht die Flagge wieder in der Aktionsleiste, der Schalter nicht.
- **Kurs-Übersicht:** neuer Kasten „Fälligkeit gesetzt“ (Kurs-Übungen und Vokabeln: Anzahl und Prozent, = next_review vorhanden) und pro Lektion „Fälligkeit x/y (p %)“ bei den Übungen. Vokabeln nur gesamt (nicht pro Lektion).
- **Kurs-Übersicht (Änderung):** statt „Fälligkeit gesetzt“ jetzt dieselben vier Prozentwerte wie in der Statistik (📅 Anteil mit Fälligkeit, ⭐ Punkte/Maximum) für Vokabeln (nur mit Kurs-Bezug über `vocab_lesson_refs`) und Kurs-Übungen, gesamt und pro Lektion. Kurs: „gestartet“ = Fortschrittszeile (wie in der Statistik), Vokabeln: `next_review` gesetzt.
- **Kurs-Übersicht (Layout):** größere Schrift (Prozent fett 1,05 rem, Zähler 0,78 rem), Spalten 📅/⭐ mit Kopfzeile im Gesamt-Kasten, Statistik pro Lektion über die volle Kartenbreite, größerer „Öffnen“-Knopf. Per Screenshot bei 390 px geprüft.
- **Kurs-Übersicht (Reihenfolge):** überall Vokabeln zuerst, dann Übungen (Gesamt und pro Lektion).
- **Kurs-Übersicht (Farbe):** Prozentwerte mit 100 % erscheinen grün, sonst gold.
- **Statistik-Seite (Umbau):** neuer Kopf „Heute fällig“ mit zwei Knöpfen (Vokabeln → Vokabelkarten, Kurs → Kurs-Wdh., mit Anzahl fällig, bei Vokabeln „· N gesperrt“); Prüf-Aktivität direkt darunter; Gesamtfortschritt im Stil der Kurs-Übersicht (📅/⭐, 100 % grün, Phasenzeile Neu/Anfänger/Fortgeschr./Profi); Vorziehen kompakt unter den Fällig-Balken; Glätten und „Alle neu berechnen“ unter „Weitere Werkzeuge“ (Vorschau „bis zu N Einträge“, Obergrenze, nicht die exakte Zahl); Lernaktivität mit Kopfzeile Heute / richtig heute / Ø pro Tag (davon Kurs); größere Schrift in den Überschriften. Mit Teststaten und Screenshot bei 390 px geprüft, nicht mit Echtdaten.
- **Statistik (Nachbesserung):** Kopfzeile „Heute / richtig heute / Ø pro Tag“ in der Lernaktivität wieder entfernt; Fußzeile zweizeilig (Versuche · % richtig / davon Kurs · Vokabeln geübt); „Level-Verteilung pro Lektion“ komplett entfernt; stattdessen Knöpfe „Kurs-Übersicht“ und „Lektions-Übersicht“ (springen wie im Menü); Überschrift „Aktivität · N Tage“. **Lektionen-Übersicht:** pro Lektion jetzt 📅/⭐ wie in der Kurs-Übersicht (100 % grün), Vokabelzahl und „N heute fällig“, größere Schrift, Knopf zur Kurs-Übersicht.
- **Statistik (Gesamtfortschritt):** Kopfzeile „Fälligkeit / Punkte“ entfernt; die Zeile „Neu · Anfänger · Fortgeschr. · Profi“ ist jetzt vier Kacheln (Zahl groß, Wort ausgeschrieben, tausendergetrennt) je Vokabeln/Übungen. **Kurs-Übersicht:** Knopf „📚 Vokabeln der Lektion“ pro Lektion (öffnet die Vokabelliste mit dem Lektionsfilter, `courseGoToVocab`).
- **Tausenderpunkte:** neue Hilfsfunktion `fmtN` (de-DE) für Zahlen in Statistik (Heute fällig, Balken, Aktivität, Gesamtfortschritt, Level-Verteilung), Kurs-Übersicht, Lektionen-Übersicht und Vokabelliste. Kopfzeile „Fälligkeit / Punkte“ auch in der Kurs-Übersicht entfernt. Nicht umgestellt: Zahlen in Diagnose- und Prüfseiten, in der Warnung „Anfänger-Puffer“ und in den Zählern der Lernkarten.
- **Statistik, ganz unten zwei Knöpfe:** „Nächsten Kurs-Abschnitt freischalten“ (erster Chunk in Lektions-/Chunk-Reihenfolge, der noch nicht freigeschaltet ist; `courseUnlockChunk`, mit Rückfrage und Vorschau „K2 · Abschnitt · N Übungen“) und „10 Vokabeln fällig setzen“ (zuerst Vokabeln mit Kursbezug ohne Fälligkeit, nach Kurs-Lektion und Reihenfolge der Lektion; danach aus dem Quellenabgleich, Bucket `vorhanden`, nach `score` absteigend; Rückfrage mit Wortliste und Herkunft; schreibt `progress.next_review` = jetzt, bestehende Zeilen werden per PATCH aktualisiert, neue per INSERT ohne Überschreiben). Mit gestubbtem `sbApi` getestet (Auswahl, Reihenfolge, Schreibpfade), nicht gegen die echte Datenbank.
- **Statistik (Knopf-Reihenfolge):** überall Vokabeln/Lektionen links, Kurs rechts (Heute fällig, Sprung-Knöpfe, Schnellaktionen unten). Einträge mit gesetzter Fälligkeit werden bei „10 Vokabeln fällig setzen“ nicht berücksichtigt (Filter auf `next_review`), beim Kurs-Abschnitt werden nur Übungen ohne Fortschrittszeile angelegt.
- **Statistik (Aktivität):** Fußzeile „Versuche · % richtig / davon Kurs · Vokabeln geübt“ entfernt; nur die Tagesbalken bleiben.
- **Vorziehen (Statistik):** die Zeile mit Zahlenfeld und OK samt Ergebniszeile ist weg. Tippen auf „Heute“ im Fällig-Balken (gold, gepunktet unterstrichen) öffnet einen Dialog mit änderbarer Zahl (Standard: zuletzt benutzte, in `localStorage`; zeigt, wie viele vorziehbar sind); das Ergebnis erscheint als Meldung. Auswahl unverändert: frühestes Datum zuerst, bei gleichem Tag höheres Level, Vokabeln und Kurs-Übungen zusammen. Mit gestubbtem `sbApi` getestet.
- **Statistik (Schnellaktionen verlegt):** die beiden Knöpfe ganz unten sind weg; die Funktion steckt jetzt in den „Neu“-Kacheln im Gesamtfortschritt (gold umrandet, gepunktet unterstrichen): „Neu“ bei Vokabeln → 10 Vokabeln fällig setzen, „Neu“ bei Übungen → nächsten Kurs-Abschnitt freischalten (jeweils mit Rückfrage, Logik unverändert).
- **Statistik (Heute fällig):** jeder der beiden Knöpfe ist einzeln ausgegraut und nicht klickbar, wenn er 0 fällig hat (Vokabeln bzw. Kurs); Test mit allen vier Kombinationen.
