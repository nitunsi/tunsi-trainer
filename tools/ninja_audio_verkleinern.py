#!/usr/bin/env python3
"""Verkleinert den Supabase-Ordner ninja-audio/recordings auf die Dateien, die der Trainer wirklich braucht.

Der Trainer braucht dort nur Aufnahmen mit vocabulary.audio_gain > 1 (WebAudio-Verstaerkung, audioNormPrepare);
alle anderen spielen direkt von Ninja. Alles andere im Ordner ist ueberfluessig.

Sicherheitsnetz:
  * Probelauf ist der Standard: es wird NICHTS geloescht, nur die Liste gezeigt.
  * Geloescht wird nur, was (a) nicht gebraucht wird UND (b) in der Sicherung (manifest.csv im Drive) steht.
  * Zum Loeschen muss LOESCHEN eingetippt werden.
  * Danach wird geprueft, dass alle gebrauchten Dateien noch da sind.

Aufruf (Colab, Drive eingebunden):
  python3 ninja_audio_verkleinern.py MANIFEST.csv            # Probelauf
  python3 ninja_audio_verkleinern.py MANIFEST.csv --loeschen # nach Nachfrage loeschen
Den Service-Key fragt das Skript per getpass ab (Supabase -> Project Settings -> API -> service_role). Er wird nicht gespeichert.
"""
import csv, getpass, json, re, sys, urllib.request

SB = "https://lzecflvfalxkodytnwzf.supabase.co"
BUCKET = "ninja-audio"


def api(key, methode, pfad, daten=None, extra=None):
    h = {"apikey": key, "Authorization": "Bearer " + key, "Content-Type": "application/json"}
    h.update(extra or {})
    req = urllib.request.Request(SB + pfad, method=methode, headers=h,
                                 data=json.dumps(daten).encode() if daten is not None else None)
    with urllib.request.urlopen(req, timeout=120) as r:
        t = r.read()
    return json.loads(t) if t else None


def gebraucht(key):
    namen, von = set(), 0
    while True:
        z = api(key, "GET", "/rest/v1/vocabulary?select=ninja_audio_url&audio_gain=gt.1&ninja_audio_url=not.is.null",
                extra={"Range-Unit": "items", "Range": f"{von}-{von + 999}"})
        for r in z:
            m = re.search(r"/recordings/([0-9]+\.mp3)$", r["ninja_audio_url"] or "")
            if m:
                namen.add(m.group(1))
        if len(z) < 1000:
            return namen
        von += 1000


def im_bucket(key):
    namen, offset = {}, 0
    while True:
        z = api(key, "POST", f"/storage/v1/object/list/{BUCKET}",
                {"prefix": "recordings", "limit": 1000, "offset": offset, "sortBy": {"column": "name", "order": "asc"}})
        for o in z:
            if o.get("name") and o.get("id"):
                namen[o["name"]] = (o.get("metadata") or {}).get("size", 0)
        if len(z) < 1000:
            return namen
        offset += 1000


def main():
    if len(sys.argv) < 2:
        print(__doc__); return
    loeschen = "--loeschen" in sys.argv
    key = getpass.getpass("service_role-Key: ").strip()
    sicher = set()
    with open(sys.argv[1], encoding="utf-8-sig") as f:
        for r in csv.DictReader(f):
            if r["datei"].startswith("ninja/"):
                sicher.add(r["datei"][len("ninja/"):])
    print(len(sicher), "Ninja-Dateien in der Sicherung")
    brauch = gebraucht(key)
    bucket = im_bucket(key)
    print(len(brauch), "Dateien gebraucht (audio_gain > 1) |", len(bucket), "Dateien im Ordner")
    fehlt = sorted(n for n in brauch if n not in bucket)
    if fehlt:
        print("Gebraucht, aber nicht im Ordner (Trainer faellt auf Ninja zurueck):", fehlt)
    ueber = sorted(n for n in bucket if n not in brauch)
    nicht_gesichert = [n for n in ueber if n not in sicher]
    loeschbar = [n for n in ueber if n in sicher]
    mb = sum(int(bucket[n] or 0) for n in loeschbar) / 1e6
    print(f"Ueberfluessig: {len(ueber)} | davon in der Sicherung: {len(loeschbar)} ({mb:.0f} MB) | NICHT gesichert: {len(nicht_gesichert)}")
    if nicht_gesichert:
        print("Werden NICHT geloescht:", nicht_gesichert[:20])
    print("Beispiele:", loeschbar[:10])
    if not loeschen:
        print("Probelauf, nichts geloescht. Zum Loeschen mit --loeschen starten."); return
    if input(f"{len(loeschbar)} Dateien wirklich loeschen? Zum Bestaetigen LOESCHEN eintippen: ").strip() != "LOESCHEN":
        print("Abgebrochen."); return
    for i in range(0, len(loeschbar), 100):
        api(key, "DELETE", f"/storage/v1/object/{BUCKET}", {"prefixes": ["recordings/" + n for n in loeschbar[i:i + 100]]})
        print(f"  {min(i + 100, len(loeschbar))}/{len(loeschbar)} geloescht", flush=True)
    rest = im_bucket(key)
    weg = [n for n in brauch if n in bucket and n not in rest]
    print("Danach im Ordner:", len(rest), "| gebrauchte Dateien verloren:", len(weg), weg[:10])


if __name__ == "__main__":
    main()
