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
