# Backup 2026-09-13

Punkt-in-Zeit-Sicherung vor dem Entfernen von `vocabulary_review`. Jede Datei ist ein
gzip-komprimiertes JSON-Array mit **allen** Spalten der Tabelle, über die PostgREST-API
seitenweise gezogen (je Seite auf gültiges JSON geprüft, Zeilenzahl am Ende gegen die
Tabelle abgeglichen — alle acht stimmten exakt).

| Datei | Zeilen | Spalten | Inhalt |
|---|---|---|---|
| `vocabulary.json.gz` | 3.780 | 26 | der Vokabelbestand selbst |
| `progress.json.gz` | 2.097 | 9 | SRS-Stand je Vokabel (`next_review`, Zähler) |
| `review_log.json.gz` | 13.361 | 6 | jede einzelne beantwortete Abfrage |
| `lessons.json.gz` | 26 | 4 | Lektionsnamen |
| `course_lessons.json.gz` | 13 | 8 | Kurs-Modus: Lektionen inkl. `grammar_notes`, `dialog_text` |
| `course_exercises.json.gz` | 2.094 | 13 | Kurs-Modus: Übungen |
| `course_progress.json.gz` | 9 | 7 | Kurs-Fortschritt |
| `course_exercise_progress.json.gz` | 87 | 9 | Kurs-Übungsfortschritt |
| `vocabulary_review.json.gz` | 3.181 | 23 | **die entfernte Tabelle**, vollständig |

Nicht gesichert, weil unverändert und jederzeit neu beschaffbar: `derja_ninja_entries`,
`derja_ninja_import`, `tunico_*`, `peacecorps_*`, `uniwien_source_pages`. Ebenfalls nicht: `users`.

## Wiederherstellen

```bash
gunzip -c vocabulary.json.gz > /tmp/vocabulary.json
# dann per PostgREST zurückschreiben (service_role-Key als Env-Var, siehe IMPORTS.md
# → "Bulk-Insert bei großen Mengen"); vorher Zielzustand prüfen, nie blind einspielen.
```

## Was in `vocabulary_review.json.gz` steckt

Drei sehr ungleiche Teile — beim Wiederherstellen nicht als eine Sache behandeln:

- **1.533 Zeilen** vom `2026-07-25 09:03:00+00`, alle mit demselben Zeitstempel: ein
  Backup von `vocabulary`, das versehentlich in der Vorschlagstabelle lag. Redundant —
  die echte Sicherung desselben Tages liegt als Tabelle `vocabulary_backup_2026_07_25`
  (3.193 Zeilen, also vollständiger) in der Datenbank.
- **1.587 Zeilen** in 21 Kategorien, die frühere Sitzungen erfunden haben und die weder
  die App noch sonst jemand gelesen hat.
- **61 Zeilen** mit echten Entscheidungen von Nils (32× übernommen, 29× kein Treffer)
  plus 1 Freitext-Kommentar. Diese 61 Begründungen wurden vor dem Löschen nach
  `vocabulary.internal_note` übernommen — sie sind also nicht nur hier, sondern live.
