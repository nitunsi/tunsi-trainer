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
   `kull` (656×), `ma3nitha` (853×), `kif` (480×), `kif-ma` (293×), `bnadim` (127×),
   `ma-ysal-sh` (81×), `7asilu` (45×).
3. **Eine Quelle, eine Rangachse.** Peace Corps hat eine unabhängige didaktische Rangliste
   (`freq` 1–5, 1 = wichtigstes) über 5.070 Einträge, im Trainer nirgends benutzt. Von 660
   Einträgen mit Rang 1 fehlen 149 ganz, bei Rang 2 weitere 238.

> **Zahlenkorrektur 2026-09-17 (P3a).** Oben standen zuerst `ma3nitha` mit 434× und `kif` mit
> 221×. Das war zu niedrig: die Ersterhebung nahm je Lemma nur die **stärkste einzelne
> Wortform-Zeile** (`max`), statt über alle beitragenden Zeilen zu summieren. Korrekt sind
> **853×** und **480×**; die übrigen Werte stimmen unverändert, weil dort nur je eine
> Quellzeile beiträgt. Die naive Gegenrechnung (alle Pipe-Glieder aufsummieren) ist ebenfalls
> falsch und ergäbe für `kif` 930× — die Zeile `kif|kif|kif|kif` (150×) würde vierfach
> gezählt. Maßgeblich ist die Summe über **distinkte Quellzeilen**, wie sie
> `quellen_lemmata.freq_korpus` jetzt führt. Der Befund wird dadurch deutlicher, nicht
> schwächer.

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
| `tunico_import` (7.543) | ✓ | **—** | ✓ (`senses→de`) | ✓ | — | ✓ | — |
| `tunico_corpus_wordforms` (9.874) | ✓ | — | — | — | — | ✓ (roh) | Korpusfrequenz |
| `derja_ninja_entries` (17.335) | ✓ | ✓ | — | ✓ | ✓ | `pos_tag` | — |
| `peacecorps_dict_import` (5.070) | ✓ (Lautschrift) | rekonstruiert, **kein Faktum** | — | ✓ (`headword`) | — | ✓ | `freq` 1–5 |

Von den 263 wirklich noch offenen Kandidaten haben **143 einen Ninja-Eintrag mit Audio**
und **124 einen Peace-Corps-Eintrag**.

**Korrektur 2026-09-17 (P3a):** die Zeile `tunico_import` stand hier zunächst mit „Arabisch ✓".
Das war falsch — **TUNICO hat überhaupt keine Arabisch-Spalte** (deckt sich mit `IMPORTS.md`:
„Kein arabisches Original"). `quellen_lemmata.arabisch` bleibt für `quelle='tunico'` daher
grundsätzlich NULL. Arabisch kommt ausschließlich von Ninja (echte Quelle) bzw. als
ausdrücklich gekennzeichnete Rekonstruktion von Peace Corps.

**Ehrliche Einschränkung:** „sofort komplett anlegbar" heißt Arabisch + Audio + Wortart + englische
Glosse. Die **deutsche** Glosse kommt nur aus `tunico_import.senses→de`; bei Ninja-/PC-Treffern ohne
TUNICO-Gegenstück muss sie weiterhin von Hand gesetzt werden. Das UI muss diesen Unterschied
anzeigen, nicht verwischen — Lernmaterial wird nicht automatisch erzeugt.

---

# Arbeitspakete

Reihenfolge ist bindend: 6 baut auf 5, 5 auf 2–4, P3b auf P3a. P3a und P4 sind voneinander unabhängig und können parallel laufen. Jedes Paket endet mit einem eigenen Commit.

## P1 — `translit_skeleton` gegen das Veralten sichern (nur SQL) — ERLEDIGT 2026-09-16

> **Abgenommen.** Beide Spalten sind `GENERATED ALWAYS ... STORED`, 0 Abweichungen bei 3.775 Zeilen (vorher 104 falsche + 9 leere `translit_skeleton` und — erst bei der Umsetzung gefunden — zusätzlich 100 falsche `arabic_skeleton`). Gruppe A weiter 0, Gruppe B unverändert (21=2, 22=231), `vokalisierung_kandidaten` 0 vorher wie nachher. Sicherung und angewandtes SQL liegen in `exports/viewdefs_vor_p1_2026-09-16.sql` und `exports/migration_p1_2026-09-16.sql`.
> Folgearbeit, die dabei anfiel und miterledigt wurde: Rezept 4 in `SKILL.md` führte die beiden Spalten in der `INSERT`-Spaltenliste und wäre ab sofort gescheitert.

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

## P2 — `vocab_tokens` (Wortebene des Bestands) — ERLEDIGT 2026-09-16

> **Abgenommen.** `public._translit_tokens(text)` (IMMUTABLE) und View `public.vocab_tokens`
> (`vocabulary_id, position, token, token_skeleton, skelett_laenge, ist_einwortig`), 5.826 Zeilen,
> Rechte 1:1 von `vocab_lookup` übernommen. Gruppe A 0, Gruppe B unverändert (21=2, 22=231),
> `vocabulary` unverändert 3.775. SQL in `exports/migration_p2_2026-09-16.sql`.
>
> **Laufzeit: 113–124 ms** (3 Läufe) gegen die 300-ms-Schwelle — der einfache View reicht,
> die generierte Spalte `darija_tokens` mit GIN-Index war **nicht nötig** und wurde nicht gebaut.
>
> **Beide Abnahmerichtungen erfüllt:** `kull` hat 12 Baustein-Vorkommen in 9 mehrwortigen Zeilen
> und keine eigene Zeile; `kif` 9 Vorkommen in 7 Zeilen, ebenfalls ohne eigene Zeile. Gegenprobe:
> `ma3nitha`, `bnadim`, `7asilu` haben null Treffer — weder in `vocabulary` noch in `vocab_tokens`.
> Der View findet also nicht einfach alles.
>
> **Ergebnis: 99 aufgetrennte Korpus-Lemmata (75 Skelette) fallen in `baustein`.**

### Kollisionsanalyse aus P2 — Eingabe für die Bucket-Logik in P5

Die `SKILL.md`-Regel „nie blind über Skelette joinen, `length(...) >= 4`" wurde für diesen Fall
gemessen statt übernommen — sie hätte `kull` (`kll`, 3 Zeichen) und `kif` (`kf`, 2 Zeichen)
weggeworfen. Alle Treffer der Längen 2 und 3 wurden einzeln gelesen, nicht stichprobenartig:

| Skelettlänge | Lemmata | Befund | Umgang in P5 |
|---|---|---|---|
| 1 | — | 459 Ein-Buchstabe-Token im View (`m` aus `youm`) | **ausschließen** |
| 2 | 27 | ~14 klare Zufallstreffer — Münzwurf-Niveau | **kein Score-Treiber**, höchstens manuelle Zusatzliste |
| 3 | 46 | ~34 echt, ~8 Zufall, ~4 unklar (≈ 3 von 4) | anzeigen **mit Hinweis „kurzes Skelett, bitte prüfen"** |
| 4–5 | 26 | wie in `SKILL.md` als sicher behandelt | normal werten |

**Einschränkung, die mitgelesen werden muss:** `tunico_corpus_wordforms` hat keine Gloss-Spalte.
Die Einordnung „echt / Zufall" beruht auf Transliterationsähnlichkeit und Wurzelverwandtschaft,
nicht auf einer geprüften Übersetzung — die `~`-Zahlen sind Schätzungen, keine Messwerte.

Schönste Belege für echte Zufallstreffer: **`kanada` kollidiert mit `weekend`** (beide → `knd`,
weil `w` und die Vokale beim Skelettieren verschwinden), `quran` mit `qarn` (Horn/Jahrhundert),
`lista` mit `el-wasat`, und Skelett `s7` kollidiert gleich fünffach
(`sa7a`, `sa7i`, `saya7`, `siya7a` — keins davon ist das tatsächlich gefundene `sye7`).

**Zusätzlicher Fund für P5:** die Schreibvariante `kol` (einfaches statt doppeltes L) ergibt
Skelett `kl` — und das kollidiert bereits mit drei bestehenden Einwort-Zeilen (`kilo`, `kla` = aß,
`yakol` = isst). Ein Korpus-Lemma `kol` liefe damit fälschlich als `vorhanden` statt `baustein`
durch. Die Bucket-Logik darf sich also nicht allein auf „Skelett-Treffer = vorhanden" verlassen.

**Nicht weggefiltert:** `skelett_laenge` steht in jeder `vocab_tokens`-Zeile, und die 300-ms-Messung
lief ohne jeden Längenfilter — also inklusive der kurzen, kollisionsanfälligen Skelette.

### Ursprüngliche Paketbeschreibung

Braucht der `baustein`-Bucket, weil Phrasen-Skelette den ganzen Satz zusammenziehen.

- IMMUTABLE-Funktion `public._translit_tokens(text) returns text[]` — `darija` an Whitespace und `/`
  trennen, jeden Token einzeln durch `_translit_skeleton`, leere verwerfen.
- View `vocab_tokens (vocabulary_id, token, token_skeleton, ist_einwortig)`.

**Messen, nicht raten:** erst als einfachen View mit `lateral unnest` bauen und die Laufzeit des
Bucket-Joins messen. Über ~300 ms stattdessen generierte Spalte `vocabulary.darija_tokens text[]`
(`GENERATED ALWAYS AS (_translit_tokens(darija)) STORED`) mit GIN-Index.

**Nebennutzen, der das Paket doppelt bezahlt:** `vocab_tokens` ist genau das Werkzeug, das für die
noch offenen **795 mehrwortigen Zeilen ohne Beleg** aus dieser Session fehlt.

## P3 — `quellen_lemmata` (materialisierter Quell-Union) — in P3a/P3b geteilt

**Warum geteilt (2026-09-17):** P3 war als größtes Paket geplant. Der P2-Lauf ist nach getaner
Arbeit an einem Session-Limit abgebrochen — folgenlos, weil der Push davor durch war. Bei einem
Paket dieser Größe wäre derselbe Abbruch teuer. Deshalb zwei Pakete mit je eigener Abnahme,
auf **dieselbe** Zieltabelle.

Gemeinsames Ziel: **eine Zeile je (Quelle, Lemma)**, als Materialized View, weil die Normalisierung
teuer ist und sich die Quelltabellen praktisch nie ändern; `refresh materialized view` nur nach
einem Import.

Gemeinsame Spalten: `quelle`, `quell_id`, `lemma`, `skeleton`, `freq_korpus`, `rang_pc`, `wortart`,
`gloss_de`, `gloss_en`, `arabisch`, `audio_url`, `ist_toponym`, `freq_ist_obergrenze`.
Index auf `skeleton`.

### P3a — TUNICO-Seite (die eigentliche Normalisierungsarbeit) — ERLEDIGT 2026-09-17

> **Abgenommen.** `quellen_lemmata` steht mit **2.005 TUNICO-Zeilen**, Index auf `skeleton`,
> Rechte identisch zu `vocab_lookup`/`vocab_tokens`. Kein Lemma enthält ein `|`, keine Dubletten,
> die fünf Prüflemmata je genau einmal. Gruppe A 0, Gruppe B unverändert (21=2, 22=231),
> `vocabulary` 3.775, Quelltabellen unverändert. SQL in `exports/migration_p3a_2026-09-17.sql`.
>
> **Herleitung der 2.005:** 2.102 rohe Werte → 2.023 distinkte Lemmata nach Pipe-Split
> → minus 18 Klitika (`-kum`, `-hum`, `il-`, `ma-`, `w-` …) = 2.005. Kein unerklärter Schwund.
>
> **Wortart:** Nomen 918, Verb 535, Adjektiv 243, **unklar 125 (6,2 %)**, Partikel/Funktionswort 67,
> Numerale 38, Adverb 37, Eigenname 34, Interjektion 8. Von den 125 `unklar` sind nur 13 ohne jede
> `pos`-Angabe; 112 haben einen echten Widerspruch zwischen mehreren Kandidaten.
> 33 Toponyme geflaggt, 371 Zeilen mit `freq_ist_obergrenze`.
>
> **Deutsche Glosse: 1.992 von 2.005 (99,4 %)** — 1.989 über exakten `lemma_chatalpha`-Treffer,
> 4 über den Skelett-Fallback, 12 ohne. Wichtig für spätere Pakete: **das Skelett taugt hier nicht
> als Erstschlüssel** — 1.455 der 2.005 Lemmata hätten darüber mehr als einen Treffer.
>
> **Positionsgleiche Wortart-Zuordnung geht auf:** TUNICO benutzt führende und mehrfache
> Leerzeichen im `pos`-String als Platzhalter für leere Pipe-Segmente — ein **nicht kollabierender**
> Leerzeichen-Split liefert dieselbe Teilezahl wie der Pipe-Split. 282 von 283 Bündeln sauber;
> die eine Ausnahme (id 2058, `3ayyit|3ayyif` mit nur `verb`) wurde an beide Teile ausgestrahlt.
>
> **Laufzeit `REFRESH`: 4,7–4,8 s** — deutlich über P1/P2 (< 300 ms), aber unkritisch, weil der
> Refresh nur nach einem Import läuft, nicht beim Öffnen des Trainers. **Hinweis für P3b:** zwei
> weitere `UNION ALL`-Zweige werden das erhöhen — wenn es über ~15 s geht, die korrelierten
> Subqueries für die Glossen durch einen Join ersetzen.


Legt `quellen_lemmata` an, zunächst nur mit `quelle = 'tunico'`. Die Spalten `rang_pc`,
`audio_url` bleiben hier leer, `gloss_en` wo vorhanden.

- **Pipe-Bündel auftrennen.** `tunico_corpus_wordforms.lemma_chatalpha` packt Homographen in ein
  Feld: `waqt-illi|illi|illi`, `|7atta|7atta|7atta`, `wa7id|wa7id|wa7id`. Ohne Auftrennen erscheinen
  ~25 Hochfrequenz-Lemmata fälschlich als „fehlt". 2.102 Rohlemmata → 2.023 echte.
- **`freq` eines Bündel-Mitglieds ist eine Obergrenze, keine eigene Zählung.** `kull shayy` und
  `7atta shayy` kommen beide mit 239× aus demselben Bündel. Spalte `freq_ist_obergrenze` setzen und
  später im UI kenntlich machen.
- **Pipe-Präfixe verwerfen** (`-kum`, `l-`): Suffixe/Klitika, keine eigenständigen Vokabeln.
- **Wortart normalisieren.** 116 verschiedene `pos`-Werte, viele verkettet (`verb verb`,
  `noun adjective`, `noun indefinite  `). Mapping-Tabelle auf die Trainer-Klassen; Rest auf `unklar`.
- **Toponyme flaggen, nicht löschen** (30 Lemmata mit `pos` = `toponym`).
- **`tunico_import.senses`** ist `[{de:[…], en:[…], fr:[…]}]` — `de` ist die deutsche Glosse.
  Verknüpfung zwischen Korpus-Lemma und Wörterbucheintrag über `lemma_chatalpha`/`translit_skeleton`.

**Abnahme P3a:** `kull`, `ma3nitha`, `kif`, `bnadim`, `7asilu` sind je **genau einmal** enthalten;
**kein Lemma enthält mehr ein `|`**; die Zahl der TUNICO-Zeilen liegt in der Größenordnung 2.023;
`wortart` ist für den überwiegenden Teil gesetzt, der Rest sauber auf `unklar` (Anteil berichten).

### P3b — Peace Corps und Derja Ninja ergänzen

Erweitert dieselbe Materialized View um `quelle in ('peacecorps','ninja')`. Setzt P3a voraus.

- **Peace Corps:** je Eintrag über `forms_chatalpha`/`forms_skeleton` (Arrays); `is_synonym_set=true`
  heißt echte Synonyme, `false` grammatische Varianten — nur die erste Form als Lemma nehmen,
  die übrigen als Formen mitführen. `rang_pc` aus `freq` (1–5, **1 = wichtigstes**).
  `arabic_script_reconstructed` **nie** als Faktum ausgeben
  (siehe PRECEDENTS.md → Peace-Corps-Arabisch-Rekonstruktion) — gesondert kennzeichnen.
- **Ninja:** `translit_skeleton` ist bereits vorhanden und indiziert; `arabic_script` ist die
  einzige zuverlässig vokalisierte Quelle, `audio_url` das Unterscheidungsmerkmal für die
  Anlege-Reife im Score.
- Falls die PC-Seite bremst: GIN-Index auf `peacecorps_dict_import.forms_skeleton`.

**Abnahme P3b:** die 143 offenen Kandidaten mit Ninja-Audio und die 124 mit Peace-Corps-Eintrag
(Messung vom 2026-09-16, vor der Arbeit frisch nachzählen) sind über `quellen_lemmata` wiederfindbar;
Peace-Corps-Rang 1 umfasst größenordnungsmäßig 660 Einträge; kein Lemma enthält ein `|`.

## P4 — `import_entscheidungen` (Protokoll) + Migration — ERLEDIGT 2026-09-17

> **Abgenommen.** Tabelle `public.import_entscheidungen` angelegt (`skeleton` als generierte
> Spalte `GENERATED ALWAYS AS (_translit_skeleton(lemma)) STORED` — dieselbe
> Schnappschuss-Absicherung wie bei `vocabulary.translit_skeleton`/`arabic_skeleton` aus P1),
> Rechte/RLS 1:1 von `tunico_candidates` übernommen (RLS an, eine Policy `app_access`
> PERMISSIVE FOR ALL TO anon, authenticated USING/WITH CHECK true, GRANT ALL an
> postgres/anon/authenticated/service_role, Owner postgres).
>
> **Nachgezählt statt übernommen:** 954 Zeilen gesamt, 575 `pending`, **379 entschieden**
> (`activated` 338, `added` 40, `skipped` 1) — deckt sich exakt mit dem im Plan genannten
> Stand, keine Abweichung. Migriert wurden genau diese 379 Zeilen, **eine Quellzeile = eine
> Zielzeile** (nicht nach `skeleton`/`lemma` gruppiert — 56 (lemma_chatalpha, status)-Paare
> kommen unter den entschiedenen Zeilen mehrfach vor, 48 davon mit unterschiedlichem
> `vocabulary_id`; eine Gruppierung hätte Zeilen/IDs gekostet und die Abnahme verletzt).
> `vocabulary_ids` ist deshalb bei 378 von 379 Zeilen ein Einelement-Array; die eine
> `skipped`-Zeile ohne `vocabulary_id` bekam `'{}'` (leeres Array, NOT NULL) statt NULL —
> „entschieden, verknüpfte Menge leer" ist ein anderer Zustand als „nicht gesetzt", und
> künftige Schreiber müssen so nie auf NULL prüfen.
>
> **Abnahme 1–6 exakt:** `count(*) import_entscheidungen` = 379; Gegenprobe je Entscheidungsart
> exakt gleich (338/40/1); `EXCEPT`-Vergleich der `vocabulary_id`-Werte in beide Richtungen
> leer (378=378); `tunico_candidates` unverändert 954 Zeilen mit identischer
> Statusverteilung; `vocabulary` unverändert 3775; `qualitaets_checks` Gruppe A weiterhin
> 0/18, Gruppe B unverändert (nr21=2, nr22=231, Rest 0).
>
> **Abnahme 7 (Homonymfall) mit dem echten Beispiel aus dem Plan getestet:** in einer nie
> committeten Transaktion (BEGIN; INSERT; SELECT; ROLLBACK — keine COMMIT im ganzen Testlauf)
> eine Zeile `lemma='sabb'`, `vocabulary_ids=ARRAY[4506,4508]` angelegt; `skeleton` wurde
> korrekt zu `sbb` generiert, der Join `v.id = ANY(vocabulary_ids)` löste innerhalb der
> Transaktion beide Homonyme auf (4506 „er goss", 4508 „er beleidigte"). Unabhängiger
> Folgeaufruf bestätigt: 0 Testzeilen übrig, Tabelle weiterhin exakt 379 Zeilen.
>
> **Nebenbefund (nicht Teil von P4, nicht angefasst):** 8 der 378 migrierten
> `vocabulary_id`-Werte zeigen auf inzwischen nicht mehr existierende `vocabulary`-Zeilen
> (vermutlich durch spätere Duplikat-Merges gelöscht — `tunico_candidates.vocabulary_id` hatte
> nie eine FK-Constraint). Unverändert mitmigriert, wie von der Aufgabe verlangt
> (Verlustfreiheit gegenüber der Quelle, nicht Konsistenz gegenüber dem heutigen Bestand).
> Betroffene `tunico_candidates.id`: 5, 31, 106, 166, 325, 416, 454, 564.
>
> `tunico_candidates` bleibt unangetastet als Sicherheitsnetz stehen (nur `SELECT` darauf,
> kein `UPDATE`/`DELETE`/`DROP`). SQL in `exports/migration_p4_2026-09-17.sql`.

### Ursprüngliche Paketbeschreibung

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

## Offener Datenbefund aus P4 — 8 Entscheidungen zeigen ins Leere

Bei der Migration der 379 Entscheidungen kam heraus: **8 der 378 übernommenen `vocabulary_id`-Werte
zeigen auf Zeilen, die es nicht mehr gibt.** `tunico_candidates.vocabulary_id` hatte nie eine
Fremdschlüssel-Constraint, und spätere Duplikat-Zusammenführungen haben die Zielzeile gelöscht,
ohne die Entscheidung mitzuziehen. Verlustfrei mitmigriert (Treue zur Quelle vor Konsistenz zum
heutigen Bestand), aber offen.

Das Muster ist eindeutig: die Ersatzzeile ist fast immer der unmittelbare ID-Nachbar —
also genau die Zeile, die beim Merge behalten wurde.

| Lemma | tote ID | heutiger Ersatz | eindeutig? |
|---|---|---|---|
| `7abb` | 3781 | 4176 `7abb` = er liebte | ja |
| `7abs` | 4144 | 4143 `7abs` = Gefängnis | ja |
| `fannan` | 4158 | 4157 `fannan` = Künstler | ja |
| `jim3a` | 272 | 275 `jim3a` = Freitag / Woche | ja |
| `kammil` | 4174 | 4178 `kammil` = er beendete | ja |
| `t3ashsha` | 4029 | 4519 `t3ashsha` = er aß zu Abend | ja |
| `7lu` | 4159 | 378 `7lou` = süß (kein exakter Schreibtreffer) | **nein** |
| `tayyib` | 4028 | 405 `ytayyeb` / 1646 `tayyab` | **nein** |

**Vorschlag:** die 6 eindeutigen umbiegen, die 2 uneindeutigen Nils vorlegen. Betrifft nur
`import_entscheidungen`, nicht `vocabulary` — also keine Vokabeldatenänderung. Noch nicht ausgeführt.

**Und die Lehre für P5/P6:** die neue Tabelle braucht denselben Schutz nicht per FK (die
Entscheidung soll eine gelöschte Zeile überleben), aber der Quellenabgleich muss tote
`vocabulary_ids` **anzeigen** statt sie stumm zu schlucken — sonst wiederholt sich dasselbe
Leck im neuen Werkzeug.

## Offene Entscheidungen für Nils

1. **Name**: `Quellenabgleich` (Vorschlag), `Lücken` oder `Vorschläge`?
2. **Wortart als Feld** in `vocabulary`: aus P3 fällt die normalisierte Wortart für 1.851 von 2.766
   einwortigen Zeilen ohnehin ab. Schemaänderung — steht seit dieser Session unentschieden.
3. **Peace-Corps-Rang 4/5 überhaupt anzeigen?** 1.045 zusätzliche fehlende Einträge, nach
   Peace-Corps-eigenem Urteil die unwichtigsten. Vorschlag: als Filter vorhanden, aber
   standardmäßig ausgeblendet.
