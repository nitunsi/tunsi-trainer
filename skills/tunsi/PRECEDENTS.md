# Tounsi Trainer — Präzedenzfälle & Fehlerhistorie

Ausführliche Fallgeschichten, Bug-Berichte und Nachweise hinter den Regeln in `SKILL.md`. Nicht für den Alltagsbetrieb nötig — nur bei Bedarf nachschlagen (z.B. "warum gilt diese Regel eigentlich", "wurde dieser Fall schon mal geprüft"). Gliederung folgt den Abschnitten von `SKILL.md`.

## Datenregeln — Präsens-Verben-Gloss

Präzedenzfall: beim Import von Lektion 4–7 wurden ~15 Verben doppelt angelegt, weil alte Einträge "er steht auf"-Stil hatten und die neuen "aufstehen"-Stil — der Duplikat-Check auf der German-Spalte lief dadurch ins Leere, erst ein Konsonantenskelett-Vergleich (Vokale komplett entfernt, nicht nur normalisiert) deckte sie auf.

## Verben — Bündelungsfehler

**Imperativ+Vergangenheit-Bündelung** (nicht nur Imperativ+Präsens): mehrfacher Präzedenzfall 2026-08-06 (`ejbed`/`jbed`, `sakkar`, `naqqaz`, `lawwej` — alle als eine Zeile "Imperativ! / er tat" angelegt, nachträglich in zwei Zeilen aufgeteilt). Da Imperativ und Vergangenheit bei manchen Verbmustern gleich geschrieben werden (z.B. `sakkar`/`sakkar`), beide Zeilen dann mit `homonym_ok=true` markieren, damit der Duplikat-Check sie nicht fälschlich meldet.

**`darija` transliteriert als MSA-Imperativ (a-/i-/o-Präfix), obwohl `arabic_script` bereits korrekt die 3.-Person-Vergangenheit (فَعَل, kein Präfix) zeigt.** Präzedenzfall 2026-08-07: systematische Suche `darija ~ '^[aio][a-z0-9]' AND german ~* '^(er|sie)\s'` (ohne Match am arabic_script-Anfang) fand 15 betroffene Zeilen in `topic='Verben-Konjugation'`/`Verben-Infinitiv`, alle mit korrektem y-Präfix-Präsens-Sibling in derselben Lektion (z.B. `imsa7`→`masa7` neben Präsens `yimsa7`, `odhrab`→`dharab` neben `yodhrab`, `ikthib`→`kathab` neben `yikthib`). `darija` einfach aus dem bereits korrekten `arabic_script` neu transliterieren, nicht das arabic_script antasten. Dabei fiel ein Folgefund auf: `7adhar`(id 1648, "er bereitete vor", arabic_script حَضَّر mit Shadda/Gemination) wurde durch die Korrektur von id 1615 (`i7dhar`→`7adhar`, "er nahm teil", arabic_script حَضَر ohne Shadda — echtes MSA-Homonym-Paar Form I/Form II, von Ninja bestätigt: حضر=attend, حضّر/تحضير=prepare) zum exakten Duplikat, weil beide Zeilen die Gemination im `darija`-Feld verschluckt hatten. Auch dort: `darija` an die im `arabic_script` bereits vorhandene Gemination anpassen (`7adhar`→`7addhar`, inkl. Präsens-Sibling `y7adhar`→`y7addhar`), nicht raten oder homonym_ok setzen.

## Duplikat-Check — Fallgeschichten

**Standard-Merge-Vorgehen, Präzedenzfall zur Vorsicht bei "vokalisiert = korrekt":** Beim Merge von `yeb3ath`/`yib3at` ("er schickt") wurde 2026-08-06 die Schreibweise des gelöschten (neueren, vokalisierten) Duplikats übernommen — `يِبْعَت` (endet auf ت) statt der korrekten `يِبْعَث` (endet auf ث, Wurzel ب-ع-ث). Der Fehler steckte schon im gelöschten Duplikat selbst und wurde beim Merge unkritisch mitgenommen, obwohl die bereits Ninja-verifizierte Vergangenheitsform derselben Wurzel (`b3ath`/بعث, ID 642) den Fehler sofort widerlegt hätte. "Neuer/vokalisiert" heißt nicht "automatisch korrekt".

**yibda-Fall (Lektion 6):** Suche nach "anfangen" fand nichts, weil der bestehende Eintrag mit "er beginnt" glossiert war; erst eine zusätzliche Suche nach der (korrekt konvertierten) Zieltransliteration "yibda" hätte den exakten Treffer sofort gezeigt. Grund für die Regel "immer beides parallel prüfen: deutscher Wortlaut UND Ziel-Darija/arabic_script".

**Duplikat-Check auch NACH einer Schreibkorrektur (2026-08-12, `yisma7`→`yisma3`):** Beim Korrigieren eines Schreibfehlers auf einer bereits existierenden Vokabel wurde nicht geprüft, ob die KORRIGIERTE Schreibung bereits als eigener Bestandseintrag existiert — es gab schon ein `yisma3`("er hört", mit echtem Lernfortschritt), wodurch die Korrektur eine neue Dublette erzeugte, statt eine zu beheben.

**Themen-Sweep vor Einzelprüfung, Präzedenzfall Lektion 6:** 28 von 33 Adjektiven waren schon vorhanden (aus einem früheren Batch) — ein einziger Sweep gegen `topic='Adjektive'` zeigte das sofort, statt es bei 30 Einzelchecks erst nach und nach zu entdecken.

**Ninja-Audio-Link-Gruppierung als Duplikat-Signal (2026-08-12, `behi`/`bahi`):** Erste Anwendung: 84 Gruppen mit geteiltem Audio gefunden, nach Filter (Levenshtein ≤2 nach e/i-Fold, überlappende Bedeutung, keine widersprüchlichen Grammatik-Marker) blieben 7 Kandidaten, davon 4 echte Dubletten bestätigt und gemergt (`jem3a`/`jim3a`, `bousta`/`el-bouwsta`, `sayis rou7ek`/`ru7ek`, `tisbe7 3ala khir`/`tesba7 3la khir` — letzteres trotz irreführendem "(Frageform)"-Label, das sich als Fehletikettierung herausstellte), 3 zurecht ausgeschlossen (`khal`/`khwel` = Sg./Pl., `ghasal`/`ghassel` = zwei verschiedene Verbformen I/II, `bint el khala`/`bint el khal` = zwei verschiedene Cousinen-Beziehungen).

**Singular/Plural nie als "sg / pl"-Schrägstrich-Eintrag, Präzedenzfall 2026-08-06 (Lektion 5):** 6 Wörter als "wort / wortplural" in einem Feld importiert (z.B. `3utshan / 3utshanin`, `yidd / idin`) — der Duplikat-Check normalisiert den ganzen String inkl. Schrägstrich zu einem einzigen Key, wodurch ein bereits bestehender Singular-Eintrag (z.B. `3otshen`, andere Vokalschreibung) NICHT als Duplikat erkannt wurde. Erst eine Vokal-Varianten-bewusste Nachkontrolle deckte das auf.

**"/" vs. ";" im german-Feld — vollständige Historie:** `checkAnswer()` (trainer.html, Zeile ~440) macht `answer.split(/\s*\/\s*/)` und akzeptiert JEDE der Teile als richtige Antwort. Präzedenzfall 2026-08-06: Vollsweep über alle 809 `german`-Felder mit „/" ergab 108 echte Bedeutungs-Kollisionen (u.a. Richtungspaare wie „rechts/links", Personen-Mischungen wie „ich kam / du kamst", eigenständige Wortbedeutungen wie „Tür / Tor") → auf „;" umgestellt; zusätzlich 12 Fälle, in denen „/" nur innerhalb einer Klammer-Erläuterung stand (z.B. „letzte/r/s (vergangen)", „Waage (Markt / Küche)") → dort „/" durch Komma/„oder" ersetzt. Bei der Gelegenheit fielen außerdem 3 weitere Imperativ/Vergangenheit-Vermischungen auf (`sakkar`, `naqqaz`, `lawwej`) und wurden nach demselben Muster aufgeteilt.

Fehlklassifikation direkt danach entdeckt: `ahuwa` wurde mit „hier ist er, da ist er" angelegt (Komma) und `shbik` mit „was hast du?; warum?" (Semikolon) — beides falsch. Bei Zeigewörtern und mehrdeutigen Frage-/Interjektionspartikeln ist NICHT eine einzige Übersetzung "die richtige" — beide Antworten sollten von `checkAnswer()` akzeptiert werden, also „/" statt „;"/",". Der „er flog / er rasierte"-Fall (zwei verschiedene Verben, „/" fälschlich verwendet) bleibt der Gegenbeweis. Testkriterium: „Würde ich als Lehrer BEIDE Antworten als richtig durchgehen lassen, wenn nur dieses eine Wort abgefragt wird?"

Nachprüf-Runde 2026-08-06 (104 der 108 „;"-Umstellungen erneut geprüft): 82 zurück auf „/" (echte kontextfreie Mehrdeutigkeit — u.a. **grammatische Homophonie**: Präsens „du"/„sie" (beide t-Präfix) und Vergangenheit 1./2. Person Singular (beide -t-Suffix, z.B. `ktibt` = „ich schrieb"/„du schriebst") sind in der Wortform tatsächlich identisch, keine Datenfehler), 7 als Zeilen-Split erkannt, 1 explizit NICHT umgestellt (`7add` = „jemand; niemand (in Verneinung)" — bleibt „;", weil die „niemand"-Lesart nur im negierten Satz gilt).

Die 7 Splits zeigten ein Muster: wenn `arabic_script` selbst schon zwei Formen mit „/" bündelt (z.B. `خَلَّات / خَلِّيت`), aber `darija`/`german` nur EINE Form zeigen, ist das ein klarer Fall für zwei Zeilen. Betraf: `khallit`/`hazzit`/`7attit` sowie 4 Fahr-Kurzbefehle (`zid`/`naqqes`, `dour rechts`/`links`, `etla3 vorne`/`hinten`, `habbat`/`talla3` — letztere waren fälschlich als „bewusst kombinierte Gegensatzpaare" eingestuft worden).

Dritte Runde 2026-08-06: vorbestehende „;"-Einträge, die nie Teil des 108er-Sweeps waren (Sweep erfasste nur Felder, die vorher „/" enthielten). Auffällig geworden durch Nutzer-Fund `banu` (Bad/Badewanne/große Plastikschüssel — genuine Mehrdeutigkeit, war fälschlich „;"). Zusätzlich entdeckt: zwei Fälle, wo „;" zwei Infinitiv-Glosses statt korrekter 3.-Pers.-Sg.-Form trennte (`yqoum`="er steht auf; aufstehen", `ya7ki`="erzählen; sprechen") — kein „/"-vs.-„;"-Fall, sondern ein Verstoß gegen die Präsens-Verben-Gloss-Regel, erst danach über den Trenner entscheiden. Bei `yikri`="er mietet; er vermietet" auf „/" gestellt, aber mit geringerer Sicherheit (keine widersprechende Quelle gefunden).

**App-eigene Duplikat-Prüfung als Nachkontrolle, Präzedenzfall 2026-08-02:** 6 echte Duplikate aus einem eigenen Import-Batch (Lektion 5 + 6) wurden erst im "🔍 Duplikat-Prüfung"-Tab sichtbar, vorher unentdeckt.

**SQL-Nachbau live verifiziert (2026-08-05):** Ergebnis der SQL-Nachbildung deckte sich exakt mit dem, was der UI-Tab vorher gezeigt hatte.

**Fallen — ausführliche Fälle:**
- Vokal-Varianten-Falle (2026-08-05): `ghurbal` vs. bestehendem `ghorbel`, `ghnaya` vs. bestehendem `ghneya` — zwei eigene Neuanlagen trotz vorherigem Duplikat-Check, erst vom App-eigenen Check gefunden.
- arabic_script selbst fehlerhaft (2026-08-06): 3 Einträge rund um die Wurzel „sbah/Morgen" hatten ض statt ص im arabic_script (bestätigt durch den eigenen deutschen Gloss, der explizit „Kurzform von صباح الخير" nannte).
- Buchstaben-Identitäts-Unsicherheit, Derja Ninja als Tiebreaker (2026-08-06): „Weg/Straße" (`tniya`) war mit ط transkribiert (akademische Quelle), aber sowohl bestehende Bestandseinträge als auch `derja_ninja_import` (Treffer für „way, path" → ثْنِيَّة) bestätigten ث. Ripple-Effekt: falsche Emphatika-Annahme verfälschte auch die Artikel-Assimilation (ط kein Sonnenbuchstabe, ث schon) im bereits geschriebenen Lektionstext (`f-it-tniya`→`f-eth-thniya`).

## Prüfungen nach jedem Import — Fallgeschichten

**ج/ز/ه/س-Konsonanten-Gegenchecks, erster Testlauf (2026-08-06):** 8 echte Bestandsfehler gefunden. Wiederkehrendes Muster: ه wurde mehrfach fälschlich als "7" (Zeichen für ح) transkribiert, obwohl ه kein eigenes Ziffernzeichen hat und einfach "h" bleiben sollte (`hazz`/`yhizz`/`ashal`/`jhannem` — alle hatten "7" statt "h"). `y7izz`(korrekt `yhizz`) stellte sich dabei als verstecktes Duplikat von bereits bestehendem `yhizz`(id 3996→in 2228 mit Lernfortschritt gemergt) heraus. Weitere Funde: fehlende Possessivsuffix-Silbe (`3anda`→`3andha`), fehlendes س in einem Partizip (`mitbanni`→`mistabni`), ein darija-Feld das nur das deutsche Wort als Platzhalter enthielt (`Steine`→`7jar`), ein Sprichwort-Tippfehler (7 statt j), `draz`("fünf Minuten") hatte im arabic_script ج statt ز.

**Korrektur zum `draz`-Fund, selber Tag:** die ج→ز-"Korrektur" war falsch herum. IDs 4058/4059 (`دْرَاز`/`دَرْزِين`, "fünf/zehn Minuten") stellten sich als bereits länger bestehendes Duplikat (10-11 Reviews) von `دَرَج`/`دَرْجِين` (ids 2356/2357, `draj`/`darjin`) heraus — letztere bilden einen sauberen Arabisch-Dual, 4058/4059 dagegen waren progresslos und ihre ز-Schreibung ergab gar keinen gültigen Dual. Gemergt: 4058/4059 gelöscht, `course_lessons`-Ref in Lektion 7 (id 8) auf 2356/2357 umgebogen. Gleiches Muster bei `f-il-3ada`/`fiy l3ada` (ids 3875/2057, "normalerweise") — die Ninja-Korrektur des arabic_script auf فِي لْعَادَةْ machte den Eintrag zum exakten Duplikat eines länger bestehenden Eintrags mit Lernfortschritt — ebenfalls gemergt (3875 gelöscht, Ref in Lektion 6/id 7 umgebogen).

**Grammatik-Regeln als Checks — getestete Kandidaten (2026-08-06):**
- ✅ Unmarkierte Feminina (L6 liefert die Ausnahmeliste: ukht, umm, bint, saq, yidd, 3in, wdin, farmasi, kar, tunis, mistir, susa, kirsh, shams, nar, dar, bit, blad) — nur 2 Fehlalarme (`hethi`, `shah`/`shih`/`shihin`), beide zur Ausnahmeliste hinzugefügt.
- ✅ "und" = immer "w-" (aus L1) — 3 Treffer, 2 echte Bugs gefixt (`wa 3alaykom`→`w-3alaykom`, `wa qaddesh`→`w-qaddesh`), 1 Ausnahme (`ahla wa sahla`, feste MSA-Grußformel).
- ❌ Verb-Personalpräfix (y-/t-/n-, aus L2) verworfen: `lesson_id=46` mischt Präsens UND Vergangenheit, keine verlässliche Tempus-Unterscheidung per SQL; "t-"-Präfix kollidiert mit dem stamm-eigenen t der Maßstämme V/VI; Verlaufsform-Konstruktionen und negierte Pronomen erzeugen weitere Fehlalarme. Alle 17 Testtreffer falsch positiv.
- ❌ m/f-Adjektivpaare = masc+"a" verworfen: Tunesisch synkopiert den Stammvokal vor der Femininendung (`ak7al→ka7la`, nicht `ak7ala`). 28 von 28 Testtreffern falsch positiv.

## TUNICO — Fallgeschichten

**Zeichen-Konvertierungs-Bug beim ersten Durchlauf:** eine freistehende COMBINING DOT BELOW (U+0323) hinter ḏ (statt vorkomponiertem Zeichen) wurde übersehen und produzierte Datenmüll (`ibathiya` wurde erst falsch zu `ibatthiya`). Bei `tunico_corpus_wordforms` kamen zudem 6 neue Zeichen aus französischen Lehnwort-Transkriptionen zum Vorschein (à, ã, ö, Š, ṏ, ṻ — alle vorkomponiert, nicht als combining marks) → zu `to_chatalpha` ergänzt.

**Zwei Bugs beim ersten Matching-Durchlauf, vom Nutzer selbst gefunden:**
1. "unsicher"-Flag zu breit definiert: ursprünglich alles mit normalisierter Länge ≤3 als riskant markiert (`ism`="Name" fälschlich geflaggt, obwohl exakter Treffer). Fix: riskant nur wenn normalisierte Länge ≤3 UND das Roh-Token nicht bereits identisch mit dem gematchten Vokabel-Token ist.
2. Echte Lücke in der Matching-Logik: App-eigene `normalize()` gleicht nirgends e↔i ab (`rajil` vs. `rajel`="Mann"). Für die TUNICO-Heuristik zusätzlicher `.replace(/e/g,'i')`-Fold ergänzt (nur fürs Matching, nicht Teil der echten App-`normalize()`).

**Verb-Zitierform-Falle (2026-08-08):** TUNICOs `lemma_chatalpha` ist die bloße Verbstammform ("khammim"="nachdenken"), der Trainer nutzt aber die 3. Person Singular Präsens mit y-/t-Präfix ("ykhammim"="er denkt nach"). `_tnGuessVerbForm()` sucht in `tunico_corpus_verbs.forms_chatalpha` nach einer passenden präfigierten Form — reine Heuristik, bei unregelmäßigen/hohlen Verben oder Dialektvarianten (z.B. "khzar" mit belegter Lautvariante "tughzur") kann der Vorschlag danebenliegen.

**SRS-Fälligkeits-Bug (2026-08-08):** `_tnSetDue()` hat `next_review` bedingungslos auf "jetzt" gesetzt, auch bei bereits laufendem SRS-Zeitplan — 5 real gelernte Vokabeln (Level 4-6) dadurch bis zu 88 Tage zu früh fällig geworden. Fix: `_tnSetDueIfMissing()`. Trotz Dokumentation erneut passiert (2026-08-12): 7 neu angelegte Verb-Vokabeln hatten das deutsche Gloss unverändert im Infinitiv.

**lesson_id: null crasht** mehrere Code-Stellen (u.a. `parseInt(a.slice(1))` im Lektion-Dropdown). Lösung: Pseudo-Lektion `lessons` id=29 (`lesson_number=90`, "TUNICO-Import (unsortiert)") als Ziel für alle TUNICO-Neuanlagen bis zur manuellen Einsortierung.

**Bulk-Insert-Kostenproblem:** Erster TUNICO-Import (7.543 Zeilen) über 31×~75KB-SQL-Batches (teils an Subagenten delegiert) kostete unverhältnismäßig viele Tokens; mehrere Subagenten-Läufe brachen durch ein Account-Session-Limit ab. Seit 2026-08-08 stattdessen: direkter POST an die PostgREST-Bulk-Insert-API (siehe SKILL.md, Abschnitt Bulk-Insert) — bei 4.793 verbleibenden Zeilen: 10 Requests, wenige Sekunden.

**Batch-Ninja-Check des Alt-Rückstands (2026-08-08):** 132 flagged Vokabeln in einem Rutsch abgearbeitet — EINE SQL-Abfrage mit VALUES-Liste gegen `derja_ninja_import.english_word` statt 132 Einzelsuchen. Ergebnis: 12 echte Wortstamm-Treffer, 119 ohne formgleichen Treffer.

**Ninja-Teiltreffer-Falle:** `ysa3id`(id 4026, "es ist gelegen, es passt") wurde fälschlich als Bedeutungsfehler eingestuft und auf "er hilft" korrigiert, weil eine Ninja-Teilsuche nur die "helfen"-Bedeutung von ساعد zeigte. Nach Prüfung in `tunico_import` zeigte `sacid_001` (Wurzel سعد) das volle Bedeutungsspektrum "gefällig sein, gelegen sein, ... helfen" — die ursprüngliche Kursbedeutung war korrekt. `y3awin`(id 2205, Wurzel عون) bedeutet dagegen eindeutig nur "helfen" — beide Wörter sind also keine echten Synonyme. Lehre: bei einem scheinbaren Bedeutungsfehler, der nur auf EINEM Ninja-Teiltreffer beruht, zusätzlich `tunico_import` nach demselben Lemma/derselben Wurzel durchsuchen.

**homonym_ok-Audit (2026-08-08):** alle 25 Paare gegen `tunico_import` durchgecheckt — 24 bestätigt, 1 echter Fehler: `a3wam`(id 4074, "Jahre") kollidierte als Schreibung mit TUNICO-Homograph "ʕwām" = "ungebildetes Volk" (andere Wurzel). Ninja-Beispielsatz bestätigte die korrekte Pluralform mit führendem Alif → auf `darija='a3wam'`/`arabic_script='أَعْوَامْ'` korrigiert.

**Verknüpfungs-Bug (2026-08-08, per Screenshot entdeckt):** "Verknüpfen" traf bei mehreren gleichlautenden Bestandstreffern zufällig den falschen (z.B. Phrasen-Eintrag "7atta nalqa el mra" statt Standalone-Wort "mra"). Audit der 133-Kandidaten-Batch fand 20 weitere Fälle desselben Musters. Erkennungsregel: `vocabulary_id` zeigt auf einen Phrasen-Eintrag, obwohl ein exaktes Einzelwort existiert → auf Standalone-Treffer umbiegen.

**Gloss-Facetten-Check, erste Anwendung (2026-08-11):** 132 von 324 verknüpften Kandidaten hatten eine Gloss-Differenz, 23 als echte Ergänzung übernommen (z.B. `kalb`="Hund / Halunke / Nichtsnutz"), 4 als Homonym-Verdacht zurückgestellt. Gegenbeispiel `shta`="Regen": nicht um "Winter" ergänzt, weil `esh-shta`(#701)="der Winter" bereits eigener Eintrag für exakt diesen Sinn ist.

**pos-Filter-Bug in `build_candidates.py` (2026-08-12):** `de_gloss` bei Verb-Kandidaten zeigte teils die Bedeutung eines gleich geschriebenen NICHT-Verb-Eintrags (z.B. `7abb`: `collectiveNoun`="Körner" vs. `verb`="lieben/mögen"). 8 betroffene Kandidaten korrigiert: `7abb`, `khallas`, `7mil`, `ba77ar`, `7sab`.

## Abgleich mit Derja Ninja — Fallgeschichten

**Audio-Trim-Technik:** Wort-Audio und Beispielsatz-Audio zeigen meist auf dieselbe mp3 (identische src-URL in term- und sentence-Block) — Trennung passiert clientseitig per JSON-Zeitstempel (`{"term":{"start":...,"end":...},"sentence":{...}}`). Betroffene Bestandsfälle ohne Trim-Prüfung angelegt: Vokabel 522, IDs 15059/15104. `WebFetch` strippt `<script>`-Inhalte, für Audio-Timing immer `curl` benutzen. `ninja_audio_url` nie ohne Start/End setzen, wenn Quelle ein Satz-Audio ist — dreimal passiert und gefixt: courant/717, gharib/3899, maktba/3829.

**Systematischer Audit aller 145 Uni-Wien-Vokabeln (2026-08-06):** 2 echte Buchstaben-Fehler gefunden (`widnin`="Ohren" hatte د statt ذ; `yhaddar` hatte zwei falsche Wurzelbuchstaben und war verstecktes Duplikat von `y7adhar`/id 2218). Von den restlichen 143 hatten ca. 45 gar keinen Ninja-Treffer (grammatische Partikel, Lehnwörter, Eigennamen) — normal bei Lehrbuchvokabular.

**Formgleichheits-Erwartung:** bei 34 bereits bestätigten Einträgen gezielt nach Audio gesucht — nur 2 hatten formgleichen Treffer, weil Ninja Verben in Vergangenheit/Imperativ zitiert (nicht Präsens) und Nomen im Singular (nicht Plural).

**Audio bei Bestätigung vergessen (2026-08-06):** `3am`="Jahr"(id 4073) und `ghir`="außer"(id 4071) wurden als "Schreibung korrekt" bestätigt, aber ohne Audio verlinkt — Nutzer musste extra nachfragen.

**ظ/ذ-Vereinheitlichung, vollständige Historie (2026-08-07):** id 722 (`dhhar`) wurde erst auf `thahr` korrigiert, dann fälschlich als "Ninja-bestätigte Ausnahme" auf `dhhar` zurückgesetzt — Nutzer stellte richtig, dass Ninjas Transliterationsfeld nur automatisch generiert ist (sichtbar am deaktivierten "Generate transliteration"-Button: deaktiviert WEIL schon generiert, nicht weil kuratiert). Belastbar bei Ninja sind nur arabic_script, Audio, englische Bedeutung — NICHT das transliterate-text-Feld. 16 Bestandseinträge auf th vereinheitlicht: `dhra3→thra3`, `dhhar→thhar`, `dhka→thka`, `bal3out→bal3outh`, `khoudh→khouth` (deckte verstecktes Duplikat mit id 3196 auf), `kaddab→kaththab`, `dhbana→thbana`, `hedha→hetha`(×2), `kdheb→ktheb`, `la7dha→la7tha`(×2), `dbi7a→thbi7a`, `3dham→3tham`, `3adma→3athma`. Nebenfund id 3073: derselbe Wortstamm ذبح stand im selben Satz einmal mit د, einmal mit ذ — arabic_script auf ذ vereinheitlicht.

**Konvention ↔ Kursmaterial-Sync (2026-08-06):** Lektion 5s "māḍā-b-" und Lektion 7s "famma, tamma" (widersprach Bestandsvokabel `thamma`/id 1213) waren nur im `chunk_order`-Label sichtbar, nicht in `vocabulary` — wurden bei der ض-Vereinheitlichung zunächst übersehen.

**Konsistenz-Check Skill/Trainer-Code (2026-08-07):** `AR_TRANSLIT_MAP` in trainer.html hatte `ظ→dh` codiert, obwohl die Skill-Pflichtregeln `th` vorschreiben — korrigiert. Alle anderen Konsonanten stimmten überein. Lehre: Skill-Regel und Code-Konstanten können auseinanderlaufen, gelegentlicher Abgleich lohnt sich.

**Nachzügler bei Artikel-Assimilation (2026-08-07):** `الجَنَّة`(id 776, "Paradies") war beim ursprünglichen 38-Fehler-Sweep übersehen worden (`iljanna` statt `ej-janna`) — beim Testen des ✨-Transliterations-Vorschlags im Trainer aufgefallen.

## Uni-Wien-Lehrskripte — Fallgeschichten

**ض-Vereinheitlichungs-Entscheidung (2026-08-06):** vor der Entscheidung war die DB uneinheitlich (d, th UND dh parallel, teils dasselbe Wort doppelt verschieden geschrieben, z.B. `mridh` vs. `mrith` für "krank") — in einem ~90-Zeilen-Sweep auf "dh" vereinheitlicht, inkl. Fließtext in Sprichwörtern/Beispielsätzen. Ripple-Effekt bei Verben, die als Konjugations-Paradigma in Lektionstext verwendet werden, vorher abschätzen (Präzedenzfall: `y3add`/`ya3add` "beißen" in Lektion 6, dort bestätigt und mitgezogen).

**Dreifacher Konvertierungsfehler in einem Batch (2026-08-02):** `yaxi` statt `yakhi`, `yhutt` statt `y7utt`, `turha` statt `tur7a`, `rxis` statt `rkhis` — die Quelle schreibt x/ḫ oder ḥ, aber die Transliteration behielt still das Quellenzeichen oder ließ es ganz weg. Kein rein kosmetischer Fehler: `rxis` hätte "rkhis" heißen müssen, wodurch der Duplikat-Check sofort auf den bestehenden Eintrag 376 gestoßen wäre.

**Konsistenz-Check 2026-08-07 (Skill vs. Trainer-Code):** siehe Derja-Ninja-Abschnitt oben — derselbe Vorgang deckte auch hier `AR_TRANSLIT_MAP`-Drift auf.

**Grammatik-Regel-Anwendung, Präzedenzfall Artikel-Assimilation:** 38 Bestandsfehler in der Transliteration gefunden und korrigiert (arabic_script unverändert gelassen).

## Kurs-Modus — Fallgeschichten

**PostgREST-1000-Zeilen-Limit-Bug (2026-08-07):** `loadCourseData()` lud `course_exercises` per einfachem `sbApi(...)` statt `sbApiPaged(...)`. Supabase/PostgREST liefert standardmäßig max. 1000 Zeilen pro Request. Als `course_exercises` über 1000 Zeilen wuchs (1278 zum Zeitpunkt des Fixes), wurden alle Zeilen ab Cursor-Position 1000 still verworfen — betraf Lektion 6 (Ende, ~83 von 273 Übungen fehlten) und Lektion 7 (komplett, alle 189 Übungen fehlten). Im UI äußerte sich das als "nur Lesen" bei jedem Chunk der betroffenen Lektion, obwohl `chunk_order` und die DB-Zeilen in Ordnung waren — sichtbar erst durch Nutzer-Screenshot. Fix: `sbApiPaged('course_exercises?...', 1000)`.

**Item-Zählung statt Abschnitts-Existenz — der größte Fehler einer ganzen Session:** Drei Lektionen galten als "vollständig geprüft", waren es aber nicht — geprüft wurde nur, ob eine nummerierte Übung *als Abschnitt* existiert, nicht ob *alle* Items bis zur letzten Nummer als eigene `course_exercises`-Zeile in der DB stehen. Ergebnis: ca. 50 fehlende Übungen über drei Lektionen, erst gefunden als der Nutzer sagte "in den Unterlagen sind viel mehr Beispiele als im Trainer".

**Position-Shift-Fehler:** `UPDATE ... SET position = position + 1 WHERE course_lesson_id=X AND position >= Y` — ein zu niedriger Y-Wert erwischt mehr Zeilen als beabsichtigt. Eigener Fehler führte kurzzeitig zu falscher Reihenfolge in Lektion 1, direkt danach per Kontrollabfrage bemerkt und korrigiert.

**vocab_lesson_refs-Formatfehler, Präzedenzfall:** Lektion 5 (2026-08-02) wurde erst mit falschem Format (`"3841,3842,3843"` statt `ids:...|darija:...`) geschrieben, zeigte im Trainer "keine Vokabeln verknüpft", trotz korrekt befüllter Spalte in der DB — erst durch Lesen von `trainer.html` (`grep parseCourseVocabRefs`) gefunden und korrigiert.

## derja_ninja_import (veraltet) — historischer Workflow im Detail

Vollständigkeitshalber archiviert — für Altdaten-Fragen zum fälligen Batch vom 2026-07-24, aktuelle Methodik siehe SKILL.md → derja_ninja_entries.

**Semantische Zufallstreffer, Beispiele:** "party" als Kandidat für "Hemden" (zufällig gleiches Konsonantenskelett). "sheep" lieferte شوشطالرّاس — kein plausibles Tunesisch, verrutschte Scraper-Daten.

**Maß-I/Maß-II-Praxisfall:** IDs 3422/3647 (`yqaddem`, Präsens) — korrekter Maß-II-Präfix ist يُـ (yu-), nicht يَـ (ya-), obwohl beide Varianten identisch als "yqaddem" transkribiert waren. Nur durch Abgleich mit der bereits vorhandenen Vergangenheitsform (ID 3385, قَدَّمْ) auffindbar.

**Übersetzungsbasiertes Matching wenig ergiebig:** Deutsch→Englisch-Gloss-Matching über english_word hatte in einer Stichprobe nur ~1% Trefferquote (Mehrdeutigkeit wie "chest" → Schatztruhe statt Körperteil). "bream"/"dorado"/"fish" für Dorade blieb ergebnislos — reine Abdeckungslücke, kein Bestandsfehler.

**Bei eindeutigen Einzeltreffern war Ninjas Vokalisierung durchgehend zuverlässig** — deckte reale Bestandsfehler auf: Cousine-Verwechslung خَالْ/خَالَة, Lamm/Schaf-Fehlgloss, "zhar" Blumen/Glück.

**"Kein Match" — Stichprobe:** von 10 gegen die Live-Seite getesteten alltäglichen Wörtern fehlten 3 komplett im Offline-Dump (Institut/مَعْهِدْ, Bär/دُبّْ, Koch/طَبَّاخْ) — hoher Anteil, bevor "kein Treffer" als Vokabelfehler gewertet wird, immer live nachschlagen.

## vocab_lookup — Fallgeschichten

**Skeleton-Join zu unscharf, erster Testlauf (2026-09-05):** Erster Entwurf von Rezept 1 jointe `vocabulary.arabic_skeleton`/`translit_skeleton` direkt gegen `vocab_lookup` ohne Filter. Bei `souf`="Wolle" (Skeleton `sf`) kamen darüber 20+ komplett unpassende Ninja-Treffer zurück (`safi`="sauber", `sifa`="Beschreibung", `wasif`="beschrieben", `yousif`="Josef" — alle zufällig ebenfalls Skeleton `sf`, weil Vokale weg sind). Gleiche Falle wie beim bestehenden Ninja-Bestandsaudit-Workflow, hier nur nochmal am Cross-Source-View bestätigt. Fix: `english_key`-Match als primäre Achse, Skeleton-Treffer nur noch separat markiert und auf `length(...) >= 4` beschränkt — bei den drei Testwörtern (`wool`/`close`/`strong`, alle Skelette ≤3) blieb die Zusatzsektion danach korrekt leer, keine Störtreffer mehr.

**Positivtest Rezept 3 (Import-Batch-Check):** drei Testfälle bestätigten das erwartete Verhalten — `wool` korrekt als Duplikat erkannt (bereits ID 429 im Trainer) und von allen 3 Quellen zusätzlich bestätigt; `to abolish` korrekt kein Duplikat, aber durch Peace Corps mit passender Lautschrift (`na77i`) bestätigt; ein erfundenes Wort lieferte erwartungsgemäß in keiner Quelle einen Treffer (Negativ-Test).

## Peace Corps forms_chatalpha/forms_skeleton — Nachbefüllung (2026-09-05)

Ausgangslage: nur 1.241/5.070 Zeilen hatten `forms_chatalpha`/`forms_skeleton` befüllt (aus früheren Einzel-Transkriptionssitzungen), der Rest der Tabelle (importiert aus dem rohen PDF-Extrakt) nicht — und die Konvertierungsregel von `forms_phonetic` (Original-Lautschrift) zu unserem Chat-Alphabet war nirgendwo dokumentiert. Statt zu raten: Regel per Reverse-Engineering aus den 1.241 bereits korrekt konvertierten Zeilen abgeleitet (Diff zwischen `forms_phonetic` und `forms_chatalpha` Zeichen für Zeichen verglichen), dann **vor** dem Bulk-Update gegen alle 1.241 Zeilen auf 100%-exakten Match getestet — nicht auf Stichproben verlassen.

Gefundene Regel (Peace-Corps-Lautschrift → Chat-Alphabet): (1) Großes `H` → `7` (vor dem Lowercasing, case-sensitive), (2) kleines `x` → `kh`, (3) danach alles lowercase (faltet großes S/T/D/Z zu klein, keine Ziffern-Ersetzung dafür), (4) `:` (Längungszeichen) komplett entfernen. SQL: `replace(lower(replace(replace(fp, 'H','7'), 'x','kh')), ':', '')`.

Skeleton-Regel: lowercase Chat-Alphabet, dann `[aeiouwy\s\-\.\(\)àâäéèêëîïôöùûü]` entfernen (Vokale, Halbvokale w/y, Whitespace, Bindestrich, Punkt, Klammern, französische Akzentvokale). Erster Entwurf ohne Punkt/Klammern/Akzentvokale scheiterte an 4/1241 Testzeilen (`AGO` wegen "...", `CUTLET`/`côtelette` und `BABY`/`bébé` wegen é/ô, `BANISH`/`tarrad(milblad)` wegen Klammern) — nach Erweiterung der Zeichenklasse 1241/1241 exakter Match. Danach Bulk-Update auf alle Zeilen mit `forms_phonetic IS NOT NULL` ausgeführt: 1.241 → 5.004/5.070 (die restlichen 66 haben schlicht kein `forms_phonetic`). 20 zufällige neu konvertierte Zeilen stichprobenartig nachgeprüft, alle korrekt (inkl. Französisch-Lehnwörter und Grammatik-Platzhalter).

## Code-Änderungen — Fallgeschichte

Performance-Fix `spellcheck="false"` (2026-08-05): `ei-tp` (Topic-Feld) hatte `autocomplete/autocorrect/autocapitalize/spellcheck` schon deaktiviert, die Nachbarfelder `ei-ar`/`ei-tr`/`ei-en` nicht — der gemeldete INP-Bug betraf nur `ei-ar`, aber dieselbe Fehlerklasse lauerte in allen dreien.
