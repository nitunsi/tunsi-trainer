# vocab_lookup — Quellen nachschlagen

Ausgelagert aus SKILL.md (2026-11-07). Das Werkzeug hinter Schritt 3 des Prozesses (SKILL.md): ein Wort in Ninja, TUNICO und Peace Corps nachschlagen. Lesen, wenn du ein Wort in den Quellen suchst.

**`vocab_lookup`** ist eine View (kein Materialized/keine Kopie — liest live aus `derja_ninja_entries`/`tunico_import`/`peacecorps_dict_import`, ändert nichts an den Rohtabellen) mit einheitlichen Spalten für alle drei: `source`, `source_id`, `english_key` (lowercased, primäre Suchachse), `headword_display`, `source_translit` (Lautschrift der Quelle in DEREN eigener Konvention, nicht unser Chat-Alphabet), `chatalpha` (unsere Konvention — bei TUNICO immer befüllt, bei Peace Corps 5.004/5.070 befüllt), `chatalpha_plural`, `gender`, `pos`, `arabic_script` (nur Ninja zuverlässig — echte, unabhängige Quellenangabe), `arabic_reconstructed`/`arabic_reconstruction_note` (nur bei `source='peacecorps'` befüllt — unvokalisierter Rekonstruktions-**Vorschlag**, kein Faktum, siehe unten), `translit_skeleton`/`arabic_skeleton`, `example_en`/`example_de`/`example_ph`, `audio_url`, `note`. Eine Zeile pro Sinn/Beispiel, nicht pro Lemma — ein mehrdeutiges Lemma erzeugt mehrere Zeilen mit demselben `source_id`. Details/Historie zu jeder Quelle: IMPORTS.md.

**`arabic_reconstructed` ist NIE eine unabhängige Bestätigung, nur eine Ableitung unserer eigenen Regel aus Peace Corps' eigener Lautschrift** — bei einem 3-Quellen-Vergleich zählt es nicht als zweite Quelle neben Ninja, sonst täuscht ein systematischer Regelfehler eine "doppelte Bestätigung" vor, die keine ist (siehe PRECEDENTS.md → Peace-Corps-Arabisch-Rekonstruktion). Rekonstruiert wird per `public._pc_reconstruct_arabic(forms_phonetic[1])` aus dem ORIGINAL `forms_phonetic` (nicht aus `forms_chatalpha`!), weil das Original über Groß-/Kleinschreibung Emphase-Laute unterscheidet (H/S/T = ح/ص/ط vs. h/s/t = ه/س/ت), die `forms_chatalpha` bereits verloren hat. Bekannte Restunsicherheit: ض/ظ/ذ fallen im Original alle auf `dh` zusammen (`arabic_reconstruction_note` zeigt das an), außerdem keine Unterscheidung ا/ى bei wortschlussendem Langvokal. 4.874/5.004 Peace-Corps-Zeilen rekonstruiert, 130 bewusst nicht (Fremdwörter/Platzhalter/Transkriptionsfehler statt Rateversuch).

**Vokalisierung aus Ninja übernehmen — nur mit Buchstaben-Identitätsprüfung (2026-09-13).** Ninja vokalisiert konsequent, der Bestand zu rund einem Fünftel nicht. Die naheliegende Übernahme per `arabic_skeleton`-Match ist **viel schwächer, als die Trefferzahl aussieht**: von 50 Zeilen mit *eindeutigem* Ninja-Treffer (Skelett ≥ 4) waren nach Prüfung nur 20 brauchbar. Der Rest waren Skelett-Kollisionen quer über Lexeme hinweg (`nimshiw` „wir gehen" traf نْمَشْ „freckles").

**Pflichtfilter, mechanisch statt nach Augenmaß:** Ninjas Schreibung nur übernehmen, wenn sie nach Entfernen aller Harakat **buchstabenidentisch** mit der eigenen ist — es dürfen nur Vokalzeichen dazukommen, kein einziger Buchstabe sich ändern. Als `AND`-Bedingung direkt ins `UPDATE`, nicht als Vorabprüfung:
```sql
AND btrim(regexp_replace(<ninja_arabisch>,'[ًٌٍَُِّْٰٟ]','','g')) = btrim(v.arabic_script)
```
Das erschlägt alle Kollisionen und zusätzlich die Numerus-/Genus-Fälle (Ninja gibt den Singular, die Zeile ist Plural: `fnejin`←فِنْجَانْ, `tlemtha`←تِلْمِيذْ, `trabesh`←طَرْبُوشَةْ).

**Der schärfste Filter — und seine Grenze (2026-09-13).** `ableitung_exakt` in der Sicht prüft, ob `_arabic_to_chatalpha(Ninjas Vokalisierung)` **exakt** die eigene `darija` ergibt. Von 46 Kandidaten bestanden das nur 8 — er sortiert scharf. **Er prüft aber die Form, nicht die Bedeutung:** vier Zeilen bestanden ihn und waren trotzdem ein anderes Wort (`louza` „Schwägerin" gegen „almond").

**Buchstabengleich ist nicht bedeutungsgleich — vier Fehlerarten, die der Filter nicht sieht** (aus dem vollständigen Durchgang, 10 von 21 Kandidaten waren Zufälle): **Eigennamen** (نَجِيب Najib für `njib`), **Ableitungsstufen** (Maß-II تْكَوِّن „geformt werden" für تْكُون „sein"), **Wortart** (Verbalnomen statt Verb) — und einmal ein **Fehler in der Quelle selbst**: Ninja schrieb Tanwin statt Fatha (تْقًابِلْ, Ableitung ergibt `tqanabil`). Die letzte Art ist die unangenehmste, weil sie wie ein sauberer Treffer aussieht.

Verworfene Vorschläge bekommen `[ninja-vokalisierung verworfen]` in die `internal_note`; die Sicht blendet sie dauerhaft aus, damit sie nicht jeden Durchgang erneut kosten.

**Danach trotzdem drei Dinge von Hand prüfen**, die der Filter nicht sieht: (1) ob Ninjas Eintrag dieselbe **Wortart** ist (`tfahim` „er einigte sich" gegen Ninjas تَفَاهُمْ, das Nomen „understanding" — buchstabenidentisch, anderes Wort); (2) ob Ninjas Vokalisierung der eigenen `darija` widerspricht (`toshrob` gegen تِشْرَبْ = `tishrab`); (3) ob Ninjas Fassung überhaupt vokalisiert ist — bei `intikhabat` und `amriken` ist sie es nicht, da gibt es nichts zu übernehmen.

**Vokalisierung NICHT von einer Geschwisterzeile übernehmen (belegt 2026-09-13).** Naheliegend, aber systematisch falsch: im Arabischen teilt die ganze Ableitungsfamilie dasselbe Konsonantengerüst, und **die Vokalisierung ist genau das, was die Wörter unterscheidet**. Ein Skelett-Match innerhalb des Bestands findet deshalb bevorzugt *andere* Wörter derselben Wurzel:

| unvokalisiert | „Geschwister" mit gleichen Buchstaben | tatsächlich |
|---|---|---|
| `sfer` „null" صفر | `sfor` „gelb (Pl.)" صْفُر | zwei Wörter |
| `ktob` „Bücher" كتب | `ktib` „er schrieb" كتِب | Nomen vs. Verb |
| `b7ar` „Meer" بحر | `ba77ar` „er ging ans Meer" بحّر | Nomen vs. Verb Maß II |
| `qra` „er las" قرى | `qarra` „er lehrte" قَرَّى | Maß I vs. Maß II |
| `bra` „genas" برا | `barra` „draußen" بَرَّا | zwei Wörter |

Der Buchstaben-Identitätsfilter, der die Ninja-Route rettet, **hilft hier nicht** — er ist per Konstruktion erfüllt. Von 29 Paaren blieben 2 brauchbar, und zwar nur die, bei denen **auch die `darija` identisch** ist (echte Homonympaare, bei denen wirklich nur Harakat fehlen): 652/2296 `maqfoul`, 4410/4295 `tsa77ar`.

**Regel:** Vokalisierung aus dem Bestand nur übernehmen, wenn `darija` **und** Buchstaben übereinstimmen. Alles andere braucht eine lexem-gebundene Quelle oder Handarbeit.

**Konsequenz für die Planung — am 2026-09-13 revidiert.** Hier stand bis dahin: „Der Vokalisierungs-Rückstand ist **nicht als Kampagne abarbeitbar**, Ninja liefert nach Filter ~20 pro Durchgang." **Das galt, weil `_arabic_skeleton()` kaputt war.** Die Funktion kannte گ ڨ ڤ پ nicht und ließ sie roh stehen — 623 Ninja-Zeilen waren dadurch für jeden Skelett-Join unsichtbar. Nach der Reparatur:

| | |
|---|---|
| unvokalisierte Einzelwörter (Stand des ersten Laufs) | 507 |
| davon mit vokalisiertem Ninja-Treffer | 364 |
| davon buchstabenidentisch (Pflichtfilter) | 130 |
| davon mit **genau einer** Ninja-Vokalisierung | **122** |

**Das war eine Kampagne — sie ist abgearbeitet.** `vokalisierung_kandidaten` steht seit
2026-09-19 auf 0 (= Check 23), der Ninja-Weg ist damit ausgeschöpft. Die verbleibenden
unvokalisierten Einzelwörter (Check 22) brauchen TUNICO/Peace Corps als Vokalquelle und die
sieben Pflichtfilter aus `tools/README.md` — Potenzial und Grenzen dazu:
`exports/migration_kursverknuepfung_check21_2026-09-20.sql`, Abschnitt 3. Werkzeug für einen
neuen Ninja-Durchgang, falls dort importiert wird: `public.vokalisierung_kandidaten` — wendet den Pflichtfilter mechanisch an und liefert zusätzlich zwei der drei Handprüfungen als Spalte: `vokale_unser`/`vokale_ninja` (widerspricht Ninjas Vokalisierung unserer `darija`? das ist der `toshrob`/`tishrab`-Fall) und `wortart_verdacht` (unser Gloss verbal, Ninjas Eintrag ein Nomen).

**Erster Durchgang, 2026-09-13:** 64 in der sichersten Gruppe (Vokale identisch, Wortart unauffällig), davon **59 geschrieben**. Die fünf übrigen hat erst das Gegenlesen der Bedeutung gefunden — der Filter prüft Buchstaben, nicht Bedeutung: `4358 glass` „Kleiderschrank" gegen Ninjas كلاس „class(room)" (unser Wort ist ڨلاص), `4180 kasa` „Waschlappen" gegen „cash register", `1576 louza` „Schwägerin" gegen „almond", `735 maktou3` „gebrochen" gegen „not available", `648 nshid` „reservieren" gegen „to ask". **Die Bedeutungsprüfung bleibt Handarbeit, auch wenn beide Filter sauber sind.**

Ertrag des ersten Laufs: die Reichweite des Zeichen-Checks wuchs von 1.179 auf 1.275 vollvokalisierte Einzelwörter, und 58 der 59 Zeilen brachten Ninja-Audio mit. **Aktuelle Zahlen: `SELECT * FROM qualitaets_checks` (Gruppe B).** Offen aus dem Lauf: 47 mit abweichender Vokalfolge, 11 mit Wortart-Verdacht.

Die Regel „ohnehin fällige Bearbeitung" (beim Anfassen einer Zeile die Vokalisierung mitziehen) bleibt richtig — sie ist jetzt nur nicht mehr der einzige Weg.

**Nie blind über `translit_skeleton`/`arabic_skeleton` joinen — kurze Skelette (≤3 Konsonanten) kollidieren zufällig** (Präzedenzfall: PRECEDENTS.md → vocab_lookup). `english_key` ist die primäre, zuverlässige Achse; Skeleton-Treffer nur separat markiert und mit `length(...) >= 4` gefiltert.

**`vocabulary.english` (seit 2026-09-05; seit 2026-11-07 vollständig, Rest aus dem Deutschen übersetzt und in `internal_note` so vermerkt, Verben im Infinitiv „to …“) ist in erster Linie ein Such-Schlüssel für den Quellenabgleich, keine geprüfte Übersetzung** — muss nicht nuanciert sein, nur treffend genug für den `english_key`-Join. Befüllt über vier Wege, absteigend nach Zuverlässigkeit: (1) exakter `ninja_audio_url`-Match — dieselbe Ninja-Zeile, die schon das Audio geliefert hat, `english` direkt übernommen (676 Zeilen); (2) exakter `arabic_script`-Match gegen Ninja (295 Zeilen); (3) exakter Deutsch-Text-Match gegen `tunico_import.senses[].de` — TUNICO liefert Deutsch UND Englisch im selben Sinne, ein Treffer auf `german` liefert das passende Englisch direkt mit, nur wenige deutsche Homonym-Kollisionen ausgenommen (`heller`/„Heller"-Münze, `zu`=nach/geschlossen) (219 Zeilen); (4) Skelett-Match gegen `vocab_lookup` mit manueller Deutsch/Englisch-Plausibilitätsprüfung, Skelett-Treffer allein reicht nicht (585 Zeilen). Details/Fehlerbilder: PRECEDENTS.md → vocabulary.english Backfill. Bei neuen Vokabeln `english` gleich mitpflegen, dann ist der Abgleich sofort ohne Nachbearbeitung nutzbar.

**Rezept 1 — Trainer-Vokabel verifizieren:**
```sql
WITH target AS (
  SELECT id, darija, arabic_script, english, translit_skeleton, arabic_skeleton
  FROM public.vocabulary WHERE id = ANY(ARRAY[/* vocabulary.id(s) */])
)
SELECT t.id, t.darija AS trainer_darija, t.english, 'bedeutung' AS match_art,
       l.source, l.headword_display, l.source_translit, l.chatalpha, l.arabic_reconstructed, l.arabic_reconstruction_note, l.example_en
FROM target t JOIN public.vocab_lookup l ON lower(trim(t.english)) = l.english_key
UNION ALL
SELECT t.id, t.darija, t.english, 'nur_lautschrift_unsicher',
       l.source, l.headword_display, l.source_translit, l.chatalpha, l.arabic_reconstructed, l.arabic_reconstruction_note, l.example_en
FROM target t JOIN public.vocab_lookup l
  ON ((t.arabic_skeleton = l.arabic_skeleton AND length(t.arabic_skeleton) >= 4)
   OR (t.translit_skeleton = l.translit_skeleton AND l.translit_skeleton IS NOT NULL AND length(t.translit_skeleton) >= 4))
  AND lower(trim(t.english)) <> l.english_key
ORDER BY id, match_art, source;
```

**Wertigkeit der Treffer nicht verwechseln:** ein Treffer mit `source='ninja'` und gesetztem `arabic_script` ist eine echte Bestätigung (einzige verlässlich vokalisierte Quelle). Ein `chatalpha`-Treffer von TUNICO/Peace Corps bestätigt nur die Transliteration, kein Arabisch — wertvoll, aber schwächer. Ein `arabic_reconstructed`-Wert (nur Peace Corps) ist unsere eigene Ableitung, zählt nicht als zusätzliche unabhängige Quelle. Bei widersprüchlichen Treffern gewinnt die höherwertige Quelle, nicht die Mehrheit.

**Rezept 2 — neue Vokabel nachschlagen (2a: konkretes Wort) oder Vorschlag holen (2b):**
```sql
-- 2a
SELECT source, headword_display, source_translit, chatalpha, arabic_script, arabic_reconstructed, arabic_reconstruction_note, gender, pos, example_en, example_ph
FROM public.vocab_lookup WHERE english_key = lower('<wort>') ORDER BY source;
SELECT id, darija, german FROM public.vocabulary WHERE lower(trim(english)) = lower('<wort>');

-- 2b: kombiniert beide frequenzsortierten Kandidatenlisten
SELECT 'tunico' AS quelle, cat, frequency, lemma_chatalpha, de_gloss
FROM public.tunico_candidates WHERE status='pending' AND auto_verdict='missing' ORDER BY frequency DESC LIMIT 10;
SELECT 'peacecorps' AS quelle, pos, freq AS prioritaet, chatalpha, headword AS gloss
FROM public.peacecorps_candidates WHERE status='pending' AND auto_verdict='missing' AND freq=5 ORDER BY headword LIMIT 10;
```
`peacecorps_candidates` (gleiches Schema wie `tunico_candidates`): aus `peacecorps_dict_import` gespeist, `auto_verdict` per einfachem `english`-Abgleich gegen `vocabulary` vorbelegt — feinere Heuristik (e/i-Fold etc., siehe IMPORTS.md → TUNICO) bisher nicht übernommen.

**Rezept 3 — Import-Batch gegenchecken (Duplikate + Plausibilität vor dem Schreiben):**
```sql
WITH batch(english, darija, arabic_script) AS (
  VALUES ('<english1>','<darija1>','<arabic1>')
),
norm AS (SELECT *, lower(trim(regexp_replace(english, '^to\s+', ''))) AS key FROM batch)
SELECT n.english, n.darija, v.id AS bereits_im_trainer, v.darija AS trainer_darija,
  l.source, l.chatalpha AS quelle_chatalpha, l.source_translit AS quelle_translit, l.example_en
FROM norm n
LEFT JOIN public.vocabulary v ON lower(trim(v.english)) = n.key
LEFT JOIN public.vocab_lookup l ON l.english_key = n.key
ORDER BY n.english, l.source;
```

**Bekannte Grenzen:** `english_key` ist ein einfacher `lower(trim(...))`-Vergleich, kein Fuzzy-Match — unterschiedliche Formulierungen derselben Bedeutung können Treffer verpassen (`to abolish` wird per `regexp_replace('^to\s+','')` normalisiert, deckt aber nicht jede Variante ab). Bei "kein Treffer" zusätzlich mit `english_key ILIKE '%<wort>%'` nachfassen, bevor man auf "existiert nirgends" schließt.

**Helper-Funktionen `public._translit_skeleton(darija text)` / `public._arabic_skeleton(arabic_script text)`** (seit 2026-09-05): berechnen `vocabulary.translit_skeleton`/`arabic_skeleton` exakt nach dem Bestandsformat — per Reverse-Engineering aus dem Bestand hergeleitet und gegen den vollen Bestand validiert (Details und die vier Stolpersteine für einen Port: PRECEDENTS.md → arabic_skeleton/translit_skeleton). Nie von Hand nachbauen — diese Funktionen benutzen, auch außerhalb von Rezept 4.

**Seit 2026-09-16 sind `vocabulary.translit_skeleton`/`arabic_skeleton` generierte Spalten** (`GENERATED ALWAYS AS (public._translit_skeleton(darija)) STORED` bzw. aus `arabic_script`). Postgres berechnet sie selbst und zieht sie bei jedem `UPDATE` der Quellspalte automatisch nach. Konsequenz: **beide Spalten dürfen in keinem `INSERT`/`UPDATE` mehr in der Spaltenliste stehen** — sonst bricht die Anweisung mit SQLSTATE `428C9` ab („cannot insert a non-DEFAULT value into column ... Column is a generated column“). In `RETURNING` und in jeder `SELECT`-Abfrage dagegen wie gewohnt benutzbar. **Warum umgestellt:** als gewöhnliche Spalten veralteten sie stillschweigend — am Umstellungstag 104 falsche und 9 leere `translit_skeleton` sowie 100 falsche `arabic_skeleton` bei 3.775 Zeilen, unsichtbar für jeden Skelett-Abgleich, der auf ihnen aufsetzt.

**Rezept 4 — neue Vokabel anlegen, fertigen INSERT bauen:**
```sql
-- Teil 1: Kandidaten aus allen 3 Quellen (wie Rezept 2a) — daraus darija/arabic_script/german von Hand auswählen
SELECT source, headword_display, source_translit, chatalpha, chatalpha_plural, gender, pos,
       arabic_script, arabic_reconstructed, arabic_reconstruction_note, example_en, example_de, example_ph, audio_url, note
FROM public.vocab_lookup WHERE english_key = lower('<wort>') ORDER BY source;

-- Teil 2: INSERT. translit_skeleton/arabic_skeleton NICHT mitschicken, s. Hinweis ueber dem Block
INSERT INTO public.vocabulary
  (english, darija, arabic_script, german, ninja_id, ninja_audio_url,
   external_confirmed, external_confirmed_source)
VALUES (
  '<english>',
  '<darija>',                    -- s. Konventions-Warnungen unten
  <arabic_script_oder_NULL>,     -- nur von Ninja übernehmen, sonst NULL lassen
  '<german>',                    -- kein Feld liefert das automatisch, immer von Hand
  <ninja_id_oder_NULL>,
  <ninja_audio_url_oder_NULL>,
  <true_oder_false>,             -- s. external_confirmed unten
  <'ninja'|'tunico'|'peacecorps'_oder_NULL>
)
RETURNING id, english, darija, arabic_script, german, translit_skeleton, arabic_skeleton;
```

**Konventions-Warnungen vor dem `<darija>`-Wert (nicht automatisierbar, immer von Hand prüfen):**
- **Ninja-`darija`/`source_translit` nie 1:1 übernehmen** — andere Transliterations-Konvention (siehe IMPORTS.md → Abgleich mit Derja Ninja). Besser: Ninjas `arabic_script` (einzige zuverlässig vokalisierte Quelle) nehmen und daraus `darija` nach Hausregeln neu transliterieren (Lautlehre-Regeln, Konsonanten-Gegencheck-SQL siehe oben).
- **TUNICO-`chatalpha` bei Verben ist die Stammform**, nicht die trainer-übliche 3. Pers. Sg. Präsens — passende Flexionsform aus `tunico_corpus_verbs.forms_chatalpha` wählen, nie die Stammform direkt übernehmen (siehe IMPORTS.md → TUNICO, `_tnGuessVerbForm()`).
- **Peace-Corps-`chatalpha` (`forms_chatalpha[1]`) ist die erste Form laut `forms_roles`** (bei Verben oft Imperativ, nicht Präsens) — bei Verben gegen `forms_roles` prüfen und ggf. die passende Form selbst zur 3.-Pers.-Präsens umbauen, nicht ungeprüft übernehmen.
- **`german` wird von keiner Quelle geliefert** — `senses`/`de_gloss`/`example_de` sind Ausgangsmaterial, keine fertige Übersetzung.
- **`arabic_reconstructed` (nur bei Peace Corps) ist ein Vorschlag, kein Faktum** — nur verwenden, wenn Ninja kein `arabic_script` liefert, und vor Übernahme in `<arabic_script_oder_NULL>` von Hand vokalisieren/gegenchecken (v.a. bei gesetztem `arabic_reconstruction_note`).

**`external_confirmed`/`external_confirmed_source` (seit 2026-09-05) — bei jeder Neuanlage mitpflegen, nicht nur beim einmaligen Bestands-Backfill.** Steuert das 🔗-Icon im Trainer (Vokabelliste + Karteikarte, nur wenn kein Audio vorhanden — sonst ist die Bestätigung über den 🔊-Button ohnehin sichtbar) sowie den Bestätigt/nicht-bestätigt-Filter in der Vokabelliste. Regel:
- `external_confirmed=true, external_confirmed_source='ninja'`, wenn `derja_ninja_entries.arabic_script` (Diakritika entfernt) exakt mit dem neuen `arabic_script` übereinstimmt.
- sonst `external_confirmed=true, external_confirmed_source='tunico'`, wenn das neue `darija` (klein geschrieben, getrimmt) **exakt** einer dieser TUNICO-Formen entspricht — **nicht nur `vocab_lookup.chatalpha`/`chatalpha_plural`, das deckt nur `lemma_chatalpha` bzw. eine Pluralform aus `inflected` ab und übersieht die meisten Formen unten:**
  - `tunico_import.lemma_chatalpha`
  - `tunico_import.variants_chatalpha[]` (alternative Schreibweisen)
  - `tunico_import.inflected[].chatalpha` (alle Flexionsformen, nicht nur die mit `ana ~ 'pl'`)
  - `tunico_corpus_verbs.forms_chatalpha[]`, `tunico_corpus_adjectives.forms_chatalpha[]`, `tunico_corpus_nouns.forms_chatalpha[]` (belegte Korpus-Flexionsformen)
  - `tunico_corpus_wordforms.form_chatalpha` (einzelne belegte Wortformen, größte Quelle an zusätzlichen Treffern)
- sonst dasselbe für `source='peacecorps'`, wenn `darija` exakt einem beliebigen Element aus `peacecorps_dict_import.forms_chatalpha[]` entspricht — **nicht nur `forms_chatalpha[1]`**, das übersieht feminine/Imperativ/Perfekt/Colloquial-Formen, die laut `forms_roles` ebenfalls im Array stehen.
- **Zusätzlich, wenn kein exakter String-Match greift:** `public._translit_skeleton(darija)` (Länge ≥ 4, sonst zu kollisionsanfällig) gegen `_translit_skeleton()` jeder Form aus denselben lexem-gebundenen Arrays vergleichen (`tunico_import.lemma_chatalpha`/`variants_chatalpha[]`/`inflected[].chatalpha`, `tunico_corpus_verbs/_adjectives/_nouns.forms_chatalpha[]`, `peacecorps_dict_import.forms_chatalpha[]`) — **NICHT** gegen `tunico_corpus_wordforms` (das ist eine korpusweite Flachliste ohne Lexem-Bindung, dort bleibt nur exakter String-Match sicher). Grund: TUNICOs automatische `chatalpha`-Konvertierung nutzt andere Vokale als unsere Imala-Regeln (z.B. `ytayyib` vs. unser `ytayyeb`, `yakul` vs. `yakol`) — ohne Skelett-Vergleich verfehlt der exakte String-Vergleich echte Treffer aus denselben Quellen. Sicher nur, weil jedes dieser Arrays garantiert zu einem einzigen Lexem gehört (kein Cross-Wort-Kollisionsrisiko wie bei einer globalen Skelett-Suche über den ganzen Bestand).
- **sonst, seit 2026-09-15, der dritte Zustand:** `external_confirmed=false, external_confirmed_source='abgeleitet'`, wenn die **Form selbst** in keiner Quelle steht, aber eine belegte Grundform existiert, von der unsere Zeile eine **reguläre Flexion oder eine reine Vokalvariante** ist — Plural zu belegtem Singular, Femininum zu belegtem Maskulinum, Komparativ zum Adjektiv, Possessivform, Konjugationsform, oder dieselbe Form mit anderer Vokalschreibung (`twewil` gegen TUNICOs `twawil`). Die Grundform und ihre Fundstelle gehören in die `internal_note`.
- **`external_confirmed=true, external_confirmed_source='ninja-satz'`** (seit 2026-09-16), wenn die exakte Wortfolge des `arabic_script` **zusammenhängend in einem Beispielsatz** von `derja_ninja_entries.example_arabic` vorkommt. Das ist der einzige Belegweg für **Phrasen**: Sätze und Wendungen sind in keinem Wörterbuch Stichwort, ein Lemma-Abgleich findet sie nie. Verglichen wird über die **arabische** Seite (Diakritika und Satzzeichen weg, Wortgrenzen erhalten) — das umgeht die verschiedenen Umschriftkonventionen der Quellen.
- **Zeichengleiches `arabic_script` im eigenen Bestand** (2026-09-16): trägt eine bereits bestätigte Zeile **exakt dieselbe Zeichenfolge** (Diakritika eingeschlossen), gilt der Beleg auch hier — er gilt der Form, nicht unserer Umschrift. Quelle und Begründung der Ursprungszeile übernehmen. Fundstelle: `1522 bnet` „Töchter" war unbestätigt, `4111 bnat` „Mädchen (Pl.)" bestätigt, beide بْنَاتْ; der Backfill vergleicht die `darija` exakt und `bnet` weicht von TUNICOs `bnat` nur in der Vokalschreibung ab.
  ⚠️ **Nur mit Diakritika vergleichen, nie nur die Buchstaben.** Der lockere Vergleich liefert sofort einen Falschtreffer: `3056 yshabbe3` يِشَبَّع („er sättigt", Maß II) gegen `3028 yishba3` يِشْبَع („er wird satt", Maß I) — gleiche Buchstaben ي ش ب ع, die Schadda trennt die Wortformen (Lautlehre-Regel 5).
- sonst `external_confirmed=false, external_confirmed_source=NULL`.

**Warum der dritte Zustand nötig war.** `external_confirmed` ist ein **Exakt-Treffer-Flag**: es beantwortet „steht dieser String in einer Quelle?", nicht „gibt es dieses Wort?". Beispiel `1175 t7eb` „du magst": die Grundform `4176 7abb` ist Ninja-belegt und über `tunico_verb_id` mit TUNICO verknüpft, TUNICO 2164 führt das Verb `ḥabb` vollständig — aber nur **eine** Beispielflexion (`y7ibb`). Auch `tunico_corpus_wordforms` (9.874 belegte Formen) kennt `t7eb` nicht, weil es andere Vokale schreibt. „Nicht bestätigt" war damit technisch wahr und inhaltlich irreführend, und der Partner-Check schickte solche Zeilen zu Semia, als wüsste niemand, ob es das Wort gibt.

**So findet man die Ableitungen systematisch** (Runde 68): Affix abtrennen, Grundform im **eigenen bestätigten Bestand** und in den drei Quellen suchen, und zur Sicherheit das deutsche Gloss gegenprüfen. Drei Affixklassen sind regelmäßig genug dafür:

| Klasse | Prüfung | Ausbeute Runde 68 |
|---|---|---|
| Pronominalsuffix (`-i` mein, `-ek/-ik` dein, `-ou/-u` sein, `-ha` ihr, `-na` unser, `-kom` euer, `-hom` ihr Pl.) | Gloss muss das Possessivpronomen nennen; Femininendung fällt vor dem Suffix zu `-t` (`blasa` → `blastik`) | 6 von 281 |
| Artikel (`el-`, `esh-`, `ez-`, …) | Sonnenbuchstabe entdoppeln, dann Grundform suchen | 21 von 25 Treffern |
| Flexion aus `conjugation` | Form muss in der Tabelle einer **bestätigten** Zeile stehen | 3 von 4 Treffern |

Die Fehlalarmquote ist auch hier real: `es-sala` „das Gebet" trifft TUNICOs `sala` **„Salon; Saal"** (صالة statt صلاة), `es-sawm` „das Fasten" trifft `sawm` **„Preis; Summe"** (سوم statt صوم), `el-kasa` „die Kasse" den Waschhandschuh `kasa`. Ohne Bedeutungsabgleich wären das drei falsche Bestätigungen aus 25.

**Der dritte Zustand ist keine Abkürzung.** Er verlangt dieselbe Wortprüfung wie eine direkte Bestätigung: `3281 yitba3` steht in der Konjugationstabelle von `2213 yitba3` — und ist trotzdem **nicht** davon abgeleitet, weil dort die Wurzel ط-ب-ع („drucken") steht und hier ب-ي-ع („verkauft werden"). Ein Skelett- oder Formtreffer ohne Bedeutungsabgleich erzeugt hier genauso Homograph-Zufälle wie überall sonst.

**Wirkung im Trainer:** `belegStufe()` sortiert den Partner-Check dreistufig — gar kein Beleg zuerst (dort ist Semias Urteil die einzige Bestätigung, die es je geben wird), dann abgeleitet, dann direkt belegt (Zweitmeinung). Das 🔗-Icon erscheint für abgeleitete Zeilen abgeschwächt mit eigenem Tooltip.

Präzedenzfälle 2026-09-05/06:
- Bestands-Audit gegen `vocab_lookup.chatalpha`/`chatalpha_plural` allein fand nur 1693/3698 Treffer; Erweiterung auf alle Rohtabellen-Spalten (exakter Match) brachte 357 weitere (u.a. `dyar`, Plural von `dar`/Haus, nur in Peace Corps' zweitem `forms_chatalpha`-Element). `vocab_lookup` bleibt für den Cross-Source-Abgleich (Rezepte 1–4 oben) nützlich, ist für `external_confirmed` aber nicht ausreichend.
- Skelett-Vergleich (s.o.) brachte nochmal 251 weitere — Stichprobe von 25 Zufallstreffern manuell geprüft, alle korrekt (z.B. `yqaddem`↔`yqaddmu`, `kilmet`↔`kilmat`, `ysallem`↔`sallmu`).
- **Bekannte Grenze, bisher ungelöst:** Präsens-Verben (`y-`/`yi-`-Präfix) und personenflektierte Vergangenheitsformen (`qolt`=ich sagte, `mit`=ich starb) bleiben oft unbestätigt, obwohl die Grundform (`qal`, `mat`) bestätigt ist — Wörterbücher zitieren fast nur Imperativ/3.-Pers.-Vergangenheit, keine vollen Paradigmen. Eine Ableitung „Personalform bestätigt, wenn Grundform bestätigt" wäre möglich (Personal-Präfix/-Suffix abstreifen, dann Konsonantenskelett gegen bereits bestätigte Einträge derselben `lesson_id` vergleichen — Eingrenzung auf `lesson_id` nötig, um Kollisionen bei kurzen Wurzeln zu vermeiden), ist aber noch nicht umgesetzt.

Rezept 4 ersetzt nicht den Pflicht-Duplikat-Check (siehe "Duplikat-Check, alle drei Felder einzeln") — vor dem `INSERT` trotzdem gegenchecken, Rezept 3 nutzen bei ganzen Batches statt Einzelwörtern.
