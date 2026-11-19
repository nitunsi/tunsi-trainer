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
