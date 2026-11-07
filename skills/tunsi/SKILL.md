---
name: tunsi
description: "bei der verbesserung meines vokabel trainers fuer tunesisch"
---

# Tounsi Trainer — Arbeitsregeln

Fokus dieser Datei: bestehende Trainer-Vokabeln prüfen, neue Vokabeln nachschlagen/anlegen. Nachbardateien, nur bei Bedarf nachschlagen:
- **CHECKS.md** — SQL-Prüfungen (A müssen auf 0, B Verdachtslisten, C Regeln fürs Prüfen selbst).
- **LOOKUP.md** — vocab_lookup: ein Wort in Ninja, TUNICO und Peace Corps nachschlagen.
- **PRECEDENTS.md** — ausführliche Fallgeschichten/Bug-Belege hinter den Regeln hier.
- **COURSE_MODE.md** — Kurs-Modus (`course_lessons`/`course_exercises`) und Änderungen an `trainer.html` selbst; hat mit Vokabel-Prüfung nur am Rande zu tun.
- **IMPORTS.md** — Import-Methodik für neue Quellen (PDF/Foto-Extraktion, Web-Scraping, Quellen-Konvertierungstabellen, Detail-Historie jeder Rohdatenquelle). Die bisherigen Imports (Uni-Wien, TUNICO, Derja Ninja, Peace Corps, Instagram) sind abgeschlossen — nur bei einem neuen Import/einer neuen Quelle relevant.

## Schnellzugriff

| Situation | Relevante Abschnitte |
|---|---|
| **Vokabeln prüfen ODER neu anlegen** — eine, ein Batch, geflaggte, fällige, ein Import, „ich brauche ein Wort für X" | **Der Prozess — ein Ablauf, zwei Eingänge.** Dasselbe Vorgehen für alle Fälle; es wechseln nur die Zeilen am Anfang und `UPDATE`/`INSERT` am Ende. |
| Neue Vokabel nachschlagen / Quellen abgleichen | **LOOKUP.md** (vocab_lookup), das Werkzeug hinter Schritt 3 |
| Quelle schreibt etwas anders als wir — Fehler oder nur Konvention? | **Quell-Konventionen** (in Transliteration — Ziel-Konvention). Was dort erklärt ist, ist kein Befund |
| **Bestand prüfen — erster Blick** | **Im Trainer: Mehr → Prüfungen** (Fundstellen) bzw. die Zahl „N Treffer in den Prüfungen“ auf Lernen. Soll **0** sein. Abschnitt „Prüfungen im Trainer“ sagt, was dort läuft und was nur per SQL |
| **Neue Prüfung gewünscht oder von Hand wiederholt** | Abschnitt „Prüfungen im Trainer“ → **Immer erst überlegen, ob sie in den Trainer gehört** — und vorschlagen |
| „alle Regeln laufen lassen" | **CHECKS.md** → **A** (müssen auf 0 stehen). Das SQL dort ist nur eine Teilmenge; der vollständige Lauf geht über den Node-Harness gegen `trainer.html` |
| Bestand nach Kandidaten durchsuchen | **CHECKS.md** → **B** (Verdachtslisten mit Fehlalarmquote) — **nie im Block korrigieren** |
| Eigene Prüfabfrage bauen | **CHECKS.md** → **C** (Regeln fürs Prüfen selbst) — erst lesen, drei der Fallen dort haben schon Prüfläufe stumm wertlos gemacht |
| Vokabel ist ein Verb (prüfen ODER anlegen) | Verben → Verb-Konjugationsmodell (3-Zeilen-Ziel, `conjugation`, `conj_rotate`) — gilt auch bei geflaggten Einzelformen |
| Was ist von früher noch unerledigt? | Offene Punkte (direkt unten) — **die Zahlen dort sind ein Schnappschuss, vor jeder Planung mit dem SQL daneben neu ziehen** |
| Vokalisieren, Harakat setzen, Regeln gegen `trainer.html` laufen lassen | **`tools/`** — `extract.js` (TRANSLIT_RULES aus `trainer.html`), `chatalpha.js` (Port von `_arabic_to_chatalpha`), `vokalisierer.js` (Harakat-Solver). `tools/README.md` nennt die sieben Pflichtfilter — **vor dem ersten `UPDATE` lesen** |
| Was kennen die Quellen, das der Trainer nicht hat? | **`quellen_abgleich`** — Live-View, vier Buckets (`fehlt`/`baustein`/`variante`/`vorhanden`) und Score. Im Trainer der Knopf „Quellenabgleich“. Methodik: IMPORTS.md → Quellenabgleich |
| Wie transliteriert der Trainer selbst? | Im Trainer der Chip **„🔤 Transliterationsregeln“** — Buchstabentabelle, Vokalzeichen, Sonnenbuchstaben und die 23 Prüfregeln mit lebender Trefferzahl, alles aus `AR_TRANSLIT_MAP`/`TRANSLIT_RULES` gelesen statt abgetippt, dazu ein Probierfeld. Die **Ziel-Konvention** steht weiterhin hier unten (Transliteration — Ziel-Konvention); der Screen zeigt, was der Code daraus macht |
| PDF/Foto-Quelle auswerten, neue Quelle importieren | IMPORTS.md |
| Kurs-Modus (course_lessons/course_exercises) oder Code-Änderung an trainer.html | COURSE_MODE.md |

## Häufige Fehler — vor jeder Korrektur lesen

Was in den Prüfungen immer wieder auftaucht (Gesamtprüfung 2026-11-07; Fallgeschichten in PRECEDENTS.md):

| Fehler | Gegenmittel |
|---|---|
| **h statt 7, d statt dh, t statt th in Kurstexten** (Skript-Punkte ḥ ḍ ṯ beim Abtippen verloren — drei Runden bis 0) | Trainer-Prüfung „Kurstext: Wort weicht nur in h/7 …“; neue Ausnahmen nur mit Grund in `KURS_HDT_OK` |
| **Abhängige Stellen vergessen** (Tabelle, Kurskarte, Überschrift, Wortliste) | Folgeorte-Liste unten nach **jeder** Wortkorrektur abarbeiten |
| **Eigene Abschrift als Beleg** (`grammar_notes` als „Skript“ zitiert) | Skript = `uniwien_source_pages`, nie die eigenen Kurstexte |
| **Gleich geschrieben, anderes Wort** (hdar „reden“/7dhar, habb „wehen“/7abb, s7ab Wolke/Freunde) | vor einer Musterkorrektur Bedeutung lesen (`meta.verb_de`, `vocab_id`, Deutsch) |
| **Hin- und Herkorrigieren** von Vokalvarianten | Entscheidung mit Datum und Beleg in `internal_note`; vor jeder Änderung lesen, ohne neuen Beleg nicht umkehren |
| **Falsche Verknüpfung** `tunico_verb_id` → `tunico_import` | zeigt auf `tunico_corpus_verbs.id` (Spaltenkommentar) |
| **Tabelle in sich uneinheitlich** (ikhtart neben khtar) | Trainer-Prüfung „Vorschlagsvokal nur in manchen Zellen“ |
| **Nur einen Teil der Trainer-Prüfungen laufen lassen** | im Harness `translitExtraChecks0()` **und** `datenChecks()` aufrufen |
| **Zahlen aus den Regeldateien zitiert** | immer live ziehen (`qualitaets_checks`, Trainer) |

### Folgeorte — nach jeder Korrektur eines Wortes

1. die Zeile selbst (`darija`, `arabic_script`, `german`, `english`)
2. alle Zeilen mit derselben `conjugation` (gleiches JSON; Zelle muss zur Zeile passen)
3. Kursaufgaben: `course_exercises.prompt`/`solution` (ganzes Wort, `\m…\M`)
4. Kurstexte: `course_lessons.dialog_text` und `grammar_notes` — bei geänderter `###`-Überschrift auch `chunk_order.grammar_headings`
5. `vocab_lesson_refs` — `ids:` **und** `darija:`-Teil
6. Regelkarten (`grammar_card`, Verb-Regeln) und Dubletten-Glossen („er sieht“ zweimal)
7. danach Trainer-Prüfungen laufen lassen (Ziel 0)

## Offene Punkte

Unerledigte Altlasten aus früheren Sessions — bei Gelegenheit aufgreifen, nicht Teil der laufenden Regeln:

- **Ninja-Transliteration in Trainer-Konvention** (besprochen 2026-09-05, bewusst zurückgestellt): `derja_ninja_entries.darija` ist in Ninjas eigener Konvention, nicht unserer — anders als bei TUNICO/Peace Corps gibt es dafür noch keine `chatalpha`-Spalte. Wäre nur aus dem vollvokalisierten `arabic_script` heraus zuverlässig baubar (nicht aus Ninjas `darija` selbst), mit eigenem Validierungsaufwand. Bisher kein Bedarf, seit klar ist: Original-Transliteration wird ohnehin nur im Zweifelsfall herangezogen, `chatalpha` reicht für den Regelfall.

- **Audio-Sicherung abschließen und Ninja-Ordner verkleinern** (beschlossen 2026-11-02, Reihenfolge einhalten):
  1. Sicherung in Colab durchlaufen lassen (`tools/audio_sichern.ipynb`, Pakete `paket_NNN.tar` + `manifest.csv` in Nils' Drive). Danach `DROP VIEW public.audio_sicherung_liste;` (Nils im SQL-Editor) und Colab-Zugriff auf Drive entziehen (`myaccount.google.com/permissions`).
  2. **Wiederherstellung testen:** Stichprobe aus den Paketen entpacken (je Quelle ca. 20 Dateien), gegen die Live-Quelle prüfen (Größe, lesbar, spielt ab), Zuordnung über die `manifest.csv` (Datei → Adresse → Vokabel) durchspielen, und eine Aufnahme probehalber über einen Ersatz-Ordner im Trainer abspielen. Erst danach gilt die Sicherung als brauchbar.
  3. **Ordner `ninja-audio` auf die nötigen Dateien verkleinern:** Der Trainer braucht ihn nur für Aufnahmen mit `audio_gain` > 1 (WebAudio, `audioNormPrepare`); alle anderen spielen direkt von Ninja. Stand 2026-11-02: 446 Dateien nötig und alle vorhanden, 991 Dateien (374 MB) überflüssig. Löschen per Storage-API (SQL auf `storage.objects` ist gesperrt) mit einem Skript, das Nils in Colab mit seinem Service-Key laufen lässt; es zeigt vorher die Liste. **Erst löschen, wenn Schritt 1 und 2 abgeschlossen sind.** Danach in dieser Datei festhalten: Zu jeder Zeile mit `audio_gain` > 1 muss die Datei im Ordner liegen (neue Aufnahmen mit Faktor über 1 dorthin hochladen).

**Laufender Prüfdurchgang.** Vollständige Fundlisten mit Klassifizierung und Entscheidungsstand: `exports/pruefliste_2026-09-12.md` — dort weiterarbeiten, nicht neu aufrollen.

**Zahlen nie aus dem Skill zitieren — immer live ziehen.** Diese Tabelle hat genau das schon einmal falsch gemacht: sie nannte 49 statt 19 beim Verb-Selbstcheck und 93 statt 21 bei der Gemination, also Posten, die längst erledigt waren. Seit dem 2026-09-13 gibt es dafür eine Sicht, die nicht veraltet:

```sql
SELECT * FROM public.qualitaets_checks WHERE treffer > 0 ORDER BY gruppe, nr;
```

Gruppe A muss auf 0 stehen, Gruppe B sind Rückstände. Hier steht bewusst **kein** Schnappschuss mehr: die frühere Fassung nannte „Check 22/23 bei 424/36" und war zwei Tage später bei 234/0 — ein Absatz, der zum Zitieren einlädt und dabei falsch ist, richtet mehr Schaden an als eine fehlende Zahl. Die Sicht oben liefert den Stand in einer Abfrage.

Was die Sicht **nicht** abdeckt und weiterhin von Hand zu ziehen ist (verwaiste `vocab_lesson_refs`, Audio-Grunddaten, Flaggen und Fälligkeiten prüft inzwischen der Trainer, siehe „Prüfungen im Trainer“):

| Posten | wo |
|---|---|
| Schrägstrich im `darija` (echte Synonyme) | CHECKS.md → B |
| Bedeutungsverdacht gegen TUNICO | `public.bedeutungs_screen` — **keine Korrekturliste**, ~93 % Fehlalarm |

- **`-ou` nach Konsonant** (113 Zeilen): Die Konjugationstabellen schreiben 511× `-u` gegen 39× `-ou`, eine Vereinheitlichung wäre also begründbar. **Bewusst nicht angefasst**, weil die Mehrheit der Treffer gar kein Plural ist, sondern das Possessivsuffix (`3andou` „er hat", `7lou` „süß"). Nur mit Wortart-Prüfung angehbar, nicht per Regex.
- **Verb-Modell-Abdeckung:** 181 Verbgruppen haben eine `conjugation`-Tabelle, davon erreichen 87 das 3-Zeilen-Ziel; 48 neue Zeilen würden alle auf 3 bringen. 88 Gruppen haben keine rotierende Zeile (62 davon bräuchten nur ein `conj_rotate`-Flag, keine Neuanlage). Weitere **169 Verb-Zeilen haben gar keine Tabelle** — ob das Modell auf sie ausgeweitet wird, ist offen.

## Grundsatz: Nie ohne Bestätigung in Supabase schreiben

Jedes INSERT/UPDATE/DELETE erst als Vorschlag zeigen (betroffene Zeilen/Werte), auf Bestätigung warten, dann schreiben. Gilt für jede Tabelle, jede Größenordnung — auch ein einzelnes Wort.

### Datenbank-Pflege (seit 2026-10-31)

- **Backup vor jeder Korrektur:** eigene Tabelle `backup_<datum>_<thema>` mit den betroffenen Zeilen, **gleich mit `enable row level security`** anlegen (ohne RLS ist sie mit dem öffentlichen Schlüssel les- und änderbar).
- **Zugriffsrechte neuer Tabellen (Supabase-Änderung ab 30.10.2026):** Neue Tabellen in `public` bekommen nicht mehr automatisch Rechte für die Data API. Soll eine App (Trainer, Training) auf eine neue Tabelle zugreifen, braucht sie ein explizites `GRANT` in derselben Migration (`select` für `anon`, `select, insert, update, delete` für `authenticated` und `service_role`); sonst kommt „permission denied“ mit dem fehlenden Statement. **Backup-Tabellen bekommen bewusst kein `GRANT`** und bleiben damit von der API aus unerreichbar. `enable row level security` bleibt trotzdem Pflicht (schützt auch, falls die Umstellung für das Projekt später greift). Bestehende Tabellen sind nicht betroffen.
- **Aufräumen:** Backups nach ca. 14 Tagen löschen, wenn nichts Auffälliges gemeldet wurde. `DROP TABLE` fragt im Supabase-Editor nach; Nils führt es dort aus.
- **Einmal im Monat die Ninja-Audio-Adressen prüfen:** alle `ninja_audio_url` (rund 1.500 verschiedene Dateien) mit einer `HEAD`-Anfrage abfragen (`curl -I`, parallel, ohne die Dateien zu laden). Erwartet: überall 200 und dieselbe `content-length` wie beim letzten Lauf. Abweichungen heißen: Ninja hat Dateien umgezogen oder ausgetauscht, dann betroffene Vokabeln gegen den Ninja-Eintrag neu prüfen (Start/Ende, Lautstärke). **Gleichzeitig nach Neuem bei Ninja sehen** (Stichprobe, kein neuer Abruf): die Aufnahmen sind von 1 bis zur höchsten Nummer unserer Kopie durchnummeriert (Stand 2026-11-01: 21.760) — die nächsten ~140 Nummern per `HEAD` abfragen; 200 heißt neue Einträge. Dazu die Zahl auf der Startseite `https://derja.ninja/` („17,000 entries“) mit unserer Anzahl vergleichen (17.335). Lücken in der Nummerierung sind normal (2026-11-01: 119 von 120 gezogenen Nummern gibt es nicht). Die Prüfung schließt die Kurs-Audios von Sprachenlernen24 ein (öffentliche Links, siehe IMPORTS.md). Stand 2026-11-01: alle 200, Größen unverändert zum Abruf vom 2026-10-31, keine neuen Nummern bis 21.900. Quellenstand: TUNICO wurde am 07./08.08.2026 importiert, Ninja am 17.08.2026 abgerufen; beide Tabellen sind feste Momentaufnahmen und ändern sich nur durch einen neuen Import.
- **Einmal im Monat** die Sicherheitshinweise von Supabase ansehen (`get_advisors`, Typ `security`). Wichtig sind neue Tabellen ohne RLS; die bekannten Hinweise zu SECURITY-DEFINER-Ansichten, `search_path` und `login_user` sind bewusst offen. Dazu eine monatliche Erinnerung (geplanter Task „Monatliche Datenbank-Prüfung“).

## Projektwissen-Datei

Die Datei `tounsi_db_YYYY-MM-DD.md` im Projektwissen ist die primäre Datenquelle, wenn kein Live-Supabase-Zugriff besteht. Sie enthält Schema, Lessons-Mapping, Users, Vocabulary. Duplikat-Check läuft dann gegen diese Datei via `project_knowledge_search` (Ablauf/Kriterien siehe „Der Prozess", Schritt 1, Eingang B).

**Wann aktualisieren:** nach größeren Vokabel-Importen (>20 Einträge), nach Änderungen an der Lektionsstruktur, wenn Duplikat-Checks fehlschlagen/veraltete Einträge zeigen, wenn neue Supabase-Spalten angelegt werden (dann auch den Export-Modus im Trainer erweitern). Export: Trainer → 💾 Export → "📦 Daten laden" → `tounsi_db_YYYY-MM-DD.md` → ins Projektwissen hochladen, alte Datei ersetzen.

## Der Prozess — ein Ablauf, zwei Eingänge

Es gibt **einen** Ablauf. Was wechselt, ist nur, **welche Zeilen** hineingehen und **ob am Ende `UPDATE` oder `INSERT`** steht:

| Eingang | Die Zeilen kommen aus | Schritt 5 schreibt |
|---|---|---|
| **A · Bestand** | einer id, einem Batch, `flagged`, den fälligen, einer Verdachtsliste | `UPDATE vocabulary` |
| **B · neu** | einer Quelle (PDF/Foto, Uni-Wien, TUNICO, Peace Corps, Ninja, Instagram) oder „ich brauche ein Wort für X" | `INSERT INTO vocabulary` |

**B mündet in A:** jedes Duplikat, das Schritt 1 findet, ist ab da eine Bestandszeile — sie wird geprüft und ggf. ergänzt, nicht ein zweites Mal angelegt. Das ist der Normalfall, nicht die Ausnahme: beim Test am 2026-09-13 existierten **alle fünf** angefragten Wörter bereits.

Die Schritte 2–4 sind für beide Eingänge wortgleich. Bis zum 2026-09-13 standen sie zweimal im Skill (PRECEDENTS.md → „Zwei Workflows waren einer").

### Schritt 1 — Zeilen bestimmen, Vorwissen lesen

**Eingang A — Auswahl:**

| Anlass | Auswahl |
|---|---|
| „Ich habe Vokabeln markiert" | `WHERE flagged = true` |
| **eine einzelne Vokabel** | `WHERE id = <id>` — genauso gültig wie ein Batch, kein Sonderweg |
| frisch importierter Batch | die ids des Batches |
| „prüf die fälligen" | `progress.next_review` — **das Fenster läuft von 03:00 Berlin bis 03:00 des Folgetags** (`nextReviewDE()`), nicht von Mitternacht:<br><br>`next_review` ist `timestamp WITHOUT time zone`, enthält aber **UTC**. 03:00 Berlin sind je nach Sommer-/Winterzeit 01:00 oder 02:00 UTC — deshalb **immer** über die Zeitzone rechnen, nie 03:00 hart hinschreiben:<br>`WHERE p.next_review >= (timestamp '<tag> 03:00' AT TIME ZONE 'Europe/Berlin') AT TIME ZONE 'UTC'`<br>`  AND p.next_review <  (timestamp '<tag+1> 03:00' AT TIME ZONE 'Europe/Berlin') AT TIME ZONE 'UTC'`<br>⚠️ Die harte Variante `timestamp '<tag> 03:00'` stand hier bis zum 2026-09-13 und ist **falsch**: sie vergleicht gegen 03:00 UTC = 05:00 Berlin und verliert die Zeilen, die zu Tagesbeginn fällig wurden. Gemessen am 2026-09-14: **67 statt 76**; im Winter **2 statt 9**. |
| Bestandsaudit | eine Verdachtsliste aus **CHECKS.md** |

**Eingang B — extrahieren, transliterieren, Duplikat-Check.** Gilt für JEDE Quelle; nur die Umwandlung der Quellen-Notation unterscheidet sich (Zielregeln: „Transliteration — Ziel-Konvention"; Quellen-Notation: IMPORTS.md).

1. **Vollständig extrahieren** (PDF/Foto-spezifische Extraktionstechnik: siehe IMPORTS.md). Nicht nur die offizielle Wortschatztabelle: Dialoge, Grammatik-Beispielsätze, Übungssätze, Bildunterschriften enthalten oft zusätzliche Wörter/Sätze und müssen genauso vollständig geprüft werden. Ganze Sätze gehören ebenfalls als eigene Zeile in `vocabulary` (topic="Phrasen"/"Ausdrücke"), auch wenn die Einzelwörter schon vorhanden sind.
2. **Transliterieren** nach Chat-Alphabet (siehe Ziel-Konvention unten), nie die Quellen-Schreibung 1:1 übernehmen.
3. **Duplikat-Check, alle drei Felder einzeln** (arabic_script, darija, german) — nie nur eins. Deutsch-Text-Suche allein reicht nicht (deutsches Gloss kann anders formuliert sein als erwartet) — immer zusätzlich nach der Ziel-Transliteration/dem Ziel-arabic_script suchen.
   - `arabic_script`: primärer Schlüssel. Kollision möglich bei unvokalisierten Formen — Bedeutung als Tiebreaker.
   - `darija`: Homographen beachten (Konjugationspaare sie/ich haben oft identische Transliteration — kein Duplikat, aber `german` muss Person klar benennen).
   - `german`: als eigenständige Suchanfrage, Synonyme mitdenken ("einfach"≈"leicht", "Lied"≈"Gesang", "Darlehen"≈"Kredit"). Bei Fund: als Auffälligkeit markieren, Entscheidung dem Nutzer überlassen.
     **Immer mit dem Wortstamm suchen, nie mit der Vollform, und den Stamm mit `\y` verankern.** Der Bestand glossiert Präsensverben als 3. Person Singular ("er hustet") — der Infinitiv "husten" kommt darin als Substring **nicht** vor und findet die Zeile nicht. Ohne `\y` kippt es in die andere Richtung: "neid" trifft achtmal "schneiden". Belegt am 2026-09-13, beide Fehler in einem Lauf:
     ```sql
     -- 'husten' → 0 Treffer, obwohl 3059 "er hustet" existiert
     -- 'neid'   → 8 Treffer, 7 davon "schneidet/Schneider/Schneidebrett"
     SELECT id, darija, german FROM vocabulary WHERE german ~* '\yhust';   -- richtig
     ```
     Gilt genauso für Nomen mit Umlaut/Fugen-s und für Adjektive: `\yeifersücht` statt "eifersüchtig".
   - Bei strukturierten Listen (Adjektiv-/Verb-Tabellen): zuerst ein Themen-Sweep gegen den passenden `topic`, nicht Wort für Wort.
   - **Duplikat-Check VOR jeder nachträglichen Schreibkorrektur, nicht erst danach** — eine Korrektur ist im Effekt ein neues `darija`. Wenn die *korrigierte* Schreibung bereits im Bestand existiert, ist die vermeintliche Schreibkorrektur in Wahrheit ein **Merge** und muss als solcher behandelt werden (Kurs-Verweise umbiegen, Felder zusammenführen, Dublette löschen) — sonst entsteht aus einer Reparatur eine neue Dublette. Zweimal am 2026-09-12 aufgetreten: `y3awid`→`y3awwed` traf die bestehende id 3442, `yit3asha`→`yit3ashsha` traf id 4029. Älterer Fall: `yisma7`→`yisma3` (PRECEDENTS.md → Duplikat-Check).
     ```sql
     -- vor JEDEM UPDATE auf darija laufen lassen:
     SELECT id, darija, german FROM vocabulary WHERE lower(btrim(darija)) = lower('<neue_schreibung>');
     ```
   - Bei einem Treffer: **Standard-Vorgehen bei gefundenem Duplikat** und **Weitere Duplikat-Fallen** (beide direkt unter Schritt 5) — die Zeile wechselt damit auf Eingang A.

**Beide Eingänge — EINE Sammelabfrage, bevor ein Korrekturplan gebaut wird** (bei B über die ids der Duplikat-Treffer). Sie beantwortet „was weiß ich über diese Zeilen schon?", und zwar bevor ich etwas vorschlage:
```sql
SELECT id, darija, german, flagged, partner_status, partner_comment, internal_note, ninja_checked_at
FROM vocabulary WHERE id IN (<alle ids>);
```
Drei Dinge daraus ernst nehmen:
- **`internal_note`** hält fest, was frühere Sitzungen an dieser Zeile schon geprüft haben — inklusive der übernommenen Ninja-Check-Begründungen (`[Ninja-Check <datum>] …`). Ein „kein Quellentreffer, zur Kenntnis genommen" heißt: **nicht nochmal suchen**, das ist erledigt.
- **`partner_status`** ist Semias Spur. `pending` heißt: von ihr **nie bestätigt** — bei einem Bedeutungszweifel das stärkste Signal im Datensatz (Präzedenzfall `710 el-manshir`). `approved` heißt: von ihr bestätigt, eine Bedeutungsänderung braucht dann einen sehr guten Grund.
- **`partner_comment`** ist ihr Freitext.

### Schritt 2 — Intern prüfen (kostenlos, kein Netz)

Deckt eine andere Fehlerklasse ab als der externe Abgleich: eine Vokabel kann extern bestätigt und trotzdem kaputt transliteriert sein. **Vor** Schritt 3.

**Zuerst im Trainer nachsehen** (*Mehr → Prüfungen*, Zahl auf *Lernen*): Er prüft die Gruppe-A-Regeln und mehr gegen den geladenen Bestand und soll auf 0 stehen. Die SQL-Abfrage unten ist die Gegenprobe.

**Eingang A — eine Abfrage, unabhängig davon, wie groß die Auswahl ist:**
```sql
SELECT * FROM public.qualitaets_checks WHERE gruppe = 'A' AND treffer > 0;
```
Ist das Ergebnis leer, ist **jede** Auswahl sauber: ein Check, der bestandsweit nicht trifft, trifft auch die eigenen Zeilen nicht. Die Sicht auf eine Auswahl einzuschränken ist damit unnötig — und wäre auch nicht möglich, `erste_ids` ist bei 15 gekappt. Nur wenn ein A-Check trifft, muss man diesen einen Check mit `id IN (…)` nachziehen.

**Eingang B — die Sicht kennt die vorgeschlagenen Werte nicht**, sie stehen ja noch nicht in `vocabulary`. Stattdessen die Ableitung gegenhalten:
```sql
SELECT public._arabic_to_chatalpha('<vorgeschlagenes arabic_script>');
```
Weicht das Ergebnis in einem **Konsonanten** oder in einer **Verdopplung** von der vorgeschlagenen `darija` ab, ist eines von beiden falsch. Reine Vokalunterschiede sind normal und kein Befund (Begründung bei `chatalpha_konflikte` unten).

Ist die Vokabel ein **Verb**, zusätzlich das 3-Zeilen-Modell (siehe „Verb-Konjugationsmodell"): Verb-Selbstcheck zuerst, dann den Bestand per Konsonantenskelett nach Präsens- UND Vergangenheits-Grundform durchsuchen — auch unter Alt-Topics und `topic IS NULL`. Präzedenzfall 2026-09-12: `y7jem` (3614) galt als „eine Zeile, Tabelle dran, fertig"; tatsächlich fehlten 2 von 3 Zeilen. Fehlende Zielzeilen werden **als Vorschlagsliste gezeigt, nicht geschrieben**.

### Schritt 3 — Extern prüfen: alle drei Quellen, nicht nur die erste

**Nicht überspringen, auch wenn Schritt 2 sauber war.** Die internen Checks vergleichen `darija` gegen `arabic_script` — sie können prinzipbedingt nicht sehen, ob die **Bedeutung** stimmt. Eine Zeile kann durch jeden A- und B-Check laufen und trotzdem das Falsche lehren. Präzedenzfall aus dem Stichprobentest 2026-09-13: `710 el-manshir` ist als „Korridor / Flur" glossiert, TUNICO hat `manšiṛ` = „Platz zum Wäscheaufhängen, Hof im Küchenflügel" — alle internen Checks sauber, 4 richtige gegen 15 falsche Antworten im Lernverlauf.

1. `derja_ninja_entries` — schnell, aber ein Snapshot (2026-08-17), bei mehrteiligen Begriffen oft unvollständig
2. `tunico_import` — liefert das volle Bedeutungsspektrum, wo Ninja nur eine Facette zeigt
3. `peacecorps_dict_import` — dritte unabhängige Quelle, v.a. bei älterem Lehrbuchvokabular

**Vierte Quelle, immer verfügbar: die arabische Morphologie.** Die drei Offline-Quellen sind Wörterbücher — sie führen Lemmata, keine Paradigmen. Wo eine Form aus dem Wurzelmuster folgt (Imperativ, Partizip, Maß-Zugehörigkeit, assimilierte/hohle Wurzeln), ist sie ableitbar und braucht keinen Wörterbucheintrag: `وَقَفَ → يَقِفُ → قِفْ` (das و fällt im Imperfekt und Imperativ weg). „Kein Treffer in den drei Quellen" ist dort **keine** Begründung zum Zurückstellen (PRECEDENTS.md → „Die Morphologie ist auch eine Quelle"). Über **Bedeutung** entscheidet sie dagegen nichts.

Erst wenn **keine** der drei trifft, gilt „keine externe Bestätigung". Werkzeug für alle drei: **vocab_lookup** (LOOKUP.md) — `english_key` als primäre Achse, Skelett-Treffer nur separat und ab Länge 4. Live-Ninja nur, wenn offline nichts kommt (IMPORTS.md).

**Bei Gemination-Zweifeln: die Wurzelfamilie im eigenen Bestand durchsehen.** Der stärkste Beleg ist oft nicht die Quelle, sondern die Geschwisterzeile. Für `1841 thiz` entschieden drei eigene Zeilen (`1683 hazz` هَزَّ, `2228 yhizz` يُهِزُّ, `2472 hezz` هِزّ) die Frage — und die Suche fand dabei eine **vierte** Zeile mit demselben Fehler (`1684 nihiz`), die kein Check gemeldet hatte. Ninja und Peace Corps vokalisieren Endgeminaten oft unvollständig (`هِزْ`, `hiz`, `أقَلْ`) und sind dort **kein** Gegenbeleg.

**Zwei Durchgänge, nicht einer (gemessen 2026-09-13).** Die `chatalpha`-Achse trifft nur die **Oberflächenform**. Flektierte Formen, Possessive und Phrasen haben in keinem Wörterbuch einen eigenen Eintrag — `7dhart` „ich nahm teil", `ftouri` „mein Frühstück", `yimshiw` „sie gehen" können dort gar nicht stehen. Im Test trafen so nur **5 von 19** Zeilen; ein zweiter Durchgang über die **Grundform** (Verb-Grundform, Singular, Wort ohne Suffix) belegte 6 weitere. Ohne diesen zweiten Durchgang sieht eine korrekte Zeile wie „keine externe Bestätigung" aus.

Drei Fallen, jede schon einmal zugeschlagen:
- **Die Lautschrift jeder Quelle ist ein Strukturhinweis, keine Vorlage.** Vor dem Vergleich die Tabelle **Quell-Konventionen** lesen — sie sagt, welche Abweichung nur Konvention ist (und damit kein Befund) und welche zählt. Prüfen, ob die Quelle ein übersehenes Feature zeigt (v.a. Gemination), aber nie 1:1 übernehmen. `touwl` ist so in den Bestand gerutscht, richtig ist `toul`.
- **Ein Skelett-Treffer ist kein Wort-Treffer.** `nimshiw` „wir gehen" trifft نْمَشْ „freckles". Bedeutung gegenlesen, nicht nur das Skelett.
- **Gleiches Arabisch heißt nicht „Dublette"** — es kann auch heißen, dass eine der Zeilen inhaltlich falsch ist (Präzedenzfall `metrobbi`, PRECEDENTS.md).

**„Kein Beleg“ und „die Quelle hat dazu keine Regel“ sagt man erst nach der Suche — und nennt, wo gesucht wurde (Nils, 2026-11-03).** Zwei Fehler in einer Sitzung: Das Skript hat zu `farkis` (Lektion 13, Vierradikalige Verben) und zu `tghashshish` (Lektion 14, V. Stamm, geminiert) eine vollständige Tabelle; beide Male war vorher „keine Quelle“ behauptet worden, und die Karte wurde auf die schwächere Seite (die Vokabeltabelle) angeglichen. Vor jeder Aussage „kein Beleg“, „keine Regel“ oder „abgeleitet“ gilt deshalb:
- **Immer zuerst über die Bedeutung suchen, nicht nur über die Schreibweise (Nils, 2026-11-04).** Die Quellen schreiben anders als wir (`daq` bei uns, `thaq` in TUNICO, `th9` bei Ninja; `tlazzit` bei uns, `tlazz` in TUNICO, `tlaz` bei Ninja), und die Wurzel ist oft nur über ein Verbalnomen oder Partizip da (`saq` „fahren" steht in TUNICO nur als `suqan` und `sayaq`). Fünf Verben waren in einer Sitzung als „ohne Quelle" gemeldet, bis die Suche nach der deutschen und englischen Bedeutung sie fand: `ninja.english`, `tunico_import.senses` (`de`), `peacecorps_dict_import.senses`, dazu `root_chatalpha` in TUNICO. Erst wenn auch das leer ist, gilt „kein Beleg" — und für Alltagsverben bringt die Websuche praktisch nichts, die ersten Seiten sind allgemeine Artikel über das Tunesische oder automatisch erzeugte Wortlisten, die nicht tunesisch sind. Das ist kein Beleg.
- **Skript über alle Lektionen** durchsuchen (`course_lessons.grammar_notes`, nicht nur die Lektion der Karte; Stamm-Kapitel liegen in Lektion 13 und 14) — mit `position('wort' in grammar_notes)` und `substr`, nicht mit einem Regex über Zeilenumbrüche. Das Skript hat auch Abschnitte, die nach Schlüsselwort statt nach Verb heißen: `yilzim` / `lazim` „müssen" steht in Lektion 10 mit Personenendungen, nicht als Konjugationstabelle.
- **TUNICO** doppelt: `tunico_corpus_verbs` (Formenlisten) und `tunico_corpus_wordforms` (Einzelformen mit Lemma), dazu `tunico_import` (Bedeutung, Wurzel).
- **Ninja** (Lemma und Beispielsätze, auch `example_darija` mit der Schreibung ohne Vokale), **Peace Corps** (`peacecorps_dict_import`, `peacecorps_grammar_import`) und **SL24** (`sl24_inhalt`).
- Die Antwort an Nils nennt, **welche Quellen gefunden und welche leer waren**. „Nur im Skript“ ist ein Beleg, kein Mangel.
- Gilt auch, bevor man eine Karte an die Vokabeltabelle (oder umgekehrt) angleicht: erst die Quelle, dann die Seite.

**Konjugationstabellen gegen die Quellen prüfen — was die Quellen wirklich hergeben (Nils, 2026-11-04).** Eine Sitzung hat Tabellen, Karten und Zeilen verglichen; diese Punkte kosteten jeweils einen Fehler:
- **TUNICO hat keine Konjugationstabellen.** `tunico_import.inflected` ist nur beim Präsens 3. Sg. systematisch getaggt (`#v_pres_sg_p3`); `tunico_corpus_wordforms` und `tunico_corpus_verbs` enthalten Formen **ohne Personen- oder Tempusangabe**. Eine Form dort (z. B. `waqfu` unter `wqif`) belegt nicht, welche Zelle sie füllt. Vor „TUNICO belegt X als Imperativ" das Tag prüfen; `waqfu` war das Perfekt 3. Pl.
- **Ninja führt ein Stichwort ohne Tempoangabe** und zitiert Form II mit dem Imperativ-/Präsensstamm (`lawwij`, `naggiz`, `sakkir`), Form I mit dem Perfekt (`tba3`, `rbat`). `ڨ` steht dort als `g`, `ق` als `9`: bei der Suche `q`, `g` und `9` probieren (`naqqaz` = `na99iz`/`naggiz`).
- **Exakte Schreibweise reicht für die Suche nicht.** Quellen schreiben `3sar` für unser `3asser`. Mit `translit_skeleton`, mit den Konsonanten allein und über die Wortform-Tabelle suchen, dann Bedeutung gegenlesen.
- **Karten mit `meta.beleg = 'abgeleitet'` belegen nichts.** Sie sind selbst nach einer Regel erzeugt. Eine Tabelle an so eine Karte anzugleichen ist kein Quellenabgleich.
- **Präsens Plural starker Verben lässt den Stammvokal aus** (Skript Lektion 2: `yikhdim → yikhdmu`, `yakol → yaklu`; TUNICO: `yuq3du`, `nurqdu`, `nilbsu`). Der Imperativ Pl. ebenso (Lektion 3: `ism3u`, `iktbu`, `ushrbu`). Bleibt in einer Tabelle der Vokal, ist das ein Befund.
- **Geminierte Verben mit `e`/`o` im 3. Sg. neben `i`/`u` sonst** (`y7ell/t7ill`) waren ein Mischmuster aus der Hausschreibung; Skript, TUNICO und Ninja schreiben durchgehend `i/u`. Seit 2026-11-04 einheitlich `i/u` (y7ill, yrudd, yquss, ylawwij), Doppelkonsonant bleibt (`n7ebb`, `y7ibbu`).
- **Eine Tabelle pro Verb, Zeile = Wort in der Tabelle.** Ändert sich eine Form, gehören die Zeilen mit genau dieser Form umbenannt (Lernstand hängt an der ID), und die Karten mit der alten Form mit.
- **TUNICO hat bei Konsonanten und Verbmustern Vorrang (Nils, 2026-11-04), die Zeilenschreibung bei drei Konventionen.** Gemessen an rund 6.400 Wortpaaren (TUNICO-Lemma gegen unsere Zeile, gleiche Konsonantenfolge): 95 % haben nach der Umrechnung identische Konsonanten, der Rest weicht nur in diesen Punkten ab, und die sind **kein Befund**:
  - **`g` in TUNICO = `q` bei uns** (TUNICO schreibt die Aussprache: `magruna`, `gribi`; wir den arabischen Buchstaben ق: `maqrouna`, `qrib`).
  - **`ḏ̣`/`ẓ` in TUNICO = `dh` oder `th` bei uns.** TUNICO unterscheidet ض und ظ nicht (`xḏ̣āṛ`); die Entscheidung trifft der arabische Buchstabe unserer Zeile (`khodhra` = ض). Ein `th` in TUNICO gegen ein `dh` bei uns zeigt nur, dass die Quelle die beiden Buchstaben zusammenlegt.
  - **`e` und `o`** kennt TUNICO nicht (nur `a i u`); unsere Imala-Vokale bleiben.
  Was TUNICO dagegen liefert und übernommen wird: Konsonantenfolge, Stammvokal des Präsens (`yukhlus` statt `yikhlus`), Pluralbildung (Vokal fällt aus), Verbmuster. Bei Verben **über die Wurzel** (`root_chatalpha`, Verbalnomen, Partizipien) suchen, nicht nur über das Lemma: `saq` „fahren" steht nur indirekt da (`suqan`, `sayaq`, Wortform `sqt`).
- **Antwort an Nils:** pro Verb nennen, welche Quellen **gefunden und welche leer** waren, und Formen, die nur nach Hausmuster abgeleitet sind, in `internal_note` als solche markieren.

### Schritt 4 — Zeigen und warten

Immer, ausnahmslos, vor jedem Schreiben: betroffene Zeilen mit Ist-Wert, Soll-Wert und Beleg. Bei Unsicherheit `AskUserQuestion` statt raten.

Bei Eingang B tabellarisch: Arabic, Darija, Deutsch, lesson_id, topic; Auffälligkeiten und Rückfragen gesammelt am Ende, nicht verstreut. Kein SQL ohne Bestätigung.

### Schritt 5 — Schreiben

**Eingang A → `UPDATE vocabulary`.** Ein Pfad, kein Vorschlags-Zwischenspeicher: **was in Schritt 4 gezeigt und bestätigt wurde, wird direkt geschrieben.** (Die frühere Vorschlagstabelle `vocabulary_review` ist seit dem 2026-09-13 weg — PRECEDENTS.md → „vocabulary_review abgeschafft".)

**Eingang B → `INSERT INTO vocabulary`**, mit `topic` (Pflichtfeld, Claude entscheidet selbst — keine Rückfrage, siehe „Topic") und `lesson_id` (siehe Datenregeln, nie hardcoden).

War die Zeile **geflaggt** (🚩 von Nils beim Lernen), gehört zum Schreiben zusätzlich:
- `flagged = false` — der Auftrag ist erledigt
- `ninja_checked_at = now()`, wenn extern gegengeprüft wurde
- **die Begründung angehängt** an `internal_note` — nie überschreiben, immer `concat_ws(' ', internal_note, '<neue Zeile>')`. Das ist jetzt das Gedächtnis, das vorher `change_reason` war.

Bei Eingang B gehört dieselbe Begründung in die `internal_note` der neuen Zeile.

**Was in `internal_note` gehört**, kurz und in dieser Reihenfolge: Datum, was entschieden wurde, woher der Beleg kommt, und ausdrücklich **was Beleg und was Ableitung ist**. Beispiel aus der Praxis:

> `2026-09-13: arabic_script gesetzt — "babab" = بَابَابْ ist von Derja Ninja belegt (INTERJ). Das vorangestellte "aba" hat in KEINER der drei Quellen einen Beleg und ist als أَبَا abgeleitet, nicht belegt.`

**Wenn keine Quelle etwas hergibt**, ist das ein Ergebnis und kein Versäumnis — als solches festhalten, damit die nächste Sitzung nicht dieselbe Suche wiederholt:

> `2026-09-13: keine Treffer in allen drei Quellen — Negationsform, Grammatik-Paradigma. Ninja ist ein Wörterbuch, erwartbar kein Eintrag. Nicht erneut suchen.`

**Was NICHT geschrieben wird, sondern gefragt:** eine Bedeutungsänderung an einer Zeile mit `partner_status = 'approved'`; das Anlegen neuer Zeilen (zwei getrennte Fragen, siehe „Fehlende Zielzeilen nachlegen"); alles, wo Schritt 3 keine eindeutige Quellenlage ergeben hat.

**Der Rückkanal von Nils** läuft über `vocabulary.partner_comment` und `partner_status` (Semias Prüfmodus im Trainer) — nicht mehr über eine eigene Tabelle. In Schritt 1 wird beides mitgelesen.

**Am Ende jeder Runde: ein Vorschlag, was als Nächstes drankommt** (Wunsch Nils, 2026-09-13). Nicht eine Liste offener Posten, sondern **einer** — der mit dem besten Ertrag pro Aufwand, kurz begründet. Der Nutzer soll „ja" sagen können, statt selbst auswählen zu müssen.

**Nach dem Schreiben, Pflicht unaufgefordert** — immer bei Eingang B, bei A sobald `darija` oder `arabic_script` verändert wurde:
1. Duplikat-Check UND Transliterations-Check laufen lassen: App-eigener „🔍 Duplikat-Prüfung"-Tab, oder bei Live-Zugriff das SQL aus **CHECKS.md** selbst nachbauen — gründlicher als Ad-hoc-Stichproben vorher.
   **Die Kollisionsprobe muss die bereits vokalisierten Zeilen einschließen**, nicht nur die unvokalisierten: sonst wird ein neu vokalisierter Wert identisch mit einem bestehenden und reißt Gruppe-A-Check 10 auf (passiert 2026-09-15 mit `1522`/`4111`).
   **Und: eine Korrektur deckt regelmäßig eine verdeckte Dublette auf.** Dreimal an einem Tag passiert — `1174`/`252` (der Schrägstrich hielt den Schlüssel auseinander), `1819`/`3897` (die falsche Schreibung verdeckte den Zwilling), `1522`/`4111` (erst die Vokalisierung machte beide gleich). Das ist kein Unfall, sondern die erwartbare Folge: wer eine Schreibung korrigiert, führt sie mit der bereits korrekten Zwillingszeile zusammen. Vor dem Schreiben mitdenken, nach dem Schreiben prüfen.
2. Bedeutungsfacetten-Check gegen `tunico_import`/`tunico_corpus_*` (Methodik: IMPORTS.md → TUNICO) — für JEDE Quelle, nicht nur TUNICO-eigene Batches.
3. Nur bei neuen Zeilen: **`vocab_lesson_refs` und `progress` aktualisieren**, siehe COURSE_MODE.md → Kurs-Verknüpfung.

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
- **Drei Vergleichsstufen fürs Arabische — die mittlere ist die richtige (gemessen 2026-09-13).** Bytes finden nichts (`قصّ` ≠ `قَصّ`, so ist `1681 qas`/`4544 qass` jahrelang durchgerutscht), das Konsonantenskelett findet zu viel (465 Gruppen, meist ganze Wurzelfamilien wie `kteb`/`katib`/`ktob`). Richtig ist **`ar_key`** = Buchstaben ohne Harakat: `btrim(regexp_replace(arabic_script,'[ًٌٍَُِّْٰٟ]','','g'))` — 87 Gruppen, überwiegend echte Homonympaare. Das ist Check 31.

**Vokal-Varianten-Falle:** reine Substring-Suche auf die geplante Transliteration fängt Vokalvarianten nicht ab (`ghurbal`/`ghorbel`, a↔o). Bei a/e/i/o-Unsicherheit zusätzlich eine plausible Variante mitsuchen oder direkt den SQL-Skelett-Check (unten) nach dem Schreiben laufen lassen.
- Nicht nur die Transliteration kann falsch sein — manchmal ist `arabic_script` selbst fehlerhaft. Vor einer arabic_script-Korrektur: Bedeutung/Etymologie des Wortes selbst als Beleg heranziehen (eigener Gloss, verwandte Bestandswörter), nicht raten.
- Bei echter Buchstaben-Identitäts-Unsicherheit (ط vs. ث, ض vs. ظ): Derja Ninja als Tiebreaker nutzen, nicht raten oder nur der akademischen Quellen-Umschrift vertrauen.

### `german`-Feld: „/" vs. „;"

„/" NUR für echte Synonyme/alternative Formulierungen derselben Bedeutung, sonst „;". Grund: `checkAnswer()` (trainer.html, Zeile ~440) macht `answer.split(/\s*\/\s*/)` und akzeptiert JEDE der Teile als richtige Antwort — bei echten Synonymen gewollt, bei tatsächlich unterschiedlichen Bedeutungen ein Bug (falsche Übersetzung würde als richtig akzeptiert). Semikolon `;` wird von `checkAnswer()` nicht speziell behandelt, ist also der richtige Trenner für „mehrere unterschiedliche Bedeutungen".

**In der `darija` gilt dasselbe — und dort ist die Klammer eine Falle.** `normalize()` wirft Klammerinhalte ersatzlos weg, bevor verglichen wird. Eine Variante in Klammern (`labes (lbes)`) wird deshalb als **falsche Antwort** gewertet; am 2026-09-13 an vier Zeilen gemessen und auf `/` umgestellt. Klammern in der `darija` sind nur für Anmerkungen zulässig — und die gehören eigentlich ins `german` (Check 29).

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
| ڨ / گ | g | degla, gatouw, glas, garra3 | q — **eigener Buchstabe, nicht ق** (Ninja schreibt ihn in 319 von 319 Zeilen `g`) |
| خ | kh | khobz, khatir | – |
| غ | gh | ghali, maghrib | – |
| ط | t | tawla, tbib | T (kein Großbuchstabe) |
| ص | s | sbe7, sabbati | S (kein Großbuchstabe) |
| ض | dh (eigene Kategorie, seit 2026-08-06) | dhayyaq, abyadh | d oder th — Begründung: PRECEDENTS.md → Uni-Wien |
| ظ | th (ausnahmslos, seit 2026-08-07) | tholl, thabt, thhar (Rücken), la7tha (Moment) | dh oder bloßes d |
| ذ | th (ausnahmslos, seit 2026-08-07) | thekkra, thra3 (Arm), hetha (das/dieser), kaththab (Lügner) | dh oder bloßes d |
| ث | th | thletha, thmenya | – |

**Lehnwörter: v = ڤ, p = پ oder ب, g = ڨ** — nie ف für v oder غ/ق/ج für g (2026-11-07 an 14 Zeilen vereinheitlicht; Trainer-Prüfung „Lehnwort: v/g …“, Ausnahmen in `VG_OK` mit Grund, z. B. *original* mit ج).

Keine Großbuchstaben in darija — weder als Emphase-Marker noch am Satzanfang. Durchgehend kleingeschrieben.

**Gemination eines Digraphen: der ganze Digraph wird verdoppelt.** Bei Schadda auf ض/ظ/ذ/ش/خ/غ wird nicht nur der erste Buchstabe gedoppelt: `dhdh`, `thth`, `shsh`, `khkh`, `ghgh` — nie `ddh`, `tth`, `ssh`, `kkh`, `ggh`. Ebenso `77` für geminiertes ح, nie `7h`. Belegt an drei unabhängigen Quellen, null echte Gegenbeispiele im Bestand; die Zählungen stehen in PRECEDENTS.md → Digraph-Gemination.

⚠️ **Dieselbe Buchstabenfolge ist an einer Morphemgrenze richtig.** `tth` = `t` + `th` (تَذْبَحْ → `tthba7`, نِتْثَاوَب → `netthaowb`), `7h`/`thh` = echte ح+ه bzw. ظ+ه (ظهر → `thhar` „Rücken", يظهرلي → `ythhar-li`). Diese Zeilen sind korrekt und dürfen **nicht** „korrigiert" werden — in `qualitaets_checks` Nr. 8 sind die vier belegten Fälle deshalb ausgeschlossen. **Entschieden wird immer am `arabic_script`**: Schadda → verdoppeln, zwei getrennte Buchstaben → so lassen.

**Selbsttest für jede vermutete Digraph-Gemination:** `public._translit_skeleton(darija)` gegen `public._arabic_skeleton(arabic_script)` halten. `7addhar` ergibt `7ddhr`, حَضَّر ergibt `7dhdhr` — die Skelette widersprechen sich, also ist die Transliteration falsch. Mit `7adhdhar` ergeben beide `7dhdhr`.

### Vokale & häufige Wörter

**Vokallänge wird nicht geschrieben, nur angezeigt (seit 2026-11-07).** In `darija` gibt es kein ā/ī/ū; der Trainer liest die Länge aus dem vokalisierten `arabic_script` (`laengeHtml()`/`trL()` in `trainer.html`) und markiert sie in der Anzeige (khtārit, shrāb „Alkohol“ gegen shrab „er trank“). Langes a wird zusätzlich nach Klang unterschieden: **ā dunkel** neben ص ض ط ظ ق خ غ ر ح ع (shrāb, nhār, sā3a), **ǟ hell** sonst (shǟf, bislǟma) — Aussprache Tunis. Unsere Schreibung `a`/`e` bildet hell/dunkel nicht verlässlich ab (2026-11-07: bei hellen Nachbarn 309× a gegen 127× e); dafür ist die Anzeige da, nicht die Daten. Eingabe und Antwortprüfung bleiben unverändert. Passt die Zahl der Vokalstellen im Arabischen nicht zu den Vokalgruppen der Umschrift, bleibt die Anzeige unmarkiert — eine falsche Länge in der Anzeige heißt also meist: Arabisch prüfen. Regel dahinter: kurzer Vokal rückt bei Endung mit Vokal nach vorn (ktib → kitbit), langer bleibt stehen (khtār → khtārit) und wird vor Endung mit Konsonant kurz (khtart).

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

### Quell-Konventionen — was die drei Quellen anders schreiben

**Keine der drei Quellen schreibt unser Chat-Alphabet.** Diese Tabelle ist die eine Stelle, an der steht, was beim externen Abgleich (Schritt 3) als Quellen-Konvention zu erwarten ist. **Jede Abweichung, die hier erklärt ist, ist KEIN Befund** — nur was hier nicht steht, ist einen Blick wert. Die vollständige Quell→Ziel-Umwandlung beim *Import* einer Quelle steht weiterhin in IMPORTS.md; hier geht es nur ums *Lesen* der Quellen.

Zahlen gemessen am 2026-09-13 über 17.335 Ninja-, 7.008 TUNICO- und 8.714 Peace-Corps-Zeilen (`forms_phonetic`-Einzelformen).

| Laut / Feature | Ninja (`darija`) | TUNICO (`lemma_orig` → `_chatalpha`) | Peace Corps (`forms_phonetic`) | wir |
|---|---|---|---|---|
| ع | `3` | `ʕ` → `3` | `3` | `3` |
| ح | `7` | `ḥ` → `7` | **`H`** (Großbuchstabe) | `7` |
| ق | **`9`** (`q` kommt 0× vor) | `q` → `q` | `q` | `q` |
| خ | **`5`** | `x`/`ḫ` → `kh` | **`x`** (nicht `kh`) | `kh` |
| ش | **`ch`** | `š` → `sh` | `sh` | `sh` |
| غ | `gh` | `ġ` → `gh` | `gh` | `gh` |
| ص | `s` | `ṣ` → `s` | **`S`** (Großbuchstabe) | `s` |
| ط | `t` | `ṭ` → `t` | **`T`** (Großbuchstabe) | `t` |
| ء | **`2`** | `ʔ` → entfällt | – | entfällt |
| Langvokal | `aa`, `iy`, `ouw` | Makron `ā ī ū ē ō` → ohne | **`:`** hinter dem Vokal (`thla:tha`) | keine Markierung |
| Damma | `ou` | `u` | `u` | `ou` / `o` |
| **Vokalinventar** | nur `a i ou` — **`e` 0×, `o` ausschließlich in `ou`** | praktisch nur `a i u` (`e` 27×, `o` 46× von 7.008) | praktisch nur `a i u` (`e` 101×, `o` 21× von 8.714) | `e` in 32 %, `o` in 23 % der Zeilen |
| eigenes `arabic_script` | ja, vokalisiert — **einzige verlässliche Arabisch-Quelle** | keins | bewusst leer; `arabic_script_reconstructed` ist unsere eigene Ableitung, keine Quelle |  |

**Konsequenz 1 — eine Vokalabweichung gegen eine Quelle ist nie für sich genommen ein Befund.** Keine der drei schreibt je ein `e`, und Ninja kennt kein freistehendes `o`. Unser `berid`, `hetha`, `wsil` *muss* dort anders aussehen; das ist kein Vokalisierungsfehler, sondern der fehlende Buchstabe im Alphabet der Quelle. Ein Befund entsteht erst bei einer **strukturellen** Abweichung — fehlende Silbe, anderer Konsonant, andere Gemination (Lautlehre-Regel 1). Präzedenzfall: das externe Prüfprotokoll wollte `487 wsil` wegen der Fatha zu `wsel`/`wsal` ändern — TUNICO (`wṣil`) und Peace Corps (`wSil`) schreiben beide genau unsere Fassung.

**Konsequenz 2 — bei ض/ظ/ذ beweist ein `dh` in Ninja oder Peace Corps gar nichts.** Gemessen an den Zeilen, in denen unser `arabic_script` den Buchstaben enthält:

| unser Zeichen | Ninja | TUNICO (`_chatalpha`) | Peace Corps |
|---|---|---|---|
| `dh` = ض | `dh` (712 : 11) | `dh` — aber nur 5 Lemmata enthalten ḍ überhaupt | `dh` (29 : 0) |
| `th` = ظ/ذ | **uneinheitlich: `th` 327 : `dh` 191** | `th` (528 : 1) | **immer `dh` (20 : 0)** |
| `th` = ث | `th` | `th` | `th` (24 : 0) |

Peace Corps kennt für ظ/ذ nur `dh` (dokumentiert in `arabic_reconstruction_note`), Ninja schwankt in 38 % der Fälle. **Nur TUNICO kann unsere ausnahmslose ظ/ذ→`th`-Regel bestätigen oder widerlegen** — ein `dh` der beiden anderen ist Konvention, kein Gegenbeleg, und darf keine Korrektur auslösen.

**Konsequenz 0 — die Umrechnung ist vorberechnet, nicht jedes Mal von Hand zu machen (seit 2026-09-13).** Alle drei Quellen haben in `vocab_lookup` eine Spalte **`chatalpha`** in unserer Konvention: TUNICO 94 %, Peace Corps 98 %, Ninja 95,6 % (neu — abgeleitet aus dem vokalisierten `arabic_script` per `public._arabic_to_chatalpha()`). **Die Tabelle unten ist ab jetzt Hintergrundwissen, kein Arbeitsschritt** — eine Regel, die bei jedem Nachschlagen angewendet werden muss, wird irgendwann vergessen; eine Spalte nicht.

Dabei gilt für alle drei dieselbe Wertigkeit:

> **`chatalpha` ist konsonanten-verbindlich und vokal-hinweisend.** Konsonanten und Gemination stimmen; die Vokale sind mechanisch (Fatha→`a`, Kasra→`i`, Damma→`o`) und tragen unsere Imala nicht. **Ein Konsonantenunterschied gegen `chatalpha` ist ein Befund. Ein Vokalunterschied ist keiner.**

Damit wird aus einer Ermessensfrage ein Vergleich, und der läuft in SQL statt im Kopf — es kommen nur noch die Zeilen zurück, bei denen wirklich etwas nicht stimmt.

**Konsequenz 3 — für eine Ninja-Suche muss die eigene Schreibung erst umgerechnet werden** (`script=transliterated` konvertiert die Eingabe intern zu Arabisch): `sh`→`ch`, `q`→`9`, `kh`→`5`, `u`/`o`→`ou`. Unser `yukhruj` wird zu `you5rouj`, `yaqli` zu `ya9li`. Bei `script=english` entfällt das. Volle Tabelle: IMPORTS.md → Abgleich mit Derja Ninja.

## Lautlehre — Zusatzregeln für Vokalisierung & Bestandsaudits

Aus der Uni-Wien-Lautlehre abgeleitete Prüfregeln, immer anwendbar wenn `arabic_script` neu vokalisiert oder gegen eine externe Quelle abgeglichen wird:

1. **Vokalqualität a/e und i/e (Imala) ist meist kein Fehler.** Fatha/Kasra werden je nach Umgebung mal als "a"/"i", mal als "e" ausgesprochen (حَارْ→"7ar" aber بَارْد→"berid", derselbe Fatha-Laut). Nur bei strukturellen Abweichungen (fehlende Silbe, anderer Konsonant, anderes Vokalmuster) nachhaken.
2. **Gemination (Schadda) muss sich im Doppelbuchstaben spiegeln.** كَبُّوطْ→"kabbout" ✓. Doppelter Konsonant ohne Schadda (oder umgekehrt) → möglicher Vokalisierungsfehler.
3. **Schadda-Gültigkeitsprüfung.** Nie auf dem ersten Buchstaben eines Wortes, nie auf einem reinen Langvokal-Buchstaben (ا) — beides ist ungültig und ein Warnsignal für kaputte Quelldaten. **Zeichenreihenfolge:** trägt derselbe Konsonant Schadda *und* ein Vokalzeichen, steht das **Vokalzeichen zuerst** (824 Zeilen so, seit Runde 68 ausnahmslos). Nicht zu verwechseln mit **Schadda + Sukun** (`مُرّْ` = `morr`, 17 Zeilen): das ist ein wortfinaler Doppelkonsonant ohne Vokal und völlig korrekt. Wer beides in einem Regex zusammenfasst, zählt 26 statt 9.
4. **"Vollständig vokalisiert"** heißt: jeder Konsonant hat Harakat oder Sukun. Ein Wort mit nur einem Schadda, sonst ohne Fatha/Kasra/Damma, ist unvollständig.
5. **Maß-I- vs. Maß-II-Verwechslung bei Verben aus externen Quellen.** Unsere Vergangenheitsform (3. Pers. m. Sg., Maß I) ist die Grundform. Externe Quellen listen oft die kausative Form (Maß II, mit Schadda) oder eine Nomen-Ableitung — gleiches Konsonantenskelett, andere Bedeutung (دَخِّلْ "hineinstecken" statt دْخَلْ "er trat ein"). Vor Übernahme immer Wortart/Verb-Maß gegen die deutsche Bedeutung prüfen, reiner Skelett-Match reicht nicht. Keine passende Variante in der Quelle → ausschließen, nicht raten.
6. **Hamza (ء) ist ein eigener Laut, kein "3".** Bei anlautendem Vokal ohne erkennbaren Konsonanten prüfen, ob eigentlich أ gemeint ist.
7. **s ist immer stimmlos, z immer stimmhaft** — bei Unsicherheit explizit gegenchecken.
8. **Betonungs-Algorithmus:** einsilbige Wörter immer betont; auslautender Vokal nie betont (außer einsilbig); genau ein schwerer Vokal → betont; mehrere schwere Vokale → der letzte.
9. **Kolloquiale Vokal-Elision nur bei markiertem Sukun.** Reduktion nur dort, wo das Arabische selbst ein Sukun trägt (قْوِيَّة→"qwiyya"). Eine markierte Fatha/Kasra/Damma wird nicht gestrichen, auch wenn die Aussprache subjektiv reduziert klingt (صَيْدَلِيَّة→"sidaliyya").
10. **Länderadjektiv vs. Ländername** ist eine Unterkategorie von Regel 5 — Konsonantenskelett-Match reicht nicht, Wortart genau prüfen.
11. **Die eigene `darija` ist NIE das Vokalisierungsziel** (2026-09-15). Naheliegend wäre, das `arabic_script` so zu vokalisieren, dass `_arabic_to_chatalpha()` genau unsere `darija` zurückgibt — dann macht die Vokalisierung nur explizit, was wir ohnehin behaupten. **Gegenprobe an den 2.461 handvokalisierten Einzelwortzeilen: nur 554 hätte dieses Verfahren reproduziert.** Grund: unsere `darija` ist eine **verkürzte** Umschrift und lässt Vokale weg, die das Arabische braucht — قَلَم („qalam") steht bei uns als `qlam`, أَرْبَعَة („arba3a") als `arb3a`. Wer darauf vokalisiert, schreibt systematisch falsches Arabisch. Die `darija` darf die Vokalisierung nur **einschränken** (Konsonantenbestand, Gemination), nie bestimmen; die Vokale kommen aus TUNICO (`lemma_chatalpha`, `variants_chatalpha`, **`inflected`**) oder Peace Corps (`forms_chatalpha`). Werkzeug und Filter: `tools/README.md`.

## Topic (unwichtig — einfach setzen und nicht darüber reden)

Jeder INSERT bekommt ein `topic`, nie `null`. **Irgendein passendes Stichwort genügt** — Nils ist das Feld nicht wichtig, es steuert nur grob die Reihenfolge im Aktivierungsmodus. Keine Whiteliste, keine Rückfrage, kein Eintrag im Prüfbericht.

Orientierung, falls man eine braucht: `SELECT topic, count(*) FROM vocabulary GROUP BY 1 ORDER BY 2 DESC` zeigt, was schon benutzt wird — ein vorhandenes Stichwort zu treffen ist nett, aber nicht nötig.

**Was NICHT passiert:** bestehende falsche, fehlende oder Legacy-Topics (`" (L16)"`, `"Alltag (L12)"`, `NULL`) werden **nicht** nachgepflegt und sind **kein Befund**. Der Bestand hat rund 70 solcher Werte. Finger weg.

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

**Vokalfärbung in Konjugationstabellen: Imala-`e` und `o` sind erlaubt, kein Befund (Nils, 2026-11-03).** Eine Tabelle enthält die `darija` jeder ihrer Zeilen (Prüfung 21), und jede Zeile ist ein eigenes gelerntes Wort mit eigener Schreibung. Deshalb stehen in einer Tabelle manchmal `yuq3ud` neben `toq3od`, `y7ell` neben `t7ill` oder `yi7sib` neben `ne7seb` (20 Tabellen, 80 Zeilen). Das ist **kein Fehler**, solange das `arabic_script` der Zeile dazu passt (Damma ↔ `u`/`o`, Kasra ↔ `i`/`e`, Fatha ↔ `a`/`e`). **Nicht** vereinheitlichen und nicht als Befund melden: Eine Angleichung würde rund 80 gelernte Wörter umbenennen, ohne dass das Arabische dagegen spricht. Zu korrigieren sind nur Konsonanten, Tippfehler und Zellen, die weder zum Arabischen noch zu Skript und TUNICO passen (Beispiele 2026-11-03: `tekheth` statt `takhith` in der Tabelle von `khtha`, `nfarkes` statt `nfarkis` bei `farkis`; die zweite hatte Skript und TUNICO gegen sich und war die einzige Ich-Form der Tabelle mit `e`).

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

## Prüfungen im Trainer (seit 2026-10-31)

**Ziel: alle Prüfungen auf 0, und zwar dort, wo Nils sie sieht.** Der Trainer prüft seinen eigenen, geladenen Bestand und zeigt Treffer unter *Mehr → Prüfungen* (mit Fundstellen) und als Zahl auf *Lernen* („N Treffer in den Prüfungen“). Für die Arbeit heißt das: **erst dort nachsehen, ob etwas gemeldet wird** — das spart Abfragen und Kontext. Das SQL (`qualitaets_checks`) bleibt für das, was der Trainer nicht kann (unten).

**Was der Trainer prüft:** die vollständige Liste steht im Code, **dort nachlesen, nicht hier** (eine Aufzählung im Skill veraltet): `TRANSLIT_RULES` (Umschrift der Vokabeln), `countDupeIssues` (Dubletten), `translitExtraChecks0()` (Konjugationstabellen, Hohlverben, Kurs-Umschrift) und `datenChecks()` (Felder, Kurs, Lerndaten) in `trainer.html`. Grob: Umschrift, Pflichtfelder und Zeichen, Dubletten und Homonyme, Konjugation, Kurs (Umschrift, Lösung gegen Tabelle, Doppelte, Quelle), Lerndaten (verwaiste Verweise, Audio-Grunddaten, Flaggen, Fälligkeit). Jede Regel liefert `{label, n, bsp}` und erscheint von selbst in der Prüfung.

**Was nur per SQL geht:** alles mit der Ninja-Tabelle (Checks 11, 13, 23, Quellenabgleich), die Vokalisierungs-Kandidaten (22, bewusst nicht im Trainer: Dauerrauschen), die `chatalpha`-Gegenchecks (24–28) und Audio-Zuordnung zum Wort. Dazu die Datenbank-Pflege (Advisors, Backups). Die SQL-Gruppe A bleibt vorerst als Gegenprobe; läuft der Trainer ein paar Wochen sauber, die doppelten SQL-Checks aus der Sicht nehmen (Vorschlag an Nils) und dort nur die Ninja-Teile lassen.

**Arbeitsweise bei einem Treffer:** wie jede Korrektur (Prozess, Schritt 4–5: zeigen, bestätigen, Backup, schreiben). Danach den Trainer neu laden — die Zahl muss sinken. Die Prüfung ist nicht „weg“, bloß weil ein Treffer ausgeblendet ist: Ausnahmen gehören in den Code (wie `KURS_OHNE_LOESUNG`, die vier Digraph-IDs) **mit Begründung im Kommentar**, nicht als stilles Wegfiltern.

### Immer erst überlegen: gehört diese Prüfung in den Trainer?

Bei **jeder** neuen Prüfung und **jeder** Abfrage, die ich zum zweiten Mal von Hand schreibe, gilt: vor dem Bauen fragen, ob der Trainer die nötigen Daten schon geladen hat (`ALL_VOCAB`, `COURSE_EX_BY_ID`, `COURSE_LESSONS`, `srsProgress`, `flaggedVocab`, `AUDIO_GAIN`, Kurs- und Konjugationsdaten). Wenn ja, **Nils vorschlagen, sie in den Trainer zu verlagern** — statt sie als SQL oder im Kopf zu halten. Das senkt, woran ich denken muss, und Nils sieht Treffer ohne mich.

- **Vorschlag zeigen, nicht einbauen** (Code-Regel: nicht ohne Bestätigung). Mit Nutzen, Trefferzahl aus den echten Daten und Aufwand.
- **Trefferzahl vorher ausrechnen:** Funktion per Node-Harness gegen die echten Daten laufen lassen (Vokabeln/Kurs mit dem Anon-Schlüssel aus `trainer.html` laden). Erst mit bekannter Zahl bauen; Fehlalarme (ganze Aufgabentypen, bewusste Sonderfälle) vorher herausnehmen. Präzedenzfälle: 58 Treffer bei „ohne Lösung“ waren alles offene `build_dialog`-Aufgaben; „Verwaiste Verweise“ fand 23 Vokabel-IDs im falschen Teil von `vocab_lesson_refs`.
- **Wohin:** neue Regeln in `datenChecks()` (Rückgabe `{label, n, bsp}`); sie erscheinen von selbst in der Prüfung und in der Zahl auf Lernen. Syntaxprüfung per `vm.Script`.
- **Dauerrauschen nicht aufnehmen** (wie Vokalisierung 22): Eine Prüfung, die dauerhaft Treffer zeigt, die niemand beheben will, macht die Zahl wertlos.
- **Nicht verlagerbar:** was Ninja-Daten, Audio-Hören oder Datenbank-Einstellungen braucht — bleibt SQL bzw. Handarbeit.
