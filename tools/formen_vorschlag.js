// Vorschlag für vocabulary.formen (Feminin, Plural, Dual, Einzelnes, Elativ) aus TUNICO.
// Aufruf:  node tools/formen_vorschlag.js adj|nomen|partizip [ausgabe.json]
// Läuft mit Playwright gegen trainer.html (nur GET gegen Supabase; Schreibzugriffe werden blockiert),
// liest tunico_import über sbApi, setzt Länge und Klang aus der TUNICO-Schreibung (orig) über laengeHtml().
// Regel und Format: skills/tunsi/SKILL.md → „Formen“. Schreiben nie ohne Bestätigung von Nils.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const modus = ['nomen', 'partizip'].includes(process.argv[2]) ? process.argv[2] : 'adj';
const ausgabe = process.argv[3] || path.join(process.cwd(), 'formen_' + modus + '.json');

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ serviceWorkers: 'block' });
  const p = await ctx.newPage();
  await p.route(/supabase\.co/, async r => {
    const m = r.request().method();
    if (m === 'GET' || m === 'HEAD' || m === 'OPTIONS') return r.continue();
    return r.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
  });
  await p.addInitScript(() => { localStorage.setItem('tounsi_session', JSON.stringify({ username: 'Nils', expires: Date.now() + 86400000 })); });
  await p.goto('file://' + path.resolve(__dirname, '..', 'trainer.html'));
  await p.waitForFunction(() => typeof ALL_VOCAB !== 'undefined' && ALL_VOCAB.length > 1000, null, { timeout: 150000 });
  await p.waitForTimeout(3000);

  const out = await p.evaluate(async (modus) => {
    const sel = modus === 'adj'
      ? 'tunico_import?select=lemma_chatalpha,pos,inflected,senses&pos=eq.adjective&limit=2000'
      : modus === 'partizip'
        ? 'tunico_import?select=lemma_chatalpha,pos,inflected,senses&pos=in.(participle,activeParticiple,passiveParticiple)&limit=2000'
        : 'tunico_import?select=lemma_chatalpha,pos,inflected,senses&pos=in.(noun,collectiveNoun)&limit=6000';
    const rows = await sbApi(sel);
    const ANA = modus === 'adj'
      ? { '#adj_f': 'f', '#adj_pl': 'pl', '#adj_elative': 'el' }
      : modus === 'partizip'
        ? { '#ap_f': 'f', '#ap_pl': 'pl', '#pp_f': 'f', '#pp_pl': 'pl', '#p_f': 'f', '#p_pl': 'pl' }
        : { '#n_pl': 'pl', '#n_dual': 'du', '#n_unit': 'un', '#n_unit_pl': 'unpl', '#n_inst': 'inst' };
    const LABEL = { f: 'f.', pl: 'Pl.', el: 'Elativ', du: 'Dual', un: 'Einzelnes', unpl: 'Einzelne Pl.', inst: 'Inst.' };
    const ORDER = (modus === 'adj' || modus === 'partizip') ? ['f', 'pl', 'el'] : ['pl', 'du', 'un', 'unpl', 'inst'];
    // TUNICO-orig → Pseudo-Arabisch, damit laengeHtml() Länge und Klang nach der Regel des Trainers setzt
    const MAP = { 'ʕ': 'ع', 'ṛ': 'ر', 'r': 'ر', 'ḥ': 'ح', 'ž': 'ج', 'j': 'ج', 'x': 'خ', 'q': 'ق', 'g': 'ق', 'ṭ': 'ط', 'ṣ': 'ص', 'ḏ': 'ض', 'ẓ': 'ظ', 'ṯ': 'ث', 'š': 'ش', 'ġ': 'غ', 'z': 'ز', 'd': 'د', 'b': 'ب', 'ḅ': 'ب', 't': 'ت', 'f': 'ف', 'k': 'ك', 'l': 'ل', 'ḷ': 'ل', 'm': 'م', 'ṃ': 'م', 'n': 'ن', 'h': 'ه', 's': 'س', 'w': 'و', 'y': 'ي', 'ʔ': 'ء', 'v': 'ڤ', 'p': 'پ' };
    const FA = 'َ', KA = 'ِ', DA = 'ُ', SU = 'ْ', SH = 'ّ';
    function mkAr(orig) {
      const s = String(orig).normalize('NFC').replace(/īy/g, 'iyy').replace(/[̣ᵊ()\-]/g, '');   // ī vor -yya ist bei uns kurz
      const ch = [...s]; let ar = ''; let i = 0;
      const isV = c => 'aiuāīū'.includes(c);
      if (isV(ch[0])) { const c = ch[0]; ar += (c === 'i' || c === 'ī') ? 'إ' : 'أ'; ar += (c === 'a' || c === 'ā') ? FA : (c === 'i' || c === 'ī') ? KA : DA; if ('āīū'.includes(c)) ar += c === 'ā' ? 'ا' : c === 'ī' ? 'ي' : 'و'; i = 1; }
      for (; i < ch.length; i++) {
        const c = ch[i]; if (isV(c)) continue; const L = MAP[c]; if (!L) return null;
        let dbl = false; if (ch[i + 1] === c) { dbl = true; i++; }
        const n = ch[i + 1];
        if (n && isV(n)) {
          const last = i + 2 >= ch.length;
          const d = (n === 'a' || n === 'ā') ? FA : (n === 'i' || n === 'ī') ? KA : DA; i++;
          ar += L + (dbl ? SH : '') + d + ((n === 'ā') ? 'ا' : (n === 'ī') ? 'ي' : (n === 'ū') ? 'و' : '');
          if (last && n === 'a') ar += 'ة';
        } else ar += L + (dbl ? SH : '') + SU;
      }
      return ar;
    }
    const strip = h => String(h).replace(/<[^>]*>/g, '');
    const rHellOf = o => /r/.test(o) && !/ṛ/.test(o);
    const fix = ch => ch.replace(/iya$/, 'iyya').replace(/iyin$/, 'iyyin');   // Nisba: bei uns -iyya
    const byTr = {}; ALL_VOCAB.forEach(v => { if (!v.ausb) (byTr[v.tr.toLowerCase()] = byTr[v.tr.toLowerCase()] || []).push(v); });
    const homs = {}; rows.forEach(r => { if (r.lemma_chatalpha) homs[r.lemma_chatalpha.toLowerCase()] = (homs[r.lemma_chatalpha.toLowerCase()] || 0) + 1; });
    const res = [];
    for (const r of rows) {
      const l = r.lemma_chatalpha; if (!l) continue;
      const me = (byTr[l.toLowerCase()] || [])[0]; if (!me) continue;
      const forms = {}; ORDER.forEach(k => forms[k] = []);
      for (const x of (r.inflected || [])) {
        const k = ANA[x.ana]; if (!k || !x.chatalpha || !/^[a-z0-9']+$/.test(x.chatalpha)) continue;
        const tr = fix(x.chatalpha);
        const exist = byTr[tr.toLowerCase()];
        let m = tr;
        if (exist) { const ex = exist.find(e => e.id !== me.id) || exist[0]; m = strip(trL(ex)); if (!forms[k].some(y => y.tr === tr)) forms[k].push({ tr, m, rowId: ex.id, own: true }); continue; }
        const ar = mkAr(x.orig);
        if (ar) { try { m = strip(laengeHtml(tr, ar, rHellOf(x.orig))); } catch (e) { /* bleibt unmarkiert */ } }
        if (!forms[k].some(y => y.tr === tr)) forms[k].push({ tr, m, orig: x.orig });
      }
      if (!ORDER.some(k => forms[k].length)) continue;
      const fo = ORDER.filter(k => forms[k].length).map(k => LABEL[k] + ' ' + forms[k].map(y => y.m).join(' / ')).join(' · ');
      const own = [...new Set(ORDER.flatMap(k => forms[k].filter(y => y.own).map(y => y.rowId)))];
      // Bedeutungsprobe (nur Nomen): gemeinsamer 4-Buchstaben-Stamm zwischen TUNICO-Deutsch und unserem Deutsch
      const sen = ((r.senses || []).map(z => (z.de || []).join(' ')).join(' ')).toLowerCase();
      const ws = (sen.match(/[a-zäöüß]{4,}/g) || []).map(w => w.slice(0, 4));
      const bedeutung = ws.some(w => (me.en || '').toLowerCase().includes(w));
      res.push({ id: me.id, tr: me.tr, de: me.en, formen: fo, weitereZeilen: own, bedeutungPasst: bedeutung, tunicoEintraege: homs[l.toLowerCase()] || 0 });
    }
    return res;
  }, modus);

  fs.writeFileSync(ausgabe, JSON.stringify(out, null, 1));
  console.log(modus + ': ' + out.length + ' Lemmata mit Formen → ' + ausgabe);
  console.log('Zur Prüfung vorlegen: Zeilen mit bedeutungPasst=false oder tunicoEintraege>1 (Homonyme, andere Wortart).');
  await b.close();
})();
