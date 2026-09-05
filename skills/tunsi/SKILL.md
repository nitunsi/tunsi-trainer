---
name: tunsi
description: "bei der verbesserung meines vokabel trainers fuer tunesisch"
---

# Tounsi Trainer — Arbeitsregeln

Ausführliche Fallgeschichten/Bug-Berichte hinter vielen Regeln hier stehen in `skills/tunsi/PRECEDENTS.md` — nur bei Bedarf nachschlagen, nicht für den Alltagsbetrieb nötig.

## Schnellzugriff

| Situation | Relevante Abschnitte |
|---|---|
| Neue Vokabel(n) schreiben (egal welche Quelle) | Kern-Workflow: neue Vokabel(n) verarbeiten → Transliteration — Ziel-Konvention → Topic-Pflichtfeld |
| Neuer Import-Batch abgeschlossen | Kern-Workflow (Nachkontrolle) → Kurs-Verknüpfung: vocab_lesson_refs |
| PDF/Foto-Quelle auswerten | Kern-Workflow: neue Vokabel(n) verarbeiten → Prüfprotokoll |
| Uni-Wien-Lehrskript-Lektion | Datenquellen → Uni-Wien-Lehrskripte → Kurs-Modus |
| Nutzer hat Vokabeln mit 🚩 markiert | Workflow: Geflaggte Vokabeln (🚩) live gegen Derja Ninja prüfen |
| Frischer Batch soll automatisch geprüft werden | Workflow: Frisch importierte Batch-Vokabeln flaggen + verifizieren |
| Code-Änderung an trainer.html | Code-Änderungen |
| Kurs-Modus (course_lessons/course_exercises) | Kurs-Modus: course_lessons / course_exercises → Kurs-Verknüpfung: vocab_lesson_refs |
| Was ist von früher noch unerledigt? | Offene Punkte (direkt unten) |
| Zusätzliche Wörterbuch-/Kursquellen nutzen | Datenquellen (ganz unten) |
| Bulk-Import > ~1000 Zeilen | Bulk-Insert bei großen Mengen |
| Vokabel überprüfen / neue Vokabel nachschlagen / Import-Batch gegenchecken | vocab_lookup — Cross-Source-Abgleich (ganz unten) |

## Offene Punkte

Unerledigte Altlasten aus früheren Sessions — bei Gelegenheit aufgreifen, nicht Teil der laufenden Regeln:

- **Fälliger Vokalisierungs-Batch vom 2026-07-24** (119 Einträge geprüft, siehe PRECEDENTS.md → derja_ninja_import): mehrere echte Fehler gefunden, aber noch nicht korrigiert — Maß-I/Maß-II-Verwechslung bei IDs 1142/605/544/844, unvollständige Vokalisierung bei 423/531, ungültige Schadda-Platzierung bei 568/981, strukturelle Transliterations-Abweichungen bei 428/581/588/1223, vorbestehender Tippfehler bei 737. Liste liegt vor, wartet nur noch auf Freigabe zum Schreiben.

## Grundsatz: Nie ohne Bestätigung in Supabase schreiben

Vor jeder Änderung in Supabase (INSERT/UPDATE/DDL, auch ALTER TABLE/Policies) immer erst die geplante Änderung zeigen und auf Bestätigung warten — ausnahmslos. Das gilt auch für:

- Automatisierte/Batch-Änderungen, die durch Musterabgleich "sicher" aussehen (z.B. Massenkorrekturen aus einem Regel-Scan)
- Kleine Korrekturen oder "offensichtliche" Fixes, die im Zuge einer größeren bereits bestätigten Aktion auffallen
- Nebenfunde während einer anderen Aufgabe

Kein Fix wird "mal eben mitgenommen", auch wenn er trivial erscheint — immer erst zur Bestätigung vorlegen.

## Projektwissen-Datei

Die Datei `tounsi_db_YYYY-MM-DD.md` im Projektwissen ist die primäre Datenquelle, wenn kein Live-Supabase-Zugriff besteht. Sie enthält Schema, Lessons-Mapping, Users, Vocabulary. Duplikat-Check läuft dann gegen diese Datei via `project_knowledge_search` (Ablauf/Kriterien siehe "Kern-Workflow" unten).

**Wann aktualisieren:** nach größeren Vokabel-Importen (>20 Einträge), nach Änderungen an der Lektionsstruktur, wenn Duplikat-Checks fehlschlagen/veraltete Einträge zeigen, wenn neue Supabase-Spalten angelegt werden (dann auch den Export-Modus im Trainer erweitern). Export: Trainer → 💾 Export → "📦 Daten laden" → `tounsi_db_YYYY-MM-DD.md` → ins Projektwissen hochladen, alte Datei ersetzen.

## Kern-Workflow: neue Vokabel(n) verarbeiten

**Dieser Ablauf gilt für JEDE Quelle** (PDF/Foto, Uni-Wien, TUNICO, Peace Corps, Derja Ninja, Instagram, ...) — nur die Transliterations-Umwandlung in Schritt 2 unterscheidet sich je Quelle (siehe "Transliteration — Ziel-Konvention" für die Zielregeln, "Datenquellen" für die jeweilige Quell-Notation).

1. **Vollständig extrahieren.** Bei PDFs/Fotos: Text (pdfplumber, inkl. `extract_tables()`) UND visuell (pdftoppm 150dpi, jede Seite mit `view` prüfen) — nie Seiten überspringen. Nicht nur die offizielle Wortschatztabelle: Dialoge, Grammatik-Beispielsätze, Übungssätze, Bildunterschriften enthalten oft zusätzliche Wörter/Sätze und müssen genauso vollständig geprüft werden. Ganze Sätze gehören ebenfalls als eigene Zeile in `vocabulary` (topic="Phrasen"/"Ausdrücke"), auch wenn die Einzelwörter schon vorhanden sind.
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
6. **Nach dem Schreiben, Pflicht unaufgefordert:** Duplikat-Check UND Transliterations-Check (SQL unten) laufen lassen, plus Bedeutungsfacetten-Check gegen `tunico_import`/`tunico_corpus_*` (Methodik siehe TUNICO-Abschnitt) — für JEDE Quelle, nicht nur TUNICO-eigene Batches.
7. **`vocab_lesson_refs` und `progress` aktualisieren**, siehe eigener Abschnitt "Kurs-Verknüpfung".

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

**Diese Tabellen sind die eine verbindliche Zielkonvention für ALLE Quellen.** Jede Quelle hat ihre eigene Ausgangsschreibung (siehe „Datenquellen" für die jeweilige Quell→Ziel-Umwandlungstabelle), aber das Ergebnis folgt immer diesen Regeln — nie eine quellenspezifische Variante direkt übernehmen.

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

## Verben

- Immer als separate Einträge je Form: Vergangenheit (er ...te), Präsens (er ...) UND Imperativ (...!) — nie kombiniert mit Schrägstrich/Komma/Semikolon in einer Zeile
- Vergangenheit = Wurzelform (فَعَل), Präsens = يِ/يُ-Form (maskulin singular)
- `topic=Verben-Konjugation` für alle Präsens-Verbformen — Lektion mit title "Verben — Präsens"
- Einträge mit Schrägstrich-Muster „imperativ / yXXX" sofort aufteilen
- **Wiederkehrender Fehlerfall: Imperativ+Vergangenheit-Bündelung** (nicht nur Imperativ+Präsens) — da beide bei manchen Verbmustern gleich geschrieben werden, aufgeteilte Zeilen mit `homonym_ok=true` markieren. Details/Fälle: PRECEDENTS.md → Verben.
- **Verwandter Fehlerfall: `darija` transliteriert als MSA-Imperativ-Präfix (a-/i-/o-), obwohl `arabic_script` bereits korrekt die 3.-Person-Vergangenheit zeigt.** `darija` aus dem korrekten `arabic_script` neu transliterieren, nicht das arabic_script antasten. Bei jedem Präsens/Vergangenheit-Paar lohnt der Blick, ob `darija` wirklich zur (oft zuverlässigeren) Vokalisierung in `arabic_script` passt. Details: PRECEDENTS.md → Verben.

## Prüfungen nach jedem Import — Pflicht, unaufgefordert

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

**Neue Checks aus Kurs-Grammatiknotizen ableiten — wiederkehrende Praxis, nicht einmalig.** `grammar_notes` in `course_lessons` enthalten viele Regeln — nur solche aufnehmen, die rein aus `darija`/`german`/`arabic_script` ableitbar sind, OHNE Wortart-Wissen/Kontext (wie die Sonnenbuchstaben-Regel). Bei jeder neuen/überarbeiteten Lektion erneut versuchen. **Immer erst gegen den Bestand testen (Fehlalarmquote) und zeigen, bevor eine Regel dauerhaft in `TRANSLIT_RULES` übernommen wird.** Bisher 4 Kandidaten getestet, 2 bestanden (unmarkierte Feminina, "und"=immer "w-"), 2 verworfen (Verb-Personalpräfix, m/f-Adjektivpaare=masc+"a" — beide an Dialekt-Realität gescheitert, Details: PRECEDENTS.md → Prüfungen nach jedem Import).

## Bulk-Insert bei großen Mengen

**Über ~1000 Zeilen NICHT per SQL-Text-Batches über `execute_sql` oder Subagenten** — kostet unverhältnismäßig viele Tokens (Text wird doppelt bezahlt: erst per `Read` in den Kontext, dann nochmal als `execute_sql`-Parameter) und Subagenten können durch Account-Session-Limits mitten im Batch abbrechen.

**Stattdessen: direkter POST an die PostgREST-Bulk-Insert-API, am Modellkontext vorbei.** Nils gibt einen `service_role`/`secret`-Key aus dem Supabase-Dashboard (Project Settings → API, Format `sb_secret_...`) durch. Kleines Python-Script schreiben, das die Daten (als JSON) in Chunks (~500 Zeilen) per `urllib`/`requests` als `POST https://<project-ref>.supabase.co/rest/v1/<tabelle>` mit Headern `apikey`/`Authorization: Bearer <key>`/`Prefer: return=minimal` verschickt. Key nur als Env-Var übergeben (`export SB_SECRET=... && python3 script.py`), landet nicht im Skript, Skript nach Gebrauch löschen. **Vor dem Insert: Zeilen-Reihenfolge gegen den bereits importierten Teilbestand prüfen** (`SELECT id, xml_id FROM tabelle ORDER BY id DESC LIMIT 1` gegen den lokalen JSON-Index abgleichen), um Duplikate/Lücken bei fortgesetzten Imports zu vermeiden.

Kleinere Mengen (< ~300 Zeilen): weiterhin direkt per `execute_sql` in 2-4 Batches.

## Code-Änderungen

- Nicht einbauen ohne Bestätigung
- Syntax-Prüfung via `node vm.Script()` vor Auslieferung
- Output-Datei immer `trainer.html` (ohne Versionsnummer) — Ausnahme: bei Android-Caching-Problemen Versionsnummer erhöhen
- **Bei Performance-Fixes (z.B. fehlendes `spellcheck="false"`) alle Geschwister-Inputs im selben Formular mitprüfen, nicht nur das gemeldete Feld** (Präzedenzfall: PRECEDENTS.md → Code-Änderungen)

## Prüfprotokoll (Pflicht am Ende jeder Auswertung)

Am Ende jeder PDF-Auswertung immer eine Tabelle anhängen:

| Datei | Seiten | Methode |
|---|---|---|
| Dateiname.pdf | 1–N (alle) | pdfplumber (Text+Tabellen) + visuell einzeln |

Zusätzlich vermerken: Duplikatcheck (gegen welche Quellen, wie viele `project_knowledge_search`-Abfragen), offene Rückfragen (gesammelt, nicht einzeln während der Analyse). Zweck: Nutzer sieht auf einen Blick, ob alle Seiten vollständig geprüft wurden.

## Workflow: Geflaggte Vokabeln (🚩) live gegen Derja Ninja prüfen

Wenn Nils im Trainer Vokabeln mit 🚩 markiert, ist das der Auftrag, sie zu recherchieren und Korrekturvorschläge in `vocabulary_review` einzutragen — die eigentliche Recherche läuft außerhalb der App, der Ninja-Check-Tab im Trainer ist nur für die menschliche Freigabe/Ablehnung. Kein automatisches UPDATE direkt auf `vocabulary`, außer der Eintrag ist zweifelsfrei bereits korrekt (Schritt 6).

Auslöser: "Ich habe Vokabeln markiert" → `SELECT * FROM vocabulary WHERE flagged = true` als erster Schritt. **Sofort danach, für den ganzen Batch als EINE Sammelabfrage:** `SELECT * FROM vocabulary_review WHERE vocabulary_id IN (<alle IDs>)` — Konflikt-Check ganz am Anfang, bevor ein Korrekturplan gebaut wird (nicht erst kurz vorm Schreiben, sonst muss ein fertiger Plan nachträglich umgebaut werden).

### Ablauf pro geflaggter Vokabel

1. **Offline-Quellen zuerst, in dieser Reihenfolge — alle drei, nicht nur die erste:**
   1. `derja_ninja_entries` (siehe Datenquellen unten) — schnell, aber ein Snapshot (2026-08-17), kann bei mehrteiligen Begriffen unvollständig sein.
   2. `tunico_import` (Englisch-Übersetzung als Suchschlüssel gegen `senses`/`de_gloss`) — liefert oft das komplette Bedeutungsspektrum eines mehrdeutigen Worts, wo ein einzelner Ninja-Treffer nur eine Facette zeigt (siehe TUNICO-Abschnitt).
   3. `peacecorps_dict_import` (Englisch-Übersetzung gegen `headword`/`senses`) — dritte unabhängige Quelle, v.a. bei älterem/ungewöhnlichem Lehrbuchvokabular ohne Ninja-/TUNICO-Treffer (siehe Peace-Corps-Abschnitt).
   Erst wenn KEINE der drei einen Treffer liefert, gilt eine Vokabel als "keine externe Bestätigung" — nicht schon nach `derja_ninja_entries` allein.
2. **Live-Check, wenn keine der drei Offline-Quellen etwas liefert:** `GET https://derja.ninja/search?search=<begriff>&script=<english|transliterated|arabic>` (serverseitig gerendert, curl reicht, kein JS nötig). `script=english` für deutsche/englische Begriffe (vorher übersetzen), `script=arabic` für arabische Schreibung, `script=transliterated` für lateinische Umschrift (Umwandlungstabelle siehe unten). Kein Treffer → sauberer Text "No results".
   - Jeder Treffer: `<div class="search-result__term_in_arabic">` mit `<audio src="https://static.derjaninja.com/recordings/NNNN.mp3">` und `<span class="transliterate-text">`. Beispielsatz-Block: `search_result__example_sentence_in_arabic` (Unterstrich statt Bindestrich — Inkonsistenz der Seite selbst).
   - **Wort- und Beispielsatz-Audio zeigen oft auf dieselbe mp3** — Trennung passiert nur clientseitig per JSON-Zeitstempel (`{"term":{"start":...,"end":...}}`). `WebFetch` strippt dieses JSON — für Audio-Timing immer `curl` benutzen. `ninja_audio_url` nie ohne `ninja_audio_start`/`ninja_audio_end` setzen, wenn die Quelle ein Satz-Audio ist. Details/betroffene Fälle: PRECEDENTS.md → Abgleich mit Derja Ninja.
   - Immer die volle Trefferliste scannen (bis zu 40 Treffer, nicht nach Relevanz sortiert), nicht nur die ersten 5–8.
   - Audio-URL direkt beim ersten Scan mitextrahieren, nicht erst bei Bedarf.
   - **Audio nur bei wirklich identischer Aussprache anhängen** — gleiche Silbenzahl, gleiche Gemination (Lautlehre-Regel 2). صَرْف (sarf, "Wechselgeld") ≠ صَرِّفْ (sarrif, "wechseln") trotz gleichem Konsonantenskelett.
   - Ein Treffer bedeutet nicht automatisch ein eigenes Headword — kann nur aus dem Beispielsatz eines fremden Eintrags stammen (typisch bei Redewendungen). Bei zusammengesetzten Begriffen ohne Treffer: nach dem Adjektiv/Bestandteil statt dem ganzen Kompositum suchen, und gezielt Beispielsätze durchsuchen.
3. **Ninjas Transliteration ist ein Strukturhinweis, keine Vorlage** — nie 1:1 übernehmen (andere Konvention: ch statt sh, 9 statt q), aber prüfen ob sie ein von unserer Transliteration übersehenes Feature zeigt (v.a. Gemination). In Chat-Alphabet übertragen.

**Ninjas eigener Transliterations-Schlüssel** (für `script=transliterated`-Suchen — Ninja konvertiert die Sucheingabe intern erst zu Arabisch):

| Ninja | Laut | Unsere Konvention | Für Ninja-Suche umwandeln |
|---|---|---|---|
| 2 | أ (Hamza) | meist weggelassen | – |
| 3 | ع | 3 | gleich |
| 5 | خ | kh | kh→5 |
| 7 | ح | 7 | gleich |
| 9 | ق | q | q→9 |
| ch | ش | sh | sh→ch |
| gh | غ | gh | gleich |
| h | ه | (kein eigenes Zeichen) | gleich |
| th | ث oder ذ | th | gleich |
| a | Fatha (kurz) | a | gleich |
| i | Kasra (kurz) | i | gleich |
| ou | Damma (kurz) | oft u/o geschrieben | u/o→ou |

Beispiel: unser `yukhruj` → Ninja-Suche `you5rouj`; unser `yaqli` → `ya9li`. Bei `script=english`-Suchen nicht nötig.

**Ninjas Transkriptions-Philosophie:** Ninja schreibt Wörter tendenziell in ihrer vollen, theoretischen Form (تحمص nicht اتحمص), orientiert sich bei Unsicherheit an der Hocharabisch-Schreibung — "volleres" Ninja-arabic_script ist meist keine Diskrepanz, nur eine andere Kontraktionsstufe. Bei sehr geläufigen Kontraktionen schreibt Ninja aber durchaus auch die kontrahierte Form — bei Widerspruch zwischen dieser Heuristik und einem konkreten Ninja-Treffer gewinnt immer der konkrete Treffer.

**Ninja zitiert Verben/Nomen in der Grundform** (Vergangenheit/Imperativ, nicht Präsens; Singular, nicht Plural) — Audio-Trefferquote bei Präsens-Verben und Pluralformen entsprechend niedrig erwarten, kein Recherche-Manko.

**Sobald ein Treffer die Schreibung bestätigt (kein Fehler), sofort auch das Audio mitziehen** — nicht nur die Rechtschreibprüfung als erledigt abhaken.

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

## Kurs-Modus: course_lessons / course_exercises

Der Trainer hat neben der klassischen SRS-Vokabelabfrage einen Kurs-Modus (Stepper-UI: Chunk-Übersicht → Chunk-Intro → Items → Chunk-Zusammenfassung), aufgebaut aus den Uni-Wien-Lehrskripten. Zwei Tabellen:

- `course_lessons` — eine Zeile pro Lektion, mit `grammar_notes` (Markdown, `### Überschrift`-Abschnitte) und `chunk_order` (jsonb-Array: Reihenfolge/Gruppierung im Stepper — jedes Element hat `key`, `label`, `dialog`, `grammar_headings`)
- `course_exercises` — eine Zeile pro Übungs-Item, mit `course_lesson_id`, `position` (Integer, Reihenfolge), `chunk_key` (muss zu einem `key` in `chunk_order` passen), `exercise_type`, `prompt`, `solution`, optional `vocabulary_id`

**Bei jeder Tabelle, die über die Zeit wächst, `sbApiPaged` verwenden, nicht `sbApi`** — PostgREST liefert standardmäßig max. 1000 Zeilen pro Request, unabhängig vom `select`. Ein einfacher `count(*)`-Check gegen 1000 ist ein guter Kurz-Test, wenn ein Nutzer "fehlende Inhalte" meldet, obwohl die DB sie zeigt (Präzedenzfall mit ~270 verlorenen Übungen: PRECEDENTS.md → Kurs-Modus).

### Exercise-Typen

| Typ | Verwendung |
|---|---|
| `translate_de_tn` | Deutsch → Tunesisch übersetzen, `prompt`=Deutsch, `solution`=Tunesisch |
| `fill_blank` | Lückentext, `___` im prompt |
| `answer_pattern` | Frage + Musterantwort(en), oft `ih, X. / la, Y.`-Format |
| `fixed_response` | Feste Grußformel-Paare (Frage→Antwort) |
| `grammar_drill` | Konjugationstabellen, Possessivsuffix-Reihen — `solution` listet alle Formen |
| `grammar_card` | Reine Erklärkarte (Frage zur Grammatik → Erklärung als Antwort) |
| `build_dialog` | Wort-Paare/-Tripel zum freien Dialogbau, `solution` oft `null` |
| `pronunciation` | Einzelwort-Ausspracheübung — **muss `vocabulary_id` verlinkt haben** (inkl. Audio, wenn vorhanden) |

### Workflow: erst Vokabeln, dann Übungen

Standing rule: **bei jeder neuen Lektion erst alle referenzierten Vokabeln vollständig gegen den Bestand prüfen und importieren, danach erst die Übungen bauen.** Nicht vermischen. Jede Einzelwort-Übung (v.a. `pronunciation`) wird mit der Vokabel per `vocabulary_id` verlinkt, inkl. Audio wenn vorhanden.

Bildbasierte Übungen werden nie umgesetzt — explizite Anweisung "Bild rausnehmen". Beim Auswerten kurz vermerken, welche Übungsnummern deshalb übersprungen wurden.

### Pflichtschritt: Item-Zählung, nicht nur Abschnitts-Existenz

**Prüfen ob eine nummerierte Übung existiert reicht nicht — alle Items bis zur letzten Nummer müssen als eigene `course_exercises`-Zeile in der DB stehen.** (Präzedenzfall mit ~50 übersehenen Übungen über drei Lektionen: PRECEDENTS.md → Kurs-Modus.)

1. Jede nummerierte Übung im Quellmaterial bis zur letzten Ziffer durchzählen (z.B. "V. Übersetzen Sie, 1–21" → 21 Items erwartet)
2. Gegen `SELECT count(*) FROM course_exercises WHERE course_lesson_id=X AND chunk_key='...'` abgleichen
3. Bei Abweichung: fehlende Items identifizieren, nicht "ist wohl vollständig" annehmen
4. Auch mehrseitige Übungen beachten — Nummerierung kann über einen Seitenumbruch weiterlaufen

### Vollständigkeitsprüfung: Vokabel-Verknüpfung pro Lektion (vocab_lesson_refs)

**Nie nach `vocabulary.topic` prüfen, ob eine Vokabel zu einer Kurs-Lektion gehört — das Wort muss wirklich im Kurstext vorkommen (Nutzeranweisung, 2026-09-02).** Ein Themen-Sweep erzeugt massive Fehlalarme: bei einem Testlauf lieferte er für 11 Lektionen zusammen ~280 scheinbar fehlende Vokabeln, von denen nach Volltext-Prüfung nur eine kleine Minderheit echt war.

**Richtige Methode:**
1. Korpus pro Lektion zusammenbauen: `dialog_text` + `grammar_notes` + **alle** `course_exercises`-Felder (`instruction`, `prompt`, `solution`, `meta::text` — nicht nur `prompt`/`solution`, sonst gehen Treffer aus Drag&Drop-Wortlisten verloren).
2. Kandidaten (grob per `topic` vorsortiert, um die Menge klein zu halten) mit Wortgrenzen-Regex (`\y...\y`, NICHT `\b`) gegen den Korpus matchen.
3. **Pflicht-Gegencheck pro Treffer:** Fundstelle im Korpus tatsächlich lesen. Kurze/häufige Wörter sind anfällig für Homograph-Kollisionen — ein Treffer beweist nur, dass die Zeichenkette vorkommt.
4. Nur bei bestätigtem Treffer die ID (und ggf. das Wort im `darija:`-Teil) an `vocab_lesson_refs` anhängen — nie den ganzen String überschreiben.

**Wiederkehrende Homograph-Fallen (immer den tatsächlichen Fundtext lesen):**

| Zeichenkette | Falsch angenommene Bedeutung | Tatsächlich meist gemeint |
|---|---|---|
| `dar` | er drehte sich / er wandte sich | `dar` = Haus ("f-id-dar" = zuhause) |
| `mit` | ich starb | deutsches Wort "mit" in Erklärungs-/Übersetzungstexten |
| `3am` | er schwamm | `3am` = Jahr |
| `walla` | er wurde | `walla` = oder (Konjunktion) |
| `kan` | er war | Bedingungspartikel "falls/wenn" (`kan, idha, idha kan`), v.a. in Grammatik-Abschnitten zu Bedingungssätzen |
| `sghar` | Kinder (Nomen) | Plural von `sghir` = klein (Adjektiv) |

Liste nicht abschließend — bei jedem neuen kurzen/häufigen Treffer denselben Verdacht anwenden.

**Präzedenzfall 2026-09-02: L1–L13 systematisch geprüft**, ~132 echte Verknüpfungen ergänzt, ~15 Fehlalarme aussortiert. Bei L11/L13 auf Nutzerwunsch ohne `progress.next_review`-Fälligsetzung (nur Verknüpfung, kein SRS-Eingriff) — bei künftigen Lektionen im Zweifel nachfragen. Nicht erneut von null anfangen, sondern bei neuen/geänderten Lektionen gezielt ergänzen.

### Wortvarianten nicht vorschnell auf Bestandswort normalisieren

Vor dem Zusammenlegen zweier ähnlicher Wörter prüfen, ob eine Übung selbst eine phonetische Eigenheit der exakten Schreibweise demonstriert (Artikel-Assimilation, Reim, Wortspiel) — wenn ja, nicht mergen, beide Formen behalten, im Zweifel Nutzer fragen (Präzedenzfall `dziri`/`jzayri`).

### `chunk_order` — Sync-Pflicht mit `grammar_notes`

**Technischer Zwang:** `chunk.grammar_headings` referenziert `### Überschrift`-Text aus `grammar_notes` per **exaktem String-Match** (`parseGrammarSections()` in trainer.html). Wird eine `###`-Überschrift umbenannt/zusammengelegt, MUSS jedes referenzierende `chunk_order`-Element mitaktualisiert werden — sonst bricht die Verknüpfung lautlos (kein Fehler, der Intro-Screen zeigt einfach nichts). Auch bei jeder Konvention-Änderung (z.B. Transliterationsregel) `chunk_order`-Labels mit durchsuchen, nicht nur `grammar_notes`/`vocabulary`.

### Position-Verschiebung beim nachträglichen Einfügen

`course_exercises.position` ist Integer ohne Unique-Constraint. Beim Einfügen VOR bestehenden Items: `UPDATE ... SET position = position + 1 WHERE course_lesson_id=X AND position >= Y` — ein zu niedriger Y-Wert erwischt mehr Zeilen als beabsichtigt. Nach jedem Positions-Shift die betroffene Chunk-Sequenz per SELECT gegenprüfen.

## Kurs-Verknüpfung: vocab_lesson_refs

Nach jedem Vokabel-Batch (neue INSERTs oder gefundene Duplikate) muss `course_lessons.vocab_lesson_refs` der jeweiligen Lektion aktualisiert werden — mit echten Vokabel-IDs, nicht nur als Text-Liste.

**Pflichtformat (technischer Zwang, kein Stilratschlag):** `vocab_lesson_refs` ist KEIN einfaches Komma-Array. Die App (`parseCourseVocabRefs()` in trainer.html) erwartet exakt `ids:<id1>,<id2>,...|darija:<wort1>,<wort2>,...`. Ein Format ohne diese Präfixe wird komplett ignoriert (`part.split(':')` liefert `length<2`, die Funktion bricht ohne Fehler ab — aber auch ohne verknüpfte Vokabel).

Bei Live-Zugriff einfach mit `RETURNING id, darija` direkt nach dem INSERT arbeiten. Nur ohne Live-Zugriff braucht es die Subquery, die auf (darija, lesson_id)-Paare matcht:

```sql
WITH refs AS (
  SELECT id, darija FROM vocabulary WHERE (darija, lesson_id) IN (('arba3tash',31),('tsa3tash',31))
)
UPDATE course_lessons
SET vocab_lesson_refs = 'ids:' || (SELECT string_agg(id::text, ',') FROM refs)
                       || '|darija:' || (SELECT string_agg(darija, ',') FROM refs)
WHERE course_number = 2;
```

Bei nachträglicher Ergänzung reicht `||','||neue_ids` NICHT — der bestehende String muss geparst (beide Teile getrennt erweitert) und neu zusammengesetzt werden, sonst entsteht wieder ein kaputtes Format.

Im selben Zug immer auch `progress` mitziehen — für `next_review = NULL` fällig setzen (bestehende SRS-Termine nie überschreiben), für neue Vokabeln ohne progress-Zeile eine anlegen:

```sql
WITH refs AS (
  SELECT id FROM vocabulary WHERE (darija, lesson_id) IN (('arba3tash',31),('tsa3tash',31))
)
UPDATE progress
SET next_review = now()
WHERE user_id = '6c6eff77-6b56-4ba9-b445-b1cd47773b41'
  AND vocabulary_id IN (SELECT id FROM refs)
  AND next_review IS NULL;

WITH refs AS (
  SELECT id FROM vocabulary WHERE (darija, lesson_id) IN (('arba3tash',31),('tsa3tash',31))
)
INSERT INTO progress (user_id, vocabulary_id, correct_count, wrong_count, review_count, next_review)
SELECT '6c6eff77-6b56-4ba9-b445-b1cd47773b41', r.id, 0, 0, 0, now()
FROM refs r
WHERE NOT EXISTS (SELECT 1 FROM progress p WHERE p.user_id = '6c6eff77-6b56-4ba9-b445-b1cd47773b41' AND p.vocabulary_id = r.id);
```

Die (darija, lesson_id)-Paare und der `WHERE course_number`-Wert sind nur ein Beispiel — bei jedem neuen Batch durch die tatsächlichen Werte ersetzen.

## Datenquellen

Für jede Quelle gilt der "Kern-Workflow" oben unverändert — hier steht nur, was pro Quelle unterschiedlich ist: die Ausgangsnotation (→ Chat-Alphabet-Umwandlung) und quellenspezifische Tabellen/Mechanik.

### Uni-Wien-Lehrskripte (Tunesisch-Arabisch I & II)

Zwei Lehrskripte, 13 Lektionen insgesamt. Wissenschaftlich strukturiert: Dialoge, Wortschatz-Tabellen, Grammatik-Kapitel, Übungen, Ausspracheübungen. Eigene wissenschaftliche Transliteration (IPA-nah, Emphatika-/Langvokal-Markierung), kein arabisches Original. Enthält den Rohstoff für den Kurs-Modus (siehe eigener Abschnitt).

**Umwandlungstabelle (Uni Wien → Chat-Alphabet):**

| Uni Wien | Chat-Alphabet | Beispiel |
|---|---|---|
| ʔ (Hamza) | meist weggelassen | — |
| ʕ | 3 | sabʕa → sab3a |
| ḥ | 7 | ḥāl → 7al |
| x / ḫ | kh | xamsa → khamsa |
| ġ | gh | ġalla → ghalla |
| q | q | qlam → qlam |
| š | sh | šbāb → shbab |
| ž | j | rāžil → rajel |
| y | y | yimši → yimshi |
| ā/ī/ū (Langvokale) | kein Sonderzeichen | ṣbāḥ → sba7 |
| ṣ/ṭ (Emphatika) | s/t | ṣbāḥ → sba7, ṭūl → toul |
| ḍ | dh (siehe Ziel-Konvention oben) | ḍayyiq → dhayyaq |
| ḏ/ṯ/ẓ | th (siehe Ziel-Konvention oben) | hāḏa → hetha |
| ḷ, ṃ, ṛ, ḅ | keine Unterscheidung | žāṛi → jari |

Diese Umwandlung gilt genauso für Fließtext in `grammar_notes`/`course_exercises`, nicht nur Einzelvokabeln — nach dem Schreiben gezielt nach übrig gebliebenen Uni-Wien-Sonderzeichen suchen (ā, š, ʕ, ḥ, ṛ, ṭ, ġ, ž).

**Pflicht-Gegencheck nach jeder Konvertierung: Konsonant für Konsonant gegen das arabic_script prüfen, nicht nur "sieht plausibel aus".** Falsch konvertierte Transliteration lässt auch den Duplikat-Check ins Leere laufen. Checkliste: arabic_script ح → darija muss "7" haben; خ → "kh"; ع → "3"; غ → "gh"; ش → "sh". Bei Widerspruch: darija korrigieren, nicht arabic_script. (Präzedenzfall, dreifacher Fehler in einem Batch: PRECEDENTS.md → Uni-Wien-Lehrskripte.)

**Fehlendes arabic_script: zuerst Derja Ninja, erst danach selbst erstellen.**
1. Deutsche Bedeutung ins Englische übersetzen, gegen `derja_ninja_entries` suchen (offline, dann live `script=english`)
2. Zusätzlich über die (ins Ninja-Schema konvertierte) Transliteration suchen (`script=transliterated`) — unabhängige zweite Spur
3. Treffer mit passender Bedeutung → dessen `arabic_script` übernehmen (inkl. Audio), NICHT selbst aus der Uni-Wien-Umschrift ableiten
4. Kein Treffer → direkt aus der Uni-Wien-Umschrift ableiten, Pflicht-Gegencheck bleibt nötig
5. Bei einem ganzen Lektions-Batch: Schritt 1+2 als eigener Sweep vor dem Einzel-Import, nicht Wort für Wort verschränkt
6. Ergebnis in `vocabulary.internal_note` festhalten (z.B. „Ninja-bestätigt (Bedeutungssuche)", „arabic_script selbst erstellt, kein Ninja-Treffer") — auch im Trainer-Editor sichtbar/editierbar (`ei-nt`)

Bei Duplikaten immer die exakte bestehende DB-Schreibweise übernehmen, nicht neu ableiten. Erst `project_knowledge_search`, dann ggf. anpassen.

**Duplikat-Check: "Fällig setzen" statt Ausschluss.** Ergänzt die Standard-Duplikat-Kriterien nur um eine andere Konsequenz: Wort bereits vorhanden → nicht ausschließen, `progress.next_review = now()` setzen (nur wenn `next_review IS NULL` oder keine progress-Zeile — bestehende Zeitpläne nie überschreiben). Wort neu → normale Neuanlage + sofort fällig. Grenzfall (Homonym/Synonym) → nicht automatisch einordnen, dem Nutzer als offene Frage vorlegen.

**Arbeitsweise pro Lektion:** Nils lädt alle Fotos einer Lektion in einer Nachricht hoch, Claude arbeitet intern häppchenweise pro Tabelle/Bereich ab (erst Verben, dann Wortschatz, dann Berufe, ...) und zeigt nach jedem Bereich das Ergebnis — sonst werden zuverlässig Wörter übersehen und bereits vorhandene Wörter versehentlich nochmal angelegt. Seitenzahl-Lücken explizit ansprechen und nachfragen, nie ein Wort als "fehlt bestimmt auf der fehlenden Seite" vermuten.

**Grammatik-Regeln rückwirkend auf Bestand anwenden:** nach jeder neuen Lektion prüfen, ob sich eine explizite Lautlehre-/Grammatikregel als Textmuster gegen den Bestand durchsuchen lässt (bevorzugt direkt per SQL, token-günstiger als `project_knowledge_search`). **Zwei Supabase-MCP-Fallen:** `CREATE TEMP TABLE` funktioniert nicht über mehrere `execute_sql`-Calls hinweg (jeder Call = eigene Connection) — alles in einer Query/CTE bündeln; bei mehreren SELECTs in einem Call kommt nur das letzte Ergebnis zurück — immer nur ein SELECT pro Call. Treffer klassifizieren (nur Transliteration / auch arabic_script betroffen / Dialektfrage ungeklärt → Semia/Ninja vorlegen), volle Liste zeigen, erst nach Bestätigung schreiben. Bei unscharfen Regeln (Possessivsuffixe, Verbkonjugationsmuster): Stichprobe statt Vollständigkeitsanspruch, explizit kennzeichnen.

### TUNICO

"A Digital Dictionary of Tunis Arabic" (Uni Wien, Dallaji/Gabsi/Procházka/Ritt-Benmimoun u.a., 2016) — direkt aus derselben akademischen Quelle wie unser Uni-Wien-Kursmaterial (1.056 von 7.543 Einträgen zitieren "Ritt-Benmimoun 2014", genau unsere Kursquelle). Live-Website hinter Anubis-Bot-Schutz — **nicht versuchen zu umgehen**, stattdessen Rohdaten auf GitHub (`acdh-oeaw/tunico-data`) klonen/parsen. Für Seiten außerhalb der öffentlichen Repos (z.B. Korpus-Statistikseiten): Nils um Copy-Paste bitten.

**Tabellen** (alle mit `*_orig`=wissenschaftliche DMG-Transliteration, `*_chatalpha`=automatisch umgewandelt, getrennte Spalten):
- `tunico_import` (7.543 Zeilen): `lemma_orig`/`_chatalpha`, `variants_*`, `pos`, `subc`, `root_*`, `inflected` (jsonb), `senses` (jsonb `{en,de,fr}`), `bibl`. Kein arabisches Original.
- `tunico_corpus_verbs`/`_adjectives`/`_nouns` (300/64/300 Zeilen): häufigste Wörter im Korpus mit `rank`/`frequency` und allen belegten Flexionsformen (`forms_*`, Array) — wertvoll für Priorisierung.
- `tunico_corpus_wordforms` (9.874 Zeilen): alle belegten Wortformen nach Häufigkeit, direkt aus den TEI-XML-Korpustexten (`xmlfiles/` im Repo) nachgerechnet, nicht per Copy-Paste — bei TUNICO-Statistikseiten immer erst prüfen, ob sich Zahlen aus den rohen `xmlfiles/` nachrechnen lassen.

**Umwandlung `*_orig` → `*_chatalpha`:** ʔ→weg, ʕ→3, ḥ→7, x/ḫ→kh, ġ→gh, š→sh, ž/ǧ→j, ḍ→dh, ḏ/ṯ/ẓ→th, ā/ī/ū/ē/ō→ohne Sonderzeichen, ṣ/ṭ→s/t, ḷ/ṃ/ṛ/ḅ/ṇ→ohne Unterscheidung, ᵊ→weg, französische Nasalvokale (ä/ǟ→e, õ/ȭ/ȫ→o, ü/ǖ→u). Vor jedem Bulk-Import auf einer neuen Teilmenge einmal `unicodedata.category(ch)=='Mn'` auf die `*_chatalpha`-Spalten prüfen, um freistehende combining marks zu erkennen (Präzedenzfall: PRECEDENTS.md → TUNICO).

**TUNICO-Kandidaten-Review im Trainer** (Tab "🗂️ TUNICO", `showTunicoCandidates()`): manuelles Abarbeiten der Frequenz-Lücken-Analyse in Batches, gefiltert nach Kategorie/Status. Tabelle `tunico_candidates` (664 Zeilen) speichert `auto_verdict`, `matched_vocab_id`, `status`, `vocabulary_id`, `comment`, `decided_at`. Drei Aktionen: 🔗 Verknüpfen (Suche gegen `ALL_VOCAB`, `progress`-Zeile mit `next_review=jetzt`), ➕ Neu anlegen (`flagged:true`, `arabic_script:null`), ⏭ Überspringen.

**Verb-Zitierform ≠ Trainer-Konvention:** TUNICOs `lemma_chatalpha` ist die bloße Stammform, der Trainer nutzt die 3. Person Singular Präsens mit y-/t-Präfix — beim Verknüpfen/Neuanlegen die passende Flexionsform aus `tunico_corpus_verbs.forms_chatalpha` wählen (siehe `_tnGuessVerbForm()`), nie die reine Stammform übernehmen. Nomen/Adjektive sind davon nicht betroffen.

**Bei jeder TUNICO-Verknüpfung/Neuanlage: deutsches Gloss-Feld gegen `de_gloss` auf fehlende Bedeutungsfacetten prüfen.** `de_gloss` bei "/" in Einzel-Sinne zerlegen, gegen `german` abgleichen. Bei echter zusätzlicher Facette ohne Wortüberlappung: zuerst prüfen, ob dasselbe/ein sehr ähnliches Darija-Wort bereits einen EIGENEN Bestandseintrag für genau diese Bedeutung hat, bevor angehängt wird. Unverwandtes Homonym gleicher Schreibung ist kein Blocker, nur eine Randnotiz. Bei Verdacht auf andere Wurzel/unverwandte Bedeutung: als Homonym-Konflikt melden, echte Wurzel-Prüfung gegen `tunico_import` nötig statt automatisch zusammenzuführen.

Bei einem scheinbaren Bedeutungsfehler, der nur auf EINEM Ninja-Teiltreffer beruht: vor der Korrektur zusätzlich `tunico_import` nach demselben Lemma/derselben Wurzel durchsuchen — TUNICO listet oft das komplette Bedeutungsspektrum, eine einzelne Ninja-Trefferzeile nur eine Facette (Details: PRECEDENTS.md → TUNICO).

**Beim automatischen Verknüpfen bevorzugt auf Einzelwort-Einträge matchen, nicht auf irgendeinen Treffer mit passendem Token** — ein Phrasen-Eintrag, der das Wort nur enthält, ist fast nie die bessere Zuordnung als ein exaktes Einzelwort im Bestand, falls beides existiert.

Bulk-Insert: siehe eigener Abschnitt "Bulk-Insert bei großen Mengen" oben (dort ursprünglich für TUNICO entwickelt, gilt für jede große Quelle).

### Abgleich mit Derja Ninja (derja_ninja_entries)

Derja Ninja (derjaguru.com/derjaninja.com) ist eine tunesische Online-Wörterbuchdatenbank mit vokalisierten arabischen Einträgen, meist zuverlässiger vokalisiert als bestehende Trainer-Einträge. Offline-Dump: `derja_ninja_entries` (17.335 Zeilen, vollständiger Crawl aller Einzelwort-Seiten `/e/<uuid>` über die Sitemap, Stand 2026-08-17) — **die einzige zu verwendende Ninja-Tabelle**, `derja_ninja_import` (älter, 6.327 Wörter) wird seit 2026-09-02 nicht mehr verwendet, auch nicht als Fallback (siehe Abschnitt unten zur Begründung, warum sie trotzdem nicht gelöscht wird).

Spalten: `entry_uuid`, `arabic_script`, `darija` (Ninjas eigene Transliteration — andere Konvention, nie 1:1 übernehmen), `english`, `audio_url`, `term_start`/`term_end` (Sekunden-Offsets, direkt nutzbar), `example_arabic`/`example_darija`/`example_english`, `example_audio_url`, `example_term_start`/`example_term_end`, `pos_tag`, `scraped_at`, `translit_norm`/`translit_skeleton`/`arabic_skeleton` (vorab berechnete vokalfreie Skelette).

**Regel: arabic_script aus Derja Ninja bevorzugen**, auch bei kleinen Abweichungen. `darija` danach an die neue Form anpassen. `german`-Herkunftshinweis nur bei echtem Mehrwert ergänzen ((MSA)/(Darija)/(frz.)). `lesson_id` prüfen, bei Unklarheit Rückfrage. **Nicht automatisch ändern:** bereits korrekt vokalisierte Einträge mit nur orthographischer Variante bei Ninja; abweichende Bedeutung → als Auffälligkeit markieren, Nutzer entscheiden lassen; `darija` selbst wird nie aus Ninja übernommen (andere Konvention).

**Workflow Bestandsaudit (z.B. fällige unvokalisierte Vokabeln):**
1. **Exakt-Match-Scan:** `vocabulary.arabic_script` (unvokalisiert) direkt gegen `derja_ninja_entries.arabic_skeleton` (bereits vokalfrei, kein eigenes `regexp_replace` nötig). Vokalisierte Bestandseinträge: eigene Vokalisierung gegen `derja_ninja_entries.arabic_script` vergleichen (Lautlehre-Regeln 1–4, Imala-Abweichungen ignorieren).
2. Pro Vokabel: Anzahl distinkter `arabic_script`-Werte zählen, nicht Anzahl der `english`-Kandidaten — mehrere `english`-Formen (tomato/tomatoes, introduce/introduced/introducing) zeigen oft auf dieselbe Zeile (Kollektivnomen bzw. Lemma-Gruppierung, normal, kein Fehler).
3. Bei mehreren distinkten Vokalisierungen: Wortart/Bedeutung gegen die deutsche Übersetzung prüfen (Lautlehre-Regel 5, Maß-I/Maß-II-Falle — Praxisfall `yqaddem`: PRECEDENTS.md → derja_ninja_import). Nur bei eindeutiger Zuordenbarkeit übernehmen.
4. **Semantische Zufallstreffer filtern:** reine Konsonantenskelett-Kollisionen ohne inhaltlichen Bezug verwerfen, im Zweifel ausschließen.
5. Ergebnisliste mit Alt→Neu, English, Audio-Link (`audio_url`+`term_start`/`term_end`, kein Trimmen mehr nötig) zeigen, erst nach Bestätigung schreiben.
6. Nach der Ausführung: Stichprobe gegen Lautlehre-Regeln 1–4 gegenprüfen.

**Bekannte Grenzen:** deckt nur Exakt-Match auf Konsonantenskelett ab, Rest bleibt manueller Vokalisierungs-Workflow. "Kein Match" ist eine eigene Fehlerkategorie, kein Beweis für einen Vokabelfehler — harmlose Ursachen: Genus-/Numerus-Divergenz (Ninja listet oft nur die maskuline Grundform), regionale Synonymvielfalt (Ninja listet mehrere Dialektvarianten, unser Eintrag kann eine legitime weitere sein, die dort nicht auftaucht), reine Abdeckungslücke (Stichprobe: 3 von 10 alltäglichen Wörtern fehlten komplett im Offline-Dump — bei Unsicherheit immer live nachschlagen, `derja.ninja/search?search=...`).

`derjaninja.com` ist vollständig serverseitig gerendert — ein reiner curl-Abruf ohne JS liefert die komplette Ergebnisliste. Ein 403/leeres Ergebnis in einer anderen Session liegt an der Domain-Allowlist der jeweiligen Umgebung bzw. falschen Parameternamen (`search`, nicht `q`/`query`), nicht an fehlendem JS-Rendering.

### derja_ninja_import — veraltet, nicht mehr verwendet

**Seit 2026-09-02 auf Nutzerwunsch abgelöst durch `derja_ninja_entries`** (17.335 statt 6.327 Zeilen, vollständigerer Crawl, mit Audio-Timing) — siehe Abschnitt oben für die aktuelle Methodik. Wird für keine neue Abfrage mehr benutzt, auch nicht als Fallback.

**Nicht löschen — kein reines Duplikat.** Vergleich am 2026-09-02: von 6.214 unterschiedlichen `darija_result`-Konsonantenskeletten in `derja_ninja_import` finden sich 1.186 (~19%) nicht in `derja_ninja_entries`. Stichprobe zeigt: größtenteils mehrwortige Phrasen/Redewendungen (z.B. "wallet"→"burtmuna", "classmate"→"wild klas"), keine fehlenden Einzelwörter — `derja_ninja_import` scheint eher Übersetzungs-Suchergebnisse (auch Phrasen) gescraped zu haben, `derja_ninja_entries` ist ein sauberer Wörterbuch-Eintrags-Crawl. Unterschiedlicher Zweck, kein Ersatz — Tabelle bleibt bestehen, auch wenn sie für neue Abfragen nicht mehr genutzt wird.

Tabelle: `english_word`, `darija_result` (vokalisiertes Arabisch), `samples` (jsonb-Array `{ar, en, audio_url}`), `source`, `imported_at`. RLS aktiv (Policy `app_access`). Zusätzliche Spalten in `vocabulary`: `english`, `ninja_id` (FK), `ninja_audio_url` (noch nicht im Trainer eingebaut).

Der ursprüngliche Workflow gegen diese Tabelle (zweistufige Zuordnung, Prioritäts-Batching) ist durch den `derja_ninja_entries`-Workflow oben vollständig ersetzt und hier nicht mehr dokumentiert — nur noch relevant für die eine offene Altlast (Batch vom 2026-07-24, siehe „Offene Punkte" ganz oben). Ausgewählte Lehren, die weiterhin allgemein gelten (Maß-I/II-Praxisfall, harmlose "Kein Match"-Ursachen): PRECEDENTS.md → derja_ninja_import.

### speaktounsi.off (Instagram)

Eigene Transliteration — wird an unsere Chat-Alphabet-Konvention angepasst, nie 1:1 übernommen: Quelle schreibt 9 für ق, ţ für ط, ā für langes a → wir schreiben q, t, e/a; Quelle schreibt ch für ش → wir schreiben immer sh; Großbuchstaben (H, T, S) der Quelle für Emphase → wir schreiben 7, t, s; Vokale an bestehende Einträge angleichen (z.B. nmeshiw → nimshiw). Bei Unsicherheit: arabic_script als Anker, Partnerin fragen.

**Was immer aufgenommen wird:** Beispielsätze (auch wenn die Einzelvokabel schon existiert, als eigener Satz-Eintrag, Lektion "Gesprächsführung", topic=Phrasen/Ausdrücke), Sprichwörter (Lektion "Sprichwörter", topic=Sprichwörter), Vokabeln nur wenn arabic_script noch nicht in DB.

**Was nicht aufgenommen wird:** Eigennamen, Ortsnamen; zu 100% bereits Vorhandenes; Grammatikerklärungen ohne konkreten Satz/Ausdruck.

**Workflow pro Runde:** 4–5 Bilder hochladen → Extraktion + Duplikat-Check (3 Felder separat) → Tabelle mit Status (✅/⚠️ Fehlt/🔄 Satz neu) → Bestätigung abwarten → SQL-Block. Neues Gespräch nach ca. 10 Runden.

### Peace Corps English-Tunisian Arabic Dictionary (1977)

Zwei Supabase-Tabellen, Rohextrakt aus dem "Peace Corps English-Tunisian Arabic Dictionary" (Ben Abdelkader/Ayed/Naouar, 1977, ERIC ED183017) — ältere, sehr umfangreiche lexikografische Quelle, unabhängig von TUNICO/Uni-Wien/Derja-Ninja.

- **`peacecorps_dict_import`** (5.070 Zeilen, Stand 2026-09-05 — **komplett A–Z importiert**, kompletter Englisch→Tunesisch-Teil bis Seite 497; der umgekehrte Tunesisch→Englisch-Teil danach ist bewusst nicht importiert): `headword` (englisches Stichwort), `freq` (1–5, Häufigkeitsrang aus dem Original, keine Homonym-Nummer), `pos`, `forms_phonetic` (Array, Original-Lautschrift, Reihenfolge wie im Original: Sg./Pl., m./f./Pl., Imperativ/Perfekt), `forms_roles` (Array parallel zu `forms_phonetic`: `sg`/`pl`/`m`/`f`/`imperativ`/`perfekt`/`coll`/`"unklar"`, nicht befüllt bei `is_synonym_set=true`), `forms_chatalpha`/`forms_skeleton` (Arrays, aus `forms_phonetic` per Konvertierungsregel abgeleitet, siehe PRECEDENTS.md → Peace-Corps-Konvertierung; **5.004/5.070 befüllt**, die restlichen 66 Zeilen haben schlicht kein `forms_phonetic`), `gender` (aus `pos` abgeleitet wo eindeutig), `is_loanword`, `is_synonym_set` (true = `forms_phonetic` sind echte unabhängige Synonyme, keine grammatischen Varianten), `needs_review` (unsichere Transkription — `false` heißt nicht "geprüft&sicher", nur "keine bekannte Auffälligkeit"), `senses` (jsonb, inkl. Beispielsätzen/Untersinnen), `arabic_script` (**bewusst leer**, nicht aus dem fehleranfälligen OCR übernommen — bleibt die einzige *unabhängige* Arabisch-Spalte dieser Quelle), `arabic_script_reconstructed`/`arabic_script_reconstruction_note` (seit 2026-09-05, **kein Faktum**: unvokalisierter Arabisch-Vorschlag aus `forms_phonetic[1]` per `public._pc_reconstruct_arabic()`, 4.874/5.004 rekonstruiert, davon 446 mit Unsicherheits-Hinweis; nie mit `arabic_script` verwechseln oder dort hineinschreiben — siehe PRECEDENTS.md → Peace-Corps-Arabisch-Rekonstruktion), `source_section`, `source_page`, `raw_text` (in der ganzen Tabelle 0% befüllt, kein Qualitätsproblem). Vor jeder Aussage zum Stand aktuell gegenchecken (`SELECT count(*), max(source_page) FROM peacecorps_dict_import`), nicht auf alte Notizen verlassen.
- **`peacecorps_grammar_import`** (21 Zeilen): `topic`, `page_start`, `page_end`, `raw_text`. Lautschrift-Legende (Sonderlaute Ḥ/ʕ/q, Vokalzeichen+Längung, Shadda) plus Grammatik-Kapitel (Personalpronomen, Artikel, Possessiv, Zahlen, Dual, Komparativ, Zeiten, Konditional, unregelmäßige Verben, Verneinung, Fragebildung, Objektpronomen). Rohmaterial für künftige `course_exercises`, noch nicht umgesetzt.

**Nutzen für den Ninja-Check-Workflow:** dritte Offline-Quelle im 🚩-Workflow (siehe "Ablauf pro geflaggter Vokabel" → Schritt 1) — nach `derja_ninja_entries` und `tunico_import` durchsuchen, v.a. bei älterem/ungewöhnlichem Lehrbuchvokabular.

### uniwien_source_pages

Tabelle `uniwien_source_pages` (270 Zeilen) — wörtliche Seiten-Transkription der Uni-Wien-Lehrskripte, eine Zeile pro PDF-Seite, per Claude Vision erfasst (Bild gelesen, nicht OCR). Spalten: `book`, `pdf_page`, `printed_page`, `lesson_number`, `section`, `content`, `has_nontext_content` (Flag für Seiten mit Bildern/Tabellen, von der Text-Transkription nicht vollständig erfasst), `transcribed_by`, `transcribed_at`.

**Das ist die Rohdaten-Ebene, von der `course_lessons.grammar_notes`/`dialog_text` und `course_exercises` abgeleitet wurden** — getrennt gehalten, damit sich Vollständigkeits-Audits gegen den tatsächlichen Quelltext prüfen lassen, nicht nur gegen die bereits verarbeitete Zusammenfassung. **Für Kurs-Vollständigkeits-Audits (siehe "Pflichtschritt: Item-Zählung") die belastbarste Quelle** — `content` (nach `lesson_number`/`pdf_page` gruppiert) gegen die tatsächlich in `course_exercises` vorhandenen Items abgleichen, statt sich nur auf `grammar_notes`/`dialog_text` zu verlassen. `has_nontext_content=true` markiert Seiten mit möglicherweise unvollständiger Transkription — dort vor einer "vollständig geprüft"-Aussage die Originalquelle nochmal gegenprüfen.

## vocab_lookup — Cross-Source-Abgleich (seit 2026-09-05)

**`vocab_lookup`** ist eine View (kein Materialized/keine Kopie — liest live aus `derja_ninja_entries`/`tunico_import`/`peacecorps_dict_import`, ändert nichts an den Rohtabellen) mit einheitlichen Spalten für alle drei: `source`, `source_id`, `english_key` (lowercased, primäre Suchachse), `headword_display`, `source_translit` (Lautschrift der Quelle in DEREN eigener Konvention, nicht unser Chat-Alphabet), `chatalpha` (unsere Konvention — bei TUNICO immer befüllt, bei Peace Corps 5.004/5.070 befüllt), `chatalpha_plural`, `gender`, `pos`, `arabic_script` (nur Ninja zuverlässig — echte, unabhängige Quellenangabe), `arabic_reconstructed`/`arabic_reconstruction_note` (nur bei `source='peacecorps'` befüllt, seit 2026-09-05 — unvokalisierter Rekonstruktions-**Vorschlag**, kein Faktum, siehe unten), `translit_skeleton`/`arabic_skeleton`, `example_en`/`example_de`/`example_ph`, `audio_url`, `note`. Eine Zeile pro Sinn/Beispiel, nicht pro Lemma — ein mehrdeutiges Lemma erzeugt mehrere Zeilen mit demselben `source_id`.

**`arabic_reconstructed` ist NIE eine unabhängige Bestätigung, nur eine Ableitung unserer eigenen Regel aus Peace Corps' eigener Lautschrift** — bei einem 3-Quellen-Vergleich zählt es nicht als zweite Quelle neben Ninja, sonst täuscht ein systematischer Regelfehler eine "doppelte Bestätigung" vor, die keine ist (siehe PRECEDENTS.md → Peace-Corps-Arabisch-Rekonstruktion). Rekonstruiert wird per `public._pc_reconstruct_arabic(forms_phonetic[1])` aus dem ORIGINAL `forms_phonetic` (nicht aus `forms_chatalpha`!), weil das Original über Groß-/Kleinschreibung Emphase-Laute unterscheidet (H/S/T = ح/ص/ط vs. h/s/t = ه/س/ت), die `forms_chatalpha` bereits verloren hat. Bekannte Restunsicherheit: ض/ظ/ذ fallen im Original alle auf `dh` zusammen (`arabic_reconstruction_note` zeigt das an), außerdem keine Unterscheidung ا/ى bei wortschlussendem Langvokal. 4.874/5.004 Peace-Corps-Zeilen rekonstruiert, 130 bewusst nicht (Fremdwörter/Platzhalter/Transkriptionsfehler statt Rateversuch).

**Nie blind über `translit_skeleton`/`arabic_skeleton` joinen — kurze Skelette (≤3 Konsonanten) kollidieren zufällig** (Präzedenzfall: PRECEDENTS.md → vocab_lookup). `english_key` ist die primäre, zuverlässige Achse; Skeleton-Treffer nur separat markiert und mit `length(...) >= 4` gefiltert.

**Rezept 1 — Trainer-Vokabel verifizieren:**
```sql
WITH target AS (
  SELECT id, darija, arabic_script, english, translit_skeleton, arabic_skeleton
  FROM public.vocabulary WHERE id = ANY(ARRAY[/* vocabulary.id(s) */])
)
SELECT t.id, t.darija AS trainer_darija, t.english, 'bedeutung' AS match_art,
       l.source, l.headword_display, l.source_translit, l.chatalpha, l.example_en
FROM target t JOIN public.vocab_lookup l ON lower(trim(t.english)) = l.english_key
UNION ALL
SELECT t.id, t.darija, t.english, 'nur_lautschrift_unsicher',
       l.source, l.headword_display, l.source_translit, l.chatalpha, l.example_en
FROM target t JOIN public.vocab_lookup l
  ON ((t.arabic_skeleton = l.arabic_skeleton AND length(t.arabic_skeleton) >= 4)
   OR (t.translit_skeleton = l.translit_skeleton AND l.translit_skeleton IS NOT NULL AND length(t.translit_skeleton) >= 4))
  AND lower(trim(t.english)) <> l.english_key
ORDER BY id, match_art, source;
```

**Rezept 2 — neue Vokabel nachschlagen (2a: konkretes Wort) oder Vorschlag holen (2b):**
```sql
-- 2a
SELECT source, headword_display, source_translit, chatalpha, arabic_script, gender, pos, example_en, example_ph
FROM public.vocab_lookup WHERE english_key = lower('<wort>') ORDER BY source;
SELECT id, darija, german FROM public.vocabulary WHERE lower(trim(english)) = lower('<wort>');

-- 2b: kombiniert beide frequenzsortierten Kandidatenlisten
SELECT 'tunico' AS quelle, cat, frequency, lemma_chatalpha, de_gloss
FROM public.tunico_candidates WHERE status='pending' AND auto_verdict='missing' ORDER BY frequency DESC LIMIT 10;
SELECT 'peacecorps' AS quelle, pos, freq AS prioritaet, chatalpha, headword AS gloss
FROM public.peacecorps_candidates WHERE status='pending' AND auto_verdict='missing' AND freq=5 ORDER BY headword LIMIT 10;
```
`peacecorps_candidates` (gleiches Schema wie `tunico_candidates`): aus `peacecorps_dict_import` gespeist, `auto_verdict` per einfachem `english`-Abgleich gegen `vocabulary` vorbelegt — feinere Heuristik (e/i-Fold etc., siehe TUNICO-Abschnitt oben) bisher nicht übernommen.

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
       arabic_script, example_en, example_de, example_ph, audio_url, note
FROM public.vocab_lookup WHERE english_key = lower('<wort>') ORDER BY source;

-- Schritt 2: INSERT mit automatisch berechneten Skeletten
INSERT INTO public.vocabulary
  (english, darija, arabic_script, german, ninja_id, ninja_audio_url, translit_skeleton, arabic_skeleton)
VALUES (
  '<english>',
  '<darija>',                    -- s. Konventions-Warnungen unten
  <arabic_script_oder_NULL>,     -- nur von Ninja übernehmen, sonst NULL lassen
  '<german>',                    -- kein Feld liefert das automatisch, immer von Hand
  <ninja_id_oder_NULL>,
  <ninja_audio_url_oder_NULL>,
  public._translit_skeleton('<darija>'),
  public._arabic_skeleton(<arabic_script_oder_NULL>)
)
RETURNING id, english, darija, arabic_script, german, translit_skeleton, arabic_skeleton;
```

**Konventions-Warnungen vor dem `<darija>`-Wert (nicht automatisierbar, immer von Hand prüfen):**
- **Ninja-`darija`/`source_translit` nie 1:1 übernehmen** — andere Transliterations-Konvention (siehe Ninja-Abschnitt). Besser: Ninjas `arabic_script` (einzige zuverlässig vokalisierte Quelle) nehmen und daraus `darija` nach Hausregeln neu transliterieren (Lautlehre-Regeln, Konsonanten-Gegencheck-SQL siehe oben).
- **TUNICO-`chatalpha` bei Verben ist die Stammform**, nicht die trainer-übliche 3. Pers. Sg. Präsens — passende Flexionsform aus `tunico_corpus_verbs.forms_chatalpha` wählen, nie die Stammform direkt übernehmen (siehe TUNICO-Abschnitt, `_tnGuessVerbForm()`).
- **Peace-Corps-`chatalpha` (`forms_chatalpha[1]`) ist die erste Form laut `forms_roles`** (bei Verben oft Imperativ, nicht Präsens) — bei Verben gegen `forms_roles` prüfen und ggf. die passende Form selbst zur 3.-Pers.-Präsens umbauen, nicht ungeprüft übernehmen.
- **`german` wird von keiner Quelle geliefert** — `senses`/`de_gloss`/`example_de` sind Ausgangsmaterial, keine fertige Übersetzung.

Rezept 4 ersetzt nicht den Pflicht-Duplikat-Check (siehe "Duplikat-Check, alle drei Felder einzeln") — vor dem `INSERT` trotzdem gegenchecken, Rezept 3 nutzen bei ganzen Batches statt Einzelwörtern.
