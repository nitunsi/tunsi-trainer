# Prüfliste 2026-09-12 — Verb-Selbstcheck, Plural-Endung, Gemination

Ergebnis von Etappe 1 des Prüfplans, seit 2026-09-12 teilweise abgearbeitet.

> **Stand:** ✅ **Klasse A komplett** (A1–A6), **Liste E**, **Runde 5 (D2)** bis auf zwei Rückstellungen, **Runde 6 Gruppe 1** (13 Zeilen). Offen: Runde 6 Gruppen 2–4 (79 Zeilen) — zwei davon brauchen erst eine Familien-Entscheidung.
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


---

## Runde 6 · Gemination — Gruppe 1 erledigt (13 Zeilen)

Die 92 Verdachtszeilen wurden in vier Gruppen sortiert. Gruppe 1 ist das ـِيَّة-Muster, für das die `-iyya`-Entscheidung schon vorlag.

✅ **Ausgeführt 2026-09-12:** `3shiya`→`3shiyya` · `makla zemniya`→`makla zemniyya` · `jzayriya`→`jzayriyya` · `maghribiya`→`maghribiyya` · `muritaniya`→`muritaniyya` · `libiya`→`libiyya` · `swisriya`→`swisriyya` · `3arbiya`→`3arbiyya` · `isbaniya`→`isbaniyya` · `ta7iya`→`ta7iyya` · `sudaniyin`→`sudaniyyin` · `lubnaniyin`→`lubnaniyyin` · `msara / masriyin`→`msara / masriyyin`

Alle 13 vorher auf Kollision geprüft (alle frei). Die maskulinen Geschwister (`jzayri`, `libi`, `3arbi`, `maghribi`, `swisri`, `isbani`, `muritani`, `sudani`, `lubnani`, `masri`) tragen im Arabischen keine Schadda auf dem ي und bleiben korrekt bei einfachem `-i`.

→ **Nachtrag (offen):** `4444 marroukiya` „Marokkanerin [Synonym zu maghribiya]" gehört ins selbe Muster, wurde aber von der Prüfregel nicht erfasst — das Wort enthält mit `rr` bereits eine korrekte Gemination, und der Filter schließt jede Zeile mit Doppelbuchstaben aus. **Blinder Fleck der Regel:** Eine vorhandene Gemination maskiert eine zweite fehlende. Dazu ist das `arabic_script` مرّوكية nur teilvokalisiert (Schadda auf ر, aber keine auf ي) — nach der Regel „unvokalisiert → nicht raten" nicht von allein zu entscheiden.

### Konventionsfund: verdoppelte Digraphen

Bei Gruppe 2 stellte sich die Frage, ob ein geminierter Digraph als `ddh` oder `dhdh` geschrieben wird. Der Bestand antwortet eindeutig — siehe die neue Tabelle in SKILL.md → Konsonanten. Kurz: **ganzer Digraph** (`dhdh`, `thth`, `shsh`, `khkh`), bei `shsh`/`khkh` ohne ein einziges Gegenbeispiel.

**Konflikt mit einem dokumentierten Präzedenzfall:** Die einzigen zwei `ddh`-Zeilen (`1648 7addhar`, `2218 y7addhar`) stammen aus der in PRECEDENTS.md festgehaltenen Korrektur vom 2026-08-07. Sie widersprechen der Konvention, die neun andere ض-Geminationen befolgen — darunter `itfadhdhal` aus derselben Wurzelfamilie. **Entscheidung nötig**, weil eine Vereinheitlichung eine dokumentierte Entscheidung überschreiben würde.

### Familien-Entscheidung nötig: die `3ayshek`-Gruppe

`1392 y3ayshek` steht in Gruppe 2 zur Korrektur an. Beim Prüfen zeigte sich: **17 Zeilen im Bestand verwenden dieses Wort in fünf verschiedenen Schreibweisen** — `3ayshik` (851), `3ayshek` (2685, 3001, 3002, 3132), `y3ayshek` (1392, 1434, 1435, 1439, 1440), `y3ayshik` (1750, 1945, 3701), `y3ayyshik` (1438) — während das `arabic_script` überwiegend عَيِّشِك mit Schadda auf ي schreibt, also `3ayyshik` nahelegt. *(Korrektur nach der Recherche unten: „durchgängig" stimmte nicht — 851 hat عَيْشِكْ ohne Schadda, und genau das ist der Schlüssel zur Lösung.)*

Eine Einzelkorrektur von 1392 würde die Zeile von 15 Geschwistern abkoppeln. Das ist wie bei den Nationalitäten eine Block-Entscheidung. Zusätzlich trägt 1392 im `arabic_script` den Rest `(b...)` — einer der vier Einträge mit lateinischen Zeichen im arabischen Feld (Liste D3).

---

## Runde 6 · Recherche-Ergebnisse — beide offenen Entscheidungen geklärt (2026-09-12)

### ✅ Geminierter Digraph: `dhdh`, nicht `ddh` — dreifach belegt

Die Zählung aus dem eigenen Bestand allein (`dhdh` 9 : `ddh` 2) war zu dünn, um eine dokumentierte Entscheidung zu überschreiben. Nachrecherche in allen drei Quellen:

| Quelle | `dhdh` : `ddh` | `thth` : `tth` | `shsh` : `ssh` | `khkh` : `kkh` | `ghgh` : `ggh` |
|---|---|---|---|---|---|
| eigener Bestand | 9 : 2 | 6 : 2 | 11 : 0 | 7 : 0 | 0 : 0 |
| Derja Ninja | 70 : 2 | 34 : 17 | 2 : 0 *(Ninja schreibt `ch`)* | – *(Ninja schreibt `5`)* | – |
| TUNICO `lemma_chatalpha` | – *(kein `dh` im Alphabet)* | 40 : 9 | 35 : 0 | 21 : 0 | 2 : 0 |

**Der entscheidende Fehler in der ersten Zählung:** Die `tth`-Treffer sind **keine** Gegenbeispiele. Beim Nachlesen der Einzeltreffer — nicht der Zahlen — ist jeder einzelne ein Morphemgrenzen-`t` vor `th`, keine Gemination:

- TUNICO 9/9: `tṯawwib`→`tthawwib`, `tḏ̣āṛif`→`ttharif`, `tḏ̣āḥik`→`ttha7ik`, `mutṯaqqaf`→`mutthaqqaf`
- Ninja 17/17: `تْذَكِّرْ`→`tthakkir`, `مِتْثَقِّفْ`→`mittha99if`, `تْذُوبِلْ`→`tthouwbil`
- eigener Bestand 2/2: `نِتْثَاوَب`→`netthaowb` (3042), `تَذْبَح`→`tthba7` (3073)

Nach Abzug dieser Scheintreffer steht es bei echter ذّ/ظّ-Gemination **40:0, 34:0, 6:0**. Und wo TUNICO eine echte Gemination hat, verdoppelt es in **14 von 14** Fällen voll: `ʕaḏḏib`→`3aththib`, `aḏḏin`→`aththin`, `kaḏḏāb`→`kaththab`, `baẓẓaʕ`→`baththa3`, `ḏḏakkiṛ`→`ththakkir`, `ḏḏall`→`ththall`, `ṭuẓẓīna`→`tuththina`, `mīẓẓu`→`miththu`.

Zwei Argumente unabhängig von der Statistik:

1. **Lautlehre** — `dh`/`th`/`sh`/`kh`/`gh` stehen für je *einen* Laut. `ddh` liest sich als /d/+/ð/, und diese Folge kommt an Morphemgrenzen echt vor. `ddh` ist also mehrdeutig, nicht nur ungewöhnlich.
2. **Maschinell prüfbar** — `_translit_skeleton('7addhar')` = `7ddhr`, aber `_arabic_skeleton('حَضَّر')` = `7dhdhr`: Die beiden Skelett-Spalten *derselben Zeile* widersprechen sich, Duplikat- und Cross-Source-Abgleich sehen zwei verschiedene Wörter. Mit `7adhdhar` liefern beide `7dhdhr`.

`checkAnswer()` im Node-Harness gegengetestet: `7addhar` ↔ `7adhdhar` und `y7addhar` ↔ `y7adhdhar` werden in beide Richtungen akzeptiert. Kein Lerner-Nachteil, reine Datenqualität.

✅ **Ausgeführt 2026-09-12:** ids **1648 `7addhar` → `7adhdhar`** und **2218 `y7addhar` → `y7adhdhar`**, vorher kollisionsfrei geprüft. Die Änderung überschreibt bewusst die Entscheidung vom 2026-08-07; in PRECEDENTS.md ist die alte Stelle mit Begründung entwertet.

Mitgezogen werden musste die **`conjugation` von 2218** — sie trug die alte Schreibung in allen vier Präsensformen (`n7addhar`/`t7addhar`/`t7addhar`/`y7addhar`). Ohne das hätte der Verb-Selbstcheck die Zeile direkt danach gemeldet. Danach: `_translit_skeleton` = `_arabic_skeleton` = `7dhdhr` bei beiden Zeilen, ض-Reihe im Bestand jetzt **11 : 0**, und der Digraph-Check meldet nur noch 3042/3073 (die bekannten korrekten Präfix-`t`-Zeilen). 1648 hat weiterhin gar keine `conjugation` — bekannter D4-Rückstand, kein neues Problem.

**Nebenfund aus demselben Check:** id **3073** (`essakina ej-jdida madhya brrsha tthba7 thb7an`) hat zwei andere Fehler — `essakina` statt `essakkina` (السِّكِّينَة, Schadda auf س *und* ك) und `brrsha` statt `barsha` (بَرْشَة; dieselbe Zeile 3042 schreibt es korrekt). Nicht angefasst.

### ✅ `3ayshik`-Familie vereinheitlicht — 14 Zeilen geändert

Ninja führt **zwei getrennte Lemmata**, und das löst den Fall:

- عَيْشِكْ `3aychik` = „thanks" und عَيْشُو `3aychouw` = „thanks" — beide **ohne** Schadda, zweimal unabhängig so geschrieben
- عَيِّشْ `3ayyich` = „may you live" — **mit** Schadda; TUNICO hat dazu das Verb `ʕayyiš` → `3ayyish` „ein langes Leben geben (Gott)"

Das ist keine Vokalisierungs-Schlamperei, sondern eine lexikografische Unterscheidung: die erstarrte Interjektion ist lautlich reduziert, die volle Verbform يعيّشك („möge Er dir Leben geben") nicht. Deshalb sind hier **zwei** Schreibungen richtig, nicht eine — aber eben nur zwei statt fünf:

| Form | Schreibung | `arabic_script` | Zeilen |
|---|---|---|---|
| erstarrte Floskel, ohne Präfix | `3ayshik` | عَيْشِك (ohne Schadda) | 851, 2685, 3001, 3002, 3132 |
| volle Verbform, mit y-Präfix | `y3ayyshik` | يْعَيِّشِك (mit Schadda) | 1392, 1425, 1427, 1434, 1435, 1438, 1439, 1440, 1750, 1945, 3701 |

Die Endung ist in **allen 16** Zeilen `-ik`, nie `-ek` — jedes `arabic_script` hat Kasra unter ك. Das `yy` folgt derselben Regel wie das `dhdh`: Schadda wird transliteriert. Das Vorbild stand schon in Zeile 1438 direkt daneben (`rabbi yfadhdhlik` aus يْفَضِّلك).

Ausgeführt: 14 Zeilen (851 und 1438 waren bereits korrekt), alle 14 neuen Schreibungen vorher auf Kollision geprüft (alle frei), `translit_skeleton`/`arabic_skeleton` über `public._translit_skeleton()`/`_arabic_skeleton()` neu berechnet. `checkAnswer()` akzeptiert alte *und* neue Schreibung in beide Richtungen — kein Eingriff in bereits Gelerntes. Der `(b...)`-Rest im `arabic_script` von 1392 ist damit auch weg (**Liste D3: 4 → 3**).

**Nicht angefasst, aber aufgefallen:**

- Die Klammer-Hinweise `(a...)`/`(y...)`/`(b...)` in den `german`-Feldern von 1391 `aman` / 1392 `y3ayyshik` / 1393 `brabbi` sind **kein Import-Müll**, sondern die bewusste Unterscheidung dreier Synonyme für „bitte". Nur der `(b...)` im *arabischen* Feld von 1392 war echter Copy-Paste-Müll aus 1393. — Offen: **1113 `billehi`** heißt ebenfalls „bitte", hat aber keinen Hinweis-Zusatz und fällt damit aus dem Schema.
- **1425 `yberik fik (y3ayyshik)`** „Danke (Antwort auf Glückwunsch)" und **1945 `ybarik fik y3ayyshik`** „Gott segne dich (Antwort auf Glückwunsch)" sind derselbe Satz in zwei Schreibungen (`yberik` / `ybarik`, arabisch يُبارِك / يْبَارِكْ) mit fast identischem Gloss — **Merge-Kandidat**. Beide haben jetzt denselben `translit_skeleton` `brkfk3shk`; vom `normKey()`-Duplikat-Check der App ist das nicht erfassbar, über den Skelett-Vergleich schon.
- **1394 `tfadhal`** („Bitte sehr / Hier / Nach Ihnen") — `arabic_script` تْفَضَّل hat Schadda auf ض, die Transliteration nicht: `_translit_skeleton` = `tfdhl` gegen `_arabic_skeleton` = `tfdhdhl`. Richtig wäre `tfadhdhal`, wie es **2095 `itfadhdhal`** und **1916 `itfadhdhal oq3od`** bereits schreiben. Gleiche Fehlerklasse wie `7addhar`, nur ohne `ddh` — deshalb vom Digraph-Check nicht erfasst, wohl aber vom Schadda-Check (Liste C). Danach bleiben 1394 und 2095 zusätzlich Merge-Kandidaten (dasselbe Wort mit/ohne prothetisches Alif, überlappender Gloss).

---

## Runde 6 · Gruppe 2 — ausgeführt 2026-09-12 (31 Zeilen)

**Neues Vorgehen:** Statt der Regex als Filter den Skelett-Vergleich benutzt — `public._translit_skeleton(darija)` gegen `public._arabic_skeleton(arabic_script)`. Der trennt Liste C deutlich sauberer: von 69 verbliebenen Verdachtszeilen waren 48 skelett-uneinig, 21 einig. Die 35 einwortigen unter den uneinigen wurden einzeln gegen Quellen und Geschwisterzeilen geprüft.

### ✅ Block 1 — Gemination fehlte, Beleg vorhanden (22)

`1295 nathfit`→`naththfit` · `1296 nathaft`→`naththaft` · `1335 nathmit`→`naththmit` · `1336 nathamt`→`naththamt` (TUNICO `naḏ̣ḏ̣af`/`naḏ̣ḏ̣am`, Bestand 1654 `naththaf` / 4250 `mnaththam`) · `1326 7adhert`→`7adhdhart` (Familie 1648/2218) · `2261 7aqaq`→`7aqqaq` · `2262 y7aqeq`→`y7aqqeq` (Ninja `7a99a9` حَقَّقْ) · `2840 qasher`→`qashsher` · `2848 yqasher`→`yqashsher` · `2484 7asham`→`7ashsham` (TUNICO `ḥaššām`) · `2082 moumathel`→`moumaththel` · `2609 yitza3ab`→`yitza33ab` · `2610 tza3ab`→`tza33ab` (Bestand 1911 `ta33abt`, Ninja `maja33id`) · `2860 nemousa`→`nemmousa` (Ninja `nammouwsa` نَمُّوسَةْ) · `1394 tfadhal`→`tfadhdhal` (Bestand 2095/1916) · `2708 litaw`→`littaw` · `3184 m3amra`→`m3ammra` · `3185 mshamra`→`mshammra` · `3301 msatek`→`msattek` · `3290 yitqla`→`yitqalla` · `2861 thbana`→`thibbana` · `2515 gleyeb`→`gleyyeb`

**Bewusst nur die Gemination geändert, keine Vokale.** `nathfit` wurde `naththfit`, nicht `naththafit` — obwohl das `arabic_script` نَظَّفِت eine Fatha auf ظ zeigt. Ob der Stammvokal in der 3.-Person-f.-Vergangenheit erhalten bleibt oder ausfällt, ist eine eigene Frage; sie nebenbei mitzuentscheiden wäre derselbe Übergriff wie bei den `-ou`-Formen in Runde 5.

### ✅ Block 2 — neue Fehlerklasse: `h` statt Verdopplung (4)

`4207 yba7har`→`yba77ar` · `4383 ba7har`→`ba77ar` · `4578 ba7hart`→`ba77art` · `2083 moumathhla`→`moumaththla`

`77` ist im Bestand 27× belegt (`sa77a`, `na77a`, `twa77ashtek`) und von Ninja bestätigt (`mouwa77da`, `titna77aa`). **Aber `7h`/`thh` sind nicht generell falsch:** `722 thhar` (ظهر, Rücken) und `4254 ythhar-li` (يظهرلي) sind echte ظ+ه-Folgen und bleiben unangetastet. Exakt dasselbe Muster wie bei `tth` — dieselbe Buchstabenfolge ist an einer Morphemgrenze korrekt und bei Schadda falsch, entschieden wird nur am Arabischen.

### ✅ Block 3 — das `arabic_script` war falsch, nicht die Transliteration (2)

| id | darija | arabic alt | arabic neu | Beleg |
|---|---|---|---|---|
| 3023 | `bnin` „lecker" | بَنِّين | بْنِين | TUNICO `bnīn` — langes ī, keine Gemination |
| 1087 | `skhan` „heiß (Pl.)" | سَخَّان | سْخَان | سَخَّان heißt „Boiler"/„erhitzen" (TUNICO `saxxan`); Familie 587 `skhoun` / 653 `skhouna` |

Ohne Quellenprüfung wären beide als fehlende Gemination „korrigiert" worden — das wäre genau falsch herum gewesen.

### ✅ Block 4 — blinder Fleck der Prüfregel (4, eine davon schon in Block 2)

Der Schadda-Check sieht nur Zeilen mit Vokalisierung. Diese vier tragen denselben Fehler, haben aber unvokalisiertes Arabisch und waren damit unsichtbar: `1167 ynathaf` (ينظف)→`ynaththaf` · `1831 tnathaf` (تنظف)→`tnaththaf` · `1274 n7adhar` (نحضر)→`n7adhdhar` · `4383 ba7har` (بحر)→`ba77ar`.

Gefunden nur, weil zu jedem geänderten Verb die Geschwisterzeilen gesucht wurden. Gleiche Lücke wie bei `4444 marroukiya`. **Merkregel: nach jeder Verbkorrektur die ganze Wurzelfamilie durchsehen, nicht nur die gemeldete Zeile.**

### Mitgezogen: 8 Konjugationstabellen

`1274`, `1335`, `1336`, `1831`, `2262`, `4207`, `4383`, `4578` trugen die alte Schreibung in ihren `conjugation`-Feldern — auch in Formen, die gar keine eigene Vokabelzeile haben (`nathamna`, `nathmu`, `ba7hru`, `ba7hret`). Ohne diese Ersetzung hätte der Verb-Selbstcheck alle acht unmittelbar gemeldet. **Verb-Selbstcheck danach: 19 von 652 statt vorher 26.**

Vorher geprüft und frei: Duplikat-Check für alle 29 neuen Schreibungen, Referenzen in `course_lessons.vocab_lesson_refs` (keine). `checkAnswer()` akzeptiert alle 29 Paare in beide Richtungen.

### Stand Liste C danach

69 → **42** (21 mehrwortig = Gruppe 4, 8 einwortig-uneinig = Block 5 unten, Rest skelett-einig).

### 🚫 Block 5 — kein Geminationsproblem, nur gemeldet (8)

| id | darija | Befund |
|---|---|---|
| 3673 | `el3ab` „spiel!" | `arabic_script` لّعَبْ ist kaputt — Schadda auf dem ersten Buchstaben ohne Träger. Sollte إلْعَبْ |
| 1988 | `adh3af` „schwächer (Komp.)" | `arabic_script` ضَعِّفْ ist der Form-II-Imperativ „schwäche!", nicht der Komparativ أَضْعَف |
| 2330 | `jneyni` „Gärtner" | `arabic_script` جَنَّانْ ist ein anderes Wort (`jannan`), nicht `jneyni` (جْنَيْنِي) |
| 1141 | `maskha` „schmutzig (f.)" | `arabic_script` مسّخْ unvollständig (kein ة); Zeile 1655 schreibt `masskha` مسّخة |
| 416 | `rouba` „Kleid" | frz. Lehnwort (robe) — braucht nur `(frz.)` im Gloss, dann fällt es aus dem Check |
| 2068 | `bit-tabi3a` | korrekt (Sonnenbuchstaben-Assimilation), reiner Filter-Fehlalarm |
| 2538 | `nifli` „Ich bin pleite" | `arabic_script` نِفْلِّي nicht eindeutig lesbar |
| 3221 | `shrobtshi?` | `arabic_script` شُرِّبْتْشِي nicht eindeutig lesbar |

### 🔸 Offen aus Block 4: vier unvokalisierte `arabic_script`

Nach der Korrektur haben `1167` (ينظف), `1831` (تنظف), `1274` (نحضر), `4383` (بحر) ein auseinanderlaufendes Skelettpaar — nicht weil die Transliteration falsch wäre, sondern weil ihr Arabisch die Gemination gar nicht schreibt. Eine minimale Ergänzung (nur die Schadda: ينظّف, تنظّف, نحضّر, بحّر) wäre durch die Geschwisterzeilen 1654 نَظَّف, 1648 حَضَّر, 4578 بَحَّرْت und durch TUNICO gedeckt — also kein Raten. Nicht ausgeführt, weil nicht Teil der freigegebenen Blöcke.

---

## Runde 7 · Block 5 abgeräumt + ya-Gemination (2026-09-12, 30 Zeilen)

### ✅ Block 5 aus Runde 6 — sieben von acht geklärt

| id | Änderung | Beleg |
|---|---|---|
| 3673 | `arabic_script` لّعَبْ → إلْعَبْ | Schadda ohne Träger war ein Tippfehler; `el3ab` selbst steht als Imperativ in allen sechs Tabellen der `l3ab`-Familie |
| 1988 | `arabic_script` ضَعِّفْ → أَضْعَف | war der Form-II-Imperativ „schwäche!"; Komparativ wie 1991 `askhan` أَسْخَن |
| 3221 | `arabic_script` شُرِّبْتْشِي → شْرَبْتْشِي | Schadda machte daraus Form II „zu trinken geben" (TUNICO `šaṛṛab`), Gloss sagt aber „Hast du getrunken?" |
| 2330 | `jneyni` → `jannan` | Ninja `jannan` جَنَّانْ + TUNICO `žannān` = Gärtner; das Arabische war schon richtig, die Transliteration nicht |
| 1141 | `maskha` → `massakha`, arabic مسّخْ → مَسَّخَة | TUNICO `massax`, Geschwister 440 `massakh` |
| 1145 | `maskhin` → `massakhin`, arabic مسخين → مَسَّخِين | blinder Fleck: unvokalisiert, gleicher Fehler |
| 416 | Gloss → „Kleid (frz. robe)" | Lehnwort markiert, fällt damit dauerhaft aus dem Check |

`2068 bit-tabi3a` bleibt als reiner Filter-Fehlalarm stehen, `2538 nifli` bleibt offen (Arabisch نِفْلِّي nicht eindeutig lesbar; Ninja hat `flis` فْلِسْ „bankrott gehen", was auf نِفْلِس deuten würde — zu unsicher).

Dazu die vier unvokalisierten Geschwister aus Runde 6 nachgezogen (nur die Schadda ergänzt, durch 1654 نَظَّف / 1648 حَضَّر / 4578 بَحَّرْت gedeckt): `1167` ينظّف · `1831` تنظّف · `1274` نحضّر · `4383` بحّر. Alle vier haben jetzt stimmige Skelettpaare. In `1655` außerdem `masskha`→`massakha` und das überzählige Alif in `الازم`→`لازم`.

### ⚠️ Stille Regex-Falle gefunden: Zeichenreihenfolge

`arabic_script ~ 'يّ'` lieferte 7 Treffer, obwohl optisch viel mehr Zeilen eine Schadda auf dem ya tragen. Grund: die Kombinationszeichen stehen **Vokal vor Schadda** (`طَيَّبِت` = `0637 064e 064a 064e 0651 …`), nicht kanonisch. Bestandsweit **803 Zeilen so, 16 andersherum** — jede Regel `<Buchstabe>ّ` verfehlt damit ~98 % und meldet stumm nichts. Dieselbe Klasse wie `\b` statt `\y`. Richtig: `ي[ًٌٍَُِْٰ]*ّ`.

Mit der falschen Regex hätte die Zählung „يّ wird einfach `y` geschrieben" ergeben. Korrigiert steht es **67 : 14 für `yy`**, TUNICO 14/14, Ninja 14/14.

### ✅ ya-Gemination (15 Zeilen)

`1323 taybit`→`tayybit` · `1324 tayebt`→`tayyebt` · `2197 maytin`→`mayyitin` (Geschwister 2290 `mayyit`/2291 `mayyita`) · `2295 flayis`→`flayyis` · `2781 nazel-li`→`nazelli` · `2794 mathebia`→`mathebiyya` · `2811 rwayeq`→`rwayyeq` · `2876 mrayeq`→`mrayyeq` · `3069 jayda`→`jayyda` · `4119 ahaya`→`ahayya` · `4464 mdhayef`→`mdhayyef` · `2378 babbaghayo`→`babbaghayyo` · `3971 urubbiyin`→`urubbiyyin` · `3659 mdhayfa`→`mdhayyfa` (+ arabic مُضَيفَة → مُضَيِّفَة, wieder ein unvokalisiertes Geschwister)

**Die `tayyab`-Tabelle war in sich widersprüchlich:** Präsens und Imperativ schrieben `tayy-` (`ntayyeb`, `ttayybu`, `tayyeb`), die Vergangenheit `tay-` (`tayebna`, `taybit`). Dieselbe Tabelle, dasselbe Verb. In allen vier Zeilen (405, 1323, 1324, 1646) korrigiert.

### 🔙 Eine eigene Änderung zurückgenommen: `3812 ahuwa`

`ahuwa` → `ahuwwa` war nach der Schadda-Regel vertretbar (أَهُوَّا), wurde aber wieder zurückgesetzt. Ninja schreibt هُوَ **ohne** Schadda als `houwa` — das `w` steht dort für den Buchstaben Waw, nicht für die Verdopplung. Die ya-Regel lässt sich also nicht auf waw übertragen, und die eigene هو/هي-Familie ist in sich uneinheitlich: 493 `houa`/هُوَ · 1445 `houa`/هُوَّ · 3339 `houwa`/هُوَّ · 3340 `hiyya`/هِيَّ · 3812 `ahuwa`/أَهُوَّا · 1782+3747 `houa`/هو — sechs Zeilen, vier Arabisch-Varianten, drei Transliterationen. **Das ist eine Block-Entscheidung wie bei `3ayshik`, keine Einzelkorrektur.** Lieber eine bekannte offene Frage als eine selbstgemachte Inkonsistenz.

### Stand danach

Liste C **36 → 25**. Digraph-Check meldet 4 Zeilen, alle vier bekannt korrekt (3042, 3073, 722 `thhar` ظهر, 4254 `ythhar-li` يظهرلي). Verb-Selbstcheck 19 von 652. Bestand unverändert 3.790.

### Offen nach dieser Runde

1. **waw-Gemination / هو-هي-Familie** — Block-Entscheidung, siehe oben. Betrifft auch `shnoua` / `shnou` / `shnouwa` (drei Schreibungen für شْنُوَّا, id 837/3206/2530) und `taw` / `tawwa` (Ninja: `tawwa` تَوَّا).
2. **Restliche 25 Liste-C-Zeilen** — 21 mehrwortig, dort sitzt die Schadda meist in einem anderen Wort des Satzes.
3. `1622 t3awinni` — `arabic_script` تعاوّني hat eine Schadda auf waw, die wie ein Tippfehler aussieht.
4. `2538 nifli`, `1445`/`3339` siehe Punkt 1.

### ✅ Nachträge erledigt (2026-09-12)

- **`923 touwl` → `toul`** (طُولْ, „geradeaus"). TUNICO hat `tul`/`ṭūl`. `touwl` war **Ninjas eigene Konvention** (`ouw` für ū, wie in `nammouwsa`, `5ouwf`, `mouwsiy9iyya`) und ist bei einem Import 1:1 durchgerutscht — genau das, wovor IMPORTS.md warnt. Ninjas Transliterationsspalte nie ungeprüft übernehmen.
- **`4444 marroukiya` → `marroukiyya`**, `arabic_script` مرّوكية → مرّوكيّة. Der Nachzügler aus Gruppe 1 (die vorhandene `rr`-Gemination hatte die fehlende `yy`-Gemination vor der Prüfregel versteckt). Im Gloss außerdem den Querverweis `[Synonym zu maghribiya]` auf `maghribiyya` nachgezogen — ein Bestandssweep über alle `german`-Felder zeigte, dass dies der einzige Verweis auf eine inzwischen geänderte Schreibung war.

---

## Runde 8 · Der arabische Duplikat-Schlüssel war kaputt (2026-09-12)

### Der Befund

`ar_key` in SKILL.md (Zeile 461) strippt Leerzeichen und Satzzeichen, **aber keine Diakritika**. Zwei Zeilen mit demselben arabischen Wort sind für den Check verschiedene Wörter, sobald sie unterschiedlich vokalisiert sind:

| | Gruppen mit >1 Zeile |
|---|---|
| `ar_key` wie dokumentiert | **6** |
| Diakritika gestrippt | **126** |

### Verfeinerung: die Schadda gehört NICHT zu den Vokalzeichen

Der naheliegende Fix (alle Diakritika weg) ist zu grob — er verschmilzt Form I und Form II, also genau die Unterscheidung, die diese Sitzung herausgearbeitet hat (حَضَر „er nahm teil" gegen حَضَّر „er bereitete vor"). Die Schadda ist ein Konsonantenverdopplungszeichen und gehört zum Gerüst.

| Schlüsselvariante | Gruppen | Zeilen |
|---|---|---|
| A: alle Diakritika weg | 126 | 264 |
| **B: nur Kurzvokale weg, Schadda bleibt** | **86** | **179** |

Die 40 Differenzgruppen sind die Form-I/II-Paare. **B ist der richtige Schlüssel.**

```sql
lower(regexp_replace(regexp_replace(arabic_script,'[ًٌٍَُِْٰٟ]','','g'),
                     E'[\\s.,;:!?()/\\\\''"«» -]+','','g'))
```

### Auswertung der 86 Gruppen

| Muster | Gruppen | Bewertung |
|---|---|---|
| `-it`/`-t`-Verbpaar (3. Pers. f. gegen 1. Pers. Vergangenheit) | 21 | Fehlalarm, strukturell — der Bestand legt dieses Paar für jedes Verb bewusst an |
| bereits mit `homonym_ok` markiert | 17 | Check arbeitet korrekt |
| echt verschiedene Wörter mit gleichem Gerüst | ~30 | kein Fehler (`morra`/`marra`, `jomal`/`jmal`, `ktob`/`ktib`, `3irq`/`3araq`) |
| Imperativ/Vergangenheit derselben Wurzel | ~5 | kein Duplikat, aber `homonym_ok`-Kandidaten |
| **echte Funde** | **17** | siehe unten |

Trefferquote damit rund 20 % — dieselbe Größenordnung wie bei der Vokal-Dubletten-Runde (177 → 8).

### ✅ Neuer Fehlertyp gefunden: Femininum mit maskulinem `arabic_script` (3)

Der Schlüssel deckte auf, dass drei feminine Zeilen die **Maskulinform** im Arabischen tragen — das ة fehlte, weshalb sie mit ihrem eigenen maskulinen Geschwister kollidierten:

| id | darija | arabic alt | arabic neu | Geschwister |
|---|---|---|---|---|
| 1128 | `qsira` „kurz (f.)" | قْصِيرْ | قْصِيرَة | 433 `qsir` |
| 1178 | `ghamqa` „dunkel (f.)" | غَامِقْ | غَامْقَة | 457 `ghamaq` |
| 2656 | `ramla` „Sand (f.)" | رْمَلْ | رَمْلَة | 2632 `rmal` |

Ein Sweep über alle Zeilen mit `(f.)` im Gloss und ohne ة/ا/ى am Wortende fand nur diese drei plus drei berechtigte Ausnahmen (`hethi` هَاذِي, `anahi` أَنَاهِي — beide auf ي). **Offen:** `3976 shah` شَاه ist als „(f.)" glossiert, das Arabische sieht maskulin aus; das Wort ist zu ungewöhnlich zum Raten.

### ✅ Verpasstes Form-II-Geschwister (1)

`1325 7adhrit` „sie bereitete vor" trug حَضْرِتْ **ganz ohne Schadda** und stand damit bei der Form-I-Familie (`1337 7adhirt`/`1338 7dhart` = „teilnehmen"), obwohl das Gloss Form II ist. → `7adhdhrit`, حَضَّرِت. Die vierte Zeile der `7adhdhar`-Familie, die alle bisherigen Runden übersehen hatten.

**Nebenbefund, nicht angefasst:** `1337 7adhirt` ist als „sie nahm teil" glossiert, hat aber die Vokalstellung der 1. Person. Alle Parallelzeilen benutzen `-it` für die 3. Pers. f. (`3arfit`, `ghaslit`, `qeblit`) — `7adhrit` wäre das Muster. Eigene Frage, nicht mit der Gemination vermischt.

### ✅ Merge-Runde ausgeführt (2026-09-12) — 3.790 → 3.780

Jede Gruppe vorher einzeln gegen Ninja, TUNICO und Peace Corps geprüft, nicht nur gegeneinander.

**Sieben Merges mit eindeutigem Quellenbeleg:**

| bleibt | neue Schreibung | gelöscht | Beleg |
|---|---|---|---|
| 3063 | `yibra` | 4221 `ybra` | beide hatten يِبْرَا, **keine** der zwei Schreibungen passte dazu; TUNICO `bṛā` „genesen" |
| 3449 | `yitwaffa` + يِتْوَفَّى | 4292 | TUNICO `twaffa`; 3449 trug die MSA-Vokalisierung يَتَوَفَّى |
| 2278 | `barnamij` | 4293 | Ninja, TUNICO **und** Peace Corps schreiben alle `barnamij` |
| 2544 | `shayekh` | 2978 | identisches Arabisch شَايِخ; Ninja `chayi5` = „excited, having a good time" — also 2978s Gloss, nicht 2544s |
| 1119 | `7wayij` + حْوَايِجْ | 4340 | Ninja + Peace Corps `7wayij` gegen TUNICO `7wayj` (2:1) |
| 2994 | `ma7la dha7ketek` | 3011 | identisches Arabisch; **jede Zeile hatte ein Wort richtig** — 2994 `mahla` mit `h` statt ح, 3011 `dh7ketek` statt `dha7ketek` |
| 1425 | `ybarik fik (y3ayyshik)` | 1945 | TUNICO `bārik` „segnen" stützt `barik`, nicht `berik` |

**Zwei Merges mit benannter Restunsicherheit:**

- `3679 yib3id` ← `4345 yib3ad`. Vokalfrage offen: Bestand neigt zu Kasra (3679 يِبْعِد, 4424 بْعِد), Form-I-Bildung eher zu `yib3ad`. 3679 behalten, weil es an einer Kursübung hängt. Bei der Gelegenheit den Infinitiv-Gloss („weggehen, sich entfernen") auf Personalform gebracht — **ein Punkt aus Liste D1 nebenbei erledigt.**
- `3899 ghrib` ← `1939 ghriyb`. Gestrige Einschätzung („trennen") revidiert: Peace Corps führt `STRANGE` = `ghri:b`/`ghri:ba:` mit Beispielsatz, und 1939s Arabisch غْرِيب trifft das exakt; für ein eigenständiges `gharib` „Fremder" gibt es keine Stütze (Peace Corps `FOREIGN` = `ajnabi`/`barrani`). `ghriyb` war wieder Ninjas `iy`-Konvention wie bei `touwl`.

**Bedeutungsfehler (siehe PRECEDENTS.md → metrobbi):** `2815` Gloss entspiegelt zu „wohlerzogener Junge / gut erzogen (Person)" und auf `wled mutrubbi` / وَلَد مُتْرَبِّي angeglichen; `2816` gelöscht (Dublette zu 2495 mit invertiertem Gloss).

**Echtes Homonym:** `3521`/`3598` beide auf `y7alliq` + يْحَلِّق, bei beiden `homonym_ok`. Zwei reale Bedeutungen (kreisen / rasieren-MSA); das Vergangenheitspaar 3597/4122 trug das Flag schon. Dass „rasieren" im Tunesischen `y7jem` ist (Peace Corps `SHAVE` = `7jama`, Zeile 3614 mit 28 Wiederholungen), bestätigt das MSA-Label.

### 🔄 Korrektur meiner eigenen Einschätzung: die `m3allem`-Gruppe

Ich hatte sie als „Block-Entscheidung wie `3ayshik`" eingestuft — **falsch.** TUNICO führt zwei getrennte Lemmata:

- `mʕallim` → `m3allim` = „Chef, Vorgesetzter; Meister, Handwerkermeister"
- `muʕallim` → `mu3allim` = „(Volksschul-)Lehrer"

Ninja bestätigt beides (`mou3allim` مُعَلِّمْ = teacher, `m3allim kbiyr` = professional). **Die Vokalisierung *ist* die Bedeutungsunterscheidung**, und alle vier Zeilen kodieren sie bereits korrekt: 2331 مُعَلِّم Lehrer · 3731 مُعَلِّمَة Lehrerin · 3729 مْعَلِّم Chef · 3730 مْعَلِّمَة Chefin. Nichts geändert. Was ich für Schlamperei hielt, war Präzision.

### 🔸 Neuer Befund: 11 verwaiste ids in `course_lessons.vocab_lesson_refs`

Die Referenz-Kontrolle nach dem Merge zeigte 11 ids, die auf nicht mehr existierende Vokabelzeilen zeigen: **1470, 3672, 3725, 3778, 3814, 3942, 4020, 4313, 4450, 4451, 4452** in den Kurslektionen 2, 3, 5, 6, 7, 8, 9. **Keine davon stammt aus dieser Sitzung** — Altbestand.

`parseCourseVocabRefs()` baut daraus nur ein `Set`; ein unbekanntes id matcht keine Zeile und wird stillschweigend übersprungen. Kein Absturz, aber jede betroffene Lektion hat einen toten Vokabel-Slot und zeigt ein Wort weniger, als der Kurs vorsieht. Nicht angefasst — ob die Zeilen neu angelegt oder die Referenzen entfernt gehören, ist eine eigene Entscheidung.

### Stand danach

Bestand **3.780**. `ar_key`-Gruppen mit korrigiertem Schlüssel 86 → **74** (die 12 abgearbeiteten). Verwaiste `course_exercises`: 0.

---

## Runde 9 · Audit der 21 Live-Prüfregeln (2026-09-12)

Nach zwei stumm falschen Regeln an einem Tag habe ich die Regeln selbst geprüft, statt weiter ihre Ausgabe abzuarbeiten.

**Teil 1 — feuert jede Regel überhaupt?** Jede der 21 gegen ein konstruiertes Positivbeispiel, das zwingend anschlagen muss. **Alle 21 feuern, alle melden 0.** Der Tab liest zu Recht sauber; keine Regel ist im Sinne von „greift gar nicht" kaputt.

**Teil 2 — schluckt eine Regel über ihre Ausnahmeklausel echte Fälle?** Das war die ergiebige Frage.

| Sonde | Ergebnis |
|---|---|
| `isLoanword()` | greift bei 36 von 3.780, reiner Gloss-Marker-Test — eng gefasst ✅ |
| Regel 19, hartkodierte Ausnahmeliste | entschärft genau 2 Zeilen (`hethi`, `shah`), beide berechtigt ✅ |
| **Regeln 5–16: Vorkommen statt Anzahl** | **❌ der Fund** |

`/ح/.test(v.ar) && !/7/.test(v.tr)` schweigt, sobald **irgendwo** im Feld ein `7` steht. Bei Einzelwörtern egal, bei Sätzen ein Loch: `1649 hadh-dhert barsha 7ajet lil-7afla` hat 3 × ح und 2 × `7` — `7ajet` und `7afla` beruhigen die Regel, das falsch geschriebene erste Wort sieht sie nie.

### ✅ Anzahl-Vergleich über 12 Buchstabenpaare: 11 Treffer, 10 echte Fehler

| id | alt → neu | Befund |
|---|---|---|
| 1636 | `nsalhu` → `nsalla7u` | `h` statt ح **und** fehlende Gemination (نصلّحو) |
| 1649 | `hadh-dhert` → `7adhdhart` | `h` statt ح + erfundener Bindestrich — **fünfte** Zeile der `7adhdhar`-Familie |
| 2491 | `rouhou` → `rou7ou` | `h` statt ح in رُوحُو; Bestand schreibt sonst `rou7ek`/`rou7ik` |
| 3074 | `yslah` → `ysla7` | `h` statt ح in يُصْلَحْ |
| 1841 | `t7iz` → `thiz` | umgekehrt: `7` statt ه, das Arabische تهز hat ه |
| 3026 | `t7abbel` → `thabbel` | dito, تَهَبَّل von `habbel` „verrückt machen" |
| 1894 | `dhahab` → `thahab` | ذ ist ausnahmslos `th` (Regel seit 2026-08-07) |
| 1362 | `arabic_script` حَلِّيت / حلَّيت → حَلِّيت | dasselbe Wort zweimal im Feld, mit Schrägstrich getrennt |
| 3692 | `remise` → `roumiz` | Arabisch schreibt روميز arabisiert; Lehnwort-Hinweis ergänzt |
| 2333, 1880 | Lehnwort-Markierung ergänzt | `taxi`/`taxist` waren unmarkiert, 940/2351 dagegen schon |

**ت+ه an der Morphemgrenze ist keine offene Frage** — 6 der 8 Bestandszeilen schreiben es längst als `th` (`waqtha` وقتها, `shrobtha` شربتها, `mammethom`, `thimni` تْهِمِّني). Gleiche Lage wie `tth` und `thh`: dieselbe Buchstabenfolge, entschieden wird am Arabischen.

**Lateinisches `x`** steckt in 5 Zeilen, alle französische Lehnwörter. Lösung ist nicht Umschrift zu `ks` (auch Tunesier schreiben `taxi`), sondern die Markierung im Gloss, damit `isLoanword()` greift.

### 🔸 Offen nach dieser Runde

- **3143** (Sprichwort „Wer die Kutteln nicht waschen kann…") — drei ذ als `d` statt `th` geschrieben: `dbi7a`→`thbi7a`, `makhedtha`→`makheththa`, `makhedtou`→`makhethtou`. Die mechanische Regel erzeugt hier mit `makheththa` etwas schwer Lesbares; das will ich nicht ohne dich entscheiden.
- **1843 `tel3ab jeux vidéos`** — französischer Text samt Akzenten im `darija`-Feld, während das Arabische جو فيديو arabisiert schreibt. Vom Anzahl-Check nicht erfasst.
- **Regel 22 für `TRANSLIT_RULES`?** Der Anzahl-Vergleich hat ~0 % Fehlalarme und erfüllt damit die Aufnahmeregel aus SKILL.md. Das wäre eine Code-Änderung an `trainer.html` und braucht Bestätigung.

### ✅ Regel 22 eingebaut + die letzten drei Punkte erledigt (2026-09-12)

**Regel 22 in `TRANSLIT_RULES`** (`trainer.html`): Konsonanten-Gegencheck nach **Anzahl** statt nach Vorkommen. Buchstabenpaare einmal vorkompiliert in `CONSONANT_PAIRS` neben `isLoanword`, damit nicht je Zeile zwölf Regexe neu gebaut werden. Sie greift bewusst nur, wenn **beide** Seiten mindestens einmal vorkommen — fehlt der Gegenpart ganz, hat Regel 5–16 schon angeschlagen, so meldet kein Fall doppelt.

Verifiziert: Syntax-Check (`vm.Script`) sauber, Positivtest (2 × ح / 1 × `7`) schlägt an, Negativtest (2 × ح / 2 × `7`) schweigt, Lehnwort-Ausnahme greift. **Prüf-Tab steht mit allen 22 Regeln auf 0 von 3.780.**

**`3143`** — meine gestrige Sorge war unbegründet. Ich hatte `makheththa` falsch zusammengesetzt; zwischen ذ und ت steht eine Kasra, es heißt `makhthitha`. Voll lesbar, kein Grund zur Ausnahme. Korrigiert: `makhedtha`→`makhthitha`, `dbi7a`→`thbi7a`, `makhedtou`→`makhithtou`.

**`1843`** — `jeux vidéos` → `jeux video` (Akzente gibt es im Hausalphabet nicht) plus Lehnwort-Markierung, analog zu `taxi`. Damit ist kein unmarkiertes `x` mehr im Bestand.

**Nebenbei repariert: `scratchpad/extract.js`.** Sein Endanker war `"\n];"` — also die *erste* Array-Schließung nach `isLoanword`. Mit `CONSONANT_PAIRS` liegt dort jetzt ein zweites Array, der Extraktor hätte `TRANSLIT_RULES` gar nicht mehr erwischt. Zum zweiten Mal in dieser Sitzung ein zu unscharfer Anker in diesem Skript (vorher: Zeilennummern). Jetzt gezielt auf den Abschluss von `TRANSLIT_RULES` verankert, mit harter Fehlermeldung wenn ein Anker fehlt.

---

## Runde 10 · waw-Gemination entschieden (2026-09-12, 11 Zeilen)

**Mein gestriger Gegenbeleg war keiner.** Ich hatte die waw-Frage offen gelassen, weil Ninja هُوَ als `houwa` mit *einem* `w` schreibt — dort steht aber **keine Schadda**. Ein Waw-Buchstabe ergibt ein `w`. Damit ist die Systematik exakt symmetrisch zu ya:

| | ohne Schadda | mit Schadda |
|---|---|---|
| ya | هِيَ → `hiya` | هِيَّ → `hiyya` |
| waw | هُوَ → `houwa` | هُوَّ → `houwwa` |

Der Bestand bestätigt das mit **40 : 4** (`sawwar`, `lawwej`, `rawwa7`, `dawwara`, `mfawwer`, `ynawwar`, `tsawwert`, `tawwa`, `khawwaf`, `zawweli` …).

### ✅ Ausgeführt

| Gruppe | Zeilen |
|---|---|
| هو-Familie → `houwwa` | 493, 1445, 1782, 3339, 3747 |
| `ahuwa` → `ahouwwa` | 3812 *(die gestern zurückgenommene Korrektur, jetzt mit Begründung)* |
| هي-Familie → `hiyya` | 1887, 3711 *(1643, 3340, 3743 schrieben es schon so)* |
| `taw` → `tawwa` | 1661, 3197 — Bestand 7 : 2, Ninja `tawwa` تَوَّا |
| `melwen` → `mlawwen` | 3163 — Parallelzeile 3710 schrieb `mlawwen` bereits |

`checkAnswer()` akzeptiert alle sechs geprüften Paare in beide Richtungen, Prüf-Tab bleibt auf 0 von 3.780.

### 🚫 Drei Ausnahmen, die der Check zu Recht meldet und die so bleiben

1. **Wortfinale Schadda** wird nicht transliteriert — `dhaw` ضَوّْ, `jaw` جَوّ, `qwi` قُوِّي. Gleiche Regel wie im Gemination-Check.
2. **`shnou`-Familie (7 Zeilen)** — `shnoua` ← شْنُوَّا ist in SKILL.md als gewollte Kontraktion dokumentiert, nicht als Fehler. Die habe ich nicht angefasst. **Aber:** fünf Schreibungen (`shnoua`, `shnou`, `shnouwa`, `shnowwa`, `shnouwwa`) und zwei Arabisch-Endungen (ـا/ـة) innerhalb einer Familie. Eigener Durchgang, Block-Entscheidung wie bei `3ayshik`.
3. **`1622 t3awinni`** تعاوّني — die Schadda sitzt auf dem waw von تعاون und sieht nach einem Tippfehler im Arabischen aus (erwartet: تعاوني). Erst das Arabische klären, dann die Transliteration.

### Zur gestrigen Rücknahme von 3812

Die war **im Ergebnis falsch** — `ahouwwa` ist richtig — **im Verfahren aber richtig**: Die Zeile hätte als einzige gegen ihre Geschwister gestanden, und die Begründung, die das auflöst, lag zu dem Zeitpunkt nicht vor. Lieber eine offene Frage als eine selbstgemachte Inkonsistenz; die Frage wurde dann eben beantwortet.

---

## Runde 11 · Externes Prüfprotokoll gegengeprüft (2026-09-13)

Ein Prüfdurchgang aus einer anderen Sitzung (75 fällige Vokabeln) lag als Protokoll vor. Jeder Befund einzeln gegen die Quellen geprüft.

### Bestätigt und ausgeführt (14 Zeilen)

| id | Änderung | Beleg |
|---|---|---|
| 4422 | `hawwis` هوس → `7awwis` حَوِّس | Ninja `7awwis` حَوِّسْ · TUNICO `ḥawwis` · PC `STROLL (to) = Hawwis` |
| **4341** | `yhawwis` → `y7awwis` يْحَوِّس | **Schwesterzeile, im Protokoll nicht erfasst** (war nicht in der Zielmenge) |
| 3614 | `y7jem` يحجام → `y7ajjim` يْحَجِّم | Ninja `7ajjim` · TUNICO `ḥažžim` · PC `Hajjim` — alle mit `i`, nicht `e` |
| 1574 | `7met` حماة → `7ma` حْمَى, english → „mother-in-law" | Ninja `7maa` · TUNICO `ḥmā`; „protectors" war die MSA-Lesart |
| 1149 | `sweri` → `swari`, english → „shirts" | PC `SHIRT = su:riyya:/swa:ri:` — `swari` ist direkt belegt |
| 4307 | جّو → جَوّ | Schadda auf dem ersten Buchstaben; **letzter Rest der Klasse, die bei 3673 begann** |
| 3658 | سيكريتار → سِكْرِيتَارَة | Femininendung fehlte |
| 4574 | german → „ich ließ fallen / ich warf um" | Ninja „to drop, throw down" · TUNICO „umwerfen" — transitiv |
| **3748** | `heya mhish` → `hiyya mahish` | **Von mir selbst verursacht:** die waw-Runde zog 3747 auf `houwwa`, das Gegenstück blieb stehen |

### Ein Befund stand genau falsch herum

**`487 wsil`.** Das Protokoll wollte `wsel`/`wsal`, argumentiert von der Fatha im `arabic_script`. Aber **TUNICO `wṣil`** und **Peace Corps `ARRIVE (to) = wSil`** schreiben beide exakt unsere Transliteration. Nicht die darija war falsch, sondern die Vokalisierung → وْصَل auf وْصِل korrigiert. Der zweite Punkt stimmte: `english = „to send, take to"` ist `wassil` (Maß II) und wurde auf „to arrive" gesetzt.

### Größer als gemeldet: die `khallas`-Familie

Das Protokoll sah zwei vertauschte Zeilen. Tatsächlich teilen sich **vier** Zeilen (2123, 3189, 3409, 3446) **eine** Konjugationstabelle — und die kodierte die Vertauschung mit: Vergangenheit mit `e`, Präsens und Imperativ mit `a`. Das Arabische war überall richtig (Fatha in der Vergangenheit, Kasra in Präsens/Imperativ), nur `2123` hatte zusätzlich eine falsche Vokalisierung.

Korrigiert: `3189 khallas`→`khallis` · `3409 khalles`→`khallas` · `3446 ykhallas`→`ykhallis` · `2123 nkhallas`→`nkhallis` (+ arabic نْخَلَّص→نْخَلِّص), dazu die geteilte Tabelle komplett neu (Vergangenheit `a`, Präsens/Imperativ `i`). `3409`/`4238 khallas` sind jetzt Transliterations-Homographen → beide `homonym_ok` (TUNICO führt `xallaṣ` und `xallāṣ` als getrennte Lexeme).

### Nicht übernommen

Die **26 `topic`-Befunde**. SKILL.md sagt ausdrücklich, dass bestehende Legacy-Topics nicht gesucht, geprüft oder gemeldet werden.

---

## Runde 12 · Skill- und Trainer-Audit (2026-09-13)

### Skill: die zwei bekannten Fallen sind sauber

- **`\b` statt `\y`:** kein einziges Vorkommen in irgendeinem SQL der drei Skill-Dateien.
- **Zeichenreihenfolge:** die einzige `<Buchstabe>ّ`-Regex ohne Vokaltoleranz steht im eigenen „FALSCH:"-Gegenbeispiel. `arabic_script ~ 'ّ'` allein ist reihenfolge-unabhängig.

### Skill: alle Checks laufen und melden Plausibles

| Check | Treffer | Einordnung |
|---|---|---|
| Konsonanten-Gegencheck | 0 | sauber |
| Plural `-iou` | 0 | sauber |
| Schadda auf erstem Buchstaben | 0 | nach 3673 + 4307 erledigt |
| Halb verdoppelter Digraph | 4 | bekannte korrekte Präfix-`t`/`thh`-Zeilen |
| ya-Gemination ohne `yy` | 11 | dokumentierte Ausnahmen |
| waw-Gemination ohne `ww` | 11 | dokumentierte Ausnahmen |
| Verb-Selbstcheck | 19 | D4-Rückstand |
| Liste C | 21 | mehrwortige Reste |

### Trainer: zwei Härtungen

1. **`sbApiPaged()` vergleicht jetzt gegen den `count`-Header.** Die Funktion kannte `total` und hat es nie geprüft. Ein still unvollständig geladener `ALL_VOCAB` verfälscht SRS-Queue, Duplikat-Check und beide Prüf-Tabs — und sieht dabei wie ein sauberes Ergebnis aus. Jetzt harter Abbruch mit Zeilenzahl statt falsch weiterrechnen.
2. **Der Transliterations-Tab nennt die Grundgesamtheit:** „N von M Vokabeln geprüft · R Regeln", im Erfolgs- wie im Trefferfall. Dieselbe Lehre wie beim Harness-Export — eine Null ohne Nenner ist keine Aussage.

**Geprüft und in Ordnung:** Das Feld-Mapping (`ar: v.arabic_script`, `tr: v.darija`, `en: v.german`) passt zu dem, was die Regeln erwarten — die Konsonantenregeln schauen also wirklich ins Arabische. `sbApi()` wirft bei `!r.ok`, ein Gateway Timeout lässt den Ladevorgang sichtbar scheitern statt ihn stumm zu kürzen. Zähl- und Render-Funktion des Tabs filtern identisch.

---

## Runde 13 · Vokalisierung, erster Block (2026-09-13)

**Warum zuerst:** Von 3.780 Zeilen haben **alle** ein `arabic_script` — die internen Checks erreichen also 100 %. Aber **768 Zeilen (20 %) sind unvokalisiert**, und dort ist jeder Schadda-basierte Check strukturell blind. Genau das hat heute fünfmal zugeschlagen (die `7adhdhar`-Familie allein hatte vier verdeckte Mitglieder).

**`english` ist dagegen die kleinere Lücke, als die Zahl suggeriert:** von 1.699 fehlenden sind **823 Sätze und Phrasen** — die haben kein Wörterbuch-Lemma, da gibt es strukturell nichts nachzufüllen. Von den 876 fehlenden Einzelwörtern sind **655 bereits `external_confirmed`**. Wirklich ungeprüft und ohne Schlüssel: 221 Zeilen (5,8 %).

### Die Ninja-Route ist schwächer als ihre Trefferzahl

50 Zeilen hatten einen *eindeutigen* Ninja-Treffer über das arabische Skelett (Länge ≥ 4). Nach Prüfung waren **20 brauchbar**. Der Rest waren Kollisionen quer über Lexeme:

| unsere Zeile | Ninja-Treffer | Ninjas Bedeutung |
|---|---|---|
| `nimshiw` „wir gehen" | نْمَشْ | **freckles** |
| `nit3asha` „ich esse zu Abend" | إنْتِعَاشَة | **revitalization** |
| `kibrit` „ich wurde alt" | كِبْرِيتْ | **Sulfur** |
| `tnijjem` „du kannst" | تَنْجِيمْ | **occultism** |
| `itrtin` „zwei Liter" | تَرْتِينْ | **tart, pastry** |

Lösung: **Buchstaben-Identitätsprüfung als `AND`-Bedingung im `UPDATE`** — Ninjas Schreibung nur übernehmen, wenn nach Entfernen aller Harakat kein Buchstabe abweicht. Das erschlägt auch die Numerus-Fälle (Ninja gibt den Singular, unsere Zeile ist Plural).

Drei Dinge sieht der Filter nicht und mussten von Hand raus: `4401 tfahim` (Ninjas تَفَاهُمْ ist das Nomen, unsere Zeile das Verb), `1057 toshrob` (Ninjas تِشْرَبْ hieße `tishrab` und widerspräche unserer darija), `797`/`2107` (Ninjas Fassung ist selbst unvokalisiert).

### ✅ 20 Zeilen vokalisiert

`345 bisbes` · `354 jilbena` · `394 maqroudh` · `411 tarbousha` · `527 waqtesh` · `571 ousteth` · `580 tanjra` · `607 tilmith` · `624 frank` · `734 majrou7` · `739 mustashfa` · `807 dakourdou` · `841 hetheka` · `1048 kafteji` · `1064 direct` · `1248 ta7foun` · `1828 stoush` · `2106 fransis` · `2161 khobztin` · `4434 3tash`

19 von 20 haben danach stimmige Skelettpaare; `1064 direct` weicht ab (`drct` gegen `drkt`) — französisches Lehnwort, entsprechend im Gloss markiert. **Prüf-Tab weiter 0 von 3.780:** die 20 Zeilen waren bereits korrekt, sie waren nur nicht prüfbar.

**Stand:** unvokalisiert 768 → **748**, davon 506 Einzelwörter.

### Wie es weitergeht

Die Ninja-Route ist damit weitgehend ausgeschöpft. Für die restlichen 506 Einzelwörter bleiben: **164 mit vokalisiertem Geschwister im Bestand** (gleiches Skelett — strukturell sicherer, weil dieselbe Wortfamilie), der Rest von Hand oder aus TUNICO. Kein Bulk-Job.

**Vorgemerkt, nicht vergessen:** die 6 Trenner-Fälle aus dem externen Protokoll. `checkAnswer()` akzeptiert bei `/` jede Teilantwort — bei `4465 katib` „Schriftsteller / Sekretär" zählt „Sekretär" als richtig, wenn „Schriftsteller" gemeint war. Das verfälscht direkt den Lernfortschritt und ist **kein** Kosmetikpunkt.

### 🚫 Die 6 Trenner-Fälle: nicht ausgeführt, Protokoll wandte den falschen Test an

Das dokumentierte Kriterium lautet ausdrücklich *nicht* „sehen die Formulierungen unterschiedlich aus", sondern „wäre bei isolierter Abfrage dieses Worts **jede** der Antworten korrekt".

| id | Gloss | Prüfung |
|---|---|---|
| 4465 `katib` كَاتِب | Schriftsteller / Sekretär | كاتب heißt beides → „/" korrekt |
| 3399 `tlab` طْلَبْ | er forderte / er bat / er bestellte | طلب heißt alle drei → „/" korrekt |
| 4186 `numru` | Nummer / Größe / Type | ein Lehnwort (numéro) → „/" korrekt |
| 3210 `makhkhir` | zu spät / verspätet / wer zu spät kommt | ein Wort → „/" korrekt |
| 2811 `rwayyeq` | Unsinn / Ausreden / Blödsinn | ein Wort → „/" korrekt |
| 4014 `mastin` | fad (Essen) / fad (Person) | ein Wort, Klammern disambiguieren → „/" korrekt |

Das Protokoll argumentierte durchgehend mit „zwei verschiedene Berufe", „drei verschiedene Sprechakte" — genau der Test, den die Regel verwirft. Der Bug, vor dem sie schützt, ist ein anderer: **zwei verschiedene Wörter** hinter einer darija-Schreibung („er flog / er rasierte"). Polysemie eines Wortes ist der gewollte Fall.

PRECEDENTS.md hält fest, dass diese Überkorrektur schon einmal lief: 108 Zeilen auf „;" umgestellt, **82 wieder zurück**. Nichts geändert.

## Runde 14 · Geschwister-Route zur Vokalisierung — verworfen (2026-09-13)

Die 164 Zeilen mit „vokalisiertem Geschwister" sahen nach der besseren Quelle aus als Ninja. Sie sind es nicht — und zwar **strukturell**: im Arabischen teilt die ganze Ableitungsfamilie dasselbe Konsonantengerüst, und die Vokalisierung ist genau das, was die Wörter trennt.

| unvokalisiert | „Geschwister" | tatsächlich |
|---|---|---|
| `sfer` „null" صفر | `sfor` „gelb (Pl.)" | zwei Wörter |
| `ktob` „Bücher" كتب | `ktib` „er schrieb" | Nomen vs. Verb |
| `b7ar` „Meer" بحر | `ba77ar` „er ging ans Meer" | Nomen vs. Verb Maß II |
| `qra` „er las" قرى | `qarra` „er lehrte" | Maß I vs. Maß II |
| `bra` „genas" برا | `barra` „draußen" | zwei Wörter |

Der Buchstaben-Identitätsfilter, der die Ninja-Route rettet, ist hier **per Konstruktion erfüllt** und hilft deshalb nicht. Von 29 Paaren blieben **2** — nur die, bei denen auch die `darija` identisch ist: `652 maqfoul` (← 2296) und `4410 tsa77ar` (← 4295). Beide ausgeführt.

**Konsequenz:** Der Vokalisierungs-Rückstand ist **keine Kampagne**. Ninja gibt nach Filter ~20, die Geschwister praktisch nichts. Richtig ist die Regel „ohnehin fällige Bearbeitung" — beim Anfassen einer Zeile die Vokalisierung mitziehen. Stand: **746 unvokalisiert, davon 504 Einzelwörter.**

## Runde 15 · Quell-Konventionen konsolidiert + 710 el-manshir entschieden (2026-09-13)

**Anlass:** Nils' zwei Fragen — übernimmt da TUNICO, oder findet sich was bei Ninja/Peace Corps? Und: die Translit-Regeln der drei Quellen hast du oder?

### a) منشير — TUNICO ist die einzige Quelle, nicht die bevorzugte

| Quelle | منشير | ihr Wort für „Korridor/Flur" |
|---|---|---|
| TUNICO (6879) | `manšiṛ` = „Platz (Hof) zum Wäscheaufhängen; Hof im Küchenflügel eines tunesischen Hauses" | — |
| Ninja | **kein Eintrag** | `koulwar` كُلْوَارْ, `mamar` مَمَرْ, `mamchaa` مَمْشَى, `bahouw` بَهُوْ |
| Peace Corps | **kein Eintrag** | HALL = `mza:z` („in a house"), PASSAGE = `maqTa3` |

Dazu zwei unabhängige Stützen: die **Wurzel** ن-ش-ر „ausbreiten/aufhängen" (Nomen loci „Ort zum Aufhängen", gleiche Bildung wie `2910 manshfa` „Handtuch") und der **Lektionskontext** L20 (702–718 ist eine Hausteile-Lektion; 710 steht zwischen Küche/Bad und Treppe/Innenhof). Und: `partner_status='pending'` — von Semia nie bestätigt.

**Ausgeführt nach Freigabe:** `710` german → „der Hof zum Wäscheaufhängen (im Haus)", topic „(L20)" → „Wohnen", Herkunft in `internal_note`, `partner_status` bleibt `pending`.

**Entschieden von Nils:** Lernstand bleibt unverändert (kommt planmäßig am 16.09. dran). Kein neues Wort für „Flur" — erst Semia fragen, welches sie benutzt.

### b) Quell-Konventionen — die Regeln waren da, aber an sechs Stellen

Konsolidiert zu einer Tabelle (SKILL.md → Quell-Konventionen, Commit `bcd458b`). Beim Nachmessen drei vorher undokumentierte Fakten:

| Befund | Zahl |
|---|---|
| **Keine der drei Quellen schreibt je ein `e`** | Ninja 0 von 17.335 · TUNICO 27 von 7.008 · Peace Corps 101 von 8.714 · eigener Bestand 32 % |
| Ninja kennt kein freistehendes `o` | `o` kommt ausschließlich in `ou` vor |
| **Peace Corps schreibt ظ/ذ ausnahmslos `dh`**, Ninja in 38 % der Fälle | ض: Ninja 712:11, PC 29:0 · ظ/ذ: Ninja th 327 : dh 191, PC dh 20:0, TUNICO th 528:1 |
| Peace Corps schreibt خ als `x`, nicht `kh` | 659 von 8.714 Formen |

**Konsequenz 1:** eine Vokalabweichung gegen eine Quelle ist strukturell erwartbar und **nie für sich genommen ein Befund** — genau der Fehler des externen Prüfprotokolls bei `487 wsil`.
**Konsequenz 2:** ein `dh` von Ninja oder Peace Corps ist **kein** Gegenbeleg gegen unsere ausnahmslose ظ/ذ→`th`-Regel. Nur TUNICO kann sie prüfen.

In IMPORTS.md korrigiert: die Ninja-Suchtabelle behauptete für `th` „ث oder ذ … gleich" — für ذ/ظ stimmt das nur in 64 % der Fälle.

## Runde 16 · vocabulary_review-Altlast aufgeklärt + drei neue Befunde (2026-09-13)

### a) Die „15 Altlasten" sind in Wahrheit 1.533 — und keine Vorschläge

Meine Notiz aus dem Skill-Test war falsch. Vermessen:

| `change_category` | `reviewed` | Zeilen | davon inhaltlich abweichend |
|---|---|---|---|
| **NULL** | false | **1.533** | **335** |
| alle übrigen Kategorien zusammen | — | 1.128 | 314 |

Entscheidend ist der Zeitstempel: **alle 1.533 Zeilen tragen exakt einen** — `2026-07-25 09:03:00+00`. Ein einziger Bulk-INSERT, keine 1.533 Einzelentscheidungen. 1.198 davon sind byteidentisch mit dem heutigen `vocabulary`-Stand, alle haben `lesson_id`, nur 5 waren `flagged` (alle längst erledigt).

Die Richtung der Abweichungen beweist es endgültig — die Review-Zeile hält durchweg den **älteren, schlechteren** Wert:

| id | Stand 25.07. | heute |
|---|---|---|
| 290 | `3anda` | `3andha` |
| 326 | `anzas` | `anjas` |
| 388 | `7ather` | `7adher` |
| 435 | `thayyaq` | `dhayyaq` |

`7ather`→`7adher` und `thayyaq`→`dhayyaq` sind genau die ض→`dh`-Entscheidung vom **2026-08-06** — also nach dem Snapshot. **Das ist ein Backup von `vocabulary` vom 25.07., kein Vorschlagsbestand.**

**Warum das trotzdem stört:** `vocabulary_review.vocabulary_id` ist UNIQUE. Diese 1.533 Zeilen belegen den Slot für 1.533 Vokabeln, sind in der App unsichtbar (sie filtert hart auf `change_category in (ninja_check_pending, ninja_check_kein_vorschlag, ninja_check_kommentiert)`) — und 335 davon lesen sich nach Skill-Regel 5 als „bestehende Zeile mit abweichendem Vorschlag → Konflikt". Genau das ist mir beim Skill-Test an `710` passiert.

**Vier Trainer-Zugriffe auf die Tabelle geprüft** (Zeilen 3332, 4315, 6167/6171, 6268–6328): alle filtern auf `change_category` oder adressieren eine einzelne `vocabulary_id`. Eine Umetikettierung ist für die App unsichtbar.

**Vorschlag (nicht destruktiv, umkehrbar):**
```sql
UPDATE vocabulary_review SET change_category = 'snapshot_2026_07_25', reviewed = true
WHERE change_category IS NULL AND NOT reviewed;   -- 1.533 Zeilen
```

### b) Lateinische Buchstaben im `arabic_script` — 3 Zeilen, alle kaputt

| id | darija | `arabic_script` | Soll |
|---|---|---|---|
| 471 | `besh` | `بش  (Zukunftsmarker)` | `بش` — Notiz gehört ins `german` |
| 529 | `baash` | `باش (Zweck)` | `باش` — dito |
| 1473 | `aba babab` | `aba babab` | echtes Arabisch fehlt komplett |

Bei 529 liefert `_arabic_skeleton` dadurch `bsh(zck)` — Skelett-Vergleich und Duplikat-Check laufen für die Zeile ins Leere.

**Kein A-Check für Klammern:** von 9 Zeilen mit `(` im `arabic_script` sind 6 legitim (arabische Klammern für optionale Bestandteile, `يْبَارِكْ فِيك (يْعَيِّشِك)`). Nur lateinische Buchstaben sind ein sicherer Treffer — das ist der A-Check, die Klammer ist Liste B.

### c) `aa`/`ee`/`oo` in der darija — 25 Zeilen, kein bestehender Regel-Treffer

Die Ziel-Konvention markiert Langvokale **nicht**. Vier Treffer sind Lehnwörter (`weekend` ×3, `loofah`) und damit legitim. Bleiben 21: `kaas`, `7araam`, `3aalam`, `naaqes`, `naaje7`, `maasit`, `maasta`, `bisklaat`, `maatsh`, `raayidh`, `maayu`, `athaaka`, `akkaaka`, `ma7laa`, `mraa`, `sbaa7`, `warreeni`, `shniyyaa`, `3aysheen`, `aallha`, `baash`.

Keine der 22 Trainer-Regeln greift darauf — Kandidat für Regel 23. Zwei Sonderfälle stecken drin: `768 aallha` hat auch ein kaputtes Arabisch (`االله` statt `الله`), und `529 baash` / `471 besh` sind **dasselbe Arabisch باش mit zwei Schreibungen und zwei Bedeutungen** („um zu" vs. „wird").

### Nachtrag zu b) — ausgeführt und ein Fund bei 1473

`471` und `529` bereinigt (Freigabe von Nils):

| id | `arabic_script` vorher | nachher | `german` nachher | Skelette |
|---|---|---|---|---|
| 471 | `بش  (Zukunftsmarker)` | `بش` | `wird (Zukunftsmarker)` | `bsh` = `bsh` ✓ |
| 529 | `باش (Zweck)` | `باش` | `um zu / damit (Zweck)` | `bsh` = `bsh` ✓ |

Beide Skelettpaare stimmen jetzt überein. Die Notiz kam ins `german`-Feld, nicht in `internal_note` — sie unterscheidet die beiden Einträge beim Antworten, dafür ist sie da. Herkunft steht in `internal_note`.

**`1473 aba babab` — Ninja hat den Ausdruck:**

| | |
|---|---|
| Ninja | `بَابَابْ` / `babab` / „Wow, wow, how nice" / `(INTERJ)` |
| Audio | `recordings/16355.mp3`, 2.888–5.734 |
| Beispiel | `بَابَابْ ! قداّش يكذب الرّاجل هذا !` = „Wow, wow, how that guy lies!" |

Zwei Dinge dazu, beide offen:
1. Ninja kennt nur `babab`, kein vorangestelltes `aba`. Ob Semia wirklich „aba babab" sagt, kann ich nicht entscheiden — geraten wird nicht.
2. Unser Gloss „Du siehst gut aus!" ist **enger als die Quelle**. Ninjas Beispielsatz („wie der Kerl lügt!") zeigt einen allgemeinen Ausruf des Staunens, auch negativ. „Wow!" trifft es besser.

Audio läge bereit, sobald die Schreibung geklärt ist.

## Runde 17 · Lohnt sich `vocabulary_review` überhaupt? (2026-09-13)

Nils' Frage, zweimal gestellt. Gemessen statt geschätzt — und das Ergebnis korrigiert meine eigene erste Antwort.

### Der Kanal existiert zweimal

| | Kanal A · direkt auf `vocabulary` | Kanal B · über `vocabulary_review` |
|---|---|---|
| Wo | `partner_status`, `partner_comment`, `status_updated_at` | eigene Tabelle, 23 Spalten |
| Im Trainer | Semias Prüfmodus + „gemeinsam prüfen" (Zeile 1714 ff., 2021 f.) | Ninja-Check-Tab (Zeile 6167 ff.) |
| Entscheidungen insgesamt | **326** (237 approved, 84 pending, 5 skipped) | **61** (32 ✅, 29 👍) |
| Freitext-Rückmeldungen | **0** | **1** |
| Zuletzt benutzt | 2026-08-30 | 2026-09-02 |

**Das widerlegt mein eigenes Argument von vorhin.** Ich hatte geschrieben, die Tabelle müsse bleiben, weil der 💬-Rückkanal keinen Ersatz hat. Er hat einen — `vocabulary.partner_comment` — und **beide** sind praktisch ungenutzt (1 bzw. 0 Einträge). Der Rückkanal ist kein Argument für die Tabelle.

### Was nur die Tabelle kann

Einen **Vorschlagswert neben dem Istwert** halten (anderes `darija`/`arabic_script`, noch nicht übernommen), damit man beides vergleichen und ✅ drücken kann. `partner_comment` kann nur Text. Das ist eine echte Fähigkeit — aber eine Tabelle wert nur, wenn dort tatsächlich Vorschläge warten. Aktuell warten **null**.

### Bilanz

3.181 Zeilen, 28 Kategorien, 23 Spalten — für 61 Entscheidungen. Davon 1.533 Backup-Zeilen und 1.587 Zeilen in Kategorien, die niemand liest. Ein Fehlkonflikt im letzten Prüflauf (`710`) ging direkt darauf zurück.

### Empfehlung: hart reduzieren, nicht abschaffen — mit Ablaufdatum

1. 1.533 Snapshot-Zeilen löschen (Backup liegt in git, `61edeb1`)
2. 1.587 Zeilen in erfundenen Kategorien löschen — reiner Rückstand
3. die 10 toten Spalten droppen

Danach: ~61 Zeilen echte Historie, 13 Spalten, **keine Änderung an `trainer.html` nötig**. In der Größe kostet die Tabelle nichts und die Fehlerbilder sind weg.

**Der Test danach:** stehen in drei Monaten immer noch null offene Vorschläge drin, ist sie überflüssig und der Tab wird gegen `vocabulary.partner_*` neu gebaut. Reduzieren ist billig und umkehrbar, Abschaffen kostet eine Code-Änderung — in dieser Reihenfolge entscheidet die Nutzung, nicht die Vermutung.

### Nachtrag: 1473 ausgeführt

`arabic_script` von `aba babab` (lateinisch!) auf `أَبَا بَابَابْ`. Skelette stimmen jetzt (`bbbb` = `bbbb`). Zweiter Teil von Ninja belegt, `aba` als أَبَا abgeleitet — beides in `internal_note` auseinandergehalten. Ninja-Audio **nicht** angehängt: die Aufnahme spricht nur `babab`, nicht den ganzen Ausdruck (Regel „Audio nur bei wirklich identischer Aussprache").

### Warnung zum Löschschutz

Der Trigger `trg_prevent_mass_delete` (max. 10 Zeilen pro Statement) prüft `current_user NOT IN ('anon','authenticated') → RETURN NULL`. Meine MCP-Verbindung läuft als `postgres`. **Der Schutz greift bei mir nicht.** Bei Massenoperationen hängt alles an der Vorlage-vor-Schreiben-Regel, nicht an der Datenbank.

## Runde 18 · `vocabulary_review` entfernt (2026-09-13)

Nils' Entscheidung, mit der Begründung, die den Kern traf: *„Ein Sinn war ja auch die letzten Abfragen zu dokumentieren. […] Ging darum die Abfragen bei Ninja nicht immer online machen zu müssen."* Mit 17.335 Ninja-, 7.543 TUNICO- und 5.070 Peace-Corps-Zeilen offline ist genau dieser Zweck erledigt.

**Ausgeführt in vier Schritten, jeder einzeln gezeigt:**

| # | Was | Ergebnis |
|---|---|---|
| 0 | Backup von neun Tabellen nach `exports/backup_2026-09-13/` | 936 KB, alle acht live gezogenen Zeilenzahlen exakt gegen die DB abgeglichen, jede Datei nach dem Packen wieder aufgemacht und geparst |
| 1 | 61 echte Begründungen nach `vocabulary.internal_note` | gerettet, Nils' eigene Notizen stehen weiter davor (`730`: „Sadie- so klingt das audio") |
| 2 | `trainer.html` bereinigt | **202 Zeilen weg** (7.951 → 7.749), null Restvorkommen, `node vm.Script()` sauber, alle onclick-Handler lösen auf |
| 3 | `DROP TABLE public.vocabulary_review` | ohne CASCADE — hätte doch etwas daran gehangen, wäre es gescheitert |
| 4 | Skill nachgezogen | Schritt 1 und Schritt 5 neu, IMPORTS.md-Verweis, PRECEDENTS-Eintrag |

**Was der Skill jetzt anders sagt:**

- **Schritt 1** liest statt der Review-Tabelle `vocabulary` selbst: `internal_note` (was frühere Sitzungen geprüft haben, inkl. der geretteten Ninja-Begründungen), `partner_status` (Semias Spur — `pending` heißt *nie bestätigt*, das war bei `710` das stärkste Signal im Datensatz) und `partner_comment`.
- **Schritt 5** hat nur noch einen Pfad: `UPDATE vocabulary`. Geflaggte Zeilen bekommen zusätzlich `flagged=false`, `ninja_checked_at` und die **angehängte** Begründung in `internal_note` — nie überschreiben. Mit zwei ausformulierten Beispielen, darunter das für „keine Quelle gefunden", damit die nächste Sitzung nicht dieselbe Suche wiederholt.

**Zwei Nebenbefunde:**

1. Es gab längst richtige Backup-Tabellen — `vocabulary_backup_2026_07_25` (3.193 Zeilen) und `_2026_08_02` (3.274). Die 1.533 Spiegelzeilen in der Review-Tabelle waren also von Anfang an redundant, und die echte Sicherung desselben Tages ist sogar vollständiger.
2. Eine Toast-Meldung im TUNICO-Flow („geflaggt für Ninja-Check") zeigte auf den entfernten Tab — auf „geflaggt zum Prüfen" geändert. Das Flag selbst bleibt: 🚩 heißt weiterhin „muss geprüft werden", nur der Vorschlags-Zwischenspeicher ist weg.

## Runde 19 · chatalpha-Spalte für Ninja + neuer Zeichen-Check (2026-09-13)

**Nils' Frage „Macht die View vocab_lookup nicht so was Ähnliches?" war der Treffer.** `vocab_lookup.chatalpha` gab es schon — gefüllt für TUNICO (94 %) und Peace Corps (98 %), **leer für Ninja (0 von 17.335)**. Kein neues Konzept, ein Loch bei der größten Quelle.

**Gebaut:** `public._arabic_to_chatalpha(arabic_script)` + Spalte `derja_ninja_entries.chatalpha`, 16.577 Zeilen gefüllt (95,6 %), in `vocab_lookup` durchgereicht.

**Abnahme:** 562 Zeilen mit identischem Arabisch → 93,6 %; ohne Lehnwörter 534 → **96,4 %**. Die Abweichungen waren keine Funktionsfehler.

**Regel für alle drei Quellen:** `chatalpha` ist **konsonanten-verbindlich, vokal-hinweisend**. Konsonantenunterschied = Befund, Vokalunterschied = keiner.

### Der unerwartete Teil: ein Check, den keine der 22 Regeln ersetzt

Die Funktion läuft genauso auf **unserem eigenen** `arabic_script`. Ergebnis mit den zwei Pflichtfiltern (nur Einzelwörter, nur vollvokalisiert): **1.179 geprüft, 44 Treffer (3,7 %), ~35 echt.**

Warum keine bestehende Regel das fängt: `bathriq` für بطريق **enthält** ein `t` — im `th`. Vorkommensprüfung und Regel 22 (Anzahl-Gegencheck) laufen beide daran vorbei. Nur ein Zeichen-für-Zeichen-Vergleich sieht es.

**Ohne die Pflichtfilter: 224 statt 44 Treffer** — bei Sätzen ist das Arabische meist nur teilweise vokalisiert, unmarkiertes ي/و wird als Konsonant gelesen (`bir-ra7a` → `balra7a`). Das ist dokumentiert, damit die Filter nicht als Bequemlichkeit missverstanden werden.

**Die 44 zur Freigabe offen.** Richtung ist je Zeile zu klären — bei `7orriyya` fehlt die Schadda dem **Arabischen**, nicht der `darija`.

## Runde 20 · Die 40 abgearbeitet (2026-09-13)

Nils' Entscheidungen: die 40 bearbeiten; bei `g`-Aussprache bleibt die `darija` und das Arabische
wird umgestellt; beim Artikel umgekehrt die `darija` anpassen.

| Block | n | Was |
|---|---|---|
| 1 · `darija` korrigiert | 18 | Gemination (`nshimm`, `7orr`, `littaw`, `rottila` …), Digraph (`mokhkhou`, `mashshi`, `nsharshir`, `mshakhkhra`), Tippfehler `brrsha`→`barsha`, Artikel raus (`iqtisad`, `theni`, `bint 3am`) |
| 2 · `arabic_script` korrigiert | 8 | fehlende Schadda (`نُصّ`, `أَهَمِّيَّة` ×2, `حُرِّيَّة`, `بَصّ`, `دَزّ`, `يْنَحِّي`) und ڤ→ق bei `yqarqir` |
| 3 · Lehnwörter markiert | 8 | `(frz.)` bzw. `(ital.)` ins `german`, damit die bestehende Ausnahme greift |
| 4 · ق → ڨ | 20 | alle Zeilen mit `g` in der `darija` und ق im Arabischen |

**Ergebnis: 55 offene Treffer → 15.** Die verbliebenen 15 sind genau die, die stehen bleiben
sollten, plus die zwei dokumentierten Fehlalarme (`fil`→`fi`, `3744 dour` Wortversatz).

### Der wichtigste Fund kam beim Prüfen der Nebenwirkung

Vor den 20 ڨ-Umstellungen habe ich nachgesehen, was sich am `arabic_skeleton` ändert.
**`_arabic_skeleton()` kannte گ ڨ ڤ پ nicht** und ließ sie roh stehen — `بَڨْرَة` ergab `bڨr` statt `bgr`.

Betroffen waren nicht 20, sondern **699 Zeilen**: 76 im Bestand und **623 bei Ninja** (3,6 % der
größten Quelle), alle für jeden Skelett-Abgleich unsichtbar. Die Umstellung hätte den Fehler auf
20 weitere Zeilen ausgedehnt.

Repariert, beide gespeicherten Skelettspalten neu berechnet, erst dann umgestellt.

## Runde 21 · Vokalisierung wird doch eine Kampagne (2026-09-13)

Der Skill sagte: *„Der Vokalisierungs-Rückstand ist nicht als Kampagne abarbeitbar, Ninja liefert
nach Filter ~20 pro Durchgang."* **Das galt, weil `_arabic_skeleton()` kaputt war** — 623 Ninja-Zeilen
waren für jeden Skelett-Join unsichtbar. Nach der Reparatur von heute Vormittag:

| | |
|---|---|
| unvokalisierte Einzelwörter | 507 |
| mit vokalisiertem Ninja-Treffer | 364 |
| buchstabenidentisch (Pflichtfilter) | 130 |
| **genau eine** Ninja-Vokalisierung | **122** |

Gebaut: `public.vokalisierung_kandidaten` — wendet den Pflichtfilter mechanisch an und liefert zwei
der drei Handprüfungen als Spalte (Vokalfolge gegen unsere `darija`, Wortart-Verdacht).

**59 geschrieben.** Reichweite des Zeichen-Checks: **1.179 → 1.275** vollvokalisierte Einzelwörter.
58 der 59 brachten Ninja-Audio mit. Genau eine neue Abweichung im Zeichen-Check: `521 colis`,
das französische Lehnwort — als `(frz.)` markiert, damit es aus den Prüfungen fällt.

**Fünf hat erst das Gegenlesen gefunden**, nicht der Filter:

| id | unser Gloss | Ninja | |
|---|---|---|---|
| 4358 | `glass` „Kleiderschrank" | „class(room)" | كلاس ist „Klasse"; unser Wort ist ڨلاص — dasselbe, das heute bei 3579 auf ڨ umgestellt wurde |
| 4180 | `kasa` „Waschlappen" | „cashier" | كاسة ist die Kasse |
| 1576 | `louza` „Schwägerin" | „almond" | لوزة heißt Mandel |
| 735 | `maktou3` „gebrochen" | „not available" | مقطوع = abgeschnitten |
| 648 | `nshid` „reservieren" | „to ask" | نشد = fragen |

**Der Filter prüft Buchstaben, nicht Bedeutung.** Beide mechanischen Prüfungen waren bei allen fünf
sauber. Offen: 47 mit abweichender Vokalfolge, 11 mit Wortart-Verdacht.

## Runde 22 · Die 47 mit abweichender Vokalfolge (2026-09-13)

Erster Schritt war eine Korrektur an meinem eigenen Filter: er verlangte **exakte** Vokalgleichheit
und hat damit die legitimen Imala-Fälle (`berid`/`barid`) mit in die Verdachtsgruppe geworfen.
Neue Funktion `_imala_vereinbar()` setzt Lautlehre-Regel 1 um — unser `e` darf gegen Ninjas `a`
oder `i` stehen. Damit zerfallen die 47 in:

| | n | |
|---|---|---|
| **A** nur Imala | 17 | kein Befund, Vokalisierung übernehmbar |
| **B** echter Vokalunterschied | 8 | die `toshrob`/`tishrab`-Klasse |
| **C** andere Silbenzahl | 22 | meist andere Wortform |

**17 geschrieben** (13 aus A nach Bedeutungsprüfung, 4 unstrittige aus C: `mai`, `radio`, `film`, `omo`).

### Abgelehnt — Ninja hat ein anderes Wort oder eine andere Form (11)

| id | unser Wort | Ninjas Eintrag |
|---|---|---|
| 891 | `ktob` „Bücher (pl.)" | `ktib` „to write" — der im Skill dokumentierte Fall |
| 4448 | `n3am` „ja" | `n3im` „to enjoy" |
| 1521 | `wled` „Söhne" | `walid` „father, dad" |
| 1697 | `tkun` „du bist" | `tkawwin` „to be formed" |
| 1023 | `sghir` „klein" | `sghayyar` Diminutiv |
| 616 | `kbir` „groß (m.)" | `kbira` — feminine Form |
| 4397 | `wassal` „er brachte hin" | `wsil` „to arrive" — Maß II gegen Maß I |
| 1057 | `toshrob` „du trinkst" | `tishrab` „to be drunk, consumed" — Passiv |
| 1247 | `t3adda` „er verging" | `ti3da` — ohne Schadda, andere Form |
| 590 | `khfif` | Ninjas خْفيفْ ist selbst unvollständig vokalisiert |
| 4413 | `tqabil` | Ninjas تْقًابِلْ trägt ein sinnloses Tanwin — kaputte Quelldaten |

### Echte Funde, zur Entscheidung

| id | Befund |
|---|---|
| **4365** | `khassatan` „besonders" gegen خصوصا — **die Transliteration passt nicht zum Arabischen.** خصوصاً ergibt `khsousan`; `khassatan` wäre خاصةً. Eines von beiden ist falsch |
| **529** | `baash` „um zu" gegen بَاشْ = `bash`. Bestätigt das `aa`-Problem von Runde 16 — und Ninja glossiert باش als „future marker", also als das, was bei uns `471 besh` ist |
| 1183 | `qe3da` „gerade (f.)" gegen قاعدة „(military) base, foundation" — zwei Lexeme gleicher Schreibung |
| 1405 | `bye` „Tschüss" gegen بَايْ „Bey (osmanischer Titel)" — Ninjas Eintrag ist ein anderes Wort |
| 1028 | `dakhel` „innen" gegen دَاخِلْ „going into, entering" (Partizip) |
| 1777 | `feragh` „leer (m.)" gegen فراغ „emptiness" — Nomen gegen Adjektiv; „leer" wäre فارغ |
| 606 | `maktab` gegen Ninjas مَكْتِبْ `maktib` — ungewöhnliche Kasra, hier ist eher Ninja verdächtig |
| 566 | `shera3` gegen شَارِعْ `shari3` — unsere zweite Silbe passt nicht |
| 4406 | `wafaq` gegen وَافِقْ `wafiq` — Perfekt gegen Imperativ/Partizip |

Dazu neun Fälle mit unklarer Silbenzahl (`hrisa`/`harisa`, `lbis`/`libis`, `mraa`/`maraa`,
`ithniya`/`thniyya`, `okhwa`/`akhowwa`, `banka`/`bank`, `el-batala` (Artikel), `fransawi`
(Ninja unvollständig), `idara` — dort ist Ninjas `adara` ein Artefakt meiner Funktion, die إ als `a` liest).

## Runde 23 · Verifikationslauf nach ~200 Schreibvorgängen (2026-09-13)

Ich habe heute zwei Skelettspalten neu berechnet und 96 Zeilen im `arabic_script` geändert.
Der Duplikat-Check läuft auf Skeletten — ob dabei neue Dubletten entstanden sind, war ungeprüft.

**Alle Wächter sauber:**

| Check | Ist | Soll |
|---|---|---|
| unbekannte arabische Zeichen | 0 | 0 |
| rohes Zeichen im Skelett (beide Tabellen) | 0 | 0 |
| Regel 23 Sonderbuchstaben | 0 | 0 |
| ض ohne `dh` / ظ,ذ ohne `th` | 0 / 0 | 0 |
| ungültige Anfangs-Schadda | 2 | 2 bekannt |

**Dubletten: 13 Gruppen mit identischem `arabic_script`, davon 12 längst als `homonym_ok`
markiert** (`sakkar` Imperativ/Perfekt, `maqfoul`, `lawwej`, `3am` „schwamm"/„Jahr" …).

**Genau eine Gruppe ist neu — und ich habe sie heute erzeugt.**

`2142 brik` wurde von mir aus Ninja vokalisiert (بريك → بْرِيكْ) und kollidiert seither mit
`385 brika`. Die Prüfung zeigt: es ist keine Dublette, sondern ein **falsch benanntes Wort**.

| Quelle | sagt |
|---|---|
| Ninja | `مَلْسُوقَةْ malsouqa` → „wrappers for brik" |
| TUNICO | `malsuqa` → „**Brik-Teigblatt, Blätterteig**" · `brik` → „Brik" |

`2142` trägt also den **richtigen deutschen Gloss** („Brik-Teigblatt") an der **falschen Vokabel**.
Das Teigblatt heißt `malsouqa`, nicht `brik`. Und `malsouqa` **fehlt im Bestand komplett**.

Dazu ein zweiter Befund an `385 brika`: die `darija` endet auf `-a`, das Arabisch بْرِيكْ nicht.
TUNICO schreibt `brik`. Der Zeichen-Check meldet das nicht, weil die Skelette (`brk`) übereinstimmen —
**ein auslautender Vokal ist für den Skelettvergleich unsichtbar.**

**Zur Entscheidung:**
1. `2142`: `brik` بْرِيكْ → `malsouqa` مَلْسُوقَةْ (Ninja hat Audio), Gloss bleibt
2. `385`: `brika` → `brik`, oder das Arabische auf بْرِيكَة

**Lehre für den Skill:** eine Vokalisierungs-Kampagne ändert `arabic_script` und damit die
Dubletten-Lage. Der Duplikat-Check gehört danach gelaufen, nicht irgendwann.

### Nachtrag zu Runde 23 — beide Korrekturen ausgeführt, und drei Funktionsfehler gefunden

`2142`: `brik` بْرِيكْ → `malsouqa` مَلْسُوقَةْ, Gloss „Brik-Teigblatt" bleibt, **Audio umgezogen**
(die alte Aufnahme sprach `brik`). `385`: `brika` → `brik`.
Dubletten danach: 12 Gruppen, **alle `homonym_ok`**.

**Der blinde Fleck, den `385` aufdeckte:** der Skelettvergleich streicht Vokale, also sind
`brika` und `brik` für ihn identisch. Eigener Check gebaut → **31 Treffer**.

Beim Lesen der 31 waren zwei Klassen **Fehler meiner Ableitungsfunktion**, nicht der Daten:

| Fehler | Beispiel |
|---|---|
| wortfinales و als Konsonant `w` statt Suffixvokal `ou` | نِحِلّو → `ni7illw` statt `ni7illou` — das ganze Präsens-Plural-Paradigma |
| Alif al-wiqaya (stummes ا nach و) als `a` ausgegeben | إِقْرَوْا → `aiqrawa` |

Die erste Reparatur griff zu weit und machte aus إِقْرَوْا ein `aiqraou`. **Richtig ist:** wortfinales و
nach einem **Konsonanten** ist das Suffix `-ou`, nach einem **Vokal** der Halbvokal (`-aw`, `-iw`).
Dritter Nachzieher: bei رَاهُوْ trägt das و ein Sukun. Danach **16 von 16 Testfällen**.

Ninja-`chatalpha` neu berechnet (142 Zeilen betroffen). Lücke danach: **31 → 27**.

**Lehre:** zeigt eine Verdachtsliste eine Systematik, ist die erste Frage nicht „welche Zeilen
korrigiere ich?", sondern **„Datenmuster oder Werkzeugfehler?"**. Hier waren 4 von 31 ein
Werkzeugfehler — als Daten korrigiert hätte ich vier richtige Zeilen kaputtgemacht.

## Runde 24 · Skill-Audit (2026-09-13)

Reihenfolge nach Nils' Vorgabe: **richtig zuerst**, dann Dopplung, dann Größe.

### Richtig

| Befund | Status |
|---|---|
| Kurzstand-Tabelle: 746 statt 669 unvokalisiert, 504 statt 431 Einzelwörter | ersetzt durch `qualitaets_checks` |
| **Widerspruch im Skill**: oben „keine Kampagne", unten seit heute früh das Gegenteil | behoben |
| PRECEDENTS sagte „alle 22 Trainer-Regeln", wir sind bei 23 | korrigiert |
| Verweis „SKILL.md → derja_ninja_entries" — der Abschnitt steht in IMPORTS.md | korrigiert |
| drei Stellen mit Momentaufnahme-Zahlen, die aktuell klangen | als historisch gekennzeichnet |

Mechanisch gegengeprüft: alle Querverweise lösen auf, alle Schnellzugriff-Ziele existieren,
keine Verweise auf entfernte Tabellen außerhalb der historischen Abschnitte.

**Eine eigene Überstellung zurückgenommen:** ich hatte den Topic-Abschnitt als „widerspricht dem
Bestand" bezeichnet. Falsch — er dokumentiert die zwölf Ad-hoc-Werte ausdrücklich als „bewusst
nicht aufgenommen".

### Dopplung

29 dateiübergreifende Textdopplungen gemessen. Die meisten sind **gewollt** (SKILL nennt die Regel,
PRECEDENTS erzählt den Fall). Gefährlich ist nur, wo Kopien auseinandergehen — genau eine gefunden
(die Regelzahl).

Strukturell zusammengelegt: die **Digraph-Gemination** stand in beiden Dateien fast vollständig.
SKILL behält jetzt Regel, Ausnahme und Selbsttest (21 → 8 Zeilen), PRECEDENTS die Belege.

### Größe

| | vorher | nachher |
|---|---|---|
| A-Checks (SQL im Skill) | 181 Zeilen | **51** — Sicht `qualitaets_checks` |
| Kurzstand-Tabelle | 30 | **14** |
| Topic-Werteliste | 67 | **8** — ersatzlos gestrichen, Nils: "da muss es auch keine Whiteliste für geben" |
| Digraph-Block | 21 | **8** |
| **SKILL.md gesamt** | **1.091** | **883** |

Zwei neue Objekte in der DB: `qualitaets_checks` (13 A-Checks auf 0, 4 B-Rückstände mit Zahlen) und
die Topic-Werteliste ist ersatzlos entfallen — ich hatte sie erst in eine Tabelle ausgelagert, aber Nils wollte sie gar nicht: "einfach was ungefähres reinschreiben".

**Prinzip:** was mechanisch ist, gehört in die Datenbank — dort kann es nicht gegen das Schema
driften und kostet keinen Kontext. Was im Skill bleibt, ist das, was SQL nicht sagen kann: was ein
Treffer bedeutet und wo die Fallen liegen. **B-Listen bewusst nicht verschoben** — dort muss man
den Filter sehen, weil man ihn beim Arbeiten anpasst.

## Runde 25 · Skill-Test an zwei Aufgaben im Vergleich (2026-09-13)

Auftrag: den Skill einmal an 19 morgen fälligen Vokabeln durchspielen und einmal am Hinzufügen
von 5 allgemeinen deutschen Wörtern — dann Ablauf und Ergebnisse vergleichen.

### Aufgabe A · 19 fällige prüfen

**Der Test fand einen Fehler, bevor die erste Vokabel angesehen war.** Das Fällig-SQL, das ich
heute selbst in den Skill geschrieben hatte, ist falsch:

| Variante | Treffer am 14.09. | im Winter (14.12.) |
|---|---|---|
| Skill-SQL `timestamp '<tag> 03:00'` | 67 | 2 |
| korrekt, über die Zeitzone | **76** | **9** |

`progress.next_review` ist `timestamp WITHOUT time zone`, enthält aber **UTC**. 03:00 Berlin sind
01:00 UTC im Sommer und 02:00 im Winter. Das harte `03:00` vergleicht gegen 05:00 Berlin und
verliert genau die Zeilen, die zu Tagesbeginn fällig wurden — **12 % im Sommer, 78 % im Winter.**
Korrigiert auf `(timestamp '<tag> 03:00' AT TIME ZONE 'Europe/Berlin') AT TIME ZONE 'UTC'`.

**Schritt 2 (intern) war sauber** — Zeichen-Check und auslautender Vokal ohne Treffer. Zwei
Beobachtungen dabei:
- **`qualitaets_checks` lässt sich nicht auf eine Auswahl einschränken.** Der Skill verlangt in
  Schritt 2 „die Checks, auf die Auswahl eingeschränkt"; die heute gebaute Sicht kann das nicht.
- **`786 7araam` rutscht durch beide Checks.** Das `aa` verstößt gegen die Konvention, aber
  Skelette streichen Vokale — kein Check sieht es. Steht seit Runde 16 auf der offenen Liste.

**Schritt 3 (extern) lieferte die Ergebnisse:**

| id | Befund |
|---|---|
| **1574 `7ma`** | **geflaggt** — TUNICO bestätigt exakt `7ma = Schwiegermutter`. Flag kann weg |
| **536 `bu3d`** | TUNICO: `bu3d = Entfernung (in Zeit und Raum)` — **bestätigt unseren Eintrag** und löst den alten `masefa`-Konflikt aus `vocabulary_review` auf |
| 647 `raj3` | „er kam zurück"; TUNICO trennt `rja3` (zurückkommen) von `raja3` (wiederholen). Unsere Form passt eher zu `rja3` |
| 730 `sidr` | TUNICO schreibt `sdir` für „Brust" — andere Vokalstellung |
| 786 `7araam` | TUNICO `7ram` — das `aa` bestätigt sich als Abweichung |

### Aufgabe B · 5 Wörter hinzufügen (Löffel, Regenschirm, vergessen, laut, Nachbar)

**Ergebnis: null neue Vokabeln.** Alle fünf sind vorhanden — der Duplikat-Check hat fünf Dubletten
verhindert. Das ist kein Fehlschlag, sondern der Normalfall.

Zwei Befunde entstanden trotzdem:
- **`vergessen` hat 2 von 3 Verbzeilen**: `551 nsa` („er vergaß") und `1228 ninsaw` („wir vergessen")
  existieren, die Präsens-Zitierform `yinsa` fehlt. Genau die Lücke, die das Verb-Konjugationsmodell
  beschreibt.
- **„laut" (Lautstärke) fehlt — zu Recht.** Ninja drückt es als `صُوتْ قْوِيّْ souwt qwiyy` („starke
  Stimme") aus, TUNICO hat nur Ableitungen. Es gibt kein einfaches Adjektiv. `2749 marraj` ist
  „laut/Störenfried" (Person), `2046 3ali` ist „hoch". **Eine Lücke im Bestand ist nicht immer eine
  Lücke in der Sprache.**

### Vergleich der Abläufe

| | A · prüfen | B · hinzufügen |
|---|---|---|
| Schritt 1 | Auswahl per **Rechnung** (Fälligkeitsfenster) + Sammelabfrage | Wortliste + **Duplikat-Check** |
| Schritt 2 | interne Checks | entfällt — es gibt noch nichts zu prüfen |
| Schritt 3 | **Quellenabfrage, alle drei** | **Quellenabfrage, alle drei** — wortgleich |
| Schritt 4 | zeigen | zeigen |
| Schritt 5 | `UPDATE` | `INSERT` |

**Was daraus folgt:**

1. **Es sind nicht zwei Abläufe, sondern einer mit zwei Eingängen.** Der Skill führt sie als
   „Kern-Workflow: neue Vokabel(n) verarbeiten" und „Vokabeln prüfen — EIN Prozess" getrennt.
   Sie unterscheiden sich in genau zwei Punkten: ob Schritt 2 etwas zu prüfen hat, und ob am Ende
   `UPDATE` oder `INSERT` steht. **Das ist dieselbe Lage, die heute früh schon einmal aufgelöst
   wurde** („Zwei Prüf-Workflows waren einer") — nur eine Ebene höher.
2. **Der teuerste Schritt ist in beiden derselbe** — die Quellenabfrage. Bei A lieferte sie die
   Befunde, bei B verhinderte sie fünf Dubletten. Sie ist der Kern, nicht ein Anhängsel.
3. **Rechnende Schritte sind fehleranfällig, nachschlagende nicht.** Der einzige Skill-Fehler, den
   der Test fand, saß im einzigen Schritt, der etwas *ausrechnet* — dem Fälligkeitsfenster. Bei B
   gibt es keinen solchen Schritt, und es gab keinen Fehler.
4. **Beide Aufgaben endeten überwiegend mit „nichts zu tun"** — 19 geprüft, 2 zu entscheiden;
   5 vorgeschlagen, 0 anzulegen. Ein Ablauf, der das billig feststellt, ist mehr wert als einer,
   der viele Treffer produziert.

---

## Runde 26 (2026-09-13) — `chatalpha_konflikte`: die erste Prüfung, die Vokale sieht

**Herkunft:** die beiden Schwachstellen, die der Skill-Test in Runde 25 notiert hatte. Die erste
(„`qualitaets_checks` lässt sich nicht auf eine Auswahl einschränken") war ein Denkfehler — steht
Gruppe A auf 0, ist jede Teilmenge sauber. Die zweite (`786 7araam` rutscht durch jeden Check, weil
Skelette Vokale wegwerfen) führte zu einem neuen Werkzeug:
`public._arabic_to_chatalpha(arabic_script)` gegen die gespeicherte `darija`.

**Vorher repariert:** Die Funktion schrieb einen Hamza-Träger am Wortanfang zusätzlich als `a`
(`aakhaf` statt `akhaf`). 256 Ableitungen ändern sich durch den Fix, 109 davon stimmen danach exakt
mit der `darija` überein, **0 Zeilen, die vorher passten, passen jetzt nicht mehr.**

**Grundgesamtheit:** 2.335 vokalisierte Einzelwörter (ohne Mehrwortzeilen, ohne markierte Lehnwörter,
ohne `bi/li/ka/fa`+Artikel). Davon 1.312 exakt deckungsgleich, ~1.000 Abweichungen nur in Kurzvokalen
(**keine Aussage** — Kurzvokale sind im Bestand nicht normiert), und die folgenden 50.

### A · Gemination — 26 (Check 24): die Felder widersprechen sich bei der Verdopplung

Objektiv entscheidbar: die Schadda steht im Arabischen, oder sie steht nicht.

| id | darija | aus dem Arabischen abgeleitet | arabic_script | deutsch |
|---|---|---|---|---|
| 347 | `sfinnerya` | `sfnaryya` | سفناريّة | Karotten / Möhren |
| 428 | `qotton` | `qton` | قْطُنْ | Baumwolle |
| 1162 | `yqatta3` | `yaqta3` | يَقْطَع | zerreißen |
| 1681 | `qas` | `qss` | قصّ | er schnit |
| 2018 | `akhaff` | `akhaf` | أَخَف | leichter (Komp.) |
| 2019 | `asa77` | `asa7` | أَصَح | gesünder / richtiger (Komp.) |
| 2020 | `araqq` | `araq` | أَرَق | dünner / zarter (Komp.) |
| 2021 | `arakk` | `arak` | أَرَك | schwächer / dünner (Komp.) |
| 2024 | `aqall` | `aqal` | أَقَل | weniger |
| 2071 | `louwwel` | `awwal` | أَوَّل | erster / erste / erstes |
| 2129 | `guinneriyya` | `gnaryya` | ڨناريّة | Artischocken |
| 2180 | `lassiq` | `lasiq` | لَصِق | aufkleben / ankleben |
| 2274 | `stress` | `stras` | سْتراس | Stress |
| 2538 | `nifli` | `niflli` | نِفْلِّي | Ich bin pleite (Variante) |
| 2641 | `titnaffas` | `tnaffis` | تْنَفِّسْ | atmen |
| 2739 | `fomm` | `fom` | فُم | Mund |
| 2804 | `wqayyit` | `waqqayit` | وَقَّيِت | Die Zeit ist gekommen |
| 2874 | `fissa3` | `fisa3` | فِيسَع | schnell / sofort |
| 3308 | `3assel` | `3sal` | عْسَل | Honig / Sirup |
| 3394 | `tarrajja` | `tarajja` | تَرَجَّى | er hoffte / er bat inständig |
| 3431 | `ytarrajja` | `yatarajja` | يَتَرَجَّى | er hofft / er bittet inständig |
| 4114 | `lissiyat` | `lisiyat` | لِيسِيَات | Gymnasien (Pl.) |
| 4238 | `khallas` | `khalaas` | خَلاَّص | Ticketverkäufer, Kontrolleur |
| 4279 | `mallak` | `malaak` | مَلاَّك | Eigentümer |
| 4282 | `villa` | `vilaa` | ڤِيلاَّ | Einfamilienhaus |
| 4555 | `thahhhert` | `thahhart` | ظَهَّرْت | ich zeigte / wies auf |

**Vorsortierung:**
- **Die fünf Komparative 2018–2021/2024** sind ein Muster, kein Einzelfall: `أَفْعَل`-Form,
  im Arabischen fehlt überall die Schadda auf dem letzten Radikal. Die `darija` ist jeweils richtig.
- **`4555 thahhhert`** hat drei `h` — ein Tippfehler, unabhängig von der Schadda-Frage.
- **`4238 khallas` / `4279 mallak` / `4282 villa`**: das Arabische hat `اَّ` (Schadda **und** Alif),
  die Ableitung macht daraus `aa`. Hier ist eher die Ableitung grob als die Zeile falsch — trotzdem
  ansehen, weil `4282 villa` zusätzlich ein unmarkiertes Lehnwort ist.
- **`2274 stress`** ist ein Lehnwort ohne `(engl.)`-Marker; mit Marker fällt es aus der Liste.

### B · Konsonanten — 24 (Check 25)

| id | darija | abgeleitet | arabic_script | deutsch |
|---|---|---|---|---|
| 282 | `piesa` | `byasa` | بْيَاسَة | Münze |
| 283 | `pieset` | `byasat` | بْيَاسَات | Münzen (Pl.) |
| 424 | `spedri` | `sbadri` | سْبَادْرِي | Turnschuhe |
| 425 | `cravate` | `krafat` | كْرَافَاتْ | Krawatte |
| 687 | `fivri` | `fifri` | فِيفْرِي | Februar |
| 689 | `avril` | `afril` | أفْرِيلْ | April |
| 696 | `nuvambir` | `noufombir` | نُوفُمْبِرْ | November |
| 703 | `villa` | `fila` | فِيلَا | Villa |
| 717 | `courant` | `kouroun` | كُورُونْ | Elektrizität |
| 931 | `parking` | `barking` | بَارْكِينْڨْ | Parkplatz |
| 1013 | `talvza` | `talfza` | تَلْفْزَة | Fernseher / TV |
| 1488 | `spor` | `sbour` | سْبُور | Sport |
| 2103 | `talyaniyya` | `italayya` | إيطَالَيَّة | italienisch (f.) |
| 2191 | `sou3elet` | `soalat` | سُؤَالَات | Fragen |
| 2193 | `mamet` | `mama` | مَامَة | Großmutter (informell) |
| 2252 | `souvenir` | `soufwnyr` | سُوفونير | Souvenir / Mitbringsel |
| 2285 | `sou3el` | `soal` | سُؤَال | Frage |
| 2570 | `plombi` | `bloumbiya` | بْلُومْبِيَا | Klempner |
| 2695 | `plato` | `blatou` | بْلَاتُو | Eierkarton / Tablett |
| 2720 | `et-tamakhikh` | `et-tamakhmikh` | التَّمَخْمِيخ | reichhaltiges leckeres Essen genießen |
| 2721 | `vitesse` | `fitas` | فِيتَاس | Gang (Auto) |
| 2856 | `fartattou` | `fartatou` | فَرْطَطُو | Schmetterling |
| 3017 | `nna` | `nnana` | نَّنَا | Tante (informell) |
| 3271 | `badhdrout` | `badhrout` | بَضْرُوط | Schrott / billig / minderwertig |

**Vorsortierung — zwei sehr verschiedene Hälften:**

1. **15 unmarkierte Lehnwörter** (282, 283, 424, 425, 687, 689, 696, 703, 717, 931, 1488, 2252,
   2570, 2695, 2721): die `darija` steht in französischer/englischer Schreibung. Das ist nach der
   Lehnwort-Ausnahme erlaubt — **aber nur mit `(frz.)`/`(engl.)` im `german`**. Fehlt der Marker,
   schlagen dieser Check und Check 2 („ch statt sh") gleichermaßen an. Ein Marker-Nachtrag erledigt
   alle 15 auf einmal und ist inhaltlich risikofrei.
2. **9 echte Befunde:**
   - **`2191 sou3elet` / `2285 sou3el`**: ؤ ist als `3` transliteriert. ع ist es nicht — richtig
     wäre `soual`/`soualet` o.ä. Zwei Zeilen desselben Fehlers.
   - **`2720 et-tamakhikh`** gegen التَّمَخْمِيخ: der `darija` fehlt eine ganze Silbe (`mikh`).
   - **`1013 talvza`** schreibt `v`, das Arabische hat ف. Nach Regel 23 muss eines von beiden
     weichen: entweder `talfza` oder تَلْڤْزَة.
   - **`2103 talyaniyya`** gegen إيطَالَيَّة — das Arabische ist zusätzlich auffällig
     (`إيطَالِيَّة` wäre erwartbar).
   - **`3271 badhdrout`** gegen بَضْرُوط: `dhdh` im Chat-Alphabet, nur ein ض im Arabischen.
   - **`2856 fartattou`**, **`3017 nna`**, **`2193 mamet`**: je eine Silbe/ein Laut Unterschied,
     einzeln nachzusehen.

### Was das für das Ziel „alle prüfen" heißt

Die Vokalachse ist **nicht** prüfbar (~1.000 Abweichungen ohne Aussagewert) — genau wie die
Bedeutungsachse in Runde 23. Die Gemination dagegen ist es, weil die Schadda ein geschriebenes
Zeichen ist und keine Auslegung. Von 2.335 vokalisierten Einzelwörtern bleiben damit 50 zum Ansehen
statt 1.023 — und 26 davon sind mit einem Blick auf das Arabische entscheidbar.

---

## Runde 27 (2026-09-13) — Belege für die Korrekturen aus Runde 26, plus neuer Check 26

Schritt 3 (alle drei Quellen) zu den Befunden, die aus Runde 26 zur Entscheidung anstanden.
**Ergebnis: eine der vier Gruppen ist keine Korrektur, sondern eine Grundsatzfrage.**

### Neu gefunden: `3` in der darija ohne ع im Arabischen (= Check 26, 5 Zeilen)

Beim Nachschlagen von `sou3el` aufgefallen und sofort als Check nachgezogen. Alle 5 Treffer sind echt,
kein Fehlalarm. Der Check gehört nach der Korrektur in **Gruppe A** (muss auf 0 stehen).

| id | Feld | Ist | Soll | Beleg |
|---|---|---|---|---|
| 825 | `darija` | `is3al sou3el` | `is'al sou'al` | إسأل سؤال — beide Wörter haben Hamza, kein ع |
| 2191 | `darija` | `sou3elet` | `sou'alet` | TUNICO `suʔāl`, Peace Corps `su-al`, Ninja سُؤَالْ |
| 2285 | `darija` | `sou3el` | `sou'al` | dito; der Bestand schreibt es in `1609` bereits als `es-su'al` |
| 742 | `arabic_script` | صاحبي تصل حادث | صاحبي عمل حادث | `3mal` = عمل; تصل heißt etwas anderes. Ninja: حادِثْ = accident |
| 4356 | `arabic_script` | بيت قصاد | بيت قعاد | TUNICO `qʕād` „sitting"; قصاد = `qsad` „meinen/beabsichtigen" |

`742` ist der schwerste Fall der Runde: `arabic_script` und `darija` sagen Verschiedenes, und das
Arabische ist das Falsche.

### Quellenbelegt und entscheidungsreif

| id | Feld | Ist | Soll | Beleg |
|---|---|---|---|---|
| 2856 | `arabic_script` | فَرْطَطُو | فَرْطَطُّو | Ninja فَرْطَطُّو `fartattou` — unsere darija war richtig, die Schadda fehlte |
| 2720 | `darija` | `et-tamakhikh` | `et-tamakhmikh` | TUNICO `tmaxmīx`; unser Arabisch التَّمَخْمِيخ hatte die Silbe schon |
| 4555 | `darija` | `thahhhert` | `thahhert` | drei `h` sind ein Tippfehler (ظَهَّرْت) |
| 2750 | `darija` | `raayidh` | `rayidh` | Ninja رَايِضْ, Peace Corps 3× `rayidh` — رَا ist kurz, kein `aa` |

### Grammatisch begründet, aber von den Quellen nicht bestätigt

Die fünf `أَفْعَل`-Komparative. Im Arabischen fehlt überall die Schadda auf dem letzten Radikal;
bei Wurzeln mit gleichem 2./3. Radikal (قلل، خفف، صحح، رقق، ركك) gehört sie dorthin, und unsere
`darija` schreibt sie auf allen fünf Zeilen konsistent mit.

| id | darija | Ist | Soll |
|---|---|---|---|
| 2018 | `akhaff` | أَخَف | أَخَفّ |
| 2019 | `asa77` | أَصَح | أَصَحّ |
| 2020 | `araqq` | أَرَق | أَرَقّ |
| 2021 | `arakk` | أَرَك | أَرَكّ |
| 2024 | `aqall` | أَقَل | أَقَلّ |

⚠️ **Gegenbeleg, der ernst genommen gehört:** Ninja schreibt أقَلْ (`aqal`, ohne Schadda), Peace Corps
`aqal`. Beide schreiben aber auch die Anfangs-Fatha nicht — ihre Vokalisierung ist an dieser Stelle
unvollständig, nicht widersprechend. Entscheidung liegt bei Nils/Semia.

### Keine Korrektur, sondern eine Grundsatzfrage: p/v im Arabischen

Die 15 „unmarkierten Lehnwörter" aus Runde 26 sind in Wahrheit ein Muster mit **39 Zeilen**:

| Klasse | Zeilen | Beispiel |
|---|---|---|
| `p` in der darija, ب im Arabischen | 25 | `931 parking` / بَارْكِينْڨْ — hat ڨ für das g, aber ب für das p |
| `v` in der darija, ف im Arabischen | 14 | `703 villa` / فِيلَا — während `4282 villa` bereits ڤِيلاَّ schreibt |
| `g` in der darija, ق im Arabischen | 0 | am 2026-09-13 abgeräumt |

Das ist dieselbe Frage wie bei ڨ, nur für die anderen beiden Sonderbuchstaben. Regel 23 prüft bisher
nur **eine** Richtung: „ڤ im Arabischen, aber kein v in der Transliteration". Die Gegenrichtung ist
ungeprüft — deshalb sind die 39 Zeilen nie aufgefallen.

Nicht alle 39 sind gleich: `2167 jupe` (stummes p im französischen Wortbild) und
`3281 yitba3 (passive)` (das `p` steckt in der Anmerkung) sind Fehlalarme. Der Kern sind Wörter, die
**tunesisch mit p/v gesprochen** werden: `piesa`, `spedri`, `plombi`, `plato`, `spor`, `parking`,
`talvza`, `fivri`, `nuvambir`, `villa`.

---

## Runde 28 (2026-09-13) — Test des zusammengelegten Prozesses: 19 bestehende + 10 neue

Erster Lauf nach der Zusammenlegung zu „ein Ablauf, zwei Eingänge".

### Aufgabe A — 19 bestehende Vokabeln (Eingang A)

**Auswahl:** deterministisch gezogene Zufallsstichprobe aus den Zeilen, die noch **nie** angefasst
wurden (`internal_note IS NULL AND partner_comment IS NULL`) — bewusst keine Verdachtsliste, damit
der Ertrag einer blinden Stichprobe messbar wird.

**Schritt 1** (Sammelabfrage): 1 von 19 hat `partner_status='approved'` (`608 dars`) — dort wäre eine
Bedeutungsänderung rückfragepflichtig. Keine geflaggte Zeile, keine Vornotiz.

**Schritt 2**: `SELECT * FROM qualitaets_checks WHERE gruppe='A' AND treffer>0` → leer, damit ist die
ganze Auswahl sauber. **Eine Abfrage, kein Einschränken nötig.** Das war beim Test in Runde 25 noch
als Schwachstelle notiert. Aus den B-Listen: `2103 talyaniyya` (Check 25) und 5 unvokalisierte Zeilen
(`1068`, `608`, `1189`, `373`, `1075`).

**Schritt 3**: hier wurde es interessant. Der Abgleich über die `chatalpha`-Achse traf nur **5 von 19**.
Grund: flektierte Formen, Possessive und Phrasen haben keinen eigenen Wörterbucheintrag —
`7dhart` „ich nahm teil", `ftouri` „mein Frühstück", `yimshiw` „sie gehen" können dort gar nicht
stehen. Ein **zweiter Durchgang über die Grundform** belegte weitere 6. Das ist keine Eigenheit
dieser Stichprobe, sondern gilt für jede Bestandsprüfung — und stand bisher nicht im Skill.

**Befunde:**

| id | Befund | Beleg |
|---|---|---|
| 2750 | `raayidh` → `rayidh` | Ninja رَايِضْ, Peace Corps 3× `rayidh`; رَا ist kurz |
| 2103 | `arabic_script` passt nicht zur `darija` | Ninja طَلْيَانِي / TUNICO `ṭalyāni` — unseres ist إيطَالَيَّة |
| 2045 | `mela7` „salzig" — Kandidat | TUNICO `mālaḥ`, Peace Corps `mala7`; `mela7` steht optisch nah an `mel7` „Salz" |

**Fehlalarm, wie dokumentiert:** `445 bidha` „weiß (f.)" traf Peace Corps `HERSELF` — reine
chatalpha-Kollision, genau die Falle aus Schritt 3.

**Ertrag: 2 Befunde + 1 Kandidat aus 19 blind gezogenen Zeilen (≈ 11 %).**

### Aufgabe B — 10 neue deutsche Wörter (Eingang B)

Teppich · Schublade · neidisch · Schnürsenkel · Gießkanne · husten · Steckdose · Dachboden ·
verzeihen · Ellenbogen

| Kategorie | Anzahl | Wörter |
|---|---|---|
| **schon im Trainer** | 4 | Teppich (`1012 zarbiya`, `3979 zrabi`), Dachboden (`3577 sadda`), verzeihen (`563 sama7ni`, `2316 yisama7`), neidisch ≈ eifersüchtig (`2479 mghiyar`) |
| **nicht im Trainer, aber in den Quellen** | 6 | siehe unten |
| **nirgends** | **0** | — |

| Wort | Quellenlage |
|---|---|
| Schublade | alle drei: `qjar` قْجَرْ |
| husten | alle drei: `ka77` (Verb) / `ka77a` (Nomen „Husten") — **zwei Zeilen, nicht eine** |
| Ellenbogen | **zwei konkurrierende Wörter**: Ninja كُوعْ `kou3`, TUNICO+Peace Corps `marfaq` |
| Steckdose | Peace Corps `briz` (frz. prise), TUNICO `ṭābu` — uneinheitlich |
| Gießkanne | nur Ninja: مْرَشْ `mrash` |
| Schnürsenkel | nur Peace Corps: `khit sabbat` („Faden des Schuhs") |

**Die dritte Kategorie blieb leer** — und das ist selbst das Ergebnis. Eine Gegenprobe mit
Schneebesen, Bügelbrett, Tacker, Sonnencreme und Ladegerät fand in **keiner** der drei Quellen
etwas. Dort liegt die Grenze, nicht bei Alltagswörtern wie Ellenbogen oder Schublade.

### Was sich daraus ableiten lässt

1. **Der zusammengelegte Prozess trägt.** Beide Aufgaben liefen durch dieselben fünf Schritte;
   unterschiedlich waren nur Schritt 1 (Auswahl vs. Extraktion+Duplikat-Check) und Schritt 5
   (`UPDATE` vs. `INSERT`). Kein einziges Mal war unklar, welcher Abschnitt gilt — in Runde 25 war
   genau das die Hauptkritik.
2. **Schritt 2 ist von einer Schwachstelle zur billigsten Stelle des Ablaufs geworden.** Eine
   Abfrage, und die Aussage gilt für jede Auswahl.
3. **Schritt 3 braucht bei Bestandszeilen zwei Durchgänge** — Oberflächenform, dann Grundform.
   Ohne den zweiten sieht eine korrekte Zeile wie „keine externe Bestätigung" aus. Gehört in den
   Skill.
4. **„Ich brauche ein Wort für X" endet fast nie in echtem Neuland.** 10 von 10 waren entweder im
   Trainer oder in den Quellen. Der teure Teil ist nicht das Finden, sondern das **Auswählen**:
   zwei konkurrierende Wörter (Ellenbogen), Verb und Nomen getrennt (husten), eine einzige Quelle
   (Gießkanne, Schnürsenkel).
5. **Für das Ziel „alle prüfen" ist die blinde Stichprobe der teure Weg.** 19 Zeilen → 2 Befunde.
   Dieselbe Arbeitszeit an einer Verdachtsliste (Check 24: 26 Zeilen, alle Befunde) bringt ein
   Vielfaches. **Erst die Listen leerarbeiten, dann über den Rest gehen.**

---

## Runde 29 (2026-09-13) — geschrieben: 15 Zeilen, drei Entscheidungen

Entscheidungen von Nils: (1) alle belegten Korrekturen schreiben, (2) p/v im Arabischen **so lassen**,
(3) bei den Komparativen die Schadda **ergänzen**.

### Geschrieben (15 Zeilen, jede mit Begründung in `internal_note`)

| id | Feld | vorher | nachher |
|---|---|---|---|
| 825 | darija | `is3al sou3el` | `is'al sou'al` |
| 2191 | darija | `sou3elet` | `sou'alet` |
| 2285 | darija | `sou3el` | `sou'al` |
| 742 | arabic | صاحبي تصل حادث | صاحبي عمل حادث |
| 4356 | arabic | بيت قصاد | بيت قعاد |
| 2856 | arabic | فَرْطَطُو | فَرْطَطُّو |
| 2720 | darija | `et-tamakhikh` | `et-tamakhmikh` |
| 4555 | darija | `thahhhert` | `thahhert` |
| 2750 | darija | `raayidh` | `rayidh` |
| 2018–2024 (5×) | arabic | أَخَف / أَصَح / أَرَق / أَرَك / أَقَل | … je mit Schadda |
| 1574 | flag | `flagged = true` | `false`, `ninja_checked_at` gesetzt |

**Nicht geschrieben: `536 bu3d`.** Die Zeile trug die TUNICO-Bestätigung und den `masefa`-Vergleich
bereits vollständig in `internal_note`, mit gesetztem `ninja_checked_at`. Eine zweite Notiz desselben
Inhalts wäre Rauschen — die Zeile war schon erledigt, das Ergebnis aus Runde 25 hat das nur bestätigt.

**Unabhängige Gegenprobe:** für alle sechs vokalisierten Zeilen stimmt `_arabic_to_chatalpha()`
nach der Korrektur **exakt** mit der gespeicherten `darija` überein (`fartattou`, `akhaff`, `asa77`,
`araqq`, `arakk`, `aqall`). Das war kein Ziel der Korrektur, sondern fällt als Bestätigung ab.

### Wirkung auf die Checks

| Check | vorher | nachher |
|---|---|---|
| 26 Hamza als `3` | 5 | **0** → von Gruppe B nach **Gruppe A** verschoben |
| 24 Gemination | 26 | 20 |
| 25 Konsonanten | 24 | **8** |

Der Rückgang bei 25 kommt zur Hälfte aus der p/v-Entscheidung: sie ist als eigene Klasse
`lehnwort_pv` in `chatalpha_konflikte` umgesetzt (12 Zeilen), nicht nur notiert. **Gruppe A steht
damit wieder vollständig auf 0 — jetzt mit 14 Checks statt 13.**

### Was noch offen ist

- **Check 24, 20 Zeilen** — Gemination, jede einzeln zu entscheiden.
- **Check 25, 8 Zeilen** — davon 4 französisch geschriebene Lehnwörter ohne `(frz.)`-Marker
  (`425 cravate`, `703 villa`, `717 courant`, `2721 vitesse`): ein Marker-Nachtrag erledigt sie und
  ist inhaltlich risikofrei. Die anderen 4 sind echte Befunde: `2103 talyaniyya` (arabisches Wortbild
  passt nicht), `2193 mamet`, `3017 nna`, `3271 badhdrout`.
- **`2045 mela7`** aus dem Test (Runde 28) — Kandidat, noch nicht entschieden.

---

## Korrektur zu Runde 28 (2026-09-13) — mein Duplikat-Check war falsch

Nils beim Lesen des Testberichts: *„Er hustet gibt es schon."* Stimmt — **`3059 yku77` = „er hustet"**.
Mein Suchmuster war der Infinitiv `husten`; der Bestand glossiert Präsensverben als 3. Person
Singular, und „husten" kommt in „er hustet" als Substring nicht vor.

Die Gegenprobe mit dem nackten Stamm ging ins andere Extrem: `neid` liefert 8 Treffer, 7 davon
„schneidet / Schneider / Schneidebrett". Richtig ist der **Stamm mit Wortgrenze** — und dabei kam
ein zweiter übersehener Treffer heraus:

| Muster | Treffer |
|---|---|
| `husten` | 0 — obwohl `3059 er hustet` existiert |
| `\yhust` | 1 — `3059 yku77` ✓ |
| `neid` | 8 — 7 Fehlalarme aus „schneiden" |
| `\yneid` | 1 — `3772 ghira` „Eifersucht / Neid", in Runde 28 **übersehen** |

**Berichtigte Bilanz von Aufgabe B:**

| Kategorie | Runde 28 | richtig |
|---|---|---|
| schon im Trainer | 4 | **5** (zusätzlich husten `3059 yku77`; neidisch trifft doppelt: `2479` + `3772`) |
| nicht im Trainer, aber in den Quellen | 6 | **5** (Schublade, Ellenbogen, Steckdose, Gießkanne, Schnürsenkel) |
| nirgends | 0 | 0 |

Der Rest der Runde-28-Auswertung bleibt gültig; die Schlussfolgerung wird sogar **schärfer**: von 10
angefragten Wörtern war die Hälfte schon da, und die Lücke bei „husten" ist nicht das Verb, sondern
das **Nomen** — `ka77a` „der Husten" (Ninja كَحَّةْ, TUNICO `kaḥḥa`, Peace Corps `ka77a`) fehlt
weiterhin. Genau der „Verb und Nomen sind zwei Zeilen"-Fall aus derselben Runde.

**Regel daraus, jetzt im Skill:** im `german`-Duplikat-Check immer den Wortstamm mit `\y` verankert
suchen, nie die Vollform. Ein „— nichts —" ist sonst keine Auskunft über den Bestand, sondern über
das Suchmuster.

---

## Runde 30 (2026-09-13) — Gegenrichtungs-Durchlauf über alle Regeln

Anlass: alle drei Skill-Fehler dieser Session waren einseitig formulierte Regeln (Zeitzone,
Regel 23, Infinitiv). Der Durchlauf stellt an jede Regel eine Frage: **hat sie eine Gegenrichtung,
und was passiert, wenn man sie misst?** Nichts davon ist geschrieben — Messungen zum Ansehen.

### Der Befund gleich in der Regelliste

`TRANSLIT_RULES` 5–16 sind **zwölf Regeln derselben einseitigen Form**: „X im Arabischen, aber kein Y
in der Transliteration". Die Gegenrichtung existierte für genau eine davon — Check 26 (ع/`3`), heute
gebaut, 5 echte Treffer beim ersten Lauf. Messung der übrigen elf:

| Gegenrichtung | Treffer | davon echt |
|---|---|---|
| `q` ohne ق | 1 | **1** |
| `gh` ohne غ | 1 | **1** |
| `ح`-Paar: `7` ohne ح | 2 | 0 (beide „(7al)"-Anmerkungen) |
| `sh` ohne ش | 2 | 0 (`s`+`ه`: أَسْهَل, يَسْهَرْ) |
| `h` ohne ه | 4 | **2** |
| `s` ohne س/ص | 5 | 0 (Lehnwörter) |
| `th` ohne ظ/ذ/ث | 6 | 2 Grenzfälle |
| `dh` ohne ض | 9 | **3** |
| `j` ohne ج, `z` ohne ز | 0 | — |

**Die acht echten Befunde:**

| id | darija | arabic_script | was |
|---|---|---|---|
| 1491 | `el qahwa el ka7la` | ال**ف**َهْوَة الكَحْلَة | ف statt ق — Tippfehler im Arabischen |
| 1422 | `inshallah ma3rfa tayba` | إِنْ شاء مَعْرفَة طَيِّبَة | **الله fehlt** |
| 1431 | `inshallah bil qasm` | اِن شاء بِالقَسْم | **الله fehlt** |
| 4412 | `tghashshish` | تڨشش | ڨ = `g`, die darija schreibt `gh` |
| 2409 | `tnajjem todhkhol?` | تُدْخُل | `todkhol` — ein `h` zu viel |
| 2824 | `odhkhol fi` | أَدْخُل | `odkhol` |
| 2831 | `… odhkhol ez-zenqa` | أَدْخُل | `odkhol` |
| 1841 / 3026 | `thiz`, `thabbel` | تهز, تَهَبَّل | `t`+`h`, liest sich als `th` — Grenzfall |

### Methodischer Fund 1: Einzelzeichen ja, Digraphen nein

Die Gegenrichtung ist **sauber bei Einzelzeichen** (`3`, `q`, `z`, `j`: zusammen 2 Treffer, beide echt)
und **verrauscht bei Digraphen** (`dh`, `th`, `sh`: 17 Treffer, überwiegend Morphemgrenzen —
`3and`+`ha`, `mammet`+`hom`, `as`+`hal`). Grund: ein Digraph entsteht auch zufällig, wo zwei Morpheme
aufeinandertreffen; ein `3` oder `q` kann das nicht. **Nur die Einzelzeichen-Gegenrichtungen taugen
als Dauercheck**, die Digraph-Gegenrichtungen bleiben eine einmalige Liste.

### Methodischer Fund 2: die Gegenrichtung hat einen Defekt in der Hinrichtung gefunden

`4412 tghashshish` / تڨشش **müsste** Regel 23 auslösen (ڨ im Arabischen, kein `g` in der
Transliteration). Check 9 steht trotzdem auf 0. Ursache: Regel 23 testet

```js
if(/[ڨگ]/.test(v.ar) && !/g/i.test(v.tr)) return true;
```

— der `g`-Test zählt das `g` in `gh` mit. `gh` ist aber غ, ein anderer Laut. Die Regel braucht
dasselbe `replace(/gh/gi,'')`, das ihre erste Bedingung bereits benutzt. **Eine Regel, die sich
selbst blind macht — gefunden nur, weil die Gegenrichtung gemessen wurde.**

### Gegenrichtung zur „/ vs. ;"-Regel: die darija hat eine dritte Notation

Die Regel gilt im Skill nur für das `german`-Feld. Die `darija` benutzt zusätzlich **Klammern**, in
12 Zeilen, mit drei verschiedenen Bedeutungen. Am echten Quiz-Code gemessen (`normalize` +
`checkAnswer` aus `trainer.html`, `normalize` entfernt Klammerinhalte):

| Bedeutung | Zeilen | Verhalten |
|---|---|---|
| Anmerkung — `labes (7al)`, `yitba3 (passive)` | 252, 2879, 3281 | ok (exakt). Gehört trotzdem ins `german` |
| **Variante** — `labes (lbes)`, `ciao (tshaw)`, `ybarik fik (y3ayyshik)` | **1174, 1406, 1425, 1427** | **ABGELEHNT** — die angebotene Variante gilt als falsche Antwort |
| optional — `koll we7id (w) …`, `shkoun(ou) …` | 1492, 1494, 1495, 1787, 1788 | ok, aber **nur über die 1-Zeichen-Fuzzy-Toleranz** |

Die vier Varianten-Zeilen gehören auf `/` umgestellt — `checkAnswer()` splittet auf `/` und
akzeptiert jeden Teil, genau dafür ist der Trenner da.

### Gegenrichtung: `homonym_ok` ist ein Ausschalter, kein Etikett

Check 10 lautet `HAVING count(*) > 1 AND NOT bool_or(homonym_ok)`. **Eine einzige Zeile mit dem Flag
schaltet die Prüfung für die ganze Arabisch-Gruppe ab.** 58 Zeilen tragen `homonym_ok = true`, ohne
dass es derzeit überhaupt eine zweite Zeile mit demselben `arabic_script` gibt — das sind **58 vorab
stillgelegte Prüfungen**: kommt später eine Dublette dazu, meldet Check 10 sie nicht.

### Die restlichen Gegenrichtungen

| Regel | Gegenrichtung | Treffer | Urteil |
|---|---|---|---|
| Check 3 Artikel vor Sonnenbuchstabe | assimiliert vor **Mond**buchstabe | **0** | sauber, als A-Check aufnehmbar |
| Regel 20 „und" = `w-` | `w-` wo kein „und" | 1 | brauchbar |
| Check 5 `(f.)` ohne `-a` | `-a` ohne `(f.)` | **567** | **unbrauchbar** — die meisten Wörter auf `-a` sind keine Feminina. Verworfen |

Check 5 ist dabei die lehrreichste Nullnummer: nicht jede Regel hat eine sinnvolle Gegenrichtung.
Die Frage lohnt trotzdem — sie kostet eine Abfrage und hat hier acht Datenfehler plus einen
Regeldefekt freigelegt.

---

## Runde 31 (2026-09-13) — Gegenrichtung abgearbeitet, Check 24 angefangen

### Geschrieben aus dem Gegenrichtungs-Durchlauf (11 Zeilen)

1491 (ف→ق) · 1422, 1431 (الله ergänzt) · 4412 (تڨشش→تْغَشِّشْ) ·
2409, 2824, 2831 (`odhkhol`→`odkhol`) · 1174, 1406, 1425, 1427 (Klammer→`/`)

Dazu **Regel 23 im Trainer repariert** (`gh` wurde vor dem `g`-Test nicht entfernt) samt falschem
Codepoint im Label. `vm.Script` sauber, 6/6 konstruierte Testfälle, 23 Regeln intakt. Am
Quiz-Harness gegengeprüft: die vier Varianten-Zeilen akzeptieren jetzt beide Formen exakt.

### Die zwei offenen Fälle — entschieden

**Notation bleibt** (Nils): `thiz`/`thabbel` behalten die Schreibung, obwohl das t-Präfix vor
ه-Wurzel wie der Digraph `th` aussieht. Dieselbe Klasse wie die vier belegten Morphemgrenzen in
Check 8 — und TUNICO schreibt `thazz` genauso.

**Die Gemination dagegen war ein Befund**, und die Frage nach der Wurzelfamilie hat eine
**zusätzliche Zeile** aufgedeckt:

| id | darija | arabic_script | |
|---|---|---|---|
| 1683 | `hazz` | هَزَّ | Schadda ✓ |
| 2228 | `yhizz` | يُهِزُّ | Schadda ✓ |
| 2472 | `hezz` | هِزّ | Schadda ✓ |
| **1684** | `nihiz` → `nihizz` | نهِزّ | Arabisch hatte die Schadda, die darija nicht |
| **1841** | `thiz` → `thizz` | تهز → تهِزّ | beide ergänzt |

TUNICO durchgängig `hazz`/`hazzin`, Ninja هَزّْ. Ninjas هِزْ und Peace Corps `hiz` vokalisieren
Endgeminaten unvollständig und zählen nicht als Gegenbeleg — dasselbe Muster wie bei أقَلْ.

**Methodisch:** die Frage „gibt es ein weiteres der Familie?" hat mehr gefunden als der Check selbst.
Gehört in Schritt 3 als fester Handgriff bei Gemination-Zweifeln.

### Check 24: 20 → 12

**Geschrieben (9 Zeilen), zwei Klassen:**

**a) Schadda hinter dem Alif statt auf dem Konsonanten** — rein orthographisch, mechanisch
reparierbar (`(.)ا([Harakat]*)ّ` → `\1ّا`), 4 Zeilen: 2183, 4238, 4279, 4282. Bei dreien stimmt die
Ableitung danach **exakt** mit der `darija` überein (`khallas`, `mallak`, `villa`).

**b) Quellenbelegt, 5 Zeilen:**

| id | was | Beleg |
|---|---|---|
| 2180 | لَصِق → لَصِّق | Ninja/PC/TUNICO alle `lassiq` |
| 2739 | فُم → فُمّ | Ninja `famm`, PC + TUNICO `fumm` |
| 347 | سفناريّة → سفنّاريّة | alle drei `sfinnarya` |
| 3308 | `3assel` → `3sal` | alle drei `3sal` — die Gemination war erfunden |
| 428 | `qotton` → `qton` | alle drei `qton`/`qtun` |

Bei 3308 und 428 leitet das Arabische jetzt exakt die `darija` ab. Außerdem `1681`: Tippfehler
„er schnit" → „er schnitt" (die Gemination-Frage der Zeile bleibt offen).

### Check 24 — die verbleibenden 12 zur Entscheidung

| id | darija | aus dem Arabischen | arabic_script | deutsch | Lage |
|---|---|---|---|---|---|
| 1162 | `yqatta3` | `yaqta3` | يَقْطَع | zerreißen | Maß II braucht يْقَطَّع — **Neuvokalisierung**, nicht nur eine Schadda. PC+TUNICO `qatta3` |
| 1681 | `qas` | `qss` | قصّ | er schnitt | Arabisch hat Schadda ohne Vokale → `qass` + قَصّ? |
| 2071 | `louwwel` | `awwal` | أَوَّل | erster | PC belegt `luwwil`, TUNICO `awwil` — **zwei verschiedene Wörter**, l-Form vs. Grundform |
| 2129 | `guinneriyya` | `gnaryya` | ڨناريّة | Artischocken | TUNICO `gannariya`, PC `qannariyya` → `gannariyya`? `gui` ist französisch geschrieben |
| 2274 | `stress` | `stras` | سْتراس | Stress | Lehnwort ohne `(engl.)`-Marker |
| 2538 | `nifli` | `niflli` | نِفْلِّي | Ich bin pleite | keine Quelle; Schadda im eigenen Arabischen, nicht in der darija |
| 2641 | `titnaffas` | `tnaffis` | تْنَفِّسْ | atmen | darija hat ein `it` zu viel — **und** das Gloss ist Infinitiv statt „er atmet" |
| 2804 | `wqayyit` | `waqqayit` | وَقَّيِت | Die Zeit ist gekommen | Gemination sitzt auf verschiedenen Konsonanten |
| 2874 | `fissa3` | `fisa3` | فِيسَع | schnell | keine Quelle für `fissa3`; beide Schreibungen im Umlauf |
| 3394 | `tarrajja` | `tarajja` | تَرَجَّى | er hoffte | darija hat `rr`, das Arabische die Schadda auf ج → ein `r` zu viel |
| 3431 | `ytarrajja` | `yatarajja` | يَتَرَجَّى | er hofft | dito, Geschwisterzeile zu 3394 |
| 4114 | `lissiyat` | `lisiyat` | لِيسِيَات | Gymnasien | Lehnwort (frz. lycée) ohne Marker |

### Stand der Checks

Gruppe A: **16 Checks, alle 0.** Gruppe B: 20 (Check 24) → **12**, dazu 2 · 21 · 430 · 46 · 8 (Check 25) ·
8 (Klammern) · 58 (`homonym_ok`).

---

## Runde 32 (2026-09-13) — Check 24 und 25 leergearbeitet, Check 10 als zu eng erkannt

### Geschrieben (15 Zeilen)

**Quellenbelegt, Ableitung stimmt danach exakt mit der `darija` überein:**

| id | Feld | vorher → nachher | Beleg |
|---|---|---|---|
| 1162 | arabic | يَقْطَع → يْقَطَّع | war als Maß I vokalisiert; PC + TUNICO `qatta3` |
| 2804 | arabic | وَقَّيِت → وْقَيِّتْ | Schadda saß auf ق statt ي; Ninja + TUNICO 3× `wqayyit` |
| 4114 | arabic | لِيسِيَات → لِيسِّيَات | TUNICO `lissē` mit ss |
| 2129 | beide | `guinneriyya` → `gannariyya`, ڨناريّة → ڨَنَّارِيَّة | TUNICO `gannārīya`, PC `qannariyya` |
| 2874 | darija | `fissa3` → `fisa3` | alle drei Quellen ohne ss |
| 2641 | darija | `titnaffas` → `tnaffis` | Ninja führt genau unser Arabisch als `tnaffis` |
| 3394 / 3431 | darija | `tarrajja` → `tarajja`, `ytarrajja` → `yatarajja` | eigenes Arabisch: Schadda auf ج, nicht auf ر |

**Lehnwort-Marker nachgetragen** (Hausregel; am Quiz-Code geprüft, dass `normalize()` den Marker wegwirft
und die Antwort sich nicht ändert): `2274` Stress (engl.) · `4114` Gymnasien (frz.) · `425` Krawatte ·
`703` Villa · `717` Elektrizität · `2721` Gang (Auto).

**Check 24: 20 → 3. Check 25: 8 → 4.**

### Der Duplikat-Check hat einen Merge verhindert

`1681 qas` sollte nach TUNICO `qaṣṣ` zu `qass` korrigiert werden. Der Pflicht-Check vor der
Schreibkorrektur fand: **`qass` existiert bereits als `4544`**, mit derselben Bedeutung „er schnitt",
derselben Lektion 47 und fast identischem Arabisch (قصّ gegen قَصّ).

| | `1681` | `4544` |
|---|---|---|
| arabic | قصّ | قَصّ |
| topic | Verben-Infinitiv (L25) | Vergangenheit |
| `homonym_ok` | **true** | false |
| Lernfortschritt | 6 richtig / 2 falsch, 10 Wiederholungen | keiner |
| Kurs-Verweise | keine | keine |

Nach dem Standard-Vorgehen bleibt `1681` (hat Fortschritt) und wird auf `qass` / قَصّ korrigiert,
`4544` wird gelöscht. **Zur Bestätigung vorgelegt, nicht geschrieben.**

### Der eigentliche Fund: Check 10 vergleicht Bytes, nicht Buchstaben

Warum hat kein Check diese Dublette gemeldet? `homonym_ok = true` auf `1681` hätte die Gruppe
stillgelegt — aber selbst ohne das Flag hätte Check 10 nichts gefunden: er vergleicht
`btrim(arabic_script)` **Byte für Byte**, und قصّ ≠ قَصّ.

Mein eigener Check 30 hatte denselben Fehler und meldete deshalb 58 statt 39 Zeilen: von den
angeblich partnerlosen `homonym_ok`-Zeilen haben **50 sehr wohl einen Partner**, nur mit anderer
Vokalisierung (`دَار` / `دَارْ`, `حَلّ` / `حلّ`, `وَلَّى` / `وَلَّا`).

**Drei Vergleichsstufen, gemessen:**

| Schlüssel | Gruppen ohne `homonym_ok` | taugt |
|---|---|---|
| Bytes (Check 10 heute) | 0 | zu eng — findet die `qas`/`qass`-Klasse nie |
| Buchstaben ohne Harakat (`ar_key`) | **87** | richtig — echte Homonympaare (`bnet`/`bnat`, `bled`/`blad`, `akhir`/`akhar`) |
| Konsonantenskelett | 465 | zu grob — trifft die ganze Wurzelfamilie (`kteb`/`katib`/`ktob`/`yiktib`) |

`ar_key` stand im Skill schon als „von Hand zu ziehen" unter den offenen Posten. Jetzt ist es
**Check 31 (87 Gruppen)**, und Check 30 rechnet ebenfalls mit `ar_key` (**39** statt 58).

### Offen zur Entscheidung

| id | Lage |
|---|---|
| **1681 / 4544** | Merge, siehe oben — Löschung braucht Bestätigung |
| 2071 `louwwel` | PC belegt `luwwil`, TUNICO `awwil` — das Arabische أَوَّل ist die Form **ohne** `l-` |
| 2538 `nifli` | keine Quelle; Schadda im eigenen Arabischen نِفْلِّي, nicht in der `darija`. TUNICO kennt `flis` „to be broke" |
| 2103 `talyaniyya` | Ninja طَلْيَانِي / TUNICO `ṭalyāni` — unser إيطَالَيَّة hat ein zusätzliches إي |
| 2193 `mamet` / 3017 `nna` | ة am Wortende als `-et` bzw. Anfangs-Schadda — beides Lautlehre-Fragen |
| 3271 `badhdrout` | `dhdh` in der `darija`, nur ein ض im Arabischen |
| 2641 | Gloss „atmen" ist Infinitiv statt „er atmet" |

---

## Runde 33 (2026-09-13) — die zwei Meldungen aus dem Trainer

### 1. „🥷 Ninja-Check: ?" — kein Datenfehler, ein Deployment-Rückstand

Die Kachel steht auf `?`, weil die **deployte** Fassung (main) die Tabelle `vocabulary_review` noch an
**8 Stellen** abfragt. Die Tabelle wurde am 2026-09-13 entfernt, die Abfrage läuft ins Leere.

Auf dem Arbeitsbranch ist der ganze Ninja-Check-Block bereits raus (0 Treffer für
`vocabulary_review`, die einzige verbleibende Erwähnung von „Ninja-Check" steht in einem
TUNICO-Hilfetext). **Es fehlt nur das Deployment** — Code-Änderung nicht nötig.

### 2. Die angezeigte Dublette — von meinem eigenen Tippfehler-Fix ausgelöst

Der Duplikat-Manager gruppiert über `normKey` auf allen drei Feldern. `1681 qas` und `4544 qass`
hatten bis heute **verschiedene** deutsche Glossen („er schnit" / „er schnitt") und fielen deshalb
nicht auf. Mit der Tippfehler-Korrektur aus Runde 32 kollidierten sie — der Trainer hat sofort
gemeldet, was Check 10 seit jeher übersieht (Byte-Vergleich, قصّ ≠ قَصّ).

**Die Verbgruppe قصص, vollständig:**

| id | darija | Rolle | Tabelle | Fortschritt |
|---|---|---|---|---|
| 463 | `yqoss` | Präsens | ✓ | 1 |
| 3319 | `qoss` | Imperativ | ✓ | 1 |
| 4544 | `qass` | Vergangenheit | ✓ | — |
| 4545 | `qassit` | Vergangenheit, rotierend | ✓ | — |
| **1681** | `qas` | **doppelt**, topic „Verben-Infinitiv (L25)" | — | **1** |

`1681` war die Altzeile; das 3-Zeilen-Modell stand längst.

**Merge ausgeführt:** `1681` behalten (trägt den Lernfortschritt 6/2, 10 Wiederholungen), von `4544`
übernommen: `arabic_script` قَصّ, `topic` „Vergangenheit" und die **vollständige
`conjugation`-Tabelle** (past/present/imperative, 16 Formen). `darija` → `qass` (TUNICO `qaṣṣ`, und
die Tabelle selbst führt `3sg_m = qass`). `4544` gelöscht.

**`homonym_ok` bleibt auf `true`** — und zwar zu Recht: der Partner ist `4396 qas` قَاسْ „er maß /
probierte an", ein echtes Homonym in der `darija` aus einer anderen Wurzel (قيس). Das Flag war nie
verwaist, es war nur im Byte-Vergleich unsichtbar.

**Sicherung der gelöschten Zeile:**

```json
{"id":4544,"darija":"qass","arabic_script":"قَصّ","german":"er schnitt","topic":"Vergangenheit",
 "lesson_id":47,"homonym_ok":false,"conj_rotate":false,"progress":0,"course_refs":0,
 "conjugation":{"past":{"1sg":"qassit/ich schnitt","2sg":"qassit/du schnittest","3sg_m":"qass/er schnitt",
 "3sg_f":"qasset/sie schnitt","1pl":"qassina/wir schnitten","2pl":"qassitu/ihr schnittet","3pl":"qassu/sie schnitten"},
 "present":{"1sg":"nquss","2sg":"tquss","3sg_m":"yqoss","3sg_f":"tquss","1pl":"nqussu","2pl":"tqussu","3pl":"yqussu"},
 "imperative":{"sg":"qoss/schneid!","pl":"qussu/schneidet!"}}}
```

### Gegenprobe an beiden Trainer-Tabs

Mit den echten Funktionen aus `trainer.html` gegen den Live-Bestand, inklusive der beiden
Pflicht-Plausibilitätsprüfungen:

| Tab | Ergebnis |
|---|---|
| 🔁 Duplikate | **0 Gruppen** von 3.779 Zeilen (`count`-Header 3.779 — Export vollständig) |
| 🔤 Transliteration | **0 Auffällige** von 3.779, **23 Regeln** geladen |

### Was das methodisch zeigt

Der Trainer hat die Dublette gefunden, weil er `normKey` auf **alle drei Felder** anwendet — auch auf
das Deutsche. Check 10 vergleicht nur `arabic_script`, und das byteweise. **Zwei Zeilen mit
verschiedener Vokalisierung und verschiedenem Gloss sind für ihn zweimal unsichtbar.** Erst die
Korrektur eines Tippfehlers im Deutschen hat sie sichtbar gemacht — durch Zufall, nicht durch Prüfung.
Check 31 (`ar_key`, 87 Gruppen) schließt die eine Hälfte davon; die deutsche Achse deckt bisher nur
der Trainer selbst ab.

---

## Runde 34 (2026-09-13) — PR #55 gemerged, Check 31 abgearbeitet

### Deployment

PR #55 gemerged. `main` hat damit den Ninja-Check-Block nicht mehr und fragt `vocabulary_review`
nirgends mehr ab (vorher 8 Stellen) — die Kachel `?` verschwindet mit dem nächsten Build. Der
Arbeitsbranch wurde frisch auf den gemergten `main` gesetzt.

### Check 31: 87 Gruppen, davon 2 mit gleicher Bedeutung

Der `ar_key`-Vergleich (Buchstaben ohne Harakat) findet 87 Gruppen ohne `homonym_ok`. Die
entscheidende Trennung ist **nicht die Schreibung, sondern die Bedeutung**:

| | Gruppen | heißt |
|---|---|---|
| verschiedene deutsche Glossen | **85** | Paradigmenformen und Homonyme derselben Wurzel — normal im Arabischen, **kein Befund** |
| gleiche deutsche Glosse | **2** | Dublettenverdacht |

**Fall 1 — echte Dublette, gemerged:**

| | `680` | `1566` |
|---|---|---|
| darija | `wild il3amm` | `wild el 3am` |
| arabic | ولد العم | ولد العَمّ |
| deutsch | Cousin (väterlicherseits) | Cousin (Sohn des väterl. Onkels) |
| Lektion | 35 | 35 |
| Fortschritt | **1** | — |

`680` behalten, von `1566` das vokalisierte ولد العَمّ, das präzisere Gloss und das topic „Familie"
übernommen; `darija` nach Hausregel auf `wild el-3amm` normiert (Artikel `el-`, Gemination aus
العَمّ). `1566` gelöscht. **Check 10 hat die beiden nie gesehen** — ولد العم und ولد العَمّ sind
byteweise verschieden.

**Fall 2 — Fehlalarm meiner eigenen Normalisierung:**

`476 shnwa` „was? (m.)" und `837 shnoua?` „was (betonte, feminine Frageform)" wurden nur deshalb als
gleichbedeutend gewertet, weil mein `gkey` Klammerinhalte wegwarf — und genau dort steht die
Unterscheidung. **Dieselbe Falle wie bei `normalize()` im Trainer.** Der `gkey` behält die Klammern
jetzt.

### Check 31 geschärft und nach Gruppe A verschoben

Ohne die Bedeutungsbedingung hätte der Check dauerhaft 85 bekannte Paradigmenformen gemeldet — genau
das Muster, das eine Liste wertlos macht. Neue Fassung: `ar_key`-Gruppe **mit gleicher Bedeutung**
und ohne `homonym_ok`. **Stand: 0.** Die Kontrolle: der `qas`/`qass`-Fall von heute früh hätte
angeschlagen (beide „er schnitt").

Die breite Fassung (87 Gruppen) bleibt als Handabfrage sinnvoll, wenn man gezielt nach unmarkierten
Homonymen sucht — sie ist aber keine Fehlerliste.

**Gruppe A: 17 Checks, alle 0. Gruppe B: 8 Listen, 552 Zeilen.**

### Zur Entscheidung: die `shnou`-Familie

| id | darija | arabic | deutsch |
|---|---|---|---|
| 476 | `shnwa` | شنوا | was? (m.) |
| 837 | `shnoua?` | شْنُوَّا | was (betonte, feminine Frageform) |

**Keine der drei Quellen kennt eine Genus-Unterscheidung bei diesem Fragewort.** Belegt sind zwei
Varianten: TUNICO `šnuwwa` und `šniyya`, Peace Corps `shnuwwa` (5×), Ninja شنوا / أشْنِيَّا /
أشنُوّا. Die Unterscheidung „(m.)" gegen „(feminine Frageform)" steht nur bei uns.

Drei Möglichkeiten: (a) `837` ist die belegte Form `shnuwwa`, `476` die Variante `shniyya` — dann
sind beide Glossen falsch; (b) beide sind dasselbe Wort → Merge; (c) Semia bestätigt die
Genus-Unterscheidung als Dialektrealität. Für (a) und (b) brauche ich dein Wort, (c) wäre eine Frage
an sie.

---

## Runde 35 (2026-09-13) — die `shnou`-Familie aufgelöst

Entscheidung Nils: **Option (a)** — die m./f.-Systematik ist falsch, es sind zwei belegte Varianten.

Der Blick auf die ganze Familie fand eine **dritte** Zeile, die in Check 31 gar nicht auftauchte:

| id | darija | arabic | deutsch | |
|---|---|---|---|---|
| 476 | `shnwa` | شنوا | was? (m.) | Kurs-Verweis, Fortschritt |
| 837 | `shnoua?` | شْنُوَّا | was (betonte, feminine Frageform) | Fortschritt |
| **1205** | `shniyyaa` | شْنِيَّا | was? (f.) | Fortschritt |

`شنوا` ist die unvokalisierte Schreibung von `شْنُوَّا` — `476` und `837` sind **dasselbe Wort**.
`1205` ist die zweite belegte Variante.

**Quellenlage, einstimmig ohne Genus:** TUNICO `šnuwwa` und `šniyya`, Peace Corps `shnuwwa` (5×),
Ninja شنوا / أشْنِيَّا / أشنُوّا.

**Geschrieben:**

| id | vorher → nachher |
|---|---|
| 476 | `shnwa` → **`shnuwwa`**, شنوا → شْنُوَّا, „was? (m.)" → **„was?"**, `homonym_ok` gesetzt |
| 1205 | `shniyyaa` → **`shniyya`**, „was? (f.)" → **„was?"**, `homonym_ok` gesetzt |
| 837 | **gelöscht** (Merge in 476 — dort der Kurs-Verweis) |

`homonym_ok` auf beiden ist hier kein Ausschalter, sondern der **Anschalter für `synonymNote()`**: der
Trainer zeigt bei „was?" jetzt „Für *was?* gibt es noch eine andere Übersetzung".

### Check 30 zum zweiten Mal zu eng — `homonym_ok` hat zwei Bedeutungen

Genau diese berechtigte Markierung hat Check 30 sofort als Fehler gemeldet. Der Grund: das Flag
steuert im Trainer **zwei** Hinweise:

| Funktion | Partner | Beispiel |
|---|---|---|
| `homonymNote()` | gleiches **Arabisch**, andere Bedeutung | `دَار` Haus / `دَارْ` er drehte sich |
| `synonymNote()` | gleiches **Deutsch**, anderes Wort | `shnuwwa` / `shniyya` |

Check 30 kannte nur die erste. Von 84 markierten Zeilen: **43** mit arabischem Partner, **18** mit nur
deutschem Partner (berechtigt), **23** wirklich verwaist. Der Check zählt jetzt beide Partnerarten und
steht bei **23** statt 41.

**Das ist heute das dritte Mal dasselbe Muster:** ein Check, der berechtigten Zustand meldet, ist
wertlos — und der erste Verdächtige bei einem neuen Treffer ist der Check.

### Gegenprobe

| | |
|---|---|
| 🔁 Duplikate (Trainer-Logik) | **0 Gruppen** von 3.777, `count`-Header 3.777 |
| 🔤 Transliteration | **0** von 3.777, 23 Regeln |
| Gruppe A | **17 Checks, alle 0** |
| Gruppe B | 2 · 21 · 429 · 46 · 2 · 4 · 8 · 23 = **535** |

---

## Runde 36 (2026-09-13) — Check 23: die Kampagne ist abgetragen

46 Kandidaten, **4 übernommen**. Beim ersten Durchgang (Runde ~20) waren es 59 von 64 — der
Unterschied ist nicht Zufall, sondern der Bodensatz: die einfachen Fälle sind durch.

**Übernommen** (`arabic_script` aus Ninja, Bedeutung gegengelesen):
`498 3omri` عُمْرِي · `555 khtha` خْذَا · `985 idara` إدَارَةْ · `3752 moush` مُوشْ

### Neuer Filter, und sofort seine Grenze

Der stärkste Test war: **leitet Ninjas vokalisiertes Arabisch exakt unsere `darija` ab?** Von 46
Kandidaten bestanden ihn nur 8. Die Sicht trägt ihn jetzt als Spalte `ableitung_exakt`.

**Und genau dieser Filter hätte vier falsche Übernahmen durchgewunken:**

| id | unser Gloss | Ninja | Ableitung |
|---|---|---|---|
| 648 | einen Platz reservieren | to ask, ask about | exakt `nshid` |
| 1576 | Schwägerin | almond tree, almond | exakt `louza` |
| 4180 | Waschlappen | cashier, cash register | exakt `kasa` |
| 4403 | er schoss ein Tor | brand | exakt `marka` |

Buchstabenidentisch, formgleich, **anderes Wort**. `ableitung_exakt` prüft die Form, nicht die
Bedeutung — das steht jetzt im Sicht-Kommentar.

### Was die Ableitung sonst noch entlarvt hat

| id | Ninja | was die Ableitung zeigt |
|---|---|---|
| 616 `kbir` „groß (m.)" | كْبِيرَ | `kbira` — die **feminine** Form |
| 1023 `sghir` „klein" | صْغَيَّرْ | `sghayyar` — der **Diminutiv**, Ninja sagt „really small (cute)" |
| 4413 `tqabil` | تْقًابِلْ | `tqanabil` — **Tanwin statt Fatha**, ein Tippfehler bei Ninja |
| 569 `banka` „Bank" | بَنْكْ | `bank` — andere Form (ohne `-a`) |

### Zwei alte offene Posten bestätigt

- **`529 baash`** „um zu" — das Arabische باش leitet `bash` ab, unsere `darija` schreibt `baash`.
  Der `aa`-Befund aus Runde 22 ist echt.
- **`4365 khassatan`** — unser خصوصا leitet `khosousana` ab. Das passt zu keiner Lesart von
  `khassatan`; das Arabische ist ein anderes Wort (خاصة wäre `khassa`). Befund, keine Vokalisierung.

### Verworfene Vorschläge werden dauerhaft markiert

`648`, `735`, `1576`, `4180`, `4358`, `4403` tragen jetzt `[ninja-vokalisierung verworfen]` in
`internal_note`, und die Sicht schließt solche Zeilen aus. Sie haben bei drei Durchgängen jeweils
erneut Prüfzeit gekostet — das hört damit auf.

**Check 23: 46 → 36, davon 0 formexakt.** Was übrig ist, sind Einzelfälle.

### Stand

Gruppe A: 17 Checks, alle 0. Gruppe B: 2 · 21 · 425 · 36 · 2 · 4 · 8 · 23.

---

## Runde 37 (2026-09-13) — drei kleine Listen abgeräumt

### Check 29 (Klammern in der `darija`) — auf 0

**Anmerkungen (3):** `252 labes (7al)` → `labes`, `2879 fad (7al)` → `fad`,
`3281 yitba3 (passive)` → `yitba3` (die Information ins `german`).

**Optionale Elemente (5) auf die `/`-Variantenform:** `1492`, `1494`, `1495` (`koll we7id (w) …`),
`1787 shkoun(ou)`, `1788 shkoun(i)`. In Klammern ging die Vollform nur über die 1-Zeichen-Fuzzy-
Toleranz durch; mit `/` akzeptiert `checkAnswer()` **beide** Formen ausdrücklich. Am Harness geprüft:
alle sieben Testfälle „ok exakt", vorher teils nur „fuzzy". Klammern auch aus dem `arabic_script`.

**Und wieder fing der Pflicht-Duplikat-Check etwas ab:** `yitba3` existiert bereits als
`2213 = er druckt`. Nach dem Entfernen der Klammer wäre `3281` eine unmarkierte Homographie
(بيع verkaufen gegen طبع drucken). Beide Zeilen tragen jetzt `homonym_ok`.

### Check 24/25/20 — von 2/4/2 auf je 1

| id | was | Beleg |
|---|---|---|
| 2103 | arabic إيطَالَيَّة → **طَلْيَانِيَّة** | Ninja طَلْيَانِي, TUNICO `ṭalyāni`; Ableitung jetzt exakt `talyaniyya` |
| 2193 | `mamet` → **`mama`** | TUNICO `māma` „grandmother"; das eigene مَامَة leitet exakt `mama` ab |
| 2071 | arabic أَوَّل → **لَوَّل** | beide Formen belegt (PC `luwwil` 3×, TUNICO `awwil`) — die `darija` ist die l-Form, also das Arabische angeglichen |
| 3271 | `badhdrout` → **`badhrout`** | ein `dh` zu viel; بَضْرُوط leitet exakt `badhrout` ab |
| 2501 | `fissa3` → `fisa3`, فِي سَّاعَة → **فِيسَع** | das Arabische las „in einer Stunde" statt „schnell" — daher die ungültige Anfangs-Schadda. Beleg über `2874`, am selben Tag mit drei Quellen korrigiert |

### `homonym_ok` hat drei Bedeutungen, nicht zwei

Nach dem Setzen des Flags auf `2213`/`3281` sprang Check 30 von 23 auf 25 — zum **dritten** Mal
meldete er berechtigten Zustand. Der Grund ist jetzt vollständig: der Duplikat-Manager im Trainer
gruppiert über **drei** Felder, also kann das Flag für drei Partnerarten stehen.

| Feld | Hinweis im Trainer | Beispiel |
|---|---|---|
| `arabic_script` | `homonymNote()` | `دَار` Haus / `دَارْ` er drehte sich |
| `german` | `synonymNote()` | `shnuwwa` / `shniyya` — beide „was?" |
| `darija` | Duplikat-Manager überspringt | `yitba3` drucken / verkauft werden |

Check 30 prüft jetzt alle drei: **von 84 markierten Zeilen sind 7 wirklich verwaist**, nicht 58,
nicht 41, nicht 25.

**Lehre:** Ein Flag, das eine Prüfung abschaltet, muss **alle** Wege kennen, auf denen die Prüfung
greift. Sonst meldet der Check genau die Sorgfalt als Fehler, die er erzwingen soll.

### Gegenprobe

| | |
|---|---|
| 🔁 Duplikate (Trainer-Logik) | **0** von 3.777, `count`-Header 3.777 |
| 🔤 Transliteration | **0** von 3.777, 23 Regeln |
| Gruppe A | **17 Checks, alle 0** |
| Gruppe B | 1 · 21 · 425 · 36 · 1 · 1 · 7 = **492** (vorher 535) |

**Offen aus dieser Runde:** `3017 nna` نَّنَا „Tante" (steht in Check 20 **und** 25 — ungültige
Anfangs-Schadda, und die `darija` hat drei Zeichen weniger als das Arabische; keine Quelle kennt das
Wort) und `2538 nifli` نِفْلِّي „Ich bin pleite (Variante)" (TUNICO kennt nur `flis`/`falis`).

---

## Runde 38 (2026-09-13) — Check 21 ist etwas anderes, als ich vorgeschlagen hatte

### Korrektur meines eigenen Vorschlags

Ich hatte Check 21 als „21 fehlende Verbzeilen, die Formen stehen in der Tabelle" angekündigt und
Nils daraufhin „alle anlegen" entschieden. **Das war falsch beschrieben.** Der Check lautet:

```sql
v.conjugation IS NOT NULL AND NOT v.conj_rotate
AND NOT EXISTS (… WHERE lower(cell->>'darija') = lower(v.darija))
```

Er findet Zeilen, deren **eigene `darija` in ihrer eigenen Tabelle nicht vorkommt** — eine
Inkonsistenz zwischen Zeile und Tabelle. **Anzulegen ist nichts.**

### Der Fund dahinter: die Tabellen sind von keinem Check erfasst

Vier der 21 Treffer waren `imshiw`, `nimshiw`, `timshiw`, `yimshiw`. Ihre Tabellen schrieben noch
`imshiou`, `nimshiou`, `timshiou`, `yimshiou`. **Die Regel-21-Umstellung (`-iou` → `-iw`) wurde nur
auf `vocabulary.darija` angewandt, nicht auf die JSON-Tabellen.** Im Bestand: 0 Zeilen mit `-iou`.
In den Tabellen: 14 Zeilen. Der Trainer zeigte dem Lernenden dort die verworfene Schreibung.

Korrigiert. **Check 21: 21 → 17.**

### Und derselbe Mechanismus noch einmal, am selben Tag

Heute früh habe ich `4555 thahhhert` → `thahhert` korrigiert (drei `h` statt zwei). Die
`conjugation`-Tabelle derselben Verbgruppe trug den Fehler **in sechs Formen weiter**:
`thahhher`, `thahhherna`, `thahhhert`, `thahhhertu`, `nthahhher`, `ythahhher`. Ich hatte ihn nicht
gesehen, weil kein Check die Tabellen liest.

### Neuer Check 32 (Gruppe A): Tabellen gegen die Transliterationsregeln

Prüft alle `conjugation`-Formen auf: Ziffern 2/5/9, Großbuchstaben, `ch` statt `sh`, nicht
assimilierter Artikel, Plural `-iou/-eou/-aou`, halb verdoppelte Digraphen und **drei gleiche
Zeichen in Folge**. Nach den beiden Korrekturen: **0**.

**Lehre:** Eine Prüfregel, die nur eine Spalte kennt, lässt dieselben Daten in jeder anderen Form
unkontrolliert. `conjugation` enthält 650 Zeilen × bis zu 16 Formen derselben Art Transliteration wie
`darija` — und war bis heute komplett ungeprüft.

### Die verbleibenden 17

Keine davon ist zum Anlegen. Zwei Klassen:

**a) Zeile und Tabelle schreiben dieselbe Form verschieden (12):**

| id | Zeile | Tabelle sagt |
|---|---|---|
| 526 | `tnijjem` | `tnajjim` |
| 576 | `eqif` | `weqif` |
| 732 | `youja3` | `yuja3` |
| 1042 | `nsakker` | `nsakkar` |
| 1198 | `na3mlou` | `na3mlu` |
| 3052 | `osket` | `uskut` |
| 3415 | `thahhar` | nur Pluralformen passen |
| 3432 | `y3jeb` | `yi3jeb` |
| 3435 | `yrodd` | `yrudd` |
| 3443 | `ylawwej` | `ylawwij` |
| 3452 | `ythahhir` | nur Pluralformen passen |
| 4045 | `yijra` | `yijri` |

Das ist die unnormierte Vokalachse — **aber innerhalb einer Zeile**: der Lernende sieht beide
Schreibungen für dasselbe Wort. `1198 na3mlou` gehört zum bewusst zurückgestellten
„`-ou` nach Konsonant"-Posten und bleibt außen vor.

**b) Phrase trägt eine Verbtabelle, in der sie nicht vorkommen kann (5):**
`752 3ayyit l-el-7imaya`, `753 3ayyit l-esh-shorta`, `1913 3ayyit lil wled`,
`2646 3ayyit lil-is3af!` (ganze Sätze mit der Tabelle des Verbs `3ayyit`) und `3614 y7ajjim`,
dessen Tabelle keine einzige Form mit passendem Skelett enthält.

### Stand

Gruppe A: **18 Checks, alle 0.** Gruppe B: 1 · 17 · 425 · 36 · 1 · 1 · 7 = **488**.

---

## Runde 39 (2026-09-13) — Zeile und Tabelle angeglichen

Entscheidung Nils: **die Zeile gilt, die Tabelle folgt** — die Zeile wird abgefragt und trägt den
Lernfortschritt, die Tabelle ist Anzeige. Je Verbgruppe einmal ersetzt, damit alle Zeilen der Gruppe
dieselbe Tabelle behalten.

**Geschrieben (8 Verbgruppen, 31 Zeilen):**

| id | Zeile | Tabelle vorher |
|---|---|---|
| 526 | `tnijjem` | `tnajjim` |
| 732 | `youja3` | `yuja3` |
| 1042 | `nsakker` | `nsakkar` |
| 3415 | `thahhar` | `thahher` |
| 3432 | `y3jeb` | `yi3jeb` |
| 3435 | `yrodd` | `yrudd` |
| 3443 | `ylawwej` | `ylawwij` |
| 3452 | `ythahhir` | `ythahher` |

Vorher geprüft: jede der neun Zeichenketten kommt in genau **einer** Tabelle vor, keine Kollision
mit fremden Verbgruppen. Ersetzt wurde die exakte JSON-Zeichenkette inklusive Anführungszeichen —
sonst hätte `"thahher"` auch `"ythahher"` getroffen.

**Check 21: 17 → 9.**

### Eine Angleichung zurückgenommen — sie hat das Problem nur verschoben

`4045 yijra` „es geschieht" teilt die Tabelle mit `4039 yijri` „er läuft" — **zwei Bedeutungen des
Verbs جرى mit derselben grammatischen Form**. Die Tabelle hat aber nur **eine** Zelle für
`present.3sg_m`. Nach der Angleichung an `4045` fiel `4039` aus seiner eigenen Tabelle und stand neu
in Check 21.

Zurückgenommen; die wörtliche Grundform `yijri` steht wieder. **Das ist keine Schreibfrage, sondern
eine Grenze des 3-Zeilen-Modells** und liegt zur Entscheidung vor.

### Zwei weitere, die keine Schreibfälle sind

- **`576 eqif`** „Halte an!" — die Verbgruppe enthält bereits **`2600 weqif`** als eigene Zeile.
  Die Tabelle auf `eqif` anzugleichen würde eine bestehende Zeile verdrängen. Dazu kommt: `576`s
  `arabic_script` ist قف **ohne و**, die ganze Gruppe (`2600 weqif`, `4188 yaqif`, `4378 wqif`) hat
  die Wurzel وقف. Verdacht auf Dublette, nicht auf Schreibvariante.
- **`3052 osket`** „Sei still!" — `arabic_script` أُسْكُتْ leitet weder die Zeile (`osket`) noch die
  Tabellenform (`uskut`) exakt ab. Dreieckskonflikt zwischen Zeile, Tabelle und Arabisch.

`1198 na3mlou` bleibt außen vor (gehört zum zurückgestellten „`-ou` nach Konsonant"-Posten).

### Die Plausibilitätsprüfung hat sich bezahlt gemacht

Beim Gegenlesen brach der Harness ab: eine der vier Datenseiten kam als **Gateway Timeout** zurück,
also 2.777 statt 3.777 Zeilen. Ohne den Abgleich gegen den `count`-Header hätte ich „0 Duplikate"
über einen um ein Viertel gekürzten Bestand gemeldet — genau der Fehler, den die Regel verhindern
soll. Nach dem Nachladen:

| | |
|---|---|
| 🔁 Duplikate | **0** von 3.777, `count`-Header 3.777 |
| 🔤 Transliteration | **0** von 3.777, 23 Regeln |

### Stand

Gruppe A: **18 Checks, alle 0.** Gruppe B: 1 · 9 · 425 · 36 · 1 · 1 · 7 = **480**.

Check 21 enthält nur noch: die vier `3ayyit`-Phrasen (752, 753, 1913, 2646), `3614 y7ajjim`,
`576 eqif`, `3052 osket`, `1198 na3mlou`, `4045 yijra`.

---

## Runde 40 (2026-09-13) — Phrasen und ein falsches Paradigma

### Die vier `3ayyit`-Phrasen: Tabelle entfernt — und ein Befund dabei

Vorprüfung wie angekündigt: die Verbgruppe existiert vollständig (`4548 3ayyit` „er rief",
`4549 y3ayyit` „er ruft", `4550 3ayyitt` „ich rief", rotierend). Die Tabelle bleibt dort; die vier
Sätze tragen sie nur zusätzlich und können in ihr naturgemäß nie vorkommen.

**Dabei aufgefallen:** `752` und `753` trugen als `arabic_script` عَيَّطْت — das leitet `3ayyatt` ab,
also **1. Person Vergangenheit „ich rief"**. Das Deutsche sagt aber „Ruf die Feuerwehr" / „Ruf die
Polizei", und die `darija` `3ayyit` ist der Imperativ. `1913` hatte عَيَّطْ = `3ayyat`, auch nicht
den Imperativ.

Alle drei auf عَيِّط = `3ayyit` umgestellt. Beleg aus dem eigenen Bestand: `2646` trug den Imperativ
bereits richtig, und `4550 3ayyitt` zeigt, wie die 1. Person aussieht (doppeltes `t`).

### `3614 y7ajjim`: die Tabelle beschrieb ein anderes Verb

Die Tabelle enthielt `n7jem` / `t7jem` / `y7jem` — **Maß I ohne Gemination**. Die Zeile ist
`y7ajjim` يْحَجِّم, Maß II. Die Quellen sind einstimmig für die Zeile: TUNICO `ḥažžim`,
Ninja حَجِّمْ, Peace Corps `7ajjim`; dazu der eigene Bestand mit `2327 7ajjem` „Friseur" (حَجَّام)
und `3603 7ajjem bel-zero` (حَجِّمْ).

Die Tabelle war zudem mit drei Formen unvollständig. Entfernt — die Zeile steht jetzt als Verbzeile
ohne Tabelle, wie 169 andere auch. Ein vollständiges Paradigma anzulegen ist eine eigene Entscheidung.

Das ist übrigens genau der Präzedenzfall, den der Skill unter „Verb-Selbstcheck" führt: `y7jem` galt
als „eine Zeile, Tabelle dran, fertig". Die Zeile wurde später auf `y7ajjim` korrigiert — **die
Tabelle blieb stehen und behielt das alte, falsche Verb.**

### Stand

**Check 21: 9 → 4.** Übrig sind nur noch die vier Entscheidungsfälle: `576 eqif`, `1198 na3mlou`,
`3052 osket`, `4045 yijra`.

| | |
|---|---|
| 🔁 Duplikate | **0** von 3.777, `count`-Header 3.777 |
| 🔤 Transliteration | **0** von 3.777, 23 Regeln |
| Gruppe A | **18 Checks, alle 0** |
| Gruppe B | 1 · 4 · 425 · 36 · 1 · 1 · 7 = **475** |

---

## Runde 41 (2026-09-13) — `576 eqif`: der Imperativ ist doppelt besetzt

Untersucht, nichts geschrieben. Die Verbgruppe وقف:

| id | darija | arabic_script | Ableitung | deutsch | Lernstand | Rolle |
|---|---|---|---|---|---|---|
| **576** | `eqif` | قف | `qf` | Halte an! / Stopp / Steh auf (Imperativ) | 6/5 · 15× | — |
| **2600** | `weqif` | وَاقِف | `waqif` | steh! (Imperativ) | 2/4 · 10× | `conj_rotate` |
| 4188 | `yaqif` | يَاقِف | `yaqif` | er steht | 5/0 · 5× | Präsens, Kurs-Ref |
| 4378 | `wqif` | وْقِفْ | `wqif` | er stand | 5/0 · 5× | Vergangenheit, Kurs-Ref |

**Quellenlage:** TUNICO `wqif` („to stand / to stop / to come to standstill / to stall"), Ninja وْقِفْ
`wqif`, Peace Corps `waqqif` („to stop / to park", Maß II, kausativ). **Keine Quelle gibt den
Imperativ.**

### Drei Befunde

1. **Der Imperativ ist doppelt besetzt.** `576` und `2600` sind beide als Imperativ Singular
   glossiert („Halte an! / Stopp / Steh auf" und „steh!"). Das 3-Zeilen-Modell sieht dafür eine
   Zeile vor; Präsens (`4188`) und Vergangenheit (`4378`) sind je einfach da.
2. **`576`s `arabic_script` ist defekt:** قف, unvokalisiert und **ohne و** — es leitet `qf` ab und
   zeigt die Wurzel nicht einmal vollständig. Die ganze übrige Gruppe trägt وقف.
3. **`2600`s `arabic_script` ist das aktive Partizip, nicht der Imperativ:** وَاقِف leitet `waqif`
   ab, das heißt „stehend". Das Gloss sagt „steh! (Imperativ)".

`4378 wqif` ist als einzige der vier sauber (exakt Ninjas Form).

### Was zu entscheiden ist

Beide Kandidaten tragen Lernfortschritt — `576` mehr Wiederholungen (15 gegen 10), `2600` ist die
Modellzeile (`conj_rotate`, und die Tabelle führt `imperative.sg = weqif`). Kein Kurs-Verweis auf
beide.

| Weg | was passiert |
|---|---|
| **A: `576` behalten** | breiteres Gloss, mehr Fortschritt; `conj_rotate` müsste von `2600` übergehen, `2600` wird gelöscht |
| **B: `2600` behalten** | bleibt die Modellzeile, stimmt mit der Tabelle überein; `576` wird gelöscht, 15 Wiederholungen gehen verloren |
| **C: beide behalten** | dann sind es zwei Schreibvarianten desselben Imperativs → `homonym_ok` auf beiden, und beide Arabisch-Werte müssen repariert werden |

**In jedem Fall offen:** wie der Imperativ arabisch geschrieben wird. Die Quellen geben ihn nicht
her, und ich rate ihn nicht. Für Weg C wäre das Gloss von `2600` auf „stehend" zu ändern — dann
wäre وَاقِف richtig und die Zeile kein Imperativ mehr, womit sich die Doppelbesetzung von selbst
auflöst.

**Das ist mein Vorschlag: Weg C in dieser Lesart** — `2600` ist gar kein Imperativ, sondern das
Partizip „stehend", so wie sein Arabisch es sagt. Dann behält `576` den Imperativ (mit zu
reparierendem Arabisch), `2600` wird zum Partizip, und die Gruppe ist vollständig statt doppelt.
Das setzt aber eine Bedeutungsentscheidung voraus, die Semia bestätigen sollte.

---

## Runde 42 (2026-09-13) — die Morphologie ist auch eine Quelle

**Korrektur meiner eigenen Aussage aus Runde 41.** Ich hatte geschrieben: „Keine Quelle gibt den
Imperativ her, und ich rate ihn nicht", und `576`s `arabic_script` قف als defekt eingestuft, weil es
„die Wurzel nicht einmal vollständig zeigt". Beides war falsch.

**قف ist die korrekte Form.** Bei assimilierten Verben (مثال واوي) fällt das و im Imperfekt und im
Imperativ weg: وَقَفَ → يَقِفُ → **قِفْ**. Das ist keine Wörterbuchfrage, sondern Morphologie.
Dasselbe Muster erklärt auch `4188 yaqif` يَاقِف.

**Geschrieben:** `576` arabic_script → **إِقِفْ**. Das prothetische Alif folgt der
Bestandskonvention für Imperative (`575 imshi` إمشي, `2465 ejri` إِجْرِي, `2468 e7bi` إِحْبِي,
`3673 el3ab` إلْعَبْ, `3770 ishri` اِشْري). Ableitung `iqif` gegen `darija` `eqif` — reine Vokalachse.

### Und damit löst sich die Doppelbesetzung

Dieselbe Morphologie sagt: **وَاقِف ist das aktive Partizip „stehend", nicht der Imperativ.** Der
Bestand weiß das längst:

| id | darija | arabic | deutsch | topic |
|---|---|---|---|---|
| 2600 | `weqif` | وَاقِف | **steh! (Imperativ)** | Kurzphrasen |
| **3838** | `waqif` | وَاقِفْ | **stehend** | Adjektive |
| 3863 | `shbik waqif` | شْبِيكْ وَاقِفْ | Warum stehst du (so) rum? | Gesprächsführung |

`2600` und `3838` haben denselben `ar_key` — **dasselbe Wort**, aber nur `3838` glossiert es richtig.
Check 31 meldet das Paar nicht, weil er gleiche Bedeutung verlangt und die Glossen verschieden sind:
**ein falsches Gloss versteckt eine Dublette vor dem Dublettencheck.**

### Zur Entscheidung

`2600 weqif` ist eine Dublette zu `3838 waqif` mit falschem Gloss. Der Imperativ steckt in `576`.
Ein Merge hat aber zwei Anhängsel:

- `2600` trägt `conj_rotate = true` — es ist die rotierende Zeile der وقف-Gruppe. Bei Löschung
  müsste das Flag auf eine andere Zeile der Gruppe.
- Die `conjugation`-Tabelle führt `imperative.sg = weqif`. Nach dieser Klärung ist auch das falsch;
  richtig wäre `eqif`.

Lernstand: `2600` 2/4 · 10×, `3838` — (noch nicht geprüft). Kein Kurs-Verweis auf `2600`.

### Lehre

**Die arabische Morphologie ist eine Quelle, die immer verfügbar ist.** „Keine der drei Quellen gibt
es her" ist keine Begründung, wenn die Form aus dem Wurzelmuster folgt. Der Fehler hat in derselben
Runde zwei Befunde verdeckt: ein angeblich defektes `arabic_script`, das richtig war, und eine
Dublette, die sich erst zeigte, als die Morphologie das Gloss widerlegte.

---

## Runde 43 (2026-09-13) — Merge `2600` → `3838`, die وقف-Gruppe ist sauber

**Geschrieben:**

1. **`conjugation`: `imperative.sg` von `weqif` auf `eqif`** (in allen vier Zeilen der Gruppe, eine
   Tabelle). `imperative.pl` bleibt `wqifu` — dafür gibt es keinen Bestandsbeleg, und die Ableitung
   allein (قِفُوا) reicht mir hier nicht.
2. **`2600 weqif` gelöscht**, Begründung in `3838`s `internal_note`.

**Warum `3838` bleibt:** richtiges Gloss („stehend"), richtiges topic („Adjektive"), Kurs-Verweis,
mehr Wiederholungen (14× gegen 10×). `2600` hatte nichts davon außer dem `conj_rotate`-Flag.

### `conj_rotate` wurde bewusst nicht vererbt

Der Trainer braucht dafür **beides** — `if(v.cr && v.cj)` (trainer.html:2441). `3838` trägt keine
`conjugation` und könnte das Flag gar nicht nutzen. Und auf eine der verbliebenen Zeilen zu setzen
wäre falsch: `576 eqif`, `4188 yaqif` und `4378 wqif` sind **Grundformen**, deren Karte genau ihre
eigene Form abfragen soll. Ein Rotationsflag würde daraus eine Zufallsabfrage machen.

Die وقف-Gruppe hat damit keine rotierende Zeile — wie 88 andere Gruppen auch. Das Muster der
rotierenden Zeilen im Bestand ist durchweg eine **1.-Person-Vergangenheitsform**
(`4550 3ayyitt` „ich rief", `4545 qassit` „ich schnitt"); eine solche Zeile hat diese Gruppe nicht.

### Die Gruppe jetzt

| id | darija | arabic | deutsch | Rolle |
|---|---|---|---|---|
| 576 | `eqif` | إِقِفْ | Halte an! / Stopp / Steh auf | Imperativ |
| 4188 | `yaqif` | يَاقِف | er steht | Präsens |
| 4378 | `wqif` | وْقِفْ | er stand | Vergangenheit |
| 3838 | `waqif` | وَاقِفْ | stehend | Partizip (eigene Zeile, topic Adjektive) |

**Check 21: 4 → 3.** Übrig: `1198 na3mlou` (zurückgestellter `-ou`-Posten), `3052 osket`,
`4045 yijra`.

| | |
|---|---|
| 🔁 Duplikate | **0** von 3.776, `count`-Header 3.776 |
| 🔤 Transliteration | **0** von 3.776, 23 Regeln |
| Gruppe A | **18 Checks, alle 0** |
| Gruppe B | 1 · 3 · 425 · 36 · 1 · 1 · 7 = **474** |

---

## Runde 44 (2026-09-13) — `3052 osket` → `uskut`

Dieselbe Methode wie bei `576`: erst die Morphologie, dann die Geschwisterzeilen, dann die Quellen.

**Der Befund ist schärfer als „Vokalvariante":** das eigene `arabic_script` أُسْكُتْ trägt ein
**Damma** auf dem zweiten Radikal. `e` ist davon keine mögliche Lesart — `osket` war nicht eine von
mehreren Schreibungen, sondern falsch.

| Instanz | sagt |
|---|---|
| eigenes Arabisch أُسْكُتْ | Ableitung `oskot` |
| eigene `conjugation`-Tabelle | `uskut` |
| Geschwisterzeile `4562 yuskut` يُسْكُت | `u` |
| **Peace Corps, „Be quiet!"** | **`uskut`** |
| Morphologie (regelmäßige Wurzel س-ك-ت) | اُسْكُتْ |

**Geschrieben:** `darija` → `uskut`. Damit stimmen Zeile, Tabelle, Geschwisterzeile und Quelle
überein. Das `arabic_script` bleibt; `u`/`o` ist die unnormierte Vokalachse (Peace Corps schreibt
Damma als `u`, unsere Ableitung als `o` — dieselbe Lautung, zwei Konventionen, dokumentiert in
**Quell-Konventionen**).

### Stand

**Check 21: 3 → 2.** Übrig nur die beiden bewusst offenen: `1198 na3mlou` (gehört zum
zurückgestellten „`-ou` nach Konsonant"-Posten) und `4045 yijra` (die Modellgrenze mit
`4039 yijri` — zwei Bedeutungen, eine Tabellenzelle).

| | |
|---|---|
| 🔁 Duplikate | **0** von 3.776, `count`-Header 3.776 |
| 🔤 Transliteration | **0** von 3.776, 23 Regeln |
| Gruppe A | **18 Checks, alle 0** |
| Gruppe B | 1 · 2 · 425 · 36 · 1 · 1 · 7 = **473** |

---

## Runde 45 (2026-09-13) — die letzten Einzelfälle, und ein Fehler in meinem eigenen Schlüssel

### `3017 nna` und `2538 nifli`: gesucht, unterschiedlich ausgegangen

Freigabe war „wenn keine der drei Quellen die hat, löschen". Die Suche ging unterschiedlich aus:

- **`3017 nna` ist belegt** — TUNICO `ṇāṇa` „auntie", Ninja نَانَا „grandma". Nur **unsere
  Schreibung** war falsch: `nna` gegen نَّنَا (Schadda auf dem ersten Buchstaben, orthographisch
  unmöglich — Check 20 **und** 25 gleichzeitig). **Korrigiert** zu `nana` / نَانَا, Ableitung jetzt
  exakt. Löschen wäre der Verlust eines belegten Wortes gewesen.
- **`2538 nifli` nicht.** Die Wurzel فلس ist reich belegt (Ninja مْفَلِّسْ, TUNICO/PC `falis`,
  `fallis`, `flas`), die Form `nifli`/`niflli` in keiner Quelle. Kein Lernstand, kein Kurs-Verweis,
  und `2537 trit` deckt dieselbe Bedeutung ab. **Gelöscht.**

### Beim Suchen der 7 verwaisten Flags: mein Bedeutungsschlüssel war kaputt

`1389 iy` „Ja" und `4448 n3am` „ja" standen beide als verwaist in Check 30 — obwohl sie offensichtlich
dieselbe Bedeutung haben. Ursache:

```sql
lower(regexp_replace(german,'[^a-zäöüß]','','g'))   -- falsch
regexp_replace(lower(german),'[^a-zäöüß]','','g')   -- richtig
```

Das `regexp_replace` lief **vor** dem `lower()`. Großbuchstaben sind nicht in `[a-zäöüß]` und wurden
gelöscht: „Ja" → `a`, „Haus" → `aus`, „Maus" → ebenfalls `aus`. **Gemessen: 2.420 von 3.775 Zeilen
betroffen, 64 %.** Der Schlüssel steckt in Check 30 **und** Check 31 — beide waren unzuverlässig.
Repariert; Check 30 fiel dadurch von 7 auf 5, Check 31 blieb 0.

**Das ist heute das vierte Mal, dass ein auffälliges Ergebnis einen Fehler im Check statt in den
Daten hatte** — und diesmal war es ein Tippfehler in der Klammerung.

### Die 5 verbliebenen Flags: einer hatte sehr wohl einen Partner

**`4180 kasa`** كاسة „Waschlappen" ↔ **`2125 el-kasa`** الكَاسَةْ „die Kasse" — dasselbe Wort, zwei
Bedeutungen. Der Check sah sie nicht, weil der **Artikel** den `ar_key` verändert (الكاسة gegen
كاسة). `2125` hat jetzt ebenfalls `homonym_ok`, und der `ar_key` normalisiert das führende ال weg.

Die anderen vier hatten keinen Partner, Flag entfernt:

| id | warum verwaist |
|---|---|
| 2037 `kasa7` | einziger Nachbar `2004 aksa7` „hässlicher" — andere Wurzel-Ableitung, kein Homonym |
| **4396 `qas`** | der Partner war `1681 qas` — **den habe ich heute selbst auf `qass` umbenannt** |
| 4533 `bqit` | kein Partner in keiner Achse, kein Skelett-Nachbar |
| 4574 `tayya7t` | Nachbarn `663 ta7t` „unten", `1764 ti7t` „ich fiel" — anderes Wort, anderes Maß |

`4396` ist lehrreich: eine Korrektur an einer Zeile kann das Flag einer **anderen** verwaisen lassen.

### Stand — Gruppe B hat nur noch drei Listen

| Check | Treffer |
|---|---|
| 20 ungültige Anfangs-Schadda | **0** |
| 24 Gemination | **0** |
| 25 Konsonanten | **0** |
| 30 verwaistes `homonym_ok` | **0** |
| 21 Verb-Selbstcheck | 2 (beide bewusst offen) |
| 22 unvokalisierte Einzelwörter | 424 |
| 23 Vokalisierungs-Kandidaten | 36 |

| | |
|---|---|
| 🔁 Duplikate | **0** von 3.775, `count`-Header 3.775 |
| 🔤 Transliteration | **0** von 3.775, 23 Regeln |
| Gruppe A | **18 Checks, alle 0** |
| Gruppe B | **462** statt 473 |

---

## Runde 46 — Check 22 vermessen: die 424 unvokalisierten Einzelwörter

Nicht als Kampagne begonnen, sondern zuerst vermessen: wie viele der 424 haben überhaupt eine Quelle,
wie viele lassen sich aus dem eigenen Bestand ableiten, und wie viele sind Lehnwörter.

### Der Bestand

| | |
|---|---|
| Zeilen in Check 22 | 424 |
| davon mit `conjugation`-Tabelle (Verben) | 144 |
| davon als Lehnwort im Deutschen markiert | 3 |
| davon mit `ninja_id` | **0** |
| 1–2 / 3 / 4 / 5+ arabische Buchstaben | 4 / 48 / 147 / 225 |

Die Null bei `ninja_id` ist ein Fingerzeig, aber ein schmaler: im ganzen Bestand tragen nur 122 Zeilen
eine `ninja_id` — und **alle 122 sind vokalisiert**. Breiter gemessen nennen 327 Zeilen Ninja in der
`internal_note`, bei 3.115 vokalisierten Zeilen insgesamt. Der Großteil des vokalisierten Bestands kommt
also **nicht** aus Ninja, sondern aus der ursprünglichen Erfassung. Was die Zahlen belegen, ist enger und
reicht: **die gezielten Vokalisierungs-Runden liefen über Ninja, und keine der 424 Zeilen hat dabei einen
Treffer bekommen.**

### Frage 1 — wie weit reicht Ninja?

Auf der Buchstabenebene (`ar_key`, gleiche Buchstaben ohne Harakat, Artikel normalisiert):

| Vergleichsebene | Treffer | davon genau eine vokalisierte Variante |
|---|---|---|
| gleiche Buchstaben | **84** | 69 |
| + Hamza/ة/ى normalisiert | 87 | 72 |
| Konsonantenskelett | 282 | 64 |

Die Normalisierung von أ/إ/آ, ى und ة bringt **3** zusätzliche eindeutige Fälle — die Buchstabenebene
ist gesättigt. Das Skelett bringt 202 zusätzliche Treffer, aber das ist die Ebene, die ganze
Wurzelfamilien zusammenwirft (Runde 30: 465 Gruppen). Der Sprung von 84 auf 282 ist kein Gewinn,
sondern die bekannte Unschärfe.

### Frage 1b — und stimmen diese 84 überhaupt mit uns überein?

Das ist die Frage, die die Kampagne beinahe übersprungen hätte. Ninjas `chatalpha` gegen unsere
`darija`, beide normalisiert (y→i, w→u, Verdopplungen reduziert):

| | Zeilen |
|---|---|
| Transliteration identisch → direkt übertragbar | **18** |
| gleiches Konsonantengerüst, andere Vokale/Schadda | **48** |
| anderes Konsonantengerüst → anderes Wort | **18** |

Die 48 noch einmal aufgeteilt:

| | Zeilen |
|---|---|
| Ninja hat eine Verdopplung, wir nicht (Form-II-Verdacht) | 12 |
| wir haben eine Verdopplung, Ninja nicht | 9 |
| reiner Vokalunterschied | 27 |

Von 84 „eindeutigen" Ninja-Treffern sind **18** übertragbar. Bei den übrigen würden Ninjas Harakat der
eigenen `darija` widersprechen — aber nicht immer, weil unsere Zeile falsch wäre.

| id | unsere `darija` | Ninja | was Ninja wirklich hat |
|---|---|---|---|
| 547 `sma3` „er hörte" | سمع | `samma3` | Form II „jemanden hören lassen" |
| 643 `lbis` „er zog sich an" | لبس | `labbis` | Form II „jemanden ankleiden" |
| 644 `l3ab` „er spielte" | لعب | `la33ib` | Form II „jemanden spielen lassen" |
| 775 `el-baba` „Der Papst" | بابا | `baba` | „Dad" |
| 598 `er-rami` „Rami (Kartenspiel)" | الرامي | `rami` | „Rami (Männername)" |
| 325 `hrisa` „Harissa" | هريسة | `hariysa` → هَرِيسَةْ | ein anderes Vokalmuster als unser `hrisa` |

Gleiche Buchstaben, anderes Wort — dasselbe Muster wie bei `ableitung_exakt` in Runde 38: **die
Formgleichheit prüft die Form, nicht die Bedeutung.** Bei den Formen II ist es systematisch: das
unvokalisierte Arabisch unterscheidet Grundstamm und Form II gar nicht, genau dafür ist die
Vokalisierung da. Ninjas Eintrag ist dann nicht die Vokalisierung unseres Wortes, sondern die eines
anderen.

### Frage 2 — die anderen beiden Quellen tragen Vokale

TUNICO (`lemma_orig`: `hrīsa`, `xfīf`, `fṛanṣāwi`) und Peace Corps (`forms_phonetic`: `ixtiSa:r`,
`ghli:dh`, `ba:nka`) führen **vokalisierte Transkriptionen**. 7.008 TUNICO-Lemmata, 5.004 Peace-Corps-
Formen. Für die Vokalisierung sind sie damit gleichwertige Quellen — sie sind bisher nur nie dafür
benutzt worden.

| Quelle | Treffer über das Translit-Skelett | mit **identischer** `darija` |
|---|---|---|
| Derja Ninja (über die arabischen Buchstaben) | 84 | 18 |
| TUNICO | 237 | 69 |
| Peace Corps | 244 | 65 |
| mindestens eine | **296 von 424 (70 %)** | **94** |
| *davon ohne jeden Ninja-Treffer* | 212 | 54 |

Der Block mit identischer `darija` ist der belastbare: dort stimmen Konsonanten **und** Vokale mit
unserem Eintrag überein, das Wort ist dasselbe, und die Harakat folgen aus der Transkription.
54 dieser Zeilen waren für den bisherigen Weg unsichtbar.

Und die Quellen schiedsrichtern gegeneinander: bei **`325 hrisa`** sagt TUNICO `hrīsa` — das bestätigt
unsere `darija` und widerlegt Ninjas هَرِيسَةْ.

### Frage 3 — Ableitung aus dem eigenen Bestand, und Lehnwörter

| | Zeilen |
|---|---|
| dasselbe Wort steht schon vokalisiert in einer anderen Zeile | 25 (21 eindeutig) |
| nur eine vokalisierte Geschwisterzeile derselben Wurzel | 204 |
| als Lehnwort markiert | 3 |

Die 25 sind Homonym-Paare (Check 31 steht auf 0, es sind also keine Dubletten): gleiche Buchstaben,
verschiedene Bedeutung. Gerade dort können die Harakat **auseinandergehen** — das Übertragen ist hier
die falsche Bewegung, die `darija` entscheidet. Lehnwörter sind mit 3 Zeilen kein eigener Block.

### Die Klassifikation

| Klasse | Zeilen | davon Verben |
|---|---|---|
| A Ninja eindeutig, gleiche Buchstaben | 69 | 9 |
| B TUNICO/PC mit identischer `darija`, eindeutig | 61 | 14 |
| C Quelle vorhanden, aber mehrdeutig | 8 | 2 |
| D Quelle nur über das Skelett (anderes Wort möglich) | 158 | 60 |
| E Verb mit `conjugation`-Tabelle, sonst nichts | 59 | 59 |
| F Lehnwort | 2 | 0 |
| G ohne jeden Anhaltspunkt | 67 | 0 |

A und B überschneiden sich nicht (Prioritätsreihenfolge), zusammen 130. Nach dem Abgleich aus Frage 1b
schrumpft A aber auf die 18 wirklich übereinstimmenden; der Rest von A gehört in Wahrheit zu C/D.

### Was die Messung über die Aufgabe selbst sagt

Check 22 ist **keine Kampagne mit 424 Übertragungen**. Er ist ein Prüfer: wo eine Quelle vokalisiert und
wir nicht, kommt eine von drei Antworten heraus — die Quelle bestätigt uns (18), die Quelle meint ein
anderes Wort (18), oder die Vokale gehen auseinander (48). Nur die erste ist ein Eintrag ins
`arabic_script`.

Die 48 sind **nicht** 48 Fehler im Bestand, und das ist wichtig: bei den 12 mit Ninja-Verdopplung ist es
in der Stichprobe jedes Mal Form II gegen Grundstamm gewesen — zwei verschiedene Verben, die das
unvokalisierte Arabisch gar nicht trennt. Wie viele der 48 wirklich auf eine unstimmige Zeile zeigen,
ist damit **noch nicht gemessen**; es braucht die Einzelansicht. Die 27 reinen Vokalunterschiede sind
der Teil, wo sie am ehesten liegt.

Zwei Kandidaten aus der Stichprobe, beide noch nicht entschieden:

- **`569 banka`** „Bank" — unser Arabisch بنك, aber PC `ba:nka` und TUNICO `bānka`. Das Arabisch bildet
  das auslautende -a nicht ab.
- **`604 wraq`** „Blätter (Pl.)" — unser Arabisch أوراق (MSA `awraq`), unsere `darija` `wraq`, PC `wraq`,
  TUNICO `wṛaq`.

### Der Messfehler, der fast in diese Runde gekommen wäre

Der erste Abgleich meldete **68 von 84** als abweichend. Ninja schreibt langes i als `y` und langes u
als `w` (`5fyf`, `ramiy`, `massouw`). Ohne die Abbildung y→i / w→u zählten `khfif` gegen `khfyf` und
`fransawi` gegen `fransawy` als verschiedene Wörter. Nach der Normalisierung: 18 identisch, 53
Vokalunterschiede, 18 andere Wörter. **Fünftes Mal, dass ein auffälliges Ergebnis ein Fehler im Check
war und nicht in den Daten.**

### Der Block, der gar keine Quelle braucht

Ein Zählschritt zum Schluss, ohne jede externe Quelle: **83 der 424** haben eine Verdopplung in der
`darija` (`massou`, `qassar`), aber nur **9** schreiben den Buchstaben im Arabischen doppelt. In den
übrigen ~74 fordert die eigene `darija` eine Schadda, die im `arabic_script` fehlt. Das ist aus dem
eigenen Bestand ableitbar, die Zuordnung macht `_arabic_to_chatalpha()`, und Check 24 (Gemination)
steht auf 0 — er kann es heute nur nicht sehen, weil unvokalisiertes Arabisch nie widerspricht.

Ein Vorbehalt gehört dazu: eine Schadda ist ein Harakat. Zeilen, die nur eine Schadda bekommen, fallen
aus Check 22 heraus, ohne wirklich vokalisiert zu sein. Entweder wird das in Kauf genommen oder
Check 22 muss künftig Vokalzeichen von der Schadda unterscheiden.

### Nebenbefund: es gibt keine Hausregel für den Auslaut

Von 3.115 vokalisierten Zeilen enden **676** auf Sukun, **60** tragen ein Sukun auf ة (هَرِيسَةْ). Das ist
Ninjas Schreibweise, nicht Standard — und sie ist über 327 aus Ninja übernommene Zeilen in den Bestand
gelangt. Bevor 130 weitere Zeilen vokalisiert werden, gehört diese Konvention entschieden.

---

## Runde 47 — 10 Schadda-Ergänzungen geschrieben, 2 zurückgenommen

Aus den 71 echten Konsonanten-Verdopplungen (die 3 Ausreißer `baash`, `mraa`, `loofah` waren lange
Vokale, kein Schadda-Fall) zwei mechanisch eindeutige Gruppen geschrieben:

| Gruppe | id → Änderung |
|---|---|
| Artikelassimilation | 598 الرامي→الرّامي, 784 الصوم→الصّوم, 785 الحج→الحجّ, 1065 بالنعناع→بالنّعناع, 4342 الدنيا→الدّنيا, 4438 النمسا→النّمسا |
| Nisba-/Plural-Endung -iyya | 749 البلادية→البلاديّة, 1160 سبادريات→سبادريّات, 2100 فرنساوية→فرنساويّة, 2101 أمريكانية→أمريكانيّة |

Jede Zeile trägt jetzt `[schadda ergänzt: ..., unvokalisiert]` in `internal_note` (bei 4342/4438 an die
bestehende Notiz angehängt, nicht überschrieben).

### Die Gegenprobe fand einen Fehler, den die Schadda nur sichtbar gemacht hat

Nach dem Schreiben aller 12 Kandidaten sprang **Check 25 (Konsonant: darija/arabic_script
widersprechen sich) von 0 auf 2** — vorher über Monate 0. `_arabic_to_chatalpha()` direkt aufgerufen:

| id | arabic_script | abgeleitet | darija | fehlt |
|---|---|---|---|---|
| 783 `ez-zakat` | الزّكاة | `ez-zka` | ez-zakat | **ت** |
| 2153 `ayyemet` | أيّام | `ayyam` | ayyemet | **ت** |

Kein Vokalisierungsproblem — beiden Wörtern fehlt ein ganzer Konsonant, mit oder ohne Schadda. أيام ist
die klassische Pluralform „Tage" ohne jedes ت; unsere `darija` trägt aber ein `-et`-Suffix. الزكاة bildet
das `-at` der `darija` über die ة gar nicht ab. **Das Problem war immer da** — Check 25 sieht nur
Zeilen an, die „vokalisiert genug" aussehen, und ein unvokalisiertes أيام fiel da nie hinein. Die
Schadda hat die Zeile zum ersten Mal in den Prüfkreis gebracht und die Lücke freigelegt.

Beide Schadda-Ergänzungen zurückgenommen (arabic_script und internal_note auf den Ausgangsstand), weil
eine Schadda allein die eigentliche Lücke nicht schließt und eine neue Inkonsistenz stehen lassen
würde. Bleiben als offene Einzelfälle: **783 ez-zakat** und **2153 ayyemet**, beide brauchen eine
inhaltliche Entscheidung (welche Form ist richtig?), keine Schadda.

**Sechstes Mal in dieser Serie, dass die Gegenprobe nach dem Schreiben — nicht nur vorher beim Messen —
etwas gefunden hat.** Bisher prüfte diese Serie Checks vor einer Änderung; hier war die Änderung selbst
der Auslöser, weil sie eine Zeile aus einem Ausschlusskriterium eines anderen Checks herausgeschoben hat.

### Stand

| | vorher | jetzt |
|---|---|---|
| Check 22 unvokalisierte Einzelwörter | 424 | **414** |
| Check 25 Konsonanten-Widerspruch | 0 | **0** (nach Rücknahme) |
| Gruppe A (18 Checks) | alle 0 | **alle 0** |

Offen aus Runde 46 bleiben: die 61 Verbform-/Wurzelgeminations-Zeilen (davon einige vermutlich
Lehnwort-Ausreißer wie `shkobba`, `patisserie`, `glass`, `qlammet`) und die beiden neuen Einzelfälle
783/2153.

---

## Runde 48 — die beiden offenen Fälle aus Runde 47 gegen die Offline-Quellen geprüft

Nachfrage: ob 783 und 2153 in den drei Offline-Quellen (Ninja, TUNICO, Peace Corps) überprüft wurden —
war noch nicht geschehen, nur `_arabic_to_chatalpha()` direkt. Nachgeholt.

### 783 `ez-zakat` „die Armensteuer"

| Quelle | Beleg |
|---|---|
| Derja Ninja | زَكَاةْ → `zaka`, „Charity, alms" |
| TUNICO | `zkā` → `zka`, „Almosensteuer, Armensteuer" (deutsche Bedeutung wortgleich) |

Beide unabhängig **ohne** Artikel `ez-` und **ohne** End-`t`. Keine Quelle kennt `ez-zakat`.

### 2153 `ayyemet` „Tage (Pl.)"

| Quelle | Beleg |
|---|---|
| Peace Corps | „fil-**ayyam** il-muqbla" = „in den kommenden Tagen" |
| Derja Ninja / TUNICO | nur der Singular (`youwm`/`yum`), keine Pluralform mit `-et` |

Keine Quelle kennt ein `-et`-Suffix für den Plural von „Tag".

### Auflösung

In beiden Fällen war nicht das `arabic_script` unvollständig (wie in Runde 47 vermutet), sondern die
`darija` trug einen Zusatz, den keine Quelle stützt. Beide Zeilen stammen unbestätigt aus
Kurslektionen (`external_confirmed=false`, Lektion 44/L24 „5 Säulen des Islam" bzw. Lektion 37). Keine
Kollision mit bestehenden Einträgen geprüft, dann geschrieben:

| id | `darija` alt → neu | `external_confirmed_source` |
|---|---|---|
| 783 | `ez-zakat` → **`zaka`** | tunico |
| 2153 | `ayyemet` → **`ayyam`** | peacecorps |

`arabic_script` unverändert (الزكاة / أيام) — das war schon richtig.

### Gegenprobe

| Check | Treffer |
|---|---|
| Gruppe A (18 Checks) | alle 0 |
| 24 Gemination | 0 |
| 25 Konsonanten-Widerspruch | 0 |
| 22 unvokalisierte Einzelwörter | 414 (unverändert — beide Zeilen bleiben unvokalisiert, jetzt aber ohne Widerspruch) |

Damit sind aus Runde 46/47 nur noch die 61 Verbform-/Wurzelgeminations-Zeilen offen, davon vermutlich
ein paar Lehnwort-Ausreißer (`shkobba`, `patisserie`, `glass`, `qlammet`).

---

## Runde 49 — die eigene Regression aus Runde 48 im Trainer selbst gefunden

Meldung: „Jetzt schlägt die Trainer interne Prüfung an" — der clientseitige Check in `trainer.html`
(🔁 Duplikate / 🔤 Transliteration), nicht die Supabase-Views.

### Ursache

Runde 48 hatte `783`s `darija` von `ez-zakat` auf `zaka` korrigiert (Ninja/TUNICO kennen beide nur
`zaka`/`zka`, ohne Artikel und ohne End-`t`). Das entfernte aber nicht nur das unbelegte `-t`, sondern
auch das `ez-`, das die Artikelassimilation vor dem Sonnenbuchstaben ز korrekt codiert hatte —
الزكاة *hat* den Artikel ال. Regel „Artikel (ال) im Arabischen, aber in der Transliteration nicht
erkennbar" schlägt seither an.

### Verifiziert mit dem echten Trainer-Code, nicht nur gelesen

Die 23 `TRANSLIT_RULES` und die Duplikat-Logik direkt aus `trainer.html` extrahiert (Zeilen 6205–6307)
und gegen frisch geladenen Live-Bestand laufen lassen (`count`-Header 3.775, 4 Seiten, 23 Regeln
bestätigt). Ergebnis: **genau 1 Treffer, id 783**, sonst nichts.

Ein Nebenfehler dabei selbst gemacht und sofort korrigiert: die erste Live-Abfrage selektierte
`homonym_ok` nicht mit, wodurch der Duplikat-Check *jedes* bewusst markierte Homonym-Paar (12
arabische, 16 Transliterations-, 11 deutsche Paare, u.a. das seit Runde 45 bekannte `1389`/`4448`)
fälschlich als Duplikat zeigte. Mit vollständigem Feldset: 0 Duplikate.

### Korrektur

`783`: `zaka` → **`ez-zaka`** — Artikel bleibt erkennbar, das unbelegte `-t` bleibt draußen. Vor dem
Schreiben gegen die 23 Regeln getestet (0 Treffer), geschrieben, erneut gegen frischen Live-Bestand
verifiziert.

| | |
|---|---|
| Trainer 🔤 Transliteration | **0** von 3.775, 23 Regeln |
| Trainer 🔁 Duplikate | **0** von 3.775 |
| Gruppe A (18 Checks) | alle 0 |

**Lehre für PRECEDENTS.md:** eine `darija`-Korrektur gegen Offline-Quellen kann eine grammatische
Markierung entfernen, die keine der Quellen encodiert, weil Wörterbuch-Lemmata den Artikel nicht
führen. Die Gegenprobe gegen die Transliterationsregeln gehört zu *jeder* `darija`-Änderung, nicht nur
zu neu angelegten Zeilen.

---

## Runde 50 — die vier vermuteten Lehnwort-Ausreißer einzeln geprüft

Vorschlag aus Runde 46/49 aufgegriffen: `shkobba`, `qlammet`, `patisserie`, `glass` einzeln gegen
Ninja/TUNICO/Peace Corps geprüft. Ergebnis: **nur einer** der vier ist wirklich ein Ausreißer — die
Vermutung war größtenteils falsch.

### 597 `shkobba` „Karten (Kartenspiel)" — echt

TUNICO: `škubba`/chatalpha `shkbb`, **unabhängig** geminiertes b, Bedeutung „ein Kartenspiel" passt.
Geschrieben: شكبة → **شكبّة**.

### 1068 `patisserie` „Konditorei" — der einzige echte Ausreißer

TUNICO: `pātīsrī`/`patisri`, **ein einzelnes s**, deutsche Bedeutung wortgleich „Konditorei". Unser
doppeltes „ss" ist nur die französische Schreibung „pâtisserie", keine arabische Gemination. Keine
Schreibungsänderung, nur Notiz gesetzt, damit es nicht erneut vorgeschlagen wird.

### 4358 `glass` „Kleiderschrank (mit Spiegel)" — echt, plus ein Fund per Nutzerhinweis

TUNICO: `glaṣṣ`, deutsche Bedeutung wortgleich, geminiertes ص. Bestätigt eine `internal_note` vom
Vortag, die die Buchstabenkorrektur ك→ڨ schon festgehalten, aber nie geschrieben hatte.

Dazwischen ein Einwand aus dem Trainer selbst: es gibt bereits **`3579 glas`** (ڨْلَصْ, ein ص,
„großer Kleiderschrank", gestern unabhängig via Ninja korrigiert). Zunächst wie ein mögliches Duplikat
geprüft — war keins: `ar_key` ohne Vokale ist ڨلص (3579) gegen ڨلاص (4358-Vorschlag), unterschiedliche
Buchstabenfolge (das zusätzliche ا), unterschiedliche `darija` (glas/glass), unterschiedliche deutsche
Bedeutung. Zwei echte, verwandte Wörter — Grund- und verstärkte/spezifizierte Form, beide unabhängig
aus verschiedenen Quellen bestätigt. Geschrieben: كلاس → **ڨلاصّ**, mit Querverweis auf 3579 in der Notiz.

**Nebenfund beim Schreiben:** die erste Schadda-Fassung für 597 und 894 saß auf dem falschen Buchstaben
— ein Unicode-Kombinationszeichen hängt am *vorangehenden* Buchstaben, und in شكّبة/قلاّمات landete sie
zwischen ك/ب bzw. hinter dem Alif statt auf ب/م. Erst auf Nachfrage auf Codepoint-Ebene geprüft
(`ord()` je Zeichen) und korrigiert. Siebtes Mal in dieser Serie, dass eine Nachfrage einen Fehler vor
dem Schreiben fängt statt danach.

### 894 `qlammet` „Stifte (Pl.)" — zwei echte Plurale, keiner falsch

Ausgangsbefund (Runde 49-Nachtrag) schien die Korrekturrichtung umzukehren: `894` teilt sich die
Lektion (43/L10) mit der Singularform **`256 qlam` „Stift"** (قَلَم, vokalisiert), und `قلام` folgt
exakt demselben, im Bestand etablierten Muster wie drei andere Pluralformen (`2112 qrab`/قراب,
`2114 b3ad`/بعاد, `2116 3radh`/عراض) — alle „aC₁C₂اC₃" ohne Gemination.

Erneute Recherche mit TUNICOs `inflected`-Feld (nicht nur `senses`) klärte es: das Lemma `qlam` (Wurzel
ق-ل-م) führt **fünf** eigenständig getaggte Pluralformen — `qlammāt`, `qlām`, `aqlām` (literarisch),
`iqlma`, `uqlma`. `قلام` entspricht `qlām` (chatalpha reduziert auf `qlam`), `qlammet` entspricht
`qlammāt` — **beide** sind bei TUNICO als echter Dialekt-Plural (`#n_pl`) getaggt, keine Verwechslung.

Entscheidend für die Auswahl war der Trainer selbst: `normalize()` faltet doppelte Vokale (`aa`→`a`),
`qlam` (aus `qlām`) würde beim Abfragen mit der Singular-Antwort `256` zusammenfallen. `qlammāt` bleibt
eindeutig unterscheidbar.

**Beide Varianten in einem Eintrag geprüft, bevor geschrieben wurde:** eine Kombination testet, ob das
mit etwas kollidiert.

| Kombination | Regelverstöße |
|---|---|
| beide Varianten nur im `arabic_script` | **1** — Konsonanten-Zählregel schlägt an (ق zweimal im Arabischen, nur einmal in der `darija`; diese Regel hat anders als die Wortzahl-Regel keine `/`-Ausnahme) |
| beide Varianten nur in der `darija` | **0** |

Geschrieben: `arabic_script` قلام → **قلامّات** (das besser unterscheidbare Muster), `darija`
`qlammet` → **`qlam/qlammet`** (nutzt die bestehende `/`-Konvention aus `checkAnswer()` — beide echten
Formen bleiben als Antwort gültig, keine geht verloren).

### Gegenprobe

| | |
|---|---|
| Trainer 🔤 Transliteration | **0** von 3.775, 23 Regeln |
| Trainer 🔁 Duplikate | **0** von 3.775 |
| Gruppe A (18 Checks) | alle 0 |

**Bilanz der ursprünglichen Lehnwort-Vermutung:** 3 von 4 waren echte Treffer, nur 1 ein Artefakt.
Vermutungen aus einer früheren Runde bleiben Vermutungen, bis sie einzeln geprüft sind — auch die
eigenen.

---

## Runde 51 — 30 Verben aus der eigenen conjugation-Tabelle vokalisiert

Vorschlag aus Runde 50 aufgegriffen: von den 58 verbleibenden Check-22-Kandidaten haben 30 eine
`conjugation`-Tabelle, und die zeigt die Gemination durchgehend über alle Personen/Zeiten hinweg —
keine externe Quelle nötig, die Tabelle ist der Beleg.

Zielschreibung diesmal über explizite Buchstaben-Listen gebaut (nicht durch Tippen von kombiniertem
Arabisch), um den Codepoint-Fehler aus Runde 50 nicht zu wiederholen. Jede der 30 Zeilen einzeln gegen
die echten 23 `TRANSLIT_RULES` getestet (0 Verstöße) und auf Kollision mit bestehenden Einträgen
geprüft (keine), bevor geschrieben wurde.

### Nachfrage vor dem Schreiben: „Warum wird die Verdopplung weggenommen?"

Codepoint-Dump aller 30 Paare zeigte: `alt` enthält nirgends eine Schadda, `neu` ist exakt `alt` plus
eine eingefügte Schadda — nichts wurde entfernt. Die Nachfrage kam vermutlich durch einen
Bidi-Rendering-Effekt zustande (Arabisch/RTL neben einem „→"-Pfeil/LTR in einer Tabellenzelle kann
visuell vertauscht erscheinen, je nach Renderer). Die Tabelle danach mit `alt`/`neu` in getrennten
Spalten statt Pfeil-in-einer-Zelle dargestellt — behebt die Zweideutigkeit für künftige Tabellen.

### Bestehende Notiz beachtet, nicht widersprochen

`526` und `1042` trugen bereits eine Notiz vom 13.09.: bei Widerspruch zwischen Zeile und
`conjugation`-Tabelle gilt die Zeile, die Tabelle wurde damals an die Zeile angeglichen. Betraf nur die
Tabellen-JSON, nicht `arabic_script` — kein Widerspruch zu dieser Runde. Bestehende Notizen wurden
angehängt (`btrim(coalesce(...) || ...)`), nicht überschrieben.

### Die 30 geschriebenen Zeilen

| id | darija | alt | neu | Beleg |
|---|---|---|---|---|
| 526 | tnijjem | تنجم | تنجّم | jj: najjem/tnijjem/ynajjim |
| 646 | tfarraj | تفرج | تفرّج | rr: tfarraj/nitfarraj |
| 1042 | nsakker | نسكر | نسكّر | kk: sakkar/nsakker |
| 1169 | y7ell | يحل | يحلّ | Geminatwurzel 7-l-l: 7all/y7ell/n7illu |
| 1219 | yitkallam | يتكلم | يتكلّم | ll: tkallam/yitkallam |
| 1227 | y3addi | يعدي | يعدّي | dd: 3addi/y3addi |
| 1247 | t3adda | تعدى | تعدّى | dd: 3adda/t3adda |
| 1284 | nrawwa7 | نروح | نروّح | ww: rawwa7/nrawwa7 |
| 1286 | nitfarraj | نتفرج | نتفرّج | rr: tfarraj/nitfarraj |
| 1502 | nit3allem | نتعلم | نتعلّم | ll: t3allem/nit3allem |
| 1838 | tkammil | تكمل | تكمّل | mm: kammil/tkammil |
| 4324 | yrajja3 | يرجع | يرجّع | jj: rajja3/yrajja3 |
| 4352 | ywaqqaf | يوقف | يوقّف | qq: waqqaf/ywaqqaf |
| 4373 | yitkayyif | يتكيف | يتكيّف | yy: tkayyif — Schadda auf der 2. (Wurzel-)ي |
| 4397 | wassal | وصل | وصّل | ss: wassal/nwassal |
| 4398 | wakkil | وكل | وكّل | kk: wakkil/nwakkil |
| 4474 | 7abbit | حبيت | حبّيت | bb im Perfekt/Imperativ (Präsens geminiert bei diesem Verb ausnahmsweise nicht — betrifft diese Zeile nicht, sie ist Perfekt) |
| 4475 | tkayyift | تكيفت | تكيّفت | yy: tkayyif/yitkayyif |
| 4476 | rajja3t | رجعت | رجّعت | jj: rajja3/yrajja3 |
| 4477 | nsalli | نصلي | نصلّي | ll: salla/nsalli |
| 4481 | waqqaft | وقفت | وقّفت | qq: waqqaf/ywaqqaf |
| 4484 | 3arras | عرس | عرّس | rr: 3arras/n3arris |
| 4485 | faddit | فديت | فدّيت | dd: fadd/faddit |
| 4486 | 3arrast | عرست | عرّست | rr: 3arras/n3arris |
| 4487 | shaddit | شديت | شدّيت | dd: shadd/nishedd |
| 4490 | yit3adda | يتعدى | يتعدّى | dd: t3adda/yit3adda |
| 4491 | t3addit | تعديت | تعدّيت | dd: 3adda/t3adda |
| 4494 | jarrabt | جربت | جرّبت | rr: jarrab/yjarrab |
| 4498 | nitraqqa | نترقى | نترقّى | qq: traqqa/nitraqqa |
| 4499 | nsabba7 | نصبح | نصبّح | bb: sabba7/nsabba7 |

### Gegenprobe

| | vorher | jetzt |
|---|---|---|
| Check 22 unvokalisierte Einzelwörter | 411 | **381** |
| Trainer 🔤 Transliteration | 0 | **0** von 3.775, 23 Regeln |
| Trainer 🔁 Duplikate | 0 | **0** von 3.775 |
| Gruppe A (18 Checks) | alle 0 | **alle 0** |

Rechnerisch stimmig: 414 (nach Runde 47) − 3 (Runde 50: 597/894/4358) − 30 (diese Runde) = 381.

Verbleiben aus den ursprünglich 71 Konsonanten-Verdopplungen: 28 Zeilen ohne `conjugation`-Tabelle,
noch nicht einzeln gegen die drei Offline-Quellen geprüft.

---

## Runde 52 — 20 weitere Zeilen, ein Index-Fehler vor dem Schreiben gefangen

Die restlichen 28 Check-22-Kandidaten ohne `conjugation`-Tabelle (aus den ursprünglichen 71
Konsonanten-Verdopplungen) gebündelt gegen alle drei Quellen geprüft (Skelett-Join statt 28 Einzel-
Abfragen). `1068` blieb ausgeschlossen (Runde 50), `783`/`2153` waren durch Runde 47–49 bereits auf der
`darija`-Seite gelöst und tauchten nur auf, weil sie unvokalisiert sind.

### 19 mit klarem Beleg, plus 2153

| id | darija | Beleg |
|---|---|---|
| 523 massou | TUNICO `māṣṣu`/PC `ma:SSu:` „Briefumschlag/ENVELOPE" wortgleich |
| 660 qoddam | TUNICO+PC `quddām`/`quddam` „vor (lokal)/in front of" |
| 670 jadda | TUNICO `žadda`/PC `jidda` „Großmutter/GRANDMOTHER" wortgleich |
| 778 makka | TUNICO `makka` „Mekka" wortgleich |
| 927 metwassat | TUNICO+PC „durchschnittlich/AVERAGE" wortgleich |
| 971 rajja3li | Geschwisterzeile 4324/4476 (`conjugation`-Tabelle) |
| 1085 qalleyet | Geschwisterzeile 4382 (`qallāya` „Bratpfännchen" bei TUNICO) |
| 1095 ysarraf | TUNICO+PC `ṣaṛṛaf`/`sarraf` „Geld wechseln" wortgleich |
| 1203 tkallmik | Geschwisterzeile 1219 (`conjugation`-Tabelle) |
| 1204 nkallamha | Geschwisterzeile 1219 (`conjugation`-Tabelle) |
| 1776 m3abbi | TUNICO+PC „beladen/LOADED,FULL" + Geschwister 4392 |
| 1907 yezzi | TUNICO `yizzi` „genug!" wortgleich |
| 2153 ayyam | `_arabic_to_chatalpha('أيّام')` = `ayyam`, identisch zur darija |
| 4314 mkassar | TUNICO+PC „kaputt/BROKEN" wortgleich |
| 4379 saggid | TUNICO `saggid` wortgleich, identische Schreibung |
| 4382 qalla | TUNICO `qalla` „anbraten" wortgleich |
| 4384 dawwish | TUNICO `dawwiš` wortgleich, identische Schreibung |
| 4392 3abba | TUNICO+PC „füllen/laden" wortgleich |
| 4414 qaddar | TUNICO `qaddar` wortgleich, identische Schreibung |

### Der Gegenrichtungs-Fund bei 783 vs. 2153

Beide waren durch die vorigen Runden auf denselben Stand gebracht — `darija` korrigiert, `arabic_script`
unvokalisiert. Vor dem Schreiben `_arabic_to_chatalpha()` auf beide mit probeweiser Schadda angewandt:

| id | mit Schadda | abgeleitet | darija | Ergebnis |
|---|---|---|---|---|
| 2153 | أيّام | `ayyam` | ayyam | **identisch** — Schadda sicher |
| 783 | الزّكاة | `ez-zka` | ez-zaka | **weicht ab** — fehlende Fatha zwischen ز/ك, mehr als nur Schadda |

Gleiche Vorgeschichte, unterschiedliches Ergebnis — 2153 bekam die Schadda, 783 bleibt bewusst
unvokalisiert stehen. Ohne die probeweise Ableitung wäre das nicht sichtbar gewesen.

### Zweiter Codepoint-Fehler in dieser Serie, diesmal vor dem Schreiben gefangen

Der generierte SQL-Text für `660 qoddam` zeigte `قداّم` statt `قدّام` — die Schadda saß auf dem Alif
(Index 2 im Buchstaben-Array) statt auf د (Index 1), ein Tippfehler im Ausgangstupel. Der bisherige
Codepoint-Check aus Runde 51 prüfte nur „genau eine Schadda eingefügt, nichts entfernt" — nicht „auf
einem gültigen Buchstaben". Ergänzt: Abgleich der tatsächlichen Schadda-Position gegen den erwarteten
Buchstaben, für alle 20 Zeilen, **vor** dem Schreiben. Nur diese eine Zeile war betroffen, korrigiert
und erneut durch die volle Prüfkette (Codepoint, 23 Regeln, Kollision) geschickt, bevor geschrieben
wurde. **Zweites Mal in dieser Serie, dass ein Kombinationszeichen falsch saß — beide Male vor dem
Schreiben gefangen, nicht danach.**

### Zurückgestellt, mit Begründung

| id | Grund |
|---|---|
| 783 ez-zaka | Ableitung passt nicht (s.o.) — braucht eine echte Fatha, kein Schadda-Fall |
| 612, 625, 893, 1858 | kein Treffer in keiner der drei Quellen |
| 4331 3izza | TUNICO-Treffer ist ein falscher Freund (anderes Wort: „altersschwache Greisin"/„kondolieren") |
| 4365 khassatan | TUNICO/PC bestätigen `khaSSatan`, aber `arabic_script` خصوصا ist ein anderes Wortmuster (`khusuusan`) — braucht eine Korrektur, keine Schadda |

### Gegenprobe

| | vorher | jetzt |
|---|---|---|
| Check 22 unvokalisierte Einzelwörter | 381 | **361** |
| Check 24 Gemination | 0 | **0** |
| Check 25 Konsonanten-Widerspruch | 0 | **0** |
| Trainer 🔤 Transliteration | 0 | **0** von 3.775, 23 Regeln |
| Trainer 🔁 Duplikate | 0 | **0** von 3.775 |
| Gruppe A (18 Checks) | alle 0 | **alle 0** |

Rechnerisch stimmig: 381 − 20 = 361.

---

## Runde 53 — 4365 geklärt, dabei die eigene Ablehnung von 783 aus Runde 49 korrigiert

Vorschlag aus Runde 52 aufgegriffen: `4365 khassatan` einzeln klären.

### 4365: das falsche Wort, nicht nur unvokalisiert

`arabic_script` خصوصا ist `khusuusan` (Standard-MSA „insbesondere" über das Muster خصوص+تنوين). TUNICO
(`xāṣṣatan`) und Peace Corps (`xa:SSatan`, 2×) belegen aber unabhängig `khaSSatan` = خاصّةً — Wurzel
خ-ص-ص, anderes Muster (خاصة+تنوين). Zwei verschiedene, verwandte Wörter mit gleicher Bedeutung, aber
unser `arabic_script` war das falsche für diese Zeile. Korrigiert: خصوصا → **خاصة**.

Bewusst **ohne** Schadda: `_arabic_to_chatalpha()` leitet Tanwin auf einer Ta-marbuta durchgehend als
`-aan` ab, nicht als `-atan` (getestet: خاصّة → `khassa`, خاصّةً → `khassaan` — beides nicht `khassatan`).
Das ist eine Lücke der Ableitungsfunktion selbst (die besondere Lautregel „فتحتان auf ة klingt -tan"
ist nicht implementiert), keine falsche Angabe in unseren Daten. Mit Schadda wäre die Zeile fälschlich
in Check 25 gelandet. Bleibt unvokalisiert, aber jetzt mit dem richtigen Wort — Check 22 zählt sie
weiterhin, zu Recht.

### Dabei gefunden: die Ablehnung von 783 in Runde 49 war zu streng

Beim Nachrechnen für 4365 zum ersten Mal die *exakte* CASE-Logik aus `chatalpha_konflikte` nachgebaut,
statt wie in Runde 49 nur `abgeleitet` und `darija` als rohe Strings zu vergleichen. Auf 783 angewandt:

| Vergleich | Ergebnis |
|---|---|
| Rohe Strings (Runde 49): `ez-zka` vs `ez-zaka` | verschieden → „würde Check 25 auslösen" |
| Echte Logik: `_translit_skeleton('ez-zaka')` vs `_translit_skeleton('ez-zka')` | **beide `zzk`, identisch** → Klasse `vokale`, von Check 24/25 gar nicht gezählt |

Der rohe String-Vergleich war zu streng — er ignorierte, dass die View selbst über einen Vokal-
Skelett-Vergleich läuft, der genau diese Art Unterschied (fehlende interne Fatha) toleriert. **783
bekommt die Schadda doch**: الزكاة → **الزّكاة**. Eine frühere eigene Schlussfolgerung war falsch und
wird hier korrigiert, nicht nur eine neue Zeile hinzugefügt.

### Gegenprobe

| | vorher | jetzt |
|---|---|---|
| Check 22 unvokalisierte Einzelwörter | 361 | **360** (nur 783 vokalisiert, 4365 bleibt unvokalisiert) |
| Check 24/25 | 0 | **0** |
| Trainer 🔤 Transliteration | 0 | **0** von 3.775, 23 Regeln |
| Trainer 🔁 Duplikate | 0 | **0** von 3.775 |
| Gruppe A (18 Checks) | alle 0 | **alle 0** |

Rechnerisch stimmig: 361 − 1 = 360.

**Lehre für PRECEDENTS.md:** eine Ablehnung braucht dieselbe Sorgfalt wie eine Zusage — „würde den Check
brechen" ist erst belastbar, wenn man die *tatsächliche* Vergleichslogik des Checks nachbildet, nicht
eine eigene Näherung davon.

---

## Runde 54 — Pilotrunde: 5 Zeilen voll vokalisiert, keine Schadda-Ergänzung

Erste Runde jenseits der Konsonanten-Verdopplung: die 344 Check-22-Zeilen ohne jede Gemination
brauchen volle Vokalisierung (Fatha/Kasra/Damma), nicht nur ein Diakritikum — dafür gibt es keinen
automatischen Gegencheck wie 24/25. Vorschlag: eine kleine Pilotrunde, um die Methodik zu erproben,
bevor über eine größere Kampagne entschieden wird. Nachgefragt: „Wie würdest du die Prüfung machen?
Mit dem Skill?" — `SKILL.md` hatte die Methodik bereits ausgearbeitet, nicht neu erfunden:

- **Lautlehre-Regel 3** (Schadda nie auf dem ersten Buchstaben, nie auf einem Alif) — genau der Fehler,
  der mir in Runde 50/52 zweimal passiert ist, hier zur expliziten Prüfregel gemacht.
- **`vocab_lookup.chatalpha`** — für alle drei Quellen vorberechnet in unserer Konvention, spart die
  Handumschrift von TUNICOs/Peace Corps' IPA-Notation.
- **Vokalzeichen-vor-Schadda-Reihenfolge** (803 von 819 Zeilen im Bestand) — hier nicht gebraucht, da
  keiner der 5 Kandidaten Gemination hat, aber für künftige Runden mit Schadda+Vokal auf demselben
  Buchstaben relevant.
- **Nie im Block, immer einzeln gegen die Quellen** — mit benannten Präzedenzfällen, wo ein Blockfix
  falsch gewesen wäre.

### Vor der Vokalisierung: zwei Kandidaten aussortiert, weil die Bedeutung nicht passte

Buchstaben-Skelett-Match reichte nicht. Bei der Kandidatensuche:

| id | Ninja-Beleg | Ninja-Bedeutung | unsere Bedeutung | Urteil |
|---|---|---|---|---|
| 4180 kasa | كَاسَةْ | „cashier, cash register" | „Waschlappen" | anderes Wort (deckt sich mit dem `2125 el-kasa`-Homonym aus Runde 46) |
| 1576 louza | لُوزَة | „almond tree, almond" | „Schwägerin" | vermutlich anderes Wort — nicht sicher genug, um Ninjas Vokalisierung zu übernehmen |

Zwei weitere zurückgestellt: `569 banka`/`4400 fadlik` — Ninja/Peace Corps zeigen zusätzliche Alif-
Buchstaben, die unser `arabic_script` nicht hat; das braucht vermutlich eine Buchstaben-, nicht nur
eine Vokalkorrektur. `547 sma3` ist der bekannte Maß-II-Fall aus Runde 46.

### Die 5 geschriebenen Zeilen

| id | darija | alt | neu | Beleg |
|---|---|---|---|---|
| 608 | dars | درس | دَرْسْ | Ninja دَرْسْ, exakt, „lesson" wortgleich |
| 4419 | wzin | وزن | وْزِنْ | Ninja وْزِنْ, exakt, „to weigh" wortgleich |
| 4421 | 7raq | حرق | حْرَقْ | Ninja حْرَقْ, exakt, „to burn" wortgleich |
| 616 | kbir | كبير | كْبِيرْ | Peace Corps `kbir/kbira/kbar` „BIG/LARGE"; reguläres فعيل-Muster ohne Anfangsvokal |
| 590 | khfif | خفيف | خْفِيفْ | TUNICO `xfīf`, PC `xfi:f` „AGILE" (Wurzel/Bedeutungsfeld leicht/wendig); reguläres فعيل-Muster |

Bei allen 5: `_arabic_to_chatalpha()` reproduziert die `darija` **exakt** (nicht nur im Skelett-Sinn),
vor dem Schreiben gegen alle 23 Regeln getestet (0 Verstöße) und auf Kollision geprüft (keine).

### Gegenprobe

| | vorher | jetzt |
|---|---|---|
| Check 22 unvokalisierte Einzelwörter | 360 | **355** |
| Check 24/25 | 0 | **0** |
| Trainer 🔤 Transliteration | 0 | **0** von 3.775, 23 Regeln |
| Trainer 🔁 Duplikate | 0 | **0** von 3.775 |
| Gruppe A (18 Checks) | alle 0 | **alle 0** |

Rechnerisch stimmig: 360 − 5 = 355.

**Fazit der Pilotrunde:** von 5 anfänglich buchstaben-passenden Kandidaten waren am Ende nur 5 von
ursprünglich ~10 geprüften wirklich sauber — der Rest schied wegen Bedeutungsabweichung oder fehlenden
Buchstaben aus. Die Methodik trägt, ist aber pro Zeile deutlich aufwendiger als die Schadda-Runden:
kein automatischer Gegencheck für falsche Vokale, nur für Gemination/Konsonanten. Eine größere Kampagne
bräuchte entsprechend mehr Zeit pro Zeile, nicht mehr Zeilen pro Runde.

---

## Runde 55 — Audio-verknüpfte Zeilen als Quelle, 7 geschrieben

Vorschlag: Zeilen, die schon `ninja_audio_url` tragen, zuerst prüfen — die Audio-Verknüpfung ist eine
stärkere Bestätigung als ein bloßer Buchstaben-Treffer, weil jemand bestätigt hat, dass genau diese
Ninja-Aufnahme zu genau dieser Zeile gehört.

### Die Prämisse stimmt nur mit Einschränkung

95 der 339 unvokalisierten Einzelwörter ohne Verdopplung haben `ninja_audio_url`, aber keinen
`ninja_id`. Über `audio_url`-Match gegen `derja_ninja_entries` aufgelöst:

| | |
|---|---|
| Audio-verknüpfte Zeilen | 95 |
| davon Skelett stimmt mit Ninja überein | 68 |
| davon Skelett weicht komplett ab | **27** |

Die 27 sind ein eigener Befund: das Audio scheint dort schlicht falsch zugeordnet (`898 aqsem`
„Klassen" verlinkt auf Ninjas „nas hay" = „Leute von hohem Rang", `900 tabloet` „Tafeln" auf „madri" =
„große, dicke Baubretter"). Nicht in dieser Runde behoben.

Von den 68 skelett-gleichen: **`4180 kasa` taucht wieder auf** — Audio verknüpft, Skelett gleich, aber
Ninja meint weiterhin „Kasse", nicht „Waschlappen". **Die Audio-Verknüpfung schützt nicht vor dem
Homonym-Fallstrick**, sie verengt nur die Kandidatenmenge.

### Von 68 auf 14, dann auf 7 — Silbenstruktur ist der entscheidende Filter

Nach Ausschluss unvokalisierter Ninja-Quellen und exaktem Buchstabenabgleich: 37 Kandidaten. Manuelle
Bedeutungsprüfung fand darin drei bereits bekannte Fallstriktypen erneut, plus einen neuen:

- **Maß-I/Maß-II** (Skill-Regel 5): `643 lbis`→لَبِّسْ „ankleiden" (Form II), `644 l3ab`→لّعَبْ (Form II
  — **und** die Schadda sitzt auf dem ersten Buchstaben, was Lautlehre-Regel 3 automatisch als
  Warnsignal markiert), `1697 tkun`→تْكَوِّنْ „sich bilden" (Form V) statt Kopula „sein".
- **Anderes Wort**: `960 kbar`→كَبَّارْ „Capers" (!), `1405 bye`→„Bey" (Titel), `1521 wled`→وَالِدْ
  „Vater" (nicht „Söhne"), `1199 njib`→„Najib" (Männername).
- **Neu — Gemination fehlt schon in unserer `darija`**: `356 khadhar` (Ninja `khadhdhar`), `651 dla3`
  (Ninja `dilla3`), `1825 mba3d` (Ninja `maba33ad`), **`1526 okhwa`** (Ninja `akhowwa`) — vier Fälle, bei
  denen nicht das Arabische, sondern die `darija` selbst die Verdopplung nicht zeigt. Braucht eine
  `darija`-Entscheidung, keine Vokalisierung.
- **Wortart-Verdacht**: `1777 feragh` „leer (m.)" (Adjektiv) vs. Arabisch فراغ (Nomen „Leere"; das
  Adjektiv wäre فارغ).

14 kamen durch diesen Filter. Direkter Test gegen `_arabic_to_chatalpha()` zeigte: nur **1 von 14** war
exakt identisch zur `darija` (`547 sma3`). Die anderen 13 unterschieden sich — aber nicht alle gleich
schwer: **Vokalqualität** (Skill: „nie für sich genommen ein Befund") gegen **Silbenstruktur**
(„fehlende Silbe" — ein echter Befund) sind zwei verschiedene Dinge:

| id | Ninja | Unterschied zur `darija` | Einordnung |
|---|---|---|---|
| 502 fransawi | fransawy | nur y/i-Konvention | Vokalqualität → sicher |
| 566 shera3 | shari3 | e/i | Vokalqualität → sicher |
| 606 maktab | maktib | a/i | Vokalqualität → sicher |
| 669 jd | jad | `darija` ist Kurzschreibung ohne Vokalbuchstaben | kein Strukturunterschied → sicher |
| 1028 dakhel | dakhil | e/i | Vokalqualität → sicher |
| 4406 wafaq | wafiq | a/i | Vokalqualität → sicher |
| 325 hrisa | **harisa** | Ninja hat eine zusätzliche Anfangssilbe | Struktur → zurückgestellt (TUNICO bestätigt unsere) |
| 569 banka | **bank** | Ninja fehlt die Endsilbe | Struktur → zurückgestellt (TUNICO/PC bestätigen unsere) |
| 802 el-batala | btala | unsere `darija` trägt den Artikel, Ninja nicht | Struktur → zurückgestellt |
| 1266 ithniya | thniyya | unsere `darija` hat eine Anfangssilbe „i-", Ninja und unser eigenes `arabic_script` nicht | Struktur → zurückgestellt |
| 4333 qadhya | qdhya | Ninjas ق trägt **kein** Harakat — die Quelle selbst ist unvollständig vokalisiert (Lautlehre-Regel 4) | Quelle unvollständig → zurückgestellt |
| 1819 mitghashesh | mitghashshish | Skelett weicht ab, Wurzelbildung unklar | zurückgestellt |

### Die 7 geschriebenen Zeilen

| id | darija | alt | neu |
|---|---|---|---|
| 547 | sma3 | سمع | سْمَعْ |
| 502 | fransawi | فرنساوي | فْرَنْسَاوي |
| 566 | shera3 | شارع | شَارِعْ |
| 606 | maktab | مكتب | مَكْتِبْ |
| 669 | jd | جد | جَدْ |
| 1028 | dakhel | داخل | دَاخِلْ |
| 4406 | wafaq | وافق | وَافِقْ |

Vor dem Schreiben gegen alle 23 Regeln getestet (0 Verstöße), auf Kollision geprüft (keine), auf
ungültige Schadda-Platzierung geprüft (nicht zutreffend, keine Gemination in diesem Satz).

### Gegenprobe

| | vorher | jetzt |
|---|---|---|
| Check 22 unvokalisierte Einzelwörter | 355 | **348** |
| Check 24/25 | 0 | **0** |
| Trainer 🔤 Transliteration | 0 | **0** von 3.775, 23 Regeln |
| Trainer 🔁 Duplikate | 0 | **0** von 3.775 |
| Gruppe A (18 Checks) | alle 0 | **alle 0** |

Rechnerisch stimmig: 355 − 7 = 348.

**Fazit:** die Audio-Verknüpfung ist ein guter Vorfilter (grenzt 424 auf 95, dann 68 ein), ersetzt aber
nicht die Einzelprüfung — weder gegen Homonyme (kasa) noch gegen Struktur-Unterschiede. Von 95
audio-verknüpften Zeilen kamen am Ende 7 sauber durch plus 6 zurückgestellte mit klar benanntem Grund,
plus der Nebenbefund der 27 falsch verlinkten Audios.

---

## Runde 56 — die 27 skelett-fremden Audio-Verknüpfungen vollständig durchgesehen

Nachfrage: „dann können die auch gleich komplett geprüft werden" — alle 27 mit Beispielsatz aus
`derja_ninja_entries` durchgesehen, nicht nur die Stichprobe aus Runde 55.

### Die Kategorien

| Kategorie | Zeilen | Befund |
|---|---|---|
| A — legitime Wiederverwendung (Singular-Audio für Plural-Eintrag, gleiche Wurzel) | 9: 895, 1134, 1135, 1143, 1158, 1179, 2118, 2120, 2156 | Nicht falsch, nur nicht formgleich. Kandidaten für eine spätere Vokalisierungsrunde über die Geschwisterform. |
| B — Audio ist ein ganzer Satz, Wort kommt nur darin vor | 2: 633, 2147 | `633 7kok` „Dosen" → Audio „Bierdosen" |
| C — Synonym statt desselben Worts | 2: 900, 1078 | `1078 mqafil` „geschlossen" → Audio `مْسَكِّرْ` (andere Wurzel) |
| D — wirklich falsch, unzusammenhängend | 7: 898, 960, 1144, 1181, 1185, 2145, 2168 | Wort kommt nur im Beispielsatz der falschen Quelle vor, oder reine Verwechslung (`898 aqsem` „Klassen" ↔ engl. „high class") |
| E — Maß-I/Maß-II (schon bekannt) | 2: 643, 644 | |
| F — Artikel/Gemination in der `darija` (schon bekannt + 1 neu) | 4: 356, 651, 1825, 4343 | `4343 b-zarba` ist derselbe Artikelassimilations-Fall wie Runde 47 (`bi-z-zirba`, unsere `darija` ohne Artikel) |
| G — Bedeutung passt, nur Notationskonvention | 1: 1819 | Ninja schreibt „ch" für ش, wir „sh" |

### Geschrieben: 11 `ninja_audio_url` auf NULL (Kategorien B, C, D)

Diese 11 spielen beim Lernen ein anderes Wort oder einen ganzen Satz statt des gesuchten Worts ab —
das führt aktiv in die Irre, nicht nur „nicht optimal":

| id | darija | Audio zeigte auf |
|---|---|---|
| 898 | aqsem | „Leute von hohem Rang" (Verwechslung über engl. „class") |
| 960 | kbar | „Capers" |
| 1144 | nthaf | Verb „reinigen" statt Adjektiv „sauber" |
| 1181 | fet7in | „Neonröhre" |
| 1185 | timshi | Nomen „Vorgehen/Prozess" statt Verbform „du gehst" |
| 2145 | bagrat | „Schlachthof" (Wort kam nur im Beispielsatz vor) |
| 2168 | jupet | Idiom „jemandes Aufmerksamkeit erregen" (Wort kam nur im Beispielsatz vor) |
| 633 | 7kok | ganzer Satz „Bierdosen" |
| 2147 | 3athmet | ganzer Satz „er hat starke Knochen" |
| 900 | tabloet | Synonym „madri" |
| 1078 | mqafil | Synonym „msakkir" |

Kategorie A (9 Zeilen) bewusst unverändert gelassen — die Wiederverwendung ist vertretbar.
Kategorien E/F bleiben die schon dokumentierten offenen Einzelfälle, G ist kein Handlungsbedarf.

### Gegenprobe

Nur `ninja_audio_url` geändert, weder `arabic_script` noch `darija` berührt — Gruppe A (18 Checks)
weiterhin alle 0, wie erwartet. Kein Effekt auf Check 22/24/25 oder die Trainer-eigenen Checks.

---

## Runde 57 — die 9 Kategorie-A-Zeilen als Vokalisierungsquelle, 4 geschrieben

Vorschlag: die 9 Zeilen mit legitimer Singular-Audio-Wiederverwendung (Runde 56, Kategorie A) für die
Vokalisierung nutzen — Wort und Bedeutung sind dort schon zweifelsfrei geklärt, nur die Pluralform
fehlt als eigene Aufnahme.

### Skelett-Abgleich fand zwei weitere fehlende Buchstaben im schon gespeicherten `arabic_script`

Vor dem Vokalisieren geprüft, ob der Plural-Wortstamm wirklich zum Ninja-Singular passt (Singular-
Skelett + Pluralendungs-Konsonant sollte das Plural-Skelett ergeben):

- **`2118 m3abyin`** „voll (Pl.)": unser Skelett `m3bn`, erwartet `m3bbn` (Ninja-Singular `مْعَبِّي` hat
  geminiertes ب, von TUNICO/PC unabhängig bestätigt). Dem **gespeicherten** `arabic_script` معبيين fehlt
  die zweite ب-Gemination — kein Vokalisierungsfall, sondern eine fehlende Schadda im Bestand.
- **`1143 mqat3in`** „zerrissen (Pl.)": beim Bauen fiel auf, dass mein Entwurf ein و enthielt, das im
  **gespeicherten** `arabic_script` مقطعين gar nicht steht. Die Skelett-Prüfung hatte das verdeckt, weil
  `_arabic_skeleton()` و als Vokalträger herausfiltert — ein Fehler, der vor dem Schreiben auffiel, nicht
  danach.

Beide sind jetzt offene „fehlender Buchstabe"-Fälle, keine Vokalisierungskandidaten mehr.

### Weitere drei zurückgestellt

- **`895 styloet`**, **`1158 shortoet`** — Ninjas eigene Einträge (`سْتيلُو`, `شورت`) sind selbst nicht
  vollständig vokalisiert (Konsonanten ohne jedes Harakat, Lautlehre-Regel 4) bzw. ganz unvokalisiert.
  Keine verlässliche Vorlage.
- **`1134 dhayqin`** — einzige Quelle ist die feminine Form `ضَيّْقَةْ`, Geminationsposition/-lesung nicht
  eindeutig auf den maskulinen Plural übertragbar.

### Die 4 geschriebenen Zeilen

| id | darija | bisher | vorgeschlagen | Beleg |
|---|---|---|---|---|
| 1135 | wes3in | واسعين | وَاسْعِينْ | Ninja وَاسْع (Singular, Audio-verknüpft) + reguläre Pluralendung ـين |
| 1179 | ghamqin | غامقين | غَامِقِينْ | Ninja غَامِقْ (Singular, Audio-verknüpft) + reguläre Pluralendung ـين |
| 2120 | ferghin | فارغين | فَارْغِينْ | Ninja فَارْغ (Singular, Audio-verknüpft) + reguläre Pluralendung ـين |
| 2156 | bakoet | باكوات | بَاكُوَاتْ | Ninja بَاكُو (Singular, Audio-verknüpft) + reguläre Pluralendung ـات |

Bei allen 4: `_translit_skeleton()` von `darija` und Ableitung identisch (nur Vokalqualität weicht ab,
kein Befund laut Skill-Konsequenz 1), vor dem Schreiben gegen alle 23 Regeln getestet (0 Verstöße),
auf Kollision geprüft (keine), Buchstaben-für-Buchstaben gegen den gespeicherten Wert abgeglichen
(Lehre aus dem `1143`-Fehler).

### Gegenprobe

| | vorher | jetzt |
|---|---|---|
| Check 22 unvokalisierte Einzelwörter | 348 | **344** |
| Check 24/25 | 0 | **0** |
| Trainer 🔤 Transliteration | 0 | **0** von 3.775, 23 Regeln |
| Trainer 🔁 Duplikate | 0 | **0** von 3.775 |
| Gruppe A (18 Checks) | alle 0 | **alle 0** |

Rechnerisch stimmig: 348 − 4 = 344.

---

## Runde 58 — die beiden fehlenden Buchstaben aus Runde 57 behoben

### 2118 m3abyin → m3abbyin — die Gemination des Singulars nie nachgezogen

`1776 m3abbi` „voll (m.)" wurde in Runde 55 korrigiert (`darija` trägt seither `m3abbi` mit
Doppel-b, TUNICO/PC bestätigt). Der Plural `2118` blieb bei `m3abyin` — die Korrektur hatte den
Plural nie erreicht. `darija` und `arabic_script` zusammen korrigiert, wie beim Singular:

| id | darija alt → neu | arabic_script alt → neu |
|---|---|---|
| 2118 | m3abyin → **m3abbyin** | معبيين → **معبّيين** |

### 1143 mqat3in — dem `arabic_script` fehlte ein و

`735 maktou3` „gebrochen" (dieselbe Wurzel ق-ط-ع, Muster مفعول) bestätigt: die Form braucht ein و.
`darija` unverändert gelassen (`mqat3in` ohne ausgeschriebenes „ou" ist dieselbe Art Kurzschreibung
wie `669 jd` für `jad` — kein Befund für sich), nur `arabic_script` ergänzt:

| id | arabic_script alt → neu |
|---|---|
| 1143 | مقطعين → **مقطوعين** |

Bleibt unvokalisiert (keine Harakat ergänzt, nur der fehlende Buchstabe) — zu Recht weiter in Check 22.

Beide vor dem Schreiben gegen alle 23 Regeln getestet (0 Verstöße), auf Kollision geprüft (keine).

### Gegenprobe

| | vorher | jetzt |
|---|---|---|
| Check 22 unvokalisierte Einzelwörter | 344 | **343** (nur 2118 vokalisiert, 1143 bleibt unvokalisiert) |
| Check 24/25 | 0 | **0** |
| Trainer 🔤 Transliteration | 0 | **0** von 3.775, 23 Regeln |
| Trainer 🔁 Duplikate | 0 | **0** von 3.775 |
| Gruppe A (18 Checks) | alle 0 | **alle 0** |

Rechnerisch stimmig: 344 − 1 = 343.

Damit ist der gesamte Audio-Untersuchungsstrang (Runden 55–58) abgeschlossen. Offen bleiben:
6 Vokalisierungs-Kandidaten mit Strukturunterschied, 4 `darija`-Geminationsfälle, 2 Maß-I/Maß-II-Fälle
— alle einzeln benannt in Runde 55/56.

---

## Runde 59 — Audit der Sonnet-Runden + die Slash-Lücke

### Audit der Runden 50–58

Auf Nachfrage geprüft, ob die mit Sonnet gefahrenen Runden korrekt waren. Alle ~75 geschriebenen
Zeilen sind vorhanden und wertgleich; die 30 Maß-II/V-Geminationen aus Runde 51 tragen die Schadda
durchweg auf dem mittleren Radikal; korpusweit 0 Schadda auf ا; Check 24/25 bei 0; Gruppe A alle 0.

Zwei eigene Verdachtsmomente im Audit getestet und **verworfen**: „Langvokal vor Schadda ist
ungültig" (falsch — يّ/وّ sind geminierte Konsonanten, خاصّة/مادّة legitim) und „Ninjas Vokale zu
übernehmen ist ein neues Problem" (falsch — Klasse `vokale` hat korpusweit 1.008 Zeilen und wird
bewusst nicht gezählt).

**Ein echter Fehler: `894 qlammet`.** Gespeichert war قلامّات:

```
0642=ق 0644=ل 0627=ا 0645=م 0651=ّ 0627=ا 062a=ت
```

Eine **Mischform aus TUNICOs zwei belegten Pluralen**: das ا nach dem ل stammt aus `qlām`
(قلام, Langvokal, keine Gemination), die Schadda aus `qlammāt` (kurzes a, geminiertes م). Die
Hybridform `qlāmmāt` ist in keiner Quelle belegt. `_arabic_to_chatalpha` verschluckt den Unterschied
(liefert `qlammat`), deshalb hat die Prüfkette nicht angeschlagen.

Auslöser war die Antwort auf „beide Varianten in einem Eintrag": die `darija` bekam beide Formen,
das `arabic_script` aber nicht — dort wurden die beiden Formen ineinandergeschoben statt
nebeneinandergestellt. Der Korpus hat dafür eine klare Konvention: **16 Zeilen führen den Slash
auch im `arabic_script`** (`2022 a7san / khir` → أَحْسَن / خِير). `894` war die einzige Ausnahme.

| id | Feld | alt | neu |
|---|---|---|---|
| 894 | `arabic_script` | قلامّات | **قْلَام / قْلَمَّات** |
| 894 | `darija` | qlam/qlammet | **qlam / qlammet** (Leerzeichen wie bei allen anderen Slash-Zeilen) |

Codepoints nach dem Schreiben: `0642 0652 0644 064e 0627 0645 | 0020 002f 0020 | 0642 0652 0644 064e 0645 064e 0651 0627 062a`
— Schadda auf dem **م**, Vokalzeichen **vor** der Schadda (Hauskonvention), nie auf ا.
Ableitung `qlam / qlammat`, Skelett beidseitig `qlmqlmmt`.

### Die Slash-Lücke

Nebenbefund aus dem Audit: **der Slash nimmt eine Zeile komplett aus `chatalpha_konflikte`**
(die View filtert `darija !~ '/'`). Korpusweit 26 Zeilen, 21 davon vokalisiert — bis dahin gar nicht
gegen ihre Ableitung geprüft. Diese 21 einzeln durchgesehen: **13 skelettgleich, 8 abweichend.**

**Zwei Abweichungen sind Messartefakte, keine Fehler** (`477 محطة`, `1495 يتفرج`): beide zweiten
Varianten sind unvokalisiert, und unvokalisiertes Arabisch schreibt einen geminierten Konsonanten
einfach — die Schadda ist ein weggelassenes Diakritikum, kein fehlender Buchstabe. Der
Skelett-Vergleich kann eine Schadda nicht sehen, die nicht geschrieben ist. **Vier weitere** sind
legitime Struktur-Asymmetrien (`1406 ciao` Originalschreibung des Lehnworts, `1425`/`1427` Klammer
statt Slash, `1492`/`1494` optionales `w`).

**Befund 1 — `1174` enthielt ein fremdes Wort.**

| Quelle | Form | Wortart | Bedeutung |
|---|---|---|---|
| TUNICO 5025 | `lābis` | activeParticiple | tragend (Kleidung) = unsere Zeile |
| Ninja 16540 | لَابِسْ `labis` | (ADJ) | wearing |
| TUNICO 2067 | `lbis` | **verb** | sich anziehen |

`lbes` war nicht die zweite Aussprache des Partizips, sondern das **Verb** — das längst eine eigene
Zeile hat (`643 lbis` لبس „er zog sich an"). Dieselbe Fehlerklasse wie der offene Fall `1777 feragh`.

**Befund 2 — `1457` unterschlug den assimilierten Artikel.** صَحَّة / بِالشِّفا, Codepoints
`0628 0650 0627 0644 0634 0650 0651 0641 0627` — die Schadda auf ش ist die
Sonnenbuchstaben-Assimilation von ال. Der Hausstil schreibt die immer aus (`es-salaf`, `esh-shta`,
`ez-zaka`, `715 bit et-toum` → بيت التّوم). `bishfa` mit einzelnem `sh` widersprach der eigenen
Vokalisierung.

| id | Feld | alt | neu |
|---|---|---|---|
| 1174 | `darija` | labes / lbes | **labes** |
| 1457 | `darija` | sa77a / bishfa | **sa77a / bish-shfa** |
| 252 | `homonym_ok` | false | **true** |
| 1174 | `homonym_ok` | false | **true** |

Die letzten beiden Zeilen sind die **Folge** des ersten Fixes und zeigen genau, was der Slash
verdeckt hat: `1174` wird ohne `lbes` zu schlichtem `labes` und kollidiert dann mit `252 labes`
(لْبَاس „Gut / Wie geht's?"). Zwei verschiedene Wörter, gleiche Umschrift — ein echtes Homonym-Paar,
das nur deshalb unauffällig war, weil der Slash den Duplikat-Schlüssel auf `labeslbes` verschob.
Dry-Run vorab: ohne `homonym_ok` 1 neues Duplikat, mit `homonym_ok` auf beiden 0.

### Gegenprobe

| | vorher | jetzt |
|---|---|---|
| Check 22 unvokalisierte Einzelwörter | 343 | **343** (keine Vokalisierung angefasst) |
| Check 23 offene Ninja-Kandidaten | 24 | **24** |
| Check 24/25 | 0 | **0** |
| Trainer 🔤 Transliteration | 0 | **0** von 3.775, 23 Regeln |
| Trainer 🔁 Duplikate | 0 | **0** von 3.775 |
| Gruppe A (18 Checks) | alle 0 | **alle 0** |

Offen bleiben unverändert: 6 Vokalisierungs-Kandidaten mit Strukturunterschied, 4
`darija`-Geminationsfälle, 2 Maß-I/Maß-II-Fälle (`643`/`644`), 4 Zeilen ohne Quellentreffer,
`4331 3izza`, `1777 feragh`.

---

## Runde 60–62 — selbstständiger Block, 30 Änderungen

Ab hier auf Nils' Anweisung ohne Einzelbestätigung geschrieben („Bisher hat immer alles gepasst.
Arbeite weiter und schreib auch. Mach dreißig und dann zeig mir eine Liste"). Prüftiefe unverändert:
Quellenabgleich, Codepoint-Kontrolle, Dry-Run gegen die 23 Transliterationsregeln und den
Duplikat-Check vor jedem Schreiben. Neue Vokabeln weiterhin nicht ungefragt angelegt.

### Runde 60 — die beiden Maß-I/Maß-II-Fälle (erledigt, keine Fehler)

| Quelle | `643 lbis` | `644 l3ab` |
|---|---|---|
| TUNICO | 2067 `lbis` **verb Maß I** „sich anziehen" (Maß II wäre 5709 `labbis` „j-n anziehen") | 2158 `lʕab` **verb Maß I** „spielen" |
| Peace Corps | 4934 `WEAR (to)` / 1543 `DRESS (to)`: `{ilbis, lbis}`, Rollen imperativ/**perfekt** | 3494 `PLAY (to)`: `{al3ib, l3ab}`, Rollen imperativ/**perfekt** |

Beide `darija`-Werte waren korrekt; unser Deutsch „er zog **sich** an" ist die reflexive Maß-I-
Bedeutung, nicht die kausative. Da die Formen damit belegt sind, beide vokalisiert nach dem
Hausstil für dreikonsonantige Perfektverben in Lektion 47 (9 von 12 so: Konsonant+Sukun,
Mittelkonsonant+Vokal, Konsonant+Sukun — `541 rkib` رْكِبْ, `546 q3ad` قْعَدْ):
`643` لبس → **لْبِسْ**, `644` لعب → **لْعَبْ**. Offener Punkt „2 Maß-I/Maß-II-Fälle" ist damit erledigt.

### Runde 61 — `1777 feragh`, dritte Alif-Verschiebung

| | Buchstabenfolge | Lesart |
|---|---|---|
| vorher | ف ر **ا** غ | `farāgh` — Nomen „Leere" |
| nachher | ف **ا** ر غ | `fāregh` — Partizip „leer" |

TUNICO kennt unter der Wurzel ف-ر-غ kein Nomen: 2391 `fāriġ` **activeParticiple** „leer",
1062 `fraġ` verb „leer werden", 2616 `faṛṛaġ` verb „leeren". Ninja 5911 فَارْغ `fargh` (ADJ) „empty".
Gegenbeleg für den falschen Freund: Ninja 20179 فَارَغْ الصَّبْرْ „Ungeduld" — das Nomen gibt es,
es heißt nur „Leere", nicht „leer".

Stärkste Bestätigung war intern: **فَارْغ ist exakt der Stamm unseres eigenen Plurals `2120`**
(فَارْغِينْ), der Rest von `2120` nach diesen sechs Codepoints ist genau die Pluralendung
Kasra+ي+ن+Sukun. `darija` unverändert — `feragh` gegen `ferghin` ist reguläre tunesische Epenthese.

### Runde 62 — Check 23 vollständig abgearbeitet

Die View `vokalisierung_kandidaten` verlangt buchstabengleiches Ninja-Arabisch und genau eine
distinkte Ninja-Vokalisierung. **Wichtige Erkenntnis: sie ist nur bei der Vokalisierung eindeutig,
nicht beim Wort — 10 der 21 Kandidaten waren Homograph-Zufälle.** Alle 10 mit Begründung in
`internal_note` verworfen (die View schließt sie dadurch dauerhaft aus):

| id | Ninja-Treffer | warum verworfen |
|---|---|---|
| 891 | „to write" | Verb statt Nomen-Plural „Bücher" (كتب) |
| 1023 | صْغَيَّر | Diminutiv `sghayyar`, nicht صغير `sghir` |
| 1199 | نَجِيب | Eigenname Najib |
| 1405 | بَايْ | osmanischer Titel Bey, nicht das Lehnwort „bye" |
| 1697 | تْكَوِّن | Maß II „geformt werden", nicht تْكُون „sein" |
| 4385 | سَمَر | Eigenname Samar |
| 4401 | تَفَاهُم | Verbalnomen statt Verb |
| 4402 | كُبْر | Nomen „Hochmut" statt Verb |
| 4413 | تْقًابِلْ | **Tanwin statt Fatha im Quellwert** (Ableitung ergibt `tqanabil`) |
| 4448 | نْعِم | Verb „genießen", nicht نَعَمْ „ja" |

Neun übernommen (`325`, `529`, `569`, `684`, `1057`, `1183`, `1266`, `1526`, `1817`), einer mit
Zusatz: **`802`** bekam den Artikel, den die `darija` (`el-batala`) trägt — ohne ihn wäre
`البْطَالَة` gegen `bṭāla` als Check-25-Treffer aufgeschlagen (Skelett `lbtl` gegen `btl`).
Präzedenz dafür: `783 ez-zaka` الزّكاة.

**`1521` war ein echter Fund:** `والد` (wālid = *Vater*) stand dort, wo `ولاد` (wlād = *Söhne*)
hingehört — dieselbe Alif-Verschiebung wie `1777`, und Ninjas Treffer „father, dad" war genau der
Homograph, der es verraten hat. Der Korpus schreibt den Plural überall sonst `ولاد` (`1552`).
Ninja hat keinen ولاد-Eintrag, deshalb nur die Buchstabenkorrektur ohne Vokalisierung — die Zeile
bleibt zu Recht in Check 22.

**Geminationsfälle mit TUNICO-Lemmatreffer:** `356` `xaḏ̣ḏ̣āṛ` „Gemüse- und Obsthändler"
(intern bestätigt durch `358 7awwet` حَوَّاتْ, dasselbe Berufsmuster فعّال), `651` `dillāʕ`
„Wassermelonen", `893` `kuṛṛāsa` „Heft" (Singular `892` hatte die Schadda schon), `1819`
`mitġaššiš` „verärgert", `1134` (Singular `435 dhayyaq` und TUNICO 2071 `ḏ̣ayyiq` tragen die
Schadda, der Plural hatte sie nie bekommen). Bei `356` hätte die naheliegende `darija` `khaddhar`
einen Check-24-Treffer erzeugt: ein doppeltes ض wird in unserer Konvention zu `dhdh`, nicht `ddh` —
korrigiert zu `khadhdhar`, vor dem Schreiben nachgerechnet.

`1825 mba3d` und `4343 b-zarba` als **Nicht-Befunde** bestätigt (TUNICO 2809 `baʕd` „dann",
TUNICO 628 `zarba` „Schnelligkeit" — keine Gemination); `4343` nur vokalisiert. `4331 3izza`
bleibt unbelegt, Ergebnis in `internal_note` festgehalten, damit die Suche nicht wiederholt wird.

### Gegenprobe

| | vor dem Block | jetzt |
|---|---|---|
| Check 22 unvokalisierte Einzelwörter | 343 | **323** |
| Check 23 offene Ninja-Kandidaten | 24 | **0** |
| Check 24/25 | 0 / 0 | **0 / 0** |
| Gruppe A (18 Checks) | alle 0 | **alle 0** |
| Schadda auf ا korpusweit | 0 | **0** |
| Trainer 🔤 Transliteration | 0 | **0** von 3.775, 23 Regeln |
| Trainer 🔁 Duplikate | 0 | **1** — siehe unten |

### Offen, braucht Nils' Entscheidung

1. **Echte Dublette `1819`/`3897`.** Nach der Korrektur von `1819` sind beide Zeilen in Schrift und
   Umschrift identisch (مِتْغَشِّشْ / `mitghashshish`), die Bedeutung dieselbe („wütend / böse" vs.
   „verärgert / zornig"), die Lektionen verschieden (53 vs. 33). `3897` war die ganze Zeit die
   korrekt geschriebene Zwillingszeile; die falsche Schreibung von `1819` hat die Dublette verdeckt.
   Nicht gelöscht — destruktiv, hängt an Lernfortschritt, und die Freigabe galt Korrekturen.
2. **`1857`/`1858`/`1879` (`tlazz`-Cluster).** TUNICO 4339 `tlazz` „gezwungen sein/werden" hat
   **kein Alif**, unsere Zeilen (تلازيت, يتلاز) schon — vierte Alif-Verschiebung. Zusätzlich
   widersprechen sich unsere eigenen Zeilen: `1857 yetlaz` einfaches z, `1858 tlazzit` doppeltes.
   Drei Zeilen auf einmal, deshalb nicht im Alleingang geschrieben.
3. **`1130 dhayqa`** ضَيْقَة. Gehört ins Paradigma von `435 dhayyaq`/`1134 dhayyqin`, trägt aber
   Sukun statt Schadda. Nicht geändert, weil es eine **bereits bewusst vokalisierte** Zeile ist und
   die Regel „bereits korrekt vokalisierte Einträge nicht automatisch ändern" hier schwerer wiegt.
4. **`569 banka`** gegen Ninjas بَنْكْ `bank`: nur vokalisiert, `darija` nicht angefasst. Ob der
   Eintrag `banka` (ital. banca) oder `bank` heißen soll, ist eine Bestandsentscheidung.

---

## Runde 63 — 50 Vokalisierungen, und ein verworfener Ansatz

Check 23 war nach Runde 62 leer, die Ninja-Quelle also erschöpft (nur noch 3 mehrdeutige Fälle,
keiner davon über `chatalpha == darija` auflösbar). Für die restlichen 323 musste ein anderer Weg
her: Harakat auf die **vorhandenen** Buchstaben setzen und das Ergebnis durch
`_arabic_to_chatalpha` zurückrechnen lassen. Werkzeug dafür liegt jetzt in `tools/`.

### Der erste Ansatz war falsch — und die Validierung hat es gezeigt

Naheliegend war, als Ziel die eigene `darija` zu nehmen: dann ist die Vokalisierung nur noch das
Explizitmachen dessen, was wir ohnehin behaupten. Gegenprobe an den **2.461 bereits von Hand
vokalisierten** Einzelwortzeilen: nur 554 hätte der Solver identisch reproduziert. Die Abweichungen
zeigen den Denkfehler:

| id | Mensch | Solver mit `darija` als Ziel |
|---|---|---|
| 256 | قَلَم (`qalam`) | قْلَمْ (`qlam`) |
| 262 | أَرْبَعَة (`arba3a`) | أرْبْعَة (`arb3a`) |
| 267 | تِسْعَة (`tis3a`) | تْسْعَة (`ts3a`) |

**Unsere `darija` ist eine verkürzte Umschrift.** Sie lässt Vokale weg, die das Arabische braucht.
Wer die Vokalisierung auf sie zwingt, produziert systematisch falsches Arabisch — قْلَمْ statt قَلَم
für „Stift". Die `darija` darf die Vokalisierung nur **einschränken** (Konsonanten, Gemination),
nicht bestimmen. Ziel muss eine echte Vokalquelle sein: TUNICO oder Peace Corps.

Ein zweiter Fehler kam aus derselben Probe: die erste Fassung setzte ein **Sukun auf den
Langvokalträger** (نْسَىْ, مْرَاْ), was Lautlehre-Regel 3 verbietet. Ursache war ein Bonus für
„Sukun am Wortende" in der Bewertung, der nicht zwischen Konsonant und Vokalträger unterschied.

### Was dann funktioniert hat

Quelle liefert die Vokale, unsere Buchstaben schränken ein, und fünf Filter sortieren aus —
jeder einzelne hat echte Fehlpaarungen abgefangen:

| Filter | fängt ab |
|---|---|
| Skelett `darija` = Skelett Ableitung | würde sonst Check 24/25 aufreißen |
| **gleiche Vokalanzahl** | Wortform-Wechsel, die das Skelett nicht sieht: `shrit`→`shrita`, `7raqt`→`7arqat` (1. gegen 3. Person), `n3am`→`na3ma` |
| Bedeutungsabgleich TUNICO-Glosse gegen unser `german` | das vokalfreie Skelett zieht sonst `esh-shta` (Winter) auf `shushit` (grillen) |
| Lösbarkeit selbst | `fnejin` (Plural) gegen `finjan` (Singular) — aus unseren Buchstaben nicht erzeugbar, also kein Treffer |
| Rückrechnung durch die DB-Funktion, nicht nur den Port | letzte Instanz vor dem `UPDATE` |

Von 323 blieben 67 eindeutig lösbare Kandidaten, 50 davon geschrieben. Zwei bewusst ausgenommen:
`4423 skhun` (Präzedenzfall in SKILL.md, nicht im Block anfassen) und `1217 toq3od` (Vokalmuster
der Quelle weicht zu stark ab).

**Zwei Zeilen aus Runde 62 kommen dadurch zurück:** `1023 sghir` und `4385 smar` hatte ich wegen
Ninja verworfen (Diminutiv صْغَيَّر bzw. Eigenname سَمَر) — TUNICO liefert dort die richtige Form
(`sghir` „klein; jung", `smar` „braun werden"). Die Ninja-Ablehnung war korrekt, die Vokalisierung
kommt jetzt aus der besseren Quelle. `4401 tfahim` ebenso.

### Ein Fehler im eigenen Vorgehen

Die Kollisionsprobe lief nur gegen **unvokalisierte** Zeilen. Dadurch wurde `1522 bnet` „Töchter"
nach der Vokalisierung identisch mit `4111 bnat` „Mädchen (Pl.)" (beide بْنَاتْ, beide Lektion 35)
und riss Gruppe-A-Check 10 auf. بنات trägt im Tunesischen beide Bedeutungen — echtes Bedeutungspaar,
mit `homonym_ok` auf beiden aufgelöst. In `tools/README.md` als Pflichtfilter 6 festgehalten.

### Gegenprobe

| | vorher | jetzt |
|---|---|---|
| Check 22 unvokalisierte Einzelwörter | 323 | **273** |
| Check 23 | 0 | **0** |
| Check 24 / 25 | 0 / 0 | **0 / 0** |
| Gruppe A (18 Checks) | alle 0 | **alle 0** |
| Schadda auf ا korpusweit | 0 | **0** |
| Trainer 🔤 Transliteration | 0 | **0** von 3.775, 23 Regeln |
| Trainer 🔁 Duplikate | 1 | **1** (unverändert `1819`/`3897`, wartet auf Entscheidung) |

### Neu offen

- **`768 aallha`** — `arabic_script` ist korrupt: `االله` mit **doppeltem Alif**, `darija` „aallha".
  Richtig wäre الله / `allah` (TUNICO 1307). Zwei Felder an einem heiklen Wort, deshalb vorgelegt.
- **`1522 bnet` gegen `4111 bnat`** — dasselbe Wort, zwei Umschriften. Als Homonym markiert, aber
  die Umschrift-Uneinheitlichkeit bleibt eine Bestandsfrage.
- 17 weitere geprüfte Kandidaten liegen fertig vor (aus den 67).

---

## Runde 64 — die restlichen 17, erweiterte Quellen, und wo die Quellen aufhören

### Die 17 aus der Warteschlange

Alle aus Runde 63 vorbereitet und geprüft, diesmal **mit Pflichtfilter 6** (Kollisionsprobe gegen
bereits vokalisierte Zeilen), der in Runde 63 gefehlt hatte: `2145`, `2148`, `2450`, `2911`, `4180`,
`4328`, `4333`, `4385`, `4387`, `4395`, `4399`, `4400`, `4401`, `4403`, `4429`, `4439`, `4440`.
Alle 17 bestanden Rückrechnung, Buchstabengleichheit, Skelettgleichheit, Kollisionsprobe.
`4333 qadhya` „Einkauf" war ein offener Punkt aus früheren Runden.

### Quellen erweitert

Für die nächste Tranche drei neue Zugänge erschlossen:

1. **`tunico_import.inflected`** — die Flexionsformen mit Analysetag (`#n_pl`, `#n_dual`,
   `#v_pres_sg_p3`). Das war die wichtigste Lücke: unser Bestand ist voller Plurale und Duale, und
   TUNICOs *Lemma* ist immer der Singular. Deshalb scheiterte in Runde 63 `585 fnejin` an `finjan`
   und `1075 mgharif` an `mgharfa` — mit den Flexionsformen treffen jetzt beide korrekt
   (`fnajin` `#n_pl`, `mgharif` `#n_pl`).
2. **`derja_ninja_entries.chatalpha` als reine Vokalquelle**, auch wo die Buchstaben abweichen.
3. **Artikelbehandlung** — Zeilen mit `el-`/`esh-`/`ez-` in der `darija` trafen nie ein Quell-Lemma,
   weil das Skelett den Artikel mitzählt. Artikel abtrennen, gegen das Lemma suchen, Artikel wieder
   voranstellen: das holte `748 el-7imaya`, `775 el-baba`, `936 el qahwa`, `1479 el-lil` herein.

### Zwei Filterkorrekturen

**Der Vokalanzahl-Filter aus Runde 63 war zu scharf.** Er verlangte gleiche Silbenzahl in Quelle und
`darija` — und blockierte damit genau den Normalfall, den Runde 63 selbst entdeckt hatte: dass die
Quelle **mehr** Vokale hat als unsere verkürzte Umschrift (`qlam` gegen `qalam`). Jetzt differenziert
nach Wortart: bei **Verben** bleibt die Silbenzahl strikt (sonst schlüpft die 1./3.-Person-
Verwechslung `7raqt` → `7arqat` durch), bei allem anderen darf die Quelle voller sein.

**Neuer Filter: kein zusätzlicher Endvokal.** Die Lockerung ließ Quellformen durch, die auf einen
Vokal enden, den unser Wort nicht hat — der Solver hängte dann ein Fatha an den letzten Buchstaben,
ohne dass ein Vokalträger folgt: `ka3k`→`ka3ka`, `shbih`→`shbiha`, `sikritir`→`sikritira`,
`qrab`→`qaraba`. Alle vier sind andere Wortformen. Regel steht in `tools/README.md`.

### 22 geschrieben, 9 verworfen

Angenommen wurden fast ausschließlich Plurale und Duale mit passendem TUNICO-Analysetag
(`585`, `626`, `899`, `1074`, `1075`, `1150`, `1159`, `1561`, `1578`, `2110`, `2158`, `2163`,
`2353`, `4359`) plus die Artikelfälle und drei Einzelne (`388`, `612`, `843`, `1083`).

Verworfen und **mit Begründung in `internal_note` festgehalten**, damit keine spätere Runde sie
erneut vorschlägt:

| id | | warum |
|---|---|---|
| 4480 | kibrit „ich wurde älter" | Ninja 807 كبريت ist **„Sulfur"** |
| 1271 | nfiq „ich wache auf" | Ninja 393 ist „to drown, go down, die" |
| 1291 | feqit „sie wachte auf" | Ninja 5131 ist فقط „only" |
| 1576 | louza „Schwägerin" | Ninja 1107 ist „almond tree" |
| 1113 | billehi „bitte" | Ninja setzt Fatha, wo `bi-` ein Kasra verlangt |
| 1232 | talqa „du findest" | Ninja silbiert anders, Zuordnung unsicher |
| 518 | el-irb3a „Mittwoch" | ergäbe الأرْبْعَاء mit Doppel-Sukun, weicht von الأَرْبِعَاء ab |
| 1217 | toq3od „du bleibst" | PC-Vokalmuster `tqa3id` zu weit entfernt |
| 4423 | skhun | Präzedenzfall in SKILL.md, TUNICO-Treffer ist `adj_pl` statt Verb |

### Warum es 39 wurden und nicht 50

Zusammensetzung der 256 offenen Zeilen zu Beginn der Runde:

| | Anzahl |
|---|---|
| Skelett in TUNICO/Peace Corps vorhanden | 146 |
| nur in Ninja | 19 |
| **in gar keiner Quelle** | **91** |

Die 91 sind kein Zufall, sondern eine Struktur: französische Lehnwörter (`sacoche`, `el-guichet`,
`hotel`, `styloet`), Formen mit Pronominalsuffix (`ysalmik`, `ta3rafshi`, `blayiskom`) und
zusammengesetzte Ausdrücke. Für die hilft kein Wörterbuch — die brauchen Semia.

Von den 146 mit Skeletttreffer scheitern die meisten daran, dass sich die Quellform aus **unseren**
Buchstaben nicht erzeugen lässt. Das ist kein Mangel des Verfahrens, sondern seine Schutzfunktion:
es bedeutet, dass die Quelle eine andere Wortform meint. Der quellengestützte Weg ist damit weitgehend
ausgeschöpft — weitere Vokalisierungen hier hieße, die Belegpflicht aufzuweichen.

### Gegenprobe

| | vorher | jetzt |
|---|---|---|
| Check 22 unvokalisierte Einzelwörter | 273 | **234** |
| Check 23 | 0 | **0** |
| Check 24 / 25 | 0 / 0 | **0 / 0** |
| Gruppe A (18 Checks) | alle 0 | **alle 0** |
| Schadda auf ا korpusweit | 0 | **0** |
| Trainer 🔤 Transliteration | 0 | **0** von 3.775, 23 Regeln |
| Trainer 🔁 Duplikate | 1 | **1** (unverändert `1819`/`3897`) |

---

## Runde 65 — die offenen Punkte abgearbeitet

### 768 — korruptes Arabisch, vierter Fall der Alif-Klasse

```
gespeichert  االله   = 0627 0627 0644 0644 0647   (ا ا ل ل ه — doppeltes Alif)
richtig      اللَّه  = 0627 0644 0644 0651 064E 0647
```

`darija` war `aallha`, TUNICO 1307 `aḷḷāh` „Gott". Der Bestand schreibt das Wort überall sonst
richtig (`600 الله يعينك`, `1460 بارَك اللَّه فِيك`), nur diese Zeile hatte ein Alif zu viel in
Schrift **und** Umschrift. Beides korrigiert: `اللَّه` / `allah`. Ableitung ergibt `el-lah` (die
Funktion nimmt den Artikel-Zweig, ل ist Sonnenbuchstabe), Skelett `llh` auf beiden Seiten.

### 569 — unser Arabisch war das falsche Wort

TUNICO trennt die beiden Bedeutungen sauber: **1715 `bānka` = „Bank" (Geldinstitut)**,
**2015 `bank` = „Sitzbank"**. Peace Corps 415 `BANK` gibt `{ba:nka, ba:nka:t}`, Ninja 11175
بَانْكَا. Unser `arabic_script` war بَنْكْ — also das **Möbelstück**, während die `darija` `banka`
das Geldinstitut meint (deutsches „Bank" ist in beide Richtungen zweideutig und hat den Fehler
gedeckt).

**Das korrigiert eine eigene Entscheidung aus Runde 62.** Dort wurde `569` aus einem
buchstabengleichen Ninja-Treffer vokalisiert (بنك → بَنْكْ). Buchstabentreu war das korrekt —
aber die Buchstaben selbst waren schon falsch. Genau der Fall, für den seit dieser Sitzung in
IMPORTS.md steht: **Buchstabengleichheit ist kein Wortnachweis.** `arabic_script` → بَانْكَا,
Ableitung `banka` = `darija`.

### 1130 — das Femininum hatte die Gemination nie bekommen

| | Form | Quelle |
|---|---|---|
| m. | `435` ضَيَّق `dhayyaq` | im Bestand, mit Schadda |
| f. | `1130` ضَيْقَة `dhayqa` | **ohne Schadda** |
| Pl. | `1134` ضَيّْقِينْ `dhayyqin` | in Runde 62 korrigiert |

Ninja 12727 **ضَيّْقَةْ** `dhayy9a` „tight, small" (ADJ) und Peace Corps 3092 `NARROW`
`{dhiyyiq, dhiyyqa, dhiyyqi:n}` belegen die Gemination im Femininum unabhängig voneinander.
Korrigiert zu ضَيّْقَة / `dhayyqa`. In Runde 63 war die Zeile noch bewusst ausgelassen worden
(„bereits vokalisiert, nicht automatisch ändern") — mit zwei unabhängigen Quellen ist das jetzt
kein automatischer Blockfix mehr, sondern ein Einzelbefund.

### 1857/1858/1879 — die vierte Alif-Verschiebung

TUNICO 4339 `tlazz` „gezwungen sein/werden" und 6941 `lazz` „zwingen": die Wurzel ist das
geminierte ل-ز-ز, **ohne Alif**. Alle drei Zeilen trugen eins, und `1857` widersprach zusätzlich
den beiden anderen mit einfachem `z` in der `darija`.

| id | alt | neu |
|---|---|---|
| 1857 | يتلاز / `yetlaz` | **يِتْلَزّ** / `yetlazz` |
| 1858 | تلازيت / `tlazzit` | **تْلَزِّيتْ** |
| 1879 | تلازيت نرجع للدار | **تْلَزِّيتْ** نرجع للدار |

Beim ersten Entwurf für `1858` stand die Schadda ohne Kasra (تْلَزّيتْ), was `tlazzyt` ableitet
statt `tlazzit` — vor dem Schreiben gefangen und zu ز + Kasra + Schadda korrigiert.

### 1819 — eigener Fehler aus Runde 62 behoben

```
3897  … 0634 0650 0651 …   ش + Kasra + Schadda   ← Hauskonvention
1819  … 0634 0651 0650 …   ش + Schadda + Kasra   ← in Runde 62 von mir falsch herum gesetzt
```

SKILL.md verlangt das Vokalzeichen **vor** der Schadda; `3897` machte es richtig, meine
Korrektur an `1819` nicht. Angeglichen. Nebenbefund: korpusweit tragen **26 Zeilen** die Schadda
vor dem Vokalzeichen — eine eigene kleine Aufräumaufgabe, noch nicht angefasst.

### Gegenprobe

| | vorher | jetzt |
|---|---|---|
| Check 22 unvokalisierte Einzelwörter | 234 | **231** |
| Check 24 / 25 | 0 / 0 | **0 / 0** |
| Schadda auf ا korpusweit | 0 | **0** |
| Trainer 🔤 Transliteration | 0 | **0** von 3.775, 23 Regeln |
| Gruppe A | alle 0 | **1 offen** (Check 10, siehe unten) |

### Der einzige verbliebene offene Punkt: `1819` / `3897`

Nach der Korrektur sind beide Zeilen **zeichengleich** in `arabic_script` und `darija`
(مِتْغَشِّشْ / `mitghashshish`), die Bedeutung ist dieselbe („wütend / böse" gegen
„verärgert / zornig"), beide liegen im Topic „Befinden", die Lektionen unterscheiden sich (53/33).

| id | Lektion | progress-Zeilen | Wiederholungen |
|---|---|---|---|
| 1819 | 53 | 4 | 9 |
| 3897 | 33 | 1 | 8 |

Keine der beiden hängt in `course_lessons.vocab_lesson_refs`. **Nicht gelöscht** — beide tragen
Lernfortschritt, und Löschen ist irreversibel. Das ist eine Entscheidung über Nils' eigenes
Lernmaterial, keine Datenkorrektur.
