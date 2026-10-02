# manash und a7na im Kurs – umgesetzt 2026-10-02

**`mananesh` → `manash`** (Semia hat 3749 abgelehnt, „ein na zu viel"; TUNICO-Korpus belegt `mānāš`): Vokabel 3749 (`darija` `a7na manash`, `arabic_script` `احنا ماناش`, `partner_status` → `pending`), Übungen 171, 124, 169, Lektion 2 Grammatik. Undo: `manash` → `mananesh`, in 3749 `darija` `a7na mananesh`, `arabic_script` `احنا مانانش`, `partner_status` `rejected`.

**`e7na` → `a7na`** (Vokabeln schreiben `a7na`): 29 Felder, 30 Ersetzungen (28 Übungsfelder, Lektion 2 Grammatik). Alt/Neu je Feld in `e7na_zu_a7na.json` (Undo = neu → alt). Guard `feld = alt`, 29 von 29 getroffen, Rest 0.

# Pronomen im Kurs an die Vokabeln angeglichen – umgesetzt 2026-10-02

Maßstab: die Pronomen-Vokabeln der Lektion L11 (`enti`, `houwwa`, `a7na`, `entouma`, `houma`) und die Gemination-Regel (هُوَّ → `houwwa`, هِيَّ → `hiyya`). 179 Felder: `houa`/`huwwa` → `houwwa` (78), `heya`/`hiya` → `hiyya` (47), `huma` → `houma` (22), `intuma` → `entouma` (31), `inti` → `enti` (48), dazu `huwa` → `houwwa` in Übung 1804. Alt/Neu je Feld: `pronomen_angleichung.json` (Undo = neu → alt). 179 von 179 getroffen, Neuabruf ohne Abweichung.

Offen: `ena` (31×) gegen `ana` (123×) im Kurs, in den Vokabeln 8 gegen 7. Vokabel 494 `heya` (هِيَ, L11) steht gegen die Regel (`hiya`/`hiyya`).

# ana → ena im Kurs, zwei Pronomen-Vokabeln – umgesetzt 2026-10-02

Maßstab: Pronomen-Vokabel 491 `ena`. **Pronomen `ana` → `ena`** in Übungen und Lektionen (63 Felder, Alt/Neu in `ana_zu_ena.json`, Undo = neu → alt, 63/63 getroffen). **Nicht ersetzt:** `ana` als Fragewort „welche(r)/was für ein" (`fi-ana waqt`, `f-ana outil`, `ana bit zghir? illi …`, `ana banka?`, Übungen 229, 1096–1103, 347–349, 1200–1214, 1482, 1608 und die Zeilen in Lektion 3, 7, 8, 11) — 41 Stellen bleiben bewusst. In den Vokabeln stehen sieben Ninja-Sätze mit `ana` (Pronomen) unverändert.

Vokabeln: 494 `heya`/هِيَ → `hiyya`/هِيَّ, 3338 `inti bidek` → `enti bidek` (je mit Begründung in `internal_note`). Undo: 494 `heya`/`هِيَ`, 3338 `inti bidek`.
