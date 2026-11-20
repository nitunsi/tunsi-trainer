# Entwurf für SKILL.md: Formen-Regel, 20.11.2026 — noch nicht eingetragen

## 1. Neuer Abschnitt in SKILL.md (hinter „Wurzeln bei Nomen, Adjektiven und übrigen Vokabeln“)

- **Formen: Feminin, Plural, Dual, Einzelnes, Elativ (seit 2026-11-20).** Spalte `vocabulary.formen` (Text), im Trainer als Zeile „Formen“ auf der **Rückseite** der Lernkarte (nach der Wurzelzeile) und als Feld im Bearbeiten-Fenster. Nils: **nie im Deutsch und nie auf der Vorderseite** (sonst verrät die Frage die Antwort), und keine eigenen Zeilen für regelmäßige Formen.
  - **Format:** Kürzel `f.` · `Pl.` · `Dual` · `Einzelnes` · `Einzelne Pl.` · `Elativ` · `Inst.`, getrennt durch ` · `, Varianten durch ` / `, nur Umschrift: `f. 3zīza · Pl. 3zǟz`.
  - **Quelle:** `tunico_import.inflected` mit den Tags `#adj_f`, `#adj_pl`, `#adj_elative`, `#n_pl`, `#n_dual`, `#n_unit`, `#n_unit_pl`, `#n_inst`. **Alle Varianten stehen lassen** (Nils). Nur Wörter mit eindeutigem TUNICO-Lemma und passender Bedeutung; Homonyme mit anderer Wortart (sman „Butter“, ghrab „Krähe“, 7abb/7all/saq als Verb) bekommen nichts. Komparative (akbar, a7la …) sind eigene Wörter; sie stehen als „Elativ …“ in der Zeile des Adjektivs, bekommen aber selbst keine.
  - **Schreibung:** unsere Konventionen (Nisba -iyya statt TUNICO -iya, th/dh), nicht die TUNICO-Chatalpha.
  - **Länge und Klang sind Pflicht** (Nils 2026-11-20): TUNICO liefert in `orig` lange Vokale mit Strich (ʕzāz); daraus entsteht das Pseudo-Arabische (Konsonant + Fatha/Kasra/Damma, Alif/Ya/Waw bei langem Vokal, Endung -a als ة) und `laengeHtml()` des Trainers setzt Länge und Klang (ǟ ā ī ū ä) nach derselben Regel wie bei allen Karten. Ausnahmen: das ī vor -yya ist bei uns kurz (tunsiyya, nicht tunsīyya); `r` ohne Punkt gilt als hell (`r_hell`). Stichprobe gegen unsere vorhandenen Formen: 75 von 81 gleich; die Abweichungen sind Fälle, in denen TUNICO eine andere Länge hat als unser Arabisch; für neue Formen gilt TUNICO. Bei Formen, die als eigene Vokabel existieren, die Zeichen dieser Vokabel nehmen (`trL`).
  - **Alle Zeilen einer Familie tragen dieselbe Zeile:** m.-Zeile, vorhandene f.-Zeile, vorhandene Pl.-Zeile (kbir, kbira, kbar: `f. kbīra · Pl. kbār · Elativ akbar`). Wechselkarten von Verben haben kein Formen-Feld.
  - **Anzeige im Trainer** (`formenZeile`, `formenMarke`): Der Text ist schon markiert gespeichert; `kursLaenge` läuft nur über unmarkierte Wörter (sonst wird ein Stück wie „ma“ in 7ashshǟma zu mä), die Anzeige-Stufe (Klang / nur Länge / aus) wird nachgezogen.
  - **Vorgehen bei Änderungen:** als Batch vorschlagen (Wort, Zeilen, Formen-Zeile), Sicherung `backup_<datum>_formen`, danach Render-Test (`formenZeile(v)` gleich gespeichertem Text) und Trainer-Prüfungen.

## 2. Neuanlage-Checkliste, Punkt 7 ersetzen
Alt: „7. Plural/Singular/Feminin: eigene Zeilen nur auf Nils' Wunsch.“
Neu: „7. **Formen:** Feminin, Plural, Dual, Einzelnes, Elativ in das Feld `formen` (siehe oben), alle Zeilen der Familie gleich; eigene Zeilen für Formen nur auf Nils' Wunsch.“

## 3. Werkzeug
Der Generator (TUNICO-`orig` → markierte Umschrift per `laengeHtml`) läuft als Playwright-Skript gegen `trainer.html`. Vorschlag: nach `tools/formen_vorschlag.js` legen, damit er in künftigen Sitzungen zur Hand ist. Ablage nur nach Nils' Ja.
