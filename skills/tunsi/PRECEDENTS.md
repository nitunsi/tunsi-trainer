# Tounsi Trainer — Präzedenzfälle & Fehlerhistorie

Ausführliche Fallgeschichten, Bug-Berichte und Nachweise hinter den Regeln in `SKILL.md`. Nicht für den Alltagsbetrieb nötig — nur bei Bedarf nachschlagen.

**Wann ein Eintrag hierher gehört und wann er schrumpfen darf.** Aufnehmen, wenn ein Fehler passiert ist, den die bestehenden Regeln nicht verhindert haben. **Kürzen, sobald ein mechanischer Wächter denselben Fehler unmöglich macht** — dann bleiben nur die übertragbare Lehre und die Verweise auf den Wächter, der Fallverlauf ist Archiv. Ein Beispiel: die ڨ-Geschichte war 16 Zeilen, seit `unbekannte_arabische_zeichen` und Regel 23 sind es 8. **Nie kürzen**, wenn der Fehler weiterhin von Hand vermeidbar sein muss — die Regex-Fallen (`\y` statt `\b`, Zeichenreihenfolge Vokal-vor-Schadda), der `extract.js`-Anker und der stille Export-Abbruch bleiben deshalb in voller Länge.

## Datenregeln — Präsens-Verben-Gloss

Präzedenzfall: beim Import von Lektion 4–7 wurden ~15 Verben doppelt angelegt, weil alte Einträge "er steht auf"-Stil hatten und die neuen "aufstehen"-Stil — der Duplikat-Check auf der German-Spalte lief dadurch ins Leere, erst ein Konsonantenskelett-Vergleich (Vokale komplett entfernt, nicht nur normalisiert) deckte sie auf.

## Verben — Bündelungsfehler

**Imperativ+Vergangenheit-Bündelung** (nicht nur Imperativ+Präsens): mehrfacher Präzedenzfall 2026-08-06 (`ejbed`/`jbed`, `sakkar`, `naqqaz`, `lawwej` — alle als eine Zeile "Imperativ! / er tat" angelegt, nachträglich in zwei Zeilen aufgeteilt). Da Imperativ und Vergangenheit bei manchen Verbmustern gleich geschrieben werden (z.B. `sakkar`/`sakkar`), beide Zeilen dann mit `homonym_ok=true` markieren, damit der Duplikat-Check sie nicht fälschlich meldet.

**`darija` transliteriert als MSA-Imperativ (a-/i-/o-Präfix), obwohl `arabic_script` bereits korrekt die 3.-Person-Vergangenheit (فَعَل, kein Präfix) zeigt.** Präzedenzfall 2026-08-07: systematische Suche `darija ~ '^[aio][a-z0-9]' AND german ~* '^(er|sie)\s'` (ohne Match am arabic_script-Anfang) fand 15 betroffene Zeilen in `topic='Verben-Konjugation'`/`Verben-Infinitiv`, alle mit korrektem y-Präfix-Präsens-Sibling in derselben Lektion (z.B. `imsa7`→`masa7` neben Präsens `yimsa7`, `odhrab`→`dharab` neben `yodhrab`, `ikthib`→`kathab` neben `yikthib`). `darija` einfach aus dem bereits korrekten `arabic_script` neu transliterieren, nicht das arabic_script antasten. Dabei fiel ein Folgefund auf: `7adhar`(id 1648, "er bereitete vor", arabic_script حَضَّر mit Shadda/Gemination) wurde durch die Korrektur von id 1615 (`i7dhar`→`7adhar`, "er nahm teil", arabic_script حَضَر ohne Shadda — echtes MSA-Homonym-Paar Form I/Form II, von Ninja bestätigt: حضر=attend, حضّر/تحضير=prepare) zum exakten Duplikat, weil beide Zeilen die Gemination im `darija`-Feld verschluckt hatten. Auch dort: `darija` an die im `arabic_script` bereits vorhandene Gemination anpassen, nicht raten oder homonym_ok setzen. ⚠️ **Die damals gewählte Schreibung `7addhar`/`y7addhar` war falsch** — bei einem Digraphen wird der ganze Digraph verdoppelt, richtig ist `7adhdhar`/`y7adhdhar`; Begründung unten unter „Digraph-Gemination". Der Befund selbst (Gemination gehört ins `darija`, das `arabic_script` ist führend) bleibt gültig.

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

## derja_ninja_import — abgelöst, aber nicht wertlos (bis 2026-09-02)

Ersetzt durch `derja_ninja_entries`; **nicht gelöscht**, weil ~19 % ihrer Konsonantenskelette dort fehlen (größtenteils mehrwortige Phrasen — anderer Scraping-Zweck, kein Ersatz). Für neue Abfragen nicht mehr benutzen, auch nicht als Fallback. Aktuelle Methodik: IMPORTS.md → Abgleich mit Derja Ninja.

Drei Lehren daraus gelten weiterhin, auch für die neue Tabelle:
- **Maß-I/Maß-II-Falle:** `yqaddem` (3422/3647) — der korrekte Maß-II-Präfix ist يُـ, nicht يَـ. Gleiches Konsonantenskelett, andere Bedeutung. Vor Übernahme immer Wortart und Verb-Maß gegen die deutsche Bedeutung prüfen.
- **„Kein Match" ist kein Beweis für einen Fehler:** von 10 alltäglichen Wörtern fehlten **3 komplett** im Offline-Dump. Bei Unsicherheit live nachschlagen.
- **Übersetzungsbasiertes Matching ist wenig ergiebig** — die Bedeutungsachse trägt nur mit exaktem `english_key`, nicht über freies Gloss-Matching.

## vocab_lookup — Fallgeschichten

**Skeleton-Join zu unscharf, erster Testlauf (2026-09-05):** Erster Entwurf von Rezept 1 jointe `vocabulary.arabic_skeleton`/`translit_skeleton` direkt gegen `vocab_lookup` ohne Filter. Bei `souf`="Wolle" (Skeleton `sf`) kamen darüber 20+ komplett unpassende Ninja-Treffer zurück (`safi`="sauber", `sifa`="Beschreibung", `wasif`="beschrieben", `yousif`="Josef" — alle zufällig ebenfalls Skeleton `sf`, weil Vokale weg sind). Gleiche Falle wie beim bestehenden Ninja-Bestandsaudit-Workflow, hier nur nochmal am Cross-Source-View bestätigt. Fix: `english_key`-Match als primäre Achse, Skeleton-Treffer nur noch separat markiert und auf `length(...) >= 4` beschränkt — bei den drei Testwörtern (`wool`/`close`/`strong`, alle Skelette ≤3) blieb die Zusatzsektion danach korrekt leer, keine Störtreffer mehr.

**Positivtest Rezept 3 (Import-Batch-Check):** drei Testfälle bestätigten das erwartete Verhalten — `wool` korrekt als Duplikat erkannt (bereits ID 429 im Trainer) und von allen 3 Quellen zusätzlich bestätigt; `to abolish` korrekt kein Duplikat, aber durch Peace Corps mit passender Lautschrift (`na77i`) bestätigt; ein erfundenes Wort lieferte erwartungsgemäß in keiner Quelle einen Treffer (Negativ-Test).

## vocabulary.english Backfill (2026-09-05)

Ausgangslage: nur 311/3.698 Zeilen hatten `english` gesetzt (nötig für den `english_key`-Join in `vocab_lookup`), der neue "🔍 Quellenabgleich"-Button im Trainer griff für den Rest nur auf den schwächeren Skelett-Fallback zurück. Statt Deutsch→Englisch zu übersetzen (Rateaufwand, mehrdeutige deutsche Wörter), `english` stattdessen aus den drei Quellen selbst geborgt — zuverlässiger, weil kein Übersetzungsschritt nötig ist, nur ein Wiedererkennen desselben Worts.

**Vier Stufen, absteigend nach Sicherheit:**
1. **Exakter `ninja_audio_url`-Match** (676 Zeilen): viele Vokabeln haben schon ein verlinktes Ninja-Audio aus einem früheren 🚩-Check, aber nie `english` gesetzt bekommen. `derja_ninja_entries.audio_url = vocabulary.ninja_audio_url` identifiziert exakt dieselbe Ninja-Zeile, die schon das Audio geliefert hat — `english` automatisch übernommen, kein Zufallstreffer möglich (vorab geprüft: keine URL zeigt auf zwei Zeilen mit unterschiedlichem `english`).
2. **Exakter `arabic_script`-Match gegen Ninja** (295 Zeilen): dasselbe Wort, `english` automatisch übernommen.
3. **Exakter Deutsch-Text-Match gegen `tunico_import.senses[].de`** (219 Zeilen): TUNICOs `senses` sind `{en,de,fr}`-Tripel im selben Sinn — ein Treffer auf das bestehende `german`-Gloss (normalisiert: Klammern/Suffix nach „/" entfernt) liefert das zugehörige `en` direkt mit, ohne Lautschrift-Umweg. Nur 7/227 Kandidaten verworfen, alle durch deutsche Homonym-Kollisionen nach dem Kleinschreiben (`heller`/„Heller"-Münze, `reicher`/„Reicher", `zu`=nach vs. `zu`=geschlossen) oder eine falsch gepaarte TUNICO-Zeile (`Frau` mit einem Sinn über Hochzeitsbräuche statt „woman").
4. **Skelett-Match gegen `vocab_lookup`** (`length>=4`-Filter, 783 Kandidaten): Skelett-Gleichheit allein reicht nicht — jede Zeile einzeln gegen das vorhandene `german`-Gloss auf Plausibilität geprüft, nicht blind übernommen. 585/783 bestätigt, 198 verworfen.

**Häufigstes Fehlerbild bei den verworfenen 198 aus Stufe 4: "false friends" durch Konsonantenskelett-Kollision, semantisch klar erkennbar.** Beispiele: `sekkina`("Messer") kollidiert mit `sekkan`("Einwohner") → Skelett `skn`; `barnamij`-Nachbarwörter kollidieren über `khallas`("bezahlen"/"Kontrolleur") mit `khoulasa`("Zusammenfassung") → mehrfach aufgetreten (IDs 2183, 4238, 4255, 4399); `naqqaz`("springen") mit einem Wort für "Türklingel"; `sallem`("grüßen") mit `sillim`("Leiter"). Auch **Ninja-eigene Mehrdeutigkeit** kam vor, nicht nur Skelett-Zufall: `mabsut` kann "zufrieden" oder "wohlhabend" heißen, Ninja listet nur die zweite Bedeutung — für German "zufrieden" verworfen, obwohl dasselbe Wort. Ein Sonderfall waren leere Platzhalter-Werte (`english_key = "-"`) in TUNICO, ebenfalls verworfen statt übernommen.

**Cleanup der übernommenen Werte:** rohe Quellwerte enthalten oft mehrere kommagetrennte Bedeutungsfacetten und HTML-Entities (`&#x27;`) aus dem Scraping — vor dem Schreiben automatisch bereinigt (erste Facette vor dem Komma, Klammer-Anmerkungen entfernt, Entities dekodiert), nicht die rohe Zeichenkette übernommen.

**Lektion:** die ergiebigste Quelle (676 Zeilen über den Audio-Match) war keine der drei ursprünglich geplanten Strategien, sondern fiel erst beim Nachfragen "deckt sich das mit den Audio-verknüpften Vokabeln?" auf — bei jeder Bestands-Backfill-Aufgabe lohnt der Blick auf bereits vorhandene Fremdschlüssel/Verknüpfungen (hier: `ninja_audio_url` verrät indirekt, welche Ninja-Zeile schon einmal bestätigt wurde), bevor man nur die naheliegenden Join-Achsen (Arabisch, Lautschrift) durchprobiert.

Ergebnis: `english`-Abdeckung von 311/3.698 (8%) auf 2.086/3.698 (56%) erhöht. Die verbleibenden ~1.600 Zeilen haben in keiner der drei Quellen einen Audio-, Arabisch-, Deutsch- oder Skelett-Treffer — bräuchten eine echte Übersetzung (Rateaufwand) oder bleiben ohne `english`, mit entsprechend eingeschränktem Quellenabgleich im Trainer.

## Peace-Corps-Arabisch-Rekonstruktion (2026-09-05)

Ausgangsfrage des Nutzers: warum nicht aus Peace Corps' Lautschrift + unseren Regeln das Arabische herleiten? Erste Antwort war zu pessimistisch (Latein→Arabisch sei prinzipiell eine Eins-zu-viele-Zuordnung, nicht automatisierbar) — bei genauerem Hinsehen an den echten Daten stimmte das nur zur Hälfte.

**Entscheidender Fund:** das ORIGINAL `forms_phonetic` (nicht das bereits kleingeschriebene `forms_chatalpha`!) markiert Emphase-Laute systematisch über Groß-/Kleinschreibung: `H`/`h` = ح/ه (682 Fundstellen), `S`/`s` = ص/س (393), `T`/`t` = ط/ت (444) — belegt an eindeutigen Beispielen (`Taqs`=طقس "Klima", `muSra:na`=مصارين "Eingeweide", `iSTa:d`=اصطاد "jagen", beide Emphase-Laute korrekt). Das ist mehr Information, als beim ersten Pessimismus angenommen. Einzige verbleibende Mehrdeutigkeit: ض/ظ/ذ fallen alle auf `dh` zusammen (ث hat mit `th` einen eigenen, eindeutigen Marker). Nebenbefund beim Durchzählen aller Großbuchstaben: `D`/`K`/`A` kommen je nur 1x vor (Fremdwort-Großschreibung wie „Diesel", reines Rauschen), `M` dagegen 33x, alle in einem engen ID-Bereich (~1078–1245) geklumpt — sieht nach einem Transkriptionsfehler in einem Seitenabschnitt aus, nicht nach einem Laut; Funktion behandelt daher jeden Rest-Großbuchstaben außerhalb H/S/T als "nicht rekonstruierbar" statt ihn zu raten.

**Bewusste Architekturentscheidung:** das Ergebnis landet NIE in `arabic_script` selbst (bleibt unabhängige Quelle für den 3-Quellen-Vergleich), sondern in einer eigenen Spalte `arabic_script_reconstructed` + `arabic_script_reconstruction_note`. Grund: würde man es in `arabic_script` schreiben, sähe ein späterer Ninja-Abgleich wie eine zweite unabhängige Bestätigung aus, obwohl es nur unsere eigene Regel wäre, die mit sich selbst übereinstimmt — ein systematischer Regelfehler würde sich so als "doppelt bestätigt" tarnen.

**Implementierung** (`public._pc_reconstruct_arabic()`): Klammer-Anmerkungen wie „(to)"/„(min)" entfernen; Fremdwörter ohne Tunesisch-Arabisch-Schreibkonvention (c, p, o, e, französische Akzentvokale) als „nicht rekonstruierbar" statt zu raten; Gemination (im Original als Buchstabenverdopplung geschrieben, z.B. `shaxxiS`=شخّص) zu einem einzelnen Buchstaben zusammenziehen — unvokalisiertes Arabisch schreibt einen geminierten Konsonanten nur einmal, die Schadda ist ein weggelassenes Diakritikum, kein zweiter Buchstabe; Langvokale `a:`/`i:`/`u:` → ا/ي/و; wortschlussendes kurzes `a` → ة (Femininendung, nicht einfach ein wegfallender Kurzvokal — erster Entwurf ohne diese Regel produzierte z.B. „غلط" statt „غلطة" für `ghalTa`/MISTAKE); wortanlautender Kurzvokal je Wort (nicht nur Stringanfang) → Alif als Vokalträger.

**Validierungs-Stolperstein:** ein roher Ninja-Cross-Match (gleicher `english_key`, exakter `arabic_skeleton`-Vergleich) ergab nur ~40% Übereinstimmung — auf den ersten Blick schlecht. Manuelle Prüfung von 25 Stichproben zeigte aber: fast alle „Abweichungen" waren KEINE Rekonstruktionsfehler, sondern echte lexikalische Unterschiede zwischen den Quellen — Peace Corps (1977, akademisch) bevorzugt klassisch-arabische Wörter (`مطعم`/RESTAURANT, `مخبر`/LABORATORY, `تسجيل`/RECORD), Ninja bevorzugt umgangssprachliche Französisch-Lehnwörter (`رستورون`, `لابوراتوار`, `روجيستر`) für dieselbe englische Bedeutung — beides richtiges Tunesisch, nur unterschiedliches Register, keine Verwechslung. Ein separater Sanity-Check (keine lateinischen Restzeichen im Ergebnis, danach 30 zufällige Stichproben von Hand gegengelesen) bestätigte die eigentliche Formel-Qualität: 27+/30 klar korrekt, 1 korrekt als nicht-rekonstruierbar gefiltert (`SMi:M`, Rest-Großbuchstabe), Rest bekannte/offengelegte Grenzfälle (`nadhdhim`→erwartete dh-Mehrdeutigkeit falsch geraten als ض statt ظ; `mas-u:l`→Bindestrich stand hier für Hamza, nicht für Artikel-Kontraktion, wurde als "ungeprüft" markiert statt stillschweigend falsch übernommen). **Lektion:** ein roher Cross-Source-Match-Prozentsatz kann irreführen, wenn er echte Synonymvielfalt mit Formelfehlern verwechselt — bei niedriger Trefferquote immer erst eine Stichprobe von Hand lesen, bevor man die Formel für schlecht erklärt.

Ergebnis: 4.874/5.004 Zeilen rekonstruiert (446 davon mit Unsicherheits-Hinweis), 130 bewusst nicht (Fremdwörter/Platzhalter/Transkriptionsfehler-Bereich). Aufruf über `vocab_lookup.arabic_reconstructed`/`arabic_reconstruction_note` (nur bei `source='peacecorps'` befüllt).

**Nachtrag — M-Transkriptionsfehler aufgelöst (2026-09-05):** die 33 oben erwähnten `M`-Zeilen (ID-Bereich ~237–1804, Schwerpunkt 1078–1265) wurden einzeln semantisch geprüft, nicht nur gezählt: bei JEDER der 33 Zeilen ergibt `M`→`H` ein korrektes, zum `headword` passendes Wort — `taSMi:M`→`taSHi:H`=تصحيح "Korrektur", `muMa:dhra`→`muHa:dhra`=محاضرة "Konferenz", `timsa:M`→`timsa:H`=تمساح "Krokodil", `Mub liTTila:3`→`Hub liTTila:3`=حب الاطلاع "Neugier", `nMa:s`→`nHa:s`=نحاس "Kupfer", u.a. — keine einzige Gegenprobe ergab ein Wort, das mit `M` als eigenem Laut (statt als verwechseltem `H`) sinnvoll wäre. `forms_phonetic` für alle 33 IDs korrigiert (`M`→`H`), danach `forms_chatalpha`/`forms_skeleton`/`arabic_script_reconstructed`/`peacecorps_candidates.chatalpha` neu berechnet.

**Stolperstein beim Schreiben:** ein erster Versuch verkettete "Phonetik korrigieren" → "Chatalpha aus der korrigierten Phonetik neu berechnen" → "Arabisch neu rekonstruieren" als CTEs (`WITH ... UPDATE ... RETURNING`) in EINER SQL-Anweisung. Ergebnis: `forms_phonetic` wurde korrekt zu `H` korrigiert, aber `forms_chatalpha` blieb auf dem alten `M`→`m`-Stand hängen (z.B. `muHa:dhra` in `forms_phonetic`, aber weiterhin `mumadhra` statt `mu7adhra` in `forms_chatalpha`). Grund: mehrere datenverändernde CTEs in derselben Anweisung teilen sich denselben Snapshot vom Anweisungsbeginn — eine spätere CTE sieht die Schreibungen einer früheren CTE auf dieselbe Tabelle NICHT. Fix: die Schritte als separate, nacheinander ausgeführte Anweisungen laufen lassen, nicht als verkettete CTEs. Gleiche Falle wie bei jedem mehrstufigen Update auf derselben Tabelle — bei "korrigiere X, dann leite Y aus dem korrigierten X ab" in einer Anweisung immer misstrauisch sein und hinterher gegenchecken, nicht nur den Erfolgsstatus der Anweisung.

## Digraph-Gemination — `dhdh` statt `ddh` (2026-09-12, überschreibt 2026-08-07)

Anlass: die Konventionstabelle in SKILL.md war aus dem eigenen Bestand abgeleitet (`dhdh` 9 : `ddh` 2, `thth` 6 : `tth` 2) und damit zu dünn belegt, um die zwei Ausreißer (ids 1648 `7addhar`, 2218 `y7addhar`) zu überschreiben — zumal die auf einer **dokumentierten** Entscheidung vom 2026-08-07 beruhten. Also erst recherchiert, dann entschieden.

**Denkfehler der ersten Zählung:** `tth` als Gegenbeispiel zu `thth` zu werten. Beim Nachlesen der Einzeltreffer — nicht der Zahlen — war **jeder einzelne** ein Morphemgrenzen-`t` vor `th`, keine Gemination: TUNICO `tṯawwib`→`tthawwib`, `tḏ̣āṛif`→`ttharif`, `tḏ̣āḥik`→`ttha7ik`, `mutṯaqqaf`→`mutthaqqaf` (9/9); Ninja `تْذَكِّرْ`→`tthakkir`, `مِتْثَقِّفْ`→`mittha99if`, `تْذُوبِلْ`→`tthouwbil` (17/17); eigener Bestand `نِتْثَاوَب`→`netthaowb` (3042), `تَذْبَح`→`tthba7` (3073) (2/2). Nach Abzug dieser Scheintreffer steht es bei echter ذّ/ظّ-Gemination **40:0 (TUNICO), 34:0 (Ninja), 6:0 (eigener Bestand)**. Lehre: eine Regex-Zählung über Konsonantenfolgen trennt Gemination nicht von Morphemgrenzen — die Treffer einzeln lesen, sonst erfindet man sich Gegenbeispiele.

**Belege für volle Verdopplung, drei unabhängige Quellen:**

- **TUNICO** (DMG-Transliteration → `lemma_chatalpha`, maschinell und damit konsistent): echte Gemination in 14/14 Fällen voll verdoppelt — `ʕaḏḏib`→`3aththib`, `aḏḏin`→`aththin`, `kaḏḏāb`→`kaththab`, `baẓẓaʕ`→`baththa3`, `ḏḏakkiṛ`→`ththakkir`, `ḏḏall`→`ththall`, `ṭuẓẓīna`→`tuththina`, `mīẓẓu`→`miththu`. Dazu `shsh` 35:0, `khkh` 21:0, `ghgh` 2:0.
- **Derja Ninja** (von Tunesiern geschrieben, eigenes Chat-Alphabet): `dhdh` 70 : `ddh` 2, `chch` 2 : `cch` 0.
- **Eigener Bestand**: `dhdh` 9 : `ddh` 2, `shsh` 11 : 0, `khkh` 7 : 0 — die 2 `ddh` sind genau 1648/2218.

**Zwei Argumente unabhängig von der Statistik:**

1. `dh`/`th`/`sh`/`kh`/`gh` stehen für je **einen** Laut. `ddh` liest sich als /d/+/ð/, und diese Folge existiert an Morphemgrenzen wirklich — `ddh` ist also mehrdeutig, nicht nur ungewöhnlich.
2. **Maschineller Selbsttest:** `public._translit_skeleton('7addhar')` = `7ddhr`, `public._arabic_skeleton('حَضَّر')` = `7dhdhr` — die beiden Skelett-Spalten **derselben Zeile** widersprechen sich, Duplikat- und Cross-Source-Abgleich sehen zwei verschiedene Wörter. Mit `7adhdhar` liefern beide `7dhdhr`. Generell: weichen `_translit_skeleton(darija)` und `_arabic_skeleton(arabic_script)` voneinander ab, ist die Transliteration falsch, nicht das Arabische.

**Kein Lerner-Nachteil:** `checkAnswer()` im Node-Harness gegen beide Schreibungen getestet, in beide Richtungen akzeptiert (`7addhar` ↔ `7adhdhar`, `y7addhar` ↔ `y7adhdhar`). Die Umstellung ist reine Datenqualität, kein Eingriff in bereits Gelerntes.

**Ausgeführt 2026-09-12** (ids 1648, 2218). **Dabei nicht vergessen: die `conjugation` mitziehen** — 2218 trug die alte Schreibung in allen vier Präsensformen (`n7addhar`, `t7addhar`, `t7addhar`, `y7addhar`); ohne diese Ersetzung hätte der Verb-Selbstcheck die Zeile unmittelbar nach der Korrektur gemeldet, weil ihr `darija` nicht mehr in der eigenen Tabelle steht. Danach `_translit_skeleton` = `_arabic_skeleton` = `7dhdhr` für beide Zeilen, und der Digraph-Check meldet im ganzen Bestand nur noch die zwei bekannten Präfix-`t`-Zeilen (3042, 3073).

## 3ayshik / y3ayyshik — zwei Schreibungen sind hier richtig (2026-09-12)

17 Zeilen der Höflichkeitsfloskel („danke"/„bitte") trugen fünf verschiedene Schreibungen: `3ayshik`, `3ayshek`, `y3ayshek`, `y3ayshik`, `y3ayyshik`. Naheliegend, aber falsch wäre gewesen, alles auf **eine** Form zu ziehen. Ninja führt zwei **getrennte Lemmata**:

- عَيْشِكْ `3aychik` = „thanks" und عَيْشُو `3aychouw` = „thanks" — beide **ohne** Schadda, zweimal unabhängig so geschrieben.
- عَيِّشْ `3ayyich` = „may you live" — **mit** Schadda. TUNICO hat dazu das Verb `ʕayyiš` → `3ayyish` „ein langes Leben geben (Gott)".

Das ist keine Vokalisierungs-Schlamperei, sondern eine lexikografische Unterscheidung: die erstarrte Interjektion ist lautlich reduziert, die volle Verbform يعيّشك („möge Er dir Leben geben") nicht. Entsprechend vereinheitlicht:

| Form | Schreibung | arabic_script | Zeilen |
|---|---|---|---|
| erstarrte Floskel, ohne Präfix | `3ayshik` | عَيْشِك (ohne Schadda) | 851, 2685, 3001, 3002, 3132 |
| volle Verbform, mit y-Präfix | `y3ayyshik` | يْعَيِّشِك (mit Schadda) | 1392, 1425, 1427, 1434, 1435, 1438, 1439, 1440, 1750, 1945, 3701 |

Die Endung ist in **allen** 16 Zeilen `-ik`, nie `-ek`: jedes `arabic_script` hat Kasra unter ك. Das `yy` folgt derselben Regel wie das `dhdh` oben — Schadda wird transliteriert; das Vorbild stand schon in Zeile 1438 direkt daneben (`rabbi yfadhdhlik` aus يْفَضِّلك).

**Nebenbefund, nicht angefasst:** die Klammer-Hinweise `(a...)`/`(y...)`/`(b...)` in den `german`-Feldern von 1391 `aman` / 1392 `y3ayyshik` / 1393 `brabbi` sind **kein Import-Müll**, sondern die bewusste Unterscheidung dreier Synonyme für „bitte" — nicht entfernen. Der `(b...)`-Rest im `arabic_script` von 1392 (`يْعَيِّشِك (b...)`, samt `arabic_skeleton` `3shk(b)`) war dagegen echter Copy-Paste-Müll aus 1393 und wurde entfernt. Offen: 1113 `billehi` heißt ebenfalls „bitte", hat aber keinen Hinweis-Zusatz.

## Skill-Test an 10 fälligen Vokabeln (2026-09-13)

Der umgebaute Skill wurde end-to-end an 10 übermorgen fälligen Vokabeln durchgespielt, um die Frage „wird wirklich alles geprüft?" zu beantworten. **Nein** — der Test legte drei Lücken offen, alle inzwischen geschlossen.

**Was trug:** Gruppe A lief komplett sauber (7 Checks, 0 Treffer). Die Pflicht-Sammelabfrage in Schritt 1 (damals noch auf `vocabulary_review`, die Tabelle gibt es seit dem 2026-09-13 nicht mehr) zahlte sich sofort aus: 4 der 10 Zeilen hatten offene Review-Einträge mit `change_category IS NULL` (im Tab unsichtbare Altlasten), eine (`710`) sogar `partner_status='pending'` — ein Konflikt nach Regel 5, den man ohne diesen Schritt beim Schreiben überfahren hätte.

**Lücke 1 — die Auswahl „fällige" hatte kein SQL.** Die Tabelle in Schritt 1 sagte nur „über `progress.next_review`". Jede andere Auswahl dort ist direkt hinschreibbar; diese verlangt zu wissen, dass das Fenster bei 03:00 Berlin beginnt (`nextReviewDE()`), nicht um Mitternacht. Ergänzt.

**Lücke 2 — der Skelett-Vergleich hat einen systematischen Artikel-Fehlalarm.** In der Stichprobe waren **beide** Treffer davon: `el-manshir` → `lmnshr` gegen المنشير → `mnshr`; `f-ed-dar` → `fddr` gegen في الدار → `fldr`. Die beiden Formeln behandeln den Artikel unterschiedlich. Bestandsweit gemessen: von 646 Zeilen mit uneinigen Skeletten tragen **190 (29 %)** einen Artikel. Dokumentiert.

Dabei fiel eine zweite Blindheit derselben Formeln auf: sie streichen ا/و/ي, ein fehlender Langvokal im `arabic_script` ist für sie unsichtbar (`سكاكن` und `سكاكين` ergeben beide `skkn`). Ebenfalls dokumentiert.

**Lücke 3 — Schritt 3 war als „externe Bestätigung" beschrieben, nicht als das, was er ist.** Die internen Checks vergleichen `darija` gegen `arabic_script`; sie können prinzipbedingt nicht sehen, ob die **Bedeutung** stimmt. Der Test lieferte den Beleg: `710 el-manshir` ist als „Korridor / Flur" glossiert, TUNICO hat `manšiṛ` = „Platz zum Wäscheaufhängen, Hof im Küchenflügel". Jeder A- und B-Check meldet die Zeile sauber — und der Lernverlauf zeigt 4 richtige gegen **15 falsche** Antworten. Schritt 3 trägt jetzt den ausdrücklichen Hinweis „nicht überspringen, auch wenn Schritt 2 sauber war".

**Ein Verdacht von mir war unbegründet**, und das gehört zum Ergebnis: Bei `586 skekin` سكاكن hielt ich das Arabische für unvollständig (erwartet سكاكين). Gegenprobe: TUNICO führt den Plural als `skākin`, Peace Corps als `ska:kin` — das lange ā ist ein Alif, kein Ya. **Das Arabische ist korrekt.** Ohne die Quellenprüfung hätte ich eine richtige Zeile „korrigiert" — dieselbe Falle wie bei `bnin` und `skhan`.

**Auflösung von `710 el-manshir` (2026-09-13):** Alle drei Quellen gegengeprüft. **Nur TUNICO kennt das Wort überhaupt** (id 6879, `manšiṛ`, senses nur `de`, kein `en` — deshalb auch keine `english`-Achse für den Join). Ninja hat kein منشير und nennt für Korridor/Flur `koulwar` كُلْوَارْ, `mamar` مَمَرْ, `mamchaa` مَمْشَى, `bahouw` بَهُوْ; Peace Corps hat kein منشير, HALL = `mza:z`, PASSAGE = `maqTa3`. Es war also kein Quellenkonflikt, sondern eine Quelle gegen den Gloss und keine dafür.

Zwei unabhängige Stützen kamen dazu: **die Wurzel** ن-ش-ر „ausbreiten/aufhängen" ergibt ein Nomen loci „Ort zum Aufhängen" — dieselbe Wortbildung wie `2910 manshfa` مَنْشَفَة „Handtuch"; von dieser Wurzel führt kein Weg zu „Korridor". Und **der Lektionskontext**: L20 (ids 702–718) ist eine Hausteile-Lektion, 710 steht direkt zwischen `el-kouwjiyna` (Küche) / `bit er-ra7a` (Bad) und `ed-drouwj` (Treppe) / `wist ed-dar` (Innenhof) — genau die Position, an die TUNICOs „Hof im Küchenflügel" gehört.

Nach Nils' Freigabe umgestellt auf „der Hof zum Wäscheaufhängen (im Haus)", `topic` „(L20)" → „Wohnen", Herkunft in `internal_note`. `partner_status` bleibt `pending`: die Zeile war von Semia **nie** bestätigt — das war rückblickend das stärkste Signal und stand die ganze Zeit in der Zeile.

**Nebenbefund, nicht angefasst:** `3710` übersetzt `fi el qe3a` (في القاعة) mit „im Flur". قاعة ist Saal/großer Raum; Ninja führt `9a3a` als „hall". Kandidat für eine spätere Runde.

## Was rechnet sonst noch mit diesem Feld? (2026-09-13)

Vor einer Massenänderung (ق→ڨ in 20 Zeilen) habe ich geprüft, was sich am `arabic_skeleton` ändert — und dabei gesehen, dass `_arabic_skeleton()` die maghrebinisch/persischen Buchstaben **گ ڨ ڤ پ** gar nicht kannte und roh stehen ließ: `بَڨْرَة` ergab `bڨr` statt `bgr`. **Betroffen waren nicht 20, sondern 699 Zeilen** — 76 im Bestand, 623 bei Ninja (3,6 % der größten Quelle), alle für jeden Skelett-Abgleich unsichtbar, seit dem ersten Import. Die Umstellung hätte den Fehler auf 20 weitere ausgedehnt, ausgerechnet bei Wörtern, die man danach in den Quellen sucht.

Repariert, beide gespeicherten Skelettspalten neu berechnet, erst dann umgestellt. Heute durch den Wächter `unbekannte_arabische_zeichen` abgesichert.

**Lehre:** vor einer Massenänderung an einem Feld nicht nur fragen „ist der neue Wert richtig?", sondern **„was rechnet sonst noch mit diesem Feld?"**. Hier hingen zwei gespeicherte Skelettspalten und der komplette Cross-Source-Abgleich daran. Die Prüfung kostete eine Abfrage.

## Der Duplikat-Check nach einer Vokalisierungs-Kampagne (2026-09-13)

Nach rund 200 Schreibvorgängen an einem Tag, davon 96 im `arabic_script` und zwei komplett neu berechneten Skelettspalten, habe ich einen Verifikationslauf gemacht. **Alle Wächter sauber** — aber der Duplikat-Check hatte eine neue Kollision, **die ich selbst erzeugt hatte**: die Vokalisierung von `2142 brik` (بريك → بْرِيكْ) ließ es mit `385 brika` zusammenfallen.

Die Prüfung ergab keine Dublette, sondern ein **falsch benanntes Wort**. Ninja: `مَلْسُوقَةْ malsouqa` = „wrappers for brik". TUNICO: `malsuqa` = „Brik-Teigblatt, Blätterteig", `brik` = „Brik". Also trug `2142` den **richtigen deutschen Gloss an der falschen Vokabel**, und `malsouqa` fehlte im Bestand komplett. Korrigiert, inklusive Audio-Umzug — die alte Aufnahme sprach `brik`.

**Regel:** eine Vokalisierungs-Kampagne ändert `arabic_script` und damit die Dubletten-Lage. **Der Duplikat-Check gehört direkt danach gelaufen**, nicht irgendwann. Von 13 Kollisionsgruppen waren 12 längst als `homonym_ok` entschieden — die eine neue hätte man ohne den Lauf erst beim Lernen bemerkt.

### Drei Funktionsfehler, die dabei auffielen

`385 brika` deckte einen **blinden Fleck des Verfahrens** auf: der Skelettvergleich streicht Vokale, also sind `brika` und `brik` für ihn identisch. Ein auslautender Vokal ist unsichtbar. Eigener Check gebaut, 31 Treffer.

Beim Lesen dieser 31 stellten sich zwei Klassen als **Fehler meiner eigenen Ableitungsfunktion** heraus:
1. **Wortfinales و** wurde als Konsonant `w` gelesen statt als Suffixvokal `ou` — نِحِلّو ergab `ni7illw` statt `ni7illou`. Betraf das ganze Präsens-Plural-Paradigma.
2. **Alif al-wiqaya**, das stumme ا nach wortfinalem و (إِقْرَوْا „lest!"), wurde als `a` ausgegeben.

Beim Reparieren von (1) griff die erste Fassung zu weit: sie machte auch aus إِقْرَوْا ein `aiqraou`. **Unterscheidung:** wortfinales و nach einem **Konsonanten** ist das Suffix `-ou`, nach einem **Vokal** der Halbvokal des Diphthongs (`-aw`, `-iw`). Danach 16 von 16 Testfällen. Ein dritter Nachzieher: bei رَاهُوْ trägt das و ein Sukun, und der Damma-Zweig verlangte „keine Diakritika".

**Lehre:** wenn eine Verdachtsliste eine erkennbare Systematik zeigt, ist die erste Frage nicht „welche Zeilen korrigiere ich?", sondern **„ist das ein Datenmuster oder ein Werkzeugfehler?"**. Hier waren 4 der 31 ein Werkzeugfehler — und hätte ich sie als Daten korrigiert, wären 4 richtige Zeilen kaputtgegangen und der Fehler geblieben.

## Bedeutungs-Screen: Mechanik richtig, Menge falsch (2026-09-13)

Gebaut, gemessen, **als Massenwerkzeug verworfen** — und das ist das Ergebnis, nicht das Scheitern. Der Abnahmetest bestätigt, dass die Mechanik stimmt: `710` joint korrekt, der alte Gloss „der Korridor / der Flur" wird gemeldet, der korrigierte nicht. Trotzdem ist die Liste unbrauchbar: **~93 % Fehlalarm**, an 30 gelesenen Zeilen etwa 2 echte Funde.

**Warum das nicht zu reparieren ist:** ~40 % der Treffer sind Synonymie („Geldschein" ←→ „Banknote"), ~43 % echte Homonymie (`7ayya` „lebendig" ←→ „Schlange" — حية heißt beides). Kein Stringverfahren löst Synonymie, und die echten Funde sehen aus wie die Homonyme. Es gibt kein trennendes Signal.

**Drei Iterationen bis zum brauchbaren Vergleich**, jede an einem anderen Phänomen gescheitert:
1. Präfixvergleich (4 Zeichen) + Längenschwelle ≥ 4 → meldete **exakte Treffer als Verdacht**, weil „wie", „wo", „ich", „neu" durch die Längenschwelle fielen. `474 kifesh` „wie?" gegen „wie?" stand in der Verdachtsliste.
2. Reiner Teilstring → scheiterte an Flexion: „wäscht" und „waschen" teilen keinen Teilstring.
3. Beides plus Gleichheit für kurze Wörter → 14 von 14 Testfällen korrekt.

**Die Lehre über den Screen hinaus:** ein Abnahmetest an konstruierten Fällen beweist, dass das Werkzeug *funktioniert* — nicht, dass es *nützt*. Beides braucht eine eigene Messung. Hier war die Mechanik nach drei Runden einwandfrei und das Ergebnis trotzdem wertlos, weil die Grundgesamtheit zu 93 % aus Fällen besteht, die das Werkzeug prinzipbedingt nicht trennen kann. **Die Fehlalarmquote an echten Daten zu messen, bevor man eine Liste vorlegt, ist der Schritt, der hier alles entschieden hat.**

**Was bleibt:** der Join-Schlüssel (`chatalpha` beidseitig auf `u` normalisiert) findet **861 TUNICO-Treffer statt 597 per Skelett** und gilt für jedes Nachschlagen. Und `_de_trifft()` ist als Vergleich für die *einzelne* Vokabel in Schritt 3 richtig — nur nicht für 3.780 auf einmal.

## Sonderbuchstaben kehren in neuen Wörtern wieder — Aufzählen reicht nicht (2026-09-13)

Nils' Einwand nach der ڨ-Reparatur: *„Das andere g und die anderen Buchstaben können in neuen Worten wieder auftreten."* Richtig — und die Antwort war ausdrücklich **nicht**, ڨ in eine Liste einzutragen, sondern die Prüfrichtung umzudrehen.

**ڤ (v) und ڨ (g) sehen sich zum Verwechseln ähnlich** (ف bzw. ق mit drei Punkten). Vier der sechs Funde der Inventur gingen darauf zurück — darunter `1891`, das „Kuh" mit ڤ schrieb und deshalb durch den ق→ڨ-Durchgang gerutscht war, und `2966`/`2967`, wo dasselbe Wort einmal mit `p` und einmal mit `b` im Bestand stand. **Beim Schreiben arabischer Sonderbuchstaben immer den Codepoint prüfen, nicht das Schriftbild.**

**Dauerhaft abgesichert** durch die Sicht `unbekannte_arabische_zeichen`, Trainer-Regel 23 und den Skelett-Wächter — alle drei in `qualitaets_checks`. Die Fundliste selbst ist damit Archiv; der Fehler kann so nicht mehr unbemerkt entstehen.

**Zwei eigene Fehler derselben Sitzung, beide weiterhin möglich:**
- `coalesce(f.neu_d, v.darija)` hat bei einer mehrwortigen Zeile **den ganzen Satz durch das Einzelwort ersetzt**. Das `RETURNING` zeigte es sofort. **Bei mehrwortigen Zeilen nie das ganze Feld setzen, sondern das Wort ersetzen.**
- Den Extraktor erneut mit `indexOf('\n];')` verankert und damit das Ende von `CONSONANT_PAIRS` erwischt statt das von `TRANSLIT_RULES` — **exakt die Falle, die weiter unten in diesem Dokument schon zweimal steht.** Eine dokumentierte Falle schützt nicht, wenn man den Anker beim Schnelltest neu schreibt, statt den vorhandenen zu benutzen.

## chatalpha für Ninja — die Quell-Regeln vorberechnen statt anwenden (2026-09-13)

Nils' Anstoß, und die Begründung war die richtige: *„Wäre gut wenn nicht die Regeln der Quellen jedes Mal ausgewertet werden müssten. Das ist fehleranfällig da das manchmal vergessen wird."* Dazu seine zweite Frage: *„Macht die View vocab_lookup nicht so was Ähnliches?"* — **Ja, genau das.** `vocab_lookup.chatalpha` war für TUNICO (94 %) und Peace Corps (98 %) gefüllt und für Ninja **0 von 17.335**. Kein neues Konzept nötig, nur ein Loch — ausgerechnet bei der größten Quelle und der einzigen mit verlässlich vokalisiertem Arabisch.

**Aus `arabic_script` abgeleitet, nicht aus Ninjas `darija`.** Ninja kennt kein `e` und kein freistehendes `o`, `ouw` ist mehrdeutig — aus der Lautschrift wäre es unzuverlässig. Aus dem vokalisierten Arabisch kommen Konsonanten und Gemination exakt heraus. 16.577 von 17.335 Zeilen (95,6 %) sind vokalisiert.

**Zwei Fehler beim Bauen, beide lehrreich:**
1. **Endlosschleife.** `position('' IN x)` liefert in Postgres **1, nicht 0** — die Diakritika-Sammelschleife hängte am Wortende leere Strings an, `length(diac)` wuchs nie. Am Wortende hart gegen `length(w)` prüfen, nicht auf das Ergebnis von `substr()` vertrauen.
2. **Artikelassimilation doppelt.** `الشَّمْس` wurde zu `esh-shshams`. Die Assimilation **ist** die Schadda auf dem Sonnenbuchstaben — verdoppelt die Hauptschleife sie nochmal, steht sie zweimal da. Einmaliges `skip_shadda` nach dem Artikel.

**Abnahme in zwei Stufen, wie der Skill es verlangt:**
- 20 konstruierte Wörter: 18/20 Skelette korrekt beim ersten Lauf, die zwei Fehler waren genau die obigen.
- Gegen echte Daten — alle Zeilen, wo unser `arabic_script` mit Ninjas identisch ist: **562 Paare, 93,6 %.** Ohne Lehnwörter (`darija` enthält `c`/`v`/`x`/`p` oder ist als frz./engl. markiert): **534 Paare, 96,4 %.** Die 19 Reste waren keine Funktionsfehler, sondern Funde.

**Der eigentliche Gewinn war unerwartet.** Die Funktion braucht Ninja gar nicht — sie läuft genauso auf **unserem eigenen** `arabic_script`. Damit entsteht ein Check über den ganzen Bestand, der Zeichen für Zeichen vergleicht statt auf Vorkommen oder Anzahl zu prüfen. **Er fängt eine Klasse, die alle damaligen Trainer-Regeln durchlassen (heute Regel 23, die genau das abfängt):** `bathriq` für بطريق *enthält* ein `t` — es steckt im `th`. Auch der Anzahl-Gegencheck aus Regel 22 läuft daran vorbei.

**Und er braucht zwei Pflichtfilter, sonst ist er wertlos:** nur Einzelwörter, nur vollständig vokalisiertes Arabisch. Ohne sie: 224 Treffer statt 44, weil bei Sätzen das Arabische meist nur teilweise vokalisiert ist und ein unmarkiertes ي/و als Konsonant gelesen wird (`bir-ra7a` → `balra7a`). Mit ihnen: **1.179 geprüft, 44 Treffer (3,7 %), davon rund 35 echt** — Fehlalarmquote ~20 %, die niedrigste aller Verdachtslisten.

**Lehre:** eine Konvertierungsregel, die im Skill steht, wird bei jedem Nachschlagen neu angewendet und gelegentlich vergessen. Dieselbe Regel als Spalte ist immer angewendet — **und wird dabei zum Prüfwerkzeug**, weil man sie plötzlich gegen den eigenen Bestand laufen lassen kann. Das war der Zweck nicht, ist aber der größere Teil des Nutzens.

## vocabulary_review abgeschafft (2026-09-13)

Nils' Entscheidung, nach zweimaligem Nachhaken („Ist die Tabelle überhaupt so sinnvoll? Wenn sie so oft Probleme auslöst?"). Seine Begründung traf den Kern: **„Ein Sinn war ja auch die letzten Abfragen zu dokumentieren. […] Ging darum die Abfragen bei Ninja nicht immer online machen zu müssen."** Mit 17.335 Ninja-Zeilen, 7.543 TUNICO- und 5.070 Peace-Corps-Zeilen offline ist genau dieser Zweck weg.

**Die Bilanz, die zur Entscheidung führte** (3.181 Zeilen, 28 Kategorien, 23 Spalten):

| | |
|---|---|
| Entscheidungen von Nils darin | **61** (32 ✅, 29 👍) |
| Freitext-Rückmeldungen | **1** |
| offene Vorschläge zum Zeitpunkt der Abschaffung | **0** |
| Backup-Zeilen vom 25.07., die wie Vorschläge aussahen | 1.533 |
| Zeilen in Kategorien, die niemand las | 1.587 |

**Derselbe Kanal existierte doppelt.** Direkt auf `vocabulary` (`partner_status`/`partner_comment`, Semias Prüfmodus): **326** Entscheidungen. Über `vocabulary_review`: 61. Ich hatte zuvor argumentiert, die Tabelle müsse bleiben, weil der 💬-Rückkanal ersatzlos sei — **das war falsch**, er existierte zweimal und war in beiden Varianten praktisch ungenutzt (1 bzw. 0 Einträge). Erst das Nachmessen hat es gezeigt; das Argument stammte aus meiner Erinnerung an den Skill, nicht aus den Daten.

**Auch die Backup-Rolle war schon redundant.** Beim Auflisten der Tabellen kamen `vocabulary_backup_2026_07_25` (3.193 Zeilen) und `vocabulary_backup_2026_08_02` (3.274 Zeilen) zum Vorschein — die echte Sicherung desselben Tages war sogar vollständiger als die 1.533 Zeilen in der Review-Tabelle.

**Drei Konstruktionsfehler, die die Fehlerbilder erzeugten:**
1. **`UNIQUE(vocabulary_id)` vermischte „offener Vorschlag" mit „Entscheidungsprotokoll".** Eine Zeile pro Vokabel für immer heißt: jeder neue Vorschlag überschreibt die vorige Entscheidung. Der Skill verließ sich darauf, dass `ninja_check_ignoriert` „schlag das nie wieder vor" bedeutet — dieser Wert kam in 3.181 Zeilen **null Mal** vor. Die Schutzfunktion war nie getestet.
2. **Die Tabelle war eine Vollkopie der Vokabelzeile.** Ein Vorschlag wurde als komplettes Duplikat ausgedrückt — deshalb war ein Backup von einem Vorschlag nicht unterscheidbar, und deshalb las ich `710` im Skill-Test als Konflikt.
3. **28 Kategorien, die App kannte 7.** Die übrigen 21 waren Etiketten, die frühere Sitzungen erfunden hatten. Reiner Rückstand.

**Ablauf (alles gezeigt und einzeln freigegeben):** Backup von neun Tabellen nach `exports/backup_2026-09-13/` (Zeilenzahlen gegen die DB abgeglichen, alle acht live gezogenen stimmten exakt) → die 61 echten Begründungen nach `vocabulary.internal_note` übernommen → 202 Zeilen aus `trainer.html` entfernt (Nav-Button, Dispatch, Dashboard-Kachel, Löschpfad, Zustandsvariable, fünf Funktionen, `goToCheck`-Zweig; `node vm.Script()` sauber) → `DROP TABLE` ohne CASCADE → Skill nachgezogen.

**Lehre über die Tabelle hinaus:** eine Struktur, die drei Jobs gleichzeitig macht (Warteschlange, Protokoll, Backup) und deren Constraint nur zu einem davon passt, produziert Fehlalarme, die wie Datenfehler aussehen. Der Fehler war nicht der Inhalt, sondern dass drei Bedeutungen im selben Feld unterscheidbar sein mussten und es nicht waren. **Vor „warum ist dieser Datensatz falsch?" die Frage stellen: wofür ist diese Tabelle eigentlich gebaut, und wird sie noch so benutzt?**

**Warnung, die dabei auffiel:** der Löschschutz `trg_prevent_mass_delete` (max. 10 Zeilen pro Statement) prüft `current_user NOT IN ('anon','authenticated') → RETURN NULL`. Die MCP-Verbindung läuft als `postgres` — **der Schutz greift bei Claude nicht.** Massenoperationen hängen allein an der Vorlage-vor-Schreiben-Regel.

## Quell-Konventionen waren an sechs Stellen verstreut (2026-09-13)

Auslöser war Nils' Frage „die Translit-Regeln von den drei Quellen hast du oder?". Antwort: ja, benutzt wurden sie die ganze Session — aber sie standen in SKILL.md an vier und in IMPORTS.md an zwei Stellen, keine davon vollständig, und **nirgends stand, welche Abweichung kein Befund ist**. Genau dieselbe Auffindbarkeits-Lücke wie vorher beim Prüfprozess. Konsolidiert zu einer Tabelle: SKILL.md → Quell-Konventionen.

Beim Nachmessen kamen drei Dinge heraus, die vorher nirgends dokumentiert waren und beide Richtungen von Fehlalarm erzeugen:

1. **Keine der drei Quellen schreibt je ein `e`.** Ninja: 0 von 17.335 Zeilen, und `o` ausschließlich als Teil von `ou`. TUNICO `lemma_chatalpha`: `e` 27×, `o` 46× von 7.008. Peace Corps `forms_phonetic`: `e` 101×, `o` 21× von 8.714. Unser Bestand: `e` in 32 %, `o` in 23 % der Zeilen. Eine Vokalabweichung gegen eine Quelle ist damit **strukturell erwartbar und nie für sich genommen ein Befund** — das ist Lautlehre-Regel 1 (Imala), aber erstmals quantifiziert. Das externe Prüfprotokoll hatte exakt hier danebengegriffen (`487 wsil` → `wsel`/`wsal`).

2. **Peace Corps schreibt ظ/ذ ausnahmslos `dh`, Ninja in 38 % der Fälle.** Gemessen an Zeilen, deren `arabic_script` den Buchstaben enthält: ض → Ninja `dh` 712:11, PC `dh` 29:0. ظ/ذ → Ninja `th` 327 : `dh` 191, PC `dh` 20:0, TUNICO `th` 528:1. ث → überall `th`. Heißt: **ein `dh` von Ninja oder Peace Corps ist kein Gegenbeleg gegen unsere ausnahmslose ظ/ذ→`th`-Regel**, nur TUNICO kann sie bestätigen oder widerlegen. Ohne diese Zahl sieht jede der 20 PC-Zeilen wie ein Befund aus.

3. **Peace Corps schreibt خ als `x`, nicht `kh`** (659 von 8.714 `forms_phonetic`-Formen; `kh` kommt 2× vor). Stand nirgends — dokumentiert war nur die Großschreibung H/S/T für die Emphatika.

Nebenbefund, in IMPORTS.md korrigiert: die dortige Ninja-Suchtabelle behauptete `th | ث oder ذ | th | gleich`. Für ذ/ظ stimmt das nur in 64 % der Fälle.

**Lehre:** eine Konventionstabelle, die nur die Zuordnung zeigt, reicht nicht. Sie muss dazusagen, **welche Abweichung erwartbar ist** — sonst produziert jeder gewissenhafte Prüflauf genau an den Stellen Befunde, an denen die Quelle einfach ein anderes Alphabet benutzt.

## Checks nach Verbindlichkeit sortiert, nicht nach Thema (2026-09-13)

Der Check-Abschnitt war rein chronologisch gewachsen: neue Prüfung unten anhängen. Für den Leser stand damit nirgends, **was ein Treffer bedeutet** — die einzige Frage, die er am Treffer wirklich hat. Neu in drei Gruppen: **A** muss auf 0 stehen (Treffer = Fehler), **B** Verdachtsliste mit gemessener Fehlalarmquote (nie im Block korrigieren), **C** Regeln fürs Prüfen selbst.

**Ein Fehler beim Umbau, der die Methode bestätigt:** die erste Klassifikation matchte Schlüsselwörter gegen die **ganze erste Zeile** eines Blocks — dadurch rutschte ein Methodik-Block in Gruppe A, nur weil das Wort „Verb-Selbstcheck" mitten im Absatz vorkam. Aufgefallen, weil ich die Zuordnung vor dem Schreiben ausgegeben habe. **Bei programmatischen Umbauten die Zuordnung zeigen, bevor sie wirkt.**

**Lehre:** Die Gliederung eines Regelwerks sollte der Frage folgen, die der Leser am Treffer hat — nicht der Reihenfolge, in der die Regeln entstanden sind.

## Mit dem Infinitiv gesucht — die Spiegelseite einer bekannten Regel (2026-09-13)

Im Test „10 neue deutsche Wörter" meldete ich „husten" als **nicht im Trainer vorhanden**. Nils: *„Er hustet gibt es schon."* — `3059 yku77` = „er hustet", seit langem da.

Der Skill kennt die Regel, aber nur für eine Richtung: *„Präsens-Verben: deutsches Gloss immer als 3. Person Singular, NIE als Infinitiv — der Infinitiv versteckt Duplikate vor dem Duplikat-Check."* Das steht dort als Regel fürs **Schreiben**. Beim **Suchen** habe ich genau denselben Fehler gemacht: `german ~* 'husten'` findet „er hustet" nicht, weil der Substring dort nicht vorkommt. In einem echten Anlegevorgang wäre daraus eine Dublette geworden — die Regel, die das verhindern soll, hätte danebengestanden.

**Der Gegenversuch ging sofort zu weit ins andere Extrem:** mit dem nackten Stamm `neid` kamen 8 Treffer, 7 davon „schneidet", „Schneider", „Schneidebrett". Richtig ist der Stamm **mit Wortgrenze**: `\yneid` trifft genau eine Zeile — und dabei fiel auf, dass auch mein erster Durchgang bei „neidisch" unvollständig war (`3772 ghira` = „Eifersucht / Neid" hatte ich übersehen). **Zwei falsche Testergebnisse aus einem einzigen Suchmuster-Fehler.**

**Lehre:** Eine Regel über das Format eines Feldes ist immer auch eine Regel über die Suche in diesem Feld. Wer weiß, dass die Spalte „er hustet" enthält, darf nicht „husten" suchen. Und ein Suchergebnis „— nichts —" ist keine Auskunft über den Bestand, sondern über das Muster: bevor „gibt es nicht" gesagt wird, muss das Muster an einer Zeile getestet werden, von der man weiß, dass sie existiert.

## Ein Tippfehler in der Klammerung, 64 % des Bestands (2026-09-13)

Der Bedeutungsschlüssel für die Dubletten- und Homonym-Checks lautete:

```sql
lower(regexp_replace(german,'[^a-zäöüß]','','g'))   -- falsch
regexp_replace(lower(german),'[^a-zäöüß]','','g')   -- richtig
```

Das `regexp_replace` lief **vor** dem `lower()`. Großbuchstaben stehen nicht in `[a-zäöüß]` und wurden ersatzlos gelöscht: „Ja" → `a`, „Haus" → `aus`, „Maus" → ebenfalls `aus`. Gemessen: **2.420 von 3.775 Zeilen betroffen, 64 %** — praktisch jedes deutsche Substantiv. Der Schlüssel steckte in zwei Checks gleichzeitig.

**Aufgefallen ist es an einem Einzelfall, nicht an der Zahl.** Check 30 meldete `1389 iy` „Ja" und `4448 n3am` „ja" als partnerlos, obwohl sie offensichtlich dieselbe Bedeutung haben. Die Gesamtzahl (7) sah dagegen plausibel aus und hätte nie Verdacht erregt.

**Lehre:** Reihenfolge bei Normalisierungen ist keine Geschmacksfrage. `lower()` gehört **vor** jede Zeichenklassen-Filterung, sonst löscht der Filter genau die Zeichen, die `lower()` gerettet hätte. Und: eine Prüfliste wird nicht dadurch verlässlich, dass ihre Länge plausibel aussieht — die Stichprobe am Einzelfall findet, was die Zahl verbirgt.

## Die Morphologie ist auch eine Quelle (2026-09-13)

Bei `576 eqif` „Halte an!" stand im `arabic_script` قف. Ich stufte das als defekt ein — „unvokalisiert und **ohne و**, zeigt die Wurzel nicht einmal vollständig" — und legte den Fall mit der Begründung vor, **keine** der drei Quellen gebe den Imperativ her. Nils: *„Ist das nicht gleich Standardarabisch? Das solltest du leicht rausfinden."*

Er hatte recht. Bei assimilierten Verben (مثال واوي) fällt das و im Imperfekt und Imperativ weg: وَقَفَ → يَقِفُ → **قِفْ**. قف war die richtige Form, nur unvokalisiert. Vokalisiert nach der Bestandskonvention für Imperative (prothetisches Alif wie in `575 imshi` إمشي, `2465 ejri` إِجْرِي): إِقِفْ.

**Der Fehler verdeckte in derselben Runde zwei Befunde.** Erstens das angeblich defekte Arabisch, das richtig war. Zweitens — sobald dieselbe Morphologie auf die Geschwisterzeile angewandt wurde — dass `2600 weqif` وَاقِف gar kein Imperativ ist, sondern das aktive Partizip „stehend", und damit eine Dublette zu `3838 waqif` „stehend". Beide haben denselben `ar_key`; Check 31 meldet sie nicht, weil er gleiche Bedeutung verlangt. **Ein falsches Gloss versteckt eine Dublette vor dem Dublettencheck.**

**Lehre:** Die drei Offline-Quellen sind Wörterbücher — sie führen Lemmata, keine Paradigmen. Wo eine Form aus dem Wurzelmuster folgt (Imperativ, Partizip, Maß-Zugehörigkeit, assimilierte und hohle Wurzeln), ist die Morphologie die zuständige Quelle, und „kein Wörterbuchtreffer" ist keine Begründung zum Zurückstellen. Umgekehrt gilt weiter: über **Bedeutung** entscheidet die Morphologie nichts.

## Der Gegenrichtungs-Durchlauf: eine Frage an jede Regel (2026-09-13)

Drei Skill-Fehler an einem Tag hatten dieselbe Form — eine Regel, die nur in eine Richtung formuliert war (Zeitzone, Regel 23, Infinitiv). Daraus wurde ein einmaliger Durchgang: **an jede Regel die Frage stellen, ob sie eine Gegenrichtung hat, und diese gegen den Bestand messen.**

`TRANSLIT_RULES` 5–16 sind zwölf Regeln derselben Bauart („X im Arabischen, aber kein Y in der Transliteration"), mit Gegenrichtung für genau eine. Die Messung der übrigen elf: 30 Treffer, **8 echte Befunde** — darunter `1491` mit ف statt ق, zwei `inshallah`-Zeilen ohne الله im Arabischen und drei `odhkhol` mit einem `h` zu viel.

**Der wichtigste Fund war kein Datenfehler, sondern ein Regeldefekt.** `4412 tghashshish` / تڨشش müsste Regel 23 auslösen, tat es aber nicht: die Regel testet `!/g/i.test(v.tr)`, ohne vorher `gh` zu entfernen — das `g` in `gh` zählt mit und macht die Regel für genau diesen Fall blind. Ihre erste Bedingung benutzt `replace(/gh/gi,'')` bereits; der Fix war, das auch in der zweiten zu tun. Gemessen: trifft danach genau eine Zeile, keine Fehlalarme. **Die Gegenrichtung einer Regel prüft auch die Regel selbst.**

**Zweiter Fund, methodisch:** die Gegenrichtung ist bei **Einzelzeichen** sauber und bei **Digraphen** wertlos. `3`, `q`, `z`, `j` lieferten zusammen 2 Treffer, beide echt. `dh`, `th`, `sh` lieferten 17, überwiegend Morphemgrenzen (`3and`+`ha`, `mammet`+`hom`, `as`+`hal`) — ein Digraph entsteht zufällig, wo zwei Morpheme zusammenstoßen, ein `3` kann das nicht. Nur die Einzelzeichen sind als Check 27 aufgenommen.

**Dritter Fund, außerhalb der Buchstabenregeln:** die „/ vs. ;"-Regel galt nur für das `german`-Feld. Die `darija` benutzt zusätzlich Klammern, in drei Bedeutungen — und `normalize()` wirft Klammerinhalte weg, bevor `checkAnswer()` vergleicht. Am echten Quiz-Code gemessen: vier Zeilen werteten die von ihnen selbst angebotene Variante als **falsche Antwort**. Auf `/` umgestellt, danach am selben Harness gegengeprüft: alle vier akzeptieren jetzt beide Formen exakt.

**Vierter Fund:** `homonym_ok` ist kein Etikett, sondern ein Ausschalter — Check 10 lautet `HAVING count(*) > 1 AND NOT bool_or(homonym_ok)`, eine einzige markierte Zeile schaltet die Prüfung für die ganze Arabisch-Gruppe ab. 58 Zeilen tragen das Flag, ohne dass es überhaupt eine zweite Zeile mit demselben Arabisch gibt.

**Und eine lehrreiche Nullnummer:** die Gegenrichtung zu Check 5 („`-a` ohne `(f.)`") trifft 567 Zeilen und ist wertlos — die meisten Wörter auf `-a` sind keine Feminina. Nicht jede Regel hat eine sinnvolle Gegenrichtung; die Frage kostet trotzdem nur eine Abfrage.

**Lehre:** Eine Regel, die nur eine Richtung kennt, ist eine halbe Regel — und ihre fehlende Hälfte ist genau der Ort, an dem sich Fehler jahrelang halten. Die Gegenfrage ist billig, findet Datenfehler *und* Regeldefekte, und muss pro Regel nur einmal gestellt werden.

## p/v ist nicht ڨ: warum zwei ähnliche Fälle verschieden entschieden wurden (2026-09-13)

Nach der ڨ-Entscheidung („wird ein Wort mit `g` gesprochen, bleibt die `darija` und das `arabic_script` wird auf ڨ umgestellt") lag die Analogie nahe: 25 Zeilen schreiben `p` gegen ب, 14 schreiben `v` gegen ف — also dasselbe Vorgehen? **Nils hat anders entschieden: so lassen.**

Der Unterschied, der beide Entscheidungen zusammen stimmig macht: bei ڨ ging es um **tunesische** Wörter (`ڨلاص`, `ڨناريّة`), deren arabische Schreibung die Lautung falsch wiedergab — das ist ein Fehler in der Sache. Bei `p`/`v` geht es um **Fremdwörter** (`parking`, `spor`, `villa`, `talvza`), deren arabische Schreibung ohnehin nur eine Annäherung ist; ب und ف sind dort die übliche tunesische Umschrift und nichts, was korrigiert werden müsste.

**Konsequenz für das Werkzeug, nicht nur fürs Protokoll.** Eine Entscheidung „so lassen" ist erst umgesetzt, wenn der Check die betroffenen Zeilen nicht mehr meldet — sonst steht die Liste dauerhaft auf 12 bekannten Treffern und macht die scharfen Befunde daneben unsichtbar. `chatalpha_konflikte` hat dafür die Klasse `lehnwort_pv` bekommen (Skelettvergleich nach `translate(darija,'pv','bf')`), die Zeilen bleiben sichtbar, zählen aber nicht als Befund. Check 25 fiel dadurch von 20 auf 8.

**Lehre:** „Nicht ändern" ist eine Entscheidung mit Arbeit dran. Wer sie nur notiert, lässt den Prüfer weiterbellen — und ein Prüfer, der Bekanntes meldet, wird als Ganzes ignoriert.

## Die Ableitung als Prüfer: was Konsonantenskelette prinzipiell nicht sehen (2026-09-13)

Der Skill-Test hinterließ zwei Notizen: „`qualitaets_checks` lässt sich nicht auf eine Auswahl einschränken, obwohl Schritt 2 genau das verlangt" und „`786 7araam` rutscht durch jeden Check, weil Skelette Vokale wegwerfen". Beide sind beim Nachgehen kleiner geworden, als sie aussahen — die zweite hat dabei eine ganze Fehlerklasse freigelegt.

**Die erste Notiz war ein Denkfehler.** Ein Check, der bestandsweit 0 trifft, trifft auch keine Teilmenge davon. Solange Gruppe A auf 0 steht, ist Schritt 2 für jede Auswahl mit **einer** Abfrage erledigt; die Einschränkung braucht man erst, wenn ein Check überhaupt trifft. Es fehlte kein Werkzeug, es fehlte der Satz.

**Die zweite führte zu `_arabic_to_chatalpha(arabic_script)` gegen `darija`.** Die Funktion war für den Ninja-Abgleich gebaut; als Prüfer des eigenen Bestands eingesetzt, ist sie die einzige Instanz im Projekt, die Vokale und Verdopplungen sieht. Messung über 2.335 vokalisierte Einzelwörter: 1.312 exakt deckungsgleich, ~1.000 Abweichungen nur in Kurzvokalen (keine Aussage — Kurzvokale sind im Bestand nicht normiert), **26 Gemination-Konflikte und 24 Konsonanten-Konflikte**. Darunter fünf Komparative (`akhaff`/أَخَف, `asa77`/أَصَح …), denen im Arabischen schlicht die Schadda fehlt, `talvza` gegen تَلْفْزَة (v ohne ڤ) und `thahhhert` mit drei `h`. Keiner dieser Fälle war für irgendeinen bestehenden Check sichtbar.

**Vor der Messung musste die Funktion repariert werden — und das ist der eigentliche Präzedenzfall.** Der erste Lauf meldete `aakhaf`, `aasa7`, `aaraq`: ein Hamza-Träger am Wortanfang ist nur der Sitz seines Vokals, die Funktion schrieb ihn zusätzlich als `a`. Hätte ich die Trefferliste ohne diesen Blick übernommen, wären fünf Funktionsfehler als Datenfehler in eine Korrekturliste gewandert. Der Fix ist sechs Zeilen; gemessen: 256 Ableitungen ändern sich, 109 davon stimmen danach exakt mit der gespeicherten `darija` überein, **0 Zeilen, die vorher passten, passen danach nicht mehr** — dieser Nullwert ist die eigentliche Abnahme, nicht die 109.

**Lehre:** Wenn ein neuer Check anschlägt, ist der erste Verdächtige der Check. Vor jeder Fundliste die Treffer nach *Ursache* sortieren (Datenfehler / Werkzeuglücke / erlaubte Ausnahme) und die Werkzeuglücken zuerst schließen — sonst misst die Fehlalarmquote das eigene Werkzeug. Erlaubte Ausnahmen (markierte Lehnwörter, `bi/li/ka/fa` + Artikel) gehören dabei in die Sicht selbst, nicht in den Kopf des Prüfenden.

## Zwei Workflows waren einer — zweimal an einem Tag (2026-09-13)

Der Skill führte zwei getrennte Prüf-Workflows, die sich in genau **einem** Punkt unterschieden: dem Schreibpfad. Das Eingeständnis stand im Skill selbst — *„bei Unklarheit, welcher gemeint ist, im Zweifel nachfragen"*. Zusammengelegt zu „Vokabeln prüfen — EIN Prozess"; was wechselt, ist nur die **Auswahl der Zeilen**.

**Dieselbe Lage eine Ebene höher, am selben Tag gefunden.** Der Skill-Test an zwei Aufgaben (19 fällige Vokabeln prüfen / 5 deutsche Wörter anlegen) zeigte, dass auch „Kern-Workflow: neue Vokabel(n) verarbeiten" und „Vokabeln prüfen — EIN Prozess" **ein** Ablauf waren. Sie unterschieden sich in zwei Spalten: woher die Zeilen kommen und ob am Ende `UPDATE` oder `INSERT` steht. Alles dazwischen — Vorwissen lesen, intern prüfen, extern gegen drei Quellen prüfen, zeigen und warten — stand zweimal da, im Anlege-Teil kürzer und ohne die Präzedenzfälle. Zusammengelegt zu „Der Prozess — ein Ablauf, zwei Eingänge".

**Der Beleg, dass es wirklich einer ist:** von den 5 angefragten neuen Wörtern existierten alle 5 bereits. Der Anlege-Eingang endete also fünfmal im Prüf-Eingang. Ein Duplikat ist kein Sonderfall des Anlegens, sondern der Übergang zwischen den Eingängen — im getrennten Aufschrieb war das nirgends sichtbar.

**Lehre:** Wenn zwei Abschnitte dieselben Schritte in anderer Reihenfolge erzählen und am Ende „im Zweifel nachfragen" steht, sind es keine zwei Verfahren — es ist eines, das zweimal aufgeschrieben wurde. Der Test darauf ist billig: beide an derselben Aufgabe durchspielen und die Schritte nebeneinanderlegen.

## Skill-Audit: Regeln prüfen reicht nicht (2026-09-13)

Ein zweiter Durchgang nach der Reparatur der gemeldeten Defekte fand drei Dinge, die der erste übersehen hatte — **alle drei außerhalb der Regeln selbst**: die „Kurzstand"-Tabelle ganz oben war durchgehend veraltet (und damit das Erste, was ein Leser sieht), eine Überschrift trug noch genau das Wort, das einen Prüfbericht in die Irre geführt hatte, und der Schnellzugriff hatte keinen Eintrag für den häufigsten Fall.

**Struktureller Fix statt Zahlenpflege:** harte Zahlen in einer Skill-Datei veralten stumm, weil niemand sie beim Arbeiten mitpflegt. Konsequenz am 2026-09-13: die Tabelle ist ganz entfallen und durch `SELECT * FROM qualitaets_checks` ersetzt.

**Lehre:** Ein Skill-Audit darf nicht bei den Regeln aufhören. Einstiegstabelle, Überschriften und Querverweise steuern den Leser — und veralten unbemerkt, weil sie beim Arbeiten niemand liest.

## Der Skill selbst war die Fehlerquelle (2026-09-13)

Ein Prüfdurchgang aus einer anderen Sitzung meldete „**TRANSLIT_RULES (13 Regeln)** — null Treffer" und listete zusätzlich 26 `topic`-Befunde. Beides war nicht Nachlässigkeit des Prüfers, sondern **direkt aus SKILL.md ableitbar**:

1. Der SQL-Block war überschrieben mit „Transliterations-Check — **konsolidiertes SQL (`TRANSLIT_RULES` in trainer.html)**" und gab sich damit als vollständiger Spiegel der Regeln aus. Tatsächlich deckte er die Konsonanten-Gegenchecks plus Ziffern/Wortanzahl/Artikel ab — rund **14 von 22**. Wer dem Skill folgte, prüfte einen Teil und durfte glauben, alles geprüft zu haben.
2. Unter der Überschrift „Bestandspflege bei Topic ist kein eigenes Ziel" stand als Punkt 1 „**Pflichtfeld** bleibt bestehen" — gemeint für Neuanlagen. Der Prüfbericht machte daraus die Sektion „topic-Pflichtfeld" mit 26 Bestandszeilen, also genau das, was der Absatz darüber verbietet.

**Behoben:** Überschrift sagt jetzt offen, welche Regeln das SQL abdeckt und welche nicht, mit Node-Harness-Aufruf als einzigem vollständigen Lauf; „Pflichtfeld" ist ausdrücklich auf neue Zeilen begrenzt, mit dem Zusatz, dass bestehende Legacy-Topics in keinen Prüfbericht gehören.

**Lehre:** Wenn ein kompetenter Leser den Skill befolgt und trotzdem das Falsche tut, ist der Skill der Defekt. Bei jedem Befund aus einem fremden Lauf zuerst fragen: *konnte die Anweisung so gelesen werden?* — bevor man den Lauf für schlampig hält.

## Harness-Export scheiterte still — Gateway Timeout als Array behandelt (2026-09-13)

Direkt beim Nachprüfen des obigen Falls dieselbe Fehlerklasse im eigenen Werkzeug: der geblätterte REST-Export holt `vocabulary` in vier Seiten à 1000. Zwei Seiten kamen unter Last als `{"message":"Gateway Timeout"}` zurück. `[].concat(obj)` hängt ein Objekt klaglos als **ein** Element an — aus 3.780 Zeilen wurden 1.782, und der Regel-Lauf meldete brav „0 Treffer", nur eben über weniger als der Hälfte des Bestands. Kein Fehler, keine Warnung.

**Fix:** `scratchpad/export.sh` prüft jede Seite auf führendes `[`, wiederholt bis zu viermal mit Backoff und bricht hart ab, wenn die Gesamtzahl nicht der erwarteten entspricht.

**Lehre:** Ein Prüflauf, der „0" meldet, ist erst dann eine Aussage, wenn die Grundgesamtheit verifiziert ist. Bei jedem Harness-Lauf die Zeilenzahl mitloggen und gegen `count(*)` halten — eine Zahl, die niemand ausgibt, kann auch niemand als falsch erkennen.

## scratchpad/extract.js — Anker zum zweiten Mal zu unscharf (2026-09-12)

Das Node-Harness zieht `normalize`/`checkAnswer`/`TRANSLIT_RULES` per Textanker aus `trainer.html`. Nachdem die erste Fassung an fest verdrahteten Zeilennummern zerbrochen war, lief sie über Inhaltsanker — der Endanker war aber schlicht `"\n];"`, also *die erste* Array-Schließung nach `const isLoanword`.

Beim Einbau von Regel 22 kam mit `CONSONANT_PAIRS` ein **zweites** Array zwischen `isLoanword` und `TRANSLIT_RULES`. Damit hätte der Extraktor bei `CONSONANT_PAIRS` gestoppt und `TRANSLIT_RULES` gar nicht mehr exportiert — das Harness wäre mit `ReferenceError` gestorben, oder schlimmer: hätte bei einer nachlässigeren Fassung stumm eine leere Regelliste geprüft und „alles sauber" gemeldet.

Fix: Endanker gezielt auf den Abschluss von `TRANSLIT_RULES` (`indexOf('const TRANSLIT_RULES = [')`, dann das nächste `\n];`), plus harte Fehlermeldung, wenn einer der drei Anker fehlt.

**Lehre:** Ein Inhaltsanker ist nur so gut, wie er eindeutig ist. „Die erste schließende Klammer nach X" ist keine Eigenschaft des Ziels, sondern eine Annahme über alles, was dazwischen liegen könnte. Beim Erweitern der gespiegelten Datei immer prüfen, ob der Extraktor noch dasselbe greift — er scheitert sonst unter Umständen still.

## Regeln prüfen Vorkommen, nicht Anzahl (2026-09-12)

Nach zwei stumm falschen Prüfregeln an einem Tag wurden alle Live-Regeln systematisch auditiert. **Methode:** jede Regel gegen ein konstruiertes Positivbeispiel, das zwingend anschlagen muss. Alle bestanden — der Fund lag woanders.

**Die ergiebige Frage war: schluckt eine Regel über ihre Ausnahmeklausel echte Fälle?** Die Konsonanten-Regeln prüften **Vorkommen statt Anzahl**: `/ح/.test(v.ar) && !/7/.test(v.tr)` schweigt, sobald irgendwo im Feld *ein* `7` steht. Bei Einzelwörtern egal, bei Sätzen ein Loch — ein falsch transliteriertes Wort neben einem richtigen bleibt unsichtbar.

Der daraus gebaute Anzahl-Vergleich über 12 Buchstabenpaare fand im ersten Lauf **11 Treffer, davon 10 echte Fehler** — praktisch keine Fehlalarme. Lebt heute als Regel 22 in `TRANSLIT_RULES`.

**Lehre, die über diesen Fall hinausgeht:** ein Prüf-Tab auf 0 beweist nur, dass die Regeln **in ihrer eigenen Formulierung** zufrieden sind. Zusätzlich fragen: *was genau könnte an dieser Formulierung vorbeilaufen?* Dieselbe Frage fand später den Zeichen-Check (`bathriq` enthält ein `t` — im `th`).

## metrobbi — gleiches Arabisch, gegenteiliger Gloss (2026-09-12)

Beim Abarbeiten des vokalisierungs-unabhängigen Duplikat-Checks fielen `2495 moush mutrubbi` („unerzogen / respektlos") und `2816 moush metrobbi` („nicht toxisch / gut erzogen") als ein Paar mit identischem Arabisch مش متربّي auf — mit **gegenteiliger Bedeutung**. Erste Einordnung war „Widerspruch, eine von beiden ist falsch". Die Quellenprüfung zeigte mehr:

- **Peace Corps:** `POLITE` = `mutrubbi` / `mutrubbya` / `mutrubbin` — متربّي **ohne** Negation heißt „höflich"
- **Derja Ninja:** مَهُوشْ مُتْرُبِّي `mahouwch moutroubbiy` = „impolite" — **mit** Negation heißt es „unhöflich"
- Wurzel: ربّى „aufziehen, erziehen" (Peace Corps `BRING UP (to)` = `rabbi`)

Damit war klar: 2495 ist richtig, **und es gab eine dritte Zeile** — `2815 wled metrobbi` („toxisch / schlecht erzogen"), die der Duplikat-Check gar nicht meldete, weil sie ohne مش steht. Beide Zeilen mit `metrobbi` trugen ihre Bedeutung **gespiegelt**: ولد متربّي heißt „ein wohlerzogener Junge", nicht das Gegenteil.

Vermutete Ursache: das Wort „toxisch" im Gloss. Wer einmal `metrobbi = toxisch` gesetzt hat, leitet `moush metrobbi = nicht toxisch` logisch korrekt ab — nur ist die Ausgangsannahme invertiert. Sieht nach einem Social-Media-Import aus, bei dem die Bedeutung am falschen Pol festgemacht wurde.

**Zwei Lehren:**

1. **Gleiches Arabisch heißt nicht automatisch „Dublette".** Es kann auch heißen, dass eine der Zeilen inhaltlich falsch ist. Jede Gruppe gegen die Quellen prüfen, nicht nur die beiden Zeilen gegeneinander.
2. **Bei einem Bedeutungsfehler die ganze Wortfamilie nachziehen.** Der Check meldete nur das negierte Paar; die bejahte Form mit demselben Fehler stand daneben und wäre stehen geblieben. Gleiche Lehre wie bei den unvokalisierten Verbgeschwistern.

## Verwaiste ids in course_lessons.vocab_lesson_refs (gefunden 2026-09-12)

Bei der Referenz-Kontrolle nach einer Merge-Runde: **11 ids in `vocab_lesson_refs` zeigen auf nicht mehr existierende Vokabelzeilen** (1470, 3672, 3725, 3778, 3814, 3942, 4020, 4313, 4450, 4451, 4452 in den Kurslektionen 2, 3, 5, 6, 7, 8, 9). Keine davon stammt aus den Merges dieser Sitzung — Altbestand.

`parseCourseVocabRefs()` (trainer.html) baut daraus nur ein `Set` von ids; ein unbekanntes id matcht schlicht keine Zeile und wird **stillschweigend übersprungen**. Kein Absturz, aber die betroffene Lektion hat einen toten Vokabel-Slot: sie zeigt ein Wort weniger, als der Kurs vorsieht, und nichts weist darauf hin.

**Deshalb nach jeder Merge-Runde gegenprüfen:**
```sql
WITH r AS (SELECT cl.id AS lektion,
  unnest(string_to_array(split_part(replace(cl.vocab_lesson_refs,'ids:',''),'|',1), ','))::int AS vid
  FROM course_lessons cl WHERE cl.vocab_lesson_refs LIKE 'ids:%')
SELECT r.vid, string_agg(DISTINCT r.lektion::text, ',') AS lektionen FROM r
WHERE NOT EXISTS (SELECT 1 FROM vocabulary v WHERE v.id = r.vid) GROUP BY r.vid ORDER BY r.vid;
```

## Zeichenreihenfolge im arabic_script — stille Regex-Falle (2026-09-12)

Beim Prüfen der ya-Gemination ergab `arabic_script ~ 'يّ'` nur 7 Treffer, obwohl optisch in vielen Zeilen eine Schadda auf dem ya steht. Ursache: die Kombinationszeichen sind **Vokal vor Schadda** gespeichert (`طَيَّبِت` = `0637 064e 064a 064e 0651 …`), nicht in der kanonischen Unicode-Reihenfolge Schadda-vor-Vokal. Bestandsweit: **803 Zeilen Vokal-vor-Schadda, 16 andersherum.** Jede Regel `<Buchstabe>ّ` verfehlt damit fast den ganzen Bestand und meldet — genau wie `\b` statt `\y` — einfach nichts. Fix: `ي[ًٌٍَُِْٰ]*ّ`. Die erste, falsche Zählung hätte beinahe zu „يّ wird einfach `y` geschrieben" geführt; mit korrigierter Regex steht es **67 : 14 für `yy`**, und TUNICO wie Ninja bestätigen das mit 14/14.

**Lehre:** Bei jeder neuen Regex auf `arabic_script` erst gegenprüfen, ob sie überhaupt greift — eine Trefferzahl, die plausibel niedrig aussieht, kann eine stumme Fehlregel sein. Der billigste Test: eine Zeile, von der man weiß, dass sie treffen muss, einzeln abfragen und die Codepoints ausgeben (`to_hex(ascii(ch))` über `regexp_split_to_array(arabic_script,'')`).

## Waw-Gemination — erst offen gelassen, dann entschieden (2026-09-12)

**Erste Runde, Fehlschluss:** Nachdem die ya-Regel (`yy`) dreifach belegt war, lag die Übertragung auf و nahe. Als Gegenbeleg schien zu sprechen, dass Ninja هُوَ als `houwa` mit einem `w` schreibt. Daraufhin wurde eine bereits ausgeführte Einzelkorrektur `3812 ahuwa`→`ahuwwa` **zurückgenommen** und die Frage offen gelassen.

**Zweite Runde, Auflösung:** Der Gegenbeleg war keiner. In هُوَ steht **keine Schadda** — ein Waw-Buchstabe ergibt ein `w`. Die Systematik ist exakt symmetrisch zu ya (هِيَ → `hiya`, هِيَّ → `hiyya`; هُوَ → `houwa`, هُوَّ → `houwwa`). Der Bestand schreibt waw mit Schadda **40 : 4** als `ww`; die 4 Gegenbeispiele sind wortfinale Schadda und die bewusst kontrahierte `shnou`-Familie. Die Rücknahme von 3812 war also im Ergebnis falsch — richtig ist `ahouwwa` — aber **im Verfahren richtig**: die Zeile hätte als einzige gegen ihre Geschwister gestanden, und die Begründung, die das aufgelöst hat, lag zu dem Zeitpunkt nicht vor.

**Lehre:** Ein einzelner Quellenbeleg widerlegt eine Regel nur, wenn er wirklich denselben Fall zeigt. „Ninja schreibt hier ein `w`" war erst dann aussagekräftig, als geprüft war, ob dort überhaupt eine Schadda steht. Vorher war es eine Beobachtung über ein anderes Wort.

**Ausgeführt:** 11 Zeilen — die هو-Familie auf `houwwa` (493, 1445, 1782, 3339, 3747), `ahuwa`→`ahouwwa` (3812), die هي-Familie auf `hiyya` (1887, 3711; drei Zeilen schrieben es schon so), `taw`→`tawwa` (1661, 3197) und `melwen`→`mlawwen` (3163, dessen Parallelzeile 3710 `mlawwen` bereits schrieb).

## arabic_skeleton/translit_skeleton Herleitung — Rezept 4 (2026-09-05)

Für Rezept 4 (fertigen `INSERT INTO vocabulary` bauen) mussten `translit_skeleton`/`arabic_skeleton` mitberechnet werden, ohne die App-Logik zu kennen (kein JS-Code im Repo, der diese Spalten befüllt — vermutlich immer per Hand/Adhoc-Skript nachgezogen, siehe 3.688/3.698 Zeilen befüllt trotz keiner dokumentierten Formel). Wie beim Peace-Corps-Fall: Regel per Reverse-Engineering aus dem Bestand hergeleitet, nicht geraten.

**`translit_skeleton`** (aus `darija`): lowercase, alles außer `[a-zA-Z0-9]` entfernen, dann Vokale/Halbvokale `[aeiouwy]` entfernen. Erster Entwurf ohne `w`/`y` in der Stripliste traf nur 2.491/3.688 — Fehleranalyse zeigte, `w`/`y` werden ebenfalls konsequent gestrichen (`wsil`→`sl`, `yaqli`→`ql`, `tayyara`→`tr`). Nach Korrektur 3.686/3.688 exakter Match, die 2 Abweichungen (`bit q3ad`/id 4356, `s7aba`/id 4214) sind erkennbar veraltete/stehengebliebene Werte nach späterer `darija`-Korrektur, kein Formelfehler.

**`arabic_skeleton`** (aus `arabic_script`) ist deutlich komplexer — kein bloßes Vokal-Stripping auf Arabisch, sondern dieselbe Konsonanten-Buchstabieralphabet-Abbildung wie bei TUNICOs `*_orig`→`*_chatalpha` (ḥ→7, ʕ→3, x→kh, ġ→gh, š→sh, ǧ→j, ḍ→dh, ṯ/ḏ/ẓ→th), nur direkt von arabischen Buchstaben statt von DMG-Transliteration ausgehend. Herleitungs-Stolpersteine (jeweils gegen den vollen Bestand von 3.688 Zeilen mit `arabic_skeleton` gegengetestet, nicht nur Stichproben):
1. **Schadda verdoppelt den Konsonanten, wird aber nicht direkt hinter dem Konsonanten kodiert** — Unicode-Reihenfolge ist Konsonant+Harakat+Schadda (z.B. „صَحَّة" = ص-Fatha-ح-Schadda-Fatha-ة), nicht Konsonant+Schadda direkt. Ein naiver `(.)Schadda→\1\1`-Regex traf dadurch oft die Harakat statt des Konsonanten. Fix: erst alle Harakat/Tanwin/Sukun (außer Schadda selbst) entfernen, danach die Schadda-Verdopplung anwenden — erst dann stehen Konsonant und Schadda direkt nebeneinander.
2. **Bestimmter Artikel „ال" wird nur beim ALLERERSTEN Wort der ganzen Zeichenkette komplett gestrichen** (Alif UND Lam) — bei jedem späteren Vorkommen im selben Satz (auch als Präfix wie „بال" = bi+al) wird nur das Alif entfernt, das Lam bleibt als Konsonant erhalten. Beleg: „الماكينة تِخدِم بالباهي" → `mkntkhdmblbh` (führendes „ال" komplett weg), aber „صلَّحت التليفون القديم" → `sll7tltlfnlqdmtkhdmblbh` (das „ال" von „التليفون"/„القديم", beide nicht am Satzanfang, behält sein Lam). Fix: `regexp_replace(trim(text), '^ال', '')` exakt einmal am Stringanfang, keine globale Ersetzung.
3. Hamza-Trägerzeichen ئ/ؤ (nicht nur das nackte ء) fehlten anfangs in der Vokal-Trägerliste (`رئيس`→`rs`, `سؤال`→`sl`) — ergänzt.
4. Ein finaler generischer Pass **lowercase + `[aeiouwy]` entfernen** über das Gesamtergebnis (nicht nur über die arabischen Buchstaben) erklärt Ausreißer wie eine versehentlich mit-abgetippte deutsche Klammer-Annotation `(Zukunftsmarker)` → `(zknftsmrkr)` im Feld — die App wendet offenbar dieselbe Vokal-Streich-Logik unabhängig vom Schriftsystem als letzten Schritt an.
Nach allen vier Fixes: 3.679/3.688 exakter Match. Die 9 verbleibenden Abweichungen sind Tatweel-Platzhalter-Einträge (`بِـ`, `لْـ` — bewusst Lückentext, kein Vokabeleintrag), zwei Legacy-Werte ohne Schadda-Verdopplung (`وَرَّى`/`يْوَرِّي`, vermutlich vor Einführung der Schadda-Regel gespeichert) und ein offensichtlicher Test-/Datenmüll-Eintrag (`arabic_script = "aba babab"`) — keine Formelfehler, siehe Detail-Query bei Bedarf erneut ausführen statt diesen Zeilen zu vertrauen.

Beide Regeln als SQL-Funktionen `public._translit_skeleton()`/`public._arabic_skeleton()` hinterlegt (siehe Abschnitt "vocab_lookup — Cross-Source-Abgleich", Rezept 4) statt die Herleitung bei jedem `INSERT` erneut von Hand nachzubauen.

## Peace Corps forms_chatalpha/forms_skeleton — Nachbefüllung (2026-09-05)

Ausgangslage: nur 1.241/5.070 Zeilen hatten `forms_chatalpha`/`forms_skeleton` befüllt (aus früheren Einzel-Transkriptionssitzungen), der Rest der Tabelle (importiert aus dem rohen PDF-Extrakt) nicht — und die Konvertierungsregel von `forms_phonetic` (Original-Lautschrift) zu unserem Chat-Alphabet war nirgendwo dokumentiert. Statt zu raten: Regel per Reverse-Engineering aus den 1.241 bereits korrekt konvertierten Zeilen abgeleitet (Diff zwischen `forms_phonetic` und `forms_chatalpha` Zeichen für Zeichen verglichen), dann **vor** dem Bulk-Update gegen alle 1.241 Zeilen auf 100%-exakten Match getestet — nicht auf Stichproben verlassen.

Gefundene Regel (Peace-Corps-Lautschrift → Chat-Alphabet): (1) Großes `H` → `7` (vor dem Lowercasing, case-sensitive), (2) kleines `x` → `kh`, (3) danach alles lowercase (faltet großes S/T/D/Z zu klein, keine Ziffern-Ersetzung dafür), (4) `:` (Längungszeichen) komplett entfernen. SQL: `replace(lower(replace(replace(fp, 'H','7'), 'x','kh')), ':', '')`.

Skeleton-Regel: lowercase Chat-Alphabet, dann `[aeiouwy\s\-\.\(\)àâäéèêëîïôöùûü]` entfernen (Vokale, Halbvokale w/y, Whitespace, Bindestrich, Punkt, Klammern, französische Akzentvokale). Erster Entwurf ohne Punkt/Klammern/Akzentvokale scheiterte an 4/1241 Testzeilen (`AGO` wegen "...", `CUTLET`/`côtelette` und `BABY`/`bébé` wegen é/ô, `BANISH`/`tarrad(milblad)` wegen Klammern) — nach Erweiterung der Zeichenklasse 1241/1241 exakter Match. Danach Bulk-Update auf alle Zeilen mit `forms_phonetic IS NOT NULL` ausgeführt: 1.241 → 5.004/5.070 (die restlichen 66 haben schlicht kein `forms_phonetic`). 20 zufällige neu konvertierte Zeilen stichprobenartig nachgeprüft, alle korrekt (inkl. Französisch-Lehnwörter und Grammatik-Platzhalter).

## Code-Änderungen — Fallgeschichte

Performance-Fix `spellcheck="false"` (2026-08-05): `ei-tp` (Topic-Feld) hatte `autocomplete/autocorrect/autocapitalize/spellcheck` schon deaktiviert, die Nachbarfelder `ei-ar`/`ei-tr`/`ei-en` nicht — der gemeldete INP-Bug betraf nur `ei-ar`, aber dieselbe Fehlerklasse lauerte in allen dreien.

## Die Alif-Verschiebung — vier Fälle, ein Muster (2026-09-15)

Viermal in einer Sitzung gefunden: der Langvokalträger ا sitzt eine Position zu weit rechts oder
links, und das Wort wird dadurch ein anderes.

| id | gespeichert | richtig | was der falsche Wert bedeutet |
|---|---|---|---|
| 1777 | فراغ | **فارغ** | `farāgh` „Leere" (Nomen) statt `fāregh` „leer" (Partizip) |
| 1521 | والد | **ولاد** | `wālid` „Vater" statt `wlād` „Söhne" |
| 1858 | تلازيت | **تلزّيت** | Alif steht dort, wo die Gemination hingehört (TUNICO `tlazz`) |
| 768 | االله | **الله** | doppeltes Alif, `darija` „aallha" statt `allah` |

**Warum keine Prüfung das sieht:** `_arabic_skeleton()` und `_translit_skeleton()` streichen ا/و/ي.
Für sie sind فراغ und فارغ dasselbe Wort. Die Fehlerklasse findet nur der Quellenabgleich — oder,
und das war zweimal der schnellste Weg, **der eigene Bestand**: `1777` fiel auf, weil unser Plural
`2120 فَارْغِينْ` das Alif vor dem ر hat, und die Korrektur ist exakt dessen Stamm. `1521` fiel auf,
weil `1552` den Plural überall sonst `ولاد` schreibt.

**Praktische Konsequenz:** bei jedem Wort mit ا/و/ي im Inneren prüfen, ob eine morphologisch
verwandte Zeile im Bestand denselben Träger an derselben Stelle hat. Ein Ninja-Treffer mit
abweichender Bedeutung ist dabei kein Störgeräusch, sondern der Hinweis: bei `1521` war Ninjas
„father, dad" genau der Homograph, der den Fehler verraten hat.

## Der Vokalisierungs-Solver — ein Ansatz, den die Validierung gekippt hat (2026-09-15)

Für die restlichen unvokalisierten Einzelwörter entstand ein Solver, der nur Diakritika setzt
(nie Buchstaben ändert) und dessen Ergebnis durch `_arabic_to_chatalpha` zurückgerechnet wird.
Liegt in `tools/`.

**Der erste Entwurf war falsch, und zwar auf eine Art, die beim Draufschauen richtig aussah:**
als Zielumschrift die eigene `darija` nehmen. Das klingt zwingend — dann macht die Vokalisierung
nur explizit, was die Zeile ohnehin behauptet, und erfindet nichts.

**Die Probe, die es gekippt hat:** die 2.461 bereits **von Hand** vokalisierten Einzelwortzeilen
entkleiden und neu lösen lassen. Nur 554 hätte der Solver identisch reproduziert.

    256  Mensch: قَلَم (qalam)     Solver: قْلَمْ (qlam)
    262  Mensch: أَرْبَعَة (arba3a)  Solver: أرْبْعَة (arb3a)
    267  Mensch: تِسْعَة (tis3a)    Solver: تْسْعَة (ts3a)

Unsere `darija` ist eine **verkürzte** Umschrift. Sie darf die Vokalisierung einschränken, nicht
bestimmen. Als Ziel gehört eine echte Vokalquelle (TUNICO, Peace Corps). Steht jetzt als
Lautlehre-Regel 11 in SKILL.md.

Dieselbe Probe fing einen zweiten Fehler: die erste Fassung setzte ein **Sukun auf den
Langvokalträger** (نْسَىْ, مْرَاْ) und verstieß damit gegen Lautlehre-Regel 3. Ursache war ein Bonus
für „Sukun am Wortende" in der Bewertungsfunktion, der nicht zwischen Konsonant und Vokalträger
unterschied.

**Die verallgemeinerbare Lehre:** ein Verfahren, das den Bestand anfassen soll, zuerst gegen den
**handgemachten** Teil des Bestands laufen lassen. Reproduziert es die Handarbeit nicht, stimmt
das Verfahren nicht — und das sieht man an keiner Stichprobe des Ergebnisses, weil jedes einzelne
Ergebnis für sich plausibel aussieht.

## Der Partner-Check zeigte Quellenbestätigtes zuerst (2026-09-15)

Der Fallback des Partner-Checks (Zeilen ohne `partner_status`, 3.449 Stück) sortierte nach
Fälligkeit und dann zufällig; `external_confirmed` wurde gar nicht erst geladen. Damit landeten
die **1.090 nicht quellenbestätigten** Zeilen nach Zufall irgendwo — obwohl genau dort Semias
Urteil die einzige Bestätigung ist, die es je geben wird. Bei bestätigten Zeilen ist es eine
Zweitmeinung.

Umgestellt auf: quellenunbestätigt zuerst, dann Fälligkeit, dann Zufall. **Die primäre Sortierung
gehört dabei auf den Server** (`order=external_confirmed.asc.nullsfirst`) — PostgREST liefert
ohne `order` eine beliebige Reihenfolge, ein clientseitiges Sortieren hätte also nur die
zufälligen 200 sortiert, die zurückkamen, statt die richtigen zu holen.
