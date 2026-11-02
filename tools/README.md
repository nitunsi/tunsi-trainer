# tools/ — Prüfwerkzeug für den Vokabelbestand

Entstanden in Runde 63. Zweck: die immer gleichen Prüfungen ohne Neuaufbau in jeder Session,
und ohne dass große Datenmengen durch den Modellkontext laufen müssen.

## `chatalpha.js`

Exakter JavaScript-Port von `public._arabic_to_chatalpha` (Einzelwort-Fall). Validiert gegen
18 Referenzwerte aus der Datenbank, inklusive der Sonderfälle (Artikelassimilation `ez-zka`,
Damma+Waw als langes u, Hamza-Träger am Wortanfang). **Bei jeder Änderung an der SQL-Funktion
muss der Port nachgezogen und neu validiert werden.**

## `vokalisierer.js`

`vokalisiere(arabisch_unvokalisiert, zielumschrift)` sucht per Tiefensuche die Harakat-Belegung,
deren Rückrechnung exakt die Zielumschrift ergibt. Setzt **nur Diakritika**, verändert nie
Buchstaben. Beachtet die Lautlehre-Regeln aus `skills/tunsi/SKILL.md`: keine Schadda auf dem
ersten Buchstaben, keine Marke auf einem reinen Langvokalträger (ا/آ/ى), Vokalzeichen vor der
Schadda (Hauskonvention).

### Wichtig: die Zielumschrift ist NICHT unsere eigene `darija`

In Runde 63 an 2.461 handvokalisierten Zeilen geprüft: nur 554 hätte der Solver identisch
reproduziert. Die Abweichungen zeigen warum — unsere `darija` ist eine **verkürzte** Umschrift:

    256  Mensch: قَلَم (qalam)     Solver mit darija-Ziel: قْلَمْ (qlam)
    262  Mensch: أَرْبَعَة (arba3a)  Solver mit darija-Ziel: أرْبْعَة (arb3a)

Die `darija` darf die Vokalisierung nur **einschränken** (Konsonanten, Gemination), nicht
bestimmen. Als Ziel gehört eine echte Vokalquelle: `tunico_import.lemma_chatalpha`/`variants_chatalpha`
oder `peacecorps_dict_import.forms_chatalpha`.

**`tunico_import.inflected` nicht vergessen.** Unser Bestand ist voller Plurale und Duale, TUNICOs
Lemma ist immer der Singular. Ohne die Flexionsformen (mit Analysetag `#n_pl`, `#n_dual`,
`#v_pres_sg_p3`) zieht das Skelett den Plural auf den Singular: `fnejin` auf `finjan`, `mgharif`
auf `mgharfa`. Ebenso: bei `darija` mit Artikel (`el-`/`esh-`/`ez-`) den Artikel vor der Suche
abtrennen und danach wieder voranstellen, sonst trifft das Skelett nie ein Lemma.

## Pflichtfilter vor dem Schreiben

Reihenfolge wie in Runde 63 verwendet, jeder einzelne hat echte Fehlpaarungen abgefangen:

1. **Skelett gleich** — `_translit_skeleton(darija) = _translit_skeleton(Ableitung)`, sonst
   entsteht ein Check-24/25-Treffer.
2. **Vokalanzahl gleich** — fängt Wortform-Wechsel ab, die das Skelett nicht sieht:
   `shrit` → `shrita`, `7raqt` → `7arqat` (1. gegen 3. Person), `n3am` → `na3ma`.
3. **Bedeutungsabgleich** — TUNICOs deutsche Glosse gegen unser `german`. Ohne ihn zieht das
   vokalfreie Skelett `esh-shta` (Winter) auf `shushit` (grillen).
4. **Lösbarkeit als Filter** — wenn sich die Quellform aus unseren Buchstaben nicht erzeugen
   lässt, ist es eine andere Wortform (`fnejin` Plural gegen `finjan` Singular). Kein Sonderfall
   nötig, der Solver findet dann einfach keine Lösung.
5. **Rückrechnung durch die Datenbank selbst** — vor dem `UPDATE` immer gegen
   `public._arabic_to_chatalpha` prüfen, nicht nur gegen den Port.
6. **Kein zusaetzlicher Endvokal** — endet die Quellform auf einen Vokal, den unser Wort nicht hat,
   ist es eine andere Wortform (`ka3k`/`ka3ka`, `shbih`/`shbiha`). Der Solver haengt sonst ein Fatha
   an den letzten Buchstaben, ohne dass ein Vokaltraeger folgt.
7. **Kollisionsprobe gegen bereits vokalisierte Zeilen** — in Runde 63 vergessen; `1522` wurde
   dadurch identisch mit `4111` und riss Check 10 der Gruppe A auf.

## Datenmengen am Kontext vorbei

Bestand und Quelltabellen per REST auf die Platte holen und in Node auswerten, nicht per
`execute_sql` in den Kontext. Pflicht dabei: `Prefer: count=exact` mitschicken und den
`content-range`-Header gegen die erwartete Zeilenzahl prüfen.

## Audio-Sicherung (`audio_sichern.py`, `audio_sichern.ipynb`)

Sichert alle Audios von Derja Ninja und Sprachenlernen24 (auch die noch nicht benutzten; ca. 24.600 Dateien, 9–10 GB (Ninja-Dateien im Schnitt 530 KB)) als `.tar`-Pakete plus `manifest.csv`. Die „Extra-Audios“ (`17min.io` und `…/Extra-Audios/`, zusammen 23.176 Dateien) fehlen absichtlich: keine Verlagskennzeichnung, im Oktober 2026 neu erzeugt, vermutlich Computerstimmen; mit `--mit-extra` kommen sie dazu. Läuft lokal oder in Google Colab (Notizbuch, schreibt direkt ins Drive). Die Adressen kommen aus der Ansicht `public.audio_sicherung_liste` (nur Lesen, anon). Die Ansicht enthält SL24-Texte und ist nur für die Dauer der Sicherung gedacht: danach `DROP VIEW public.audio_sicherung_liste;` (führt Nils im SQL-Editor aus). Neue Läufe überspringen fertige Pakete; für eine spätere Wiederholung die Ansicht neu anlegen.
