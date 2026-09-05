# Tounsi Trainer — Import-Methodik & Datenquellen

Wie neue Vokabeln aus einer konkreten Quelle (PDF, Foto, Web-Scraping) extrahiert und in die Zielkonvention übersetzt werden, plus die Detail-Historie jeder Rohdatenquelle. Die eigentlichen Imports (Uni-Wien, TUNICO, Derja Ninja, Peace Corps, Instagram) sind abgeschlossen — dieser Inhalt ist nur noch bei einem NEUEN Import oder einer neuen Quelle relevant, nicht für die laufende Vokabel-Prüfung (siehe `SKILL.md`). Für Cross-Source-Abgleich gegen die bereits importierten Daten: `SKILL.md` → vocab_lookup.

## PDF/Foto-Extraktion (Teil des Kern-Workflows in SKILL.md, Schritt 1)

**Vollständig extrahieren.** Bei PDFs/Fotos: Text (pdfplumber, inkl. `extract_tables()`) UND visuell (pdftoppm 150dpi, jede Seite mit `view` prüfen) — nie Seiten überspringen. Nicht nur die offizielle Wortschatztabelle: Dialoge, Grammatik-Beispielsätze, Übungssätze, Bildunterschriften enthalten oft zusätzliche Wörter/Sätze und müssen genauso vollständig geprüft werden. Ganze Sätze gehören ebenfalls als eigene Zeile in `vocabulary` (topic="Phrasen"/"Ausdrücke"), auch wenn die Einzelwörter schon vorhanden sind.

**Arbeitsweise pro Lektion:** Nils lädt alle Fotos einer Lektion in einer Nachricht hoch, Claude arbeitet intern häppchenweise pro Tabelle/Bereich ab (erst Verben, dann Wortschatz, dann Berufe, ...) und zeigt nach jedem Bereich das Ergebnis — sonst werden zuverlässig Wörter übersehen und bereits vorhandene Wörter versehentlich nochmal angelegt. Seitenzahl-Lücken explizit ansprechen und nachfragen, nie ein Wort als "fehlt bestimmt auf der fehlenden Seite" vermuten.

## Prüfprotokoll (Pflicht am Ende jeder Auswertung)

Am Ende jeder PDF-Auswertung immer eine Tabelle anhängen:

| Datei | Seiten | Methode |
|---|---|---|
| Dateiname.pdf | 1–N (alle) | pdfplumber (Text+Tabellen) + visuell einzeln |

Zusätzlich vermerken: Duplikatcheck (gegen welche Quellen, wie viele `project_knowledge_search`-Abfragen), offene Rückfragen (gesammelt, nicht einzeln während der Analyse). Zweck: Nutzer sieht auf einen Blick, ob alle Seiten vollständig geprüft wurden.

## Bulk-Insert bei großen Mengen

**Über ~1000 Zeilen NICHT per SQL-Text-Batches über `execute_sql` oder Subagenten** — kostet unverhältnismäßig viele Tokens (Text wird doppelt bezahlt: erst per `Read` in den Kontext, dann nochmal als `execute_sql`-Parameter) und Subagenten können durch Account-Session-Limits mitten im Batch abbrechen.

**Stattdessen: direkter POST an die PostgREST-Bulk-Insert-API, am Modellkontext vorbei.** Nils gibt einen `service_role`/`secret`-Key aus dem Supabase-Dashboard (Project Settings → API, Format `sb_secret_...`) durch. Kleines Python-Script schreiben, das die Daten (als JSON) in Chunks (~500 Zeilen) per `urllib`/`requests` als `POST https://<project-ref>.supabase.co/rest/v1/<tabelle>` mit Headern `apikey`/`Authorization: Bearer <key>`/`Prefer: return=minimal` verschickt. Key nur als Env-Var übergeben (`export SB_SECRET=... && python3 script.py`), landet nicht im Skript, Skript nach Gebrauch löschen. **Vor dem Insert: Zeilen-Reihenfolge gegen den bereits importierten Teilbestand prüfen** (`SELECT id, xml_id FROM tabelle ORDER BY id DESC LIMIT 1` gegen den lokalen JSON-Index abgleichen), um Duplikate/Lücken bei fortgesetzten Imports zu vermeiden.

Kleinere Mengen (< ~300 Zeilen): weiterhin direkt per `execute_sql` in 2-4 Batches.

## Datenquellen im Detail

Für jede Quelle gilt der "Kern-Workflow" aus `SKILL.md` unverändert — hier steht nur, was pro Quelle unterschiedlich ist: die Ausgangsnotation (→ Chat-Alphabet-Umwandlung) und quellenspezifische Tabellen/Mechanik. Kurzreferenz der Tabellen für laufende Cross-Source-Abfragen: `SKILL.md` → vocab_lookup.

### Uni-Wien-Lehrskripte (Tunesisch-Arabisch I & II)

Zwei Lehrskripte, 13 Lektionen insgesamt. Wissenschaftlich strukturiert: Dialoge, Wortschatz-Tabellen, Grammatik-Kapitel, Übungen, Ausspracheübungen. Eigene wissenschaftliche Transliteration (IPA-nah, Emphatika-/Langvokal-Markierung), kein arabisches Original. Enthält den Rohstoff für den Kurs-Modus (siehe COURSE_MODE.md).

**Umwandlungstabelle (Uni Wien → Chat-Alphabet):**

| Uni Wien | Chat-Alphabet | Beispiel |
|---|---|---|
| ʔ (Hamza) | meist weggelassen | — |
| ʕ | 3 | sabʕa → sab3a |
| ḥ | 7 | ḥāl → 7al |
| x / ḫ | kh | xamsa → khamsa |
| ġ | gh | ġalla → ghalla |
| q | q | qlam → qlam |
| š | sh | šbāb → shbab |
| ž | j | rāžil → rajel |
| y | y | yimši → yimshi |
| ā/ī/ū (Langvokale) | kein Sonderzeichen | ṣbāḥ → sba7 |
| ṣ/ṭ (Emphatika) | s/t | ṣbāḥ → sba7, ṭūl → toul |
| ḍ | dh (siehe Ziel-Konvention in SKILL.md) | ḍayyiq → dhayyaq |
| ḏ/ṯ/ẓ | th (siehe Ziel-Konvention in SKILL.md) | hāḏa → hetha |
| ḷ, ṃ, ṛ, ḅ | keine Unterscheidung | žāṛi → jari |

Diese Umwandlung gilt genauso für Fließtext in `grammar_notes`/`course_exercises`, nicht nur Einzelvokabeln — nach dem Schreiben gezielt nach übrig gebliebenen Uni-Wien-Sonderzeichen suchen (ā, š, ʕ, ḥ, ṛ, ṭ, ġ, ž).

**Pflicht-Gegencheck nach jeder Konvertierung: Konsonant für Konsonant gegen das arabic_script prüfen, nicht nur "sieht plausibel aus".** Falsch konvertierte Transliteration lässt auch den Duplikat-Check ins Leere laufen. Checkliste: arabic_script ح → darija muss "7" haben; خ → "kh"; ع → "3"; غ → "gh"; ش → "sh". Bei Widerspruch: darija korrigieren, nicht arabic_script. (Präzedenzfall, dreifacher Fehler in einem Batch: PRECEDENTS.md → Uni-Wien-Lehrskripte.)

**Fehlendes arabic_script: zuerst Derja Ninja, erst danach selbst erstellen.**
1. Deutsche Bedeutung ins Englische übersetzen, gegen `derja_ninja_entries` suchen (offline, dann live `script=english`)
2. Zusätzlich über die (ins Ninja-Schema konvertierte) Transliteration suchen (`script=transliterated`) — unabhängige zweite Spur
3. Treffer mit passender Bedeutung → dessen `arabic_script` übernehmen (inkl. Audio), NICHT selbst aus der Uni-Wien-Umschrift ableiten
4. Kein Treffer → direkt aus der Uni-Wien-Umschrift ableiten, Pflicht-Gegencheck bleibt nötig
5. Bei einem ganzen Lektions-Batch: Schritt 1+2 als eigener Sweep vor dem Einzel-Import, nicht Wort für Wort verschränkt
6. Ergebnis in `vocabulary.internal_note` festhalten (z.B. „Ninja-bestätigt (Bedeutungssuche)", „arabic_script selbst erstellt, kein Ninja-Treffer") — auch im Trainer-Editor sichtbar/editierbar (`ei-nt`)

Bei Duplikaten immer die exakte bestehende DB-Schreibweise übernehmen, nicht neu ableiten. Erst `project_knowledge_search`, dann ggf. anpassen.

**Duplikat-Check: "Fällig setzen" statt Ausschluss.** Ergänzt die Standard-Duplikat-Kriterien nur um eine andere Konsequenz: Wort bereits vorhanden → nicht ausschließen, `progress.next_review = now()` setzen (nur wenn `next_review IS NULL` oder keine progress-Zeile — bestehende Zeitpläne nie überschreiben). Wort neu → normale Neuanlage + sofort fällig. Grenzfall (Homonym/Synonym) → nicht automatisch einordnen, dem Nutzer als offene Frage vorlegen.

**Grammatik-Regeln rückwirkend auf Bestand anwenden:** nach jeder neuen Lektion prüfen, ob sich eine explizite Lautlehre-/Grammatikregel als Textmuster gegen den Bestand durchsuchen lässt (bevorzugt direkt per SQL, token-günstiger als `project_knowledge_search`). **Zwei Supabase-MCP-Fallen:** `CREATE TEMP TABLE` funktioniert nicht über mehrere `execute_sql`-Calls hinweg (jeder Call = eigene Connection) — alles in einer Query/CTE bündeln; bei mehreren SELECTs in einem Call kommt nur das letzte Ergebnis zurück — immer nur ein SELECT pro Call. Treffer klassifizieren (nur Transliteration / auch arabic_script betroffen / Dialektfrage ungeklärt → Semia/Ninja vorlegen), volle Liste zeigen, erst nach Bestätigung schreiben. Bei unscharfen Regeln (Possessivsuffixe, Verbkonjugationsmuster): Stichprobe statt Vollständigkeitsanspruch, explizit kennzeichnen.

### TUNICO

"A Digital Dictionary of Tunis Arabic" (Uni Wien, Dallaji/Gabsi/Procházka/Ritt-Benmimoun u.a., 2016) — direkt aus derselben akademischen Quelle wie unser Uni-Wien-Kursmaterial (1.056 von 7.543 Einträgen zitieren "Ritt-Benmimoun 2014", genau unsere Kursquelle). Live-Website hinter Anubis-Bot-Schutz — **nicht versuchen zu umgehen**, stattdessen Rohdaten auf GitHub (`acdh-oeaw/tunico-data`) klonen/parsen. Für Seiten außerhalb der öffentlichen Repos (z.B. Korpus-Statistikseiten): Nils um Copy-Paste bitten.

**Tabellen** (alle mit `*_orig`=wissenschaftliche DMG-Transliteration, `*_chatalpha`=automatisch umgewandelt, getrennte Spalten):
- `tunico_import` (7.543 Zeilen): `lemma_orig`/`_chatalpha`, `variants_*`, `pos`, `subc`, `root_*`, `inflected` (jsonb), `senses` (jsonb `{en,de,fr}`), `bibl`. Kein arabisches Original.
- `tunico_corpus_verbs`/`_adjectives`/`_nouns` (300/64/300 Zeilen): häufigste Wörter im Korpus mit `rank`/`frequency` und allen belegten Flexionsformen (`forms_*`, Array) — wertvoll für Priorisierung.
- `tunico_corpus_wordforms` (9.874 Zeilen): alle belegten Wortformen nach Häufigkeit, direkt aus den TEI-XML-Korpustexten (`xmlfiles/` im Repo) nachgerechnet, nicht per Copy-Paste — bei TUNICO-Statistikseiten immer erst prüfen, ob sich Zahlen aus den rohen `xmlfiles/` nachrechnen lassen.

**Umwandlung `*_orig` → `*_chatalpha`:** ʔ→weg, ʕ→3, ḥ→7, x/ḫ→kh, ġ→gh, š→sh, ž/ǧ→j, ḍ→dh, ḏ/ṯ/ẓ→th, ā/ī/ū/ē/ō→ohne Sonderzeichen, ṣ/ṭ→s/t, ḷ/ṃ/ṛ/ḅ/ṇ→ohne Unterscheidung, ᵊ→weg, französische Nasalvokale (ä/ǟ→e, õ/ȭ/ȫ→o, ü/ǖ→u). Vor jedem Bulk-Import auf einer neuen Teilmenge einmal `unicodedata.category(ch)=='Mn'` auf die `*_chatalpha`-Spalten prüfen, um freistehende combining marks zu erkennen (Präzedenzfall: PRECEDENTS.md → TUNICO).

**TUNICO-Kandidaten-Review im Trainer** (Tab "🗂️ TUNICO", `showTunicoCandidates()`): manuelles Abarbeiten der Frequenz-Lücken-Analyse in Batches, gefiltert nach Kategorie/Status. Tabelle `tunico_candidates` (664 Zeilen) speichert `auto_verdict`, `matched_vocab_id`, `status`, `vocabulary_id`, `comment`, `decided_at`. Drei Aktionen: 🔗 Verknüpfen (Suche gegen `ALL_VOCAB`, `progress`-Zeile mit `next_review=jetzt`), ➕ Neu anlegen (`flagged:true`, `arabic_script:null`), ⏭ Überspringen.

**Verb-Zitierform ≠ Trainer-Konvention:** TUNICOs `lemma_chatalpha` ist die bloße Stammform, der Trainer nutzt die 3. Person Singular Präsens mit y-/t-Präfix — beim Verknüpfen/Neuanlegen die passende Flexionsform aus `tunico_corpus_verbs.forms_chatalpha` wählen (siehe `_tnGuessVerbForm()`), nie die reine Stammform übernehmen. Nomen/Adjektive sind davon nicht betroffen.

**Bei jeder TUNICO-Verknüpfung/Neuanlage: deutsches Gloss-Feld gegen `de_gloss` auf fehlende Bedeutungsfacetten prüfen.** `de_gloss` bei "/" in Einzel-Sinne zerlegen, gegen `german` abgleichen. Bei echter zusätzlicher Facette ohne Wortüberlappung: zuerst prüfen, ob dasselbe/ein sehr ähnliches Darija-Wort bereits einen EIGENEN Bestandseintrag für genau diese Bedeutung hat, bevor angehängt wird. Unverwandtes Homonym gleicher Schreibung ist kein Blocker, nur eine Randnotiz. Bei Verdacht auf andere Wurzel/unverwandte Bedeutung: als Homonym-Konflikt melden, echte Wurzel-Prüfung gegen `tunico_import` nötig statt automatisch zusammenzuführen.

Bei einem scheinbaren Bedeutungsfehler, der nur auf EINEM Ninja-Teiltreffer beruht: vor der Korrektur zusätzlich `tunico_import` nach demselben Lemma/derselben Wurzel durchsuchen — TUNICO listet oft das komplette Bedeutungsspektrum, eine einzelne Ninja-Trefferzeile nur eine Facette (Details: PRECEDENTS.md → TUNICO).

**Beim automatischen Verknüpfen bevorzugt auf Einzelwort-Einträge matchen, nicht auf irgendeinen Treffer mit passendem Token** — ein Phrasen-Eintrag, der das Wort nur enthält, ist fast nie die bessere Zuordnung als ein exaktes Einzelwort im Bestand, falls beides existiert.

Bulk-Insert: siehe eigener Abschnitt "Bulk-Insert bei großen Mengen" oben (dort ursprünglich für TUNICO entwickelt, gilt für jede große Quelle).

### Abgleich mit Derja Ninja (derja_ninja_entries)

Derja Ninja (derjaguru.com/derjaninja.com) ist eine tunesische Online-Wörterbuchdatenbank mit vokalisierten arabischen Einträgen, meist zuverlässiger vokalisiert als bestehende Trainer-Einträge. Offline-Dump: `derja_ninja_entries` (17.335 Zeilen, vollständiger Crawl aller Einzelwort-Seiten `/e/<uuid>` über die Sitemap, Stand 2026-08-17) — **die einzige zu verwendende Ninja-Tabelle**, `derja_ninja_import` (älter, 6.327 Wörter) wird seit 2026-09-02 nicht mehr verwendet, auch nicht als Fallback (siehe Abschnitt unten zur Begründung, warum sie trotzdem nicht gelöscht wird).

Spalten: `entry_uuid`, `arabic_script`, `darija` (Ninjas eigene Transliteration — andere Konvention, nie 1:1 übernehmen), `english`, `audio_url`, `term_start`/`term_end` (Sekunden-Offsets, direkt nutzbar), `example_arabic`/`example_darija`/`example_english`, `example_audio_url`, `example_term_start`/`example_term_end`, `pos_tag`, `scraped_at`, `translit_norm`/`translit_skeleton`/`arabic_skeleton` (vorab berechnete vokalfreie Skelette).

**Regel: arabic_script aus Derja Ninja bevorzugen**, auch bei kleinen Abweichungen. `darija` danach an die neue Form anpassen. `german`-Herkunftshinweis nur bei echtem Mehrwert ergänzen ((MSA)/(Darija)/(frz.)). `lesson_id` prüfen, bei Unklarheit Rückfrage. **Nicht automatisch ändern:** bereits korrekt vokalisierte Einträge mit nur orthographischer Variante bei Ninja; abweichende Bedeutung → als Auffälligkeit markieren, Nutzer entscheiden lassen; `darija` selbst wird nie aus Ninja übernommen (andere Konvention).

**Workflow Bestandsaudit (z.B. fällige unvokalisierte Vokabeln):**
1. **Exakt-Match-Scan:** `vocabulary.arabic_script` (unvokalisiert) direkt gegen `derja_ninja_entries.arabic_skeleton` (bereits vokalfrei, kein eigenes `regexp_replace` nötig). Vokalisierte Bestandseinträge: eigene Vokalisierung gegen `derja_ninja_entries.arabic_script` vergleichen (Lautlehre-Regeln 1–4 in SKILL.md, Imala-Abweichungen ignorieren).
2. Pro Vokabel: Anzahl distinkter `arabic_script`-Werte zählen, nicht Anzahl der `english`-Kandidaten — mehrere `english`-Formen (tomato/tomatoes, introduce/introduced/introducing) zeigen oft auf dieselbe Zeile (Kollektivnomen bzw. Lemma-Gruppierung, normal, kein Fehler).
3. Bei mehreren distinkten Vokalisierungen: Wortart/Bedeutung gegen die deutsche Übersetzung prüfen (Lautlehre-Regel 5, Maß-I/Maß-II-Falle — Praxisfall `yqaddem`: PRECEDENTS.md → derja_ninja_import). Nur bei eindeutiger Zuordenbarkeit übernehmen.
4. **Semantische Zufallstreffer filtern:** reine Konsonantenskelett-Kollisionen ohne inhaltlichen Bezug verwerfen, im Zweifel ausschließen.
5. Ergebnisliste mit Alt→Neu, English, Audio-Link (`audio_url`+`term_start`/`term_end`, kein Trimmen mehr nötig) zeigen, erst nach Bestätigung schreiben.
6. Nach der Ausführung: Stichprobe gegen Lautlehre-Regeln 1–4 gegenprüfen.

**Bekannte Grenzen:** deckt nur Exakt-Match auf Konsonantenskelett ab, Rest bleibt manueller Vokalisierungs-Workflow. "Kein Match" ist eine eigene Fehlerkategorie, kein Beweis für einen Vokabelfehler — harmlose Ursachen: Genus-/Numerus-Divergenz (Ninja listet oft nur die maskuline Grundform), regionale Synonymvielfalt (Ninja listet mehrere Dialektvarianten, unser Eintrag kann eine legitime weitere sein, die dort nicht auftaucht), reine Abdeckungslücke (Stichprobe: 3 von 10 alltäglichen Wörtern fehlten komplett im Offline-Dump — bei Unsicherheit immer live nachschlagen, `derja.ninja/search?search=...`).

`derjaninja.com` ist vollständig serverseitig gerendert — ein reiner curl-Abruf ohne JS liefert die komplette Ergebnisliste. Ein 403/leeres Ergebnis in einer anderen Session liegt an der Domain-Allowlist der jeweiligen Umgebung bzw. falschen Parameternamen (`search`, nicht `q`/`query`), nicht an fehlendem JS-Rendering.

**Live-Suche, wenn keine Offline-Quelle etwas liefert:** `GET https://derja.ninja/search?search=<begriff>&script=<english|transliterated|arabic>` (serverseitig gerendert, curl reicht, kein JS nötig). `script=english` für deutsche/englische Begriffe (vorher übersetzen), `script=arabic` für arabische Schreibung, `script=transliterated` für lateinische Umschrift. Kein Treffer → sauberer Text "No results".
- Jeder Treffer: `<div class="search-result__term_in_arabic">` mit `<audio src="https://static.derjaninja.com/recordings/NNNN.mp3">` und `<span class="transliterate-text">`. Beispielsatz-Block: `search_result__example_sentence_in_arabic` (Unterstrich statt Bindestrich — Inkonsistenz der Seite selbst).
- **Wort- und Beispielsatz-Audio zeigen oft auf dieselbe mp3** — Trennung passiert nur clientseitig per JSON-Zeitstempel (`{"term":{"start":...,"end":...}}`). `WebFetch` strippt dieses JSON — für Audio-Timing immer `curl` benutzen. `ninja_audio_url` nie ohne `ninja_audio_start`/`ninja_audio_end` setzen, wenn die Quelle ein Satz-Audio ist. Details/betroffene Fälle: PRECEDENTS.md → Abgleich mit Derja Ninja.
- Immer die volle Trefferliste scannen (bis zu 40 Treffer, nicht nach Relevanz sortiert), nicht nur die ersten 5–8.
- Audio-URL direkt beim ersten Scan mitextrahieren, nicht erst bei Bedarf.
- **Audio nur bei wirklich identischer Aussprache anhängen** — gleiche Silbenzahl, gleiche Gemination. صَرْف (sarf, "Wechselgeld") ≠ صَرِّفْ (sarrif, "wechseln") trotz gleichem Konsonantenskelett.
- Ein Treffer bedeutet nicht automatisch ein eigenes Headword — kann nur aus dem Beispielsatz eines fremden Eintrags stammen (typisch bei Redewendungen). Bei zusammengesetzten Begriffen ohne Treffer: nach dem Adjektiv/Bestandteil statt dem ganzen Kompositum suchen, und gezielt Beispielsätze durchsuchen.

**Ninjas eigener Transliterations-Schlüssel** (für `script=transliterated`-Suchen — Ninja konvertiert die Sucheingabe intern erst zu Arabisch):

| Ninja | Laut | Unsere Konvention | Für Ninja-Suche umwandeln |
|---|---|---|---|
| 2 | أ (Hamza) | meist weggelassen | – |
| 3 | ع | 3 | gleich |
| 5 | خ | kh | kh→5 |
| 7 | ح | 7 | gleich |
| 9 | ق | q | q→9 |
| ch | ش | sh | sh→ch |
| gh | غ | gh | gleich |
| h | ه | (kein eigenes Zeichen) | gleich |
| th | ث oder ذ | th | gleich |
| a | Fatha (kurz) | a | gleich |
| i | Kasra (kurz) | i | gleich |
| ou | Damma (kurz) | oft u/o geschrieben | u/o→ou |

Beispiel: unser `yukhruj` → Ninja-Suche `you5rouj`; unser `yaqli` → `ya9li`. Bei `script=english`-Suchen nicht nötig.

**Ninjas Transkriptions-Philosophie:** Ninja schreibt Wörter tendenziell in ihrer vollen, theoretischen Form (تحمص nicht اتحمص), orientiert sich bei Unsicherheit an der Hocharabisch-Schreibung — "volleres" Ninja-arabic_script ist meist keine Diskrepanz, nur eine andere Kontraktionsstufe. Bei sehr geläufigen Kontraktionen schreibt Ninja aber durchaus auch die kontrahierte Form — bei Widerspruch zwischen dieser Heuristik und einem konkreten Ninja-Treffer gewinnt immer der konkrete Treffer.

**Ninja zitiert Verben/Nomen in der Grundform** (Vergangenheit/Imperativ, nicht Präsens; Singular, nicht Plural) — Audio-Trefferquote bei Präsens-Verben und Pluralformen entsprechend niedrig erwarten, kein Recherche-Manko.

**Sobald ein Treffer die Schreibung bestätigt (kein Fehler), sofort auch das Audio mitziehen** — nicht nur die Rechtschreibprüfung als erledigt abhaken.

### derja_ninja_import — veraltet, nicht mehr verwendet

**Seit 2026-09-02 auf Nutzerwunsch abgelöst durch `derja_ninja_entries`** (17.335 statt 6.327 Zeilen, vollständigerer Crawl, mit Audio-Timing) — siehe Abschnitt oben für die aktuelle Methodik. Wird für keine neue Abfrage mehr benutzt, auch nicht als Fallback.

**Nicht löschen — kein reines Duplikat.** Vergleich am 2026-09-02: von 6.214 unterschiedlichen `darija_result`-Konsonantenskeletten in `derja_ninja_import` finden sich 1.186 (~19%) nicht in `derja_ninja_entries`. Stichprobe zeigt: größtenteils mehrwortige Phrasen/Redewendungen (z.B. "wallet"→"burtmuna", "classmate"→"wild klas"), keine fehlenden Einzelwörter — `derja_ninja_import` scheint eher Übersetzungs-Suchergebnisse (auch Phrasen) gescraped zu haben, `derja_ninja_entries` ist ein sauberer Wörterbuch-Eintrags-Crawl. Unterschiedlicher Zweck, kein Ersatz — Tabelle bleibt bestehen, auch wenn sie für neue Abfragen nicht mehr genutzt wird.

Tabelle: `english_word`, `darija_result` (vokalisiertes Arabisch), `samples` (jsonb-Array `{ar, en, audio_url}`), `source`, `imported_at`. RLS aktiv (Policy `app_access`). Zusätzliche Spalten in `vocabulary`: `english`, `ninja_id` (FK), `ninja_audio_url` (noch nicht im Trainer eingebaut).

Der ursprüngliche Workflow gegen diese Tabelle (zweistufige Zuordnung, Prioritäts-Batching) ist durch den `derja_ninja_entries`-Workflow oben vollständig ersetzt und hier nicht mehr dokumentiert. Ausgewählte Lehren, die weiterhin allgemein gelten (Maß-I/II-Praxisfall, harmlose "Kein Match"-Ursachen): PRECEDENTS.md → derja_ninja_import.

### speaktounsi.off (Instagram)

Eigene Transliteration — wird an unsere Chat-Alphabet-Konvention angepasst, nie 1:1 übernommen: Quelle schreibt 9 für ق, ţ für ط, ā für langes a → wir schreiben q, t, e/a; Quelle schreibt ch für ش → wir schreiben immer sh; Großbuchstaben (H, T, S) der Quelle für Emphase → wir schreiben 7, t, s; Vokale an bestehende Einträge angleichen (z.B. nmeshiw → nimshiw). Bei Unsicherheit: arabic_script als Anker, Partnerin fragen.

**Was immer aufgenommen wird:** Beispielsätze (auch wenn die Einzelvokabel schon existiert, als eigener Satz-Eintrag, Lektion "Gesprächsführung", topic=Phrasen/Ausdrücke), Sprichwörter (Lektion "Sprichwörter", topic=Sprichwörter), Vokabeln nur wenn arabic_script noch nicht in DB.

**Was nicht aufgenommen wird:** Eigennamen, Ortsnamen; zu 100% bereits Vorhandenes; Grammatikerklärungen ohne konkreten Satz/Ausdruck.

**Workflow pro Runde:** 4–5 Bilder hochladen → Extraktion + Duplikat-Check (3 Felder separat) → Tabelle mit Status (✅/⚠️ Fehlt/🔄 Satz neu) → Bestätigung abwarten → SQL-Block. Neues Gespräch nach ca. 10 Runden.

### Peace Corps English-Tunisian Arabic Dictionary (1977)

Zwei Supabase-Tabellen, Rohextrakt aus dem "Peace Corps English-Tunisian Arabic Dictionary" (Ben Abdelkader/Ayed/Naouar, 1977, ERIC ED183017) — ältere, sehr umfangreiche lexikografische Quelle, unabhängig von TUNICO/Uni-Wien/Derja-Ninja.

- **`peacecorps_dict_import`** (5.070 Zeilen — **komplett A–Z importiert**, kompletter Englisch→Tunesisch-Teil bis Seite 497; der umgekehrte Tunesisch→Englisch-Teil danach ist bewusst nicht importiert): `headword` (englisches Stichwort), `freq` (1–5, Häufigkeitsrang aus dem Original, keine Homonym-Nummer), `pos`, `forms_phonetic` (Array, Original-Lautschrift, Reihenfolge wie im Original: Sg./Pl., m./f./Pl., Imperativ/Perfekt — Groß-/Kleinschreibung markiert Emphase-Laute: H/S/T = ح/ص/ط vs. h/s/t = ه/س/ت), `forms_roles` (Array parallel zu `forms_phonetic`: `sg`/`pl`/`m`/`f`/`imperativ`/`perfekt`/`coll`/`"unklar"`, nicht befüllt bei `is_synonym_set=true`), `forms_chatalpha`/`forms_skeleton` (Arrays, aus `forms_phonetic` per Konvertierungsregel abgeleitet, siehe PRECEDENTS.md → Peace-Corps-Konvertierung; 5.004/5.070 befüllt, die restlichen 66 Zeilen haben schlicht kein `forms_phonetic`), `gender` (aus `pos` abgeleitet wo eindeutig), `is_loanword`, `is_synonym_set` (true = `forms_phonetic` sind echte unabhängige Synonyme, keine grammatischen Varianten), `needs_review` (unsichere Transkription — `false` heißt nicht "geprüft&sicher", nur "keine bekannte Auffälligkeit"), `senses` (jsonb, inkl. Beispielsätzen/Untersinnen), `arabic_script` (**bewusst leer**, nicht aus dem fehleranfälligen OCR übernommen — bleibt die einzige *unabhängige* Arabisch-Spalte dieser Quelle), `arabic_script_reconstructed`/`arabic_script_reconstruction_note` (**kein Faktum**: unvokalisierter Arabisch-Vorschlag aus `forms_phonetic[1]` per `public._pc_reconstruct_arabic()`, 4.874/5.004 rekonstruiert, davon 446 mit Unsicherheits-Hinweis; nie mit `arabic_script` verwechseln oder dort hineinschreiben — siehe PRECEDENTS.md → Peace-Corps-Arabisch-Rekonstruktion), `source_section`, `source_page`, `raw_text` (in der ganzen Tabelle 0% befüllt, kein Qualitätsproblem). Vor jeder Aussage zum Stand aktuell gegenchecken (`SELECT count(*), max(source_page) FROM peacecorps_dict_import`), nicht auf alte Notizen verlassen.
- **`peacecorps_grammar_import`** (21 Zeilen): `topic`, `page_start`, `page_end`, `raw_text`. Lautschrift-Legende (Sonderlaute Ḥ/ʕ/q, Vokalzeichen+Längung, Shadda) plus Grammatik-Kapitel (Personalpronomen, Artikel, Possessiv, Zahlen, Dual, Komparativ, Zeiten, Konditional, unregelmäßige Verben, Verneinung, Fragebildung, Objektpronomen). Rohmaterial für künftige `course_exercises`, noch nicht umgesetzt.

**Nutzen für den Ninja-Check-Workflow:** dritte Offline-Quelle im 🚩-Workflow (siehe SKILL.md) — nach `derja_ninja_entries` und `tunico_import` durchsuchen, v.a. bei älterem/ungewöhnlichem Lehrbuchvokabular.

### uniwien_source_pages

Tabelle `uniwien_source_pages` (270 Zeilen) — wörtliche Seiten-Transkription der Uni-Wien-Lehrskripte, eine Zeile pro PDF-Seite, per Claude Vision erfasst (Bild gelesen, nicht OCR). Spalten: `book`, `pdf_page`, `printed_page`, `lesson_number`, `section`, `content`, `has_nontext_content` (Flag für Seiten mit Bildern/Tabellen, von der Text-Transkription nicht vollständig erfasst), `transcribed_by`, `transcribed_at`.

**Das ist die Rohdaten-Ebene, von der `course_lessons.grammar_notes`/`dialog_text` und `course_exercises` abgeleitet wurden** — getrennt gehalten, damit sich Vollständigkeits-Audits gegen den tatsächlichen Quelltext prüfen lassen, nicht nur gegen die bereits verarbeitete Zusammenfassung. **Für Kurs-Vollständigkeits-Audits (siehe COURSE_MODE.md → Pflichtschritt: Item-Zählung) die belastbarste Quelle** — `content` (nach `lesson_number`/`pdf_page` gruppiert) gegen die tatsächlich in `course_exercises` vorhandenen Items abgleichen, statt sich nur auf `grammar_notes`/`dialog_text` zu verlassen. `has_nontext_content=true` markiert Seiten mit möglicherweise unvollständiger Transkription — dort vor einer "vollständig geprüft"-Aussage die Originalquelle nochmal gegenprüfen.
