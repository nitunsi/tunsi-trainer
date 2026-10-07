# Neues Design — Arbeitsplan (jetzt trainer.html)

**Ziel:** Neues Gesamtdesign parallel zum alten entwickeln, Hin- und Herwechseln jederzeit möglich.

- `trainer.html` = alt, bleibt Hauptweg, bekommt nur Fehlerkorrekturen und den Knopf „Neues Design“ (Menü, unten).
- **Umstellung 2026-10-07 erledigt, alter Weg am 2026-10-07 entfernt (Nils: nutzt ihn nicht mehr):** `trainer.html` = das Design (mit `neu/neu.css` + `neu/neu.js`). `trainer-alt.html` und die Umschalter „Altes Design“ sind gelöscht (in der Git-Historie wiederherstellbar). `trainer-neu.html` leitet auf `trainer.html` weiter (alte Lesezeichen).
- (früher) `trainer-neu.html` = neu, Kopie des alten Stands (Stand 2026-10-06), wird umgebaut. Knopf „Altes Design“ im Menü bzw. unter „Mehr“.
- Gleiche Adresse (Vercel), gleiche Anmeldung (localStorage `tounsi_session`), gleiche Datenbank, gleiche Einstellungen im Browser.
- **Regel für Änderungen:** Es gibt nur noch einen Weg (`trainer.html` + `neu/`). Keine Doppelpflege mehr.
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
- Kurs als Lernpfad (Ring pro Lektion, vier Werte pro Lektion, Sprung zu den Vokabeln). Die aktuelle Lektion (höchste mit freigeschalteten, noch nicht gemeisterten Übungen) ist markiert. Den Knopf „Lernen“ gibt es dort nicht mehr: er startete die fälligen Übungen aller Lektionen und passte nicht zur angezeigten Lektion; das Lernen startet auf der Startseite und unter „Mehr“.
- Vokabelliste als Karten: Suche bleibt oben stehen, Schnellfilter (Fällig, Ohne Fälligkeit, Mit Audio, Markiert), weitere Filter eingeklappt, Tippen auf eine Zeile öffnet das Bearbeiten, „Auswählen“ blendet erst die Häkchen für Sammelaktionen ein
- Vokabel bearbeiten als Bottom-Sheet: Abschnitte (Wort, Einordnung, Lernstand, Partner und Notizen), Beschriftungen, große Felder, Speichern/Flagge/Löschen fest unten, „Jetzt fällig“, Stufe per Plus/Minus, Zusammenfassung und Audio oben
- Statistik: Level in einer Farbe (Goldrampe), Aktivität in Gold statt Rot/Grün
- Höraufgabe als eigener Modus (Audio hören, Bedeutung wählen, ohne Fortschrittswertung) und als dritte Richtung im normalen Lernen („Audio → Deutsch“, zählt wie jede Karte): nur bei „Ton an“ (Lautsprecher-Schalter in der Lernleiste) und eingeschalteter Einstellung „Höraufgaben beim Lernen“ (Mehr). Wird der Ton mitten im Lernen ausgeschaltet, werden die restlichen Hörkarten zu normalen Karten.
- Serie exakt, ohne Obergrenze (Tage mit mindestens einer Antwort, Berliner Tag); wird auf dem Gerät gemerkt und nur bei Lücken neu gezählt (Gegenprobe: 97 Tage)
- Vibration (Android), standardmäßig aus

- Admin-Seiten im neuen Stil: Aktivierung als Karten mit fester Leiste (Erste N auswählen, Jetzt fällig setzen), alle übrigen Admin-Seiten (Prüfungen, Partner-Queue, Partner-Check, Quellenabgleich, Umschrift-Regeln, Export, Vokabel hinzufügen, Lektionen) mit größeren Bedienelementen (Mindesthöhe, 16 px) und gleicher Optik
- Tastatur im Lernen: sobald das Eingabefeld Fokus hat, wird die Seite kompakt (keine Kopfzeile, kleinere Karte, kompakte Leiste) und das Feld in den sichtbaren Bereich gerollt; geprüft bei 330 px sichtbarer Höhe (Vokabel- und Kurs-Karten, Schrift Mittel und Groß)

- Startseite „Lernen“ passt auf eine Seite ohne Scrollen (geprüft bei 390×844, 390×740, 360×740, 360×640; bei kleiner Höhe werden Abstände kleiner, bei unter 680 px entfallen Untertexte und Schnellknöpfe)
- Motivationsmeldung auf der Startseite: „heute geplant“ = heute schon beantwortet + noch fällig. Verglichen mit dem Tagesschnitt der letzten 7/14/30/90 Tage (ohne heute, Berliner Tage, nur wenn so viele Tage Verlauf da sind). Gezeigt wird immer das höchste übertroffene Fenster (90 vor 30 vor 14 vor 7). Tageszahlen werden auf dem Gerät gemerkt, geladen wird nur der neue Teil.

- Kurs-Lektionsansicht im neuen Stil: Kopfkarte mit Ring und Fortschritt, Tabs Ansicht/Vokabeln, Abschnittsliste mit Statuspunkt und „x von y gemeistert“, Freischalten-Knopf, Vokabel-Tab mit den vier Werten. Die Inhalte der Abschnitte (Dialoge, Grammatik) sind unverändert.
- Statistik im neuen Stil: Kennzahlen oben (fällig heute, heute beantwortet, Serie), Fortschritt je Vokabeln/Übungen mit einem Balken in vier Phasen (die „Neu“-Zeile ist anklickbar wie zuvor), Fällig-Diagramm (7/14/30/90, Heute antippen oder „Vorziehen“), Aktivität (7/14/30/90, bei 90 Wochen), Prüf-Aktivität, Stufen als ein Balken mit Details, Lektions-/Kurs-Übersicht, Werkzeuge. Lektionsfilter bleibt möglich.
- Vorziehen-Dialog: oben ausgerichtet, folgt dem sichtbaren Bereich (Tastatur) und bleibt bei 330 px sichtbarer Höhe vollständig bedienbar. Bottom-Sheets (Vokabel bearbeiten) folgen ebenfalls.

## Nicht gebaut / Entscheidungen
- Wischgesten für selbstbewertete Karten: nicht gebaut (Knöpfe bleiben).
- 12-Wochen-Aktivitätsraster: **entschieden: kein Raster** (Nils, 2026-10-07). Keine DB-View, nichts gebaut.
- Level-Verteilung (8 Zeilen) und die Statistik-Seite bleiben inhaltlich wie im alten Weg, nur anders gefärbt.
- Die Admin-Seiten haben das neue Gerüst (Navigation, Schrift, Bedienelemente); ihr Inhalt und ihre Funktionen sind unverändert.
- Die Partner-Oberfläche (Semia) ist nicht Teil des neuen Designs und unverändert.
- (erledigt) Der alte Weg ist entfernt; es gibt nichts mehr nachzuziehen.

## Offene Fragen
1. **Tagesziel:** Standard 100 Antworten. Dein Schnitt liegt bei etwa 165. Passt 100, oder lieber 150 als Standard?
2. ~~12-Wochen-Raster~~ — entschieden: nicht bauen.
3. **Wischgesten** bei Kurs-Karten (rechts = richtig, links = falsch): gewünscht?
4. ~~Partner-Ansicht~~ — umgesetzt (nur Skin, Ablauf unverändert).
5. **Umstellung:** Wenn du ganz wechseln willst, wird `trainer-neu.html` zu `trainer.html` (die alte Datei bleibt als `trainer-alt.html`) und `index.html` zeigt auf die neue.
6. **Hörkarten im Lernen:** Anteil aktuell etwa jede dritte Karte bei Stufe 0 bis 2 und jede siebte ab Stufe 3 (nur Vokabeln mit Audio). Anders gewünscht?

## Noch möglich (nicht entschieden, nicht gebaut)
- ~~Antwort-Paare, Konjugations-Fenster, Login, Sync-Anzeige~~ im neuen Stil (2026-10-07, im Browser getestet, nicht auf dem Handy)
- ~~Partner-Ansicht für Semia~~ per CSS im neuen Stil (nicht visuell getestet, braucht Partner-Anmeldung)
- Test auf dem Handy (echte Tastatur, iOS, Ton) und danach Feinschliff
