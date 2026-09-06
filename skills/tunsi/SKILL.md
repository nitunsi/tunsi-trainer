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
| Was ist von früher noch unerledigt? | Offene Punkte (direkt unten) |
| PDF/Foto-Quelle auswerten, neue Quelle importieren | IMPORTS.md |
| Kurs-Modus (course_lessons/course_exercises) oder Code-Änderung an trainer.html | COURSE_MODE.md |

## Offene Punkte

Unerledigte Altlasten aus früheren Sessions — bei Gelegenheit aufgreifen, nicht Teil der laufenden Regeln:

- **Ninja-Transliteration in Trainer-Konvention** (besprochen 2026-09-05, bewusst zurückgestellt): `derja_ninja_entries.darija` ist in Ninjas eigener Konvention, nicht unserer — anders als bei TUNICO/Peace Corps gibt es dafür noch keine `chatalpha`-Spalte. Wäre nur aus dem vollvokalisierten `arabic_script` heraus zuverlässig baubar (nicht aus Ninjas `darija` selbst), mit eigenem Validierungsaufwand. Bisher kein Bedarf, seit klar ist: Original-Transliteration wird ohnehin nur im Zweifelsfall herangezogen, `chatalpha` reicht für den Regelfall.

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
   - Duplikat-Check auch NACH jeder nachträglichen Schreibkorrektur wiederholen, nicht nur vor der Neuanlage — eine Korrektur ist im Effekt ein neues `darija`.
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

Nie verwenden: Vokabeln, null, freie Texte außerhalb der Liste.

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

**Pflicht-Suchschritt vor jeder Verb-Ergänzung: bestehende Zeilen desselben Verbs auch unter Alt-Topics finden.** Eine Suche nur mit `topic IN ('Verben-Konjugation','Vergangenheit','Verben')` übersieht Zeilen mit Legacy-Topics wie `(L14)`, `(L18)` oder `NULL` — Präzedenzfall 2026-09-06: `yakol`/`er isst` hatte `topic=" (L14)"` und wurde dadurch komplett übersehen, obwohl das Verb (`kla`/essen) sonst als "nur 1 Zeile vorhanden" durchgegangen wäre. Immer den **ganzen** Bestand per Konsonantenskelett gegenchecken (auch über Gemination/Vokal-Abweichungen hinweg, s.o.), nicht nur die Standard-Verb-Topics.

**Bestandspflege (Stand 2026-09-06): nur ergänzen, nicht kürzen.** Verben mit mehr als 3 vorhandenen Zeilen (volle/teilweise Personal-Paradigmen aus früheren Sessions) werden NICHT gekürzt/gelöscht — das wird auf einen späteren, gezielten Vokabel-Check verschoben. Bei diesem künftigen Check: pro Verb auf die 3 Ziel-Slots konsolidieren (Präsens+Vergangenheit+eine Person behalten, Rest als Kandidat für Löschung markieren, nicht automatisch löschen — erst zeigen, dann auf Bestätigung warten wie immer). Bis dahin: überzählige Zeilen einfach so stehen lassen.

**Aber: `tunico_verb_id`+`conjugation` trotzdem an ALLEN vorhandenen Zeilen eines Verbs setzen, nicht nur an den 3 Ziel-Slots.** Auch überzählige/nicht ins 3er-Schema passende Zeilen (z.B. Imperativ-Varianten, weitere Personen aus alten Batches) bekommen die Verknüpfung + volle Tabelle, damit der 🔠-Button überall verfügbar ist. Eine falsche Zuordnung richtet dabei keinen Schaden an — sie fällt beim Lernen auf und wird dann korrigiert (SRS-Progress bleibt unberührt, nur Anzeige-Zusatzdaten).

**Fehlerquelle bei Form-II/III-Verben (Gemination): unvokalisiertes `arabic_script` kollidiert leicht mit der Form-I-Wurzel.** Präzedenzfall 2026-09-06: `nwassal` („ich bringe hin", Form II von وصل) wurde zunächst unvokalisiert als نوصل eingetragen — identisch mit der bereits bestehenden Form-I-Zeile `nousil`/„ich komme an" (id 1278), vom Duplikat-Check sofort erkannt. Bei Form-II/III-Verben mit Gemination immer die Schadda setzen (نْوَصَّل, nicht نوصل), am bestehenden Präsens-Geschwister (hier `ywassal`→يْوَصَّل) orientieren — nicht komplett unvokalisiert lassen, wenn das Muster durch eine Geschwisterform schon bekannt ist.

**Bei jeder Neuanlage/jedem Vokabel-Check ab jetzt:** wenn ein neues oder geprüftes Wort ein Verb ist, prüfen ob es zu einem der `tunico_corpus_verbs`-Einträge gehört (Konsonantenskelett-Match gegen `forms_chatalpha[]`) und nach obigem 3-Zeilen-Modell behandeln, nicht als isolierte Einzelform anlegen.

**Zwei-Pass-Suchmethode für Tranchen-Verarbeitung (Tranchen 1–3, 2026-09-06):** Pass 1 = Skelett-Match (Länge≥4-Floor) gegen `tunico_corpus_verbs.forms_chatalpha[]`, topic-unrestricted, `tunico_verb_id IS NULL`, um Verben grob nach vorhandener Zeilenzahl zu bucketen. Pass 2 = pro einzelner `tcv_id` in der bearbeiteten Bucket-Gruppe eine **Skelett-Suche ohne Längen-Floor**, aber strikt auf die `forms_chatalpha[]`-Array dieser einen `tcv_id` beschränkt (kollisionssicher, weil lexem-gebunden) — deckt kurzwurzelige Formen auf, die Pass 1 wegen des Floors verpasst (z.B. `l3ab`/`qabil`s fehlende 3.-Pers.-Formen `yal3ab`/`el3ab`). Danach jede Kandidatenzeile manuell semantisch prüfen (siehe Fehlerbild-Liste unten) — Skelett-Match allein reicht nie.

**Wiederkehrende Fehlerbilder beim manuellen Vetting (Tranche 1–3):**
- Nomen/Adjektive mit zufällig gleicher Konsonantenwurzel wie ein Verb (`kbir`/Verb vs. `kbira`/Adjektiv, `khsara`/Nomen "Verschwendung" vs. `khasar`/Verb "verlieren", `shib3an`/Adjektiv "satt" vs. `shab3`/Verb "satt werden", `barbasha`/Nomen "Lumpensammler" vs. `barbash`/Verb "wühlen", `qbal`/Präposition "vor" vs. `qbel`/Verb "akzeptieren").
- Cross-Verb-Wurzelkollisionen (`qal` vs. `yaqli`, `shra`/kaufen vs. `shar`/wach bleiben, `sar` vs. `sawwir`).
- **Ganze falsche Wortfamilien unter einer `tcv_id`:** `sabb` (tcv164/tcv179) matchte zunächst nur die Schuh-Nomen-Familie (`sabbat`/Schuh, `sbabet`/Schuhe, `sbabtiy`/Schuhmacher) — komplett unrelated. Erst der Blick auf `tunico_corpus_verbs.forms_chatalpha[]` selbst (nicht nur die Match-Treffer) zeigte, dass es zwei **verschiedene, gleich transliterierte Verben** sind: tcv164 (`nsubb`/`ysubbu`-Formen, u-Vokal) = „gießen/regnen" (ص), tcv179 (`tsibb`-Form, i-Vokal) = „beleidigen" (س) — beide matchten die Schuh-Nomen nur zufällig über kurze Skelette, die echten Verb-Zeilen (`ysubb`/id4007, `ysibb`/id3997) fehlten in Pass-1-Ergebnis, weil die Trefferformen nicht in den `forms_chatalpha[]`-Arrays standen. **Lehre: bei mehreren `tcv_id`s mit identischem `lemma_chatalpha` immer `forms_chatalpha[]` beider IDs direkt vergleichen, nicht nur die Bestands-Kandidaten** — sonst bleiben echte Treffer unentdeckt und falsche Nomen-Familien werden fälschlich als "die Verb-Zeilen" gehalten.
- Phrasen-Einträge (Topic "Kurzphrasen") wie `tkallem tawwa`("Sprich jetzt!") enthalten eine Verbform, sind aber keine saubere Konjugations-Zelle (Adverb/Objekt-Suffix mit drin) — nicht in `conjugation` verlinken, einfach unverknüpft lassen.
- Legacy-Zeilen mit abweichender Person/Bedeutung (`nqablou`="wir treffen ihn", 1.Pl.+Objektsuffix, abweichender Sinn "treffen" statt "akzeptieren" bei `qabil`) — bei Unsicherheit unverlinkt lassen statt erzwungen einzupassen.

**Homonyme Verb-Paare (identisches `darija`, unterschiedliches `arabic_script` UND unterschiedliche Bedeutung): `homonym_ok=true` setzen.** Präzedenzfall: `sabb`(ص, gießen) und `sabb`(س, beleidigen) — der `arabic_skeleton()`-Helper normalisiert ص/س beide auf denselben Konsonanten, d.h. `arabic_skeleton` UND `translit_skeleton` UND `darija` sind für beide identisch, nur `arabic_script` und `german` unterscheiden. Der Duplikat-Check in trainer.html prüft `darija`/`arabic_script`/`german` **einzeln** (nicht Volltreffer über alle drei) — ohne `homonym_ok=true` würde er beide als "Darija identisch"-Duplikat vorschlagen, obwohl es zwei echte, verschiedene Verben sind. Bei jedem echten Homograph-Fund (nicht nur bei Verben) `homonym_ok=true` setzen statt den Duplikat-Check zu ignorieren.

**Präsens-Doppelformen mit leicht abweichender Schreibung (z.B. `yitkallam` vs. `ytkallam`, `ykassar` vs. `ykasser`) werden NICHT konsolidiert, sondern beide verlinkt/stehen gelassen** — passt zur "nur ergänzen, nicht kürzen"-Policy; Bereinigung ist Teil des künftigen Vokabel-Checks, nicht der Tranchen-Verarbeitung.

**Stand 2026-09-06 (Ende Session): 81/300 `tunico_corpus_verbs` verlinkt** (Tranchen 1–4, nach vorhandener Zeilenzahl geordnet abgearbeitet). Verbleibende `tunico_verb_id IS NULL`-Kandidaten aus der "1 Zeile"-Bucket (per Skelett-Match) waren zum großen Teil **keine echten Treffer** — bewusst übersprungen statt aus dem Nichts konstruiert:
- **Reine Fehltreffer (0 echte Verb-Zeilen im Bestand, nur Nomen/Adjektiv-Homographe):** `thhur`(tcv90, Rücken-Nomen), `khaddim`(tcv119, Adjektiv "fleißig"), `kthur`(tcv159, Komparativ "mehr"), `7arbish`(tcv170, Nomen "Tablette"), `qrub`(tcv177, nur die Adjektiv-Familie "nah" vorhanden), `khalit`(tcv199, Nomen "Tanten"), `thall`(tcv204, Nomen "Schatten"), `skir`(tcv216, Nomen "Fahrkarte"), `ghlut`(tcv262, Adjektiv "falsch"), `tqata3`(tcv292, Verbalnomen "Zerkleinern").
- **Bewusst zurückgestellt (nur 1 Zeile, Person/Zeit der Form zu unsicher für einen verlässlichen 3-Zeilen-Aufbau ohne zweiten Anker):** `t3arik`(tcv66, sich streiten), `ghanna`(tcv73, singen — nur Imperativ vorhanden), `tayyish`(tcv123, wegwerfen), `t3ab`(tcv285, müde werden — Zeitbezug der einzigen Form unklar).
- Diese Liste bei einem künftigen Durchgang zuerst gegen Derja Ninja/Peace Corps gegenchecken, bevor Formen dafür neu konstruiert werden — nicht blind aus dem TUNICO-Korpus ableiten wie bei den übrigen Tranchen (dort gab's immer mindestens einen echten Bestands-Anker zum Abgleichen).
- **Präzedenzfall `t3ashsha`/`3ash`(zu Abend essen vs. leben):** Zeile 1118 (`yit3asha`, Alt-Topic `(L14)`) wurde in Tranche 3 fälschlich als Kandidat für `3ash`("leben", tcv32) prüfte und korrekt ausgeschlossen — gehörte aber tatsächlich zu `t3ashsha`(tcv165, "zu Abend essen"), einem eigenen, semantisch verwandten aber grammatisch separaten Verb. Erst beim gezielten Abarbeiten von tcv165 wurde das bemerkt und nachträglich verlinkt. **Lehre: ausgeschlossene Kandidaten aus früheren Tranchen nicht vergessen — sie gehören oft zu einem anderen, noch unbearbeiteten `tcv_id` derselben Wortfamilie.**

**Nachtrag 2026-09-06: `shra`(kaufen, tcv26) und `3adda`(verbringen, tcv113) waren in Tranche 1/2 als "bereits geprüft" markiert, aber fälschlich als Fehltreffer verworfen worden** (Präzedenz: der ursprüngliche Tranche-1-Review verwechselte `shra`s echte Formen mit dem ähnlich klingenden `sahar`/wach bleiben, s.o.) — bei einer erneuten Kontrollabfrage (alle `tunico_verb_id IS NULL`-Kandidaten, unabhängig von der Tranchen-Exclude-Liste) fielen beide als echte, unbearbeitete Treffer auf und wurden nachträglich verlinkt (`shra`: 5 Zeilen, link-only; `3adda`: 2 Zeilen + neue Vergangenheit-Grundform + Rotationszeile). **Lehre: die Tranchen-Exclude-Liste (`tcv_id NOT IN (...)`) markiert nur "schon angeschaut", nicht "sicher korrekt verworfen" — bei Zweifeln oder am Ende eines Durchgangs die Kandidatenliste einmal ohne Exclude-Liste laufen lassen, um falsch verworfene Volltreffer zu finden.** `sakkir`(tcv215) dagegen ist vermutlich ein TUNICO-Korpus-Dublette von `sakkar`(tcv214, bereits verlinkt) ohne eigene Bestandszeilen — bewusst übersprungen.

**Stand 2026-09-06 (aktualisiert): 83/300 verlinkt.** Alle `tunico_verb_id IS NULL`-Kandidaten mit ≥1 Bestandstreffer sind jetzt durchgegangen (Tranchen 1–4 + Nachtrag). Die verbleibenden ~217 `tunico_corpus_verbs`-Einträge haben keine einzige passende Zeile im aktuellen Bestand (0 Kandidaten bei Skelett-Match) — dort ist nichts mehr zu verlinken, bis neue Vokabeln importiert werden, die zufällig zu diesen Verben passen. Ein künftiger Durchgang sollte trotzdem die Ausnahmen aus der "1 Zeile, aber kein Verb"-Liste oben (Fehltreffer + zurückgestellte) zuerst gegen Ninja/Peace Corps prüfen, bevor man sie endgültig als erledigt betrachtet.

**Kritischer Methodik-Fund 2026-09-06 (Nachmittag): der Längen≥4-Floor in Pass 1 hat KURZWURZELIGE Verben komplett unsichtbar gemacht.** Pass 1 bucketet Verben nur, wenn sowohl die Bestandszeile als auch die Korpusform ein Skelett der Länge ≥4 haben (Kollisionsschutz). Verben mit 2–3-Konsonanten-Wurzel (`kan`/sein, `mat`/sterben, `ba3`/verkaufen, `ja`/kommen, `ra`/sehen, `sar`/werden, `walla`/werden, `3ta`/geben, `jab`/bringen, `7ka`/erzählen, `bda`/anfangen, `3awin`/helfen, `tayyib`/kochen, `ta7`/fallen, `jra`/rennen, `3am`/schwimmen, `rta7`/ausruhen, `qam`/aufstehen, `jawib`/antworten, `shaf`/sehen — teils mit >100 Korpus-Vorkommen!) sind dadurch bei **keinem** Tranchen-Durchgang jemals in einem Bucket aufgetaucht, obwohl massenhaft Bestandszeilen dazu existierten. Gefunden durch: gezielte Abfrage aller `topic IN ('Verben-Konjugation','Vergangenheit','Verben')`-Zeilen mit `tunico_verb_id IS NULL` (360 Zeilen), German-Glosse gruppiert gelesen, plausible Verb-Lemmata erraten und direkt per `lemma_chatalpha =`/`ILIKE` in `tunico_corpus_verbs` gesucht (nicht über Skelett-Bucket). **Lehre: bei kurzwurzeligen/sehr häufigen Verben (Existenz-, Bewegungs-, Grundverben) nie auf den Bucket-Scan verlassen — gezielt per Lemma suchen, sobald ein Bestandsmuster (`er X-te`/`ich X-e`/`X!`) auf ein Grundverb hindeutet, das noch nicht verlinkt ist.** 21 weitere `tcv_id`s auf diesem Weg gefunden und verlinkt (**104/300** jetzt), davon 3 mit neuer Rotationszeile (`ra`, `shaf`, `sar` — je nur 2 Bestandszeilen).
- **Neuer Präzedenzfall: Anker, die nicht wörtlich in `forms_chatalpha[]` stehen, trotzdem manuell verlinken.** `bi3t`(id1708,"ich verkaufte"), `jrit`(id1771,"ich rannte"), `rta7t`/`rte7it`(id1310/1309) fehlten in den Korpus-Arrays, waren aber eindeutig dieselbe Wurzel/Person — beim Bauen der `conjugation`-JSON und beim Verlinken trotzdem einbezogen. Der Korpus deckt nie alle attestierten Formen ab.
- **Erweiterung der `homonym_ok`-Regel: nicht nur echte Homographen (identisches `darija`), auch echte Synonym-Verben mit identischer deutscher Glosse für die Rotationszeile brauchen `homonym_ok=true`.** Präzedenzfälle: `ra`/`shaf` (beide "sehen" — Rotationszeilen `rit`/`shoft` hatten beide `german="ich sah"`), `sar`/`walla` (beide "werden" — `sirt` kollidierte mit dem bereits bestehenden `wallit`="ich wurde"). Der Duplikat-Check prüft `german` unabhängig von `darija`/`arabic_script`, daher reicht ein geteiltes deutsches Wort für eine False-Positive-Meldung.
- **Fortsetzung selber Tag: weitere 10 Lemmata gefunden (`7ass`/fühlen, `warra`/zeigen, `radd`/antworten, `sama7`/verzeihen, `qtal`/töten, `dar`/sich drehen, `bqa`/bleiben, `tlab`/fordern, `mass`/berühren, `fat`/vorbeigehen) + Nachträge für `qal`(id1722,1383 übersehen) und `ktib`(id1584,1585,1588 übersehen, Klammer-Pronomen-Varianten `(ana)`/`(enti)`). **Stand danach: 114/300.**
- **Weitere Homonym-Fälle (dieselbe `homonym_ok`-Regel wie oben):** `radd`/`jawib` (beide "antworten"), `fat`/`t3adda` (beide "vorbeigehen"), `bqa`/`q3ad` (beide "bleiben") — je identische deutsche 1.-Pers.-Vergangenheit-Glosse zwischen zwei Synonym-Verben, `homonym_ok=true` auf beiden Seiten gesetzt.
- **Systematischer Check danach: breite `ILIKE`/Regex-Suche über ~90 weitere geratene Lemmata (kneten, auspressen, schälen, kahlrasieren, servieren, trainieren, Ei aufschlagen, Tor schießen, iahen, kriechen, wiegen, Fasten brechen, u.v.m.) ergab NULL Treffer** — diese Verben stehen schlicht nicht in den 300 häufigsten `tunico_corpus_verbs`. **Endgültiger Stand 2026-09-06: 114/300 `tunico_verb_id`-verlinkt.**
- **Aufräum-Nachtrag beim Sichten der 82 unbestätigten Zeilen:** 6 weitere übersehene Geschwisterformen bereits verlinkter Verben gefunden und nachgetragen (`t3ashsha`/zu Abend essen: id1319,1839; `sta3mil`/benutzen: id1385; `tfarrij`/fernsehen: id1315,1316) — dabei echten Duplikat-Fund gemacht: id1320 (`t3ashit`,"ich aß zu Abend", Alt-Zeile ohne Progress) war inhaltlich identisch mit der eigens gebauten Rotationszeile id4520 (`t3ashshit`, nur Gemination anders) → id1320 gelöscht, id4520 (ins 3-Zeilen-Modell integriert) bleibt. **Lehre: nach jedem Nachtrag auf bereits verlinkte `tcv_id`-Gruppen prüfen, ob die neu verlinkte Zeile eine bereits gebaute Rotationszeile dupliziert** (anders als die `homonym_ok`-Fälle oben: hier ist es dieselbe Wortform, nicht zwei verschiedene Verben — löschen statt markieren).
- **Nachtrag: `external_confirmed` fehlte bei 15 bereits `tunico_verb_id`-verlinkten Zeilen aus einer VOR dieser Session liegenden Verlinkung** (`yakol`/essen, `yelbis`/anziehen, `eqif`/anhalten-Imperativ, `aqraw`/lesen-Imperativ, `arj3ou`/zurückgehen, `yoskon`/wohnen, `qolt`/sagen u.a.) — nachgetragen, Regel bestätigt: **jede `tunico_verb_id`-Verlinkung setzt IMMER auch `external_confirmed=true, external_confirmed_source='tunico'`**, nie das eine ohne das andere.
- **`nsa`(vergessen, tcv60, freq24) und `nsa7`(raten/empfehlen, tcv234, freq3) beim ersten Lemma-Ratedurchgang übersehen** (keine `ns*`-Variante war in der Kandidatenliste) — beide nachträglich gefunden und verlinkt (3+3 Zeilen, je link-only). **Stand: 116/300.** `waschen`(`ghasal`/`ghassel`) und `werfen`(`rma`) dagegen sind gegengecheckt und stehen tatsächlich nicht im 300er-Korpus (weder als Lemma noch als Flexionsform in irgendeiner `forms_chatalpha[]`) — kein Suchfehler, echte Korpuslücke.
- **Nachfrage des Users deckte zwei weitere übersehene Lemmata auf: `faq`(aufwachen, tcv97, freq15) — gefunden, verlinkt (4 Zeilen, link-only).** `sallim`(grüßen, tcv110) war dagegen **bereits aus einer früheren Tranche verlinkt** (Zeilen 3404/3441/4495) — beim Draufschauen fälschlich für unverlinkt gehalten, weil die Kandidaten `ysallim 3la`/`sallim 3la` (mit angehängtem `3la`) wegen der Präposition ein anderes Skelett haben und dadurch im Bucket-Scan nicht auftauchten. Bei der manuellen Korrektur eine echte Duplikat-Zeile (`sallimt 3la` = "ich grüßte") gebaut, die die längst bestehende Rotationszeile 4495 (`sallemt`) dupliziert hätte — vor dem Schreiben nicht gegen bereits verlinkte `tcv_id`s geprüft. Sofort bemerkt (Duplikat-Check auf die neue Zeile) und gelöscht, keine Lerndaten betroffen. **Lehre: vor jeder Neuanlage eines Verbs `SELECT * FROM vocabulary WHERE tunico_verb_id = <vermutete_id>` prüfen — nicht nur auf den Bucket-Scan verlassen, gerade bei Phrasen-Varianten mit angehängter Präposition/Objekt, die ein anderes Skelett als die reine Verbform haben.**
- **Gegengecheckt (User-Nachfrage): `fragen`(`s'al`), `fahren`(`saq`/`suq`), `duschen`(`dawwish`) stehen alle drei tatsächlich NICHT im 300er-Korpus** — weder als Lemma noch als Flexionsform in irgendeiner `forms_chatalpha[]`, mit breiten Varianten-Suchmustern gegengeprüft. Echte Korpuslücken, keine Suchfehler.
- **User-Anfrage "Top 10 wichtigste unverlinkte Verben" (nach Korpus-Frequenz sortiert, `NOT EXISTS`-Check statt Bucket-Scan — deckt auch die Fälle ab, die der Bucket-Scan strukturell nie sieht):** `wsil`/ankommen(45), `tsawwir`/sich vorstellen(39), `shal`/fragen(35, TUNICO-Schreibweise für `sa'al` — nicht `s'al`, daher vorher übersehen), `zad`/zunehmen(30), `rawwa7`/nach Hause gehen(28), `3jib`/gefallen(26), `qass`/schneiden(26) gefunden und verlinkt (**124/300**). `3ayyish`(ernähren,52) und `khzar`(betrachten,32) haben **keine** echten Bestandstreffer (nur Nomen-Homographe) — ohne jeden Anker nicht neu konstruiert, um keine unverifizierten Vokale zu raten. `thrab`(49, vermutlich "trainieren") ebenfalls 0 Bestandstreffer, gleiche Begründung.
- **Exakter-Match-Check (Ninja `arabic_script`, TUNICO-Rohtabellen, Peace-Corps `forms_chatalpha`) auf die verbleibenden 82 unbestätigten Zeilen: 0 Treffer.** Grund: viele Einträge sind mehrwortige Beispielsätze (`"sie spielt Videospiele"`, `"sie geht nach Hause"`) oder Klammer-Varianten (`"yqarri / y3allem"`, `"y7jem (derja)"`) — kein Wörterbuch-Lemma, das exakt matchen könnte — und die restlichen Einzelwort-Verben (kehren, füttern, aufwachen, frittiert werden, Beileid sprechen, u.v.m.) sind entweder zu selten für Ninja/Peace-Corps oder bräuchten einen gezielten Englisch-Gloss-Nachschlag pro Wort in `tunico_import`/`peacecorps_dict_import` (nicht mehr über TUNICO-Korpusfrequenz lösbar, da kein Korpus-Lemma existiert). Skelett-Match global (ohne Lexem-Scope) ist laut Regel oben nicht sicher genug für diese Fälle — **nicht versucht**. Diese 82 Zeilen bleiben unbestätigt; ein künftiger Durchgang müsste pro Wort einzeln die englische Glosse raten und in `tunico_import`/`peacecorps_dict_import` nachschlagen (deutlich aufwändiger als die bisherigen Tranchen).

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

**Bekannte Fehlalarm-Fallen bei diesen Checks (nicht blind fixen):**
- Französische/italienische Lehnwörter — im `german`-Feld `(frz.)`/`(ital.)`/`(engl.)`/`(Lehnwort)` markieren statt Transliteration zu erzwingen
- غ/ق können dialektal zu "g"/"k" verschoben sein (ngammed, bargouth, bgar, maktou3) — kein Fehler, Regel akzeptiert das bereits
- Eigennamen/etablierte Lehnwörter (Mohamed, Hammam): konsequent transliterieren ("7 immer", Entscheidung 2026-08-06), keine Ausnahme
- "إن شاء الله"/"الله" verzerren Wortanzahl-/Artikel-Check — beide Regeln schließen das bereits aus
- Kontrahierte Artikelformen nach vokal-endender Präposition (`3al-kar`, `fis-sma`) sind korrekt

**Konsonanten-Gegenchecks ج/ز/ه/س** sind mit im SQL oben — Details zum ersten Testlauf (8 echte Bestandsfehler, u.a. systematische ه→7-Verwechslung): PRECEDENTS.md → Prüfungen nach jedem Import.

**Neue Checks aus Kurs-Grammatiknotizen ableiten — wiederkehrende Praxis, nicht einmalig.** `grammar_notes` in `course_lessons` (siehe COURSE_MODE.md) enthalten viele Regeln — nur solche aufnehmen, die rein aus `darija`/`german`/`arabic_script` ableitbar sind, OHNE Wortart-Wissen/Kontext (wie die Sonnenbuchstaben-Regel). Bei jeder neuen/überarbeiteten Lektion erneut versuchen. **Immer erst gegen den Bestand testen (Fehlalarmquote) und zeigen, bevor eine Regel dauerhaft in `TRANSLIT_RULES` übernommen wird.** Bisher 4 Kandidaten getestet, 2 bestanden (unmarkierte Feminina, "und"=immer "w-"), 2 verworfen (Verb-Personalpräfix, m/f-Adjektivpaare=masc+"a" — beide an Dialekt-Realität gescheitert, Details: PRECEDENTS.md → Prüfungen nach jedem Import).

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
   Funde hier vor Schritt 6 mit korrigieren, nicht getrennt von den Ninja-Funden behandeln.
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
   - **Nur diese zwei exakten Strings für `change_category`:** `ninja_check_pending` und `ninja_check_kein_vorschlag`. Keine eigenen Varianten — die App filtert im Ninja-Check-Tab hart auf genau diese zwei Werte.
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
