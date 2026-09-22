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
| **Vokabeln prüfen ODER neu anlegen** — eine, ein Batch, geflaggte, fällige, ein Import, „ich brauche ein Wort für X" | **Der Prozess — ein Ablauf, zwei Eingänge.** Dasselbe Vorgehen für alle Fälle; es wechseln nur die Zeilen am Anfang und `UPDATE`/`INSERT` am Ende. |
| Neue Vokabel nachschlagen / Quellen abgleichen | vocab_lookup — Cross-Source-Abgleich (ganz unten), das Werkzeug hinter Schritt 3 |
| Quelle schreibt etwas anders als wir — Fehler oder nur Konvention? | **Quell-Konventionen** (in Transliteration — Ziel-Konvention). Was dort erklärt ist, ist kein Befund |
| „alle Regeln laufen lassen" | Datenqualitäts-Checks → **A** (müssen auf 0 stehen). Das SQL dort ist nur eine Teilmenge; der vollständige Lauf geht über den Node-Harness gegen `trainer.html` |
| Bestand nach Kandidaten durchsuchen | Datenqualitäts-Checks → **B** (Verdachtslisten mit Fehlalarmquote) — **nie im Block korrigieren** |
| Eigene Prüfabfrage bauen | Datenqualitäts-Checks → **C** (Regeln fürs Prüfen selbst) — erst lesen, drei der Fallen dort haben schon Prüfläufe stumm wertlos gemacht |
| Vokabel ist ein Verb (prüfen ODER anlegen) | Verben → Verb-Konjugationsmodell (3-Zeilen-Ziel, `conjugation`, `conj_rotate`) — gilt auch bei geflaggten Einzelformen |
| Was ist von früher noch unerledigt? | Offene Punkte (direkt unten) — **die Zahlen dort sind ein Schnappschuss, vor jeder Planung mit dem SQL daneben neu ziehen** |
| Vokalisieren, Harakat setzen, Regeln gegen `trainer.html` laufen lassen | **`tools/`** — `extract.js` (TRANSLIT_RULES aus `trainer.html`), `chatalpha.js` (Port von `_arabic_to_chatalpha`), `vokalisierer.js` (Harakat-Solver). `tools/README.md` nennt die sieben Pflichtfilter — **vor dem ersten `UPDATE` lesen** |
| Was kennen die Quellen, das der Trainer nicht hat? | **`quellen_abgleich`** — Live-View, vier Buckets (`fehlt`/`baustein`/`variante`/`vorhanden`) und Score. Im Trainer der Knopf „Quellenabgleich“. Methodik: IMPORTS.md → Quellenabgleich |
| Wie transliteriert der Trainer selbst? | Im Trainer der Chip **„🔤 Transliterationsregeln“** — Buchstabentabelle, Vokalzeichen, Sonnenbuchstaben und die 23 Prüfregeln mit lebender Trefferzahl, alles aus `AR_TRANSLIT_MAP`/`TRANSLIT_RULES` gelesen statt abgetippt, dazu ein Probierfeld. Die **Ziel-Konvention** steht weiterhin hier unten (Transliteration — Ziel-Konvention); der Screen zeigt, was der Code daraus macht |
| PDF/Foto-Quelle auswerten, neue Quelle importieren | IMPORTS.md |
| Kurs-Modus (course_lessons/course_exercises) oder Code-Änderung an trainer.html | COURSE_MODE.md |

## Offene Punkte

Unerledigte Altlasten aus früheren Sessions — bei Gelegenheit aufgreifen, nicht Teil der laufenden Regeln:

- **Ninja-Transliteration in Trainer-Konvention** (besprochen 2026-09-05, bewusst zurückgestellt): `derja_ninja_entries.darija` ist in Ninjas eigener Konvention, nicht unserer — anders als bei TUNICO/Peace Corps gibt es dafür noch keine `chatalpha`-Spalte. Wäre nur aus dem vollvokalisierten `arabic_script` heraus zuverlässig baubar (nicht aus Ninjas `darija` selbst), mit eigenem Validierungsaufwand. Bisher kein Bedarf, seit klar ist: Original-Transliteration wird ohnehin nur im Zweifelsfall herangezogen, `chatalpha` reicht für den Regelfall.

**Laufender Prüfdurchgang.** Vollständige Fundlisten mit Klassifizierung und Entscheidungsstand: `exports/pruefliste_2026-09-12.md` — dort weiterarbeiten, nicht neu aufrollen.

**Zahlen nie aus dem Skill zitieren — immer live ziehen.** Diese Tabelle hat genau das schon einmal falsch gemacht: sie nannte 49 statt 19 beim Verb-Selbstcheck und 93 statt 21 bei der Gemination, also Posten, die längst erledigt waren. Seit dem 2026-09-13 gibt es dafür eine Sicht, die nicht veraltet:

```sql
SELECT * FROM public.qualitaets_checks WHERE treffer > 0 ORDER BY gruppe, nr;
```

Gruppe A muss auf 0 stehen, Gruppe B sind Rückstände. Hier steht bewusst **kein** Schnappschuss mehr: die frühere Fassung nannte „Check 22/23 bei 424/36" und war zwei Tage später bei 234/0 — ein Absatz, der zum Zitieren einlädt und dabei falsch ist, richtet mehr Schaden an als eine fehlende Zahl. Die Sicht oben liefert den Stand in einer Abfrage.

Was die Sicht **nicht** abdeckt und weiterhin von Hand zu ziehen ist:

| Posten | wo |
|---|---|
| Schrägstrich im `darija` (echte Synonyme) | Datenqualitäts-Checks → B |
| verwaiste ids in `course_lessons.vocab_lesson_refs` | Altbestand, tote Vokabel-Slots |
| Bedeutungsverdacht gegen TUNICO | `public.bedeutungs_screen` — **keine Korrekturliste**, ~93 % Fehlalarm |

- **`-ou` nach Konsonant** (113 Zeilen): Die Konjugationstabellen schreiben 511× `-u` gegen 39× `-ou`, eine Vereinheitlichung wäre also begründbar. **Bewusst nicht angefasst**, weil die Mehrheit der Treffer gar kein Plural ist, sondern das Possessivsuffix (`3andou` „er hat", `7lou` „süß"). Nur mit Wortart-Prüfung angehbar, nicht per Regex.
- **Verb-Modell-Abdeckung:** 181 Verbgruppen haben eine `conjugation`-Tabelle, davon erreichen 87 das 3-Zeilen-Ziel; 48 neue Zeilen würden alle auf 3 bringen. 88 Gruppen haben keine rotierende Zeile (62 davon bräuchten nur ein `conj_rotate`-Flag, keine Neuanlage). Weitere **169 Verb-Zeilen haben gar keine Tabelle** — ob das Modell auf sie ausgeweitet wird, ist offen.

## Grundsatz: Nie ohne Bestätigung in Supabase schreiben

Jedes INSERT/UPDATE/DELETE erst als Vorschlag zeigen (betroffene Zeilen/Werte), auf Bestätigung warten, dann schreiben. Gilt für jede Tabelle, jede Größenordnung — auch ein einzelnes Wort.

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
| Bestandsaudit | eine Verdachtsliste aus **Datenqualitäts-Checks (SQL)** |

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

Erst wenn **keine** der drei trifft, gilt „keine externe Bestätigung". Werkzeug für alle drei: **vocab_lookup** (unten) — `english_key` als primäre Achse, Skelett-Treffer nur separat und ab Länge 4. Live-Ninja nur, wenn offline nichts kommt (IMPORTS.md).

**Bei Gemination-Zweifeln: die Wurzelfamilie im eigenen Bestand durchsehen.** Der stärkste Beleg ist oft nicht die Quelle, sondern die Geschwisterzeile. Für `1841 thiz` entschieden drei eigene Zeilen (`1683 hazz` هَزَّ, `2228 yhizz` يُهِزُّ, `2472 hezz` هِزّ) die Frage — und die Suche fand dabei eine **vierte** Zeile mit demselben Fehler (`1684 nihiz`), die kein Check gemeldet hatte. Ninja und Peace Corps vokalisieren Endgeminaten oft unvollständig (`هِزْ`, `hiz`, `أقَلْ`) und sind dort **kein** Gegenbeleg.

**Zwei Durchgänge, nicht einer (gemessen 2026-09-13).** Die `chatalpha`-Achse trifft nur die **Oberflächenform**. Flektierte Formen, Possessive und Phrasen haben in keinem Wörterbuch einen eigenen Eintrag — `7dhart` „ich nahm teil", `ftouri` „mein Frühstück", `yimshiw` „sie gehen" können dort gar nicht stehen. Im Test trafen so nur **5 von 19** Zeilen; ein zweiter Durchgang über die **Grundform** (Verb-Grundform, Singular, Wort ohne Suffix) belegte 6 weitere. Ohne diesen zweiten Durchgang sieht eine korrekte Zeile wie „keine externe Bestätigung" aus.

Drei Fallen, jede schon einmal zugeschlagen:
- **Die Lautschrift jeder Quelle ist ein Strukturhinweis, keine Vorlage.** Vor dem Vergleich die Tabelle **Quell-Konventionen** lesen — sie sagt, welche Abweichung nur Konvention ist (und damit kein Befund) und welche zählt. Prüfen, ob die Quelle ein übersehenes Feature zeigt (v.a. Gemination), aber nie 1:1 übernehmen. `touwl` ist so in den Bestand gerutscht, richtig ist `toul`.
- **Ein Skelett-Treffer ist kein Wort-Treffer.** `nimshiw` „wir gehen" trifft نْمَشْ „freckles". Bedeutung gegenlesen, nicht nur das Skelett.
- **Gleiches Arabisch heißt nicht „Dublette"** — es kann auch heißen, dass eine der Zeilen inhaltlich falsch ist (Präzedenzfall `metrobbi`, PRECEDENTS.md).

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
1. Duplikat-Check UND Transliterations-Check laufen lassen: App-eigener „🔍 Duplikat-Prüfung"-Tab, oder bei Live-Zugriff das SQL aus **Datenqualitäts-Checks** selbst nachbauen — gründlicher als Ad-hoc-Stichproben vorher.
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

Keine Großbuchstaben in darija — weder als Emphase-Marker noch am Satzanfang. Durchgehend kleingeschrieben.

**Gemination eines Digraphen: der ganze Digraph wird verdoppelt.** Bei Schadda auf ض/ظ/ذ/ش/خ/غ wird nicht nur der erste Buchstabe gedoppelt: `dhdh`, `thth`, `shsh`, `khkh`, `ghgh` — nie `ddh`, `tth`, `ssh`, `kkh`, `ggh`. Ebenso `77` für geminiertes ح, nie `7h`. Belegt an drei unabhängigen Quellen, null echte Gegenbeispiele im Bestand; die Zählungen stehen in PRECEDENTS.md → Digraph-Gemination.

⚠️ **Dieselbe Buchstabenfolge ist an einer Morphemgrenze richtig.** `tth` = `t` + `th` (تَذْبَحْ → `tthba7`, نِتْثَاوَب → `netthaowb`), `7h`/`thh` = echte ح+ه bzw. ظ+ه (ظهر → `thhar` „Rücken", يظهرلي → `ythhar-li`). Diese Zeilen sind korrekt und dürfen **nicht** „korrigiert" werden — in `qualitaets_checks` Nr. 8 sind die vier belegten Fälle deshalb ausgeschlossen. **Entschieden wird immer am `arabic_script`**: Schadda → verdoppeln, zwei getrennte Buchstaben → so lassen.

**Selbsttest für jede vermutete Digraph-Gemination:** `public._translit_skeleton(darija)` gegen `public._arabic_skeleton(arabic_script)` halten. `7addhar` ergibt `7ddhr`, حَضَّر ergibt `7dhdhr` — die Skelette widersprechen sich, also ist die Transliteration falsch. Mit `7adhdhar` ergeben beide `7dhdhr`.

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

Drei Gruppen, und die Zugehörigkeit sagt, **was ein Treffer bedeutet** — das ist wichtiger als die Abfrage selbst:

| | Gruppe | Ein Treffer heißt | Vorgehen |
|---|---|---|---|
| **A** | Checks, die auf 0 stehen müssen | ein Fehler, keine Fehlalarme bekannt | korrigieren (nach Schritt 4 des Prozesses: zeigen, warten) |
| **B** | Verdachtslisten mit Fehlalarmquote | ein *Kandidat*, Quote je Liste dokumentiert | einzeln gegen die Quellen prüfen, **nie im Block korrigieren** |
| **C** | Regeln fürs Prüfen selbst | — | vor dem Schreiben eines neuen Checks lesen |

**Reihenfolge:** erst A (kostenlos, eindeutig), dann B, und C liest man, bevor man eine eigene Abfrage baut. Jede Zahl hier ist ein Schnappschuss — siehe Warnung unter „Offene Punkte".

---

### A · Checks, die auf 0 stehen müssen

**Eine Abfrage für alles:**

```sql
SELECT * FROM public.qualitaets_checks WHERE treffer > 0 ORDER BY gruppe, nr;
```

**Gruppe A muss auf 0 stehen — ein Treffer dort ist ein Fehler, keine Verdachtsliste.** Gruppe B sind bekannte Rückstände, die sinken sollen. Die Sicht liefert `treffer` und `erste_ids`; die vollständige Trefferliste holt man mit der `id`-Liste aus `vocabulary`.

Hier standen bis zum 2026-09-13 rund 250 Zeilen SQL. Sie sind in die Sicht gewandert — dort können sie nicht mehr gegen das Schema driften, sie kosten keinen Kontext, und sie sind immer aktuell. **Was hier bleibt, ist das, was die SQL nicht sagen kann: was ein Treffer bedeutet und wo die Fallen liegen.**

| Gruppe A | bedeutet bei einem Treffer |
|---|---|
| 1 Ziffern 2/5/9, Großbuchstaben | Quellen-Schreibweise durchgerutscht (Ninjas `9`/`5`/`2`, Peace Corps' `H`/`S`/`T`) |
| 2 `ch` statt `sh` | dito, oder ein unmarkiertes Lehnwort — dann `(frz.)` ins `german` |
| 3 Artikel nicht assimiliert | `el-shatt` statt `esh-shatt`. ⚠️ Muster nimmt vorgeklebte Präpositionen ohne Trenner mit (`fil-`, `bil-`, `bel-`, …) — reine `\y(el\|il)-`-Wortgrenze sieht diese Fälle nicht, siehe PRECEDENTS.md → Artikel-Assimilation hinter einer Präposition |
| 4 Konsonanten-Gegencheck | `arabic_script` und `darija` nennen verschiedene Laute. **Richtung offen** — das Arabische kann der Fehler sein |
| 5 `(f.)` ohne `-a` | unmarkiertes Femininum; die Ausnahmeliste im SQL deckt die bekannten ab |
| 6 `wa`/`u` statt `w-` | Hausregel |
| 7 `-iou`/`-eou`/`-aou` | Plural muss `-iw` sein (= Regel 21) |
| 8 halb verdoppelter Digraph | `ddh` statt `dhdh`. **722/4254/3042/3073 sind ausgeschlossen** — echte ظ+ه- bzw. t+th-Morphemgrenzen, sie sind korrekt |
| 9 Sonderbuchstabe (= Regel 23) | ڨ/گ=g, ڤ=v, پ=p. **Ohne Lehnwort-Ausnahme**: die lateinische Schreibung ist frei, der arabische Buchstabe nicht. Prüft nur **eine** Richtung; die Gegenrichtung ist per Entscheidung kein Befund (siehe p/v-Entscheidung unten) |
| 30 verwaistes `homonym_ok` | ⚠️ Das Flag steht für **drei** Partnerarten — entsprechend den drei Feldern, über die der Duplikat-Manager gruppiert: gleiches **Arabisch** (`homonymNote()`), gleiches **Deutsch** (`synonymNote()`), gleiche **darija** (`yitba3` drucken/verkauft werden). Ein Check, der nicht alle drei kennt, meldet berechtigte Markierungen als Fehler — der Wert fiel von 58 über 41 und 25 auf **7 von 84**, ohne dass sich an den Daten etwas änderte |
| 10 identisches Arabisch ohne `homonym_ok` | entweder Dublette oder unmarkiertes Homonym. ⚠️ Vergleicht **Bytes**: قصّ und قَصّ gelten als verschieden. Die vokalisierungsunabhängige Fassung ist Check 31 |
| 11–13 rohe Zeichen / Wächter | eine Umwandlungsfunktion kennt ein Zeichen nicht — siehe unten |
| 32 `conjugation` gegen die Regeln | ⚠️ Die A-Checks lesen nur `vocabulary.darija`. Die `conjugation`-Tabellen enthalten dieselbe Art Transliteration (650 Zeilen × bis zu 16 Formen) und waren bis zum 2026-09-13 **komplett ungeprüft** — dort stand noch `-iou` nach der Regel-21-Umstellung, und ein am selben Tag korrigierter Tippfehler lebte in sechs Tabellenformen weiter. **Jede Korrektur an `darija` muss die Tabelle mitprüfen** |
| 31 `ar_key`-Dublette | gleiche arabische **Buchstaben** (ohne Harakat) **und** gleiche deutsche Bedeutung, ohne `homonym_ok`. Schließt die Lücke von Check 10, der byteweise vergleicht. ⚠️ Die Bedeutungsbedingung ist nötig: ohne sie meldet der Check 85 Paradigmenformen derselben Wurzel. Und der Bedeutungsschlüssel darf **Klammern nicht wegwerfen** — bei `476`/`837` steht die Unterscheidung genau dort |
| 27 `q`/`z`/`j` ohne arabische Entsprechung | Gegenrichtung zu den Regeln 10/12/13. Nur **Einzelzeichen** taugen dafür — die Digraph-Gegenrichtungen (`dh`, `th`, `sh`) sind durch Morphemgrenzen verrauscht (`3and`+`ha`, `as`+`hal`) |
| 28 Artikel assimiliert vor Mondbuchstabe | Gegenrichtung zu Check 3 |
| 26 „`3`" ohne ع | Hamza als `3` transliteriert (`sou3el` für سُؤَال). Fand bei seinem ersten Lauf 5 Zeilen, alle echt — darunter `742`, dessen `arabic_script` schlicht etwas anderes sagte als die `darija`. Seit der Korrektur am 2026-09-13 auf 0 und damit in Gruppe A |

**Warum 12 und 13 so gebaut sind.** Der naheliegende Weg wäre, die bekannten Buchstaben aufzuzählen. Genau das hat ڨ **699 Zeilen lang unsichtbar** gelassen (76 im Bestand, 623 bei Ninja), weil `_arabic_skeleton()` ihn nicht kannte und roh stehen ließ. Eine Aufzählung vergisst den nächsten neuen Buchstaben genauso. Die Wächter drehen es um: sie melden, **was die Funktionen nicht kennen**.

**Die ڨ-Entscheidung (Nils, 2026-09-13):** wird ein Wort mit `g` gesprochen, **bleibt die `darija` und das `arabic_script` wird auf ڨ umgestellt**. Beim **Artikel** umgekehrt: dort wird die `darija` angepasst (`el-iqtisad` → `iqtisad`).

**Die p/v-Entscheidung (Nils, 2026-09-13) geht andersherum — nicht analog:** schreibt die `darija` `p` oder `v`, während das `arabic_script` ب bzw. ف hat, **bleibt beides, wie es ist**. Betroffen sind 25 (`p`) bzw. 14 (`v`) Zeilen, fast alle Lehnwörter (`parking`, `spor`, `talvza`, `villa`). Kein Befund, keine Kampagne, und `chatalpha_konflikte` sortiert sie als eigene Klasse `lehnwort_pv` aus. Der Unterschied zu ڨ: dort ging es um **tunesische** Wörter, deren Lautung das Arabische falsch wiedergab; hier um Fremdwörter, bei denen die arabische Schreibung ohnehin nur eine Annäherung ist.

⚠️ **Die Sicht deckt nur einen TEIL von `TRANSLIT_RULES` ab.** Wer „alle Regeln geprüft" sagen will, muss die echten 23 laufen lassen — über den Node-Harness gegen `trainer.html`:


```bash
# tools/extract.js zieht normalize/checkAnswer/TRANSLIT_RULES per Anker aus trainer.html
# nach tools/lib.js und bricht selbst ab, wenn es nicht 23 Regeln werden.
node tools/extract.js && node -e '
const L=require("./lib.js"); const fs=require("fs");
const rows=JSON.parse(fs.readFileSync("fresh_all.json","utf8"))
  .map(r=>({id:r.id,tr:r.darija||"",ar:r.arabic_script||"",en:r.german||""}));
const ids=new Set();
L.TRANSLIT_RULES.forEach((r,i)=>{ const h=rows.filter(v=>{try{return r.test(v);}catch(e){return false;}});
  h.forEach(x=>ids.add(x.id)); if(h.length) console.log("Regel "+(i+1)+": "+h.length+" — "+r.label); });
console.log("betroffen: "+ids.size+" von "+rows.length+" ("+L.TRANSLIT_RULES.length+" Regeln)");
'
```

**Zwei Pflicht-Plausibilitätsprüfungen bei jedem Harness-Lauf:**

1. **`L.TRANSLIT_RULES.length` mit ausgeben.** Fällt der Extraktor auf einen Teilblock zurück, prüft man stumm eine gekürzte Regelliste. Präzedenzfall: PRECEDENTS.md → `extract.js`. **Der Anker ist zweimal danebengegangen** — beide Male, weil `indexOf("\n];")` zuerst das Ende von `CONSONANT_PAIRS` trifft. Immer von `const TRANSLIT_RULES = [` aus suchen. **Seit 2026-09-15 prüft `tools/extract.js` das selbst und bricht ab** (Sollzahl über `TRANSLIT_RULES_ERWARTET` anpassbar, wenn eine Regel dazukommt); der Extraktor liegt nicht mehr im Scratchpad, wo er jede Session neu gebaut werden musste.
2. **Exportierte Zeilenzahl gegen `count(*)` halten.** Ein still unvollständiger Export meldet „0 Treffer" über den halben Bestand und sieht dabei aus wie ein sauberes Ergebnis.

### B · Verdachtslisten (mit Fehlalarmquote)

**Den Stand dieser Listen nie aus dem Skill zitieren — mit einer Abfrage ziehen.** Genau wie
bei Gruppe A: hier standen bis zum 2026-09-22 neun Zahlen im Text, und fünf davon waren
überholt (`gemination` und `konsonanten` längst auf 0, der Bedeutungs-Screen von 76 auf 151
gewachsen, die Vokalisierungs-Kampagne abgearbeitet). Was bleibt, ist die **Methodik** und die
**gemessene Fehlalarmquote** — die ist eine Eigenschaft der Liste, keine Momentaufnahme.

```sql
SELECT 'chatalpha_konflikte · '||klasse AS liste, count(*) FROM chatalpha_konflikte GROUP BY klasse
UNION ALL SELECT 'vokalisierung_kandidaten', count(*) FROM vokalisierung_kandidaten
UNION ALL SELECT 'bedeutungs_screen',        count(*) FROM bedeutungs_screen
UNION ALL SELECT 'Gruppe A/B (Sicht)',       count(*) FROM qualitaets_checks WHERE treffer > 0
ORDER BY 1;
```

Ein Treffer ist ein **Kandidat, kein Fehler**. Jede Liste trägt ihre gemessene Fehlalarmquote — die steht dort nicht zur Zierde: bei der Gemination sind ~15 % Fehlalarme, beim arabischen Duplikat-Check ~80 %. **Nie im Block korrigieren**, immer einzeln gegen Ninja/TUNICO/Peace Corps prüfen. Präzedenzfälle, in denen ein Blockfix falsch gewesen wäre: `bnin`, `skhan` (dort war das `arabic_script` der Fehler), `metrobbi` (gegenteiliger Gloss statt Dublette), die 30 Ninja-Skelett-Kollisionen bei der Vokalisierung.

**`chatalpha_konflikte` — die einzige Prüfung, die Vokale sieht (seit 2026-09-13).** Alle anderen Checks vergleichen Konsonantenskelette; `7araam` gegen حَرَام (= `7aram`) ist für sie identisch. `public._arabic_to_chatalpha(arabic_script)` leitet dagegen die **volle** Chat-Alphabet-Form aus dem vokalisierten Arabischen ab und stellt sie der gespeicherten `darija` gegenüber. Die Sicht filtert bereits heraus, was erlaubt abweichen darf: unvokalisiertes Arabisch, Mehrwortzeilen, markierte Lehnwörter (lateinische Schreibung ist dort frei) und die bekannte Funktionslücke `bi/li/ka/fa` + Artikel.

Vier Klassen, und nur zwei davon sind Befunde:

| `klasse` | Befund? | heißt |
|---|---|---|
| `gemination` | **ja**, = Check 24 | die beiden Felder widersprechen sich bei der **Verdopplung** — meist fehlt die Schadda im Arabischen (`akhaff` gegen أَخَف). Objektiv entscheidbar |
| `konsonanten` | **ja**, = Check 25 | verschiedene Laute. Etwa die Hälfte sind französisch geschriebene Lehnwörter ohne `(frz.)`-Marker — mit Marker fallen sie heraus |
| `lehnwort_pv` | nein | p/v gegen ب/ف per Entscheidung vom 2026-09-13 |
| `vokale` | nein, und kein Check | Kurzvokale sind im Bestand nicht normiert; die Klasse steht nur für den Einzelfall zur Verfügung. Mit Abstand die größte der vier |

**`vokalisierung_kandidaten` — Fehlalarmquote ~48 %, Kampagne abgearbeitet.** Methodik, Pflichtfilter und die Fehlerbilder stehen gesammelt unter **vocab_lookup → Vokalisierung aus Ninja**; hier nur der Hinweis, dass die Liste zu den Verdachtslisten zählt und nie im Block korrigiert wird.

Grundgesamtheit: 2.335 vokalisierte Einzelwörter. Die Klassen `vokale` und `lehnwort_pv` sind bewusst **nicht** in `qualitaets_checks`: eine Liste, die dauerhaft Bekanntes meldet, macht die scharfen Listen daneben unsichtbar.

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

**Diese Lücke betrifft nur mehrwortige Zeilen** — und dort fast immer eine `h`/`7`- oder `d`/`th`-Verwechslung in genau einem Wort. Gefundene Fehlerbilder: `nsalhu`→`nsalla7u`, `hadh-dhert`→`7adhdhart`, `rouhou`→`rou7ou`, `yslah`→`ysla7`, `t7iz`→`thiz`, `t7abbel`→`thabbel`, `dhahab`→`thahab`.

**Pflicht-Gegenprobe vor jeder Korrektur — `tth` ist fast immer ein Fehlalarm:** in TUNICO (9/9), Ninja (17/17) und im eigenen Bestand (2/2) war jedes `tth` ein Morphemgrenzen-`t` vor `th` (`netthaowb` ← نِتْثَاوَب, `tthba7` ← تَذْبَح), keine Gemination. Entscheidungskriterium ist nicht die Buchstabenfolge, sondern das Arabische: steht dort eine Schadda auf ذ/ظ, ist es Gemination; steht ein eigenes ت davor, ist die Zeile korrekt. Kürzester Selbsttest: `_translit_skeleton(darija)` gegen `_arabic_skeleton(arabic_script)` halten — bei echter Fehlschreibung laufen die beiden an genau dieser Stelle auseinander (`7addhar` → `7ddhr` vs. `7dhdhr`), bei einem Präfix-`t` stimmen sie dort überein. **Bei mehrwortigen Zeilen die Stelle vergleichen, nicht die ganzen Strings** — die können aus völlig anderen Gründen abweichen. Beispiel id 3073: `tthb7` steht in beiden Skeletten identisch (also korrektes Präfix-`t`), die Gesamt-Skelette unterscheiden sich trotzdem, weil in derselben Zeile zwei andere Fehler stecken (`essakina` statt `essakkina` zu السِّكِّينَة, `brrsha` statt `barsha` zu بَرْشَة).

**Gemination von ya: `yy` (belegt 2026-09-12).** Schadda auf ي wird transliteriert wie jede andere Gemination. Eigener Bestand **67 : 14** (`mayyit`, `tayyab`, `ykhayyat`, `7orriyya`, `bnayya`), TUNICO **14/14** (`xayyāṭ`→`khayyat`, `ṛayyaḥ`→`rayya7`), Ninja **14/14** (`خَيَّاطْ`→`5ayyat`, `بَيِّنْ`→`bayyin`). Von den 14 Gegenbeispielen waren nach Prüfung 14 echte Fehler oder Lehnwörter; korrigiert wurden u.a. `taybit`→`tayybit`, `maytin`→`mayyitin` (Geschwister 2290 `mayyit`), `rwayeq`→`rwayyeq`, `mdhayef`→`mdhayyef`.
```sql
SELECT id, darija, arabic_script, german FROM vocabulary
WHERE arabic_script ~ 'ي[ًٌٍَُِْٰ]*ّ' AND darija !~ 'yy' ORDER BY id;
```

**Gemination von waw: `ww` (entschieden 2026-09-12).** Dieselbe Regel wie bei ya, ohne Ausnahme. Eigener Bestand **40 : 4** (`sawwar`, `lawwej`, `rawwa7`, `dawwara`, `mfawwer`, `ynawwar`, `tsawwert`, `tawwa`, `khawwaf`, `zawweli` …), Ninja `tawwa` تَوَّا.

**Der scheinbare Widerspruch war ein Denkfehler:** Ninja schreibt هُوَ als `houwa` mit *einem* `w` — dort steht aber **keine Schadda**. Ein Waw-Buchstabe → ein `w`. Die Systematik ist exakt symmetrisch zu ya:

| | ohne Schadda | mit Schadda |
|---|---|---|
| ya | هِيَ → `hiya` | هِيَّ → `hiyya` |
| waw | هُوَ → `houwa` | هُوَّ → `houwwa` |

```sql
SELECT id, darija, arabic_script, german FROM vocabulary
WHERE arabic_script ~ 'و[ًٌٍَُِْٰ]*ّ' AND darija !~ 'ww' ORDER BY id;
```

**Drei dokumentierte Ausnahmen, die dieser Check zu Recht meldet und die so bleiben:**

1. **Wortfinale Schadda** wird nicht transliteriert — `dhaw` ضَوّْ, `jaw` جَوّ, `qwi` قُوِّي. Gleiche Regel wie im Gemination-Check darüber.
2. **Die `shnou`-Familie** (7 Zeilen) — `shnoua` ← شْنُوَّا ist als bewusste Kontraktionsform dokumentiert, nicht als Fehler. **Aber:** die Familie trägt fünf verschiedene Schreibungen (`shnoua`, `shnou`, `shnouwa`, `shnowwa`, `shnouwwa`) und zwei Arabisch-Endungen (ـا/ـة). Eigener Durchgang, Block-Entscheidung wie bei `3ayshik`.
3. **`1622 t3awinni`** تعاوّني — die Schadda sitzt dort auf dem waw von تعاون, was nach Tippfehler im Arabischen aussieht (erwartet: تعاوني). Nicht als Transliterationsfehler behandeln, bevor das Arabische geklärt ist.

---

**`darija` gegen das eigene `arabic_script` zurückrechnen (seit 2026-09-13, Fehlalarmquote ~20 %).** Der schärfste Einzelcheck im Bestand und der einzige, der Zeichen für Zeichen vergleicht statt auf Vorkommen oder Anzahl zu prüfen. Er fängt eine Klasse, die **alle bisherigen Trainer-Regeln durchlassen**: `bathriq` für بطريق enthält ein `t` — es steckt im `th`. Vorkommens- und Anzahlprüfungen laufen daran vorbei, der Zeichenvergleich nicht.

```sql
WITH s AS (
  SELECT id, darija, german, arabic_script,
         public._arabic_to_chatalpha(arabic_script) AS abgeleitet,
         public._translit_skeleton(darija) AS sd,
         public._translit_skeleton(public._arabic_to_chatalpha(arabic_script)) AS sa
  FROM vocabulary
  WHERE arabic_script ~ '[ًٌٍَُِّْ]' AND darija IS NOT NULL
    AND darija !~ '[cvxp]'                                    -- Lehnwort-Schreibungen
    AND german !~* '(frz\.|franz\.|ital\.|engl\.|lehnwort)'
    AND darija !~ '[ ]' AND arabic_script !~ '[ ]'             -- PFLICHT: nur Einzelwoerter
    AND arabic_script !~ '[بتثجحخدذرزسشصضطظعغفقكلمنه](?![ًٌٍَُِّْٰ])'  -- PFLICHT: jeder Konsonant traegt eine Haraka
)
SELECT id, darija, german, arabic_script, abgeleitet FROM s WHERE sd <> sa ORDER BY id;
```

**Die beiden Pflichtfilter sind nicht optional.** Ohne sie steigt die Trefferzahl von 44 auf 224 und die Fehlalarmquote explodiert: bei Sätzen ist das Arabische meist nur teilweise vokalisiert, und ein unmarkiertes ي/و wird dann als Konsonant `y`/`w` gelesen. `et-tbib nsa7ni bir-ra7a` wird zu `et-tbyb nsa7ny balra7a` — das ist ein Artefakt der fehlenden Harakat, kein Fehler in der Zeile.

**Was die Treffer des ersten Laufs waren** (2026-09-13: 44 Treffer, ~35 echt, inzwischen auf 15 abgearbeitet — aktuelle Zahl: `qualitaets_checks`): fehlende oder überzählige Gemination in beide Richtungen (`nos` gegen نُصّ; umgekehrt fehlt bei `7orriyya` dem *Arabischen* die Schadda), falsche Konsonanten (`shadika` für شهادة, `odhkhol` mit `dh` gegen د), ق/ڨ-Uneinigkeit (`bagra`/`baqara`, `manga`/`manqa`), das `7h`-Muster (`msalh7a`). Fehlalarme: nicht als Lehnwort markierte Zeilen und Artikel, den die `darija` trägt und das `arabic_script` nicht.

**Blinder Fleck: der auslautende Vokal.** Der Skelettvergleich streicht Vokale — ein Wort, das auf einen Vokal endet, und eines, das nicht, haben dasselbe Skelett. `385 brika` gegen بْرِيكْ lief deshalb jahrelang als „ok" durch, obwohl die `darija` ein `-a` trägt, das im Arabischen nicht steht. Eigener Check ohne eigene Sicht — Stand über das SQL selbst ziehen:

```sql
SELECT id, darija, german, arabic_script, public._arabic_to_chatalpha(arabic_script) AS abgeleitet
FROM vocabulary
WHERE arabic_script ~ '[ًٌٍَُِّْ]' AND arabic_script !~ '\s' AND darija !~ '[ \-cvxp]'
  AND german !~* '(frz\.|franz\.|ital\.|engl\.|lehnwort)'
  AND arabic_script !~ '[بتثجحخدذرزسشصضطظعغفقكلمنه](?![ًٌٍَُِّْٰ])'
  AND public._translit_skeleton(darija) = public._translit_skeleton(public._arabic_to_chatalpha(arabic_script))
  AND right(regexp_replace(lower(darija),'[^a-z0-9]','','g'),1) ~ '[aeiou]'
    IS DISTINCT FROM
      right(regexp_replace(lower(public._arabic_to_chatalpha(arabic_script)),'[^a-z0-9]','','g'),1) ~ '[aeiou]';
```

Zwei bekannte Fehlalarmklassen darin: die hocharabische Perfekt-Endung ـَّ (هَزَّ gegen unser `hazz` — im Dialekt nicht gesprochen) und `-iy` gegen `-i` bei Berufsbezeichnungen. Letzteres ist allerdings meist ein **echter** Fund: `bankajiy`, `sbabtiy`, `farmasiy`, `mitrouw` tragen Ninjas Konvention (`iy` für ī, `ouw` für ū), nicht unsere — dieselbe Klasse wie `touwl`→`toul`.

**Richtung offen lassen.** Ein Treffer sagt „diese beiden Felder widersprechen sich", nicht welches falsch ist. Bei `7orriyya` war es das Arabische. Immer beide prüfen, nie automatisch die `darija` angleichen.

**Pro Wort statt pro Zeile — erweitert die Reichweite deutlich** (beim ersten Lauf 1.179 → 1.624 Zeilen, +38 %). Die Zeilen-Variante wirft einen ganzen Satz weg, sobald *ein* Wort unvokalisiert ist. Wortweise bleiben die vokalisierten Wörter prüfbar. Das braucht aber **zwei zusätzliche Filter**, sonst ist die Liste schlechter als die kürzere:

- **Status constructus ist kein Befund.** Unsere Konvention schreibt ة im Status constructus als `-t` (`jorret ed-dar`, `khobzet el-malla`, `warqit il-ma`), die Ableitung gibt immer `a`. Beide haben recht. Filter: `sd <> sa AND sd <> sa || 't'`.
- **Wortversatz erkennen und die ganze Zeile verwerfen.** Gleiche Wortzahl heißt nicht gleiche Zuordnung: bei `insha allah fi nje7 l awled` trennt das Arabische إن شاء in zwei Wörter, die `darija` schreibt `insha` als eines — ab da ist jedes Paar verschoben und meldet Unsinn (`[allah → sha]`, `[nje7 → fi]`). Eine einzelne Zeile erzeugte vier Falschmeldungen. Filter: eine Zeile mit mehr als einem Wort verwerfen, wenn **mehr als die Hälfte** ihrer prüfbaren Paare abweicht.

Die zweite Regel verwirft 40 Zeilen und nimmt damit bewusst Falsch-Negative in Kauf — eine Zeile mit echten Fehlern in der Mehrheit ihrer Wörter fällt mit heraus. Das ist der Preis dafür, dass die Liste benutzbar bleibt.

**Verbleibende Fehlalarme nach beiden Filtern (~5 %):** `fil` → `fi` (unsere `darija` verschmilzt Präposition und Artikel, das Arabische trennt sie) und vereinzelter Wortversatz, der die Hälfte-Regel überlebt.

**Der Check findet die Digraph-Gemination unabhängig wieder** — `mukhhu`→`mokhkhou`, `mshakhra`→`moshakhkhara`, `nsharshhar`→`nosharshir`, `mashi`→`mashshi` sind genau das `khh`/`shh`-Muster. Eine gute Bestätigung, dass beide Regeln dasselbe Phänomen beschreiben.

**Bedeutungs-Screen (`public.bedeutungs_screen`) — gebaut, gemessen, und ausdrücklich KEINE Massenliste (2026-09-13).** Er vergleicht unser `german` gegen TUNICOs `senses.de` — TUNICO ist die einzige Quelle mit deutschen Glossen; Ninja und Peace Corps haben nur Englisch, und unser `english` stammt zu ~85 % aus ihnen, ein Abgleich wäre **zirkulär**.

**Gemessene Fehlalarmquote: ~93 %** (an 30 gelesenen Zeilen etwa 2 echte Funde). Die Ursache ist nicht behebbar:

| Ursache | Anteil | Beispiel |
|---|---|---|
| Synonymie | ~40 % | „Geldschein" ←→ „Banknote", „Krämer" ←→ „Lebensmittelhändler" |
| echte Homonymie | ~43 % | `7ayya` „lebendig" ←→ „Schlange" — حية heißt beides |

**Kein Stringverfahren löst Synonymie**, und die echten Funde sehen aus wie die Homonyme — es gibt kein trennendes Signal. Eine Liste, in der auf einen echten Fund rund vierzehn Fehlalarme kommen, verbrennt mehr Vertrauen, als sie bringt — und sie wächst mit dem Bestand mit. Der Emphatika-Filter (ص/س unterscheiden über TUNICOs DMG-`lemma_orig`) entfernte beim Bau nur 5 von 76 Zeilen und rettet sie nicht.

**Richtiger Einsatz: Schritt 3 für die einzelne Vokabel.** Dort liest ein Mensch das Paar und entscheidet — da ist „TUNICO sagt etwas anderes" wertvoll, auch wenn es meistens Synonymie ist. Die Sicht liefert es fertig, statt dass man den Join jedes Mal neu baut. **Nie im Block korrigieren.**

**Was dabei entstanden und dauerhaft nützlich ist:**
- **Der Join-Schlüssel.** `replace(replace(lower(chatalpha),'ou','u'),'o','u')` auf beiden Seiten — unsere mechanische Ableitung und TUNICOs `lemma_chatalpha` liegen damit in derselben Vokalschreibung. **861 TUNICO-Treffer statt 597 per Skelett (+44 %)**, und ohne Wurzelkollisionen, weil die Vokale mitvergleichen. Gilt für jedes Nachschlagen, nicht nur für diesen Screen.
- **`public._de_trifft(a, b)`** — validierter Bedeutungsvergleich zweier deutscher Glossen, 14 von 14 konstruierten Fällen korrekt. Drei Wege, weil drei Phänomene: Gleichheit für kurze Wörter („wie?"/„wie?"), Teilstring für Komposita („Tüte" in „Papiertüte"), gleiche vier Anfangszeichen für Flexion („wäscht"/„waschen"). **Jede Fassung mit nur einem der drei fiel bei den anderen beiden durch** — Präfix allein scheitert an Komposita, Teilstring allein an Flexion, eine Längenschwelle wirft exakte Treffer weg.

### C · Regeln fürs Prüfen selbst

Keine Abfragen, sondern die Fallen und Methodenregeln. **Vor dem Bau einer neuen Prüfabfrage lesen** — drei der vier hier dokumentierten Fallen haben schon einmal einen kompletten Prüflauf stumm wertlos gemacht.

**Wichtig — Postgres-Regex-Falle:** Wortgrenze ist `\y`, NICHT `\b` (das ist in Postgres ein Backspace-Zeichen, matcht lautlos nichts). Bei jedem neuen Regex mit Wortgrenzen einmal kurz gegen ein Testwort verifizieren, bevor auf das Ergebnis (0 Treffer) vertraut wird.

**⚠️ Die Konsonanten-Regeln 5–16 in `TRANSLIT_RULES` prüfen VORKOMMEN, nicht ANZAHL (entdeckt 2026-09-12).** `v.ar && /ح/.test(v.ar) && !/7/.test(v.tr)` schweigt, sobald **irgendwo** im Feld ein `7` steht. Bei einwortigen Zeilen egal, bei Sätzen ein Loch: `hadh-dhert barsha 7ajet lil-7afla` (3 × ح, 2 × `7`) lief jahrelang als sauber durch, weil `7ajet` und `7afla` die Regel beruhigten — das falsch geschriebene erste Wort sah sie nie. Erster Lauf des Anzahl-Vergleichs: **11 Treffer, 10 echte Fehler, 1 Entscheidungsfall** — praktisch keine Fehlalarme. **Seit 2026-09-12 als Regel 22 in `TRANSLIT_RULES` live**, mit vorkompilierten Buchstabenpaaren in `CONSONANT_PAIRS` direkt neben `isLoanword`. Sie greift bewusst nur, wenn **beide** Seiten mindestens einmal vorkommen — fehlt der Gegenpart ganz, hat die zuständige Regel 5–16 schon angeschlagen; so meldet kein Fall doppelt.

```sql
-- Zaehlvergleich je Buchstabenpaar; in SQL umstaendlich, im Node-Harness natuerlicher.
-- Paare: ح→7, خ→kh, ع→3, ش→sh, ض→dh, ج→j, ز→z, غ→gh?, ق→[qgk], ه→h, س→s, [ظذ]→th
SELECT id, darija, arabic_script, german,
       (length(arabic_script) - length(replace(arabic_script,'ح',''))) AS ar_n,
       (length(darija)        - length(replace(darija,'7','')))        AS tr_n
FROM vocabulary
WHERE arabic_script LIKE '%ح%' AND darija LIKE '%7%'
  AND german !~* '(frz\.|franz\.|ital\.|engl\.|lehnwort)'
  AND (length(arabic_script) - length(replace(arabic_script,'ح','')))
    > (length(darija) - length(replace(darija,'7','')))
ORDER BY id;
```

**ت+ه an der Morphemgrenze wird `th` geschrieben — die Konvention existiert bereits.** 6 von 8 Bestandszeilen machen es so (`waqtha` وقتها, `shrobtha` شربتها, `mammethom`, `thimni` تْهِمِّني). Dass `th` auch der Digraph für ظ/ذ/ث ist, wird in Kauf genommen — gleiche Lage wie `tth` (Präfix-`t` vor `th`) und `thh` (`thhar` ظهر). Entschieden wird immer am `arabic_script`, nie an der Buchstabenfolge.

**⚠️ Der Schrägstrich nimmt eine Zeile komplett aus `chatalpha_konflikte` (entdeckt 2026-09-15).** Die Sicht filtert `v.darija !~ '/'`, weil eine Zweivarianten-Zeile nicht 1:1 gegen eine Ableitung zu stellen ist. Folge: **26 Zeilen mit Schrägstrich, davon 21 vokalisiert, waren nie gegen ihre eigene Ableitung geprüft** — und genau dort saßen echte Fehler (`1174` trug mit `lbes` das Verb statt des Partizips, `1457 bishfa` unterschlug die Sonnenbuchstaben-Assimilation, die das eigene بِالشِّفا trägt). Dieselbe Blindheit gilt für jede Prüfung, die auf `chatalpha_konflikte` aufsetzt. Schrägstrich-Zeilen brauchen einen eigenen Durchgang:

```sql
SELECT id, darija, arabic_script, german FROM vocabulary
WHERE darija ~ '/' AND arabic_script ~ '[\u064B-\u0652]' ORDER BY id;
```

**Hausstil bei zwei Varianten:** trägt die `darija` einen Schrägstrich, trägt ihn das `arabic_script` auch — 16 Zeilen machen es so (`2022 a7san / khir` → أَحْسَن / خِير). `checkAnswer()` splittet auf `/\s*\/\s*/`, beide Formen gelten also als richtige Antwort. Eine Mischform aus zwei Varianten in **einem** Wort ist immer ein Fehler (`894` trug قلامّات = Alif aus `qlām` plus Schadda aus `qlammāt`, in keiner Quelle belegt).

**Lateinisches `x` gehört nicht ins Hausalphabet** — 5 Zeilen tragen es, alle französische Lehnwörter (`taxi`, `taxist`, `jeux vidéos`). Lösung ist **nicht** Umschrift zu `ks`, sondern die Lehnwort-Markierung im Gloss (`(frz.)`), damit `isLoanword()` greift. `taxi` wird auch von Tunesiern so geschrieben.

**⚠️ Zeichenreihenfolge: Vokalzeichen stehen VOR der Schadda (entdeckt 2026-09-12).** Im Bestand steht die Schadda in **803** Zeilen nach dem Vokalzeichen (`ي` + Kasra + Schadda = `064a 0650 0651`) und nur in **16** davor. Die kanonische Unicode-Reihenfolge ist die umgekehrte. Folge: **jede Prüfregel der Form `<Buchstabe>ّ` verfehlt ~98 % des Bestands und meldet stillschweigend nichts** — dieselbe Falle wie `\b` statt `\y`. Immer die Vokalzeichen mit erlauben:
```sql
-- FALSCH: findet fast nichts
WHERE arabic_script ~ 'يّ'
-- RICHTIG:
WHERE arabic_script ~ 'ي[ًٌٍَُِْٰ]*ّ'
```
`arabic_script ~ 'ّ'` allein (Schadda irgendwo) ist von der Reihenfolge unabhängig und bleibt gültig.

**Skelett-Vergleich als Vorfilter für Liste C (seit 2026-09-12).** `public._translit_skeleton(darija)` gegen `public._arabic_skeleton(arabic_script)` trennt die Schadda-Verdachtsliste viel schärfer als die Regex allein: bei 69 Verdachtszeilen waren 48 skelett-uneinig und 21 einig; unter den einwortig-uneinigen waren nach Prüfung 28 von 35 echte Fehler. Als erste Spalte in jede Verdachtsabfrage aufnehmen und nach `ts <> as_` sortieren.

⚠️ **Systematischer Fehlalarm: der Artikel (gemessen 2026-09-13).** Von 646 Zeilen mit uneinigen Skeletten tragen **190 (29 %)** einen Artikel im `darija`. Die beiden Funktionen behandeln ihn unterschiedlich: `el-manshir` → `lmnshr`, aber المنشير → `mnshr`; `f-ed-dar` → `fddr`, aber في الدار → `fldr`. **Kein Datenfehler, ein Artefakt der beiden Skelett-Formeln.** Bei jedem Skelett-Treffer mit `el-`/`ed-`/`es-`… im `darija` zuerst prüfen, ob die Differenz nur an dieser Stelle sitzt — dann verwerfen. In einer Stichprobe von 10 fälligen Vokabeln waren **beide** Skelett-Treffer von dieser Art.

⚠️ **Blind für Halbvokale.** Beide Formeln streichen ا/و/ي. Ein fehlender oder überzähliger Langvokal im `arabic_script` ist für den Vergleich unsichtbar — `سكاكن` und `سكاكين` ergeben beide `skkn`. Diese Fehlerklasse findet nur der Quellenabgleich.

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

**Neue Checks aus Kurs-Grammatiknotizen ableiten — wiederkehrende Praxis, nicht einmalig.** `grammar_notes` in `course_lessons` (siehe COURSE_MODE.md) enthalten viele Regeln — nur solche aufnehmen, die rein aus `darija`/`german`/`arabic_script` ableitbar sind, OHNE Wortart-Wissen/Kontext (wie die Sonnenbuchstaben-Regel). Bei jeder neuen/überarbeiteten Lektion erneut versuchen. **Immer erst gegen den Bestand testen (Fehlalarmquote) und zeigen, bevor eine Regel dauerhaft in `TRANSLIT_RULES` übernommen wird.** Bisher 8 Kandidaten getestet, 4 in `TRANSLIT_RULES` übernommen (unmarkierte Feminina, "und"=immer "w-", Plural-Endung `-iou`, Konsonanten-Anzahlvergleich als Regel 22), 2 verworfen (Verb-Personalpräfix, m/f-Adjektivpaare=masc+"a" — beide an Dialekt-Realität gescheitert, Details: PRECEDENTS.md → Prüfungen nach jedem Import), 2 bewusst nur als SQL im Skill (Verb-Selbstcheck: gehört in den Prüfablauf, nicht in den Transliterations-Tab; Gemination: ~15 % Fehlalarme, würde den Tab dauerhaft rot halten).

**Der Prüf-Tab nennt seit 2026-09-13 die Grundgesamtheit.** Unter dem Ergebnis steht „N von M Vokabeln geprüft · R Regeln" — im Erfolgs- wie im Trefferfall. Grund: „0 Auffälligkeiten" ohne Nenner ist keine Aussage; ein halb geladener Bestand oder eine gekürzte Regelliste sähen identisch aus. Zusätzlich bricht `sbApiPaged()` jetzt hart ab, wenn die geladene Zeilenzahl nicht dem `count`-Header entspricht — ein still unvollständiger `ALL_VOCAB` verfälscht SRS-Queue, Duplikat-Check und Prüf-Tabs gleichermaßen.

**Faustregel aus diesen 8 Läufen:** Eine Regel gehört nur dann in `TRANSLIT_RULES`, wenn sie nahe an 0 % Fehlalarme liegt — der Wert der beiden Prüf-Tabs liegt darin, dass „0 Treffer" wirklich „sauber" heißt. Alles mit Restunschärfe bleibt SQL im Skill und wird als Verdachtsliste abgearbeitet.

## vocab_lookup — Cross-Source-Abgleich (seit 2026-09-05)

**`vocab_lookup`** ist eine View (kein Materialized/keine Kopie — liest live aus `derja_ninja_entries`/`tunico_import`/`peacecorps_dict_import`, ändert nichts an den Rohtabellen) mit einheitlichen Spalten für alle drei: `source`, `source_id`, `english_key` (lowercased, primäre Suchachse), `headword_display`, `source_translit` (Lautschrift der Quelle in DEREN eigener Konvention, nicht unser Chat-Alphabet), `chatalpha` (unsere Konvention — bei TUNICO immer befüllt, bei Peace Corps 5.004/5.070 befüllt), `chatalpha_plural`, `gender`, `pos`, `arabic_script` (nur Ninja zuverlässig — echte, unabhängige Quellenangabe), `arabic_reconstructed`/`arabic_reconstruction_note` (nur bei `source='peacecorps'` befüllt — unvokalisierter Rekonstruktions-**Vorschlag**, kein Faktum, siehe unten), `translit_skeleton`/`arabic_skeleton`, `example_en`/`example_de`/`example_ph`, `audio_url`, `note`. Eine Zeile pro Sinn/Beispiel, nicht pro Lemma — ein mehrdeutiges Lemma erzeugt mehrere Zeilen mit demselben `source_id`. Details/Historie zu jeder Quelle: IMPORTS.md.

**`arabic_reconstructed` ist NIE eine unabhängige Bestätigung, nur eine Ableitung unserer eigenen Regel aus Peace Corps' eigener Lautschrift** — bei einem 3-Quellen-Vergleich zählt es nicht als zweite Quelle neben Ninja, sonst täuscht ein systematischer Regelfehler eine "doppelte Bestätigung" vor, die keine ist (siehe PRECEDENTS.md → Peace-Corps-Arabisch-Rekonstruktion). Rekonstruiert wird per `public._pc_reconstruct_arabic(forms_phonetic[1])` aus dem ORIGINAL `forms_phonetic` (nicht aus `forms_chatalpha`!), weil das Original über Groß-/Kleinschreibung Emphase-Laute unterscheidet (H/S/T = ح/ص/ط vs. h/s/t = ه/س/ت), die `forms_chatalpha` bereits verloren hat. Bekannte Restunsicherheit: ض/ظ/ذ fallen im Original alle auf `dh` zusammen (`arabic_reconstruction_note` zeigt das an), außerdem keine Unterscheidung ا/ى bei wortschlussendem Langvokal. 4.874/5.004 Peace-Corps-Zeilen rekonstruiert, 130 bewusst nicht (Fremdwörter/Platzhalter/Transkriptionsfehler statt Rateversuch).

**Vokalisierung aus Ninja übernehmen — nur mit Buchstaben-Identitätsprüfung (2026-09-13).** Ninja vokalisiert konsequent, der Bestand zu rund einem Fünftel nicht. Die naheliegende Übernahme per `arabic_skeleton`-Match ist **viel schwächer, als die Trefferzahl aussieht**: von 50 Zeilen mit *eindeutigem* Ninja-Treffer (Skelett ≥ 4) waren nach Prüfung nur 20 brauchbar. Der Rest waren Skelett-Kollisionen quer über Lexeme hinweg (`nimshiw` „wir gehen" traf نْمَشْ „freckles").

**Pflichtfilter, mechanisch statt nach Augenmaß:** Ninjas Schreibung nur übernehmen, wenn sie nach Entfernen aller Harakat **buchstabenidentisch** mit der eigenen ist — es dürfen nur Vokalzeichen dazukommen, kein einziger Buchstabe sich ändern. Als `AND`-Bedingung direkt ins `UPDATE`, nicht als Vorabprüfung:
```sql
AND btrim(regexp_replace(<ninja_arabisch>,'[ًٌٍَُِّْٰٟ]','','g')) = btrim(v.arabic_script)
```
Das erschlägt alle Kollisionen und zusätzlich die Numerus-/Genus-Fälle (Ninja gibt den Singular, die Zeile ist Plural: `fnejin`←فِنْجَانْ, `tlemtha`←تِلْمِيذْ, `trabesh`←طَرْبُوشَةْ).

**Der schärfste Filter — und seine Grenze (2026-09-13).** `ableitung_exakt` in der Sicht prüft, ob `_arabic_to_chatalpha(Ninjas Vokalisierung)` **exakt** die eigene `darija` ergibt. Von 46 Kandidaten bestanden das nur 8 — er sortiert scharf. **Er prüft aber die Form, nicht die Bedeutung:** vier Zeilen bestanden ihn und waren trotzdem ein anderes Wort (`louza` „Schwägerin" gegen „almond").

**Buchstabengleich ist nicht bedeutungsgleich — vier Fehlerarten, die der Filter nicht sieht** (aus dem vollständigen Durchgang, 10 von 21 Kandidaten waren Zufälle): **Eigennamen** (نَجِيب Najib für `njib`), **Ableitungsstufen** (Maß-II تْكَوِّن „geformt werden" für تْكُون „sein"), **Wortart** (Verbalnomen statt Verb) — und einmal ein **Fehler in der Quelle selbst**: Ninja schrieb Tanwin statt Fatha (تْقًابِلْ, Ableitung ergibt `tqanabil`). Die letzte Art ist die unangenehmste, weil sie wie ein sauberer Treffer aussieht.

Verworfene Vorschläge bekommen `[ninja-vokalisierung verworfen]` in die `internal_note`; die Sicht blendet sie dauerhaft aus, damit sie nicht jeden Durchgang erneut kosten.

**Danach trotzdem drei Dinge von Hand prüfen**, die der Filter nicht sieht: (1) ob Ninjas Eintrag dieselbe **Wortart** ist (`tfahim` „er einigte sich" gegen Ninjas تَفَاهُمْ, das Nomen „understanding" — buchstabenidentisch, anderes Wort); (2) ob Ninjas Vokalisierung der eigenen `darija` widerspricht (`toshrob` gegen تِشْرَبْ = `tishrab`); (3) ob Ninjas Fassung überhaupt vokalisiert ist — bei `intikhabat` und `amriken` ist sie es nicht, da gibt es nichts zu übernehmen.

**Vokalisierung NICHT von einer Geschwisterzeile übernehmen (belegt 2026-09-13).** Naheliegend, aber systematisch falsch: im Arabischen teilt die ganze Ableitungsfamilie dasselbe Konsonantengerüst, und **die Vokalisierung ist genau das, was die Wörter unterscheidet**. Ein Skelett-Match innerhalb des Bestands findet deshalb bevorzugt *andere* Wörter derselben Wurzel:

| unvokalisiert | „Geschwister" mit gleichen Buchstaben | tatsächlich |
|---|---|---|
| `sfer` „null" صفر | `sfor` „gelb (Pl.)" صْفُر | zwei Wörter |
| `ktob` „Bücher" كتب | `ktib` „er schrieb" كتِب | Nomen vs. Verb |
| `b7ar` „Meer" بحر | `ba77ar` „er ging ans Meer" بحّر | Nomen vs. Verb Maß II |
| `qra` „er las" قرى | `qarra` „er lehrte" قَرَّى | Maß I vs. Maß II |
| `bra` „genas" برا | `barra` „draußen" بَرَّا | zwei Wörter |

Der Buchstaben-Identitätsfilter, der die Ninja-Route rettet, **hilft hier nicht** — er ist per Konstruktion erfüllt. Von 29 Paaren blieben 2 brauchbar, und zwar nur die, bei denen **auch die `darija` identisch** ist (echte Homonympaare, bei denen wirklich nur Harakat fehlen): 652/2296 `maqfoul`, 4410/4295 `tsa77ar`.

**Regel:** Vokalisierung aus dem Bestand nur übernehmen, wenn `darija` **und** Buchstaben übereinstimmen. Alles andere braucht eine lexem-gebundene Quelle oder Handarbeit.

**Konsequenz für die Planung — am 2026-09-13 revidiert.** Hier stand bis dahin: „Der Vokalisierungs-Rückstand ist **nicht als Kampagne abarbeitbar**, Ninja liefert nach Filter ~20 pro Durchgang." **Das galt, weil `_arabic_skeleton()` kaputt war.** Die Funktion kannte گ ڨ ڤ پ nicht und ließ sie roh stehen — 623 Ninja-Zeilen waren dadurch für jeden Skelett-Join unsichtbar. Nach der Reparatur:

| | |
|---|---|
| unvokalisierte Einzelwörter (Stand des ersten Laufs) | 507 |
| davon mit vokalisiertem Ninja-Treffer | 364 |
| davon buchstabenidentisch (Pflichtfilter) | 130 |
| davon mit **genau einer** Ninja-Vokalisierung | **122** |

**Das war eine Kampagne — sie ist abgearbeitet.** `vokalisierung_kandidaten` steht seit
2026-09-19 auf 0 (= Check 23), der Ninja-Weg ist damit ausgeschöpft. Die verbleibenden
unvokalisierten Einzelwörter (Check 22) brauchen TUNICO/Peace Corps als Vokalquelle und die
sieben Pflichtfilter aus `tools/README.md` — Potenzial und Grenzen dazu:
`exports/migration_kursverknuepfung_check21_2026-09-20.sql`, Abschnitt 3. Werkzeug für einen
neuen Ninja-Durchgang, falls dort importiert wird: `public.vokalisierung_kandidaten` — wendet den Pflichtfilter mechanisch an und liefert zusätzlich zwei der drei Handprüfungen als Spalte: `vokale_unser`/`vokale_ninja` (widerspricht Ninjas Vokalisierung unserer `darija`? das ist der `toshrob`/`tishrab`-Fall) und `wortart_verdacht` (unser Gloss verbal, Ninjas Eintrag ein Nomen).

**Erster Durchgang, 2026-09-13:** 64 in der sichersten Gruppe (Vokale identisch, Wortart unauffällig), davon **59 geschrieben**. Die fünf übrigen hat erst das Gegenlesen der Bedeutung gefunden — der Filter prüft Buchstaben, nicht Bedeutung: `4358 glass` „Kleiderschrank" gegen Ninjas كلاس „class(room)" (unser Wort ist ڨلاص), `4180 kasa` „Waschlappen" gegen „cash register", `1576 louza` „Schwägerin" gegen „almond", `735 maktou3` „gebrochen" gegen „not available", `648 nshid` „reservieren" gegen „to ask". **Die Bedeutungsprüfung bleibt Handarbeit, auch wenn beide Filter sauber sind.**

Ertrag des ersten Laufs: die Reichweite des Zeichen-Checks wuchs von 1.179 auf 1.275 vollvokalisierte Einzelwörter, und 58 der 59 Zeilen brachten Ninja-Audio mit. **Aktuelle Zahlen: `SELECT * FROM qualitaets_checks` (Gruppe B).** Offen aus dem Lauf: 47 mit abweichender Vokalfolge, 11 mit Wortart-Verdacht.

Die Regel „ohnehin fällige Bearbeitung" (beim Anfassen einer Zeile die Vokalisierung mitziehen) bleibt richtig — sie ist jetzt nur nicht mehr der einzige Weg.

**Nie blind über `translit_skeleton`/`arabic_skeleton` joinen — kurze Skelette (≤3 Konsonanten) kollidieren zufällig** (Präzedenzfall: PRECEDENTS.md → vocab_lookup). `english_key` ist die primäre, zuverlässige Achse; Skeleton-Treffer nur separat markiert und mit `length(...) >= 4` gefiltert.

**`vocabulary.english` (seit 2026-09-05, gut die Hälfte des Bestands befüllt) ist nur ein Such-Schlüssel für den Quellenabgleich, keine geprüfte Übersetzung** — muss nicht nuanciert sein, nur treffend genug für den `english_key`-Join. Befüllt über vier Wege, absteigend nach Zuverlässigkeit: (1) exakter `ninja_audio_url`-Match — dieselbe Ninja-Zeile, die schon das Audio geliefert hat, `english` direkt übernommen (676 Zeilen); (2) exakter `arabic_script`-Match gegen Ninja (295 Zeilen); (3) exakter Deutsch-Text-Match gegen `tunico_import.senses[].de` — TUNICO liefert Deutsch UND Englisch im selben Sinne, ein Treffer auf `german` liefert das passende Englisch direkt mit, nur wenige deutsche Homonym-Kollisionen ausgenommen (`heller`/„Heller"-Münze, `zu`=nach/geschlossen) (219 Zeilen); (4) Skelett-Match gegen `vocab_lookup` mit manueller Deutsch/Englisch-Plausibilitätsprüfung, Skelett-Treffer allein reicht nicht (585 Zeilen). Details/Fehlerbilder: PRECEDENTS.md → vocabulary.english Backfill. Bei neuen Vokabeln `english` gleich mitpflegen, dann ist der Abgleich sofort ohne Nachbearbeitung nutzbar.

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

**Helper-Funktionen `public._translit_skeleton(darija text)` / `public._arabic_skeleton(arabic_script text)`** (seit 2026-09-05): berechnen `vocabulary.translit_skeleton`/`arabic_skeleton` exakt nach dem Bestandsformat — per Reverse-Engineering aus dem Bestand hergeleitet und gegen den vollen Bestand validiert (Details und die vier Stolpersteine für einen Port: PRECEDENTS.md → arabic_skeleton/translit_skeleton). Nie von Hand nachbauen — diese Funktionen benutzen, auch außerhalb von Rezept 4.

**Seit 2026-09-16 sind `vocabulary.translit_skeleton`/`arabic_skeleton` generierte Spalten** (`GENERATED ALWAYS AS (public._translit_skeleton(darija)) STORED` bzw. aus `arabic_script`). Postgres berechnet sie selbst und zieht sie bei jedem `UPDATE` der Quellspalte automatisch nach. Konsequenz: **beide Spalten dürfen in keinem `INSERT`/`UPDATE` mehr in der Spaltenliste stehen** — sonst bricht die Anweisung mit SQLSTATE `428C9` ab („cannot insert a non-DEFAULT value into column ... Column is a generated column“). In `RETURNING` und in jeder `SELECT`-Abfrage dagegen wie gewohnt benutzbar. **Warum umgestellt:** als gewöhnliche Spalten veralteten sie stillschweigend — am Umstellungstag 104 falsche und 9 leere `translit_skeleton` sowie 100 falsche `arabic_skeleton` bei 3.775 Zeilen, unsichtbar für jeden Skelett-Abgleich, der auf ihnen aufsetzt.

**Rezept 4 — neue Vokabel anlegen, fertigen INSERT bauen:**
```sql
-- Teil 1: Kandidaten aus allen 3 Quellen (wie Rezept 2a) — daraus darija/arabic_script/german von Hand auswählen
SELECT source, headword_display, source_translit, chatalpha, chatalpha_plural, gender, pos,
       arabic_script, arabic_reconstructed, arabic_reconstruction_note, example_en, example_de, example_ph, audio_url, note
FROM public.vocab_lookup WHERE english_key = lower('<wort>') ORDER BY source;

-- Teil 2: INSERT. translit_skeleton/arabic_skeleton NICHT mitschicken, s. Hinweis ueber dem Block
INSERT INTO public.vocabulary
  (english, darija, arabic_script, german, ninja_id, ninja_audio_url,
   external_confirmed, external_confirmed_source)
VALUES (
  '<english>',
  '<darija>',                    -- s. Konventions-Warnungen unten
  <arabic_script_oder_NULL>,     -- nur von Ninja übernehmen, sonst NULL lassen
  '<german>',                    -- kein Feld liefert das automatisch, immer von Hand
  <ninja_id_oder_NULL>,
  <ninja_audio_url_oder_NULL>,
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
- **sonst, seit 2026-09-15, der dritte Zustand:** `external_confirmed=false, external_confirmed_source='abgeleitet'`, wenn die **Form selbst** in keiner Quelle steht, aber eine belegte Grundform existiert, von der unsere Zeile eine **reguläre Flexion oder eine reine Vokalvariante** ist — Plural zu belegtem Singular, Femininum zu belegtem Maskulinum, Komparativ zum Adjektiv, Possessivform, Konjugationsform, oder dieselbe Form mit anderer Vokalschreibung (`twewil` gegen TUNICOs `twawil`). Die Grundform und ihre Fundstelle gehören in die `internal_note`.
- **`external_confirmed=true, external_confirmed_source='ninja-satz'`** (seit 2026-09-16), wenn die exakte Wortfolge des `arabic_script` **zusammenhängend in einem Beispielsatz** von `derja_ninja_entries.example_arabic` vorkommt. Das ist der einzige Belegweg für **Phrasen**: Sätze und Wendungen sind in keinem Wörterbuch Stichwort, ein Lemma-Abgleich findet sie nie. Verglichen wird über die **arabische** Seite (Diakritika und Satzzeichen weg, Wortgrenzen erhalten) — das umgeht die verschiedenen Umschriftkonventionen der Quellen.
- **Zeichengleiches `arabic_script` im eigenen Bestand** (2026-09-16): trägt eine bereits bestätigte Zeile **exakt dieselbe Zeichenfolge** (Diakritika eingeschlossen), gilt der Beleg auch hier — er gilt der Form, nicht unserer Umschrift. Quelle und Begründung der Ursprungszeile übernehmen. Fundstelle: `1522 bnet` „Töchter" war unbestätigt, `4111 bnat` „Mädchen (Pl.)" bestätigt, beide بْنَاتْ; der Backfill vergleicht die `darija` exakt und `bnet` weicht von TUNICOs `bnat` nur in der Vokalschreibung ab.
  ⚠️ **Nur mit Diakritika vergleichen, nie nur die Buchstaben.** Der lockere Vergleich liefert sofort einen Falschtreffer: `3056 yshabbe3` يِشَبَّع („er sättigt", Maß II) gegen `3028 yishba3` يِشْبَع („er wird satt", Maß I) — gleiche Buchstaben ي ش ب ع, die Schadda trennt die Wortformen (Lautlehre-Regel 5).
- sonst `external_confirmed=false, external_confirmed_source=NULL`.

**Warum der dritte Zustand nötig war.** `external_confirmed` ist ein **Exakt-Treffer-Flag**: es beantwortet „steht dieser String in einer Quelle?", nicht „gibt es dieses Wort?". Beispiel `1175 t7eb` „du magst": die Grundform `4176 7abb` ist Ninja-belegt und über `tunico_verb_id` mit TUNICO verknüpft, TUNICO 2164 führt das Verb `ḥabb` vollständig — aber nur **eine** Beispielflexion (`y7ibb`). Auch `tunico_corpus_wordforms` (9.874 belegte Formen) kennt `t7eb` nicht, weil es andere Vokale schreibt. „Nicht bestätigt" war damit technisch wahr und inhaltlich irreführend, und der Partner-Check schickte solche Zeilen zu Semia, als wüsste niemand, ob es das Wort gibt.

**So findet man die Ableitungen systematisch** (Runde 68): Affix abtrennen, Grundform im **eigenen bestätigten Bestand** und in den drei Quellen suchen, und zur Sicherheit das deutsche Gloss gegenprüfen. Drei Affixklassen sind regelmäßig genug dafür:

| Klasse | Prüfung | Ausbeute Runde 68 |
|---|---|---|
| Pronominalsuffix (`-i` mein, `-ek/-ik` dein, `-ou/-u` sein, `-ha` ihr, `-na` unser, `-kom` euer, `-hom` ihr Pl.) | Gloss muss das Possessivpronomen nennen; Femininendung fällt vor dem Suffix zu `-t` (`blasa` → `blastik`) | 6 von 281 |
| Artikel (`el-`, `esh-`, `ez-`, …) | Sonnenbuchstabe entdoppeln, dann Grundform suchen | 21 von 25 Treffern |
| Flexion aus `conjugation` | Form muss in der Tabelle einer **bestätigten** Zeile stehen | 3 von 4 Treffern |

Die Fehlalarmquote ist auch hier real: `es-sala` „das Gebet" trifft TUNICOs `sala` **„Salon; Saal"** (صالة statt صلاة), `es-sawm` „das Fasten" trifft `sawm` **„Preis; Summe"** (سوم statt صوم), `el-kasa` „die Kasse" den Waschhandschuh `kasa`. Ohne Bedeutungsabgleich wären das drei falsche Bestätigungen aus 25.

**Der dritte Zustand ist keine Abkürzung.** Er verlangt dieselbe Wortprüfung wie eine direkte Bestätigung: `3281 yitba3` steht in der Konjugationstabelle von `2213 yitba3` — und ist trotzdem **nicht** davon abgeleitet, weil dort die Wurzel ط-ب-ع („drucken") steht und hier ب-ي-ع („verkauft werden"). Ein Skelett- oder Formtreffer ohne Bedeutungsabgleich erzeugt hier genauso Homograph-Zufälle wie überall sonst.

**Wirkung im Trainer:** `belegStufe()` sortiert den Partner-Check dreistufig — gar kein Beleg zuerst (dort ist Semias Urteil die einzige Bestätigung, die es je geben wird), dann abgeleitet, dann direkt belegt (Zweitmeinung). Das 🔗-Icon erscheint für abgeleitete Zeilen abgeschwächt mit eigenem Tooltip.

Präzedenzfälle 2026-09-05/06:
- Bestands-Audit gegen `vocab_lookup.chatalpha`/`chatalpha_plural` allein fand nur 1693/3698 Treffer; Erweiterung auf alle Rohtabellen-Spalten (exakter Match) brachte 357 weitere (u.a. `dyar`, Plural von `dar`/Haus, nur in Peace Corps' zweitem `forms_chatalpha`-Element). `vocab_lookup` bleibt für den Cross-Source-Abgleich (Rezepte 1–4 oben) nützlich, ist für `external_confirmed` aber nicht ausreichend.
- Skelett-Vergleich (s.o.) brachte nochmal 251 weitere — Stichprobe von 25 Zufallstreffern manuell geprüft, alle korrekt (z.B. `yqaddem`↔`yqaddmu`, `kilmet`↔`kilmat`, `ysallem`↔`sallmu`).
- **Bekannte Grenze, bisher ungelöst:** Präsens-Verben (`y-`/`yi-`-Präfix) und personenflektierte Vergangenheitsformen (`qolt`=ich sagte, `mit`=ich starb) bleiben oft unbestätigt, obwohl die Grundform (`qal`, `mat`) bestätigt ist — Wörterbücher zitieren fast nur Imperativ/3.-Pers.-Vergangenheit, keine vollen Paradigmen. Eine Ableitung „Personalform bestätigt, wenn Grundform bestätigt" wäre möglich (Personal-Präfix/-Suffix abstreifen, dann Konsonantenskelett gegen bereits bestätigte Einträge derselben `lesson_id` vergleichen — Eingrenzung auf `lesson_id` nötig, um Kollisionen bei kurzen Wurzeln zu vermeiden), ist aber noch nicht umgesetzt.

Rezept 4 ersetzt nicht den Pflicht-Duplikat-Check (siehe "Duplikat-Check, alle drei Felder einzeln") — vor dem `INSERT` trotzdem gegenchecken, Rezept 3 nutzen bei ganzen Batches statt Einzelwörtern.
