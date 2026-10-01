# Transliteration im Kurs: Befund und Vorschlag (2026-10-01)

Nur Befund und Verfahren. In der Datenbank ist **nichts geändert**. Vor dem Schreiben braucht es dein Ja.

## Befund

Maßstab sind die Regeln des Trainers (`TRANSLIT_RULES`, Ziel-Konvention in `skills/tunsi/SKILL.md`). Die meisten Regeln brauchen das arabische Schriftbild und lassen sich für den Kurs nicht anwenden (der Kurs hat keins). Anwendbar sind die Regeln 1, 2, 3, 4, 20, 21. Dazu ein **Wörterbuch** aus den Vokabeln des Trainers, TUNICO und Peace Corps (19.164 Formen), um Konsonantenfehler zu finden: Eine Form, die im Wörterbuch fehlt, deren Variante mit `7`/`kh`/`j`/`3` aber vorkommt, ist sehr wahrscheinlich falsch geschrieben.

Geprüft: `prompt` und `solution` aller 2.093 Übungen (nur der Tounsi-Teil, ohne deutsche Übersetzung und Hinweise), die Dialoge (`dialog_text`) und die Grammatiktexte (`grammar_notes`) der 13 Kurs-Lektionen.

| Befund | Wortformen | Stellen | Beispiel |
|---|---:|---:|---|
| ح als `h` statt `7` | 87 | ca. 280 | `sbah` → `sba7`, `hatta` → `7atta`, `wahid` → `wa7id` |
| ج als `z` statt `j` | 15 | ca. 40 | `zwab` → `jwab`, `znab` → `jnab`, `sazra` → `sajra` |
| ع als `s` statt `3` | 30 | ca. 45 | `bsid` → `b3id`, `ysayyshik` → `y3ayyshik`, `arbsa` → `arb3a` |
| خ als `x` statt `kh` | 9 | 14 | `xrif` → `khrif`, `nixdim` → `nikhdim` |
| Artikel vor ج nicht angeglichen (Regel 4, Folge von `z`→`j`) | – | 16 | `iz-zwab` → `ij-jwab` |
| Namen großgeschrieben (Regel 3) | 13 | 58 | `Fatma`, `Klaus`, `Muhsin` → `fatma`, `klaus`, `muhsin` |
| Satzanfang großgeschrieben in Tounsi-Antworten (Regel 3) | – | 88 | `Ih, …` / `La, …` → `ih, …` / `la, …` |

Regel 2 (`ch`), 20 (`wa`/`u` statt `w-`) und 21 (`-iou`) haben im Kurs **keine** echten Treffer (nur deutsche Wörter und `+ -u`-Suffixe). Regel 1 (Ziffern 2/5/9) trifft nur Zahlen in Lückentexten.

Nicht untersucht und **nicht** Teil des Vorschlags: Vokale (`u` gegen `ou`, `e` gegen `i`). Laut SKILL.md ist die Quell-Konvention bei Vokalen kein Befund. Ebenfalls nicht erfasst: Fehler, die das Wörterbuch nicht kennt (z. B. Wörter, die nirgends vorkommen).

## Probelauf

Die Wortliste unten (141 Formen) wurde als Probelauf an allen Feldern gerechnet:

- **248 Übungen** mit **310 geänderten Feldern**, dazu **22 Lektionsfelder** (Dialoge/Grammatik in 11 Lektionen).
- Der Tippvergleich bleibt stabil: Von 139 Text-Karten mit geänderter Lösung wird die **alte Schreibung** (`h`) gegen die neue Lösung (`7`) in 138 Fällen weiter akzeptiert, weil die Prüfung `7` und `h` gleich behandelt. Eine Karte weicht ab (Konsonant `s`→`3`).
- Alle Ist-Werte aller 332 Felder stehen in `translit_aenderungen.json` (alt und neu), damit sich alles zurücksetzen lässt.

## Ausgeschlossen (bewusst nicht ändern)

| Form | Grund |
|---|---|
| `slim` | Eigenname (Slim), kein ع |
| `sani` | unklar, kein Beleg |
| `yakhlas` | richtig (يخلص, ص = `s`), der Vorschlag `yakhla3` wäre falsch |
| `biz-zabt` | ein anderes Problem (ض = `dh`), eigener Punkt |
| `qlit`/`glit`, `gdha`/`qdha` | ق/ڨ und غ lassen sich ohne Arabisch nicht entscheiden |
| `iz` (einzeln) | Artikel, wird nur zusammen mit dem folgenden Wort angeglichen (`iz-zghir` bleibt!) |

## Verfahren (Vorschlag)

1. **Sicherung**: `translit_aenderungen.json` liegt im Repo (alle alten Werte).
2. **Ersetzen** Wort für Wort anhand der Tabelle unten, nur ganze Wörter, nur kleingeschrieben und nur in Tounsi-Feldern (`course_exercises.prompt`/`solution`, `course_lessons.dialog_text`/`grammar_notes`). Deutsche Übersetzungen und Namen bleiben unberührt.
3. **Artikel angleichen**: `il-`/`iz-`/… vor `j` → `ij-` (Regel 4, einmalig nach der Umstellung).
4. **Großschreibung**: Namen und Satzanfänge in Tounsi-Antworten kleinschreiben (Regel 3). Die deutsche Übersetzung hinter ` — ` bleibt.
5. **Kontrolle** danach: Probelauf erneut, es darf keine Wortform der Tabelle mehr vorkommen. Trainer-Regeln 3 und 4 auf allen geänderten Feldern. Alle 139 Text-Karten mit geänderter Lösung nehmen ihre eigene Lösung an. Zählung der geänderten Zeilen = erwartete Zahl.
6. Zurücksetzen jederzeit aus `translit_aenderungen.json`.

Die Änderung ginge als einzelne `UPDATE`-Befehle pro Feld, in einer Transaktion je Tabelle.

## Wortliste

### ح: h → 7 (87 Wortformen)

| Stellen | alt | neu | Beleg (Vokabeln/Quellen) | Beispiel |
|---:|---|---|---|---|
| 29 | `sbah` | `sba7` | 4/6 | 3la ftur is-sbah. (ana) |
| 17 | `hatta` | `7atta` | 10/20 | nhar ij-jim3a naqrau m-is-sab3a hatta l-il-3ashra. |
| 13 | `hanut` | `7anut` | 0/4 | bahdatkum famma hanut. |
| 12 | `ahna` | `a7na` | 4/2 | ahna alman / almaniyat. |
| 12 | `wahid` | `wa7id` | 2/15 | 3andi ktab wahid. |
| 12 | `wahda` | `wa7da` | 1/9 | bnayya wahda / 7dashin bnayya |
| 12 | `hlib` | `7lib` | 4/4 | qahwa b-il-hlib. |
| 9 | `sahbi` | `sa7bi` | 2/0 | nikhdim m3a sahbi.  |
| 9 | `tuffah` | `tuffa7` | 0/2 | yishri-shi t-tuffah? |
| 9 | `hsab` | `7sab` | 1/7 | qaddash la-hsab? |
| 7 | `hwal` | `7wal` | 0/2 | shnuwwa hwal ummik? |
| 7 | `hashti` | `7ashti` | 1/0 | hashti b-karhba zdida. |
| 6 | `mhatta` | `m7atta` | 1/3 | li-mhatta / mhattit il-kiran |
| 6 | `miftah` | `mifta7` | 1/2 | khumstashin miftah / khamsa mfatah |
| 5 | `samahni` | `sama7ni` | 2/0 | samahni |
| 5 | `hsan` | `7san` | 1/2 | win mashin hsan w-bashir tawwa? |
| 5 | `lham` | `l7am` | 2/8 | lham / 3allush |
| 4 | `mhattit` | `m7attit` | 1/0 | li-mhatta / mhattit il-kiran |
| 4 | `bahda` | `ba7da` | 0/3 | ana waqif bahda l-mu3allmin. |
| 4 | `sahib` | `sa7ib` | 1/2 | 3andkum ___ (11) sahib. |
| 4 | `hammamat` | `7ammamat` | 0/2 | qul ash bash ta3mil il-3am ij-jayy? (yimshi l-il-hammama |
| 4 | `hluwa` | `7luwa` | 0/1 | l-wlayyid yushrub il-qahwa hluwa walla naqsa sukkur? |
| 4 | `hukka` | `7ukka` | 0/2 | hutt lik hukka tunn. |
| 4 | `rawwah` | `rawwa7` | 1/3 | rawwah  |
| 4 | `yrawwah` | `yrawwa7` | 1/1 | Perf.: rawwah, rawwhit, rawwaht, rawwaht; Pl. rawwhu, ra |
| 4 | `barah` | `bara7` | 0/2 | il-musallma ma-nazzmit-sh tikhdim il-barah. |
| 4 | `hass` | `7ass` | 1/2 | hass  |
| 3 | `sahibti` | `sa7ibti` | 1/0 | nuq3ud wra sahibti. |
| 3 | `mfatah` | `mfata7` | 0/2 | 3andha ___ (4) mfatah. |
| 3 | `turh` | `tur7` | 0/2 | mashin l-il-qahwa bash yal3bu turh karta. |
| 3 | `hwanit` | `7wanit` | 0/3 | famma barsha hwanit ghalya qrab min hna. |
| 3 | `nrawwah` | `nrawwa7` | 1/0 | waqtash trawwah l-id-dar? – nrawwah l-id-dar il-khamsa m |
| 3 | `yahki` | `ya7ki` | 3/1 | tamma shkun yahki bil-fransawiya hna? |
| 3 | `njah` | `nja7` | 0/5 | kan ja qra b-il-gda rahu njah. |
| 3 | `haqq` | `7aqq` | 1/2 | qal-li il-haqq! |
| 2 | `bahdha` | `ba7dha` | 0/1 | il-banka bahdha es-sinima. |
| 2 | `sahba` | `sa7ba` | 1/2 | 3anna ___ (15) sahba. |
| 2 | `hiss` | `7iss` | 2/2 | intuma sam3in hiss il-barra. |
| 2 | `salah` | `sala7` | 0/1 | bash timshi ntull 3la sa7biha salah illi yuskun fi-jirba |
| 2 | `hdash` | `7dash` | 1/2 | nurqud m-la-hdash hatta l-is-sitta mta3 is-sbah. |
| 2 | `hluw` | `7luw` | 0/3 | thibb ka3ba biskwit? la, barkallahu fik, kult il-yum bar |
| 2 | `yhutt` | `y7utt` | 1/1 | yhutt is-sukkur wahdu. |
| 2 | `farhit` | `far7it` | 1/0 | farhit-shi bih umm 3li? |
| 2 | `frah` | `fra7` | 0/5 | frah  |
| 2 | `hsib` | `7sib` | 1/6 | hsib  |
| 2 | `mirtahin` | `mirta7in` | 0/2 | in-nas mirtahin f-il-kar? |
| 2 | `hlu` | `7lu` | 0/2 | bash ysaddi nhar hlu. |
| 2 | `hall` | `7all` | 2/2 | hall  |
| 2 | `harr` | `7arr` | 0/3 | qaddash hashtik? – hashti b-nuss rtal filfil harr. |
| 2 | `hfad` | `7fad` | 0/1 | hfad  |
| 2 | `shtah` | `shta7` | 0/1 | shtah  |
| 2 | `hlif` | `7lif` | 0/2 | hlif  |
| 2 | `ysamah` | `ysama7` | 0/1 | ysamah  |
| 2 | `hmat` | `7mat` | 0/1 | hethi hmat shkun? (sahbi) |
| 1 | `taht` | `ta7t` | 3/5 | taht "unter" + Pronominalsuffixe |
| 1 | `minha` | `min7a` | 0/2 | li-ktab il-3arbi minha. |
| 1 | `hwim` | `7wim` | 0/1 | sitta hwim / suttashin huma |
| 1 | `mhattat` | `m7attat` | 0/3 | 3ashra mhattat / zuz mhatta |
| 1 | `ninjah` | `ninja7` | 1/0 | ana nhibb ninjah. ahna ___ |
| 1 | `farhin` | `far7in` | 0/1 | inshalla farhin dima. |
| 1 | `tuffahat` | `tuffa7at` | 0/2 | ih, thibb-shi. a3tini zuz tuffahat. |
| 1 | `hsibt` | `7sibt` | 0/1 | hsib, hisbit, hsibt, hsibt; Pl. hisbu, hisbu, hsibtu, hs |
| 1 | `rawwaht` | `rawwa7t` | 1/0 | Perf.: rawwah, rawwhit, rawwaht, rawwaht; Pl. rawwhu, ra |
| 1 | `mahlul` | `ma7lul` | 0/3 | il-gishe mahlul? |
| 1 | `hums` | `7ums` | 1/4 | shra batata w-qra3 w-shwayya hums mnaffakh. |
| 1 | `sahbu` | `sa7bu` | 1/0 | msha m3a sahbu 3li. |
| 1 | `hallit` | `7allit` | 2/0 | hall, hallit, hallit, hallit; Pl. hallu, hallu, hallitu, |
| 1 | `hallu` | `7allu` | 1/0 | hall, hallit, hallit, hallit; Pl. hallu, hallu, hallitu, |
| 1 | `hallitu` | `7allitu` | 1/0 | hall, hallit, hallit, hallit; Pl. hallu, hallu, hallitu, |
| 1 | `hallina` | `7allina` | 1/0 | hall, hallit, hallit, hallit; Pl. hallu, hallu, hallitu, |
| 1 | `rbaht` | `rba7t` | 2/0 | rbaht malyun dinar. |
| 1 | `hrabish` | `7rabish` | 0/3 | martik tushrub la-hrabish? |
| 1 | `hassit` | `7assit` | 1/0 | hass, hassit, hassit, hassit; Pl. hassu, hassu, hassitu, |
| 1 | `hassina` | `7assina` | 1/0 | hass, hassit, hassit, hassit; Pl. hassu, hassu, hassitu, |
| 1 | `tsamah` | `tsama7` | 0/1 | ysamah, tsamah, tsamah, nsamah; Pl. ysamhu, tsamhu, nsam |
| 1 | `mrawwah` | `mrawwa7` | 0/1 | mrawwah, mrawwha, mrawwhin. |
| 1 | `mrawwha` | `mraww7a` | 0/1 | mrawwah, mrawwha, mrawwhin. |
| 1 | `mrawwhin` | `mraww7in` | 0/1 | mrawwah, mrawwha, mrawwhin. |
| 1 | `marhba` | `mar7ba` | 0/4 | marhba bik fi-kull waqt. |
| 1 | `hatt` | `7att` | 1/2 | ma-3andi hatt shayy. |
| 1 | `haja` | `7aja` | 8/11 | la, ma-nhibb-sh tay. famma-sh haja ukhra? |
| 1 | `yhillu` | `y7illu` | 1/0 | ana nhar yhillu li-mkatib? |
| 1 | `rih` | `ri7` | 1/3 | la, id-dinya dima mghayyma w-famma barsha r3ad w-braq w- |
| 1 | `ahayti` | `a7ayti` | 0/1 | b-ish-shwayya, ahayti saqi!! |
| 1 | `smah` | `sma7` | 0/5 | is-smah. malla kar! kayinna fi-hukka sardina. samahni kh |
| 1 | `hadhir` | `7adhir` | 0/2 | hadhir, w-ash thibb tushrub? |
| 1 | `hajat` | `7ajat` | 0/4 | famma barsha hajat: brik w-shurba w-maqruna w-djaj musli |

### ج: z → j (15 Wortformen)

| Stellen | alt | neu | Beleg (Vokabeln/Quellen) | Beispiel |
|---:|---|---|---|---|
| 5 | `draz` | `draj` | 2/3 | il-khamsa gir arb3a (draz) mta3 la-3shiya. |
| 4 | `sazra` | `sajra` | 0/1 | 3a-s-sazra ___(15)___(3asfur). |
| 3 | `zwab` | `jwab` | 0/2 | ___ (yiktib) iz-zwab w ba3d ___ (yushrub) it-tay! |
| 2 | `znab` | `jnab` | 1/6 | il-busta bi-znab il-farmasi. |
| 2 | `zwabat` | `jwabat` | 0/3 | zwab wahid / zuz zwabat |
| 2 | `darzin` | `darjin` | 3/3 | nuss in-nhar gir darzin. |
| 2 | `zbin` | `jbin` | 0/5 | ir-rajil yhibb-shi yishri rtal zbin? |
| 1 | `rzal` | `rjal` | 0/4 | win mashin ir-rzal? |
| 1 | `ma3zun` | `ma3jun` | 0/3 | il-khubz ma3zun jdid. |
| 1 | `raza3` | `raja3` | 0/4 | inti raza3 tikhdim ghudwa? |
| 1 | `zdida` | `jdida` | 2/3 | hashti b-karhba zdida. |
| 1 | `lahza` | `lahja` | 1/2 | il-lahza mta3kum muss sahla. |
| 1 | `ziha` | `jiha` | 0/6 | kifash it-taqs f-iz-ziha illi tuskun fiha f-in-nimsa? |
| 1 | `zaru` | `jaru` | 0/1 | zar, zarit, zurt, zurt; Pl. zaru, zaru, zurtu, zurna. |
| 1 | `tzi` | `tji` | 1/0 | nqul-lik il-haqq, it-taqs ma-ysa3id-sh b-il-kull 3a-l-kh |

### ع: s → 3 (30 Wortformen)

| Stellen | alt | neu | Beleg (Vokabeln/Quellen) | Beispiel |
|---:|---|---|---|---|
| 4 | `ysayyshik` | `y3ayyshik` | 10/0 | la bas, ysayyshik. |
| 4 | `bsid` | `b3id` | 2/9 | il-busta ___ (bsid). |
| 4 | `swina` | `3wina` | 1/3 | ir-rajil yduq-shi la-swina? |
| 4 | `ysaddi` | `y3addi` | 2/1 | karim win bash ysaddi l-kunji mta3u w-qaddash bash yuq3u |
| 3 | `tsadda` | `t3adda` | 1/4 | tsadda  |
| 2 | `musallma` | `mu3allma` | 1/2 | in3am, hiyya musallma. / la, tawwa ma-tikhdimsh. |
| 2 | `bsida` | `b3ida` | 3/5 | il-busta bsida. |
| 2 | `musallim` | `mu3allim` | 0/2 | ktab / musallim |
| 2 | `sfas` | `3fas` | 0/1 | sfas  |
| 2 | `stas` | `3tas` | 0/4 | stas  |
| 2 | `wsid` | `w3id` | 0/2 | wsid  |
| 2 | `tsashsha` | `t3ashsha` | 1/2 | tsashsha  |
| 1 | `qsadt` | `q3adt` | 1/0 | qsadt nimshi barsha bash wsilt l-il-mhatta j-jdida. |
| 1 | `sziza` | `3ziza` | 0/6 | l-ukhtu la-sziza. |
| 1 | `simara` | `3imara` | 1/1 | f-is-simara lli wra qahwit l-aqwas. |
| 1 | `sabsin` | `sab3in` | 2/3 | talib mitin w-sabsin dinar. |
| 1 | `mtasi` | `mta3i` | 0/1 | ih, il-burtman mtasi hunak. |
| 1 | `arbsa` | `arb3a` | 4/3 | fih arbsa byut: zuz kbar w-zuz zghar. |
| 1 | `sastin` | `sa3tin` | 1/2 | madhi sastin. |
| 1 | `sarfit` | `3arfit` | 1/0 | 3la khatir ma-sarfit-sh win ja l-mat3am. |
| 1 | `sa` | `3a` | 0/4 | ash yilzim yikun kull yum sa-t-tawla f-rumdhan? |
| 1 | `tsaddit` | `t3addit` | 1/0 | Perf.: tsadda, tsaddat, tsaddit, tsaddit. Präs.: yitsadd |
| 1 | `yitsadda` | `yit3adda` | 1/1 | Perf.: tsadda, tsaddat, tsaddit, tsaddit. Präs.: yitsadd |
| 1 | `tsashshat` | `t3ashshat` | 1/0 | Perf.: tsashsha, tsashshat, tsashshit, tsashshit. Präs.: |
| 1 | `tsashshit` | `t3ashshit` | 1/0 | Perf.: tsashsha, tsashshat, tsashshit, tsashshit. Präs.: |
| 1 | `yitsashsha` | `yit3ashsha` | 1/1 | Perf.: tsashsha, tsashshat, tsashshit, tsashshit. Präs.: |
| 1 | `titsashsha` | `tit3ashsha` | 1/0 | Perf.: tsashsha, tsashshat, tsashshit, tsashshit. Präs.: |
| 1 | `mitsaddi` | `mit3addi` | 0/1 | mitsaddi, mitsaddya (auch mitsaddiya). |
| 1 | `mitsaddya` | `mit3addya` | 0/1 | mitsaddi, mitsaddya (auch mitsaddiya). |
| 1 | `nsum` | `n3um` | 1/0 | waqt-illi id-dinya tusxun, nimshi nsum. |

### خ: x → kh (9 Wortformen)

| Stellen | alt | neu | Beleg (Vokabeln/Quellen) | Beispiel |
|---:|---|---|---|---|
| 6 | `xrif` | `khrif` | 0/3 | ma-n7ibb-sh la-xrif ____ famma barsha ____ w-id-dinya di |
| 2 | `sxuna` | `skhuna` | 2/3 | id-dinya sxuna. |
| 2 | `nixdim` | `nikhdim` | 1/0 | nixdim - bahi - waqt-illi - ma-n7ibb-sh - it-taqs |
| 1 | `xalla` | `khalla` | 1/3 | xalla  |
| 1 | `mxalli` | `mkhalli` | 0/1 | mxalli, mxallya (auch mxalliya), mxallin. |
| 1 | `mxallya` | `mkhallya` | 0/1 | mxalli, mxallya (auch mxalliya), mxallin. |
| 1 | `mxallin` | `mkhallin` | 0/1 | mxalli, mxallya (auch mxalliya), mxallin. |
| 1 | `xzana` | `khzana` | 1/4 | bit in-num fiha xzana. |
| 1 | `rxis` | `rkhis` | 3/4 | la-hsab tla3 rxis. |
