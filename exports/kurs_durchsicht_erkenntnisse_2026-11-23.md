# Kurs-Durchsicht: Erkenntnisse vom 23.11.2026 (Stand nach Lektion 1)

Zweck: Morgen mit Lektion 2 weitermachen, ohne den Verlauf zu kennen. Das Vorgehen steht auch in `skills/tunsi/SKILL.md` (Absatz „Kurs Lektion für Lektion durchgehen“); das Log mit allen Einzelschritten und Backups steht in `exports/offene_punkte_2026-11-13.md`.

## 1. Was die Durchsicht gezeigt hat

Nils fand „in jeder neu aktivierten Lektion mehrere Fehler“. Das stimmt, und die Prüfungen im Trainer sahen vieles nicht. Fehlerklassen, mit Beispielen von heute:

| Klasse | Beispiele | Wer findet sie |
|---|---|---|
| Buchstabenfehler (ein Zeichen falsch) | `nashrbu` (nushrbu), `farga` (fargha), `el-hanan` (el-banan), `khbirt` (kbirt), `friska` (frishka) | Prüfung „Wort weicht um einen Buchstaben ab“ (leise), danach von Hand |
| dh/th vertauscht | hadhi, ya7fadh, khudh(u), widhnin, ustadha, idha, ndhifa (15 Funde) | Prüfung „dh/th vertauscht“ (zählt) |
| h statt 7 | `na7btu`, `ya7btu` (hbat hat ه), `nhutt` (n7utt) | von Hand gegen die Konjugationstabelle |
| Schreibung weicht von der Vokabel ab | lbas/labas, es-salam 3likum/as-salamu 3alaykum, 3a-s-slama/3aslama, b-es-slama/bislama, mashy/mashi | leise Wort-Prüfung, Vergleich mit Vokabelliste |
| Uneinheitlich im Grammatiktext | il-/el-, -iya/-iyya, dziri/jzayri, tnin/thnin, okht/ukht, maghrbi/maghribi | nur beim Lesen; der Grammatiktext wird von keiner Prüfung gelesen |
| Deutsch weicht von der Vokabel ab | „Schreibblock“ (Vokabel kurrasa = Heft) | nur beim Lesen |
| Wort fehlt in den Vokabeln | `7al` (Pl. 7wal), `thnin` | leise Wort-Prüfung |
| Wort nur in späterer Lektion verknüpft | khuth (L6), rqadt, shta (L7) | Prüfung „Vorgriff“ (zählt); gelöst durch Verknüpfen, nicht durch Ausnahme |
| Veraltete Regel im Text | langes a „neben harten Lauten“ (gilt seit 14.11. anders) | nur beim Lesen |
| Selbst erstellte Beispiele ohne Beleg | Ü1276 (tishta, ka-tir, tqarrab) | nur beim Lesen (Beleg „abgeleitet“) |
| Wortfamilie mischt verschiedene arabische Wurzeln | th-l-m (ث ل م / ظ ل م) und 12 weitere | im Trainer behoben (Familie über `wurzel_ar`) |
| Falsche Quelle-Annahme | `musli`, `raydha` wirkten falsch, sind aber in TUNICO / Peace Corps belegt | Quellenabgleich über `vocab_lookup` |

Wichtig: Die Prüfung „Wort weicht um einen Buchstaben ab“ ist nur eine Arbeitsliste. Von 255 Treffern waren ~25 echte Fehler; ~100 sind in einer Quelle belegt, ~74 sind Stamm + Endung, ~64 sind nirgends belegt (plausibel, nicht bewiesen). Nie als „alles ok“ melden.

## 2. Entscheidungen von Nils (gelten für alle weiteren Lektionen)

- **Der Kurs folgt der Vokabelschreibung.** Beispiele heute: `labas`, `bislama`, `as-salamu 3alaykum` / `w-3alaykum as-salam`, `3aslama`, `tisba7 3ala khir`, `fi laman`, `thnin`, `ukht`, `maghribi` / `maghribiyya`, `ej-jzayir` / `jzayri` / `jzayriyya`, `-iyya`, `el-` (nicht il-).
- **Verknüpfen statt Ausnahmen:** Taucht ein Wort vor seiner Lektion auf, die Vokabel mit der früheren Lektion verknüpfen (`khuth` L6, `rqadt` und `shta` L7), nicht in `KURS_VORGRIFF_OK`.
- **dh/th bleibt zunächst:** ض = dh, ظ/ذ/ث = th. Ob die Umschrift später getrennt wird (ṯ/ḏ/ẓ), ist offen; erst nach Erfahrung mit der Anzeige „Feine Konsonanten“ (Mehr → Darstellung). Fragen an Semia dazu noch nicht gestellt (ض/ظ gleich? ذ als th oder d?).
- **Neue Vokabeln aus dem Kurs:** nur nach Rückfrage, ohne Fälligkeit, wenn nichts anderes gesagt wird (`7al`, `thnin`). Sonst gilt „Neues zurzeit nicht aufnehmen“.
- **Wortfamilie** wird über die arabische Wurzel gebildet.
- **Anzeige:** feine Konsonanten ṣ ṭ ḍ ẓ (dunkle Laute) und ḏ ṯ als Schalter, Daten unverändert; Vokal-Auswahl in der Bearbeiten-Maske.

## 3. Stand der Lektionen

- **L1:** komplett (Dialoge, Grammatik, 102 Übungen, Verknüpfungen, Hörübungen). Leise Wort-Prüfung: keine Zeile. Zwei neue Vokabeln (`7al` 4883, `thnin` 4884).
- **Mit nach L2 nehmen:** `nashrbu` in Ü166 (→ nushrbu).
- **Mit nach L8:** Ü1356 `friska` → `frishka`, Ü1892 `el-fatur` → `el-ftur`.
- **Mit nach L4 / L7 / L10:** `libiya` (L4, 3×) → `libiyya`; `l-ayyamat` (L7, L10) → `l-ayyam`.
- **Leise Wort-Prüfung (Zahlen vom 23.11.):** L2 15, L3 39 (u. a. `dzayriya` Ü316, `ustad` Ü313), L4 73, L5 196, L6 199, L7 174, L8 132, L9 115, L10 162, L11 147, L12 108, L13 137, L14 154.
- Offene Reste von früher: Notizen an 1501 lazim und 4089 yilzimni; bash/illi-Übungen vor ihrer Erklärung; Backup-Tabellen von heute löschbar ab 2026-12-07.

## 4. Ablauf pro Lektion (so wie bei L1)

1. Leise Prüfungen für die Lektion ansehen („Wort steht in keiner Vokabel“, „Wort weicht um einen Buchstaben ab“).
2. Dialog, Grammatiktext und **alle** Übungen lesen (Person und Zahl passen zum Hinweis, Deutsch klingt natürlich, Schreibung = Vokabel, Grammatik erklärt, was die Übungen brauchen).
3. Grammatik-Beispielwörter gegen die Vokabeln legen (Skript `pw93.js`-Idee: Tokens in Tabellen und Beispielen, die in keiner Vokabel stehen).
4. Vorschlag als Tabelle (Ist → Soll → Beleg); Beleg aus `vocab_lookup` (TUNICO, Ninja, Peace Corps) und den Vokabeln.
5. Nach Bestätigung: Backup-Tabelle, ganzwortgenaues Ersetzen, Verweise mitziehen (`chunk_order`-Überschriften, `vocab_lesson_refs` nach Name), Prüfungen auf 0, Log, Commit, Push, auf Wunsch Merge.

Fallen, die heute vorkamen: Ein Aufruf mit mehreren Statements wird bei einem Fehler im letzten komplett zurückgerollt; Merge-Konflikte entstehen in `exports/offene_punkte_*.md` und `trainer.html`, weil main nur die Squash-Commits enthält (Lösung: main in den Branch mergen, eigene Fassung nehmen).

## 5. Was der Trainer (zusätzlich) prüfen könnte

Siehe Antwort im Chat vom 23.11.; Vorschläge, noch nichts gebaut.
