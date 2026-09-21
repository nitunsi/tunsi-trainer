-- vocabulary.english entwirren + zwei Fehler im Quellenabgleich
-- Projekt lzecflvfalxkodytnwzf (tunsi-trainer / Supabase), 2026-09-21
--
-- ANLASS (Nutzerbericht): "kima" ueber den Quellenabgleich angelegt, danach in der
-- Vokabelkarte den Cross-Source-Abgleich laufen lassen -- null Treffer. Obwohl der
-- Quellenabgleich das Wort selbst aus Ninja und Peace Corps vorgeschlagen hatte.
--
-- BEFUND: beide Suchachsen gingen daneben, jede aus eigenem Grund.
--   Bedeutung: vocabulary.english stand auf "like, as | SUCH" -- der Quellenabgleich
--     schreibt dort die Glossen ALLER Quellen verkettet. Kein Quellenschluessel sieht
--     so aus, also null Treffer.
--   Skelett:   translit_skeleton ist "km", zwei Zeichen. Die Achse setzt bewusst erst
--     ab Laenge 4 an (kurze Skelette kollidieren zufaellig), lief also gar nicht.
-- Gegenprobe: select count(*) from vocab_lookup where chatalpha='kima'  ->  3
--   (ninja كِيمَا "like, as", peacecorps "such" zweimal)
--
-- Die Oberflaeche meldete damit "keine Treffer", ohne nach diesem Wort gesucht zu haben.
-- Im Code behoben (eigene PR): dritte Achse "exakte Schreibung" (chatalpha=eq.<darija>,
-- unabhaengig von der Skelettlaenge) und ein Hinweis, wenn die Skelettachse uebersprungen
-- wurde. Hier nur die Datenseite.
--
-- =============================================================================
-- vocabulary.english auf einen echten Schluessel kuerzen -- 3 Zeilen
--
-- Das Feld wird in der ganzen App an GENAU EINER Stelle gelesen (showSourceCheck,
-- als english_key). Ein zusammengesetzter Wert macht es dort wertlos.
--
-- "Einfach Segment 1 nehmen" reicht nicht, gemessen:
--   4596 binzart     Segment 1 "Bizerta; Bizerte"                 -> 0 Treffer
--                    Segment 2 "Bizerte (city in northern ...)"   -> 1 Treffer
--   4597 7atta shay  Segment 1 "nothing"                          -> 5 Treffer
--   4604 kima        Segment 1 "like, as"                         -> 1 Treffer
-- Gesetzt wird deshalb das ERSTE Segment, das wirklich ein Schluessel ist -- dieselbe
-- Regel wie im neuen _qaEnglishKey(), damit Fix und Code nicht auseinanderlaufen.

with teile as (
  select v.id, v.english, t.nr, btrim(t.seg) as seg
  from vocabulary v,
       lateral unnest(string_to_array(v.english, '|')) with ordinality as t(seg, nr)
  where v.english like '% | %'
),
treffer as (
  select t.* from teile t
  where exists (select 1 from vocab_lookup l where l.english_key = lower(t.seg))
),
bestes as (
  select distinct on (id) id, seg from treffer order by id, nr
)
update vocabulary v
set english = b.seg,
    internal_note = concat_ws(' ', v.internal_note,
      '2026-09-21: english von "' || v.english || '" auf "' || b.seg || '" gekuerzt. '
      || 'Der Quellenabgleich hatte die Glossen aller Quellen mit " | " verkettet; als '
      || 'english_key fuer den Cross-Source-Abgleich war das unbrauchbar.')
from bestes b
where v.id = b.id and v.english <> b.seg;

-- ERGEBNIS: 3 Zeilen
--   4596 binzart     -> "Bizerte (city in northern Tunisia)"
--   4597 7atta shay  -> "nothing"
--   4604 kima        -> "like, as"
--
-- ABNAHME (gemessen):
--   vocabulary mit " | " im english     0   (vorher 3)
--   kima: Bedeutungstreffer im Lookup   1   (vorher 0)
--   qualitaets_checks Gruppe A          0   (unveraendert)
--   vocabulary                      3.784   (unveraendert; kima hatte der Nutzer angelegt)
