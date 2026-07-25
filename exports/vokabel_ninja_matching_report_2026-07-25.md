# Vokabel-Matching-Report: vocabulary vs. derja_ninja_import (Stand 2026-07-25)

Vollstaendiger Abgleich aller 3193 Eintraege der `vocabulary`-Tabelle gegen die `derja_ninja_import`-Referenzdaten (Supabase-Projekt `lzecflvfalxkodytnwzf`). Nur lesende Zugriffe, keine Aenderungen an Supabase vorgenommen.

## Methodik (angewendete Tiers, in Prioritaet)

1. **Ansatz 1 (Exakter Match)**: Arabisch-Diakritika (harakat/schadda) bei beiden Seiten entfernt, dann Konsonantenskelett verglichen.
2. **Ansatz A (Artikel-Match)**: zusaetzlich fuehrenden Artikel `ال` vor dem Vergleich entfernt.
3. **Ansatz G (Normalisierter Match)**: zusaetzlich Hamza-Varianten (أ/إ/آ/ء/ؤ/ئ), ta-marbuta (ة) und alif maqsura (ى) auf einheitliche Buchstaben abgebildet.

Diese drei Tiers sind hochpraezise (direkte/normalisierte Schreibweisen-Uebereinstimmung). Nicht enthalten sind die in der Session zusaetzlich getesteten, aber unsichereren/fuzzy Verfahren (Ansatz B/C/D/E: Zeichen-Diff-Matching, Ansatz F: Phrasen-Tokenisierung, Ansatz 2: Deutsch-Englisch-Uebersetzungsabgleich) - diese lieferten insgesamt niedrigere Praezision und wurden nicht in diese Vollabdeckung uebernommen. Bei Bedarf kann dafuer ein separater Zusatz-Report erstellt werden.

## Ergebnis-Uebersicht

| Kategorie | Anzahl |
|---|---|
| Ansatz 1: Exakter Match | 530 |
| Ansatz A: Match nach Artikel-Entfernung | 45 |
| Ansatz G: Match nach Hamza-/Ta-Marbuta-Normalisierung | 13 |
| Kein Match gefunden | 2605 |
| **Gesamt** | **3193** |

**Wichtiger Hinweis:** Ein signifikanter, bisher nicht quantifizierter Teil der 2605 "Kein Match"-Eintraege ist vermutlich kein echter Vokabelfehler, sondern beruht darauf, dass die lokale `derja_ninja_import`-Kopie gegenueber der aktuellen Live-Seite derja.ninja unvollstaendig ist (siehe `ninja_analyse_zusammenfassung_2026-07-25.md`, bestaetigt an den Beispielen "Institut"/معهد, "Baer"/دب, "Koch"/طباخ). Ein "Kein Match" bedeutet also nicht automatisch "unsere Vokalisierung ist falsch".

Die Match-Spalte zeigt nur, WAS gefunden wurde - keine linguistische Bewertung (Maß-I/II-Falle, Homographen-Pruefung, Schadda-Gueltigkeit etc. gemaess tunsi-Skill) wurde hier bereits vorgenommen. Das ist der naechste Schritt fuer die matched Eintraege.

## Vollstaendige Tabelle (alle 3193 Eintraege)

| id | Deutsch | Englisch | Unser arabic_script | Ninja-Match | Kommentar |
|---|---|---|---|---|---|
| 246 | Hallo |  | عَاسْلَامَة |  | Kein Match gefunden |
| 247 | Friede sei mit euch |  | السلام عليكم |  | Kein Match gefunden |
| 248 | Guten Morgen |  | صَبَاح الخِير |  | Kein Match gefunden |
| 249 | Guten Abend |  | مَسَّاك بِالخِير |  | Kein Match gefunden |
| 250 | Auf Wiedersehen |  | بِالسَّلَامَة |  | Kein Match gefunden |
| 251 | Wie geht es dir? |  | شْنُو حْوَالِيك؟ |  | Kein Match gefunden |
| 252 | Gut / Wie gehts (Zustand) |  | لْبَاس |  | Kein Match gefunden |
| 253 | Gott sei Dank |  | الحَمْدُ لِلَّه |  | Kein Match gefunden |
| 254 | Tisch |  | طَاوْلَة | طَاوْلَة | Ansatz 1: Exakter Konsonanten-Match |
| 255 | Buch |  | كِتَاب | كْتَابْ | Ansatz 1: Exakter Konsonanten-Match |
| 256 | Stift |  | قَلَم | قَلِّمْ | Ansatz 1: Exakter Konsonanten-Match |
| 257 | Stuhl |  | كُرْسِي | كُرْسِي | Ansatz 1: Exakter Konsonanten-Match |
| 258 | Übung |  | تَمْرِين |  | Kein Match gefunden |
| 259 | eins  / 1 |  | وَاحِد | وَاحِدْ | Ansatz 1: Exakter Konsonanten-Match |
| 260 | zwei / 2 |  | زُوز |  | Kein Match gefunden |
| 261 | drei / 3 |  | ثْلَاثَة | ثْلَاثَة | Ansatz 1: Exakter Konsonanten-Match |
| 262 | vier / 4 |  | أَرْبَعَة | أرْبْعَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 263 | fünf / 5 |  | خَمْسَة | خَمْسَة | Ansatz 1: Exakter Konsonanten-Match |
| 264 | sechs / 6 |  | سِتَّة | سِتَّة | Ansatz 1: Exakter Konsonanten-Match |
| 265 | sieben / 7 |  | سَبْعَة | سَبْعَة | Ansatz 1: Exakter Konsonanten-Match |
| 266 | acht / 8 |  | ثْمَانْيَة | ثْمَانْيَة | Ansatz 1: Exakter Konsonanten-Match |
| 267 | neun / 9 |  | تِسْعَة | تِسْعَة | Ansatz 1: Exakter Konsonanten-Match |
| 268 | zehn / 10 |  | عَشْرَة | عَشْرَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 269 | zwanzig / 20 |  | عِشْرِين | عِشْرِينْ | Ansatz 1: Exakter Konsonanten-Match |
| 270 | hundert / 100 |  | مِيَة |  | Kein Match gefunden |
| 271 | Tag |  | نْهَار |  | Kein Match gefunden |
| 272 | Woche |  | جُمْعَة | جِمْعَة | Ansatz 1: Exakter Konsonanten-Match |
| 273 | Monat |  | شَهْر | شْهَرْ | Ansatz 1: Exakter Konsonanten-Match |
| 274 | Montag |  | الِاثْنِين |  | Kein Match gefunden |
| 275 | Freitag |  | الجُمْعَة | جِمْعَة | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 276 | Samstag |  | السَّبْت | سِبْتْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 277 | Geld |  | فْلُوس | فْلُوسْ | Ansatz 1: Exakter Konsonanten-Match |
| 278 | Dinar |  | دِينَار |  | Kein Match gefunden |
| 279 | zwei Dinar / 2 Dinar |  | دِينَارَيْن |  | Kein Match gefunden |
| 280 | Geldschein |  | كَارْطَة |  | Kein Match gefunden |
| 281 | Geldscheine (Pl.) |  | كْوَارِط |  | Kein Match gefunden |
| 282 | Münze |  | بْيَاسَة | بْيَاسَة | Ansatz 1: Exakter Konsonanten-Match |
| 283 | Münzen (Pl.) |  | بْيَاسَات |  | Kein Match gefunden |
| 284 | Geldwechsler |  | صَرَّاف |  | Kein Match gefunden |
| 285 | das Wechselgeld |  | البَاقِي | بَاقِي | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 286 | das Darlehen |  | السَّلَف | سَلَفْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 287 | ich habe |  | عِنْدِي |  | Kein Match gefunden |
| 288 | du hast |  | عِنْدَك |  | Kein Match gefunden |
| 289 | er hat |  | عِنْدُو |  | Kein Match gefunden |
| 290 | sie hat |  | عِنْدَهَا |  | Kein Match gefunden |
| 291 | wir haben |  | عِنْدْنَا |  | Kein Match gefunden |
| 292 | sie haben (Pl.) |  | عِنْدْهُم |  | Kein Match gefunden |
| 293 | ich habe nicht |  | مَا عِنْدِيش |  | Kein Match gefunden |
| 294 | Wie viel? / Wie viele? |  | قَدَّاش؟ |  | Kein Match gefunden |
| 295 | es gibt / dort ist (f...) |  | فَمَّا |  | Kein Match gefunden |
| 296 | 5 Millimes (Münze) |  | دُورُو |  | Kein Match gefunden |
| 298 | zweihundert / 200 |  | مِيتَيْن |  | Kein Match gefunden |
| 299 | tausend / 1000 |  | أَلْف | ألِّفْ | Ansatz 1: Exakter Konsonanten-Match |
| 300 | zweitausend / 2000 |  | أَلْفَيْن | أَلْفِينْ | Ansatz 1: Exakter Konsonanten-Match |
| 301 | 5 Dinar / 5000 |  | خمسة لاف |  | Kein Match gefunden |
| 302 | 10 Dinar / 10000 |  | عشرة لاف |  | Kein Match gefunden |
| 303 | 20 Dinar / 20000 |  | عشرين لاف |  | Kein Match gefunden |
| 304 | 50 Dinar / 50000 |  | خمسين لاف |  | Kein Match gefunden |
| 305 | Gemüse (allg.) |  | خُضْرَة | خُضْرَة | Ansatz 1: Exakter Konsonanten-Match |
| 306 | Kartoffeln |  | طَمَاطِم | طْمَاطِمْ | Ansatz 1: Exakter Konsonanten-Match |
| 307 | Tomaten | tomato | طْمَاطِمْ | طْمَاطِمْ | Ansatz 1: Exakter Konsonanten-Match |
| 308 | Zucchini |  | قرع أخضر |  | Kein Match gefunden |
| 309 | Brot | bread | خُبْزْ | خُبْزْ | Ansatz 1: Exakter Konsonanten-Match |
| 310 | Milch | milk | حْلِيبْ | حْلِيبْ | Ansatz 1: Exakter Konsonanten-Match |
| 311 | Fleisch | meat | لْحَمْ | لْحَمْ | Ansatz 1: Exakter Konsonanten-Match |
| 312 | Fisch |  | حُوتْ |  | Kein Match gefunden |
| 313 | Öl | oil | زِيتْ | زِيتْ | Ansatz 1: Exakter Konsonanten-Match |
| 314 | Zucker |  | سُكَّر | سكّر | Ansatz 1: Exakter Konsonanten-Match |
| 315 | Mineralwasser |  | ماء صافية |  | Kein Match gefunden |
| 316 | Käse | cheese | جْبِنْ | جْبِنْ | Ansatz 1: Exakter Konsonanten-Match |
| 317 | Butter | butter | زِبْدَة | زِبْدَة | Ansatz 1: Exakter Konsonanten-Match |
| 318 | Couscous |  | كسكسي |  | Kein Match gefunden |
| 319 | Pasta / Nudeln |  | مقرونة |  | Kein Match gefunden |
| 321 | Thunfisch |  | تُنْ | تُنْ | Ansatz 1: Exakter Konsonanten-Match |
| 322 | Kaffee | coffee | قَهْوَةْ | قَهْوَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 323 | Tee | tea | تَايْ | تَايْ | Ansatz 1: Exakter Konsonanten-Match |
| 324 | Joghurt |  | ياغورت |  | Kein Match gefunden |
| 325 | Harissa |  | هريسة |  | Kein Match gefunden |
| 326 | Birnen |  | أنزاص |  | Kein Match gefunden |
| 327 | Trauben | grape | عْنِبْ | عْنِبْ | Ansatz 1: Exakter Konsonanten-Match |
| 328 | Äpfel |  | تفاح |  | Kein Match gefunden |
| 329 | Feigen | fig | كَرْمُوسْ | كَرْمُوسْ | Ansatz 1: Exakter Konsonanten-Match |
| 330 | Pfirsiche | peach | خُوخْ | خُوخْ | Ansatz 1: Exakter Konsonanten-Match |
| 331 | Aprikosen |  | مشماش |  | Kein Match gefunden |
| 332 | Datteln (t...) |  | تمر |  | Kein Match gefunden |
| 333 | Dattel (d...) |  | دڨلة |  | Kein Match gefunden |
| 334 | Orangen |  | بُرْدْقَانْ |  | Kein Match gefunden |
| 335 | Erdbeeren | strawberry | فْرَازْ | فْرَازْ | Ansatz 1: Exakter Konsonanten-Match |
| 336 | Kaktusfeigen | indian | هِنْدِي | هِنْدِي | Ansatz 1: Exakter Konsonanten-Match |
| 337 | Granatäpfel |  | رُمَّان |  | Kein Match gefunden |
| 339 | Bananen |  | بنان |  | Kein Match gefunden |
| 340 | Honigmelonen | melon | بَطِّيخْ | بَطِّيخْ | Ansatz 1: Exakter Konsonanten-Match |
| 341 | Früchte / Obst (allg.) | fruit | غَلَّةْ | غَلَّةْ | Ansatz 1: Exakter Konsonanten-Match |
| 342 | Blumenkohl |  | بُرُوكْلُو | بْرُوكْلُو | Ansatz 1: Exakter Konsonanten-Match |
| 343 | Auberginen |  | بَاذِنْجَان |  | Kein Match gefunden |
| 344 | (Kopf-)Salat |  | خَسّ |  | Kein Match gefunden |
| 345 | Fenchel |  | بسباس |  | Kein Match gefunden |
| 346 | Rüben |  | لِفْت |  | Kein Match gefunden |
| 347 | Karotten / Möhren |  | سفناريّة | سْفِنَّارْيَة | Ansatz 1: Exakter Konsonanten-Match |
| 348 | Gurken |  | فَقُّوس |  | Kein Match gefunden |
| 350 | Petersilie |  | مَعْدْنُوس |  | Kein Match gefunden |
| 351 | Okra |  | قناوية |  | Kein Match gefunden |
| 352 | Sellerie |  | كلافز |  | Kein Match gefunden |
| 353 | Paprika / Peperoni |  | فِلْفِل | فِلْفِلْ | Ansatz 1: Exakter Konsonanten-Match |
| 354 | Erbsen |  | جلبانة |  | Kein Match gefunden |
| 355 | Zwiebeln |  | بَصَل | بْصَلْ | Ansatz 1: Exakter Konsonanten-Match |
| 356 | Gemüsehändler |  | خضار |  | Kein Match gefunden |
| 357 | Bäcker |  | خَبَّاز | خَبَّازْ | Ansatz 1: Exakter Konsonanten-Match |
| 358 | Fischhändler |  | حواث |  | Kein Match gefunden |
| 359 | Metzger |  | جَزَّار |  | Kein Match gefunden |
| 360 | Krämer |  | عَطَّار |  | Kein Match gefunden |
| 361 | Bäckerei |  | مخبزة |  | Kein Match gefunden |
| 362 | (Kleiner) Laden |  | حَانُوت |  | Kein Match gefunden |
| 363 | Kilogramm |  | كِيلُو |  | Kein Match gefunden |
| 364 | Pfund |  | رِطْل |  | Kein Match gefunden |
| 365 | halbes Pfund |  | نص رطل |  | Kein Match gefunden |
| 366 | Flasche |  | دَبُّوزَة | دَبُّوزَة | Ansatz 1: Exakter Konsonanten-Match |
| 367 | Dose / Büchse |  | حَكَّة | حَكَّة | Ansatz 1: Exakter Konsonanten-Match |
| 368 | Packung |  | بَاكُو | بَاكُو | Ansatz 1: Exakter Konsonanten-Match |
| 369 | Bund |  | رَبْطَة |  | Kein Match gefunden |
| 370 | Papiertüte (bes. für Nüsse/Samen) |  | قُرْطَاس | قُرْطَاسْ | Ansatz 1: Exakter Konsonanten-Match |
| 371 | gib mir |  | أعطيني |  | Kein Match gefunden |
| 372 | wiege mir |  | أوزن لي |  | Kein Match gefunden |
| 373 | gib mir mehr |  | زدني |  | Kein Match gefunden |
| 374 | Was kostet es? |  | بقداش؟ |  | Kein Match gefunden |
| 375 | teuer |  | غَالِي | غَالِي | Ansatz 1: Exakter Konsonanten-Match |
| 376 | günstig |  | رْخِيص | رْخِيصْ | Ansatz 1: Exakter Konsonanten-Match |
| 377 | scharf (Paprika) | spicy | حَارْ | حَارْ | Ansatz 1: Exakter Konsonanten-Match |
| 378 | süß / mild |  | حَلُو |  | Kein Match gefunden |
| 379 | bei (Händler) |  | من عند |  | Kein Match gefunden |
| 380 | Frühstück |  | فطور الصباح |  | Kein Match gefunden |
| 381 | Das Mittagessen |  | الفطور |  | Kein Match gefunden |
| 382 | Das Abendessen |  | العشا |  | Kein Match gefunden |
| 383 | Restaurant |  | مَطْعَم |  | Kein Match gefunden |
| 384 | gegrillter Salat |  | سلاطة مشوية |  | Kein Match gefunden |
| 385 | Brik (Gebäck mit Ei) |  | بريكة |  | Kein Match gefunden |
| 386 | die Rechnung |  | الحِسَاب | حْسَابْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 387 | bring mir |  | جيب لي |  | Kein Match gefunden |
| 388 | sofort / zu Befehl |  | حاضر |  | Kein Match gefunden |
| 389 | okay / gut |  | باهي |  | Kein Match gefunden |
| 390 | schwarzer Kaffee |  | قَهْوَة كَحْلَة |  | Kein Match gefunden |
| 391 | grüner Tee |  | تاي أخضر |  | Kein Match gefunden |
| 392 | Softdrink / Limo |  | غَازُوز |  | Kein Match gefunden |
| 393 | Glas |  | كَاس |  | Kein Match gefunden |
| 394 | Maqrouth (Dattelkuchen) |  | مقروض |  | Kein Match gefunden |
| 395 | Baklava |  | بقلاوة |  | Kein Match gefunden |
| 396 | Tasse |  | فَنْجَان |  | Kein Match gefunden |
| 397 | Messer |  | سَكِّينَة | سِكِّينَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 398 | Gabel |  | فُرْشِيطَة | فَرْشِيطَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 399 | Teller (Sg.) |  | صَحْن | صْحَنْ | Ansatz 1: Exakter Konsonanten-Match |
| 400 | Teekanne |  | بَرَّاد |  | Kein Match gefunden |
| 401 | er isst |  | يَاكُل |  | Kein Match gefunden |
| 402 | ich esse |  | ناكل |  | Kein Match gefunden |
| 403 | er trinkt |  | يَشْرَب |  | Kein Match gefunden |
| 404 | er mag |  | يَحِبّ |  | Kein Match gefunden |
| 405 | er kocht |  | يُطَيِّب |  | Kein Match gefunden |
| 406 | die Uhr / die Stunde |  | السَّاعَة | سَاعَة | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 407 | Wie spät ist es? |  | قداش الوقت؟ |  | Kein Match gefunden |
| 408 | jetzt / sofort |  | تووا |  | Kein Match gefunden |
| 409 | halb (Uhrzeit) |  | نُصّ | نَصْ | Ansatz 1: Exakter Konsonanten-Match |
| 410 | Viertel (Uhrzeit) |  | رُبْع | رْبُعْ | Ansatz 1: Exakter Konsonanten-Match |
| 411 | Mütze / Hut |  | طربوشة |  | Kein Match gefunden |
| 413 | T-Shirt | t-shirt | مَرْيُولْ | مَرْيُولْ | Ansatz 1: Exakter Konsonanten-Match |
| 415 | Gürtel / Sicherheitsgurt |  | سبتة |  | Kein Match gefunden |
| 416 | Kleid |  | روبة |  | Kein Match gefunden |
| 417 | Jacke / Mantel (kurz) |  | فستة |  | Kein Match gefunden |
| 418 | Hose |  | سروال |  | Kein Match gefunden |
| 419 | (langer) Mantel | coat | كَبُّوطْ | كَبُّوطْ | Ansatz 1: Exakter Konsonanten-Match |
| 420 | Shorts |  | شورت | شورت | Ansatz 1: Exakter Konsonanten-Match |
| 421 | Socken | sock | كْلَاسِطْ | كْلَاسِطْ | Ansatz 1: Exakter Konsonanten-Match |
| 422 | Sandalen | sandal | صَنْدَالْ | صَنْدَالْ | Ansatz 1: Exakter Konsonanten-Match |
| 423 | Schuh (Sg.) | shoe | صبّاط | صبّاط | Ansatz 1: Exakter Konsonanten-Match |
| 424 | Turnschuhe | sneaker | سْبَادْرِي | سْبَادْرِي | Ansatz 1: Exakter Konsonanten-Match |
| 425 | Krawatte |  | كرافاطة |  | Kein Match gefunden |
| 426 | Faden / Garn |  | خيط | خيّط | Ansatz 1: Exakter Konsonanten-Match |
| 427 | Seide | silk | حْرِيرْ | حْرِيرْ | Ansatz 1: Exakter Konsonanten-Match |
| 428 | Baumwolle | cotton | قْطُنْ | قْطُنْ | Ansatz 1: Exakter Konsonanten-Match |
| 429 | Wolle | wool | صُوفْ | صُوفْ | Ansatz 1: Exakter Konsonanten-Match |
| 430 | Stoff / Textil | cloth | قْمَاشْ | قْمَاشْ | Ansatz 1: Exakter Konsonanten-Match |
| 431 | Schere | scissors | مْقَصْ | مْقَصْ | Ansatz 1: Exakter Konsonanten-Match |
| 432 | Nadel |  | إِبْرَة | إبْرَة | Ansatz 1: Exakter Konsonanten-Match |
| 433 | kurz (m.) |  | قْصِير | قْصِيرْ | Ansatz 1: Exakter Konsonanten-Match |
| 434 | lang (m.) |  | طْوِيل |  | Kein Match gefunden |
| 435 | eng (m.) |  | ضَيَّق |  | Kein Match gefunden |
| 436 | weit / locker / breit (m.) |  | وَاسِع |  | Kein Match gefunden |
| 437 | neu (m.) |  | جْدِيد | جْدِيدْ | Ansatz 1: Exakter Konsonanten-Match |
| 438 | alt / abgetragen (m.) |  | قْدِيم |  | Kein Match gefunden |
| 439 | sauber (m.) |  | نْظِيف | نْظِيفْ | Ansatz 1: Exakter Konsonanten-Match |
| 440 | schmutzig (m.) |  | مَسَّخ | مسّخْ | Ansatz 1: Exakter Konsonanten-Match |
| 441 | zerrissen (m.) |  | مْقَطَّع |  | Kein Match gefunden |
| 442 | schwarz (m.) |  | أَكْحَل |  | Kein Match gefunden |
| 443 | schwarz (f.) |  | كَحْلَة |  | Kein Match gefunden |
| 444 | weiß (m.) |  | أَبْيَض | أبْيِضْ | Ansatz 1: Exakter Konsonanten-Match |
| 445 | weiß (f.) |  | بِيضَة |  | Kein Match gefunden |
| 446 | rot (m.) |  | أَحْمَر |  | Kein Match gefunden |
| 447 | rot (f.) |  | حَمْرَة |  | Kein Match gefunden |
| 448 | gelb (m.) |  | أَصْفَر | أصْفَرْ | Ansatz 1: Exakter Konsonanten-Match |
| 449 | gelb (f.) |  | صَفْرَة |  | Kein Match gefunden |
| 450 | blau (m.) |  | أَزْرَق | أزْرَقْ | Ansatz 1: Exakter Konsonanten-Match |
| 452 | grün (m.) |  | أَخْضَر | أخْضِرْ | Ansatz 1: Exakter Konsonanten-Match |
| 453 | grün (f.) |  | خَضْرَة | خُضْرَة | Ansatz 1: Exakter Konsonanten-Match |
| 454 | braun |  | بُنِّي | بُنّي | Ansatz 1: Exakter Konsonanten-Match |
| 455 | lila / violett |  | بَنَفْسَجِي |  | Kein Match gefunden |
| 456 | rosa / pink |  | وَرْدِي |  | Kein Match gefunden |
| 457 | dunkel (m.) |  | غَامِق |  | Kein Match gefunden |
| 458 | hell (m.) |  | فَاتِح |  | Kein Match gefunden |
| 459 | er wäscht |  | يَغْسَل |  | Kein Match gefunden |
| 460 | er zieht aus (Kleidung) |  | يَنْحِي |  | Kein Match gefunden |
| 461 | er trägt / zieht an |  | يَلْبَس |  | Kein Match gefunden |
| 462 | er näht |  | يْخَيَّط |  | Kein Match gefunden |
| 463 | er schneidet |  | يَقُصّ |  | Kein Match gefunden |
| 464 | Glückwunsch | congratulate | مَبْرُوكْ | مَبْرُوكْ | Ansatz 1: Exakter Konsonanten-Match |
| 465 | Gott segne dich |  | يبارك فيك |  | Kein Match gefunden |
| 466 | Geh runter mit dem Preis |  | طيح شوية في السوم |  | Kein Match gefunden |
| 467 | letzter Preis |  | آخر سوم |  | Kein Match gefunden |
| 468 | Post |  | بوسطة |  | Kein Match gefunden |
| 469 | Brief |  | جْوَاب | جْوَابْ | Ansatz 1: Exakter Konsonanten-Match |
| 470 | Briefmarke (MSA) |  | طَابِعْ | طَابِعْ | Ansatz 1: Exakter Konsonanten-Match |
| 471 | wird |  | بش  (Zukunftsmarker) |  | Kein Match gefunden |
| 472 | wo? |  | وِين |  | Kein Match gefunden |
| 473 | warum? |  | عْلَاش | عْلَاشْ | Ansatz 1: Exakter Konsonanten-Match |
| 474 | wie? |  | كِيفَاش | كِيفَاشْ | Ansatz 1: Exakter Konsonanten-Match |
| 475 | wer? |  | شْكُون |  | Kein Match gefunden |
| 476 | was? (m.) |  | شْنُو |  | Kein Match gefunden |
| 477 | Bahnhof |  | مَحَطَّة | مَحَطَّةْ | Ansatz 1: Exakter Konsonanten-Match |
| 478 | Zug |  | تْرَان | تْرَانْ | Ansatz 1: Exakter Konsonanten-Match |
| 479 | Bus |  | كَار | كَارْ | Ansatz 1: Exakter Konsonanten-Match |
| 481 | Auto |  | كَرْهْبَة | كَرْهْبَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 482 | Ticket / Fahrkarte |  | تِسْكِرَة |  | Kein Match gefunden |
| 483 | er ging |  | مْشَى | مَشْيْ | Ansatz G: Match nach Hamza-/Ta-Marbuta-Normalisierung |
| 484 | er kaufte |  | شْرَى |  | Kein Match gefunden |
| 485 | er kam |  | جَا |  | Kein Match gefunden |
| 486 | er ging raus |  | خْرَج |  | Kein Match gefunden |
| 487 | er kam an |  | وْصَل |  | Kein Match gefunden |
| 488 | er trank |  | شْرَب |  | Kein Match gefunden |
| 489 | zwanzigtausend / 20000 |  | عشرين ألف |  | Kein Match gefunden |
| 491 | ich |  | آنَا |  | Kein Match gefunden |
| 492 | du |  | إِنْتِي | إنْتِي | Ansatz 1: Exakter Konsonanten-Match |
| 493 | er |  | هُوَ |  | Kein Match gefunden |
| 494 | sie |  | هِيَ |  | Kein Match gefunden |
| 495 | wir |  | أَحْنَا | أحْنَا | Ansatz 1: Exakter Konsonanten-Match |
| 496 | ihr |  | إِنْتُومَا |  | Kein Match gefunden |
| 497 | sie (Pl.) |  | هُومَا |  | Kein Match gefunden |
| 498 | ich bin ... Jahre alt |  | عمري |  | Kein Match gefunden |
| 499 | tunesisch (m.) |  | تونسي |  | Kein Match gefunden |
| 500 | tunesisch (f.) |  | تونسية |  | Kein Match gefunden |
| 501 | amerikanisch (m.) |  | أمريكاني |  | Kein Match gefunden |
| 502 | französisch (m.) |  | فرنساوي |  | Kein Match gefunden |
| 503 | deutsch (m.) | german | ألْمَانِي | ألْمَانِي | Ansatz 1: Exakter Konsonanten-Match |
| 504 | Wie heißt du? |  | شسمك / شْنُوَّا اِسْمِك؟ |  | Kein Match gefunden |
| 505 | Woher bist du? |  | منين إنتي |  | Kein Match gefunden |
| 506 | Freut mich / Schön, dich kennenzulernen |  | نتشرفو |  | Kein Match gefunden |
| 507 | null / 0 |  | صفر |  | Kein Match gefunden |
| 508 | dreißig / 30 | thirty | ثْلَاثِينْ | ثْلَاثِينْ | Ansatz 1: Exakter Konsonanten-Match |
| 509 | vierzig / 40 |  | أربعين |  | Kein Match gefunden |
| 510 | fünfzig / 50 | fifty | خَمْسِينْ | خَمْسِينْ | Ansatz 1: Exakter Konsonanten-Match |
| 511 | sechzig / 60 | sixty | سِتِّينْ | سِتِّينْ | Ansatz 1: Exakter Konsonanten-Match |
| 512 | siebzig / 70 | seventy | سَبْعِينْ | سَبْعِينْ | Ansatz 1: Exakter Konsonanten-Match |
| 513 | achtzig / 80 | eighty | ثْمَانِينْ | ثْمَانِينْ | Ansatz 1: Exakter Konsonanten-Match |
| 514 | neunzig / 90 | ninety | تِسْعِينْ | تِسْعِينْ | Ansatz 1: Exakter Konsonanten-Match |
| 515 | Million |  | مَلْيُونْ | مَلْيُونْ | Ansatz 1: Exakter Konsonanten-Match |
| 516 | Milliarde | billion | مِلْيَارْ | مِلْيَارْ | Ansatz 1: Exakter Konsonanten-Match |
| 517 | Dienstag |  | الثلاث |  | Kein Match gefunden |
| 518 | Mittwoch |  | الأربعاء |  | Kein Match gefunden |
| 519 | Donnerstag |  | الخميس | خْمِيسْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 520 | Sonntag |  | الأحد |  | Kein Match gefunden |
| 521 | Paket |  | كولي |  | Kein Match gefunden |
| 522 | Postkarte |  | كارت بوستال |  | Kein Match gefunden |
| 523 | Briefumschlag |  | ماصو |  | Kein Match gefunden |
| 524 | Blatt Papier |  | ورقة |  | Kein Match gefunden |
| 525 | Briefkasten |  | صندوق الجوابات |  | Kein Match gefunden |
| 526 | du kannst / es ist möglich |  | تنجم |  | Kein Match gefunden |
| 527 | wann? |  | وقتاش |  | Kein Match gefunden |
| 528 | weil / da |  | على خاطر |  | Kein Match gefunden |
| 529 | um zu / damit |  | باش (Zweck) |  | Kein Match gefunden |
| 530 | Flughafen | airport | مَطَارْ | مَطَارْ | Ansatz 1: Exakter Konsonanten-Match |
| 531 | Flugzeug | plane | طيّارة | طيّارة | Ansatz 1: Exakter Konsonanten-Match |
| 532 | Visum |  | فيزا |  | Kein Match gefunden |
| 533 | Der Schalter (Bahnhof oder Bus) |  | الڤيشاي |  | Kein Match gefunden |
| 534 | Platz / Sitzplatz | place | بْلَاصَة | بْلَاصَة | Ansatz 1: Exakter Konsonanten-Match |
| 535 | Busbahnhof |  | محطة الكيران |  | Kein Match gefunden |
| 536 | Entfernung |  | مسافة |  | Kein Match gefunden |
| 537 | nah / in der Nähe | close | قْرِيبْ | قْرِيبْ | Ansatz 1: Exakter Konsonanten-Match |
| 538 | weit / entfernt |  | بعيد |  | Kein Match gefunden |
| 539 | letzte/r/s (vergangen) |  | الفايت |  | Kein Match gefunden |
| 540 | gestern |  | البارح | بارح | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 541 | er stieg ein |  | ركب | رَكِّبْ | Ansatz 1: Exakter Konsonanten-Match |
| 542 | er stieg aus / landete |  | هبط |  | Kein Match gefunden |
| 543 | er ging hoch |  | طلع | طَلَّعْ | Ansatz 1: Exakter Konsonanten-Match |
| 544 | er verstand | understand | فَهْمْ | فَهْمْ | Ansatz 1: Exakter Konsonanten-Match |
| 545 | er frühstückte |  | فطر |  | Kein Match gefunden |
| 546 | er saß / er blieb (sitzen) |  | قعد |  | Kein Match gefunden |
| 547 | er hörte |  | سمع |  | Kein Match gefunden |
| 549 | er trat ein |  | دخل | دَخِّلْ | Ansatz 1: Exakter Konsonanten-Match |
| 550 | er wusste / erkannte |  | عرف | عَرْفْ | Ansatz 1: Exakter Konsonanten-Match |
| 551 | er vergaß |  | نسى |  | Kein Match gefunden |
| 552 | er weinte | cry | بْكَى | بْكَى | Ansatz 1: Exakter Konsonanten-Match |
| 553 | er las / er studierte |  | قرى |  | Kein Match gefunden |
| 554 | er aß |  | كلى |  | Kein Match gefunden |
| 555 | er nahm |  | خذا |  | Kein Match gefunden |
| 556 | er fand |  | لقى |  | Kein Match gefunden |
| 557 | er warf |  | رمى | رَمْي | Ansatz G: Match nach Hamza-/Ta-Marbuta-Normalisierung |
| 558 | er begann | commence | بْدَا | بْدَا | Ansatz 1: Exakter Konsonanten-Match |
| 559 | er rannte |  | جرى |  | Kein Match gefunden |
| 560 | er gab |  | عطى |  | Kein Match gefunden |
| 562 | Danke |  | شكرا |  | Kein Match gefunden |
| 563 | Entschuldigung / Verzeihung |  | سامحني |  | Kein Match gefunden |
| 564 | (kleine) Straße | street | نَهْجْ | نَهْجْ | Ansatz 1: Exakter Konsonanten-Match |
| 565 | Gasse / kleine Straße | alley | زَنْقَة | زَنْقَة | Ansatz 1: Exakter Konsonanten-Match |
| 566 | Straße (breite) |  | شارع |  | Kein Match gefunden |
| 567 | Tür / Tor | door | بَابْ | بَابْ | Ansatz 1: Exakter Konsonanten-Match |
| 568 | Fenster / Schalter | window | شِبَاّكْ | شِبَاّكْ | Ansatz 1: Exakter Konsonanten-Match |
| 569 | Bank |  | بنك |  | Kein Match gefunden |
| 570 | Kino |  | سينما |  | Kein Match gefunden |
| 571 | Lehrer (m.) |  | أستاذ |  | Kein Match gefunden |
| 572 | Lehrerin (f.) |  | أستاذة |  | Kein Match gefunden |
| 574 | Frau |  | مرا |  | Kein Match gefunden |
| 575 | Geh! (Imperativ) |  | إمشي |  | Kein Match gefunden |
| 576 | Halte an! / Stopp /Steh auf (Imperativ) |  | قف |  | Kein Match gefunden |
| 577 | Olive |  | زيتونة |  | Kein Match gefunden |
| 578 | Leute / Menschen | people | نَاسْ | نَاسْ | Ansatz 1: Exakter Konsonanten-Match |
| 579 | Löffel (groß) | spoon | مَغَرْفَةْ | مَغَرْفَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 580 | Kochtopf |  | طنجرة |  | Kein Match gefunden |
| 581 | Couscous-Topf (Dämpfer) | pot | كَسْكَاسْ | كَسْكَاسْ | Ansatz 1: Exakter Konsonanten-Match |
| 582 | Tablett / Teller (flach) | dish | طْبَقْ | طْبَقْ | Ansatz 1: Exakter Konsonanten-Match |
| 583 | Waage (Markt / Küche) |  | شقالة |  | Kein Match gefunden |
| 584 | Gläser (Pl.) |  | كيسان |  | Kein Match gefunden |
| 585 | Tassen (Pl.) |  | فناجين |  | Kein Match gefunden |
| 586 | Messer (Pl.) |  | سكاكن |  | Kein Match gefunden |
| 587 | heiß (m.) | hot | سْخُونْ | سْخُونْ | Ansatz 1: Exakter Konsonanten-Match |
| 588 | kalt (m.) | cold | بَارْد | بَارْد | Ansatz 1: Exakter Konsonanten-Match |
| 589 | kalt (f.) |  | باردة |  | Kein Match gefunden |
| 590 | leicht (m.) |  | خفيف |  | Kein Match gefunden |
| 591 | bitter (m.) | bitter | مُرّْ | مُرّْ | Ansatz 1: Exakter Konsonanten-Match |
| 592 | stark / kräftig (m.) | strong | قْوِيّْ | قْوِيّْ | Ansatz 1: Exakter Konsonanten-Match |
| 593 | Kaffeehausbesitzer |  | قهواجي |  | Kein Match gefunden |
| 594 | Saft | juice | عَصِيرْ | عَصِيرْ | Ansatz 1: Exakter Konsonanten-Match |
| 595 | Fanta / Limonade |  | فانتا |  | Kein Match gefunden |
| 597 | Karten (Kartenspiel) |  | شكبة |  | Kein Match gefunden |
| 598 | Rami (Kartenspiel) |  | الرامي |  | Kein Match gefunden |
| 599 | Domino |  | الديمينو |  | Kein Match gefunden |
| 600 | Gott helfe dir |  | الله يعينك |  | Kein Match gefunden |
| 602 | Tafel / Wandtafel |  | تابلو |  | Kein Match gefunden |
| 603 | Kugelschreiber | pen | سْتيلُو | سْتيلُو | Ansatz 1: Exakter Konsonanten-Match |
| 604 | Blätter / Seiten (Pl.) |  | أوراق |  | Kein Match gefunden |
| 605 | Klasse / Unterrichtsraum | classroom | قَسِّمْ | قَسِّمْ | Ansatz 1: Exakter Konsonanten-Match |
| 606 | Schule (Grund) (sg.) |  | مكتب |  | Kein Match gefunden |
| 607 | Schüler (m.) |  | تلميذ |  | Kein Match gefunden |
| 608 | Lektion / Unterrichtsstunde |  | درس |  | Kein Match gefunden |
| 609 | Satz | sentence | جُمْلَة | جُمْلَة | Ansatz 1: Exakter Konsonanten-Match |
| 610 | Wort | word | كِلْمَةْ | كِلْمَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 611 | Gott (be)schütze dich (Antwort) |  | يسلمك |  | Kein Match gefunden |
| 612 | Auf Wiedersehen (informell) |  | آنستو |  | Kein Match gefunden |
| 614 | italienisch (m.) |  | إيطالي / إيطالياني |  | Kein Match gefunden |
| 615 | mexikanisch (m.) | mexican | مِكْسِيكِي | مِكْسِيكِي | Ansatz 1: Exakter Konsonanten-Match |
| 616 | groß / alt (m.) |  | كبير |  | Kein Match gefunden |
| 617 | groß / alt (f.) |  | كبيرة |  | Kein Match gefunden |
| 618 | Kater / Katze (m.) |  | قَطُّوسْ |  | Kein Match gefunden |
| 619 | Henne / Huhn (f.) |  | دْجَاجَةْ |  | Kein Match gefunden |
| 620 | Hahn (m.) |  | سَرْدُوكْ |  | Kein Match gefunden |
| 621 | Markt / Souk | market | سُوقْ | سُوقْ | Ansatz 1: Exakter Konsonanten-Match |
| 622 | Rose / Blume |  | وردة |  | Kein Match gefunden |
| 623 | Land / Heimat |  | بلاد |  | Kein Match gefunden |
| 624 | Frank (Münze, 1 Frank) |  | فرنك |  | Kein Match gefunden |
| 625 | Millimes (Pl.) |  | مليمات |  | Kein Match gefunden |
| 626 | Dinare (Pl.) |  | دينارات |  | Kein Match gefunden |
| 627 | Keks / Biskuit | biscuit | بِسْكْوِي | بِسْكْوِي | Ansatz 1: Exakter Konsonanten-Match |
| 628 | Mehl |  | فارينة |  | Kein Match gefunden |
| 629 | Knochen |  | عْضَمْ | عْضَمْ | Ansatz 1: Exakter Konsonanten-Match |
| 630 | Javel / Bleichmittel / Bleiche |  | جافال |  | Kein Match gefunden |
| 631 | Liter (Maßeinheit) |  | إطرة |  | Kein Match gefunden |
| 632 | Flaschen (Pl.) |  | دبابز |  | Kein Match gefunden |
| 633 | Dosen (Pl.) |  | حكوك |  | Kein Match gefunden |
| 634 | Kuchen / Torte (frz.) |  | ڨاطو |  | Kein Match gefunden |
| 635 | (Hand)Tasche |  | ساكوش |  | Kein Match gefunden |
| 636 | Adresse (frz.) |  | لدريسة |  | Kein Match gefunden |
| 637 | Briefmarke (Darija) |  | تِنْبْرِي |  | Kein Match gefunden |
| 638 | Louage (Sammeltaxi) |  | لواج |  | Kein Match gefunden |
| 640 | er schlief |  | رقد |  | Kein Match gefunden |
| 641 | er ruhte sich aus |  | ارتاح |  | Kein Match gefunden |
| 642 | er schickte |  | بعث |  | Kein Match gefunden |
| 643 | er zog sich an |  | لبس |  | Kein Match gefunden |
| 644 | er spielte |  | لعب |  | Kein Match gefunden |
| 645 | er arbeitete |  | خدم |  | Kein Match gefunden |
| 646 | er schaute (TV) |  | تفرج |  | Kein Match gefunden |
| 647 | er kam zurück |  | رجع | رَجَّعْ | Ansatz 1: Exakter Konsonanten-Match |
| 648 | einen Platz reservieren/festhalten |  | نشد |  | Kein Match gefunden |
| 649 | er zählte / er rechnete | thought | حْسِبْ | حْسِبْ | Ansatz 1: Exakter Konsonanten-Match |
| 650 | er antwortete |  | جاوب |  | Kein Match gefunden |
| 651 | Wassermelone / Wassermelonen |  | دلاع |  | Kein Match gefunden |
| 652 | abgeschlossen / versperrt |  | مقفول |  | Kein Match gefunden |
| 653 | heiß (f.) |  | سخونة |  | Kein Match gefunden |
| 654 | Italien | italy | إيطَالْيَا | إيطَالْيَا | Ansatz 1: Exakter Konsonanten-Match |
| 656 | Mexiko |  | المكسيك | مِكْسِيكْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 657 | Deutschland | germany | ألْمَانْيَا | ألْمَانْيَا | Ansatz 1: Exakter Konsonanten-Match |
| 658 | Frankreich |  | فرنسا |  | Kein Match gefunden |
| 659 | Amerika |  | أمريكا |  | Kein Match gefunden |
| 660 | vor / gegenüber |  | قدام |  | Kein Match gefunden |
| 661 | hinter |  | ورا |  | Kein Match gefunden |
| 662 | oben / über |  | فوق |  | Kein Match gefunden |
| 663 | unten / unter | under | تَحْتْ | تَحْتْ | Ansatz 1: Exakter Konsonanten-Match |
| 665 | zwischen |  | (ما) بين |  | Kein Match gefunden |
| 667 | Telefon |  | تلفون |  | Kein Match gefunden |
| 669 | Großvater |  | جد |  | Kein Match gefunden |
| 670 | Großmutter |  | جدة |  | Kein Match gefunden |
| 671 | Vater (umg.) |  | بو | بو | Ansatz 1: Exakter Konsonanten-Match |
| 672 | Mutter |  | أُمّ |  | Kein Match gefunden |
| 673 | Tante (mütterlicherseits) |  | خَالَة |  | Kein Match gefunden |
| 674 | Onkel (mütterlicherseits) |  | خَال |  | Kein Match gefunden |
| 676 | Onkel (väterlicherseits) |  | عَمّ |  | Kein Match gefunden |
| 677 | Schwester |  | أُخْت | أُخْتْ | Ansatz 1: Exakter Konsonanten-Match |
| 679 | Cousine (m.) |  | شيراز |  | Kein Match gefunden |
| 680 | Cousin (väterlicherseits) |  | ولد العم |  | Kein Match gefunden |
| 681 | Cousine (väterlicherseits) |  | بنت العم |  | Kein Match gefunden |
| 682 | Cousin (mütterlicherseits) |  | ولد الخال |  | Kein Match gefunden |
| 684 | Ehefrau |  | مرأة |  | Kein Match gefunden |
| 685 | Verlobter / Schatz |  | عَزِيز |  | Kein Match gefunden |
| 686 | Januar | january | جَانْفِي | جَانْفِي | Ansatz 1: Exakter Konsonanten-Match |
| 687 | Februar | february | فِيفْرِي | فِيفْرِي | Ansatz 1: Exakter Konsonanten-Match |
| 688 | März | mars | مَارِسْ | مَارِسْ | Ansatz 1: Exakter Konsonanten-Match |
| 689 | April | april | أفْرِيلْ | أفْرِيلْ | Ansatz 1: Exakter Konsonanten-Match |
| 690 | Mai |  | ماي |  | Kein Match gefunden |
| 691 | Juni | june | جْوَانْ | جْوَانْ | Ansatz 1: Exakter Konsonanten-Match |
| 692 | Juli |  | جويلية |  | Kein Match gefunden |
| 693 | August |  | أوت | آُوتْ | Ansatz G: Match nach Hamza-/Ta-Marbuta-Normalisierung |
| 694 | September | september | سِبْتُمْبَرْ | سِبْتُمْبَرْ | Ansatz 1: Exakter Konsonanten-Match |
| 695 | Oktober |  | أكتوبر |  | Kein Match gefunden |
| 696 | November | november | نُوفُمْبِرْ | نُوفُمْبِرْ | Ansatz 1: Exakter Konsonanten-Match |
| 697 | Dezember |  | ديسمبر |  | Kein Match gefunden |
| 698 | der Frühling |  | الربيع | رْبِيعْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 699 | der Sommer |  | الصيف | صِيفْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 700 | der Herbst |  | الخريف | خْرِيفْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 701 | der Winter |  | الشتاء |  | Kein Match gefunden |
| 702 | Haus / Zuhause |  | دَار |  | Kein Match gefunden |
| 703 | Villa | villa | فِيلَا | فِيلَا | Ansatz 1: Exakter Konsonanten-Match |
| 704 | Wohnung / Apartment |  | برطمان |  | Kein Match gefunden |
| 705 | Wohnzimmer |  | بيت الصالة |  | Kein Match gefunden |
| 706 | Schlafzimmer |  | بيت النوم |  | Kein Match gefunden |
| 707 | Esszimmer |  | بيت الفطور |  | Kein Match gefunden |
| 708 | die Küche |  | الكوجينة |  | Kein Match gefunden |
| 709 | Bad / WC |  | بيت الراحة |  | Kein Match gefunden |
| 710 | der Korridor / der Flur |  | المنشير |  | Kein Match gefunden |
| 711 | die Treppe |  | الدرّوج | دْرُوجْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 712 | Innenhof / Patio |  | وسط الدار |  | Kein Match gefunden |
| 714 | Veranda / Balkon |  | فاراندا |  | Kein Match gefunden |
| 715 | Toilette |  | بيت التّوم |  | Kein Match gefunden |
| 717 | der Strom / die Elektrizität |  | الكهرباء |  | Kein Match gefunden |
| 718 | Miete |  | كِرَاء | كْرَاءْ | Ansatz 1: Exakter Konsonanten-Match |
| 719 | Kopf |  | رَأْس | رَاسْ | Ansatz G: Match nach Hamza-/Ta-Marbuta-Normalisierung |
| 720 | Arm |  | ذِرَاع |  | Kein Match gefunden |
| 721 | Bauch |  | كَرْش |  | Kein Match gefunden |
| 722 | Rücken |  | ظَهْر |  | Kein Match gefunden |
| 724 | Bein / Fuß |  | رِجْل | رْجِلْ | Ansatz 1: Exakter Konsonanten-Match |
| 725 | Ohr |  | أُذُن |  | Kein Match gefunden |
| 726 | Auge |  | عَيْن | عِينْ | Ansatz 1: Exakter Konsonanten-Match |
| 727 | Zahn |  | سِنّ | سِنّْ | Ansatz 1: Exakter Konsonanten-Match |
| 728 | Nase |  | خَشْم |  | Kein Match gefunden |
| 729 | Hals |  | حَلْق | حَلَّقْ | Ansatz 1: Exakter Konsonanten-Match |
| 730 | Brust |  | صَدْر |  | Kein Match gefunden |
| 731 | Knie |  | رُكْبَة | رُكْبَة | Ansatz 1: Exakter Konsonanten-Match |
| 732 | es tut weh |  | يوجع |  | Kein Match gefunden |
| 733 | krank |  | مَرِيض | مْرِيضْ | Ansatz 1: Exakter Konsonanten-Match |
| 734 | verletzt |  | مجروح |  | Kein Match gefunden |
| 735 | gebrochen |  | مقطوع |  | Kein Match gefunden |
| 736 | Medizin / Medikament |  | دْوَا |  | Kein Match gefunden |
| 737 | Arzt (Lehnwort) | doctor | دُكْتُورْ | دُكْتُورْ | Ansatz 1: Exakter Konsonanten-Match |
| 738 | Apotheke (MSA) |  | صَيْدَلِيَّة | صَيْدَلِيَّةْ | Ansatz 1: Exakter Konsonanten-Match |
| 739 | Krankenhaus (MSA) |  | مستشفى |  | Kein Match gefunden |
| 740 | Fieber / Temperatur (MSA) |  | حَرَارَة |  | Kein Match gefunden |
| 741 | Hilfe! (wörtl.: lauf zu mir — Hilferuf an jemanden den man kennt) |  | إجري ولي |  | Kein Match gefunden |
| 742 | Mein Freund hatte einen Unfall |  | صاحبي تصل حادث |  | Kein Match gefunden |
| 743 | Mein Freund ist verletzt |  | صاحبي مجروح |  | Kein Match gefunden |
| 744 | eine ernste Wunde |  | جُرْح خَطِير |  | Kein Match gefunden |
| 745 | Ruf einen Krankenwagen |  | اطلب أمبولانس |  | Kein Match gefunden |
| 746 | Ruf ein Taxi |  | اطلب تاكسي |  | Kein Match gefunden |
| 747 | die Polizei |  | الشرطة | شُرْطَةْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 748 | die Feuerwehr |  | الحماية | حِمَايَة | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 749 | die Stadtverwaltung |  | البلادية |  | Kein Match gefunden |
| 750 | Diebstahl |  | سَرِقَة |  | Kein Match gefunden |
| 751 | Das Haus brennt |  | فمة حريقة في الدار |  | Kein Match gefunden |
| 752 | Ruf die Feuerwehr |  | عَيَّطْت لِلْحِمَايَة |  | Kein Match gefunden |
| 753 | Ruf die Polizei |  | عَيَّطْت لِلشُّرْطَة |  | Kein Match gefunden |
| 755 | Lohn / Gehalt |  | أَجْر | أجْر | Ansatz 1: Exakter Konsonanten-Match |
| 756 | Urlaub / Auszeit |  | كونجي |  | Kein Match gefunden |
| 757 | Monatsende / Gehaltstag |  | راس الشهر |  | Kein Match gefunden |
| 758 | Zertifikat / Diplom |  | شَهَادَة |  | Kein Match gefunden |
| 759 | Erfahrung |  | تَجْرِبَة | تَجْرْبَة | Ansatz 1: Exakter Konsonanten-Match |
| 760 | Schule |  | مَدْرَسَة | مَدْرْسَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 761 | Universität |  | جَامِعَة |  | Kein Match gefunden |
| 762 | er liest / studiert |  | يَقْرَا |  | Kein Match gefunden |
| 764 | er versteht |  | يفهم |  | Kein Match gefunden |
| 765 | er arbeitet |  | يخدم |  | Kein Match gefunden |
| 766 | der Islam |  | الإسلام | إسْلَامْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 767 | Religion / Glaube |  | دِين |  | Kein Match gefunden |
| 768 | Gott / Allah |  | الله |  | Kein Match gefunden |
| 769 | Der Prophet / Mohammed |  | الرسول | رَسُولْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 770 | die Moschee |  | المسجد |  | Kein Match gefunden |
| 771 | die Kirche |  | الكنيسية |  | Kein Match gefunden |
| 774 | Imam |  | الإمام |  | Kein Match gefunden |
| 775 | Der Papst |  | البابا | بَابَا | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 776 | Paradies |  | الجنة | جَنَّة | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 777 | Hölle / Feuer |  | النار |  | Kein Match gefunden |
| 778 | Mekka |  | مكة |  | Kein Match gefunden |
| 779 | der Koran |  | القرآن |  | Kein Match gefunden |
| 780 | die Bibel / das Evangelium |  | الإنجيل | إنْجِيلْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 781 | das Glaubensbekenntnis (1. Säule) |  | الشهادة |  | Kein Match gefunden |
| 782 | das Gebet (2. Säule) |  | الصلاة | صَلَاةْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 783 | die Armensteuer (3. Säule) |  | الزكاة |  | Kein Match gefunden |
| 784 | das Fasten (4. Säule) |  | الصوم |  | Kein Match gefunden |
| 785 | die Pilgerfahrt (5. Säule) |  | الحج |  | Kein Match gefunden |
| 786 | verboten |  | حَرَام |  | Kein Match gefunden |
| 787 | erlaubt |  | حَلَال | حَلَّالْ | Ansatz 1: Exakter Konsonanten-Match |
| 788 | Teufel / Satan |  | الشيطان |  | Kein Match gefunden |
| 789 | die Politik |  | السياسة | سِيَاسَة | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 791 | Staat |  | دَوْلَة |  | Kein Match gefunden |
| 792 | Regierung |  | حُكُومَة | حْكومَة | Ansatz 1: Exakter Konsonanten-Match |
| 793 | Präsident |  | رئيس |  | Kein Match gefunden |
| 794 | Minister |  | وزير |  | Kein Match gefunden |
| 795 | Ministerium |  | وزارة | وْزَارَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 796 | Parlament |  | مجلس النواب |  | Kein Match gefunden |
| 797 | Wahlen |  | انتخابات | إنتخابات | Ansatz G: Match nach Hamza-/Ta-Marbuta-Normalisierung |
| 798 | Partei |  | حِزْب |  | Kein Match gefunden |
| 799 | Gesetz |  | قَانُون | قَانُونْ | Ansatz 1: Exakter Konsonanten-Match |
| 800 | Wirtschaft |  | اقتصاد | إقْتِصَادْ | Ansatz G: Match nach Hamza-/Ta-Marbuta-Normalisierung |
| 801 | Krise |  | أزمة | أزْمَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 802 | Arbeitslosigkeit |  | بطالة | بْطَالَة | Ansatz 1: Exakter Konsonanten-Match |
| 803 | der Nahe Osten |  | الشرق الأوسط |  | Kein Match gefunden |
| 804 | Außenpolitik |  | سياسة خارجية |  | Kein Match gefunden |
| 805 | Krieg |  | حَرْب | حَرْبْ | Ansatz 1: Exakter Konsonanten-Match |
| 806 | immer gut |  | دايما بخير |  | Kein Match gefunden |
| 807 | Einverstanden |  | داكوردو |  | Kein Match gefunden |
| 808 | Willkommen / Herzlich willkommen |  | أهلا (وسهلا) |  | Kein Match gefunden |
| 809 | Und mit euch sei Frieden |  | و عليكم السلام |  | Kein Match gefunden |
| 810 | Möge Gott dich (be)schützen |  | الله يسلمك |  | Kein Match gefunden |
| 811 | Möge Gott dich beglücken |  | الله يهنيك |  | Kein Match gefunden |
| 812 | Dann tschüss / Bis später |  | توا في الأمان |  | Kein Match gefunden |
| 815 | Grüß die Familie |  | سلم على الدار |  | Kein Match gefunden |
| 816 | Wo bist du? / Wie geht es? |  | وينك؟ |  | Kein Match gefunden |
| 817 | Lies! (Singular) |  | إِقْرَأ |  | Kein Match gefunden |
| 818 | Lest! (Plural) |  | إِقْرَوْا |  | Kein Match gefunden |
| 819 | Schreib! (Singular) |  | إِكْتِب |  | Kein Match gefunden |
| 820 | Schreibt! (Plural) |  | إِكْتْبُوا |  | Kein Match gefunden |
| 821 | Wiederhole! (Singular) |  | عَاوِد |  | Kein Match gefunden |
| 822 | Wiederholt! (Plural) |  | عَاوْدُوا |  | Kein Match gefunden |
| 823 | Öffne das Heft |  | حل الكراسة |  | Kein Match gefunden |
| 824 | Schließe das Heft |  | سكر الكراسة |  | Kein Match gefunden |
| 825 | Stell eine Frage |  | إسأل سؤال |  | Kein Match gefunden |
| 826 | Lektionen (pl.) |  | دْرُوس |  | Kein Match gefunden |
| 827 | Übungen (Pl.) |  | تَمَارِين |  | Kein Match gefunden |
| 828 | Sätze (Pl.) |  | جُمَل | جَمِّلْ | Ansatz 1: Exakter Konsonanten-Match |
| 829 | Wörter (Pl.) |  | كْلِمَات |  | Kein Match gefunden |
| 830 | Was ist das? |  | شنو هذا؟ |  | Kein Match gefunden |
| 831 | Wie sagt man auf Arabisch? |  | كيفاش تقول بالعربي؟ |  | Kein Match gefunden |
| 832 | Was bedeutet das? |  | آش معناها؟ |  | Kein Match gefunden |
| 833 | Wiederhole langsam |  | عاود بالشوية |  | Kein Match gefunden |
| 834 | Entschuldigung, was hast du gesagt? |  | سامحني آش قلت؟ |  | Kein Match gefunden |
| 835 | Ich habe dich nicht gehört |  | ما سمعتكش |  | Kein Match gefunden |
| 836 | Ich habe nicht verstanden |  | ما فهمتش |  | Kein Match gefunden |
| 837 | was (betonte / feminine Frageform) |  | شْنُوَّا | شنوا | Ansatz 1: Exakter Konsonanten-Match |
| 838 | Autos (Pl.) |  | كراهب |  | Kein Match gefunden |
| 839 | Mann |  | رَاجِل | رَاجِلْ | Ansatz 1: Exakter Konsonanten-Match |
| 840 | Männer (Pl.) |  | رْجَال |  | Kein Match gefunden |
| 841 | jener / das dort (m.) |  | هذاكا |  | Kein Match gefunden |
| 842 | jene (f.) |  | هاذيكا |  | Kein Match gefunden |
| 843 | jene dort (Pl.) |  | هاذوكم |  | Kein Match gefunden |
| 844 | eins / 1 (f.) | unit | وِحْدَةْ | وِحْدَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 847 | Geh in Sicherheit / Tschüss |  | في الأمان |  | Kein Match gefunden |
| 851 | danke / gern geschehen |  | يعيشك |  | Kein Match gefunden |
| 852 | 777 |  | سبعة مية وسبعة وسبعين |  | Kein Match gefunden |
| 853 | (Einen) Schönen Tag / Guten Tag |  | نهارك زين |  | Kein Match gefunden |
| 854 | Gute Nacht |  | تصبح على خير |  | Kein Match gefunden |
| 856 | Gut, und dir? |  | لاباس و انتي؟ |  | Kein Match gefunden |
| 877 | dieser / das hier (m.) |  | هَذَا |  | Kein Match gefunden |
| 878 | diese / das hier (f.) |  | هَاذِي |  | Kein Match gefunden |
| 879 | diese (Plural) |  | هَاذُومَا | هَاذُومَا | Ansatz 1: Exakter Konsonanten-Match |
| 884 | Türen (pl.) |  | بِيبَان |  | Kein Match gefunden |
| 885 | Fenster (pl.) |  | شْبَابِيك |  | Kein Match gefunden |
| 890 | Tische (pl.) |  | طواول |  | Kein Match gefunden |
| 891 | Bücher (pl.) |  | كتب |  | Kein Match gefunden |
| 892 | Heft (sg.) |  | كَرَّاسَة | كُرَّاسَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 893 | Hefte (pl.) |  | كراسات |  | Kein Match gefunden |
| 894 | Stifte (pl.) |  | قلام |  | Kein Match gefunden |
| 895 | Kugelschreiber (pl.) |  | ستيلوات |  | Kein Match gefunden |
| 896 | Schulen (Grund) (pl.) |  | مكاتب |  | Kein Match gefunden |
| 897 | Stühle (pl.) |  | كَرَاسِي | كْرَاسِي | Ansatz 1: Exakter Konsonanten-Match |
| 898 | Klassen (pl.) |  | أقسام |  | Kein Match gefunden |
| 899 | Schüler (pl.) |  | تلامذة |  | Kein Match gefunden |
| 900 | Tafeln (pl.) |  | تابلوات |  | Kein Match gefunden |
| 901 | elf / 11 |  | حداش |  | Kein Match gefunden |
| 902 | zwölf / 12 |  | اثناش | أثْنَاشْ | Ansatz G: Match nach Hamza-/Ta-Marbuta-Normalisierung |
| 903 | dreizehn / 13 |  | ثلاثة طاش |  | Kein Match gefunden |
| 904 | vierzehn / 14 |  | أربعة طاش |  | Kein Match gefunden |
| 905 | fünfzehn / 15 | fifteen | خْمُسْتَاشْ | خْمُسْتَاشْ | Ansatz 1: Exakter Konsonanten-Match |
| 906 | sechzehn / 16 | sixteen | سُتَّاشْ | سُتَّاشْ | Ansatz 1: Exakter Konsonanten-Match |
| 907 | siebzehn / 17 |  | سبعتاش |  | Kein Match gefunden |
| 908 | achtzehn / 18 |  | ثمنطاش |  | Kein Match gefunden |
| 909 | neunzehn / 19 |  | تسعتاش |  | Kein Match gefunden |
| 910 | draußen |  | بَرَّا |  | Kein Match gefunden |
| 913 | Wie alt bist du? |  | قداش عمرك؟ |  | Kein Match gefunden |
| 914 | Jahr |  | سَنَة | سُنَّةْ | Ansatz 1: Exakter Konsonanten-Match |
| 915 | aus / von |  | من |  | Kein Match gefunden |
| 916 | dreitausend / 3000 |  | ثلاثة آلاف |  | Kein Match gefunden |
| 917 | Wo ist / wo befindet sich? |  | وين يجي؟ |  | Kein Match gefunden |
| 918 | Wie komme ich zu...? |  | كيفاش نمشي لـ؟ |  | Kein Match gefunden |
| 919 | biege ab | turn | دورْ | دورْ | Ansatz 1: Exakter Konsonanten-Match |
| 920 | erste Kreuzung / erster Kreisverkehr / erste Abzweigung |  | الدورة الأولى |  | Kein Match gefunden |
| 921 | links |  | عاليسار |  | Kein Match gefunden |
| 922 | rechts |  | عاليمين |  | Kein Match gefunden |
| 923 | geradeaus |  | طول (طول) |  | Kein Match gefunden |
| 924 | nach / danach (Präp.) | after | بَعْدْ | بْعِدْ | Ansatz 1: Exakter Konsonanten-Match |
| 925 | am Ende |  | في الآخر |  | Kein Match gefunden |
| 926 | von hier |  | من هوني |  | Kein Match gefunden |
| 927 | mittel / mittelweit |  | متوسط |  | Kein Match gefunden |
| 928 | Kilometer | kilometers | كِيلُومِتْرْ | كِيلُومِتْرْ | Ansatz 1: Exakter Konsonanten-Match |
| 930 | gegenüber |  | مقابل |  | Kein Match gefunden |
| 931 | Parkplatz |  | باركينغ |  | Kein Match gefunden |
| 932 | Der Markt |  | المرشي |  | Kein Match gefunden |
| 933 | Die Post |  | البوسطة |  | Kein Match gefunden |
| 935 | Bahnhof |  | محطة الترينو |  | Kein Match gefunden |
| 936 | Das Café / Der Kaffee |  | القهوة | قَهْوَةْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 937 | Pasteur-Platz / Platz Pasteur |  | بلاص باستور |  | Kein Match gefunden |
| 939 | Fahrer |  | شيفور |  | Kein Match gefunden |
| 940 | Taxi | cab | تَاكْسِي | تَاكْسِي | Ansatz 1: Exakter Konsonanten-Match |
| 942 | gern geschehen / Bitte sehr (Antwort auf Danke) |  | من غير مزية |  | Kein Match gefunden |
| 943 | weißt du nicht? |  | تعرفشي |  | Kein Match gefunden |
| 944 | woher |  | منين |  | Kein Match gefunden |
| 945 | Irak |  | العراق | عِرَاقْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 946 | Palästina | palestine | فِلَسْطِينْ | فِلَسْطِينْ | Ansatz 1: Exakter Konsonanten-Match |
| 949 | Stadt |  | مَدِينَة | مْدِينَة | Ansatz 1: Exakter Konsonanten-Match |
| 950 | hier |  | هْنَا |  | Kein Match gefunden |
| 951 | geht! (Plural) |  | إِمْشِيوا |  | Kein Match gefunden |
| 952 | öffne |  | حَلّ |  | Kein Match gefunden |
| 953 | schließe! / er schloss |  | سَكَّر | سكّر | Ansatz 1: Exakter Konsonanten-Match |
| 954 | komm hierher |  | إيجي لهوني |  | Kein Match gefunden |
| 955 | geh zurück |  | أرجع |  | Kein Match gefunden |
| 956 | geht zurück |  | أرجعو |  | Kein Match gefunden |
| 957 | dein Platz |  | بْلَاصْتَك |  | Kein Match gefunden |
| 958 | eure Plätze |  | بلايصكم |  | Kein Match gefunden |
| 959 | Katze (f.) |  | قَطُّوسَةْ | قَطُّوسَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 960 | groß (Plural) |  | كبار |  | Kein Match gefunden |
| 961 | schön / gut (f.) |  | باهية |  | Kein Match gefunden |
| 962 | ein bisschen / etwas |  | شْوَيَّة |  | Kein Match gefunden |
| 965 | Gott segne dich |  | بارك الله فيك |  | Kein Match gefunden |
| 966 | Freund / Liebling |  | حَبِيب |  | Kein Match gefunden |
| 967 | mein Bruder |  | خُويَا |  | Kein Match gefunden |
| 968 | beschämt / verlegen |  | حاشم |  | Kein Match gefunden |
| 969 | ich brauche |  | حاجتي |  | Kein Match gefunden |
| 971 | gib mir zurück |  | رجعلي |  | Kein Match gefunden |
| 972 | Typ / Art | type | نَوْعْ | نَوْعْ | Ansatz 1: Exakter Konsonanten-Match |
| 973 | Häuser |  | ديار |  | Kein Match gefunden |
| 974 | Idee |  | فِكْرَة |  | Kein Match gefunden |
| 975 | Arbeit |  | خِدْمَة |  | Kein Match gefunden |
| 976 | Sache / Ding |  | حَاجَة | حَاجَة | Ansatz 1: Exakter Konsonanten-Match |
| 977 | Staub | dust | غَبْرَةْ | غَبْرَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 978 | der Brauch / die Tradition |  | العرف | عَرْفْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 980 | Cola |  | كوكا |  | Kein Match gefunden |
| 981 | Minze | mint | نَّعْنَاعْ | نَّعْنَاعْ | Ansatz 1: Exakter Konsonanten-Match |
| 982 | Oliven | olive | زِيتُونْ | زِيتُونْ | Ansatz 1: Exakter Konsonanten-Match |
| 983 | Hand |  | يَد |  | Kein Match gefunden |
| 984 | Zeit |  | وَقْت | وَقْتْ | Ansatz 1: Exakter Konsonanten-Match |
| 985 | Verwaltung |  | إدارة |  | Kein Match gefunden |
| 987 | Kiste / Box | box | صُنْدُوقْ | صُنْدُوقْ | Ansatz 1: Exakter Konsonanten-Match |
| 988 | Farbe |  | لَوْن | لُونْ | Ansatz 1: Exakter Konsonanten-Match |
| 989 | Name |  | اِسْم | إسْمْ | Ansatz G: Match nach Hamza-/Ta-Marbuta-Normalisierung |
| 990 | Intelligenz |  | ذكا |  | Kein Match gefunden |
| 991 | Nebel |  | ضَبَاب | ضْبَابْ | Ansatz 1: Exakter Konsonanten-Match |
| 992 | Schnee |  | ثَلْج | ثِلْجْ | Ansatz 1: Exakter Konsonanten-Match |
| 993 | Kamel |  | جَمَل | جَمِّلْ | Ansatz 1: Exakter Konsonanten-Match |
| 994 | Besuch |  | زِيَارَة | زِيَارَة | Ansatz 1: Exakter Konsonanten-Match |
| 995 | Häuser / Zimmer |  | بْيُوت |  | Kein Match gefunden |
| 997 | Badezimmer |  | بيت الماء |  | Kein Match gefunden |
| 998 | Dachterrasse |  | سْطُوح |  | Kein Match gefunden |
| 999 | Hof |  | حُوش |  | Kein Match gefunden |
| 1000 | Garten |  | جْنِينَة | جْنِينَة | Ansatz 1: Exakter Konsonanten-Match |
| 1001 | Baum |  | شَجْرَة |  | Kein Match gefunden |
| 1002 | Blumen |  | زَهْر | زْهَرْ | Ansatz 1: Exakter Konsonanten-Match |
| 1003 | Wand |  | حِيط | حيطْ | Ansatz 1: Exakter Konsonanten-Match |
| 1004 | Decke / Dach |  | سَقْف | سْقَفْ | Ansatz 1: Exakter Konsonanten-Match |
| 1005 | Licht | light | ضَوّْ | ضَوّْ | Ansatz 1: Exakter Konsonanten-Match |
| 1006 | Schlüssel |  | مِفْتَاح | مِفْتَاحْ | Ansatz 1: Exakter Konsonanten-Match |
| 1007 | Bett (mit Gestell) |  | سْرِير |  | Kein Match gefunden |
| 1008 | Kissen |  | مَخَدَّة | مْخَدَّةْ | Ansatz 1: Exakter Konsonanten-Match |
| 1009 | Decke (zum Zudecken) |  | بَطَّانِيَة |  | Kein Match gefunden |
| 1010 | Zeug / Sachen / Gepäck (allg.) | thing | دْبَشْ | دْبَشْ | Ansatz 1: Exakter Konsonanten-Match |
| 1011 | Schrank / Kleiderschrank |  | خْزَانَة | خْزَانَة | Ansatz 1: Exakter Konsonanten-Match |
| 1012 | Teppich |  | زَرْبِيَة |  | Kein Match gefunden |
| 1013 | Fernseher / TV | television | تَلْفْزَة | تَلْفْزَة | Ansatz 1: Exakter Konsonanten-Match |
| 1014 | Radio |  | راديو |  | Kein Match gefunden |
| 1015 | Krankenhaus (Darija) |  | سبطار |  | Kein Match gefunden |
| 1016 | Hotel |  | أوتيل |  | Kein Match gefunden |
| 1017 | Meer |  | بحر |  | Kein Match gefunden |
| 1018 | Berg | mountain | جْبَلْ | جْبَلْ | Ansatz 1: Exakter Konsonanten-Match |
| 1019 | Fluss | valley | وَادْ | وَادْ | Ansatz 1: Exakter Konsonanten-Match |
| 1020 | Sonne | sun | شَمْسْ | شَمْسْ | Ansatz 1: Exakter Konsonanten-Match |
| 1021 | Mond |  | قمر |  | Kein Match gefunden |
| 1022 | Welt (Leben / Dasein) | transient | دِنْيَا | دِنْيَا | Ansatz 1: Exakter Konsonanten-Match |
| 1023 | klein |  | صغير |  | Kein Match gefunden |
| 1024 | lang / groß (f.) |  | طويلة |  | Kein Match gefunden |
| 1025 | unhygienisch / dreckig | dirt | وْسَخْ | وْسَخْ | Ansatz 1: Exakter Konsonanten-Match |
| 1026 | offen | open | مَحْلُولْ | مَحْلُولْ | Ansatz 1: Exakter Konsonanten-Match |
| 1027 | geschlossen | closed | مْسَكِّرْ | مْسَكِّرْ | Ansatz 1: Exakter Konsonanten-Match |
| 1028 | innen |  | داخل |  | Kein Match gefunden |
| 1030 | neben / nah / bei |  | بحذا |  | Kein Match gefunden |
| 1031 | zu / nach |  | إلى |  | Kein Match gefunden |
| 1033 | dort | there | غَادِي | غَادِي | Ansatz 1: Exakter Konsonanten-Match |
| 1034 | ich mag / will |  | نحب |  | Kein Match gefunden |
| 1035 | ich wohne |  | نسكن |  | Kein Match gefunden |
| 1037 | ich arbeite |  | نخدم |  | Kein Match gefunden |
| 1038 | ich trinke |  | نشرب |  | Kein Match gefunden |
| 1040 | ich stehe auf |  | نقوم |  | Kein Match gefunden |
| 1041 | ich öffne |  | نحل | نْحَلْ | Ansatz 1: Exakter Konsonanten-Match |
| 1042 | ich schließe |  | نسكر |  | Kein Match gefunden |
| 1044 | setz dich! / bleib! (Imperativ) |  | اقعد |  | Kein Match gefunden |
| 1045 | gib her / gib mir (Imperativ) | give | هَاتْ | هَاتْ | Ansatz 1: Exakter Konsonanten-Match |
| 1046 | komm rein! |  | أُدْخُلْ |  | Kein Match gefunden |
| 1048 | Kafteji |  | كفتاجي |  | Kein Match gefunden |
| 1049 | sie kosten / sie kommen |  | يجيوا |  | Kein Match gefunden |
| 1050 | dieses Mal zahle ich |  | المرة هاذي نخلص أنا |  | Kein Match gefunden |
| 1051 | Gott helfe dir |  | يعينك ربي |  | Kein Match gefunden |
| 1052 | mein Sohn |  | ولدي |  | Kein Match gefunden |
| 1053 | Bagdad |  | بغداد |  | Kein Match gefunden |
| 1054 | du wählst |  | تختار |  | Kein Match gefunden |
| 1055 | Menü |  | منو |  | Kein Match gefunden |
| 1056 | Dessert |  | ديسار |  | Kein Match gefunden |
| 1057 | du trinkst |  | تشرب |  | Kein Match gefunden |
| 1058 | tunesisches Essen |  | ماكلة تونسية |  | Kein Match gefunden |
| 1059 | Mittag |  | نص النهار |  | Kein Match gefunden |
| 1060 | viel |  | برشا |  | Kein Match gefunden |
| 1061 | Boga |  | بوڨا |  | Kein Match gefunden |
| 1062 | Espresso |  | إكسبريس |  | Kein Match gefunden |
| 1063 | Cappuccino | cappuccino | كَابُوسَانْ | كَابُوسَانْ | Ansatz 1: Exakter Konsonanten-Match |
| 1064 | schwarzer Kaffee (d...) |  | ديراكت | دِيرَاكِتْ | Ansatz 1: Exakter Konsonanten-Match |
| 1065 | mit Minze |  | بالنعناع |  | Kein Match gefunden |
| 1067 | du spielst |  | تلعب |  | Kein Match gefunden |
| 1068 | Konditorei |  | باتيسري |  | Kein Match gefunden |
| 1069 | Gebäck / Kekse (allg.) |  | كعك |  | Kein Match gefunden |
| 1070 | tunesische Süßigkeiten |  | حلو تونسي |  | Kein Match gefunden |
| 1071 | Teller / Platte |  | صحفة | صَحْفَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 1072 | Journalist |  | صحافي |  | Kein Match gefunden |
| 1074 | Gabeln |  | فراشط |  | Kein Match gefunden |
| 1075 | Löffel (Plural) |  | مغارف |  | Kein Match gefunden |
| 1076 | Serviette |  | منديلة |  | Kein Match gefunden |
| 1077 | Servietten |  | منادل |  | Kein Match gefunden |
| 1078 | geschlossen (Plural) |  | مقافل |  | Kein Match gefunden |
| 1079 | Taschen |  | شَقَايِل |  | Kein Match gefunden |
| 1082 | Kochtöpfe |  | طناجر |  | Kein Match gefunden |
| 1083 | Kasserolle |  | كسرونة |  | Kein Match gefunden |
| 1084 | Pfanne |  | قَلَّايَة | قَلَّايَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 1085 | Pfannen |  | قلايات |  | Kein Match gefunden |
| 1086 | süß (f.) |  | حَلْوَة | حْلُوَّة | Ansatz 1: Exakter Konsonanten-Match |
| 1087 | heiß (Plural) |  | سَخَّان | سَخَّانْ | Ansatz 1: Exakter Konsonanten-Match |
| 1088 | kalt (Plural) |  | بَارِدِين |  | Kein Match gefunden |
| 1089 | süß (Plural) |  | حلوين |  | Kein Match gefunden |
| 1090 | leicht (f.) |  | خْفِيفَة |  | Kein Match gefunden |
| 1091 | stark (f.) |  | قْوِيَّة |  | Kein Match gefunden |
| 1092 | bitter (f.) |  | مُرَّة |  | Kein Match gefunden |
| 1093 | leicht (Plural) |  | خْفَاف |  | Kein Match gefunden |
| 1094 | stark (Plural) |  | قويين |  | Kein Match gefunden |
| 1095 | er wechselt (€) |  | يصرف |  | Kein Match gefunden |
| 1096 | Er kauft |  | يشري |  | Kein Match gefunden |
| 1097 | Er wohnt |  | يسكن |  | Kein Match gefunden |
| 1099 | nimm! |  | خوذ |  | Kein Match gefunden |
| 1101 | ein Uhr |  | الْمَاضِي سَاعَة |  | Kein Match gefunden |
| 1102 | 10:10 |  | العشرة ودرجين |  | Kein Match gefunden |
| 1103 | 12:15 |  | نص النهار وربع |  | Kein Match gefunden |
| 1104 | 00:15 |  | نص الليل وربع |  | Kein Match gefunden |
| 1105 | 7:04 |  | السبعة وأربعة |  | Kein Match gefunden |
| 1106 | 11:30 |  | الحداش ونص |  | Kein Match gefunden |
| 1107 | 9:45 |  | العشرة غير ربع |  | Kein Match gefunden |
| 1108 | ich spreche Arabisch |  | نتكلم بالعربي |  | Kein Match gefunden |
| 1109 | zusammen |  | مع بعضهم |  | Kein Match gefunden |
| 1112 | ich (be)zahle für dich |  | نخلص عليك |  | Kein Match gefunden |
| 1113 | bitte |  | بالله |  | Kein Match gefunden |
| 1114 | Gott segne |  | الله يبارك |  | Kein Match gefunden |
| 1115 | jeden Tag |  | كل يوم |  | Kein Match gefunden |
| 1116 | Er steht auf |  | يقوم |  | Kein Match gefunden |
| 1117 | Dusche |  | دُوش | دُوشْ | Ansatz 1: Exakter Konsonanten-Match |
| 1118 | Er ist zu abend |  | يتعشى |  | Kein Match gefunden |
| 1119 | Klamotten / Kleidungsstücke (Darija) |  | حَوَايِج | حْوَايِجْ | Ansatz 1: Exakter Konsonanten-Match |
| 1120 | klein(es) Eid(-Fest) |  | العيد الصغير |  | Kein Match gefunden |
| 1121 | sie tragen (Kleidung) |  | يلبسو |  | Kein Match gefunden |
| 1123 | er verkauft |  | يبيع |  | Kein Match gefunden |
| 1125 | frohes Fest / Frohes Eid |  | عيدك مبروك |  | Kein Match gefunden |
| 1126 | auf viele Jahre |  | دايمة سنين |  | Kein Match gefunden |
| 1128 | kurz (f.) |  | قْصِيرَة |  | Kein Match gefunden |
| 1130 | eng (f.) |  | ضَيْقَة | ضَيّْقَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 1131 | geräumig / weit (f.) |  | وَاسْعَة |  | Kein Match gefunden |
| 1132 | kurz (Plural) |  | قْصَار |  | Kein Match gefunden |
| 1133 | lang (Plural) |  | طْوَال |  | Kein Match gefunden |
| 1134 | eng (Plural) |  | ضيقين |  | Kein Match gefunden |
| 1135 | weit (Plural) |  | واسعين |  | Kein Match gefunden |
| 1137 | neu (f.) |  | جْدِيدَة |  | Kein Match gefunden |
| 1138 | alt (f.) |  | قْدِيمَة |  | Kein Match gefunden |
| 1139 | zerrissen (f.) |  | مقطعة |  | Kein Match gefunden |
| 1140 | sauber (f.) |  | نْظِيفَة |  | Kein Match gefunden |
| 1141 | schmutzig (f.) |  | ماسخة |  | Kein Match gefunden |
| 1142 | neu (Plural) |  | جَدِّدْ | جَدِّدْ | Ansatz 1: Exakter Konsonanten-Match |
| 1143 | zerrissen (Plural) |  | مقطعين |  | Kein Match gefunden |
| 1144 | sauber (Plural) |  | نظاف |  | Kein Match gefunden |
| 1145 | schmutzig (Plural) |  | مسخين |  | Kein Match gefunden |
| 1146 | Fäden |  | خيوط |  | Kein Match gefunden |
| 1147 | Hüte |  | طرابش |  | Kein Match gefunden |
| 1149 | Hemden |  | سواري | سواري | Ansatz 1: Exakter Konsonanten-Match |
| 1150 | Unterhemden |  | مراول |  | Kein Match gefunden |
| 1155 | Jacken |  | فيستات |  | Kein Match gefunden |
| 1156 | Hosen |  | سراويل |  | Kein Match gefunden |
| 1157 | Mäntel |  | كبابط |  | Kein Match gefunden |
| 1158 | Shorts (Plural) |  | شورتوات |  | Kein Match gefunden |
| 1159 | Schuhe (Pl.) |  | صبابط |  | Kein Match gefunden |
| 1160 | Sneaker (Plural) |  | سبادريات |  | Kein Match gefunden |
| 1162 | zerreißen |  | يَقْطَع |  | Kein Match gefunden |
| 1163 | er macht schmutzig |  | يْمَسَّخ |  | Kein Match gefunden |
| 1164 | geschnitten |  | مَقْصُوص |  | Kein Match gefunden |
| 1165 | gewaschen |  | مَغْسُول | مَغْسُولْ | Ansatz 1: Exakter Konsonanten-Match |
| 1166 | genäht |  | مْخَيَّط |  | Kein Match gefunden |
| 1167 | er reinigt |  | ينظف |  | Kein Match gefunden |
| 1169 | er öffnet |  | يحل |  | Kein Match gefunden |
| 1172 | Größe / Maß |  | قِيَاس |  | Kein Match gefunden |
| 1173 | du trägst |  | تلبس |  | Kein Match gefunden |
| 1174 | tragend / angezogen (Kleidung) |  | لَابِس | لَابِسْ | Ansatz 1: Exakter Konsonanten-Match |
| 1175 | du magst |  | تحب |  | Kein Match gefunden |
| 1177 | blau (f.) |  | زَرْقَة |  | Kein Match gefunden |
| 1178 | dunkel (f.) |  | غَامْقَة |  | Kein Match gefunden |
| 1179 | dunkel (Plural) |  | غامقين |  | Kein Match gefunden |
| 1180 | hell (f.) |  | فَاتْحَة |  | Kein Match gefunden |
| 1181 | hell (Plural) |  | فاتحين |  | Kein Match gefunden |
| 1182 | sitzend / (gerade) dabei | sit | قَاعِدْ | قَاعِدْ | Ansatz 1: Exakter Konsonanten-Match |
| 1183 | gerade (f.) |  | قاعدة |  | Kein Match gefunden |
| 1184 | gerade (Plural) |  | قاعدين |  | Kein Match gefunden |
| 1185 | du gehst |  | تمشي |  | Kein Match gefunden |
| 1186 | er geht |  | يمشي |  | Kein Match gefunden |
| 1187 | wir gehen |  | نمشيو |  | Kein Match gefunden |
| 1188 | ihr geht |  | تمشيو |  | Kein Match gefunden |
| 1189 | sie gehen |  | يمشيو |  | Kein Match gefunden |
| 1192 | wir schreiben |  | نكتبو |  | Kein Match gefunden |
| 1193 | ihr schreibt |  | تكتبو |  | Kein Match gefunden |
| 1194 | sie schreiben |  | يكتبو |  | Kein Match gefunden |
| 1195 | er schickt / er sendet |  | يبعث |  | Kein Match gefunden |
| 1196 | gehend / unterwegs | going | مَاشِي | مَاشِي | Ansatz 1: Exakter Konsonanten-Match |
| 1198 | wir machen |  | نعملو |  | Kein Match gefunden |
| 1199 | ich bringe |  | نجيب |  | Kein Match gefunden |
| 1200 | wir rufen an |  | نطلبو |  | Kein Match gefunden |
| 1202 | ihn treffen |  | نقابلو |  | Kein Match gefunden |
| 1203 | er sprach mit dir |  | تكلمك |  | Kein Match gefunden |
| 1204 | ich spreche mit ihr |  | نكلمها |  | Kein Match gefunden |
| 1205 | was? (f.) |  | شنوّة |  | Kein Match gefunden |
| 1206 | Problem | problem | مُشْكِلْ | مُشْكِلْ | Ansatz 1: Exakter Konsonanten-Match |
| 1207 | für wen |  | لي شكون |  | Kein Match gefunden |
| 1208 | von wem |  | من عند شكون |  | Kein Match gefunden |
| 1209 | mit wem |  | مع شكون |  | Kein Match gefunden |
| 1210 | Sousse |  | سوسة |  | Kein Match gefunden |
| 1211 | der zweite |  | الثاني | ثَانِي | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 1212 | wohin |  | لْوين |  | Kein Match gefunden |
| 1213 | es gibt (t..) |  | ثمّة |  | Kein Match gefunden |
| 1215 | weil | because | خَاطِرْ | خَاطِرْ | Ansatz 1: Exakter Konsonanten-Match |
| 1216 | du wohnst |  | تسكن |  | Kein Match gefunden |
| 1217 | du bleibst |  | تقعد |  | Kein Match gefunden |
| 1218 | durstig | thirsty | عُطْشَانْ | عُطْشَانْ | Ansatz 1: Exakter Konsonanten-Match |
| 1219 | er spricht |  | يتكلم |  | Kein Match gefunden |
| 1220 | langsam / ein bisschen |  | بشوية |  | Kein Match gefunden |
| 1221 | meine Familie |  | عائلتي |  | Kein Match gefunden |
| 1222 | England |  | إنڨلترا |  | Kein Match gefunden |
| 1223 | London | london | لُنْدُنْ | لُنْدُنْ | Ansatz 1: Exakter Konsonanten-Match |
| 1224 | letztes Wochenende |  | الويكاند الفايت |  | Kein Match gefunden |
| 1225 | enden |  | وفى | وَفِيْ | Ansatz G: Match nach Hamza-/Ta-Marbuta-Normalisierung |
| 1227 | verbringen |  | يعدي |  | Kein Match gefunden |
| 1228 | wir vergessen |  | ننساو |  | Kein Match gefunden |
| 1229 | ich werfe |  | نرمي |  | Kein Match gefunden |
| 1230 | Ball |  | كُورَةْ | كُورَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 1231 | mein Freund |  | صاحبي |  | Kein Match gefunden |
| 1232 | du findest |  | تلقى |  | Kein Match gefunden |
| 1233 | oder nicht |  | ولا لا |  | Kein Match gefunden |
| 1234 | sie beginnen |  | يبداو |  | Kein Match gefunden |
| 1235 | sie lesen / lernen |  | يقراو |  | Kein Match gefunden |
| 1236 | ich machte / tat |  | عملت |  | Kein Match gefunden |
| 1237 | wir saßen / wir blieben |  | قعدنا |  | Kein Match gefunden |
| 1238 | wir sprechen / 	wir erzählen |  | نحكيو |  | Kein Match gefunden |
| 1239 | ich kaufte |  | شريت |  | Kein Match gefunden |
| 1240 | Sachen / Einkäufe |  | قضايات |  | Kein Match gefunden |
| 1241 | ich blieb |  | قعدت |  | Kein Match gefunden |
| 1243 | lecker (f.) |  | بنينة |  | Kein Match gefunden |
| 1245 | Film |  | فيلم |  | Kein Match gefunden |
| 1247 | vergehen / vorbeigehen |  | تعدى |  | Kein Match gefunden |
| 1248 | toll / wunderbar / Spaß / lustig / unterhaltsam |  | تحفون | تَحْفُونْ | Ansatz 1: Exakter Konsonanten-Match |
| 1249 | sie besuchen |  | يزوروا |  | Kein Match gefunden |
| 1250 | sie gingen hinaus / verließen |  | خرجوا |  | Kein Match gefunden |
| 1251 | sie kamen an |  | وصلوا |  | Kein Match gefunden |
| 1252 | müde |  | تعبانين |  | Kein Match gefunden |
| 1253 | sie frühstückten |  | فطروا |  | Kein Match gefunden |
| 1254 | sie ruhten sich aus |  | ارتاحوا |  | Kein Match gefunden |
| 1256 | Sidi Salem |  | سيدي سالم |  | Kein Match gefunden |
| 1257 | Familie |  | عايلة |  | Kein Match gefunden |
| 1258 | sie verbrachten |  | عدو | عدُو | Ansatz 1: Exakter Konsonanten-Match |
| 1259 | Nachmittag / Abend |  | عشية |  | Kein Match gefunden |
| 1260 | sie übernachteten |  | باتوا |  | Kein Match gefunden |
| 1261 | morgen / nächster Tag | tomorrow | غُدْوَةْ | غُدْوَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 1262 | sich verabschieden von |  | سلموا على |  | Kein Match gefunden |
| 1263 | sie kehrten zurück |  | رجعوا |  | Kein Match gefunden |
| 1266 | Straße / Weg |  | ثنية |  | Kein Match gefunden |
| 1267 | Ich bringe den Müll raus |  | نخرج السبلة |  | Kein Match gefunden |
| 1268 | Gehen wir morgen ins Schwimmbad? |  | نمشيو للبيسين غدوة؟ |  | Kein Match gefunden |
| 1269 | Der Kaffee ist fertig |  | القهوة حاضرة |  | Kein Match gefunden |
| 1270 | Ich komme (ja) schon |  | هاني جيت |  | Kein Match gefunden |
| 1271 | ich wache auf |  | نفيق |  | Kein Match gefunden |
| 1272 | ich mache / ich tue |  | نعمل |  | Kein Match gefunden |
| 1274 | ich bereite vor |  | نحضر |  | Kein Match gefunden |
| 1275 | ich wasche |  | نغسل |  | Kein Match gefunden |
| 1276 | ich ziehe mich an / ich trage |  | نلبس |  | Kein Match gefunden |
| 1277 | ich gehe |  | نمشي |  | Kein Match gefunden |
| 1278 | ich komme an |  | نوصل |  | Kein Match gefunden |
| 1279 | ich fange an / ich beginne |  | نبدا |  | Kein Match gefunden |
| 1281 | ich nehme |  | ناخذ |  | Kein Match gefunden |
| 1282 | ich rieche / ich atme ein |  | نشم |  | Kein Match gefunden |
| 1283 | ich höre / ich höre zu |  | نسمع |  | Kein Match gefunden |
| 1284 | ich gehe nach Hause |  | نروح |  | Kein Match gefunden |
| 1285 | ich esse zu Abend |  | نتعشى |  | Kein Match gefunden |
| 1286 | ich schaue |  | نتفرج |  | Kein Match gefunden |
| 1287 | ich lese / ich lerne |  | نقرا |  | Kein Match gefunden |
| 1288 | ich schlafe |  | نرقد |  | Kein Match gefunden |
| 1289 | sie stand auf |  | قامت |  | Kein Match gefunden |
| 1290 | ich stand auf |  | قُمْت |  | Kein Match gefunden |
| 1291 | sie wachte auf |  | فاقت |  | Kein Match gefunden |
| 1292 | ich wachte auf |  | فُقْت |  | Kein Match gefunden |
| 1293 | sie wusch |  | غَسْلِت |  | Kein Match gefunden |
| 1294 | ich wusch |  | غْسِلْت |  | Kein Match gefunden |
| 1295 | sie reinigte |  | نَظَّفِت |  | Kein Match gefunden |
| 1296 | ich reinigte |  | نَظَّفْت |  | Kein Match gefunden |
| 1297 | sie frühstückte |  | فَطْرِت |  | Kein Match gefunden |
| 1298 | ich frühstückte |  | فْطَرْت |  | Kein Match gefunden |
| 1299 | sie trat ein |  | دَخْلِت |  | Kein Match gefunden |
| 1300 | ich trat ein |  | دْخَلْت |  | Kein Match gefunden |
| 1301 | sie ging raus |  | خَرْجِتْ |  | Kein Match gefunden |
| 1302 | ich ging raus |  | خْرَجْت |  | Kein Match gefunden |
| 1303 | sie ging |  | مْشاتْ |  | Kein Match gefunden |
| 1304 | ich ging |  | مْشِيت |  | Kein Match gefunden |
| 1305 | sie fuhr |  | ساقِتْ |  | Kein Match gefunden |
| 1306 | ich fuhr |  | سُقْت |  | Kein Match gefunden |
| 1307 | sie arbeitete |  | خِدْمِت |  | Kein Match gefunden |
| 1308 | ich arbeitete |  | خْدِمت |  | Kein Match gefunden |
| 1309 | sie entspannte sich |  | رْتاحِت |  | Kein Match gefunden |
| 1310 | ich entspannte mich |  | رْتَحْت |  | Kein Match gefunden |
| 1311 | sie kehrte zurück |  | رَجْعِت |  | Kein Match gefunden |
| 1312 | ich kehrte zurück |  | رْجَعْت |  | Kein Match gefunden |
| 1313 | sie fing an |  | بْدات |  | Kein Match gefunden |
| 1314 | ich fing an |  | بْدِيت |  | Kein Match gefunden |
| 1315 | sie schaute |  | تْفَرَّجِت |  | Kein Match gefunden |
| 1316 | ich schaute |  | تْفَرَّجْت |  | Kein Match gefunden |
| 1317 | sie spielte |  | لَعْبِتْ |  | Kein Match gefunden |
| 1318 | ich spielte |  | لْعَبْت |  | Kein Match gefunden |
| 1319 | sie aß zu Abend |  | تْعَشَّات |  | Kein Match gefunden |
| 1320 | ich aß zu Abend |  | تْعَشِّيت |  | Kein Match gefunden |
| 1321 | sie duschte |  | دَوْشِت |  | Kein Match gefunden |
| 1322 | ich duschte |  | دَوَشْت |  | Kein Match gefunden |
| 1323 | sie kochte |  | طَيَّبِت |  | Kein Match gefunden |
| 1324 | ich kochte |  | طَيَّبْت |  | Kein Match gefunden |
| 1325 | sie bereitete vor |  | حَضْرِتْ |  | Kein Match gefunden |
| 1326 | ich bereitete vor |  | حَضَّرْت |  | Kein Match gefunden |
| 1327 | sie schlief |  | رَقْدِتْ |  | Kein Match gefunden |
| 1328 | ich schlief |  | رْقَدْت |  | Kein Match gefunden |
| 1329 | sie erlaubte |  | خَلَّات | خْلَاتْ | Ansatz 1: Exakter Konsonanten-Match |
| 1330 | ich erlaubte |  | خَلِّيت |  | Kein Match gefunden |
| 1331 | sie akzeptierte |  | قِبْلِتْ |  | Kein Match gefunden |
| 1332 | ich akzeptierte |  | قْبِلْت |  | Kein Match gefunden |
| 1333 | sie antwortete |  | جاوْبِت |  | Kein Match gefunden |
| 1334 | ich antwortete |  | جاوِبْت |  | Kein Match gefunden |
| 1335 | sie organisierte |  | نَظَّمِت |  | Kein Match gefunden |
| 1336 | ich organisierte |  | نَظَّمْت |  | Kein Match gefunden |
| 1337 | sie nahm teil |  | حَضِرت |  | Kein Match gefunden |
| 1338 | ich nahm teil |  | حْضَرْت |  | Kein Match gefunden |
| 1339 | sie ging hoch |  | طَلْعِت |  | Kein Match gefunden |
| 1340 | ich ging hoch |  | طْلَعْت |  | Kein Match gefunden |
| 1341 | sie ging runter |  | هَبْطِت |  | Kein Match gefunden |
| 1342 | ich ging runter |  | هْبَطْت |  | Kein Match gefunden |
| 1343 | sie fragte |  | سِأْلِت |  | Kein Match gefunden |
| 1344 | ich fragte |  | سْإِلْت |  | Kein Match gefunden |
| 1346 | ich war |  | كُنْت |  | Kein Match gefunden |
| 1347 | sie konnte |  | نَجَّمِت |  | Kein Match gefunden |
| 1348 | ich konnte |  | نَجَّمْت |  | Kein Match gefunden |
| 1349 | sie wusste / sie kannte |  | عَرْفِت |  | Kein Match gefunden |
| 1350 | ich wusste / ich kannte |  | عْرَفْت |  | Kein Match gefunden |
| 1351 | sie wurde |  | وَلَّات |  | Kein Match gefunden |
| 1352 | ich wurde |  | وَلِّيت |  | Kein Match gefunden |
| 1353 | sie brachte |  | جابِتْ |  | Kein Match gefunden |
| 1354 | ich brachte |  | جِبْت |  | Kein Match gefunden |
| 1355 | sie hob / sie trug |  | هَزِّت |  | Kein Match gefunden |
| 1356 | ich hob / ich trug |  | هَزِّيت |  | Kein Match gefunden |
| 1357 | sie wechselte |  | بَدَّلِتْ |  | Kein Match gefunden |
| 1358 | ich wechselte |  | بَدَّلْت |  | Kein Match gefunden |
| 1359 | sie wählte |  | اِخْتارِتْ |  | Kein Match gefunden |
| 1360 | ich wählte |  | اِخْتَرْت |  | Kein Match gefunden |
| 1362 | ich öffnete |  | حَلِّيت |  | Kein Match gefunden |
| 1363 | sie kam |  | جات |  | Kein Match gefunden |
| 1364 | ich kam |  | جيت |  | Kein Match gefunden |
| 1365 | sie machte / sie tat |  | عَمْلِتْ |  | Kein Match gefunden |
| 1367 | sie fand |  | لْقات |  | Kein Match gefunden |
| 1368 | ich fand |  | لْقِيت |  | Kein Match gefunden |
| 1369 | sie gab |  | عْطاتْ |  | Kein Match gefunden |
| 1370 | ich gab / du gabst |  | عْطِيت |  | Kein Match gefunden |
| 1371 | sie nahm |  | خْذاتْ |  | Kein Match gefunden |
| 1372 | ich nahm |  | خْذِيت |  | Kein Match gefunden |
| 1373 | sie half |  | عاوَنِتْ |  | Kein Match gefunden |
| 1374 | ich half |  | عاوَنْت |  | Kein Match gefunden |
| 1375 | sie blieb / sie saß |  | قَعْدِت |  | Kein Match gefunden |
| 1376 | ich blieb / ich saß |  | قْعَدْت |  | Kein Match gefunden |
| 1377 | sie stand auf (vom Platz) |  | وِقْفِتْ |  | Kein Match gefunden |
| 1378 | ich stand auf (vom Platz) |  | وْقِفْت |  | Kein Match gefunden |
| 1379 | sie schloss |  | سَكَّرِت |  | Kein Match gefunden |
| 1380 | ich schloss |  | سَكَّرْت |  | Kein Match gefunden |
| 1381 | sie legte / sie stellte |  | حَطِّت |  | Kein Match gefunden |
| 1382 | ich legte / ich stellte |  | حَطِّيت |  | Kein Match gefunden |
| 1383 | sie sagte |  | قالِتْ |  | Kein Match gefunden |
| 1384 | ich sagte |  | قُلْت |  | Kein Match gefunden |
| 1385 | sie benutzte |  | إِسْتَعْمِلِت |  | Kein Match gefunden |
| 1386 | ich benutzte |  | إِسْتَعْمِلت |  | Kein Match gefunden |
| 1387 | sie reiste |  | سافْرِت |  | Kein Match gefunden |
| 1388 | ich reiste |  | سافِرْت |  | Kein Match gefunden |
| 1389 | Ja |  | أي |  | Kein Match gefunden |
| 1390 | Es tut mir leid |  | دازولاي |  | Kein Match gefunden |
| 1391 | Bitte (a...) |  | أَمان |  | Kein Match gefunden |
| 1392 | Bitte (y...) |  | يْعَيِّشِك (b...) |  | Kein Match gefunden |
| 1393 | Bitte (b...) |  | بْرَبِّي |  | Kein Match gefunden |
| 1394 | Bitte sehr / Hier / Nach Ihnen |  | تْفَضَّل |  | Kein Match gefunden |
| 1395 | Guten Morgen (Antwort) |  | صْباح النُّور |  | Kein Match gefunden |
| 1396 | Wie geht's? |  | شْنَحْوالِك؟ |  | Kein Match gefunden |
| 1399 | Mein Name ist… / Ich heiße |  | اِسْمِي… |  | Kein Match gefunden |
| 1400 | Ich habe dich lange nicht gesehen! |  | عَنْدي قَدَّاش ما شُفْتِكْش! |  | Kein Match gefunden |
| 1402 | Wie hast du dich gemacht? |  | وين حَيِّك؟ |  | Kein Match gefunden |
| 1403 | Was gibt's Neues? |  | شْفَمَّا جْديد؟ |  | Kein Match gefunden |
| 1404 | Was gibt's Neues bei dir? |  | شْعَنْدِك جْديد؟ |  | Kein Match gefunden |
| 1405 | Tschüss / Bye |  | باي |  | Kein Match gefunden |
| 1406 | Ciao |  | تْشاوْ | تْشَاو | Ansatz 1: Exakter Konsonanten-Match |
| 1407 | Schöne Nacht |  | لِيَلْتِك زِينَة |  | Kein Match gefunden |
| 1409 | Bis bald, inshallah |  | نْشوفوك عْلى قْريب إِنْ شاء الله |  | Kein Match gefunden |
| 1410 | Bis gleich |  | نْشوفِك بَعْدِيكا |  | Kein Match gefunden |
| 1411 | Bis später |  | نْشوفِك مْبَعْد |  | Kein Match gefunden |
| 1412 | Gute Reise |  | رَبِّي يُوَصِّلِك بِالسَّالِم |  | Kein Match gefunden |
| 1413 | Pass auf dich auf! |  | رُدْ بالِك! |  | Kein Match gefunden |
| 1414 | Pass gut auf dich auf! |  | رُدْ بالِك عَلى رَوحِك! |  | Kein Match gefunden |
| 1416 | Willkommen! (eine Person) |  | مَرْحبا بِيك! |  | Kein Match gefunden |
| 1417 | Willkommen! (mehrere Personen) |  | مَرْحبا بِيكُمْ! |  | Kein Match gefunden |
| 1418 | Gott sei mit dir / Viel Glück |  | رَبِّي مْعاك |  | Kein Match gefunden |
| 1419 | Wir haben dich vermisst! |  | تْوَحَّشْناك! |  | Kein Match gefunden |
| 1420 | Ich habe dich vermisst! |  | تْوَحَّشْتِك! |  | Kein Match gefunden |
| 1422 | Freut mich, dich kennenzulernen |  | إِنْ شاء مَعْرفَة طَيِّبَة! |  | Kein Match gefunden |
| 1424 | Glückwunsch zum Abschluss |  | مَبْروك النَّجاح |  | Kein Match gefunden |
| 1425 | Danke (Antwort auf Glückwunsch) |  | يُبارِك فِيك (يْعَيِّشِك) |  | Kein Match gefunden |
| 1426 | Glückwunsch zur Verlobung / Hochzeit |  | مَبْروكَ وَ إِنْ شاء الله بَدو بِالتَّمام |  | Kein Match gefunden |
| 1427 | Danke (Antwort wenn Glückwünschender ledig) |  | يُبارِك فِيك (يْعَيِّشِك) وَ العاقِبَة لِيك |  | Kein Match gefunden |
| 1428 | Glückwunsch zur Eröffnung |  | مبروك المحل |  | Kein Match gefunden |
| 1429 | Inshallah alles Gute (zur Eröffnung) |  | ان شاء الله عَتْبَة خير |  | Kein Match gefunden |
| 1430 | Inshallah alles mit Segen |  | ان شاء الله كُل شَيْ بِالبَرْكَة |  | Kein Match gefunden |
| 1431 | Inshallah mit Erfolg |  | اِن شاء بِالقَسْم |  | Kein Match gefunden |
| 1432 | Frohen Ramadan! |  | رُمْضانِك مَبْروك |  | Kein Match gefunden |
| 1434 | Danke, gleichfalls (Antwort auf Ramadan/Eid) |  | يْعَيِّشِك، عْلينا وْ عْليك |  | Kein Match gefunden |
| 1435 | Danke, und du genauso |  | يْعَيِّشِك، وَ اِنْتِي بِالأَمْثَل |  | Kein Match gefunden |
| 1436 | Glückwunsch zum Jungen |  | مَبْروك ما تْزادِلك، يِتْرَبَّى في عِزِّك |  | Kein Match gefunden |
| 1437 | Glückwunsch zum Mädchen |  | مَبْروك ما تْزادِلك، تِتْرَبَّى في عِزِّك |  | Kein Match gefunden |
| 1438 | Danke! (auf Glückwünsche zu Geburt) |  | يْعَيِّشِك، رَبِّي يْفَضِّلك |  | Kein Match gefunden |
| 1439 | Danke, wünsche dir das Gleiche |  | يْعَيِّشِك، العاقِبَة لِيك |  | Kein Match gefunden |
| 1440 | Danke, von deinem Mund zu Gott |  | يْعَيِّشِك، مِنْ فُمِّك لِرَبِّي |  | Kein Match gefunden |
| 1441 | Allah möge es annehmen (nach dem Gebet) |  | تَقَبَّل الله |  | Kein Match gefunden |
| 1442 | Von uns und dir und den guten Taten (Antwort) |  | مِنَّا وَ مِنِّك وَ مِالأَعْمال الصَّالِحَة |  | Kein Match gefunden |
| 1443 | Willkommen zurück von der Pilgerfahrt |  | حَجَّة مَقْبولَة |  | Kein Match gefunden |
| 1444 | Mein Beileid |  | البَرْكَة فِيكُمْ |  | Kein Match gefunden |
| 1445 | Danke (Antwort auf Beileid) |  | الدَّايم هُوَّ رَبِّي |  | Kein Match gefunden |
| 1446 | Gott ist groß (wenn jemand gestorben ist) |  | اللَّهُ أَكْبَر |  | Kein Match gefunden |
| 1447 | Möge Gott ihm Frieden schenken |  | اللَّه يَرْحَمو |  | Kein Match gefunden |
| 1448 | Möge Gott ihr Frieden schenken |  | اللَّه يِرْحَمْها |  | Kein Match gefunden |
| 1449 | Gute Besserung! |  | إِنْ شاء الله الباس |  | Kein Match gefunden |
| 1450 | Nach der Dusche (Gruß) |  | صَحَّة الدُّوش |  | Kein Match gefunden |
| 1451 | Nach dem Hammam (Gruß) |  | صَحَّة الحَمَّام |  | Kein Match gefunden |
| 1452 | Nach dem Schwimmen (Gruß) |  | صَحَّة العُومة |  | Kein Match gefunden |
| 1453 | Nach dem Nickerchen (Gruß) |  | صَحَّة النُّوم |  | Kein Match gefunden |
| 1454 | Antwort auf Gruß mit "sa77a" |  | يَعْطيك الصَّحَّة |  | Kein Match gefunden |
| 1455 | Guten Appetit |  | شاهْيَة طَيِّبَة |  | Kein Match gefunden |
| 1456 | Im Namen Gottes (vor dem Essen) |  | بِسْم اللَّه |  | Kein Match gefunden |
| 1457 | Gesundheit (zu jemandem der gerade gegessen hat) |  | صَحَّة | صِحَّةْ | Ansatz 1: Exakter Konsonanten-Match |
| 1458 | Gesundheit (zu jemandem der gerade gegessen hat) |  | بِالشِّفا |  | Kein Match gefunden |
| 1459 | Antwort auf "bishfa" |  | يِشْفيك |  | Kein Match gefunden |
| 1460 | Dankeschön (jemanden der hilft) |  | بارَك اللَّه فِيك |  | Kein Match gefunden |
| 1461 | Dankeschön (jemanden der hilft) |  | يِرْحَم والْدِيك |  | Kein Match gefunden |
| 1463 | Gott sei Dank für deine Gesundheit (nach Krankenhaus) |  | الحَمْدُ لِلَّه على سْلَمْتِك |  | Kein Match gefunden |
| 1464 | Gott segne ihn! (über ein Kind) |  | تْبارَك اللَّه عْليه |  | Kein Match gefunden |
| 1465 | Gott segne sie! (über ein Kind) |  | تْبارَك اللَّه عْليها |  | Kein Match gefunden |
| 1467 | Möge Gott dich bei guter Gesundheit erhalten |  | رَبِّي يِشِدِّك بِصَحِّة الأَبْدان |  | Kein Match gefunden |
| 1468 | Alles Gute zum Geburtstag! |  | عيد ميلاد سَعيد وَ كُلَّ عام وَ اِنْتِي بِخير |  | Kein Match gefunden |
| 1470 | Entschuldigung |  | سامَحْني (بْرَبِّي) |  | Kein Match gefunden |
| 1472 | Gute Nacht (Antwort) |  | على خير |  | Kein Match gefunden |
| 1473 | Du siehst gut aus! (+ Handbewegung) |  | aba babab |  | Kein Match gefunden |
| 1474 | Sprichst du nicht (mehr) mit mir? |  | ما عاديش تكلمني؟ |  | Kein Match gefunden |
| 1475 | Ich spreche nicht mehr mit dir |  | ما عاديش نتكلمك |  | Kein Match gefunden |
| 1476 | Geh weg von mir! |  | برا عليا |  | Kein Match gefunden |
| 1477 | Hau ab! / Geh k...! |  | برا شايد |  | Kein Match gefunden |
| 1478 | der Morgen |  | الصُّبَاح | صْبَاحْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 1479 | die Nacht |  | الليل |  | Kein Match gefunden |
| 1480 | mein Frühstück |  | فُطُوري |  | Kein Match gefunden |
| 1481 | etwas Leichtes |  | حَاجَة خْفِيفَة |  | Kein Match gefunden |
| 1482 | meine Kleidung |  | حْوَايْجي |  | Kein Match gefunden |
| 1483 | mein Gesicht |  | وجْهي |  | Kein Match gefunden |
| 1484 | mein Tag |  | نْهَاري |  | Kein Match gefunden |
| 1485 | das Büro |  | البيرو | بيرو | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 1486 | der Weg / die Straße |  | الثْنِيَّة |  | Kein Match gefunden |
| 1487 | Stunde Pause / Erholung |  | سَاعَة رَاحَة |  | Kein Match gefunden |
| 1488 | Sport |  | سْبُور |  | Kein Match gefunden |
| 1489 | der Strand |  | الشَّطّ |  | Kein Match gefunden |
| 1490 | das Wetter |  | الطَّقْس | طَقْسْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 1491 | Der schwarze Kaffee |  | الفَهْوَة الكَحْلَة |  | Kein Match gefunden |
| 1492 | Jeder hat Angst vor etwas |  | كُلّ واحد (و) من آش يخاف |  | Kein Match gefunden |
| 1493 | Jeder hat Angst vor etwas (Variante) |  | كُلّ واحد يخاف من حاجة |  | Kein Match gefunden |
| 1494 | Jeder hat seinen eigenen Geschmack |  | كُلّ واحد (و) آش يحب |  | Kein Match gefunden |
| 1495 | Jeder schaut gerne etwas anderes |  | كُلّ واحد (و) في شنو يحب يتفرج |  | Kein Match gefunden |
| 1496 | extra / mehr |  | بزايد |  | Kein Match gefunden |
| 1497 | dein Selbstvertrauen |  | ثيقتك في روحك |  | Kein Match gefunden |
| 1498 | mein Selbstvertrauen |  | ثيقتي في روحي |  | Kein Match gefunden |
| 1499 | ich habe kein Selbstvertrauen |  | ما عنديش الثيقة في روحي |  | Kein Match gefunden |
| 1500 | ich habe großes Selbstvertrauen |  | عندي ثيقة كبيرة في روحي |  | Kein Match gefunden |
| 1501 | müssen / es ist nötig | must | لَازِمْ | لَازِمْ | Ansatz 1: Exakter Konsonanten-Match |
| 1502 | ich lerne |  | نتعلم |  | Kein Match gefunden |
| 1503 | ich habe Angst |  | نخاف |  | Kein Match gefunden |
| 1504 | ich habe dir etwas zu sagen |  | عندي ما نقول لك |  | Kein Match gefunden |
| 1505 | ich habe dir etwas zu erzählen |  | عندي ما نحكي لك |  | Kein Match gefunden |
| 1506 | ich habe etwas zu tun (bin beschäftigt) |  | عندي ما نعمل |  | Kein Match gefunden |
| 1507 | ich habe nichts zu sagen |  | ما عندي ما نقول |  | Kein Match gefunden |
| 1508 | ich kann dir nicht helfen |  | ما عندي ما نعمل لك |  | Kein Match gefunden |
| 1509 | Was gibt es da zu glotzen? (zu jmd. der gafft) |  | مَا عَنْدِكْ مَا تْشُوفْ |  | Kein Match gefunden |
| 1511 | vielen Dank (Gott segne dich) |  | رَبِّي يُبارِكلِك |  | Kein Match gefunden |
| 1512 | vielen Dank (Gott beschütze dich) |  | رَبِّي يَحْفِظِك |  | Kein Match gefunden |
| 1513 | vielen Dank (Gott gebe dir was du dir wünschst) |  | رَبِّي يَعْطيك ما تِتْمَنَّى |  | Kein Match gefunden |
| 1514 | wir sehen euch (Abschied) |  | نشوفوك |  | Kein Match gefunden |
| 1515 | gute Reise (Variante) |  | رَبِّي يُوَصِّلِك سالِم |  | Kein Match gefunden |
| 1516 | Familien |  | عايلات |  | Kein Match gefunden |
| 1517 | Verwandte (Pl.) |  | قرايب |  | Kein Match gefunden |
| 1518 | Väter |  | آباء |  | Kein Match gefunden |
| 1520 | Mütter |  | أمّهات |  | Kein Match gefunden |
| 1521 | Söhne |  | والد |  | Kein Match gefunden |
| 1522 | Töchter |  | بنات |  | Kein Match gefunden |
| 1523 | Kinder |  | صغار |  | Kein Match gefunden |
| 1524 | Zwillinge |  | تواما |  | Kein Match gefunden |
| 1525 | Bruder |  | خُو | خُو | Ansatz 1: Exakter Konsonanten-Match |
| 1526 | Brüder |  | أخوة | أخُوَّة | Ansatz 1: Exakter Konsonanten-Match |
| 1527 | Brüder (Pl.) |  | خوات ولاد |  | Kein Match gefunden |
| 1528 | Schwestern (Pl.) |  | خوات بنات |  | Kein Match gefunden |
| 1529 | älterer Bruder |  | الخو الكبير |  | Kein Match gefunden |
| 1530 | jüngerer Bruder |  | الخو الصغير |  | Kein Match gefunden |
| 1531 | ältere Schwester |  | الأخت الكبيرة |  | Kein Match gefunden |
| 1532 | jüngere Schwester |  | الأخت الصغيرة |  | Kein Match gefunden |
| 1533 | Halbbruder (väterlicherseits) |  | خو مالبو |  | Kein Match gefunden |
| 1534 | Halbbruder (mütterlicherseits) |  | خو مالأم |  | Kein Match gefunden |
| 1535 | Halbschwester (väterlicherseits) |  | أخت مالبو |  | Kein Match gefunden |
| 1536 | Halbschwester (mütterlicherseits) |  | أخت مالأم |  | Kein Match gefunden |
| 1537 | Frauen / Ehefrauen |  | نِسَا |  | Kein Match gefunden |
| 1538 | die Frau von... |  | مرت... |  | Kein Match gefunden |
| 1539 | Stiefvater |  | راجل الأم |  | Kein Match gefunden |
| 1540 | Stiefmutter |  | مرت البو |  | Kein Match gefunden |
| 1541 | Großväter |  | جُدود | جْدُودْ | Ansatz 1: Exakter Konsonanten-Match |
| 1542 | Großmütter |  | جَدَّات |  | Kein Match gefunden |
| 1543 | Urgroßvater |  | بو الجَدّ |  | Kein Match gefunden |
| 1544 | Urgroßvater (der Großmutter) |  | بو الجَدَّة |  | Kein Match gefunden |
| 1545 | Urgroßmutter |  | أم الجَدّ |  | Kein Match gefunden |
| 1546 | Urgroßmutter (der Großmutter) |  | أم الجَدَّة |  | Kein Match gefunden |
| 1547 | Enkelsohn (Sohneslinie) |  | ولد الولد |  | Kein Match gefunden |
| 1548 | Enkelsohn (Tochter) |  | ولد البنت |  | Kein Match gefunden |
| 1549 | Enkeltochter (Sohneslinie) |  | بنت الولد |  | Kein Match gefunden |
| 1550 | Enkeltochter (Tochter) |  | بنت البنت |  | Kein Match gefunden |
| 1552 | Enkelkinder (Pl.) |  | ولاد الولاد |  | Kein Match gefunden |
| 1554 | Onkel (Pl., väterlich) |  | عُمومات |  | Kein Match gefunden |
| 1555 | Frau des Onkels (väterlich) |  | مرت العَمّ |  | Kein Match gefunden |
| 1556 | Tante (väterliche Schwester) |  | عَمَّة |  | Kein Match gefunden |
| 1557 | Tanten (väterlich, Pl.) |  | عَمَّات |  | Kein Match gefunden |
| 1558 | Mann der Tante (väterlich) |  | راجل العَمَّة |  | Kein Match gefunden |
| 1559 | Onkel (mütterlicherseits, Pl.) |  | خوال |  | Kein Match gefunden |
| 1560 | Frau des Onkels (mütterlicherseits) |  | مرت الخال |  | Kein Match gefunden |
| 1561 | Tanten (mütterlicherseits, Pl.) |  | خالات |  | Kein Match gefunden |
| 1562 | Mann der Tante (mütterlicherseits) |  | راجل الخالة |  | Kein Match gefunden |
| 1563 | Cousine (Tochter des mütterl. Onkels) |  | بنت الخال |  | Kein Match gefunden |
| 1564 | Cousin (Sohn der mütterl. Tante) |  | ولد الخالة |  | Kein Match gefunden |
| 1565 | Cousine (Tochter der mütterl. Tante) |  | بنت الخالة |  | Kein Match gefunden |
| 1566 | Cousin (Sohn des väterl. Onkels) |  | ولد العَمّ |  | Kein Match gefunden |
| 1567 | Cousin (Sohn der väterl. Tante) |  | ولد العَمَّة |  | Kein Match gefunden |
| 1568 | Cousine (Tochter des väterl. Onkels) |  | بنت العَمّ |  | Kein Match gefunden |
| 1569 | Cousine (Tochter der väterl. Tante) |  | بنت العَمَّة |  | Kein Match gefunden |
| 1570 | Schwiegertochter |  | كنَّة |  | Kein Match gefunden |
| 1571 | Schwiegervater |  | حمو | حْمُو | Ansatz 1: Exakter Konsonanten-Match |
| 1572 | Schwiegervater / Angeheirateter |  | نسيب |  | Kein Match gefunden |
| 1573 | angeheiratete Verwandte |  | أنساب |  | Kein Match gefunden |
| 1574 | Schwiegermutter |  | حماة | حُمَاةْ | Ansatz 1: Exakter Konsonanten-Match |
| 1575 | Schwiegermutter (Variante) |  | نسيبة |  | Kein Match gefunden |
| 1576 | Schwägerin (Frau des Bruders) |  | لوزة | لُوزَة | Ansatz 1: Exakter Konsonanten-Match |
| 1577 | Waise |  | يَتِيم | يْتِيمْ | Ansatz 1: Exakter Konsonanten-Match |
| 1578 | Waisen (Pl.) |  | يتامى |  | Kein Match gefunden |
| 1579 | adoptiert |  | متبنّي |  | Kein Match gefunden |
| 1580 | adoptieren |  | تبنّى - يتبنّى |  | Kein Match gefunden |
| 1581 | Adoptiveltern |  | الوالدين بالتبنّي |  | Kein Match gefunden |
| 1582 | leibliche Eltern |  | الوالدين الأصليين |  | Kein Match gefunden |
| 1584 | ich schrieb |  | (أنا) كتِبت |  | Kein Match gefunden |
| 1585 | du schriebst |  | (أنتِ) كتِبت |  | Kein Match gefunden |
| 1586 | er schrieb |  | كتِب |  | Kein Match gefunden |
| 1587 | sie schrieb |  | كِتبِت |  | Kein Match gefunden |
| 1588 | wir schrieben |  | كتِبنا |  | Kein Match gefunden |
| 1589 | ihr schriebt |  | كتِبتو |  | Kein Match gefunden |
| 1590 | sie schrieben |  | كِتبو |  | Kein Match gefunden |
| 1591 | ich schreibe |  | نِكتِب |  | Kein Match gefunden |
| 1592 | du schreibst |  | تِكتِب |  | Kein Match gefunden |
| 1593 | er schreibt |  | يِكتِب |  | Kein Match gefunden |
| 1597 | Wie viele Wörter hast du heute geschrieben? |  | قدّاش من كلمة كتِبت اليوم؟ |  | Kein Match gefunden |
| 1598 | Wer wird heute Fußball mit uns spielen? |  | شكون باش يلعب كورة اليوم معانا؟ |  | Kein Match gefunden |
| 1599 | Heute arbeite ich |  | اليوم نِخدِم |  | Kein Match gefunden |
| 1600 | Die Maschine funktioniert gut |  | الماكينة تِخدِم بالباهي |  | Kein Match gefunden |
| 1601 | Wann schläfst du normalerweise? |  | وقتاش تُرقُد العادة؟ |  | Kein Match gefunden |
| 1602 | Ich trinke gerne morgens Kaffee |  | نحب نُشرُب قهوة الصباح |  | Kein Match gefunden |
| 1603 | er wischte ab |  | مَسَح |  | Kein Match gefunden |
| 1604 | Ich muss meine Schuhe abwischen |  | الازم نِمسَح صبّاطي |  | Kein Match gefunden |
| 1605 | er wusch |  | غَسَل |  | Kein Match gefunden |
| 1606 | Ich wasche mein Gesicht kurz nach dem Aufwachen |  | نَغسِل وجهي دوب ما نقوم من النوم |  | Kein Match gefunden |
| 1607 | er riet |  | نَصَح |  | Kein Match gefunden |
| 1608 | Der Arzt riet mir zu ruhen |  | الطبيب نصَحني بالراحة |  | Kein Match gefunden |
| 1609 | Ich weiß nicht wie ich diese Frage beantworten soll |  | ما نعرفش نجاوب على السؤال هاذا |  | Kein Match gefunden |
| 1610 | Ich sah etwas von weitem. Es stellte sich heraus, es war ein Hund |  | شفت حاجة من بعيد. طلع كلب |  | Kein Match gefunden |
| 1611 | Ich gehe hoch in mein Zimmer um mich auszuruhen |  | باش نطلع لبيتي الفوق باش نرتاح |  | Kein Match gefunden |
| 1612 | Die Katze ist im Baum. Sie will nicht runtergehen |  | القطوس فوق الشجرة. ما يحبش يهبط |  | Kein Match gefunden |
| 1613 | er fragte |  | سأل |  | Kein Match gefunden |
| 1614 | Willst du nach etwas fragen? |  | تحب تسأل على حاجة؟ |  | Kein Match gefunden |
| 1615 | er nahm teil |  | حَضَر |  | Kein Match gefunden |
| 1616 | Ich habe gestern eine Party besucht |  | حضِرت حفلة أمس |  | Kein Match gefunden |
| 1617 | er lehnte ab |  | رَفَض | رَفْضْ | Ansatz 1: Exakter Konsonanten-Match |
| 1618 | Ich weigere mich mit jemandem wie ihm zu reden |  | نُرفُض نحكي مع واحد كيفو |  | Kein Match gefunden |
| 1619 | Ich bin heute Morgen rausgegangen und zum Markt gegangen |  | خرجت الصباح ومشيت للسوق |  | Kein Match gefunden |
| 1620 | Ich kann nicht reingehen. Die Tür ist geschlossen |  | ما نجمش نُدخُل. الباب مسكّر |  | Kein Match gefunden |
| 1621 | er half |  | عَاوَن |  | Kein Match gefunden |
| 1622 | Ich habe ein Problem. Kannst du mir helfen? |  | عندي مشكلة. تنجّم تعاوّني؟ |  | Kein Match gefunden |
| 1623 | er schlug |  | ضَرَب |  | Kein Match gefunden |
| 1624 | Mein kleiner Bruder weint weil sein Freund ihn im Kindergarten geschlagen hat |  | خويا الصغير يبكي على خاطر في الروضة صاحبو ضربو |  | Kein Match gefunden |
| 1625 | sprang / spring! (Imp.) |  | نَقَّز |  | Kein Match gefunden |
| 1626 | Wer Basketball spielen will muss hoch springen können |  | اللي يحب يلعب باسكات لازم يعرف ينقّز عالي |  | Kein Match gefunden |
| 1627 | er log |  | كَذَب | كِذْبْ | Ansatz 1: Exakter Konsonanten-Match |
| 1628 | Lüg mich nicht an! |  | ما تِكذِبش عليّا! |  | Kein Match gefunden |
| 1629 | er gewann |  | رَبَح |  | Kein Match gefunden |
| 1630 | Ich habe eine Reise nach Marokko gewonnen |  | ربِحت رحلة للمغرب |  | Kein Match gefunden |
| 1631 | er verlor |  | خَسَر |  | Kein Match gefunden |
| 1632 | Frankreich verlor gegen Argentinien bei der Weltmeisterschaft |  | فرانسا خسِرت قدّام الأرجنتين في كأس العالم |  | Kein Match gefunden |
| 1633 | er bestand |  | نَجَح |  | Kein Match gefunden |
| 1634 | Du musst gut lernen um zu bestehen |  | الازم تقرا بالباهي باش تِنجَح |  | Kein Match gefunden |
| 1635 | er versuchte |  | حَاوَل |  | Kein Match gefunden |
| 1636 | Das Telefon ist kaputt. Ich habe versucht es zu reparieren aber konnte nicht |  | التليفون ما يخدِمش. حاوِلت نصلّحو أما ما نجّمتش |  | Kein Match gefunden |
| 1637 | er druckte |  | طَبَع | طْبَعْ | Ansatz 1: Exakter Konsonanten-Match |
| 1638 | Ich habe dieses Blatt fünfmal ausgedruckt |  | طبِعت الورقة هاذي خمسة مرّات |  | Kein Match gefunden |
| 1639 | er dankte |  | شَكَر |  | Kein Match gefunden |
| 1640 | Ich möchte euch alle danken weil ihr mir sehr geholfen habt |  | نحب نُشكُركم الكلّ على خاطركم عاوِنتوني برشا |  | Kein Match gefunden |
| 1641 | er benutzte |  | اِسْتَعْمَل |  | Kein Match gefunden |
| 1642 | Wie benutzt du diese Kamera? |  | كيفاش تِستَعمِل الكاميرا هاذي؟ |  | Kein Match gefunden |
| 1643 | Sie kennt meinen Namen |  | هيّا تعرف إسمي |  | Kein Match gefunden |
| 1644 | er lachte |  | ضَحَك | ضْحَكْ | Ansatz 1: Exakter Konsonanten-Match |
| 1645 | Wie süß ist das Baby wenn es lacht |  | ما حالاه البيبي كيف يِضحَك |  | Kein Match gefunden |
| 1646 | er kochte |  | طَيَّب |  | Kein Match gefunden |
| 1647 | Kannst du tunesische Gerichte kochen? |  | تعرف تطيّب ماكلة تونسية؟ |  | Kein Match gefunden |
| 1648 | er bereitete vor |  | حَضَّر |  | Kein Match gefunden |
| 1649 | Ich habe viele Dinge für die Party heute Abend vorbereitet |  | حضَّرت برشا حاجات للحفلة الليلة |  | Kein Match gefunden |
| 1651 | Wer hat die Tür geschlossen? |  | شكون سكر  الباب؟ |  | Kein Match gefunden |
| 1652 | er fotografierte |  | صَوَّر |  | Kein Match gefunden |
| 1653 | Meine Freundin kann zeichnen |  | صاحبتي تعرف تصوّر |  | Kein Match gefunden |
| 1654 | er reinigte |  | نَظَّف |  | Kein Match gefunden |
| 1655 | Du musst das Auto putzen weil es dreckig ist |  | الازم تنظّف الكرهبة على خاطرها مسّخة |  | Kein Match gefunden |
| 1656 | er wechselte |  | بَدَّل |  | Kein Match gefunden |
| 1657 | Ich wechsle meine Kleidung bevor ich schlafen gehe |  | نبدَّل دبشي قبل ما نُرقُد |  | Kein Match gefunden |
| 1658 | er beendete |  | كَمَّل |  | Kein Match gefunden |
| 1659 | Hast du den Film gestern Abend zu Ende gesehen? |  | كمَّلت الفيلم البارح؟ |  | Kein Match gefunden |
| 1660 | er reparierte |  | صَلَّح |  | Kein Match gefunden |
| 1661 | Ich habe das alte Telefon repariert und jetzt funktioniert es gut |  | صلَّحت التليفون القديم وتوّ يخدِم بالباهي |  | Kein Match gefunden |
| 1662 | er probierte aus |  | جَرَّب |  | Kein Match gefunden |
| 1663 | Hast du schon mal Motorrad gefahren? |  | جرَّبت سُقت موطور قبل؟ |  | Kein Match gefunden |
| 1665 | Ich habe ein Glas zerbrochen |  | كسَّرت كاس |  | Kein Match gefunden |
| 1668 | du öffnetest |  | حلَّيت |  | Kein Match gefunden |
| 1669 | er öffnete |  | حلّ |  | Kein Match gefunden |
| 1671 | wir öffneten |  | حلَّينا |  | Kein Match gefunden |
| 1672 | ihr öffnetet |  | حلِّيتو |  | Kein Match gefunden |
| 1673 | sie öffneten |  | حلّو |  | Kein Match gefunden |
| 1675 | du öffnest |  | تِحِلّ |  | Kein Match gefunden |
| 1677 | wir öffnen |  | نِحِلّو |  | Kein Match gefunden |
| 1678 | ihr öffnet |  | تِحِلّو |  | Kein Match gefunden |
| 1679 | sie öffnen |  | يِحِلّو |  | Kein Match gefunden |
| 1680 | Ich öffnete das Fenster damit die Sonne ins Zimmer scheint |  | حلِّيت الشبّاك باش تُدخُل الشمس للبيت |  | Kein Match gefunden |
| 1681 | er schnit |  | قصّ |  | Kein Match gefunden |
| 1682 | Ich habe mir letzte Woche die Haare geschnitten |  | قصِّيت شعري الجمعة الفايتة |  | Kein Match gefunden |
| 1683 | er hob |  | هَزَّ |  | Kein Match gefunden |
| 1684 | Ich konnte diesen Tisch nicht heben weil er schwer ist |  | ما نجّمتش نهِزّ الطاولة هاذي على خاطرها رزينة |  | Kein Match gefunden |
| 1685 | er berührte |  | مَسَّ |  | Kein Match gefunden |
| 1686 | Die Katze hat mich sanft berührt. Sie will mit mir spielen |  | القطوس مسّني بالشطوس. يحب يلعب معايا |  | Kein Match gefunden |
| 1687 | er fühlte |  | حَسَّ | حِسّ | Ansatz 1: Exakter Konsonanten-Match |
| 1688 | Wir fühlten uns müde |  | حسِّينا رواحنا تعبانين |  | Kein Match gefunden |
| 1689 | er langweilte sich (Verb) |  | فَدَّ |  | Kein Match gefunden |
| 1690 | Ich langweile mich. Ich will mit meinen Freunden ausgehen |  | فدِّيت. نحب نُخرُج مع صحابي |  | Kein Match gefunden |
| 1691 | er war |  | كَان |  | Kein Match gefunden |
| 1693 | sie war |  | كانِت |  | Kein Match gefunden |
| 1694 | wir waren |  | كُنّا |  | Kein Match gefunden |
| 1695 | sie waren |  | كانو |  | Kein Match gefunden |
| 1696 | ich bin |  | نكون |  | Kein Match gefunden |
| 1697 | du bist / sie ist |  | تكون |  | Kein Match gefunden |
| 1698 | er ist |  | يكون |  | Kein Match gefunden |
| 1699 | wir sind |  | نكونو |  | Kein Match gefunden |
| 1700 | ihr seid |  | تكونو |  | Kein Match gefunden |
| 1701 | sie sind |  | يكونو |  | Kein Match gefunden |
| 1702 | Wo warst du? |  | وين كُنت؟ |  | Kein Match gefunden |
| 1703 | Ich schlafe gerne wenn ich müde bin |  | نحب نُرقُد كي نكون تعبان |  | Kein Match gefunden |
| 1704 | Nächstes Jahr werde ich in Frankreich sein um zu studieren |  | العام الجاي باش نكون في فرانسا باش نقرا |  | Kein Match gefunden |
| 1705 | er schwamm |  | عَام |  | Kein Match gefunden |
| 1706 | Kannst du schwimmen? |  | تعرف تعوم؟ |  | Kein Match gefunden |
| 1707 | er verkaufte |  | بَاع |  | Kein Match gefunden |
| 1708 | ich verkaufte |  | بِعت |  | Kein Match gefunden |
| 1709 | Ich suche ein Geschäft das Kleidung verkauft |  | نلوّج على بوتيك يبيع الدباش |  | Kein Match gefunden |
| 1710 | er stand auf |  | قَام |  | Kein Match gefunden |
| 1711 | Wann bist du heute Morgen aufgestanden? |  | وقتاش قُمت اليوم الصباح؟ |  | Kein Match gefunden |
| 1712 | er brachte |  | جَاب |  | Kein Match gefunden |
| 1713 | Vergiss nicht Brot mitzubringen |  | ما تِنساش تجيب خبز معاك |  | Kein Match gefunden |
| 1714 | er fehlte |  | غَاب |  | Kein Match gefunden |
| 1715 | Ich habe den Montagsunterricht verpasst weil ich krank war |  | غُبت على الدرس نهار الاثنين على خاطر كُنت مريض |  | Kein Match gefunden |
| 1716 | er fiel |  | طَاح |  | Kein Match gefunden |
| 1717 | Der Stift ist vom Tisch gefallen |  | الستيلو طاح من فوق الطاولة |  | Kein Match gefunden |
| 1718 | er passierte / wurde |  | صَار |  | Kein Match gefunden |
| 1719 | Was ist gestern passiert? |  | شصار أمس؟ |  | Kein Match gefunden |
| 1720 | er sagte |  | قَال |  | Kein Match gefunden |
| 1722 | ich sage |  | نقول |  | Kein Match gefunden |
| 1723 | Ich will dir etwas sagen |  | نحب نقول لك حاجة |  | Kein Match gefunden |
| 1724 | er starb |  | مَات |  | Kein Match gefunden |
| 1725 | Millionen starben im Zweiten Weltkrieg |  | ملايين ماتو في الحرب العالمية الثانية |  | Kein Match gefunden |
| 1727 | ich erzählte |  | حكيت |  | Kein Match gefunden |
| 1728 | er erzählte |  | حكى |  | Kein Match gefunden |
| 1729 | sie erzählte |  | حكات |  | Kein Match gefunden |
| 1730 | wir erzählten |  | حكينا |  | Kein Match gefunden |
| 1731 | sie erzählten |  | حكاو |  | Kein Match gefunden |
| 1732 | ich erzähle |  | نحكي |  | Kein Match gefunden |
| 1733 | du erzählst / sie erzählt |  | تحكي |  | Kein Match gefunden |
| 1734 | er erzählt |  | يحكي |  | Kein Match gefunden |
| 1736 | ihr erzählt |  | تحكيو |  | Kein Match gefunden |
| 1737 | sie erzählen |  | يحكيو |  | Kein Match gefunden |
| 1738 | Sie hat mir alles erzählt |  | حكاتلي على كلّ شي |  | Kein Match gefunden |
| 1740 | Wir haben Ingenieurwesen an der Universität studiert |  | قرينا هندسة في الجامعة |  | Kein Match gefunden |
| 1742 | Ich muss Brot und Milch kaufen |  | الازمني نِشري خبز وحليب |  | Kein Match gefunden |
| 1743 | Heute Morgen ist Fatma zur Bank gegangen |  | اليوم الصباح مشات فاطمة للبانكة |  | Kein Match gefunden |
| 1744 | Ich laufe jeden Tag drei Kilometer |  | كلّ نهار نجري ثلاثة كيلومتر |  | Kein Match gefunden |
| 1745 | er wurde |  | وَلَّى |  | Kein Match gefunden |
| 1746 | Nach 10 Jahren Arbeit wurde ich Direktor der Firma |  | بعد عشرة سنين خدمة ولِّيت مدير الشركة |  | Kein Match gefunden |
| 1747 | Wann kommst du nach Tunesien? |  | وقتاش تجي لتونس؟ |  | Kein Match gefunden |
| 1748 | Der Film endete um Mitternacht |  | الفيلم وفى نصّ الليل |  | Kein Match gefunden |
| 1749 | Ich habe einen Schlüssel gefunden. Ich weiß nicht wem er gehört |  | لقيت مفتاح. ما نعرفش متاع شكون |  | Kein Match gefunden |
| 1750 | Kannst du mir einen Stift geben zum Schreiben, bitte? |  | تعطيني ستيلو باش نكتب، يعيشك؟ |  | Kein Match gefunden |
| 1751 | er wartete |  | اِسْتَنَّى |  | Kein Match gefunden |
| 1752 | Ich habe auf dich gewartet aber du bist nicht gekommen |  | استنِّيتك أما ما جيتيش |  | Kein Match gefunden |
| 1753 | Wann fängst du mit der Arbeit an? |  | وقتاش تِبدا الخدمة؟ |  | Kein Match gefunden |
| 1754 | er ließ |  | خَلَّى |  | Kein Match gefunden |
| 1755 | Ich ließ das Geld auf dem Tisch und ging |  | خلِّيت الفلوس على الطاولة ومشيت |  | Kein Match gefunden |
| 1757 | Was willst du zum Mittagessen essen? |  | شتحب تاكل في الفطور؟ |  | Kein Match gefunden |
| 1758 | Wir haben 10 Tage Urlaub im August genommen |  | خذينا كونجي عشرة أيام في أوت |  | Kein Match gefunden |
| 1760 | ich schwamm |  | عِمت |  | Kein Match gefunden |
| 1761 | ich schwimme |  | نعوم |  | Kein Match gefunden |
| 1762 | ich fehlte |  | غِبت |  | Kein Match gefunden |
| 1763 | ich fehle |  | نغيب |  | Kein Match gefunden |
| 1764 | ich fiel |  | طِحت |  | Kein Match gefunden |
| 1765 | ich falle |  | نطيح |  | Kein Match gefunden |
| 1766 | ich starb |  | مِت |  | Kein Match gefunden |
| 1767 | ich sterbe |  | نموت |  | Kein Match gefunden |
| 1768 | ich verkaufe |  | نبيع |  | Kein Match gefunden |
| 1769 | ich las |  | قريت |  | Kein Match gefunden |
| 1770 | ich kaufe |  | نِشري |  | Kein Match gefunden |
| 1771 | ich rannte |  | جريت |  | Kein Match gefunden |
| 1772 | ich renne |  | نِجري |  | Kein Match gefunden |
| 1774 | ich werde |  | نِولِّي |  | Kein Match gefunden |
| 1776 | voll (m.) |  | معبي |  | Kein Match gefunden |
| 1777 | leer (m.) |  | فراغ |  | Kein Match gefunden |
| 1779 | Wer kam heute? |  | شكون جا ليوم؟ |  | Kein Match gefunden |
| 1780 | Wer bin ich? |  | شكوني أنا؟ |  | Kein Match gefunden |
| 1781 | Wer bist du? |  | شكونك نتي؟ |  | Kein Match gefunden |
| 1782 | Wer ist er? |  | شكونو هو؟ |  | Kein Match gefunden |
| 1783 | Wer ist sie? |  | شكوني هيا؟ |  | Kein Match gefunden |
| 1784 | Wer sind wir? |  | شكونا أحنا؟ |  | Kein Match gefunden |
| 1785 | Wer seid ihr? |  | شكونكم أنتوما؟ |  | Kein Match gefunden |
| 1786 | Wer sind sie? |  | شكونهم هوما؟ |  | Kein Match gefunden |
| 1787 | Wer ist Mohamed? |  | شكون(و) محمد؟ |  | Kein Match gefunden |
| 1788 | Wer ist Mariam? |  | شكون(ي) مريم؟ |  | Kein Match gefunden |
| 1789 | Es ist jemand vor dem Haus |  | فما شكون قدام الباب |  | Kein Match gefunden |
| 1790 | Ich will wissen wer die Tür geschlossen hat |  | نحب نعرف شكون سكر الباب |  | Kein Match gefunden |
| 1791 | Mit wem hast du gesprochen? |  | مع شكون كنت تحكي؟ |  | Kein Match gefunden |
| 1792 | Wessen Hund ist das? |  | متاع شكون الكلب هذا؟ |  | Kein Match gefunden |
| 1793 | Es gibt welche die Tounsi sprechen |  | فما شكون هنا يحكي تونسي |  | Kein Match gefunden |
| 1794 | Wer glaubst du bist du um so mit mir zu reden? |  | شكونك نتي باش تحكي معايا هكا؟ |  | Kein Match gefunden |
| 1795 | nach dem Untertauchen (kurz im Meer) |  | صحة الغطسة |  | Kein Match gefunden |
| 1796 | Ganzen Tag |  | نهار كمل |  | Kein Match gefunden |
| 1797 | wie oft? |  | قداش من مرة |  | Kein Match gefunden |
| 1798 | fast / ungefähr |  | تقريب |  | Kein Match gefunden |
| 1799 | einmal / ein Mal |  | مَرَّة |  | Kein Match gefunden |
| 1800 | zweimal |  | مرتين |  | Kein Match gefunden |
| 1801 | einmal im Jahr |  | مرة في العام |  | Kein Match gefunden |
| 1802 | jedes Wochenende |  | كل ويكاند |  | Kein Match gefunden |
| 1803 | jede Woche |  | كل جمعة |  | Kein Match gefunden |
| 1804 | einmal im Monat |  | مرة في الشهر |  | Kein Match gefunden |
| 1805 | dreimal pro Woche |  | ثلاثة مرات في الجمعة |  | Kein Match gefunden |
| 1806 | manchmal |  | ساعات |  | Kein Match gefunden |
| 1808 | spazieren gehen |  | نعمل مارش |  | Kein Match gefunden |
| 1809 | ins Fitnessstudio gehen |  | نمشي للسال دو سبور |  | Kein Match gefunden |
| 1810 | einen Lauf machen / joggen |  | نعمل جرية |  | Kein Match gefunden |
| 1811 | im Park |  | في الباك |  | Kein Match gefunden |
| 1812 | Wie oft gehst du mit deinen Freunden aus? |  | كل قداش تخرج مع صحابك؟ |  | Kein Match gefunden |
| 1813 | Wie oft reist du? |  | كل قداش تسافر؟ |  | Kein Match gefunden |
| 1814 | Wie oft schaust du Filme? |  | كل قداش تتفرج في أفلام؟ |  | Kein Match gefunden |
| 1815 | Wie oft liest du Bücher? |  | كل قداش تقرا كتاب؟ |  | Kein Match gefunden |
| 1816 | ich habe nicht viel Zeit |  | ما عنديش برشا وقت |  | Kein Match gefunden |
| 1817 | in deinen Träumen / vergiss es |  | دُوِيُو |  | Kein Match gefunden |
| 1818 | warum / wieso |  | شبيه |  | Kein Match gefunden |
| 1819 | wütend / böse |  | متغشش |  | Kein Match gefunden |
| 1820 | um (Uhrzeit) / von / gehörend |  | متاع |  | Kein Match gefunden |
| 1821 | ihr Gesicht |  | وجهها |  | Kein Match gefunden |
| 1822 | ihre Zähne |  | سنانها |  | Kein Match gefunden |
| 1823 | Sandwich |  | سندويتش |  | Kein Match gefunden |
| 1824 | ein Glas Saft |  | كاس جوس |  | Kein Match gefunden |
| 1825 | und dann / danach (umgsspr.) |  | مبعد | مَبَعَّدْ | Ansatz 1: Exakter Konsonanten-Match |
| 1826 | Abwasch / Geschirrspülen |  | غسيل المعاون |  | Kein Match gefunden |
| 1827 | Hund |  | كَلْبْ | كَلْبْ | Ansatz 1: Exakter Konsonanten-Match |
| 1828 | Mein Portemonnaie / Geldbeutel |  | ستوشي |  | Kein Match gefunden |
| 1829 | sie steht auf / du stehst auf |  | تقوم |  | Kein Match gefunden |
| 1830 | sie wäscht / du wäschst |  | تغسل |  | Kein Match gefunden |
| 1831 | sie putzt / reinigt |  | تنظف |  | Kein Match gefunden |
| 1832 | sie frühstückt |  | تفطر |  | Kein Match gefunden |
| 1833 | sie isst |  | تاكل |  | Kein Match gefunden |
| 1834 | sie lernt bis |  | تقرا حتى |  | Kein Match gefunden |
| 1835 | sie spielt Volleyball |  | تلعب فولي |  | Kein Match gefunden |
| 1836 | sie geht nach Hause |  | ترواح للدار |  | Kein Match gefunden |
| 1837 | sie hilft ihrer Mutter |  | تعاون أمها |  | Kein Match gefunden |
| 1838 | sie beendet / fertigmacht |  | تكمل |  | Kein Match gefunden |
| 1839 | sie isst zu Abend |  | تتعشى |  | Kein Match gefunden |
| 1840 | sie macht einen Spaziergang im Park |  | تتمشى في الباك |  | Kein Match gefunden |
| 1841 | sie nimmt ihren Hund mit |  | تهز كلبها |  | Kein Match gefunden |
| 1842 | sie schaut ein bisschen TV |  | تتفرج في التلفزة |  | Kein Match gefunden |
| 1843 | sie spielt Videospiele |  | تلعب جو فيديو |  | Kein Match gefunden |
| 1844 | sie schläft / geht schlafen |  | ترقد |  | Kein Match gefunden |
| 1845 | Warum ist er wütend? |  | شبيه متغشش؟ |  | Kein Match gefunden |
| 1846 | sie geht zur Schule / ins Büro |  | تمشي للمكتب |  | Kein Match gefunden |
| 1847 | ich bin noch / noch immer (1. Pers.) / du bist noch / noch immer (2. Pers.) |  | مازلت |  | Kein Match gefunden |
| 1849 | er ist noch / noch immer |  | مازل |  | Kein Match gefunden |
| 1850 | sie ist noch / noch immer |  | مازالت |  | Kein Match gefunden |
| 1851 | wir sind noch / noch immer |  | مازلنا |  | Kein Match gefunden |
| 1852 | ihr seid noch / noch immer |  | مازلتو |  | Kein Match gefunden |
| 1853 | sie sind noch / noch immer |  | مازلو |  | Kein Match gefunden |
| 1854 | ich muss |  | لازمني |  | Kein Match gefunden |
| 1855 | du musst / du sollst |  | لازمك |  | Kein Match gefunden |
| 1856 | es ist unbedingt nötig / ich muss unbedingt |  | لا بد |  | Kein Match gefunden |
| 1857 | gezwungen sein / müssen (unfreiwillig) |  | يتلاز |  | Kein Match gefunden |
| 1858 | ich war gezwungen |  | تلازيت |  | Kein Match gefunden |
| 1859 | es kam so / ich landete dabei |  | راصات لي |  | Kein Match gefunden |
| 1860 | ich arbeite noch |  | مازلت نخدم |  | Kein Match gefunden |
| 1861 | wir sind noch zuhause |  | مازلنا في الدار |  | Kein Match gefunden |
| 1862 | er ist noch jung |  | مازل صغير |  | Kein Match gefunden |
| 1863 | ich habe noch nicht geschlafen |  | مازلت ما رقدتش |  | Kein Match gefunden |
| 1864 | wir sind noch nicht zuhause |  | مازلنا ما حناش في الدار |  | Kein Match gefunden |
| 1865 | er ist noch kein Profi |  | مازل موش بروفيسيونال |  | Kein Match gefunden |
| 1866 | sie kann noch nicht fahren |  | مازالت ما تنجمش تقوس |  | Kein Match gefunden |
| 1867 | ihr redet noch |  | مازلتو تحكيو |  | Kein Match gefunden |
| 1868 | ich bin noch nicht aus dem Haus gegangen |  | مازلت ما خرجتش من الدار |  | Kein Match gefunden |
| 1869 | sie hat den Film noch nicht zu Ende geschaut |  | مازالت ما كملتش الفيلم |  | Kein Match gefunden |
| 1870 | wir haben den Film noch nicht geschaut |  | مازلنا ما تفرجناش في الفيلم |  | Kein Match gefunden |
| 1871 | wir schauen noch den Film |  | مازلنا نتفرجو في الفيلم |  | Kein Match gefunden |
| 1872 | er ist noch nicht im Büro? |  | مازل موش في البيرو؟ |  | Kein Match gefunden |
| 1873 | ich muss ein neues Handy kaufen |  | لازمني نشري تليفون جديد |  | Kein Match gefunden |
| 1874 | du solltest gut essen |  | لازمك تاكل بالباهي |  | Kein Match gefunden |
| 1875 | du solltest Sport treiben |  | لازمك تلعب سبور |  | Kein Match gefunden |
| 1876 | ich habe getan was getan werden musste |  | عملت اللي كان لازم يتعمل |  | Kein Match gefunden |
| 1877 | ich hätte zu ihm gehen und mit ihm reden müssen |  | كان لازم نمشي لو ونحكي معاه |  | Kein Match gefunden |
| 1878 | ich hatte mein Portemonnaie nicht dabei |  | ما جبتش معايا ستوشي |  | Kein Match gefunden |
| 1879 | ich war gezwungen nach Hause zu gehen |  | تلازيت نرجع للدار |  | Kein Match gefunden |
| 1880 | ich fand kein Taxi |  | ما لقيتش تاكسي |  | Kein Match gefunden |
| 1881 | ich musste zu Fuß gehen |  | راصات لي نمشي على ساقيا |  | Kein Match gefunden |
| 1882 | ich fand den Bericht nicht |  | ما لقيتش الراپور |  | Kein Match gefunden |
| 1883 | ich musste ihn von vorne neu schreiben |  | راصات لي نعاود نكتبو من الأول |  | Kein Match gefunden |
| 1884 | Wer mit Fröschen schläft fängt morgens an zu quaken (schlechte Einflüsse färben ab) |  | إلّي يْبات مْعَ الجّْران يِصْبح يْڤرْڤِرْ |  | Kein Match gefunden |
| 1885 | Der Nachbar kommt vor dem Haus (erst den Nachbarn prüfen dann einziehen) |  | الجار قْبَلْ الدّار |  | Kein Match gefunden |
| 1886 | Er floh vor einem Tropfen und landete unter der Dachrinne (vom Regen in die Traufe) |  | هْرب مِن قطْرة جا تَحْت ميزاب |  | Kein Match gefunden |
| 1887 | Die Alte wird vom Fluss mitgerissen und sagt was für ein fruchtbares Jahr (Gefahr nicht erkennen) |  | العْزوزة هازِزْها الواد وهِيَ تْقول العام صابة |  | Kein Match gefunden |
| 1888 | Das Kamel sieht seinen eigenen Höcker nicht (eigene Fehler nicht sehen) |  | الجمل ما يراش حدبتو |  | Kein Match gefunden |
| 1889 | Ihr Arm hat sie im Stich gelassen da sagte sie sie sei verhext (eigene Schwäche auf andere schieben) |  | خانْها ذْراعْها قالِت مسْحورة |  | Kein Match gefunden |
| 1890 | Wer nicht tanzen kann sagt der Boden sei schief (eigene Unfähigkeit auf andere schieben) |  | إلّي ما تعرفش تشطح تقول الأرْض عوجة |  | Kein Match gefunden |
| 1891 | Wenn die Kuh fällt häufen sich die Messer um sie (in der Schwäche zeigen sich die Feinde) |  | كي اتْطيح البڤْرة تُكْثُر سْكاكِنْها |  | Kein Match gefunden |
| 1892 | Tu so als ob du verrückt wärst und du wirst leben (manchmal ist Naivität die beste Strategie) |  | أعْمِل روحِك مهْبول تْعيش |  | Kein Match gefunden |
| 1893 | Der Eid des Stummen liegt in seiner Brust (stille Entschlossenheit ist stärker als Worte) |  | يْمين البكّوش في صِدْرو |  | Kein Match gefunden |
| 1894 | Wenn Reden Silber ist ist Schweigen Gold |  | إذا كان الكلام من فضّة السّكات من ذهب |  | Kein Match gefunden |
| 1895 | Hör auf Worte die dich weinen lassen nicht auf die die dich lachen lassen (echte Freunde sagen die Wahrheit) |  | اسْمع الكْلام إلّي يْبكّيك وْ ما تِسْمعْش الكْلام إلّي يْضحّْكِكْ |  | Kein Match gefunden |
| 1896 | Frag einen Erfahrenen nicht einen Arzt (Erfahrung ist wertvoller als Theorie) |  | إسْإل مْجرِّب وْ ما تِسْإلْش طْبيب |  | Kein Match gefunden |
| 1897 | In den Hammam einzutreten ist nicht dasselbe wie ihn zu verlassen (leichter rein als raus) |  | دْخول الحمّام موش كي خْروجو |  | Kein Match gefunden |
| 1898 | Der der erschaffen hat lässt dich nicht verloren gehen (Gott verlässt dich nicht) |  | إلّي خْلق ما يْضيّع |  | Kein Match gefunden |
| 1899 | Wer sein Wort gibt gibt seinen Hals (ein gegebenes Versprechen ist heilig) |  | إلّي عْطى كِلْمْتو عْطى رقْبْتو |  | Kein Match gefunden |
| 1900 | Wenn ein Händler dir rät gehört die Hälfte des Rats ihm (Eigeninteresse im Rat bedenken) |  | إذا نصْحِك التاجر راهو شْطر النّْصيحة ليه |  | Kein Match gefunden |
| 1901 | Der Respekt fiel hin und das Leben war vorbei (ohne Respekt keine Beziehung) |  | طاح القْدر وْفات العيشة |  | Kein Match gefunden |
| 1902 | Lach der Welt und die Welt lacht dir zurück |  | إضْحك لِلدِّنْيا تِضْحكْلِك |  | Kein Match gefunden |
| 1903 | Das Seil der Lüge ist kurz das Seil der Wahrheit ist lang (Wahrheit siegt) |  | حْبل الكِذْب قْصير وحْبل الصِّدْق طْويل |  | Kein Match gefunden |
| 1904 | Die Glut spürt nur der der darauf tritt (urteile nicht du kennst nicht den Schmerz anderer) |  | ما يْحِس بِالجمْرة كان الّي يعْفِس عْليها |  | Kein Match gefunden |
| 1905 | Leg Geld auf den Mund eines Toten und er fängt an zu lachen (Geld bewegt alle) |  | حط الفلوس على فم الميت يضحك |  | Kein Match gefunden |
| 1906 | Ich liebe dich so sehr (ich sterbe für dich) |  | نموت عليك |  | Kein Match gefunden |
| 1907 | genug / reicht |  | يزي |  | Kein Match gefunden |
| 1908 | was vorbei ist ist vorbei (wörtlich was vergangen ist, ist gestorben) |  | اللي فات مات |  | Kein Match gefunden |
| 1910 | vielen Dank (Steigerung von ayshik - möge dein Gutes sich mehren) |  | يَكْثَر خِيرِكْ |  | Kein Match gefunden |
| 1911 | warum hast du dir die Mühe gemacht? |  | عْلَاشْ تَعَّبْتْ رُوحِكْ؟ |  | Kein Match gefunden |
| 1912 | nicht der Rede wert / keine große Sache |  | مُوشْ حَاجَة كْبِيرَة |  | Kein Match gefunden |
| 1913 | ruf die Kinder |  | عَيَّطْ لِلْوْلاَد |  | Kein Match gefunden |
| 1914 | ich stelle dir vor |  | نَقَدَّم لِكْ |  | Kein Match gefunden |
| 1915 | ... Jahre älter als... |  | أَكْبَر مِن...بِعَامِين |  | Kein Match gefunden |
| 1916 | bitte setz dich |  | إِتْفَضَّلْ أُقْعُدْ |  | Kein Match gefunden |
| 1917 | verheiratet oder ledig? |  | مْعَرَّس وَالَّ عَازِب؟ |  | Kein Match gefunden |
| 1918 | warum heiratest du nicht? |  | عْلَاشْ مَا تْعَرَّسِشْ؟ |  | Kein Match gefunden |
| 1919 | Kinder bekommen |  | تْجِيب صْغَار |  | Kein Match gefunden |
| 1920 | nicht jetzt |  | مُوشْ تَوَّا |  | Kein Match gefunden |
| 1921 | bis ich die Frau finde |  | حَتَّى نَلْقَى الْمَرَا |  | Kein Match gefunden |
| 1922 | die mir helfen wird |  | إِلِّي تْسَاعِدْنِي |  | Kein Match gefunden |
| 1923 | du hast recht |  | عَنْدِكْ الحَق |  | Kein Match gefunden |
| 1924 | deine ganze Familie |  | عَايِلْتِكْ الكُلْهَا |  | Kein Match gefunden |
| 1925 | zwei verheiratete Schwestern |  | زُوزْ خْوَاتْ مْعَرَّسِين |  | Kein Match gefunden |
| 1926 | das jüngste Kind in der Familie |  | أَصْغَر وَاحِد فِي العَايِلَة |  | Kein Match gefunden |
| 1927 | vermisst du sie oder nicht? |  | تِتْوَحَّشْهُم وَالَّ لَا؟ |  | Kein Match gefunden |
| 1928 | ich schreibe ihnen immer Briefe |  | دِيمَا نِكْتِبْلَهُم جْوَابَات |  | Kein Match gefunden |
| 1929 | kommt das Mittagessen ist fertig |  | هَيَّا الفْطُور حْضَر |  | Kein Match gefunden |
| 1930 | geht wascht eure Hände |  | إِمْشِيو أَغْسْلُو يْدِيكُم |  | Kein Match gefunden |
| 1931 | heute glücklich |  | فَرْحَانِين اليُوم |  | Kein Match gefunden |
| 1932 | sie gehen besuchen |  | يِمْشِيو يْزُورُو |  | Kein Match gefunden |
| 1933 | bei wem ging er zu Besuch? |  | فِي شْكُون مْشَى يِزُور؟ |  | Kein Match gefunden |
| 1934 | wie heißt Munthers Frau? |  | آشْ إِسْم مَرْت مُنْذِر؟ |  | Kein Match gefunden |
| 1935 | wie viele Kinder haben sie? |  | قَدَّاشْ عَنْدُهُم أَوْالَد؟ |  | Kein Match gefunden |
| 1936 | was sind ihre Namen? |  | شْنُوما أَسَامِيهُم؟ |  | Kein Match gefunden |
| 1937 | ich habe nicht zu Mittag gegessen |  | مَا فَطَرْتِشْ فِي نُصْ النَّهَار |  | Kein Match gefunden |
| 1938 | ich bin müde / erschöpft |  | تَعِبْت |  | Kein Match gefunden |
| 1939 | seltsam! / unglaublich! |  | غَرِيبَة! |  | Kein Match gefunden |
| 1940 | alle Leute kamen zur Party |  | النَّاس الكُل جَاوْ لِلحَفْلَة |  | Kein Match gefunden |
| 1941 | alle sogar Ali kam |  | الكُل حَتَّى عْلِي جَا |  | Kein Match gefunden |
| 1942 | Möge Gott dir eine leichte Geburt schenken |  | إِنْ شَاء الله فِي خْلاَصْ وَحْلِكْ |  | Kein Match gefunden |
| 1943 | Gott sei Dank für deine glückliche Geburt |  | الحَمْدُ لله عْلَى خْلاَصْ وَحْلِكْ |  | Kein Match gefunden |
| 1944 | Glückwunsch zum Neugeborenen |  | مَبْرُوك مَا تْزَادْ لِكْ |  | Kein Match gefunden |
| 1945 | Gott segne dich (Antwort auf Glückwunsch) |  | يْبَارِكْ فِيكْ يْعَيِّشِكْ |  | Kein Match gefunden |
| 1946 | Möge Gott deinen Kindern Erfolg schenken |  | إِنْ شَاء الله فِي نْجَاحْ الأَوْلاَد |  | Kein Match gefunden |
| 1947 | Möge Gott dir die Freude der Hochzeit schenken |  | إِنْ شَاء الله فِي فَرْحِة العَازِب |  | Kein Match gefunden |
| 1948 | Möge Gott dir Freude schenken |  | إِنْ شَاء الله فَرْحَتِكْ |  | Kein Match gefunden |
| 1949 | Möge das Gleiche dir zuteil werden |  | العَاقِبَة لِيكْ |  | Kein Match gefunden |
| 1950 | nur Gott ist ewig (Antwort auf Beileid) |  | الدَّايِم هُوَّ رَبِّي |  | Kein Match gefunden |
| 1951 | Nachbar (sg.) |  | جَار | جَارْ | Ansatz 1: Exakter Konsonanten-Match |
| 1952 | Nachbarn |  | جِيرَان |  | Kein Match gefunden |
| 1953 | meine Frau |  | مَرْتِي |  | Kein Match gefunden |
| 1954 | mein ältester Sohn |  | وِلْدِي الكْبِير |  | Kein Match gefunden |
| 1955 | meine Tochter |  | بْنَاتِي |  | Kein Match gefunden |
| 1956 | verheiratet (m.) |  | مْعَرَّس |  | Kein Match gefunden |
| 1957 | ledig (m.) |  | عَازِب |  | Kein Match gefunden |
| 1958 | junges Mädchen / Braut |  | صْبِيَّة | صْبِيَّةْ | Ansatz 1: Exakter Konsonanten-Match |
| 1959 | Kinder (Pl.) |  | أَوْالَد |  | Kein Match gefunden |
| 1960 | sie wohnen |  | يُسْكْنُو |  | Kein Match gefunden |
| 1961 | ihre Großmutter |  | مَمَّاتْهُم |  | Kein Match gefunden |
| 1962 | ihr Großvater |  | عْزِيزْهُم |  | Kein Match gefunden |
| 1963 | von väterlicherseits |  | مِالبو |  | Kein Match gefunden |
| 1964 | von mütterlicherseits |  | مِاألُم |  | Kein Match gefunden |
| 1965 | Neffe (Sohn des Bruders) |  | وِلْد الخُو |  | Kein Match gefunden |
| 1966 | Nichte (Tochter des Bruders) |  | بِنْت الخُو |  | Kein Match gefunden |
| 1967 | Neffe (Sohn der Schwester) |  | وِلْد الأُخْت |  | Kein Match gefunden |
| 1968 | Nichte (Tochter der Schwester) |  | بِنْت الأُخْت |  | Kein Match gefunden |
| 1969 | Enkelsohn |  | حَفِيد |  | Kein Match gefunden |
| 1970 | Enkeltochter |  | حَفِيدَة |  | Kein Match gefunden |
| 1971 | Enkelkinder (Pl.) |  | أَحْفَاد |  | Kein Match gefunden |
| 1974 | Provinz / Gouvernorat |  | وِلَايَة |  | Kein Match gefunden |
| 1975 | Russland |  | رُوسْيَا | رُوسْيَا | Ansatz 1: Exakter Konsonanten-Match |
| 1976 | China |  | الصِّين | صِينْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 1977 | Zaghouan (Stadt/Jebel) |  | زَغْوَان |  | Kein Match gefunden |
| 1978 | Sfax |  | صْفَاقِس |  | Kein Match gefunden |
| 1979 | Djerba |  | جِرْبَة |  | Kein Match gefunden |
| 1980 | auch / ebenfalls |  | زَادَة |  | Kein Match gefunden |
| 1981 | auch / bis / sogar |  | حَتَّى |  | Kein Match gefunden |
| 1982 | welche/r/s (Vergleichsfrage) |  | أَما | إمَّا | Ansatz G: Match nach Hamza-/Ta-Marbuta-Normalisierung |
| 1983 | größer / älter als |  | أَكْبَر مِن |  | Kein Match gefunden |
| 1984 | länger / größer (Komp.) |  | أَطْوَل |  | Kein Match gefunden |
| 1985 | kleiner / jünger (Komp.) |  | أَصْغَر |  | Kein Match gefunden |
| 1986 | kürzer (Komp.) |  | أَقْصَر |  | Kein Match gefunden |
| 1987 | dicker (Komp.) |  | أَسْمَن |  | Kein Match gefunden |
| 1988 | schwächer (Komp.) |  | أَضْعَف |  | Kein Match gefunden |
| 1989 | näher (Komp.) |  | أَقْرَب |  | Kein Match gefunden |
| 1990 | weiter entfernt (Komp.) |  | أَبْعَد |  | Kein Match gefunden |
| 1991 | heißer (Komp.) |  | أَسْخَن |  | Kein Match gefunden |
| 1992 | breiter (Komp.) |  | أَعْرَض |  | Kein Match gefunden |
| 1993 | sauberer (Komp.) |  | أَنْظَف |  | Kein Match gefunden |
| 1994 | schwieriger (Komp.) |  | أَصْعَب |  | Kein Match gefunden |
| 1995 | dümmer (Komp.) |  | أَبْلَد |  | Kein Match gefunden |
| 1996 | gröber (Komp.) |  | أَغْلَظ |  | Kein Match gefunden |
| 1997 | älter / veralteter (Komp.) |  | أَقْدَم | أقْدِمْ | Ansatz 1: Exakter Konsonanten-Match |
| 1998 | einfacher (Komp.) |  | أَسْهَل |  | Kein Match gefunden |
| 1999 | schlechter (Komp.) |  | أَخْيَب |  | Kein Match gefunden |
| 2000 | breiter / geräumiger (Komp.) |  | أَوْسَع |  | Kein Match gefunden |
| 2001 | salziger (Komp.) |  | أَمْلَح |  | Kein Match gefunden |
| 2002 | fauliger / verdorbener (Komp.) |  | أَخْمَج |  | Kein Match gefunden |
| 2003 | kälter (Komp.) |  | أَبْرَد |  | Kein Match gefunden |
| 2004 | hässlicher (Komp.) |  | أَكْسَح |  | Kein Match gefunden |
| 2005 | saurer / schärfer (Komp.) |  | أَقْرَص |  | Kein Match gefunden |
| 2006 | dunkler (Komp.) |  | أَغْمَق |  | Kein Match gefunden |
| 2007 | heller (Komp.) |  | أَفْتَح |  | Kein Match gefunden |
| 2008 | schöner / süßer (Komp.) |  | أَحْلَى |  | Kein Match gefunden |
| 2009 | stärker (Komp.) |  | أَقْوَى | أقْوَى | Ansatz 1: Exakter Konsonanten-Match |
| 2010 | reicher (Komp.) |  | أَغْنَى |  | Kein Match gefunden |
| 2011 | klüger (Komp.) |  | أَذْكَى |  | Kein Match gefunden |
| 2012 | frischer (Komp.) |  | أَطْرَى |  | Kein Match gefunden |
| 2013 | teurer (Komp.) |  | أَغْلَى |  | Kein Match gefunden |
| 2014 | höher (Komp.) |  | أَعْلَى | أعْلَى | Ansatz 1: Exakter Konsonanten-Match |
| 2015 | niedriger (Komp.) |  | أَوْطَى |  | Kein Match gefunden |
| 2016 | klarer / reiner (Komp.) |  | أَصْفَى |  | Kein Match gefunden |
| 2017 | wärmer (Komp.) |  | أَدْفَى |  | Kein Match gefunden |
| 2018 | leichter (Komp.) |  | أَخَف |  | Kein Match gefunden |
| 2019 | gesünder / richtiger (Komp.) |  | أَصَح |  | Kein Match gefunden |
| 2020 | dünner / zarter (Komp.) |  | أَرَق |  | Kein Match gefunden |
| 2021 | schwächer / dünner (Komp.) |  | أَرَك |  | Kein Match gefunden |
| 2022 | besser (Komp.) |  | أَحْسَن / خِير |  | Kein Match gefunden |
| 2023 | mehr |  | أَكْثَر |  | Kein Match gefunden |
| 2024 | weniger |  | أَقَل |  | Kein Match gefunden |
| 2025 | welche (f. Fragewort) |  | أَنَاهِي |  | Kein Match gefunden |
| 2026 | welcher (m. Fragewort) |  | أَنَاهُو |  | Kein Match gefunden |
| 2027 | welche (Pl. Fragewort) |  | أَنَاهُم |  | Kein Match gefunden |
| 2028 | sehr (Verstärkung im Komp.) |  | يَاسِر |  | Kein Match gefunden |
| 2029 | was ist besser? |  | أَما خِير |  | Kein Match gefunden |
| 2030 | einfach / leicht |  | سَاهِل | سَاهِلْ | Ansatz 1: Exakter Konsonanten-Match |
| 2031 | schwierig / schwer |  | صْعِيب | صْعِيبْ | Ansatz 1: Exakter Konsonanten-Match |
| 2032 | dick / fett (m.) |  | سْمِين |  | Kein Match gefunden |
| 2033 | schwach (m.) |  | ضْعِيف |  | Kein Match gefunden |
| 2034 | breit (m.) |  | عْرِيض | عْرِيضْ | Ansatz 1: Exakter Konsonanten-Match |
| 2035 | schlecht / mies (m.) |  | خَايِب | خَايِبْ | Ansatz 1: Exakter Konsonanten-Match |
| 2036 | verdorben / faul / schmutzig (m.) |  | خَامِج |  | Kein Match gefunden |
| 2037 | hässlich (m.) |  | كَاسَح |  | Kein Match gefunden |
| 2038 | sauer / scharf (m.) |  | قَارِص | قَارٍصْ | Ansatz 1: Exakter Konsonanten-Match |
| 2039 | niedrig (m.) |  | وَاطِي |  | Kein Match gefunden |
| 2040 | warm (m.) |  | دَافِي | دَافِي | Ansatz 1: Exakter Konsonanten-Match |
| 2041 | klar / rein (m.) |  | صَافِي |  | Kein Match gefunden |
| 2042 | reich (m.) |  | غْنِي |  | Kein Match gefunden |
| 2043 | intelligent / klug (m.) |  | ذْكِي | ذْكِيّ | Ansatz 1: Exakter Konsonanten-Match |
| 2044 | frisch (m.) |  | طْرِي |  | Kein Match gefunden |
| 2045 | salzig (m.) |  | مَالَح | مَّالِحْ | Ansatz 1: Exakter Konsonanten-Match |
| 2046 | hoch (m.) |  | عَالِي | عَالِي | Ansatz 1: Exakter Konsonanten-Match |
| 2047 | dünn / zart (m.) |  | رْقِيق |  | Kein Match gefunden |
| 2048 | schwach / dünn (m.) |  | رْكِيك |  | Kein Match gefunden |
| 2049 | dumm / stumpf (m.) |  | بْلِيد |  | Kein Match gefunden |
| 2050 | grob / rau (m.) |  | غْلِيظ |  | Kein Match gefunden |
| 2051 | bekannt / berühmt |  | مَعْرُوف |  | Kein Match gefunden |
| 2052 | bewohnt / bevölkert |  | مَسْكُون | مَسْكُونْ | Ansatz 1: Exakter Konsonanten-Match |
| 2053 | geschrieben / Brief |  | مَكْتُوب | مَكْتُوبْ | Ansatz 1: Exakter Konsonanten-Match |
| 2054 | umgekehrt / auf dem Kopf |  | مَقْلُوب | مَقْلُوبْ | Ansatz 1: Exakter Konsonanten-Match |
| 2055 | lesend / gebildet |  | قَارِي | قَارِي | Ansatz 1: Exakter Konsonanten-Match |
| 2056 | Wichtigkeit / Bedeutung |  | أَهَمِيَّة | أهَمِيَّة | Ansatz 1: Exakter Konsonanten-Match |
| 2057 | normalerweise / in der Regel |  | فِي العَادَة |  | Kein Match gefunden |
| 2058 | die neue Generation |  | الجِيل الجَدِيد |  | Kein Match gefunden |
| 2059 | die Generation |  | الجِيل | جِيلْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 2060 | Freiheit |  | حُرِيَّة |  | Kein Match gefunden |
| 2061 | hin und wieder / ab und zu |  | سَاعَة سَاعَة |  | Kein Match gefunden |
| 2062 | sie wurden / sie fingen an |  | وَالَّوْ |  | Kein Match gefunden |
| 2063 | bis jetzt / immer noch |  | حَتَّى لِتَّو |  | Kein Match gefunden |
| 2064 | dasselbe Haus |  | نَفْس الدَّار |  | Kein Match gefunden |
| 2065 | miteinander / untereinander |  | بَعْضْهُم |  | Kein Match gefunden |
| 2066 | sich ein eigenes Zuhause aufbauen |  | يَعْمْلُو دِيَار وَحْدْهُم |  | Kein Match gefunden |
| 2067 | große Bedeutung / sehr wichtig |  | أَهَمِيَّة كْبِيرَة |  | Kein Match gefunden |
| 2068 | natürlich / selbstverständlich |  | بِالطَّبِيعَة |  | Kein Match gefunden |
| 2069 | immer |  | دِيمَا |  | Kein Match gefunden |
| 2070 | glücklich / froh (Pl.) |  | فَرْحَانِين |  | Kein Match gefunden |
| 2071 | erster / erste / erstes |  | أَوَّل |  | Kein Match gefunden |
| 2072 | zweiter / zweite / zweites |  | ثَانِي | ثَانِي | Ansatz 1: Exakter Konsonanten-Match |
| 2073 | Norden |  | شَمَال | شَمَالْ | Ansatz 1: Exakter Konsonanten-Match |
| 2074 | Süden |  | جَنُوب | جَنُوبْ | Ansatz 1: Exakter Konsonanten-Match |
| 2075 | Land / ländliche Gegend |  | رِيف |  | Kein Match gefunden |
| 2076 | Welt (allgemein) |  | عَالَم | عَالَمْ | Ansatz 1: Exakter Konsonanten-Match |
| 2077 | Einwohner / Bevölkerung |  | سُكَّان |  | Kein Match gefunden |
| 2078 | berühmt (m.) |  | مَشْهُور |  | Kein Match gefunden |
| 2079 | berühmt (f.) |  | مَشْهُورَة |  | Kein Match gefunden |
| 2080 | Sänger |  | مُغَنِّي | مُغَنِّي | Ansatz 1: Exakter Konsonanten-Match |
| 2081 | Sängerin |  | مُغَنِّيَة |  | Kein Match gefunden |
| 2082 | Schauspieler |  | مُمَثَّل | مُمَثِّلْ | Ansatz 1: Exakter Konsonanten-Match |
| 2083 | Schauspielerin |  | مُمَثَّلَة | مُمَثّْلَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 2084 | ich habe sehr großen Hunger |  | جُعْت بَرْشَا |  | Kein Match gefunden |
| 2085 | er spricht Englisch |  | يِتْكَلَّم بِالأَنْغْلِيز |  | Kein Match gefunden |
| 2086 | ich habe heute viel gearbeitet |  | خَدِمْت بَرْشَا اليُوم |  | Kein Match gefunden |
| 2087 | bis Juli |  | حَتَّى لِجْوِيلْيَة |  | Kein Match gefunden |
| 2088 | es gibt keine Tomaten auf dem Markt |  | مَا فَمَّاشْ طْمَاطِم فِي السُّوق |  | Kein Match gefunden |
| 2090 | Party / Fest |  | حَفْلَة |  | Kein Match gefunden |
| 2091 | Kupfer |  | نُحَاس | نْحَاسْ | Ansatz 1: Exakter Konsonanten-Match |
| 2092 | Eisen |  | حَدِيد | حْدِيدْ | Ansatz 1: Exakter Konsonanten-Match |
| 2093 | Feder |  | رِيشَة | رِيشَة | Ansatz 1: Exakter Konsonanten-Match |
| 2094 | Gesundheit für sie / bon appétit für sie |  | صَحَّة لِيهُم |  | Kein Match gefunden |
| 2095 | bitte / treten Sie ein / hier entlang |  | إِتْفَضَّلْ |  | Kein Match gefunden |
| 2097 | heute Abend / am Nachmittag |  | العْشِيَّة |  | Kein Match gefunden |
| 2099 | Tunesien |  | توِنس | توْنسْ | Ansatz 1: Exakter Konsonanten-Match |
| 2100 | französisch (f.) |  | فرنساوية |  | Kein Match gefunden |
| 2101 | amerikanisch (f.) |  | أمريكانية |  | Kein Match gefunden |
| 2102 | deutsch (f.) |  | ألمانية |  | Kein Match gefunden |
| 2103 | italienisch (f.) |  | إيطالية | إيطَالَيَّة | Ansatz 1: Exakter Konsonanten-Match |
| 2104 | mexikanisch (f.) |  | مكسيكية |  | Kein Match gefunden |
| 2105 | Tunesier (Pl.) |  | تونسا |  | Kein Match gefunden |
| 2106 | Franzosen (Pl.) |  | فرنسيس |  | Kein Match gefunden |
| 2107 | Amerikaner (Pl.) |  | أمريكان |  | Kein Match gefunden |
| 2108 | Deutsche (Pl.) |  | ألمان |  | Kein Match gefunden |
| 2109 | Mexikaner (Pl.) |  | مكسيكيين |  | Kein Match gefunden |
| 2110 | Italiener (Pl.) |  | طلاين |  | Kein Match gefunden |
| 2111 | nah (f.) |  | قريبة |  | Kein Match gefunden |
| 2112 | nahe (Pl.) |  | قراب |  | Kein Match gefunden |
| 2113 | weit entfernt (f.) |  | بعيدة |  | Kein Match gefunden |
| 2114 | weit (Pl.) |  | بعاد |  | Kein Match gefunden |
| 2115 | breit (f.) |  | عريضة |  | Kein Match gefunden |
| 2116 | breit (Pl.) |  | عراض |  | Kein Match gefunden |
| 2117 | voll (f.) |  | معبية |  | Kein Match gefunden |
| 2118 | voll (Pl.) |  | معبيين |  | Kein Match gefunden |
| 2119 | leer (f.) |  | فارغة |  | Kein Match gefunden |
| 2120 | leer (Pl.) |  | فارغين |  | Kein Match gefunden |
| 2121 | klein (f.) |  | صغيرة |  | Kein Match gefunden |
| 2122 | wir begleichen |  | نَقْضي |  | Kein Match gefunden |
| 2123 | wir zahlen ab |  | نْخَلَّص |  | Kein Match gefunden |
| 2124 | wir bezahlen |  | نِدْفَع |  | Kein Match gefunden |
| 2125 | die Kasse |  | الكاسة |  | Kein Match gefunden |
| 2126 | Einkaufswagen |  | شاريو | شاريو | Ansatz 1: Exakter Konsonanten-Match |
| 2127 | Pflaumen |  | عوينة |  | Kein Match gefunden |
| 2128 | Mais | popcorn | قْطَانْيَةْ | قْطَانْيَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 2129 | Artischocken |  | قناريّة |  | Kein Match gefunden |
| 2130 | Bäckerstand | bakery | كُوشَةْ | كُوشَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 2131 | Omo (Waschmittel) |  | أومو |  | Kein Match gefunden |
| 2132 | Tomatenmark |  | طماطم معجونة |  | Kein Match gefunden |
| 2133 | 100 Gramm |  | 100 غرام |  | Kein Match gefunden |
| 2134 | ein Joghurt (Einheit) |  | ياغورتة |  | Kein Match gefunden |
| 2135 | eine Zwiebel (Einheit) |  | بَصْلَة |  | Kein Match gefunden |
| 2137 | ein Fisch (Einheit) |  | حُوتَة | حُوتَة | Ansatz 1: Exakter Konsonanten-Match |
| 2138 | Fische (Pl.) |  | حُوتَات |  | Kein Match gefunden |
| 2139 | ein Brot (Einheit) |  | خُبْزَة |  | Kein Match gefunden |
| 2140 | Brote (Pl.) |  | خُبْزَات |  | Kein Match gefunden |
| 2141 | ein Stück / ein Exemplar / eine Einheit |  | كَعْبَةْ |  | Kein Match gefunden |
| 2142 | Brik-Teigblatt |  | بريك |  | Kein Match gefunden |
| 2143 | Rinder (Kollektiv) |  | بقر |  | Kein Match gefunden |
| 2144 | Kuh (Einheit) |  | بَقَرَة |  | Kein Match gefunden |
| 2145 | Kühe (Pl.) |  | بقرات |  | Kein Match gefunden |
| 2146 | ein Knochen (Einheit) |  | عَظْمَة |  | Kein Match gefunden |
| 2147 | Knochen (Pl.) |  | عظمات |  | Kein Match gefunden |
| 2148 | Cafés (Pl.) |  | قهاوي |  | Kein Match gefunden |
| 2149 | kleines Kind |  | وْلَيَّد |  | Kein Match gefunden |
| 2150 | scharfe Peperoni (Einheit) |  | حارة |  | Kein Match gefunden |
| 2151 | scharfe Peperoni (Pl.) |  | حيار |  | Kein Match gefunden |
| 2152 | Liter (Pl., Maßeinheit) |  | إطرات |  | Kein Match gefunden |
| 2153 | Tage (Pl.) |  | أيام |  | Kein Match gefunden |
| 2154 | Male (Pl.) |  | مرات |  | Kein Match gefunden |
| 2155 | Ideen (Pl.) |  | أفكار |  | Kein Match gefunden |
| 2156 | Packungen (Pl.) |  | باكوات |  | Kein Match gefunden |
| 2157 | zwei Gläser (Dual) |  | كاسين |  | Kein Match gefunden |
| 2158 | zwei Kaffee (Dual) |  | قهوتين |  | Kein Match gefunden |
| 2159 | zwei Liter (Dual, Maßeinheit) |  | إطرتين |  | Kein Match gefunden |
| 2160 | zwei Knochen (Dual) |  | عظمتين |  | Kein Match gefunden |
| 2161 | zwei Brote (Dual) |  | خبزتين |  | Kein Match gefunden |
| 2162 | zwei Dosen (Dual) |  | حكتين |  | Kein Match gefunden |
| 2163 | zwei Blätter (Dual) |  | ورقتين |  | Kein Match gefunden |
| 2164 | zwei Tage (Dual) |  | نهارين |  | Kein Match gefunden |
| 2165 | zwei Ideen (Dual) |  | فكرتين |  | Kein Match gefunden |
| 2166 | Hemd geknöpft (sg.) |  | سورِيَّة |  | Kein Match gefunden |
| 2167 | Rock (sg.) |  | جيب |  | Kein Match gefunden |
| 2168 | Röcke (Pl.) |  | جيبات |  | Kein Match gefunden |
| 2169 | Gürtel (Pl.) |  | سْبِت | سِبْتْ | Ansatz 1: Exakter Konsonanten-Match |
| 2170 | Kleider (Pl.) |  | رْوِب |  | Kein Match gefunden |
| 2171 | Sandalen (Pl.) |  | صْنادِل |  | Kein Match gefunden |
| 2172 | Nadeln (Pl.) |  | أَبارِي |  | Kein Match gefunden |
| 2173 | schwarz (Pl.) |  | كْحُل |  | Kein Match gefunden |
| 2174 | weiß (Pl.) |  | بْيُض |  | Kein Match gefunden |
| 2175 | rot (Pl.) |  | حْمُر |  | Kein Match gefunden |
| 2176 | gelb (Pl.) |  | صْفُر |  | Kein Match gefunden |
| 2177 | blau (Pl.) |  | زْرُق |  | Kein Match gefunden |
| 2178 | grün (Pl.) |  | خْضُر |  | Kein Match gefunden |
| 2179 | falten / zusammenfalten |  | إِطْوِي / طَبَّق |  | Kein Match gefunden |
| 2180 | aufkleben / ankleben |  | لَصِق |  | Kein Match gefunden |
| 2181 | die Reise / das Reisen |  | السَّفَر | سِفْرْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 2182 | Stadtbus (SNT) |  | الكيران |  | Kein Match gefunden |
| 2183 | Schaffner / Fahrkartenprüfer |  | الخلاّص | خَلَّاصْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 2184 | er dachte nach |  | فَكَّر |  | Kein Match gefunden |
| 2185 | er fragt |  | يسأل |  | Kein Match gefunden |
| 2186 | letzte/r/s (f.) |  | الفايتة |  | Kein Match gefunden |
| 2187 | Wochen (Pl.) |  | جِمْعات |  | Kein Match gefunden |
| 2188 | Sardine |  | سَرْدينة |  | Kein Match gefunden |
| 2189 | Unfall | accident | حادِثْ | حادِثْ | Ansatz 1: Exakter Konsonanten-Match |
| 2190 | stehend / wartend (Pl.) |  | واقفين |  | Kein Match gefunden |
| 2191 | Fragen |  | سُؤَالَات |  | Kein Match gefunden |
| 2192 | Antworten |  | أَجْوِبَة |  | Kein Match gefunden |
| 2193 | Großmutter (informell) |  | مَامَة |  | Kein Match gefunden |
| 2194 | Mädchen / Töchterchen |  | بِنَيَّة | بِنِيَّة | Ansatz 1: Exakter Konsonanten-Match |
| 2195 | Sohn (Singular) |  | وِلْد | وِلْدْ | Ansatz 1: Exakter Konsonanten-Match |
| 2197 | tot (Plural) |  | مَيِّتِين |  | Kein Match gefunden |
| 2198 | Arzt (Darija) |  | طَبِيب |  | Kein Match gefunden |
| 2199 | Schatten |  | ظُلّ |  | Kein Match gefunden |
| 2200 | er wischt ab |  | يِمْسَح |  | Kein Match gefunden |
| 2202 | er rät / empfiehlt |  | يِنْصَح |  | Kein Match gefunden |
| 2203 | er nimmt teil |  | يِحْضَر |  | Kein Match gefunden |
| 2204 | er lehnt ab |  | يِرْفَض |  | Kein Match gefunden |
| 2205 | er hilft |  | يُعَاوِن |  | Kein Match gefunden |
| 2206 | er schlägt |  | يِضْرَب |  | Kein Match gefunden |
| 2207 | er springt |  | يُنَقِّز |  | Kein Match gefunden |
| 2208 | er lügt |  | يِكْذَب |  | Kein Match gefunden |
| 2209 | er gewinnt |  | يِرْبَح |  | Kein Match gefunden |
| 2210 | er verliert |  | يِخْسَر |  | Kein Match gefunden |
| 2211 | er besteht / hat Erfolg |  | يَنْجَح |  | Kein Match gefunden |
| 2212 | er versucht |  | يُحَاوِل |  | Kein Match gefunden |
| 2213 | er druckt |  | يِطْبَع |  | Kein Match gefunden |
| 2214 | er dankt |  | يِشْكَر |  | Kein Match gefunden |
| 2215 | er benutzt |  | يَسْتَعْمِل |  | Kein Match gefunden |
| 2216 | er lacht |  | يِضْحَك |  | Kein Match gefunden |
| 2218 | er bereitet vor |  | يُحَضِّر |  | Kein Match gefunden |
| 2219 | er schließt |  | يُسَكِّر |  | Kein Match gefunden |
| 2220 | er fotografiert / zeichnet |  | يُصَوِّر |  | Kein Match gefunden |
| 2222 | er wechselt |  | يُبَدِّل |  | Kein Match gefunden |
| 2223 | er beendet |  | يُكَمِّل |  | Kein Match gefunden |
| 2224 | er repariert |  | يُصَلِّح |  | Kein Match gefunden |
| 2225 | er probiert aus |  | يُجَرِّب |  | Kein Match gefunden |
| 2226 | er zerbricht |  | يُكَسِّر |  | Kein Match gefunden |
| 2228 | er hebt / trägt |  | يُهِزُّ |  | Kein Match gefunden |
| 2229 | er berührt |  | يَمِسُّ |  | Kein Match gefunden |
| 2230 | er fühlt / spürt |  | يَحِسُّ |  | Kein Match gefunden |
| 2231 | er langweilt sich |  | يَفِدُّ |  | Kein Match gefunden |
| 2233 | er schwimmt |  | يَعُوم |  | Kein Match gefunden |
| 2236 | er bringt |  | يَجِيب |  | Kein Match gefunden |
| 2237 | er fehlt |  | يَغِيب |  | Kein Match gefunden |
| 2238 | er fällt |  | يَطِيح |  | Kein Match gefunden |
| 2239 | er passiert / wird |  | يَصِير |  | Kein Match gefunden |
| 2240 | er sagt |  | يَقُول |  | Kein Match gefunden |
| 2241 | er stirbt |  | يَمُوت |  | Kein Match gefunden |
| 2245 | er wird |  | يُوَلِّي |  | Kein Match gefunden |
| 2246 | er wartet |  | يَسْتَنَّى |  | Kein Match gefunden |
| 2247 | er lässt |  | يَخَلِّي |  | Kein Match gefunden |
| 2249 | er denkt nach |  | يُفَكِّر |  | Kein Match gefunden |
| 2250 | Verkäufer |  | بَيَّاع | بَيَّاعْ | Ansatz 1: Exakter Konsonanten-Match |
| 2251 | ich schaue mich um / ich suche |  | نْفَرْكِس |  | Kein Match gefunden |
| 2252 | Souvenir / Mitbringsel |  | سُوفونير | سوفونير | Ansatz 1: Exakter Konsonanten-Match |
| 2253 | ein Blick / Ausschau halten |  | طَلَّة |  | Kein Match gefunden |
| 2254 | ich berechne den Preis |  | نِحْسَب |  | Kein Match gefunden |
| 2255 | ich freue mich |  | نِفْرَح |  | Kein Match gefunden |
| 2256 | Selbstkostenpreis / Einkaufspreis |  | رَاس مَالو |  | Kein Match gefunden |
| 2257 | Rundgang / Runde |  | دَوْرَة |  | Kein Match gefunden |
| 2258 | Gott helfe dir (beim Abschied) |  | رَبِّي يْعينِك |  | Kein Match gefunden |
| 2259 | Traum |  | حِلْمَة | حِلْمة | Ansatz 1: Exakter Konsonanten-Match |
| 2260 | Träume (Pl.) |  | أَحْلام | أحْلَامْ | Ansatz 1: Exakter Konsonanten-Match |
| 2261 | er verwirklichte / er erreichte |  | حَقَّق |  | Kein Match gefunden |
| 2262 | er verwirklicht / er erreicht |  | يُحَقِّق |  | Kein Match gefunden |
| 2263 | glücklich / froh (m.sg.) |  | فَرْحان |  | Kein Match gefunden |
| 2264 | er wurde befördert |  | تْرَقَّى |  | Kein Match gefunden |
| 2265 | er wird befördert |  | يِتْرَقَّى |  | Kein Match gefunden |
| 2266 | Beförderung |  | تَرْقِية | تَرْقْيَة | Ansatz 1: Exakter Konsonanten-Match |
| 2267 | Menschen / Leute |  | عْباد |  | Kein Match gefunden |
| 2269 | Lied |  | غُنايَة |  | Kein Match gefunden |
| 2270 | Anblick / Aussicht |  | مَنْظَر | مَنْظِرْ | Ansatz 1: Exakter Konsonanten-Match |
| 2271 | Sonnenuntergang |  | غُروب الشَّمْس |  | Kein Match gefunden |
| 2272 | einfach / schlicht |  | بْسيط | بْسِيطْ | Ansatz 1: Exakter Konsonanten-Match |
| 2273 | sich streiten |  | تْعارَك |  | Kein Match gefunden |
| 2274 | Stress |  | سْتراس | سْتْرَاسْ | Ansatz 1: Exakter Konsonanten-Match |
| 2275 | wirklich? / ernsthaft? |  | بِالرَّسْمي |  | Kein Match gefunden |
| 2276 | Bankkredit |  | قَرْض | قَرْضْ | Ansatz 1: Exakter Konsonanten-Match |
| 2278 | Programm / Plan |  | بَرْنامِج |  | Kein Match gefunden |
| 2279 | alles ins Wasser gefallen (Plan scheiterte) |  | كُلّ شَيْ طَاح فِي الماء |  | Kein Match gefunden |
| 2280 | Haushalt / Familienpflichten |  | جُرَّة الدَّار |  | Kein Match gefunden |
| 2281 | Masterstudium |  | ماسْتار |  | Kein Match gefunden |
| 2282 | Wald | forest | غَابَةْ | غَابَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 2283 | Westen |  | غَرْب | غَرْبْ | Ansatz 1: Exakter Konsonanten-Match |
| 2284 | Osten | east | شَرْقْ | شَرْقْ | Ansatz 1: Exakter Konsonanten-Match |
| 2285 | Frage |  | سُؤَال | سُؤَالْ | Ansatz 1: Exakter Konsonanten-Match |
| 2286 | Antwort |  | جَاوَب |  | Kein Match gefunden |
| 2287 | lebendig (m.) |  | حَيّ | حَيْ | Ansatz 1: Exakter Konsonanten-Match |
| 2288 | lebendig (f.) |  | حَيَّة |  | Kein Match gefunden |
| 2289 | lebendig (Pl.) |  | حَيِّين |  | Kein Match gefunden |
| 2290 | tot (m.) |  | مَيِّت |  | Kein Match gefunden |
| 2291 | tot (f.) |  | مَيِّتَة |  | Kein Match gefunden |
| 2292 | Tote (Pl.) |  | مُوتَى |  | Kein Match gefunden |
| 2293 | er fegte / kehrte |  | كَنَس | كْنُسْ | Ansatz 1: Exakter Konsonanten-Match |
| 2294 | er fegt / kehrt |  | يِكْنُس |  | Kein Match gefunden |
| 2295 | Kleingeld / ein paar Münzen |  | فْلَيِّس |  | Kein Match gefunden |
| 2296 | Couscoustopf (unterer Teil) |  | مَقْفُول |  | Kein Match gefunden |
| 2297 | Sieb |  | غُرْبَال |  | Kein Match gefunden |
| 2298 | Bettdecke |  | غْطَا |  | Kein Match gefunden |
| 2299 | Krümel |  | فِتْفَات |  | Kein Match gefunden |
| 2300 | leckerer Duft / Geruch |  | رِيحَة بْنِينَة |  | Kein Match gefunden |
| 2301 | Schwanz |  | ذِيل | ذِيلْ | Ansatz 1: Exakter Konsonanten-Match |
| 2302 | Knoten |  | عُقْدَة | عُقْدَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 2303 | Viertel / Nachbarschaft |  | حُومَة | حُومَة | Ansatz 1: Exakter Konsonanten-Match |
| 2304 | Gras |  | حْشِيش | حْشِيشْ | Ansatz 1: Exakter Konsonanten-Match |
| 2305 | Wolken |  | سْحَاب |  | Kein Match gefunden |
| 2306 | Regen |  | مْطَر |  | Kein Match gefunden |
| 2307 | Moral (einer Geschichte) |  | عِبْرَة |  | Kein Match gefunden |
| 2308 | Geschichte / Märchen |  | حْكَايَة | حْكَايَة | Ansatz 1: Exakter Konsonanten-Match |
| 2309 | er versprach |  | وَعَد |  | Kein Match gefunden |
| 2310 | er verspricht |  | يُوعَد |  | Kein Match gefunden |
| 2311 | er packte / griff |  | شَدَّ |  | Kein Match gefunden |
| 2312 | er packt / greift |  | يِشُدّ |  | Kein Match gefunden |
| 2313 | er band / knüpfte |  | رَبَط | رْبَطْ | Ansatz 1: Exakter Konsonanten-Match |
| 2314 | er bindet / knüpft |  | يِرْبُط |  | Kein Match gefunden |
| 2315 | er verzieh / vergab |  | سَامَح |  | Kein Match gefunden |
| 2316 | er verzeiht / vergibt |  | يِسَامَح |  | Kein Match gefunden |
| 2317 | klug / schlau (m.) (MSA) |  | حَاذَق |  | Kein Match gefunden |
| 2318 | klug / schlau (f.) |  | حَاذْقَة |  | Kein Match gefunden |
| 2319 | Richtungen |  | الِاتِّجاهات |  | Kein Match gefunden |
| 2320 | Nordosten |  | الشَّمال الشَّرْقي |  | Kein Match gefunden |
| 2321 | Südosten |  | الجَنوب الشَّرْقي |  | Kein Match gefunden |
| 2322 | Südwesten |  | الجَنوب الغَرْبي |  | Kein Match gefunden |
| 2323 | Nordwesten |  | الشَّمال الغَرْبي |  | Kein Match gefunden |
| 2324 | Berufe |  | الخِدَم |  | Kein Match gefunden |
| 2325 | Banker |  | بانكاجي |  | Kein Match gefunden |
| 2326 | Koch |  | طَبَّاخ |  | Kein Match gefunden |
| 2327 | Friseur |  | حَجَّام | حَجَّامْ | Ansatz 1: Exakter Konsonanten-Match |
| 2328 | Ingenieur |  | مُهَنْدِس | مُهَنْدِسْ | Ansatz 1: Exakter Konsonanten-Match |
| 2329 | Tischler |  | نَجَّار | نَجَّارْ | Ansatz 1: Exakter Konsonanten-Match |
| 2330 | Gärtner |  | جْنَيْني |  | Kein Match gefunden |
| 2331 | Lehrer |  | مُعَلِّم | مَعْلِمْ | Ansatz 1: Exakter Konsonanten-Match |
| 2332 | Soldat |  | عَسْكَري |  | Kein Match gefunden |
| 2333 | Taxifahrer |  | تَاكْسِيسْت |  | Kein Match gefunden |
| 2334 | Wind |  | رِيح | رِيحْ | Ansatz 1: Exakter Konsonanten-Match |
| 2335 | Sturm |  | عَاصِفَة | عَاصْفَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 2336 | Blitz |  | بَرْق | بْرَقْ | Ansatz 1: Exakter Konsonanten-Match |
| 2337 | Donner |  | رَعْد | رْعَدْ | Ansatz 1: Exakter Konsonanten-Match |
| 2338 | Überschwemmungen |  | فَيْضانات | فَيَضَانَاتْ | Ansatz 1: Exakter Konsonanten-Match |
| 2339 | Hitze / Fieber |  | سُخانَة | سْخَانَة | Ansatz 1: Exakter Konsonanten-Match |
| 2340 | Dürre |  | جَفاف |  | Kein Match gefunden |
| 2341 | Kälte |  | بَرْد |  | Kein Match gefunden |
| 2342 | Regenbogen |  | قَوْس قُزَح |  | Kein Match gefunden |
| 2343 | Wie komme ich dorthin? |  | كِيفَاش نِمْشي؟ |  | Kein Match gefunden |
| 2344 | zu Fuß |  | عْلى ساقَيَّا |  | Kein Match gefunden |
| 2345 | mit dem Auto |  | بِالكَرَهْبَة |  | Kein Match gefunden |
| 2346 | mit dem Fahrrad |  | بِالبَسْكلَة |  | Kein Match gefunden |
| 2347 | mit der U-Bahn |  | بِالمِيترو |  | Kein Match gefunden |
| 2348 | mit dem Flugzeug |  | بِالطَّيَّارَة |  | Kein Match gefunden |
| 2349 | mit dem Zug |  | بِالتْران |  | Kein Match gefunden |
| 2350 | mit dem Zug (Variante) |  | بِالتْرينو |  | Kein Match gefunden |
| 2351 | mit dem Taxi |  | بِالتَّاكسي |  | Kein Match gefunden |
| 2352 | mit dem Bus |  | بِالكار |  | Kein Match gefunden |
| 2353 | zwei Uhr |  | السَّاعَتِين |  | Kein Match gefunden |
| 2354 | die Uhren / Stunden |  | السُّوَايَع |  | Kein Match gefunden |
| 2355 | die Minuten |  | الدُّقَايَق |  | Kein Match gefunden |
| 2356 | 5 Minuten |  | دَرَج | دُرْجْ | Ansatz 1: Exakter Konsonanten-Match |
| 2357 | 10 Minuten |  | دَرْجِين |  | Kein Match gefunden |
| 2358 | fünfundzwanzig nach |  | وَخَمْسَة |  | Kein Match gefunden |
| 2359 | fünfunddreißig nach |  | وَسَبْعَة |  | Kein Match gefunden |
| 2360 | zwanzig vor |  | غِير أَرْبَعَة |  | Kein Match gefunden |
| 2361 | zehn vor |  | غِير دَرْجِين |  | Kein Match gefunden |
| 2362 | fünf vor |  | غِير دَرَج |  | Kein Match gefunden |
| 2363 | genau / Punkt (Uhrzeit) |  | پِيل |  | Kein Match gefunden |
| 2364 | Vogel / Spatz |  | عَصْفُور | عَصْفُورْ | Ansatz 1: Exakter Konsonanten-Match |
| 2365 | Schaf |  | عَلُّوش | عَلُّوشْ | Ansatz 1: Exakter Konsonanten-Match |
| 2366 | Ziege |  | مَعْزَة | مَعْزَة | Ansatz 1: Exakter Konsonanten-Match |
| 2367 | Elefant |  | فِيل | فِيلْ | Ansatz 1: Exakter Konsonanten-Match |
| 2368 | Giraffe |  | زَرَافَة |  | Kein Match gefunden |
| 2369 | Gazelle |  | غْزَالَة |  | Kein Match gefunden |
| 2370 | Fuchs |  | ثَعْلَب | ثَعْلَبْ | Ansatz 1: Exakter Konsonanten-Match |
| 2371 | Löwe |  | صَيَد | صِيدْ | Ansatz 1: Exakter Konsonanten-Match |
| 2372 | Maus |  | فَار | فَارْ | Ansatz 1: Exakter Konsonanten-Match |
| 2373 | Schildkröte |  | فَكْرُون | فَكْرُونْ | Ansatz 1: Exakter Konsonanten-Match |
| 2374 | Kaninchen |  | أَرْنَب | أَرْنِبْ | Ansatz 1: Exakter Konsonanten-Match |
| 2375 | Schlange |  | حْنَش | حْنَشْ | Ansatz 1: Exakter Konsonanten-Match |
| 2376 | Frosch |  | جْرَانَة | جْرَانَة | Ansatz 1: Exakter Konsonanten-Match |
| 2377 | Hai |  | قِرْش | قِرْشْ | Ansatz 1: Exakter Konsonanten-Match |
| 2378 | Papagei |  | بَبَّغَيُّو | ببغيّو | Ansatz 1: Exakter Konsonanten-Match |
| 2379 | Matratze / Liegefläche |  | فَرْش | فَرْشْ | Ansatz 1: Exakter Konsonanten-Match |
| 2380 | Kleiderständer |  | عَلَّاق |  | Kein Match gefunden |
| 2381 | Spiegel |  | مْرَايَة | مْرَايَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 2382 | Bleistift |  | قَلَم رَصَاص |  | Kein Match gefunden |
| 2383 | Schreibtisch |  | بِيرُو | بيرو | Ansatz 1: Exakter Konsonanten-Match |
| 2384 | Lineal |  | مَسْطَرَة | مَسْطَرَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 2385 | Anspitzer |  | بَرَّايَة |  | Kein Match gefunden |
| 2386 | Radiergummi |  | گُومَة |  | Kein Match gefunden |
| 2387 | Fahrrad |  | بَسْكَلَة |  | Kein Match gefunden |
| 2388 | Lastwagen / LKW |  | كَمْيُونَة |  | Kein Match gefunden |
| 2389 | Metro / U-Bahn |  | مِيتْرُو |  | Kein Match gefunden |
| 2390 | Schiff |  | بَابُور |  | Kein Match gefunden |
| 2391 | Boot |  | بَاتُو |  | Kein Match gefunden |
| 2393 | oh mein Gott! / unglaublich! / omg |  | يَا حَلِيلِي |  | Kein Match gefunden |
| 2394 | unglaublich! / nicht von dieser Welt! |  | مُوشْ نُورْمَال |  | Kein Match gefunden |
| 2395 | hau ab! / verpiss dich! (derb) |  | تُوس |  | Kein Match gefunden |
| 2398 | er zündete an / machte an (Licht, Feuer) |  | شَعَل |  | Kein Match gefunden |
| 2399 | er zündet an / macht an (Licht, Feuer) |  | يَشْعَل |  | Kein Match gefunden |
| 2400 | er machte aus (Licht) |  | طَفَّى |  | Kein Match gefunden |
| 2401 | er macht aus (Licht) |  | يُطَفِّي |  | Kein Match gefunden |
| 2402 | gut / schön / hübsch (m.) |  | مِزْيَان |  | Kein Match gefunden |
| 2403 | gut / schön / hübsch (f.) |  | مِزْيَانَة |  | Kein Match gefunden |
| 2404 | ich kann Englisch sprechen |  | نَجَّم نَحْكِي بِالإِنْجلِيزِيَّة |  | Kein Match gefunden |
| 2405 | ich kann gehen |  | نَجَّم نِمْشِي |  | Kein Match gefunden |
| 2406 | ich kann dich nicht verstehen |  | مَا نَجَّمْش نِفْهَمِك |  | Kein Match gefunden |
| 2407 | ich kann jetzt nicht gehen |  | مَا نَجَّمْش نِمْشِي تَوَّا |  | Kein Match gefunden |
| 2408 | kannst du mir den Weg zeigen? |  | تَنَجَّم تُوَرِّيني الثْنِيَّة؟ |  | Kein Match gefunden |
| 2409 | kann ich reinkommen? |  | تَنَجَّم تُدْخُل؟ |  | Kein Match gefunden |
| 2410 | kann ich dich fragen? |  | تَنَجَّم نِسْألِك؟ |  | Kein Match gefunden |
| 2411 | Tintenfisch |  | صُوبِيَا |  | Kein Match gefunden |
| 2412 | Oktopus |  | قَرْنِيط |  | Kein Match gefunden |
| 2413 | er furzt (MSA) |  | يَضْرُط |  | Kein Match gefunden |
| 2414 | er gurgelt |  | يَغَرْغَر |  | Kein Match gefunden |
| 2415 | er erbricht |  | يَرَجَّع |  | Kein Match gefunden |
| 2416 | er spuckt |  | يَبْزُق |  | Kein Match gefunden |
| 2417 | er uriniert |  | يَبُول |  | Kein Match gefunden |
| 2418 | er defäkiert |  | يَحْرَا |  | Kein Match gefunden |
| 2419 | er rülpst |  | يَتَقَرَّع |  | Kein Match gefunden |
| 2420 | er niest |  | يَعْطُس |  | Kein Match gefunden |
| 2421 | schwarzer Pfeffer |  | فِلْفِل أَكْحَل |  | Kein Match gefunden |
| 2422 | Kreuzkümmel |  | كَمُّون |  | Kein Match gefunden |
| 2423 | Kurkuma / (wörtl.: gelbes Holz) |  | كُرْكُم / عُودْ أَصْفَرْ |  | Kein Match gefunden |
| 2424 | Zimt |  | قِرْفَة | قِرْفَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 2425 | Gewürznelke |  | قَرَنْفُل |  | Kein Match gefunden |
| 2426 | Kardamom |  | حَبْهَان |  | Kein Match gefunden |
| 2427 | Lorbeerblatt |  | رَنْد | رَنْدْ | Ansatz 1: Exakter Konsonanten-Match |
| 2428 | Muskatnuss |  | جُوزَة الطِّيب |  | Kein Match gefunden |
| 2429 | Muskatblüte |  | قِشْرَة الجُوزَة |  | Kein Match gefunden |
| 2430 | Sternanis |  | نَجْمَة الأَنِيس |  | Kein Match gefunden |
| 2431 | getrocknete Chilis |  | فِلْفِل أَحْمَر مُجَفَّف |  | Kein Match gefunden |
| 2432 | Safran |  | زَعْفَرَان |  | Kein Match gefunden |
| 2433 | Was machst du beruflich? / Was arbeitest du? |  | شْنُوَّا تِخْدِم؟ |  | Kein Match gefunden |
| 2434 | Marmelade / Aufstrich |  | مَعْجُون |  | Kein Match gefunden |
| 2435 | Olivenöl |  | زِيت زَيْتُونَة |  | Kein Match gefunden |
| 2436 | Eier (Darija) |  | عَظْم |  | Kein Match gefunden |
| 2437 | Ist das original? |  | هَذَا أُورِيجِينَال؟ |  | Kein Match gefunden |
| 2438 | Gibt es ein Angebot / Rabatt? |  | فَمَّة بْرومو؟ |  | Kein Match gefunden |
| 2439 | sehr teuer |  | غَالِي بَرْشَا |  | Kein Match gefunden |
| 2440 | Der Preis gefällt mir nicht |  | مَا عَجْبِنِيش السُّوم |  | Kein Match gefunden |
| 2441 | nicht billig |  | مُوش رْخِيص |  | Kein Match gefunden |
| 2442 | Mach mir ein bisschen weniger (Preis) |  | نَقِّصْلِي شْوَيَّة |  | Kein Match gefunden |
| 2443 | Ich nehme das |  | بَاش نَاخُو هَذَا |  | Kein Match gefunden |
| 2444 | Hast du das schon mal ausprobiert? |  | جَرَّبْتُو قْبَل؟ |  | Kein Match gefunden |
| 2445 | Mach noch mehr Rabatt / gib mir einen besseren Preis |  | زِيد نَقِّص |  | Kein Match gefunden |
| 2446 | Das ist zu viel dafür / zu teuer dafür |  | بَرْشَا عْلِيهَا |  | Kein Match gefunden |
| 2447 | Blume (Darija) |  | نْوَارَة |  | Kein Match gefunden |
| 2448 | Stern |  | نَجْمَة | نِجْمَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 2449 | Himmel |  | سْمَا |  | Kein Match gefunden |
| 2450 | Regen (gesprochen) |  | شْتَا |  | Kein Match gefunden |
| 2451 | redegewandt / er spricht fließend |  | لْسَانُو مَطْلُوق |  | Kein Match gefunden |
| 2452 | redegewandt / eloquent |  | يَعْرَف يَحْكِي |  | Kein Match gefunden |
| 2453 | er stottert |  | يَلْكَلَّك |  | Kein Match gefunden |
| 2454 | nervös / angespannt |  | دَاخِل بَعْضُو |  | Kein Match gefunden |
| 2455 | aufmerksam / wach |  | فَايِق | فَايَقْ | Ansatz 1: Exakter Konsonanten-Match |
| 2456 | fokussiert / konzentriert |  | عِينُو مَحْلُولَة |  | Kein Match gefunden |
| 2457 | unaufmerksam / nicht konzentriert |  | مُوش مُرَكَّز |  | Kein Match gefunden |
| 2458 | abgelenkt / in Gedanken |  | سَارِح |  | Kein Match gefunden |
| 2459 | Marmor |  | رُخَام | رْخَامْ | Ansatz 1: Exakter Konsonanten-Match |
| 2460 | Gips / Verputz |  | جِبْس |  | Kein Match gefunden |
| 2461 | Farbe / Anstrich |  | دُهْن | دُهْنْ | Ansatz 1: Exakter Konsonanten-Match |
| 2462 | Tapete |  | وَرَق حِيط |  | Kein Match gefunden |
| 2463 | Dämmstoff / Isolierung |  | عَازِل |  | Kein Match gefunden |
| 2464 | Zement / Beton |  | سِيمَان | سِيمَانْ | Ansatz 1: Exakter Konsonanten-Match |
| 2465 | lauf! (Imperativ) |  | إِجْرِي |  | Kein Match gefunden |
| 2467 | kletter! / halt dich fest! |  | تَشَعْبَط |  | Kein Match gefunden |
| 2468 | kriech! (Imperativ) |  | إِحْبِي |  | Kein Match gefunden |
| 2469 | streck dich! / steh gerade! |  | تَجَبَّد |  | Kein Match gefunden |
| 2470 | beug dich! / nach vorne beugen |  | طَبِّس |  | Kein Match gefunden |
| 2471 | verbiege dich / roll dich |  | تَلَوَّى |  | Kein Match gefunden |
| 2472 | heb! / trag! (Imperativ) |  | هِزّ |  | Kein Match gefunden |
| 2473 | schieb! (Imperativ) |  | دِزّ |  | Kein Match gefunden |
| 2474 | zieh! (Imperativ) |  | إِجْبَد |  | Kein Match gefunden |
| 2475 | tritt! / stampf mit dem Fuß |  | اضرب بساقك |  | Kein Match gefunden |
| 2476 | schlage mit der Hand! |  | اضرب بيدك |  | Kein Match gefunden |
| 2477 | winke! (Imperativ) |  | بَيْبِي | بِيبِي | Ansatz 1: Exakter Konsonanten-Match |
| 2478 | einsam |  | وَحْدَانِي |  | Kein Match gefunden |
| 2479 | eifersüchtig |  | مُغْيَار |  | Kein Match gefunden |
| 2480 | verzweifelt / hoffnungslos |  | مَايِس |  | Kein Match gefunden |
| 2481 | hoffnungsvoll / zuversichtlich |  | مُتْقَابِل |  | Kein Match gefunden |
| 2482 | schuldig / reumütig |  | نَادِم |  | Kein Match gefunden |
| 2483 | sein Gewissen plagt ihn |  | ضَمِيرُو يَأْنِبُو |  | Kein Match gefunden |
| 2484 | schüchtern |  | خَشَّام |  | Kein Match gefunden |
| 2485 | liebevoll / zärtlich |  | حَنِين | حْنِينْ | Ansatz 1: Exakter Konsonanten-Match |
| 2486 | verliebt |  | مَغْرُوم |  | Kein Match gefunden |
| 2487 | freundlich / warmherzig |  | نَحْبُوح |  | Kein Match gefunden |
| 2488 | nachtragend / gehässig |  | حَقُودِي |  | Kein Match gefunden |
| 2489 | steh! (Imperativ) |  | آقِف |  | Kein Match gefunden |
| 2491 | selbstsüchtig (er liebt sich selbst) |  | يُحِبّ رُوحُو |  | Kein Match gefunden |
| 2492 | faul / träge |  | فَنْيَان |  | Kein Match gefunden |
| 2493 | arrogant / aufgeblasen |  | مَنْفُوخ |  | Kein Match gefunden |
| 2494 | Lügner / unzuverlässig (MSA) |  | زَفْزَاف |  | Kein Match gefunden |
| 2495 | unerzogen / respektlos |  | مُوش مُتْرَبِّي |  | Kein Match gefunden |
| 2496 | stur / störrisch |  | عُنَايْدِي |  | Kein Match gefunden |
| 2497 | negativ / miesepetrig |  | وَجْه دُودُو |  | Kein Match gefunden |
| 2498 | unehrlich / gerissen |  | بَلْعُوظ |  | Kein Match gefunden |
| 2499 | ungeduldig |  | مَا يُصْبُرْش |  | Kein Match gefunden |
| 2500 | aggressiv (kauft Ärger) |  | يِشْرِي فِي الشِّبُوك |  | Kein Match gefunden |
| 2501 | launisch (seine Stimmung wechselt jede Stunde) |  | جَوُّو يِتْبَدَّل فِي سَّاعَة |  | Kein Match gefunden |
| 2502 | gleichgültig / unvorsichtig |  | مَا عْلَابَالُوش |  | Kein Match gefunden |
| 2503 | feige |  | خَوَّاف |  | Kein Match gefunden |
| 2504 | gierig / habgierig |  | طَمَّاع | طَمَّاعْ | Ansatz 1: Exakter Konsonanten-Match |
| 2505 | Palmblätter |  | سْعَف |  | Kein Match gefunden |
| 2506 | Alfagras / Esparto |  | حَلْفَاء |  | Kein Match gefunden |
| 2507 | Schilf / Binse |  | سْمَر |  | Kein Match gefunden |
| 2508 | Ladegerät |  | الشَّارْجْ | شَارْجْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 2509 | ich habe mein Handy ans Ladegerät gelegt |  | حَطِّيت تَالِيفُونِي عَلَى الشَّارْجْ |  | Kein Match gefunden |
| 2510 | Sefsari (traditioneller weißer Überwurf) |  | سِفْسَارِي |  | Kein Match gefunden |
| 2511 | Houli (traditionelles Schultertuch) |  | حُولِي |  | Kein Match gefunden |
| 2512 | Malya (traditionelles Wickeltuch) |  | مَلْيَة |  | Kein Match gefunden |
| 2513 | Keswa (traditionelles Festkleid) |  | كِسْوَة |  | Kein Match gefunden |
| 2514 | normal / so ist das Leben (Ausdruck der Gelassenheit) |  | نُرْمَال |  | Kein Match gefunden |
| 2515 | Mut / Entschlossenheit / innere Stärke |  | قُلَيِّب |  | Kein Match gefunden |
| 2516 | Mango |  | مَانْقَا | مَانْقَا | Ansatz 1: Exakter Konsonanten-Match |
| 2517 | Kaki / Persimone |  | كْرِيمَة | كَرِيمَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 2518 | Kiwi |  | كِيوِي |  | Kein Match gefunden |
| 2519 | Guave |  | جْوَافَة |  | Kein Match gefunden |
| 2520 | Maulbeere / Beeren |  | تُوت | تُوتْ | Ansatz 1: Exakter Konsonanten-Match |
| 2521 | Quitte |  | سْفَرْجَل |  | Kein Match gefunden |
| 2522 | stur (wörtl. sein Kopf ist gerade) |  | رَاسُو صَحِيح |  | Kein Match gefunden |
| 2523 | unnachgiebig / beharrlich |  | مُكَبَّش |  | Kein Match gefunden |
| 2524 | entschlossen / zielstrebig |  | شَادّ صَحِيح |  | Kein Match gefunden |
| 2525 | ausdauernd / zäh (wörtl. mit seinem Herzen) |  | بِقَلْبُو |  | Kein Match gefunden |
| 2526 | Kampfgeist / tunesische Beharrlichkeit |  | غْرِنْتَا |  | Kein Match gefunden |
| 2527 | Bulgur |  | بُرْغُل |  | Kein Match gefunden |
| 2528 | aufgequollen / aufgegangen (z.B. Bulgur) |  | مْفَوَّر |  | Kein Match gefunden |
| 2529 | ich rieche einen sehr leckeren Duft |  | نْشِمّ فِي رِيحَة بْنِينَة بَرْشَة |  | Kein Match gefunden |
| 2530 | Was hast du uns heute gekocht? |  | شْنُوَّا طَيَّبْتِلْنَا اليُوم؟ |  | Kein Match gefunden |
| 2531 | ich koche aufgequollenen Bulgur |  | نُطَيِّب فِي بُرْغُل مْفَوَّر |  | Kein Match gefunden |
| 2532 | Hatten wir uns nicht auf 7 Uhr geeinigt? |  | مُوشْ تْفَاهَمْنَا السَّبْعَة؟ |  | Kein Match gefunden |
| 2533 | Hat sie vielleicht das Date vergessen? |  | زَعْمَة نْسِيتْ الرَّانْدِيفُو؟ |  | Kein Match gefunden |
| 2534 | Mein Fehler |  | مِشْ بِلْعَانِي |  | Kein Match gefunden |
| 2535 | Ich fühle mich niedergeschlagen |  | رُوحِي طَالْعَة |  | Kein Match gefunden |
| 2536 | niedergeschlagen / erschöpft |  | فَادِدْ |  | Kein Match gefunden |
| 2537 | Ich bin pleite / kein Geld |  | تَرِيتْ |  | Kein Match gefunden |
| 2538 | Ich bin pleite (Variante) |  | نِفْلِّي |  | Kein Match gefunden |
| 2539 | Gott weiß es besser |  | الله أَعْلَم |  | Kein Match gefunden |
| 2540 | Das ist teuer (Ausdruck) |  | نَارْ تِكْوِي |  | Kein Match gefunden |
| 2542 | Ich verstehe dich |  | حَاسْ بِيكْ |  | Kein Match gefunden |
| 2543 | total erschöpft / K.O. |  | مُبَيَّلْ |  | Kein Match gefunden |
| 2544 | sehr glücklich (umgangsspr.) |  | شَايِخْ |  | Kein Match gefunden |
| 2545 | sehr glücklich (Variante) |  | عَامِلْ كِيفْ |  | Kein Match gefunden |
| 2546 | Kinn |  | دَقْنُونَة |  | Kein Match gefunden |
| 2547 | Bart |  | لَحْيَة | لَحْيَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 2548 | Augenbrauen |  | حْوَاجِب |  | Kein Match gefunden |
| 2549 | Lippen |  | شْفَايِف | شْفَايِفْ | Ansatz 1: Exakter Konsonanten-Match |
| 2550 | Schnurrbart |  | شْلَاغِم | شلاغم | Ansatz 1: Exakter Konsonanten-Match |
| 2551 | Wangen |  | خُدُود |  | Kein Match gefunden |
| 2552 | Haar / Haare |  | شَعْر | شْعَرْ | Ansatz 1: Exakter Konsonanten-Match |
| 2553 | er hat ihm gezeigt wer Boss ist |  | وَرَّاهُ الْعِين الحَمْرَا |  | Kein Match gefunden |
| 2554 | eingebildet / arrogant |  | خَشْمُو فِي السَّمَا |  | Kein Match gefunden |
| 2555 | unreif / engstirnig |  | مُخُّو صْغِير |  | Kein Match gefunden |
| 2556 | er hat den Mund gehalten |  | سَكَّر فُمُّو |  | Kein Match gefunden |
| 2558 | Nicht rauchen! |  | مَا تِتْكَيَّفْش |  | Kein Match gefunden |
| 2559 | Nicht parken! |  | مَا تْقَارِيش |  | Kein Match gefunden |
| 2560 | Nicht überqueren! |  | مَا تِتْعَدَّاش |  | Kein Match gefunden |
| 2561 | Nicht abbiegen! |  | مَا تْدُورِش |  | Kein Match gefunden |
| 2562 | Hier nicht warten! |  | مَا تَاقِفْش هُونِي |  | Kein Match gefunden |
| 2563 | Kein Eingang! |  | مَا تُدْخُلْش |  | Kein Match gefunden |
| 2564 | Nicht rennen! |  | مَا تَجْرِيش |  | Kein Match gefunden |
| 2565 | Nicht essen! |  | مَا تَاكُلْش |  | Kein Match gefunden |
| 2566 | Nicht trinken! |  | مَا تُشْرُبْش |  | Kein Match gefunden |
| 2567 | Nicht reden! / Ruhe! |  | مَا تَحْكِيش |  | Kein Match gefunden |
| 2568 | Gut gemacht! / Du hast es richtig gemacht! |  | صَحِّيت |  | Kein Match gefunden |
| 2569 | Koch (Küchenchef, umgangsspr.) |  | كُوجِينِي | كُوجِينِي | Ansatz 1: Exakter Konsonanten-Match |
| 2570 | Klempner |  | بْلُمْبِيِي |  | Kein Match gefunden |
| 2571 | Bauer / Landwirt |  | فَلَّاح | فَلَّاحْ | Ansatz 1: Exakter Konsonanten-Match |
| 2572 | Schneider |  | خَيَّاط |  | Kein Match gefunden |
| 2573 | Maurer / Bauarbeiter |  | بَنَّاي | بَنَايْ | Ansatz 1: Exakter Konsonanten-Match |
| 2574 | Maler (Anstreicher) |  | دَهَّان |  | Kein Match gefunden |
| 2575 | Müllmann |  | زَبَّال |  | Kein Match gefunden |
| 2576 | Schuhmacher |  | صَبَّاطِي |  | Kein Match gefunden |
| 2577 | Glaser |  | بُلَّارْجِي |  | Kein Match gefunden |
| 2578 | Kiosk-Besitzer / Nuss-Röster |  | حَمَّاص |  | Kein Match gefunden |
| 2579 | Damenfriseur / Schönheitssalon |  | الحَجَّامَة | حْجَامَة | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 2580 | Kiosk für Samen und Süßigkeiten |  | الحَمَّاص |  | Kein Match gefunden |
| 2581 | Wo gehst du hin? (umgangsspr.) |  | زَعْمَة وِينْ مَاشِيَة؟ |  | Kein Match gefunden |
| 2582 | Salz |  | مِلْح |  | Kein Match gefunden |
| 2583 | Tunesischer Salat |  | سَلَاطَة تُونْسِيَّة |  | Kein Match gefunden |
| 2584 | Wir kommen gerade so durch / wir leben von Gottes Segen |  | عَايِشِين بِبَرْكَة رَبِّي |  | Kein Match gefunden |
| 2585 | Möge Gott Segen darauf herabsenden |  | رَبِّي يِنَزِّل فِيهُ البَرْكَة |  | Kein Match gefunden |
| 2586 | Das Geld ist weg / unerwartete Ausgaben haben alles aufgefressen |  | طَارِت البَرْكَة |  | Kein Match gefunden |
| 2587 | Genug! / Hör auf! (wörtl.: die Baraka reicht ihm) |  | يِزِّي فِيهُ البَرْكَة |  | Kein Match gefunden |
| 2589 | mit reiner Absicht / mit aufrichtigem Herzen |  | بِالنِّيَّة |  | Kein Match gefunden |
| 2590 | Geh mit reiner Absicht und schlaf mitten auf der Straße (wer gute Absichten hat hat nichts zu befürchten) |  | إِمْشِي بِالنِّيَّة، وَارْقُدْ فِي الثِّنِيَّة |  | Kein Match gefunden |
| 2591 | Hut (franz. Lehnwort) |  | شَابُو |  | Kein Match gefunden |
| 2592 | Schal |  | كَشْكُول | كَشْكُولْ | Ansatz 1: Exakter Konsonanten-Match |
| 2593 | Handschuhe |  | قْوَانْدُوَات |  | Kein Match gefunden |
| 2594 | ehrlich / von gutem Charakter (wörtl.: Kind des Ursprungs) |  | وَلَد أَصَل |  | Kein Match gefunden |
| 2596 | intelligent / aufgeweckt |  | نَابِه |  | Kein Match gefunden |
| 2597 | fleißig / arbeitsam |  | خَدَّام |  | Kein Match gefunden |
| 2598 | geduldig (wörtl.: langer Atem) |  | بَالُو طْوِيل |  | Kein Match gefunden |
| 2599 | loyal / treu |  | صِنْدِيد | صِنْدِيدْ | Ansatz 1: Exakter Konsonanten-Match |
| 2600 | stehend / steh! (Imperativ) |  | وَاقِف | وَاقِفْ | Ansatz 1: Exakter Konsonanten-Match |
| 2601 | Tauchen / Schnorcheln |  | غَطْسَة |  | Kein Match gefunden |
| 2602 | Strandliege / Liegestuhl |  | كُرْسِي بْحَر |  | Kein Match gefunden |
| 2603 | Fischerboot (tunesisch) |  | فْلُوكَة |  | Kein Match gefunden |
| 2604 | Handtuch / Strandtuch |  | فُوطَة |  | Kein Match gefunden |
| 2605 | Schwimmen (Nomen) |  | عُومَة |  | Kein Match gefunden |
| 2606 | Badeanzug / Badehose |  | مَايُو | مَايُو | Ansatz 1: Exakter Konsonanten-Match |
| 2607 | Schwimmring / Luftmatratze |  | شَامْبْرِيز |  | Kein Match gefunden |
| 2608 | Sonnenschirm (Strand) |  | پَارَاسُول |  | Kein Match gefunden |
| 2609 | er nervt / er belästigt |  | يَتْزَعَّب |  | Kein Match gefunden |
| 2610 | er nervte / er belästigte |  | تَزَعَّب |  | Kein Match gefunden |
| 2611 | er taucht auf / er schaut rein |  | يَطُلّ |  | Kein Match gefunden |
| 2612 | er tauchte auf / er schaute rein |  | طَلَّ |  | Kein Match gefunden |
| 2613 | Holz |  | خُشْب | خْشَبْ | Ansatz 1: Exakter Konsonanten-Match |
| 2614 | Handwerk / Gewerbe |  | صَنْعَة | صَنْعَة | Ansatz 1: Exakter Konsonanten-Match |
| 2615 | Handwerker / Kunsthandwerker |  | صُنَايْعِي | صْنَايْعِي | Ansatz 1: Exakter Konsonanten-Match |
| 2616 | Schneidebrett / Holzbrett |  | لَوْحَة | لَوْحَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 2617 | Mörser und Stößel |  | مِهْرَاس |  | Kein Match gefunden |
| 2618 | große Servierschüssel |  | قَصْعَة |  | Kein Match gefunden |
| 2619 | gesund / in Ordnung / stimmt |  | صَحِيح |  | Kein Match gefunden |
| 2620 | Kachel-Wandbild / Fliesenmural |  | جِدَارِيَّة |  | Kein Match gefunden |
| 2621 | Keramik / Töpferei |  | خَزَف |  | Kein Match gefunden |
| 2622 | Gebetsnische / Bogennische |  | مِحْرَاب | مِحْرَابْ | Ansatz 1: Exakter Konsonanten-Match |
| 2623 | Vase |  | زَهْرِيَّة |  | Kein Match gefunden |
| 2624 | traditionell (m.) |  | تَقْلِيدِي | تَقْلِيدِي | Ansatz 1: Exakter Konsonanten-Match |
| 2626 | geselliges Zusammensitzen / gemütliche Runde |  | قَعْدَة |  | Kein Match gefunden |
| 2627 | Farm / Landgut |  | سَانِيَة | سَانِيَة | Ansatz 1: Exakter Konsonanten-Match |
| 2628 | ich trinke gerade Kaffee |  | أَنَا قَاعِد نُشْرُب فِي قَهْوَة |  | Kein Match gefunden |
| 2629 | er sitzt unter einem Baum |  | قَاعِد تَحْت شُجْرَة |  | Kein Match gefunden |
| 2630 | er sitzt im Schatten eines Baumes |  | قَاعِد فِي ظُلّ شُجْرَة |  | Kein Match gefunden |
| 2631 | Wüstenrose |  | وَرْدَة الرَّمْل |  | Kein Match gefunden |
| 2632 | Sand |  | رَمْل | رْمَلْ | Ansatz 1: Exakter Konsonanten-Match |
| 2633 | Graben / Ausgrabung |  | حَفِير |  | Kein Match gefunden |
| 2634 | Waschen / Reinigung |  | غَسِيل | غَسِيلْ | Ansatz 1: Exakter Konsonanten-Match |
| 2635 | Trocknungsvorgang |  | تَشِييح |  | Kein Match gefunden |
| 2636 | Souvenir / Andenken |  | تَذْكَار |  | Kein Match gefunden |
| 2637 | Dekoration / Schmuck |  | زِينَة |  | Kein Match gefunden |
| 2638 | Krankenwagen / Notaufnahme |  | إِسْعَاف |  | Kein Match gefunden |
| 2640 | Schmerz |  | وَجِيعَة |  | Kein Match gefunden |
| 2641 | atmen |  | تِتْنَفَّس |  | Kein Match gefunden |
| 2642 | Allergie |  | حَسَاسِيَّة | حَسَاسِيَّة | Ansatz 1: Exakter Konsonanten-Match |
| 2643 | Apotheke (Darija) |  | فَارْمَاسِي |  | Kein Match gefunden |
| 2644 | unmöglich |  | مُسْتَحِيل |  | Kein Match gefunden |
| 2645 | Ich brauche einen Arzt (müssen, nötig sein) |  | يِلْزَمْنِي طْبِيب |  | Kein Match gefunden |
| 2646 | Ruf den Krankenwagen! |  | عَيِّط لِلإِسْعَاف! |  | Kein Match gefunden |
| 2647 | Ich bin krank |  | أَنَا مَرِيض |  | Kein Match gefunden |
| 2648 | Ich habe Fieber |  | عَنْدِي سُخَانَة |  | Kein Match gefunden |
| 2649 | Es tut hier weh |  | وَجِيعَة هُنَا |  | Kein Match gefunden |
| 2650 | Ich kann nicht atmen |  | مَا نَجَّمْش تِتْنَفَّس |  | Kein Match gefunden |
| 2651 | Ich bin allergisch dagegen |  | عَنْدِي حَسَاسِيَّة مِن هَذَا |  | Kein Match gefunden |
| 2652 | Wo ist die nächste Apotheke? |  | وِين أَقْرَب فَارْمَاسِي؟ |  | Kein Match gefunden |
| 2653 | Wo ist das Krankenhaus? |  | وِين السْبِيطَار؟ |  | Kein Match gefunden |
| 2655 | Wüste |  | صَحْرَا |  | Kein Match gefunden |
| 2656 | Sand (f.) |  | رَمْلَة |  | Kein Match gefunden |
| 2657 | Düne |  | عِرْق | عِرْقْ | Ansatz 1: Exakter Konsonanten-Match |
| 2658 | Oase |  | وَاحَة | وَاحَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 2659 | Zelt |  | خِيمَة | خِيمَة | Ansatz 1: Exakter Konsonanten-Match |
| 2660 | Lagerfeuer |  | عَافِيَة |  | Kein Match gefunden |
| 2661 | Fantastisch! / Wahnsinn! |  | يَهَبِّل |  | Kein Match gefunden |
| 2662 | Los geht's! / Komm! |  | هَيَّا |  | Kein Match gefunden |
| 2663 | Es ist unerträglich heiß! (Die Hitze tötet) |  | السُّخَانَة تَقْتُل |  | Kein Match gefunden |
| 2664 | sehr schön / sehr gut |  | يَاسِر بَاهِي |  | Kein Match gefunden |
| 2665 | Wüstenbrot (im Sand gebacken) |  | خُبْزَة المَلَّة |  | Kein Match gefunden |
| 2666 | Teig |  | عَجِين |  | Kein Match gefunden |
| 2667 | geklärte Butter (traditionell) |  | سَمْن عَرَبِي |  | Kein Match gefunden |
| 2668 | reserviert |  | مَحْجُوز |  | Kein Match gefunden |
| 2669 | Welches ist euer Haus? |  | أَنَاهِي دَارْكُم؟ |  | Kein Match gefunden |
| 2670 | Welches Telefon ist deins? |  | أَنَاهُو تِليفونِك؟ |  | Kein Match gefunden |
| 2671 | Welche sind deine Freunde? |  | أَنَاهُم صْحَابِك؟ |  | Kein Match gefunden |
| 2672 | Kürbis |  | قَرْع | قْرَعْ | Ansatz 1: Exakter Konsonanten-Match |
| 2673 | Zerkleinern / Schneiden (mit Schere) |  | تَقْطِيع |  | Kein Match gefunden |
| 2674 | Koriander und Kümmel (tunesische Gewürzmischung) |  | تَابَل وَكَرْوِيَّة |  | Kein Match gefunden |
| 2676 | Das ist Kafteji |  | هَذَا كَفْتَاجِي |  | Kein Match gefunden |
| 2677 | Wer alleine rechnet hat am Ende einen Rest übrig (wer ohne andere plant verrechnet sich) |  | اللِّي يَحْسِب وَحْدُو يِفْضَلُّو |  | Kein Match gefunden |
| 2678 | er rechnet / er plant |  | يَحْسِب |  | Kein Match gefunden |
| 2679 | alleine (er) |  | وَحْدُو | وَحْدُو | Ansatz 1: Exakter Konsonanten-Match |
| 2680 | es bleibt übrig / es hat einen Rest |  | يِفْضَلّ |  | Kein Match gefunden |
| 2681 | Pinienkerne |  | بُنْدُق |  | Kein Match gefunden |
| 2682 | Mandeln |  | لُوز | لُوزْ | Ansatz 1: Exakter Konsonanten-Match |
| 2683 | leichter Tee |  | تَايْ خَفِيف |  | Kein Match gefunden |
| 2684 | starker Tee |  | تَايْ قَوِي |  | Kein Match gefunden |
| 2685 | Einen Minztee bitte |  | وَاحِد تَايْ بِالنَّعْنَاع، عَيِّشِك |  | Kein Match gefunden |
| 2686 | Zwei Tees mit Pinienkernen |  | زُوز تَايْ بِالبُنْدُق |  | Kein Match gefunden |
| 2687 | eine Handvoll |  | كَمْشَة | كَمْشَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 2688 | winzige Prise / kleinstes Stück |  | نَتْشَة |  | Kein Match gefunden |
| 2689 | ganz kleine Menge |  | فْتِيتَة |  | Kein Match gefunden |
| 2690 | winziger Betrag (bes. Geld) |  | تَفْتُوفَة |  | Kein Match gefunden |
| 2691 | ein Schluck |  | جُغْمَة |  | Kein Match gefunden |
| 2692 | im Nu / in einem Augenblick |  | وَمْيَة |  | Kein Match gefunden |
| 2693 | Staubwolke |  | عْجَاجَة |  | Kein Match gefunden |
| 2694 | Dutzend (Zähleinheit) |  | طُزِّينَة | طُزِّينَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 2695 | Eierkarton / Tablett |  | بْلَاتُو | بْلَاتُو | Ansatz 1: Exakter Konsonanten-Match |
| 2696 | Ich habe zwei Bücher. |  | عَنْدِي زُوز كْتَب |  | Kein Match gefunden |
| 2697 | Gib mir einen Schluck Wasser. |  | هَاتِلِي جُغْمَة مَا |  | Kein Match gefunden |
| 2698 | Ich hatte nur ganz wenig Geld übrig vom Gehalt. |  | فَضَّلْت تَفْتُوفَة فْلُوس مِن الشَّهْرِيَّة |  | Kein Match gefunden |
| 2699 | Ich habe ganz wenig Zeit. |  | عَنْدِي فْتِيتَة وَقْت |  | Kein Match gefunden |
| 2700 | Grabe den Brunnen mit einer Nadel und verlange keine Axt von einem Geizigen. (Mit den Mitteln auskommen die man hat) |  | إِحْفِرْ البِيرْ بِإِبْرَة وَمَا تُطْلُبْ الفَاسْ مِن رْخِيص |  | Kein Match gefunden |
| 2701 | Brunnen |  | بِيرْ |  | Kein Match gefunden |
| 2702 | Axt |  | فَاسْ |  | Kein Match gefunden |
| 2703 | immer wieder / ständig |  | دِيمَا دِيمَا |  | Kein Match gefunden |
| 2704 | wie immer / wie gewohnt |  | كِلْعَادَة وَالعَوَايِد |  | Kein Match gefunden |
| 2705 | am Wochenende |  | فِي الوِيكَاند |  | Kein Match gefunden |
| 2706 | in den Ferien |  | فِي الفَاكُونْس |  | Kein Match gefunden |
| 2707 | in einem Rutsch / non-stop |  | فَرْد جُرَّة |  | Kein Match gefunden |
| 2708 | bis jetzt / bisher |  | لِتَّو |  | Kein Match gefunden |
| 2709 | Wie immer, er ist zu spät. |  | كِلْعَادَة وَالعَوَايِد، جَايْ مْحَرّ |  | Kein Match gefunden |
| 2710 | Ich rufe ihn von Zeit zu Zeit an. |  | سَاعَة سَاعَة نِكَلِّمُو |  | Kein Match gefunden |
| 2711 | Ich habe drei Prüfungen die ich in einem Rutsch absolvieren muss. |  | عِنْدِي ثَلَاثَة إِكْزَامَانَات بَاشْ نَعْدِيهُمْ فَرْد جُرَّة |  | Kein Match gefunden |
| 2712 | Bis jetzt ist alles gut. |  | لِتَّو كُلّ شَيْء مِزْيَان |  | Kein Match gefunden |
| 2713 | Hunger |  | جُوع | جَوَّعْ | Ansatz 1: Exakter Konsonanten-Match |
| 2714 | hungrig (m.) |  | جِيعَان | جِيعَانْ | Ansatz 1: Exakter Konsonanten-Match |
| 2715 | Böses / Elend / hier: extremer Hunger |  | شَرّ | شَرْ | Ansatz 1: Exakter Konsonanten-Match |
| 2716 | ich sterbe vor Hunger (wörtl.: ich sterbe an Bösem) |  | رَانِي مِيتْ بِالشَّرّ |  | Kein Match gefunden |
| 2717 | ich bin sehr hungrig |  | جِيعَان بَرْشَة |  | Kein Match gefunden |
| 2718 | der Hunger bringt mich um |  | قَتْلَنِي الشَّرّ |  | Kein Match gefunden |
| 2719 | ich bin kurz davor vor Hunger ohnmächtig zu werden |  | بَاشْ نَدُوخْ بِالجُوع |  | Kein Match gefunden |
| 2720 | reichhaltiges leckeres Essen genießen |  | التَّمَخْمِيخ |  | Kein Match gefunden |
| 2721 | Gang (Auto) |  | فِيتَاس |  | Kein Match gefunden |
| 2722 | Bremse |  | فْرَيْن |  | Kein Match gefunden |
| 2723 | Fensterscheibe (Auto) |  | بَلُّور |  | Kein Match gefunden |
| 2724 | schalte hoch / runter (Gang) |  | زِيد / نَقِّص الفِيتَاس |  | Kein Match gefunden |
| 2725 | bremsen / auf die Bremse treten |  | شَدّ فْرَيْن |  | Kein Match gefunden |
| 2726 | Blinker setzen |  | اِعْمَل سِيكْنَال |  | Kein Match gefunden |
| 2727 | AC einschalten |  | مَشِّي الكْلِيم |  | Kein Match gefunden |
| 2728 | fahr das Auto |  | سُوق الكَرْهْبَة |  | Kein Match gefunden |
| 2729 | stopp / halt an |  | حَبَّس / أَحْبَس |  | Kein Match gefunden |
| 2730 | biege rechts / links ab |  | دُور عَلَى اليَمِين / اليَسَار |  | Kein Match gefunden |
| 2731 | fahr vorwärts / geradeaus |  | إِمْشِي لِقُدَّام / طُول |  | Kein Match gefunden |
| 2732 | rückwärts fahren |  | وَخِّر لِتَّالِي |  | Kein Match gefunden |
| 2733 | Sicherheitsgurt anlegen |  | حُط السَّبْتَة |  | Kein Match gefunden |
| 2734 | vorne / hinten einsteigen |  | اِطْلَع مِن قُدَّام / مِن تَالِي |  | Kein Match gefunden |
| 2735 | Fensterscheibe runter / hoch |  | هَبَّط / طَلَّع البَلُّور |  | Kein Match gefunden |
| 2736 | fahr vorsichtig und besonnen |  | رُدّ بَالَك وَسُوق فِي عَقْلَك |  | Kein Match gefunden |
| 2737 | Was die Ameise in einem Jahr sammelt, frisst das Kamel in einem Bissen. (Langsame Mühe kann schnell zunichte gemacht werden) |  | اِلِّي تِلِمُّو النَّمَالَة فِي عَام، يَاكْلُو الجَمَل فِي فُم |  | Kein Match gefunden |
| 2738 | Ameise (Sg.) |  | نِمَّالَة | نِمَّالَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 2739 | Mund |  | فُم | فَمّْ | Ansatz 1: Exakter Konsonanten-Match |
| 2740 | Spinat |  | سَبْنَاخ |  | Kein Match gefunden |
| 2741 | Roter Kürbis |  | قَرْع أَحْمَر |  | Kein Match gefunden |
| 2742 | grüne Bohnen |  | لُوبِيَا خَضْرَا |  | Kein Match gefunden |
| 2743 | Kohl / Weißkohl |  | كْرُمْب | كْرُمْبْ | Ansatz 1: Exakter Konsonanten-Match |
| 2744 | Radieschen |  | فْجِل |  | Kein Match gefunden |
| 2746 | Dill |  | شَبْت |  | Kein Match gefunden |
| 2747 | Sellerie (Variante) |  | كْرَافِس |  | Kein Match gefunden |
| 2749 | laut / Störenfried (m.) |  | مَرَّاج |  | Kein Match gefunden |
| 2750 | ruhig (m.) |  | رَايِض |  | Kein Match gefunden |
| 2751 | freundlich (m.) |  | مُعَاشِرِي |  | Kein Match gefunden |
| 2752 | ehrlich (m.) |  | صَادِق |  | Kein Match gefunden |
| 2753 | faul (m.) |  | كَرْكَار |  | Kein Match gefunden |
| 2754 | schlaff / schwach (m.) |  | مَرْخُوف |  | Kein Match gefunden |
| 2755 | dünn / schlank (m.) |  | جْوَيِّد |  | Kein Match gefunden |
| 2756 | rundlich / fett (m.) |  | دَبْدُوب | دَبْدُوبْ | Ansatz 1: Exakter Konsonanten-Match |
| 2757 | schnell (m.) |  | مَزْرُوب |  | Kein Match gefunden |
| 2758 | langsam / besonnen (m.) |  | رْزِين |  | Kein Match gefunden |
| 2759 | schwer / langsam (m.) |  | ثْقِيل | ثْقِيلْ | Ansatz 1: Exakter Konsonanten-Match |
| 2760 | klug / schlau (m.) (Darija) |  | مْهَفّ | مْهَفّْ | Ansatz 1: Exakter Konsonanten-Match |
| 2761 | Gasherd |  | قَاز |  | Kein Match gefunden |
| 2762 | Backofen |  | فُورْنُو |  | Kein Match gefunden |
| 2763 | Pfanne (flach) |  | مَقْلَى | مُقْلِي | Ansatz G: Match nach Hamza-/Ta-Marbuta-Normalisierung |
| 2764 | Spüle |  | حَوْض | حُوضْ | Ansatz 1: Exakter Konsonanten-Match |
| 2765 | Hackblock (Fleisch) |  | قُرْضَة | قَرْضَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 2766 | Schnellkochtopf |  | الْكُوكُوت | كُوكُوتْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 2767 | Dorade / Brasse |  | وَرْقَة |  | Kein Match gefunden |
| 2768 | Wolfsbarsch |  | قَارُوص |  | Kein Match gefunden |
| 2769 | Makrele |  | شُورُو |  | Kein Match gefunden |
| 2770 | Rotbarbe |  | مُرْجَان | مُرْجَانْ | Ansatz 1: Exakter Konsonanten-Match |
| 2771 | Gestreifte Rotbarbe |  | تْرِيلْيَا |  | Kein Match gefunden |
| 2772 | Dentex / Zahnbrasse |  | دَنْدِيق |  | Kein Match gefunden |
| 2773 | Zackenbarsch |  | مَنَّانِي |  | Kein Match gefunden |
| 2774 | Meeräsche |  | بُورِي |  | Kein Match gefunden |
| 2775 | Kalmar |  | كَلَامَار |  | Kein Match gefunden |
| 2776 | Garnelen |  | كْرُوفَات |  | Kein Match gefunden |
| 2777 | Salema (Fischart) |  | شَلْبَة |  | Kein Match gefunden |
| 2778 | Bonito |  | بَالَامِيط |  | Kein Match gefunden |
| 2779 | Bernsteinmakrele |  | غْزَال |  | Kein Match gefunden |
| 2780 | Ringbrasse |  | صْبَارْص |  | Kein Match gefunden |
| 2781 | Seehecht |  | نَازَلِّي |  | Kein Match gefunden |
| 2782 | Kabeljau / Stockfisch |  | بَاكَالَا |  | Kein Match gefunden |
| 2783 | Ach, ich habe den Bus verpasst! |  | آهْ فَاتِتْنِي الكَار |  | Kein Match gefunden |
| 2784 | Schade, ich habe den Bus verpasst! |  | حُسَارَة مَا خْلَطْتِش عَلَى الكَار |  | Kein Match gefunden |
| 2785 | Und wie soll ich jetzt nach Hause kommen? |  | بَرَّا عَاد كِيفَاش نِرْوَاح تَوَّا؟ |  | Kein Match gefunden |
| 2786 | Ich habe keine Zeit mehr / Ich bin zu spät |  | مَا عَادِيش عْلِيَّا وَقْت |  | Kein Match gefunden |
| 2787 | Warte auf den nächsten Bus |  | إِسْتَنَّى الكَار الجَايَة |  | Kein Match gefunden |
| 2788 | Ich muss rennen |  | يِلْزَمْنِي نِجْرِي |  | Kein Match gefunden |
| 2789 | meins / mein (Besitzpartikel) |  | مُتَاعِي |  | Kein Match gefunden |
| 2790 | deins / dein (Besitzpartikel) |  | مُتَاعِك |  | Kein Match gefunden |
| 2791 | eures / euer (Besitzpartikel Pl.) |  | مُتَاعْكُم |  | Kein Match gefunden |
| 2792 | unseres / unser (Besitzpartikel) |  | مُتَاعْنَا |  | Kein Match gefunden |
| 2793 | ihres / ihr (Besitzpartikel Pl.) |  | مُتَاعْهُم |  | Kein Match gefunden |
| 2794 | ich wünschte / ich würde gerne / am liebsten |  | مَاذَابِيَّا |  | Kein Match gefunden |
| 2795 | Ich würde gerne ans Meer gehen |  | مَاذَابِيَّا نِمْشِي لِلْبَحْر |  | Kein Match gefunden |
| 2796 | ich will mehr schlafen |  | نْزِيد نُرْقُد أَكْثَر |  | Kein Match gefunden |
| 2797 | Warte kurz / einen Moment |  | أُصْبِر شْوَيَّة |  | Kein Match gefunden |
| 2798 | Warte einen Augenblick |  | إِسْتَنَّى لَحْظَة |  | Kein Match gefunden |
| 2799 | Nur eine Minute |  | دَقِيقَة بَرْكَة |  | Kein Match gefunden |
| 2800 | Gleich bin ich bei dir / einen Moment |  | لَحْظَة هَانِي جِيتَك |  | Kein Match gefunden |
| 2801 | Gib mir etwas Zeit |  | أَعْطِينِي شْوَيَّة وَقْت |  | Kein Match gefunden |
| 2802 | Es ist zu spät |  | فَات الفُوت |  | Kein Match gefunden |
| 2803 | sehr spät |  | مُخِّر بَرْشَا |  | Kein Match gefunden |
| 2804 | Die Zeit ist gekommen / es ist soweit |  | وَقَّيِت |  | Kein Match gefunden |
| 2805 | Die Zeit ist vergangen / es ist vorbei |  | فَات الوَقْت |  | Kein Match gefunden |
| 2806 | Nimm dir Zeit / lass dir Zeit |  | خُوذ وَقْتَك |  | Kein Match gefunden |
| 2807 | Langsam / entspann dich |  | فِي عَقْلَك |  | Kein Match gefunden |
| 2808 | Hetz dich nicht |  | مَا تِزْرِبِش رُوحَك |  | Kein Match gefunden |
| 2809 | gewöhnt an / ich bin es gewohnt |  | مِسْتَانِس بِـ |  | Kein Match gefunden |
| 2810 | Hör auf mit dem Unsinn! / Schluss mit den Ausreden! |  | يِزِّي مَالرْوَيِّق |  | Kein Match gefunden |
| 2811 | Unsinn / Ausreden / Blödsinn |  | رْوَيِّق |  | Kein Match gefunden |
| 2812 | Outfit / Kleidungsstück |  | لَبْسَة |  | Kein Match gefunden |
| 2813 | trendy / angesagt |  | ضَارِبَة |  | Kein Match gefunden |
| 2814 | Lügner / unzuverlässig (Darija) |  | كَذَّاب |  | Kein Match gefunden |
| 2815 | toxisch / schlecht erzogen (Person) |  | وَلَد مَتْرَبِّي |  | Kein Match gefunden |
| 2816 | nicht toxisch / gut erzogen |  | مُوش مَتْرَبِّي |  | Kein Match gefunden |
| 2817 | an der Seite / seitlich |  | عَلْ الجَنْب |  | Kein Match gefunden |
| 2818 | an der Ecke / an der Kreuzung |  | فِالشّوكَة |  | Kein Match gefunden |
| 2819 | in der Mitte |  | فِالوَسْط |  | Kein Match gefunden |
| 2820 | Guten Morgen mit Datteln und Milch, möge Gott euren Tag gesegnet und glücklich machen |  | صْبَاحْكُم دِقْلَة وَحْلِيب، وَرَبِّي يَجْعَل نْهَارْكُم مَبْرُوك وَسْعِيد |  | Kein Match gefunden |
| 2821 | überquere die Straße |  | شُقَّ الكَيَّاس |  | Kein Match gefunden |
| 2822 | er ging vorbei / er passierte |  | تَعَدَّى |  | Kein Match gefunden |
| 2823 | überquere den Kreisverkehr |  | تَعَدَّى الرُّون بَوَان |  | Kein Match gefunden |
| 2824 | geh rein in (eine Straße/Gasse) |  | أَدْخُل فِي |  | Kein Match gefunden |
| 2825 | geh raus aus |  | أُخْرُج مِن |  | Kein Match gefunden |
| 2826 | lass hinter dir / pass an … vorbei |  | خَلِّي |  | Kein Match gefunden |
| 2827 | er ging runter / er stieg ab |  | طَيَّح |  | Kein Match gefunden |
| 2828 | nimm / biege in … (Wegbeschreibung) |  | حُوذ |  | Kein Match gefunden |
| 2829 | halte dich rechts |  | شِدَّ اليَمِين |  | Kein Match gefunden |
| 2830 | halte dich links |  | شِدَّ اليَسَار |  | Kein Match gefunden |
| 2831 | geh geradeaus, dann geh in die Gasse |  | إِمْشِي طُول مَبْعَد أَدْخُل الزَّنْقَة |  | Kein Match gefunden |
| 2832 | geh die Treppe hoch |  | أَطْلَع الدُّرُوج لِفُوق |  | Kein Match gefunden |
| 2833 | geh die Treppe runter |  | أَهْبَط الدُّرُوج |  | Kein Match gefunden |
| 2834 | am Ende der Straße |  | فِي آخِر النَّهْج |  | Kein Match gefunden |
| 2835 | auf deiner rechten Seite |  | عَل يَدِّك اليَمِين |  | Kein Match gefunden |
| 2836 | auf deiner linken Seite |  | عَل يَدِّك اليَسَار |  | Kein Match gefunden |
| 2837 | direkt neben dem... |  | لَاصِق فِي الـ... |  | Kein Match gefunden |
| 2838 | Teufelskreis / vertracktes Problem (wörtl. verwickeltes Ding) |  | مَعْبُوكَة |  | Kein Match gefunden |
| 2839 | er wusch ab / spülte |  | غَسَّل |  | Kein Match gefunden |
| 2840 | er schälte |  | قَشَّر |  | Kein Match gefunden |
| 2841 | er zerbrach / zerkleinerte |  | كَسَّر |  | Kein Match gefunden |
| 2842 | er rieb / raspelte |  | بَرَّش |  | Kein Match gefunden |
| 2843 | er presste aus / quetschte |  | عَصَّر |  | Kein Match gefunden |
| 2844 | er schlug schaumig / rührte mit Schneebesen |  | رَكَّض |  | Kein Match gefunden |
| 2845 | er knetete |  | عَجَن |  | Kein Match gefunden |
| 2846 | er rührte um |  | حَرَّك | حَرِّكْ | Ansatz 1: Exakter Konsonanten-Match |
| 2847 | er wäscht ab / spült |  | يَغَسِّل |  | Kein Match gefunden |
| 2848 | er schält |  | يَقَشِّر |  | Kein Match gefunden |
| 2849 | er zerbricht / zerkleinert |  | يَكَسِّر |  | Kein Match gefunden |
| 2850 | er reibt / raspelt |  | يَبَرِّش |  | Kein Match gefunden |
| 2851 | er presst aus / quetscht |  | يَعَصِّر |  | Kein Match gefunden |
| 2852 | er schlägt schaumig / rührt mit Schneebesen |  | يَرَكِّض |  | Kein Match gefunden |
| 2853 | er knetet |  | يَعْجَن |  | Kein Match gefunden |
| 2854 | er rührt um |  | يَحَرِّك |  | Kein Match gefunden |
| 2855 | Kakerlake (frz.) |  | فَرْلُو |  | Kein Match gefunden |
| 2856 | Schmetterling |  | فَرْطَطُو | فَرْطَطُّو | Ansatz 1: Exakter Konsonanten-Match |
| 2857 | Marienkäfer (wörtl. Mutter Sissi) |  | أُمِّي سِيسِي |  | Kein Match gefunden |
| 2858 | Spinne |  | رُتِّيلَة | رُتِّيلَة | Ansatz 1: Exakter Konsonanten-Match |
| 2859 | Schnecke |  | بَبُّوش | ببّوش | Ansatz 1: Exakter Konsonanten-Match |
| 2860 | Mücke |  | نَامُوسَة |  | Kein Match gefunden |
| 2861 | Fliege |  | ذِبَّانَة |  | Kein Match gefunden |
| 2862 | Ameisen (Pl.) |  | نِمَّالْ | نِمَّالْ | Ansatz 1: Exakter Konsonanten-Match |
| 2863 | Biene |  | نَحْلَة | نَحْلَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 2864 | Wespe |  | فَرْزَزُّو |  | Kein Match gefunden |
| 2865 | Ohrwurm (wörtl. Meister der Schere) |  | بُومْقَص |  | Kein Match gefunden |
| 2866 | Tausendfüßer (wörtl. Mutter der Vierundvierzig) |  | أُمّ أَرْبَعَة وَأَرْبَعِين |  | Kein Match gefunden |
| 2867 | Bettwanze |  | بَق |  | Kein Match gefunden |
| 2868 | Läuse |  | قَمَل |  | Kein Match gefunden |
| 2869 | Zecke |  | قُرَاد |  | Kein Match gefunden |
| 2871 | Guten Morgen! (informell, Kurzform von صباح الخير) |  | ضْبَاخِير |  | Kein Match gefunden |
| 2872 | Morgen der Rosen (Antwort auf Guten Morgen) |  | صْبَاح الوَرْد |  | Kein Match gefunden |
| 2873 | Morgen des Jasmins (Antwort auf Guten Morgen) |  | صْبَاح الفُلّ |  | Kein Match gefunden |
| 2874 | schnell / sofort |  | فِيسَع |  | Kein Match gefunden |
| 2875 | langsam / sachte |  | بِشْوَيَّا |  | Kein Match gefunden |
| 2876 | in Ordnung / erledigt / alles paletti |  | مْرَيَّق |  | Kein Match gefunden |
| 2877 | durcheinander / verpfuscht / chaotisch |  | مْبَلْبَز |  | Kein Match gefunden |
| 2878 | Spaß haben / gute Stimmung machen |  | عَامِل جَوّ |  | Kein Match gefunden |
| 2879 | gelangweilt / genervt (Adj.) |  | فَاد |  | Kein Match gefunden |
| 2880 | such! / durchsuche (Imperativ) |  | لَوِّج |  | Kein Match gefunden |
| 2883 | fade / geschmacklos / langweilig (m.) |  | مَاسِط |  | Kein Match gefunden |
| 2885 | nass |  | مَبْلُول | مَبْلُولْ | Ansatz 1: Exakter Konsonanten-Match |
| 2886 | hässlich / unheilvoll |  | مَشْوُوم |  | Kein Match gefunden |
| 2887 | rücksichtsloses Reinplatzen / chaotische Einmischung ohne Ahnung |  | فِرَنْدْزِي |  | Kein Match gefunden |
| 2888 | er platzte rücksichtslos rein (wörtl. er kam frendzi-mäßig rein) |  | دْخَل فِينَا فِرَنْدْزِي |  | Kein Match gefunden |
| 2889 | Tomatensauce |  | صَالْصَة |  | Kein Match gefunden |
| 2890 | mega scharf / brennend scharf |  | مُحَرْحَرَة |  | Kein Match gefunden |
| 2891 | eingedickte reduzierte Sauce |  | صَالْصَة عَاقِدَة مُشَخَّرَة بِالصُّوص |  | Kein Match gefunden |
| 2892 | Nudelsuppe (wörtl. laufende Pasta) |  | مَقْرُونَة جَارِيَة |  | Kein Match gefunden |
| 2893 | so scharf dass es brennt! (Ausruf) |  | حَارَّة تِشْوِي |  | Kein Match gefunden |
| 2894 | gib mir noch ein bisschen (beim Essen) |  | زِيدْنِي شْوَيَّا |  | Kein Match gefunden |
| 2895 | heißer Kaffee |  | قَهْوَة سْخُونَة |  | Kein Match gefunden |
| 2896 | das Wetter ist heiß |  | الطَّقْس سْخُون |  | Kein Match gefunden |
| 2897 | das Essen ist kochend heiß und wahnsinnig scharf |  | الْمَاكْلَة سْخُونَة تَغْلِي وَمُحَرْحَرَة تِشْوِي |  | Kein Match gefunden |
| 2898 | Wo gehst du hin? |  | وِينْ مَاشِي؟ |  | Kein Match gefunden |
| 2899 | Lass uns essen gehen! |  | هَيَّا نِمْشِيوْ نَاكْلُو |  | Kein Match gefunden |
| 2900 | Heute ist ein schöner Tag |  | الْيُومْ نْهَار مِزْيَان |  | Kein Match gefunden |
| 2901 | Ich habe eine Frage |  | عَنْدِي سُؤَال |  | Kein Match gefunden |
| 2902 | Kannst du das wiederholen? |  | تَنَجَّم تَعَاوُد؟ |  | Kein Match gefunden |
| 2903 | Gute Reise (wörtl. Weg der Sicherheit) |  | طَرِيق السَّلَامَة |  | Kein Match gefunden |
| 2904 | von vor langer Zeit / uralt (wörtl.: seit dem Jahr Kakah) |  | مِنْ عَامْ كَكَحْ |  | Kein Match gefunden |
| 2905 | Kehrschaufel |  | بَالاَ |  | Kein Match gefunden |
| 2906 | Besen |  | مَقَشَّة |  | Kein Match gefunden |
| 2907 | Wischmopp |  | خِيشَة |  | Kein Match gefunden |
| 2908 | Eimer |  | سَطْل |  | Kein Match gefunden |
| 2909 | Seife |  | صَابُون | صَابُونْ | Ansatz 1: Exakter Konsonanten-Match |
| 2910 | Handtuch |  | مَنْشَفَة | مَنْشَفَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 2911 | Bürste |  | شِيتَة |  | Kein Match gefunden |
| 2912 | Gummiwischer / Wischblatt |  | حَكَّاكَة | حَكَّاكَة | Ansatz 1: Exakter Konsonanten-Match |
| 2914 | um (Uhrzeit) |  | مَعْ |  | Kein Match gefunden |
| 2915 | Wann gehst du? |  | وَقْتَاش تِمْشِي؟ |  | Kein Match gefunden |
| 2916 | Wann schläfst du? |  | وَقْتَاش تُرْقُد؟ |  | Kein Match gefunden |
| 2917 | Wann stehst du auf? |  | وَقْتَاش تَقُوم؟ |  | Kein Match gefunden |
| 2918 | Wann frühstückst du? |  | وَقْتَاش تُفْطُر الصْبَاح؟ |  | Kein Match gefunden |
| 2919 | Wann gehst du zur Schule? |  | وَقْتَاش تِمْشِي لِلْمَكْتَب؟ |  | Kein Match gefunden |
| 2920 | Wann gehst du raus / weg? |  | وَقْتَاش تُخْرُج؟ |  | Kein Match gefunden |
| 2921 | gar / gekocht (m.) |  | طَايِب |  | Kein Match gefunden |
| 2922 | roh (m.) |  | نَيّ |  | Kein Match gefunden |
| 2923 | altbacken / abgestanden (m.) |  | بَايِت |  | Kein Match gefunden |
| 2924 | wohlhabend / gut gestellt (m.) |  | مُرَفَّه |  | Kein Match gefunden |
| 2925 | arm / mittellos (m.) |  | زَوَّالِي |  | Kein Match gefunden |
| 2926 | schlau / clever (m.) |  | قَافِز |  | Kein Match gefunden |
| 2927 | naiv / einfältig (m.) |  | بُوهَالِي |  | Kein Match gefunden |
| 2928 | wie der Herr so das Pferd / gleiche Federn (wörtl.: wie der Herr so sein Pferd) |  | كِيفْ سِيدِي كِيفْ جْوَادُو |  | Kein Match gefunden |
| 2929 | pass auf dich auf, Gott sieht alles (wörtl.: deine Augen sind in deinem Kopf, Gott ist Zeuge über dich) |  | عِينِيكْ فِيكْ، شَاهِدْ الله عْلِيكْ |  | Kein Match gefunden |
| 2930 | Darf ich das Telefon benutzen? |  | نُجَّم نِسْتَعْمِل التِّلِيفُون؟ |  | Kein Match gefunden |
| 2931 | Das ist meine Adresse |  | هَذَا عُنْوَانِي |  | Kein Match gefunden |
| 2932 | Was empfiehlst du mir? |  | بَاشْ تِنْصَحْنِي؟ |  | Kein Match gefunden |
| 2933 | Ich möchte bestellen |  | نُحِبّ نْعَدِّي كُومُونْد |  | Kein Match gefunden |
| 2934 | Bist du sicher? |  | مِتْأَكِّد / مِثَبَّت؟ |  | Kein Match gefunden |
| 2935 | Eine gute Idee |  | فِكْرَة بَاهِيَة |  | Kein Match gefunden |
| 2936 | Überhaupt kein Problem |  | مَا ثَمَّا حَتَّى مُشْكِل |  | Kein Match gefunden |
| 2937 | Adresse (MSA) |  | عُنْوَان | عُنْوَانْ | Ansatz 1: Exakter Konsonanten-Match |
| 2938 | ich esse zu Mittag |  | نِتْغَدَّى |  | Kein Match gefunden |
| 2939 | Sprich jetzt! |  | تْكَلَّم تَوَّا |  | Kein Match gefunden |
| 2940 | Iss hier! |  | كُول هْنَا |  | Kein Match gefunden |
| 2941 | Komm später! |  | إِيجَا مْبَعْد |  | Kein Match gefunden |
| 2942 | Schau dort! |  | أُخْزُر غَادِي |  | Kein Match gefunden |
| 2943 | genau dann / zu dem Zeitpunkt |  | وَقْتْهَا |  | Kein Match gefunden |
| 2944 | nie wieder / nicht mehr |  | لَا عَاد |  | Kein Match gefunden |
| 2945 | Fricassée (tunesisches gebratenes Sandwich) |  | فْرِيكَاسِي |  | Kein Match gefunden |
| 2946 | gekocht / hart (Ei oder Kartoffel) |  | مَضْمُوط |  | Kein Match gefunden |
| 2947 | Nimm es oder lass es / das war's (wörtl.: wenn es dir gefallen hat) |  | كَانْ عَجْبَكْ |  | Kein Match gefunden |
| 2948 | Wenn's dir nicht passt, trink Meerwasser! (wörtl.: wenn es dir nicht gefiel, trink Meerwasser) |  | كَانْ مَا عَجْبِكْشْ، أَشْرُبْ مِنْ مَاءِ الْبَحَرْ! |  | Kein Match gefunden |
| 2950 | er gab (mir) |  | عْطَانِي |  | Kein Match gefunden |
| 2951 | sie gab (mir) |  | عْطَاتْنِي |  | Kein Match gefunden |
| 2952 | sie gaben (mir) |  | عْطَاوْنِي |  | Kein Match gefunden |
| 2953 | wir gaben |  | عْطِينَا |  | Kein Match gefunden |
| 2954 | ihr gabt |  | عْطِيتُو |  | Kein Match gefunden |
| 2955 | ich gebe |  | نَعْطِي |  | Kein Match gefunden |
| 2956 | er gibt |  | يَعْطِي |  | Kein Match gefunden |
| 2957 | du gibst / sie gibt |  | تَعْطِي |  | Kein Match gefunden |
| 2958 | sie geben |  | يَعْطُو |  | Kein Match gefunden |
| 2959 | wir geben |  | نَعْطُو |  | Kein Match gefunden |
| 2960 | ihr gebt |  | تَعْطُو |  | Kein Match gefunden |
| 2961 | Motorrad |  | مُوتُور | موتور | Ansatz 1: Exakter Konsonanten-Match |
| 2962 | total entspannt / sich wohlfühlen / chilling |  | مِشْتَكُوزِي |  | Kein Match gefunden |
| 2963 | Schrott / Sperrmüll |  | خُرْدَة | خُرْدَة | Ansatz 1: Exakter Konsonanten-Match |
| 2964 | Müll / Abfall |  | زِبْلَة |  | Kein Match gefunden |
| 2965 | Reste / Abfall (allg.) |  | فَضْلَة | فَضْلَة | Ansatz 1: Exakter Konsonanten-Match |
| 2966 | Mülltonne / Abfalleimer (frz.) |  | بُوبَالْ |  | Kein Match gefunden |
| 2967 | Müllsack (frz.) |  | سَاشَا پُوبَالْ |  | Kein Match gefunden |
| 2968 | wegwerfen |  | طَيَّش |  | Kein Match gefunden |
| 2970 | Hündin |  | كَلْبَة |  | Kein Match gefunden |
| 2971 | Hunde (Pl.) |  | كِلَاب |  | Kein Match gefunden |
| 2974 | er biss |  | عَضَّ |  | Kein Match gefunden |
| 2975 | er beißt |  | يَعَضّ |  | Kein Match gefunden |
| 2976 | Impfung / Impfstoff |  | تَلْقِيح | تَلْقِيحْ | Ansatz 1: Exakter Konsonanten-Match |
| 2977 | Tierarztpraxis / Tierklinik |  | سْبِيطَار بَيْطَري |  | Kein Match gefunden |
| 2978 | voll im Moment sein / Spaß haben / den Moment genießen |  | شَايِخ |  | Kein Match gefunden |
| 2980 | Wow was für eine tolle Stimmung bei euch! |  | يَا حَلِيلِي مَلَّا جَو عَلِيكُمْ! |  | Kein Match gefunden |
| 2982 | Ich habe mich verirrt / ich bin verloren (m.) |  | أَنَا ضَايِع |  | Kein Match gefunden |
| 2983 | Ich habe mich verirrt (f.) |  | أَنَا ضَايْعَة |  | Kein Match gefunden |
| 2984 | Fahr langsam / Pass auf dich auf |  | سَايِسْ رُوحِكْ |  | Kein Match gefunden |
| 2985 | Ich brauche einen Arzt (brauchen, pers.) |  | حَاشْتِي بِطَبِيب |  | Kein Match gefunden |
| 2990 | Ich bin müde (m.) |  | أَنَا تَاعِبْ |  | Kein Match gefunden |
| 2991 | Sprich lauter |  | كَلَّمْ بِالقُوِّي |  | Kein Match gefunden |
| 2992 | Lächeln |  | تَبْسِيمَة |  | Kein Match gefunden |
| 2994 | Wie schön dein Lachen ist |  | مَحْلَا ضَحْكَتِكْ |  | Kein Match gefunden |
| 2995 | Wie schön deine Worte sind / wie schön ist deine Stimme / ich mag wie du redest |  | مَحْلَا كَلَامِكْ |  | Kein Match gefunden |
| 2996 | wie schön! / wie toll! (Ausruf) |  | مَحْلَا |  | Kein Match gefunden |
| 2999 | fahr langsam / pass auf beim Fahren |  | سَايِس رُوحِك |  | Kein Match gefunden |
| 3001 | ja, bitte |  | إِيه، عَيِّشِك |  | Kein Match gefunden |
| 3002 | nein danke |  | لَا عَيِّشِك |  | Kein Match gefunden |
| 3003 | das ist schwierig |  | هَذَا صَعِيب |  | Kein Match gefunden |
| 3004 | das ist einfach |  | هَذَا سَاهِل |  | Kein Match gefunden |
| 3007 | OMG, ich liebe dich so sehr! (wörtl.: ya h...., wie sehr ich dich liebe!) |  | يَا حَلِيلِي ، قَدَّاشْ نِحَبِّكْ! |  | Kein Match gefunden |
| 3009 | verknallt in dich / verrückt nach dir (wörtl.: von dir getroffen) |  | مَضْرُوب فِيكْ |  | Kein Match gefunden |
| 3010 | wie schön ist dein Lächeln / ich mag dein Lächeln |  | مَحْلَا تَبْسِيمْتِك |  | Kein Match gefunden |
| 3011 | wie schön ist dein Lachen / ich mag dein Lachen |  | مَحْلَا ضَحْكَتِك |  | Kein Match gefunden |
| 3013 | Komm mit mir zum Laden |  | إِمْشِي مُعَايَا لِلْحَانُوت |  | Kein Match gefunden |
| 3014 | Komm mit mir zum Markt |  | إِمْشِي مُعَايَا لِلسُّوق |  | Kein Match gefunden |
| 3015 | Glückspilz / immer Glück habend (wörtl.: voller Glück) |  | مِزْهَار |  | Kein Match gefunden |
| 3016 | Tante (respektvolle Anrede, auch für ältere Frauen) |  | تَاتَا |  | Kein Match gefunden |
| 3017 | Tante (informell) |  | نَّنَا |  | Kein Match gefunden |
| 3018 | mein Schwager (Bruder des Ehemanns) |  | سِلْفِي |  | Kein Match gefunden |
| 3019 | meine Schwägerin (Frau des Schwagers) |  | سِلْفْتِي |  | Kein Match gefunden |
| 3020 | kümmere dich um deine eigenen Angelegenheiten (wörtl.: beschäftige dich mit deinen Sorgen) |  | تَلْهَا فِي هَمِّك |  | Kein Match gefunden |
| 3021 | halt dich da raus / das geht dich nichts an (wörtl.: geh raus aus der Geschichte) |  | أُخْرُج مَالحْكَايَة |  | Kein Match gefunden |
| 3022 | Mlawi (tunesisches Schichtfladenbrot) |  | مْلَاوِي |  | Kein Match gefunden |
| 3023 | lecker / köstlich (m.) |  | بَنِّين | بْنِينْ | Ansatz 1: Exakter Konsonanten-Match |
| 3024 | würzig / scharf / aromatisch |  | فَاوِح |  | Kein Match gefunden |
| 3025 | ich esse gerne warmen Mlawi |  | نِحَبّ نَاكِل مْلَاوِي سْخُونَة |  | Kein Match gefunden |
| 3026 | Mlawi mit Thunfisch und Harissa ist unglaublich lecker (wörtl.: macht verrückt) |  | مْلَاوِي بِالتُّنّ وَالهَرِيسَة تَهَبَّل |  | Kein Match gefunden |
| 3027 | er wurde satt |  | شَبَع |  | Kein Match gefunden |
| 3028 | er wird satt / er sättigt sich |  | يِشْبَع |  | Kein Match gefunden |
| 3029 | Ich gehe schlafen |  | مَاشِي نُرْقُد |  | Kein Match gefunden |
| 3030 | Ich schlafe früh |  | نُرْقُد بَكْرِي |  | Kein Match gefunden |
| 3031 | Ich mache das Licht aus |  | نِطْفِي الضَّوْ |  | Kein Match gefunden |
| 3032 | Ich liege auf dem Bett |  | مَلْطُوحْ عَالْفَرْشْ |  | Kein Match gefunden |
| 3033 | Ich schließe meine Augen |  | نُغَمِّض عِيْنَيَّا |  | Kein Match gefunden |
| 3034 | Ich decke mich zu |  | نِتْغَطَّى |  | Kein Match gefunden |
| 3035 | Ich erhole mich im Bett |  | نِرْتَاحْ فَالْفَرْشْ |  | Kein Match gefunden |
| 3036 | schläfrig (wörtl.: schwindelig vom Schlaf) |  | دَايِخْ بِالنُّوم |  | Kein Match gefunden |
| 3037 | Ich habe einen schönen Traum |  | نَحْلِم حَلْمَة بَاهِيَّة |  | Kein Match gefunden |
| 3038 | Ich wache nachts auf |  | نْقُوم فَالليْل |  | Kein Match gefunden |
| 3039 | Ich schlafe wieder ein |  | نِرْجَع نُرْقُد |  | Kein Match gefunden |
| 3040 | Ich schlafe gut |  | نُرْقُد مْلِيحْ |  | Kein Match gefunden |
| 3041 | Ich stehe früh auf |  | نْقُوم بَكْرِي |  | Kein Match gefunden |
| 3042 | Ich gähne viel |  | نِتْثَاوَب بَرْشَة |  | Kein Match gefunden |
| 3043 | Ich liebe den Schlaf (wörtl.: Ich sterbe auf den Schlaf) |  | نُمُوت عَالنُّوم |  | Kein Match gefunden |
| 3044 | Beeil dich! |  | إِزْرِبْ رُوحِكْ |  | Kein Match gefunden |
| 3045 | Zeig mir! |  | وَرِّيني |  | Kein Match gefunden |
| 3047 | Hör mir zu! |  | إِسْمَعْني | أسْمَعْنِي | Ansatz G: Match nach Hamza-/Ta-Marbuta-Normalisierung |
| 3049 | Warte auf mich! |  | إِسْتَنَّاني |  | Kein Match gefunden |
| 3050 | Sag mir! |  | قُلِّي |  | Kein Match gefunden |
| 3051 | Komm mit mir! |  | إِمْشِي مَعَايَا |  | Kein Match gefunden |
| 3052 | Sei still! |  | أُسْكُتْ |  | Kein Match gefunden |
| 3053 | gefüllte Innereien (tunesisches Gericht) |  | عُضْبَان |  | Kein Match gefunden |
| 3054 | Innereien / Kuttelfleck |  | الدُّوَارَة |  | Kein Match gefunden |
| 3056 | er sättigt / sättigend |  | يِشَبَّع |  | Kein Match gefunden |
| 3057 | heilige Festtage / religiöse Feiertagszeit |  | عَوَاشِر |  | Kein Match gefunden |
| 3058 | die Dschebba (traditionelles tunesisches Gewand) |  | الجُبَّة | جِبَّة | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 3059 | er hustet |  | يُكُحّ |  | Kein Match gefunden |
| 3060 | er schwitzt |  | يَعْرَقْ |  | Kein Match gefunden |
| 3061 | er zittert |  | يُرْعِشْ |  | Kein Match gefunden |
| 3062 | er hat Schmerzen |  | يِتْوَجَّعْ |  | Kein Match gefunden |
| 3063 | er wird gesund / er genest |  | يِبْرَا |  | Kein Match gefunden |
| 3064 | scharf (Klinge, f.) |  | مَاضِيَة |  | Kein Match gefunden |
| 3065 | stumpf (f.) |  | حَافِيَة |  | Kein Match gefunden |
| 3066 | rostig (f.) |  | مُصَدِّيَة |  | Kein Match gefunden |
| 3067 | ausgekerbt / gezackt (f.) |  | مُثَلَّمَة |  | Kein Match gefunden |
| 3068 | schwer / gewichtig (f.) |  | رَزِينَة |  | Kein Match gefunden |
| 3069 | dünn / fein (Klinge, f.) |  | جَيِّدَة |  | Kein Match gefunden |
| 3070 | dick / grob (f.) |  | خُشِينَة |  | Kein Match gefunden |
| 3071 | wackelig / instabil (f.) |  | رُهِيفَة |  | Kein Match gefunden |
| 3072 | stabil / solide (f.) |  | صَحِيحَة |  | Kein Match gefunden |
| 3073 | Das neue Messer ist sehr scharf, es schneidet wie ein Zauber |  | السِّكِّينَة الجْدِيدَة مَاضِيَة بَرْشَة تَدْبَحْ ذْبَحَان |  | Kein Match gefunden |
| 3074 | Das alte Messer ist stumpf und kann nicht mehr repariert werden |  | المُوسْ القَدِيم حَافَى وَ مَاعَادِشْ يُصْلَحْ |  | Kein Match gefunden |
| 3075 | Möge euer Morgen Erfolg bringen, und mit Gottvertrauen heilen eure Wunden |  | ضْبَاحْكُم بِرْبَاحْكُم وْ خَلُّوهَا عَلَى اللَّه تَبْرَا جْرَاحْكُم |  | Kein Match gefunden |
| 3076 | Erfolg / Glück im Leben |  | الرْبَاح |  | Kein Match gefunden |
| 3077 | er/sie hat noch nie / niemals (absolute Verneinung) |  | عُمْرُو مَا |  | Kein Match gefunden |
| 3078 | ich habe noch nie / ich niemals |  | عُمْرِي مَا |  | Kein Match gefunden |
| 3079 | du hast noch nie / du niemals |  | عُمْرِكْ مَا |  | Kein Match gefunden |
| 3080 | ihr habt noch nie / ihr niemals |  | عُمْرِكُمْ مَا |  | Kein Match gefunden |
| 3081 | sie hat noch nie |  | عُمْرِهَا مَا |  | Kein Match gefunden |
| 3082 | wir haben noch nie |  | عُمْرِنَا مَا |  | Kein Match gefunden |
| 3083 | sie haben noch nie |  | عُمْرِهُمْ مَا |  | Kein Match gefunden |
| 3084 | Er hat noch nie gelogen |  | عُمْرُو مَا كْذِبْ |  | Kein Match gefunden |
| 3085 | dritter / dritte |  | الثَّالِثْ | ثَالِثْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 3086 | vierter / vierte |  | الرَّابِعْ | رَابَعْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 3087 | fünfter / fünfte |  | الخَامِسْ | خَامْسْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 3088 | sechster / sechste |  | السَّادِسْ |  | Kein Match gefunden |
| 3089 | siebter / siebte |  | السَّابِعْ | سَابَعْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 3090 | achter / achte |  | الثَّامِنْ |  | Kein Match gefunden |
| 3091 | neunter / neunte |  | التَّاسِعْ |  | Kein Match gefunden |
| 3092 | zehnter / zehnte |  | العَاشِرْ |  | Kein Match gefunden |
| 3094 | ledig (f.) |  | عَازِبَة |  | Kein Match gefunden |
| 3096 | verheiratet (f.) |  | مُعَرَّسَة |  | Kein Match gefunden |
| 3097 | geschieden (m.) |  | مُطَلَّقْ | مُطَلَقْ | Ansatz 1: Exakter Konsonanten-Match |
| 3098 | geschieden (f.) |  | مُطَلَّقَة |  | Kein Match gefunden |
| 3099 | verwitwet (m.) |  | هَجَّالْ |  | Kein Match gefunden |
| 3100 | verwitwet (f.) |  | هَجَّالَة |  | Kein Match gefunden |
| 3102 | Minute |  | دَقِيقَة | دْقِيقَة | Ansatz 1: Exakter Konsonanten-Match |
| 3103 | Moment / Augenblick |  | لَحْظَة | لَحْظَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 3104 | Ich auch! / So auch ich! |  | حَتَّى أَنَا |  | Kein Match gefunden |
| 3105 | Ich auch! (Variante) |  | أَنَا زَادَا |  | Kein Match gefunden |
| 3106 | müde / erschöpft (m.) |  | تَعْبَان |  | Kein Match gefunden |
| 3107 | zufrieden / gut drauf (m.) |  | مَبْسُوط |  | Kein Match gefunden |
| 3108 | das große Fest / Eid al-Adha |  | الْعِيدْ الْكْبِيرْ |  | Kein Match gefunden |
| 3109 | Zusammenkunft / Familientreffen |  | لَمَّة |  | Kein Match gefunden |
| 3110 | Arbeite fleißig und halte den Faulenzer zur Rechenschaft (wörtl.: Arbeite mit dem Gafsa-Korb und rechne mit dem Müßiggänger ab) |  | إِخْدِمْ بِقَفْصِي وَحَاسِبْ الْبَطَّال |  | Kein Match gefunden |
| 3111 | der Faulpelz / Müßiggänger |  | الْبَطَّال |  | Kein Match gefunden |
| 3112 | Preis den Propheten, du wirst Frieden finden / es wird gut (Ausdruck zum Deeskalieren) |  | صَلِّي عَالنَّبِي تِرْبَحْ |  | Kein Match gefunden |
| 3113 | Beruhigung / Deeskalation |  | تَهْدِئَة |  | Kein Match gefunden |
| 3114 | Herzensfrieden / innere Ruhe (wörtl.: Reinheit des Herzens) |  | صَفَاء الْقَلْب |  | Kein Match gefunden |
| 3115 | Tabel (tunesische Gewürzmischung aus Koriander) |  | تَابِل |  | Kein Match gefunden |
| 3116 | Kümmel / Caraway |  | كَرْوِيَّة | كَرْوِيَّة | Ansatz 1: Exakter Konsonanten-Match |
| 3117 | Knoblauch |  | ثُوم | ثُومْ | Ansatz 1: Exakter Konsonanten-Match |
| 3119 | zerdrückt / gestampft |  | مُهَرَّس |  | Kein Match gefunden |
| 3120 | gegrillt (m.) |  | مَشْوِي |  | Kein Match gefunden |
| 3121 | frohes Fest (Pl.) |  | عِيدْكُم مَبْرُوك |  | Kein Match gefunden |
| 3122 | Möget ihr jedes Jahr wohlauf sein (Eid-Segenswunsch) |  | إِنْ شَاء اللهُ كُلّ عَامْ وَانْتُومَا حَيِّين بْخِير |  | Kein Match gefunden |
| 3123 | Langeweile / tote Atmosphäre / Flaute / pleite sein (aus frz. la guigne) |  | الْقِينْيَة |  | Kein Match gefunden |
| 3124 | So langweilig! / Was für eine tote Atmosphäre! |  | مَلَّا قِينْيَة! |  | Kein Match gefunden |
| 3125 | So öde! / Wie langweilig! |  | مَلَّا فَدَّة! |  | Kein Match gefunden |
| 3126 | Was für ein/e...! / So ein...! (Ausruf-Verstärker) |  | مَلَّا |  | Kein Match gefunden |
| 3128 | Halt den Mund! (derb) |  | سَكِّرْ فُمَّكْ! |  | Kein Match gefunden |
| 3130 | Senk deine Stimme ein bisschen (höflich) |  | وَطِّي صَوْتَكْ شْوَيَّة |  | Kein Match gefunden |
| 3131 | senken / leiser machen (Imperativ) |  | وَطِّي |  | Kein Match gefunden |
| 3132 | Mit wem spreche ich bitte? (höflich) |  | مَعْ شْكُون نَحْكِي عَيِّشِكْ؟ |  | Kein Match gefunden |
| 3133 | Einen Moment bitte (höflich) |  | لَحْظَة بِرَبِّي |  | Kein Match gefunden |
| 3134 | nur / bloß / kurz (Partikel) |  | بَرَكْ |  | Kein Match gefunden |
| 3135 | ich brach in kalten Schweiß aus (wörtl.: der Schweiß machte mich wie Milch) |  | لَبَّنِي الْعَرَق |  | Kein Match gefunden |
| 3136 | Schock / Schreck / Erschütterung |  | الْفَجْعَة |  | Kein Match gefunden |
| 3138 | Genau! / Das ist es! / So ist es halt (Küste/Süden) |  | هَضَاكْ هُوْ |  | Kein Match gefunden |
| 3139 | Genau! / Das ist es! (Tunis/Norden) |  | هَذَاكَ هُوْ |  | Kein Match gefunden |
| 3140 | So ist die Realität / Es ist wie es ist |  | هَضَاكْ هُوَ الْوَاقِع |  | Kein Match gefunden |
| 3141 | Das ist nun mal so / Es ist unvermeidlich |  | هَضَاكْ هُوَ الْقَسْم |  | Kein Match gefunden |
| 3142 | genau / exakt |  | بِالظَّبْط |  | Kein Match gefunden |
| 3143 | Wer die Kutteln nicht waschen kann ist eine Verschwendung als Ehefrau; wer weder häuten noch schlachten kann ist eine Schande als Ehemann |  | إِلِّي مَا تَعْرِفْش تَغْسِل الدَّوَّارَة مَاخْذِتْهَا فِي وِلْد النَّاس خُسَارَة، وَإِلِّي لَا يَعْرِف لَا سْلِيخَة وَلَا ذْبِيحَة مَاخِذْتُو فِي بِنْت النَّاس فْضِيحَة |  | Kein Match gefunden |
| 3144 | Kutteln / Innereien (Tierdarm) |  | الدَّوَّارَة |  | Kein Match gefunden |
| 3145 | das Häuten eines Tieres |  | سْلِيخَة |  | Kein Match gefunden |
| 3146 | Schlachtung / rituelles Schlachten |  | ذْبِيحَة |  | Kein Match gefunden |
| 3147 | Verschwendung / Schade |  | خُسَارَة |  | Kein Match gefunden |
| 3148 | Schande / Skandal |  | فْضِيحَة |  | Kein Match gefunden |
| 3149 | Ich sterbe vor Hunger (wörtl.: mein Herz löst sich auf vor extremem Hunger) |  | قَلْبِي يِسِلّ عْلَيَّ بِالشَّرّ |  | Kein Match gefunden |
| 3150 | extremer Hunger / das Schlimmste |  | الشَّرّ | شَرْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 3151 | sich auflösen / absacken / schwach werden |  | يِسِلّ |  | Kein Match gefunden |
| 3152 | schwindelig / benommen / schwach |  | دَايِخ |  | Kein Match gefunden |
| 3153 | erschöpft / ausgelaugt |  | مُتْعَب | مُتْعِبْ | Ansatz 1: Exakter Konsonanten-Match |
| 3154 | hergestellt / gemacht (m.) |  | مَخْدُوم | مَخْدُومْ | Ansatz 1: Exakter Konsonanten-Match |
| 3155 | hergestellt / gemacht (f.) |  | مَخْدُومَة |  | Kein Match gefunden |
| 3157 | besteht aus (wörtl.: zusammengesetzt aus) |  | مِتْكَوِّن مِنْ |  | Kein Match gefunden |
| 3158 | Der Stuhl ist aus Holz gemacht |  | الكُرْسِي مَخْدُوم مِلُّوح |  | Kein Match gefunden |
| 3159 | Das Brot ist aus Mehl gemacht |  | الخُبْزَة مَخْدُومَة بِالفَارِينَة |  | Kein Match gefunden |
| 3160 | Die Pizza ist mit Käse gemacht |  | البِيتزَا مَخْدُومَة بِالجُبْنَة |  | Kein Match gefunden |
| 3161 | Shakshouka (tunesisches Eier-Gericht) |  | شَكْشُوكَة |  | Kein Match gefunden |
| 3163 | bunte Paprika |  | فِلْفِل مُلَوَّن |  | Kein Match gefunden |
| 3164 | pochiertes Ei (wörtl.: weiches Ei) |  | عُظُم مُرَوَّب |  | Kein Match gefunden |
| 3165 | reines Olivenöl (wörtl.: freies Olivenöl) |  | زَيْت زَيْتُون حُرّ |  | Kein Match gefunden |
| 3166 | traditionelle Schafwolle |  | صُوف عَرَبِي |  | Kein Match gefunden |
| 3167 | Webstuhl |  | السَّدَايَة |  | Kein Match gefunden |
| 3168 | Weben / Weberei |  | نَسِيج |  | Kein Match gefunden |
| 3169 | Muster / Design |  | رَشْمَة |  | Kein Match gefunden |
| 3170 | Wie viele Knoten hat sie? |  | وَقَدَّاش فِيهَا مِنْ عُقْدَة؟ |  | Kein Match gefunden |
| 3172 | Gib mir das Wechselgeld |  | هَاتْ البَاقِي |  | Kein Match gefunden |
| 3173 | Chlorophylle-Kaugummi (Stück) |  | كَعْبَة كُلُورُوفِيل |  | Kein Match gefunden |
| 3174 | Nimm stattdessen ein Stück Chlorophylle-Kaugummi |  | خُوذْ بِيهُمْ كَعْبَة كُلُورُوفِيل |  | Kein Match gefunden |
| 3175 | Lebensmittelladen im Viertel |  | حَانُوت الحُومَة |  | Kein Match gefunden |
| 3176 | mürrisch / mit finsterer Miene (m.) |  | مْكَشْبَر |  | Kein Match gefunden |
| 3177 | Warum schaust du so mürrisch? |  | عْلَاش مْكَشْبَر؟ |  | Kein Match gefunden |
| 3178 | weiße Asida (traditionelles tunesisches Grießgericht) |  | الغُصِيدَة البِيضَا |  | Kein Match gefunden |
| 3179 | Gerstenmehl |  | دَقِيق شُعِير |  | Kein Match gefunden |
| 3180 | traditionelles Gericht (wörtl.: Zeitessen) |  | مَاكْلَة زَمْنِيَّة |  | Kein Match gefunden |
| 3181 | Dattelsirup |  | رُبّ التَّمْر |  | Kein Match gefunden |
| 3182 | reiner Honig (wörtl.: freier Honig) |  | عَسَل حُرّ |  | Kein Match gefunden |
| 3183 | Kinder brauchen eine volle Geldbörse und eine Frau mit aufgekrempelten Ärmeln |  | الصُّغَار تُجَبِّلْهُمْ كَاسَة مُعَمَّرَة وَمْرَا مُشَمَّرَة |  | Kein Match gefunden |
| 3184 | voll / gefüllt (f.) |  | مُعَمَّرَة |  | Kein Match gefunden |
| 3185 | mit aufgekrempelten Ärmeln / anpackend (f.) |  | مُشَمَّرَة |  | Kein Match gefunden |
| 3186 | Strandtag / ans Meer gehen |  | التَّبْحِير |  | Kein Match gefunden |
| 3187 | wir schwimmen |  | نُعُومُوا |  | Kein Match gefunden |
| 3188 | entspannen und abkühlen |  | تُبَحْبِيحَة |  | Kein Match gefunden |
| 3189 | bezahle! (Imperativ) |  | خَلِّص |  | Kein Match gefunden |
| 3190 | bezahle den Kaffee |  | خَلِّص القَهْوَة |  | Kein Match gefunden |
| 3191 | ich weiß nicht |  | مَا نَعْرَفْش |  | Kein Match gefunden |
| 3192 | vielleicht |  | بَالكُشِي |  | Kein Match gefunden |
| 3194 | kein Problem |  | مَا ثَمَّاش مُشْكِل |  | Kein Match gefunden |
| 3195 | gib mir eine Minute |  | أَعْطِيني دَقِيقَة |  | Kein Match gefunden |
| 3196 | nimm dir Zeit |  | خُوذْ وَقْتِك |  | Kein Match gefunden |
| 3197 | ich bin gleich zurück |  | تَوَّ نَرْجَع |  | Kein Match gefunden |
| 3198 | was meinst du damit? |  | شْنُوَّة تَقْصُد؟ |  | Kein Match gefunden |
| 3201 | sprich langsam |  | تَكَلَّم بِالشْوَيَّة |  | Kein Match gefunden |
| 3202 | Chaos / Durcheinander / schlecht organisiert |  | تَخَلْوِيض | تْخَلْوِيضْ | Ansatz 1: Exakter Konsonanten-Match |
| 3203 | rücksichtslose Person (ignoriert Sozialregeln) |  | هُوكَش |  | Kein Match gefunden |
| 3204 | Person ohne Bürgersinn / respektlos gegenüber öffentlichem Raum |  | جَبْري | جَبْرِي | Ansatz 1: Exakter Konsonanten-Match |
| 3205 | Wer ist dein bester Freund? |  | شُكُونُو أَعَزّ صَاحِبْ عَنْدَكْ؟ |  | Kein Match gefunden |
| 3206 | Was machst du? |  | شُنُوَّة تَعْمِلْ؟ |  | Kein Match gefunden |
| 3207 | Wie viele Leute sind dort? |  | قَدَّاش ثُمَّا مِن عَبْد غَادِي؟ |  | Kein Match gefunden |
| 3208 | Welche Farbe magst du am meisten? |  | أَنَاهُو الكُولَار إِلِّي تَجِبُّو أَكْثَر؟ |  | Kein Match gefunden |
| 3209 | Warum bist du spät? |  | عَلَاش اُمُّمَخَّرْ؟ |  | Kein Match gefunden |
| 3210 | zu spät / jemand der zu spät kommt |  | أُمُّمَخَّرْ |  | Kein Match gefunden |
| 3211 | Wie oft treibst du Sport? |  | قَدَّاش مِن مَرَّة تَعْمَل سْبُور؟ |  | Kein Match gefunden |
| 3212 | Wo wohnst du? |  | وِيْن تُسْكُنْ؟ |  | Kein Match gefunden |
| 3213 | Wann hast du Geburtstag? |  | وَقْتَاش عِيد مِيلَادَكْ؟ |  | Kein Match gefunden |
| 3214 | Was für Musik magst du? |  | شُنُوَّة نَوْع الْمُوسِيقَا إِلِّي تَجِبْهَا؟ |  | Kein Match gefunden |
| 3215 | Wessen Buch ist das? |  | مَتَاع شُكُونُ الْكِتَاب هَذَا؟ |  | Kein Match gefunden |
| 3216 | Wann fährt der Zug ab? |  | وَقْتَاش يُخْرُجْ التِّرَانْ؟ |  | Kein Match gefunden |
| 3217 | Wie geht es dir heute? |  | شُنُوَالَكْ اليُوم؟ |  | Kein Match gefunden |
| 3218 | Wie viel Zucker möchtest du? |  | قَدَّاش تَجِبّ سُكَّرْ؟ |  | Kein Match gefunden |
| 3219 | Wie lange wohnst du schon hier? |  | قَدَّاش عَنْدَكْ تُسْكُنْ هُنَا؟ |  | Kein Match gefunden |
| 3220 | Hast du gegessen? |  | كْلِيتْشِي؟ |  | Kein Match gefunden |
| 3221 | Hast du getrunken? |  | شُرِّبْتْشِي؟ |  | Kein Match gefunden |
| 3222 | Bist du gegangen? |  | مْشِيتْشِي؟ |  | Kein Match gefunden |
| 3223 | Bist du gekommen? |  | جِيتْشِي؟ |  | Kein Match gefunden |
| 3224 | Hast du deinen Kaffee getrunken? |  | شُرِّبْتِي الْقَهْوَة مْتَاعَكْ؟ |  | Kein Match gefunden |
| 3225 | Ja, ich hab ihn getrunken. |  | إِي هُ، شُرِّبْتَهَا. |  | Kein Match gefunden |
| 3226 | Handwerk / Kunsthandwerk |  | حِرْفَة |  | Kein Match gefunden |
| 3227 | Mittagshitzezeit (11–15 Uhr, wenn die Sonne am stärksten brennt) |  | الْقَايِلَة |  | Kein Match gefunden |
| 3228 | Schirokko / heißer trockener Südwind |  | الشُّهِيلِي |  | Kein Match gefunden |
| 3229 | heißes Wetter |  | طَقْسْ سْخُونْ |  | Kein Match gefunden |
| 3230 | unerträgliche Hitze (wörtl.: Hitze die man nicht aushält) |  | سُخَانَة مَا تَطَّاقِشْ |  | Kein Match gefunden |
| 3231 | die Welt kocht (wörtl.: die Welt ist heiß) |  | دُنْيَا سُخُونَة |  | Kein Match gefunden |
| 3232 | sehr heiß (wörtl.: viel Hitze) |  | سُخَانَة بَرْشَا |  | Kein Match gefunden |
| 3233 | die Sonne brennt |  | شَمْسْ تَحْرِقْ |  | Kein Match gefunden |
| 3234 | rote Hölle / brütende Hitze |  | جُهَنَّمْ حَمْرَا |  | Kein Match gefunden |
| 3235 | Schweiß |  | عَرَق | عِرْقْ | Ansatz 1: Exakter Konsonanten-Match |
| 3236 | ich schwitze am Stück / bin durchgeschwitzt |  | نِسْلَتْ بِالْعَرَقْ |  | Kein Match gefunden |
| 3237 | ich bin von Schweiß durchnässt |  | نُشَرْشِرْ بِالْعَرَقْ |  | Kein Match gefunden |
| 3238 | wir gingen |  | مْشِينَا |  | Kein Match gefunden |
| 3239 | ihr gingt |  | مْشِيتُو |  | Kein Match gefunden |
| 3240 | sie gingen |  | مْشَاوْ |  | Kein Match gefunden |
| 3241 | tunesischer Jasminstrauß (Symbol des tunesischen Sommers) |  | مَشْمُومْ | مَشْمُومْ | Ansatz 1: Exakter Konsonanten-Match |
| 3242 | Jasmin |  | يَاسْمِين | يَاسْمِينْ | Ansatz 1: Exakter Konsonanten-Match |
| 3243 | arabischer Jasmin (großblütig, starkes Aroma) |  | فُلّ |  | Kein Match gefunden |
| 3244 | Duft / Geruch |  | رِيحَة |  | Kein Match gefunden |
| 3245 | sein Duft verbreitet sich weit (wörtl.: sein Duft weht weithin) |  | رِيحْتُو تْقُوحْ فُوحَانْ |  | Kein Match gefunden |
| 3246 | die Hamsa / Hand der Fatima (Schutzamulett) |  | الخُمْسَة | خَمْسَة | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 3247 | Schutzsymbol |  | رَمْز حِمَايَة |  | Kein Match gefunden |
| 3248 | das (böse) Auge |  | العَيْن | عِينْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 3249 | Ruinen / archäologische Stätten |  | آثَار | أَثَارْ | Ansatz G: Match nach Hamza-/Ta-Marbuta-Normalisierung |
| 3250 | Hamsa auf dich! (Abwehrformel gegen bösen Blick) |  | خَمْسَة وَخْمِيسْ عَلَيْكَ |  | Kein Match gefunden |
| 3251 | er wühlte / suchte / provozierte |  | بَرْبَشْ |  | Kein Match gefunden |
| 3252 | er wühlt / sucht / provoziert / surft (im Internet) |  | يْبَرْبِشْ |  | Kein Match gefunden |
| 3253 | Lumpensammler / jemand der im Müll wühlt |  | بَرْبَاشَة |  | Kein Match gefunden |
| 3255 | er provoziert ihn / er stichelt gegen ihn |  | قَاعِد يْبَرْبِشْ فِيهْ |  | Kein Match gefunden |
| 3256 | er surft im Internet |  | يْبَرْبِشْ فِي الإِنْتَرْنِتْ |  | Kein Match gefunden |
| 3257 | er wühlt im Müll |  | يْبَرْبِشْ فِي الزِّبْلَة |  | Kein Match gefunden |
| 3262 | Oh Gott! / Oh nein! / Armer! (wörtl.: oh mein Feuer) — vielseitiger Ausruf |  | يَا نَارِي |  | Kein Match gefunden |
| 3264 | Abendessen |  | عَشَا |  | Kein Match gefunden |
| 3271 | Schrott / billig / minderwertig / taugt nichts (Slang) |  | بَضْرُوط |  | Kein Match gefunden |
| 3272 | Billigmarke / No-Name-Produkt |  | مَارْكَة بَضْرُوط |  | Kein Match gefunden |
| 3273 | miese Arbeit / schlechter Service |  | خِدْمَة بَضْرُوط |  | Kein Match gefunden |
| 3274 | nicht schlecht / kein Schrott |  | مُوشْ بَضْرُوط |  | Kein Match gefunden |
| 3276 | Ausgaben / Unterhalt |  | نَفْقَة |  | Kein Match gefunden |
| 3277 | Smen (fermentierte Butter / Ghee) |  | سَمْن |  | Kein Match gefunden |
| 3279 | An seinen Ausgaben erkennt man sein Abendessen — er bringt den Smen eingewickelt in Papier (wörtl.: an seinen Ausgaben sieht man sein Abendessen; er bringt die Butter in einer Tüte). Bedeutung: Am Anfang erkennt man das Ende. |  | مِن نَفْقَتُو بَايِن عَشَاهْ، جَايِب السَّمْن فِي وَرْقَة |  | Kein Match gefunden |
| 3280 | Ruhe / Besonnenheit / Bedächtigkeit |  | رَزَانَة | رْزَانَة | Ansatz 1: Exakter Konsonanten-Match |
| 3281 | er wird verkauft / es wird verkauft |  | يِتْبَاع |  | Kein Match gefunden |
| 3282 | Wolle wird mit Besonnenheit verkauft. Bedeutung: Geduld bringt Genauigkeit — übereilte Entscheidungen kosten. |  | الصُّوف يِتْبَاع بِالرَّزَانَة |  | Kein Match gefunden |
| 3283 | stockbesoffen (wtl.: hat die 6-12 getroffen) |  | خَابِطْهَا سِيسْ دُوزْ |  | Kein Match gefunden |
| 3284 | stockbesoffen (wtl.: hat die 6-12 geschluckt) |  | بَالْعُو سِيسْ دُوزْ |  | Kein Match gefunden |
| 3285 | Klimaanlage |  | الكْلِيمَاتِيزَار |  | Kein Match gefunden |
| 3286 | er kühlte (ab) |  | بَرَّد |  | Kein Match gefunden |
| 3287 | er kühlt (ab) |  | يْبَرِّد |  | Kein Match gefunden |
| 3288 | Es ist sehr heiß, mach die Klimaanlage an um das Haus abzukühlen |  | الدِّنْيَا سْخُونَة بَرْشَة، مَشِّي الكْلِيمَاتِيزَار بَاشْ يْبَرِّد الدَّار |  | Kein Match gefunden |
| 3289 | Bambalouni (tunesischer Krapfen / frittiertes Teiggebäck) |  | بَامْبَالُوني |  | Kein Match gefunden |
| 3290 | er wird frittiert |  | يِتْقَلَّى |  | Kein Match gefunden |
| 3291 | Sandwich (tunesisches Baguette-Sandwich) |  | كَسْكْرُوت |  | Kein Match gefunden |
| 3292 | Pommes frites |  | فْرِيت |  | Kein Match gefunden |
| 3293 | Kapern |  | الكَّبَّار |  | Kein Match gefunden |
| 3294 | weiches Ei (wtl.: weiches Knöchelchen) |  | عَظْمَة مَرْوِيَّة |  | Kein Match gefunden |
| 3295 | Tannour-Brot (im Lehmofen gebackenes Brot) |  | خُبْزُ الطَّابُونَة |  | Kein Match gefunden |
| 3296 | scharf (Schärfegrad Kaskrout) |  | مْحَزْرَز |  | Kein Match gefunden |
| 3297 | extra scharf / feurig |  | مُوَزْوِز |  | Kein Match gefunden |
| 3298 | ohne Harissa |  | بِلَا هْرِيسَة |  | Kein Match gefunden |
| 3299 | nur ein bisschen |  | شْوَيَّة بَرْك |  | Kein Match gefunden |
| 3300 | gib mir mehr Harissa |  | زِيدْلِي هْرِيسَة |  | Kein Match gefunden |
| 3301 | dickköpfig / begriffsstutzig / Dummkopf |  | مُصَطَّك |  | Kein Match gefunden |
| 3302 | heimlich / hinter dem Rücken / auf die leise Tour |  | بَالسِّرْقَة |  | Kein Match gefunden |
| 3303 | Er benutzt heimlich das Telefon seines Bruders |  | يِسْتَعْمِلْ فِي تِلِيفُونْ خُوهُ بَالسِّرْقَة |  | Kein Match gefunden |
| 3304 | zweifelhafte Geschichte / faule Ausrede / unlogische Erklärung |  | حْكَايَة حُولَة |  | Kein Match gefunden |
| 3305 | skeptisch / trau dem Schein nicht / ich glaube das nicht |  | يَا مِنْ وَرَّانِي |  | Kein Match gefunden |
| 3306 | Maqrouth aus Kairouan (Dattel-Grieß-Gebäck) |  | المَقْرُوض القَيْرَوَانِي |  | Kein Match gefunden |
| 3307 | Grieß / Semolina |  | سْمِيد |  | Kein Match gefunden |
| 3308 | Honig / Sirup |  | عْسَل | عْسَلْ | Ansatz 1: Exakter Konsonanten-Match |
| 3309 | tunesischer Tajin (gebackenes Eiergericht mit Hähnchen und Kräutern) |  | الطَّاجِين التُّونْسِي |  | Kein Match gefunden |
| 3310 | Gewürze (allg.) |  | تَوَابِل |  | Kein Match gefunden |
| 3311 | Hühnchen / Hähnchen (allg.) |  | دْجَاج | دْجَاجْ | Ansatz 1: Exakter Konsonanten-Match |
| 3312 | er wünscht dir Reichtum und Wohlstand (wörtl.: er gibt dir ein Goldstück) |  | يَعْطِيكَ دُودَة |  | Kein Match gefunden |
| 3313 | Tunesien ist das Land der klugen Köpfe |  | تُونِسْ بْلَادْ المُخَاخ |  | Kein Match gefunden |
| 3314 | Gehirne / kluge Köpfe (Pl.) |  | مُخَاخ |  | Kein Match gefunden |
| 3316 | Genug geredet! (höflich-bestimmt) |  | يِزِّي مِالكْلَام |  | Kein Match gefunden |
| 3317 | Halt den Mund! / Mach deinen Mund zu! (hart) |  | صَكَّرْ فُمَّك |  | Kein Match gefunden |
| 3318 | Halt die Klappe! (sehr grob) |  | بَلَّع | بلَّعْ | Ansatz 1: Exakter Konsonanten-Match |
| 3319 | Hör auf! / Schneid es ab! (bestimmt) |  | قُصَّ |  | Kein Match gefunden |
| 3320 | Sag mir nicht... / Komm mir nicht mit... |  | لاَ تْقُلِّي |  | Kein Match gefunden |
| 3321 | Alaunstein (natürliches Deo) |  | شَبّ |  | Kein Match gefunden |
| 3322 | Moschus / Moschusparfüm |  | مِسْك |  | Kein Match gefunden |
| 3323 | Deo-Stick |  | سْتِيك |  | Kein Match gefunden |
| 3324 | Spray-Deodorant |  | دْيُودُورُون |  | Kein Match gefunden |
| 3325 | Nichts wirkt bei ihm / Nichts hilft dagegen |  | مَا يْحُوكْ فِيهَا حَتَّى شَيْ |  | Kein Match gefunden |
| 3326 | von Natur aus / von Gott gegeben |  | رَبَّانِي |  | Kein Match gefunden |
| 3327 | Schweißgeruch |  | رِيحَة الْعَرَق |  | Kein Match gefunden |
| 3329 | Hygiene / Sauberkeit |  | نَظَافَة | نْظَافَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 3330 | Bad / Hammam |  | حَمَّام | حَمَّامْ | Ansatz 1: Exakter Konsonanten-Match |
| 3331 | kinderleicht / kein Problem |  | سَاهِل مَاهِل |  | Kein Match gefunden |
| 3332 | schnell und sauber / flott erledigt |  | خْفِيف نْظِيف |  | Kein Match gefunden |
| 3333 | Zug um Zug / sofortige Bezahlung / direkte Übergabe |  | شِدْ مِدْ |  | Kein Match gefunden |
| 3334 | ständiges Kommen und Gehen / Durchgangsort |  | خَرَّار مَرَّار |  | Kein Match gefunden |
| 3335 | starke Windböe |  | وَهْف |  | Kein Match gefunden |
| 3336 | hau ab! / lass mich in Ruhe! (wörtl.: möge dich eine Böe wegtragen) |  | يَعْطِيكْ وَهْفْ |  | Kein Match gefunden |
| 3337 | ich auch / ich selbst |  | آنَا بِيدِي |  | Kein Match gefunden |
| 3338 | du auch / du selbst |  | إِنْتِي بِيدِكْ |  | Kein Match gefunden |
| 3339 | er auch / er selbst |  | هُوَّ بِيدُو |  | Kein Match gefunden |
| 3340 | sie auch / sie selbst (Sg.) |  | هِيَّ بِيدْهَا |  | Kein Match gefunden |
| 3341 | wir auch / wir selbst |  | أَحْنَا بِيدْنَا |  | Kein Match gefunden |
| 3342 | ihr auch / ihr selbst |  | إِنْتُومَا بِيدْكُمْ |  | Kein Match gefunden |
| 3343 | sie auch / sie selbst (Pl.) |  | هُومَا بِيدْهُمْ |  | Kein Match gefunden |
| 3344 | Teller (Pl.) |  | صْحُون |  | Kein Match gefunden |
| 3347 | das da / jenes |  | أَذَاكَا |  | Kein Match gefunden |
| 3348 | der/die/das Erste |  | لُولْ |  | Kein Match gefunden |
| 3349 | sie ist nicht |  | مَهِيشْ |  | Kein Match gefunden |
| 3350 | bestimmt / spezifisch |  | مُعَيِّنْ |  | Kein Match gefunden |
| 3351 | fehlend / unvollständig |  | نَاقِصْ |  | Kein Match gefunden |
| 3352 | erfolgreich |  | نَاجِحْ | نَاجِحْ | Ansatz 1: Exakter Konsonanten-Match |
| 3353 | du nicht / Verneinung du |  | مَاكِشْ |  | Kein Match gefunden |
| 3354 | das stimmt / das ist wichtig (Hinweispartikel) |  | رَاهُوْ |  | Kein Match gefunden |
| 3355 | so lala / war nicht besonders / so ungefähr |  | أَكَّاكَا |  | Kein Match gefunden |
| 3358 | also / logische Folgerung |  | مَالَا |  | Kein Match gefunden |
| 3359 | da ist es / sieh da / da hast du es |  | أَهَوْكَةَ |  | Kein Match gefunden |
| 3360 | so / auf diese Weise |  | هَكَّا |  | Kein Match gefunden |
| 3361 | immer dabei (negativ konnotiert) / klebt daran |  | عَابِدْ |  | Kein Match gefunden |
| 3362 | hier (Variante) |  | لَهْنَا |  | Kein Match gefunden |
| 3363 | gleich / sofort / in einem Moment |  | آتَوَّا |  | Kein Match gefunden |
| 3365 | Meinung / Ansicht |  | رَايْ |  | Kein Match gefunden |
| 3366 | Foto / Bild |  | تَصْوِيرَة |  | Kein Match gefunden |
| 3367 | Abendveranstaltung / Ausgehabend |  | سَهْرِيَّة |  | Kein Match gefunden |
| 3368 | Erziehung / Bildung |  | تُرْبِيَة |  | Kein Match gefunden |
| 3369 | Wahrheit |  | حْقِيقَة | حْقِيقَة | Ansatz 1: Exakter Konsonanten-Match |
| 3371 | Zeitraum / eine Weile |  | مُدَّةْ |  | Kein Match gefunden |
| 3373 | Preis |  | سُومْ |  | Kein Match gefunden |
| 3374 | Gemeindeverwaltung / Rathaus |  | بَلَدِيَّة |  | Kein Match gefunden |
| 3375 | Flagge |  | عَلَمْ | عَلَمْ | Ansatz 1: Exakter Konsonanten-Match |
| 3376 | Glück |  | زْهَرْ | زْهَرْ | Ansatz 1: Exakter Konsonanten-Match |
| 3377 | junger Mann / Jugend |  | شْبَابْ |  | Kein Match gefunden |
| 3378 | Mädchen (umgangssprachlich) |  | بِنِيَّة | بِنِيَّة | Ansatz 1: Exakter Konsonanten-Match |
| 3379 | Fest / Feiertag |  | عِيدْ |  | Kein Match gefunden |
| 3380 | er verließ sich (darauf) / er zählte (auf jemanden) |  | عَمِّلْ |  | Kein Match gefunden |
| 3381 | er stellte vor / er bekanntmachte |  | عَرِّفْ | عَرْفْ | Ansatz 1: Exakter Konsonanten-Match |
| 3383 | er lehrte / er unterrichtete |  | قَرَّى |  | Kein Match gefunden |
| 3384 | er blieb / er verblieb |  | بَقَى |  | Kein Match gefunden |
| 3385 | er präsentierte / er trat vor / er reichte ein |  | قَدَّمْ | قْدَمْ | Ansatz 1: Exakter Konsonanten-Match |
| 3386 | er stellte sich vor / er ließ sich fotografieren |  | تَصَوَّرْ |  | Kein Match gefunden |
| 3387 | er überlegte / er dachte nach |  | خَمِّمْ |  | Kein Match gefunden |
| 3388 | er meinte / er beabsichtigte |  | قْصَدْ |  | Kein Match gefunden |
| 3389 | er kürzte / er verringerte |  | نَقَّصْ |  | Kein Match gefunden |
| 3390 | er wurde krank |  | مَرِضْ | مْرُضْ | Ansatz 1: Exakter Konsonanten-Match |
| 3391 | er entfernte / er zog aus |  | نَحَّى |  | Kein Match gefunden |
| 3392 | es war fertig (gekocht) / es reifte |  | طَابْ |  | Kein Match gefunden |
| 3393 | er freute sich |  | فَرِحْ |  | Kein Match gefunden |
| 3394 | er hoffte / er bat inständig |  | تَرَجَّى | تْرَجَّى | Ansatz 1: Exakter Konsonanten-Match |
| 3395 | er wunderte sich / es gefiel ihm |  | عَجَبْ |  | Kein Match gefunden |
| 3396 | er benahm sich / er handelte |  | تَصَرَّفْ |  | Kein Match gefunden |
| 3397 | er zog / er riss |  | جْبِدْ | جْبِدْ | Ansatz 1: Exakter Konsonanten-Match |
| 3398 | er antwortete / er schloss / er erbrach |  | رَدَّ |  | Kein Match gefunden |
| 3399 | er forderte / er bat / er bestellte |  | طْلَبْ |  | Kein Match gefunden |
| 3400 | er vermehrte / er steigerte |  | كَثَّرْ | كَثِّرْ | Ansatz 1: Exakter Konsonanten-Match |
| 3401 | er erinnerte sich / er dachte nach |  | تَفَكَّرْ | تْفَكِّرْ | Ansatz 1: Exakter Konsonanten-Match |
| 3402 | er drehte sich / er wandte sich |  | دَارْ |  | Kein Match gefunden |
| 3403 | er fuhr (Auto) / er lenkte |  | سَاقْ |  | Kein Match gefunden |
| 3404 | er grüßte / er übergab |  | سَلَّمْ | سِلْمْ | Ansatz 1: Exakter Konsonanten-Match |
| 3405 | er wiederholte / er tat es nochmal |  | عَاوَدْ |  | Kein Match gefunden |
| 3406 | er suchte / er schaute |  | لَوَّجْ |  | Kein Match gefunden |
| 3407 | er lehrte / er unterrichtete |  | عَلَّمْ | عَلَمْ | Ansatz 1: Exakter Konsonanten-Match |
| 3408 | er ging vorbei / er verpasste |  | فَاتْ |  | Kein Match gefunden |
| 3409 | er zahlte / er rettete / er erledigte |  | خَلَّصْ |  | Kein Match gefunden |
| 3410 | er tröstete (mit Gottesfrieden) / er sprach Beileid |  | رَحَّمْ | رَحِمْ | Ansatz 1: Exakter Konsonanten-Match |
| 3411 | er überstand die Nacht / er begrüßte am Morgen |  | صَبَّحْ |  | Kein Match gefunden |
| 3412 | er verstarb (Euphemismus) |  | تَوَفَّى |  | Kein Match gefunden |
| 3413 | er sprach / er redete |  | تَكَلَّمْ |  | Kein Match gefunden |
| 3414 | er trainierte / er übte Sport |  | تَرَانَى |  | Kein Match gefunden |
| 3415 | er zeigte / er wies auf |  | ظَهَّرْ |  | Kein Match gefunden |
| 3416 | er blieb wach / er feierte die Nacht |  | سَهِرْ | سهر | Ansatz 1: Exakter Konsonanten-Match |
| 3417 | er verlässt sich (darauf) |  | يَعَمِّلْ |  | Kein Match gefunden |
| 3418 | er stellt vor |  | يَعَرِّفْ |  | Kein Match gefunden |
| 3419 | er beginnt |  | يَبْدَا |  | Kein Match gefunden |
| 3420 | er lehrt / er unterrichtet |  | يَقَرِّي |  | Kein Match gefunden |
| 3421 | er bleibt |  | يَبْقَى |  | Kein Match gefunden |
| 3422 | er präsentiert / er reicht ein |  | يَقَدِّمْ |  | Kein Match gefunden |
| 3423 | er stellt sich vor / er lässt sich fotografieren |  | يَتَصَوَّرْ |  | Kein Match gefunden |
| 3424 | er überlegt / er denkt nach |  | يَخَمِّمْ |  | Kein Match gefunden |
| 3425 | er meint / er beabsichtigt |  | يَقْصَدْ |  | Kein Match gefunden |
| 3426 | er kürzt / er verringert |  | يَنَقِّصْ |  | Kein Match gefunden |
| 3427 | er wird krank |  | يَمْرُضْ |  | Kein Match gefunden |
| 3429 | es wird fertig (gekocht) / es reift |  | يَطِيبْ |  | Kein Match gefunden |
| 3430 | er freut sich |  | يَفْرَحْ |  | Kein Match gefunden |
| 3431 | er hofft / er bittet inständig |  | يَتَرَجَّى |  | Kein Match gefunden |
| 3432 | er wundert sich / es gefällt ihm |  | يَعْجَبْ |  | Kein Match gefunden |
| 3433 | er benimmt sich / er handelt |  | يَتَصَرَّفْ |  | Kein Match gefunden |
| 3434 | er zieht / er reißt |  | يَجْبِدْ |  | Kein Match gefunden |
| 3435 | er antwortet / er schließt |  | يَرُدّْ |  | Kein Match gefunden |
| 3436 | er fordert / er bestellt |  | يَطْلُبْ |  | Kein Match gefunden |
| 3437 | er vermehrt / er steigert |  | يَكَثِّرْ |  | Kein Match gefunden |
| 3438 | er erinnert sich / er denkt nach |  | يَتَفَكَّرْ |  | Kein Match gefunden |
| 3439 | er dreht sich / er wendet sich |  | يَدُورْ |  | Kein Match gefunden |
| 3440 | er fährt (Auto) |  | يَسُوقْ |  | Kein Match gefunden |
| 3441 | er grüßt / er übergibt |  | يَسَلِّمْ |  | Kein Match gefunden |
| 3442 | er wiederholt / er tut es nochmal |  | يَعَاوِدْ |  | Kein Match gefunden |
| 3443 | er sucht / er schaut |  | يَلَوِّجْ |  | Kein Match gefunden |
| 3444 | er lehrt / er unterrichtet |  | يَعَلِّمْ |  | Kein Match gefunden |
| 3445 | er geht vorbei / er verpasst |  | يَفُوتْ |  | Kein Match gefunden |
| 3446 | er zahlt / er rettet |  | يَخَلِّصْ |  | Kein Match gefunden |
| 3447 | er spricht Beileid / er tröstet |  | يَرَحِّمْ |  | Kein Match gefunden |
| 3448 | er begrüßt am Morgen |  | يَصَبِّحْ |  | Kein Match gefunden |
| 3449 | er verstirbt |  | يَتَوَفَّى |  | Kein Match gefunden |
| 3450 | er spricht / er redet |  | يَتَكَلَّمْ |  | Kein Match gefunden |
| 3451 | er trainiert / er übt Sport |  | يَتَرَانَى |  | Kein Match gefunden |
| 3452 | er zeigt / er weist auf |  | يَظَهِّرْ |  | Kein Match gefunden |
| 3453 | er bleibt wach / er feiert die Nacht |  | يَسْهَرْ |  | Kein Match gefunden |
| 3454 | Esel (Darija) |  | بْهِيمْ | بْهِيمْ | Ansatz 1: Exakter Konsonanten-Match |
| 3455 | Esel (MSA) |  | حِمَارْ |  | Kein Match gefunden |
| 3456 | Pferd |  | حْصَانْ |  | Kein Match gefunden |
| 3457 | Kamel (Variante) |  | بَعِيرْ | بَعِيرْ | Ansatz 1: Exakter Konsonanten-Match |
| 3458 | Bär |  | دُبّ |  | Kein Match gefunden |
| 3459 | Wolf |  | ذِيبْ | ذِيبْ | Ansatz 1: Exakter Konsonanten-Match |
| 3460 | Affe |  | قِرْدْ | قِرْدْ | Ansatz 1: Exakter Konsonanten-Match |
| 3461 | Leopard |  | فَهْدْ | فَهْدْ | Ansatz 1: Exakter Konsonanten-Match |
| 3462 | Hyäne |  | ضْبَعْ | ضَبَّعْ | Ansatz 1: Exakter Konsonanten-Match |
| 3463 | Krokodil |  | تِمْسَاحْ |  | Kein Match gefunden |
| 3464 | Nilpferd |  | فَرَسُ النَّهْرْ |  | Kein Match gefunden |
| 3465 | Strauß |  | نَعَامَةْ |  | Kein Match gefunden |
| 3466 | Pfau |  | طَاوُسْ | طَاِوسْ | Ansatz 1: Exakter Konsonanten-Match |
| 3467 | Adler |  | نِسْرْ | نِسْرْ | Ansatz 1: Exakter Konsonanten-Match |
| 3468 | Falke |  | صَقْرْ | صَقْرْ | Ansatz 1: Exakter Konsonanten-Match |
| 3469 | Eule |  | بُومَة | بُومَة | Ansatz 1: Exakter Konsonanten-Match |
| 3470 | Taube |  | حْمَامَة | حْمَامَة | Ansatz 1: Exakter Konsonanten-Match |
| 3471 | Krähe |  | غْرَابْ | غْرَابْ | Ansatz 1: Exakter Konsonanten-Match |
| 3472 | Ente |  | بَطَّة | بطّة | Ansatz 1: Exakter Konsonanten-Match |
| 3473 | Gans |  | وَزَّةْ | وَزَّةْ | Ansatz 1: Exakter Konsonanten-Match |
| 3475 | Huhn |  | دْجَاجَة |  | Kein Match gefunden |
| 3476 | Pinguin |  | بَطْرِيقْ | بَطْرِيقْ | Ansatz 1: Exakter Konsonanten-Match |
| 3477 | Nachtigall |  | عَنْدْلِيبْ |  | Kein Match gefunden |
| 3478 | Storch |  | لَقْلَقْ |  | Kein Match gefunden |
| 3479 | Delfin |  | دِلْفِينْ | دِلْفِينْ | Ansatz 1: Exakter Konsonanten-Match |
| 3480 | Skorpion |  | عَقْرِبْ |  | Kein Match gefunden |
| 3483 | Spinne |  | عَنْكَبُوتْ |  | Kein Match gefunden |
| 3484 | Floh |  | بَرْغُوثْ | بَرْغُوثْ | Ansatz 1: Exakter Konsonanten-Match |
| 3485 | Wurm / Würmer |  | دُودْ | دُودْ | Ansatz 1: Exakter Konsonanten-Match |
| 3486 | Schnecke |  | حَلَزُونْ |  | Kein Match gefunden |
| 3487 | Eichhörnchen |  | سِنْجَابْ | سِنْجَابْ | Ansatz 1: Exakter Konsonanten-Match |
| 3488 | Gorilla |  | غُورِيلَّا | غُورِيلَّا | Ansatz 1: Exakter Konsonanten-Match |
| 3489 | Känguru |  | كُونْقُورُو | كُونْقُورُو | Ansatz 1: Exakter Konsonanten-Match |
| 3490 | Nashorn |  | وَحِيدْ القَرْنْ |  | Kein Match gefunden |
| 3491 | Stier |  | ثُورْ | ثُورْ | Ansatz 1: Exakter Konsonanten-Match |
| 3492 | Kalb |  | عِجْلْ | عِجْلْ | Ansatz 1: Exakter Konsonanten-Match |
| 3493 | Zoo |  | حَدِيقَةُ الحَيَوَانَاتْ |  | Kein Match gefunden |
| 3494 | Flügel |  | جْنَاحْ | جْنَاحْ | Ansatz 1: Exakter Konsonanten-Match |
| 3495 | Schnabel |  | مِنْقَارْ |  | Kein Match gefunden |
| 3496 | Huf |  | حَافِرْ |  | Kein Match gefunden |
| 3497 | Krallen |  | مَخَالِبْ | مَخَالِبْ | Ansatz 1: Exakter Konsonanten-Match |
| 3498 | Rüssel |  | خُرْطُومْ |  | Kein Match gefunden |
| 3499 | Fell / Pelz |  | وْبَرْ | وْبَرْ | Ansatz 1: Exakter Konsonanten-Match |
| 3500 | Maultier |  | بْغَلْ | بْغَلْ | Ansatz 1: Exakter Konsonanten-Match |
| 3503 | Eselfohlen |  | جَحْشْ | جَحْشْ | Ansatz 1: Exakter Konsonanten-Match |
| 3504 | Büffel |  | جَامُوسْ | جَامُوسْ | Ansatz 1: Exakter Konsonanten-Match |
| 3505 | Ratte |  | جَرْبُوعْ | جَرْبُوعْ | Ansatz 1: Exakter Konsonanten-Match |
| 3506 | Welpe |  | جَرْو | جَرْو | Ansatz 1: Exakter Konsonanten-Match |
| 3507 | Heuschrecke |  | جْرَادَة |  | Kein Match gefunden |
| 3508 | Schwein |  | حَلُّوفْ | حلّوف | Ansatz 1: Exakter Konsonanten-Match |
| 3509 | Kakerlake (darja) |  | خَنْفُوسْ | خَنْفُوسْ | Ansatz 1: Exakter Konsonanten-Match |
| 3511 | Igel |  | قَنْفُودْ |  | Kein Match gefunden |
| 3512 | Widder |  | كَبْشْ | كَبِّشْ | Ansatz 1: Exakter Konsonanten-Match |
| 3513 | Mutterschaf |  | نَعْجَةْ | نَعْجَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 3514 | Gecko |  | وَزْغَةْ |  | Kein Match gefunden |
| 3515 | Stute |  | فْرَسْ | فْرَسْ | Ansatz 1: Exakter Konsonanten-Match |
| 3516 | Tier (allgemein) |  | حَيَوَانْ | حَيَوَانْ | Ansatz 1: Exakter Konsonanten-Match |
| 3517 | Vogel / fliegendes Tier |  | طَيْرْ | طَيِّرْ | Ansatz 1: Exakter Konsonanten-Match |
| 3518 | er bellte |  | نْبَحْ |  | Kein Match gefunden |
| 3519 | er bellt |  | يِنْبَحْ |  | Kein Match gefunden |
| 3520 | er flog |  | حَلَّقْ | حَلَّقْ | Ansatz 1: Exakter Konsonanten-Match |
| 3521 | er fliegt |  | يْحَلِّقْ |  | Kein Match gefunden |
| 3522 | er kroch |  | زْحِفْ |  | Kein Match gefunden |
| 3523 | er kriecht |  | يِزْحَفْ |  | Kein Match gefunden |
| 3524 | er heulte |  | عْوَى |  | Kein Match gefunden |
| 3525 | er heult |  | يِعْوِي |  | Kein Match gefunden |
| 3526 | er iaahte (Esel) |  | نَهِّقْ |  | Kein Match gefunden |
| 3527 | er iaht (Esel) |  | يِنَهِّقْ |  | Kein Match gefunden |
| 3529 | Drogerie / Kiosk |  | سْبِيسِيرِيَّة |  | Kein Match gefunden |
| 3530 | Babypuder |  | غَبْرَة مْتَاعْ صْغَارْ |  | Kein Match gefunden |
| 3531 | na also / sieh mal (nicht-intuitives Ergebnis) |  | مَاكْ |  | Kein Match gefunden |
| 3532 | er kam zum Ausgangspunkt zurück |  | رْجَعْ لْنَفِسْ النُّقْطَة |  | Kein Match gefunden |
| 3533 | er ging kurz weg und kam sofort zurück |  | مَشَى وَجَى وَمْيَة |  | Kein Match gefunden |
| 3534 | Paracetamol / Schmerzmittel (Analkon) |  | آنَالْڤُونْ |  | Kein Match gefunden |
| 3535 | eine Orange (Sg.) |  | بُرْدْقَانَة |  | Kein Match gefunden |
| 3536 | orange (Farbe) |  | أورُونْجَا |  | Kein Match gefunden |
| 3537 | Mandarine / Clementine |  | مَدَلِينَةْ | مَدَلِينَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 3538 | Schalen (allg.) |  | قْشُورْ |  | Kein Match gefunden |
| 3539 | Zitrone / Limette |  | لِيمْ |  | Kein Match gefunden |
| 3540 | Weißdornbeere |  | زَعْرُورْ | زَعْرُورْ | Ansatz 1: Exakter Konsonanten-Match |
| 3541 | noch unreif / noch grün |  | مِزَّالِتْ خَضْرَةْ |  | Kein Match gefunden |
| 3545 | Kühlschrank (frz.) |  | فْرِيجِيدَارْ | فْرِيجِيدَارْ | Ansatz 1: Exakter Konsonanten-Match |
| 3546 | Kühlschrank (umgsspr. frz.) |  | فْرِيقُو |  | Kein Match gefunden |
| 3547 | gefroren / fest (m.) |  | جَامِدْ |  | Kein Match gefunden |
| 3548 | er wurde schlecht / verdorben |  | فْسِدْ | فْسِدْ | Ansatz 1: Exakter Konsonanten-Match |
| 3549 | er wurde kalt |  | بْرِدْ |  | Kein Match gefunden |
| 3550 | er fror ein |  | ثِلّْجْ | ثِلْجْ | Ansatz 1: Exakter Konsonanten-Match |
| 3551 | er gefror |  | جْمِدْ |  | Kein Match gefunden |
| 3552 | er verdirbt |  | يِفْسَدْ |  | Kein Match gefunden |
| 3553 | er wird kalt |  | يِبْرَدْ |  | Kein Match gefunden |
| 3554 | er friert ein |  | يِثَلِّجْ |  | Kein Match gefunden |
| 3555 | er gefriert |  | يِجْمَدْ |  | Kein Match gefunden |
| 3556 | Waage (allg.) |  | مِيزَانْ |  | Kein Match gefunden |
| 3558 | Toilette (umgsspr. frz.) |  | تْوَالَاتْ |  | Kein Match gefunden |
| 3559 | Waschbecken (frz.) |  | لَفَابُو |  | Kein Match gefunden |
| 3560 | ich muss dringend aufs Klo |  | مَحْصُورْ | مَحْصُورْ | Ansatz 1: Exakter Konsonanten-Match |
| 3561 | Toilettenspülung |  | سَاشْ |  | Kein Match gefunden |
| 3562 | Bett / Matratze (auf dem Boden) |  | فَرْشْ | فَرْشْ | Ansatz 1: Exakter Konsonanten-Match |
| 3563 | Gute Nacht (frz.) |  | بُونْ نْوِي |  | Kein Match gefunden |
| 3564 | Salzsee / trockenes Seebett |  | سَبْخَة | سَبْخَة | Ansatz 1: Exakter Konsonanten-Match |
| 3565 | Einzelbett |  | فَرْشْ بُو بْلَاصَةْ |  | Kein Match gefunden |
| 3566 | Doppelbett |  | فَرْشْ بُو بْلَاصْتِينْ |  | Kein Match gefunden |
| 3567 | Feldbett / einfaches Bett |  | بَايَاصْ | بَايَاصْ | Ansatz 1: Exakter Konsonanten-Match |
| 3568 | das Bett machen |  | حَضِّرْ الفَرْشْ |  | Kein Match gefunden |
| 3569 | Streichholz |  | وْقِيدَةْ |  | Kein Match gefunden |
| 3570 | alte / abgetragene Kleidung |  | جْرُودْ |  | Kein Match gefunden |
| 3571 | Kuchen (Einzelstück) |  | كَعْكَةْ |  | Kein Match gefunden |
| 3572 | Mandelgebäck (Straßengebäck) |  | هَرِيسَةْ لُوزْ |  | Kein Match gefunden |
| 3573 | Sesam |  | جِلْجْلَانْ | جِلْجْلَانْ | Ansatz 1: Exakter Konsonanten-Match |
| 3574 | Stück / Scheibe (frz.) |  | مُورْصُو |  | Kein Match gefunden |
| 3575 | kinderleicht / ein Kinderspiel (Ausdruck) |  | بَشْكُوتُو | بَشْكُوتُو | Ansatz 1: Exakter Konsonanten-Match |
| 3576 | übermorgen |  | بَعْدْ غَدْوَة |  | Kein Match gefunden |
| 3577 | Dachboden / Abstellraum |  | سَدَّة | سدَّة | Ansatz 1: Exakter Konsonanten-Match |
| 3578 | Kleiderschrank (frz.) |  | أَرْمْوَارْ |  | Kein Match gefunden |
| 3579 | großer Kleiderschrank |  | ڨْلَصْ |  | Kein Match gefunden |
| 3580 | Zirkus |  | سِيرْكْ | سيرك | Ansatz 1: Exakter Konsonanten-Match |
| 3581 | Theater (frz.) |  | تَايَاتِرْ | تَايَاتْرْ | Ansatz 1: Exakter Konsonanten-Match |
| 3582 | Fernglas / Teleskop |  | مَنْظَارْ | مِنْظَارْ | Ansatz 1: Exakter Konsonanten-Match |
| 3583 | Tiger |  | نَمِرْ | نِمْرْ | Ansatz 1: Exakter Konsonanten-Match |
| 3584 | Mittagsschlaf / Siesta |  | قَايْلَة |  | Kein Match gefunden |
| 3585 | Spiel / Wettkampf |  | مُبَارَاة |  | Kein Match gefunden |
| 3586 | er furzte (laut) |  | بَصْ | بَصْ | Ansatz 1: Exakter Konsonanten-Match |
| 3587 | er furzt (laut) |  | يَبُصّ |  | Kein Match gefunden |
| 3588 | er furzte (lautlos) |  | فْسَى |  | Kein Match gefunden |
| 3589 | er furzt (lautlos) |  | يِفْسَى |  | Kein Match gefunden |
| 3591 | Müllcontainer (Straße) |  | حَاوْيَة | حَاوْيَة | Ansatz 1: Exakter Konsonanten-Match |
| 3593 | Hände |  | إِيدِينْ |  | Kein Match gefunden |
| 3594 | Hilfe! / Notruf (allgemeiner Hilferuf im Notfall) |  | نَجْدَةْ | نَجْدَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 3595 | Hilf mir! (wörtl.: hilf mir — an eine Person) |  | عَاوِنِّي! |  | Kein Match gefunden |
| 3596 | Helft mir! (wörtl.: helft mir — an mehrere Personen) |  | عَاوِنُّونِي! |  | Kein Match gefunden |
| 3597 | er rasierte (MSA) |  | حَلَّقْ | حَلَّقْ | Ansatz 1: Exakter Konsonanten-Match |
| 3598 | er rasiert(MSA) |  | يَحَلِّقْ |  | Kein Match gefunden |
| 3599 | er rasierte eng / glatt (Bart stutzen) |  | سْلِتْ |  | Kein Match gefunden |
| 3600 | er rasiert eng / glatt (bart stutzen) |  | يَسْلِتْ |  | Kein Match gefunden |
| 3601 | er kahlrasierte |  | ڨَرَّعْ |  | Kein Match gefunden |
| 3602 | er kahlrasiert |  | يَقَرِّعْ |  | Kein Match gefunden |
| 3603 | Schneid auf Null! (Imperativ) (haare) |  | حَجِّمْ بِالزِّيرُو |  | Kein Match gefunden |
| 3604 | Nassrasierer / Rasierklinge |  | موسلأم |  | Kein Match gefunden |
| 3605 | hier, nimm / da hast du (Imperativ) |  | هَاكْ |  | Kein Match gefunden |
| 3607 | gib her / reiche (Imperativ) |  | مَدّْ |  | Kein Match gefunden |
| 3608 | wie schön für dich! (ironisch) |  | شِيهْ عْلِيكْ |  | Kein Match gefunden |
| 3609 | er hat ihn ignoriert / ausgeblendet (wörtl.: ausgeschaltet) |  | طَفَّاهْ |  | Kein Match gefunden |
| 3610 | trocken (m.) |  | شَايِحْ | شَايِحْ | Ansatz 1: Exakter Konsonanten-Match |
| 3611 | er packt / er hält |  | يِشِدّ |  | Kein Match gefunden |
| 3612 | Aufmerksamkeit erregen |  | شَدّْ الاِنْتِبَاهْ |  | Kein Match gefunden |
| 3613 | den Atem anhalten / sich beherrschen |  | شَدّْ النَّفِسْ |  | Kein Match gefunden |
| 3614 | er rasierert |  | يحجام |  | Kein Match gefunden |
| 3615 | Schande! (Ausruf) / Blamage — auch übertragen für ein beschämendes Ergebnis (z.B. frühes WM-Aus) |  | حَشُومَة |  | Kein Match gefunden |
| 3616 | sich unerwartet/zufällig treffen |  | كَفْ وْ غُرْزَة |  | Kein Match gefunden |
| 3617 | ist mir egal |  | بَڨْلَة لَاهَا |  | Kein Match gefunden |
| 3618 | Reisepass |  | بَاسْبُور |  | Kein Match gefunden |
| 3619 | Zeitung |  | جَرِيدَة | جَرِيدَة | Ansatz 1: Exakter Konsonanten-Match |
| 3620 | Direktor, Leiter |  | مُدِير |  | Kein Match gefunden |
| 3621 | Direktorin, Leiterin |  | مُدِيرَة |  | Kein Match gefunden |
| 3622 | Schultasche |  | كَرْطَابَة | كَرْطَابَةْ | Ansatz 1: Exakter Konsonanten-Match |
| 3623 | Schlüssel |  | مِفْتَاح | مِفْتَاحْ | Ansatz 1: Exakter Konsonanten-Match |
| 3624 | Ministerin |  | وَزِيرَة |  | Kein Match gefunden |
| 3625 | nein | no | لاَ | لاَ | Ansatz 1: Exakter Konsonanten-Match |
| 3626 | Anredepartikel (bleibt unübersetzt) |  | يا |  | Kein Match gefunden |
| 3627 | Algerien |  | الجَزَائِر |  | Kein Match gefunden |
| 3628 | algerisch, Algerier (m.) |  | جَزَائِرِي |  | Kein Match gefunden |
| 3629 | algerisch, Algerierin (f.) |  | جَزَائِرِيَّة |  | Kein Match gefunden |
| 3630 | Marokko |  | المَغْرِب | مَغْرِبْ | Ansatz A: Match nach Artikel-Entfernung (ال) |
| 3631 | marokkanisch, Marokkaner (m.) |  | مَغْرِبِي | مَغْرْبِي | Ansatz 1: Exakter Konsonanten-Match |
| 3632 | marokkanisch, Marokkanerin (f.) |  | مَغْرِبِيَّة |  | Kein Match gefunden |
| 3633 | Mauretanien |  | مُورِيتَانْيَا |  | Kein Match gefunden |
| 3634 | mauretanisch, Mauretanier (m.) |  | مُورِيتَانِي |  | Kein Match gefunden |
| 3635 | mauretanisch, Mauretanierin (f.) |  | مُورِيتَانِيَّة |  | Kein Match gefunden |
| 3636 | Libyen |  | لِيبْيَا | لِيبْيَا | Ansatz 1: Exakter Konsonanten-Match |
| 3637 | libysch, Libyer (m.) |  | لِيبِي | لِيبِي | Ansatz 1: Exakter Konsonanten-Match |
| 3638 | libysch, Libyerin (f.) |  | لِيبِيَّة |  | Kein Match gefunden |
| 3639 | dringend |  | عَاجِلْ | عَاجِلْ | Ansatz 1: Exakter Konsonanten-Match |
| 3641 | Mach dein Gehirn zu (Redewendung: hör auf zu grübeln / schalt ab) |  | سَكَّر مُخَّك |  | Kein Match gefunden |
| 3642 | Ist dir bewusst |  |  |  | Kein Match gefunden |
| 3643 | Hallo zurück (Antwort auf ahla) |  | أَهْلاً بِيكْ |  | Kein Match gefunden |
| 3645 | Gute Nacht (Frageform) |  | تِصْبَح عْلى خِير |  | Kein Match gefunden |
| 3646 | er tut, er macht (allgemein) |  | يَعْمِل |  | Kein Match gefunden |
| 3647 | er stellt vor |  | يُقَدِّم |  | Kein Match gefunden |
| 3648 | er spielt |  | يَلْعَب |  | Kein Match gefunden |
| 3649 | er ist geehrt / es freut ihn (kennenzulernen) |  | يِتْشَرَّف |  | Kein Match gefunden |
| 3650 | Tochter |  | بِنْت | بِنْتْ | Ansatz 1: Exakter Konsonanten-Match |
| 3651 | die Schweiz |  | سْوِيسْرَا | سْوِيسْرَا | Ansatz 1: Exakter Konsonanten-Match |
| 3652 | schweizerisch, Schweizer (m.) |  | سْوِيسْرِي |  | Kein Match gefunden |
| 3653 | schweizerisch, Schweizerin (f.) |  | سْوِيسْرِيَّة |  | Kein Match gefunden |
| 3654 | Araber, arabisch (m.) |  | عَرْبِي | عَرْبِي | Ansatz 1: Exakter Konsonanten-Match |
| 3655 | Araberin, arabisch (f.) |  | عَرْبِيَّة |  | Kein Match gefunden |
| 3656 | Polizist, Polizei |  | بُولِيس | بُولِيسْ | Ansatz 1: Exakter Konsonanten-Match |
| 3657 | Übersetzerin |  | مُتَرْجِمَة |  | Kein Match gefunden |
| 3658 | Sekretärin |  | سِكْرِيتَارَة |  | Kein Match gefunden |
| 3659 | Stewardess |  | مُضَيفَة |  | Kein Match gefunden |
| 3660 | Krankenschwester |  | فِرْمْلِيَّة |  | Kein Match gefunden |
| 3661 | Schriftstellerin, Sekretärin |  | كَاتْبَة |  | Kein Match gefunden |
| 3662 | Landwirtin |  | فَلَّاحَة | فْلَاحَة | Ansatz 1: Exakter Konsonanten-Match |
| 3663 | Malerin |  | رَسَّامَة |  | Kein Match gefunden |
| 3664 | Institut |  | مَعْهَد |  | Kein Match gefunden |
| 3665 | möglich, vielleicht |  | مُمْكِن |  | Kein Match gefunden |
| 3666 | bei Gott (Schwur), wirklich |  | وَاللهِ |  | Kein Match gefunden |
| 3667 | Vorstellung (Nomen) |  | تَقْدِيم | تَقْدِيمْ | Ansatz 1: Exakter Konsonanten-Match |
| 3668 | Dialekt |  | لَهْجَة |  | Kein Match gefunden |
| 3669 | spanisch, Spanier (m.) |  | إِسْبَانِي |  | Kein Match gefunden |
| 3670 | spanisch, Spanierin (f.) |  | إِسْبَانِيَّة |  | Kein Match gefunden |
| 3671 | Spanien |  | إِسْبَانْيَا | إسبانيا | Ansatz 1: Exakter Konsonanten-Match |
| 3672 | Lamm |  | عَلُّوش | عَلُّوشْ | Ansatz 1: Exakter Konsonanten-Match |
| 3673 | spiel! (Imperativ) |  | اِلْعَب |  | Kein Match gefunden |
| 3674 | Gewohnheit |  | عَادَة |  | Kein Match gefunden |
| 3675 | bei |  | عَنْد |  | Kein Match gefunden |
| 3676 | beinbehindert |  | عَايِب |  | Kein Match gefunden |
| 3677 | Hochzeit |  | عِرْس | عِرْسْ | Ansatz 1: Exakter Konsonanten-Match |
| 3678 | Ferien |  | عُطْلَة |  | Kein Match gefunden |
| 3679 | weggehen, sich entfernen |  | يِبْعِد |  | Kein Match gefunden |
| 3680 | auf |  | عْلَى |  | Kein Match gefunden |
| 3681 | Hochhaus |  | عِمَارَة |  | Kein Match gefunden |
| 3682 | gib! (Imperativ) |  | اَعْطِي |  | Kein Match gefunden |
| 3683 | Fabrik |  | مَعْمَل | مَعْمِلْ | Ansatz 1: Exakter Konsonanten-Match |
| 3684 | Das ist ziemlich teuer |  | غالِي ياسِر |  | Kein Match gefunden |
| 3685 | Haben Sie etwas Günstigeres? |  | عْنِدكْشي ما أرْخَص؟ |  | Kein Match gefunden |
| 3686 | Ich kann nur ... zahlen |  | انا ما نِجِم نِدْفَع كان ... |  | Kein Match gefunden |
| 3687 | Mein Maximum ist ... / Ich habe nur ... bei mir |  | انا فوقي كان ... |  | Kein Match gefunden |
| 3688 | Mach mir einen guten Preis |  | أعْمِل لِي سوم باهي |  | Kein Match gefunden |
| 3689 | Senk den Preis für mich |  | طَيَّح لِي في السُّوم |  | Kein Match gefunden |
| 3690 | Senk den Preis noch mehr für mich |  | زيد طَيَّح لِي في السُّوم |  | Kein Match gefunden |
| 3691 | Ist das der letzte Preis? |  | هاذا آخِر سوم؟ |  | Kein Match gefunden |
| 3692 | Wenn ich zwei oder drei kaufe, gibst du mir einen Rabatt? |  | كي نِشْري مِن عَنْدك زوز وَلَّا تْلاثة، تَعْمِل لِي روميز؟ |  | Kein Match gefunden |
| 3693 | Ich schaue mich noch um und komme wieder |  | نَعْمِل دورَة وْ نَرْجَع لِك |  | Kein Match gefunden |
| 3694 | Ein anderes Mal, so Gott will (höfliche Art, eine Verhandlung abzubrechen ohne zu kaufen) |  | مَرَّة أُخرى، إنْ شاء الله |  | Kein Match gefunden |
| 3695 | Ich stelle dir meine Frau vor |  | نُقَدِّم لِك مَرْتي |  | Kein Match gefunden |
| 3696 | Woher kommt ihr? |  | مْنين إنتوما؟ |  | Kein Match gefunden |
| 3697 | Wir wohnen jetzt in Tunesien |  | تَوَّا سا ْكنين في تونِس |  | Kein Match gefunden |
| 3698 | Was macht ihr in Tunesien? |  | شنُوَّا تَعْملو في تونِس؟ |  | Kein Match gefunden |
| 3699 | Wir sind gekommen, um zu erkunden und auch Tunesisch zu lernen |  | جينا باش نْحَوْسو وْ نِتْعَلَّمو تونسي زادة |  | Kein Match gefunden |
| 3700 | Gute Arbeit! / Respekt! (wörtl. Gott gebe euch Gesundheit) |  | يَعْطيكم الصَّحَّة |  | Kein Match gefunden |
| 3701 | Die Ehre ist ganz meinerseits, danke |  | وْ بيك أكْثَر، يْعَيْشِك |  | Kein Match gefunden |
| 3702 | Tschüss (Auf Wiedersehen) |  | في لَمان |  | Kein Match gefunden |
| 3703 | Ich möchte euch vom Haus erzählen, in dem ich eines Tages leben möchte |  | نْحِب نَحْكيلْكم عْلَى الدَّار إلِّي نِتْمَنَّى نْعِيش فيها نْهار آخُر |  | Kein Match gefunden |
| 3704 | Dieses Haus muss nicht unbedingt sehr groß sein |  | الدَّارْ هاذي موش لَازِم تْكون كْبيرَة بَرْشا |  | Kein Match gefunden |
| 3705 | Aber es muss schön und hell sein |  | أمَا لَازِم تْكون مُشْرهَة و ضاوْيَة |  | Kein Match gefunden |
| 3706 | Traditionelles tunesisches Haus (Dar Arbi, mit Innenhof) |  | دَارْ عَرَبي |  | Kein Match gefunden |
| 3707 | In der Mitte möchte ich einen kleinen Brunnen und viele Pflanzen und Grünflächen |  | في الوِسط، نْحِب فيها نافورَة مْتاع ماء صْغيرَة و بَرْشا نَبْتَات و خُضوريَّة |  | Kein Match gefunden |
| 3708 | Ich möchte, dass das Wohnzimmer sehr geräumig ist |  | بيت القْعاد نْحِبها تْكون واسْعَة بَرْشا |  | Kein Match gefunden |
| 3709 | Ich möchte ein großes Fenster mit Blick aufs Meer oder auf einen grünen Berg |  | نْحِب شُبَّاكْ كْبير يْطُل عْلَى البْحَر وَلَّا عْلَى جْبَل أخْضَر |  | Kein Match gefunden |
| 3710 | Ich liebe bunte tunesische Fliesen an den Wänden und auch im Flur |  | نْحِب الزَّليز التُّونسي المْلَوَّن عْلَى الحيوط و في القاعَة زادَة |  | Kein Match gefunden |
| 3711 | Das Wichtigste für mich ist die Ruhe im Haus |  | أكْثَر حاجَة تْهِمِّني هيَّ الهُدوء في الدَّار |  | Kein Match gefunden |
| 3712 | Ich möchte, dass es weit weg vom Autolärm und dem Lärm der Leute ist |  | نْحِبها تْكون بْعيدَة عْلَى حِس الكَراهِب وْ صْياح العْباد |  | Kein Match gefunden |
| 3713 | Das ist der Ort, an dem ich mir vorstelle, entspannt und glücklich zu sein |  | هاذي البْلاصَة إلِّي نِتْخَيَّل روحي فيها مِرْتاح وْ فَرْحان |  | Kein Match gefunden |
| 3714 | Drei Tage vor Sonntag (Struktur: qbal + Zeitpunkt + bi + Dauer) |  | قْبَل نْهار الأحَد بِثْلاثَة أيَّام |  | Kein Match gefunden |
| 3715 | Wir haben uns eine Stunde vor dem Spiel getroffen |  | تْقابَلنا قْبَل الماتْش بِساعَة |  | Kein Match gefunden |
| 3716 | Sie werden eine Woche nach dem Feiertag reisen (Struktur: ba3d + Zeitpunkt + bi + Dauer) |  | باش يِسافْرو بَعْد العيد بِجِمْعَة |  | Kein Match gefunden |
| 3717 | Jedes Mal wenn wir uns treffen, erzählt er mir von seinen Problemen (Struktur: koll ma + Präsens + Präsens) |  | كُل ما نِتْقابْلو يَحْكيلي عْلى مَشاكْلو |  | Kein Match gefunden |
| 3718 | Jedes Mal wenn er anfängt zu lernen, schläft er ein |  | كُل ما يِبْدا يِريفِز يِجيه النُّوم |  | Kein Match gefunden |
| 3719 | Jeder hat sein eigenes Auto (Struktur: kol we7id w + Nomen + Suffix) |  | كُل واحد وْ كَرهَبْتو |  | Kein Match gefunden |
| 3720 | Jeder hat seine eigene Art zu leben |  | كُل واحد وْ كيفاش يِعيش حْياتو |  | Kein Match gefunden |
| 3721 | Jeder kleidet sich anders (hat seinen eigenen Kleidungsstil) |  | كُل واحد وْ شنُوَّا يْحِب يِلْبِس |  | Kein Match gefunden |
