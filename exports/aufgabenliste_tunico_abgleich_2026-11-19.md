# Aufgabenliste: Abgleich unserer Verben, Nomen und Adjektive mit TUNICO (Stand 19.11.2026)

Alles bisher nur gelesen und gesammelt, **nichts in Supabase geändert**. Details und Listen: `exports/tunico_abgleich_2026-11-19.md`. Jede Änderung in der Datenbank erst als Vorschlag mit Ist/Soll, nach Bestätigung, mit Sicherung.

## Was die vier Bereiche ergeben haben

| Bereich | Ergebnis | Belastbarkeit |
|---|---|---|
| Imperative | 596 Zellen (170 Verben) alle abgeleitet; TUNICO markiert nur 2 Imperative (`#v_imperative_pl_p2`); SL24 belegt nur shuf, jib, jarrib, qul. Arabisch fehlt bei 65 von 170 Verben. | kaum belegbar |
| Bedeutungs-Facetten | 338 TUNICO-Bedeutungsgruppen zu passenden Verben, 97 davon bei uns nicht abgedeckt (67 Verben). Viel Rauschen (unregelmäßige deutsche Formen wie „log“ gegen „lügen“). Echte Lücken u. a. bei qass, kassar, dar, sallim, 7all, 3adda, ba3, jbid, kallim, 3jib. | brauchbar, Liste von Hand sichten |
| Perfekt-Zellen | TUNICO-Korpusformen haben keine Person. Nur `#v_past_sg_p1` (40 Verben, davon 5 mit uns vergleichbar): 2 gleich, 3 anders (7awil / 7wilt, safir / sfurt, smar / smurt). Die übrigen Perfekt-Zellen lassen sich nicht gegen TUNICO prüfen. | sehr dünn |
| Nomen und Adjektive, Plural | 3046 TUNICO-Lemma/Plural-Paare. 757 Singulare bei uns exakt vorhanden, davon nur 142 mit dem TUNICO-Plural als eigener Zeile. 33 unserer 165 Einwort-Plural-Zeilen stehen nicht in TUNICO (Liste unten). Das Konsonantengerüst taugt für Plurale nicht (gebrochene Plurale). | Zählung brauchbar, Einzelfälle von Hand |

## Aufgaben (Reihenfolge nach Nutzen)

1. **Präsens-Abweichungen korrigieren (Vorschlag je Gruppe, dann schreiben)**
   - Gruppe B (Stamm II auf -ir): khammim, sakkar, wassal, fakkar, tfakkir, tsawwir. Du hast bei najjim schon i entschieden. Beleg TUNICO ysakkir, ywassil, yfakkir, yitsawwir.
   - Gruppe A (Präfix ya-/ta-/na- statt yi-/ti-/ni-, Kehllaut): 7sib, b3ath, fra7, krah, rja3, shba3, t3ab, bqa. Passt zu unserer Kehllaut-Regel; Nils hört nach, ob ya- stimmt.
   - Gruppe C (Einzelfälle): 4372 yu3tash (TUNICO yu3tush), 3add, b3id (yib3ad), qbil / yqabel, sabb. Je Verb prüfen.
   - Je Verb: Zeile, Tabelle (alle Personen), Anzeige im Trainer, danach Prüfungen.
2. **Drei Verben ohne Quelle einzeln recherchieren:** 2842 barrish, 2844 rakkidh, 2609 tza33ab (Ninja-Beispielsätze, SL24, Peace Corps, ggf. Semia).
3. **Perfekt:** (a) die drei Abweichungen bei 1sg prüfen (7awilt / 7wilt, safirt / sfurt, smart / smurt); (b) Perfekt-Zellen über unsere eigene Regelprüfung im Trainer absichern (Ausbau der Verbregel-Prüfung nach Stamm und Verbtyp), weil TUNICO keine Personen markiert.
4. **Imperative:** (a) aus SL24 und Ninja alle Sätze mit Ausrufezeichen und Imperativ auswerten und mit unseren Formen vergleichen; (b) Arabisch für die 65 Verben ohne Imperativ-Arabisch nach Regel ableiten (als „abgeleitet“ markieren); (c) Rest regelbasiert prüfen.
5. **Bedeutungs-Facetten:** die 67 Verben mit Lücke von Hand sichten, die echten Lücken (z. B. qass „erzählen, unterbrechen, abbrechen“, kassar „zerstören“, dar „spazieren gehen, umgeben“, sallim „Gruß ausrichten, aufgeben“, 7all „backen, lösen“, 3adda „Prüfung machen“, ba3 „denunzieren“) als Vorschlag ins Deutsch aufnehmen. Regel: alle Zeilen einer Verbfamilie bekommen dieselbe Bedeutungsliste.
6. **Fehlende Verben anlegen (nur nach Rückfrage: anlegen? fällig?):** 78 TUNICO-Korpusverben fehlen ganz, die häufigsten t3arrif (21), tbaddil (20), kharrij (19), qallaq (19), sajjil (18), dakhkhil (17), tabba3 (17), gadd (13), dabbar (12), fakk (11), khtab (11), tsamma (11), fassir (10), sahhil (10). Dazu 40 Verben, die bei uns nur als anderes Wort vorkommen (shal, khzar, hamm, sraf, thhur, khaddim, sayyib, lamm, lawwa7 …): prüfen, ob ein Verb mit Tabelle nötig ist.
7. **Plurale und Adjektivformen:**
   - Die 33 Plural-Zeilen prüfen, die in TUNICO nicht stehen: 292 3andhum, 2116 3radh, 1089 7luin, 4120 ahuma, 2156 bakuet, 2174 byudh, 3975 dh3af, 1134 dhayyqin, 4618 dziriyyat, 4115 garsunat, 820 iktbu, 951 imshiw, 2168 jupet, 2178 khdhur, 4106 lubnaniyyin, 2118 m3abbyin, 896 makatib, 3969 massajat, 2197 mayytin, 2109 meksikiyyin, 625 millimat, 1143 mqat3in, 283 piesat, 1517 qrayib, 1094 qwiyyin, 3344 s7un, 4118 shbikum, 3977 shihin, 1158 shurtwat, 2171 snedil, 1160 spedriyyet, 4105 sudaniyyin, 3971 urubbiyyin (viele Lehnwörter und Nationalitäten, dort ist TUNICO nicht der Maßstab).
   - Entscheiden, welche Plurale wir überhaupt als Zeile führen; für 615 Singulare fehlt der TUNICO-Plural. Danach nach Häufigkeit ergänzen.
   - Adjektive: Feminin (`#adj_f` 306), Plural (`#adj_pl` 316), Elativ (`#adj_elative` 19), Partizipien (`#ap_f`, `#ap_pl`, `#pp_f`, `#pp_pl`), Nomen mit Dual (`#n_dual` 95) und Einheitsnomen (`#n_unit` 141) auf dieselbe Weise vergleichen.
8. **Werkzeug und Methode:**
   - Die Abgleichs-Abfragen als Hilfsansichten ablegen, damit sie schnell laufen (das wäre Schreiben in die Datenbank, nur nach Bestätigung); die erste Gesamtabfrage lief ins 60-s-Zeitlimit.
   - Punkt 23 (Quellen-Checkliste in CLAUDE.md und SKILL.md, danach ZIP des Skills neu hochladen).
9. **Abschluss jeder Gruppe:** Sicherung vor dem Schreiben, danach Prüfungen im Trainer (Ziel 0), Transliterations-Prüfung, Log-Eintrag, ggf. Merge.

## Entscheidungen, die von Nils kommen müssen
- Ya-Präfix bei Kehllaut-Verben (Gruppe A): stimmt es nach deinem Gehör?
- Fehlende Verben: welche anlegen, fällig oder nicht.
- Plurale: welche wir führen wollen.
- Imperative: reicht „abgeleitet“, oder soll jede Form aus einer Quelle stammen?

---

# Ergänzung (19.11. abends): alle übrigen TUNICO-Daten

Oben stehen nur die **Verben** und der **Plural** der Nomen. TUNICO hat 7543 Lemmata (3978 Nomen, 1543 Verben, 527 ohne Wortart, 348 Adjektive, 208 Partizipien, 205 Sammelnomen, 153 aktive und 87 passive Partizipien, 105 Adverbien, 73 Ortsnamen, 52 Pluralnomen, 34 Zahlwörter, 34 Konjunktionen, 30 Präpositionen …) und im Korpus 300 Verben, 300 Nomen, 64 Adjektive und 9874 Wortformen. Weitere Aufgaben:

10. **Wurzel gegen TUNICO (begonnen, siehe unten).**
11. **Nomen und Adjektive, Singularschreibung und Vokale:** von 3978 TUNICO-Nomen stehen bei uns nur 729 exakt gleich geschrieben (87 von 348 Adjektiven). Gerüst-gleiche Wörter mit anderer Schreibung sichten (Klasse: nur Schreibweise, Vokal, Genus). Dazu Genus (`#n_f`).
12. **Partizipien und Adjektivformen:** aktives und passives Partizip, Feminin (`#ap_f`, `#pp_f`, `#adj_f` 306), Plural (`#ap_pl`, `#pp_pl`, `#adj_pl` 316), Elativ (`#adj_elative` 19) gegen unsere Zeilen.
13. **Dual, Einheitsnomen, Sammelnomen:** `#n_dual` 95, `#n_unit` 141 und 98 Plurale dazu, Sammelnomen (205) gegen unsere Zeilen (z. B. Ei / Eier, Orange / Orangen).
14. **Fehlende häufige Nomen und Adjektive** nach Korpus-Häufigkeit (`tunico_corpus_nouns`, `_adjectives`, `_wordforms`), nur nach Rückfrage anlegen.
15. **Übrige Wortarten:** Adverbien (105), Zahlwörter (34), Konjunktionen (34), Präpositionen (30), Pronomen, Ortsnamen (73), Interjektionen.
16. **Bedeutungen der Nomen und Adjektive** (Facetten wie bei den Verben), danach.
17. **Die 1243 Verben außerhalb der Korpus-Top-300** (`tunico_import` hat 1543 Verben): Grundform, Präsens (3. Sg.), Bedeutung.
18. **Peace Corps und Ninja** systematisch gegen unsere Zeilen (bisher nur zum Nachschlagen), danach SL24-Sätze auf Schreibweisen.

## Ergebnis Wurzel (Aufgabe 10, nur gelesen)

- **Aus TUNICO verknüpfte Wurzeln (1943 Einträge, `wurzel_quelle` beginnt mit `tunico:`):** Die Verknüpfung stimmt überall (alle IDs vorhanden), die Wurzel ist bei 1936 gleich. Die 7 Abweichungen: 4 sind nur Leerzeichen (j y b gegen j-y-b: 1712 jab, 1354 jibt, 1199 njib, 2236 yjib); **3 zeigen auf das falsche TUNICO-Verb tab** („bereuen“, Wurzel t-w-b) statt auf „gar werden“ (t-y-b): 3392 tab, 4778 tibt, 3429 ytib. Aufgabe: Verknüpfung dort korrigieren (nur nach Rückfrage).
- **Nicht aus TUNICO (416):** 59 gleich, 14 anders, 343 ohne exaktes TUNICO-Lemma. Die 14 sind meist bewusste Handarbeit mit vollständigen schwachen Buchstaben (ukht ʔ-kh-w, damm d-m-m, fumm f-w-h, yidd y-d-y, mya m-ʔ-y, nsa n-s-w) und kein Fehler; zu klären bleibt msattak (m-s-t, TUNICO stk) und 7it (7-y-t, TUNICO 7wt, im Arabischen beides möglich). Für die 343 ohne exaktes Lemma müsste man über Formen/Familien gehen.
- **Unsere 291 Verbtabellen:** jede hat genau eine Wurzel, einen Stamm und einen Verbtyp. Das ist in sich stimmig.
- **Einträge ohne Wurzel:** 578 Einzelwörter, davon 186 mit exaktem TUNICO-Lemma samt Wurzel (178 eindeutig). Das sind überwiegend Lehnwörter und Partikel (bnk, vrl, drys, blkn …), für die TUNICO eine Pseudowurzel angibt. Nicht blind übernehmen: erst festlegen, welche Wortarten überhaupt eine Wurzel bekommen (nur echte Wurzelwörter, keine Lehnwörter), dann ergänzen.

## Zusätzliche Entscheidungen von Nils
- Welche Wortarten bekommen eine Wurzel (keine Lehnwörter, keine Partikel)?
- msattak und 7it: Wurzel so lassen oder an TUNICO angleichen?

## Ergebnis Punkt 11–14 (19.11., nur gesammelt, nichts geändert)

**Punkt 11 – Vokalabweichungen Einzelwörter:** Nach Abzug exakter Lemmata, Formen ((pl.)/(f.)/(komp.)) und der th/dh-Schreibung bleiben 35 echte Vokalunterschiede. Fast alle sind durch Ninja/Peace Corps (Audio, vokalisiertes Arabisch) gedeckt, TUNICO ist dort Dialekt-/Schreibvariante; -iyya statt -iya ist unsere Konvention (17.11.). Prüfliste: 998 stu7 (TUNICO sta7; stu7 evtl. Plural), 1005 dhaw (TUNICO thaww); optional 2740 sabnakh/sibnakh, 4294 disar/desar (e→i-Konvention). Genus ist nicht prüfbar (TUNICO hat keins).

**Punkt 12 – Feminin/Plural/Elativ bei Adjektiven:** #adj_f 293 Formen (86 Lemmata bei uns, 23 exakt, 63 fehlen), #adj_pl 303 (98 Lemmata, 31 exakt, 67 fehlen), #adj_elative 19 (14 Lemmata, 10 exakt, 4 fehlen: abann, azyan, arkhas, azghar). Fehlende Feminine meist nur -iya statt -iyya (Notation) und einfache -a-Formen (3ziza, 7zina, bsita, fhima …).

**Punkt 13 – Dual, Einheitsnomen, Instrumentalnomen:** Bei Lemmata, die wir führen: #n_dual 81 Formen (41 Lemmata, 6 exakt, 35 fehlen), #n_unit 136 (44 Lemmata, 12 exakt, 32 fehlen), #n_unit_pl 93 (33 Lemmata, 2 exakt, 31 fehlen), #n_inst 19 / #n_inst_pl 10 (je 3 Lemmata, fast alles fehlt). Beispiele Dual: 3ushrin, 7ajtin, dqiqtin, marrtin, nharayn, shahrin, yumin, nusfin, sub3in. Beispiele Einheitsnomen: 3adsa, 7abba, 7dida, babbusha. Das sind regelmäßige Bildungen (Dual -tin/-in/-ayn), nur lehrreich für wenige häufige Wörter (marrtin, yumin, shahrin, dqiqtin, nharayn). Vorschlag: nur häufige Dualformen als Anmerkung bei der Karte, nicht als eigene Vokabeln.

**Punkt 14 – häufige Korpus-Nomen/Adjektive, die uns fehlen:** Nomen 61 von 300 (239 vorhanden), Adjektive 13 von 64 (51 vorhanden). Davon überwiegend Hochsprache/Politik/Lehnwörter oder Fremdwort-Marker: muzika/musiqa, nahtha, i3tisam (Streik), dustur, mawthu3 (Thema), mashru3 (Projekt), thaqafa (Kultur), mujtama3 (Gesellschaft), program, diplom, makyaj, itha3a (Radio), talfza (Fernseher), sbadri (Sportschuhe), shatt (Strand), dukhkhan (Rauch), bdan (Körper), tarikh (Datum/Geschichte), num (Schlaf), sil3a (Ware), nuqta, qat3a; Adjektive: watani (national), mgarba3 (durchgeknallt), zghayyir. Echte Alltagskandidaten (zuerst fragen: anlegen? fällig?): shatt, dukhkhan, bdan, num, tarikh, talfza, sbadri, qat3a, mawthu3, thaqafa, mgarba3, watani. Erst prüfen, ob sie bei uns unter anderer Schreibung schon stehen (Skelett-Abgleich nutzt nur das erste Wort).

## Ergebnis Punkt 15–16 (20.11., nur gesammelt, nichts geändert)

**Punkt 15 – übrige Wortarten (TUNICO-Lemmata, die uns als Einzelwort fehlen):**
- Adverbien (46 fehlen von 105): u. a. abadan, akid, ams, awwalan, ba3da, dughri, ghudwika, hakatha, hna, jmi3, kharij, qbila, qlil, saba7, tawwika, yalla, yikfi, yumkin, zmanha; Zeitadverbien auf -itha/-ika (3amitha, nharitha, qbilika …) und Hochsprachliches (qanuniyan, yawmiyan, thalithan) eher nicht.
- Fragewörter: ash, kif, lash, mnash, nharash, qaddash, sa3tash, waqtah (ana ist Pronomen). Prüfen: stehen sie schon als Wendung/mit Bindestrich?
- Präpositionen: 7asb, dun, qadd, thidd, 7tha, akhta; Konjunktionen: itha, kif, lakin; Pronomen: ana, inti, intuma, hathaya, hathiya (bei uns vermutlich in anderer Schreibung ana/inti/intuma mit Akzent oder in Phrasen – gegenchecken); Partikeln: illa, mish, za3ma, ay, yilzim, 3jayb, balik; Zahlwörter: khumstash, thnin, tlatha, tlathin, zwayyiz (Schreibweise th/t!).
- Ortsnamen (24 fehlen von 73 exakt-schreibbaren): amrika, baljikya, bariz, bayrut, gabis, gafsa, ifriqya, ingiltra, iran, kanada, lundra, malta, qatar, surya u. a. – bei uns teils anders geschrieben (Amrika/Amriqa, Gabès …). Nicht blind anlegen: erst Schreibweisen vergleichen, Ortsnamen nur wenn Nils sie als Vokabeln will.
- Vorgehen später: je Gruppe Nils fragen (anlegen? fällig?), vorher Skelett-/Wendungsabgleich, damit keine Dubletten entstehen.

**Punkt 16 – Bedeutungen Nomen/Adjektive (Einzelwörter mit exaktem TUNICO-Lemma):** 830 vergleichbar, 663 mit gemeinsamem deutschen Wort, 167 ohne. Fast alles Rauschen: TUNICO-Homographe bei Verbformen (shra „er kaufte“ ↔ „Kaufen“, 3am „er schwamm“ ↔ „Jahr“, mat ↔ Mathe), Synonyme unter 4 Buchstaben (Ohr, Tag) und verschiedene Wörter gleicher Schreibung (7uta Fisch ↔ Bizeps, safra gelb ↔ Reise, qmar Mond ↔ Glücksspiel, bash ↔ Zeltplane). Echte Prüfkandidaten: 1183 qa3da („gerade (f.)“ ↔ TUNICO „feste Regel/Prinzip; Beisammensein“), 1391 aman („Bitte (a...)“ ↔ „Sicherheit/Schutz; Vertrauen“), 1572 nsib („Schwiegervater/Angeheirateter“ ↔ „Schwager“), 2038 qaris („sauer/scharf“ ↔ „Zitronen“), 923 tul („geradeaus“ ↔ „Länge/Größe“, vermutlich Redewendung tul), 583 shqala („Waage“ ↔ „große Schüssel“), 411 tarbusha („Mütze/Hut“ ↔ „Kapuze“). Jeweils Quelle (Ninja/Peace Corps) prüfen, bevor etwas geändert wird.

## Ergebnis Punkt 17–18 (20.11., nur gesammelt, nichts geändert)

**Punkt 17 – TUNICO-Verben außerhalb der Korpus-Top-300:** 1543 Verblemmata, 308 in den Top-300, 1235 außerhalb. Von diesen stehen 444 bei uns (Skelett-Abgleich), 791 fehlen (787 mit Präsensform in TUNICO). Das ist überwiegend Spezialwortschatz (Wollverarbeitung: butar, afinar, batir; Derbes: ba3bas, baznis; Tierlaute: ba3ba3; Fachsprache: 7allil, bannij) neben nützlichem Alltag (3shaq lieben, 7taj brauchen, 7tram respektieren, 7qar verachten, 7sad ernten, 7addid bügeln, 3annaq umarmen, 3attal aufhalten, blugh Pubertät, ayyis verzweifeln). Zuerst die mit PC/Ninja-Beleg (siehe Punkt 18) vorschlagen, je Gruppe fragen: anlegen? fällig?

**Punkt 18 – Peace Corps / Ninja gegen unseren Bestand (Skelett):**
- Ninja: Nomen 7157 (2428 bei uns), Verben 3878 (785), Adjektive 1866 (570), Adverbien 162 (71), Präpositionen 32 (24), Pronomen 20 (17), Zahlwörter 18 (17), Wendungen (PHR) 2683 (114 bei uns, bewusst kaum geführt).
- Peace Corps: Verben 1711 (869 bei uns), Nomen m/f zusammen ca. 1430 (rund 800 bei uns), Adjektive ca. 570 (ca. 310), Adverbien 156 (92), Präpositionen 53 (45).
- Verben, die uns fehlen, aber in Peace Corps oder Ninja stehen: 3147 Skelette; in allen drei Quellen (TUNICO, PC, Ninja) 307, in zwei Quellen 512. Die 307 sind die besten Kandidaten (mehrfach belegt). Hinweis: PC führt englische Stichwörter (ADMIRE (to) …), Zuordnung über Skelett, daher vor dem Anlegen Handprüfung.
- Praktisch: eine gestufte Anlegeliste bauen (3 Quellen → 2 Quellen → 1), nach Häufigkeit/Alltag sortiert, Nils je Stufe entscheiden lassen.
