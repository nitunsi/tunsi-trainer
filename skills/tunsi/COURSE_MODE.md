# Tounsi Trainer — Kurs-Modus & App-Code

Regeln für den Lektionen/Stepper-Bereich des Trainers (`course_lessons`/`course_exercises`) und für Änderungen an `trainer.html` selbst. Hat mit Vokabel-Prüfung/-Anlage nur am Rande zu tun (Vokabeln werden dort per ID verlinkt, nicht neu bewertet) — nur bei Bedarf nachschlagen, wenn tatsächlich am Kurs-Feature oder am App-Code gearbeitet wird. Kern-Regeln zu Vokabeln selbst stehen in `SKILL.md`.

## Code-Änderungen

- Nicht einbauen ohne Bestätigung
- Syntax-Prüfung via `node vm.Script()` vor Auslieferung
- Output-Datei immer `trainer.html` (ohne Versionsnummer) — Ausnahme: bei Android-Caching-Problemen Versionsnummer erhöhen
- **Bei Performance-Fixes (z.B. fehlendes `spellcheck="false"`) alle Geschwister-Inputs im selben Formular mitprüfen, nicht nur das gemeldete Feld** (Präzedenzfall: PRECEDENTS.md → Code-Änderungen)

## Kurs-Modus: course_lessons / course_exercises

Der Trainer hat neben der klassischen SRS-Vokabelabfrage einen Kurs-Modus (Stepper-UI: Chunk-Übersicht → Chunk-Intro → Items → Chunk-Zusammenfassung), aufgebaut aus den Uni-Wien-Lehrskripten. Zwei Tabellen:

- `course_lessons` — eine Zeile pro Lektion, mit `grammar_notes` (Markdown, `### Überschrift`-Abschnitte) und `chunk_order` (jsonb-Array: Reihenfolge/Gruppierung im Stepper — jedes Element hat `key`, `label`, `dialog`, `grammar_headings`)
- `course_exercises` — eine Zeile pro Übungs-Item, mit `course_lesson_id`, `position` (Integer, Reihenfolge), `chunk_key` (muss zu einem `key` in `chunk_order` passen), `exercise_type`, `prompt`, `solution`, optional `vocabulary_id`

**Bei jeder Tabelle, die über die Zeit wächst, `sbApiPaged` verwenden, nicht `sbApi`** — PostgREST liefert standardmäßig max. 1000 Zeilen pro Request, unabhängig vom `select`. Ein einfacher `count(*)`-Check gegen 1000 ist ein guter Kurz-Test, wenn ein Nutzer "fehlende Inhalte" meldet, obwohl die DB sie zeigt (Präzedenzfall mit ~270 verlorenen Übungen: PRECEDENTS.md → Kurs-Modus).

### Exercise-Typen

| Typ | Verwendung |
|---|---|
| `translate_de_tn` | Deutsch → Tunesisch übersetzen, `prompt`=Deutsch, `solution`=Tunesisch |
| `fill_blank` | Lückentext, `___` im prompt |
| `answer_pattern` | Frage + Musterantwort(en), oft `ih, X. / la, Y.`-Format |
| `fixed_response` | Feste Grußformel-Paare (Frage→Antwort) |
| `grammar_drill` | Konjugationstabellen, Possessivsuffix-Reihen — `solution` listet alle Formen |
| `grammar_card` | Reine Erklärkarte (Frage zur Grammatik → Erklärung als Antwort) |
| `build_dialog` | Wort-Paare/-Tripel zum freien Dialogbau, `solution` oft `null` |
| `pronunciation` | Einzelwort-Ausspracheübung — **muss `vocabulary_id` verlinkt haben** (inkl. Audio, wenn vorhanden) |

### Workflow: erst Vokabeln, dann Übungen

Standing rule: **bei jeder neuen Lektion erst alle referenzierten Vokabeln vollständig gegen den Bestand prüfen und importieren, danach erst die Übungen bauen.** Nicht vermischen. Jede Einzelwort-Übung (v.a. `pronunciation`) wird mit der Vokabel per `vocabulary_id` verlinkt, inkl. Audio wenn vorhanden.

Bildbasierte Übungen werden nie umgesetzt — explizite Anweisung "Bild rausnehmen". Beim Auswerten kurz vermerken, welche Übungsnummern deshalb übersprungen wurden.

### Pflichtschritt: Item-Zählung, nicht nur Abschnitts-Existenz

**Prüfen ob eine nummerierte Übung existiert reicht nicht — alle Items bis zur letzten Nummer müssen als eigene `course_exercises`-Zeile in der DB stehen.** (Präzedenzfall mit ~50 übersehenen Übungen über drei Lektionen: PRECEDENTS.md → Kurs-Modus.)

1. Jede nummerierte Übung im Quellmaterial bis zur letzten Ziffer durchzählen (z.B. "V. Übersetzen Sie, 1–21" → 21 Items erwartet)
2. Gegen `SELECT count(*) FROM course_exercises WHERE course_lesson_id=X AND chunk_key='...'` abgleichen
3. Bei Abweichung: fehlende Items identifizieren, nicht "ist wohl vollständig" annehmen
4. Auch mehrseitige Übungen beachten — Nummerierung kann über einen Seitenumbruch weiterlaufen

### Vollständigkeitsprüfung: Vokabel-Verknüpfung pro Lektion (vocab_lesson_refs)

**Nie nach `vocabulary.topic` prüfen, ob eine Vokabel zu einer Kurs-Lektion gehört — das Wort muss wirklich im Kurstext vorkommen (Nutzeranweisung, 2026-09-02).** Ein Themen-Sweep erzeugt massive Fehlalarme: bei einem Testlauf lieferte er für 11 Lektionen zusammen ~280 scheinbar fehlende Vokabeln, von denen nach Volltext-Prüfung nur eine kleine Minderheit echt war.

**Richtige Methode:**
1. Korpus pro Lektion zusammenbauen: `dialog_text` + `grammar_notes` + **alle** `course_exercises`-Felder (`instruction`, `prompt`, `solution`, `meta::text` — nicht nur `prompt`/`solution`, sonst gehen Treffer aus Drag&Drop-Wortlisten verloren).
2. Kandidaten (grob per `topic` vorsortiert, um die Menge klein zu halten) mit Wortgrenzen-Regex (`\y...\y`, NICHT `\b`) gegen den Korpus matchen.
3. **Pflicht-Gegencheck pro Treffer:** Fundstelle im Korpus tatsächlich lesen. Kurze/häufige Wörter sind anfällig für Homograph-Kollisionen — ein Treffer beweist nur, dass die Zeichenkette vorkommt.
4. Nur bei bestätigtem Treffer die ID (und ggf. das Wort im `darija:`-Teil) an `vocab_lesson_refs` anhängen — nie den ganzen String überschreiben.

**Wiederkehrende Homograph-Fallen (immer den tatsächlichen Fundtext lesen):**

| Zeichenkette | Falsch angenommene Bedeutung | Tatsächlich meist gemeint |
|---|---|---|
| `dar` | er drehte sich / er wandte sich | `dar` = Haus ("f-id-dar" = zuhause) |
| `mit` | ich starb | deutsches Wort "mit" in Erklärungs-/Übersetzungstexten |
| `3am` | er schwamm | `3am` = Jahr |
| `walla` | er wurde | `walla` = oder (Konjunktion) |
| `kan` | er war | Bedingungspartikel "falls/wenn" (`kan, idha, idha kan`), v.a. in Grammatik-Abschnitten zu Bedingungssätzen |
| `sghar` | Kinder (Nomen) | Plural von `sghir` = klein (Adjektiv) |

Liste nicht abschließend — bei jedem neuen kurzen/häufigen Treffer denselben Verdacht anwenden.

**Präzedenzfall 2026-09-02: L1–L13 systematisch geprüft**, ~132 echte Verknüpfungen ergänzt, ~15 Fehlalarme aussortiert. Bei L11/L13 auf Nutzerwunsch ohne `progress.next_review`-Fälligsetzung (nur Verknüpfung, kein SRS-Eingriff) — bei künftigen Lektionen im Zweifel nachfragen. Nicht erneut von null anfangen, sondern bei neuen/geänderten Lektionen gezielt ergänzen.

### Wortvarianten nicht vorschnell auf Bestandswort normalisieren

Vor dem Zusammenlegen zweier ähnlicher Wörter prüfen, ob eine Übung selbst eine phonetische Eigenheit der exakten Schreibweise demonstriert (Artikel-Assimilation, Reim, Wortspiel) — wenn ja, nicht mergen, beide Formen behalten, im Zweifel Nutzer fragen (Präzedenzfall `dziri`/`jzayri`).

### `chunk_order` — Sync-Pflicht mit `grammar_notes`

**Technischer Zwang:** `chunk.grammar_headings` referenziert `### Überschrift`-Text aus `grammar_notes` per **exaktem String-Match** (`parseGrammarSections()` in trainer.html). Wird eine `###`-Überschrift umbenannt/zusammengelegt, MUSS jedes referenzierende `chunk_order`-Element mitaktualisiert werden — sonst bricht die Verknüpfung lautlos (kein Fehler, der Intro-Screen zeigt einfach nichts). Auch bei jeder Konvention-Änderung (z.B. Transliterationsregel) `chunk_order`-Labels mit durchsuchen, nicht nur `grammar_notes`/`vocabulary`.

### Position-Verschiebung beim nachträglichen Einfügen

`course_exercises.position` ist Integer ohne Unique-Constraint. Beim Einfügen VOR bestehenden Items: `UPDATE ... SET position = position + 1 WHERE course_lesson_id=X AND position >= Y` — ein zu niedriger Y-Wert erwischt mehr Zeilen als beabsichtigt. Nach jedem Positions-Shift die betroffene Chunk-Sequenz per SELECT gegenprüfen.

## Kurs-Verknüpfung: vocab_lesson_refs

Nach jedem Vokabel-Batch (neue INSERTs oder gefundene Duplikate) muss `course_lessons.vocab_lesson_refs` der jeweiligen Lektion aktualisiert werden — mit echten Vokabel-IDs, nicht nur als Text-Liste.

**Pflichtformat (technischer Zwang, kein Stilratschlag):** `vocab_lesson_refs` ist KEIN einfaches Komma-Array. Die App (`parseCourseVocabRefs()` in trainer.html) erwartet exakt `ids:<id1>,<id2>,...|darija:<wort1>,<wort2>,...`. Ein Format ohne diese Präfixe wird komplett ignoriert (`part.split(':')` liefert `length<2`, die Funktion bricht ohne Fehler ab — aber auch ohne verknüpfte Vokabel).

Bei Live-Zugriff einfach mit `RETURNING id, darija` direkt nach dem INSERT arbeiten. Nur ohne Live-Zugriff braucht es die Subquery, die auf (darija, lesson_id)-Paare matcht:

```sql
WITH refs AS (
  SELECT id, darija FROM vocabulary WHERE (darija, lesson_id) IN (('arba3tash',31),('tsa3tash',31))
)
UPDATE course_lessons
SET vocab_lesson_refs = 'ids:' || (SELECT string_agg(id::text, ',') FROM refs)
                       || '|darija:' || (SELECT string_agg(darija, ',') FROM refs)
WHERE course_number = 2;
```

Bei nachträglicher Ergänzung reicht `||','||neue_ids` NICHT — der bestehende String muss geparst (beide Teile getrennt erweitert) und neu zusammengesetzt werden, sonst entsteht wieder ein kaputtes Format.

Im selben Zug immer auch `progress` mitziehen — für `next_review = NULL` fällig setzen (bestehende SRS-Termine nie überschreiben), für neue Vokabeln ohne progress-Zeile eine anlegen:

```sql
WITH refs AS (
  SELECT id FROM vocabulary WHERE (darija, lesson_id) IN (('arba3tash',31),('tsa3tash',31))
)
UPDATE progress
SET next_review = now()
WHERE user_id = '6c6eff77-6b56-4ba9-b445-b1cd47773b41'
  AND vocabulary_id IN (SELECT id FROM refs)
  AND next_review IS NULL;

WITH refs AS (
  SELECT id FROM vocabulary WHERE (darija, lesson_id) IN (('arba3tash',31),('tsa3tash',31))
)
INSERT INTO progress (user_id, vocabulary_id, correct_count, wrong_count, review_count, next_review)
SELECT '6c6eff77-6b56-4ba9-b445-b1cd47773b41', r.id, 0, 0, 0, now()
FROM refs r
WHERE NOT EXISTS (SELECT 1 FROM progress p WHERE p.user_id = '6c6eff77-6b56-4ba9-b445-b1cd47773b41' AND p.vocabulary_id = r.id);
```

Die (darija, lesson_id)-Paare und der `WHERE course_number`-Wert sind nur ein Beispiel — bei jedem neuen Batch durch die tatsächlichen Werte ersetzen.
