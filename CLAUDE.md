# tunsi-trainer

Vokabeltrainer für Tunesisch-Arabisch (Nils + Semia). Vokabeln leben in Supabase, nicht im HTML (`trainer.html`).

## Die eine Regel, die immer gilt

**Nie ohne Bestätigung in Supabase schreiben.** Jedes `INSERT`/`UPDATE`/`DELETE` erst als Vorschlag zeigen (betroffene Zeilen, Ist-Wert, Soll-Wert, Beleg), auf Bestätigung warten, dann schreiben — jede Tabelle, jede Größenordnung, auch ein einzelnes Wort. Sie steht hier und nicht nur in `SKILL.md`, weil sie auch für Sitzungen gilt, die den Prozess-Teil gar nicht laden.

Zwei stehende Lockerungen von Nils: **Korrekturen im Batch** dürfen ohne Einzelbestätigung laufen, wenn das Verfahren vorher gezeigt wurde. **Neue Vokabeln anlegen** ist in Ordnung, wenn Formen fehlen — aber vorher fragen, und dabei auch fragen, ob fällig gesetzt werden soll.

## Prüfungen gehören in den Trainer

Der Trainer prüft den Bestand selbst (*Mehr → Prüfungen*, Zahl auf *Lernen*); **dort zuerst nachsehen, Ziel 0**. Bei jeder neuen Prüfung, die du baust oder von Hand wiederholst, erst überlegen, ob sie aus den im Trainer geladenen Daten machbar ist, und das Nils **vorschlagen** (nicht ohne Bestätigung einbauen). Was geprüft wird und wie: `skills/tunsi/SKILL.md` → „Prüfungen im Trainer“.

## Welche Arbeitsregeln du liest — und wann

Die Regeln liegen **in diesem Repo** (`skills/tunsi/`), nur hier. Den gleichnamigen „tunsi"-Skill im Claude-Account gibt es als alten Snapshot (Stand 2026-11-20), er ist **inaktiv und wird nicht gepflegt** (Nils nutzt nur Claude Code für den Trainer). Änderungen an den Arbeitsregeln: hier eintragen, committen, pushen und auf main mergen, denn eine neue Sitzung sieht nur main. **Kein ZIP und kein Upload nötig, auch nicht danach fragen.**

**Lies die Datei, die zu deiner Aufgabe gehört — nicht alle.** Zusammen füllen sie knapp die Hälfte eines Kontextfensters, bevor du irgendetwas getan hast. SKILL.md beginnt mit **„Häufige Fehler“ und den Folgeorten** — die gelten bei jeder Korrektur.

| Aufgabe | lies |
|---|---|
| Vokabeln prüfen, korrigieren, neu anlegen | `skills/tunsi/SKILL.md` — der Prozess, Datenregeln, Transliteration, Duplikat-Check |
| … und ein Qualitäts-Check hat getroffen | dazu `skills/tunsi/CHECKS.md` (SQL-Checks A/B/C) |
| … und du schlägst ein Wort in den Quellen nach | dazu `skills/tunsi/LOOKUP.md` (vocab_lookup) |
| Code am Trainer (`trainer.html`) | `skills/tunsi/COURSE_MODE.md` → **Code-Änderungen**. SKILL.md brauchst du dafür nicht |
| Kurs-Modus (`course_lessons`/`course_exercises`) | `skills/tunsi/COURSE_MODE.md` |
| Neue Vokabel anlegen (auch einzelne) | `skills/tunsi/SKILL.md` → **„Neuanlage-Checkliste“** (Wurzel, Beleg, Lehnwort, Wortfamilie, Karte ansehen) und **„Quellen-Checkliste“** (alle TUNICO-Tabellen, Ninja, Peace Corps, SL24, Skript) |
| Neue Quelle importieren, PDF/Foto auswerten | `skills/tunsi/IMPORTS.md` |
| „Hatten wir das schon mal?", Fehler wiederholt sich | `skills/tunsi/PRECEDENTS.md` — **gezielt durchsuchen, nie am Stück lesen** |

Unsicher, wo etwas steht? Die **Schnellzugriff**-Tabelle am Kopf von `SKILL.md` ist der Wegweiser — sie ist kurz und nennt für jede Situation den richtigen Abschnitt.

## Zwei Dateien, die du nie am Stück liest

- **`trainer.html`** ist ~460 KB (~147k Tokens, drei Viertel eines Kontextfensters). Mit `grep` und `sed -n 'a,bp'` arbeiten, nie mit einem vollständigen `Read`. Vor dem Ausliefern: Syntaxprüfung per `node vm.Script()` (siehe COURSE_MODE.md).
- **`skills/tunsi/PRECEDENTS.md`** ist ~110 KB Fallgeschichten. Sie sind nach Thema überschrieben — den passenden Eintrag suchen, nicht die Datei lesen.

## Zahlen nie aus den Regeldateien zitieren

Bestandszahlen, Trefferzahlen und Fortschritt stehen dort als Momentaufnahme und veralten. Immer live ziehen — `SELECT * FROM public.qualitaets_checks WHERE treffer > 0;` und die Abfragen, die in den jeweiligen Abschnitten daneben stehen.
