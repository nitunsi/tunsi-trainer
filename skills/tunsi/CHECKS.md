# Datenqualitäts-Checks (SQL)

Ausgelagert aus SKILL.md (2026-11-07). **Erst in den Trainer schauen** (*Mehr → Prüfungen*, SKILL.md → „Prüfungen im Trainer“) — hier steht nur, was per SQL läuft, und die Regeln für eigene Prüfabfragen. Lesen, wenn ein SQL-Check trifft oder du eine Prüfabfrage baust.

Drei Gruppen, und die Zugehörigkeit sagt, **was ein Treffer bedeutet** — das ist wichtiger als die Abfrage selbst:

| | Gruppe | Ein Treffer heißt | Vorgehen |
|---|---|---|---|
| **A** | Checks, die auf 0 stehen müssen | ein Fehler, keine Fehlalarme bekannt | korrigieren (nach Schritt 4 des Prozesses: zeigen, warten) |
| **B** | Verdachtslisten mit Fehlalarmquote | ein *Kandidat*, Quote je Liste dokumentiert | einzeln gegen die Quellen prüfen, **nie im Block korrigieren** |
| **C** | Regeln fürs Prüfen selbst | — | vor dem Schreiben eines neuen Checks lesen |

**Reihenfolge:** erst A (kostenlos, eindeutig), dann B, und C liest man, bevor man eine eigene Abfrage baut. Jede Zahl hier ist ein Schnappschuss — siehe Warnung unter „Offene Punkte".

---

### A · Checks, die auf 0 stehen müssen

**Eine Abfrage für alles:**

```sql
SELECT * FROM public.qualitaets_checks WHERE treffer > 0 ORDER BY gruppe, nr;
```

**Gruppe A muss auf 0 stehen — ein Treffer dort ist ein Fehler, keine Verdachtsliste.** Gruppe B sind bekannte Rückstände, die sinken sollen. Die Sicht liefert `treffer` und `erste_ids`; die vollständige Trefferliste holt man mit der `id`-Liste aus `vocabulary`.

Hier standen bis zum 2026-09-13 rund 250 Zeilen SQL. Sie sind in die Sicht gewandert — dort können sie nicht mehr gegen das Schema driften, sie kosten keinen Kontext, und sie sind immer aktuell. **Was hier bleibt, ist das, was die SQL nicht sagen kann: was ein Treffer bedeutet und wo die Fallen liegen.**

| Gruppe A | bedeutet bei einem Treffer |
|---|---|
| 1 Ziffern 2/5/9, Großbuchstaben | Quellen-Schreibweise durchgerutscht (Ninjas `9`/`5`/`2`, Peace Corps' `H`/`S`/`T`) |
| 2 `ch` statt `sh` | dito, oder ein unmarkiertes Lehnwort — dann `(frz.)` ins `german` |
| 3 Artikel nicht assimiliert | `el-shatt` statt `esh-shatt`. ⚠️ Muster nimmt vorgeklebte Präpositionen ohne Trenner mit (`fil-`, `bil-`, `bel-`, …) — reine `\y(el\|il)-`-Wortgrenze sieht diese Fälle nicht, siehe PRECEDENTS.md → Artikel-Assimilation hinter einer Präposition |
| 4 Konsonanten-Gegencheck | `arabic_script` und `darija` nennen verschiedene Laute. **Richtung offen** — das Arabische kann der Fehler sein |
| 5 `(f.)` ohne `-a` | unmarkiertes Femininum; die Ausnahmeliste im SQL deckt die bekannten ab |
| 6 `wa`/`u` statt `w-` | Hausregel |
| 7 `-iou`/`-eou`/`-aou` | Plural muss `-iw` sein (= Regel 21) |
| 8 halb verdoppelter Digraph | `ddh` statt `dhdh`. **722/4254/3042/3073 sind ausgeschlossen** — echte ظ+ه- bzw. t+th-Morphemgrenzen, sie sind korrekt |
| 9 Sonderbuchstabe (= Regel 23) | ڨ/گ=g, ڤ=v, پ=p. **Ohne Lehnwort-Ausnahme**: die lateinische Schreibung ist frei, der arabische Buchstabe nicht. Prüft nur **eine** Richtung; die Gegenrichtung ist per Entscheidung kein Befund (siehe p/v-Entscheidung unten) |
| 30 verwaistes `homonym_ok` | ⚠️ Das Flag steht für **drei** Partnerarten — entsprechend den drei Feldern, über die der Duplikat-Manager gruppiert: gleiches **Arabisch** (`homonymNote()`), gleiches **Deutsch** (`synonymNote()`), gleiche **darija** (`schreibungNote()`, seit 2026-09-22 — `khallas` خَلَّصْ „er zahlte“ gegen خَلّاص „Ticketverkäufer“; mit 28 Zeilen die größte der drei Gruppen und bis dahin die einzige ohne Anzeige im Trainer). Ein Check, der nicht alle drei kennt, meldet berechtigte Markierungen als Fehler — der Wert fiel von 58 über 41 und 25 auf **7 von 84**, ohne dass sich an den Daten etwas änderte |
| 10 identisches Arabisch ohne `homonym_ok` | entweder Dublette oder unmarkiertes Homonym. ⚠️ Vergleicht **Bytes**: قصّ und قَصّ gelten als verschieden. Die vokalisierungsunabhängige Fassung ist Check 31 |
| 11–13 rohe Zeichen / Wächter | eine Umwandlungsfunktion kennt ein Zeichen nicht — siehe unten |
| 32 `conjugation` gegen die Regeln | ⚠️ Die A-Checks lesen nur `vocabulary.darija`. Die `conjugation`-Tabellen enthalten dieselbe Art Transliteration (650 Zeilen × bis zu 16 Formen) und waren bis zum 2026-09-13 **komplett ungeprüft** — dort stand noch `-iou` nach der Regel-21-Umstellung, und ein am selben Tag korrigierter Tippfehler lebte in sechs Tabellenformen weiter. **Jede Korrektur an `darija` muss die Tabelle mitprüfen** |
| 31 `ar_key`-Dublette | gleiche arabische **Buchstaben** (ohne Harakat) **und** gleiche deutsche Bedeutung, ohne `homonym_ok`. Schließt die Lücke von Check 10, der byteweise vergleicht. ⚠️ Die Bedeutungsbedingung ist nötig: ohne sie meldet der Check 85 Paradigmenformen derselben Wurzel. Und der Bedeutungsschlüssel darf **Klammern nicht wegwerfen** — bei `476`/`837` steht die Unterscheidung genau dort |
| 27 `q`/`z`/`j` ohne arabische Entsprechung | Gegenrichtung zu den Regeln 10/12/13. Nur **Einzelzeichen** taugen dafür — die Digraph-Gegenrichtungen (`dh`, `th`, `sh`) sind durch Morphemgrenzen verrauscht (`3and`+`ha`, `as`+`hal`) |
| 28 Artikel assimiliert vor Mondbuchstabe | Gegenrichtung zu Check 3 |
| 26 „`3`" ohne ع | Hamza als `3` transliteriert (`sou3el` für سُؤَال). Fand bei seinem ersten Lauf 5 Zeilen, alle echt — darunter `742`, dessen `arabic_script` schlicht etwas anderes sagte als die `darija`. Seit der Korrektur am 2026-09-13 auf 0 und damit in Gruppe A |

**Warum 12 und 13 so gebaut sind.** Der naheliegende Weg wäre, die bekannten Buchstaben aufzuzählen. Genau das hat ڨ **699 Zeilen lang unsichtbar** gelassen (76 im Bestand, 623 bei Ninja), weil `_arabic_skeleton()` ihn nicht kannte und roh stehen ließ. Eine Aufzählung vergisst den nächsten neuen Buchstaben genauso. Die Wächter drehen es um: sie melden, **was die Funktionen nicht kennen**.

**Die ڨ-Entscheidung (Nils, 2026-09-13):** wird ein Wort mit `g` gesprochen, **bleibt die `darija` und das `arabic_script` wird auf ڨ umgestellt**. Beim **Artikel** umgekehrt: dort wird die `darija` angepasst (`el-iqtisad` → `iqtisad`).

**Die p/v-Entscheidung (Nils, 2026-09-13) geht andersherum — nicht analog:** schreibt die `darija` `p` oder `v`, während das `arabic_script` ب bzw. ف hat, **bleibt beides, wie es ist**. Betroffen sind 25 (`p`) bzw. 14 (`v`) Zeilen, fast alle Lehnwörter (`parking`, `spor`, `talvza`, `villa`). Kein Befund, keine Kampagne, und `chatalpha_konflikte` sortiert sie als eigene Klasse `lehnwort_pv` aus. Der Unterschied zu ڨ: dort ging es um **tunesische** Wörter, deren Lautung das Arabische falsch wiedergab; hier um Fremdwörter, bei denen die arabische Schreibung ohnehin nur eine Annäherung ist.

⚠️ **Die Sicht deckt nur einen TEIL von `TRANSLIT_RULES` ab.** Wer „alle Regeln geprüft" sagen will, muss die echten 23 laufen lassen — über den Node-Harness gegen `trainer.html`:


```bash
# tools/extract.js zieht normalize/checkAnswer/TRANSLIT_RULES per Anker aus trainer.html
# nach tools/lib.js und bricht selbst ab, wenn es nicht 23 Regeln werden.
node tools/extract.js && node -e '
const L=require("./lib.js"); const fs=require("fs");
const rows=JSON.parse(fs.readFileSync("fresh_all.json","utf8"))
  .map(r=>({id:r.id,tr:r.darija||"",ar:r.arabic_script||"",en:r.german||""}));
const ids=new Set();
L.TRANSLIT_RULES.forEach((r,i)=>{ const h=rows.filter(v=>{try{return r.test(v);}catch(e){return false;}});
  h.forEach(x=>ids.add(x.id)); if(h.length) console.log("Regel "+(i+1)+": "+h.length+" — "+r.label); });
console.log("betroffen: "+ids.size+" von "+rows.length+" ("+L.TRANSLIT_RULES.length+" Regeln)");
'
```

**Zwei Pflicht-Plausibilitätsprüfungen bei jedem Harness-Lauf:**

1. **`L.TRANSLIT_RULES.length` mit ausgeben.** Fällt der Extraktor auf einen Teilblock zurück, prüft man stumm eine gekürzte Regelliste. Präzedenzfall: PRECEDENTS.md → `extract.js`. **Der Anker ist zweimal danebengegangen** — beide Male, weil `indexOf("\n];")` zuerst das Ende von `CONSONANT_PAIRS` trifft. Immer von `const TRANSLIT_RULES = [` aus suchen. **Seit 2026-09-15 prüft `tools/extract.js` das selbst und bricht ab** (Sollzahl über `TRANSLIT_RULES_ERWARTET` anpassbar, wenn eine Regel dazukommt); der Extraktor liegt nicht mehr im Scratchpad, wo er jede Session neu gebaut werden musste.
2. **Exportierte Zeilenzahl gegen `count(*)` halten.** Ein still unvollständiger Export meldet „0 Treffer" über den halben Bestand und sieht dabei aus wie ein sauberes Ergebnis.

### B · Verdachtslisten (mit Fehlalarmquote)

**Kurs-Prüfungen 36 und 37 (seit 2026-10-31, in der Sicht `qualitaets_checks`, Gruppe B):**
- **36 · Verbform in der Lösung fehlt in der Konjugationstabelle.** Für Übungen `grammar_drill` mit „(Perfekt/Präsens konjugieren)“ wird jede Form der Lösung gegen alle Zellen der Tabelle des Verbs gehalten. Prüft nur Verben, zu denen eine Tabelle existiert (gut 40 von rund 100 Übungen). **Ein Treffer ist ein Kandidat, kein Fehler**: Tabelle und Übung können beide stimmen und nur unterschiedliche Varianten führen (`jat` und `jet`). Erst Skript/TUNICO fragen, dann die falsche Seite ändern. Fehlalarme sind vor allem Lücken in der Tabelle (fehlende 1pl) und Varianten.
- **37 · Wortstamm mit `u` statt `ou`.** Meldet Kurswörter, deren Schreibung mit `ou` im Stamm in den Vokabeln existiert, die `u`-Form aber nirgends in den Vokabeln. Fängt bewusst nicht die Plural-Endung `-u` und nicht `nur`/`tun` (deutsche Wörter). Blind für Wörter, die in den Vokabeln selbst in beiden Schreibungen vorkommen (zwei Sätze, 1747 und 2532).

**Den Stand dieser Listen nie aus dem Skill zitieren — mit einer Abfrage ziehen.** Genau wie
bei Gruppe A: hier standen bis zum 2026-09-22 neun Zahlen im Text, und fünf davon waren
überholt (`gemination` und `konsonanten` längst auf 0, der Bedeutungs-Screen von 76 auf 151
gewachsen, die Vokalisierungs-Kampagne abgearbeitet). Was bleibt, ist die **Methodik** und die
**gemessene Fehlalarmquote** — die ist eine Eigenschaft der Liste, keine Momentaufnahme.

```sql
SELECT 'chatalpha_konflikte · '||klasse AS liste, count(*) FROM chatalpha_konflikte GROUP BY klasse
UNION ALL SELECT 'vokalisierung_kandidaten', count(*) FROM vokalisierung_kandidaten
UNION ALL SELECT 'bedeutungs_screen',        count(*) FROM bedeutungs_screen
UNION ALL SELECT 'Gruppe A/B (Sicht)',       count(*) FROM qualitaets_checks WHERE treffer > 0
ORDER BY 1;
```

Ein Treffer ist ein **Kandidat, kein Fehler**. Jede Liste trägt ihre gemessene Fehlalarmquote — die steht dort nicht zur Zierde: bei der Gemination sind ~15 % Fehlalarme, beim arabischen Duplikat-Check ~80 %. **Nie im Block korrigieren**, immer einzeln gegen Ninja/TUNICO/Peace Corps prüfen. Präzedenzfälle, in denen ein Blockfix falsch gewesen wäre: `bnin`, `skhan` (dort war das `arabic_script` der Fehler), `metrobbi` (gegenteiliger Gloss statt Dublette), die 30 Ninja-Skelett-Kollisionen bei der Vokalisierung.

**`chatalpha_konflikte` — die einzige Prüfung, die Vokale sieht (seit 2026-09-13).** Alle anderen Checks vergleichen Konsonantenskelette; `7araam` gegen حَرَام (= `7aram`) ist für sie identisch. `public._arabic_to_chatalpha(arabic_script)` leitet dagegen die **volle** Chat-Alphabet-Form aus dem vokalisierten Arabischen ab und stellt sie der gespeicherten `darija` gegenüber. Die Sicht filtert bereits heraus, was erlaubt abweichen darf: unvokalisiertes Arabisch, Mehrwortzeilen, markierte Lehnwörter (lateinische Schreibung ist dort frei) und die bekannte Funktionslücke `bi/li/ka/fa` + Artikel.

Vier Klassen, und nur zwei davon sind Befunde:

| `klasse` | Befund? | heißt |
|---|---|---|
| `gemination` | **ja**, = Check 24 | die beiden Felder widersprechen sich bei der **Verdopplung** — meist fehlt die Schadda im Arabischen (`akhaff` gegen أَخَف). Objektiv entscheidbar |
| `konsonanten` | **ja**, = Check 25 | verschiedene Laute. Etwa die Hälfte sind französisch geschriebene Lehnwörter ohne `(frz.)`-Marker — mit Marker fallen sie heraus |
| `lehnwort_pv` | nein | p/v gegen ب/ف per Entscheidung vom 2026-09-13 |
| `vokale` | nein, und kein Check | Kurzvokale sind im Bestand nicht normiert; die Klasse steht nur für den Einzelfall zur Verfügung. Mit Abstand die größte der vier |

**`vokalisierung_kandidaten` — Fehlalarmquote ~48 %, Kampagne abgearbeitet.** Methodik, Pflichtfilter und die Fehlerbilder stehen gesammelt unter **vocab_lookup → Vokalisierung aus Ninja**; hier nur der Hinweis, dass die Liste zu den Verdachtslisten zählt und nie im Block korrigiert wird.

Grundgesamtheit: 2.335 vokalisierte Einzelwörter. Die Klassen `vokale` und `lehnwort_pv` sind bewusst **nicht** in `qualitaets_checks`: eine Liste, die dauerhaft Bekanntes meldet, macht die scharfen Listen daneben unsichtbar.

**Zusätzlicher Check nach größeren Batches: Konsonanten-Skelett-Vergleich neu vs. alt** (findet Vokalvarianten-Duplikate, die der normale Duplikat-Check übersieht — `normKey()` entfernt keine Vokale, `yqoum` matcht `yqum` dort NICHT). Eingeschränkt auf dieselbe `lesson_id` (sonst zu viele Zufallstreffer):
```sql
WITH cons AS (
  SELECT id, arabic_script, darija, german, lesson_id,
    regexp_replace(lower(regexp_replace(darija,'[^a-z0-9]','','g')), '[aeiou]', '', 'g') AS ck
  FROM vocabulary WHERE lesson_id IN (/* betroffene lesson_ids */)
),
newv AS (SELECT * FROM cons WHERE id >= /* erste neue id im Batch */),
oldv AS (SELECT * FROM cons WHERE id < /* erste neue id im Batch */)
SELECT n.id nid, n.darija ndar, n.german nger, o.id oid, o.darija odar, o.german oger
FROM newv n JOIN oldv o ON n.ck = o.ck AND n.lesson_id = o.lesson_id;
```
Jeden Treffer einzeln prüfen — echte Duplikate von Zufallskollisionen unterscheiden (z.B. `yaqli`="braten" vs. `yqul`="sagen" kollidieren zufällig auf `yql`, sind aber verschiedene Wörter).

**Variante für den Bestandsaudit (seit 2026-09-12): Vokal-Dubletten im ganzen Bestand, ohne Batch-Grenze.** Die Fassung oben braucht eine „erste neue id" und eine `lesson_id`-Eingrenzung — sie findet deshalb nur Dubletten *innerhalb eines frischen Imports*. Vokal-Varianten, die über Jahre und Lektionsgrenzen hinweg entstanden sind, bleiben unsichtbar. Diese Fassung ersetzt die Batch-Eingrenzung durch einen Bedeutungs-Filter (Glosse müssen sich überlappen), was die Zufallstreffer erschlägt:

```sql
WITH v AS (
  SELECT id, darija, german, arabic_script,
    regexp_replace(lower(regexp_replace(darija,'[^a-z0-9]','','g')),'[aeiou]','','g') AS skel,
    lower(regexp_replace(regexp_replace(german,'\([^)]*\)','','g'),'[^a-zäöüß]','','g')) AS gkey
  FROM vocabulary WHERE darija IS NOT NULL AND darija <> '' AND NOT homonym_ok
)
SELECT a.id, a.darija, a.german, b.id, b.darija, b.german,
       (regexp_replace(a.arabic_script,'[ً-ٰٟ]','','g') = regexp_replace(b.arabic_script,'[ً-ٰٟ]','','g')) AS gleiches_arabisch
FROM v a JOIN v b ON a.skel = b.skel AND a.id < b.id AND length(a.skel) >= 3
WHERE lower(a.darija) <> lower(b.darija)
  AND (a.gkey = b.gkey OR a.gkey LIKE '%'||b.gkey||'%' OR b.gkey LIKE '%'||a.gkey||'%')
ORDER BY gleiches_arabisch DESC, a.id;
```

Erster Lauf 2026-09-12: **177 Verdachtspaare**, davon 166 in Zeilen ohne `conjugation` — also in dem Teil des Bestands, den der batch-gebundene Check nie erreicht hat. `gleiches_arabisch = true` ist die schärfste Teilmenge (14 Paare); Stichprobe daraus von Hand beurteilt: **8 echt, 6 Fehlalarme**.

**Die Fehlalarme folgen vier wiederkehrenden Mustern — alle am `german`-Feld erkennbar, vor der Vorlage herausfiltern:**

| Muster | Beispiel | Erkennbar an |
|---|---|---|
| m/f-Paar desselben Adjektivs | `qsir` / `qsira` „kurz (m.)/(f.)" | `(m.)` vs. `(f.)` im Gloss |
| Imperativ vs. Vergangenheit | `l3ab` „er spielte" / `el3ab` „spiel!" | `(Imperativ)` bzw. `!` |
| Imperativ vs. Partizip | `weqif` „steh!" / `waqif` „stehend" | Partizip-Gloss auf `-end` |
| Kollektiv vs. Nomen unitatis | `rmal` „Sand" / `ramla` „Sand (f.)" | `(f.)` bei Stoffnamen |

Diese Paare sind **korrekt und dürfen nicht zusammengelegt werden** — bei Imperativ/Vergangenheit ggf. `homonym_ok=true` setzen, wenn die Schreibung wirklich identisch wird.

**Filter-Feinheit, die zählt (2026-09-12 durchgemessen):** Ein `(f.)`-Marker auf *einer* Seite ist KEIN Ausschlusskriterium — das killt echte Dubletten (`djeja` „Henne / Huhn (f.)" ↔ `djaja` „Huhn", `neyy` „roh (m.)" ↔ `nayy` „roh"). Ausschließen nur, wenn **beide** Seiten gegensätzliche Marker tragen:

```sql
  AND NOT ((a.m AND b.f) OR (a.f AND b.m))   -- echtes m/f-Paar
  AND NOT (a.pl <> b.pl) AND NOT (a.sg <> b.sg)  -- Numerus-Paar
  AND NOT (a.imp <> b.imp)                   -- Imperativ vs. andere Form
  AND NOT (a.part <> b.part)                 -- Partizip vs. andere Form
```
Gegen eine Kontrollmenge von 14 handgeprüften Paaren validiert: alle 8 echten überleben, 4 von 6 Fehlalarmen fallen raus.

**Wichtigste Lehre — nur `gleiches_arabisch = true` ist eine Arbeitsliste.** Roh 177 Paare, nach allen Filtern 71. Von den 61 Paaren mit *unterschiedlichem* `arabic_script` ist praktisch keines eine Dublette, sondern korrekte Morphologie: `khamsa`/`khams` (fünf/fünfter), `3ashra`/`3shour` (zehn/zehnter), `khobz`/`khobza` (Brot / ein Brot), `qrib`/`qriba` (nah m./f.), `forshita`/`frashit` (Gabel Sg/Pl). Viele davon tragen **gar keinen Marker im Gloss**, sind also durch keinen Filter aussortierbar. Die 10 Paare mit identischem Arabisch enthielten dagegen 8 echte Dubletten.

→ **Beim nächsten Lauf nur die `gleiches_arabisch`-Teilmenge vorlegen.** Den Rest nicht aufrollen — das war der Irrweg, den dieser Durchgang einmal gegangen ist.

⚠️ **Der `ar_key` oben ist diakritika-empfindlich — das ist Absicht (er bildet die App nach), aber als Duplikat-Prüfung ist er blind.** Zwei Zeilen mit demselben arabischen Wort sind für ihn verschiedene Wörter, sobald sie unterschiedlich vokalisiert sind: **6 Gruppen** gegen **86** mit gestripptem Vokal. Den folgenden Check deshalb **zusätzlich** laufen lassen — er geht bewusst über das hinaus, was der App-Tab kann.

**Arabischer Duplikat-Check, vokalisierungs-unabhängig (seit 2026-09-12).**
```sql
WITH v AS (
  SELECT id, darija, german, homonym_ok,
    lower(regexp_replace(regexp_replace(arabic_script,'[ًٌٍَُِْٰٟ]','','g'),
                         E'[\\s.,;:!?()/\\\\''"«» -]+','','g')) AS k
  FROM vocabulary WHERE arabic_script IS NOT NULL AND length(arabic_script) > 2
)
SELECT k, count(*) AS n, bool_or(homonym_ok) AS hom,
       string_agg(id||' '||darija||' = '||left(german,40), '  ||  ' ORDER BY id) AS zeilen
FROM v GROUP BY k HAVING count(*) > 1 ORDER BY n DESC, k;
```

**Die Schadda gehört NICHT in die Stripliste.** Sie ist ein Konsonantenverdopplungszeichen, kein Vokalzeichen — sie mitzustrippen verschmilzt Form I und Form II (حَضَر „er nahm teil" gegen حَضَّر „er bereitete vor") und erzeugt 40 Scheingruppen. 126 Gruppen mit Schadda gestrippt gegen 86 ohne; die Differenz sind genau diese Paare.

**Fehlalarm-Profil (erster vollständiger Lauf, 86 Gruppen):**

| Muster | Gruppen | |
|---|---|---|
| `-it`/`-t`-Verbpaar (3. Pers. f. gegen 1. Pers. Vergangenheit) | 21 | strukturell, der Bestand legt es für jedes Verb an |
| bereits `homonym_ok` | 17 | Check arbeitet korrekt |
| echt verschiedene Wörter mit gleichem Gerüst | ~30 | `morra`/`marra`, `ktob`/`ktib`, `3irq`/`3araq`, `jomal`/`jmal` |
| Imperativ/Vergangenheit derselben Wurzel | ~5 | kein Duplikat, aber `homonym_ok`-Kandidaten |
| **echte Funde** | **17** | ~20 % Trefferquote |

**Beim Prüfen nicht auf „Dublette ja/nein" verengen.** Gleiches Arabisch kann auch heißen, dass eine der beiden Zeilen inhaltlich falsch ist. Präzedenzfall `metrobbi` (PRECEDENTS.md): zwei Zeilen mit identischem Arabisch trugen **gegenteilige** Glosse, und die Quellenprüfung zeigte, dass nicht die eine die Dublette der anderen war, sondern beide Glosse invertiert. Jede Gruppe gegen Ninja/TUNICO/Peace Corps prüfen, nicht nur gegeneinander.

**Gemination: Schadda im Arabischen, aber kein Doppelbuchstabe in `darija` (Kandidat, seit 2026-09-12).** Setzt Lautlehre-Regel 2 um. **Verdachtsliste, keine Fehlerliste** — Stichprobe 16 von 93 Treffern: 11 echt, 5 Fehlalarme (~15 %). Deshalb bewusst NICHT in `TRANSLIT_RULES` übernommen, sonst stünde der Prüf-Tab dauerhaft auf ~93 statt auf 0.
```sql
SELECT id, arabic_script, darija, german FROM vocabulary
WHERE arabic_script ~ 'ّ'
  AND regexp_replace(lower(darija),'(sh|th|kh|gh|ch|dh)','#','g') !~ '([a-z0-9#])\1'   -- Digraphen als Einheit
  AND lower(darija) !~ '\y(w-)?(l|b|f|m)?(el|il|le|li|es|esh|et|eth|ej|ed|en|er|ez)-' -- Artikel, auch nach Präposition
  AND regexp_replace(arabic_script,'[ً-ٰٟ]','','g') !~ '(^|\s)ال'
  AND german !~* '(frz\.|franz\.|ital\.|engl\.|lehnwort)'
  AND regexp_replace(arabic_script,'[ًٌٍَُِْٰٟ]','','g') !~ 'ّ\s*$'                     -- wortfinale Schadda
ORDER BY id;
```
Restliche Fehlalarm-Muster (nicht weiter automatisierbar): Kontraktionsformen, bei denen das Arabische die volle Form schreibt (`shnoua` ← شْنُوَّا); mehrwortige Phrasen, bei denen die Schadda in einem anderen Wort sitzt; unmarkierte Fremdwörter (`rouba` ← رُوبَّا — mit `(frz.)` im Gloss automatisch ausgeschlossen). Zwei Gruppen im Ergebnis als Block entscheiden, nicht einzeln: Nationalitäten-Feminina auf ـِيَّة (8 Zeilen + 2 Plurale) und Form-II-Verbpaare (Präsens/Vergangenheit desselben Verbs, 10 Zeilen) — sonst laufen Geschwisterformen auseinander.

**Diese Lücke betrifft nur mehrwortige Zeilen** — und dort fast immer eine `h`/`7`- oder `d`/`th`-Verwechslung in genau einem Wort. Gefundene Fehlerbilder: `nsalhu`→`nsalla7u`, `hadh-dhert`→`7adhdhart`, `rouhou`→`rou7ou`, `yslah`→`ysla7`, `t7iz`→`thiz`, `t7abbel`→`thabbel`, `dhahab`→`thahab`.

**Pflicht-Gegenprobe vor jeder Korrektur — `tth` ist fast immer ein Fehlalarm:** in TUNICO (9/9), Ninja (17/17) und im eigenen Bestand (2/2) war jedes `tth` ein Morphemgrenzen-`t` vor `th` (`netthaowb` ← نِتْثَاوَب, `tthba7` ← تَذْبَح), keine Gemination. Entscheidungskriterium ist nicht die Buchstabenfolge, sondern das Arabische: steht dort eine Schadda auf ذ/ظ, ist es Gemination; steht ein eigenes ت davor, ist die Zeile korrekt. Kürzester Selbsttest: `_translit_skeleton(darija)` gegen `_arabic_skeleton(arabic_script)` halten — bei echter Fehlschreibung laufen die beiden an genau dieser Stelle auseinander (`7addhar` → `7ddhr` vs. `7dhdhr`), bei einem Präfix-`t` stimmen sie dort überein. **Bei mehrwortigen Zeilen die Stelle vergleichen, nicht die ganzen Strings** — die können aus völlig anderen Gründen abweichen. Beispiel id 3073: `tthb7` steht in beiden Skeletten identisch (also korrektes Präfix-`t`), die Gesamt-Skelette unterscheiden sich trotzdem, weil in derselben Zeile zwei andere Fehler stecken (`essakina` statt `essakkina` zu السِّكِّينَة, `brrsha` statt `barsha` zu بَرْشَة).

**Gemination von ya: `yy` (belegt 2026-09-12).** Schadda auf ي wird transliteriert wie jede andere Gemination. Eigener Bestand **67 : 14** (`mayyit`, `tayyab`, `ykhayyat`, `7orriyya`, `bnayya`), TUNICO **14/14** (`xayyāṭ`→`khayyat`, `ṛayyaḥ`→`rayya7`), Ninja **14/14** (`خَيَّاطْ`→`5ayyat`, `بَيِّنْ`→`bayyin`). Von den 14 Gegenbeispielen waren nach Prüfung 14 echte Fehler oder Lehnwörter; korrigiert wurden u.a. `taybit`→`tayybit`, `maytin`→`mayyitin` (Geschwister 2290 `mayyit`), `rwayeq`→`rwayyeq`, `mdhayef`→`mdhayyef`.
```sql
SELECT id, darija, arabic_script, german FROM vocabulary
WHERE arabic_script ~ 'ي[ًٌٍَُِْٰ]*ّ' AND darija !~ 'yy' ORDER BY id;
```

**Gemination von waw: `ww` (entschieden 2026-09-12).** Dieselbe Regel wie bei ya, ohne Ausnahme. Eigener Bestand **40 : 4** (`sawwar`, `lawwej`, `rawwa7`, `dawwara`, `mfawwer`, `ynawwar`, `tsawwert`, `tawwa`, `khawwaf`, `zawweli` …), Ninja `tawwa` تَوَّا.

**Der scheinbare Widerspruch war ein Denkfehler:** Ninja schreibt هُوَ als `houwa` mit *einem* `w` — dort steht aber **keine Schadda**. Ein Waw-Buchstabe → ein `w`. Die Systematik ist exakt symmetrisch zu ya:

| | ohne Schadda | mit Schadda |
|---|---|---|
| ya | هِيَ → `hiya` | هِيَّ → `hiyya` |
| waw | هُوَ → `houwa` | هُوَّ → `houwwa` |

```sql
SELECT id, darija, arabic_script, german FROM vocabulary
WHERE arabic_script ~ 'و[ًٌٍَُِْٰ]*ّ' AND darija !~ 'ww' ORDER BY id;
```

**Drei dokumentierte Ausnahmen, die dieser Check zu Recht meldet und die so bleiben:**

1. **Wortfinale Schadda** wird nicht transliteriert — `dhaw` ضَوّْ, `jaw` جَوّ, `qwi` قُوِّي. Gleiche Regel wie im Gemination-Check darüber.
2. **Die `shnou`-Familie** (7 Zeilen) — `shnoua` ← شْنُوَّا ist als bewusste Kontraktionsform dokumentiert, nicht als Fehler. **Aber:** die Familie trägt fünf verschiedene Schreibungen (`shnoua`, `shnou`, `shnouwa`, `shnowwa`, `shnouwwa`) und zwei Arabisch-Endungen (ـا/ـة). Eigener Durchgang, Block-Entscheidung wie bei `3ayshik`.
3. **`1622 t3awinni`** تعاوّني — die Schadda sitzt dort auf dem waw von تعاون, was nach Tippfehler im Arabischen aussieht (erwartet: تعاوني). Nicht als Transliterationsfehler behandeln, bevor das Arabische geklärt ist.

---

**`darija` gegen das eigene `arabic_script` zurückrechnen (seit 2026-09-13, Fehlalarmquote ~20 %).** Der schärfste Einzelcheck im Bestand und der einzige, der Zeichen für Zeichen vergleicht statt auf Vorkommen oder Anzahl zu prüfen. Er fängt eine Klasse, die **alle bisherigen Trainer-Regeln durchlassen**: `bathriq` für بطريق enthält ein `t` — es steckt im `th`. Vorkommens- und Anzahlprüfungen laufen daran vorbei, der Zeichenvergleich nicht.

```sql
WITH s AS (
  SELECT id, darija, german, arabic_script,
         public._arabic_to_chatalpha(arabic_script) AS abgeleitet,
         public._translit_skeleton(darija) AS sd,
         public._translit_skeleton(public._arabic_to_chatalpha(arabic_script)) AS sa
  FROM vocabulary
  WHERE arabic_script ~ '[ًٌٍَُِّْ]' AND darija IS NOT NULL
    AND darija !~ '[cvxp]'                                    -- Lehnwort-Schreibungen
    AND german !~* '(frz\.|franz\.|ital\.|engl\.|lehnwort)'
    AND darija !~ '[ ]' AND arabic_script !~ '[ ]'             -- PFLICHT: nur Einzelwoerter
    AND arabic_script !~ '[بتثجحخدذرزسشصضطظعغفقكلمنه](?![ًٌٍَُِّْٰ])'  -- PFLICHT: jeder Konsonant traegt eine Haraka
)
SELECT id, darija, german, arabic_script, abgeleitet FROM s WHERE sd <> sa ORDER BY id;
```

**Die beiden Pflichtfilter sind nicht optional.** Ohne sie steigt die Trefferzahl von 44 auf 224 und die Fehlalarmquote explodiert: bei Sätzen ist das Arabische meist nur teilweise vokalisiert, und ein unmarkiertes ي/و wird dann als Konsonant `y`/`w` gelesen. `et-tbib nsa7ni bir-ra7a` wird zu `et-tbyb nsa7ny balra7a` — das ist ein Artefakt der fehlenden Harakat, kein Fehler in der Zeile.

**Was die Treffer des ersten Laufs waren** (2026-09-13: 44 Treffer, ~35 echt, inzwischen auf 15 abgearbeitet — aktuelle Zahl: `qualitaets_checks`): fehlende oder überzählige Gemination in beide Richtungen (`nos` gegen نُصّ; umgekehrt fehlt bei `7orriyya` dem *Arabischen* die Schadda), falsche Konsonanten (`shadika` für شهادة, `odhkhol` mit `dh` gegen د), ق/ڨ-Uneinigkeit (`bagra`/`baqara`, `manga`/`manqa`), das `7h`-Muster (`msalh7a`). Fehlalarme: nicht als Lehnwort markierte Zeilen und Artikel, den die `darija` trägt und das `arabic_script` nicht.

**Blinder Fleck: der auslautende Vokal.** Der Skelettvergleich streicht Vokale — ein Wort, das auf einen Vokal endet, und eines, das nicht, haben dasselbe Skelett. `385 brika` gegen بْرِيكْ lief deshalb jahrelang als „ok" durch, obwohl die `darija` ein `-a` trägt, das im Arabischen nicht steht. Eigener Check ohne eigene Sicht — Stand über das SQL selbst ziehen:

```sql
SELECT id, darija, german, arabic_script, public._arabic_to_chatalpha(arabic_script) AS abgeleitet
FROM vocabulary
WHERE arabic_script ~ '[ًٌٍَُِّْ]' AND arabic_script !~ '\s' AND darija !~ '[ \-cvxp]'
  AND german !~* '(frz\.|franz\.|ital\.|engl\.|lehnwort)'
  AND arabic_script !~ '[بتثجحخدذرزسشصضطظعغفقكلمنه](?![ًٌٍَُِّْٰ])'
  AND public._translit_skeleton(darija) = public._translit_skeleton(public._arabic_to_chatalpha(arabic_script))
  AND right(regexp_replace(lower(darija),'[^a-z0-9]','','g'),1) ~ '[aeiou]'
    IS DISTINCT FROM
      right(regexp_replace(lower(public._arabic_to_chatalpha(arabic_script)),'[^a-z0-9]','','g'),1) ~ '[aeiou]';
```

Zwei bekannte Fehlalarmklassen darin: die hocharabische Perfekt-Endung ـَّ (هَزَّ gegen unser `hazz` — im Dialekt nicht gesprochen) und `-iy` gegen `-i` bei Berufsbezeichnungen. Letzteres ist allerdings meist ein **echter** Fund: `bankajiy`, `sbabtiy`, `farmasiy`, `mitrouw` tragen Ninjas Konvention (`iy` für ī, `ouw` für ū), nicht unsere — dieselbe Klasse wie `touwl`→`toul`.

**Richtung offen lassen.** Ein Treffer sagt „diese beiden Felder widersprechen sich", nicht welches falsch ist. Bei `7orriyya` war es das Arabische. Immer beide prüfen, nie automatisch die `darija` angleichen.

**Pro Wort statt pro Zeile — erweitert die Reichweite deutlich** (beim ersten Lauf 1.179 → 1.624 Zeilen, +38 %). Die Zeilen-Variante wirft einen ganzen Satz weg, sobald *ein* Wort unvokalisiert ist. Wortweise bleiben die vokalisierten Wörter prüfbar. Das braucht aber **zwei zusätzliche Filter**, sonst ist die Liste schlechter als die kürzere:

- **Status constructus ist kein Befund.** Unsere Konvention schreibt ة im Status constructus als `-t` (`jorret ed-dar`, `khobzet el-malla`, `warqit il-ma`), die Ableitung gibt immer `a`. Beide haben recht. Filter: `sd <> sa AND sd <> sa || 't'`.
- **Wortversatz erkennen und die ganze Zeile verwerfen.** Gleiche Wortzahl heißt nicht gleiche Zuordnung: bei `insha allah fi nje7 l awled` trennt das Arabische إن شاء in zwei Wörter, die `darija` schreibt `insha` als eines — ab da ist jedes Paar verschoben und meldet Unsinn (`[allah → sha]`, `[nje7 → fi]`). Eine einzelne Zeile erzeugte vier Falschmeldungen. Filter: eine Zeile mit mehr als einem Wort verwerfen, wenn **mehr als die Hälfte** ihrer prüfbaren Paare abweicht.

Die zweite Regel verwirft 40 Zeilen und nimmt damit bewusst Falsch-Negative in Kauf — eine Zeile mit echten Fehlern in der Mehrheit ihrer Wörter fällt mit heraus. Das ist der Preis dafür, dass die Liste benutzbar bleibt.

**Verbleibende Fehlalarme nach beiden Filtern (~5 %):** `fil` → `fi` (unsere `darija` verschmilzt Präposition und Artikel, das Arabische trennt sie) und vereinzelter Wortversatz, der die Hälfte-Regel überlebt.

**Der Check findet die Digraph-Gemination unabhängig wieder** — `mukhhu`→`mokhkhou`, `mshakhra`→`moshakhkhara`, `nsharshhar`→`nosharshir`, `mashi`→`mashshi` sind genau das `khh`/`shh`-Muster. Eine gute Bestätigung, dass beide Regeln dasselbe Phänomen beschreiben.

**Bedeutungs-Screen (`public.bedeutungs_screen`) — gebaut, gemessen, und ausdrücklich KEINE Massenliste (2026-09-13).** Er vergleicht unser `german` gegen TUNICOs `senses.de` — TUNICO ist die einzige Quelle mit deutschen Glossen; Ninja und Peace Corps haben nur Englisch, und unser `english` stammt zu ~85 % aus ihnen, ein Abgleich wäre **zirkulär**.

**Gemessene Fehlalarmquote: ~93 %** (an 30 gelesenen Zeilen etwa 2 echte Funde). Die Ursache ist nicht behebbar:

| Ursache | Anteil | Beispiel |
|---|---|---|
| Synonymie | ~40 % | „Geldschein" ←→ „Banknote", „Krämer" ←→ „Lebensmittelhändler" |
| echte Homonymie | ~43 % | `7ayya` „lebendig" ←→ „Schlange" — حية heißt beides |

**Kein Stringverfahren löst Synonymie**, und die echten Funde sehen aus wie die Homonyme — es gibt kein trennendes Signal. Eine Liste, in der auf einen echten Fund rund vierzehn Fehlalarme kommen, verbrennt mehr Vertrauen, als sie bringt — und sie wächst mit dem Bestand mit. Der Emphatika-Filter (ص/س unterscheiden über TUNICOs DMG-`lemma_orig`) entfernte beim Bau nur 5 von 76 Zeilen und rettet sie nicht.

**Richtiger Einsatz: Schritt 3 für die einzelne Vokabel.** Dort liest ein Mensch das Paar und entscheidet — da ist „TUNICO sagt etwas anderes" wertvoll, auch wenn es meistens Synonymie ist. Die Sicht liefert es fertig, statt dass man den Join jedes Mal neu baut. **Nie im Block korrigieren.**

**Was dabei entstanden und dauerhaft nützlich ist:**
- **Der Join-Schlüssel.** `replace(replace(lower(chatalpha),'ou','u'),'o','u')` auf beiden Seiten — unsere mechanische Ableitung und TUNICOs `lemma_chatalpha` liegen damit in derselben Vokalschreibung. **861 TUNICO-Treffer statt 597 per Skelett (+44 %)**, und ohne Wurzelkollisionen, weil die Vokale mitvergleichen. Gilt für jedes Nachschlagen, nicht nur für diesen Screen.
- **`public._de_trifft(a, b)`** — validierter Bedeutungsvergleich zweier deutscher Glossen, 14 von 14 konstruierten Fällen korrekt. Drei Wege, weil drei Phänomene: Gleichheit für kurze Wörter („wie?"/„wie?"), Teilstring für Komposita („Tüte" in „Papiertüte"), gleiche vier Anfangszeichen für Flexion („wäscht"/„waschen"). **Jede Fassung mit nur einem der drei fiel bei den anderen beiden durch** — Präfix allein scheitert an Komposita, Teilstring allein an Flexion, eine Längenschwelle wirft exakte Treffer weg.

### C · Regeln fürs Prüfen selbst

Keine Abfragen, sondern die Fallen und Methodenregeln. **Vor dem Bau einer neuen Prüfabfrage lesen** — drei der vier hier dokumentierten Fallen haben schon einmal einen kompletten Prüflauf stumm wertlos gemacht.

**Wichtig — Postgres-Regex-Falle:** Wortgrenze ist `\y`, NICHT `\b` (das ist in Postgres ein Backspace-Zeichen, matcht lautlos nichts). Bei jedem neuen Regex mit Wortgrenzen einmal kurz gegen ein Testwort verifizieren, bevor auf das Ergebnis (0 Treffer) vertraut wird.

**⚠️ Die Konsonanten-Regeln 5–16 in `TRANSLIT_RULES` prüfen VORKOMMEN, nicht ANZAHL (entdeckt 2026-09-12).** `v.ar && /ح/.test(v.ar) && !/7/.test(v.tr)` schweigt, sobald **irgendwo** im Feld ein `7` steht. Bei einwortigen Zeilen egal, bei Sätzen ein Loch: `hadh-dhert barsha 7ajet lil-7afla` (3 × ح, 2 × `7`) lief jahrelang als sauber durch, weil `7ajet` und `7afla` die Regel beruhigten — das falsch geschriebene erste Wort sah sie nie. Erster Lauf des Anzahl-Vergleichs: **11 Treffer, 10 echte Fehler, 1 Entscheidungsfall** — praktisch keine Fehlalarme. **Seit 2026-09-12 als Regel 22 in `TRANSLIT_RULES` live**, mit vorkompilierten Buchstabenpaaren in `CONSONANT_PAIRS` direkt neben `isLoanword`. Sie greift bewusst nur, wenn **beide** Seiten mindestens einmal vorkommen — fehlt der Gegenpart ganz, hat die zuständige Regel 5–16 schon angeschlagen; so meldet kein Fall doppelt.

```sql
-- Zaehlvergleich je Buchstabenpaar; in SQL umstaendlich, im Node-Harness natuerlicher.
-- Paare: ح→7, خ→kh, ع→3, ش→sh, ض→dh, ج→j, ز→z, غ→gh?, ق→[qgk], ه→h, س→s, [ظذ]→th
SELECT id, darija, arabic_script, german,
       (length(arabic_script) - length(replace(arabic_script,'ح',''))) AS ar_n,
       (length(darija)        - length(replace(darija,'7','')))        AS tr_n
FROM vocabulary
WHERE arabic_script LIKE '%ح%' AND darija LIKE '%7%'
  AND german !~* '(frz\.|franz\.|ital\.|engl\.|lehnwort)'
  AND (length(arabic_script) - length(replace(arabic_script,'ح','')))
    > (length(darija) - length(replace(darija,'7','')))
ORDER BY id;
```

**ت+ه an der Morphemgrenze wird `th` geschrieben — die Konvention existiert bereits.** 6 von 8 Bestandszeilen machen es so (`waqtha` وقتها, `shrobtha` شربتها, `mammethom`, `thimni` تْهِمِّني). Dass `th` auch der Digraph für ظ/ذ/ث ist, wird in Kauf genommen — gleiche Lage wie `tth` (Präfix-`t` vor `th`) und `thh` (`thhar` ظهر). Entschieden wird immer am `arabic_script`, nie an der Buchstabenfolge.

**⚠️ Der Schrägstrich nimmt eine Zeile komplett aus `chatalpha_konflikte` (entdeckt 2026-09-15).** Die Sicht filtert `v.darija !~ '/'`, weil eine Zweivarianten-Zeile nicht 1:1 gegen eine Ableitung zu stellen ist. Folge: **26 Zeilen mit Schrägstrich, davon 21 vokalisiert, waren nie gegen ihre eigene Ableitung geprüft** — und genau dort saßen echte Fehler (`1174` trug mit `lbes` das Verb statt des Partizips, `1457 bishfa` unterschlug die Sonnenbuchstaben-Assimilation, die das eigene بِالشِّفا trägt). Dieselbe Blindheit gilt für jede Prüfung, die auf `chatalpha_konflikte` aufsetzt. Schrägstrich-Zeilen brauchen einen eigenen Durchgang:

```sql
SELECT id, darija, arabic_script, german FROM vocabulary
WHERE darija ~ '/' AND arabic_script ~ '[\u064B-\u0652]' ORDER BY id;
```

**Hausstil bei zwei Varianten:** trägt die `darija` einen Schrägstrich, trägt ihn das `arabic_script` auch — 16 Zeilen machen es so (`2022 a7san / khir` → أَحْسَن / خِير). `checkAnswer()` splittet auf `/\s*\/\s*/`, beide Formen gelten also als richtige Antwort. Eine Mischform aus zwei Varianten in **einem** Wort ist immer ein Fehler (`894` trug قلامّات = Alif aus `qlām` plus Schadda aus `qlammāt`, in keiner Quelle belegt).

**Lateinisches `x` gehört nicht ins Hausalphabet** — 5 Zeilen tragen es, alle französische Lehnwörter (`taxi`, `taxist`, `jeux vidéos`). Lösung ist **nicht** Umschrift zu `ks`, sondern die Lehnwort-Markierung im Gloss (`(frz.)`), damit `isLoanword()` greift. `taxi` wird auch von Tunesiern so geschrieben.

**⚠️ Zeichenreihenfolge: Vokalzeichen stehen VOR der Schadda (entdeckt 2026-09-12).** Im Bestand steht die Schadda in **803** Zeilen nach dem Vokalzeichen (`ي` + Kasra + Schadda = `064a 0650 0651`) und nur in **16** davor. Die kanonische Unicode-Reihenfolge ist die umgekehrte. Folge: **jede Prüfregel der Form `<Buchstabe>ّ` verfehlt ~98 % des Bestands und meldet stillschweigend nichts** — dieselbe Falle wie `\b` statt `\y`. Immer die Vokalzeichen mit erlauben:
```sql
-- FALSCH: findet fast nichts
WHERE arabic_script ~ 'يّ'
-- RICHTIG:
WHERE arabic_script ~ 'ي[ًٌٍَُِْٰ]*ّ'
```
`arabic_script ~ 'ّ'` allein (Schadda irgendwo) ist von der Reihenfolge unabhängig und bleibt gültig.

**Skelett-Vergleich als Vorfilter für Liste C (seit 2026-09-12).** `public._translit_skeleton(darija)` gegen `public._arabic_skeleton(arabic_script)` trennt die Schadda-Verdachtsliste viel schärfer als die Regex allein: bei 69 Verdachtszeilen waren 48 skelett-uneinig und 21 einig; unter den einwortig-uneinigen waren nach Prüfung 28 von 35 echte Fehler. Als erste Spalte in jede Verdachtsabfrage aufnehmen und nach `ts <> as_` sortieren.

⚠️ **Systematischer Fehlalarm: der Artikel (gemessen 2026-09-13).** Von 646 Zeilen mit uneinigen Skeletten tragen **190 (29 %)** einen Artikel im `darija`. Die beiden Funktionen behandeln ihn unterschiedlich: `el-manshir` → `lmnshr`, aber المنشير → `mnshr`; `f-ed-dar` → `fddr`, aber في الدار → `fldr`. **Kein Datenfehler, ein Artefakt der beiden Skelett-Formeln.** Bei jedem Skelett-Treffer mit `el-`/`ed-`/`es-`… im `darija` zuerst prüfen, ob die Differenz nur an dieser Stelle sitzt — dann verwerfen. In einer Stichprobe von 10 fälligen Vokabeln waren **beide** Skelett-Treffer von dieser Art.

⚠️ **Blind für Halbvokale.** Beide Formeln streichen ا/و/ي. Ein fehlender oder überzähliger Langvokal im `arabic_script` ist für den Vergleich unsichtbar — `سكاكن` und `سكاكين` ergeben beide `skkn`. Diese Fehlerklasse findet nur der Quellenabgleich.

**Nach jeder Verbkorrektur die ganze Wurzelfamilie durchsehen (seit 2026-09-12).** Der Schadda-Check sieht nur vokalisierte Zeilen. Geschwisterformen mit unvokalisiertem `arabic_script` tragen denselben Fehler und bleiben unsichtbar — bei der `naththaf`/`7adhdhar`/`ba77ar`-Runde waren das 4 zusätzliche Zeilen (`ynathaf` ينظف, `tnathaf` تنظف, `n7adhar` نحضر, `ba7har` بحر), gefunden nur durch die gezielte Geschwistersuche. Gleicher blinder Fleck wie bei `4444 marroukiya`.

**`conjugation` immer mitziehen (seit 2026-09-12).** Eine `darija`-Korrektur an einer Verbzeile muss dieselbe Ersetzung in `conjugation` machen — auch für Formen, die keine eigene Vokabelzeile haben (`nathamna`, `ba7hru`, `ba7hret`). Sonst steht das `darija` der Zeile nicht mehr in ihrer eigenen Tabelle und der Verb-Selbstcheck meldet sie sofort. In der Gruppe-2-Runde betraf das 8 von 31 geänderten Zeilen. Vorher prüfen:
```sql
SELECT id, darija FROM vocabulary WHERE conjugation::text ~ '<alte_schreibung>';
```
Ebenso `course_lessons.vocab_lesson_refs` gegen die alte Schreibung prüfen (`darija:`-Teil referenziert über den Wortlaut, nicht über die id).

**Das `arabic_script` kann der Fehler sein, nicht die Transliteration (seit 2026-09-12).** Zwei Fälle aus Gruppe 2: `3023 bnin` „lecker" trug بَنِّين mit Schadda, TUNICO hat aber `bnīn` (langes ī, keine Gemination); `1087 skhan` „heiß (Pl.)" trug سَخَّان — das heißt „Boiler"/„erhitzen" (TUNICO `saxxan`), der Plural zu سْخُون ist سْخَان. Beide wären ohne Quellenprüfung als „fehlende Gemination" genau falsch herum korrigiert worden. Bei jedem Treffer, dessen Wurzel im Gloss nicht zum Arabischen passt, erst die Quelle fragen.

**Bekannte Fehlalarm-Fallen bei diesen Checks (nicht blind fixen):**
- Französische/italienische Lehnwörter — im `german`-Feld `(frz.)`/`(ital.)`/`(engl.)`/`(Lehnwort)` markieren statt Transliteration zu erzwingen
- غ/ق können dialektal zu "g"/"k" verschoben sein (ngammed, bargouth, bgar, maktou3) — kein Fehler, Regel akzeptiert das bereits
- Eigennamen/etablierte Lehnwörter (Mohamed, Hammam): konsequent transliterieren ("7 immer", Entscheidung 2026-08-06), keine Ausnahme
- "إن شاء الله"/"الله" verzerren Wortanzahl-/Artikel-Check — beide Regeln schließen das bereits aus
- Kontrahierte Artikelformen nach vokal-endender Präposition (`3al-kar`, `fis-sma`) sind korrekt

**Konsonanten-Gegenchecks ج/ز/ه/س** sind mit im SQL oben — Details zum ersten Testlauf (8 echte Bestandsfehler, u.a. systematische ه→7-Verwechslung): PRECEDENTS.md → Prüfungen nach jedem Import.

**Neue Checks aus Kurs-Grammatiknotizen ableiten — wiederkehrende Praxis, nicht einmalig.** `grammar_notes` in `course_lessons` (siehe COURSE_MODE.md) enthalten viele Regeln — nur solche aufnehmen, die rein aus `darija`/`german`/`arabic_script` ableitbar sind, OHNE Wortart-Wissen/Kontext (wie die Sonnenbuchstaben-Regel). Bei jeder neuen/überarbeiteten Lektion erneut versuchen. **Immer erst gegen den Bestand testen (Fehlalarmquote) und zeigen, bevor eine Regel dauerhaft in `TRANSLIT_RULES` übernommen wird.** Bisher 8 Kandidaten getestet, 4 in `TRANSLIT_RULES` übernommen (unmarkierte Feminina, "und"=immer "w-", Plural-Endung `-iou`, Konsonanten-Anzahlvergleich als Regel 22), 2 verworfen (Verb-Personalpräfix, m/f-Adjektivpaare=masc+"a" — beide an Dialekt-Realität gescheitert, Details: PRECEDENTS.md → Prüfungen nach jedem Import), 2 bewusst nur als SQL im Skill (Verb-Selbstcheck: gehört in den Prüfablauf, nicht in den Transliterations-Tab; Gemination: ~15 % Fehlalarme, würde den Tab dauerhaft rot halten).

**Der Prüf-Tab nennt seit 2026-09-13 die Grundgesamtheit.** Unter dem Ergebnis steht „N von M Vokabeln geprüft · R Regeln" — im Erfolgs- wie im Trefferfall. Grund: „0 Auffälligkeiten" ohne Nenner ist keine Aussage; ein halb geladener Bestand oder eine gekürzte Regelliste sähen identisch aus. Zusätzlich bricht `sbApiPaged()` jetzt hart ab, wenn die geladene Zeilenzahl nicht dem `count`-Header entspricht — ein still unvollständiger `ALL_VOCAB` verfälscht SRS-Queue, Duplikat-Check und Prüf-Tabs gleichermaßen.

**Faustregel aus diesen 8 Läufen:** Eine Regel gehört nur dann in `TRANSLIT_RULES`, wenn sie nahe an 0 % Fehlalarme liegt — der Wert der beiden Prüf-Tabs liegt darin, dass „0 Treffer" wirklich „sauber" heißt. Alles mit Restunschärfe bleibt SQL im Skill und wird als Verdachtsliste abgearbeitet.
