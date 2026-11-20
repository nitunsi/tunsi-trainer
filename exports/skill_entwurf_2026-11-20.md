# Entwurf für SKILL.md und CLAUDE.md (Punkt 23), 20.11.2026 — noch nicht eingetragen

## 1. SKILL.md: neuer Abschnitt „Neuanlage-Checkliste“ (nach „Fehlende Zielzeilen nachlegen“)

**Neuanlage-Checkliste — bei jeder neu angelegten Vokabel, nicht nur bei Verben (Nils, 2026-11-20).** Beim Anlegen von `shuliqa`/`shwaliq` fehlten Wurzel und Beleg; die Zeile galt danach als „offen“. Vor dem Insert (Vorschlag) und nach dem Insert (Prüfung) abhaken:
1. **Wurzel:** `wurzel`, `wurzel_ar`, `wurzel_quelle` aus TUNICO (`tunico_import.root_chatalpha`, Bedeutung gegenlesen), bei Plural/Feminin „(Form)“ an die Familie. Lehnwort, Pronomen, Fragewort, Partikel, Wortverbindung: `wurzel_quelle = 'keine: Grund'`. Das m eines Partizips ist keine Wurzel (msattak = s-t-k).
2. **Beleg:** `external_confirmed` und `external_confirmed_source` (`tunico`, `ninja`, `peacecorps`), wenn eine Quelle das Wort führt; abgeleitete Formen ohne Beleg bleiben `false`, Vermerk in `internal_note`.
3. **Lehnwort:** `lehnwort` setzen (frz, engl, ital, türk, span, sonst).
4. **Wortfamilie:** gleiche Wurzel schon im Bestand? Passt die Familie? Homonym → `wurzel_gruppe`.
5. **Karte ansehen:** Länge und Klang (ǟ, ā, ī, ū) im Trainer prüfen; Hört Nils k statt q o. Ä., darf die Anzeige nur Vokale ändern (`azGueltig`), Konsonanten gehören in `darija`.
6. **Verben:** Konjugationstabelle, Stamm/Verbtyp und alle Zeilen der Familie (3-Zeilen-Modell).
7. **Plural/Singular/Feminin:** als eigene Zeilen nur auf Nils' Wunsch; Singular nennt den Plural im Deutschen („Pl. …“) nur, wenn keine eigene Zeile folgt.
8. **Fällig?** getrennt fragen (siehe oben); `progress`-Zeile mit `next_review = now() at time zone 'utc'`.
9. **Danach:** Trainer-Prüfungen (Mehr → Prüfungen) auf 0, Eintrag im Log.

## 2. SKILL.md: Quellen-Checkliste (an „Kein Beleg“-Abschnitt, ersetzt die Aufzählung dort)

**Quellen-Checkliste — alle durchgehen, bevor „kein Beleg“ gesagt wird (Nils, 2026-11-19: die zusätzlichen TUNICO-Tabellen wurden mehrfach vergessen).**
- `tunico_import` (Lemma, `senses` mit de/en/fr, `root_chatalpha`, `inflected` mit `ana`-Tags: `#v_pres_sg_p3`, `#v_past_sg_p1`, `#v_imperative_*`, `#n_pl`, `#n_dual`, `#n_unit`, `#n_inst`, `#adj_f`, `#adj_pl`, `#adj_elative`, Partizip-Tags). **Alle Formen eines Eintrags lesen, nicht nur die erste** (TUNICO führt oft zwei Varianten, z. B. `yifra7 / yafra7`).
- `tunico_corpus_verbs`, `_nouns`, `_adjectives`, `_wordforms` (Häufigkeit, Einzelformen mit Lemma; Formen ohne Personenangabe), `tunico_candidates` (nur Hinweis, „fehlt“ unzuverlässig).
- `vocab_lookup` (Ninja, TUNICO, Peace Corps in einer Sicht), `derja_ninja_entries`, `peacecorps_dict_import`, `peacecorps_grammar_import`.
- `sl24_inhalt`, `sl24_import` (SL24).
- `course_lessons.grammar_notes` (Skript).
- Suche über **Bedeutung und Skelett**, th/dh-Schreibung (TUNICO: ض/ظ als th) beachten, Skelett nicht für gebrochene Plurale.
- Die Antwort nennt, welche Quellen gefunden und welche leer waren. Zahlen nie aus den Regeldateien zitieren, immer live ziehen.

## 3. CLAUDE.md: eine Zeile bei „Welche Arbeitsregeln du liest“
- **Neue Vokabel anlegen:** SKILL.md → „Neuanlage-Checkliste“ (Wurzel, Beleg, Lehnwort, Wortfamilie, Karte ansehen) und „Quellen-Checkliste“ (alle TUNICO-Tabellen, Ninja, Peace Corps, SL24, Skript).
- Datum des Snapshots nach Upload der neuen ZIP anpassen.
