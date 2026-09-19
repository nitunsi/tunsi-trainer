-- P3b -- quellen_lemmata um Peace Corps und Derja Ninja erweitert
-- Projekt: lzecflvfalxkodytnwzf (tunsi-trainer / Supabase), angewandt am 2026-09-18
-- Plan: exports/plan_quellenabgleich_2026-09-16.md, Abschnitt "P3b".
--
-- HERKUNFT DES TUNICO-BLOCKS: woertlich aus exports/migration_p3a_2026-09-17.sql
-- uebernommen (per Skript extrahiert, nicht abgetippt -- Lehre aus P1, wo die
-- 14.700 Zeichen von qualitaets_checks ebenfalls maschinell transportiert wurden).
-- Dass er unveraendert ist, wird nicht behauptet, sondern geprueft: die 2.005
-- TUNICO-Zeilen haben vor der Migration die Pruefsumme
--   md5(string_agg(t::text,'|' order by lemma)) = bc65a059f3dddd3251314ac482cb8d29
-- und muessen sie danach unveraendert haben.
--
-- Postgres kann eine Materialized View nicht per CREATE OR REPLACE aendern, also
-- DROP + CREATE. Index und Grants gehen dabei verloren und werden unten identisch
-- neu gesetzt.
--
-- ===================== ENTSCHEIDUNGEN, GEMESSEN STATT GERATEN =====================
--
-- PEACE CORPS (peacecorps_dict_import, 5.070 Zeilen, 5.004 mit forms_chatalpha)
--
-- * Welche Form ist das Lemma? forms_chatalpha ist nach IMPORTS.md die Formenliste
--   EINES Eintrags (Sg./Pl., m./f., Imperativ/Perfekt). is_synonym_set unterscheidet:
--     false (4.744 Zeilen, davon 2.601 mit mehr als einer Form) = grammatische
--       Varianten derselben Vokabel -> NUR forms_chatalpha[1] ist das Lemma, alles
--       weitere ist eine Flexionsform und keine eigene Vokabel.
--     true (326 Zeilen, davon 182 mit mehr als einer Form) = echte unabhaengige
--       Synonyme -> JEDE Form ist ein eigenes Lemma, sonst gingen 182 echte Woerter
--       verloren.
--   Ergibt 5.216 Formzeilen -> 4.043 distinkte Lemmata nach Dedup.
--
-- * rang_pc aus freq. IMPORTS.md sagt 1-5 (1 = wichtigstes). Gemessen: 4.643 Zeilen
--   mit gueltigem Wert, 566 mit NULL -- und ZWEI Zeilen mit 6 bzw. 7 (beide Headword
--   "LINE"). Das sind erkennbar Sinn-Nummern aus einem mehrdeutigen Eintrag, kein
--   Haeufigkeitsrang. Deshalb: rang_pc nur fuer freq BETWEEN 1 AND 5, sonst NULL --
--   lieber kein Rang als ein falscher, der im spaeteren Score mitrechnet.
--   Bei mehreren Eintraegen zu demselben Lemma gewinnt der BESTE (kleinste) Rang.
--
-- * arabisch bleibt fuer Peace Corps NULL. arabic_script ist in ALLEN 5.070 Zeilen
--   leer (gemessen, nicht angenommen) -- bewusst so importiert, weil das OCR zu
--   fehleranfaellig war. Es gibt nur arabic_script_reconstructed (4.907 Zeilen), und
--   das ist laut PRECEDENTS.md ausdruecklich KEIN Faktum, sondern ein aus der
--   Lautschrift abgeleiteter Vorschlag. Eine Rekonstruktion in dieselbe Spalte zu
--   schreiben wie Ninjas echtes Arabisch wuerde genau die Unterscheidung einebnen,
--   auf der die ganze Beleglogik des Trainers beruht. Wer sie braucht, kommt ueber
--   quell_id an sie heran.
--
-- * gloss_de bleibt NULL -- Peace Corps ist ein Englisch-Tunesisch-Woerterbuch und
--   hat keine deutsche Glosse. Nicht erfinden. gloss_en ist das headword.
--
-- * Wortart aus pos: dotted notation ("n.m", "adj.m.sg", "n.m.coll"), der Kopf vor
--   dem ersten Punkt traegt die Wortklasse. 719 der 5.216 Formzeilen bleiben unklar.
--   Die nicht abgebildeten Koepfe wurden einzeln angesehen; sie zerfallen in zwei
--   Gruppen, und beide gehoeren zu Recht auf 'unklar':
--     - echte Mehrdeutigkeit mit Schraegstrich: adj/adv, adv/adj, n/adj, prep/adv
--     - reine Genus-/Numerus-Angabe ohne Wortklasse: m, f, sg, pl, coll
--       (daraus "also Nomen" zu schliessen waere geraten, nicht gelesen)
--   Ergaenzt wurden nur die Pronomen (pron, possessive pronoun, possessive adj) ->
--   Partikel/Funktionswort, analog zur P3a-Buendelung. "adj.n.m" (5 Zeilen) nimmt
--   den Kopf "adj".
--
-- DERJA NINJA (derja_ninja_entries, 17.335 Zeilen)
--
-- * Welches Feld ist das Lemma? NICHT darija -- das ist Ninjas eigene
--   Transliterationskonvention und laut IMPORTS.md nie 1:1 zu uebernehmen
--   (jaych, 2ch3andiy fiyh, t3amma9). Die Tabelle hat aber eine chatalpha-Spalte in
--   UNSERER Konvention (16.577 von 17.335 befuellt): jaysh, ash3andi fih, t3ammaq.
--   Das ist das Lemma. Die 758 Zeilen ohne chatalpha fallen weg -- ohne Lemma in
--   unserer Konvention ist der Eintrag fuer einen Abgleich wertlos.
--   16.577 Zeilen -> 16.308 distinkte Lemmata (264 Lemmata kommen mehrfach vor).
--
-- * arabisch kommt HIER echt: alle 16.577 Zeilen haben arabic_script, und Ninja ist
--   laut SKILL.md die einzige zuverlaessig vokalisierte Arabisch-Quelle ueberhaupt
--   (TUNICO hat gar keine Arabisch-Spalte, Peace Corps nur Rekonstruktionen).
--   Das ist der eigentliche Wert dieses Zweigs.
--
-- * audio_url: 16.218 der 16.308 Lemmata haben Audio. Das ist die "Anlege-Reife"-
--   Achse des spaeteren Scores. Bei mehreren Zeilen je Lemma wird deterministisch
--   die mit Audio bevorzugt, danach die kleinste id -- damit ein Lemma nie zufaellig
--   die audiolose Variante erwischt.
--
-- * Wortart aus pos_tag ((N)/(V)/(ADJ)/...). (PHR) = Phrase ist KEINE Wortart,
--   sondern eine Laengenangabe -> 'unklar', nicht etwa eine eigene Klasse.
--   Zusammen mit den NULL-Werten bleiben 3.968 der 16.577 Zeilen unklar.
--
-- * freq_korpus bleibt fuer beide neuen Quellen NULL -- das ist TUNICOs Korpuszaehlung
--   und hat bei einem Woerterbuch keine Entsprechung. Ebenso ist freq_ist_obergrenze
--   fuer beide false (es gibt keine Buendel) und ist_toponym false (keine der beiden
--   Quellen markiert Toponyme).
--
-- Aggregation ohne korrelierte Subqueries (reines GROUP BY), damit der REFRESH nicht
-- in die Groessenordnung laeuft, vor der der Plan bei P3a gewarnt hat.

DROP MATERIALIZED VIEW public.quellen_lemmata;

CREATE MATERIALIZED VIEW public.quellen_lemmata AS
WITH tunico_pos_split AS (
  SELECT
    w.id, w.frequency, w.lemma_chatalpha, w.pos,
    string_to_array(w.lemma_chatalpha, '|') AS lemma_arr,
    array_length(string_to_array(w.lemma_chatalpha, '|'), 1) AS n_lemma,
    string_to_array(w.pos, ' ') AS pos_arr_raw,
    array_length(string_to_array(w.pos, ' '), 1) AS n_pos_raw
  FROM public.tunico_corpus_wordforms w
),
tunico_exploded AS (
  -- Fall 1: Positionsgleich -- deckt normale Buendel UND den Trivialfall "1 Lemma,
  -- 1 pos-Wert" ab (282 von 283 Buendeln + praktisch alle unbebuendelten Zeilen).
  -- Leere Buendel-Segmente (fuehrendes/doppeltes "|") werden unten (tunico_gefiltert)
  -- verworfen, ihr pos-Platzhalter (Leerstring an derselben Position) faellt damit
  -- automatisch mit weg.
  SELECT s.id AS quell_row_id, s.frequency, (s.n_lemma > 1) AS aus_mehrgliedrigem_buendel,
    btrim(s.lemma_arr[g.ord]) AS lemma_part,
    nullif(btrim(s.pos_arr_raw[g.ord]), '') AS pos_part
  FROM tunico_pos_split s, LATERAL generate_series(1, s.n_lemma) AS g(ord)
  WHERE s.n_lemma = s.n_pos_raw
  UNION ALL
  -- Fall 2: genau 1 Lemma, aber pos hat eine ANDERE Tokenzahl als 1 (kein pos-Wert,
  -- oder z.B. "adverb adjective" fuer das einzelne Lemma "qrib") -- alle pos-Token
  -- gelten als Kandidat fuer dieses eine Lemma; ein echter Widerspruch zwischen den
  -- Kandidaten wird unten (tunico_wortart) wie eine Buendel-interne Wiederholung
  -- behandelt und ergibt wortart='unklar', kein stillschweigendes Verwerfen.
  SELECT s.id, s.frequency, false,
    btrim(s.lemma_arr[1]),
    nullif(btrim(s.pos_arr_raw[p.ord]), '')
  FROM tunico_pos_split s, LATERAL generate_series(1, GREATEST(s.n_pos_raw,1)) AS p(ord)
  WHERE s.n_lemma = 1 AND s.n_lemma <> COALESCE(s.n_pos_raw,-1)
  UNION ALL
  -- Fall 3: mehrere Lemmata, aber genau 1 pos-Wert -> an alle Lemmata desselben
  -- Buendels ausstrahlen (der einzige gemessene Fall: id 2058, "3ayyit|3ayyif" / "verb").
  SELECT s.id, s.frequency, true,
    btrim(s.lemma_arr[g.ord]),
    nullif(btrim(s.pos), '')
  FROM tunico_pos_split s, LATERAL generate_series(1, s.n_lemma) AS g(ord)
  WHERE s.n_lemma > 1 AND s.n_lemma <> s.n_pos_raw AND s.n_pos_raw = 1
  UNION ALL
  -- Fall 4 (Sicherheitsnetz, misst 0 Zeilen im aktuellen Bestand): mehrere Lemmata,
  -- Tokenzahl passt nicht und ist auch nicht 1 -> keine verlaessliche Positions-
  -- zuordnung moeglich, pos bleibt NULL (-> wortart 'unklar' statt Ratewert).
  SELECT s.id, s.frequency, true,
    btrim(s.lemma_arr[g.ord]),
    NULL::text
  FROM tunico_pos_split s, LATERAL generate_series(1, s.n_lemma) AS g(ord)
  WHERE s.n_lemma > 1 AND s.n_lemma <> s.n_pos_raw AND (s.n_pos_raw IS NULL OR s.n_pos_raw <> 1)
),
tunico_gefiltert AS (
  -- leere Buendel-Slots und Klitika (Praefix-/Suffix-Bindestrich: "-kum", "l-",
  -- "ra-", "b-", "fi-", "il-", "ma-", "ti-", "w-", "wa7d-", "b3ath-", "-ha", "-hum",
  -- "-i", "-ik", "-na", "-u", "dakhil ba3th-" -- vollstaendige Liste, geprueft vor
  -- dieser Migration) verwerfen. Klitika sind KEIN Fehler in der Quelle, sondern
  -- gebundene Morpheme, die TUNICO im selben Buendel wie die zugehoerige Vollform
  -- fuehrt -- keine eigenstaendige Trainer-Vokabel.
  SELECT * FROM tunico_exploded
  WHERE lemma_part <> '' AND lemma_part !~ '^-' AND lemma_part !~ '-$'
),
tunico_klassifiziert AS (
  -- Wortart-Mapping: sichtbare Regel statt CASE-Wust im Vorschlag. Alle 30 nach dem
  -- Positions-Split beobachteten pos-Einzeltoken sind unten aufgefuehrt (gegengeprueft:
  -- 0 nicht abgebildete Nicht-NULL-Tokens im aktuellen Bestand); was nicht in dieser
  -- Liste steht (inkl. kein pos-Wert oder Wortart-Widerspruch, siehe tunico_wortart)
  -- bleibt 'unklar'. Entscheidungen, die nicht selbsterklaerend sind:
  --   * activeParticiple/passiveParticiple/participle/elative -> Adjektiv (Partizipien
  --     und der Elativ funktionieren im Tunesischen ueberwiegend attributiv/adjektivisch;
  --     eine eigene Trainer-Klasse "Partizip" haette die Klassenzahl unnoetig erhoeht)
  --   * pluralNoun/collectiveNoun/dualNoun -> Nomen (Numerus ist keine eigene Wortart)
  --   * ordinal -> Numerale (Ordinalzahl ist eine Numerale-Unterart)
  --   * properNoun/toponym -> Eigenname (toponym zusaetzlich separat geflaggt, s.u.)
  --   * definiteArticle/indefinite/alle Pronomen-Varianten/preposition/conjunction/
  --     particle/interrogative/responseParticle/vocativeParticle -> Partikel/
  --     Funktionswort (geschlossene Klasse grammatischer Funktionswoerter, analog zur
  --     Buendelung im Plan-Text)
  SELECT *,
    CASE pos_part
      WHEN 'verb' THEN 'Verb' WHEN 'noun' THEN 'Nomen' WHEN 'pluralNoun' THEN 'Nomen'
      WHEN 'collectiveNoun' THEN 'Nomen' WHEN 'dualNoun' THEN 'Nomen'
      WHEN 'properNoun' THEN 'Eigenname' WHEN 'toponym' THEN 'Eigenname'
      WHEN 'adjective' THEN 'Adjektiv' WHEN 'activeParticiple' THEN 'Adjektiv'
      WHEN 'passiveParticiple' THEN 'Adjektiv' WHEN 'participle' THEN 'Adjektiv'
      WHEN 'elative' THEN 'Adjektiv' WHEN 'adverb' THEN 'Adverb'
      WHEN 'numeral' THEN 'Numerale' WHEN 'ordinal' THEN 'Numerale'
      WHEN 'interjection' THEN 'Interjektion'
      WHEN 'preposition' THEN 'Partikel/Funktionswort' WHEN 'conjunction' THEN 'Partikel/Funktionswort'
      WHEN 'particle' THEN 'Partikel/Funktionswort' WHEN 'interrogative' THEN 'Partikel/Funktionswort'
      WHEN 'definiteArticle' THEN 'Partikel/Funktionswort' WHEN 'indefinite' THEN 'Partikel/Funktionswort'
      WHEN 'demonstrativePronoun' THEN 'Partikel/Funktionswort' WHEN 'personalPronoun' THEN 'Partikel/Funktionswort'
      WHEN 'relativePronoun' THEN 'Partikel/Funktionswort' WHEN 'pronoun' THEN 'Partikel/Funktionswort'
      WHEN 'pronominalSuffix' THEN 'Partikel/Funktionswort' WHEN 'responseParticle' THEN 'Partikel/Funktionswort'
      WHEN 'vocativeParticle' THEN 'Partikel/Funktionswort' WHEN 'pluralDemonstrative' THEN 'Partikel/Funktionswort'
      ELSE NULL
    END AS wortart_kandidat,
    (pos_part = 'toponym') AS ist_toponym_kandidat
  FROM tunico_gefiltert
),
tunico_je_zeile_lemma AS (
  -- Mehrfachnennung DESSELBEN Lemmas INNERHALB einer Quellzeile (z.B. "wa7id|wa7id|
  -- wa7id", "kif|kif|kif|kif") einmal zaehlen -- sonst wuerde deren freq vervielfacht
  -- statt einmal gezaehlt (siehe Fix 1 oben).
  SELECT quell_row_id, lemma_part, max(frequency) AS frequency,
    bool_or(aus_mehrgliedrigem_buendel) AS aus_mehrgliedrigem_buendel,
    bool_or(ist_toponym_kandidat) AS ist_toponym,
    array_agg(DISTINCT wortart_kandidat) FILTER (WHERE wortart_kandidat IS NOT NULL) AS wortarten
  FROM tunico_klassifiziert GROUP BY quell_row_id, lemma_part
),
tunico_final AS (
  -- freq_korpus: Summe je DISTINKTER Quellzeile (nicht je Buendel-Mitglied, siehe
  -- tunico_je_zeile_lemma) -- verschiedene Quellzeilen sind verschiedene beobachtete
  -- Wortformen desselben Lemmas und daher additiv (Beleg: "ma3nitha" aus 3 Zeilen mit
  -- unterschiedlichem form_chatalpha/form_orig, 434+407+12=853).
  -- freq_ist_obergrenze: true sobald IRGENDEINE beitragende Quellzeile ein Buendel mit
  -- mehr als einem Mitglied war (roh, vor Klitik-/Dedup-Filterung) -- die Frequenz
  -- dieser Zeile war fuer das Lemma nicht exklusiv reserviert (siehe Plan: "kull shayy"
  -- und "7atta shayy" teilen sich 239).
  SELECT lemma_part AS lemma, sum(frequency) AS freq_korpus,
    bool_or(aus_mehrgliedrigem_buendel) AS freq_ist_obergrenze,
    bool_or(ist_toponym) AS ist_toponym, min(quell_row_id) AS quell_id
  FROM tunico_je_zeile_lemma GROUP BY lemma_part
),
tunico_wortart AS (
  -- Getrennt von tunico_final (siehe Fix 1). Genau 1 distinkte Trainer-Klasse unter
  -- allen beitragenden Zeilen/Positionen -> diese Klasse; 0 (kein pos-Wert je erkannt)
  -- oder >1 (echter Widerspruch, z.B. "kif" als Nomen UND Partikel/Funktionswort in
  -- verschiedenen Zeilen) -> 'unklar'.
  SELECT lemma_part AS lemma,
    CASE WHEN count(DISTINCT w) = 1 THEN min(w) ELSE 'unklar' END AS wortart
  FROM tunico_je_zeile_lemma, LATERAL unnest(COALESCE(wortarten, ARRAY[NULL::text])) AS w
  GROUP BY lemma_part
),
tunico_dict_match AS (
  -- Verknuepfung zum Woerterbuch tunico_import: primaer exakt ueber lemma_chatalpha,
  -- NUR falls das leer bleibt Fallback auf translit_skeleton (Skelett-Match kollidiert
  -- zu haeufig fuer einen Primaerschluessel, siehe Messung oben).
  SELECT f.lemma,
    COALESCE(
      (SELECT array_agg(ti.id) FROM public.tunico_import ti WHERE ti.lemma_chatalpha = f.lemma),
      (SELECT array_agg(ti.id) FROM public.tunico_import ti WHERE ti.translit_skeleton = public._translit_skeleton(f.lemma))
    ) AS dict_ids
  FROM tunico_final f
),
tunico_quellen_lemmata AS (
  -- Deutsche/englische Glosse: alle senses->de bzw. ->en ueber ALLE gematchten
  -- tunico_import-Zeilen hinweg flach ziehen, deduplizieren, mit "; " verbinden --
  -- 289 von 2.005 Lemmata haben mehr als einen exakten Woerterbuch-Treffer
  -- (Homographen/Mehrfacheintraege), keiner davon wird verworfen.
  SELECT 'tunico'::text AS quelle, f.quell_id, f.lemma,
    public._translit_skeleton(f.lemma) AS skeleton, f.freq_korpus,
    NULL::integer AS rang_pc, tw.wortart,
    (SELECT string_agg(DISTINCT v, '; ' ORDER BY v) FROM public.tunico_import ti,
       jsonb_array_elements(ti.senses) se, jsonb_array_elements_text(se->'de') v
     WHERE ti.id = ANY(dm.dict_ids)) AS gloss_de,
    (SELECT string_agg(DISTINCT v, '; ' ORDER BY v) FROM public.tunico_import ti,
       jsonb_array_elements(ti.senses) se, jsonb_array_elements_text(se->'en') v
     WHERE ti.id = ANY(dm.dict_ids)) AS gloss_en,
    NULL::text AS arabisch, NULL::text AS audio_url,
    f.ist_toponym, f.freq_ist_obergrenze
  FROM tunico_final f
  JOIN tunico_wortart tw ON tw.lemma = f.lemma
  JOIN tunico_dict_match dm ON dm.lemma = f.lemma
),
-- ======================= PEACE CORPS =======================
peacecorps_formen AS (
  SELECT p.id, p.freq, p.pos, p.headword, btrim(f.form) AS lemma
  FROM public.peacecorps_dict_import p,
       LATERAL unnest(p.forms_chatalpha) WITH ORDINALITY AS f(form, ord)
  WHERE p.forms_chatalpha IS NOT NULL
    AND (p.is_synonym_set OR f.ord = 1)   -- s. Kopfkommentar: Synonymset vs. Flexion
    AND btrim(f.form) <> ''
),
peacecorps_klassifiziert AS (
  SELECT pf.*,
    CASE btrim(lower(split_part(pf.pos, '.', 1)))
      WHEN 'v' THEN 'Verb' WHEN 'n' THEN 'Nomen' WHEN 'adj' THEN 'Adjektiv'
      WHEN 'adv' THEN 'Adverb' WHEN 'prep' THEN 'Partikel/Funktionswort'
      WHEN 'pron' THEN 'Partikel/Funktionswort'
      WHEN 'possessive pronoun' THEN 'Partikel/Funktionswort'
      WHEN 'possessive adj' THEN 'Partikel/Funktionswort'
      WHEN 'num' THEN 'Numerale' WHEN 'interj' THEN 'Interjektion'
      ELSE NULL
    END AS wortart_kandidat
  FROM peacecorps_formen pf
),
peacecorps_wortart AS (
  -- gleiche Regel wie P3a: genau eine distinkte Klasse -> diese, sonst 'unklar'
  SELECT lemma,
    CASE WHEN count(DISTINCT wortart_kandidat) = 1 THEN min(wortart_kandidat) ELSE 'unklar' END AS wortart
  FROM peacecorps_klassifiziert GROUP BY lemma
),
peacecorps_quellen_lemmata AS (
  SELECT 'peacecorps'::text AS quelle, min(pk.id) AS quell_id, pk.lemma,
    public._translit_skeleton(pk.lemma) AS skeleton,
    NULL::integer AS freq_korpus,
    min(pk.freq) FILTER (WHERE pk.freq BETWEEN 1 AND 5) AS rang_pc,
    pw.wortart,
    NULL::text AS gloss_de,
    string_agg(DISTINCT pk.headword, '; ' ORDER BY pk.headword) AS gloss_en,
    NULL::text AS arabisch, NULL::text AS audio_url,
    false AS ist_toponym, false AS freq_ist_obergrenze
  FROM peacecorps_klassifiziert pk
  JOIN peacecorps_wortart pw ON pw.lemma = pk.lemma
  GROUP BY pk.lemma, pw.wortart
),
-- ======================= DERJA NINJA =======================
ninja_basis AS (
  SELECT n.id, btrim(n.chatalpha) AS lemma, n.english, n.arabic_script, n.audio_url,
    CASE n.pos_tag
      WHEN '(N)' THEN 'Nomen' WHEN '(V)' THEN 'Verb' WHEN '(ADJ)' THEN 'Adjektiv'
      WHEN '(ADV)' THEN 'Adverb' WHEN '(NUM)' THEN 'Numerale'
      WHEN '(INTERJ)' THEN 'Interjektion'
      WHEN '(PREP)' THEN 'Partikel/Funktionswort' WHEN '(PRON)' THEN 'Partikel/Funktionswort'
      WHEN '(CONJ)' THEN 'Partikel/Funktionswort' WHEN '(DET)' THEN 'Partikel/Funktionswort'
      ELSE NULL   -- (PHR) = Phrase ist keine Wortart, s. Kopfkommentar
    END AS wortart_kandidat
  FROM public.derja_ninja_entries n
  WHERE n.chatalpha IS NOT NULL AND btrim(n.chatalpha) <> ''
),
ninja_wortart AS (
  SELECT lemma,
    CASE WHEN count(DISTINCT wortart_kandidat) = 1 THEN min(wortart_kandidat) ELSE 'unklar' END AS wortart
  FROM ninja_basis GROUP BY lemma
),
ninja_quellen_lemmata AS (
  SELECT 'ninja'::text AS quelle, min(nb.id) AS quell_id, nb.lemma,
    public._translit_skeleton(nb.lemma) AS skeleton,
    NULL::integer AS freq_korpus, NULL::integer AS rang_pc,
    nw.wortart,
    NULL::text AS gloss_de,
    string_agg(DISTINCT nb.english, '; ' ORDER BY nb.english) AS gloss_en,
    -- deterministisch: Zeile mit Audio bevorzugt, danach kleinste id
    (array_agg(nb.arabic_script ORDER BY (nb.audio_url IS NULL), nb.id))[1] AS arabisch,
    (array_agg(nb.audio_url    ORDER BY (nb.audio_url IS NULL), nb.id))[1] AS audio_url,
    false AS ist_toponym, false AS freq_ist_obergrenze
  FROM ninja_basis nb
  JOIN ninja_wortart nw ON nw.lemma = nb.lemma
  GROUP BY nb.lemma, nw.wortart
)
SELECT * FROM tunico_quellen_lemmata
UNION ALL SELECT * FROM peacecorps_quellen_lemmata
UNION ALL SELECT * FROM ninja_quellen_lemmata
WITH DATA;

CREATE INDEX idx_quellen_lemmata_skeleton ON public.quellen_lemmata USING btree (skeleton);
CREATE INDEX idx_quellen_lemmata_quelle   ON public.quellen_lemmata USING btree (quelle);

-- Rechte identisch zu P3a wiederhergestellt (gehen beim DROP verloren).
ALTER MATERIALIZED VIEW public.quellen_lemmata OWNER TO postgres;
GRANT ALL ON TABLE public.quellen_lemmata TO postgres, anon, authenticated, service_role;
