#!/usr/bin/env python3
"""Sichert alle Audios von Derja Ninja und Sprachenlernen24 (SL24).

Ablauf: Adressliste aus Supabase (Ansicht audio_sicherung_liste, nur lesen) ->
Pakete zu je BATCH Dateien -> jedes Paket wird heruntergeladen, als .tar im
Zielordner abgelegt und lokal wieder geloescht. Bereits fertige Pakete werden
uebersprungen: nach einem Abbruch einfach noch einmal starten.

Aufruf:  python3 audio_sichern.py ZIELORDNER [--test N] [--minuten M]
  --test N     nur N Dateien je Quelle (Probelauf, eigener Unterordner test_)
  --minuten M  nach M Minuten sauber aufhoeren (z. B. fuer Colab)
  --mit-extra  auch die "Extra-Audios" laden (ca. 23.200 Dateien, auch die 348 unter sprachenlernen24-onlinekurs.de/Extra-Audios). Ohne diesen
               Schalter werden sie weggelassen: die Dateien tragen keine Verlagskennzeichnung,
               wurden erst im Oktober 2026 neu erzeugt (vermutlich Computerstimmen) und klingen
               auffaellig. Die normalen SL24-Aufnahmen und Derja Ninja werden immer geladen.
"""
import csv, io, json, os, shutil, sys, tarfile, tempfile, time, urllib.request
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import urlparse

SB = "https://lzecflvfalxkodytnwzf.supabase.co/rest/v1/audio_sicherung_liste"
ANON = ("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6ZWNmbHZmYWx4a29keXRud3pmIiwicm9sZSI6ImFub24i"
        "LCJpYXQiOjE3NzczOTkyNjAsImV4cCI6MjA5Mjk3NTI2MH0.GdZ1KgiA8DxHan5neKnDNasO96dQxGg_PqbMIsHxOtk")  # oeffentlicher anon-Key des Trainers
BATCH = 1000
WORKERS = 3
PAUSE = 0.15  # Sekunden je Anfrage und Worker, um die Server zu schonen
TIMEOUT = 30  # Sekunden je Anfrage
WARTEN = (2, 5, 10, 20, 40)  # Pausen vor dem 2. bis 6. Versuch
ENDGUELTIG = ('http403', 'http404', 'http410')  # fehlt bei der Quelle selbst: wird nicht wiederholt
COLS = ["quelle", "bereich", "ref", "url", "arabisch", "umschrift", "deutsch_engl",
        "lektion", "t_start", "t_end", "ex_start", "ex_end"]


def holen():
    zeilen, off = [], 0
    while True:
        r = urllib.request.Request(
            f"{SB}?select={','.join(COLS)}&order=url&limit=1000&offset={off}",
            headers={"apikey": ANON, "Authorization": "Bearer " + ANON})
        d = json.load(urllib.request.urlopen(r, timeout=60))
        zeilen += d
        if len(d) < 1000:
            return zeilen
        off += 1000


def lokaler_pfad(url):
    p = urlparse(url)
    name = os.path.basename(p.path)
    if "derjaninja" in p.netloc:
        return "ninja/" + name
    if "17min.io" in p.netloc:
        return "sl24_extra_17min/" + name
    teile = p.path.strip("/").split("/")
    if "Extra-Audios" in teile:
        return "sl24_extra/" + name
    return "sl24_kurs/" + teile[-2] + "_" + name  # Kursordner im Dateinamen


def laden(url, ziel, wartezeiten=WARTEN, timeout=TIMEOUT):
    for versuch in range(len(wartezeiten) + 1):
        try:
            time.sleep(PAUSE)
            with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"}), timeout=timeout) as r:
                daten = r.read()
            if not daten:
                raise IOError("leer")
            os.makedirs(os.path.dirname(ziel), exist_ok=True)
            with open(ziel, "wb") as f:
                f.write(daten)
            return "ok", len(daten)
        except urllib.error.HTTPError as e:
            if e.code in (403, 404, 410):
                return f"http{e.code}", 0
            status = f"http{e.code}"
        except Exception as e:
            status = type(e).__name__
        if versuch < len(wartezeiten):
            time.sleep(wartezeiten[versuch])
    return status, 0


def main():
    a = sys.argv[1:]
    if not a:
        sys.exit(__doc__)
    ziel = a[0]
    test = int(a[a.index("--test") + 1]) if "--test" in a else 0
    mit_extra = "--mit-extra" in a
    ende = time.time() + 60 * float(a[a.index("--minuten") + 1]) if "--minuten" in a else None
    if test:
        ziel = os.path.join(ziel, "test_")
    os.makedirs(ziel, exist_ok=True)

    zeilen = holen()
    print(f"{len(zeilen)} Zeilen aus der Datenbank")
    je_url = {}
    for z in zeilen:
        if z["url"]:
            je_url.setdefault(z["url"], []).append(z)
    urls = sorted(je_url)
    if not mit_extra:
        n0 = len(urls)
        urls = [u for u in urls if "Extra-Audios" not in u]
        print(f"{n0 - len(urls)} Extra-Audios uebersprungen, mit --mit-extra laden")
    if test:
        gesehen, auswahl = {}, []
        for u in urls:
            q = lokaler_pfad(u).split("/")[0]
            if gesehen.get(q, 0) < test:
                gesehen[q] = gesehen.get(q, 0) + 1
                auswahl.append(u)
        urls = auswahl
    print(f"{len(urls)} verschiedene Dateien")

    # Liste (Manifest) zuerst schreiben: sie erklaert jede Datei
    mani = os.path.join(ziel, "manifest.csv")
    with open(mani + ".tmp", "w", newline="", encoding="utf-8-sig") as f:
        w = csv.writer(f)
        w.writerow(["paket", "datei", "quelle", "bereich", "arabisch", "umschrift", "deutsch_oder_englisch",
                    "lektion", "start_s", "ende_s", "beispiel_start_s", "beispiel_ende_s", "ursprungs_url", "weitere_zeilen"])
        for i, u in enumerate(urls):
            z = je_url[u][0]
            w.writerow([i // BATCH + 1, lokaler_pfad(u), z["quelle"], z["bereich"], z["arabisch"], z["umschrift"],
                        z["deutsch_engl"], z["lektion"], z["t_start"], z["t_end"], z["ex_start"], z["ex_end"], u, len(je_url[u]) - 1])
    os.replace(mani + ".tmp", mani)

    fehler, gesamt, unvollstaendig = [], 0, []
    for b in range(0, len(urls), BATCH):
        nr = b // BATCH + 1
        tar = os.path.join(ziel, f"paket_{nr:03d}.tar")
        if os.path.exists(tar):
            continue
        if ende and time.time() > ende:
            print("Zeitlimit erreicht, bitte erneut starten."); break
        teil = urls[b:b + BATCH]
        tmp = tempfile.mkdtemp(prefix="audio_")
        try:
            pfade = [os.path.join(tmp, lokaler_pfad(u)) for u in teil]
            with ThreadPoolExecutor(WORKERS) as ex:
                res = []
                for i, r in enumerate(ex.map(laden, teil, pfade), 1):
                    res.append(r)
                    if i % 200 == 0:
                        print(f"  Paket {nr}: {i}/{len(teil)} ...", flush=True)
            # zweiter Durchgang fuer voruebergehende Fehler (Zeitueberschreitung, 5xx): einzeln, mit langen Pausen
            offen = [i for i, (st, _) in enumerate(res) if st != "ok" and st not in ENDGUELTIG]
            if offen:
                print(f"  Paket {nr}: {len(offen)} Dateien erneut versuchen (einzeln, langsam) ...", flush=True)
                for i in offen:
                    time.sleep(3)
                    res[i] = laden(teil[i], pfade[i], wartezeiten=(10, 30, 60), timeout=60)
                offen = [i for i, (st, _) in enumerate(res) if st != "ok" and st not in ENDGUELTIG]
            if offen:
                # Paket NICHT abschliessen: ein spaeterer Lauf versucht es noch einmal (sonst fehlten die Dateien fuer immer)
                print(f"Paket {nr} unvollstaendig ({len(offen)} Dateien vorerst nicht ladbar), uebersprungen; spaeter erneut starten.", flush=True)
                unvollstaendig.append(nr)
                continue
            for u, (s, n) in zip(teil, res):
                if s != "ok":
                    fehler.append((u, s))
                gesamt += n
            with tarfile.open(tar + ".tmp", "w") as t:
                for p in pfade:
                    if os.path.exists(p):
                        t.add(p, arcname=os.path.relpath(p, tmp))
            os.replace(tar + ".tmp", tar)
            print(f"Paket {nr}/{(len(urls) + BATCH - 1) // BATCH} fertig, {sum(1 for r in res if r[0] == 'ok')}/{len(teil)} Dateien, {gesamt / 1e6:.0f} MB")
        finally:
            shutil.rmtree(tmp, ignore_errors=True)
    if fehler:
        with open(os.path.join(ziel, f"fehler_{int(time.time())}.txt"), "w") as f:
            f.write("\n".join(f"{s}\t{u}" for u, s in fehler))
        print(f"{len(fehler)} Dateien nicht ladbar (siehe fehler_*.txt)")
    if unvollstaendig:
        print(f"Pakete {unvollstaendig} sind noch unvollstaendig: Zelle noch einmal starten (am besten etwas spaeter).")
    else:
        print("Fertig." if not ende or time.time() < ende else "Unterbrochen.")


if __name__ == "__main__":
    main()
