# Prüfliste 2026-09-12 — Verb-Selbstcheck, Plural-Endung, Gemination

Ergebnis von Etappe 1 des Prüfplans, seit 2026-09-12 teilweise abgearbeitet.

> **Stand:** ✅ **Klasse A komplett** (A1–A6), **Liste E**, **Runde 5 (D2)** bis auf einen zurückgestellten Fall. Offen: Runde 6 (Gemination, 93) und zwei Nachträge, siehe unten.
>
> Bestand: **3.790 Vokabeln** (3.812 minus 24 Dubletten, plus 2 aus Aufteilungen). Verb-Selbstcheck **26** (vorher 49). Regel 21 (`-iou`): **0** (vorher 13). Vokal-Dubletten Stufe A: **2** (vorher 10, beide bewusste Fehlalarme). Duplikat-Check: 0.

Die drei SQL-Abfragen dazu stehen in `skills/tunsi/SKILL.md` → „Datenqualitäts-Checks (SQL)" und lassen sich jederzeit neu laufen lassen.

| Liste | Treffer | Fehlalarmquote | Status |
|---|---|---|---|
| A — Verb-Selbstcheck (Zeile ≠ eigene `conjugation`-Tabelle) | 49 → **26** | 0 % (rein interner Vergleich) | A1–A4 erledigt, A5/A6 offen |
| B — Plural-Endung `-iou`/`-eou`/`-aou` statt `-iw`/`-aw` | 13 → **0** | 0 % (13/13 echt) | ✅ erledigt 2026-09-12 |
| C — Schadda im Arabischen ohne Gemination in `darija` | 93 | ~15 % (Stichprobe 16 → 11 echt) | Verdachtsliste, Einzelprüfung nötig |
| D — Nebenfunde beim Erstellen der Listen | 51 | — | siehe unten |
| E — Vokal-Dubletten im Bestand | 177 → **10** brauchbar | 20 % (8 von 10 echt) | ✅ erledigt 2026-09-12 |

---

## A · Verb-Selbstcheck (49)

**Regel:** Eine feste Verb-Zeile mit `conjugation`-Tabelle muss ihre eigene `darija`-Form in einer Zelle dieser Tabelle wiederfinden. Sonst lehrt die Karte eine andere Schreibung als das 🔠-Blatt daneben zeigt.

620 von 670 Zeilen bestehen den Check. Die 49 Ausnahmen zerfallen in sechs Klassen — und nur bei Klasse A1 und A2 ist die Entscheidung vorab klar.

### ✅ A1 · Plural `-ou` statt `-w` — erledigt 2026-09-12 (6)

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

### ✅ A2 · Klammer-Zusatz im `darija`-Feld — erledigt 2026-09-12 (5)

Die Tabelle stimmt, das Feld ist unsauber: Quellen- und Wortart-Marker stehen im abgefragten Feld.

| ID | `darija` | sollte sein | Bedeutung |
|---|---|---|---|
| 1584 | `(ana) ktibt` | `ktibt` | ich schrieb |
| 1585 | `(enti) ktibt` | `ktibt` | du schriebst |
| 1689 | `fadd (fi3l)` | `fadd` | er langweilte sich |
| 2213 | `yitba3 (active)` | `yitba3` | er druckt |
| 3614 | `y7jem (derja)` | `y7jem` | er rasiert (Gloss-Tippfehler „rasierert") |

1584/1585 sind der dokumentierte Homographen-Fall (beide Formen identisch) — beide wurden auf `ktibt` gesetzt und mit **`homonym_ok=true`** markiert, dazu das `arabic_script` von der Klammer befreit (`كتِبت`). Bei 1689 und 3614 wurde der Gloss gleich mitkorrigiert („er langweilte sich", „er rasiert" statt „rasierert").

**Offen bei 3614:** `arabic_script` ist `يحجام` — unvokalisiert und vermutlich falsch (für `y7jem` erwartet man eher يِحْجِم). Dazu fehlen `past` und `imperative` in der Konjugationstabelle, und 2 von 3 Zielzeilen des Verbs existieren nicht. Die Zeile bleibt deshalb `flagged`.

### A3 · Vokal-Abweichung Zeile ↔ Tabelle (23) — **überwiegend versteckte Dubletten**

**Nachtrag 2026-09-12, wichtiger als die ursprüngliche Einordnung:** Für jede dieser 23 Zeilen wurde geprüft, ob die andere Schreibung auch als eigene Vokabel existiert. **Bei 14 von 23 existiert sie.** Das sind keine Schreibvarianten, sondern Dubletten — genau die Vokal-Varianten-Falle aus PRECEDENTS.md, die `normKey()` nicht findet, weil dort keine Vokale gefaltet werden.

Die Frage ist damit nicht „welche Schreibung ist richtig", sondern **„zusammenlegen oder beide behalten"** — und beim Zusammenlegen greift das Standard-Merge-Vorgehen (die Zeile mit Lernfortschritt behalten, Bedeutungsnuance vorher in `german` übernehmen, Verweise in `vocab_lesson_refs` umbiegen).

#### ✅ Die 14 Dubletten-Paare — ausgeführt am 2026-09-12

Bestätigt und in dieser Reihenfolge geschrieben:

1. **Gloss-Ergänzungen** an den bleibenden Zeilen: 404 „er mag / er liebt" · 2222 „er wechselt / er verändert" · 2223 „er beendet / er macht fertig / er erledigt" · 1219 „er spricht / er redet" · 2226 „er zerbricht / er zerkleinert".
2. **Zwei echte Korrekturen:** 3827 `y3awid` → `y3awwed` mit Gloss „er wiederholt / er tut es nochmal" (`translit_skeleton` neu berechnet); 3816 Infinitiv-Gloss repariert → „er zieht / er reißt / er hebt ab (Geld)".
3. **3385 `qaddem`** von `lesson_id` 46 (Präsens) nach 47 (Vergangenheit) umgehängt.
4. **7 Kurs-Übungen umgehängt** (Fremdschlüssel ist `NO ACTION`, ein direktes DELETE wäre gescheitert): Übungen 388/401 → 1219, 283/290 → 4168, 379/392/446 → 404.
5. **12 Verweise in `vocab_lesson_refs`** über 8 Lektionen neu aufgebaut — ersetzt, bzw. ersatzlos entfernt wo die Ziel-ID schon in der Liste stand (L2 bei 3450→1219 und 3781→404). Ergebnis geprüft: 0 tote Verweise, 0 doppelte IDs, alle 13 Lektionen im gültigen `ids:…|darija:…`-Format.
6. **14 DELETE.** `progress` und `vocabulary_review` per CASCADE mit, `review_log` per SET NULL (44 Protokollzeilen haben ihre Wortzuordnung verloren, bleiben aber als Zeilen für die Tagesstatistik erhalten).

#### ✅ Nachzug: Zeile und Tabelle angeglichen (2026-09-12)

Nach dem Merge widersprachen **3** der bleibenden Zeilen weiterhin ihrer eigenen `conjugation`-Tabelle (nicht 12 — die Zahl war eine Fehlschätzung aus dem Gesamtstand des Selbstchecks). Bei allen dreien entscheidet das vokalisierte `arabic_script`, nicht die Tabelle allein:

| ID | Zeile war | Tabelle sagt | `arabic_script` | Ergebnis |
|---|---|---|---|---|
| 2222 | `ybaddal` | `ybaddil` | يُبَدِّل — Schadda + **Kasra** | Zeile → `ybaddil` |
| 2223 | `ykammal` | `ykammil` | يُكَمِّل — Schadda + **Kasra** | Zeile → `ykammil` |
| 4168 | `ya3raf` | `ya3rif` | يَعْرَفْ — **Fatha** | **Tabelle** → `ya3raf` |

Bei 2222/2223 bestätigt das Arabische die Tabelle — dort wurde die Zeile nachgezogen (`translit_skeleton` neu berechnet, keine neuen Dubletten entstanden, weil die konkurrierende Schreibung vorher gelöscht wurde).

**4168 ist die Ausnahme:** Dort trägt das Arabische Fatha, die Tabelle aber durchgängig `-i-` (`ya3rif`/`ta3rif`/`na3rif`) — die TUNICO-Handschrift, vor deren 1:1-Übernahme SKILL.md ausdrücklich warnt. Hier wurde die **Tabelle** korrigiert: vier Zellen des Präsens-Blocks auf `-a-` (`ya3raf`, `ta3raf` ×2, `na3raf`). Die Pluralformen (`na3rfu`, `ta3rfu`, `ya3rfu`) elidieren den Stammvokal und blieben unverändert.

**Merkregel daraus:** „Tabelle ist führend" gilt nur, solange das vokalisierte `arabic_script` nicht widerspricht. Es ist der höhere Anker — die Tabellen stammen überwiegend aus TUNICOs `forms_chatalpha`, das andere Vokale nutzt als unsere Imala-Regeln.

Verb-Selbstcheck danach: **35 Treffer** (49 → 38 → 35), davon **0** aus dem A3-Merge. Duplikat-Check über den ganzen Bestand: 0.

#### Die 14 Paare im Detail

| behalten | löschen | Begründung |
|---|---|---|
| **404** `y7eb` — er mag · L6 | 3781 `y7ib` · L5 | höherer Level; SKILL.md nennt `y7eb` als unsere Form |
| **405** `ytayyeb` — er kocht · L6, 13 Versuche | 4028 `ytayyib` · L4 | dito, SKILL.md nennt `ytayyeb` |
| **2222** `ybaddal` — er wechselt · L6 | 4306 `ybaddil` · L5 | höherer Level |
| **2223** `ykammal` — er beendet · L6 | 4174 `ykammil` · L5 | höherer Level |
| **1219** `yitkallam` — er spricht · L6 | 3450 `ytkallam` · L3 | höherer Level |
| **3647** `yqaddem` — er präsentiert · L5, 21 Versuche | 4228 `yqaddim` · L4 | mehr Fortschritt |
| **2226** `ykassar` — er zerbricht · L5, 14 Versuche | 2849 `ykasser` · kein Fortschritt | nur eine ist gelernt |
| **3385** `qaddem` — er präsentierte · L5 | 4394 `qaddim` · kein Fortschritt | dito |
| **4178** `kammil` — er beendete · L5 | 1658 `kammal` · kein Fortschritt | dito |
| **2202** `yinsa7` — er rät · L2, 22 Versuche | 4360 `ynsa7` · kein Fortschritt | dito (2202 ist nebenbei ein Leech) |
| **3816** `yijbid` — ziehen · L5, 12 Versuche, Audio | 3434 `yjbed` · kein Fortschritt | Audio + Fortschritt; **Gloss auf „er zieht" korrigieren** (steht im Infinitiv) |
| **4168** `ya3raf` — er weiß · L5, Audio | 3723 `ya3rif` · L5 | Gleichstand, Audio gibt den Ausschlag |
| **4170** `yalqa` — er findet · L4, 8 Versuche | 4035 `yilqa` · L4, 4 Versuche | mehr Versuche |
| **3827** `y3awid` · L5, 10 Versuche | 3442 `y3awwed` · kein Fortschritt | **Sonderfall, siehe unten** |

**Sonderfall `y3awwed`:** Die gelernte Zeile (3827) trägt die falsche Form — die Gemination fehlt (عوّد hat Schadda) — und zusätzlich einen Infinitiv-Gloss. Die korrekte Form (3442) ist ungelernt. Vorschlag: 3827 behalten, auf `y3awwed` / „er wiederholt" korrigieren, **danach** 3442 löschen. Reihenfolge wichtig — das ist der in PRECEDENTS.md dokumentierte Fall „Korrektur erzeugt Dublette".

**Ausdrücklich keine Dublette:** `4045 yijra` „es geschieht" vs. `4039 yijri` „er läuft" — verwandte Wurzel, verschiedene Bedeutung. Beide behalten.

#### Die restlichen 8 — dort ist es wirklich „Zeile oder Tabelle"

`526 tnijjem` · `576 eqif` · `732 youja3` · `1042 nsakker` · `3052 osket` · `3432 y3jeb` · `3435 yrodd` · `3443 ylawwej`

Kein Zwilling im Bestand, also kein Beleg für eine Seite. **Eine generelle Regel ist nicht ableitbar** — der Bestand selbst ist beim Stammvokal von Form-II-Verben uneinheitlich:

| Stammvokal | Anzahl | Beispiele |
|---|---|---|
| `-a-` | 51 | `ysakkar`, `ykhallas`, `yfakkar`, `yqarrar` |
| `-e-` | 27 | `ysallem`, `yqaddem`, `ynaqqes`, `y7arrek` |
| `-i-` | 20 | `ykammil`, `ynajjim`, `ysallif`, `y3ammir` |

Eine Vereinheitlichung würde ~100 Zeilen anfassen und wäre eine eigene, große Entscheidung. **Empfehlung: diese 8 vorerst stehen lassen** — für sich genommen nicht falsch, nur uneinheitlich mit ihrer Tabelle.

#### Ursprüngliche Einordnung (gilt weiterhin für die 8 oben)

Hier steht Hausschreibung gegen TUNICO-Übernahme. SKILL.md warnt ausdrücklich, dass TUNICOs `chatalpha` andere Vokale nutzt als unsere Imala-Regeln (`ytayyib` vs. unser `ytayyeb`).

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

### ✅ A4 · Fehlende Gemination in der Zeile (3) — erledigt 2026-09-12

| ID | Zeile | Tabelle | Bedeutung |
|---|---|---|---|
| 1118 | `yit3asha` | `yit3ashsha` | er isst zu Abend *(Gloss: „Er ist zu abend")* |
| 1319 | `t3ashet` | `t3ashshat` | sie aß zu Abend |
| 1839 | `tit3asha` | `tit3ashsha` | sie isst zu Abend |

Dreimal dasselbe Verb تْعَشَّى — die Gemination fehlt durchgängig in den Zeilen, steht aber in der Tabelle. Überschneidet sich mit Liste C.

✅ **1319 → `t3ashshat`** und **1839 → `tit3ashsha`** erledigt am 2026-09-12.

✅ **1118 — war ein verdeckter Merge, ausgeführt 2026-09-12.** Die Korrektur hätte eine Dublette erzeugt: `yit3asha` → `yit3ashsha` kollidiert mit der bestehenden Zeile **4029 `yit3ashsha` „er isst zu Abend"**. Das ist derselbe Fall wie in PRECEDENTS.md → `yisma7`/`yisma3`: erst prüfen, ob die *korrigierte* Schreibung schon existiert.

| | ID | darija | german | arabic_script | Level | Versuche |
|---|---|---|---|---|---|---|
| **behalten?** | 1118 | `yit3asha` | Er ist zu abend | يتعشى *(unvokalisiert)* | **6** | **16** |
| **löschen?** | 4029 | `yit3ashsha` | er isst zu Abend | يِتْعَشَّى *(vokalisiert)* | 5 | 5 |

Ausgeführt: **1118 behalten** (mehr Fortschritt), dabei `darija` → `yit3ashsha`, `german` → „er isst zu Abend", das **bessere vokalisierte `arabic_script` von 4029 übernommen** (يِتْعَشَّى), dazu `english='to dine'` (fehlte bei 1118) und das Legacy-Topic `" (L14)"` auf `Verben-Konjugation` gesetzt. Skelette neu berechnet. Der einzige Verweis auf 4029 (Lektion 7) wurde auf 1118 umgebogen — Kurs-Übungen hingen keine daran. Danach 4029 gelöscht.

**Lehre für den Prüfablauf:** Eine Gemination-Korrektur ist nie „nur eine Schreibkorrektur". Vor jedem Ändern von `darija` prüfen, ob die *korrigierte* Schreibung im Bestand schon existiert — sonst entsteht aus einer Reparatur eine Dublette.

### ✅ A5 · Vergangenheits-Endung und Personalform (4) — erledigt 2026-09-12

| ID | Zeile | Tabelle | Bedeutung |
|---|---|---|---|
| 1315 | `tfarrjit` | `tfarrjet` | sie schaute |
| 1383 | `qalit` | `qalet` | sie sagte |
| 1376 | `qa3dt` | `q3adt` (1sg) | ich blieb / ich saß |
| 1385 | `ista3mlit` | `ista3mil` (3sg m) | sie benutzte |

**Die Vermutung „morphologisch bedingt" ist am 2026-09-12 belegt worden.** Auszählung der „sie …"-Vergangenheitsformen im Bestand: **36× `-it`, ausnahmslos starke Verben** (`3amlit`, `3arfit`, `7adhrit`, `baddlit`, `dakhlit`, `ghaslit`) gegen **9× `-et`, ausnahmslos schwache Verben** — hohl, defektiv oder geminiert (`qamet`, `jet`, `mshet`, `bdet`, `hazzet`, `wallet`). Kein einziger Gegenbeleg. Eine Sammelkorrektur hätte also korrekte Formen zerstört.

✅ **Drei Zeilen erledigt, jeweils nach der Regel „`arabic_script` schlägt die Tabelle":**

| ID | Beleg | Ergebnis |
|---|---|---|
| 1385 | إِسْتَعْمِلِت — Kasra auf م *und* ل | Zeile → `ista3milit` (Tabelle hatte recht) |
| 1315 | تْفَرَّجِت — Kasra; `tfarraj` ist ein starkes Verb | Tabelle → `tfarrjit` (Zeile hatte recht) |
| 1383 | قالِتْ — Kasra; Zeile ist Level 6 mit 16 Versuchen | Tabelle → `qalit` (Zeile hatte recht) |

Bei **1383** standen sich Einzelbeleg und Systematik im Weg: Das Arabische trägt Kasra (`-it`), aber `qal` ist ein hohles Verb, und alle 9 schwachen Verben im Bestand nehmen `-et`. Entschieden zugunsten des konkreten Belegs und der eingeschliffenen Form — die Imala schwankt an dieser Stelle real (Lautlehre-Regel 1).

✅ **1376 war kein Schreibfehler, sondern eine Dublette — gemergt 2026-09-12.** Die Korrektur `qa3dt` → `q3adt` trifft die bestehende Zeile **1241 `q3adt` „ich blieb"**. Der neue Pflicht-Check vor `darija`-Korrekturen hat das gefangen — inzwischen der dritte Fall dieser Art.

| | ID | darija | german | arabic_script | Level | Versuche |
|---|---|---|---|---|---|---|
| **behalten?** | 1241 | `q3adt` | ich blieb | قعدت *(unvokalisiert)* | **6** | **30** (15 falsch) |
| **löschen?** | 1376 | `qa3dt` | ich blieb / ich saß | قْعَدْت *(vokalisiert)* | 0 | 0 |

Ausgeführt: **1241 behalten** (der ganze Lernfortschritt hängt dort), dabei das vokalisierte `arabic_script` قْعَدْت und den reicheren Gloss „ich blieb / ich saß" von 1376 übernommen, Legacy-Topic `" (L18)"` → `Vergangenheit`, `arabic_skeleton` neu berechnet. 1376 gelöscht. Es hingen weder Kurs-Übungen noch `vocab_lesson_refs` daran.

Nicht betroffen: **1375 `qa3dit` „sie blieb"** ist die 3. Person feminin, eine eigene Form — bleibt.

### ✅ A6 · Phrase mit angehängter Verbtabelle (8) — erledigt 2026-09-12

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

✅ **Ausgeführt 2026-09-12: die vier `3ayyit`-Sätze behalten, die beiden `3ayshik`-Zeilen entkoppelt.** Bei „Ruf die Feuerwehr" ist `3ayyit` wirklich der Imperativ des Verbs — die Tabelle daneben hilft beim Lernen. `3ayshik` dagegen ist eine erstarrte Höflichkeitsformel („danke"), die mit „leben lassen" nur noch etymologisch zusammenhängt; eine Vollkonjugation darauf verwirrt mehr, als sie nützt. 3383/3420 fallen ohnehin unter Liste D2.

Umgesetzt wurde nur `conjugation = NULL` bei 851 und 1392 — **`tunico_verb_id` blieb stehen**, weil es von `trainer.html` gar nicht gelesen wird (0 Vorkommen im Code) und als Herkunftsinfo nützlich ist. Der 🔠-Button hängt allein an `conjugation`.

3383/3420 (`qarra / 3allem`) blieben unangetastet — die fallen unter Liste D2.

**Nebenbefund beim Topic-Setzen:** Ich hatte für „Ruf die Feuerwehr/Polizei" zunächst `Notfall` gesetzt — ein Wert, den die Topic-Liste in SKILL.md nicht kennt, den der Bestand aber längst führt (3 Zeilen, eigene Lektion „Notfall & Sicherheit"). Sofort auf `Kurzphrasen` korrigiert, passend zum Geschwister 1913 mit gleichem Satzbau. Die Nachprüfung ergab **14 etablierte Topics außerhalb der erlaubten Liste** (~219 Zeilen), darunter `Beispielsätze` (82), `Gottesformeln` (51) und `Sprichwörter` (32) — letzteres ein echter Selbstwiderspruch, weil IMPORTS.md diesen Wert ausdrücklich vorschreibt. Die Liste in SKILL.md wurde um die sechs gut belegten Werte ergänzt.

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

Alle mit ـِيَّة (Schadda auf ي), alle ohne Doppel-`y` in der Transliteration. Das ist eine systematische Entscheidung, keine Einzelfehler.

✅ **Entschieden 2026-09-12: `-iyya` / `-iyyin`.** Also `jzayriyya`, `maghribiyya`, `muritaniyya`, `libiyya`, `swisriyya`, `3arbiyya`, `isbaniyya`, `sudaniyyin`, `lubnaniyyin`. Beim Umstellen die maskulinen Geschwisterformen mitprüfen, damit die Paare nicht auseinanderlaufen.

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

**Gegenprobe 2026-09-12: Kein einziger Bestandteil dieser 19 Einträge existiert auch als eigene Vokabel.** Die Dubletten-Gefahr, die die Regel begründet (der Duplikat-Check normalisiert den ganzen String inkl. „/" zu einem Key), ist hier also aktuell theoretisch. Das senkt die Dringlichkeit deutlich.

**Empfehlung (noch nicht bestätigt): nur 5 aufteilen, 14 stehen lassen.**

Aufteilen — zwei verschiedene Wörter oder Befehle, nicht dieselbe Bedeutung:

| ID | Zeile | warum |
|---|---|---|
| 2179 | `itwi / tabbaq` — falten / zusammenfalten | zwei verschiedene Verben |
| 2731 | `emshi lqoddem / toul` — fahr vorwärts / geradeaus | zwei verschiedene Befehle |
| 3383 | `qarra / 3allem` — er lehrte | zwei verschiedene Verben |
| 3420 | `yqarri / y3allem` — er lehrt | dito |
| 1460 | `berk allah fik / yer7am weldik` | zwei eigenständige Dankesformeln |

Stehen lassen — echte Synonyme oder Kurz-/Langform desselben Begriffs, bei denen `checkAnswer()` zu Recht beide Varianten akzeptiert: `465` · `477` (`m7atta`/`ma7attet et-trinou`, kurz/lang) · `504` · `600` · `997` · `1016` (`hotel`/`util`) · `1457` · `1552` · `2022` (`a7san`/`khir`) · `2423` · `2729` (`7abbes`/`a7bes`, Variante desselben Imperativs) · `2858` · `2859` · `4107` (zwei Pluralformen).

Bei diesen 14 würde Aufteilen die Karte schlechter machen: Man müsste beim Abfragen raten, welche der beiden Varianten gerade gemeint ist.

`arabic_script` enthält bei 20 Zeilen ebenfalls „/" — bei `847 fi lamen` und `1362 7allit` sogar, ohne dass `darija` eines hat.

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

## Abarbeitungs-Reihenfolge (Vorschlag, Stand 2026-09-12)

Nach Fehlerart statt nach ID — pro Runde **eine** Entscheidung statt vieler einzelner, und bei einem Fehler ist der Schaden auf eine Klasse begrenzt und mit einer Abfrage rückgängig zu machen.

| Runde | Inhalt | Zeilen | Status |
|---|---|---|---|
| 1 | **B + A1** — Plural-Endungen | 13 (6 davon aus A1) | ✅ ausgeführt 2026-09-12 |
| 2 | **A2** — Klammer-Zusätze im `darija`-Feld | 5 | ✅ ausgeführt 2026-09-12 |
| 3 | **A4** — Gemination bei تْعَشَّى | 3 (+1 Merge) | ✅ ausgeführt 2026-09-12 |
| 4 | **A3-Merges** — 14 Dubletten-Paare | 28 → 14 | ✅ ausgeführt 2026-09-12 |
| 5 | **D2-Splits** (5) + **A6-Entkopplungen** (2) | 7 | ja |
| 6 | **C** — Gemination | 93 | ja, in Häppchen à ~20 (~15 % Fehlalarme) |
| — | **C-Nationalitäten** | 10 | ✅ entschieden: `-iyya` |

Runden 1–3 sind zusammen 21 Zeilen und ohne weitere Rückfrage sauber abzuarbeiten.

### Noch offen

1. **A3-Merges** — Zustimmung zur Tabelle der 14 Paare (oder Einzelkorrekturen daran).
2. **A6** — die beiden `3ayshik`-Zeilen entkoppeln oder alle 8 so lassen?
3. **D2** — Zustimmung zu den 5 Splits.
4. **Die 8 A3-Reste ohne Zwilling** — vorerst stehen lassen (Empfehlung) oder doch angleichen?
5. **Form-II-Stammvokal** (`-a-` 51 / `-e-` 27 / `-i-` 20) — eigene, große Entscheidung; bisher bewusst nicht angefasst.

Neue Vokabelzeilen (48 fehlende Verbformen) sind laut Absprache in Ordnung, aber **vorher fragen** — und getrennt davon fragen, **ob sie fällig gesetzt** werden sollen.


---

## E · Vokal-Dubletten im Bestand (neu 2026-09-12)

`normKey()` faltet keine Vokale — Schreibvarianten desselben Worts sind für den Duplikat-Check der App deshalb **grundsätzlich unsichtbar**. Der bestehende Skelett-Check in SKILL.md braucht eine Batch-Grenze und findet nur Dubletten *innerhalb eines frischen Imports*; über Jahre gewachsene Varianten fallen durch.

Der neue bestandsweite Check (SQL in SKILL.md → Datenqualitäts-Checks) liefert roh **177 Verdachtspaare**. Nach Filterung der Fehlalarm-Muster bleiben 71 — aber nur die Teilmenge mit **identischem `arabic_script`** ist brauchbar.

**Wichtig, damit das niemand nochmal aufrollt:** Die 61 Paare mit *unterschiedlichem* Arabisch sind fast ausnahmslos korrekte Morphologie (`khamsa`/`khams` fünf/fünfter, `3ashra`/`3shour` zehn/zehnter, `khobz`/`khobza` Brot/ein Brot, `qrib`/`qriba` nah m./f., `forshita`/`frashit` Gabel Sg/Pl). Viele tragen gar keinen Marker im Gloss und sind durch keinen Filter trennbar. Die Rohzahl 177 überzeichnet den Fund um mehr als das Zehnfache.

### ✅ Die brauchbare Liste: 10 Paare mit identischem `arabic_script` — ausgeführt 2026-09-12

8 davon waren echte Dubletten, alle von Hand geprüft. Jeweils die Zeile mit mehr Lernfortschritt behalten.

| behalten | löschen | Bedeutung | Anmerkung |
|---|---|---|---|
| **413** `maryoul` · L6 | 4213 `maryul` · L4 | T-Shirt | Gloss zu „T-Shirt / Pullover" zusammenführen |
| **619** `djeja` · L6 | 3475 `djaja` · L6 | Huhn | Gleichstand — ältere ID, reicherer Gloss |
| **961** `behya` · L6 | 4108 `bahya` · – | gut (f.) | |
| **1008** `mokhdda` · L5 | 4270 `mkhadda` · – | Kissen | um „Polster" ergänzen |
| **1247** `t3adda` · L0 | 2822 `ta3adda` · – | er ging vorbei | 1247 ist ein Leech (32× falsch) |
| **1261** `ghodwa` · L6 | 3775 `ghudwa` · L5 | morgen | |
| **2194** `bnayya` · L6 | 3378 `bniyya` · – | Mädchen | |
| **2922** `neyy` · L5 | 4375 `nayy` · – | roh | |

**Nicht mergen — zwei Fehlalarme in derselben Teilmenge:**

| Paar | warum kein Duplikat |
|---|---|
| `385 brika` (Brik-Gebäck mit Ei) / `2142 brik` (Brik-Teigblatt) | verwandt, aber zwei verschiedene Dinge |
| `2632 rmal` (Sand) / `2656 ramla` (Sand (f.)) | Kollektiv vs. Nomen unitatis |

**Ausgeführt am 2026-09-12.** Ablauf: Vorprüfung ergab **keine** Kurs-Übungen an den zu löschenden Zeilen und keine Überschneidung in den `vocab_lesson_refs` — daher überall einfaches Ersetzen statt Entfernen. Dann zwei Gloss-Zusammenführungen (413 → „T-Shirt / Pullover", 1008 → „Kissen / Polster"), 8 Verweise in 6 Lektionen umgebogen, zuletzt die 8 DELETE.

Bei der Gelegenheit vier Legacy-Topics mitgerichtet, wie es die Regel für ohnehin angefasste Zeilen vorsieht: 413 `" (L16)"` → Kleidung, 619 `" (L23)"` → Tiere, 1261 `" (L18)"` → Zeit, 2922 `"Kurzphrasen"` → Adjektive (ist ein Adjektiv, kein Phrasen-Eintrag).

Verifiziert: **3.797 → 3.789 Vokabeln**, 0 Restverweise, 0 tote `vocabulary_id` in Kurs-Übungen, 0 doppelte IDs in den refs-Listen, Duplikat-Check nach `normKey` weiterhin 0. **Stufe A steht jetzt bei 2** — genau die beiden bekannten Fehlalarme, die stehen bleiben sollen.


---

## Runde 5 · D2-Aufteilungen — ausgeführt 2026-09-12

Vier der fünf vorgeschlagenen Aufteilungen ausgeführt. Dabei kamen drei Dinge heraus, die die Planung geändert haben:

### ✅ 2731 — Aufteilung war gar keine nötig

`emshi lqoddem / toul` → **`emshi lqoddem` „fahr vorwärts"**. Der zweite Teil brauchte keine neue Zeile: **`toul` existiert längst als `923 touwl` „geradeaus"**. Die Vorprüfung hatte exakt auf `toul` gesucht und ihn nicht gefunden, weil der Bestand die Ninja-Schreibung `touwl` führt.

→ **Nachtrag (offen):** `923 touwl` verstößt gegen die Hausschreibung — `uw` ist Ninjas Notation für Damma, unsere ist `ou`. Müsste `toul` heißen. Nicht angefasst, weil es ein eigener Fall ist.

### ✅ 3383 / 3420 — aufgeteilt, mit `homonym_ok` statt erfundener Bedeutungsunterschiede

| ID | vorher | nachher |
|---|---|---|
| 3383 | `qarra / 3allem` | `qarra` — er lehrte / er unterrichtete |
| **4593** (neu) | — | `3allem` — er lehrte / er unterrichtete |
| 3420 | `yqarri / y3allem` | `yqarri` — er lehrt / er unterrichtet |
| **4594** (neu) | — | `y3allem` — er lehrt / er unterrichtet |

**Warum identische Glosse:** TUNICO gibt für beide Verben praktisch dieselbe Bedeutung an (`qarra`: lehren, lesen lehren, unterrichten · `3allim`: lehren, unterrichten, ausbilden, instruieren). Einen Unterschied zu erfinden wäre Quellenfälschung. Stattdessen tragen alle vier Zeilen **`homonym_ok=true`** — damit greift `synonymNote()` im Trainer und blendet bei der Abfrage ein „für X gibt es noch eine andere Übersetzung" ein. Das ist genau der Zweck der Funktion.

Die neuen Zeilen bekamen bewusst **keine `conjugation`** (die im Original hängende Tabelle gehört zu `qarra`, nicht zu `3allem`) und **kein Audio** (die Aufnahme an 3383 ist die von `qarra`). Beides ist ein offener Nachtrag.

**Nicht fällig gesetzt** — beide neuen Zeilen haben keine `progress`-Zeile und kommen über den Aktivierungsmodus, wie abgesprochen.

### 🚫 1460 zurückgestellt — überschneidet sich mit einem anderen Schrägstrich-Eintrag

`berk allah fik / yer7am weldik` sollte aufgeteilt werden. Beim Prüfen fiel auf: **`465 ybarik fik / baraka allahou fik` „Gott segne dich"** enthält dieselbe Formel — `berk allah fik` und `baraka allahou fik` haben das identische Konsonantenskelett `brkllhfk`.

Das ist exakt die in SKILL.md dokumentierte Falle: Der Duplikat-Check normalisiert den ganzen String inklusive „/" zu einem Key und übersieht deshalb, dass ein *Teil* eines Schrägstrich-Eintrags anderswo schon existiert. 465 steht auf der „bleibt stehen"-Liste der 14 Synonympaare — die beiden Einträge müssen gemeinsam betrachtet werden, nicht einzeln aufgeteilt.

### 🚫 2179 zurückgestellt (auf Ansage)

`itwi / tabbaq` — zwei verschiedene Wurzeln (ط-و-ي vs. ط-ب-ق) in zwei verschiedenen Formen (Imperativ vs. Form-II-Vergangenheit), dazu ein Infinitiv-Gloss. Braucht Klärung, welche Bedeutung zu welcher Form gehört. Kein Lernfortschritt, drängt nicht.

---

## Gefundener Bug: zwei kaputte ID-Sequenzen (behoben 2026-09-12)

Beim ersten INSERT-Versuch schlug die Aufteilung mit `23505 duplicate key value violates unique constraint "vocabulary_pkey"` fehl. Ursache: Die ID-Sequenzen waren aus dem Tritt — vermutlich durch die Bulk-Importe, bei denen IDs explizit vergeben wurden.

| Sequenz | stand auf | höchste vergebene ID | blockierte IDs |
|---|---|---|---|
| `vocabulary_id_seq` | 4501 | 4592 | 87 |
| `lessons_id_seq` | 29 | 53 | 24 |

**Das war ein echter, nutzersichtbarer Bug**, unabhängig von diesem Prüfdurchgang: Jeder Anlegeversuch in der App wäre gescheitert — „➕ Neue Vokabel" (`saveNewVocab`), „➕ Neu anlegen" im TUNICO-Tab (`_tnAddNew`), Semias Vorschlagsformular (`partnerSubmitSuggestion`) und „Neue Lektion" (`saveNewLesson`).

Behoben per `setval()` auf den jeweiligen `max(id)`. `course_exercises`, `progress` und `review_log` waren in Ordnung. **Empfehlung: nach jedem größeren Bulk-Import mit expliziten IDs die Sequenz mitziehen** — gehört als Schritt in die Bulk-Insert-Anleitung in IMPORTS.md.
