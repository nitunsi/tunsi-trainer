# Quellen im Netz: Register und Recherche

Hier stehen die Quellen, die wir **außerhalb** von TUNICO, Ninja, Peace Corps, Sprachenlernen24 und dem Skript gesichtet haben, mit einer Bewertung. Wer eine neue Quelle findet, prüft zuerst, ob sie hier steht.

**Erinnerung:** Die Tabelle `quellen_recherche` (eine Zeile) hält das Datum der letzten Recherche. Ist es älter als 3 Monate, zeigt der Trainer unter *Mehr → Prüfungen* „Quellen-Recherche fällig“. Nach einer Recherche setzt Claude `letzte_pruefung` hoch (Vorschlag mit Ist/Soll zeigen, dann schreiben, wie bei jeder Supabase-Änderung).

## So wird recherchiert

1. Dieses Register lesen, damit nichts doppelt bewertet wird.
2. Suchen nach: ACL Anthology / LREC / ArabicNLP, Zenodo, Hugging Face, arXiv, CLARIN, ACDH-CH (Wien), DES Lab / Derja Association, McNeil (Tunisian Arabic Corpus), neue Wörterbücher und Lehrbücher.
3. Jede Quelle einzeln öffnen. **Was nicht lesbar war (Sperre, PDF ohne Text, Anmeldung), steht als „nicht gelesen“ im Eintrag**, nicht als Urteil.
4. Neue Funde hier eintragen: Link, Datum, Zugang, Inhalt, Passung zu Tunis-Derja, was gelesen wurde, Urteil mit einem Satz Begründung.
5. Nichts in Vokabeln oder Kurs übernehmen, ohne dass Nils zugestimmt hat. Belege aus einer Quelle gehören in `internal_note` der betroffenen Vokabel, wenn sie etwas entscheiden.

Urteile: **nutzen** (liefert Belege oder Daten), **gezielt nutzen** (bei bestimmten Fragen nachschlagen), **Hintergrund** (erklärt, belegt aber kein Wort), **offen** (noch nicht geprüft), **unbrauchbar**.

## Register (Stand 2026-11-24)

| Quelle | Zugang | Inhalt | Gelesen | Urteil |
|---|---|---|---|---|
| **Stumme 1896**, Grammatik des tunisischen Arabisch. archive.org/stream/bub_gb_kG0Mr38dk6wC/bub_gb_kG0Mr38dk6wC_djvu.txt | frei (gemeinfrei), OCR-Volltext | Lautlehre, Verb, Zahlwort (§ 159), Pronomen, Glossar | Vorwort und §§ 1–10, §§ 143–169 wörtlich; Rest nur zusammengefasst | **gezielt nutzen.** Eigene Umschrift (x, š), Tabelle in § 1 in der OCR zerstört, Tunis von 1896. Zahlwort: `tlätemiä`, `hamsmia`, `sittemiä` (Hunderter als Kompositum). |
| **McNeil 2023**, Tunisian Arabic as a Written Language (Georgetown) | PDF über ProQuest-Link (signiert, läuft ab); Repository-Link leitet auf Kontaktseite | Soziolinguistik der Schreibung in Foren; Anhang F: Varianten (-u/-h, ظ/ض, Negation) | Metadaten, Anhang F bruchstückhaft (Arabisch in der Textextraktion beschädigt) | **Hintergrund.** Zeigt, dass es keine einheitliche Schreibung gibt, entscheidet keine Einzelfrage. Zu Zahlen und `lazim` nichts gefunden. |
| **Gugliotta 2024**, Tunisian Arabizi (Uni Insubria, Quaderni del CERM 6). uninsubria.eu/sites/sten/files/2024-09/quaderno_6_tunisian_arabizi_gugliotta_2024.pdf | frei | Latein-Schreibung mit Ziffern (Arabizi) in sozialen Medien | Text extrahiert (ca. 920 KB), nur nach Stichwörtern durchsucht, nicht gelesen | **Hintergrund.** Vergleich zu unserer Umschrift; keine Treffer zu `khamsa mya`, `lazim`, Dual. |
| **Toufahi 2022**, Ausspracheprobleme tunesischer Deutschlernender (Halle) | PDF nur im Browser (Bot-Sperre), Datei von Nils | Kapitel 5: Lautlehre des Tunesischen (12 Vokale, 29 Konsonanten, Längen, Geminaten, Betonung, Assimilation); Rest betrifft Deutschlernende | Vollständig durchgesehen | **Hintergrund / gezielt nutzen für Kapitel 5.** Mischt Mundarten (Singer Tunis, Talmoudi Susa, Ritt-Benmimoun Douz). Tabellen mit sichtbaren Fehlern (Minimalpaare m–n, r–l). Aussage: ض und ظ fallen zu /ðˁ/ zusammen, ذ = /ð/, ث = /θ/; nur aus zweiter Hand. |
| **TuniFra** (ACL, ArabicNLP 2025, Choux u. a.) aclanthology.org/2025.arabicnlp-main.5 | Paper frei; **Daten: kein Link, keine Lizenz gefunden** | 15 h Sprache, 9.189 Segmente, 41 Sprecher, arabische Transkription, Übersetzung ins Französische; feste Schreibweise für Wochentage, Zahlen, Mengen (Liste nicht abgedruckt) | Paper vollständig | **offen.** Ohne Daten nicht nutzbar; Autoren müsste man fragen. |
| **NOTA 2024**, Normalized Orthography for Tunisian Arabic (Turki u. a., Derja Association), arXiv 2402.12940, CC BY 4.0 | frei; Zusatzmaterial figshare doi 10.6084/m9.figshare.25892974 | Rechtschreib-Richtlinien in arabischer Schrift nach CODA*; Leerzeichen zwischen Präposition und Nomen, و getrennt, Artikel immer ال ohne Diakritika, Homonyme unterscheiden (`baʃ`/`beːʃ`) | Text des Papers extrahiert; Kernregeln gelesen; **figshare-Anhang nicht gelesen** (figshare.com liefert 403; Titel dort „CODA Guidelines adopted for NOTA Guidelines“, im Browser laden) | **gezielt nutzen** für Arabisch-Schreibung. Zu Zahlen und ض/ظ im Paper nichts gefunden. |
| **CODA Tunis 2014**, Zribi u. a., A Conventional Orthography for Tunisian Arabic, LREC 2014 (aclanthology.org/L14-1214) | frei (CC BY-NC-SA 3.0) | CODA-Regeln für Tunesisch; u. a. das /n/ nach Zahlen im Konstrukt (`xmsTaAšn raAjil` „15 Männer“ gegen `xmsTaAš`) | Extraktion mit zerstörtem Arabisch; Regel zum Zahl-n gelesen | **gezielt nutzen** bei Zahlen im Konstrukt. Zu `khamsa mya` nichts gefunden. |
| **LinTO Tunesisch-Datensätze** (Hugging Face, arXiv 2504.02604), CC BY 4.0 | frei laut Suchtreffer | Audio mit Transkription, Text-Korpus (enthält Arabizi) | nicht gelesen | **offen.** Lizenz und Umfang prüfen, wenn Hörbeispiele oder Häufigkeiten gebraucht werden. |
| **TunSwitch** (Zenodo 8370566) | Zenodo | Sprache mit Code-Switching | nicht gelesen | **offen.** Lizenz nicht gesehen. |
| **Tunisian Arabic Corpus (TAC)**, McNeil und Faiza, www.tunisiya.org (nicht we.tunisiya.org, das gibt es nicht) | frei für Forschung und Lehre, ohne Login durchsuchbar; Gesamtdownload nicht angeboten; Zitierpflicht (McNeil / Faiza 2010–) | ca. 1,19 Mio. Wörter, 12 Kategorien (Foren, Blogs, Zeitung, Fernsehserien, gesprochene Sprache, Märchen u. a.), arabische Schrift ohne Diakritika; Suche Exact / Lemma / Regex per URL `/search/?q=<Wort>&searchtype=Exact` | Startseite, Suche, About; Treffer für `لازم` (424), Hunderter und `لازمش` / `يلزمش` abgefragt (Stand 24.11.2026, Details unten) | **nutzen** für Schreibweisen und Verwendung. Exact-Suche findet nur einzelne Wortformen, Mehrwortsuche (`خمسة مية`, `ما لازمش`) liefert 0 Treffer und ist **kein** Beleg für „kommt nicht vor“. Keine Lizenz im engeren Sinn. |
| **VICAV / CLARIN.SI 11356/1593** (TUNICO-Wörterbuch, 7.543 Einträge) | frei | dasselbe Wörterbuch wie TUNICO | nicht nötig | Bestand, siehe `LOOKUP.md`. |
| **DES Lab / Derja Association**, Referenzbibliographie (deslab.org) | Blogbeitrag frei; Ressourcen hinter lnkd.in-Links | Ankündigung eines Standardisierungsprojekts; vier Kurzlinks (Bibliographie, Schreibung arabisch, Schreibung lateinisch, Phonologie) | Beitrag gelesen, Kurzlinks **nicht** verfolgt | **offen.** Latein-Schreibung und Phonologie könnten für unsere Umschrift relevant sein. |
| **SSRN 4732831, SSRN 4587899**, OEAW-TUNICO-Projektseite | 403 | nicht bekannt | nicht gelesen | **offen**, im Browser prüfen. |
| **Ritt-Benmimoun / TUNOCENT** (Univie, AIDA 2019) | Eintrag nur mit Metadaten | Nordwest- und Zentraltunesien | nicht gelesen | **unbrauchbar** für Tunis. |
| **TDMulti (LREC 2026), TunDC** | offen lizenziert laut Suchtreffer | Kommentare aus sozialen Medien für Sentiment u. Ä. | nicht gelesen | **unbrauchbar** für Vokabeln. |
| Glosbe, Lexilogos, arabetunisien.com (ca. 4.000 Wörter, Französisch), Karmous (Französisch–Tunesisch), Wisconsin LCTL | frei | Wörterlisten bzw. Linksammlungen | nur Suchtreffer | **offen**, niedrige Priorität; Glosbe ist erfahrungsgemäß eine Sammelquelle ohne Belege. |
| Lehrbücher (Mastering Tunisian Arabic, Tunisian Arabic in 30 Lessons, Udemy-Kurse) | kostenpflichtig | Lehrbuch / Kurs | nicht gelesen | **offen**, nicht frei zugänglich. |

## Belege aus dem Tunisian Arabic Corpus (24.11.2026, Exact-Suche)

- `خمسمية` 0 Treffer, `خمسة مية` 0 (Mehrwortsuche, nicht aussagekräftig), `خمسمائة` 1, **`خمسميات` 4 Treffer in 4 Texten**: u. a. gesprochene Sprache „ستميات ألف ولا خمسميات ألف“ und eine Zahlenreihe im Märchen „… خمسين ميات الف ميتين خمسميات ألف مليون“. Das Kompositum mit Plural `-miyyāt` (wie Stumme `hamsmia`) ist belegt, getrennte Schreibung konnte nicht geprüft werden. (Entschieden: Nils, 24.11.2026, `khamsa mya`.)
- `لازمش` 7 Treffer in 5 Texten, alle als `ما لازمش`; `يلزمش` 13 Treffer in 11 Texten. Die drei gesehenen Beispiele von `ما لازمش` lesen sich als Verbot („ما لازمش ننساو“, „ما لازمش السلط هاذي تقوى“: nicht dürfen / sollte nicht), die von `ما يلزمش` sind uneindeutig („ما يلزمش يروح“). Stichprobe von 3 + 3 Zeilen, keine Entscheidung; die Treffer einzeln im Browser lesen.

## Offene Fragen, bei denen Quellen helfen könnten

- `khamsa mya` / Hunderter als Kompositum: Stumme § 159 (`hamsmia`), Tunisian Arabic Corpus nachsehen. Entschieden ist (Nils, 24.11.2026): getrennt `khamsa mya`.
- `lazim` / `yilzim` verneint: Tunisian Arabic Corpus: `ما لازمش` (7) und `ما يلزمش` (13) vorhanden, Bedeutung in den Beispielen eher „nicht dürfen“; vollständige Auswertung offen.
- Dual von `kilu` / `rtal`, `flayr`, `lasaq` / `lasiq`: bisher nichts.
- ض / ظ gleich? Toufahi sagt ja (/ðˁ/); Semia fragen. Unsere Schreibung `dh` / `th` unterscheidet sie.
