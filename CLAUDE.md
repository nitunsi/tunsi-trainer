# tunsi-trainer

Vokabeltrainer für Tunesisch-Arabisch (Nils + Semia). Vokabeln leben in Supabase, nicht im HTML (`trainer.html`).

Bevor du an Vokabeln, Import, Transliteration, Kurs-Modus oder sonst irgendetwas rund um den Vokabelbestand arbeitest, lies zuerst die Arbeitsregeln in diesem Repo — **nicht** den gleichnamigen "tunsi"-Skill im Claude-Account, der ist ein manuell hochgeladener Snapshot und veraltet gegenüber diesem Repo:

- `skills/tunsi/SKILL.md` — Kern-Workflows, Datenregeln, Transliterations-Pflichtregeln, Topic-Regeln, Duplikat-Check
- `skills/tunsi/IMPORTS.md` — Import-Methodik je Quelle (PDF/Foto, Uni-Wien, TUNICO, Peace Corps, Derja Ninja, Instagram)
- `skills/tunsi/PRECEDENTS.md` — Präzedenzfälle/Fehlerbilder aus früheren Sessions
- `skills/tunsi/COURSE_MODE.md` — Kurs-Modus (`course_lessons`/`course_exercises`)

Diese Dateien werden laufend im Repo weiterentwickelt und sind der aktuelle Stand. Änderungen an den Arbeitsregeln gehören hierher (committen + pushen), nicht in den claude.ai-Skill.
