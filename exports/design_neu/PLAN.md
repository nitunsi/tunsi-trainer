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

## Offene Fragen (werden unten gesammelt)
