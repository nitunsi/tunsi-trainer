---
name: tunsi
description: "bei der verbesserung meines vokabel trainers fuer tunesisch"
---

# Tounsi Trainer — Arbeitsregeln

Fokus dieser Datei: bestehende Trainer-Vokabeln prüfen, neue Vokabeln nachschlagen/anlegen. Drei Nachbardateien, nur bei Bedarf nachschlagen:
- **PRECEDENTS.md** — ausführliche Fallgeschichten/Bug-Belege hinter den Regeln hier.
- **COURSE_MODE.md** — Kurs-Modus (`course_lessons`/`course_exercises`) und Änderungen an `trainer.html` selbst; hat mit Vokabel-Prüfung nur am Rande zu tun.
- **IMPORTS.md** — Import-Methodik für neue Quellen (PDF/Foto-Extraktion, Web-Scraping, Quellen-Konvertierungstabellen, Detail-Historie jeder Rohdatenquelle). Die bisherigen Imports (Uni-Wien, TUNICO, Derja Ninja, Peace Corps, Instagram) sind abgeschlossen — nur bei einem neuen Import/einer neuen Quelle relevant.

## Schnellzugriff

| Situation | Relevante Abschnitte |
|---|---|
| Vokabel überprüfen / neue Vokabel nachschlagen / Import-Batch gegenchecken | vocab_lookup — Cross-Source-Abgleich (ganz unten) |
| Nutzer hat Vokabeln mit 🚩 markiert | Workflow: Geflaggte Vokabeln (🚩) live gegen Derja Ninja prüfen |
| Frischer Batch soll automatisch geprüft werden | Workflow: Frisch importierte Batch-Vokabeln flaggen + verifizieren |
| Neue Vokabel(n) schreiben | Kern-Workflow: neue Vokabel(n) verarbeiten → Transliteration — Ziel-Konvention → Topic-Pflichtfeld |
| Vokabel ist ein Verb (prüfen ODER anlegen) | Verben → Verb-Konjugationsmodell (3-Zeilen-Ziel, `conjugation`, `conj_rotate`) — gilt auch bei geflaggten Einzelformen |
| Was ist von früher noch unerledigt? | Offene Punkte (direkt unten) |
| PDF/Foto-Quelle auswerten, neue Quelle importieren | IMPORTS.md |
| Kurs-Modus (course_lessons/course_exercises) oder Code-Änderung an trainer.html | COURSE_MODE.md |

## Offene Punkte

Unerledigte Altlasten aus früheren Sessions — bei Gelegenheit aufgreifen, nicht Teil der laufenden Regeln:

- **Ninja-Transliteration in Trainer-Konvention** (besprochen 2026-09-05, bewusst zurückgestellt): `derja_ninja_entries.darija` ist in Ninjas eigener Konvention, nicht unserer — anders als bei TUNICO/Peace Corps gibt es dafür noch keine `chatalpha`-Spalte. Wäre nur aus dem vollvokalisierten `arabic_script` heraus zuverlässig baubar (nicht aus Ninjas `darija` selbst), mit eigenem Validierungsaufwand. Bisher kein Bedarf, seit klar ist: Original-Transliteration wird ohnehin nur im Zweifelsfall herangezogen, `chatalpha` reicht für den Regelfall.

**Laufender Prüfdurchgang (Stand 2026-09-12).** Vollständige Fundlisten mit Klassifizierung und Entscheidungsstand: `exports/pruefliste_2026-09-12.md` — dort weiterarbeiten, nicht neu aufrollen. Kurzstand:

| Posten | Menge | Status |
|---|---|---|
| Verb-Selbstcheck (Zeile ≠ eigene Tabelle) | 49 → 26 | A1–A4 erledigt; A5 (4 Zeilen, Vergangenheits-Endung) und A6 (8 Phrasen mit Verbtabelle) offen |
| Plural-Endung `-iou` | 13 → 0 | erledigt, jetzt Regel 21 in `TRANSLIT_RULES` |
| Gemination (Schadda ohne Doppelbuchstaben) | 93 | offen, Verdachtsliste mit ~15 % Fehlalarmen |
| Vokal-Dubletten im Bestand | 177 Verdachtspaare | offen, Fehlalarm-Muster siehe Datenqualitäts-Checks |
| Schrägstrich im `darija`-Feld | 19 | 5 zum Aufteilen vorgeschlagen, 14 sind echte Synonyme |
| Unvokalisiertes `arabic_script` | 785 (701 ohne Notiz/Flag) | offen, keine Entscheidung getroffen |
| Präsens-Verben mit Infinitiv-Gloss | 9 (19 ohne Topic-Filter) | offen |

- **`-ou` nach Konsonant** (113 Zeilen): Die Konjugationstabellen schreiben 511× `-u` gegen 39× `-ou`, eine Vereinheitlichung wäre also begründbar. **Bewusst nicht angefasst**, weil die Mehrheit der Treffer gar kein Plural ist, sondern das Possessivsuffix (`3andou` „er hat", `7lou` „süß"). Nur mit Wortart-Prüfung angehbar, nicht per Regex.
- **Verb-Modell-Abdeckung:** 181 Verbgruppen haben eine `conjugation`-Tabelle, davon erreichen 87 das 3-Zeilen-Ziel; 48 neue Zeilen würden alle auf 3 bringen. 88 Gruppen haben keine rotierende Zeile (62 davon bräuchten nur ein `conj_rotate`-Flag, keine Neuanlage). Weitere **169 Verb-Zeilen haben gar keine Tabelle** — ob das Modell auf sie ausgeweitet wird, ist offen.

## Grundsatz: Nie ohne Bestätigung in Supabase schreiben

Jedes INSERT/UPDATE/DELETE erst als Vorschlag zeigen (betroffene Zeilen/Werte), auf Bestätigung warten, dann schreiben. Gilt für jede Tabelle, jede Größenordnung — auch ein einzelnes Wort.

## Projektwissen-Datei

Die Datei `tounsi_db_YYYY-MM-DD.md` im Projektwissen ist die primäre Datenquelle, wenn kein Live-Supabase-Zugriff besteht. Sie enthält Schema, Lessons-Mapping, Users, Vocabulary. Duplikat-Check läuft dann gegen diese Datei via `project_knowledge_search` (Ablauf/Kriterien siehe "Kern-Workflow" unten).

**Wann aktualisieren:** nach größeren Vokabel-Importen (>20 Einträge), nach Änderungen an der Lektionsstruktur, wenn Duplikat-Checks fehlschlagen/veraltete Einträge zeigen, wenn neue Supabase-Spalten angelegt werden (dann auch den Export-Modus im Trainer erweitern). Export: Trainer → 💾 Export → "📦 Daten laden" → `tounsi_db_YYYY-MM-DD.md` → ins Projektwissen hochladen, alte Datei ersetzen.

## Kern-Workflow: neue Vokabel(n) verarbeiten

**Dieser Ablauf gilt für JEDE Quelle** (PDF/Foto, Uni-Wien, TUNICO, Peace Corps, Derja Ninja, Instagram, ...) — nur die Transliterations-Umwandlung in Schritt 2 unterscheidet sich je Quelle (siehe "Transliteration — Ziel-Konvention" für die Zielregeln, IMPORTS.md für die jeweilige Quell-Notation).

1. **Vollständig extrahieren** (PDF/Foto-spezifische Extraktionstechnik: siehe IMPORTS.md). Nicht nur die offizielle Wortschatztabelle: Dialoge, Grammatik-Beispielsätze, Übungssätze, Bildunterschriften enthalten oft zusätzliche Wörter/Sätze und müssen genauso vollständig geprüft werden. Ganze Sätze gehören ebenfalls als eigene Zeile in `vocabulary` (topic="Phrasen"/"Ausdrücke"), auch wenn die Einzelwörter schon vorhanden sind.
2. **Transliterieren** nach Chat-Alphabet (siehe Ziel-Konvention unten), nie die Quellen-Schreibung 1:1 übernehmen.
3. **Duplikat-Check, alle drei Felder einzeln** (arabic_script, darija, german) — nie nur eins. Deutsch-Text-Suche allein reicht nicht (deutsches Gloss kann anders formuliert sein als erwartet) — immer zusätzlich nach der Ziel-Transliteration/dem Ziel-arabic_script suchen.
   - `arabic_script`: primärer Schlüssel. Kollision möglich bei unvokalisierten Formen — Bedeutung als Tiebreaker.
   - `darija`: Homographen beachten (Konjugationspaare sie/ich haben oft identische Transliteration — kein Duplikat, aber `german` muss Person klar benennen).
   - `german`: als eigenständige Suchanfrage, Synonyme mitdenken ("einfach"≈"leicht", "Lied"≈"Gesang", "Darlehen"≈"Kredit"). Bei Fund: als Auffälligkeit markieren, Entscheidung dem Nutzer überlassen.
   - Bei strukturierten Listen (Adjektiv-/Verb-Tabellen): zuerst ein Themen-Sweep gegen den passenden `topic`, nicht Wort für Wort.
   - **Duplikat-Check VOR jeder nachträglichen Schreibkorrektur, nicht erst danach** — eine Korrektur ist im Effekt ein neues `darija`. Wenn die *korrigierte* Schreibung bereits im Bestand existiert, ist die vermeintliche Schreibkorrektur in Wahrheit ein **Merge** und muss als solcher behandelt werden (Kurs-Verweise umbiegen, Felder zusammenführen, Dublette löschen) — sonst entsteht aus einer Reparatur eine neue Dublette. Zweimal am 2026-09-12 aufgetreten: `y3awid`→`y3awwed` traf die bestehende id 3442, `yit3asha`→`yit3ashsha` traf id 4029. Älterer Fall: `yisma7`→`yisma3` (PRECEDENTS.md → Duplikat-Check).
     ```sql
     -- vor JEDEM UPDATE auf darija laufen lassen:
     SELECT id, darija, german FROM vocabulary WHERE lower(btrim(darija)) = lower('<neue_schreibung>');
     ```
   - Nach dem Schreiben: App-eigenen "🔍 Duplikat-Prüfung"-Tab nutzen oder bei Live-Zugriff selbst nachbauen (SQL siehe unten) — gründlicher als Ad-hoc-Stichproben vorher.
4. **Topic setzen** (Pflichtfeld, siehe eigener Abschnitt) — Claude darf selbst entscheiden, keine Rückfrage nötig.
5. **Liste zeigen, warten.** Fehlende Einträge tabellarisch (Arabic, Darija, Deutsch, lesson_id, topic), Auffälligkeiten/Rückfragen gesammelt am Ende. Kein SQL ohne Bestätigung.
6. **Nach dem Schreiben, Pflicht unaufgefordert:** Duplikat-Check UND Transliterations-Check (SQL unten) laufen lassen, plus Bedeutungsfacetten-Check gegen `tunico_import`/`tunico_corpus_*` (Methodik siehe IMPORTS.md → TUNICO) — für JEDE Quelle, nicht nur TUNICO-eigene Batches.
7. **`vocab_lesson_refs` und `progress` aktualisieren**, siehe COURSE_MODE.md → Kurs-Verknüpfung.

### Standard-Vorgehen bei gefundenem Duplikat

1. Älteren/bereits gelernten Eintrag behalten (erkennbar an Lernfortschritt/Lvl>0), neuen löschen — CASCADE räumt dessen progress-/review-Zeilen automatisch mit auf.
2. Liefert die neue Quelle eine zusätzliche Bedeutungsnuance: vor dem Löschen die `german`-Spalte des bestehenden Eintrags ergänzen, nicht verwerfen.
3. War der gelöschte Eintrag in `course_lessons.vocab_lesson_refs` verlinkt: ID dort chirurgisch per `replace()` ersetzen (in `ids:` UND `darija:`), nicht den String neu aufbauen.
4. Vor Übernahme einer "besser aussehenden" Schreibweise vom gelöschten Eintrag: gegen eine bereits verifizierte Geschwisterform derselben Wurzel gegenchecken — "neuer/vokalisiert" heißt nicht automatisch korrekt (Detail: PRECEDENTS.md → Duplikat-Check, `yeb3ath`-Fall).

### Weitere Duplikat-Fallen

- Substring-Falle: ein Wort in einer Phrase ist kein Duplikat des Einzelworts.
- Konjugationsformen (sie/ich) mit identischer Transliteration: akzeptieren, `german` muss Person benennen.
- Schrägstrich-Muster „xyz / yxyz": immer in Vergangenheit + Präsens aufteilen. Gilt auch für Singular/Plural (und m./f.) — **nie** als ein Eintrag „sg / pl", immer separate Zeilen (der Duplikat-Check normalisiert den ganzen String inkl. „/" zu einem Key und übersieht so bestehende Einzelform-Einträge).
- Quote-verankerte Suchmuster liefern Fehlalarme — immer unverankert/als Substring suchen.
- Ältere CSV-Quellen romanisieren ض/ظ/ذ/ث inkonsistent (dh, th, z, d) — bei Kandidaten mit diesen Buchstaben immer zusätzlich das arabic_script direkt suchen, nicht nur die Transliteration.
- Transliterations-Rateversuche bei wissenschaftlichen Quellen (Uni Wien) sind unzuverlässig — primär über die deutsche Bedeutung suchen, nicht über die geratene Transliteration.
- **Vokal-Varianten-Falle:** reine Substring-Suche auf die geplante Transliteration fängt Vokalvarianten nicht ab (`ghurbal`/`ghorbel`, a↔o). Bei a/e/i/o-Unsicherheit zusätzlich eine plausible Variante mitsuchen oder direkt den SQL-Skelett-Check (unten) nach dem Schreiben laufen lassen.
- Nicht nur die Transliteration kann falsch sein — manchmal ist `arabic_script` selbst fehlerhaft. Vor einer arabic_script-Korrektur: Bedeutung/Etymologie des Wortes selbst als Beleg heranziehen (eigener Gloss, verwandte Bestandswörter), nicht raten.
- Bei echter Buchstaben-Identitäts-Unsicherheit (ط vs. ث, ض vs. ظ): Derja Ninja als Tiebreaker nutzen, nicht raten oder nur der akademischen Quellen-Umschrift vertrauen.

### `german`-Feld: „/" vs. „;"

„/" NUR für echte Synonyme/alternative Formulierungen derselben Bedeutung, sonst „;". Grund: `checkAnswer()` (trainer.html, Zeile ~440) macht `answer.split(/\s*\/\s*/)` und akzeptiert JEDE der Teile als richtige Antwort — bei echten Synonymen gewollt, bei tatsächlich unterschiedlichen Bedeutungen ein Bug (falsche Übersetzung würde als richtig akzeptiert). Semikolon `;` wird von `checkAnswer()` nicht speziell behandelt, ist also der richtige Trenner für „mehrere unterschiedliche Bedeutungen".

**Testkriterium:** nicht „sehen die zwei Formulierungen unterschiedlich aus", sondern „wäre bei einer isolierten Quiz-Abfrage dieses einen Worts JEDE der beiden Antworten korrekt". Wenn ja → „/", sonst „;". Volle Herleitung inkl. mehrerer Nachprüf-Runden und Sonderfälle (grammatische Homophonie, Infinitiv-Kontamination): PRECEDENTS.md → Duplikat-Check.

## Datenregeln

- Vokabeln leben in Supabase, nicht im HTML
- `arabic_script` ist der primäre Duplikat-Check-Schlüssel, immer vokalisiert — wenn Vokalisation sicher, direkt eintragen; wenn unsicher, unvokalisiert lassen und als Rückfrage markieren
- Transliteration: Chat-Alphabet (3=ع, 7=ح, q=ق, sh=ش) — siehe Ziel-Konvention unten
- Vergangenheitsformen: Deutsch im Präteritum
- **Präsens-Verben: deutsches Gloss immer als 3. Person Singular ("er steht auf"), NIE als Infinitiv ("aufstehen").** Grund: `darija` ist bei Verben ohnehin schon die 3.-Pers.-Sg.-Form — der Infinitiv im Deutschen versteckt Duplikate vor dem Duplikat-Check, weil die German-Spalte nicht mehr matcht (Präzedenzfall: PRECEDENTS.md → Datenregeln).
- Dual-Formen eintragen, Eigennamen/Städte nicht
- `lesson_id` = `lessons.id` (**NICHT** `lesson_number`!). Vor jedem INSERT/UPDATE zuerst via `project_knowledge_search` die aktuelle lessons-Tabelle lesen, Zuordnung anhand des title-Feldes. IDs nie hardcoden. Bei Unklarheit: Rückfrage.

## Transliteration — Ziel-Konvention (Chat-Alphabet)

**Diese Tabellen sind die eine verbindliche Zielkonvention für ALLE Quellen.** Jede Quelle hat ihre eigene Ausgangsschreibung (siehe IMPORTS.md für die jeweilige Quell→Ziel-Umwandlungstabelle), aber das Ergebnis folgt immer diesen Regeln — nie eine quellenspezifische Variante direkt übernehmen.

### Konsonanten

| Laut | Schreibung | Beispiel | Nie verwenden |
|---|---|---|---|
| ش | sh | shwayya, shkoun, meshwi | ch |
| ح | 7 | 7lib, 7afla, ra7a | H |
| ع | 3 | 3asel, m3ak | 3 ist korrekt |
| ق | q | qahwa, qaddesh | 9 (Quellen-Schreibweise) |
| خ | kh | khobz, khatir | – |
| غ | gh | ghali, maghrib | – |
| ط | t | tawla, tbib | T (kein Großbuchstabe) |
| ص | s | sbe7, sabbati | S (kein Großbuchstabe) |
| ض | dh (eigene Kategorie, seit 2026-08-06) | dhayyaq, abyadh | d oder th — Begründung: PRECEDENTS.md → Uni-Wien |
| ظ | th (ausnahmslos, seit 2026-08-07) | tholl, thabt, thhar (Rücken), la7tha (Moment) | dh oder bloßes d |
| ذ | th (ausnahmslos, seit 2026-08-07) | thekkra, thra3 (Arm), hetha (das/dieser), kaththab (Lügner) | dh oder bloßes d |
| ث | th | thletha, thmenya | – |

Keine Großbuchstaben in darija — weder als Emphase-Marker noch am Satzanfang. Durchgehend kleingeschrieben.

**Gemination eines Digraphen: der ganze Digraph wird verdoppelt (Regel belegt 2026-09-12, drei unabhängige Quellen).** Bei Schadda auf ض/ظ/ذ/ش/خ/غ wird nicht nur der erste Buchstabe gedoppelt, sondern die komplette Schreibung:

| Laut | richtig | falsch | eigener Bestand | Ninja | TUNICO |
|---|---|---|---|---|---|
| ضّ | `dhdh` | ~~`ddh`~~ | 11 : 0 | 70 : 2 | ض kommt in TUNICOs `chatalpha` nicht als `dh` vor |
| ظّ/ذّ | `thth` | ~~`tth`~~ | 6 : 0 | 34 : 0 | 40 : 0 |
| شّ | `shsh` | ~~`ssh`~~ | 11 : 0 | 2 : 0 (Ninja schreibt `ch`) | 35 : 0 |
| خّ | `khkh` | ~~`kkh`~~ | 7 : 0 | – (Ninja schreibt `5`) | 21 : 0 |
| غّ | `ghgh` | ~~`ggh`~~ | 0 : 0 | – | 2 : 0 |

**Die `tth`-Treffer sind keine Gegenbeispiele** — das war der Denkfehler der ersten Zählung. Jeder einzelne davon (9 in TUNICO, 17 in Ninja, 2 im eigenen Bestand) ist ein **Morphemgrenzen-`t`** vor `th`, keine Gemination: TUNICO `tṯawwib`→`tthawwib`, `tḏ̣āṛif`→`ttharif`, `mutṯaqqaf`→`mutthaqqaf`; Ninja `تْذَكِّرْ`→`tthakkir`, `مِتْثَقِّفْ`→`mittha99if`; eigener Bestand `نِتْثَاوَب`→`netthaowb` (id 3042), `تَذْبَح`→`tthba7` (id 3073). Diese Zeilen sind korrekt und dürfen **nicht** zu `thth` "korrigiert" werden. Echte ذّ/ظّ-Gemination schreibt TUNICO in **14 von 14** Fällen voll: `ʕaḏḏib`→`3aththib`, `aḏḏin`→`aththin`, `kaḏḏāb`→`kaththab`, `baẓẓaʕ`→`baththa3`, `ḏḏakkiṛ`→`ththakkir`, `ḏḏall`→`ththall`, `ṭuẓẓīna`→`tuththina`, `mīẓẓu`→`miththu`.

**Verwandte Fehlerklasse: `h` statt Verdopplung (gefunden 2026-09-12).** `7h` für geminiertes ح und `thh` für geminiertes ث/ذ/ظ. Richtig ist `77` (27× im Bestand: `sa77a`, `na77a`, `twa77ashtek`; Ninja `mouwa77da`, `titna77aa`) bzw. `thth`. Betroffen waren `yba7har`/`ba7har`/`ba7hart` (→ `ba77ar`-Familie) und `moumathhla` (→ `moumaththla`). **Aber `7h`/`thh` sind nicht per se falsch:** `722 thhar` (ظهر, Rücken) und `4254 ythhar-li` (يظهرلي) sind echte ظ+ه-Folgen und korrekt. Gleiche Logik wie bei `tth` — dieselbe Buchstabenfolge ist an einer Morphemgrenze richtig und bei Schadda falsch. Entschieden wird nur am `arabic_script`.

Dazu zwei Argumente, die unabhängig von der Zählung gelten:

- **Lautlehre:** `dh`/`th`/`sh`/`kh`/`gh` sind Digraphen für je **einen** Laut. `ddh` liest sich als /d/+/ð/ — und diese Folge kommt an Morphemgrenzen echt vor, `ddh` ist also nicht bloß ungewöhnlich, sondern **mehrdeutig**.
- **Maschinell nachweisbar:** `public._translit_skeleton('7addhar')` = `7ddhr`, aber `public._arabic_skeleton('حَضَّر')` = `7dhdhr`. Die beiden Skelett-Spalten derselben Zeile widersprechen sich, d.h. Duplikat- und Cross-Source-Abgleich sehen zwei verschiedene Wörter. Mit `7adhdhar` ergeben beide Funktionen `7dhdhr`. Das ist der schnellste Selbsttest für jede vermutete Digraph-Gemination: **stimmen `_translit_skeleton(darija)` und `_arabic_skeleton(arabic_script)` nicht überein, ist die Transliteration falsch, nicht das Arabische.**

**Überschrieb eine frühere Entscheidung:** PRECEDENTS.md → Verben hatte für 2026-08-07 `7adhar`→`7addhar` (plus `y7adhar`→`y7addhar`) mit `ddh` festgehalten. Widerlegt und am 2026-09-12 korrigiert (ids 1648, 2218 → `7adhdhar`/`y7adhdhar`, inkl. der vier Formen in der `conjugation` von 2218). Damit hat der Bestand in **allen fünf Reihen null echte Gegenbeispiele**. Details: PRECEDENTS.md → Digraph-Gemination.

### Vokale & häufige Wörter

| Form | Korrekt | Nie |
|---|---|---|
| اليوم | lyoum | lyum, el-youm (als Standalone ok) |
| شكون | shkoun | shkun |
| شوية | shwayya | chwayya |
| موش | moush | mouch |
| Negation -ش | -sh | -ch (z.B. ma ne3refsh, nicht ne3refch) |
| Plural يفعلوا | -iw | -iou (z.B. ya7kiw, yimshiw) |

### Zahlen-Komposita (Hunderter)

Hunderter (200–900) als EIN zusammengeschriebenes Wort, mit der Pluralform مِيَات (myat) statt der Einzahl مْيَة (mya) — analog zur normalen 3-10-Pluralregel bei Zählwörtern (Beleg von Derja Ninja: "three hundred" = ثْلَاثَمْيَاتْ, nicht "thlatha mya" getrennt).

| Falsch (getrennt, Singular) | Richtig (ein Wort, Plural) |
|---|---|
| khamsa mya | khamsmyat |
| thlatha mya | thlathamyat |

### Lehnwörter (Ausnahme)

Französische/internationale Lehnwörter behalten ihre Originalschreibung: guichet, sacoche, chauffeur, chapeau, sandwich, marche, piscine, chambriz u.ä. — im `german`-Feld `(frz.)`/`(ital.)`/`(engl.)`/`(Lehnwort)` markieren, dann greifen die Ausnahmen der Prüf-SQL automatisch.

### Artikel-Assimilation

Sonnenlettern werden assimiliert: es-sebt, esh-shatt, et-tbib, eth-thnin — nicht el-sebt, el-shatt.

**Sonderfall j:** im tunesischen Dialekt ist ج (anders als im Hocharabisch) ein Sonnenbuchstabe — Artikel immer assimiliert (ej-jar, nicht el-jar; ej-Jzayer für Algerien). Gilt nur für die Transliteration — `arabic_script` bekommt kein Shadda auf ج, folgt der arabischen Standard-Orthographie.

## Lautlehre — Zusatzregeln für Vokalisierung & Bestandsaudits

Aus der Uni-Wien-Lautlehre abgeleitete Prüfregeln, immer anwendbar wenn `arabic_script` neu vokalisiert oder gegen eine externe Quelle abgeglichen wird:

1. **Vokalqualität a/e und i/e (Imala) ist meist kein Fehler.** Fatha/Kasra werden je nach Umgebung mal als "a"/"i", mal als "e" ausgesprochen (حَارْ→"7ar" aber بَارْد→"berid", derselbe Fatha-Laut). Nur bei strukturellen Abweichungen (fehlende Silbe, anderer Konsonant, anderes Vokalmuster) nachhaken.
2. **Gemination (Schadda) muss sich im Doppelbuchstaben spiegeln.** كَبُّوطْ→"kabbout" ✓. Doppelter Konsonant ohne Schadda (oder umgekehrt) → möglicher Vokalisierungsfehler.
3. **Schadda-Gültigkeitsprüfung.** Nie auf dem ersten Buchstaben eines Wortes, nie auf einem reinen Langvokal-Buchstaben (ا) — beides ist ungültig und ein Warnsignal für kaputte Quelldaten.
4. **"Vollständig vokalisiert"** heißt: jeder Konsonant hat Harakat oder Sukun. Ein Wort mit nur einem Schadda, sonst ohne Fatha/Kasra/Damma, ist unvollständig.
5. **Maß-I- vs. Maß-II-Verwechslung bei Verben aus externen Quellen.** Unsere Vergangenheitsform (3. Pers. m. Sg., Maß I) ist die Grundform. Externe Quellen listen oft die kausative Form (Maß II, mit Schadda) oder eine Nomen-Ableitung — gleiches Konsonantenskelett, andere Bedeutung (دَخِّلْ "hineinstecken" statt دْخَلْ "er trat ein"). Vor Übernahme immer Wortart/Verb-Maß gegen die deutsche Bedeutung prüfen, reiner Skelett-Match reicht nicht. Keine passende Variante in der Quelle → ausschließen, nicht raten.
6. **Hamza (ء) ist ein eigener Laut, kein "3".** Bei anlautendem Vokal ohne erkennbaren Konsonanten prüfen, ob eigentlich أ gemeint ist.
7. **s ist immer stimmlos, z immer stimmhaft** — bei Unsicherheit explizit gegenchecken.
8. **Betonungs-Algorithmus:** einsilbige Wörter immer betont; auslautender Vokal nie betont (außer einsilbig); genau ein schwerer Vokal → betont; mehrere schwere Vokale → der letzte.
9. **Kolloquiale Vokal-Elision nur bei markiertem Sukun.** Reduktion nur dort, wo das Arabische selbst ein Sukun trägt (قْوِيَّة→"qwiyya"). Eine markierte Fatha/Kasra/Damma wird nicht gestrichen, auch wenn die Aussprache subjektiv reduziert klingt (صَيْدَلِيَّة→"sidaliyya").
10. **Länderadjektiv vs. Ländername** ist eine Unterkategorie von Regel 5 — Konsonantenskelett-Match reicht nicht, Wortart genau prüfen.

## Topic-Pflichtfeld

Jeder INSERT muss ein `topic` enthalten — niemals weglassen oder null lassen. Steuert die Lernpriorisierung im Aktivierungsmodus (Prio 1 = sofort vorschlagen).

Gültige Topics — nur diese verwenden:

| Topic | Prio | Wann verwenden |
|---|---|---|
| Gesprächsführung | 1 | Verständigung, Reaktionspartikel, Gesprächsreparatur (stimmt?, wah, ma fhimtsh, yezzi…) |
| Befinden | 1 | Körpergefühl, Emotionen (müde, hungrig, wütend, glücklich, Schmerzen…) |
| Alltag | 2 | Alltagssituationen, Haushalt, gemeinsames Leben |
| Ausdrücke | 2 | Feste Redewendungen, idiomatische Ausdrücke |
| Phrasen | 2 | Satzbausteine, Muster-Sätze |
| Höflichkeit | 2 | Danke, Bitte, Entschuldigung, Glückwünsche |
| Verben-Konjugation | – | Verbformen Präsens — Lektion mit title "Verben — Präsens" |
| Vergangenheit | – | Verbformen Vergangenheit — Lektion mit title "Verben — Vergangenheit" |
| Verben | – | Einzelne Verben außerhalb der Verb-Lektionen |
| Adjektive | 3 | Eigenschaftswörter m/f/Pl |
| Körper | 3 | Körperteile |
| Gesundheit | 3 | Krankheit, Symptome, Arzt |
| Essen | 3 | Speisen, Gerichte |
| Lebensmittel | 3 | Zutaten, Einkauf |
| Getränke | 3 | Getränke |
| Transport | 3 | Fahrzeuge, Reisen, Verkehr |
| Wetter | 3 | Wetter, Klima |
| Wohnen | 3 | Wohnung, Möbel, Räume |
| Familie | 3 | Familienmitglieder |
| Personen | – | Menschen, Beziehungen (nicht Familie) |
| Berufe | – | Berufsbezeichnungen |
| Orte | – | Gebäude, Stadtteile, Institutionen |
| Zeit | – | Zeitangaben, Kalender, Uhrzeiten |
| Zahlen | – | Zahlen, Mengen |
| Geld | – | Währung, Preise, Finanzen |
| Einkaufen | – | Markt, Geschäft, Einheiten |
| Kleidung | – | Kleidungsstücke |
| Farben | – | Farben |
| Tiere | – | Tiere |
| Natur | – | Pflanzen, Landschaft, Wetter-Nomen |
| Begrüßung | 3 | Grußformeln |
| Verabschiedung | 3 | Abschiedsformeln |
| Grammatik | – | Grammatische Partikel, Strukturen |
| Adverbien | – | Adverbien, Zeitadverbien |
| Fragewörter | – | Fragewörter |
| Nationalitäten | – | Länder, Nationalitäten, Sprachen |
| Allgemein | – | Nur wenn kein anderes Topic passt |
| Kurzphrasen | 2 | Kurze feste Wendungen, Grußformeln-Varianten, Antwort-Formeln — im Bestand bereits massenhaft etabliert |
| Klassenzimmer | – | Schulgegenstände, Unterrichtsvokabular (Stift, Tafel, Frage/Antwort im Unterricht…) |
| Reisen | 3 | Reisevokabular (Reisepass, Ticket, Gepäck…) — abzugrenzen von Transport (Verkehrsmittel selbst) |
| Schule | 3 | Schulische Gegenstände/Einrichtungen außerhalb des reinen Klassenzimmers (Schultasche, Direktor…) |
| Politik | – | Politische Ämter, Institutionen, Staatswesen |
| Beispielsätze | 2 | Ganze Beispielsätze aus Quellen (82 Zeilen im Bestand) |
| Gottesformeln | 2 | Segenswünsche und Gottesanrufungen — Lektion "Gottesformeln & Segenswünsche" (51) |
| Sprichwörter | – | Sprichwörter — Lektion "Sprichwörter" (32); in IMPORTS.md ausdrücklich vorgeschrieben |
| Länder | – | Ländernamen, abzugrenzen von Nationalitäten (13) |
| Geografie | – | Geografische Begriffe, Himmelsrichtungen (11) |
| Notfall | 1 | Hilferufe, Notfallsituationen — Lektion "Notfall & Sicherheit" (3) |

Nie verwenden: Vokabeln, null, freie Texte außerhalb der Liste.

**Die Liste wurde 2026-09-12 an den Bestand angeglichen.** Sechs Werte waren dort längst etabliert (teils mit eigener Lektion), standen aber nicht in der Liste — mit der Folge, dass ein regelkonformer Eintrag als Regelverstoß erschien und umgekehrt. `Sprichwörter` war sogar ein echter Selbstwiderspruch: IMPORTS.md schreibt ihn für Instagram-Sprichwörter ausdrücklich vor, SKILL.md verbot ihn.

Weitere Ad-hoc-Werte im Bestand, **bewusst nicht aufgenommen** (je 2–5 Zeilen, gehen in bestehende Topics auf): `Gesellschaft`, `Bildung` (→ Schule), `Küche` (→ Essen/Wohnen), `Feiertage` (→ Zeit), `Glückwünsche` (→ Höflichkeit), `Komparativ` (→ Adjektive/Grammatik), `Schlafzimmer` (→ Wohnen), `Arbeit` (→ Berufe). Diese Zeilen werden nicht nachgepflegt (siehe Bestandspflege-Regel unten) — nur bei ohnehin fälliger Bearbeitung mitrichten.

**Topic ist unkritisch, im Zweifel selbst entscheiden.** Anders als bei `lesson_id` darf Claude bei `topic` selbst das plausibelste Topic wählen und direkt setzen, ohne vorher nachzufragen. Kurz begründen, aber nicht als offene Frage stehen lassen.

**Bestandspflege bei Topic ist kein eigenes Ziel (Stand 2026-09-05).** Nils ist das Feld grundsätzlich nicht wichtig. Bestehende falsche/fehlende/inkonsistente Topics — auch systemische Muster wie die verbreiteten `"Wort (Lxx)"`-Suffixe oder reine `"(Lxx)"`-Tags ohne Themenwort — werden nicht von sich aus gesucht, geprüft oder als Fund gemeldet. Nur zwei Anlässe rechtfertigen ein Anfassen:

1. **Neuanlage:** Pflichtfeld bleibt bestehen — bei jedem neuen INSERT `topic` korrekt setzen.
2. **Ohnehin fällige Bearbeitung:** Wird eine bestehende Vokabel aus anderem Grund verändert (Korrektur, Update, Ninja-Abgleich…), das Topic bei der Gelegenheit gleich mitrichten, falls es falsch/fehlend/im Lxx-Suffix-Format ist.

In beiden Fällen: wie genau (welches Topic, Suffix abschneiden oder ersetzen) nicht rückfragen — einfach entscheiden, wie schon oben beschrieben.

## Verben

- Immer als separate Einträge je Form: Vergangenheit (er ...te), Präsens (er ...) UND Imperativ (...!) — nie kombiniert mit Schrägstrich/Komma/Semikolon in einer Zeile
- Vergangenheit = Wurzelform (فَعَل), Präsens = يِ/يُ-Form (maskulin singular)
- `topic=Verben-Konjugation` für alle Präsens-Verbformen — Lektion mit title "Verben — Präsens"
- Einträge mit Schrägstrich-Muster „imperativ / yXXX" sofort aufteilen
- **Wiederkehrender Fehlerfall: Imperativ+Vergangenheit-Bündelung** (nicht nur Imperativ+Präsens) — da beide bei manchen Verbmustern gleich geschrieben werden, aufgeteilte Zeilen mit `homonym_ok=true` markieren. Details/Fälle: PRECEDENTS.md → Verben.
- **Verwandter Fehlerfall: `darija` transliteriert als MSA-Imperativ-Präfix (a-/i-/o-), obwohl `arabic_script` bereits korrekt die 3.-Person-Vergangenheit zeigt.** `darija` aus dem korrekten `arabic_script` neu transliterieren, nicht das arabic_script antasten. Bei jedem Präsens/Vergangenheit-Paar lohnt der Blick, ob `darija` wirklich zur (oft zuverlässigeren) Vokalisierung in `arabic_script` passt. Details: PRECEDENTS.md → Verben.

### Verb-Konjugationsmodell (seit 2026-09-06): 3-Zeilen-Ziel + `conjugation`-Tabelle

**Ziel pro Verb: genau 3 eigene `vocabulary`-Zeilen** (je mit eigener `progress`-Zeile, ganz normal in der SRS-Queue) — **Präsens-Grundform** (3. Pers. Sg.), **Vergangenheit-Grundform** (3. Pers. Sg.), und **eine dritte, rotierende Zeile**. Grund: volle Personal-Paradigmen (ich/du/er/sie/wir/ihr/sie für jede Zeit) als je eigene Zeilen anzulegen bläht die Queue auf — Nils will eine Queue/ein Progress-System, keine pro Form.

**Die dritte Zeile ist nicht fix, sondern rotiert bei jeder Abfrage:** `vocabulary.conj_rotate=true` markiert sie. Die App zieht bei jeder Kartenerstellung (`bFlash()` in trainer.html) neu zufällig eine Personal-/Zeitform aus `conjugation` (Gewichtung: `ich`/`wir` 3× häufiger als die übrigen Personen; die beiden Fix-Formen Präsens/Vergangenheit-3.-Pers.-Sg. sind von der Auswahl ausgeschlossen) und ersetzt Frage+Antwort nur für diese eine Abfrage — Progress bleibt durchgehend an derselben `vocabulary_id`/`progress`-Zeile. Die Zeile selbst behält trotzdem einen eigenen `darija`/`german`-Wert (z.B. die ich-Form) für nicht-Karteikarten-Kontexte (Vokabelliste etc.). Rotierende Karten laufen **immer Deutsch→Tounsi** (kein Arabic-Script pro Einzelform nötig — wäre nochmal deutlich mehr Aufwand pro Verb).

**Zusätzlich, an allen Zeilen desselben Verbs:**
- `vocabulary.tunico_verb_id` → `tunico_corpus_verbs.id` (Verknüpfung zum Korpus-Verb)
- `vocabulary.conjugation` (jsonb) — die **komplette** Konjugationstabelle in Hausschreibung, jede Zelle als `{darija, german}` (volle deutsche Übersetzung pro Person+Zeit nötig, da die Rotation einen passenden Prompt braucht — mechanisches Ableiten aus der 3.-Pers.-Form scheitert an unregelmäßigen deutschen Verben wie "aß"/"ging"/"sah"). Struktur:
  ```json
  {"present":{"1sg":{"darija":"nqul","german":"ich sage"},"2sg":{"darija":"tqul","german":"du sagst"},
              "3sg_m":{"darija":"yqul","german":"er sagt"},"3sg_f":{"darija":"tqul","german":"sie sagt"},
              "1pl":{"darija":"nqulu","german":"wir sagen"},"2pl":{"darija":"tqulu","german":"ihr sagt"},
              "3pl":{"darija":"yqulu","german":"sie sagen"}},
   "past":{"1sg":{"darija":"qolt","german":"ich sagte"}, ... },
   "imperative":{"sg":{"darija":"qol","german":"sag!"},"pl":{"darija":"qolu","german":"sagt!"}}}
  ```
  Wird im Trainer über den 🔠-Button in der Karteikarte als Referenztabelle eingeblendet (Präsens links, Vergangenheit rechts, Imperativ darunter) — reine Anzeige, keine eigene Abfrage/kein eigener Progress. Funktionen: `renderConjugationTable()`, `pickRandomConjSlot()` in trainer.html.

**Herkunft der Formen: `tunico_corpus_verbs.forms_chatalpha[]`** (belegte Korpus-Flexionsformen), aber **nie 1:1 übernehmen** — TUNICOs automatische chatalpha-Konvertierung nutzt teils andere Vokale als unsere Hausregeln (Imala e/o vs. deren u/i, z.B. `y7ibb` vs. unser `y7eb`, `yakul` vs. `yakol`), und die Konvertierung ist **nicht einheitlich pro Vokal** — bei manchen Verben bleibt der TUNICO-Vokal korrekt (`qal`/`yqul` behalten `u`/`a`), bei anderen nicht. Vor jeder Übernahme:
1. Gegen bereits verifizierte Geschwisterformen desselben Verbs im eigenen Bestand abgleichen (auch über Alt-Topics wie `(Lxx)`/`–` hinweg suchen, s.u.).
2. Bei Unsicherheit Derja Ninja als Tiebreaker, sonst als Rückfrage markieren.
3. Rohformen-Varianten im Korpus (Tippfehler/Dialektvarianten wie `qatt`/`qult`/`qutt` nebeneinander) nicht blind übernehmen, plausibelste Form wählen.

**Widerspricht die Zeile ihrer eigenen `conjugation`-Tabelle, entscheidet das vokalisierte `arabic_script` — nicht die Tabelle (seit 2026-09-12).** Die Tabellen stammen überwiegend aus TUNICOs `forms_chatalpha` und tragen deshalb teils TUNICOs Vokale statt unserer. „Die Tabelle ist führend" ist als Faustregel brauchbar, aber nur solange das Arabische nicht dagegensteht. Entscheidungsreihenfolge:

1. **`arabic_script` lesen** (Schadda? Kasra? Fatha?) — es ist der höhere Anker.
2. Stimmt es mit der Tabelle überein → **Zeile** nachziehen.
3. Stimmt es mit der Zeile überein → **Tabelle** korrigieren, und zwar alle Zellen desselben Musters, nicht nur die eine.
4. Ist `arabic_script` unvokalisiert oder selbst zweifelhaft → als Rückfrage markieren, nicht raten.

Präzedenzfälle vom 2026-09-12: `ybaddal`/`ybaddil` (يُبَدِّل, Schadda+Kasra → Tabelle bestätigt, Zeile nachgezogen), `ykammal`/`ykammil` (dito), aber `ya3raf`/`ya3rif` (يَعْرَفْ, **Fatha** → hier war die Tabelle falsch, vier Zellen des Präsens-Blocks auf `-a-` korrigiert; die Pluralformen `na3rfu`/`ta3rfu`/`ya3rfu` elidieren den Stammvokal und bleiben unangetastet).

**Kein Hausmuster für den Stammvokal ableitbar.** Auszählung 2026-09-12 über alle Form-II-Verben im Bestand: `-a-` 51× (`ysakkar`, `ykhallas`), `-e-` 27× (`ysallem`, `yqaddem`), `-i-` 20× (`ykammil`, `ynajjim`). Eine Vereinheitlichung würde ~100 Zeilen betreffen und ist bewusst nicht entschieden — bei Einzelfällen ohne Geschwisterbeleg deshalb nichts angleichen, sondern stehen lassen.

**Pflicht-Suchschritt vor jeder Verb-Ergänzung: bestehende Zeilen desselben Verbs auch unter Alt-Topics finden.** Eine Suche nur mit `topic IN ('Verben-Konjugation','Vergangenheit','Verben')` übersieht Zeilen mit Legacy-Topics wie `(L14)`, `(L18)` oder `NULL` — Präzedenzfall 2026-09-06: `yakol`/`er isst` hatte `topic=" (L14)"` und wurde dadurch komplett übersehen, obwohl das Verb (`kla`/essen) sonst als "nur 1 Zeile vorhanden" durchgegangen wäre. Immer den **ganzen** Bestand per Konsonantenskelett gegenchecken (auch über Gemination/Vokal-Abweichungen hinweg, s.o.), nicht nur die Standard-Verb-Topics.

**Fehlende Zielzeilen nachlegen — zwei getrennte Rückfragen (Stand 2026-09-12).** Neue Zeilen anzulegen, wenn Formen fehlen, ist grundsätzlich in Ordnung. Aber:
1. **Erst fragen, ob angelegt werden soll** — mit der konkreten Liste (darija, arabic_script, german, topic, lesson_id), nicht pauschal.
2. **Danach getrennt fragen, ob die neuen Zeilen fällig gesetzt werden sollen.** Nicht mit Frage 1 zusammenziehen und nicht automatisch `next_review = now()` setzen: Nils aktiviert neue Vokabeln bewusst selbst, damit die Queue nicht unkontrolliert wächst. Ohne ausdrückliches Ja wird die `progress`-Zeile entweder gar nicht angelegt oder mit `next_review = NULL`.

Das gilt auch dann, wenn die Neuanlage aus einem 🚩-Auftrag herausfällt — der Auftrag lautet „prüf dieses Wort", nicht „leg neue Wörter an". Ausnahme bleibt der ausdrückliche Import-Batch-Workflow, bei dem Nils die Neuanlage selbst angestoßen hat.

**Bestandspflege (Stand 2026-09-06): nur ergänzen, nicht kürzen.** Verben mit mehr als 3 vorhandenen Zeilen (volle/teilweise Personal-Paradigmen aus früheren Sessions) werden NICHT gekürzt/gelöscht — das wird auf einen späteren, gezielten Vokabel-Check verschoben. Bei diesem künftigen Check: pro Verb auf die 3 Ziel-Slots konsolidieren (Präsens+Vergangenheit+eine Person behalten, Rest als Kandidat für Löschung markieren, nicht automatisch löschen — erst zeigen, dann auf Bestätigung warten wie immer). Bis dahin: überzählige Zeilen einfach so stehen lassen.

**Aber: `tunico_verb_id`+`conjugation` trotzdem an ALLEN vorhandenen Zeilen eines Verbs setzen, nicht nur an den 3 Ziel-Slots.** Auch überzählige/nicht ins 3er-Schema passende Zeilen (z.B. Imperativ-Varianten, weitere Personen aus alten Batches) bekommen die Verknüpfung + volle Tabelle, damit der 🔠-Button überall verfügbar ist. Eine falsche Zuordnung richtet dabei keinen Schaden an — sie fällt beim Lernen auf und wird dann korrigiert (SRS-Progress bleibt unberührt, nur Anzeige-Zusatzdaten).

**Fehlerquelle bei Form-II/III-Verben (Gemination): unvokalisiertes `arabic_script` kollidiert leicht mit der Form-I-Wurzel.** Präzedenzfall 2026-09-06: `nwassal` („ich bringe hin", Form II von وصل) wurde zunächst unvokalisiert als نوصل eingetragen — identisch mit der bereits bestehenden Form-I-Zeile `nousil`/„ich komme an" (id 1278), vom Duplikat-Check sofort erkannt. Bei Form-II/III-Verben mit Gemination immer die Schadda setzen (نْوَصَّل, nicht نوصل), am bestehenden Präsens-Geschwister (hier `ywassal`→يْوَصَّل) orientieren — nicht komplett unvokalisiert lassen, wenn das Muster durch eine Geschwisterform schon bekannt ist.

**Bei jeder Neuanlage/jedem Vokabel-Check ab jetzt:** wenn ein neues oder geprüftes Wort ein Verb ist, prüfen ob es zu einem der `tunico_corpus_verbs`-Einträge gehört (Konsonantenskelett-Match gegen `forms_chatalpha[]`) und nach obigem 3-Zeilen-Modell behandeln, nicht als isolierte Einzelform anlegen.

## Datenqualitäts-Checks (SQL)

Nicht nur nach einem frischen Import relevant — dieselben Checks eignen sich für jede Stichprobe/jeden Verdacht gegen den Bestand.

**Transliterations-Check — konsolidiertes SQL (`TRANSLIT_RULES` in trainer.html):**

```sql
-- Ziffern 2/5/9, Großbuchstaben
SELECT id, darija FROM vocabulary WHERE darija ~ '[259]' OR darija ~ '[A-Z]';

-- "ch" statt "sh" (außer german-Feld markiert Lehnwort: (frz.)/(ital.)/(engl.)/(Lehnwort))
SELECT id, darija, german FROM vocabulary
WHERE darija ~ 'ch' AND german !~* '(frz\.|franz\.|ital\.|engl\.|lehnwort)';

-- Artikel el-/il- nicht vor Sonnenbuchstabe assimiliert
SELECT id, darija FROM vocabulary WHERE darija ~ '\y(el|il)-(th|sh|d|t|z|s|j|n|r)';

-- Konsonanten-Gegencheck arabic_script vs. darija (ح→7, خ→kh, ع→3, غ→g, ش→sh, ق→q/g/k)
SELECT id, arabic_script, darija, 'ha' rule FROM vocabulary WHERE arabic_script ~ 'ح' AND darija !~ '7'
UNION ALL SELECT id, arabic_script, darija, 'kha' FROM vocabulary WHERE arabic_script ~ 'خ' AND darija !~* 'kh'
UNION ALL SELECT id, arabic_script, darija, 'ain' FROM vocabulary WHERE arabic_script ~ 'ع' AND darija !~ '3'
UNION ALL SELECT id, arabic_script, darija, 'ghain' FROM vocabulary WHERE arabic_script ~ 'غ' AND darija !~* 'g'
UNION ALL SELECT id, arabic_script, darija, 'shin' FROM vocabulary WHERE arabic_script ~ 'ش' AND darija !~* 'sh' AND german !~* '(frz\.|franz\.|ital\.|engl\.|lehnwort)'
UNION ALL SELECT id, arabic_script, darija, 'qaf' FROM vocabulary WHERE arabic_script ~ 'ق' AND darija !~* '[qgk]'
UNION ALL SELECT id, arabic_script, darija, 'dhad' FROM vocabulary WHERE arabic_script ~ 'ض' AND darija !~* 'dh'
UNION ALL SELECT id, arabic_script, darija, 'jim' FROM vocabulary WHERE arabic_script ~ 'ج' AND darija !~* 'j' AND german !~* '(frz\.|franz\.|ital\.|engl\.|lehnwort)'
UNION ALL SELECT id, arabic_script, darija, 'zay' FROM vocabulary WHERE arabic_script ~ 'ز' AND darija !~* 'z' AND german !~* '(frz\.|franz\.|ital\.|engl\.|lehnwort)'
UNION ALL SELECT id, arabic_script, darija, 'ha' FROM vocabulary WHERE arabic_script ~ 'ه' AND darija !~* 'h' AND german !~* '(frz\.|franz\.|ital\.|engl\.|lehnwort)'
UNION ALL SELECT id, arabic_script, darija, 'sin' FROM vocabulary WHERE arabic_script ~ 'س' AND darija !~* 's' AND german !~* '(frz\.|franz\.|ital\.|engl\.|lehnwort)'
UNION ALL SELECT id, arabic_script, darija, 'zaa/thal' FROM vocabulary WHERE arabic_script ~ '[ظذ]' AND darija !~* 'th' AND german !~* '(frz\.|franz\.|ital\.|engl\.|lehnwort)';

-- "(f.)" im Deutschen, aber darija endet nicht auf -a (unmarkiertes Femininum? siehe Ausnahmeliste)
SELECT id, darija, german FROM vocabulary
WHERE german ~* '\(f\.\)' AND darija !~ 'a$'
  AND darija !~* '^(w-)?(ukht|umm|bint|saq|yidd|3in|wdin|farmasi|kar|tunis|mistir|susa|kirsh|shams|nar|dar|bit|blad|hethi|shah)(\y|$)';

-- "und" sollte immer "w-" sein, nie eigenständiges "wa"/"u"
SELECT id, darija, german FROM vocabulary
WHERE darija ~ '\y(wa|u)\y' AND darija !~ '\yahla\s+wa\s+sahla\y';

-- Wortanzahl arabic_script vs. darija weicht stark ab (mögliches fehlendes Wort) — Alternativformen mit "/" ausschließen
WITH normed AS (
  SELECT id, arabic_script, darija,
    (SELECT count(*) FROM unnest(regexp_split_to_array(trim(arabic_script), '\s+')) w WHERE w !~ '^(و|وَ|وْ|في)$')
      - (CASE WHEN arabic_script ~ 'شاء الله' THEN 2 ELSE 0 END) AS ar_words,
    (SELECT count(*) FROM unnest(regexp_split_to_array(trim(darija), '\s+')) w
       WHERE w !~* '^(el|il|es|et|ej|ed|en|er|ez|eth|w|l|b|f)$') AS tr_words
  FROM vocabulary
  WHERE arabic_script IS NOT NULL AND darija IS NOT NULL AND arabic_script <> '' AND darija <> ''
    AND arabic_script !~ '/' AND darija !~ '/'
)
SELECT * FROM normed WHERE abs(ar_words - tr_words) >= 2;

-- Artikel ال im Arabischen, aber in darija nicht erkennbar (Kontraktionsformen 3al-/al-/bare-Doppelkonsonant mit einrechnen!)
SELECT id, arabic_script, darija FROM vocabulary
WHERE arabic_script ~ '(^|\s)ال\S'
  AND regexp_replace(arabic_script, '[ً-ٰٟ]', '', 'g') !~ 'الله'
  AND darija !~* '\y(w|b|l|f|m)?(el|il|es|esh|ed|ej|et|en|er|eth|ez|as|l)([a-z0-9-]|\y)'
  AND darija !~* 'al-'
  AND darija !~* '([a-z]{1,2})-\1';
```

**Wichtig — Postgres-Regex-Falle:** Wortgrenze ist `\y`, NICHT `\b` (das ist in Postgres ein Backspace-Zeichen, matcht lautlos nichts). Bei jedem neuen Regex mit Wortgrenzen einmal kurz gegen ein Testwort verifizieren, bevor auf das Ergebnis (0 Treffer) vertraut wird.

**Zusätzlicher Check nach größeren Batches: Konsonanten-Skelett-Vergleich neu vs. alt** (findet Vokalvarianten-Duplikate, die der normale Duplikat-Check übersieht — `normKey()` entfernt keine Vokale, `yqoum` matcht `yqum` dort NICHT). Eingeschränkt auf dieselbe `lesson_id` (sonst zu viele Zufallstreffer):
```sql
WITH cons AS (
  SELECT id, arabic_script, darija, german, lesson_id,
    regexp_replace(lower(regexp_replace(darija,'[^a-z0-9]','','g')), '[aeiou]', '', 'g') AS ck
  FROM vocabulary WHERE lesson_id IN (/* betroffene lesson_ids */)
),
newv AS (SELECT * FROM cons WHERE id >= /* erste neue id im Batch */),
oldv AS (SELECT * FROM cons WHERE id < /* erste neue id im Batch */)
SELECT n.id nid, n.darija ndar, n.german nger, o.id oid, o.darija odar, o.german oger
FROM newv n JOIN oldv o ON n.ck = o.ck AND n.lesson_id = o.lesson_id;
```
Jeden Treffer einzeln prüfen — echte Duplikate von Zufallskollisionen unterscheiden (z.B. `yaqli`="braten" vs. `yqul`="sagen" kollidieren zufällig auf `yql`, sind aber verschiedene Wörter).

**Variante für den Bestandsaudit (seit 2026-09-12): Vokal-Dubletten im ganzen Bestand, ohne Batch-Grenze.** Die Fassung oben braucht eine „erste neue id" und eine `lesson_id`-Eingrenzung — sie findet deshalb nur Dubletten *innerhalb eines frischen Imports*. Vokal-Varianten, die über Jahre und Lektionsgrenzen hinweg entstanden sind, bleiben unsichtbar. Diese Fassung ersetzt die Batch-Eingrenzung durch einen Bedeutungs-Filter (Glosse müssen sich überlappen), was die Zufallstreffer erschlägt:

```sql
WITH v AS (
  SELECT id, darija, german, arabic_script,
    regexp_replace(lower(regexp_replace(darija,'[^a-z0-9]','','g')),'[aeiou]','','g') AS skel,
    lower(regexp_replace(regexp_replace(german,'\([^)]*\)','','g'),'[^a-zäöüß]','','g')) AS gkey
  FROM vocabulary WHERE darija IS NOT NULL AND darija <> '' AND NOT homonym_ok
)
SELECT a.id, a.darija, a.german, b.id, b.darija, b.german,
       (regexp_replace(a.arabic_script,'[ً-ٰٟ]','','g') = regexp_replace(b.arabic_script,'[ً-ٰٟ]','','g')) AS gleiches_arabisch
FROM v a JOIN v b ON a.skel = b.skel AND a.id < b.id AND length(a.skel) >= 3
WHERE lower(a.darija) <> lower(b.darija)
  AND (a.gkey = b.gkey OR a.gkey LIKE '%'||b.gkey||'%' OR b.gkey LIKE '%'||a.gkey||'%')
ORDER BY gleiches_arabisch DESC, a.id;
```

Erster Lauf 2026-09-12: **177 Verdachtspaare**, davon 166 in Zeilen ohne `conjugation` — also in dem Teil des Bestands, den der batch-gebundene Check nie erreicht hat. `gleiches_arabisch = true` ist die schärfste Teilmenge (14 Paare); Stichprobe daraus von Hand beurteilt: **8 echt, 6 Fehlalarme**.

**Die Fehlalarme folgen vier wiederkehrenden Mustern — alle am `german`-Feld erkennbar, vor der Vorlage herausfiltern:**

| Muster | Beispiel | Erkennbar an |
|---|---|---|
| m/f-Paar desselben Adjektivs | `qsir` / `qsira` „kurz (m.)/(f.)" | `(m.)` vs. `(f.)` im Gloss |
| Imperativ vs. Vergangenheit | `l3ab` „er spielte" / `el3ab` „spiel!" | `(Imperativ)` bzw. `!` |
| Imperativ vs. Partizip | `weqif` „steh!" / `waqif` „stehend" | Partizip-Gloss auf `-end` |
| Kollektiv vs. Nomen unitatis | `rmal` „Sand" / `ramla` „Sand (f.)" | `(f.)` bei Stoffnamen |

Diese Paare sind **korrekt und dürfen nicht zusammengelegt werden** — bei Imperativ/Vergangenheit ggf. `homonym_ok=true` setzen, wenn die Schreibung wirklich identisch wird.

**Filter-Feinheit, die zählt (2026-09-12 durchgemessen):** Ein `(f.)`-Marker auf *einer* Seite ist KEIN Ausschlusskriterium — das killt echte Dubletten (`djeja` „Henne / Huhn (f.)" ↔ `djaja` „Huhn", `neyy` „roh (m.)" ↔ `nayy` „roh"). Ausschließen nur, wenn **beide** Seiten gegensätzliche Marker tragen:

```sql
  AND NOT ((a.m AND b.f) OR (a.f AND b.m))   -- echtes m/f-Paar
  AND NOT (a.pl <> b.pl) AND NOT (a.sg <> b.sg)  -- Numerus-Paar
  AND NOT (a.imp <> b.imp)                   -- Imperativ vs. andere Form
  AND NOT (a.part <> b.part)                 -- Partizip vs. andere Form
```
Gegen eine Kontrollmenge von 14 handgeprüften Paaren validiert: alle 8 echten überleben, 4 von 6 Fehlalarmen fallen raus.

**Wichtigste Lehre — nur `gleiches_arabisch = true` ist eine Arbeitsliste.** Roh 177 Paare, nach allen Filtern 71. Von den 61 Paaren mit *unterschiedlichem* `arabic_script` ist praktisch keines eine Dublette, sondern korrekte Morphologie: `khamsa`/`khams` (fünf/fünfter), `3ashra`/`3shour` (zehn/zehnter), `khobz`/`khobza` (Brot / ein Brot), `qrib`/`qriba` (nah m./f.), `forshita`/`frashit` (Gabel Sg/Pl). Viele davon tragen **gar keinen Marker im Gloss**, sind also durch keinen Filter aussortierbar. Die 10 Paare mit identischem Arabisch enthielten dagegen 8 echte Dubletten.

→ **Beim nächsten Lauf nur die `gleiches_arabisch`-Teilmenge vorlegen.** Den Rest nicht aufrollen — das war der Irrweg, den dieser Durchgang einmal gegangen ist.

**Duplikat-Prüfung nach `normKey()`-Logik (App-Tab „🔍 Duplikat-Prüfung" 1:1 nachgebaut):**
```sql
WITH norm AS (
  SELECT id, darija, arabic_script, german,
    lower(regexp_replace(arabic_script, E'[\\s.,;:!?()/\\\\''"«» -]+', '', 'g')) AS ar_key,
    lower(regexp_replace(darija, E'[\\s.,;:!?()/\\\\''"«» -]+', '', 'g')) AS tr_key,
    lower(regexp_replace(german, E'[\\s.,;:!?()/\\\\''"«» -]+', '', 'g')) AS en_key
  FROM vocabulary
)
SELECT 'Arabisch' AS field, ar_key AS key, array_agg(id ORDER BY id) AS ids, array_agg(darija ORDER BY id) AS darijas
FROM norm WHERE arabic_script IS NOT NULL AND arabic_script <> ''
GROUP BY ar_key HAVING count(*) > 1
UNION ALL
SELECT 'Transliteration', tr_key, array_agg(id ORDER BY id), array_agg(darija ORDER BY id)
FROM norm WHERE darija IS NOT NULL AND darija <> ''
GROUP BY tr_key HAVING count(*) > 1
UNION ALL
SELECT 'Deutsch', en_key, array_agg(id ORDER BY id), array_agg(darija ORDER BY id)
FROM norm WHERE german IS NOT NULL AND german <> ''
GROUP BY en_key HAVING count(*) > 1
ORDER BY field, key;
```

⚠️ **Der `ar_key` oben ist diakritika-empfindlich — das ist Absicht (er bildet die App nach), aber als Duplikat-Prüfung ist er blind.** Zwei Zeilen mit demselben arabischen Wort sind für ihn verschiedene Wörter, sobald sie unterschiedlich vokalisiert sind: **6 Gruppen** gegen **86** mit gestripptem Vokal. Den folgenden Check deshalb **zusätzlich** laufen lassen — er geht bewusst über das hinaus, was der App-Tab kann.

**Arabischer Duplikat-Check, vokalisierungs-unabhängig (seit 2026-09-12).**
```sql
WITH v AS (
  SELECT id, darija, german, homonym_ok,
    lower(regexp_replace(regexp_replace(arabic_script,'[ًٌٍَُِْٰٟ]','','g'),
                         E'[\\s.,;:!?()/\\\\''"«» -]+','','g')) AS k
  FROM vocabulary WHERE arabic_script IS NOT NULL AND length(arabic_script) > 2
)
SELECT k, count(*) AS n, bool_or(homonym_ok) AS hom,
       string_agg(id||' '||darija||' = '||left(german,40), '  ||  ' ORDER BY id) AS zeilen
FROM v GROUP BY k HAVING count(*) > 1 ORDER BY n DESC, k;
```

**Die Schadda gehört NICHT in die Stripliste.** Sie ist ein Konsonantenverdopplungszeichen, kein Vokalzeichen — sie mitzustrippen verschmilzt Form I und Form II (حَضَر „er nahm teil" gegen حَضَّر „er bereitete vor") und erzeugt 40 Scheingruppen. 126 Gruppen mit Schadda gestrippt gegen 86 ohne; die Differenz sind genau diese Paare.

**Fehlalarm-Profil (erster vollständiger Lauf, 86 Gruppen):**

| Muster | Gruppen | |
|---|---|---|
| `-it`/`-t`-Verbpaar (3. Pers. f. gegen 1. Pers. Vergangenheit) | 21 | strukturell, der Bestand legt es für jedes Verb an |
| bereits `homonym_ok` | 17 | Check arbeitet korrekt |
| echt verschiedene Wörter mit gleichem Gerüst | ~30 | `morra`/`marra`, `ktob`/`ktib`, `3irq`/`3araq`, `jomal`/`jmal` |
| Imperativ/Vergangenheit derselben Wurzel | ~5 | kein Duplikat, aber `homonym_ok`-Kandidaten |
| **echte Funde** | **17** | ~20 % Trefferquote |

**Beim Prüfen nicht auf „Dublette ja/nein" verengen.** Gleiches Arabisch kann auch heißen, dass eine der beiden Zeilen inhaltlich falsch ist. Präzedenzfall `metrobbi` (PRECEDENTS.md): zwei Zeilen mit identischem Arabisch trugen **gegenteilige** Glosse, und die Quellenprüfung zeigte, dass nicht die eine die Dublette der anderen war, sondern beide Glosse invertiert. Jede Gruppe gegen Ninja/TUNICO/Peace Corps prüfen, nicht nur gegeneinander.

**Verb-Selbstcheck: Zeile gegen die eigene `conjugation`-Tabelle (seit 2026-09-12).** Eine feste Verb-Zeile mit Konjugationstabelle muss ihre eigene `darija`-Form in einer Zelle dieser Tabelle wiederfinden — sonst lehrt die Karteikarte eine andere Schreibung, als das 🔠-Blatt daneben zeigt. Rein interner Vergleich, keine externe Quelle nötig, **keine Fehlalarme möglich**. Deshalb vor jedem externen Abgleich laufen lassen, nicht danach.

```sql
SELECT v.id, v.darija, v.german, v.topic
FROM vocabulary v
WHERE v.conjugation IS NOT NULL AND NOT v.conj_rotate
  AND NOT EXISTS (
    SELECT 1 FROM jsonb_each(v.conjugation) b(bn,bv), jsonb_each(bv) s(sn,cell)
    WHERE jsonb_typeof(bv)='object'
      AND lower(btrim(cell->>'darija')) = lower(btrim(v.darija)))
ORDER BY v.id;
```

`conj_rotate=true` ist ausgenommen — dort ist der Zeilenwert bewusst nur ein Anzeigewert und muss nicht in der Tabelle stehen. Erster Lauf 2026-09-12: 49 Treffer von 670 Zeilen, vollständig klassifiziert in `exports/pruefliste_2026-09-12.md`. Die Treffer zerfallen in sechs Klassen — Plural-`-ou`, Klammer-Zusatz im `darija`-Feld, Vokal-/Imala-Abweichung, fehlende Gemination, Vergangenheits-Endung, Phrase-mit-Verbtabelle. **Nur die ersten beiden sind mechanisch entscheidbar**, bei den übrigen steht Hausschreibung gegen TUNICO-Übernahme und es braucht Einzelprüfung.

Ergänzende Struktur-Checks am selben Datenbestand (Zahlen vom 2026-09-12):
```sql
-- Verbgruppen: 3-Zeilen-Ziel, rotierende Zeile, Tabellen-Synchronität
WITH c AS (SELECT id, darija, conjugation, conj_rotate, tunico_verb_id
           FROM vocabulary WHERE conjugation IS NOT NULL),
grp AS (
  SELECT COALESCE(tunico_verb_id::text,
                  'skel:'||regexp_replace(lower(regexp_replace(darija,'[^a-z0-9]','','g')),'[aeiou]','','g')) AS verb_key,
         count(*) AS zeilen,
         count(*) FILTER (WHERE conj_rotate) AS rotierend,
         count(DISTINCT conjugation::text) AS versch_tabellen,
         string_agg(id::text||':'||darija, ' | ' ORDER BY id) AS formen
  FROM c GROUP BY 1)
SELECT * FROM grp WHERE zeilen <> 3 OR rotierend <> 1 OR versch_tabellen > 1 ORDER BY zeilen, verb_key;
```
Stand 2026-09-12: 181 Gruppen, davon 87 auf dem 3-Zeilen-Ziel, 22 mit nur einer Zeile, 68 mit Altbestand > 3 Zeilen (bleiben laut Bestandspflege-Regel unangetastet), 88 ohne rotierende Zeile (davon 62 mit ≥3 Zeilen — dort reicht ein `conj_rotate`-Flag auf einer vorhandenen Zeile, keine Neuanlage), 3 mit auseinandergelaufenen Tabellen, 35 Zeilen mit unvollständiger Tabelle. Zusätzlich 169 Verb-Zeilen ganz ohne `conjugation` — ob das Modell auf die ausgeweitet wird, ist offen.

**Plural-Endung `-iou`/`-eou`/`-aou` (seit 2026-09-12, auch als Regel 21 in `TRANSLIT_RULES`).** Die Hausregel „Plural يفعلوا → `-iw`" stand bisher ohne Prüfung in der Konventionstabelle. Erster Lauf: 13 Treffer, alle echt, keine Fehlalarme.
```sql
SELECT id, darija, german FROM vocabulary WHERE darija ~ '(iou|eou|aou)(\y|$)';
```
Bei mehrwortigen Einträgen steht die Endung teils mehrfach im Feld — jedes Vorkommen prüfen, nicht nur das erste.

**Gemination: Schadda im Arabischen, aber kein Doppelbuchstabe in `darija` (Kandidat, seit 2026-09-12).** Setzt Lautlehre-Regel 2 um. **Verdachtsliste, keine Fehlerliste** — Stichprobe 16 von 93 Treffern: 11 echt, 5 Fehlalarme (~15 %). Deshalb bewusst NICHT in `TRANSLIT_RULES` übernommen, sonst stünde der Prüf-Tab dauerhaft auf ~93 statt auf 0.
```sql
SELECT id, arabic_script, darija, german FROM vocabulary
WHERE arabic_script ~ 'ّ'
  AND regexp_replace(lower(darija),'(sh|th|kh|gh|ch|dh)','#','g') !~ '([a-z0-9#])\1'   -- Digraphen als Einheit
  AND lower(darija) !~ '\y(w-)?(l|b|f|m)?(el|il|le|li|es|esh|et|eth|ej|ed|en|er|ez)-' -- Artikel, auch nach Präposition
  AND regexp_replace(arabic_script,'[ً-ٰٟ]','','g') !~ '(^|\s)ال'
  AND german !~* '(frz\.|franz\.|ital\.|engl\.|lehnwort)'
  AND regexp_replace(arabic_script,'[ًٌٍَُِْٰٟ]','','g') !~ 'ّ\s*$'                     -- wortfinale Schadda
ORDER BY id;
```
Restliche Fehlalarm-Muster (nicht weiter automatisierbar): Kontraktionsformen, bei denen das Arabische die volle Form schreibt (`shnoua` ← شْنُوَّا); mehrwortige Phrasen, bei denen die Schadda in einem anderen Wort sitzt; unmarkierte Fremdwörter (`rouba` ← رُوبَّا — mit `(frz.)` im Gloss automatisch ausgeschlossen). Zwei Gruppen im Ergebnis als Block entscheiden, nicht einzeln: Nationalitäten-Feminina auf ـِيَّة (8 Zeilen + 2 Plurale) und Form-II-Verbpaare (Präsens/Vergangenheit desselben Verbs, 10 Zeilen) — sonst laufen Geschwisterformen auseinander.

**Halb verdoppelter Digraph (seit 2026-09-12).** Scharfer Zusatz-Check zum Gemination-Check darüber: findet `ddh`/`tth`/`ssh`/`kkh`/`ggh`, also Geminationen, bei denen nur der erste Buchstabe des Digraphen gedoppelt wurde. Begründung der Regel: SKILL.md → Digraph-Gemination, Historie: PRECEDENTS.md.
```sql
SELECT id, darija, arabic_script, german,
       public._translit_skeleton(darija) AS ts, public._arabic_skeleton(arabic_script) AS as_
FROM vocabulary
WHERE darija ~ '(ddh|tth|ssh|kkh|ggh|7h|thh)'
  AND darija !~ '(dhdh|thth|shsh|khkh|ghgh|77)'
ORDER BY id;
```
**Pflicht-Gegenprobe vor jeder Korrektur — `tth` ist fast immer ein Fehlalarm:** in TUNICO (9/9), Ninja (17/17) und im eigenen Bestand (2/2) war jedes `tth` ein Morphemgrenzen-`t` vor `th` (`netthaowb` ← نِتْثَاوَب, `tthba7` ← تَذْبَح), keine Gemination. Entscheidungskriterium ist nicht die Buchstabenfolge, sondern das Arabische: steht dort eine Schadda auf ذ/ظ, ist es Gemination; steht ein eigenes ت davor, ist die Zeile korrekt. Kürzester Selbsttest: `_translit_skeleton(darija)` gegen `_arabic_skeleton(arabic_script)` halten — bei echter Fehlschreibung laufen die beiden an genau dieser Stelle auseinander (`7addhar` → `7ddhr` vs. `7dhdhr`), bei einem Präfix-`t` stimmen sie dort überein. **Bei mehrwortigen Zeilen die Stelle vergleichen, nicht die ganzen Strings** — die können aus völlig anderen Gründen abweichen. Beispiel id 3073: `tthb7` steht in beiden Skeletten identisch (also korrektes Präfix-`t`), die Gesamt-Skelette unterscheiden sich trotzdem, weil in derselben Zeile zwei andere Fehler stecken (`essakina` statt `essakkina` zu السِّكِّينَة, `brrsha` statt `barsha` zu بَرْشَة).

**⚠️ Zeichenreihenfolge: Vokalzeichen stehen VOR der Schadda (entdeckt 2026-09-12).** Im Bestand steht die Schadda in **803** Zeilen nach dem Vokalzeichen (`ي` + Kasra + Schadda = `064a 0650 0651`) und nur in **16** davor. Die kanonische Unicode-Reihenfolge ist die umgekehrte. Folge: **jede Prüfregel der Form `<Buchstabe>ّ` verfehlt ~98 % des Bestands und meldet stillschweigend nichts** — dieselbe Falle wie `\b` statt `\y`. Immer die Vokalzeichen mit erlauben:
```sql
-- FALSCH: findet fast nichts
WHERE arabic_script ~ 'يّ'
-- RICHTIG:
WHERE arabic_script ~ 'ي[ًٌٍَُِْٰ]*ّ'
```
`arabic_script ~ 'ّ'` allein (Schadda irgendwo) ist von der Reihenfolge unabhängig und bleibt gültig.

**Gemination von ya: `yy` (belegt 2026-09-12).** Schadda auf ي wird transliteriert wie jede andere Gemination. Eigener Bestand **67 : 14** (`mayyit`, `tayyab`, `ykhayyat`, `7orriyya`, `bnayya`), TUNICO **14/14** (`xayyāṭ`→`khayyat`, `ṛayyaḥ`→`rayya7`), Ninja **14/14** (`خَيَّاطْ`→`5ayyat`, `بَيِّنْ`→`bayyin`). Von den 14 Gegenbeispielen waren nach Prüfung 14 echte Fehler oder Lehnwörter; korrigiert wurden u.a. `taybit`→`tayybit`, `maytin`→`mayyitin` (Geschwister 2290 `mayyit`), `rwayeq`→`rwayyeq`, `mdhayef`→`mdhayyef`.
```sql
SELECT id, darija, arabic_script, german FROM vocabulary
WHERE arabic_script ~ 'ي[ًٌٍَُِْٰ]*ّ' AND darija !~ 'yy' ORDER BY id;
```

**Gemination von waw: bewusst NICHT entschieden (Stand 2026-09-12).** Die ya-Regel lässt sich **nicht** auf و übertragen. Ninja schreibt هُوَ (ohne Schadda) als `houwa` — das `w` ist dort der Buchstabe Waw selbst, nicht die Verdopplung; erst bei echter Schadda kommt `ww` (تَوَّا → `tawwa`). Im eigenen Bestand ist die هو/هي-Familie in sich uneinheitlich: 493 `houa`/هُوَ, 1445 `houa`/هُوَّ, 3339 `houwa`/هُوَّ, 3340 `hiyya`/هِيَّ, 3812 `ahuwa`/أَهُوَّا, 1782+3747 `houa`/هو — sechs Zeilen, vier Arabisch-Varianten, drei Transliterationen. **Erst als Block entscheiden (wie bei `3ayshik`), nicht einzeln korrigieren.** Präzedenzfall dazu: eine Einzelkorrektur `ahuwa`→`ahuwwa` wurde am selben Tag wieder zurückgenommen, weil sie die Zeile von ihren Geschwistern abgekoppelt hätte.

**Skelett-Vergleich als Vorfilter für Liste C (seit 2026-09-12).** `public._translit_skeleton(darija)` gegen `public._arabic_skeleton(arabic_script)` trennt die Schadda-Verdachtsliste viel schärfer als die Regex allein: bei 69 Verdachtszeilen waren 48 skelett-uneinig und 21 einig; unter den einwortig-uneinigen waren nach Prüfung 28 von 35 echte Fehler. Als erste Spalte in jede Verdachtsabfrage aufnehmen und nach `ts <> as_` sortieren.

**Nach jeder Verbkorrektur die ganze Wurzelfamilie durchsehen (seit 2026-09-12).** Der Schadda-Check sieht nur vokalisierte Zeilen. Geschwisterformen mit unvokalisiertem `arabic_script` tragen denselben Fehler und bleiben unsichtbar — bei der `naththaf`/`7adhdhar`/`ba77ar`-Runde waren das 4 zusätzliche Zeilen (`ynathaf` ينظف, `tnathaf` تنظف, `n7adhar` نحضر, `ba7har` بحر), gefunden nur durch die gezielte Geschwistersuche. Gleicher blinder Fleck wie bei `4444 marroukiya`.

**`conjugation` immer mitziehen (seit 2026-09-12).** Eine `darija`-Korrektur an einer Verbzeile muss dieselbe Ersetzung in `conjugation` machen — auch für Formen, die keine eigene Vokabelzeile haben (`nathamna`, `ba7hru`, `ba7hret`). Sonst steht das `darija` der Zeile nicht mehr in ihrer eigenen Tabelle und der Verb-Selbstcheck meldet sie sofort. In der Gruppe-2-Runde betraf das 8 von 31 geänderten Zeilen. Vorher prüfen:
```sql
SELECT id, darija FROM vocabulary WHERE conjugation::text ~ '<alte_schreibung>';
```
Ebenso `course_lessons.vocab_lesson_refs` gegen die alte Schreibung prüfen (`darija:`-Teil referenziert über den Wortlaut, nicht über die id).

**Das `arabic_script` kann der Fehler sein, nicht die Transliteration (seit 2026-09-12).** Zwei Fälle aus Gruppe 2: `3023 bnin` „lecker" trug بَنِّين mit Schadda, TUNICO hat aber `bnīn` (langes ī, keine Gemination); `1087 skhan` „heiß (Pl.)" trug سَخَّان — das heißt „Boiler"/„erhitzen" (TUNICO `saxxan`), der Plural zu سْخُون ist سْخَان. Beide wären ohne Quellenprüfung als „fehlende Gemination" genau falsch herum korrigiert worden. Bei jedem Treffer, dessen Wurzel im Gloss nicht zum Arabischen passt, erst die Quelle fragen.

**Bekannte Fehlalarm-Fallen bei diesen Checks (nicht blind fixen):**
- Französische/italienische Lehnwörter — im `german`-Feld `(frz.)`/`(ital.)`/`(engl.)`/`(Lehnwort)` markieren statt Transliteration zu erzwingen
- غ/ق können dialektal zu "g"/"k" verschoben sein (ngammed, bargouth, bgar, maktou3) — kein Fehler, Regel akzeptiert das bereits
- Eigennamen/etablierte Lehnwörter (Mohamed, Hammam): konsequent transliterieren ("7 immer", Entscheidung 2026-08-06), keine Ausnahme
- "إن شاء الله"/"الله" verzerren Wortanzahl-/Artikel-Check — beide Regeln schließen das bereits aus
- Kontrahierte Artikelformen nach vokal-endender Präposition (`3al-kar`, `fis-sma`) sind korrekt

**Konsonanten-Gegenchecks ج/ز/ه/س** sind mit im SQL oben — Details zum ersten Testlauf (8 echte Bestandsfehler, u.a. systematische ه→7-Verwechslung): PRECEDENTS.md → Prüfungen nach jedem Import.

**Neue Checks aus Kurs-Grammatiknotizen ableiten — wiederkehrende Praxis, nicht einmalig.** `grammar_notes` in `course_lessons` (siehe COURSE_MODE.md) enthalten viele Regeln — nur solche aufnehmen, die rein aus `darija`/`german`/`arabic_script` ableitbar sind, OHNE Wortart-Wissen/Kontext (wie die Sonnenbuchstaben-Regel). Bei jeder neuen/überarbeiteten Lektion erneut versuchen. **Immer erst gegen den Bestand testen (Fehlalarmquote) und zeigen, bevor eine Regel dauerhaft in `TRANSLIT_RULES` übernommen wird.** Bisher 7 Kandidaten getestet, 3 in `TRANSLIT_RULES` übernommen (unmarkierte Feminina, "und"=immer "w-", Plural-Endung `-iou`), 2 verworfen (Verb-Personalpräfix, m/f-Adjektivpaare=masc+"a" — beide an Dialekt-Realität gescheitert, Details: PRECEDENTS.md → Prüfungen nach jedem Import), 2 bewusst nur als SQL im Skill (Verb-Selbstcheck: gehört in den Prüfablauf, nicht in den Transliterations-Tab; Gemination: ~15 % Fehlalarme, würde den Tab dauerhaft rot halten).

**Faustregel aus diesen 7 Läufen:** Eine Regel gehört nur dann in `TRANSLIT_RULES`, wenn sie nahe an 0 % Fehlalarme liegt — der Wert der beiden Prüf-Tabs liegt darin, dass „0 Treffer" wirklich „sauber" heißt. Alles mit Restunschärfe bleibt SQL im Skill und wird als Verdachtsliste abgearbeitet.

## Workflow: Geflaggte Vokabeln (🚩) live gegen Derja Ninja prüfen

Wenn Nils im Trainer Vokabeln mit 🚩 markiert, ist das der Auftrag, sie zu recherchieren und Korrekturvorschläge in `vocabulary_review` einzutragen — die eigentliche Recherche läuft außerhalb der App, der Ninja-Check-Tab im Trainer ist nur für die menschliche Freigabe/Ablehnung. Kein automatisches UPDATE direkt auf `vocabulary`, außer der Eintrag ist zweifelsfrei bereits korrekt (Schritt 6).

Auslöser: "Ich habe Vokabeln markiert" → `SELECT * FROM vocabulary WHERE flagged = true` als erster Schritt. **Sofort danach, für den ganzen Batch als EINE Sammelabfrage:** `SELECT * FROM vocabulary_review WHERE vocabulary_id IN (<alle IDs>)` — Konflikt-Check ganz am Anfang, bevor ein Korrekturplan gebaut wird (nicht erst kurz vorm Schreiben, sonst muss ein fertiger Plan nachträglich umgebaut werden).

### Ablauf pro geflaggter Vokabel

0. **Interne Konsistenz-Checks zuerst — kostenlos, kein externer Request nötig, vor dem Ninja/TUNICO/Peace-Corps-Abgleich.** Deckt eine andere Fehlerklasse ab als der externe Abgleich: eine Vokabel kann extern bestätigt sein und trotzdem kaputt vokalisiert/transliteriert sein. Für den ganzen geflaggten Batch als SQL (siehe "Transliterations-Check" oben für die fertigen Regex-Queries):
   - Vokalisierungs-Vollständigkeit (`arabic_script` komplett ohne Harakat/Sukun?)
   - Konsonanten-Gegencheck arabic_script vs. darija (ح→7, خ→kh, ع→3, غ→gh, ش→sh, ق→q/g/k, ض→dh)
   - Ziffern (2/5/9) oder Großbuchstaben in `darija`
   - Wortanzahl-Abgleich arabic_script vs. darija (Hinweis auf fehlende/zusätzliche Wörter)
   - "/" im `german`-Feld: echte Synonyme vs. Bedeutungskollision (sollte `;` sein) — Testkriterium siehe Duplikat-Check-Regeln oben
   - "/" im `darija`- oder `arabic_script`-Feld: Schrägstrich-Muster gehört aufgeteilt (siehe Verben-Regeln) — der Duplikat-Check normalisiert den ganzen String inkl. "/" zu einem Key und übersieht dadurch bestehende Einzelform-Einträge
   - Präsens-Verb mit Infinitiv-Gloss statt 3. Person Singular
   - Plural-Endung `-iou`/`-eou`/`-aou` statt `-iw`/`-aw`
   - Gemination: Schadda im Arabischen ohne Doppelbuchstaben in `darija` (Verdachtsliste, ~15 % Fehlalarme)
   Funde hier vor Schritt 6 mit korrigieren, nicht getrennt von den Ninja-Funden behandeln.

0b. **Wenn die geflaggte Vokabel ein Verb ist, zusätzlich das 3-Zeilen-Modell prüfen** (Details: "Verb-Konjugationsmodell" oben). Eine einzelne geflaggte Verbform sagt nichts darüber, ob die anderen beiden Zielzeilen existieren — Präzedenzfall 2026-09-12: `y7jem` (id 3614) war als „eine Zeile, Tabelle dran, fertig" durchgegangen, tatsächlich fehlten 2 von 3 Zeilen und die Tabelle hatte weder `past` noch `imperative`.
   - **Verb-Selbstcheck zuerst** (SQL oben): steht die eigene `darija`-Form in der eigenen `conjugation`-Tabelle? Das ist der billigste Test und fängt falsch zugeordnete Tabellen, Klammer-Zusätze im Feld und Schreibkonflikte in einem Durchgang.
   - Bestand nach Präsens-Grundform UND Vergangenheit-Grundform desselben Verbs durchsuchen — **auch unter Alt-Topics und `topic IS NULL`**, per Konsonantenskelett (Pflicht-Suchschritt im Verb-Konjugationsmodell).
   - Prüfen, ob eine dritte rotierende Zeile (`conj_rotate=true`) existiert. Fehlt sie, aber es gibt bereits ≥3 Zeilen, reicht ein Flag auf einer vorhandenen Zeile — keine Neuanlage.
   - `tunico_verb_id` gegen `tunico_corpus_verbs` prüfen (Konsonantenskelett gegen `forms_chatalpha[]`) und verknüpfen, falls dort gelistet. **Kein Treffer ist kein Mangel:** die Korpustabelle enthält nur die 300 häufigsten Verben, ein reguläres Lexikon-Verb aus `tunico_import` steht dort nicht und behält korrekt `tunico_verb_id = NULL`.
   - `conjugation` an allen Zeilen des Verbs synchron halten — Stand 2026-09-12 sind 3 Gruppen bereits auseinandergelaufen.
   - **Fehlende Zielzeilen werden als Vorschlagsliste gezeigt, nicht direkt geschrieben** (siehe Neuanlage-Regel im Verb-Konjugationsmodell).
1. **Offline-Quellen zuerst, in dieser Reihenfolge — alle drei, nicht nur die erste** (Details zu jeder Tabelle: IMPORTS.md):
   1. `derja_ninja_entries` — schnell, aber ein Snapshot (2026-08-17), kann bei mehrteiligen Begriffen unvollständig sein.
   2. `tunico_import` (Englisch-Übersetzung als Suchschlüssel gegen `senses`/`de_gloss`) — liefert oft das komplette Bedeutungsspektrum eines mehrdeutigen Worts, wo ein einzelner Ninja-Treffer nur eine Facette zeigt.
   3. `peacecorps_dict_import` (Englisch-Übersetzung gegen `headword`/`senses`) — dritte unabhängige Quelle, v.a. bei älterem/ungewöhnlichem Lehrbuchvokabular ohne Ninja-/TUNICO-Treffer.
   Erst wenn KEINE der drei einen Treffer liefert, gilt eine Vokabel als "keine externe Bestätigung" — nicht schon nach `derja_ninja_entries` allein.
2. **Live-Check, wenn keine der drei Offline-Quellen etwas liefert:** siehe IMPORTS.md → Abgleich mit Derja Ninja für URL-Schema, HTML-Struktur und den Ninja-eigenen Transliterations-Schlüssel für `script=transliterated`-Suchen.
3. **Ninjas Transliteration ist ein Strukturhinweis, keine Vorlage** — nie 1:1 übernehmen (andere Konvention: ch statt sh, 9 statt q), aber prüfen ob sie ein von unserer Transliteration übersehenes Feature zeigt (v.a. Gemination). In Chat-Alphabet übertragen.
4. **Klassifizieren:**
   - arabic_script + Bedeutung bestätigt → ggf. nur Transliteration korrigieren und/oder Audio ergänzen
   - arabic_script oder Bedeutung weicht ab → Korrektur mit Begründung vorschlagen
   - Kein eigener Treffer, aber in Beispielsätzen anderer Einträge bestätigt → Bedeutung gilt als bestätigt, kein Audio → `ninja_check_kein_vorschlag`
   - Gar kein Treffer → ebenfalls `ninja_check_kein_vorschlag`, im `change_reason` transparent machen
   - **Nur diese zwei exakten Strings für `change_category` beim Schreiben:** `ninja_check_pending` und `ninja_check_kein_vorschlag`. Keine eigenen Varianten — die App filtert im Ninja-Check-Tab hart auf diese Werte.
   - **Die App schreibt vier weitere Werte zurück** (nie selbst setzen, aber beim Lesen kennen — sie sagen, was mit einem früheren Vorschlag passiert ist):

     | Wert | Von wem | Bedeutung |
     |---|---|---|
     | `ninja_check_uebernommen` | ✅-Knopf | Vorschlag übernommen, `vocabulary` ist aktualisiert |
     | `ninja_check_ignoriert` | 🚫-Knopf | Vorschlag abgelehnt — **nicht erneut denselben Vorschlag machen** |
     | `ninja_check_kein_vorschlag_bestaetigt` | 👍-Knopf | „keine Quelle gefunden" zur Kenntnis genommen |
     | `ninja_check_kommentiert` | 💬-Knopf | **Nils hat einen Hinweis hinterlassen — das ist ein Auftrag, siehe unten** |

   - **`ninja_check_kommentiert` ist die wichtigste dieser vier.** Der 💬-Knopf („Erneut prüfen lassen") schreibt einen Freitext nach `vocabulary_review.user_comment` und setzt `reviewed=false`. Das ist der einzige Rückkanal von Nils zur nächsten Session: Kontext, Vermutung oder ein alternativer Suchbegriff zu einer Vokabel, die beim ersten Anlauf nicht auffindbar war. **Bei jedem 🚩-Durchgang mitabfragen**, nicht nur `flagged`:

     ```sql
     SELECT vocabulary_id, user_comment, change_reason
     FROM vocabulary_review
     WHERE change_category = 'ninja_check_kommentiert' AND NOT reviewed;
     ```
     Mit dem Hinweis erneut suchen und das Ergebnis wieder als `ninja_check_pending`/`ninja_check_kein_vorschlag` schreiben, damit es im Tab wieder sichtbar wird.
5. **Vor dem Schreiben:** bestehende `vocabulary_review`-Zeilen prüfen (idealerweise schon als Sammelabfrage am Anfang, siehe oben) — auch mit `change_category IS NULL` (für Nils im Tab unsichtbare Altlasten).
   - **Technischer Zwang:** `vocabulary_review.vocabulary_id` hat UNIQUE-Constraint. Zweiter INSERT crasht mit `23505 duplicate key` — immer erst SELECT, dann UPDATE statt INSERT wenn schon eine Zeile existiert.
   - **Konflikt-Check:** bestehende Zeile mit abweichendem Vorschlag (z.B. `partner_status='pending'` mit anderem Wort) → nie stillschweigend überschreiben, beide Versionen zeigen, Nils entscheiden lassen.
   - **Ausnahme — erkennbare Altlast:** ohne Rückfrage überschreibbar nur wenn kein `change_reason`/`change_category` UND der aktuelle `vocabulary`-Wert bereits sichtbar abweicht. Nur EINES der Kriterien erfüllt oder unklar → als Konflikt behandeln.
6. **Schreiben** (INSERT/UPDATE auf `vocabulary_review`): `change_category` wie Schritt 4, `reviewed=false`, Felder aus der aktuellen `vocabulary`-Zeile übernehmen (ggf. korrigiert), `ninja_audio_url` nur bei echtem Wort-Audio, `change_reason` kurzer Klartext. Kein SQL ohne Bestätigung. `flagged` bleibt `true`, solange ein offener Vorschlag existiert (App setzt `false` selbst bei Übernahme/Ablehnung) — nur bei zweifelsfrei bereits korrektem Eintrag ohne etwas zu zeigen: direkt `flagged=false`, ohne `vocabulary_review`.

## Workflow: Frisch importierte Batch-Vokabeln flaggen + verifizieren (leichtgewichtige Variante)

Abweichend vom 🚩-Workflow (der für einzelne, manuell markierte Vokabeln über `vocabulary_review`/Ninja-Check-Tab läuft): Wenn Nils bei einem frischen Import-Batch "als flagged markieren" sagt, ist das eine schnellere Batch-Verifizierung:

1. Neue Vokabeln mit `flagged = true` anlegen
2. **Automatisch, ohne Zuruf, direkt nach jedem Batch:** `SELECT * FROM vocabulary WHERE flagged = true`, jede gegen `derja_ninja_entries` (offline zuerst) und bei Bedarf Live-Ninja-Suche prüfen. Realistische Erwartung: Trefferquote oft nur ~1-2% (Lehrbuch-/Fachvokabular) — trotzdem grundsätzlich versuchen.
3. Ergebnis gruppiert zeigen (bestätigt / korrigiert / nicht auffindbar) — bei Unsicherheiten `AskUserQuestion` statt raten
4. Nach Bestätigung: **direkt** `UPDATE vocabulary SET flagged = false, ninja_checked_at = now() [, ninja_audio_url = ..., ninja_audio_start = ..., ninja_audio_end = ...]` — kein Umweg über `vocabulary_review` (das ist für Korrektur-Vorschläge zur Freigabe gedacht, nicht "neu importiert, jetzt geprüft")
5. Echte Duplikate aus dem eigenen Batch: normalen Duplikat-Merge-Workflow anwenden, nicht einfach flagged lassen

Bei Unklarheit, welcher der beiden Workflows gemeint ist: im Zweifel nachfragen, die Schreibpfade unterscheiden sich (`vocabulary_review` vs. direktes `UPDATE vocabulary`).

## vocab_lookup — Cross-Source-Abgleich (seit 2026-09-05)

**`vocab_lookup`** ist eine View (kein Materialized/keine Kopie — liest live aus `derja_ninja_entries`/`tunico_import`/`peacecorps_dict_import`, ändert nichts an den Rohtabellen) mit einheitlichen Spalten für alle drei: `source`, `source_id`, `english_key` (lowercased, primäre Suchachse), `headword_display`, `source_translit` (Lautschrift der Quelle in DEREN eigener Konvention, nicht unser Chat-Alphabet), `chatalpha` (unsere Konvention — bei TUNICO immer befüllt, bei Peace Corps 5.004/5.070 befüllt), `chatalpha_plural`, `gender`, `pos`, `arabic_script` (nur Ninja zuverlässig — echte, unabhängige Quellenangabe), `arabic_reconstructed`/`arabic_reconstruction_note` (nur bei `source='peacecorps'` befüllt — unvokalisierter Rekonstruktions-**Vorschlag**, kein Faktum, siehe unten), `translit_skeleton`/`arabic_skeleton`, `example_en`/`example_de`/`example_ph`, `audio_url`, `note`. Eine Zeile pro Sinn/Beispiel, nicht pro Lemma — ein mehrdeutiges Lemma erzeugt mehrere Zeilen mit demselben `source_id`. Details/Historie zu jeder Quelle: IMPORTS.md.

**`arabic_reconstructed` ist NIE eine unabhängige Bestätigung, nur eine Ableitung unserer eigenen Regel aus Peace Corps' eigener Lautschrift** — bei einem 3-Quellen-Vergleich zählt es nicht als zweite Quelle neben Ninja, sonst täuscht ein systematischer Regelfehler eine "doppelte Bestätigung" vor, die keine ist (siehe PRECEDENTS.md → Peace-Corps-Arabisch-Rekonstruktion). Rekonstruiert wird per `public._pc_reconstruct_arabic(forms_phonetic[1])` aus dem ORIGINAL `forms_phonetic` (nicht aus `forms_chatalpha`!), weil das Original über Groß-/Kleinschreibung Emphase-Laute unterscheidet (H/S/T = ح/ص/ط vs. h/s/t = ه/س/ت), die `forms_chatalpha` bereits verloren hat. Bekannte Restunsicherheit: ض/ظ/ذ fallen im Original alle auf `dh` zusammen (`arabic_reconstruction_note` zeigt das an), außerdem keine Unterscheidung ا/ى bei wortschlussendem Langvokal. 4.874/5.004 Peace-Corps-Zeilen rekonstruiert, 130 bewusst nicht (Fremdwörter/Platzhalter/Transkriptionsfehler statt Rateversuch).

**Nie blind über `translit_skeleton`/`arabic_skeleton` joinen — kurze Skelette (≤3 Konsonanten) kollidieren zufällig** (Präzedenzfall: PRECEDENTS.md → vocab_lookup). `english_key` ist die primäre, zuverlässige Achse; Skeleton-Treffer nur separat markiert und mit `length(...) >= 4` gefiltert.

**`vocabulary.english` (seit 2026-09-05, 2.086/3.698 befüllt) ist nur ein Such-Schlüssel für den Quellenabgleich, keine geprüfte Übersetzung** — muss nicht nuanciert sein, nur treffend genug für den `english_key`-Join. Befüllt über vier Wege, absteigend nach Zuverlässigkeit: (1) exakter `ninja_audio_url`-Match — dieselbe Ninja-Zeile, die schon das Audio geliefert hat, `english` direkt übernommen (676 Zeilen); (2) exakter `arabic_script`-Match gegen Ninja (295 Zeilen); (3) exakter Deutsch-Text-Match gegen `tunico_import.senses[].de` — TUNICO liefert Deutsch UND Englisch im selben Sinne, ein Treffer auf `german` liefert das passende Englisch direkt mit, nur wenige deutsche Homonym-Kollisionen ausgenommen (`heller`/„Heller"-Münze, `zu`=nach/geschlossen) (219 Zeilen); (4) Skelett-Match gegen `vocab_lookup` mit manueller Deutsch/Englisch-Plausibilitätsprüfung, Skelett-Treffer allein reicht nicht (585 Zeilen). Details/Fehlerbilder: PRECEDENTS.md → vocabulary.english Backfill. Bei neuen Vokabeln `english` gleich mitpflegen, dann ist der Abgleich sofort ohne Nachbearbeitung nutzbar.

**Rezept 1 — Trainer-Vokabel verifizieren:**
```sql
WITH target AS (
  SELECT id, darija, arabic_script, english, translit_skeleton, arabic_skeleton
  FROM public.vocabulary WHERE id = ANY(ARRAY[/* vocabulary.id(s) */])
)
SELECT t.id, t.darija AS trainer_darija, t.english, 'bedeutung' AS match_art,
       l.source, l.headword_display, l.source_translit, l.chatalpha, l.arabic_reconstructed, l.arabic_reconstruction_note, l.example_en
FROM target t JOIN public.vocab_lookup l ON lower(trim(t.english)) = l.english_key
UNION ALL
SELECT t.id, t.darija, t.english, 'nur_lautschrift_unsicher',
       l.source, l.headword_display, l.source_translit, l.chatalpha, l.arabic_reconstructed, l.arabic_reconstruction_note, l.example_en
FROM target t JOIN public.vocab_lookup l
  ON ((t.arabic_skeleton = l.arabic_skeleton AND length(t.arabic_skeleton) >= 4)
   OR (t.translit_skeleton = l.translit_skeleton AND l.translit_skeleton IS NOT NULL AND length(t.translit_skeleton) >= 4))
  AND lower(trim(t.english)) <> l.english_key
ORDER BY id, match_art, source;
```

**Wertigkeit der Treffer nicht verwechseln:** ein Treffer mit `source='ninja'` und gesetztem `arabic_script` ist eine echte Bestätigung (einzige verlässlich vokalisierte Quelle). Ein `chatalpha`-Treffer von TUNICO/Peace Corps bestätigt nur die Transliteration, kein Arabisch — wertvoll, aber schwächer. Ein `arabic_reconstructed`-Wert (nur Peace Corps) ist unsere eigene Ableitung, zählt nicht als zusätzliche unabhängige Quelle. Bei widersprüchlichen Treffern gewinnt die höherwertige Quelle, nicht die Mehrheit.

**Rezept 2 — neue Vokabel nachschlagen (2a: konkretes Wort) oder Vorschlag holen (2b):**
```sql
-- 2a
SELECT source, headword_display, source_translit, chatalpha, arabic_script, arabic_reconstructed, arabic_reconstruction_note, gender, pos, example_en, example_ph
FROM public.vocab_lookup WHERE english_key = lower('<wort>') ORDER BY source;
SELECT id, darija, german FROM public.vocabulary WHERE lower(trim(english)) = lower('<wort>');

-- 2b: kombiniert beide frequenzsortierten Kandidatenlisten
SELECT 'tunico' AS quelle, cat, frequency, lemma_chatalpha, de_gloss
FROM public.tunico_candidates WHERE status='pending' AND auto_verdict='missing' ORDER BY frequency DESC LIMIT 10;
SELECT 'peacecorps' AS quelle, pos, freq AS prioritaet, chatalpha, headword AS gloss
FROM public.peacecorps_candidates WHERE status='pending' AND auto_verdict='missing' AND freq=5 ORDER BY headword LIMIT 10;
```
`peacecorps_candidates` (gleiches Schema wie `tunico_candidates`): aus `peacecorps_dict_import` gespeist, `auto_verdict` per einfachem `english`-Abgleich gegen `vocabulary` vorbelegt — feinere Heuristik (e/i-Fold etc., siehe IMPORTS.md → TUNICO) bisher nicht übernommen.

**Rezept 3 — Import-Batch gegenchecken (Duplikate + Plausibilität vor dem Schreiben):**
```sql
WITH batch(english, darija, arabic_script) AS (
  VALUES ('<english1>','<darija1>','<arabic1>')
),
norm AS (SELECT *, lower(trim(regexp_replace(english, '^to\s+', ''))) AS key FROM batch)
SELECT n.english, n.darija, v.id AS bereits_im_trainer, v.darija AS trainer_darija,
  l.source, l.chatalpha AS quelle_chatalpha, l.source_translit AS quelle_translit, l.example_en
FROM norm n
LEFT JOIN public.vocabulary v ON lower(trim(v.english)) = n.key
LEFT JOIN public.vocab_lookup l ON l.english_key = n.key
ORDER BY n.english, l.source;
```

**Bekannte Grenzen:** `english_key` ist ein einfacher `lower(trim(...))`-Vergleich, kein Fuzzy-Match — unterschiedliche Formulierungen derselben Bedeutung können Treffer verpassen (`to abolish` wird per `regexp_replace('^to\s+','')` normalisiert, deckt aber nicht jede Variante ab). Bei "kein Treffer" zusätzlich mit `english_key ILIKE '%<wort>%'` nachfassen, bevor man auf "existiert nirgends" schließt.

**Helper-Funktionen `public._translit_skeleton(darija text)` / `public._arabic_skeleton(arabic_script text)`** (seit 2026-09-05): berechnen `vocabulary.translit_skeleton`/`arabic_skeleton` exakt nach dem Bestandsformat — per Reverse-Engineering aus dem Bestand hergeleitet und validiert (3.686/3.688 bzw. 3.679/3.688 exakter Match, Rest sind Legacy-/Platzhalter-Ausreißer, keine Formelfehler; Details: PRECEDENTS.md → arabic_skeleton/translit_skeleton Herleitung). Nie von Hand nachbauen — diese Funktionen benutzen, auch außerhalb von Rezept 4.

**Rezept 4 — neue Vokabel anlegen, fertigen INSERT bauen:**
```sql
-- Schritt 1: Kandidaten aus allen 3 Quellen (wie Rezept 2a) — daraus darija/arabic_script/german von Hand auswählen
SELECT source, headword_display, source_translit, chatalpha, chatalpha_plural, gender, pos,
       arabic_script, arabic_reconstructed, arabic_reconstruction_note, example_en, example_de, example_ph, audio_url, note
FROM public.vocab_lookup WHERE english_key = lower('<wort>') ORDER BY source;

-- Schritt 2: INSERT mit automatisch berechneten Skeletten
INSERT INTO public.vocabulary
  (english, darija, arabic_script, german, ninja_id, ninja_audio_url, translit_skeleton, arabic_skeleton,
   external_confirmed, external_confirmed_source)
VALUES (
  '<english>',
  '<darija>',                    -- s. Konventions-Warnungen unten
  <arabic_script_oder_NULL>,     -- nur von Ninja übernehmen, sonst NULL lassen
  '<german>',                    -- kein Feld liefert das automatisch, immer von Hand
  <ninja_id_oder_NULL>,
  <ninja_audio_url_oder_NULL>,
  public._translit_skeleton('<darija>'),
  public._arabic_skeleton(<arabic_script_oder_NULL>),
  <true_oder_false>,             -- s. external_confirmed unten
  <'ninja'|'tunico'|'peacecorps'_oder_NULL>
)
RETURNING id, english, darija, arabic_script, german, translit_skeleton, arabic_skeleton;
```

**Konventions-Warnungen vor dem `<darija>`-Wert (nicht automatisierbar, immer von Hand prüfen):**
- **Ninja-`darija`/`source_translit` nie 1:1 übernehmen** — andere Transliterations-Konvention (siehe IMPORTS.md → Abgleich mit Derja Ninja). Besser: Ninjas `arabic_script` (einzige zuverlässig vokalisierte Quelle) nehmen und daraus `darija` nach Hausregeln neu transliterieren (Lautlehre-Regeln, Konsonanten-Gegencheck-SQL siehe oben).
- **TUNICO-`chatalpha` bei Verben ist die Stammform**, nicht die trainer-übliche 3. Pers. Sg. Präsens — passende Flexionsform aus `tunico_corpus_verbs.forms_chatalpha` wählen, nie die Stammform direkt übernehmen (siehe IMPORTS.md → TUNICO, `_tnGuessVerbForm()`).
- **Peace-Corps-`chatalpha` (`forms_chatalpha[1]`) ist die erste Form laut `forms_roles`** (bei Verben oft Imperativ, nicht Präsens) — bei Verben gegen `forms_roles` prüfen und ggf. die passende Form selbst zur 3.-Pers.-Präsens umbauen, nicht ungeprüft übernehmen.
- **`german` wird von keiner Quelle geliefert** — `senses`/`de_gloss`/`example_de` sind Ausgangsmaterial, keine fertige Übersetzung.
- **`arabic_reconstructed` (nur bei Peace Corps) ist ein Vorschlag, kein Faktum** — nur verwenden, wenn Ninja kein `arabic_script` liefert, und vor Übernahme in `<arabic_script_oder_NULL>` von Hand vokalisieren/gegenchecken (v.a. bei gesetztem `arabic_reconstruction_note`).

**`external_confirmed`/`external_confirmed_source` (seit 2026-09-05) — bei jeder Neuanlage mitpflegen, nicht nur beim einmaligen Bestands-Backfill.** Steuert das 🔗-Icon im Trainer (Vokabelliste + Karteikarte, nur wenn kein Audio vorhanden — sonst ist die Bestätigung über den 🔊-Button ohnehin sichtbar) sowie den Bestätigt/nicht-bestätigt-Filter in der Vokabelliste. Regel:
- `external_confirmed=true, external_confirmed_source='ninja'`, wenn `derja_ninja_entries.arabic_script` (Diakritika entfernt) exakt mit dem neuen `arabic_script` übereinstimmt.
- sonst `external_confirmed=true, external_confirmed_source='tunico'`, wenn das neue `darija` (klein geschrieben, getrimmt) **exakt** einer dieser TUNICO-Formen entspricht — **nicht nur `vocab_lookup.chatalpha`/`chatalpha_plural`, das deckt nur `lemma_chatalpha` bzw. eine Pluralform aus `inflected` ab und übersieht die meisten Formen unten:**
  - `tunico_import.lemma_chatalpha`
  - `tunico_import.variants_chatalpha[]` (alternative Schreibweisen)
  - `tunico_import.inflected[].chatalpha` (alle Flexionsformen, nicht nur die mit `ana ~ 'pl'`)
  - `tunico_corpus_verbs.forms_chatalpha[]`, `tunico_corpus_adjectives.forms_chatalpha[]`, `tunico_corpus_nouns.forms_chatalpha[]` (belegte Korpus-Flexionsformen)
  - `tunico_corpus_wordforms.form_chatalpha` (einzelne belegte Wortformen, größte Quelle an zusätzlichen Treffern)
- sonst dasselbe für `source='peacecorps'`, wenn `darija` exakt einem beliebigen Element aus `peacecorps_dict_import.forms_chatalpha[]` entspricht — **nicht nur `forms_chatalpha[1]`**, das übersieht feminine/Imperativ/Perfekt/Colloquial-Formen, die laut `forms_roles` ebenfalls im Array stehen.
- **Zusätzlich, wenn kein exakter String-Match greift:** `public._translit_skeleton(darija)` (Länge ≥ 4, sonst zu kollisionsanfällig) gegen `_translit_skeleton()` jeder Form aus denselben lexem-gebundenen Arrays vergleichen (`tunico_import.lemma_chatalpha`/`variants_chatalpha[]`/`inflected[].chatalpha`, `tunico_corpus_verbs/_adjectives/_nouns.forms_chatalpha[]`, `peacecorps_dict_import.forms_chatalpha[]`) — **NICHT** gegen `tunico_corpus_wordforms` (das ist eine korpusweite Flachliste ohne Lexem-Bindung, dort bleibt nur exakter String-Match sicher). Grund: TUNICOs automatische `chatalpha`-Konvertierung nutzt andere Vokale als unsere Imala-Regeln (z.B. `ytayyib` vs. unser `ytayyeb`, `yakul` vs. `yakol`) — ohne Skelett-Vergleich verfehlt der exakte String-Vergleich echte Treffer aus denselben Quellen. Sicher nur, weil jedes dieser Arrays garantiert zu einem einzigen Lexem gehört (kein Cross-Wort-Kollisionsrisiko wie bei einer globalen Skelett-Suche über den ganzen Bestand).
- sonst `external_confirmed=false, external_confirmed_source=NULL`.

Präzedenzfälle 2026-09-05/06:
- Bestands-Audit gegen `vocab_lookup.chatalpha`/`chatalpha_plural` allein fand nur 1693/3698 Treffer; Erweiterung auf alle Rohtabellen-Spalten (exakter Match) brachte 357 weitere (u.a. `dyar`, Plural von `dar`/Haus, nur in Peace Corps' zweitem `forms_chatalpha`-Element). `vocab_lookup` bleibt für den Cross-Source-Abgleich (Rezepte 1–4 oben) nützlich, ist für `external_confirmed` aber nicht ausreichend.
- Skelett-Vergleich (s.o.) brachte nochmal 251 weitere — Stichprobe von 25 Zufallstreffern manuell geprüft, alle korrekt (z.B. `yqaddem`↔`yqaddmu`, `kilmet`↔`kilmat`, `ysallem`↔`sallmu`).
- **Bekannte Grenze, bisher ungelöst:** Präsens-Verben (`y-`/`yi-`-Präfix) und personenflektierte Vergangenheitsformen (`qolt`=ich sagte, `mit`=ich starb) bleiben oft unbestätigt, obwohl die Grundform (`qal`, `mat`) bestätigt ist — Wörterbücher zitieren fast nur Imperativ/3.-Pers.-Vergangenheit, keine vollen Paradigmen. Eine Ableitung „Personalform bestätigt, wenn Grundform bestätigt" wäre möglich (Personal-Präfix/-Suffix abstreifen, dann Konsonantenskelett gegen bereits bestätigte Einträge derselben `lesson_id` vergleichen — Eingrenzung auf `lesson_id` nötig, um Kollisionen bei kurzen Wurzeln zu vermeiden), ist aber noch nicht umgesetzt.

Rezept 4 ersetzt nicht den Pflicht-Duplikat-Check (siehe "Duplikat-Check, alle drei Felder einzeln") — vor dem `INSERT` trotzdem gegenchecken, Rezept 3 nutzen bei ganzen Batches statt Einzelwörtern.
