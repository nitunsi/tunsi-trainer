# Neues Design — Arbeitsplan (trainer-neu.html)

**Ziel:** Neues Gesamtdesign parallel zum alten entwickeln, Hin- und Herwechseln jederzeit möglich.

- `trainer.html` = alt, bleibt Hauptweg, bekommt nur Fehlerkorrekturen und den Knopf „Neues Design“ (Menü, unten).
- `trainer-neu.html` = neu, Kopie des alten Stands (Stand 2026-10-06), wird umgebaut. Knopf „Altes Design“ im Menü bzw. unter „Mehr“.
- Gleiche Adresse (Vercel), gleiche Anmeldung (localStorage `tounsi_session`), gleiche Datenbank, gleiche Einstellungen im Browser.
- **Regel für Änderungen:** Neue Funktionen nur in `trainer-neu.html`. Fehler im alten Weg in beiden Dateien beheben (beim Fix im alten Weg: im Protokoll vermerken, in der neuen nachziehen).
- Es wird nichts in Supabase geschrieben, was die alte Seite nicht auch schriebe (kein Schema-Änderung, keine neuen Tabellen).

## Bauplan (Stufen)
0. Kopie und Umschalt-Knöpfe (erledigt, wenn dieses Dokument im Repo steht)
1. Grundlagen: Schriftgröße S/M/L, ruhigere Schrift, Antippflächen, Farben (Level in einer Farbe)
2. Navigation: untere Leiste (Lernen, Kurs, Vokabeln, Statistik, Mehr), „Mehr“-Seite; Lernsitzungen im Vollbild ohne Leiste
3. Startseite „Heute“ (Tagesziel-Ring, Serie, „Los geht’s“, Vokabeln/Kurs fällig, Partnerzeile, Schnellaktionen)
4. Lernkarte (große Karte, Fortschrittsbalken, Hauptknopf, Symbolleiste) und Abschlussbild nach dem 10er-Block
5. Kurs als Lernpfad, Lektionen als Karten, Vokabelliste als Karten, Statistik im neuen Stil
6. Extras: Höraufgabe, Vibration (aus), leere Zustände

## Stand (2026-10-06): gebaut und getestet
Die Dateien: `trainer-neu.html` (Kopie des alten Stands, mit zwei Einbindungen), `neu/neu.css`, `neu/neu.js`. Getestet mit echten Daten (nur Lesezugriffe, Schreibzugriffe im Test blockiert) bei 360 und 390 px Breite.

- Untere Navigation (Lernen, Kurs, Vokabeln, Statistik, Mehr); Lernsitzungen im Vollbild mit ✕ und Fortschrittsbalken oben
- Startseite „Heute“: Tagesziel-Ring (Standard 100 Antworten, wählbar), Serie, „Los geht’s“ (Mix), Vokabeln/Kurs fällig, Partnerzeile, Schnellaktionen
- „Mehr“: gegliederte Liste, Schriftgröße Klein/Mittel/Groß, Tagesziel, Audio beim Aufdecken, Vibration, Lektions-Einschränkung, Zum alten Design
- Lernkarte: große Karte, Symbolleiste passt auch bei 360 px und großer Schrift, Fortschritt oben statt im Kartenkopf
- Abschluss nach einem 10er-Block: Ring, Richtig/Falsch/Gesamt, „Noch einen Block“ / „Fertig für heute“
- Leerer Zustand („Alles erledigt“) mit den drei Wegen: 10 Vokabeln fällig setzen, nächster Kurs-Abschnitt, Vorziehen
- Kurs als Lernpfad (Ring pro Lektion, „Weiter mit“, vier Werte pro Lektion, Sprung zu den Vokabeln)
- Vokabelliste als Karten, Filter eingeklappt
- Statistik: Level in einer Farbe (Goldrampe), Aktivität in Gold statt Rot/Grün
- Höraufgabe als eigener Modus (Audio hören, Bedeutung wählen, ohne Fortschrittswertung) und als dritte Richtung im normalen Lernen („Audio → Deutsch“, zählt wie jede Karte): nur bei „Ton an“ (Lautsprecher-Schalter in der Lernleiste) und eingeschalteter Einstellung „Höraufgaben beim Lernen“ (Mehr). Wird der Ton mitten im Lernen ausgeschaltet, werden die restlichen Hörkarten zu normalen Karten.
- Serie exakt, ohne Obergrenze (Tage mit mindestens einer Antwort, Berliner Tag); wird auf dem Gerät gemerkt und nur bei Lücken neu gezählt (Gegenprobe: 97 Tage)
- Vibration (Android), standardmäßig aus

## Nicht gebaut / Entscheidungen
- Wischgesten für selbstbewertete Karten: nicht gebaut (Knöpfe bleiben).
- 12-Wochen-Aktivitätsraster: nicht gebaut. Dafür bräuchte es eine Tageszählung in der Datenbank (View/RPC), sonst müssten ~14.000 Zeilen geladen werden. Ohne Rückfrage kein Schema ändern.
- Level-Verteilung (8 Zeilen) und die Statistik-Seite bleiben inhaltlich wie im alten Weg, nur anders gefärbt.
- Admin-Seiten (Aktivierung, Prüfungen, Partner-Queue, Quellenabgleich, Export …) laufen unverändert im alten Stil, erreichbar über „Mehr“.
- Die Partner-Oberfläche (Semia) ist nicht Teil des neuen Designs und unverändert.
- Der alte Weg bleibt unverändert; Fehlerkorrekturen dort bitte in `trainer-neu.html` nachziehen.

## Offene Fragen
1. **Tagesziel:** Standard 100 Antworten. Dein Schnitt liegt bei etwa 165. Passt 100, oder lieber 150 als Standard?
2. **12-Wochen-Raster:** Soll dafür eine schreibgeschützte Tageszählung in der Datenbank angelegt werden (neue View, ändert nur das Schema)?
3. **Wischgesten** bei Kurs-Karten (rechts = richtig, links = falsch): gewünscht?
4. **Partner-Ansicht** für Semia im neuen Design: gewünscht?
5. **Umstellung:** Wenn du ganz wechseln willst, wird `trainer-neu.html` zu `trainer.html` (die alte Datei bleibt als `trainer-alt.html`) und `index.html` zeigt auf die neue.
6. **Hörkarten im Lernen:** Anteil aktuell etwa jede dritte Karte bei Stufe 0 bis 2 und jede siebte ab Stufe 3 (nur Vokabeln mit Audio). Anders gewünscht?
