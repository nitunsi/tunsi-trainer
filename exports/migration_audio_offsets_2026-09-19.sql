-- Audio-Offsets beim Anlegen ueber den Quellenabgleich (2026-09-19)
--
-- BEFUND (vom Nutzer bemerkt): eine ueber den neuen Screen angelegte Vokabel spielte
-- beim Klick aufs Lautsprechersymbol die KOMPLETTE Ninja-Aufnahme ab statt nur das Wort.
--
-- URSACHE: _qaNeuAnlegen() schrieb ninja_audio_url, aber nicht ninja_audio_start /
-- ninja_audio_end. Ninjas Aufnahmen sind ganze Saetze; das Wort selbst dauert im Schnitt
-- 2,89 s. Der Trainer wertet die Offsets ueberall aus
-- (playVocabAudio(url, event, start, end)) -- ohne sie laeuft die ganze Datei.
-- Alle 17.242 Ninja-Zeilen mit Audio haben term_start/term_end, die Daten waren also da.
--
-- WARUM NICHT IM VIEW: die Offsets werden nur im Moment der Neuanlage gebraucht, nicht
-- fuer die Liste. quellen_lemmata (22.356 Zeilen) dafuer neu zu bauen waere teurer und
-- riskanter als ein gezielter Abruf. Der Trainer holt sie jetzt per
--   derja_ninja_entries?select=term_start,term_end&audio_url=eq.<url>&limit=1
-- Das ist eindeutig: 17.242 Zeilen mit Audio, 17.242 distinkte URLs, keine URL mit
-- abweichenden Offsets (gemessen). Der Treffer ist also genau die Zeile, aus der die
-- URL stammt -- kein Risiko, Sekunden aus einer anderen Aufnahme zu erwischen.
-- Schlaegt der Abruf fehl, wird die Vokabel trotzdem angelegt: Offsets sind ein Plus,
-- kein Muss.
--
-- NACHZUG fuer bereits angelegte Zeilen:

UPDATE vocabulary v
SET ninja_audio_start = n.term_start, ninja_audio_end = n.term_end
FROM derja_ninja_entries n
WHERE v.ninja_audio_url = n.audio_url
  AND v.ninja_audio_url IS NOT NULL
  AND v.ninja_audio_start IS NULL;

-- ERGEBNIS: 1 Zeile (4596 binzart = Bizerta, 1,76-4,44 s).
--
-- ABNAHME: von 1.584 Vokabeln mit Audio haben jetzt 1.583 Offsets. Die eine Ausnahme
-- ist 2334 ri7 "Wind": ihre audio_url (recordings/4122.mp3) kommt in der aktuellen
-- derja_ninja_entries gar nicht mehr vor -- ein Altbestand aus dem abgeloesten
-- derja_ninja_import. Nicht aus den heutigen Quellen nachziehbar, deshalb offen
-- gelassen statt geraten.
