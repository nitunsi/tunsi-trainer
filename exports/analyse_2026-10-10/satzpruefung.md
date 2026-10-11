# Satz-Prüfung der Kurs-Übungen (11.10.2026)

Drei lesende Prüfungen über alle Lösungen (Skripte: `pruefung_satzabgleich.py`, `pruefung_regeln.py`, `pruefung_bedeutung.py`).

## 1. Satz-Abgleich mit echten Sätzen
Korpus: 30 275 Derja-Ninja-Beispielsätze (arabische Schrift, über das Konsonantengerüst verglichen), alle 270 Skript-Seiten, Peace-Corps-Grammatik, Vokabeln. Maß: Anteil der Konsonantengerüst-Fenster (6 Zeichen, über Wortgrenzen) der Lösung, die im Korpus vorkommen.
- Kalibrierung: bei Sätzen, die im Skript stehen, haben 58 von 76 mindestens 80 % Treffer. Mit zufällig vermischter Wortfolge sinkt der Median von 0,48 auf 0,20; der Anteil mit mindestens 50 % von 50 % auf 18 %. Das Maß erkennt also Wortfolgen, die so vorkommen.
- Ergebnis für 758 Sätze (Übersetzung, Lücke, feste Antwort, Antwortmuster; mindestens 6 Fenster): 344 haben Satz-Beleg (mindestens 50 %), 414 nicht. Kein Beleg heißt nur: nicht im Korpus gefunden, nicht: falsch (Ninja hat 30 000 Sätze, unsere Übungen sind kurze Lehrsätze).
- Nach Stufe: skript 33 ja / 2 nein, belegt 282 / 318, abgeleitet 26 / 79, unsicher 3 / 15.

## 2. Regel-Prüfung
Prüft Artikel-Assimilation (il-/it-/is-/ish-/ith- vor Sonnenbuchstaben), Pronomen und Verbpräfix (ena n-, enti t-, houma y- usw.) sowie Plural-/Singularendung. Test mit künstlichen Fehlern: alle erkannt. Ergebnis über alle Lösungen: keine echten Funde (ein Fehlalarm bei 1680 `ish-sfa`).

## 3. Bedeutungs-Prüfung
Deutsche Glosse der Vokabeln gegen den deutschen Satz. Von 174 Treffern blieben 82 nach Filter, fast nur Rauschen (Zahlen, Beispielsatz-Glossen). Echte Funde, korrigiert:
- 1390: `f-il-mtar` (mtar = Regen) -> `f-il-matar` (Flughafen)
- 1780: `qarrit nsafir` -> `qarrart nsafir` (ich beschloss; qarrit = sie beschloss / ich lehrte)
- 2140: `ma-qarrit-sh` -> `ma-qarrart-sh` (ich)
Hinweis zu `ftur`: Ninja führt `ftur` als Mittagessen, das Skript als Frühstück (`ftur is-sba7`). Nichts geändert.

Nebenbei: Fehler in der früheren Token-Auswertung - deutsche Wörter aus den Klammern der Lösungen flossen als "unbekannt" ein, weil Klammern nach dem Abschneiden an ` — ` nicht mehr entfernt wurden. Die Stufen-Neuberechnung hat dadurch einige Übungen zu schlecht eingestuft (nur Herabstufungen, die nicht übernommen wurden).

## ftur = Mittagessen (Nils, 11.10.2026)
Nils: `ftur` ist das Mittagessen, Frühstück ist `ftur is-sba7`. Die deutschen Texte der Übungen 999, 1126, 1306, 1444, 1571, 1572 und 1641 wurden angepasst (Frühstück/Essen -> Mittagessen). Die tunesischen Sätze blieben unverändert. 1566 (`ftur is-sba7`) und 2018 (`bit li-ftur` = Esszimmer) blieben.
