---
name: tunsi
description: "bei der verbesserung meines vokabel trainers fuer tunesisch"
---

# Tounsi Trainer — Arbeitsregeln

## Schnellzugriff

| Situation | Relevante Abschnitte |
|---|---|
| Neue Vokabel(n) schreiben (egal welche Quelle) | Datenregeln → Transliteration — Pflichtregeln → Topic-Pflichtfeld → Duplikat-Check — Pflichtregeln |
| Neuer Import-Batch abgeschlossen | Duplikat-Check — Pflichtregeln (Nachkontrolle) → Prüfungen nach jedem Import → Kurs-Verknüpfung: vocab_lesson_refs |
| PDF/Foto-Quelle auswerten | Vokabel-Analyse (neue PDFs) → Prüfprotokoll |
| Uni-Wien-Lehrskript-Lektion | Neue Quelle: Uni-Wien-Lehrskripte → Lautlehre-Zusatzregeln → Kurs-Modus |
| Nutzer hat Vokabeln mit 🚩 markiert | Workflow: Geflaggte Vokabeln (🚩) live gegen Derja Ninja prüfen |
| Frischer Batch soll automatisch geprüft werden | Workflow: Frisch importierte Batch-Vokabeln flaggen + verifizieren |
| Code-Änderung an trainer.html | Code-Änderungen |
| Kurs-Modus (course_lessons/course_exercises) | Kurs-Modus: course_lessons / course_exercises → Kurs-Verknüpfung: vocab_lesson_refs |
| Was ist von früher noch unerledigt? | Offene Punkte (direkt unten) |

## Offene Punkte

Unerledigte Altlasten aus früheren Sessions — bei Gelegenheit aufgreifen, nicht Teil der laufenden Regeln:

- **Fälliger Vokalisierungs-Batch vom 2026-07-24** (119 Einträge geprüft, siehe `derja_ninja_import`-Abschnitt): mehrere echte Fehler gefunden, aber noch nicht korrigiert — Maß-I/Maß-II-Verwechslung bei IDs 1142/605/544/844, unvollständige Vokalisierung bei 423/531, ungültige Schadda-Platzierung bei 568/981, strukturelle Transliterations-Abweichungen bei 428/581/588/1223, vorbestehender Tippfehler bei 737. Liste liegt vor, wartet nur noch auf Freigabe zum Schreiben.

## Grundsatz: Nie ohne Bestätigung in Supabase schreiben

Vor jeder Änderung in Supabase (INSERT/UPDATE/DDL, auch ALTER TABLE/Policies) immer erst die geplante Änderung zeigen und auf Bestätigung warten — ausnahmslos. Das gilt auch für:

- Automatisierte/Batch-Änderungen, die durch Musterabgleich "sicher" aussehen (z.B. Massenkorrekturen aus einem Regel-Scan)
- Kleine Korrekturen oder "offensichtliche" Fixes, die im Zuge einer größeren bereits bestätigten Aktion auffallen
- Nebenfunde während einer anderen Aufgabe

Kein Fix wird "mal eben mitgenommen", auch wenn er trivial erscheint — immer erst zur Bestätigung vorlegen.

## Projektwissen-Datei

Die Datei `tounsi_db_YYYY-MM-DD.md` im Projektwissen ist die primäre Datenquelle. Sie enthält:

- **Schema** — Tabellenstruktur und FK-Beziehungen
- **Lessons** — id/lesson_number/title Mapping (für lesson_id Lookups)
- **Users** — Nutzer ohne password_hash
- **Vocabulary** — alle Vokabeln inkl. partner_status/partner_comment

Duplikat-Check läuft immer gegen diese Datei via `project_knowledge_search`. Kein CSV-Upload nötig. (Ablauf/Kriterien siehe "Duplikat-Check — Pflichtregeln" weiter unten — das hier ist nur die Quelle, wenn kein Live-Supabase-Zugriff besteht.)

**Wann die Datei aktualisiert werden sollte:**

- Nach größeren Vokabel-Importen (>20 neue Einträge)
- Nach Änderungen an der Lektionsstruktur (lessons-Tabelle)
- Wenn Duplikat-Checks fehlschlagen oder veraltete Einträge zeigen
- Wenn neue Spalten in Supabase angelegt werden

Wenn neue Supabase-Spalten angelegt werden: Darauf hinweisen, dass der Export-Modus im Trainer (💾 Export → Projektwissen-Export) erweitert werden muss, damit die neuen Spalten in der .md-Datei erscheinen.

Export läuft über: Trainer → 💾 Export → "📦 Daten laden" → `tounsi_db_YYYY-MM-DD.md` herunterladen → ins Projektwissen hochladen, alte Datei ersetzen.

## Vokabel-Analyse (neue PDFs)

Pflicht-Workflow — keine Abkürzungen:

1. **PDF lesen (Text):** pdfplumber auf alle Seiten, inkl. Tabellenextraktion (`extract_tables()`). Seiten nie überspringen.
2. **PDF lesen (visuell):** pdftoppm alle Seiten rasterisieren (150dpi), jede Seite mit `view` öffnen und prüfen — besonders Vokabeltabellen, die der Text-Extraktor verschluckt.
3. **Duplikat-Check** (volles Kriterienset siehe "Duplikat-Check — Pflichtregeln" weiter unten): Jeden Kandidaten einzeln gegen alle Projektwissen-CSVs prüfen — arabic_script, darija und german separat. Quellen können CSVs oder direkt eingegebener Text sein — beides gleich behandeln.
4. **Liste zeigen:** Alle fehlenden Einträge tabellarisch (Arabic, Darija, Deutsch, lesson_id, topic). Auffälligkeiten und Rückfragen gesammelt am Ende — nicht einzeln während der Analyse.
5. **Warten:** Kein SQL ohne Bestätigung.

Wichtig — nicht nur die offizielle Wortschatzliste prüfen. Quellen enthalten oft zusätzliche Wörter und ganze Sätze außerhalb der als "Vokabelliste"/"Wortschatz" markierten Tabelle — in Dialogen, Grammatik-Beispielsätzen, Übungssätzen, Bildunterschriften. Diese müssen genauso vollständig auf neue Vokabeln/Sätze geprüft werden wie die offizielle Liste, mit demselben Duplikat-Check (arabic_script, darija, german einzeln). Nur die formale Wortschatztabelle abzugleichen und den Rest der Seite zu ignorieren zählt nicht als vollständige Auswertung — das gilt für jede Quelle, nicht nur für Lehrbücher.

Ganze Sätze gehören ebenfalls in vocabulary — nicht nur Einzelwörter. Wenn ein Dialog, Beispielsatz oder Übungssatz eigenständig lernwert ist, wird er als eigene Zeile mit topic = "Phrasen" oder "Ausdrücke" (siehe Topic-Liste) aufgenommen, auch wenn die einzelnen enthaltenen Wörter schon vorhanden sind.

## Datenregeln

- Vokabeln leben in Supabase, nicht im HTML
- `arabic_script` ist der primäre Duplikat-Check-Schlüssel
- `arabic_script` immer vokalisiert — wenn Vokalisation sicher, direkt eintragen; wenn unsicher, unvokalisiert lassen und als Rückfrage markieren
- Transliteration: Chat-Alphabet (3=ع, 7=ح, q=ق, sh=ش) — siehe Pflichtregeln unten
- Vergangenheitsformen: Deutsch im Präteritum
- **Präsens-Verben: deutsches Gloss immer als 3. Person Singular ("er steht auf"), NIE als Infinitiv ("aufstehen")** (Regel bestätigt 2026-08-06). Grund: `darija` ist bei Verben ohnehin schon die 3.-Pers.-Sg.-Form (yqum usw.) — der Infinitiv im Deutschen täuscht eine andere Wortart vor und versteckt Duplikate vor dem Duplikat-Check, weil die German-Spalte dann nicht mehr matcht, obwohl arabic_script/darija (bis auf Vokalvarianten) identisch sind. Präzedenzfall: beim Import von Lektion 4–7 wurden ~15 Verben doppelt angelegt, weil alte Einträge "er steht auf"-Stil hatten und die neuen "aufstehen"-Stil — der Duplikat-Check auf der German-Spalte lief dadurch ins Leere, erst ein Konsonantenskelett-Vergleich (Vokale komplett entfernt, nicht nur normalisiert) deckte sie auf.
- Dual-Formen eintragen, Eigennamen/Städte nicht
- `lesson_id` = `lessons.id` (**NICHT** `lesson_number`!). `vocabulary.lesson_id` verweist auf den Primärschlüssel der lessons-Tabelle. Vor jedem INSERT oder UPDATE zuerst via `project_knowledge_search` ("lessons table id") die aktuelle lessons-Tabelle lesen. Zuordnung anhand des title-Feldes bestimmen — z.B. Gesundheitsthemen → Lektion mit title "Körper & Gesundheit". IDs nie hardcoden — immer aktuell nachschlagen. Wenn unklar: Rückfrage.
- `lesson_id` immer explizit prüfen — bei INSERT und UPDATE. Thematisch passende Lektion bevorzugen. Wenn unklar: Rückfrage.

## Transliteration — Pflichtregeln

Diese Regeln gelten für jeden neuen Eintrag. Vor dem SQL-Output immer prüfen.

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
| ض | dh (Emphatikum, eigene Kategorie) | dhayyaq, abyadh | d oder th — siehe Entscheidung 2026-08-06 unten bei "Uni-Wien → Chat-Alphabet" |
| ظ | th | tholl, thabt | – |
| ذ | th | thekkra | dh (bis 2026-08-06 fälschlich, siehe unten) |
| ث | th | thletha, thmenya | – |

Keine Großbuchstaben in darija — weder als Emphase-Marker (H, T, S) noch am Satzanfang. Darija wird durchgehend kleingeschrieben.

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

Hunderter (200–900) werden im Tunesischen als EIN zusammengeschriebenes Wort gebildet, mit der Pluralform مِيَات (myat) statt der Einzahl مْيَة (mya) — analog zur normalen 3-10-Pluralregel bei Zählwörtern. Beleg von Derja Ninja: "three hundred" = ثْلَاثَمْيَاتْ (thlathamyat), nicht "thlatha mya" getrennt.

| Falsch (getrennt, Singular) | Richtig (ein Wort, Plural) |
|---|---|
| khamsa mya | khamsmyat |
| thlatha mya | thlathamyat |

Gilt für alle Hunderter-Komposita 200–900, nicht nur für den Präzedenzfall khamsmyat (ID 3820, korrigiert am 2026-08-01).

### Lehnwörter (Ausnahme — Originalschreibung behalten)

Französische und internationale Lehnwörter behalten ihre Originalschreibung: guichet, sacoche, chauffeur, chapeau, sandwich, marche, piscine, chambriz u.ä.

### Artikel-Assimilation

Sonnenlettern werden assimiliert: es-sebt, esh-shatt, et-tbib, eth-thnin — nicht el-sebt, el-shatt usw.

**Sonderfall j:** Im Standard-Hocharabisch ist ج kein Sonnenbuchstabe, im tunesischen Dialekt aber schon — Artikel wird immer assimiliert (ej-jar, nicht el-jar; von Semia bestätigt, z.B. immer "ej-Jzayer" für Algerien, nie "el-"). Das gilt nur für die Transliteration — `arabic_script` bekommt dabei kein Shadda auf ج, da ج in der arabischen Standard-Orthographie kein Sonnenbuchstabe ist und die Schrift der klassischen Konvention folgt, auch wenn die Aussprache abweicht.

## Topic-Pflichtfeld

Jeder INSERT muss ein `topic` enthalten — niemals weglassen oder null lassen. Das Topic steuert die Lernpriorisierung im Aktivierungsmodus (Prio 1 = sofort vorschlagen).

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

**Topic ist unkritisch, im Zweifel selbst entscheiden.** Anders als bei `lesson_id` (dort immer Rückfrage bei Unklarheit) darf Claude bei `topic` selbst das plausibelste Topic aus der Liste wählen und direkt setzen, ohne vorher nachzufragen — Nils kann es jederzeit leicht selbst ändern, eine falsche Zuordnung ist kein ernsthafter Schaden. Kurz begründen, welches Topic warum gewählt wurde, aber nicht als offene Frage stehen lassen.

## Verben

- Verben immer als separate Einträge je Form: Vergangenheit (er ...te), Präsens (er ...) UND Imperativ (...!) — nie kombiniert mit Schrägstrich/Komma/Semikolon in einer Zeile
- Verbformen maskulin singular: Vergangenheit = Wurzelform (فَعَل), Präsens = يِ/يُ-Form
- `topic=Verben-Konjugation` für alle Präsens-Verbformen — Lektion mit title "Verben — Präsens"
- Einträge mit Schrägstrich-Muster „imperativ / yXXX" sofort aufteilen
- **Imperativ+Vergangenheit-Bündelung ist ein wiederkehrender, eigener Fehlerfall** (nicht nur Imperativ+Präsens): mehrfacher Präzedenzfall 2026-08-06 (`ejbed`/`jbed`, `sakkar`, `naqqaz`, `lawwej` — alle als eine Zeile "Imperativ! / er tat" angelegt, nachträglich in zwei Zeilen aufgeteilt). Da Imperativ und Vergangenheit bei manchen Verbmustern gleich geschrieben werden (z.B. `sakkar`/`sakkar`), beide Zeilen dann mit `homonym_ok=true` markieren, damit der Duplikat-Check sie nicht fälschlich meldet.

## Duplikat-Check — Pflichtregeln

Jede neue Vokabel gegen alle drei Felder einzeln prüfen — **niemals nur eins davon**. Deutsch-Text-Suche allein reicht nicht: Präzedenzfall yibda (Lektion 6) — Suche nach "anfangen" fand nichts, weil der bestehende Eintrag mit "er beginnt" glossiert war; erst eine zusätzliche Suche nach der (korrekt konvertierten) Zieltransliteration "yibda" hätte den exakten Treffer sofort gezeigt. Immer beides parallel prüfen: deutscher Wortlaut UND Ziel-Darija/arabic_script.

- **arabic_script:** Kollision möglich bei unvokalisierten Formen (z.B. سكر = Zucker UND schließen). Vokalisation hilft, reicht aber nicht immer — Bedeutung als Tiebreaker.
- **darija:** Homographen beachten (z.B. 7allit = sie öffnete / ich öffnete). Konjugationspaare (sie/ich) haben oft identische Transliteration — kein Duplikat, aber german-Feld muss Person klar benennen.
- **german:** Für jeden Kandidaten den deutschen Begriff als eigenständige Suchanfrage stellen — nicht nur eingebettet mit arabischen Begriffen. Synonyme beachten: „einfach" kann bereits als „leicht" vorhanden sein, „Lied" als „Gesang", „Darlehen" als „Kredit". Wenn ein semantisch naher Begriff gefunden wird, als Auffälligkeit markieren und Entscheidung dem Nutzer überlassen.

**Bei strukturierten Listen (Adjektiv-Tabellen, Verb-Konjugationstabellen) zuerst ein Themen-Sweep, nicht Wort für Wort.** Vor der Einzelprüfung einmal breit gegen das passende `topic` filtern (z.B. `topic='Adjektive'`) und den kompletten Bestand dieser Kategorie durchsehen. Präzedenzfall Lektion 6: 28 von 33 Adjektiven waren schon vorhanden (aus einem früheren Batch) — ein einziger Sweep zeigte das sofort, statt es bei 30 Einzelchecks erst nach und nach zu entdecken.

**Singular/Plural (und ähnliche kombinierte Formen wie m./f.) IMMER als separate vocabulary-Zeilen anlegen, nie als ein Eintrag „sg / pl" mit Schrägstrich.** Präzedenzfall 2026-08-06 (Lektion 5): 6 Wörter als "wort / wortplural" in einem Feld importiert (z.B. `3utshan / 3utshanin`, `yidd / idin`) — der Duplikat-Check normalisiert den ganzen String inkl. Schrägstrich zu einem einzigen Key, wodurch ein bereits bestehender Singular-Eintrag (z.B. `3otshen`, andere Vokalschreibung) NICHT als Duplikat erkannt wurde, weil der bestehende Eintrag nur den nackten Singular ohne "/pl" enthielt. Erst eine Vokal-Varianten-bewusste Nachkontrolle deckte das auf. Bei getrennten Zeilen (Singular eigener Key, Plural eigener Key) hätte der normale Duplikat-Check den Singular sofort gefunden. Gilt für jede "X / Y"-Schreibweise aus den Uni-Wien-Wortschatztabellen (dort so formatiert, aber nicht 1:1 in die DB übernehmen).

**Im `german`-Feld: „/" NUR für echte Synonyme/alternative Formulierungen derselben Bedeutung, sonst „;".** Grund: `checkAnswer()` (trainer.html, Zeile ~440) macht `answer.split(/\s*\/\s*/)` und akzeptiert JEDE der Teile als richtige Antwort. Bei echten Synonymen ist das gewollt (z.B. „Kellner / Ober" — beides korrekt). Werden mit „/" aber tatsächlich unterschiedliche Bedeutungen zusammengefasst (z.B. „er flog / er rasierte (MSA)" — zwei verschiedene Verben), akzeptiert die Prüfung fälschlich eine falsche Übersetzung als richtig. Semikolon `;` wird von `checkAnswer()` NICHT speziell behandelt (bleibt Teil der einen Antwort) und ist daher der richtige Trenner für „mehrere unterschiedliche Bedeutungen in einem Feld". Präzedenzfall 2026-08-06: Vollsweep über alle 809 `german`-Felder mit „/" ergab 108 echte Bedeutungs-Kollisionen (u.a. Richtungspaare wie „rechts/links", Personen-Mischungen wie „ich kam / du kamst", eigenständige Wortbedeutungen wie „Tür / Tor") → auf „;" umgestellt; zusätzlich 12 Fälle, in denen „/" nur innerhalb einer Klammer-Erläuterung stand (z.B. „letzte/r/s (vergangen)", „Waage (Markt / Küche)") und dadurch in Wortmüll zerlegt wurde → dort „/" ganz durch Komma/„oder" ersetzt. Bei der Gelegenheit fielen außerdem 3 weitere Imperativ/Vergangenheit-Vermischungen in einer Zeile auf (`sakkar`, `naqqaz`, `lawwej` — gleiches Muster wie `ejbed/jbed`) und wurden nach demselben Muster in zwei Zeilen aufgeteilt (`homonym_ok=true`, da gleiche Schreibweise).

**Richtiges Testkriterium für „/" vs. „;": nicht „sehen die zwei Formulierungen unterschiedlich aus", sondern „wäre bei einer isolierten Quiz-Abfrage dieses einen Worts JEDE der beiden Antworten korrekt".** Fehlklassifikation 2026-08-06 (direkt danach entdeckt): `ahuwa` wurde mit „hier ist er, da ist er" angelegt (Komma) und `shbik` mit „was hast du?; warum?" (Semikolon) — beides falsch. Bei Zeigewörtern (`ahuwa` = "hier/da ist er", ohne Kontext nicht unterscheidbar) und mehrdeutigen Frage-/Interjektionspartikeln (`shbik` = "was hast du?" UND "warum?" sind beides genuin gültige Übersetzungen desselben Wortgebrauchs, nicht kontextabhängig exklusiv) ist NICHT eine einzige Übersetzung "die richtige" — beide Antworten sollten von `checkAnswer()` akzeptiert werden, also „/" statt „;"/",". Der „er flog / er rasierte"-Fall bleibt der Gegenbeweis: da wäre "er flog" bei einer Abfrage von "er rasierte (MSA)" eine klar falsche Antwort. Vor jeder „;"-Entscheidung testen: „Würde ich als Lehrer BEIDE Antworten als richtig durchgehen lassen, wenn nur dieses eine Wort abgefragt wird?" — wenn ja, „/".

**Nachprüf-Runde 2026-08-06 (104 der 108 „;"-Umstellungen erneut geprüft, mit dem obigen Kriterium):** Ergebnis 82 zurück auf „/" (echte kontextfreie Mehrdeutigkeit — u.a. auch eine Klasse, die vorher übersehen wurde: **grammatische Homophonie**. Im tunesischen Dialekt sind Präsens „du"/„sie" (beide t-Präfix) und Vergangenheit 1./2. Person Singular (beide -t-Suffix, z.B. `ktibt` = sowohl „ich schrieb" als auch „du schriebst") in der Wortform tatsächlich identisch — kein Datenfehler, sondern echte dialektale Ambiguität, also „/" korrekt), 7 als Zeilen-Split erkannt (nicht nur Trenner-Wechsel!) und 1 explizit NICHT umgestellt (`7add` = „jemand; niemand (in Verneinung)" — bleibt „;", weil die „niemand"-Lesart laut eigenem Klammerzusatz nur im negierten Satz gilt, nicht bei isolierter Abfrage des bloßen Worts — genau der Fall, den die Regel eigentlich ausschließen soll).

Die 7 Splits zeigten ein wiederkehrendes Muster: **wenn `arabic_script` selbst schon zwei Formen mit „/" bündelt (z.B. `خَلَّات / خَلِّيت`), aber `darija`/`german` nur EINE Form zeigen, ist das kein Bündelungs-Judgment-Call mehr, sondern ein klarer Fall für zwei Zeilen** — die Arbeit war ja schon zur Hälfte gemacht, nur nicht zu Ende geführt. Betraf: `khallit`/`hazzit`/`7attit` (Vergangenheit sie/ich, unterschiedliche Endung -at/-it bereits im Skript sichtbar) sowie 4 Fahr-Kurzbefehle (`zid`/`naqqes`, `dour rechts`/`links`, `etla3 vorne`/`hinten`, `habbat`/`talla3`) — letztere waren fälschlich beim „46 Slash-Einträge"-Triage (siehe oben, Pflichtregel Singular/Plural) als „bewusst kombinierte Gegensatzpaare" eingestuft und stehengelassen worden; das war ein Fehler, der erst durch `checkAnswer()`s Mechanik auffiel (dieselbe Regel gilt auch für Gegensatzpaare wie für Personen-Paare: „zid" als Antwort auf „schalte runter" wäre über `checkAnswer()` fälschlich als richtig akzeptiert worden).

**Dritte Runde 2026-08-06: vorbestehende „;"-Einträge, die nie Teil des 108er-Sweeps waren.** Der Sweep hatte nur Felder erfasst, die vorher „/" enthielten — Einträge, die schon *immer* mit „;" geschrieben waren (unabhängig vom Sweep, teils schon vor dieser Session), wurden nie mit dem Kriterium geprüft. Auffällig geworden durch Nutzer-Fund `banu` (Bad/Badewanne/große Plastikschüssel — genuine Mehrdeutigkeit, war fälschlich „;"). Bei der Nachprüfung der übrigen ~36 Fälle zusätzlich entdeckt: **zwei Fälle, wo „;" zwei Infinitiv-Glosses statt korrekter 3.-Pers.-Sg.-Form trennte** (`yqoum`="er steht auf; aufstehen", `ya7ki`="erzählen; sprechen") — das ist kein „/"-vs.-„;"-Fall, sondern ein Verstoß gegen die Pflichtregel oben (Präsens-Verben-Gloss). Bei diesen zuerst den Infinitiv-Rest korrigieren/entfernen, erst danach über den Trenner entscheiden. Bei `yikri`="er mietet; er vermietet" (Miete geben vs. nehmen, Gegenrichtungen) keine widersprechende Quelle gefunden (keine separate „vermieten"-Vokabel im Bestand, Wurzel ist für beide Richtungen belegt) — auf „/" gestellt, aber mit geringerer Sicherheit als der Rest; bei weiterem Gegenbeleg nochmal prüfen. Konsequenz für künftige Batches: **der „;"-Check darf sich nicht auf neu hinzugekommene „/"-Felder beschränken — regelmäßig den kompletten `german LIKE '%;%'`-Bestand mit dem Kriterium gegenchecken, nicht nur den Diff seit dem letzten Sweep.**

**Nach dem Schreiben: App-eigene Duplikat-Prüfung als Nachkontrolle nutzen.** Der Trainer hat einen eigenen "🔍 Duplikat-Prüfung"-Tab (exakter Volltextabgleich über arabic_script/Transliteration/german, gruppiert mit Lernstand-Anzeige). Das ist gründlicher als eigene Ad-hoc-SQL-Stichproben vorher — Präzedenzfall 2026-08-02: 6 echte Duplikate aus einem eigenen Import-Batch (Lektion 5 + 6) wurden erst dort sichtbar, vorher unentdeckt. Nils nach jedem größeren Batch bitten, kurz dort nachzuschauen, oder wenn er das Ergebnis postet, direkt draus arbeiten.

**Diesen Check bei Live-Supabase-Zugriff selbst nachbauen, statt auf Nils' UI-Screenshot zu warten.** Der Tab ist reiner Client-Code (`showDupeCheck()` + `normKey()` in trainer.html) — exakt dieselbe Normalisierung (lowercase, Satzzeichen/Whitespace entfernt) lässt sich 1:1 in SQL nachbauen und direkt gegen Supabase laufen lassen, unmittelbar nach jedem Import-Batch, ohne dass Nils die App öffnen muss:

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

Am 2026-08-05 live verifiziert: Ergebnis deckte sich exakt mit dem, was der UI-Tab vorher gezeigt hatte.

**Standard-Vorgehen bei gefundenem Duplikat nach dem Schreiben:**
1. Den älteren/bereits gelernten Eintrag behalten (erkennbar an Lernfortschritt/Lvl>0), den neuen löschen — CASCADE räumt automatisch dessen progress-/review-Zeilen mit auf (siehe FK-Konfiguration weiter unten)
2. Falls die neue Quelle eine zusätzliche Bedeutungsnuance liefert, die der alte Eintrag nicht abdeckt: vor dem Löschen die `german`-Spalte des bestehenden Eintrags um diese Nuance ergänzen, nicht die Information verwerfen
3. Falls der gelöschte Eintrag in einem `course_lessons.vocab_lesson_refs` verlinkt war: die ID dort chirurgisch per `replace()` durch die ID des behaltenen Eintrags ersetzen (in beiden Teilen, `ids:` und `darija:`), nicht den ganzen String neu aufbauen
4. **Bevor eine bessere/vokalisierte Schreibweise vom gelöschten Eintrag übernommen wird: gegen eine bereits verifizierte Geschwisterform derselben Wurzel gegenchecken (z.B. die Vergangenheitsform, falls Ninja-verlinkt), nicht einfach "vokalisiert sieht vertrauenswürdiger aus" annehmen.** Präzedenzfall 2026-08-06: Beim Merge von `yeb3ath`/`yib3at` ("er schickt") wurde die Schreibweise des gelöschten (neueren, vokalisierten) Duplikats übernommen — `يِبْعَت` (endet auf ت) statt der korrekten `يِبْعَث` (endet auf ث, Wurzel ب-ع-ث). Der Fehler steckte schon im gelöschten Duplikat selbst und wurde beim Merge unkritisch mitgenommen, obwohl die bereits Ninja-verifizierte Vergangenheitsform derselben Wurzel (`b3ath`/بعث, ID 642) den Fehler sofort widerlegt hätte. "Neuer/vokalisiert" heißt nicht "automatisch korrekt".

**Fallen:**

- Substring-Falle: ein Wort das in einer Phrase vorkommt ist kein Duplikat des Einzelworts
- Vokalisierte vs. unvokalisierte Form desselben Eintrags: arabic_script als Primärschlüssel, Bedeutung als Tiebreaker
- Konjugationsformen (sie/ich) mit identischer Transliteration: akzeptieren, aber german-Feld muss Person eindeutig benennen
- Einträge mit Schrägstrich-Muster „xyz / yxyz": immer aufteilen in Vergangenheit + Präsens
- Transliterations-Falle bei ض/ظ/ذ/ث: Diese Buchstaben werden im CSV inkonsistent romanisiert (dh, th, z, d). Bei Kandidaten mit diesen Buchstaben immer zusätzlich das arabic_script direkt suchen — nicht nur die Transliteration.
- Quote-verankerte Suchmuster liefern Fehlalarme. Ein Muster wie `"Wort"` (Anführungszeichen direkt nach dem Wort) matcht nicht, wenn im Feld mehr Text steht als das gesuchte Wort allein (z.B. gesucht "Sohn", in der DB steht "Sohn (Singular)" — kein Treffer, obwohl das Wort da ist). Immer unverankert/als Substring suchen, nie auf ein exaktes Zeilenende hoffen.
- Transliterations-Rateversuche bei wissenschaftlichen Quellen (z.B. Uni Wien) sind unzuverlässig. Deren Umschrift (z.B. yḥibb) weicht oft in den Vokalen von der tatsächlichen DB-Schreibweise (y7eb) ab. Primär über die deutsche Bedeutung suchen, nicht über die geratene Transliteration — sonst meldet der Check fälschlich "neu", obwohl das Wort längst existiert.
- **Vokal-Varianten-Falle:** Reine Substring-/Präfix-Suche auf die exakte geplante Transliteration fängt Vokalvarianten desselben Worts nicht ab (z.B. `ghurbal` vs. bestehendem `ghorbel`, `ghnaya` vs. bestehendem `ghneya` — a↔o, a↔e). Präzedenzfall 2026-08-05: zwei eigene Neuanlagen trotz vorherigem Duplikat-Check, erst vom App-eigenen Check gefunden. Bei Wörtern mit a/e/i/o-Unsicherheit (siehe Lautlehre-Regel 1, Imala) zusätzlich zur geplanten Schreibweise mindestens eine plausible Vokal-Variante mitsuchen, oder direkt den SQL-Selbst-Check (siehe unten) nach dem Schreiben laufen lassen statt nur vorher zu suchen.
- **Nicht nur die Transliteration kann falsch sein — manchmal ist das `arabic_script` selbst fehlerhaft.** Bei zwei Duplikat-Kandidaten mit unterschiedlichem `arabic_script` nicht automatisch annehmen, dass es sich um zwei echte Varianten handelt oder dass die Transliteration der Fehler ist. Präzedenzfall 2026-08-06: 3 Einträge rund um die Wurzel „sbah/Morgen" hatten ض statt ص im arabic_script (bestätigt durch den eigenen deutschen Gloss, der z.B. explizit „Kurzform von صباح الخير" nannte — das Wort selbst widersprach seiner eigenen Buchstabenwahl). Vor jeder Korrektur an `arabic_script`: die Bedeutung/Etymologie des Wortes selbst als Beleg heranziehen (eigener Gloss, verwandte Bestandswörter, Sprichwort-Kontext), nicht raten — und wie immer erst zur Bestätigung vorlegen, nie „direkt ändern" (ausdrücklicher Nutzerwunsch).
- **Bei echter Buchstaben-Identitäts-Unsicherheit (z.B. ط vs. ث, ض vs. ظ) Derja Ninja als Tiebreaker nutzen**, nicht raten oder nur der akademischen Quellen-Umschrift vertrauen. Präzedenzfall 2026-08-06: „Weg/Straße" (`tniya`) war mit ط transkribiert (nach der Emphatika-Markierung der akademischen Quelle), aber sowohl bestehende Bestandseinträge als auch `derja_ninja_import` (Treffer für „way, path" → ثْنِيَّة) bestätigten ث. Ripple-Effekt nicht vergessen: eine falsche Emphatika-Annahme kann auch die Artikel-Assimilation verfälschen (ط ist kein Sonnenbuchstabe, ث schon — betraf hier zusätzlich `f-it-tniya`→`f-eth-thniya` im bereits geschriebenen Lektionstext).

## Prüfungen nach jedem Import — Pflicht, unaufgefordert (seit 2026-08-06)

Nils muss nicht mehr danach fragen: **nach jedem Vokabel-Import-Batch (INSERT/UPDATE) sowohl den Duplikat-Check als auch den Transliterations-Check selbst laufen lassen**, bevor der Batch als abgeschlossen gemeldet wird. Beide Checks existieren im Trainer als UI-Tabs ("🔍 Prüfungen" → Duplikate / Transliteration), lassen sich aber 1:1 als SQL gegen Supabase nachbauen (siehe Duplikat-SQL oben). Gefundene Treffer nicht automatisch schreiben — wie immer erst Vorschlag zeigen, Bestätigung abwarten, dann fixen.

**Transliterations-Check — konsolidiertes SQL (Stand 2026-08-06, `TRANSLIT_RULES` in trainer.html):**

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
UNION ALL SELECT id, arabic_script, darija, 'dhad' FROM vocabulary WHERE arabic_script ~ 'ض' AND darija !~* 'dh';

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

**Wichtig — Postgres-Regex-Falle:** Wortgrenze ist `\y`, NICHT `\b` (das ist in Postgres ein Backspace-Zeichen, matcht lautlos nichts). Zweimal in dieser Session selbst reingelaufen (einmal JS-seitig mit `\y` in trainer.html, einmal SQL-seitig mit `\b`) — bei jedem neuen Regex mit Wortgrenzen einmal kurz gegen ein Testwort verifizieren, bevor auf das Ergebnis (0 Treffer) vertraut wird.

**Zusätzlicher Check nach größeren Batches: Konsonanten-Skelett-Vergleich neu vs. alt (findet Vokalvarianten-Duplikate, die der normale Duplikat-Check übersieht).** Der App-eigene `normKey()` (und das SQL-Äquivalent oben) normalisiert nur Groß/Klein­schreibung und Satzzeichen, entfernt aber keine Vokale — `yqoum` (alt) und `yqum` (neu) matchen dort NICHT, obwohl dasselbe Wort. Bei Lektion 4–7 wurden dadurch ~15 Vokabeln (v.a. Verben) doppelt angelegt. Nach jedem größeren Batch zusätzlich mit komplett vokal-freiem Skelett gegenchecken, eingeschränkt auf dieselbe `lesson_id` (sonst zu viele Zufallstreffer durch unterschiedliche Wörter mit ähnlichem Konsonantenskelett):
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
Jeden Treffer einzeln prüfen — echte Duplikate (gleiche Bedeutung, nur andere Vokalschreibung) von Zufallskollisionen unterscheiden (z.B. `yaqli`="braten" vs. `yqul`="sagen" kollidieren zufällig auf demselben Konsonantenskelett `yql`, sind aber komplett verschiedene Wörter — nicht blind mergen).

**Bekannte Fehlalarm-Fallen bei diesen Checks (nicht blind fixen):**
- Französische/italienische Lehnwörter (chapeau, sacoche, gazouz, grinta, ...) — Konvention: im `german`-Feld `(frz.)`/`(ital.)`/`(engl.)`/`(Lehnwort)` ergänzen statt Transliteration zu erzwingen, dann greift die Ausnahme automatisch
- غ kann dialektal zu "g" verschoben sein (ngammed, bargouth) — kein Fehler, Regel akzeptiert das bereits
- ق kann dialektal zu "g"/"k" verschoben sein (bgar, maktou3) — Regel akzeptiert das bereits
- Eigennamen/etablierte Lehnwörter (Mohamed, Hammam) — hier hat Nils sich für "7 immer" entschieden (2026-08-06), also konsequent transliterieren statt Ausnahme
- "إن شاء الله"/"الله" (Allah, feste Wendungen) verzerren den Wortanzahl-Check und den Artikel-Check — beide Regeln schließen das bereits aus (Diakritika beim Filtern entfernen, `اللَّه` ≠ literal `الله` sonst)
- Kontrahierte Artikelformen nach vokal-endender Präposition (`3al-kar` = `3ala` + `el-kar`, `fis-sma` = `fi` + `es-sma`) sind korrekt, keine Bugs

**Neue Checks aus Kurs-Grammatiknotizen ableiten — wiederkehrende Praxis, nicht einmalig (Methode seit 2026-08-06).** Die `grammar_notes`-Felder in `course_lessons` enthalten viele Regeln — nicht alle taugen als automatischer Check. Kriterium: nur Regeln aufnehmen, die rein aus `darija`/`german`/`arabic_script` ableitbar sind, OHNE Wortart-Wissen (POS) oder Kontext zu brauchen — genau wie die Sonnenbuchstaben-Regel. Diese Ableitung sollte bei jeder neuen/überarbeiteten Lektion erneut versucht werden, nicht nur einmalig für L1-L7: neue `grammar_notes` können neue Kandidatenregeln liefern. **Immer erst gegen den Bestand testen (Fehlalarmquote prüfen) und das Ergebnis zeigen, bevor eine Regel dauerhaft in `TRANSLIT_RULES` (trainer.html) übernommen wird** — siehe die zwei verworfenen Kandidaten unten als Warnung, wie plausibel aussehende Regeln trotzdem an Dialekt-Realität (Vokalsynkope, Tempus-Homophonie) scheitern können. 4 Kandidaten bisher getestet, 2 bestanden, 2 verworfen:
- ✅ **Unmarkierte Feminina** (L6 liefert die Ausnahmeliste direkt: ukht, umm, bint, saq, yidd, 3in, wdin, farmasi, kar, tunis, mistir, susa, kirsh, shams, nar, dar, bit, blad) — nur 2 Fehlalarme beim Testlauf (Demonstrativpronomen `hethi`, unregelmäßiges Adjektiv `shah`/`shih`/`shihin` mit Vokal-Ablaut statt Suffix), beide zur Ausnahmeliste hinzugefügt.
- ✅ **"und" = immer "w-"** (aus L1) — 3 Treffer, 2 echte Bugs gefixt (`wa 3alaykom`→`w-3alaykom`, `wa qaddesh`→`w-qaddesh`, letzteres sogar im arabic_script als direkt angehängt `وَقَدَّاش` erkennbar), 1 Ausnahme (feste MSA-Grußformel `ahla wa sahla`, wird im ganzen arabischen Sprachraum unverändert übernommen).
- ❌ **Verb-Personalpräfix** (y-/t-/n- je nach Person, aus L2) verworfen: `lesson_id=46`/Topic "Verben-Konjugation" mischt Präsens UND Vergangenheit (keine verlässliche Tempus-Unterscheidung per SQL, da starke deutsche Verben im Präteritum ebenfalls auf "-t" enden können, z.B. "er riet"); zusätzlich kollidiert der "t-"-Präfix systematisch mit dem stamm-eigenen t der Maßstämme V/VI (tfa33al-Muster); Verlaufsform-Konstruktionen (`qa3ed ybarbesh`) und die negierten Pronomen (`houa mahoush` usw., eigene geschlossene Wortklasse) erzeugen weitere Fehlalarme. Alle 17 Testtreffer waren falsch positiv.
- ❌ **m/f-Adjektivpaare = masc+"a"** verworfen: Tunesisch synkopiert den Stammvokal regelmäßig vor der Femininendung (`ak7al→ka7la`, nicht `ak7ala` — dieselbe Regel wie `tounis+i→tounsi` aus L1), d.h. die naive "masc+a"-Regel widerspricht der eigentlichen Dialektregel. 28 von 28 Testtreffern falsch positiv. Der eigentlich wertvolle Teil (Femininform endet auf -a) wird vom "Unmarkierte Feminina"-Check oben ohnehin schon abgedeckt.

## Abgleich mit Derja Ninja

Derja Ninja (derjaguru.com/derjaninja.com) ist eine tunesische Online-Wörterbuchdatenbank mit vokalisierten arabischen Einträgen. Die arabische Schreibweise dort ist in der Regel zuverlässiger vokalisiert als bestehende Trainer-Einträge.

Seit 2026-07-24 gibt es einen vollständigen Offline-Dump als Supabase-Tabelle `derja_ninja_import` — für Bestandsaudits und systematischen Abgleich ist das der bevorzugte Weg (siehe eigener Abschnitt weiter unten "Neue Datenquelle: derja_ninja_import"), statt einzelne Wörter manuell im Web nachzuschlagen oder den Nutzer um Copy-Paste zu bitten.

### Regel: arabic_script aus Derja Ninja bevorzugen

Wenn ein Eintrag aus Derja Ninja kommt (oder damit abgeglichen wird) und die Vokalisation vom Trainer-Eintrag abweicht:

- `arabic_script` aus Derja Ninja übernehmen — auch wenn es nur kleine Abweichungen sind (fehlende Diakritikas, andere Vokalisierung)
- `darija` danach prüfen — ob sie noch zur neuen arabic_script-Form passt; ggf. anpassen
- `german`-Feld prüfen — ob ein Herkunftshinweis sinnvoll ist, z.B.:
  - (MSA) für Hocharabisch-Lehnwörter die in Tunesien verstanden werden
  - (Darija) für die umgangssprachliche Variante
  - (frz.) für französische Lehnwörter
  - Hinweis nur ergänzen wenn er echten Mehrwert hat — nicht pauschal
- `lesson_id` prüfen — ob der Eintrag zur richtigen Lektion gehört. Häufige Fehlerquellen:
  - Einträge mit falscher lesson_id die thematisch zu einer anderen Lektion gehören
  - Einträge ohne lesson_id oder mit Platzhalter-lesson_id
  - Wenn der richtige lesson_id-Wert unklar ist: als Rückfrage markieren, nicht raten

### Was nicht automatisch geändert wird

- Wenn der Trainer-Eintrag bereits korrekt vokalisiert ist und Derja Ninja nur eine orthographische Variante zeigt (kein Fehler, nur anders) → keine Änderung ohne Rückfrage
- Wenn Derja Ninja eine andere Bedeutung listet → als Auffälligkeit markieren, Entscheidung dem Nutzer überlassen
- Transliteration (darija) wird nicht aus Derja Ninja übernommen — Derja Ninja verwendet andere Konventionen; unsere Chat-Alphabet-Regeln gelten weiterhin

### Workflow beim Derja Ninja-Abgleich

1. Für jeden Kandidaten: vorhandenen Trainer-Eintrag via `project_knowledge_search` suchen
2. Abweichungen in arabic_script dokumentieren (Trainer-Form → Derja Ninja-Form)
3. lesson_id prüfen — passt der Eintrag thematisch zur Lektion? Ggf. korrigieren
4. UPDATE-Statements für arabic_script + ggf. darija + ggf. german + ggf. lesson_id generieren
5. Neue Einträge (⚠️ fehlt) als INSERT generieren — lesson_id immer explizit prüfen und begründen
6. Alles gesammelt im SQL-Block ausgeben — kein SQL ohne Bestätigung

## Workflow: Geflaggte Vokabeln (🚩) live gegen Derja Ninja prüfen

Wenn Nils im Trainer Vokabeln mit 🚩 markiert ("als fehlerhaft markieren"), ist das der Auftrag an Claude, sie zu recherchieren und Korrekturvorschläge in `vocabulary_review` einzutragen — die eigentliche Recherche läuft außerhalb der App, der Ninja-Check-Tab im Trainer ist nur für die menschliche Freigabe/Ablehnung (siehe Code-Kommentar in trainer.html bei `showNinjaCheckQueue`). Kein automatisches UPDATE direkt auf vocabulary — immer über vocabulary_review, außer der Eintrag ist zweifelsfrei bereits korrekt (siehe Schritt 6).

Auslöser: "Ich habe Vokabeln markiert" / "flagged/markiert" o.ä. → `SELECT * FROM vocabulary WHERE flagged = true` als erster Schritt.

**Sofort danach, für den ganzen Batch auf einmal:** `SELECT * FROM vocabulary_review WHERE vocabulary_id IN (<alle IDs>)` — der Konflikt-Check (siehe Schritt 5) läuft als EINE Sammelabfrage direkt am Anfang, bevor überhaupt ein Korrekturplan gebaut wird. Nicht erst kurz vorm Schreiben einzeln nachschauen — sonst muss ein bereits fertiger Plan nachträglich umgebaut werden, wenn sich Konflikte erst spät zeigen (Präzedenzfall: 55er-Batch vom 2026-08-01, 3 von 55 IDs hatten bestehende Zeilen, erst beim Schreiben entdeckt).

### Ablauf pro geflaggter Vokabel

1. **Offline-Dump zuerst:** gegen `derja_ninja_import` prüfen (siehe Abschnitt "Neue Datenquelle: derja_ninja_import" oben) — schnell, aber der Dump ist ein Snapshot vom 2026-07-24 und kann inzwischen unvollständig sein (v.a. bei mehrteiligen Begriffen wie "police station" oder Redewendungen).
2. **Live-Check, wenn der Dump nichts liefert:** derja.ninja hat einen normalen serverseitig gerenderten Such-Endpunkt (live per curl verifiziert am 2026-08-01, kein JS/Browser-Rendering nötig — reines HTTP GET liefert die vollständige Ergebnisliste). Endpunkt: `GET https://derja.ninja/search?search=<begriff>&script=<english|transliterated|arabic>` — Pfad ist `/search` ohne trailing slash (`/search/` liefert 404), Parameter heißt `search` (nicht `q` oder `query`).

   - `script=english` für deutsche/englische Suchbegriffe (deutschen Begriff vorher ins Englische übersetzen)
   - `script=arabic` um direkt nach einer arabischen Schreibung zu suchen (z.B. wenn nur das Wort selbst, aber keine Übersetzung bekannt ist)
   - `script=transliterated` für eine Suche in lateinischer Umschrift (dritter Wert, bisher hier nicht dokumentiert)
   - Kein Treffer liefert sauber den Text "No results" zurück (kein Redirect, kein Fehlerstatus) — echte Wörterbuchlücken kommen vor, das ist kein Bug.
   - Jeder Treffer hat einen Block `<div class="search-result__term_in_arabic">` (Bindestrich zwischen "search" und "result") — darin: `<audio src="https://static.derjaninja.com/recordings/NNNN.mp3">` und `<span class="transliterate-text">` (Ninjas eigene Transliteration). Der nachfolgende Beispielsatz-Block heißt `search_result__example_sentence_in_arabic` — mit UNTERSTRICH statt Bindestrich zwischen "search" und "result" (Inkonsistenz auf der Seite selbst, kein Tippfehler unsererseits — wichtig für CSS-Selektoren/Scraper mit Präfix-Matching).
   - **Wichtiger technischer Fund (2026-08-01):** Wort-Audio und Beispielsatz-Audio zeigen in der Mehrzahl der Fälle auf DIESELBE mp3-Datei (identische src-URL in term- und sentence-Block). Es ist eine einzige Aufnahme mit Wort UND Satz zusammen; die Trennung passiert nur clientseitig per JSON-Zeitstempel (`<script type="application/json">` mit `{"term":{"start":...,"end":...},"sentence":{"start":...,"end":...}}`, referenziert über `data-region-name="term"/"sentence"` am umgebenden `<span class="js-play">`). Per curl/serverseitig bekommt man ohne diesen Trim oft die VOLLE Aufnahme inkl. Satz. Betroffene Bestandsfälle, bereits gefunden: Vokabel 522 ("Postkarte", bewusst mit Satz-Audio dokumentiert im change_reason), IDs 15059 ("post office") und 15104 ("stamp") als live_lookup-Einträge ohne Prüfung Wort- vs. Satz-Audio angelegt. Keine vollständige ID-Liste bekannt — sollte bei Gelegenheit systematisch auditiert werden (Heuristik-Vorschlag: Audio-Dateilänge/-größe als Unterscheidungsmerkmal).
   - **`WebFetch` verschluckt das `term`-JSON — für Audio-Timing immer `curl` benutzen (Präzedenzfall 2026-08-05).** `WebFetch` konvertiert die Seite zu Markdown und strippt dabei `<script>`-Inhalte komplett, inkl. des `term.start`/`term.end`-JSON. Damit lässt sich zwar die Arabisch-Schreibung/Bedeutung bestätigen, aber kein Audio-Trim ableiten. Für Audio-Timing immer `curl -s "https://derja.ninja/search?search=<begriff>&script=<...>" -o datei.html` und dann lokal per `grep`/`python3 -re` nach `{"term": {"end": ..., "start": ...}` in der Nähe der passenden `NNNN.mp3`-URL suchen (siehe HTML-Struktur oben). **`ninja_audio_url` nie ohne `ninja_audio_start`/`ninja_audio_end` setzen, wenn die Quelle ein Satz-Audio ist** — sonst spielt der Button den ganzen Satz statt des Worts (in dieser Session dreimal passiert und nachträglich gefixt: courant/717, gharib/3899, maktba/3829).
   - Wenn der gesuchte Begriff nur innerhalb von Beispielsätzen anderer Einträge auftaucht (kein eigener Treffer-Block), gibt es dafür kein eigenes Audio — das ist normal bei Redewendungen/Wortverbindungen, siehe Schritt 4.
   - Ein Treffer bedeutet nicht automatisch einen eigenen Wörterbucheintrag (Headword) — er kann ausschließlich aus dem Beispielsatz eines fremden Eintrags stammen (Suchwort dort nur `<b>`-hervorgehoben, eigener Audio-Block fehlt dann meist im Satz-Teil). Bei zusammengesetzten deutschen Begriffen ohne direkten Treffer lohnt es sich, (a) nach dem Adjektiv/Bestandteil statt dem ganzen Kompositum zu suchen (Beispiel: "postal" statt "post card" für Postkarte) und (b) gezielt die Beispielsätze der Treffer zu durchsuchen, nicht nur die Kopf-Übersetzung — Komposita tauchen oft nur dort auf.
   - **Immer die volle Trefferliste scannen, nie nur die ersten 5–8.** Ninja liefert bis zu 40 Treffer pro Suche, sortiert nicht zwingend danach, was für uns relevant ist. Beim Batch vom 2026-08-01 saßen mehrere echte Exakttreffer (inkl. eigenem Audio) erst jenseits von Position 6–8 in der Liste (ghalit, lisse, sahba) und wurden beim ersten Durchlauf übersehen, weil nur die Top-Treffer geprüft wurden. Vor der Aussage "kein Treffer" oder "nur Wurzel/Beispielsatz bestätigt" immer die komplette geparste Liste durchgehen, nicht nur einen Ausschnitt.
   - **Audio-URL immer direkt mitparsen, nicht nachträglich.** Beim ersten Scan pro Suchbegriff sofort `<audio src="...">` aus dem Treffer-Block mitextrahieren (siehe HTML-Struktur oben), nicht erst bei Bedarf nachschauen. Jeder Treffer mit exaktem arabic_script-Match liefert im selben Schritt auch die Antwort auf "gibt's dafür Audio".
   - **Audio nur bei wirklich identischer Aussprache anhängen, reines Konsonantenskelett reicht nicht.** Gleiche Konsonanten bei unterschiedlicher Vokalisierung/Gemination klingen anders und dürfen nicht als Wort-Audio übernommen werden — Beispiele: صَرْف (sarf, Nomen "Wechselgeld") vs. Ninjas صَرِّفْ (sarrif, Verb "wechseln", mit Schadda) — falsches Audio. مَكْتْبَة (maktba, kontrahiert) vs. Ninjas مَكْتَبَةْ (maktaba, voll ausgesprochen, eine Silbe mehr) — ebenfalls falsches Audio. Vor dem Setzen von `ninja_audio_url` immer gegenchecken: gleiche Silbenzahl, gleiche Gemination (siehe Lautlehre-Regel 2)? Nur dann übernehmen.
3. Ninjas Transliteration ist ein Strukturhinweis, keine Vorlage. Nie 1:1 übernehmen (andere Konvention: z.B. ch statt sh, 9 statt q) — aber daraufhin prüfen, ob sie ein Feature zeigt, das unsere bestehende Transliteration übersieht (v.a. Gemination/Doppelkonsonanten — Ninja schreibt Doppelbuchstaben oft aus, wo unsere ältere Transliteration sie verschluckt hat). In unsere Chat-Alphabet-Konvention übertragen, siehe Pflichtregeln oben. Dieser ch/sh-Fehler ist kein Einzelfall, sondern trat in der Praxis wiederkehrend auf (auch nach vorheriger Korrektur erneut) — passiert, wenn Ninjas angezeigte Transliteration direkt kopiert statt aus der vokalisierten arabic_script neu abgeleitet wird.

**Ninjas eigener Transliterations-Schlüssel (offiziell von der Website, 2026-08-06 vom Nutzer zitiert) — nützlich für `script=transliterated`-Suchen, da Ninja die Sucheingabe intern erst zu Arabisch konvertiert, bevor gesucht wird:**

| Ninja | Laut | Unsere Konvention | Für Ninja-Suche umwandeln |
|---|---|---|---|
| 2 | أ (Hamza/Knacklaut) | meist weggelassen | – |
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

Beispiel-Umwandlung für eine `script=transliterated`-Suche: unser `yukhruj` → Ninja-Suche `you5rouj`; unser `yaqli` → `ya9li`. Bei `script=english`-Suchen ist dieser Schritt nicht nötig.

**Ninjas Transkriptions-Philosophie (offiziell, 2026-08-06 vom Nutzer zitiert) — wichtig, um Diskrepanzen richtig einzuordnen:** Ninja schreibt Wörter tendenziell in ihrer *vollen, theoretischen* Form, nicht kontrahiert wie in schneller Alltagsaussprache — z.B. تحمص nicht اتحمص, من الدار nicht مدار. Bei Unsicherheit orientiert sich Ninja an der Hocharabisch-Schreibung. **Das heißt: wenn Ninjas arabic_script "voller"/MSA-näher aussieht als unseres, ist das meist keine Diskrepanz, sondern nur eine andere Kontraktionsstufe — nicht automatisch als Fehler werten.** Echte Fehler sind nur eigenständige Buchstaben-Verwechslungen (falscher Konsonant an sich, nicht nur ausgeschriebene vs. kontrahierte Form desselben Konsonanten).

**Präzedenzfall systematischer Audit 2026-08-06: alle 145 Uni-Wien-Vokabeln (selbst erstelltes arabic_script, da die Quelle kein Original-Arabisch liefert) per englischer Bedeutungssuche gegen Ninja gegengecheckt** (nicht nur der bisherige Konsonantenskelett-Abgleich, der nur ~1-2% Trefferquote hat). Ergebnis: 2 echte Buchstaben-Fehler gefunden und gefixt (`widnin`="Ohren" hatte د statt ذ — betraf auch den schon länger bestehenden Singular-Eintrag `wdin`/id 725, war also kein reiner Uni-Wien-Fehler; `yhaddar`="er deckt den Tisch/bereitet vor" hatte gleich zwei falsche Wurzelbuchstaben ه/د statt ح/ض UND stellte sich als verstecktes Duplikat von bereits bestehendem `y7adhar`/id 2218 heraus — mit dem üblichen Merge-Workflow zusammengelegt). Von den restigen 143 hatten ca. 45 gar keinen Ninja-Treffer (v.a. grammatische Partikel wie illi/rani/hani/yakhi, reine Lehnwörter wie imayl/kart postal, Eigennamen) — das ist normal bei Lehrbuch-spezifischem Vokabular, kein Alarmsignal. Empfehlung: diese Art Audit (Bedeutungssuche statt Skelett-Match) bei jedem größeren Batch aus einer Quelle ohne eigenes Original-Arabisch wiederholen, nicht nur einmalig.
4. Klassifizieren:
   - arabic_script + Bedeutung von Ninja bestätigt → ggf. nur Transliteration korrigieren (Schritt 3) und/oder Audio ergänzen
   - arabic_script oder Bedeutung weicht ab → Korrektur mit Begründung vorschlagen
   - Kein eigener Treffer, aber in Beispielsätzen anderer Einträge bestätigt (z.B. Redewendungen) → Bedeutung gilt als bestätigt, aber kein Audio verfügbar, keine weitere Vokalisierung ableitbar → `change_category = 'ninja_check_kein_vorschlag'`
   - Gar kein Treffer, auch nicht in Beispielsätzen → ebenfalls `ninja_check_kein_vorschlag`, im change_reason transparent machen, dass nichts gefunden wurde
   - **Nur diese zwei exakten Strings für `change_category` verwenden: `ninja_check_pending` und `ninja_check_kein_vorschlag`.** Keine eigenen Varianten erfinden (z.B. `ninja_check_kein_vorschlag_bestaetigt`) — die App filtert im Ninja-Check-Tab hart auf genau diese zwei Werte, alles andere ist für Nils dort unsichtbar, selbst wenn die Zeile in der DB sauber dokumentiert ist. Ein Unterschied wie "bestätigt via Beispielsatz" vs. "gar kein Treffer" gehört in den `change_reason`-Text, nicht in eine neue Kategorie.
5. **Vor dem Schreiben:** bestehende `vocabulary_review`-Zeilen für die vocabulary_id prüfen — idealerweise schon als Sammelabfrage ganz am Anfang des Batches erledigt (siehe oben), sonst jetzt einzeln (`SELECT * FROM vocabulary_review WHERE vocabulary_id = ...`) — auch mit `change_category IS NULL`, das können unvollständige/unsichtbare Altlasten aus früheren Läufen sein (die App zeigt im Ninja-Check-Tab nur `change_category IN ('ninja_check_pending','ninja_check_kein_vorschlag')`, ein NULL-Eintrag ist für Nils unsichtbar). Bestehende Zeile per UPDATE weiterverwenden statt Duplikat anzulegen.
   - **Technischer Zwang, kein Stilratschlag:** `vocabulary_review.vocabulary_id` hat einen UNIQUE-Constraint. Ein zweiter INSERT für eine ID, die schon eine Zeile hat, crasht hart mit `23505 duplicate key`. Vor jedem INSERT also immer erst per SELECT prüfen, ob schon eine Zeile existiert — wenn ja, zwingend UPDATE statt INSERT.
   - **Konflikt-Check:** Wenn eine bestehende vocabulary_review-Zeile bereits einen abweichenden Vorschlag hat (z.B. `partner_status = 'pending'` mit einem ganz anderen Wort/einer anderen Bedeutung — etwa ein Partner-Vorschlag) → niemals stillschweigend überschreiben. Beide Versionen nebeneinander zeigen und Nils entscheiden lassen, welche gilt. Erst nach seiner Entscheidung schreiben (und partner_status dabei explizit zurücksetzen, wenn die Partner-Variante verworfen wird).
   - **Ausnahme — erkennbare Altlast statt echtem offenem Vorschlag:** Eine bestehende Zeile darf ohne Rückfrage überschrieben werden, wenn sie erkennbar veralteter Datenmüll ist, nicht ein echter offener Vorschlag — Kriterien: kein `change_reason`, `change_category IS NULL` oder unklar, UND der aktuelle Produktivwert in `vocabulary` weicht bereits sichtbar von der review-Zeile ab (d.h. der Eintrag wurde seither unabhängig geändert, die alte Zeile hinkt hinterher). Trifft nur EINES der Kriterien zu, oder ist irgendetwas davon unklar → weiterhin als Konflikt behandeln und Rückfrage stellen. Im Zweifel immer die vorsichtigere Variante (Rückfrage) wählen.
6. **Schreiben** (als INSERT oder UPDATE auf vocabulary_review):
   - `change_category`: `ninja_check_pending` (mit Textänderung und/oder Audio) oder `ninja_check_kein_vorschlag` (nichts zu ändern, aber dokumentiert) — siehe Schritt 4, keine weiteren Varianten
   - `reviewed = false`
   - arabic_script / arabic_script_original / darija / german / topic / lesson_id aus der aktuellen vocabulary-Zeile übernehmen, ggf. korrigiert
   - `ninja_audio_url` nur setzen, wenn ein echtes Wort-Audio gefunden wurde (nicht das Satz-Audio, siehe Schritt 2)
   - `change_reason`: kurzer deutscher Klartext, was Ninja gezeigt hat und was ggf. geändert wurde
   - Wie immer: kein SQL ohne Bestätigung — komplette Liste mit Begründung zeigen, erst nach Freigabe schreiben.
   - `flagged` bleibt auf true, solange ein offener Vorschlag existiert — die App setzt `flagged = false` selbst, sobald Nils im Ninja-Check-Tab "✅ Übernehmen" oder "🚫 Ignorieren" klickt. Nur wenn der Eintrag zweifelsfrei bereits korrekt ist und es nichts zu zeigen gibt (kein Audio, keine Korrektur, keine Auffälligkeit) → direkt `flagged = false` setzen, ohne Umweg über vocabulary_review.

## Workflow: Frisch importierte Batch-Vokabeln flaggen + verifizieren (leichtgewichtige Variante)

Abweichend vom obigen 🚩-Workflow (der für einzelne, von Nils *manuell* markierte Vokabeln über `vocabulary_review`/Ninja-Check-Tab läuft): Wenn Nils bei einem frischen Import-Batch explizit sagt "als flagged markieren" (z.B. neue Vokabeln aus einem Lektions-Batch), ist das eine andere, leichtgewichtigere Anfrage — kein Einzelfall-Review über die UI, sondern eine schnelle Batch-Verifizierung:

1. Neue Vokabeln mit `flagged = true` anlegen (wie von Nils verlangt)
2. **Seit 2026-08-06: automatisch, ohne Zuruf, direkt nach jedem Batch** (vorher musste Nils extra "die flagged per derja überprüfen" sagen — das entfällt jetzt): `SELECT * FROM vocabulary WHERE flagged = true`, dann jede einzeln gegen `derja_ninja_import` (offline zuerst, schnell) und bei Bedarf Live-Ninja-Suche prüfen (arabic_script korrekt? Audio vorhanden inkl. `term.start`/`end`, siehe oben?). Realistische Erwartung setzen: Trefferquote liegt oft nur bei ~1-2% (Ninja deckt Lehrbuch-/Fachvokabular schlecht ab) — trotzdem grundsätzlich versuchen, nicht überspringen.
3. Ergebnis gruppiert zeigen (bestätigt / korrigiert / nicht auffindbar) — bei Unsicherheiten (z.B. schwer lesbares Wort, sensibler Begriff) `AskUserQuestion` statt raten
4. Nach Bestätigung: **direkt** `UPDATE vocabulary SET flagged = false, ninja_checked_at = now() [, ninja_audio_url = ..., ninja_audio_start = ..., ninja_audio_end = ...]` — kein Umweg über `vocabulary_review`, das ist hier nicht der richtige Mechanismus (der ist für Korrektur-Vorschläge zur Freigabe durch Nils gedacht, nicht für "neu importiert, jetzt geprüft")
5. Bei echten Duplikaten, die dabei aus dem eigenen Batch auffallen (siehe Vokal-Varianten-Falle oben): normalen Duplikat-Merge-Workflow anwenden (siehe "Standard-Vorgehen bei gefundenem Duplikat" oben), nicht einfach den neuen Eintrag flagged lassen

Bei Unklarheit, welcher der beiden Workflows gemeint ist (Einzel-🚩 vs. Batch-Import-Flag): im Zweifel nachfragen, da die Schreibpfade unterschiedlich sind (`vocabulary_review` vs. direktes `UPDATE vocabulary`).

## Code-Änderungen

- Nicht einbauen ohne Bestätigung
- Syntax-Prüfung via `node vm.Script()` vor Auslieferung
- Output-Datei immer `trainer.html` (ohne Versionsnummer)
- Ausnahme: Bei Android-Caching-Problemen Versionsnummer erhöhen
- **Bei Performance-Fixes (z.B. fehlendes `spellcheck="false"`) alle Geschwister-Inputs im selben Formular mitprüfen, nicht nur das gemeldete Feld.** Präzedenzfall 2026-08-05: `ei-tp` (Topic-Feld im Vokabel-Edit-Sheet) hatte `autocomplete/autocorrect/autocapitalize/spellcheck` schon deaktiviert, die Nachbarfelder `ei-ar`/`ei-tr`/`ei-en` nicht — der gemeldete INP-Bug betraf nur `ei-ar`, aber dieselbe Fehlerklasse lauerte in allen dreien.

## Prüfprotokoll (Pflicht am Ende jeder Auswertung)

Am Ende jeder PDF-Auswertung immer eine Tabelle anhängen:

| Datei | Seiten | Methode |
|---|---|---|
| Dateiname.pdf | 1–N (alle) | pdfplumber (Text+Tabellen) + visuell einzeln |

Zusätzlich vermerken:

- Duplikatcheck: gegen welche Quellen geprüft (CSV-Namen oder "direkter Text"), wie viele project_knowledge_search-Abfragen
- Offene Rückfragen (gesammelt, nicht einzeln während der Analyse)

Zweck: Der Nutzer kann auf einen Blick sehen, ob alle Seiten vollständig geprüft wurden.

## Neue Quelle: speaktounsi.off (Instagram)

Quelle: Instagram-Account speaktounsi.off. Besonderheit: Eigene Transliteration — wird an unsere Chat-Alphabet-Konvention angepasst, nie 1:1 übernommen.

### Transliterationsregeln beim Import

- Quelle schreibt oft: 9 für ق, ţ für ط, ā für langes a → wir schreiben: q, t, e/a
- Quelle schreibt oft ch für ش → wir schreiben immer sh
- Großbuchstaben (H, T, S) der Quelle für Emphase → wir schreiben 7, t, s
- Vokale an bestehende Einträge angleichen (z.B. nmeshiw → nimshiw)
- Bei Unsicherheit: arabic_script als Anker, Partnerin fragen

### Was immer aufgenommen wird

- **Beispielsätze:** Auch wenn die Einzelvokabel schon vorhanden ist, den Satz als neuen Eintrag — Lektion mit title "Gesprächsführung", topic=Phrasen oder Ausdrücke
- **Sprichwörter:** Lektion mit title "Sprichwörter", topic=Sprichwörter
- **Vokabeln:** Nur wenn arabic_script noch nicht in DB

### Was nicht aufgenommen wird

- Eigennamen, Ortsnamen
- Inhalte die zu 100% bereits vorhanden (arabic_script + Bedeutung identisch)
- Grammatikerklärungen ohne konkreten Satz/Ausdruck

### Workflow pro Runde

1. 4–5 Bilder hochladen
2. Extraktion + Duplikat-Check (arabic_script, darija, german separat)
3. Tabelle zeigen mit Status (✅ / ⚠️ Fehlt / 🔄 Satz neu)
4. Bestätigung abwarten
5. SQL-Block ausgeben

Neues Gespräch nach ca. 10 Runden.

## Neue Quelle: Uni-Wien-Lehrskripte (Tunesisch-Arabisch I & II)

Quelle: Zwei Lehrskripte, "Tunesisch-Arabisch I" (7 Lektionen) und "Tunesisch-Arabisch II" (6 Lektionen). Wissenschaftlich strukturiert: Dialoge, Wortschatz-Tabellen, Grammatik-Kapitel, Übungen, Ausspracheübungen. 13 Lektionen insgesamt.

### Besonderheiten gegenüber anderen Quellen

- Eigene wissenschaftliche Transliteration (IPA-nahe, mit Emphatika- und Langvokal-Markierung) — muss ins Chat-Alphabet konvertiert werden, wird nie 1:1 übernommen
- Kein arabisches Original vorhanden — Arabisch wird von Claude selbst erstellt
- Enthält neben Vokabeln umfangreiches Übungsmaterial für einen eigenen Kurs-Modus im Trainer (separates Feature, siehe unten)
- Abweichender Duplikat-Umgang: "fällig setzen" statt Ausschluss — Nils lernt oft schon Grundwortschatz, der hier nochmal auftaucht

### Transliterations-Konvertierung (Uni Wien → Chat-Alphabet)

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
| ṣ/ṭ (Emphatika) | s/t, keine Unterscheidung | ṣbāḥ → sba7, ṭūl → toul |
| ḍ (Emphatikum) | dh (Stand 2026-08-06 — vorher fälschlich d/th gemischt, siehe unten) | ḍayyiq → dhayyaq, ʔabyaḍ → abyadh |
| ḏ/ṯ/ẓ (th-Laute) | th | hāḏa → hetha |
| ḷ, ṃ, ṛ, ḅ (weitere Emphatika) | keine Unterscheidung | žāṛi → jari |

**ض (ḍād) — Sonderfall, Entscheidung 2026-08-06:** Anders als ص/ط wird ض NICHT auf den einfachen Buchstaben (d) reduziert, sondern auf "dh". Grund: "d" würde ض mit د verschmelzen und die einzige Emphatika-Ausnahme wäre inkonsistent mit ص→s/ط→t; "th" ist schon an ذ/ظ/ث vergeben (echte Reibelaute, artikulatorisch etwas anderes) und würde die Unterscheidung zerstören. Vor dieser Entscheidung war die DB uneinheitlich (d, th UND dh parallel im Einsatz, teils dasselbe Wort doppelt verschieden geschrieben, z.B. mridh vs. mrith für "krank") — am 2026-08-06 in einem ~90-Zeilen-Sweep auf "dh" vereinheitlicht, inkl. Fließtext in Sprichwörtern/Beispielsätzen. Bei Verben, die als Konjugations-Paradigma in bereits bestehendem Lektionstext (course_lessons/course_exercises) verwendet werden, Ripple-Effekt vorher abschätzen und ggf. Rückfrage stellen, bevor der Lektionstext mitgezogen wird (Präzedenzfall: y3add/ya3add "beißen" in Lektion 6, dort explizit bestätigt und mitgezogen).

**Genereller Grundsatz, nicht nur für ض: Wird eine etablierte Schreibweise/Konvention für ein Wort geändert, IMMER auch `course_lessons` durchsuchen — sowohl `grammar_notes` (Fließtext) als auch `chunk_order` (Label + `grammar_headings`), nicht nur `vocabulary`.** Zweiter Präzedenzfall 2026-08-06, direkt im Anschluss an die ض-Entscheidung gefunden: Lektion 5s Kurs-Kapitel "māḍā-b-" (akademische Diakritika-Schreibung, nie konvertiert) und Lektion 7s "famma, tamma" (Schreibweise `tamma` widersprach der längst korrekten Bestandsvokabel `thamma`/id 1213) — beide nur im `chunk_order`-Label sichtbar, nicht in `vocabulary`. Checkliste bei jeder Konvention-Änderung: 1) `vocabulary` (arabic_script/darija/german), 2) `course_lessons.grammar_notes` (Fließtext, `replace()` auf jede betroffene Wortform), 3) `course_lessons.chunk_order` (Label-Text UND `grammar_headings`-Array — technischer Zwang: `grammar_headings` muss exakt zum `###`-Überschriftstext in `grammar_notes` passen, siehe `chunk_order`-Sync-Pflicht unten).

Arabisch wird direkt aus der Uni-Wien-Umschrift abgeleitet, nicht aus der bereits vereinfachten Chat-Alphabet-Form — die Emphatika-/Langvokal-Markierung der Quelle hilft bei der korrekten Vokalisierung (z.B. ṭ eindeutig ط, nicht ت).

Bei Duplikaten immer die exakte bestehende DB-Schreibweise übernehmen, nicht neu aus der Uni-Wien-Umschrift ableiten — sonst entstehen zwei leicht unterschiedliche Varianten desselben Worts im System. Erst `project_knowledge_search`, dann ggf. anpassen.

Diese Umwandlungstabelle gilt nicht nur für einzelne Vokabeln, sondern genauso für Fließtext in `grammar_notes` und `course_exercises` (Regel-Erklärungen, nicht nur Beispielsätze). Typischer Fehler: Beispielsätze werden korrekt umgewandelt, aber in der Erklärung daneben schleicht sich trotzdem mā-/-š (Uni-Wien-Symbole mit Strich/Hatschek) statt ma-/-sh ein. Nach dem Schreiben von Grammatik-Erklärungen einmal gezielt nach übrig gebliebenen Uni-Wien-Sonderzeichen durchsuchen (ā, š, ʕ, ḥ, ṛ, ṭ, ġ, ž) bevor das SQL ausgegeben wird.

**Pflicht-Gegencheck nach jeder Konvertierung: Konsonant für Konsonant gegen das arabic_script prüfen, nicht nur "sieht plausibel aus".** Diese Fehlerklasse ist am 2026-08-02 in einem einzigen Lektion-Batch DREIMAL passiert (yaxi statt yakhi, yhutt statt y7utt, turha statt tur7a, rxis statt rkhis) — die Quelle schreibt x/ḫ oder ḥ, aber die Transliteration behält still das Quellenzeichen (x) oder lässt es ganz weg, statt zu kh/7 zu konvertieren. Das ist kein rein kosmetischer Fehler: eine falsch geschriebene Transliteration lässt auch den nachfolgenden Duplikat-Check ins Leere laufen (Präzedenzfall rxis — hätte "rkhis" geheißen, wäre der Duplikat-Check sofort auf den bestehenden Eintrag 376 gestoßen). Checkliste, für jedes neue Wort einzeln abzuhaken: enthält arabic_script ح → muss darija "7" haben; enthält arabic_script خ → muss darija "kh" haben; enthält ع → "3"; enthält غ → "gh"; enthält ش → "sh". Bei Widerspruch: darija korrigieren, nicht das arabic_script.

### Duplikat-Check: "Fällig setzen" statt Ausschluss

Ergänzt die Standard-Duplikat-Kriterien (siehe "Duplikat-Check — Pflichtregeln" weiter oben, gilt weiterhin unverändert für die Erkennung selbst) nur um eine andere Konsequenz bei gefundenem Duplikat — hier wird nicht ausgeschlossen, sondern fällig gesetzt:

- Wort bereits vorhanden → nicht ausschließen. `progress.next_review = now()` setzen — nur wenn aktuell keine Fälligkeit gesetzt ist (`next_review IS NULL` oder keine progress-Zeile). Bestehende SRS-Zeitpläne (next_review in der Zukunft) werden nie überschrieben.
- Wort neu → normale Neuanlage + progress-Zeile sofort fällig.
- Grenzfall (ähnliche, aber nicht identische Bedeutung — Homonyme oder Synonyme) → nicht automatisch einordnen, dem Nutzer als Tabelle mit offener Frage vorlegen. Beispiele: ein Wort das bereits mit anderer Bedeutung existiert (Homonym), oder ein zweites Wort für eine Bedeutung die es schon gibt (Synonym).

### Arbeitsweise pro Lektion

**Hochladen:** Nils lädt alle Fotos einer Lektion in einer Nachricht hoch. Claude arbeitet sie danach intern häppchenweise pro Tabelle/Bereich ab (erst Verben-Tabelle, dann Wortschatz-Tabelle, dann Berufe, dann Ausspracheübungen einzeln usw.) und zeigt nach jedem Bereich das Ergebnis zur Bestätigung, bevor es zum nächsten weitergeht.

Warum: Wird ein ganzes Kapitel in einem Rutsch geprüft, passieren zwei Fehler zuverlässig: Wörter werden übersehen, und bereits vorhandene Wörter werden versehentlich als "neu" nochmal angelegt (Dubletten).

**Fehlende Seiten in Fotoquellen:** Wenn Seitenzahlen eine Lücke zeigen (z.B. 20-21-22-24-25, Seite 23 fehlt), das explizit ansprechen und nach der fehlenden Seite fragen — aber nie ein Wort als "fehlt bestimmt auf der fehlenden Seite" vermuten, ohne sie gesehen zu haben. Erst nach Bestätigung durch Nils, ob das Wort tatsächlich in der Quelle vorkam, in die Liste aufnehmen.

### Grammatik-Regeln auf Bestand anwenden

Uni-Wien-Material liefert nicht nur Vokabeln, sondern explizite Lautlehre-/Grammatikregeln (Artikel, Verneinung, Plural, Possessiv, Kongruenz etc.). Diese werden nicht nur für neue Importe genutzt, sondern nach jeder neuen Lektion auch rückwirkend gegen den bestehenden Vokabelbestand geprüft — eine einzelne Regel kann Dutzende Bestandsfehler aufdecken, die beim normalen Vokabel-für-Vokabel-Import nie auffallen, weil jeder Eintrag für sich genommen plausibel wirkt.

**Workflow:**

1. Nach dem Vokabel-Import: neue Regeln aus der Lektion identifizieren
2. Prüfen, ob sich die Regel als Textmuster gegen den Bestand durchsuchen lässt. Bevorzugt: direkt per `Supabase:execute_sql` gegen die vocabulary-Tabelle (Regex-Funktionen wie `~`, `regexp_replace` in SQL) — das ist token-günstiger und robuster als der Umweg über die heruntergeladene tounsi_db_*.md. Die Projektwissen-Datei nur nutzen, wenn kein Supabase-Zugriff verfügbar ist. `project_knowledge_search` ist für gezielte Einzelsuchen gedacht, nicht für systematisches Scannen aller ~3400 Einträge.
   - **Zwei Supabase-MCP-Fallen bei systematischen Scans:** Jeder `execute_sql`-Call läuft in einer eigenen DB-Connection — `CREATE TEMP TABLE` funktioniert deshalb nicht über mehrere Calls hinweg, alles muss in einer einzigen Query/CTE gebündelt werden. Bei mehreren SELECT-Statements in einem Call kommt nur das Ergebnis des LETZTEN zurück, frühere werden still verworfen — immer nur ein SELECT pro Call absetzen.
3. Treffer klassifizieren:
   - Nur Transliteration betroffen, arabic_script schon korrekt → direkt korrigierbar
   - arabic_script und Transliteration betroffen → beides korrigieren
   - Dialektfrage ungeklärt (z.B. weicht von Standard-Hocharabisch-Konvention ab, wie bei ج als dialektalem Sonnenbuchstaben) → nicht selbst entscheiden, sondern als konkrete Beispiele an Semia/Derja Ninja zur Verifikation vorlegen, bevor korrigiert wird
4. Volle Liste (Alt → Neu, mit ID und Lektion) zeigen, erst nach Bestätigung SQL ausführen
5. Bei unscharfen/komplexen Regeln (nicht sauber als Textmuster fassbar, z.B. Possessivsuffixe oder Verbkonjugationsmuster): Stichprobe statt Vollständigkeitsanspruch, das explizit als Einschränkung kennzeichnen

**Präzedenzfall:** Artikel-Assimilation vor Sonnenbuchstaben inkl. j — 38 Bestandsfehler in der Transliteration gefunden und korrigiert (arabic_script unverändert gelassen, siehe Sonderfall-Notiz oben).

## Lautlehre — Zusatzregeln für Vokalisierung & Bestandsaudits

Aus der Uni-Wien-Lautlehre (Einleitungskapitel) abgeleitete Prüfregeln, unabhängig von einzelnen Lektionen nutzbar, immer wenn arabic_script neu vokalisiert oder gegen eine externe Quelle (Derja Ninja o.ä.) abgeglichen wird:

1. **Vokalqualität a/e und i/e (Imala) ist meist kein Fehler.** Fatha und Kasra werden im Tunesischen je nach Umgebung mal als "a"/"i", mal als "e" ausgesprochen und transkribiert (z.B. حَارْ→"7ar" aber بَارْد→"berid" für denselben Fatha-Laut). Solche Abweichungen zwischen Vokalisierung und bestehender Transliteration nicht vorschnell als Fehler markieren — nur bei strukturellen Abweichungen (fehlende Silbe, anderer Konsonant, anderes Vokalmuster wie a-a vs. i-e) genauer nachhaken.
2. **Gemination (Schadda) muss sich im Doppelbuchstaben spiegeln.** Schadda im Arabischen → doppelter Konsonant in der Transliteration (كَبُّوطْ→"kabbout" ✓). Umkehrschluss als Prüfsignal nutzbar: doppelter Konsonant in der Transliteration ohne Schadda im Arabischen (oder umgekehrt) → möglicher Vokalisierungsfehler, gegenchecken.
3. **Schadda-Gültigkeitsprüfung.** Ein Schadda kann nie auf dem ersten Buchstaben eines Wortes stehen und nie auf einem reinen Langvokal-Buchstaben (ا) sitzen. Beides sind technisch ungültige Vokalisierungen und ein zuverlässiges Warnsignal für fehlerhafte/kaputte Quelldaten (z.B. Schadda direkt hinter ا, oder am Wortanfang) — nicht übernehmen, sondern korrigieren oder als fehlerhaft markieren.
4. **"Vollständig vokalisiert" heißt:** jeder Konsonant hat ein Harakat oder Sukun. Ein Wort, das nur ein einzelnes Schadda zeigt, aber sonst keine Fatha/Kasra/Damma auf den übrigen Buchstaben trägt, ist unvollständig vokalisiert, nicht korrekt — das gilt es zu ergänzen, nicht als fertig zu übernehmen.
5. **Maß-I- vs. Maß-II-Verwechslung bei Verben aus externen Quellen.** Unsere Vergangenheitsform (3. Pers. m. Singular, Maß I) ist die arabische Grundform des Verbs. Externe Quellen wie Derja Ninja listen oft stattdessen die kausative/doppelte Form (Maß II, mit Schadda) oder eine Nomen-Ableitung — gleiches Konsonantenskelett, andere Vokalisierung und Bedeutung (z.B. دَخِّلْ "hineinstecken" (Maß II) statt دْخَلْ "er trat ein" (Maß I); قَسِّمْ "einteilen" (Verb) statt قِسْم "Klasse" (Nomen)). Vor Übernahme einer externen Vokalisierung immer prüfen, ob Wortart/Verb-Maß zur deutschen Bedeutung passt — reiner Konsonantenskelett-Match reicht nicht. Existiert keine passende Maß-I-/Wortart-Variante in der Quelle, nicht raten, sondern ausschließen und offen lassen.
6. **Hamza (ء) ist ein eigener Laut, kein "3".** Ein Wort, das mit Hamza beginnt (glottaler Stimmabsatz, z.B. dt. "be'achten"), darf nicht mit 3 transkribiert werden, auch wenn beide Laute "im Rachen" gebildet werden. Bei anlautendem Vokal ohne erkennbaren Konsonanten prüfen, ob eigentlich ein أ gemeint ist.
7. **s ist immer stimmlos, z immer stimmhaft** — bei Unsicherheit, ob ein "s"-Laut in der Transliteration eigentlich "z" sein müsste, das explizit gegenchecken statt zu raten.
8. **Betonungs-Algorithmus zur Vokalisierungshilfe** (bei unsicherer Länge/Betonung anwendbar):
   - Einsilbige Wörter → immer betont
   - Auslautender Vokal → nie betont (außer bei einsilbigen Wörtern)
   - Genau ein schwerer Vokal (lang, oder kurz vor Konsonantenhäufung) im Wort → dieser wird betont
   - Mehrere schwere Vokale → der letzte wird betont
9. **Kolloquiale Vokal-Elision nur bei markiertem Sukun.** Silben werden nur dort reduziert/elidiert, wo das Arabische selbst ein Sukun auf dem vorausgehenden Konsonanten trägt (z.B. قْوِيَّة→"qwiyya"). Eine markierte Fatha/Kasra/Damma wird NICHT gestrichen, auch wenn die Aussprache subjektiv reduziert klingt (z.B. صَيْدَلِيَّة→"sidaliyya", Fatha+Sukun-Kontraktion bleibt als eigene Silbe erhalten). Präzisierung zu Regel 1 (Imala) — dort ging es um Vokalqualität, hier um Vokal-Erhalt vs. -Wegfall.
10. **Länderadjektiv vs. Ländername** ist eine eigene Unterkategorie der Maß-I/Maß-II-Falle (Regel 5). Bei Nationalitäten/Länderadjektiven ("französisch") vs. Landesnamen ("Frankreich") reicht Konsonantenskelett-Match nicht — Wortart aus der externen Quelle genau prüfen (Präzedenzfall: ID 658).

## Neue Datenquelle: derja_ninja_import (Supabase-Tabelle)

Tabelle: `derja_ninja_import` — vollständiger Offline-Dump von derja.ninja (Quelle: GitHub-Scraper ArmelVidali/derja_ninja_scraper), ca. 11.500 Zeilen. Spalten: `english_word` (Suchbegriff), `darija_result` (vokalisiertes Arabisch), `samples` (jsonb-Array mit Beispielsätzen {ar, en, audio_url}), `source`, `imported_at`.

RLS ist aktiv (Policy `app_access`, analog zu den anderen Tabellen — USING true/WITH CHECK true), seit 2026-07-24 eingerichtet.

Zusätzliche Spalten in vocabulary: `english` (interner Abgleich-Schlüssel zu Ninja, im Trainer standardmäßig ausgeblendet, nicht in Lernmodi), `ninja_id` (FK auf derja_ninja_import.id), `ninja_audio_url` (direkter Link zum passenden Ninja-Audio-Sample — noch nicht im Trainer eingebaut, geplant für später).

### Nutzen dieser Tabelle

- Vokalisierungs-Nachschlagewerk für unvokalisierte Bestandseinträge — oft zuverlässiger als selbst herzuleiten
- Ersatz fürs manuelle Copy-Paste von Derja Ninja — direkte SQL-Abfrage statt Nutzer bittet, im Web zu suchen
- Neue Vokabelquelle — Wörter aus Ninja, die noch nicht im Bestand sind (normaler Import-Workflow anwendbar)
- Audio-Anreicherung bestehender Vokabeln über ninja_audio_url

### Workflow: Bestandsaudit gegen derja_ninja_import (z.B. fällige unvokalisierte Vokabeln)

1. **Exakt-Match-Scan:** `arabic_script` (unvokalisiert) gegen `regexp_replace(darija_result, '[\u064B-\u0652\u0670]', '', 'g')` (Diakritika von Ninja-Ergebnis entfernt) abgleichen. Nur Ninja-Zeilen mit tatsächlich vorhandenen Diakritika berücksichtigen (`darija_result ~ '[\u064B-\u0652\u0670]'`) — Ninja hat auch selbst unvokalisierte Einträge, die nichts bringen.
   - **Achtung Regex-Falle:** Der Diakritika-Bereich `[\u064B-\u0652\u0670]` entfernt auch die Schadda (ّ = U+0651, liegt im selben Unicode-Block). Für reine Konsonantenskelett-Vergleiche ist das gewünscht — aber wenn an anderer Stelle Schadda-Position/-Gültigkeit separat geprüft werden soll (siehe Lautlehre-Regel 3), darf NICHT dieselbe generische Strip-Regex verwendet werden, sonst verschwindet genau das Prüfsignal, das man sucht.
2. Pro Vokabel: Anzahl distinkter darija_result-Werte zählen, nicht Anzahl der english_word-Kandidaten. Mehrere englische Wörter (tomato/tomatoes) zeigen oft auf dieselbe Vokalisierung — dann ist die Zuordnung sicher, nur die Wahl des english-Feldes ist noch offen (Singular/Plural nach deutscher Grammatik wählen, siehe Kollektivnomen-Hinweis unten).
3. Bei mehreren distinkten Vokalisierungen: Wortart/Bedeutung gegen die deutsche Übersetzung prüfen (siehe Lautlehre-Regel 5 oben, Maß-I/Maß-II-Falle). Nur übernehmen, wenn eindeutig zuordenbar; sonst ausschließen.
4. **Semantische Zufallstreffer filtern:** Manche Kandidaten sind reine Buchstaben-Kollisionen ohne inhaltlichen Bezug (z.B. "party" als Kandidat für "Hemden", weil zufällig gleiches Konsonantenskelett). Diese Kandidaten verwerfen, nicht automatisch übernehmen — im Zweifel den ganzen Eintrag ausschließen statt zu raten.
5. **Kollektivnomen-Hinweis:** Im Arabischen sind Singular- und Kollektiv-/Plural-Form vieler Nomen identisch (اسم الجنس الجمعي, z.B. طماطم = "Tomate" UND "Tomaten"). Deshalb führen oft mehrere englische Formen (tomato/tomatoes) zu identischer arabischer Vokalisierung — das ist kein Fehler, sondern normal.
   - Regel gilt auch für Verb-Flexionsformen, nicht nur Numerus: Mehrere englische Formen desselben Verb-Lemmas (introduce/introduced/introducing bzw. postal/posted/posting/postings) zeigen ebenfalls oft auf dieselbe darija_result-Zeile — der Scraper gruppiert offenbar nach Lemma. Unabhängig in zwei separaten Audits beobachtet.
   - **Praxisfall Maß-I/Maß-II (Regel 5):** IDs 3422/3647 (yqaddem, Präsens) — korrekter Maß-II-Präfix ist يُـ (yu-), nicht يَـ (ya-), obwohl beide Varianten identisch als "yqaddem" transkribiert waren. Nur durch Abgleich mit der bereits vorhandenen Vergangenheitsform (ID 3385, قَدَّمْ) auffindbar. Regel: vor jeder Präsens-Vokalisierungsprüfung erst die zugehörige Vergangenheits-Grundform in vocabulary suchen (`darija ilike '%wurzel%'`), nicht nur gegen Ninja abgleichen.
   - **Übersetzungsbasiertes Matching (Ansatz 2) ist in der Praxis wenig ergiebig:** Deutsch→Englisch-Gloss-Matching über english_word hatte in einer Stichprobe nur ~1% Trefferquote (Mehrdeutigkeit wie "chest" → Schatztruhe statt Körperteil, "throw" → Nomen statt "wegwerfen"). Ein Nicht-Treffer über englische Übersetzung ist kein Beweis für einen Bestandsfehler, oft nur eine Abdeckungslücke des ~11.500-Zeilen-Scrapes (Beispiel: "bream"/"dorado"/"fish" für Dorade blieb ergebnislos).
   - Vereinzelt korrumpierte Scrape-Einträge kommen vor (Beispiel: Suche nach "sheep" lieferte شوشطالرّاس — kein plausibles Tunesisch, sieht nach verrutschten Scraper-Daten aus). Einzelne, optisch "komische" Treffer ohne erkennbares Muster nicht blind übernehmen.
   - Bei eindeutigen Einzeltreffern (nur eine darija_result-Variante) war Ninjas Vokalisierung in der Praxis durchgehend zuverlässig und deckte reale Bestandsfehler auf (Cousine-Verwechslung خَالْ/خَالَة, Lamm/Schaf-Fehlgloss, "zhar" Blumen/Glück) — bestätigt die bestehende Aussage weiter unten, ausdrücklich aber nur für den Einzeltreffer-Fall.
6. Ergebnisliste mit Alt→Neu, English, Audio-Link zeigen, unsichere/ausgeschlossene Fälle explizit benennen, erst nach Bestätigung SQL ausführen (siehe Grundsatz oben).
7. **Nach der Ausführung:** Stichprobe der neu vokalisierten Einträge gegen die bestehende Transliteration prüfen (Lautlehre-Regeln 1–4 oben anwenden) — auch bei "sicheren" Treffern können Maß-Verwechslungen oder kaputte Ninja-Vokalisierungen (ungültige Schadda-Platzierung) durchrutschen, wenn nur ein einziger Kandidat vorhanden war und deshalb keine Mehrdeutigkeits-Prüfung ausgelöst wurde.

**Bekannte Grenzen:** Diese Tabelle deckt nur einen Teil des Bestands ab (Exakt-Match auf Konsonantenskelett) — der Rest bleibt manueller Vokalisierungs-Workflow (Lektion für Lektion, mit Derja-Ninja-Gegencheck bei Unsicherheit).

**"Kein Match in derja_ninja_import" ist eine eigene Fehlerkategorie**, getrennt von "Vokabel falsch" zu behandeln. Stichprobe von 10 gegen die Live-Seite getesteten alltäglichen Wörtern: 3 fehlten komplett im Offline-Dump (Institut/مَعْهِدْ, Bär/دُبّْ, Koch/طَبَّاخْ) — hoher Anteil, bevor man "kein Treffer" als Vokabelfehler wertet, immer live nachschlagen (siehe Live-Check-Workflow oben). Weitere harmlose "Kein Match"-Ursachen, kein Korrekturbedarf: Genus-/Numerus-Divergenz (Ninja listet oft nur die maskuline Grundform, z.B. فَارْغ, während unser Bestand feminine Formen separat führt, z.B. فارغة — zwei Datenmodelle, kein Fehler) und regionale Synonymvielfalt (Ninja listet z.B. für "Großmutter" 5 Dialektvarianten نَانَا/مَمَّاتِي/عْزِيزَةْ/..., unser Eintrag مَامَة ist eine legitime sechste, die dort einfach nicht auftaucht — nicht automatisch korrigieren).

### Bestehende Quelle: Derja Ninja — Web-Nachschlagen (wenn Tabellenabgleich nicht reicht)

derjaguru.com bzw. derjaninja.com als tunesische Online-Wörterbuchdatenbank — weiterhin relevant für Einzelfälle, die im derja_ninja_import-Dump nicht auftauchen, oder zur Verifikation einzelner unklarer Wörter (z.B. Sonnenbuchstaben-Fragen wie bei ج). Diese Chat-Umgebung hat keinen Web-Zugriff auf derjaninja.com (nicht auf der Domain-Allowlist) — der Nutzer muss Suchergebnisse selbst einfügen, oder Claude Code nutzen (hat i.d.R. Web-Search/-Fetch-Tools und freieren Netzwerkzugriff). Klarstellung (2026-08-01 live verifiziert): Die Seite ist vollständig serverseitig gerendert, ein reiner curl-Abruf ohne JS liefert die komplette Ergebnisliste — ein 403/leeres Ergebnis in einer anderen Session liegt an der Domain-Allowlist der jeweiligen Umgebung bzw. an falschen Parameternamen (q/query statt search), nicht an fehlendem JS-Rendering.

### Vollständiger Bestandsabgleich gegen derja_ninja_import

Der oben beschriebene Workflow deckt nur fällige/unvokalisierte Einträge ab. Für einen kompletten Bestandsabgleich (alle ~3200 Einträge, auch bereits vokalisierte, auch ohne Fälligkeitsdatum) gilt zusätzlich:

**Zuordnungs-Strategie — zweistufig, nicht per Übersetzung:**

- **Hauptlauf (Ansatz 1, bevorzugt):** Arabisch-Konsonantenvergleich. `arabic_script` (unabhängig vom Vokalisierungsstatus) und `darija_result` beide auf reine Konsonanten reduzieren (Diakritika entfernen), dann exakt vergleichen — wie im fälligen Batch vom 2026-07-24. Präzise, keine Übersetzungsungenauigkeit dazwischen. Deckt den Großteil ab, da die meisten Bestandswörter im Kern schon korrekt sind, nur teils unvokalisiert.
- **Zusatzlauf (Ansatz 2, optional, nur für Ansatz-1-Fehlschläge):** Deutsch→Englisch-Matching gegen english_word. Nur für Einträge ohne Treffer in Ansatz 1 sinnvoll — dort ist das Risiko einer Fehlübersetzung überschaubarer (kein bestehender Treffer, der durch eine falsche Zuordnung verschlechtert werden könnte). Trotzdem: jede Übersetzung ist selbst eine Fehlerquelle (Synonyme, Mehrdeutigkeiten wie „Bank" = Sitzbank/Geldinstitut) — Ergebnisse immer zur Prüfung vorlegen, nie automatisch übernehmen.

Bei Treffer, aber arabic_script bereits vokalisiert: eigene Vokalisierung gegen Ninjas darija_result vergleichen (Lautlehre-Regeln 1–4 oben anwenden, Imala-Abweichungen ignorieren). Tendenziell ist Ninjas Vokalisierung verlässlicher — viele bestehende Trainer-Vokalisierungen wurden von Claude nur aus der Transliteration hergeleitet, nicht aus einer geprüften Quelle. Bei struktureller Abweichung (nicht nur Imala) daher standardmäßig Ninjas Version vorschlagen, aber trotzdem immer beide Formen nebeneinander zeigen und die Änderung bestätigen lassen — nicht blind überschreiben, da einzelne Trainer-Einträge auch schon früher gegen Ninja oder mit Semia verifiziert worden sein können.

Nach jeder erfolgreichen Zuordnung: Transliteration (darija) gegen die (neue oder bestätigte) Vokalisierung prüfen, nicht nur arabic_script isoliert korrigieren:

1. Aus der vokalisierten arabischen Form die erwartete Chat-Alphabet-Transliteration ableiten (Konsonanten- und Vokalregeln aus den "Pflichtregeln" oben anwenden)
2. Mit der bestehenden darija-Spalte vergleichen
3. Imala-bedingte a/e-, i/e-Abweichungen ignorieren (Lautlehre-Regel 1)
4. Strukturelle Abweichungen (fehlende Silbe, falscher Konsonant, fehlende/überflüssige Gemination, falsche Artikel-Assimilation) als Korrekturvorschlag sammeln
5. Änderungen an darija genauso wie an arabic_script erst zur Bestätigung vorlegen, nie automatisch schreiben

**Klassifikation der Treffer** (wie beim fälligen Batch): sicher (Kollektivnomen/Groß-Klein-Varianten) / Maß-I-Maß-II-Risiko / semantischer Zufallstreffer (Buchstaben-Kollision ohne inhaltlichen Bezug) / unvollständig oder ungültig vokalisiert (Schadda-Prüfung).

**Batches nach Priorität, nicht alles auf einmal:**

1. Fällige Einträge (bereits als eigener Workflow oben beschrieben)
2. Rest nach Lektion sortiert
3. Fortschritt dokumentieren (z.B. welche Lektionen/ID-Bereiche schon geprüft wurden), damit nichts doppelt läuft und der Stand über mehrere Sessions nachvollziehbar bleibt — Vorschlag: einfache Fortschrittsnotiz als Kommentar in dieser Skill-Datei oder als eigene Merkliste, je nachdem was sich im Alltag einfacher pflegen lässt

**Präzedenzfall:** Fälliger Batch vom 2026-07-24 — 119 Einträge vokalisiert, dabei mehrere Kategorien realer Fehler demonstriert (Maß-Verwechslung, unvollständige Vokalisierung, ungültige Schadda, strukturelle Transliterations-Abweichungen). Die konkrete offene Korrekturliste dazu steht unter "Offene Punkte" ganz oben in dieser Datei, nicht hier.

## Kurs-Modus: course_lessons / course_exercises

Der Trainer hat neben der klassischen SRS-Vokabelabfrage einen eigenen Kurs-Modus (Stepper-UI: Chunk-Übersicht → Chunk-Intro → Items → Chunk-Zusammenfassung), aufgebaut aus den Uni-Wien-Lehrskripten. Zwei Tabellen:

- `course_lessons` — eine Zeile pro Lektion, mit `grammar_notes` (Markdown-Fließtext mit `### Überschrift`-Abschnitten) und `chunk_order` (jsonb-Array, definiert Reihenfolge/Gruppierung der Übungen im Stepper — jedes Element hat `key`, `label`, `dialog`, `grammar_headings`)
- `course_exercises` — eine Zeile pro Übungs-Item, mit `course_lesson_id`, `position` (Integer, bestimmt Reihenfolge), `chunk_key` (muss zu einem `key` in `chunk_order` passen), `exercise_type`, `prompt`, `solution`, optional `vocabulary_id`

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
| `pronunciation` | Einzelwort-Ausspracheübung — **muss `vocabulary_id` verlinkt haben** (inkl. Audio, wenn vorhanden), siehe Datenregel unten |

### Workflow: erst Vokabeln, dann Übungen

Standing rule (vom Nutzer mehrfach bekräftigt): **Bei jeder neuen Lektion erst alle referenzierten Vokabeln vollständig auf Vollständigkeit gegen den Bestand prüfen und importieren, danach erst die Übungen bauen.** Nicht vermischen. Jede Einzelwort-Übung (v.a. `pronunciation`) wird mit der bestehenden (oder neu angelegten) Vokabel per `vocabulary_id` verlinkt — inklusive Audio, wenn vorhanden (`ninja_audio_url`/`ninja_audio_start`/`ninja_audio_end`, siehe Derja-Ninja-Abschnitt).

Bildbasierte Übungen (z.B. "Was machen die Leute" mit Zeichnungen) werden nie umgesetzt — explizite Anweisung "Bild rausnehmen". Beim Auswerten kurz vermerken, welche Übungsnummern deshalb übersprungen wurden.

### Pflichtschritt: Item-Zählung, nicht nur Abschnitts-Existenz

**Größter Fehler dieser Session:** Alle drei Lektionen galten nach früheren Durchläufen als "vollständig geprüft" — waren es aber nicht. Der Fehler: geprüft wurde nur, ob eine nummerierte Übung (I., II., III... bzw. 1., 2., 3...) *als Abschnitt* existiert, nicht ob *alle* ihre Items bis zur letzten Nummer auch tatsächlich als eigene `course_exercises`-Zeile in der DB stehen. Ergebnis: ca. 50 fehlende Übungen über drei Lektionen (Kongruenz-Beispiele, Genitivverbindungen, Ja/Nein-Fragen, eine komplette Ausspracheübungs-Lautgruppe), erst gefunden als der Nutzer explizit sagte "in den Unterlagen sind viel mehr Beispiele als im Trainer".

**Pflicht-Vorgehen bei jeder Lektion (neu ODER Bestandsprüfung):**
1. Jede nummerierte Übung im Quellmaterial bis zur letzten Ziffer/Zahl durchzählen (z.B. "V. Übersetzen Sie, 1–21" → 21 Items erwartet)
2. Gegen `SELECT count(*) FROM course_exercises WHERE course_lesson_id=X AND chunk_key='...'` abgleichen
3. Bei Abweichung: fehlende Items identifizieren, nicht nur "ist wohl vollständig" annehmen
4. Auch mehrseitige Übungen beachten — Nummerierung kann über einen Seitenumbruch weiterlaufen (Item 1 auf Seite N, Items 2–7 auf Seite N+1)

### Wortvarianten nicht vorschnell auf Bestandswort normalisieren

Präzedenzfall: `dziri` (Quell-Schreibweise für "algerisch" in Lektion 1) wurde zunächst still auf das ähnliche Bestandswort `jzayri` gemappt — bis eine Kongruenz-Übung genau die *unterschiedliche* Artikel-Assimilation (d-Merge vs. j-Merge) als Lehrpunkt brauchte und beide Formen dafür unterschiedlich behandelt werden mussten. Vor dem Zusammenlegen zweier ähnlicher Wörter prüfen, ob die Übung selbst eine phonetische Eigenheit der exakten Schreibweise demonstriert (z.B. Artikel-Assimilation, Reim, Wortspiel) — wenn ja, nicht mergen, sondern beide Formen behalten und im Zweifel den Nutzer fragen.

### `chunk_order` — weiterer Fundort für Uni-Wien-Reste, Sync-Pflicht mit `grammar_notes`

`chunk_order` ist ein zusätzlicher Ort, an dem Uni-Wien-Sonderzeichen überleben können (Präzedenzfall: Label "Ausspracheübungen (ḥ-Laut)" statt "(7-Laut)") — der Uni-Wien-Sweep (siehe oben) muss `chunk_order`-Labels mit einschließen, nicht nur `grammar_notes`/`course_exercises`.

**Technischer Zwang:** `chunk.grammar_headings` referenziert `### Überschrift`-Text aus `grammar_notes` per **exaktem String-Match** (`parseGrammarSections()` in trainer.html). Wird eine `###`-Überschrift in `grammar_notes` umbenannt oder mit einer anderen zusammengelegt, MUSS jedes `chunk_order`-Element, das die alte Überschrift referenziert, mit aktualisiert werden — sonst bricht die Verknüpfung lautlos (kein Fehler, der Intro-Screen des Chunks zeigt einfach nichts an). Nach jeder Umbenennung: gezielt auf den alten Überschriften-Text in `chunk_order` aller betroffenen Lektionen prüfen.

### Position-Verschiebung beim nachträglichen Einfügen

`course_exercises.position` ist ein einfacher Integer ohne Unique-Constraint (Lücken sind erlaubt, Sortierung erfolgt aufsteigend pro `chunk_key`). Beim nachträglichen Einfügen eines Items, das VOR bestehenden Items in derselben Chunk-Reihenfolge erscheinen soll: `UPDATE ... SET position = position + 1 WHERE course_lesson_id=X AND position >= Y` schiebt ALLES ab Position Y hoch — Vorsicht bei der Wahl von Y, ein zu niedriger Wert erwischt mehr Zeilen als beabsichtigt (Präzedenzfall: eigener Fehler, führte kurzzeitig zu falscher Reihenfolge in Lektion 1, direkt danach per Kontrollabfrage bemerkt und korrigiert). Nach jedem Positions-Shift die betroffene Chunk-Sequenz per SELECT gegenprüfen, nicht blind vertrauen.

## Kurs-Verknüpfung: vocab_lesson_refs

Nach jedem Vokabel-Batch (egal ob neue INSERTs oder gefundene Duplikate) muss `course_lessons.vocab_lesson_refs` der jeweiligen Lektion aktualisiert werden — mit echten Vokabel-IDs, nicht nur als Text-Liste der Wörter.

**Pflichtformat (technischer Zwang, kein Stilratschlag):** `vocab_lesson_refs` ist KEIN einfaches Komma-Array. Die App (`parseCourseVocabRefs()` in trainer.html) erwartet exakt `ids:<id1>,<id2>,...|darija:<wort1>,<wort2>,...` — ein String mit zwei durch `|` getrennten Teilen, `ids:` und `darija:` als Präfix. Ein Format ohne diese Präfixe (z.B. nur `"3841,3842,3843"`) wird von der App komplett ignoriert — `part.split(':')` liefert dann `length<2` und die Funktion bricht für diesen Teil ab, ohne Fehler, aber auch ohne jede verknüpfte Vokabel. Präzedenzfall: Lektion 5 (2026-08-02) wurde erst mit dem falschen Format geschrieben, zeigte im Trainer "keine Vokabeln verknüpft", trotz korrekt befüllter Spalte in der DB — erst durch Lesen von `trainer.html` (`grep parseCourseVocabRefs`) gefunden und korrigiert.

Wenn diese Session Live-Zugriff auf Supabase hat (z.B. via `Supabase:execute_sql`), einfach mit `RETURNING id, darija` direkt nach dem INSERT arbeiten und daraus die beiden Listen bauen — kein Subquery-Umweg nötig. Nur wenn kein Live-Zugriff besteht (Nils führt das SQL selbst aus) braucht es die Subquery, die auf (darija, lesson_id)-Paare matcht:

```sql
WITH refs AS (
  SELECT id, darija FROM vocabulary WHERE (darija, lesson_id) IN (('arba3tash',31),('tsa3tash',31))
)
UPDATE course_lessons
SET vocab_lesson_refs = 'ids:' || (SELECT string_agg(id::text, ',') FROM refs)
                       || '|darija:' || (SELECT string_agg(darija, ',') FROM refs)
WHERE course_number = 2;
```

Bei nachträglicher Ergänzung (weitere Wörter zu einer bestehenden Lektion) reicht es nicht, einfach mit `||','||neue_ids` anzuhängen — der bestehende String muss geparst (beide Teile: ids und darija getrennt erweitern) und neu zusammengesetzt werden, sonst entsteht wieder ein kaputtes Format.

Im selben Zug immer auch die progress-Zeilen mitziehen — für Wörter mit `next_review = NULL` fällig setzen (bestehende SRS-Termine nie überschreiben) und für neue Vokabeln ohne progress-Zeile eine anlegen:

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

Die (darija, lesson_id)-Paare und der `WHERE course_number`-Wert oben sind nur ein Beispiel aus einem realen Import (Lektion 2, Uni Wien) — bei jedem neuen Batch durch die tatsächlich neu eingefügten/gefundenen Wörter und die passende Lektion ersetzen.
