# tunsi-trainer

Vokabeltrainer für Tunesisch-Arabisch (Nils + Semia). Vokabeln leben in Supabase, nicht im HTML (`trainer.html`).

## Die eine Regel, die immer gilt

**Nie ohne Bestätigung in Supabase schreiben.** Jedes `INSERT`/`UPDATE`/`DELETE` erst als Vorschlag zeigen (betroffene Zeilen, Ist-Wert, Soll-Wert, Beleg), auf Bestätigung warten, dann schreiben — jede Tabelle, jede Größenordnung, auch ein einzelnes Wort. Sie steht hier und nicht nur in `SKILL.md`, weil sie auch für Sitzungen gilt, die den Prozess-Teil gar nicht laden.

Zwei stehende Lockerungen von Nils: **Korrekturen im Batch** dürfen ohne Einzelbestätigung laufen, wenn das Verfahren vorher gezeigt wurde. **Neue Vokabeln anlegen** ist in Ordnung, wenn Formen fehlen — aber vorher fragen, und dabei auch fragen, ob fällig gesetzt werden soll.

## Neue Tabelle anlegen: Grants nicht vergessen (seit 30.10.2026)

Supabase vergibt seit dem 30.10.2026 keine automatischen Data-API-Grants mehr für neue Tabellen im `public`-Schema (Projekt `lzecflvfalxkodytnwzf`). Jede `CREATE TABLE`-Migration braucht deshalb direkt diese drei Statements mit, sonst liefert die Data API `permission denied`:

```sql
grant select on public.<tabelle> to anon;
grant select, insert, update, delete on public.<tabelle> to authenticated;
grant select, insert, update, delete on public.<tabelle> to service_role;
```

Bestehende Tabellen sind nicht betroffen, behalten ihre Grants. Gilt nur für dieses Projekt — für andere Supabase-Projekte (z.B. Trainingslog) separat beachten, dort dokumentiert diese Datei nichts.

## Welche Arbeitsregeln du liest — und wann

Die Regeln liegen **in diesem Repo**, nicht im gleichnamigen „tunsi"-Skill im Claude-Account: der ist ein manuell hochgeladener Snapshot und veraltet gegenüber diesem Stand. Änderungen an den Arbeitsregeln gehören hierher (committen + pushen).

**Lies die Datei, die zu deiner Aufgabe gehört — nicht alle vier.** Zusammen sind sie rund 280 KB und füllen knapp die Hälfte eines Kontextfensters, bevor du irgendetwas getan hast.

| Aufgabe | lies |
|---|---|
| Vokabeln prüfen, korrigieren, neu anlegen | `skills/tunsi/SKILL.md` — der Prozess, Datenregeln, Transliteration, Duplikat-Check |
| … und ein Qualitäts-Check hat getroffen | dazu in SKILL.md den Abschnitt **Datenqualitäts-Checks** (er ist ein Drittel der Datei — nur dann nötig) |
| … und du schlägst ein Wort in den Quellen nach | dazu in SKILL.md den Abschnitt **vocab_lookup** |
| Code am Trainer (`trainer.html`) | `skills/tunsi/COURSE_MODE.md` → **Code-Änderungen**. SKILL.md brauchst du dafür nicht |
| Kurs-Modus (`course_lessons`/`course_exercises`) | `skills/tunsi/COURSE_MODE.md` |
| Neue Quelle importieren, PDF/Foto auswerten | `skills/tunsi/IMPORTS.md` |
| „Hatten wir das schon mal?", Fehler wiederholt sich | `skills/tunsi/PRECEDENTS.md` — **gezielt durchsuchen, nie am Stück lesen** |

Unsicher, wo etwas steht? Die **Schnellzugriff**-Tabelle am Kopf von `SKILL.md` ist der Wegweiser — sie ist kurz und nennt für jede Situation den richtigen Abschnitt.

## Zwei Dateien, die du nie am Stück liest

- **`trainer.html`** ist ~460 KB (~147k Tokens, drei Viertel eines Kontextfensters). Mit `grep` und `sed -n 'a,bp'` arbeiten, nie mit einem vollständigen `Read`. Vor dem Ausliefern: Syntaxprüfung per `node vm.Script()` (siehe COURSE_MODE.md).
- **`skills/tunsi/PRECEDENTS.md`** ist ~110 KB Fallgeschichten. Sie sind nach Thema überschrieben — den passenden Eintrag suchen, nicht die Datei lesen.

## Zahlen nie aus den Regeldateien zitieren

Bestandszahlen, Trefferzahlen und Fortschritt stehen dort als Momentaufnahme und veralten. Immer live ziehen — `SELECT * FROM public.qualitaets_checks WHERE treffer > 0;` und die Abfragen, die in den jeweiligen Abschnitten daneben stehen.
