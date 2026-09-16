# Plan: TUNICO-Button → Quellenabgleich

Stand 2026-09-16. Ersetzt die Funktion hinter `setMode('tunico')` / `showTunicoCandidates()`.
Umsetzung paketweise, jedes Paket einzeln testbar und committebar.

## Warum

Drei Konstruktionsfehler der heutigen Funktion, alle gemessen am 2026-09-16:

1. **Eingefrorener Schnappschuss.** `tunico_candidates.auto_verdict` und `.matched_vocab_id` wurden
   2026-08-08 bis 2026-08-11 einmal berechnet und nie wieder. Seitdem sind 373 Vokabeln dazugekommen.
   Von 575 offenen Kandidaten haben 312 (54 %) heute einen Skelett-Treffer im Bestand; 156 der 374
   rot als „fehlt" markierten Zeilen sind längst da.
2. **Zu enge Grundgesamtheit.** Kandidaten = Top-300 Verben + Top-300 Nomen + Top-64 Adjektive.
   Das Korpus hat 2.102 Lemmata (2.023 nach Auftrennen der Pipe-Bündel). Alles, was nicht
   Verb/Nomen/Adjektiv ist, konnte nie Kandidat werden — genau dort sitzen die größten Lücken:
   `kull` (656×), `ma3nitha` (434×), `kif-ma` (293×), `kif` (221×), `bnadim` (127×),
   `ma-ysal-sh` (81×), `7asilu` (45×).
3. **Eine Quelle, eine Rangachse.** Peace Corps hat eine unabhängige didaktische Rangliste
   (`freq` 1–5, 1 = wichtigstes) über 5.070 Einträge, im Trainer nirgends benutzt. Von 660
   Einträgen mit Rang 1 fehlen 149 ganz, bei Rang 2 weitere 238.

Nebenbefund: `matched_vocab_id` ist eine einzelne Spalte und kann Homonyme nicht abbilden
(`sabb` passt gleichzeitig auf #4508 „er beleidigte" und #4506 „er goss").

## Kernidee

Die Vorschlagsliste wird **nicht mehr gespeichert, sondern bei jedem Öffnen berechnet**.
`tunico_candidates` hört auf, *die Liste* zu sein, und wird reines **Entscheidungs-Protokoll**.
Angezeigt wird: alle Quell-Lemmata **minus** aktueller Bestand **minus** Protokoll.

Damit können Fehler 1 und 2 strukturell nicht mehr entstehen.

### Machbarkeit ist gemessen, nicht geschätzt

Der teure Teil (2.023 Korpus-Lemmata gegen 3.775 Vokabeln per Skelett) läuft in **95 ms**,
weil `vocabulary.translit_skeleton` eine gespeicherte, indizierte Spalte ist
(`idx_vocab_translit_skeleton`, Index-Only-Scan).

**Fallstrick, der beim Schreiben jeder Abfrage gilt:** `_translit_skeleton(v.darija)` statt
`v.translit_skeleton` schreiben macht aus 95 ms einen Timeout > 60 s. Immer die gespeicherte
Spalte benutzen.

## Namensumstellung

| heute | neu |
|---|---|
| Nav-Button `🗂️ TUNICO` | `🧭 Quellenabgleich` |
| Mode-Key `'tunico'` | `'quellen'` |
| `showTunicoCandidates()` | `showQuellenAbgleich()` |
| JS-Präfix `_tn*` | `_qa*` |
| Tabelle `tunico_candidates` | `import_entscheidungen` |
| — (neu) | View `quellen_abgleich`, MatView `quellen_lemmata`, View `vocab_tokens` |

## Die vier Zustände statt „fehlt/vorhanden/unsicher"

Der `kull`-Fund zeigt, dass die heutige Liste drei verschiedene Dinge als „fehlt" ausgibt:

| Bucket | Bedingung | Aktion im UI |
|---|---|---|
| `fehlt` | kein Skelett-Treffer, Skelett auch in keiner Phrase | ➕ Neu anlegen |
| `baustein` | Skelett kommt nur *innerhalb* mehrwortiger `darija` vor, nie als eigene Zeile | ➕ Als Einzelwort nachziehen |
| `variante` | Skelett-Treffer erst bei Levenshtein ≤ 1 | ✓ Beleg auf bestehende Zeile statt Neuanlage |
| `vorhanden` | exakter Skelett-Treffer auf einer einwortigen Zeile | ausgeblendet (nur über Filter) |

Belege für die Buckets:
- `baustein`: `kull` (Skelett `kll`) steckt in 15 Phrasen (`kol youm`, `koll we7id w karhabtou`),
  hat aber keine eigene Zeile. `kif` genauso (`kif kif`, `kifesh`, `kif il-3ada`).
  Der Skelett-Vergleich schlägt hier fehl, weil Phrasen-Skelette den ganzen Satz zusammenziehen
  (`kol youm` → `klm`) — deshalb braucht es `vocab_tokens` (Paket 2).
- `variante`: `inshalla` (`nshll`) vs. vorhandenes `inshallah` (`nshllh`), `tlatha` (`tlth`) vs.
  `thletha` (`thlth`). Keine Lücke, sondern ein geschenkter `external_confirmed`-Treffer.

`baustein` ist didaktisch die wertvollste Gruppe: sie schließt Phrasen auf, die schon im Trainer sind.

## Der Score

Sichtbar, additiv, in Einzelkomponenten im UI aufgeschlüsselt — Nils muss sehen *warum* ein Wort oben steht.

```
score =   ln(1 + freq_korpus) * 10        -- TUNICO-Korpus: gesprochene Realität (0…85)
        + (6 - rang_pc) * 12              -- Peace Corps: didaktisches Urteil (1→60, 5→12, NULL→0)
        + (anzahl_quellen - 1) * 25       -- Mehrfachbelegung: echtes Wort, kein Korpus-Artefakt
        + (hat_ninja_audio ? 20 : 0)      -- Anlege-Reife
        + (bucket = 'baustein' ? 30 : 0)  -- schließt vorhandene Phrasen auf
```

Die Gewichte sind ein Startwert. **Pflichtschritt nach Paket 5:** die ersten 50 Zeilen der
sortierten Liste ansehen und die Gewichte einmal nachziehen, bevor das UI gebaut wird.

## Was jede Quelle beisteuert

| Quelle | Lemma | Arabisch | Deutsch | Englisch | Audio | Wortart | Rang |
|---|---|---|---|---|---|---|---|
| `tunico_import` (7.543) | ✓ | ✓ | ✓ (`senses→de`) | ✓ | — | ✓ | — |
| `tunico_corpus_wordforms` (9.874) | ✓ | — | — | — | — | ✓ (roh) | Korpusfrequenz |
| `derja_ninja_entries` (17.335) | ✓ | ✓ | — | ✓ | ✓ | `pos_tag` | — |
| `peacecorps_dict_import` (5.070) | ✓ (Lautschrift) | rekonstruiert, **kein Faktum** | — | ✓ (`headword`) | — | ✓ | `freq` 1–5 |

Von den 263 wirklich noch offenen Kandidaten haben **143 einen Ninja-Eintrag mit Audio**
und **124 einen Peace-Corps-Eintrag**.

**Ehrliche Einschränkung:** „sofort komplett anlegbar" heißt Arabisch + Audio + Wortart + englische
Glosse. Die **deutsche** Glosse kommt nur aus `tunico_import.senses→de`; bei Ninja-/PC-Treffern ohne
TUNICO-Gegenstück muss sie weiterhin von Hand gesetzt werden. Das UI muss diesen Unterschied
anzeigen, nicht verwischen — Lernmaterial wird nicht automatisch erzeugt.

---

# Arbeitspakete

Reihenfolge ist bindend: 6 baut auf 5, 5 auf 2–4. Jedes Paket endet mit einem eigenen Commit.

## P1 — `translit_skeleton` gegen das Veralten sichern (nur SQL)

`vocabulary.translit_skeleton` ist eine gewöhnliche Spalte ohne Trigger. Sie ist heute schon
**bei 104 Zeilen falsch und bei 9 NULL** — dieselbe Schnappschuss-Krankheit, eine Ebene tiefer,
und ausgerechnet in der Spalte, auf der der ganze neue View aufsetzt.

`public._translit_skeleton(text)` und `public._arabic_skeleton(text)` sind beide `IMMUTABLE`
(`provolatile = 'i'`), also ist eine generierte Spalte möglich.

1. `idx_vocab_translit_skeleton` und `idx_vocab_arabic_skeleton` droppen
2. beide Spalten droppen und neu anlegen als
   `GENERATED ALWAYS AS (public._translit_skeleton(darija)) STORED` bzw.
   `... (public._arabic_skeleton(arabic_script)) STORED`
3. Indizes neu anlegen

**Abnahme:** `select count(*) from vocabulary where translit_skeleton is distinct from
_translit_skeleton(darija)` = 0, und Gruppe A der `qualitaets_checks` weiter auf 0.
**Achtung:** prüfen, ob `vocab_lookup` oder `qualitaets_checks` auf den Spalten liegen —
dann in der richtigen Reihenfolge droppen/neu anlegen.

## P2 — `vocab_tokens` (Wortebene des Bestands)

Braucht der `baustein`-Bucket, weil Phrasen-Skelette den ganzen Satz zusammenziehen.

- IMMUTABLE-Funktion `public._translit_tokens(text) returns text[]` — `darija` an Whitespace und `/`
  trennen, jeden Token einzeln durch `_translit_skeleton`, leere verwerfen.
- View `vocab_tokens (vocabulary_id, token, token_skeleton, ist_einwortig)`.

**Messen, nicht raten:** erst als einfachen View mit `lateral unnest` bauen und die Laufzeit des
Bucket-Joins messen. Über ~300 ms stattdessen generierte Spalte `vocabulary.darija_tokens text[]`
(`GENERATED ALWAYS AS (_translit_tokens(darija)) STORED`) mit GIN-Index.

**Nebennutzen, der das Paket doppelt bezahlt:** `vocab_tokens` ist genau das Werkzeug, das für die
noch offenen **795 mehrwortigen Zeilen ohne Beleg** aus dieser Session fehlt.

## P3 — `quellen_lemmata` (materialisierter Quell-Union) — größtes Paket

Eine Zeile je (Quelle, Lemma). Materialized View, weil die Normalisierung teuer ist und sich die
Quelltabellen praktisch nie ändern; `refresh materialized view` nur nach einem Import.

Spalten: `quelle`, `quell_id`, `lemma`, `skeleton`, `freq_korpus`, `rang_pc`, `wortart`,
`gloss_de`, `gloss_en`, `arabisch`, `audio_url`, `ist_toponym`, `freq_ist_obergrenze`.

Zu erledigende Normalisierungen — das ist echte Arbeit, keine Kosmetik:

- **Pipe-Bündel auftrennen.** `tunico_corpus_wordforms.lemma_chatalpha` packt Homographen in ein
  Feld: `waqt-illi|illi|illi`, `|7atta|7atta|7atta`, `wa7id|wa7id|wa7id`. Ohne Auftrennen erscheinen
  ~25 Hochfrequenz-Lemmata fälschlich als „fehlt". 2.102 Rohlemmata → 2.023 echte.
- **`freq` eines Bündel-Mitglieds ist eine Obergrenze, keine eigene Zählung.** `kull shayy` und
  `7atta shayy` kommen beide mit 239× aus demselben Bündel. Spalte `freq_ist_obergrenze` setzen und
  im UI kenntlich machen.
- **Pipe-Präfixe verwerfen** (`-kum`, `l-`): Suffixe/Klitika, keine eigenständigen Vokabeln.
- **Wortart normalisieren.** 116 verschiedene `pos`-Werte, viele verkettet (`verb verb`,
  `noun adjective`, `noun indefinite  `). Mapping-Tabelle auf die Trainer-Klassen; Rest auf `unklar`.
- **Toponyme flaggen, nicht löschen** (30 Lemmata mit `pos` = `toponym`).
- **Peace Corps:** je Eintrag über `forms_chatalpha`/`forms_skeleton` (Arrays); `is_synonym_set=true`
  heißt echte Synonyme, `false` grammatische Varianten — nur die erste Form als Lemma nehmen,
  die übrigen als Formen mitführen. `arabic_script_reconstructed` **nie** als Faktum ausgeben
  (siehe PRECEDENTS.md → Peace-Corps-Arabisch-Rekonstruktion).
- **`tunico_import.senses`** ist `[{de:[…], en:[…], fr:[…]}]` — `de` ist die deutsche Glosse.

Index auf `skeleton`. Falls die PC-Seite bremst: GIN auf `peacecorps_dict_import.forms_skeleton`.

**Abnahme:** `kull`, `ma3nitha`, `kif`, `bnadim`, `7asilu` sind je genau einmal je Quelle enthalten;
kein Lemma enthält mehr ein `|`.

## P4 — `import_entscheidungen` (Protokoll) + Migration

Neue Tabelle: `skeleton` (Schlüssel), `lemma`, `entscheidung` (`verknuepft`/`angelegt`/`uebersprungen`),
`vocabulary_ids int[]`, `comment`, `decided_at`.

`vocabulary_ids` als Array statt einer Spalte — löst den `sabb`-Homonymfall.

**Migration aus `tunico_candidates` (954 Zeilen):**
- die **379 entschiedenen** Zeilen (`activated` 338, `added` 40, `skipped` 1 — Zahl vor der Migration
  frisch nachzählen, nicht aus diesem Plan zitieren) übernehmen. Das ist Nils' Arbeit, sie darf
  nicht verlorengehen. `uebersprungen` unbedingt mitnehmen, sonst kommt Abgelehntes zurück.
- die **575 `pending`** Zeilen *nicht* übernehmen — reiner Listenzustand, den der View neu erzeugt.
- `tunico_candidates` **nicht löschen**, nur nicht mehr beschreiben. Erst nach einer produktiven
  Woche mit dem neuen View wegräumen, und dann nur nach ausdrücklicher Zusage.

## P5 — View `quellen_abgleich`

Gruppiert `quellen_lemmata` nach `skeleton`, joint gegen `vocabulary.translit_skeleton`,
`vocab_tokens` und `import_entscheidungen`, berechnet `bucket` und `score`.

Liefert je Zeile: Lemma, Skelett, Bucket, Score + Einzelkomponenten, Quellenliste,
alle Treffer als JSON-Array (`[{id, darija, german}]`), Arabisch/Audio/Glossen, Flags.

**Abnahme:**
- `explain analyze` unter 500 ms für die ersten 100 Zeilen nach Score
- `kull` und `kif` stehen im Bucket `baustein`, nicht `fehlt`
- `inshalla` und `tlatha` stehen im Bucket `variante`
- die 43 Kandidaten mit exaktem Treffer von heute stehen *nicht* mehr unter „fehlt"
- danach: **Gewichte einmal an den ersten 50 Zeilen nachziehen**, vor Paket 6

## P6 — UI in `trainer.html`

`showTunicoCandidates()` und den kompletten `_tn*`-Block ersetzen. Umbenennung wie oben.

- Bucket-Chips statt `auto_verdict`-Dropdown; Quellen-Chips (TUNICO / Peace Corps / Ninja / mehrfach)
- Score sichtbar je Zeile, mit aufklappbarer Begründung
- pro Bucket eine passende Hauptaktion (anlegen / nachziehen / belegen)
- bei mehreren Treffern **alle** zur Auswahl anzeigen (Homonymfall)
- Sortierung **serverseitig** (`&order=score.desc`) — PostgREST liefert ohne `order=` beliebige
  Reihenfolge (siehe PRECEDENTS.md → Partner-Check-Sortierung)
- „Verknüpft, aber inaktiv" bleibt erhalten; mit `vocabulary_ids` im Protokoll wird daraus ein
  echter Filter statt des clientseitigen Durchscannens in `_tnLoadInactiveLinked`
- Neuanlagen laufen weiter über den bestehenden Weg inklusive Fällig-Setzen (`_tnSetDueIfMissing`)

**Pflicht:** `node -e "new (require('vm').Script)(...)"`-Syntaxcheck auf `trainer.html` vor dem Commit.
**Pflicht:** neue Vokabeln nur nach Rückfrage anlegen — die Lockerung dieser Session galt Korrekturen,
nicht Neuanlagen (SKILL.md → „Nie ohne Bestätigung in Supabase schreiben").

## P7 — Dokumentation

- `skills/tunsi/IMPORTS.md`: Abschnitt „Quellenabgleich" — die drei Buckets, der Score, die
  Pipe-Bündel-Falle, `freq_ist_obergrenze`, wann `refresh materialized view` nötig ist.
- `skills/tunsi/PRECEDENTS.md`: zwei Einträge — „Der eingefrorene Kandidaten-Schnappschuss"
  (auto_verdict/matched_vocab_id, 156 von 374 falsch rot) und „`_translit_skeleton(v.darija)`
  statt `v.translit_skeleton`" (95 ms gegen Timeout).
- `skills/tunsi/SKILL.md`: Schnellzugriff-Zeile auf den neuen View.

## Offene Entscheidungen für Nils

1. **Name**: `Quellenabgleich` (Vorschlag), `Lücken` oder `Vorschläge`?
2. **Wortart als Feld** in `vocabulary`: aus P3 fällt die normalisierte Wortart für 1.851 von 2.766
   einwortigen Zeilen ohnehin ab. Schemaänderung — steht seit dieser Session unentschieden.
3. **Peace-Corps-Rang 4/5 überhaupt anzeigen?** 1.045 zusätzliche fehlende Einträge, nach
   Peace-Corps-eigenem Urteil die unwichtigsten. Vorschlag: als Filter vorhanden, aber
   standardmäßig ausgeblendet.
