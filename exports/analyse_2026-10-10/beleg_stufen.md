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
