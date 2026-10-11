# Beleg-Stufen der Kurs-Übungen (10.10.2026)

Gespeichert in `course_exercises.meta.beleg` (1987 Übungen; die 105 Aussprache-Übungen haben keine Stufe).
Vorher-Stand von `meta`: `backup_meta_vor_beleg.json`. Zuordnung: `beleg_stufen.json`.

| Stufe | Bedeutung | Anzahl |
|---|---|---|
| skript | Original-Übung oder Satz steht wörtlich im Uni-Wien-Skript | 121 |
| belegt | Alle Wörter in Skript/Vokabeln, Satz selbst gebaut | 1492 |
| abgeleitet | Regelmäßig abgeleitete Formen, nicht direkt belegt | 279 |
| unsicher | Wort nicht gefunden oder offener Punkt (u.a. 963-978, 1243, 1250, 1391, 1522, 1523, 1755, 1682, 1882, 1663, 1541, 1414) | 95 |

Die Stufe sagt nur, wie gut ein Satz belegt ist, nicht, ob er garantiert stimmt.
Anzeige im Trainer: Etikett unter der Lösung (Kurs-Übung und Kurs-SRS) und Zählung pro Lektion in der Kurs-Übersicht.

## Nachprüfung der unklaren Übungen in allen Formfeldern (11.10.2026)
Auslöser: `tubba` (Plural von `tbib`) stand bei TUNICO (`chatalpha_plural`) und Peace Corps, wurde aber bei der Belegprüfung nicht gefunden, weil nur Stichwörter und Lektionstexte abgeglichen wurden. Jetzt wurden alle unklaren Wörter in diesen Feldern gesucht: `tunico_corpus_wordforms`, `tunico_corpus_verbs/nouns/adjectives` (Formen), `tunico_import` (`inflected`, Varianten), `peacecorps_dict_import` (`forms_chatalpha`), Derja Ninja, Skript-Seiten (`uniwien_source_pages`).

Gefunden und belegt: shwara3 (Plural share3), twaba3, paspor, mumtaza, zamila/Name, manadhir, ashkhas/shakhs, tzawwij (Ninja), 3fas -> na3fis/ya3fis (TUNICO), wsil -> waslit/wislit (TUNICO), waqfu (TUNICO).

Korrigiert:
- 1522 (wqif): waqfit, waqfu statt wqifit, wqifu (TUNICO: waqfu)
- 1755 (wsil): wislit, wislu statt wsilit, wsilu (TUNICO: wislit/waslit)
- 1682: ma-3ad-sh nustush -> ma-3ad-sh 3andi 3tash (Durst = 3tash, TUNICO/Peace Corps)
- 1882: deutscher Satz "Er raucht nicht, wenn er fastet." (passte nicht zur Lösung)
- 1541: mza77ma -> fiha za7ma (za7ma = Gedränge, TUNICO/Peace Corps)
- 1414: zbayin -> kliyunat (Kunde: kliyo, Plural kliyunat, TUNICO)
- 638: tubb / tubba; neue Vokabel 4607 (Nils, 11.10.2026)

Neue Stufen: skript 122, belegt 1559, abgeleitet 290, unsicher 16 (nur 963-978: `fi-` nach `qa3id`; dazu liefern die Quellen keine Beispielsätze).

## Formen-Prüfung gegen alle Formfelder und die vollständigen Skript-Seiten (11.10.2026)
Wichtiger Fund: `course_lessons.grammar_notes/dialog_text` enthalten **nicht alles** aus dem Skript. Beispiel: Lektion 2, Seite 23 (`uniwien_source_pages`) nennt "ṭbīb / ṭubba = Arzt"; in den Lektionstexten steht das nicht. Alle früheren Belegprüfungen gegen die Lektionstexte waren deshalb unvollständig. Maßgeblich ist `uniwien_source_pages` (270 Seiten, 310.000 Zeichen).

Prüflauf: Tunesische Formen aller Übungen gegen TUNICO (Wortformen, Lemmata, `inflected`, Korpusformen), Peace Corps (`forms_chatalpha`), Ninja, Vokabeln, Lektionstexte. 964 Formen waren nicht direkt belegt; 443 davon sind Stamm + Pronominalsuffix. Von den übrigen 521 stehen 117 lose (Schreibvarianten) in den Skript-Seiten. Der Rest (404) sind überwiegend Tabellenformen (Negation, Partizipien, Verb-Paradigmen), die nach den Skript-Regeln gebildet sind.

Einzeln nachgeschlagen und korrigiert:
- 2079: dillaat -> dilla3at (Skript: dillāʕ/dillāʕa; TUNICO und Peace Corps: dilla3at)
- 1759, 1799, 1855: mliyyah -> mli7 (TUNICO, Peace Corps, Skript "mlīḥ")
- 1851: it-tifel -> it-tfal (TUNICO und Peace Corps: tfal)
- 1617: hunak -> ghadi (Quellen kennen nur ghadi/huni)
- hethukum (11 Übungen) ist belegt (TUNICO hāḏūkum, Peace Corps hadhukum)
- 1888 (fustan: Quellen nennen ruba/kiswa) und 1060 (lutilat: TUNICO util, Plural witla/wutla): Stufe unsicher, nicht geändert

Stufen jetzt: skript 122, belegt 1559 minus 2, abgeleitet 290, unsicher 18.
Offen: Belegprüfung der Stufe "belegt" noch einmal komplett gegen die Skript-Seiten rechnen (statt gegen die Lektionstexte).

## Neuberechnung gegen die vollständigen Skript-Seiten (11.10.2026)
Rechenweg: `beleg_neuberechnung.py` (Universum: TUNICO, Peace Corps, Ninja, Vokabeln, Lektionstexte und alle 270 Skript-Seiten; "skript" = ganze Lösung steht in dieser Wortfolge auf einer Skript-Seite). Es wurde nur **hochgestuft** (151 Übungen; Liste in `beleg_hochstufung_2026-10-11.json`): 39 auf skript, 112 von abgeleitet auf belegt. Die rechnerischen Herabstufungen wurden nicht übernommen: Stichprobe zeigt, dass es fast nur deutsche Wörter in den Klammern sind (Fehlalarme).
Zusätzlich korrigiert: shware3 -> shwara3 (1086, 1101; TUNICO, Peace Corps, Skript).

Stufen jetzt: skript 161, belegt 1635, abgeleitet 173, unsicher 18 (963-978, 1060, 1888).

## Verknüpfungen, Doppelte, Zahlen-Schreibung (11.10.2026)
- **Verknüpfung Übung ↔ Vokabel:** 197 Verknüpfungen geprüft, alle zeigen auf existierende Vokabeln. Korrigiert: 517 (`nijbdu flus`) von `yuq3ud` auf `yijbid` (Id 3816), 306 (`il-ma3had`) von `mashhad` auf `ma3had` (Id 3664). Aussprache: 102 von 105 verknüpft (3 Vornamen ohne Vokabel), 22 verknüpfte Vokabeln ohne Audio.
- **Doppelte Übungen gelöscht (12):** 1078, 1755, 1786, 1462, 1463 sowie die Lektion-5-Kopien der Zahlen-Übungen 604, 605, 606, 607, 608, 609, 611 (Lektion 3 behält 184-191 in der Schreibung der Vokabeln). Die 7 dazugehörigen Fortschritts-Einträge (`course_exercise_progress`) wurden mit gelöscht.
- **Zahlen in der Schreibung der Vokabeln** (`thletha`, `thmenya`, `setta`, `ts3a`) in 58 Übungen angeglichen (vorher `tlata`, `tmanya`, `sitta`, `tis3a`); Artikel bei Uhrzeit/Wochentag angepasst (`it-tlata` -> `ith-thletha`, `it-tmanya` -> `ith-thmenya`). Die Zahlen 11-19 und Zehner blieben unverändert.
- **Lektionstexte:** Abgleich mit den Skript-Seiten siehe `lektionstexte_luecken.md`; Ergänzungen stehen noch aus.
