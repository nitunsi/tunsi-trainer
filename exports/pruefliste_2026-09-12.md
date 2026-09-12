# Prüfliste 2026-09-12 — Verb-Selbstcheck, Plural-Endung, Gemination

Ergebnis von Etappe 1 des Prüfplans. **Nichts davon ist in Supabase geändert worden** — das sind reine Fundlisten zum Abarbeiten (Etappe 2).

Die drei SQL-Abfragen dazu stehen in `skills/tunsi/SKILL.md` → „Datenqualitäts-Checks (SQL)" und lassen sich jederzeit neu laufen lassen.

| Liste | Treffer | Fehlalarmquote | Status |
|---|---|---|---|
| A — Verb-Selbstcheck (Zeile ≠ eigene `conjugation`-Tabelle) | 49 | 0 % (rein interner Vergleich) | zu entscheiden, welche Seite gewinnt |
| B — Plural-Endung `-iou`/`-eou`/`-aou` statt `-iw`/`-aw` | 13 | 0 % (13/13 echt) | klarer Regelverstoß, Tabelle/Regel hat recht |
| C — Schadda im Arabischen ohne Gemination in `darija` | 93 | ~15 % (Stichprobe 16 → 11 echt) | Verdachtsliste, Einzelprüfung nötig |
| D — Nebenfunde beim Erstellen der Listen | 51 | — | siehe unten |

---

## A · Verb-Selbstcheck (49)

**Regel:** Eine feste Verb-Zeile mit `conjugation`-Tabelle muss ihre eigene `darija`-Form in einer Zelle dieser Tabelle wiederfinden. Sonst lehrt die Karte eine andere Schreibung als das 🔠-Blatt daneben zeigt.

620 von 670 Zeilen bestehen den Check. Die 49 Ausnahmen zerfallen in sechs Klassen — und nur bei Klasse A1 und A2 ist die Entscheidung vorab klar.

### A1 · Plural `-ou` statt `-w` — Tabelle hat recht (6)

Verstoß gegen die Hausregel „Plural يفعلوا → `-iw`". Überschneidet sich vollständig mit Liste B.

| ID | Zeile lehrt | Tabelle zeigt | Bedeutung |
|---|---|---|---|
| 1049 | `yjiou` | `yjiw` | sie kosten / sie kommen |
| 1198 | `na3mlou` | `na3mlu` | wir machen |
| 1228 | `ninseou` | `ninsaw` | wir vergessen |
| 1234 | `yibdeou` | `yibdaw` | sie beginnen |
| 1235 | `yaqraou` | `yaqraw` | sie lesen / sie lernen |
| 1238 | `na7kiou` | `na7kiw` | wir sprechen / wir erzählen |

Bei 1238 steht außerdem ein Tabulator mitten im deutschen Gloss.

### A2 · Klammer-Zusatz im `darija`-Feld verhindert den Match (5)

Die Tabelle stimmt, das Feld ist unsauber: Quellen- und Wortart-Marker stehen im abgefragten Feld.

| ID | `darija` | sollte sein | Bedeutung |
|---|---|---|---|
| 1584 | `(ana) ktibt` | `ktibt` | ich schrieb |
| 1585 | `(enti) ktibt` | `ktibt` | du schriebst |
| 1689 | `fadd (fi3l)` | `fadd` | er langweilte sich |
| 2213 | `yitba3 (active)` | `yitba3` | er druckt |
| 3614 | `y7jem (derja)` | `y7jem` | er rasiert (Gloss-Tippfehler „rasierert") |

1584/1585 sind der dokumentierte Homographen-Fall (beide Formen identisch) — hier wäre `homonym_ok=true` der saubere Weg statt der Klammer. Bei 3614 fehlt zusätzlich der komplette `past`- und `imperative`-Block in der Tabelle.

### A3 · Vokal-Abweichung Zeile ↔ Tabelle (21) — **Einzelentscheidung nötig**

Hier steht Hausschreibung gegen TUNICO-Übernahme. SKILL.md warnt ausdrücklich, dass TUNICOs `chatalpha` andere Vokale nutzt als unsere Imala-Regeln (`ytayyib` vs. unser `ytayyeb`) — und genau dieses Paar taucht hier auf. **Nicht mechanisch entscheidbar, pro Zeile prüfen.**

| ID | Zeile | Tabelle | Bedeutung |
|---|---|---|---|
| 526 | `tnijjem` | `tnajjim` | du kannst / es ist möglich |
| 576 | `eqif` | `wqif` (past) | Halt an! (Imperativ) |
| 732 | `youja3` | `yuja3` | es tut weh |
| 1042 | `nsakker` | `nsakkar` | ich schließe |
| 1658 | `kammal` | `kammil` | er beendete |
| 2222 | `ybaddal` | `ybaddil` | er wechselt |
| 2223 | `ykammal` | `ykammil` | er beendet |
| 2849 | `ykasser` | `ykassar` | er zerbricht / zerkleinert |
| 3052 | `osket` | `sket` / `uskut` | Sei still! |
| 3432 | `y3jeb` | `yi3jeb` | er wundert sich / es gefällt ihm |
| 3434 | `yjbed` | `yijbid` | er zieht / er reißt |
| 3435 | `yrodd` | `yrudd` | er antwortet / schließt |
| 3443 | `ylawwej` | `ylawwij` | er sucht / er schaut |
| 3450 | `ytkallam` | `yitkallam` | er spricht / er redet |
| 3781 | `y7ib` | `y7eb` | er mag / er liebt |
| 3827 | `y3awid` | `y3awwed` | wiederholen *(Gloss im Infinitiv!)* |
| 4028 | `ytayyib` | `ytayyeb` | er kocht etw. |
| 4035 | `yilqa` | `yalqa` | er findet |
| 4045 | `yijra` | `yijri` | es geschieht |
| 4168 | `ya3raf` | `ya3rif` | er weiß / erfährt / kennt |
| 4228 | `yqaddim` | `yqaddem` | er geht vor / stellt vor |
| 4360 | `ynsa7` | `yinsa7` | er rät, gibt einen Rat |
| 4394 | `qaddim` | `qaddem` | er ging vor / stellte vor |

Bei `3781 y7ib` und `4028 ytayyib` nennt SKILL.md die Tabellenform (`y7eb`, `ytayyeb`) ausdrücklich als die unsrige — dort ist die Zeile zu korrigieren.

### A4 · Fehlende Gemination in der Zeile (3)

| ID | Zeile | Tabelle | Bedeutung |
|---|---|---|---|
| 1118 | `yit3asha` | `yit3ashsha` | er isst zu Abend *(Gloss: „Er ist zu abend")* |
| 1319 | `t3ashet` | `t3ashshat` | sie aß zu Abend |
| 1839 | `tit3asha` | `tit3ashsha` | sie isst zu Abend |

Dreimal dasselbe Verb تْعَشَّى — die Gemination fehlt durchgängig in den Zeilen, steht aber in der Tabelle. Überschneidet sich mit Liste C.

### A5 · Vergangenheits-Endung und Personalform (4)

| ID | Zeile | Tabelle | Bedeutung |
|---|---|---|---|
| 1315 | `tfarrjit` | `tfarrjet` | sie schaute |
| 1383 | `qalit` | `qalet` | sie sagte |
| 1376 | `qa3dt` | `q3adt` (1sg) | ich blieb / ich saß |
| 1385 | `ista3mlit` | `ista3mil` (3sg m) | sie benutzte |

**Wichtig — keine globale Vereinheitlichung:** Die Endungen `-it` / `-et` / `-at` sind in den Tabellen vermutlich morphologisch bedingt (starke Verben `3amlit`, hohle `qalet`, defektive `qrat`), nicht zufällig inkonsistent. Verteilung über alle Tabellen: 293× `-it`, 238× `-et`, 115× `-at`. Eine Sammelkorrektur würde korrekte Formen kaputtmachen.

### A6 · Phrase mit angehängter Verbtabelle (10)

Die Tabelle passt zum Verb *im Satz*, aber die Zeile ist eine Phrase oder Grußformel. Kein Fehler im engeren Sinn — der 🔠-Button zeigt hier eine Vollkonjugation auf einer Redewendung.

| ID | Zeile | angehängte Tabelle |
|---|---|---|
| 752 | `3ayyit l-el-7imaya` — Ruf die Feuerwehr | `y3ayyit` |
| 753 | `3ayyit l-esh-shorta` — Ruf die Polizei | `y3ayyit` |
| 1913 | `3ayyit lil wled` — ruf die Kinder | `y3ayyit` |
| 2646 | `3ayyit lil-is3af!` — Ruf den Krankenwagen! | `y3ayyit` |
| 851 | `3ayshik` — danke; gern geschehen | `y3ayyish` |
| 1392 | `y3ayshek` — Bitte | `y3ayyish` |
| 3383 | `qarra / 3allem` — er lehrte / unterrichtete | `yqarri` |
| 3420 | `yqarri / y3allem` — er lehrt / unterrichtet | `yqarri` |

3383 und 3420 verstoßen zusätzlich gegen „Schrägstrich-Muster sofort aufteilen" — das sind zwei verschiedene Verben in einem Feld (siehe Liste D).

Entscheidung offen: Tabelle an Phrasen dranlassen (schadet nichts, laut SKILL.md „richtet keinen Schaden an") oder entfernen.

---

## B · Plural-Endung `-iou` / `-eou` / `-aou` (13)

**Regel (SKILL.md → Vokale & häufige Wörter):** Plural يفعلوا = `-iw`, nie `-iou`. Bisher ohne Prüfregel. Alle 13 Treffer echt, keine Fehlalarme.

| ID | ist | soll | Bedeutung |
|---|---|---|---|
| 951 | `imshiou` | `imshiw` | geht! (Plural) |
| 1049 | `yjiou` | `yjiw` | sie kosten / sie kommen |
| 1187 | `nimshiou` | `nimshiw` | wir gehen |
| 1188 | `timshiou` | `timshiw` | ihr geht |
| 1189 | `yimshiou` | `yimshiw` | sie gehen |
| 1228 | `ninseou` | `ninsaw` | wir vergessen |
| 1234 | `yibdeou` | `yibdaw` | sie beginnen |
| 1235 | `yaqraou` | `yaqraw` | sie lesen / sie lernen |
| 1238 | `na7kiou` | `na7kiw` | wir sprechen / wir erzählen |
| 1867 | `mazeltou ta7kiou` | `mazeltou ta7kiw` | ihr redet noch |
| 1930 | `imshiou aghslou ydikom` | `imshiw aghslu ydikom` | geht wascht eure Hände |
| 1932 | `yimshiou yzourou` | `yimshiw yzuru` | sie gehen besuchen |
| 2899 | `hayya nemshiou naklou` | `hayya nemshiw naklu` | Lass uns essen gehen |

Bei 1930/1932/2899 steht die Endung mehrfach im selben Feld — dort jedes Vorkommen prüfen, nicht nur das erste. Diese Regel ist seit heute als 21. Eintrag in `TRANSLIT_RULES` (trainer.html) aktiv, taucht also auch im Prüf-Tab auf.

---

## C · Schadda ohne Gemination (93) — Verdachtsliste

**Regel (SKILL.md → Lautlehre, Regel 2):** Gemination muss sich im Doppelbuchstaben spiegeln. Bisher ohne Prüfregel.

Rohfassung hatte 194 Treffer. Nach drei Ausschlüssen — Digraphen `sh/th/kh/gh/ch/dh` als Einheit, Artikel-Assimilation (auch nach Präposition: `lel-`, `bel-`, `fil-`), wortfinale Schadda — bleiben 93. **Stichprobe 16 von Hand beurteilt: 11 echt, 5 Fehlalarme (~15 %).** Das ist eine Verdachts-, keine Fehlerliste.

### Klare Fälle (Auswahl aus der Stichprobe)

| ID | arabic_script | ist | vermutlich richtig |
|---|---|---|---|
| 1326 | حَضَّرْت | `7adhert` | `7addhert` |
| 1394 | تْفَضَّل | `tfadhal` | `tfadhdhal` |
| 2840 | قَشَّر | `qasher` | `qashsher` |
| 2848 | يَقَشِّر | `yqasher` | `yqashsher` |
| 2861 | ذِبَّانَة | `thbana` | `thebbana` |
| 2860 | نَمُّوسَةْ | `nemousa` | `nemmousa` |
| 3184 | مُعَمَّرَة | `m3amra` | `m3ammra` |
| 3185 | مُشَمَّرَة | `mshamra` | `mshammra` |
| 3893 | تَحِيَّة | `ta7iya` | `ta7iyya` |
| 4464 | مُضَيِّف | `mdhayef` | `mdhayyef` |
| 2811 | رْوَيِّق | `rwayeq` | `rwayyeq` |
| 2515 | قُلَيِّب | `gleyeb` | `gleyyeb` |
| 3290 | يِتْقَلَّى | `yitqla` | `yitqalla` |

### Auffällige Gruppe: Nationalitäten-Feminina (8)

`3629 jzayriya` · `3632 maghribiya` · `3635 muritaniya` · `3638 libiya` · `3653 swisriya` · `3655 3arbiya` · `3670 isbaniya` · dazu die Plurale `4105 sudaniyin` · `4106 lubnaniyin`

Alle mit ـِيَّة (Schadda auf ي), alle ohne Doppel-`y` in der Transliteration. Das ist eine systematische Entscheidung, keine Einzelfehler — entweder alle auf `-iyya`/`-iyyin` oder bewusst alle so lassen. **Als Block entscheiden, nicht einzeln.**

### Auffällige Gruppe: Verbpaare mit Form-II-Gemination (10)

`1295 nathfit` / `1296 nathaft` · `1323 taybit` / `1324 tayebt` · `1335 nathmit` / `1336 nathamt` · `2261 7aqaq` / `2262 y7aqeq` · `2609 yitza3ab` / `2610 tza3ab` · `1648 7addhar` / `2218 y7addhar`

Jeweils Präsens- und Vergangenheitsform desselben Verbs, beide gleich behandelt. Wenn korrigiert wird, dann paarweise — sonst laufen die Geschwisterformen auseinander.

### Bekannte Fehlalarm-Muster in dieser Liste

- **Kontraktionsformen**: `837 shnoua?`, `2433 shnoua tikhdem?`, `3206 shnou ta3mel?`, `3197 taw nerja3` — das Arabische schreibt die volle Form, unsere Transliteration die kontrahierte. Kein Fehler.
- **Mehrwortige Phrasen**, bei denen die Schadda in einem anderen Wort sitzt als dem, das man prüfen würde: `1468`, `2529`, `2891`, `3037`, `3721`, `4191`.
- **Fremdwörter ohne Lehnwort-Markierung**: `416 rouba` (رُوبَّا, Kleid) — wäre mit `(frz.)` im Gloss automatisch ausgeschlossen.

### Echte Nebenfunde in dieser Liste (nicht Gemination)

- **2330** `jneyni` „Gärtner" mit `arabic_script` جَنَّانْ — das ist ein anderes Wort (جَنَّان vs. جَنَّايْنِي). Arabisch oder Transliteration ist falsch, nicht nur die Gemination.
- **1087** `skhan` „heiß (Plural)" mit سَخَّان — سَخَّان ist der Boiler/Warmwasserbereiter, nicht das Adjektiv. Bedeutung prüfen.
- **2348** `bi etayara` „mit dem Flugzeug" — Artikelform sieht kaputt aus (`bi etayara` statt `bit-tayara`).
- **3673** `el3ab` mit لّعَبْ — Schadda auf dem ersten Buchstaben, laut Lautlehre-Regel 3 ungültig.
- **2538** `nifli` „Ich bin pleite (Variante)" mit نِفْلِّي — Schadda auf ل, aber auch die Grundform wirkt unklar.

---

## D · Nebenfunde (51)

Beim Erstellen der Listen mitgefallen, jeweils mit eigener Abfrage belegt.

### D1 · Präsens-Verben mit Infinitiv-Gloss (9)

Verstoß gegen „Präsens-Verben: deutsches Gloss immer 3. Person Singular, nie Infinitiv". Diese Prüfung hatte ich in der ersten Analyse mit `\b` statt `\y` geschrieben und deshalb fälschlich mit „0 Treffer" gemeldet — die Postgres-Falle, vor der SKILL.md selbst warnt.

`3679 yib3id` „weggehen, sich entfernen" · `3816 yijbid` „ziehen / abheben (Geld)" · `3818 yukhruj` „hinausgehen" · `3821 yudkhul` „eintreten, hineingehen" · `3822 ysallif` „ausleihen, borgen" · `3824 yshuf` „sehen" · `3827 y3awid` „wiederholen" · `3845 y7utt` „legen / stellen / setzen" · `3850 yistaqbil` „empfangen"

Ohne `topic`-Filter (also inkl. Alt-Topics und NULL) sind es **19**. Auffällig: die IDs liegen dicht beieinander — das sieht nach einem einzelnen Import-Batch aus.

### D2 · Schrägstrich im `darija`-Feld (19)

Verstoß gegen „Einträge mit Schrägstrich-Muster sofort aufteilen". Der Duplikat-Check normalisiert den ganzen String inkl. „/" zu einem Key und übersieht dadurch bestehende Einzelform-Einträge.

`465` · `477` · `504` · `600` · `997` · `1016` · `1457` · `1460` · `1552` · `2022` · `2179` · `2423` · `2729` · `2731` · `2858` · `2859` · `3383` · `3420` · `4107`

Nicht alle sind gleich zu behandeln: `1016 hotel / util` und `2858 routila / 3ankbout` sind echte Synonympaare (zwei Wörter, eine Bedeutung), `3383 qarra / 3allem` sind zwei verschiedene Verben, `2731 emshi lqoddem / toul` sind zwei verschiedene Befehle. `arabic_script` enthält bei 20 Zeilen ebenfalls „/" — bei `847 fi lamen` und `1362 7allit` sogar, ohne dass `darija` eines hat.

### D3 · Lateinische Zeichen im `arabic_script` (4)

| ID | `arabic_script` | Bedeutung |
|---|---|---|
| 1473 | `aba babab` | Du siehst gut aus! — komplett lateinisch, Platzhalter |
| 529 | `باش (Zweck)` | um zu / damit — Klammer-Erläuterung im Feld |
| 471 | `بش  (Zukunftsmarker)` | wird — dito, plus doppeltes Leerzeichen |
| 1392 | `يْعَيِّشِك (b...)` | Bitte — dito |

### D4 · Konjugationstabellen (19)

- **3 Verbgruppen mit auseinandergelaufenen Tabellen** — verstößt gegen „identisch auf allen Zeilen".
- **35 Zeilen mit unvollständiger Tabelle**: 22 ohne `past`, 26 ohne `imperative`, 4 ohne `present`, 29 mit weniger als 7 Personen im Präsens. (Überschneidungen, deshalb 35 Zeilen gesamt.)
- **2213** und **3614** haben `past: null` — die beiden ohne `tunico_verb_id`.

---

## Was als Nächstes entschieden werden muss

1. **A3 (21 Zeilen)** — Zeile oder Tabelle? Bei `y7ib`/`y7eb` und `ytayyib`/`ytayyeb` entscheidet SKILL.md bereits für die Tabelle; der Rest braucht Einzelprüfung.
2. **A6 (10 Zeilen)** — Verbtabellen an Phrasen dranlassen oder entfernen?
3. **C-Nationalitäten (8+2)** — `-iya` oder `-iyya` als Hausform? Als Block.
4. **D2 (19 Zeilen)** — welche Schrägstriche sind Synonyme (bleiben) und welche gehören aufgeteilt?
5. **Portionierung** — alles auf einmal bestätigen oder in Häppchen nach Fehlerart?

Neue Vokabelzeilen (48 fehlende Verbformen) sind laut Absprache in Ordnung, aber **vorher fragen** — und getrennt davon fragen, **ob sie fällig gesetzt** werden sollen.
