# Vokabelbestand-Analyse Tounsi-Trainer vs. Derja Ninja — Zusammenfassung (Stand 2026-07-25)

**Harte Regel (unbedingt beachten):** Nur lesende Zugriffe auf Supabase (`vocabulary`, `derja_ninja_import`). Keine INSERT/UPDATE/DDL ohne explizite Bestätigung durch den Nutzer.

## Projekt/Tabellen

- Supabase-Projekt `lzecflvfalxkodytnwzf`, Tabellen `vocabulary` (3193 Einträge) und `derja_ninja_import` (11531 Einträge, Staging-Tabelle für Derja-Ninja-Daten).
- Volle Backups liegen im Repo: `exports/tounsi_db_2026-07-24.md` und `exports/derja_ninja_import_2026-07-24.md`.
- Branch: `claude/vokabelbestand-ninja-analyse-w74nkg`.

## Ziel

Vokabeln in `vocabulary.arabic_script` (Tunesisch-Arabisch mit Diakritika) gegen `derja_ninja_import.darija_result` abgleichen, um fehlerhafte Vokalisierungen zu finden (Maß-I/II-Verwechslung, Homographen, Schadda-Fehler, etc. gemäß "tunsi"-Skill-Regeln).

## Bisheriger Fortschritt — Matching-Methoden ("Ansätze") getestet

1. **Ansatz 1**: Exakter Konsonanten-Match (Diakritika gestrippt) — Basis-Methode.
2. **Ansatz 2**: Deutsch→Englisch-Übersetzung, dann Abgleich gegen `english_word` — niedrige Trefferquote (~1%).
3. **Ansatz A**: Artikel `ال` vor Vergleich entfernen — 44 Treffer, ~86% Qualität.
4. **Ansatz B**: Substring-Suche in `samples`-JSONB — verrauscht bei kurzen Wörtern.
5. **Ansatz C/D**: Ein-Zeichen-Diff-Matching für lange Wörter (6+ Zeichen) — mäßig brauchbar.
6. **Ansatz E**: Ein-Zeichen-Diff nur bei bekannten "verwechselbaren" Buchstabenpaaren (س/ص, ت/ط, etc.) — ~50-60% Präzision.
7. **Ansatz F**: Mehrwort-Phrasen in Einzeltokens zerlegen und einzeln matchen.
8. **Ansatz G**: Hamza-Varianten, ة/ه, ى/ي normalisieren — ~6 zusätzliche gute Treffer.

Insgesamt bisher ca. 630+ Kandidaten-Treffer über alle Ansätze gesammelt, noch nicht final konsolidiert.

## Wichtigster neuer Befund (stark bestätigt, noch nicht abschließend verifiziert)

Von 10 stichprobenartig getesteten "kein Match"-Wörtern zeigten **3 einen kompletten Datenlücken-Fall**: Der Live-Eintrag auf derja.ninja existiert nicht in unserer lokalen `derja_ninja_import`-Kopie — nicht mal versteckt in einem Kompositum:

- **"Institut" → مَعْهِدْ**: bestätigt per Live-Suche (`/search?search=Institut&script=english`), Eintrag #5 "institute, high school" → مَعْهِدْ. Lokal nur Komposita مَعْهِدْ التَّجْمِيلْ / مَعْهِدْ نَمُوذَجِي vorhanden.
- **"Bär" → دُبّْ**: komplett fehlend, lokal nur "دَبْدُوبْ" (Teddybär) unter englisch "bear".
- **"Koch" → طَبَّاخْ**: komplett fehlend, lokal nur "كُوجِينِي" (Lehnwort "cuisinier") unter englisch "cook".

Das deutet darauf hin, dass der lokale Scrape der `derja_ninja_import`-Tabelle **unvollständig gegenüber der aktuellen Live-Seite** ist — nicht nur ein Matching-Algorithmus-Problem. Ein relevanter Teil der ~2157 komplett unmatched Einträge könnte daher reine Scraper-Lücken sein statt echter Vokabelfehler.

Andere getestete Wörter (Brust/صَدْر, Vase/زَهْرِيَّة, wegwerfen/طَيَّش, Guave/جْوَافَة, Großmutter/مَامَة, Verwandte/قرايب) zeigten stattdessen eine zweite Fehlerklasse: der lokale Eintrag existiert, aber unter einem anderen Sinn/einer anderen Übersetzung des englischen Suchworts (mehrdeutige Glosse), oder es handelt sich um eine andere, aber verwandte Wortform (Genus/Plural/Dialektvariante).

## Nächste Schritte

Netzwerkzugriff auf derja.ninja wurde in einer neuen Cloud-Umgebung (Custom Network Access, `derja.ninja` erlaubt) erfolgreich freigeschaltet und verifiziert. Die Analyse wird in dieser neuen Session fortgesetzt:

1. Systematisch weitere Stichproben der unmatched Einträge direkt live auf derja.ninja nachschlagen (URL-Muster: `https://derja.ninja/search?search=<wort>&script=english`), um eine belastbare Quote für "Scraper-Lücke vs. andere Ursache" zu ermitteln.
2. Bei Bedarf einen saubereren/vollständigeren Re-Scrape von derja.ninja vorschlagen (nur lesend, Ergebnis wird separat vom Nutzer geprüft, bevor irgendetwas in Supabase geschrieben wird).
3. Perspektivisch: alle bisherigen Kandidaten (Ansatz 1+A+C+E+F+G) zu einer konsolidierten Liste zusammenführen, dem Nutzer zur Prüfung vorlegen.
4. Erst nach expliziter Nutzerbestätigung: SQL-UPDATE-Vorschläge für akzeptierte Korrekturen vorbereiten (nie ausführen ohne Freigabe).
