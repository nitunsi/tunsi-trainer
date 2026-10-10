/* ===== Tounsi Trainer — neues Design: Logik-Schicht =====
   Wird nur von trainer.html geladen (nach dem Hauptskript). Überschreibt einzelne
   Funktionen der Hauptdatei und baut Navigation, Startseite und „Mehr“ neu. Daten und
   Lernlogik bleiben die der Hauptdatei. */
(function(){
'use strict';

/* ---------- Kleinkram ---------- */
const LS = {
  get(k, d){ try{ const v = localStorage.getItem(k); return v === null ? d : v; }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem(k, v); }catch(e){} }
};
const $ = id => document.getElementById(id);
const svg = p => '<svg viewBox="0 0 24 24">'+p+'</svg>';
const IC = {
  learn:  svg('<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M8 10h8M8 14h5"/>'),
  course: svg('<path d="M3 9l9-5 9 5-9 5zM7 11.5V16c3 2 7 2 10 0v-4.5"/>'),
  list:   svg('<path d="M5 5h14M5 10h14M5 15h14M5 20h8"/>'),
  stats:  svg('<path d="M5 20V10M12 20V4M19 20v-7"/>'),
  more:   svg('<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>'),
  close:  svg('<path d="M6 6l12 12M18 6 6 18"/>'),
  repeat: svg('<path d="M4 12a8 8 0 1 0 3-6.2M4 4v4h4"/>'),
  mix:    svg('<path d="M4 4h16v16H4zM8 9h8M8 13h8"/>'),
  pairs:  svg('<path d="M9 6H5v12h4M15 6h4v12h-4M9 12h6"/>'),
  cards:  svg('<rect x="3" y="6" width="14" height="12" rx="2"/><path d="M7 3h13a1 1 0 0 1 1 1v11"/>'),
  plus:   svg('<path d="M12 5v14M5 12h14"/>'),
  bolt:   svg('<path d="M13 3 5 14h6l-1 7 8-11h-6z"/>'),
  book:   svg('<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3zM5 17a3 3 0 0 1 3-3h11"/>'),
  search: svg('<circle cx="11" cy="11" r="6"/><path d="m20 20-4-4"/>'),
  inbox:  svg('<path d="M4 13l2-8h12l2 8v6H4zM4 13h5l1 2h4l1-2h5"/>'),
  check:  svg('<path d="M5 12l4 4L19 7"/>'),
  compass:svg('<circle cx="12" cy="12" r="8"/><path d="m15 9-2 5-4 1 2-5z"/>'),
  abc:    svg('<path d="M4 18l4-12 4 12M5.5 14h5M15 8h3a2 2 0 0 1 0 4h-3zm0 4h3.5a2 2 0 0 1 0 4H15z"/>'),
  save:   svg('<path d="M5 4h11l3 3v13H5zM8 4v5h7V4M8 20v-6h8v6"/>'),
  swap:   svg('<path d="M7 7h12l-3-3M17 17H5l3 3"/>'),
  bug:    svg('<path d="M8 9h8v6a4 4 0 0 1-8 0zM9 5l1 2M15 5l-1 2M4 12h4M16 12h4M5 18l3-2M19 18l-3-2"/>'),
  out:    svg('<path d="M10 4H5v16h5M15 8l4 4-4 4M19 12H9"/>'),
  ear:    svg('<path d="M11 5 6 9H3v6h3l5 4zM15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>'),
  mic:    svg('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/>')
};
const FONT = {S:16, M:18, L:20};
function applyFont(){ document.documentElement.style.fontSize = (FONT[LS.get('neu-font','M')] || 18) + 'px'; }
applyFont();
const SESSION = ['flash','coursesrs','mix','pairs','listen','speak'];
const HASPROG = ['flash','coursesrs','mix','listen','speak'];
const ADMIN = ['addvocab','activate','dupes','partnerqueue','partnercheck','quellen','translitregeln','export','lessons'];

/* ---------- Rahmen: untere Leiste, Schließen, Fortschritt ---------- */
function buildChrome(){
  if($('tabbar')) return;
  const tb = document.createElement('nav');
  tb.id = 'tabbar';
  tb.innerHTML = [['home','Lernen','learn'],['course','Kurs','course'],['vocab','Vokabeln','list'],['stats','Statistik','stats'],['more','Mehr','more']]
    .map(([m,l,i]) => '<button data-m="'+m+'" onclick="neuTab(\''+m+'\')">'+IC[i]+l+'</button>').join('');
  document.body.appendChild(tb);
  const left = document.querySelector('.nav-left');
  if(left){
    left.insertAdjacentHTML('afterbegin',
      '<button id="neu-close" onclick="neuLeave()" title="Beenden">'+IC.close+'</button>'
      + '<div id="neu-prog"><div class="bar"><i id="neu-prog-fill"></i></div><span id="neu-prog-n"></span></div>');
  }
}
const TABOF = m => m==='home'?'home' : m==='course'?'course' : m==='vocab'?'vocab' : m==='stats'?'stats' : 'more';
function chrome(mode){
  const app = $('app-screen');
  const appVisible = app && getComputedStyle(app).display !== 'none';
  const sess = SESSION.includes(mode);
  document.body.classList.toggle('neu-session', sess && appVisible);
  document.body.classList.toggle('neu-hasprog', HASPROG.includes(mode));
  document.body.classList.toggle('neu-tabs', appVisible && !sess);
  document.body.classList.toggle('neu-nohdr', mode==='home' || mode==='more' || mode==='stats');
  document.body.classList.toggle('neu-admin', ADMIN.includes(mode));
  const t = TABOF(mode);
  document.querySelectorAll('#tabbar button').forEach(b => b.classList.toggle('a', b.dataset.m === t));
}
setInterval(() => { try{ chrome(cMode); }catch(e){} }, 400);

function reset(m){
  cMode = m;
  try{ hideAllStickyBars(); }catch(e){}
  clearTimeout(_modeDispatchTimer);
  try{ closeResult(); }catch(e){}
  const act = $('act-screen'); if(act){ act.style.display = 'none'; act.style.pointerEvents = 'none'; }
  const ab = $('act-batch-bar'); if(ab) ab.style.display = 'none';
  const bb = $('vl-bulk-bar'); if(bb) bb.style.display = 'none';
  const es = $('exercise-screen'); if(es) es.style.display = 'block';
  const sn = $('sticky-next'); if(sn) sn.classList.remove('show');
  $('ex-type-label').textContent = ''; $('ex-progress').textContent = '';
  const pf = $('progress-fill'); if(pf) pf.style.width = '0%';
  document.querySelectorAll('.lesson-chip[onclick*="setMode"]').forEach(b => b.classList.remove('active'));
  try{ window.scrollTo({top:0, behavior:'instant'}); }catch(e){ window.scrollTo(0,0); }
  chrome(m);
}

/* ---------- setMode: home/more selbst, alles andere wie bisher ---------- */
const _setMode = window.setMode;
window.setMode = function(m, el){
  if(m === 'home'){ goHome(); return; }
  if(m === 'more'){ showMore(); return; }
  if(m === 'listen'){ startListen(); return; }
  if(m === 'speak'){ startSpeak(); return; }
  if(HASPROG.includes(m) || m === 'pairs'){ /* Sitzung */ }
  _setMode(m, el || document.createElement('i'));
  chrome(m);
};
window.neuTab = function(m){ window.setMode(m); };
window.neuLeave = function(){ try{ hideAllStickyBars(); closeResult(); }catch(e){} goHome(); };

/* Fortschritt oben in der Sitzung */
const _render = window.render;
window.render = function(){
  _render.apply(this, arguments);
  try{
    const n = exList.length;
    $('neu-prog-fill').style.width = (n > 0 ? Math.round(cIdx / n * 100) : 0) + '%';
    $('neu-prog-n').textContent = (cIdx + 1) + ' / ' + n;
  }catch(e){}
};

/* ---------- Hilfen: fällig, nächste Fälligkeit ---------- */
const isQueueBlocked = v => v.ps === 'rejected' || v.ps === 'suggested' || v.ps === 'unknown' || v.pc;
function dueCounts(){
  let voc = 0, blocked = 0, course = 0;
  ALL_VOCAB.forEach(v => { if(srsIsDue(v)){ if(isQueueBlocked(v)) blocked++; else voc++; } });
  Object.values(COURSE_EX_PROGRESS).forEach(p => { if(p && p.next_review && isDueByDay(courseParseTs(p.next_review))) course++; });
  return {voc, blocked, course};
}
function nextDueText(){
  const now = new Date(); let next = null;
  ALL_VOCAB.forEach(v => { if(isQueueBlocked(v)) return; const p = srsProgress[v.id]; if(p && p.next_review){ const d = new Date(p.next_review); if(!isDueByDay(d) && (!next || d < next)) next = d; } });
  Object.values(COURSE_EX_PROGRESS).forEach(p => { if(p && p.next_review){ const d = courseParseTs(p.next_review); if(!isDueByDay(d) && (!next || d < next)) next = d; } });
  if(!next) return 'bald';
  const day0 = d => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const diff = Math.round((day0(next) - day0(now)) / 86400000);
  return diff <= 0 ? 'heute noch' : diff === 1 ? 'morgen' : 'in ' + diff + ' Tagen';
}
function ring(p, size, w, color, txt){
  const r = (size - w) / 2, c = 2 * Math.PI * r, f = Math.max(0, Math.min(1, p));
  return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 '+size+' '+size+'" style="flex:none"><circle cx="'+size/2+'" cy="'+size/2+'" r="'+r+'" fill="none" stroke="var(--surface2)" stroke-width="'+w+'"/>'
    + '<circle cx="'+size/2+'" cy="'+size/2+'" r="'+r+'" fill="none" stroke="'+color+'" stroke-width="'+w+'" stroke-linecap="round" stroke-dasharray="'+(c*f).toFixed(1)+' '+c.toFixed(1)+'" transform="rotate(-90 '+size/2+' '+size/2+')"/>'
    + '<text x="50%" y="50%" dy=".35em" text-anchor="middle" fill="var(--text)" font-size="'+Math.round(size*0.24)+'" font-weight="700" font-family="inherit">'+(txt||'')+'</text></svg>';
}


/* ---------- Bilder für leere Zustände ---------- */
const ART = {
  tea: '<svg viewBox="0 0 160 100" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="80" cy="88" rx="60" ry="7"/><path d="M62 44h36l-3.500 38a6 6 0 0 1-6 5H71.500a6 6 0 0 1-6-5z"/><path d="M64.500 56h31l-2.200 26a5 5 0 0 1-5 4H71.700a5 5 0 0 1-5-4z" fill="rgba(201,168,76,.35)" stroke="none"/><path d="M80 40c-7-5 3-11-2-18M90 40c5-5-3-10 2-16" opacity=".55"/><path d="M82 46c1-10 8-16 15-15 0 9-6 15-15 15z" fill="var(--green)" stroke="var(--green)" opacity=".9"/><path d="M78 46c-1-10-8-16-15-15 0 9 6 15 15 15z" fill="var(--green)" stroke="var(--green)" opacity=".9"/><path d="M80 48V36" stroke="var(--green)"/></svg>',
  cat: '<svg viewBox="0 0 160 100" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 92V62h140v30"/><path d="M10 62h140"/><path d="M30 92V78a14 14 0 0 1 28 0v14M102 92V78a14 14 0 0 1 28 0v14" stroke="var(--blue)"/><path d="M62 62c-4-18 4-30 18-30s20 8 16 30" fill="var(--surface2)"/><circle cx="80" cy="24" r="12" fill="var(--surface2)"/><path d="M70 15l-2-10 9 5M90 15l2-10-9 5"/><path d="M96 60c14 0 22-8 20-20" /><circle cx="76" cy="23" r="1.3" fill="currentColor"/><circle cx="85" cy="23" r="1.3" fill="currentColor"/></svg>',
  jasmin: '<svg viewBox="0 0 160 100" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 92C50 80 70 60 90 36S130 14 146 12"/><path d="M52 78c-2-14 6-22 16-24-1 12-6 20-16 24zM96 54c4-12 14-16 24-14-3 12-12 18-24 14z" fill="var(--green)" stroke="var(--green)" opacity=".8"/><g fill="var(--surface)" stroke="var(--gold)"><path d="M86 30c-2-8 6-12 8-6 6-4 12 4 6 8 6 2 4 10-3 8-2 6-10 4-9-3-7 0-8-8-2-7z"/><path d="M124 16c-1-6 5-9 7-4 5-3 9 3 4 6 5 2 3 8-2 6-2 5-8 3-8-2-5 0-6-6-1-6z"/><path d="M56 70c-1-6 5-9 7-4 5-3 9 3 4 6 5 2 3 8-2 6-2 5-8 3-8-2-5 0-6-6-1-6z"/></g></svg>',
  sun: '<svg viewBox="0 0 160 100" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 78h140"/><path d="M50 78a30 30 0 0 1 60 0" fill="rgba(201,168,76,.25)" stroke="var(--gold)"/><path d="M80 34v-12M44 44l-8-8M116 44l8-8M26 62h-12M146 62h-12" stroke="var(--gold)"/><path d="M30 90h100" opacity=".5"/></svg>',
  moon: '<svg viewBox="0 0 160 100" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 90V66h140v24"/><path d="M96 20a28 28 0 1 0 22 44 24 24 0 0 1-22-44z" fill="rgba(201,168,76,.25)" stroke="var(--gold)"/><path d="M40 28l2 5 5 2-5 2-2 5-2-5-5-2 5-2zM130 36l1.500 3.500 3.500 1.500-3.500 1.500-1.500 3.500-1.500-3.500-3.500-1.500 3.500-1.500z" stroke="var(--gold)"/><path d="M30 90V76a12 12 0 0 1 24 0v14M106 90V76a12 12 0 0 1 24 0v14" stroke="var(--blue)"/></svg>',
  olive: '<svg viewBox="0 0 160 100" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14 80C46 74 84 60 148 26"/><g fill="var(--green)" stroke="var(--green)" opacity=".85"><path d="M34 76c-2-12 4-20 14-22 1 10-4 18-14 22zM58 68c-4-11 0-20 9-24 3 10-1 19-9 24zM84 58c-3-11 2-19 11-22 2 10-3 18-11 22zM110 44c-2-10 3-18 12-20 1 10-4 17-12 20zM46 80c8 2 16-2 20-10-9-2-17 2-20 10zM74 70c8 1 15-3 19-11-9-2-16 3-19 11zM100 58c7 1 14-3 17-10-8-2-14 2-17 10z"/></g><g fill="#2a2a1c" stroke="none"><ellipse cx="56" cy="58" rx="3.500" ry="5"/><ellipse cx="92" cy="44" rx="3.500" ry="5"/></g></svg>',
  sea: '<svg viewBox="0 0 160 100" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 74c10-6 20-6 30 0s20 6 30 0 20-6 30 0 20 6 30 0 10-3 10-3" stroke="var(--blue)"/><path d="M10 88c10-6 20-6 30 0s20 6 30 0 20-6 30 0 20 6 30 0" stroke="var(--blue)" opacity=".5"/><path d="M60 62h42l-6 10H66z"/><path d="M80 62V22l22 34H80M76 58 62 40l14-2" fill="var(--surface2)"/><circle cx="132" cy="24" r="10" stroke="var(--gold)" fill="rgba(201,168,76,.25)"/></svg>'
};
const artHtml = k => '<div class="neu-art" aria-hidden="true">'+ART[k]+'</div>';
window.neuArt = ART; window.neuArtHtml = artHtml;
/* ---------- Startseite „Heute“ ---------- */
const _cache = {};
async function loadActivity(){
  if(_cache.act && Date.now() - _cache.act.t < 120000) return _cache.act;
  const berlin = d => berlinDay(d);
  const midnight = new Date(); midnight.setHours(0,0,0,0);
  const now = new Date();
  const todayKey = berlin(now);
  const yest = new Date(now); yest.setDate(yest.getDate() - 1);
  const yKey = berlin(yest);
  const days = new Set(); let today = 0;
  const fetchPage = async page => {
    const r = await sbApi('review_log?user_id=eq.'+currentUser.id+'&select=created_at&order=created_at.desc&limit=1000&offset='+(page*1000));
    (r || []).forEach(x => { const d = new Date(x.created_at); days.add(berlin(d)); if(d >= midnight) today++; });
    return r || [];
  };
  // Serie bis gestern: aus dem Gedächtnis des Geräts, wenn gestern schon gezählt wurde, sonst komplett nachzählen
  let saved = null;
  try{ saved = JSON.parse(LS.get('neu-streak','null')); }catch(e){}
  let upToYesterday;
  let first;
  try{ first = await fetchPage(0); }
  catch(e){
    // kein Netz: gespeicherte Serie (bis gestern) + heute lokal gezählt
    if(saved && Number.isInteger(saved.n)){
      const todayLocal = window.neuLocalToday ? window.neuLocalToday() : 0;
      _cache.act = {t: Date.now() - 100000, today: todayLocal, streak: (saved.day === yKey ? saved.n : 0) + (todayLocal > 0 ? 1 : 0)};
      return _cache.act;
    }
    throw e;
  }
  if(saved && saved.day === yKey && Number.isInteger(saved.n)){
    upToYesterday = saved.n;
  } else {
    let page = 0, r = first;
    const walk = () => { let d = new Date(yest), k = yKey, n = 0; while(days.has(k)){ n++; d.setDate(d.getDate()-1); k = berlin(d); } return {n, k}; };
    for(;;){
      const w = walk();
      const oldest = r.length ? berlin(new Date(r[r.length-1].created_at)) : '';
      // fertig, wenn die Lücke im geladenen Bereich liegt oder keine älteren Daten mehr kommen
      if(r.length < 1000 || w.k > oldest || page >= 150){ upToYesterday = w.n; break; }
      page++; r = await fetchPage(page);
    }
  }
  LS.set('neu-streak', JSON.stringify({day:yKey, n:upToYesterday}));
  const streak = upToYesterday + (days.has(todayKey) ? 1 : 0);
  _cache.act = {t:Date.now(), today, streak};
  return _cache.act;
}
async function loadPartnerLine(){
  const el = $('neu-partner'); if(!el) return;
  try{
    const ps = await sbApi('users?is_partner=eq.true&select=username,last_active_at');
    const open = (await sbApiCount('vocabulary?partner_status=eq.rejected&select=id')) + (await sbApiCount('vocabulary?partner_status=eq.unknown&select=id')) + (await sbApiCount('vocabulary?partner_status=eq.suggested&select=id'));
    let last = null, name = 'Partner';
    (ps || []).forEach(p => { if(p.last_active_at){ const d = new Date(p.last_active_at); if(!last || d > last){ last = d; name = p.username || name; } } });
    let when = 'noch keine Aktivität';
    if(last){ const h = Math.floor((Date.now() - last) / 3600000); when = h < 1 ? 'vor weniger als einer Stunde' : h < 24 ? 'vor '+h+' Std.' : 'vor '+Math.floor(h/24)+' Tag'+(Math.floor(h/24)===1?'':'en'); }
    el.innerHTML = '<div style="flex:1;min-width:0"><div style="font-size:1rem">'+escHtml(name)+' zuletzt aktiv: '+when+'</div><div class="neu-sub" style="margin-top:2px">'+(open ? fmtN(open)+' Rückmeldung'+(open===1?'':'en')+' offen' : 'keine Rückmeldungen offen')+'</div></div><div class="neu-sub" style="font-size:1.4rem">›</div>';
  }catch(e){ el.style.display = 'none'; }
}
function lessonFilterChip(){
  if(typeof cLesson === 'undefined' || cLesson === 'all') return '';
  let label = cLesson;
  if(cLesson === 'COURSEVOCAB') label = 'Kurs-Lektion';
  return '<div style="margin-bottom:.6rem"><span class="neu-chip on" onclick="neuFilterOff()">Filter: '+escHtml(label)+' ✕</span></div>';
}
window.neuFilterOff = function(){ try{ filterLessonDropdown('all'); }catch(e){ cLesson = 'all'; } goHome(); };

/* Tagesdurchschnitte (7/14/30/90 Tage) aus review_log: erledigte Tage werden auf dem Gerät gemerkt,
   geladen wird nur, was seit dem letzten Mal dazukam. Berliner Kalendertage, heute zählt nicht mit. */
async function loadDayCounts(){
  if(_cache.dc && Date.now() - _cache.dc.t < 120000) return _cache.dc;
  const berlin = d => berlinDay(d);
  const now = new Date();
  const todayKey = berlin(now);
  const yest = new Date(now); yest.setDate(yest.getDate() - 1);
  const yKey = berlin(yest);
  let saved = null;
  try{ saved = JSON.parse(LS.get('neu-days4', 'null')); }catch(e){}
  const counts = {};
  let sinceISO;
  if(saved && saved.c && saved.upTo){
    Object.assign(counts, saved.c);
    // Berliner Mitternacht des Tages nach upTo liegt höchstens 3 Stunden vor 00:00 UTC dieses Tages
    sinceISO = new Date(new Date(saved.upTo + 'T00:00:00Z').getTime() + 86400000 - 3*3600000).toISOString();
  } else {
    sinceISO = new Date(now.getTime() - 91*86400000).toISOString();
  }
  // Gezählt werden pro Berliner Tag nur RICHTIGE Antworten (Vokabeln und Kurs-Übungen zusammen). Mehrfach richtig
  // am selben Tag ist selten, deshalb reicht die Anzahl; sie gilt für Tagesziel, heute geschafft und alle Schnitte.
  const fresh = {};
  let dcFailed = false;
  for(let page = 0; page < 40; page++){
    let r;
    try{ r = await sbApi('review_log?user_id=eq.'+currentUser.id+'&select=created_at&correct=eq.true&created_at=gte.'+sinceISO+'&order=created_at.desc&limit=1000&offset='+(page*1000)); }
    catch(e){ if(!saved) throw e; dcFailed = true; break; }
    (r || []).forEach(x => { const k = berlin(new Date(x.created_at)); fresh[k] = (fresh[k] || 0) + 1; });
    if(!r || r.length < 1000) break;
  }
  const lowest = saved && saved.upTo ? saved.upTo : '';
  Object.keys(fresh).forEach(k => { if(k > lowest) counts[k] = fresh[k]; });
  const today = Math.max(counts[todayKey] || 0, window.neuLocalToday ? window.neuLocalToday() : 0);
  // nur erledigte Tage (bis gestern) und höchstens 100 Tage merken
  const keep = {};
  const limit = new Date(now.getTime() - 100*86400000);
  Object.keys(counts).forEach(k => { if(k <= yKey && new Date(k + 'T12:00:00Z') >= limit) keep[k] = counts[k]; });
  LS.set('neu-days4', JSON.stringify({upTo: yKey, c: keep}));
  // Durchschnitt über die letzten N Tage vor heute; nur wenn so viele Tage Verlauf da sind
  const keys = Object.keys(keep).sort();
  const first = keys.length ? new Date(keys[0] + 'T12:00:00Z') : null;
  const span = first ? Math.round((new Date(yKey + 'T12:00:00Z') - first) / 86400000) + 1 : 0;
  const avgs = {};
  [7, 14, 30, 90].forEach(n => {
    if(span < n) return;
    let sum = 0;
    for(let i = 1; i <= n; i++){ const d = new Date(now); d.setDate(d.getDate() - i); sum += keep[berlin(d)] || 0; }
    avgs[n] = sum / n;
  });
  _cache.dc = {t: dcFailed ? Date.now() - 100000 : Date.now(), today, avgs, days: keep};   // bei Netzfehler bald neu versuchen
  return _cache.dc;
}
// Immer das höchste übertroffene Fenster zeigen (90 vor 30 vor 14 vor 7)
function motivation(done, avgs){
  for(const n of [90, 30, 14, 7]){
    if(avgs[n] > 0 && done > avgs[n]) return {n, avg: Math.round(avgs[n]), pct: Math.round((done / avgs[n] - 1) * 100)};
  }
  return null;
}

// Anfänger-Puffer (wie in der Statistik): Stufe 0 zählt 3, Stufe 1 zählt 2, Stufe 2 zählt 1, geteilt durch 3 — Vokabeln und Kurs-Übungen zusammen
function learnBuffer(part){
  let a = 0, b = 0, c = 0;
  if(part !== 'course') ALL_VOCAB.forEach(v => { const p = srsProgress[v.id]; if(p && p.next_review){ const lv = p.level || 0; if(lv === 0) a++; else if(lv === 1) b++; else if(lv === 2) c++; } });
  if(part !== 'vocab') Object.values(COURSE_EX_PROGRESS).forEach(p => { if(!p) return; const lv = Math.min(p.correct_count || 0, 6); if(lv === 0) a++; else if(lv === 1) b++; else if(lv === 2) c++; });
  return (a * 3 + b * 2 + c) / 3;
}
// Hinweis: wann neue Vokabeln / Kurs-Übungen aufgenommen werden sollten (immer nur die wichtigste Meldung)
//  Puffer < 40: Hinweis (gold) · < 25: knapp (rot) · < 10: sehr knapp (rot)
function hintCard(text, red){
  return '<div class="neu-card" style="border-color:'+(red?'var(--red)':'var(--gold-d)')+';background:'+(red?'rgba(201,76,76,.08)':'rgba(201,168,76,.08)')+';padding:.7rem 1rem">'
    + '<div style="font-weight:700;color:'+(red?'var(--red)':'var(--gold2)')+'">'+text+'</div></div>';
}
window.neuLearnBuffer = learnBuffer;
function newStuffHint(){
  if(cLesson !== 'all') return '';
  const w = learnBuffer();
  if(w < 10) return hintCard('Kaum noch etwas zu wiederholen. Nimm jetzt neue Vokabeln auf.', true);
  if(w < 25) return hintCard('Der Nachschub wird knapp. Zeit, Neues zu starten.', true);
  if(w < 40) return hintCard('Der Vorrat an Anfängerwörtern schrumpft. Zeit für Neues.', false);
  return '';
}

function goHome(){
  reset('home');
  const c = $('exercise-content'); if(!c) return;
  const d = dueCounts(), total = d.voc + d.course;
  const goal = parseInt(LS.get('neu-goal','100'), 10) || 100;
  const empty = total === 0;
  c.innerHTML = '<div class="neu-wrap neu-home">'
    + lessonFilterChip()
    + '<div class="neu-card" style="padding:.8rem 1rem"><div style="display:flex;align-items:center;gap:.9rem">'
    +   '<div id="neu-ring">'+ring(0, 76, 8, 'var(--gold)', '')+'</div>'
    +   '<div style="flex:1;min-width:0"><div class="neu-sub">Tagesziel (richtige Antworten)</div><div id="neu-goal-t" style="font-size:1.15rem;font-weight:700;margin:1px 0"><span class="neu-skel" style="width:2.2rem;height:1.1rem"></span> von '+goal+'</div><div id="neu-streak" class="neu-sub">&nbsp;</div></div>'
    + '</div><div id="neu-week" class="neu-week">'+Array(7).fill('<div class="neu-wd"><span class="neu-wdot neu-skel"></span><span class="neu-skel" style="width:1.4rem;height:.6rem"></span></div>').join('')+'</div></div>'
    + '<div id="neu-motiv"></div>'
    + '<div id="neu-new">'+newStuffHint()+'</div>'
    + (empty
      ? '<div class="neu-card" style="text-align:center;padding:.8rem">'+artHtml('tea')+'<div style="font-size:1.15rem;font-weight:700;color:var(--gold2)">Alles erledigt</div><div class="neu-sub" style="margin-top:.2rem">Nächste Wiederholung: <b style="color:var(--text)">'+nextDueText()+'</b></div></div>'
      : '<button class="neu-btn" style="min-height:56px;font-size:1.1rem;margin:0 0 .6rem" onclick="setMode(\'mix\')">Los geht’s · '+fmtN(total)+' fällig</button>')
    + '<div class="neu-row2" style="margin-bottom:.6rem">'
    +   '<button class="neu-btn ghost" style="flex-direction:column;align-items:flex-start;min-height:76px;padding:.6rem .9rem" '+(d.voc?'':'disabled')+' onclick="setMode(\'flash\')"><span class="neu-sub">Vokabeln</span><span style="font-size:1.5rem;line-height:1.1">'+fmtN(d.voc)+'</span><small>fällig'+(d.blocked?' · '+fmtN(d.blocked)+' gesperrt':'')+'</small></button>'
    +   '<button class="neu-btn ghost" style="flex-direction:column;align-items:flex-start;min-height:76px;padding:.6rem .9rem;border-color:#3b4f7a" '+(d.course?'':'disabled')+' onclick="setMode(\'coursesrs\')"><span class="neu-sub" style="color:var(--blue)">Kurs</span><span style="font-size:1.5rem;line-height:1.1">'+fmtN(d.course)+'</span><small>fällig</small></button>'
    + '</div>'
    + '<div id="neu-partner" class="neu-card" style="display:flex;align-items:center;gap:.8rem;cursor:pointer;padding:.7rem 1rem" onclick="setMode(\'partnerqueue\')"><div style="flex:1"><span class="neu-skel" style="width:60%;height:1.1rem"></span><div style="height:.4rem"></div><span class="neu-skel" style="width:40%;height:.8rem"></span></div></div>'
    + '<div class="neu-chips" style="padding-bottom:0">'
    +   '<span class="neu-chip" onclick="openActivateDialog()">Vokabeln fällig setzen</span>'
    +   '<span class="neu-chip" onclick="statsUnlockNextChunk()">Nächster Abschnitt</span>'
    +   '<span class="neu-chip" onclick="openPullForward()">Vorziehen</span>'
    +   '<span class="neu-chip" onclick="setMode(\'listen\')">Höraufgabe</span>'
    + '</div>'
    + '</div>';
  loadPartnerLine();
  if(typeof rcApplyIfIdle === 'function') setTimeout(rcApplyIfIdle, 300);   // frische Daten aus dem Hintergrund jetzt übernehmen
  Promise.all([loadActivity(), loadDayCounts()]).then(([a, dc]) => {
    const r = $('neu-ring'); if(!r || cMode !== 'home') return;
    const p = dc.today / goal;
    r.innerHTML = ring(p, 76, 8, p >= 1 ? 'var(--green)' : 'var(--gold)', Math.min(999, Math.round(p*100)) + ' %');
    $('neu-goal-t').textContent = fmtN(dc.today) + ' von ' + fmtN(goal);
    const wk = $('neu-week'); if(wk) wk.innerHTML = weekHtml(dc, goal);
    setTimeout(() => { try{ milesCheck(a.streak || 0); }catch(e){} }, 600);
    $('neu-streak').innerHTML = a.streak ? flame(a.streak) + a.streak + ' Tag' + (a.streak===1?'':'e') + ' in Folge' : 'Noch keine Serie';
  }).catch(() => { const s = $('neu-streak'); if(s) s.textContent = ''; });
  // Motivation: zählt nur, was heute tatsächlich geschafft (richtig beantwortet) ist — nicht, was noch geplant/fällig ist
  loadDayCounts().then(dc => {
    if(cMode !== 'home') return;
    const dng = dangerHtml(dc, goal, total), nw = $('neu-new');
    if(dng && nw) nw.innerHTML = dng;
    const el = $('neu-motiv'); if(el) el.innerHTML = motivationHtml(dc, goal);
  }).catch(() => {});
}
// Serien-Flamme: ab 7, 30 und 100 Tagen in anderer Farbe
function flame(n){
  const col = n >= 100 ? 'var(--red)' : n >= 30 ? '#d9822b' : n >= 7 ? 'var(--gold)' : 'var(--muted)';
  return '<svg class="neu-ic neu-flame" viewBox="0 0 24 24" fill="'+col+'" fill-opacity=".25" stroke="'+col+'" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c1 3.500 5 5.500 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 .2 1.500 1 2 1.500 2C10 8 11 5 12 3z"/></svg> ';
}
// Meilensteine: je Kategorie die höchste erreichte Marke und wie weit es bis zur nächsten ist
const MILES = [
  {key:'v', name:'Vokabeln gestartet', marks:[100,250,500,1000,1500,2000,3000,4000,5000]},
  {key:'p', name:'Profi-Vokabeln', marks:[50,100,250,500,1000,1500,2000,3000]},
  {key:'s', name:'Tage in Folge', marks:[3,7,14,30,60,100,200,365]}
];
function milesHtml(vals){
  return MILES.map(m => {
    const v = vals[m.key]; if(v == null) return '';
    const got = m.marks.filter(x => v >= x), nxt = m.marks.find(x => v < x), last = got.length ? got[got.length - 1] : 0;
    const pct = nxt ? Math.round((v - last) / (nxt - last) * 100) : 100;
    return '<div class="neu-mile"><div class="neu-mile-b'+(got.length ? ' on' : '')+'"><svg class="neu-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></svg></div>'
      + '<div style="flex:1;min-width:0"><div style="display:flex;justify-content:space-between;gap:.5rem"><b>'+m.name+'</b><span class="neu-sub">'+fmtN(v)+(nxt ? ' / '+fmtN(nxt) : '')+'</span></div>'
      + '<div class="neu-mbar"><i style="width:'+pct+'%"></i></div>'
      + '<div class="neu-sub" style="font-size:.78rem">'+(got.length ? 'Erreicht: '+fmtN(last)+(nxt ? ' · noch '+fmtN(nxt - v)+' bis '+fmtN(nxt) : ' · alle Marken erreicht') : 'Noch '+fmtN(nxt - v)+' bis zur ersten Marke ('+fmtN(nxt)+')')+'</div></div></div>';
  }).join('');
}
// Feier bei neuer Marke: Stand pro Kategorie merken; beim allerersten Mal nur merken, nicht feiern
function milesNow(streak){
  let v = 0, p = 0;
  ALL_VOCAB.forEach(x => { const q = srsProgress[x.id]; if(q && q.next_review){ v++; if((q.level || 0) >= 5) p++; } });
  return {v, p, s: streak};
}
function milesCheck(streak){
  if(!currentUser || !ALL_VOCAB.length) return;
  const now = milesNow(streak);
  let seen = null; try{ seen = JSON.parse(LS.get('neu-mseen', 'null')); }catch(e){}
  const reached = {}, fresh = [];
  MILES.forEach(m => {
    const val = now[m.key]; if(val == null) return;
    const mark = m.marks.filter(x => val >= x).pop() || 0;
    reached[m.key] = mark;
    if(seen && mark > (seen[m.key] || 0)) fresh.push({m, mark});
  });
  const merged = Object.assign({}, seen || {}, reached);
  LS.set('neu-mseen', JSON.stringify(merged));
  if(fresh.length) showCelebration(fresh[fresh.length - 1].m, fresh[fresh.length - 1].mark);
}
function showCelebration(m, mark){
  if($('neu-celeb')) return;
  const what = m.key === 'v' ? fmtN(mark)+' Vokabeln gestartet' : m.key === 'p' ? fmtN(mark)+' Profi-Vokabeln' : fmtN(mark)+' Tage in Folge';
  const o = document.createElement('div'); o.id = 'neu-celeb';
  o.innerHTML = '<div class="neu-celeb-box"><div class="neu-art">'+ART.sun+'</div><div class="neu-celeb-h">Neuer Meilenstein!</div><div class="neu-celeb-t">'+what+'</div><div class="neu-sub" style="margin:.3rem 0 1rem">Ya3tik es-sa77a — weiter so.</div><button class="neu-btn" onclick="document.getElementById(\'neu-celeb\').remove()">Weiter</button></div>';
  o.addEventListener('click', e => { if(e.target === o) o.remove(); });
  document.body.appendChild(o);
  try{ if(LS.get('neu-vib','0') === '1' && navigator.vibrate) navigator.vibrate([30, 40, 60]); }catch(e){}
}
window.neuMilesCheck = milesCheck;
// Tempo: wie viele Vokabeln wurden in den letzten 30 Tagen neu gestartet (erste Antwort im Zeitraum)? Pro Tag einmal berechnet.
async function loadPace(){
  const day = berlinDay(new Date());
  try{ const c = JSON.parse(LS.get('neu-pace', 'null')); if(c && c.day === day) return c.n; }catch(e){}
  const since = new Date(Date.now() - 30*86400000).toISOString();
  const cnt = {};
  for(let page = 0; page < 20; page++){
    const r = await sbApi('review_log?user_id=eq.'+currentUser.id+'&vocabulary_id=not.is.null&select=vocabulary_id&created_at=gte.'+since+'&order=id.desc&limit=1000&offset='+(page*1000));
    (r || []).forEach(x => { cnt[x.vocabulary_id] = (cnt[x.vocabulary_id] || 0) + 1; });
    if(!r || r.length < 1000) break;
  }
  let n = 0;
  Object.keys(cnt).forEach(id => { const p = srsProgress[id]; if(p && (p.review_count || 0) <= cnt[id]) n++; });
  LS.set('neu-pace', JSON.stringify({day, n}));
  return n;
}
function renderMilestones(vStarted, vTotal, vProfi){
  const el = $('neu-miles'); if(!el) return;
  el.innerHTML = milesHtml({v:vStarted, p:vProfi});
  loadActivity().then(a => { const e = $('neu-miles'); if(e && cMode === 'stats') e.innerHTML = milesHtml({v:vStarted, p:vProfi, s:a.streak || 0}); }).catch(() => {});
  loadPace().then(n => {
    const f = $('neu-forecast'); if(!f || cMode !== 'stats') return;
    const left = vTotal - vStarted;
    if(left <= 0){ f.textContent = 'Alle Vokabeln sind gestartet.'; return; }
    if(n < 5){ f.textContent = ''; return; }
    const perWeek = n / 30 * 7, weeks = Math.ceil(left / perWeek);
    f.innerHTML = 'Noch <b style="color:var(--text)">'+fmtN(left)+'</b> Vokabeln nicht gestartet. In den letzten 30 Tagen waren es etwa <b style="color:var(--text)">'+fmtN(Math.round(perWeek))+'</b> neue pro Woche — bei diesem Tempo sind alle in etwa <b style="color:var(--text)">'+(weeks > 104 ? 'mehr als 2 Jahren' : weeks > 12 ? Math.round(weeks / 4.3)+' Monaten' : weeks+' Woche'+(weeks === 1 ? '' : 'n'))+'</b> gestartet.';
  }).catch(() => {});
}
// Wochenstreifen: die letzten 6 Tage und heute; voll = Tagesziel erreicht, halb = etwas geschafft, leer = nichts
function weekHtml(dc, goal){
  const berlin = d => berlinDay(d);
  const wd = ['So','Mo','Di','Mi','Do','Fr','Sa'];
  let out = '';
  for(let i = 6; i >= 0; i--){
    const d = new Date(); d.setDate(d.getDate() - i);
    const n = i === 0 ? dc.today : ((dc.days || {})[berlin(d)] || 0);
    const cls = n >= goal ? 'full' : n > 0 ? 'part' : '';
    const lab = wd[new Date(berlin(d) + 'T12:00:00Z').getUTCDay()];
    out += '<div class="neu-wd'+(i === 0 ? ' today' : '')+'" title="'+fmtN(n)+' richtig"><span class="neu-wdot '+cls+'">'+(n >= goal ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.500 4.500 4.500L19 7.500"/></svg>' : '')+'</span><span>'+(i === 0 ? 'Heute' : lab)+'</span></div>';
  }
  return out;
}
// Meldung zum Durchschnitt (Startseite und Abschlussseite)
function motivationHtml(dc, goal){
  const card = inner => '<div class="neu-card" style="border-color:var(--gold-d);background:rgba(201,168,76,.08);padding:.7rem 1rem">'+inner+'</div>';
  // 1) Tagesziel erreicht, aber heute noch nicht über dem niedrigsten Schnitt: zeigen, wie viel noch fehlt
  const ws = [7, 14, 30, 90].filter(n => dc.avgs[n] > 0);
  if(dc.today >= goal && ws.length){
    const low = ws.reduce((b, n) => dc.avgs[n] < dc.avgs[b] ? n : b);
    const need = Math.floor(dc.avgs[low]) + 1 - dc.today;
    if(need > 0){
      const title = need <= 10 ? 'Fast geschafft! Nur noch '+fmtN(need)+', dann bist du über deinem Schnitt 💪'
        : need <= 40 ? 'Tagesziel geschafft — noch '+fmtN(need)+' und du bist über deinem Schnitt!'
        : 'Tagesziel geschafft! Bis über deinen Schnitt sind es noch '+fmtN(need)+'.';
      return card('<div style="font-weight:700;color:var(--gold2)">'+title+'</div>');
    }
  }
  // 2) sonst: heute Geschafftes liegt über einem Schnitt
  const m = motivation(dc.today, dc.avgs);
  if(!m) return '';
  return card('<div style="font-weight:700;color:var(--gold2)">Über deinem '+m.n+'-Tage-Schnitt</div><div class="neu-sub" style="margin-top:2px">Heute geschafft: <b style="color:var(--text)">'+fmtN(dc.today)+'</b> · Schnitt: '+fmtN(m.avg)+' (+'+m.pct+' %)</div>');
}
// Ziel in Gefahr: das Fällige reicht nicht, um das Tagesziel noch zu erreichen
function dangerHtml(dc, goal, total){
  if(dc.today < goal && total < goal - dc.today)
    return hintCard('Bis zum Tagesziel fehlen '+fmtN(goal - dc.today)+'. Nimm Neues auf oder zieh vor.', false);
  return '';
}
window.neuGoHome = goHome;
window.neuDayCounts = loadDayCounts;
window.neuActivity = loadActivity;

/* ---------- „Mehr“ ---------- */
function li(icon, label, act, extra){ return '<button onclick="'+act+'">'+IC[icon]+'<span class="sp">'+label+'</span>'+(extra||'<span class="chev">›</span>')+'</button>'; }
function sw(on, act){ return '<span class="neu-switch'+(on?' on':'')+'" onclick="event.stopPropagation();'+act+'"><i></i></span>'; }
function seg(opts, cur, act){ return '<div class="neu-seg">'+opts.map(([v,l]) => '<button class="'+(String(cur)===String(v)?'on':'')+'" onclick="'+act.replace('%v', v)+'">'+l+'</button>').join('')+'</div>'; }
function showMore(){
  reset('more');
  const c = $('exercise-content'); if(!c) return;
  const font = LS.get('neu-font','M'), goal = LS.get('neu-goal','100'), vib = LS.get('neu-vib','0') === '1';
  const lessonOpts = (()=>{ const s = $('lesson-select'); return s ? s.innerHTML : '<option value="all">Alle Lektionen</option>'; })();
  c.innerHTML = '<div class="neu-wrap">'
    + '<div style="font-size:1.5rem;font-weight:700;margin:.2rem 0 .4rem">Mehr</div>'
    + '<div class="neu-h">Lernen</div><div class="neu-card neu-list" style="padding:.3rem .9rem">'
    +   li('cards','Vokabelkarten',"setMode('flash')") + li('ear','Höraufgabe (Audio)',"setMode('listen')") + li('mic','Sprechen (Test)',"setMode('speak')") + li('repeat','Kurs-Wiederholung',"setMode('coursesrs')") + li('mix','Mix',"setMode('mix')") + li('pairs','Antwort-Paare',"setMode('pairs')")
    + '</div>'
    + '<div class="neu-h">Vokabeln pflegen</div><div class="neu-card neu-list" style="padding:.3rem .9rem">'
    +   li('plus','Vokabel hinzufügen',"setMode('addvocab')") + li('bolt','Aktivierung',"setMode('activate')") + li('book','Lektionen',"setMode('lessons')")
    + '</div>'
    + '<div class="neu-h">Prüfen und Quellen</div><div class="neu-card neu-list" style="padding:.3rem .9rem">'
    +   li('search','Prüfungen',"setMode('dupes')") + li('inbox','Partner-Queue',"setMode('partnerqueue')") + li('check','Partner-Check',"setMode('partnercheck')") + li('compass','Quellenabgleich',"setMode('quellen')") + li('abc','Transliterationsregeln',"setMode('translitregeln')") + li('save','Export',"setMode('export')")
    + '</div>'
    + '<div class="neu-h">Darstellung und Lernen</div><div class="neu-card">'
    +   '<div class="neu-cap">Farbschema</div>'+seg([['auto','Automatisch'],['light','Hell'],['dark','Dunkel']], LS.get('neu-theme','light'), "neuSetTheme('%v')")
    +   '<div class="neu-cap" style="margin-top:1rem">Schriftgröße</div>'+seg([['S','Klein'],['M','Mittel'],['L','Groß']], font, "neuSetFont('%v')")
    +   '<div class="neu-cap" style="margin-top:1rem">Arabische Schrift</div>'+seg([['naskh','Naskh'],['amiri','Amiri'],['schehe','Scheherazade'],['kufi','Kufi']], LS.get('neu-arf','naskh'), "neuSetArf('%v')")
    +   '<div style="height:.5rem"></div>'+seg([['0.85','Klein'],['1','Mittel'],['1.2','Groß'],['1.4','Sehr groß']], LS.get('neu-ars','1'), "neuSetArs('%v')")
    +   '<div class="neu-list" style="margin-top:.4rem"><div class="li"><span class="sp">Vokalzeichen anzeigen</span>'+sw(LS.get('neu-arv','1') === '1', "neuToggleArv()")+'</div></div>'
    +   '<div class="neu-arprev" id="neu-arprev">'+arPrev()+'</div>'
    +   '<div class="neu-cap" style="margin-top:1rem">Tagesziel (richtige Antworten pro Tag)</div>'+seg([[50,'50'],[100,'100'],[150,'150'],[200,'200']], goal, "neuSetGoal(%v)")
    +   '<div class="neu-list" style="margin-top:.6rem"><div class="li"><span class="sp">Audio beim Aufdecken abspielen</span>'+sw(audioAutoplay, "toggleAudioAutoplay();showMore()")+'</div>'
    +   '<div class="li"><span class="sp">Vibration bei Richtig und Falsch</span>'+sw(vib, "neuToggleVib()")+'</div></div>'
    +   '<div class="neu-cap" style="margin-top:1rem">Lektion einschränken</div>'
    +   '<select id="neu-lesson" onchange="neuLesson(this.value)" style="width:100%;min-height:48px;background:var(--surface2);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:0 .7rem;font-size:1rem">'+lessonOpts+'</select>'
    + '</div>'
    + '<div class="neu-h">Konto</div><div class="neu-card neu-list" style="padding:.3rem .9rem">'
    +   '<div class="li"><span class="sp neu-sub">'+escHtml(currentUser ? currentUser.username : '')+' · '+APP_VERSION+' (neu)</span></div>'
    +   li('bug','Debug',"toggleDebug()") + li('out','Abmelden',"doLogout()")
    + '</div>'
    + '</div>';
  const sel = $('neu-lesson');
  if(sel){ sel.value = cLesson; if(sel.value !== cLesson) sel.value = 'all'; }
}
function applyTheme(){
  const t = LS.get('neu-theme', 'light');
  const light = t === 'light' || (t === 'auto' && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches);
  document.documentElement.setAttribute('data-theme', light ? 'light' : 'dark');
  let m = document.querySelector('meta[name="theme-color"]');
  if(!m){ m = document.createElement('meta'); m.name = 'theme-color'; document.head.appendChild(m); }
  m.content = light ? '#f6f1e7' : '#0e0c0a';
}
applyTheme();
if(window.matchMedia) try{ window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', applyTheme); }catch(e){}
window.neuSetTheme = function(v){ LS.set('neu-theme', v); applyTheme(); showMore(); };
window.neuSetFont = function(k){ LS.set('neu-font', k); applyFont(); showMore(); };
window.neuSetGoal = function(n){ LS.set('neu-goal', String(n)); showMore(); };
window.neuToggleVib = function(){ LS.set('neu-vib', LS.get('neu-vib','0') === '1' ? '0' : '1'); if(LS.get('neu-vib') === '1' && navigator.vibrate) navigator.vibrate(30); showMore(); };
window.neuLesson = function(v){ const s = $('lesson-select'); if(s) s.value = v; try{ filterLessonDropdown(v); }catch(e){} goHome(); };

/* Vibration (Android), standardmäßig aus */
function vibe(ok){ if(LS.get('neu-vib','0') === '1' && navigator.vibrate) navigator.vibrate(ok ? 15 : [40,40,40]); }
const _srsAnswer = window.srsAnswer;
// Heute richtig beantwortet: lokal mitgezählt (Gerätespeicher), damit eine zu frühe Abfrage der Datenbank
// (Antworten sind noch unterwegs) den Tageswert nicht nach unten drückt. Zählt der Server mehr, gilt der Server.
const berlinKey = () => berlinDay(new Date());
const localToday = () => { try{ const o = JSON.parse(LS.get('neu-today','null')); return o && o.k === berlinKey() ? (o.n||0) : 0; }catch(e){ return 0; } };
window.neuLocalToday = localToday;
const adjustToday = delta => {
  try{ LS.set('neu-today', JSON.stringify({k: berlinKey(), n: Math.max(0, localToday() + delta)})); }catch(e){}
  if(_cache.dc){ _cache.dc.today = Math.max(0, _cache.dc.today + delta); _cache.dc.t = Date.now(); }
};
const bumpToday = ok => { if(ok) adjustToday(1); };
// Nachträgliche Korrekturen („War doch richtig/falsch“) verschieben den Tageswert um 1
['_applyFlashCorrection', 'courseCorrectAnswer'].forEach(n => {
  const f = window[n];
  if(typeof f === 'function') window[n] = function(a, toOk){
    adjustToday(toOk ? 1 : -1);
    return f.apply(this, arguments);
  };
});
if(_srsAnswer) window.srsAnswer = function(v, ok){ vibe(ok); bumpToday(ok); return _srsAnswer.apply(this, arguments); };
const _courseExAnswer = window.courseExAnswer;
if(_courseExAnswer) window.courseExAnswer = function(ex, ok){ vibe(ok); bumpToday(ok); return _courseExAnswer.apply(this, arguments); };

/* ---------- Höraufgaben im normalen Lernen (Richtung „Audio → Deutsch“) ---------- */
// Nur bei eingeschaltetem Ton (Lautsprecher-Schalter unten) und eingeschalteter Einstellung, nur für Vokabeln mit Audio.
window.neuPickDir = function(v, lvl){
  const base = lvl >= 3 ? 'de2ar' : (Math.random() > .5 ? 'ar2de' : 'de2ar');
  if(!audioAutoplay || LS.get('neu-listen','1') !== '1' || !v.au || navigator.onLine === false) return base;   // ohne Netz kein Ton: normale Karte
  return Math.random() < (lvl >= 3 ? 0.3 : 0.5) ? 'au2de' : base;
};
window.neuToggleListen = function(){ LS.set('neu-listen', LS.get('neu-listen','1') === '1' ? '0' : '1'); showMore(); };

/* ---------- Leerer Zustand in der Sitzung ---------- */
function nothingDue(){
  const c = $('exercise-content'); if(!c) return;
  const sn = $('sticky-next'); if(sn) sn.style.display = 'none';
  // Ist im anderen Bereich (Vokabeln <-> Kurs) noch etwas fällig, zuerst dorthin weiterführen statt Vorziehen anzubieten
  const d = dueCounts();
  const go = [];
  if(d.voc > 0 && cMode !== 'flash') go.push('<button class="neu-btn" onclick="setMode(\'flash\')">Weiter mit Vokabeln · '+fmtN(d.voc)+' fällig</button>');
  if(d.course > 0 && cMode !== 'coursesrs') go.push('<button class="neu-btn blue" onclick="setMode(\'coursesrs\')">Weiter mit Kurs · '+fmtN(d.course)+' fällig</button>');
  const part = cMode === 'coursesrs' ? 'Kurs' : cMode === 'flash' ? 'Vokabeln' : 'Hier';
  const rest = '<button class="neu-btn '+(go.length?'ghost':'')+'" onclick="openActivateDialog()">Vokabeln fällig setzen</button>'
    + '<button class="neu-btn '+(go.length?'ghost':'blue')+'" onclick="statsUnlockNextChunk()">Nächsten Kurs-Abschnitt freischalten</button>'
    + '<button class="neu-btn line" onclick="openPullForward()">Vorziehen</button>'
    + '<button class="neu-btn ghost" onclick="neuGoHome()">Zur Startseite</button>';
  c.innerHTML = '<div class="neu-wrap" style="text-align:center;padding-top:2rem">'
    + artHtml(go.length ? 'sun' : 'cat')
    + '<div style="font-size:1.5rem;font-weight:700;color:var(--gold2)">'+(go.length ? part+' erledigt' : 'Alles erledigt')+'</div>'
    + '<div class="neu-sub" style="margin:.5rem 0 1.4rem">'+(go.length ? 'Im anderen Bereich ist noch etwas fällig.' : 'Nichts fällig. Nächste Wiederholung: <b style="color:var(--text)">'+nextDueText()+'</b>')+'</div>'
    + '<div style="display:flex;flex-direction:column;gap:.7rem;text-align:left">'
    +   go.join('')
    +   (go.length ? '<div class="neu-sub" style="margin:.4rem 0 -.2rem;text-align:center">oder</div>' : '')
    +   rest
    + '</div></div>';
  $('ex-type-label').textContent = ''; $('ex-progress').textContent = '';
}
window.showNothingDue = nothingDue;
window.showCourseNothingDue = nothingDue;

/* ---------- Abschluss nach einem Block ---------- */
window.showRes = function(){
  const pct = score.t > 0 ? Math.round(score.c / score.t * 100) : 0;
  const msgs = pct >= 90 ? ['مَشَاءَ الله! Masha allah!', 'زِين بَرشَة! Zin barsha!']
    : pct >= 70 ? ['مْلِيح بَرشَة Mli7 barsha!', 'هَكَّة نَعرَف! Hakka na3ref!']
    : pct >= 50 ? ['شْوَيَّة شْوَيَّة Shwayya shwayya', 'عَاوِد مَرَّة أُخرى 3awid marra okhra']
    : ['يَالَّة، عَاوِد! Yalla, 3awid!', 'صَبرَا جَمِيل Sabra jmil'];
  const r = $('result-screen');
  // Nur eine Zahlenangabe zum Block (Ring: 9 / 10); darunter, wie viel heute noch fällig ist
  const d = dueCounts(), left = d.voc + d.course;
  const dueRow = left
    ? '<div class="rows"><div><span>Heute noch fällig<small>Vokabeln '+fmtN(d.voc)+' · Kurs '+fmtN(d.course)+'</small></span><b style="color:var(--gold2);font-size:1.4rem">'+fmtN(left)+'</b></div></div>'
    : '<div class="rows"><div><span>Heute noch fällig</span><b style="color:var(--green)">nichts mehr</b></div></div>';
  r.innerHTML = '<div class="neu-res">'
    + ring(pct/100, 150, 12, pct >= 70 ? 'var(--green)' : 'var(--gold)', score.c + ' / ' + score.t)
    + artHtml(pct >= 70 ? 'jasmin' : 'sun')
    + '<div class="msg">'+(pct>=70?'Gut gemacht':'Weiter üben')+'</div>'
    + '<div class="sub">'+msgs[Math.floor(Math.random()*msgs.length)]+'</div>'
    + '<div id="neu-res-msg" style="width:100%"></div>'
    + dueRow
    + '<div style="width:100%;display:flex;flex-direction:column;gap:.7rem"><button class="neu-btn" onclick="restartExercise()">Noch einen Block</button><button class="neu-btn ghost" onclick="closeResult();neuGoHome()">Fertig für heute</button></div>'
    + '</div>';
  r.classList.add('show');
  // Meldung zum Durchschnitt bzw. zum Aufnehmen von Neuem (die wichtigste), sobald die Tageswerte da sind
  loadDayCounts().then(dc => {
    const el = $('neu-res-msg'); if(!el) return;
    const goal = parseInt(LS.get('neu-goal','100'), 10) || 100;
    el.innerHTML = motivationHtml(dc, goal) || dangerHtml(dc, goal, left) || newStuffHint();
  }).catch(() => {});
  loadActivity().then(a => setTimeout(() => { try{ milesCheck(a.streak || 0); }catch(e){} }, 900)).catch(() => {});
};

/* ---------- Kurs als Lernpfad ---------- */
window.renderCourseOverview = function(){
  const c = $('exercise-content'); if(!c) return;
  reset('course'); cMode = 'course';
  if(!COURSE_LESSONS.length){ c.innerHTML = '<div class="neu-wrap" style="text-align:center;padding:3rem;color:var(--muted)">Noch keine Kurs-Lektionen angelegt.</div>'; return; }
  const chunks = courseFlattenChunks();
  const pc = (a,b) => b ? Math.round(100*a/b) : 0;
  const vocStat = list => { let n=0, pts=0; list.forEach(v=>{ const p=srsProgress[v.id]; if(p && p.next_review){ n++; pts += Math.min(p.level||0,6); } }); return {n, total:list.length, pts, max:n*6}; };
  const exStat = list => { let n=0, pts=0; list.forEach(e=>{ const p=COURSE_EX_PROGRESS[e.id]; if(p){ n++; pts += Math.min(p.correct_count||0,6); } }); return {n, total:list.length, pts, max:n*6}; };
  const cell = (icon, a, b) => '<div class="c" style="color:'+(b && a>=b ? 'var(--green)' : 'var(--gold2)')+'">'+icon+' '+pc(a,b)+' %<small>'+fmtN(a)+' / '+fmtN(b)+'</small></div>';
  const line = (label, st) => '<div class="neu-stat"><div class="l">'+label+'</div>'+cell('📅',st.n,st.total)+cell('⭐',st.pts,st.max)+'</div>';
  const cleanTitle = t => String(t||'').replace(/^Lektion\s*\d+\s*[—–-]\s*/i, '');
  const lessonVocab = l => { const f = parseCourseVocabRefs(l.vocab_lesson_refs); return ALL_VOCAB.filter(v => f.ids.has(v.id) || f.tr.has(v.tr)); };
  const allV = new Map(); COURSE_LESSONS.forEach(l => lessonVocab(l).forEach(v => allV.set(v.id, v)));
  const allItems = chunks.reduce((s,ch) => s.concat(ch.srsItems), []);
  let nextId = null, firstOpen = null;
  COURSE_LESSONS.forEach(l => {
    const items = chunks.filter(ch => ch.lessonId === l.id).reduce((s,ch) => s.concat(ch.srsItems), []);
    const total = items.length;
    const unlocked = items.filter(e => COURSE_EX_PROGRESS[e.id]).length;
    const mastered = items.filter(e => COURSE_EX_PROGRESS[e.id] && (COURSE_EX_PROGRESS[e.id].correct_count||0) >= 4).length;
    const st = total === 0 ? 'read' : mastered >= total ? 'done' : unlocked > 0 ? 'run' : 'lock';
    if(st === 'run') nextId = l.id; // aktuell = höchste Lektion mit freigeschalteten, noch nicht gemeisterten Übungen
    if(st !== 'done' && st !== 'read' && firstOpen === null) firstOpen = l.id;
  });
  const curId = nextId !== null ? nextId : firstOpen;
  const nodes = COURSE_LESSONS.map(l => {
    const lc = chunks.filter(ch => ch.lessonId === l.id);
    const items = lc.reduce((s,ch) => s.concat(ch.srsItems), []);
    const total = items.length;
    const unlocked = items.filter(e => COURSE_EX_PROGRESS[e.id]).length;
    const mastered = items.filter(e => COURSE_EX_PROGRESS[e.id] && (COURSE_EX_PROGRESS[e.id].correct_count||0) >= 4).length;
    const state = total === 0 ? 'read' : mastered >= total ? 'done' : unlocked > 0 ? 'run' : 'lock';
    const frac = total ? mastered / total : 0;
    const col = state === 'done' ? 'var(--green)' : state === 'run' ? 'var(--gold)' : 'var(--border)';
    const txt = state === 'done' ? '✓' : state === 'read' ? '–' : Math.round(frac*100);
    const sub = state === 'read' ? 'nur Lesen' : state === 'done' ? 'abgeschlossen' : state === 'run' ? fmtN(mastered)+' von '+fmtN(total)+' Übungen gemeistert' : 'noch nicht freigeschaltet';
    const lv = lessonVocab(l);
    const stats = (lv.length ? line('Vokabeln', vocStat(lv)) : '') + (total ? line('Übungen', exStat(items)) : '');
    return '<div class="neu-node'+(state==='lock'?' lock':'')+(l.id===curId?' cur':'')+'" onclick="showCourseLesson('+l.id+')">'
      + '<div class="top">'+ring(state==='lock'?0:frac, 54, 6, col, txt)
      + '<div class="tx"><div class="t1">Lektion '+l.course_number+(l.id===curId?' <span class="neu-chip on" style="min-height:22px;padding:0 .5rem;font-size:.72rem;vertical-align:middle">aktuell</span>':'')+'</div><div class="t2">'+escHtml(cleanTitle(l.title))+'</div><div class="t3" style="color:'+(state==='run'?'var(--gold2)':'var(--muted)')+'">'+sub+'</div></div>'
      + '<div style="color:var(--muted);font-size:1.3rem">›</div></div>'
      + (stats ? '<div class="st">'+stats+'</div>' : '')
      + (lv.length ? '<div style="margin-top:.6rem"><span class="neu-chip" onclick="event.stopPropagation();courseGoToVocab('+l.id+')">Vokabeln der Lektion</span></div>' : '')
      + '</div>';
  }).join('');
  c.innerHTML = '<div class="neu-wrap">'
    + '<div style="font-size:1.5rem;font-weight:700;margin:.2rem 0 .6rem">Kurs</div>'
    + (curId !== null ? '<button class="neu-btn" style="margin:0 0 .7rem" onclick="showCourseLesson('+curId+')">Weiter mit Lektion '+(COURSE_LESSONS.find(l => l.id === curId) || {}).course_number+'</button>' : '')
    + '<div class="neu-card"><div class="neu-cap">Gesamt</div>'+line('Vokabeln', vocStat([...allV.values()]))+line('Übungen', exStat(allItems))+'</div>'
    + '<div class="neu-card neu-path" style="padding:.2rem .9rem">'+nodes+'</div>'
    + '</div>';
};

/* ---------- Vokabelliste als Karten ---------- */
const NEUF = {due:false, neu:false, audio:false, flag:false, select:false};
window.neuChipsHtml = function(){
  const c = (k, l) => '<span class="neu-chip'+(NEUF[k]?' on':'')+'" data-k="'+k+'" onclick="neuVChip(\''+k+'\')">'+l+'</span>';
  return '<div class="neu-chips" id="neu-vchips">'+c('due','Fällig')+c('neu','Ohne Fälligkeit')+c('audio','Mit Audio')+c('flag','Markiert')+'<span id="neu-vreset" class="neu-chip" style="display:none" onclick="neuVReset()">Filter zurücksetzen</span></div>';
};
window.neuVChip = function(k){
  NEUF[k] = !NEUF[k];
  document.querySelectorAll('#neu-vchips .neu-chip').forEach(e => e.classList.toggle('on', !!NEUF[e.dataset.k]));
  filterVocabList();
};
window.neuToggleSelect = function(){
  NEUF.select = !NEUF.select;
  if(!NEUF.select){ try{ selectedVocabIds.clear(); updateBulkBar(); }catch(e){} }
  renderVocabTableRows();
};
window.neuRowTap = function(ev, id, i){
  if(NEUF.select){
    if(ev.target.closest('button')) return;
    const cb = ev.currentTarget.querySelector('input[type=checkbox]');
    if(cb && ev.target !== cb){ cb.checked = !cb.checked; toggleVocabSelect(cb); }
    return;
  }
  if(ev.target.closest('button,input')) return;
  openVocabEdit(id, i);
};
function applyChips(vocab){
  if(NEUF.due) vocab = vocab.filter(v => srsIsDue(v));
  if(NEUF.neu) vocab = vocab.filter(v => { const p = srsProgress[v.id]; return !(p && p.next_review); });
  if(NEUF.audio) vocab = vocab.filter(v => !!v.au);
  if(NEUF.flag) vocab = vocab.filter(v => flaggedVocab.has(v.tr));
  return vocab;
}
const _rvt = window.renderVocabTable;
window.renderVocabTable = function(vocab){ return _rvt.call(this, applyChips(vocab)); };
const _svl = window.showVocabList;
window.showVocabList = function(){
  NEUF.due = NEUF.neu = NEUF.audio = NEUF.flag = NEUF.select = false;
  let sv = null; try{ sv = JSON.parse(LS.get('neu-vfilter', 'null')); }catch(e){}
  if(sv){ ['due','neu','audio','flag'].forEach(k => { NEUF[k] = !!(sv.chips && sv.chips[k]); }); }
  const r = _svl.apply(this, arguments);
  if(sv && cLesson !== 'COURSEVOCAB'){
    try{
      const set = (id, val, apply) => { const e = $(id); if(e && val != null && val !== 'all'){ e.value = val; apply(); } };
      if(sv.lvl != null && sv.lvl !== 'all'){ vocabLevelFilter = sv.lvl; const e = $('lvl-filter-select'); if(e) e.value = String(sv.lvl); }
      set('vl-topic-filter', sv.tp, () => { vocabTopicFilter = $('vl-topic-filter').value; });
      set('vl-ls-filter', sv.ls, () => { vocabLsFilter = $('vl-ls-filter').value; });
      set('vl-ps-filter', sv.ps, () => { vocabPsFilter = $('vl-ps-filter').value; });
      set('vl-audio-filter', sv.au, () => { vocabAudioFilter = $('vl-audio-filter').value; });
      const q = $('vocab-search'); if(q && sv.q) q.value = sv.q;
      document.querySelectorAll('#neu-vchips .neu-chip[data-k]').forEach(e => e.classList.toggle('on', !!NEUF[e.dataset.k]));
      filterVocabList();
    }catch(e){}
  }
  updVReset();
  return r;
};
function vState(){
  const g = id => { const e = $(id); return e ? e.value : 'all'; };
  return {q: ($('vocab-search') || {}).value || '', chips: {due:NEUF.due, neu:NEUF.neu, audio:NEUF.audio, flag:NEUF.flag},
    lvl: vocabLevelFilter, tp: g('vl-topic-filter'), ls: g('vl-ls-filter'), ps: g('vl-ps-filter'), au: g('vl-audio-filter')};
}
function vActive(st){ return !!(st.q || Object.values(st.chips).some(Boolean) || st.lvl !== 'all' || ['tp','ls','ps','au'].some(k => st[k] && st[k] !== 'all')); }
function updVReset(){ const b = $('neu-vreset'); if(b) b.style.display = vActive(vState()) ? '' : 'none'; }
const _fvl = window.filterVocabList;
window.filterVocabList = function(){
  const r = _fvl.apply(this, arguments);
  if(cMode === 'vocab' && $('vocab-search')){ LS.set('neu-vfilter', JSON.stringify(vState())); updVReset(); }
  return r;
};
window.neuVReset = function(){
  NEUF.due = NEUF.neu = NEUF.audio = NEUF.flag = false;
  vocabLevelFilter = 'all'; vocabTopicFilter = vocabLsFilter = vocabPsFilter = vocabAudioFilter = 'all';
  ['lvl-filter-select','vl-topic-filter','vl-ls-filter','vl-ps-filter','vl-audio-filter'].forEach(id => { const e = $(id); if(e) e.value = 'all'; });
  const q = $('vocab-search'); if(q) q.value = '';
  const d = $('due-until-filter'); if(d) d.value = '';
  document.querySelectorAll('#neu-vchips .neu-chip[data-k]').forEach(e => e.classList.remove('on'));
  filterVocabList();
};
// Trefferhervorhebung
function hl(text, q, raw){
  text = String(text == null ? '' : text);
  const esc = raw ? (x => x) : escHtml;
  if(!q) return esc(text);
  const i = text.toLowerCase().indexOf(q);
  if(i < 0) return esc(text);
  return esc(text.slice(0, i)) + '<mark class="neu-hit">' + esc(text.slice(i, i + q.length)) + '</mark>' + esc(text.slice(i + q.length));
}


window.renderVocabTableRows = function(){
  const vocabFull = vocabFilteredFull;
  const el = $('vocab-table'); if(!el) return;
  el.classList.toggle('neu-sel', NEUF.select);
  const hq = (($('vocab-search') || {}).value || '').trim().toLowerCase();
  const top = '<div style="display:flex;justify-content:space-between;align-items:center;margin:.1rem 0 .6rem;min-height:40px;font-size:.9rem;color:var(--muted)">'
    + (NEUF.select ? '<label style="display:flex;align-items:center;gap:.5rem;cursor:pointer"><input type="checkbox" id="vl-check-all" onchange="toggleSelectAll(this)" style="width:20px;height:20px"> Alle</label>' : '<span>'+fmtN(vocabFull.length)+(hq ? (vocabFull.length === 1 ? ' Treffer für „' : ' Treffer für „')+escHtml(hq)+'“' : (vocabFull.length === 1 ? ' Vokabel' : ' Vokabeln'))+'</span>')
    + '<span class="neu-chip'+(NEUF.select?' on':'')+'" onclick="neuToggleSelect()">'+(NEUF.select?'Fertig':'Auswählen')+'</span></div>';
  if(!vocabFull.length){ el.innerHTML = top + '<div style="text-align:center;color:var(--muted);padding:2rem">Keine Vokabeln gefunden</div>'; vocabTableRenderedIds = []; return; }
  const vocab = vocabFull.slice(0, vocabVisibleCount);
  vocabTableRenderedIds = vocab.map(v => v.id);
  let h = top + '<div class="neu-vlist">';
  vocab.forEach((v,i) => {
    const p = v.id ? srsProgress[v.id] : null;
    const level = p ? (p.level||0) : 0;
    const started = !!(p && p.next_review);
    const col = started ? ['var(--lv0)','var(--lv1)','var(--lv2)','var(--lv3)','var(--lv4)','var(--lv5)','var(--lv6)'][Math.min(level,6)] : 'var(--border)';
    const due = started ? fmtDue(p.next_review) : '';
    const isDueNow = started && srsIsDue(v);
    const flag = flaggedVocab.has(v.tr) ? ' 🚩' : '';
    const conj = v.cj || v.cr ? ' <button onclick="event.stopPropagation();showConjModal('+v.id+')" title="Konjugationstabelle" style="background:none;border:none;color:inherit;cursor:pointer;padding:0 .2rem;font-size:1em">🔠</button>' : '';
    const ps = v.ps;
    const psIcon = ps==='approved'?'✅' : ps==='rejected'?'❌' : ps==='unknown'?'❓' : ps==='pending'?'⏳' : ps==='skipped'?'⏭' : ps==='suggested'?'💡' : '';
    const audio = v.au ? '<button class="ib" onclick="event.stopPropagation();playVocabAudio(\''+v.au.replace(/'/g,"\\'")+'\',event,'+(v.aus||0)+','+(v.aue||0)+')" title="Aussprache" aria-label="Aussprache">🔊</button>' : '';
    h += '<div class="neu-vrow" onclick="neuRowTap(event,'+(v.id||0)+','+i+')"><input type="checkbox" data-vid="'+v.id+'" onchange="toggleVocabSelect(this)"'+(selectedVocabIds.has(v.id)?' checked':'')+'/>'
      + '<div class="ar">'+hl(v.ar, hq, true)+'</div>'
      + '<div class="mid"><div class="t1">'+hl(v.en, hq)+'</div><div class="t2 neu-mono">'+hl(v.tr, hq)+conj+'</div><div class="t2">'+v.ls+flag+(psIcon?' · '+psIcon:'')+'</div></div>'
      + '<div class="rt"><div class="lv"><span class="dot" style="background:'+col+'"></span>'+(started?'Stufe '+level:'Neu')+'</div><div class="t2" style="'+(isDueNow?'color:var(--red)':'')+'">'+(started?due:'—')+'</div>'+(audio?'<div style="margin-top:.3rem">'+audio+'</div>':'')+'</div></div>';
  });
  h += '</div>';
  if(vocab.length < vocabFull.length){
    h += '<div style="text-align:center;margin-top:.9rem"><button class="neu-btn ghost" style="width:auto;display:inline-flex;padding:0 1.4rem" onclick="loadMoreVocabRows()">Mehr laden ('+fmtN(vocabFull.length - vocab.length)+' weitere)</button></div>';
  }
  el.innerHTML = h;
  updateBulkBar();
};

/* ---------- Vokabel bearbeiten: Zusammenfassung, Audio, Schnellknöpfe ---------- */
const _ove = window.openVocabEdit;
window.openVocabEdit = function(id, i){ _ove.apply(this, arguments); setTimeout(() => fillSheet(id), 40); };
function fillSheet(id){
  const v = vById(id); if(!v) return;
  const p = srsProgress[id];
  const parts = [escHtml(v.ls||'')];
  if(p && p.next_review) parts.push('Stufe '+(p.level||0), fmtDue(p.next_review), (p.review_count||0)+'× geübt');
  else parts.push('noch nicht gestartet');
  const sum = $('ei-summary'); if(sum) sum.innerHTML = parts.join(' · ');
  const au = $('ei-audio'); if(au) au.style.display = v.au ? '' : 'none';
}
window.neuEditAudio = function(){ const v = vById(_editSheetVocabId); if(v && v.au) playVocabAudio(v.au, null, v.aus||0, v.aue||0); };
window.neuDueNow = function(){ const e = $('ei-nr'); if(e) e.value = toLocalInputDE(new Date()); };
window.neuLvl = function(d){ const e = $('ei-lvl'); if(e) e.value = Math.max(0, Math.min(6, (parseInt(e.value,10)||0) + d)); };

/* ---------- Höraufgabe: Audio hören, Bedeutung wählen (ohne Fortschrittswertung) ---------- */
let LQ = null;
function startListen(){
  if(navigator.onLine === false){ showToast('Offline – die Höraufgabe braucht Internet', 'warn'); return; }
  const pool = ALL_VOCAB.filter(v => v.au && v.en && !isQueueBlocked(v));
  if(pool.length < 4){ showToast('Zu wenige Vokabeln mit Audio','warn'); return; }
  reset('listen');
  score = {c:0, w:0, t:0, st:0};
  const started = pool.filter(v => srsProgress[v.id] && srsProgress[v.id].next_review);
  const base = started.length >= 10 ? started : pool;
  LQ = {deck: sh(base).slice(0, 10), i: 0, pool, done: false};
  renderListen();
}
function renderListen(){
  const c = $('exercise-content'); if(!c || !LQ) return;
  const v = LQ.deck[LQ.i];
  const wrong = sh(LQ.pool.filter(x => x.id !== v.id && x.en !== v.en)).slice(0, 3);
  LQ.opts = sh([v].concat(wrong));
  LQ.answered = false;
  $('neu-prog-fill').style.width = Math.round(LQ.i / LQ.deck.length * 100) + '%';
  $('neu-prog-n').textContent = (LQ.i + 1) + ' / ' + LQ.deck.length;
  c.innerHTML = '<div class="neu-wrap">'
    + '<div class="neu-card" style="text-align:center;padding:1.4rem"><div class="neu-sub">Was bedeutet das Wort?</div>'
    + '<button class="neu-btn" style="width:112px;height:112px;min-height:0;border-radius:56px;margin:1rem auto .4rem;font-size:2.2rem" onclick="neuListenPlay()" aria-label="Abspielen">'+IC.ear.replace('<svg','<svg style="width:46px;height:46px;stroke:#17120a;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round"')+'</button>'
    + '<div class="neu-sub">Tippen zum erneuten Abspielen</div><div id="neu-listen-rev" style="min-height:4.2rem;margin-top:.8rem"></div></div>'
    + '<div style="display:flex;flex-direction:column;gap:.6rem">'
    + LQ.opts.map((o,i) => '<button class="neu-btn ghost" id="neu-lo-'+i+'" style="justify-content:flex-start;text-align:left" onclick="neuListenPick('+i+')">'+escHtml(o.en)+'</button>').join('')
    + '</div><div id="neu-listen-next" style="margin-top:.8rem"></div>'
    + '<div class="neu-sub" style="text-align:center;margin-top:1rem">Übung ohne Fortschrittswertung</div></div>';
  neuListenPlay();
}
window.neuListenPlay = function(){ if(!LQ) return; const v = LQ.deck[LQ.i]; playVocabAudio(v.au, null, v.aus||0, v.aue||0); };
window.neuListenPick = function(i){
  if(!LQ || LQ.answered) return;
  LQ.answered = true;
  const v = LQ.deck[LQ.i], ok = LQ.opts[i].id === v.id;
  score.t++; if(ok) score.c++; else score.w++;
  vibe(ok);
  LQ.opts.forEach((o,k) => { const b = $('neu-lo-'+k); b.style.pointerEvents = 'none'; if(o.id === v.id){ b.style.borderColor = 'var(--green)'; b.style.color = 'var(--green)'; } else if(k === i){ b.style.borderColor = 'var(--red)'; b.style.color = 'var(--red)'; } });
  $('neu-listen-rev').innerHTML = '<div style="font-size:2.2rem;color:var(--gold2);direction:rtl;font-family:\'Noto Naskh Arabic\',\'Amiri\',serif">'+v.ar+'</div><div class="neu-mono" style="font-size:1.1rem">'+escHtml(v.tr)+'</div>';
  const last = LQ.i >= LQ.deck.length - 1;
  $('neu-listen-next').innerHTML = '<button class="neu-btn" onclick="neuListenNext()">'+(last ? 'Ergebnis' : 'Weiter')+'</button>';
};
window.neuListenState = () => LQ;
window.neuListenNext = function(){ if(!LQ) return; LQ.i++; if(LQ.i >= LQ.deck.length){ showRes(); } else renderListen(); };

/* ---------- Sprechen (Test): Wort auf Tounsi sagen, Spracherkennung des Browsers vergleicht mit der Vokabel ---------- */
let SQ = null;
const AR_FOLD = {'أ':'ا','إ':'ا','آ':'ا','ٱ':'ا','ى':'ي','ة':'ه','ؤ':'و','ئ':'ي','ڨ':'ق','ڤ':'ف','پ':'ب','چ':'ج','گ':'ق'};
// Gerüst: ohne Vokalzeichen, Dehnungsbuchstaben und Wortgrenzen; Schreibvarianten vereinheitlicht
function arSkel(t){
  return String(t || '').replace(/[ً-ٰٟـ]/g, '').replace(/[أإآٱىةؤئڨڤپچگ]/g, c => AR_FOLD[c]).replace(/[^ء-ي]/g, '').replace(/^ال(?=..)/, '').replace(/[اويء]/g, '').replace(/(?<=.)ه$/, '');   // Wortende -a (ه, ة, ى) zählt nicht
}
function lev(a, b){
  const m = a.length, n = b.length; if(!m) return n; if(!n) return m;
  let prev = Array.from({length:n+1}, (_, j) => j);
  for(let i = 1; i <= m; i++){ const cur = [i]; for(let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j-1] + 1, prev[j-1] + (a[i-1] === b[j-1] ? 0 : 1)); prev = cur; }
  return prev[n];
}
// passt, wenn eines der erkannten Ergebnisse (ganz oder ein Wort daraus) vom Gerüst her höchstens einen Buchstaben abweicht (bei kurzen Wörtern gar keinen)
function speakMatch(target, alts){
  const t = arSkel(target); if(!t) return {ok:false, best:null};
  const tol = t.length >= 4 ? 1 : 0;
  let best = {d:99, alt:null};
  alts.forEach(alt => {
    const cands = [alt].concat(String(alt).split(/\s+/));
    cands.forEach(c => { const d = lev(arSkel(c), t); if(d < best.d) best = {d, alt}; });
  });
  return {ok: best.d <= tol, best: best.alt, d: best.d, t};
}
window.neuSpeakMatch = speakMatch;
function startSpeak(){
  if(navigator.onLine === false){ showToast('Offline – Sprechen braucht Internet', 'warn'); return; }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SR){ showToast('Spracherkennung gibt es in diesem Browser nicht (Chrome auf Android verwenden)', 'warn'); return; }
  const pool = ALL_VOCAB.filter(v => v.ar && v.en && v.au && !isQueueBlocked(v));
  if(pool.length < 4){ showToast('Zu wenige Vokabeln mit Audio','warn'); return; }
  reset('speak');
  score = {c:0, w:0, t:0, st:0};
  const started = pool.filter(v => srsProgress[v.id] && srsProgress[v.id].next_review);
  const base = started.length >= 10 ? started : pool;
  SQ = {deck: sh(base).slice(0, 10), i: 0, rec: null, state: 'idle', counted: false};
  renderSpeak();
}
function renderSpeak(){
  const c = $('exercise-content'); if(!c || !SQ) return;
  const v = SQ.deck[SQ.i];
  SQ.state = 'idle'; SQ.counted = false; SQ.res = null;
  $('neu-prog-fill').style.width = Math.round(SQ.i / SQ.deck.length * 100) + '%';
  $('neu-prog-n').textContent = (SQ.i + 1) + ' / ' + SQ.deck.length;
  c.innerHTML = '<div class="neu-wrap">'
    + '<div class="neu-card" style="text-align:center;padding:1.2rem"><div class="neu-sub">Sag das auf Tounsi</div>'
    + '<div style="font-size:1.7rem;font-weight:700;margin:.5rem 0 .2rem">'+escHtml(v.en)+'</div>'
    + '<button class="neu-btn neu-mic" id="neu-mic" style="width:112px;height:112px;min-height:0;border-radius:56px;margin:.9rem auto .3rem" onclick="neuSpeakStart()" aria-label="Sprechen">'+IC.mic.replace('<svg','<svg style="width:46px;height:46px;stroke:#17120a;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round"')+'</button>'
    + '<div class="neu-sub" id="neu-speak-st">Zum Sprechen tippen</div>'
    + '<div id="neu-speak-res" style="min-height:3rem;margin-top:.8rem"></div></div>'
    + '<div id="neu-speak-act" style="display:flex;flex-direction:column;gap:.6rem;margin-top:.8rem"></div>'
    + '<div class="neu-sub" style="text-align:center;margin-top:1rem">Test · die Erkennung ist nur ein Anhaltspunkt, ohne Fortschrittswertung</div></div>';
}
window.neuSpeakStart = function(){
  if(!SQ || SQ.state === 'listening') return;
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition; if(!SR) return;
  const v = SQ.deck[SQ.i];
  const rec = new SR(); SQ.rec = rec;
  rec.lang = 'ar-TN'; rec.interimResults = false; rec.maxAlternatives = 5; rec.continuous = false;
  SQ.state = 'listening';
  const st = $('neu-speak-st'), mic = $('neu-mic');
  if(st) st.textContent = 'Ich höre zu …'; if(mic) mic.classList.add('on');
  let got = false;
  rec.onresult = e => {
    got = true;
    const r = e.results[0], alts = []; for(let k = 0; k < r.length; k++) alts.push(r[k].transcript);
    neuSpeakShow(alts);
  };
  rec.onerror = e => {
    got = true; SQ.state = 'idle'; if(mic) mic.classList.remove('on');
    const msg = e.error === 'not-allowed' || e.error === 'service-not-allowed' ? 'Mikrofon nicht erlaubt (in den Browser-Einstellungen freigeben).'
      : e.error === 'no-speech' ? 'Nichts gehört. Nochmal versuchen.'
      : e.error === 'network' ? 'Keine Verbindung zur Spracherkennung.'
      : e.error === 'language-not-supported' ? 'Sprache ar-TN wird hier nicht unterstützt.'
      : 'Fehler: '+e.error;
    if($('neu-speak-st')) $('neu-speak-st').textContent = msg;
  };
  rec.onend = () => { if(mic) mic.classList.remove('on'); if(!got && SQ && SQ.state === 'listening'){ SQ.state = 'idle'; if($('neu-speak-st')) $('neu-speak-st').textContent = 'Nichts gehört. Nochmal versuchen.'; } };
  try{ rec.start(); }catch(err){ SQ.state = 'idle'; if(st) st.textContent = 'Konnte nicht starten: '+err.message; }
};
function neuSpeakShow(alts){
  if(!SQ) return;
  const v = SQ.deck[SQ.i];
  const m = speakMatch(v.ar, alts);
  SQ.state = 'done'; SQ.res = m;
  if($('neu-speak-st')) $('neu-speak-st').textContent = m.ok ? 'Passt!' : 'Nicht ganz.';
  const color = m.ok ? 'var(--green)' : 'var(--red)';
  $('neu-speak-res').innerHTML =
    '<div style="font-size:1.5rem;direction:rtl;color:'+color+';font-family:var(--arf)">'+escHtml(alts[0] || '')+'</div>'
    + (alts.length > 1 ? '<div class="neu-sub" style="direction:rtl;font-size:.85rem">'+alts.slice(1).map(escHtml).join(' · ')+'</div>' : '')
    + '<div style="margin-top:.7rem;font-size:2rem;direction:rtl;color:var(--gold2);font-family:var(--arf)">'+escHtml(v.ar)+'</div>'
    + '<div class="neu-mono" style="font-size:1.05rem">'+escHtml(v.tr)+'</div>'
    + '<div class="neu-sub" style="font-size:.75rem;margin-top:.4rem">Vergleich (Gerüst): erkannt „'+escHtml(arSkel(m.best || ''))+'“ · Ziel „'+escHtml(m.t || '')+'“ · Abstand '+(m.d === 99 ? '–' : m.d)+'</div>';
  const last = SQ.i >= SQ.deck.length - 1;
  if(!SQ.counted){ SQ.counted = true; score.t++; if(m.ok) score.c++; else score.w++; vibe(m.ok); }
  $('neu-speak-act').innerHTML =
    '<button class="neu-btn" onclick="neuSpeakNext()">'+(last ? 'Ergebnis' : 'Weiter')+'</button>'
    + '<div style="display:flex;gap:.5rem;flex-wrap:wrap">'
    + '<button class="neu-btn ghost" style="flex:1;min-width:9rem" onclick="neuSpeakPlay()">Vorbild anhören</button>'
    + '<button class="neu-btn ghost" style="flex:1;min-width:9rem" onclick="neuSpeakRetry()">Nochmal sprechen</button>'
    + (m.ok ? '' : '<button class="neu-btn ghost" style="flex:1 1 100%" onclick="neuSpeakOverride()">Trotzdem richtig</button>')
    + '</div>';
}
window.neuSpeakPlay = function(){ if(!SQ) return; const v = SQ.deck[SQ.i]; playVocabAudio(v.au, null, v.aus||0, v.aue||0); };
window.neuSpeakOverride = function(){
  if(!SQ || !SQ.res || SQ.res.ok) return;
  SQ.res.ok = true; score.w = Math.max(0, score.w - 1); score.c++;
  if($('neu-speak-st')) $('neu-speak-st').textContent = 'Als richtig gewertet.';
  const b = [...document.querySelectorAll('#neu-speak-act button')].find(x => /Trotzdem/.test(x.textContent)); if(b) b.remove();
};
window.neuSpeakRetry = function(){
  if(!SQ) return;
  if(SQ.counted && SQ.res){ score.t--; if(SQ.res.ok) score.c--; else score.w--; SQ.counted = false; }
  $('neu-speak-res').innerHTML = ''; $('neu-speak-act').innerHTML = ''; SQ.state = 'idle';
  neuSpeakStart();
};
window.neuSpeakNext = function(){ if(!SQ) return; SQ.i++; if(SQ.i >= SQ.deck.length){ showRes(); } else renderSpeak(); };
window.neuSpeakState = () => SQ;

/* ---------- Mikrofon-Knopf im Vokabel-Eingabefeld (Deutsch → Arabisch): gesprochenes Wort wird als Text eingetragen ---------- */
(function(){
  const SRC = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SRC) return;
  let cur = null;
  function addMic(){
    const inp = $('flash-input'), bar = $('sticky-check-inner'); if(!inp || !bar) return;
    const old = $('neu-micbtn'); if(old) old.remove();
    const ex = (typeof exList !== 'undefined' && exList) ? exList[cIdx] : null;
    if(!ex || ex.dir !== 'de2ar' || !ex.v) return;
    // links unten in der Prüfen-Leiste: mit dem linken Daumen gut erreichbar
    const b = document.createElement('button'); b.type = 'button'; b.id = 'neu-micbtn'; b.className = 'neu-micbtn'; b.setAttribute('aria-label', 'Antwort sprechen');
    b.innerHTML = IC.mic;
    b.onclick = () => listen(inp, b, ex.v);
    bar.insertBefore(b, bar.firstChild);
  }
  function listen(inp, b, v){
    if(cur){ try{ cur.stop(); }catch(e){} cur = null; b.classList.remove('on'); return; }
    const rec = new SRC(); cur = rec;
    rec.lang = 'ar-TN'; rec.interimResults = false; rec.maxAlternatives = 5; rec.continuous = false;
    b.classList.add('on');
    rec.onresult = e => {
      const r = e.results[0], alts = []; for(let k = 0; k < r.length; k++) alts.push(r[k].transcript);
      if(!alts.length) return;
      window._neuSp = {id: v.id, alts};
      inp.value = alts[0];
      inp.dispatchEvent(new Event('input', {bubbles:true}));
    };
    rec.onerror = e => {
      const msg = e.error === 'not-allowed' || e.error === 'service-not-allowed' ? 'Mikrofon nicht erlaubt (in den Browser-Einstellungen freigeben).'
        : e.error === 'no-speech' ? 'Nichts gehört. Nochmal versuchen.'
        : e.error === 'network' ? 'Keine Verbindung zur Spracherkennung.' : 'Spracherkennung: '+e.error;
      showToast(msg, 'warn');
    };
    rec.onend = () => { cur = null; b.classList.remove('on'); };
    try{ rec.start(); }catch(err){ cur = null; b.classList.remove('on'); showToast('Konnte nicht starten: '+err.message, 'warn'); }
  }
  const _rf = window.rFlash;
  if(typeof _rf === 'function') window.rFlash = function(){ const r = _rf.apply(this, arguments); try{ addMic(); }catch(e){} return r; };
  // Gesprochenes, unverändert übernommenes Wort: gilt, wenn das Konsonantengerüst passt (wie „Fast!“ bei Schreibvarianten)
  const _chk = window.chkFlash;
  if(typeof _chk === 'function') window.chkFlash = function(){
    try{
      const inp = $('flash-input'), sp = window._neuSp, ex = exList[cIdx];
      if(inp && sp && ex && ex.v && sp.id === ex.v.id && inp.value.trim() === sp.alts[0]){
        const v = ex.v, val = inp.value.trim();
        const ok = checkAnswer(val, v.ar).ok || checkAnswer(val, v.tr).ok;
        if(!ok && speakMatch(v.ar, sp.alts).ok) inp.value = v.ar;
      }
    }catch(e){}
    return _chk.apply(this, arguments);
  };
})();
const _restart = window.restartExercise;
window.restartExercise = function(){ if(cMode === 'speak'){ closeResult(); startSpeak(); return; } if(cMode === 'listen'){ closeResult(); startListen(); return; } return _restart.apply(this, arguments); };


/* ---------- Tastatur: im Lernen immer Platz fürs Eingabefeld ----------
   Zusätzlich zur Logik der Hauptdatei (Leisten über die Tastatur schieben): sobald ein Eingabefeld
   Fokus hat, wird die Seite kompakt (kleinere Karte, keine Kopfzeile) und das Feld in den sichtbaren
   Bereich gerollt. Auch auf Handys mit kleinem Bildschirm bleibt so Karte + Feld + Prüfen-Leiste sichtbar. */
(function(){
  let t = null;
  const isField = el => el && (el.id === 'flash-input' || el.id === 'course-input');
  function ensureVisible(){
    const el = document.activeElement;
    if(!isField(el)) return;
    const vv = window.visualViewport;
    const vh = vv ? vv.height : window.innerHeight;
    const bar = $('sticky-check');
    const barH = bar && getComputedStyle(bar).display !== 'none' ? bar.getBoundingClientRect().height : 0;
    const r = el.getBoundingClientRect();
    const limit = vh - barH - 8;
    if(r.bottom > limit) window.scrollBy({top: r.bottom - limit + 4, behavior: 'instant'});
    else if(r.top < 4) window.scrollBy({top: r.top - 8, behavior: 'instant'});
  }
  document.addEventListener('focusin', e => {
    if(!isField(e.target)) return;
    clearTimeout(t);
    document.body.classList.add('neu-kb');
    setTimeout(ensureVisible, 60); setTimeout(ensureVisible, 350); setTimeout(ensureVisible, 800);
  });
  document.addEventListener('focusout', e => {
    if(!isField(e.target)) return;
    clearTimeout(t);
    // Nach dem Antworten wird das Feld deaktiviert (Fokus weg) — der kompakte Aufbau bleibt, solange die Karte
    // da ist; sonst wäre der obere Block bei Frage und Antwort verschieden hoch und die Seite würde springen.
    t = setTimeout(() => { if(!isField(document.activeElement) && !document.querySelector('#flash-input,#course-input')) document.body.classList.remove('neu-kb'); }, 250);
  });
  // Karte erscheint sofort im kompakten Aufbau (nicht erst, wenn das Feld Fokus bekommt) und verlässt ihn,
  // sobald keine Eingabekarte mehr da ist (Ergebnis, Startseite …)
  const inSession = () => document.body.classList.contains('neu-session');
  setInterval(() => {
    const has = !!document.querySelector('#flash-input,#course-input');
    const on = document.body.classList.contains('neu-kb');
    if(on && !has && !isField(document.activeElement)) document.body.classList.remove('neu-kb');
  }, 400);
  ['rFlash','rCourseEx'].forEach(n => {
    const f = window[n];
    if(typeof f === 'function') window[n] = function(){ if(inSession()) document.body.classList.add('neu-kb'); return f.apply(this, arguments); };
  });
  if(window.visualViewport){
    window.visualViewport.addEventListener('resize', () => { if(document.body.classList.contains('neu-kb')) setTimeout(ensureVisible, 50); });
  }
  // Neue Karte rendern: Fokus bleibt im neuen Feld, Platz sofort prüfen
  const _r2 = window.render;
  window.render = function(){ _r2.apply(this, arguments); if(document.body.classList.contains('neu-kb')) setTimeout(ensureVisible, 120); };
})();


/* ---------- Aktivierung (Admin) im neuen Stil: Karten statt Tabelle ---------- */
window._buildActivateHTML = function(){
  return '<div class="neu-wrap">'
    + '<div class="neu-card" style="display:flex;justify-content:space-between;gap:.8rem"><div><div class="neu-sub" style="white-space:nowrap;font-size:.85rem">Nicht aktiv</div><div id="act-stat-total" style="font-size:1.6rem;font-weight:700;color:var(--gold2)">–</div></div>'
    + '<div><div class="neu-sub" style="white-space:nowrap;font-size:.85rem">Ausgewählt</div><div id="act-stat-sel" style="font-size:1.6rem;font-weight:700">0</div></div>'
    + '<div><div class="neu-sub" style="white-space:nowrap;font-size:.85rem">Aktiviert</div><div id="act-stat-done" style="font-size:1.6rem;font-weight:700;color:var(--green)">0</div></div></div>'
    + '<div class="neu-chips">'
    + [['all','Alle'],['1','Prio 1'],['2','Prio 2'],['3','Prio 3'],['0','Ohne Prio']].map(([k,l]) => '<button class="act-pchip neu-chip'+(k==='all'?' active on':'')+'" data-prio="'+k+'">'+l+'</button>').join('')
    + '</div>'
    + '<details class="neu-filter"><summary>Sortierung und Themen</summary>'
    + '<label class="sh-l" style="margin-top:0">Sortieren nach</label><select id="act-sort" class="sh-in"><option value="prio">Priorität</option><option value="topic">Thema</option><option value="lesson">Lektion</option><option value="alpha">A–Z</option></select>'
    + '<div id="act-topic-bar" style="display:flex;gap:.4rem;flex-wrap:wrap;margin:.7rem 0 .6rem"></div></details>'
    + '<label style="display:flex;align-items:center;gap:.6rem;margin:.2rem 0 .6rem;color:var(--muted);font-size:.95rem"><input type="checkbox" id="act-check-all" style="width:22px;height:22px"> Alle sichtbaren auswählen</label>'
    + '<div id="act-progress-bar" style="height:3px;background:var(--border);border-radius:2px;display:none;margin-bottom:.6rem"><div id="act-progress-fill" style="height:3px;background:var(--gold);width:0%;transition:width .3s;border-radius:2px"></div></div>'
    + '<div id="act-table" class="neu-vlist"><div id="act-tbody"></div></div>'
    + '<div id="act-empty" style="display:none;text-align:center;color:var(--muted);padding:2rem">Nichts zu aktivieren</div>'
    + '<div style="height:9rem"></div>'
    + '<div id="act-batch-bar" class="neu-batch">'
    +   '<div id="act-btn-info" class="neu-sub" style="width:100%;min-height:1.2rem"></div>'
    +   '<input id="act-batch-n" type="number" value="10" min="1" max="100" inputmode="numeric">'
    +   '<button id="act-btn-topn" class="neu-btn line" style="flex:1;width:auto;min-height:48px;padding:0 1rem">Erste N auswählen</button>'
    +   '<button id="act-btn-clear" class="neu-btn ghost" style="width:auto;min-height:48px;padding:0 1rem" aria-label="Auswahl leeren">✕</button>'
    +   '<button id="act-btn-go" class="neu-btn" disabled style="flex:1 1 100%;min-height:50px">Jetzt fällig setzen</button>'
    + '</div></div>';
};
window._actRender = function(){
  const body = $('act-tbody'); if(!body) return;
  const PRIO_ICON = {1:'🔴', 2:'🟠', 3:'🔵', 0:'⚪'};
  body.innerHTML = _actFiltered.map(v => {
    const pr = actGetPrio(v), sel = _actSelected.has(v.id);
    return '<label class="neu-vrow" style="'+(sel?'background:rgba(201,168,76,.08)':'')+'"><input type="checkbox" data-id="'+v.id+'"'+(sel?' checked':'')+' style="display:block;accent-color:var(--gold)">'
      + '<div class="ar">'+(v.ar||'')+'</div><div class="mid"><div class="t1">'+escHtml(v.en||'')+'</div><div class="t2 neu-mono">'+escHtml(v.tr||'')+'</div><div class="t2">'+v.ls+' · '+PRIO_ICON[pr.prio]+' '+escHtml(pr.label)+'</div></div></label>';
  }).join('');
  body.querySelectorAll('input[type=checkbox]').forEach(cb => cb.addEventListener('change', () => {
    const id = parseInt(cb.dataset.id);
    if(cb.checked) _actSelected.add(id); else _actSelected.delete(id);
    cb.closest('label').style.background = cb.checked ? 'rgba(201,168,76,.08)' : '';
    _actUpdateStats();
  }));
  const empty = $('act-empty'), tbl = $('act-table');
  if(_actFiltered.length === 0){ if(empty) empty.style.display = 'block'; if(tbl) tbl.style.display = 'none'; }
  else { if(empty) empty.style.display = 'none'; if(tbl) tbl.style.display = 'block'; }
  _actUpdateStats();
};


/* ---------- sichtbarer Bereich (Tastatur) als CSS-Variablen: --vvh Höhe, --vvt Versatz, --kb Tastaturhöhe ---------- */
(function(){
  function upd(){
    const vv = window.visualViewport;
    const h = vv ? vv.height : window.innerHeight;
    const top = vv ? vv.offsetTop : 0;
    const st = document.documentElement.style;
    st.setProperty('--vvh', Math.round(h) + 'px');
    st.setProperty('--vvt', Math.round(top) + 'px');
    st.setProperty('--kb', Math.max(0, Math.round(window.innerHeight - h - top)) + 'px');
  }
  upd();
  window.addEventListener('resize', upd);
  if(window.visualViewport){ window.visualViewport.addEventListener('resize', upd); window.visualViewport.addEventListener('scroll', upd); }
})();


/* ---------- Kurs-Lektionsansicht im neuen Stil ---------- */
const cleanLessonTitle = t => String(t||'').replace(/^Lektion\s*\d+\s*[—–-]\s*/i, '');
function lessonProg(l){
  const items = courseFlattenChunks().filter(ch => ch.lessonId === l.id).reduce((s,ch) => s.concat(ch.srsItems), []);
  const total = items.length;
  const unlocked = items.filter(e => COURSE_EX_PROGRESS[e.id]).length;
  const mastered = items.filter(e => COURSE_EX_PROGRESS[e.id] && (COURSE_EX_PROGRESS[e.id].correct_count||0) >= 4).length;
  const due = items.filter(e => { const p = COURSE_EX_PROGRESS[e.id]; return p && p.next_review && isDueByDay(courseParseTs(p.next_review)); }).length;
  return {total, unlocked, mastered, due};
}
const _scl = window.showCourseLesson;
window.showCourseLesson = function(){ cMode = 'course'; chrome('course'); return _scl.apply(this, arguments); };
window.renderCourseLesson = function(){
  const c = $('exercise-content'), l = _courseCurLesson;
  if(!c || !l) return;
  const chunked = courseHasChunks(l);
  const pr = lessonProg(l);
  const frac = pr.total ? pr.mastered / pr.total : 0;
  const done = pr.total > 0 && pr.mastered >= pr.total;
  const tab = (k, label) => '<button class="'+(_courseCurTab===k?'on':'')+'" onclick="courseSetTab(\''+k+'\')">'+label+'</button>';
  c.innerHTML = '<div class="neu-wrap">'
    + '<div style="margin-bottom:.6rem"><span class="neu-chip" onclick="showCourseOverview()">‹ Kurs</span></div>'
    + '<div class="neu-card" style="display:flex;align-items:center;gap:.9rem">'+ring(frac, 64, 7, done ? 'var(--green)' : 'var(--gold)', done ? '✓' : Math.round(frac*100))
    +   '<div style="flex:1;min-width:0"><div style="font-size:1.15rem;font-weight:700">Lektion '+l.course_number+'</div><div class="neu-sub" style="margin-top:1px">'+escHtml(cleanLessonTitle(l.title))+'</div>'
    +   (pr.total ? '<div style="font-size:.85rem;margin-top:.3rem;color:var(--gold2)">'+fmtN(pr.mastered)+' von '+fmtN(pr.total)+' Übungen gemeistert'+(pr.due ? ' · <span style="color:var(--red)">'+fmtN(pr.due)+' fällig</span>' : '')+'</div>' : '')
    + '</div></div>'
    + '<div class="neu-seg" style="margin-bottom:.8rem">'+(chunked ? tab('course','Ansicht')+tab('vocab','Vokabeln') : tab('learn','Lernen')+tab('vocab','Vokabeln')+tab('test','Test'))+'</div>'
    + '<div id="course-tab-content"></div></div>';
  const tc = $('course-tab-content');
  if(_courseCurTab === 'learn') renderCourseLearnTab(tc, l);
  else if(_courseCurTab === 'vocab') renderCourseVocabTab(tc, l);
  else if(_courseCurTab === 'test') renderCourseTestTab(tc, l);
  else if(_courseCurTab === 'course') renderCourseBrowseTab(tc, l);
};
window.renderCourseBrowseTab = function(tc, l){
  if(!courseHasChunks(l)){ renderCourseLearnTab(tc, l); return; }
  const byKey = {};
  (COURSE_EXERCISES_BY_LESSON[l.id]||[]).forEach(e => { (byKey[e.chunk_key] = byKey[e.chunk_key] || []).push(e); });
  let h = '<div class="neu-card" style="padding:.1rem .9rem">';
  (l.chunk_order||[]).forEach(c => {
    const all = byKey[c.key] || [];
    const srs = all.filter(e => COURSE_SRS_TYPES.includes(e.exercise_type));
    const non = all.filter(e => !COURSE_SRS_TYPES.includes(e.exercise_type));
    const unlocked = courseChunkUnlocked(srs), mastered = courseChunkMastered(srs);
    const st = !srs.length ? 'read' : mastered ? 'done' : unlocked ? 'run' : 'lock';
    const mc = srs.filter(e => COURSE_EX_PROGRESS[e.id] && (COURSE_EX_PROGRESS[e.id].correct_count||0) >= 3).length; // gleiche Schwelle wie der Punkt (courseChunkMastered)
    const open = _browseOpenChunk === c.key;
    const dot = {done:'var(--green)', run:'var(--gold)', lock:'var(--border)', read:'var(--muted)'}[st];
    const sub = srs.length ? fmtN(mc)+' von '+fmtN(srs.length)+' gemeistert'+(st==='lock' ? ' · gesperrt' : '') : non.length ? fmtN(non.length)+' zum Lesen' : '';
    h += '<div class="neu-chunk'+(st==='lock'?' lock':'')+'"><button class="hd" onclick="courseBrowseToggle(\''+eq(c.key)+'\')"><span class="dot" style="background:'+dot+'"></span><span class="tx"><b>'+escHtml(c.label)+'</b><small>'+sub+'</small></span><span class="chev">'+(open?'⌃':'⌄')+'</span></button>';
    if(open){
      h += '<div class="bd">'+courseChunkLearnHtml(l, c);
      if(srs.length && !unlocked) h += '<button class="neu-btn blue" style="margin-top:.7rem" onclick="courseManualUnlockChunk('+l.id+',\''+eq(c.key)+'\')">Diesen Abschnitt jetzt freischalten</button>';
      if(srs.length) h += '<div class="neu-cap" style="margin:.9rem 0 .4rem">Übungen</div><div style="display:flex;flex-wrap:wrap;gap:.4rem">'+srs.map(e => '<span class="neu-chip" style="min-height:30px;cursor:default">'+courseExLevelBadge(e.id)+'</span>').join('')+'</div>';
      h += courseNonSrsHtml(non)+'</div>';
    }
    h += '</div>';
  });
  tc.innerHTML = h + '</div>';
};
window.renderCourseVocabTab = function(tc, l){
  const f = parseCourseVocabRefs(l.vocab_lesson_refs);
  const list = ALL_VOCAB.filter(v => f.ids.has(v.id) || f.tr.has(v.tr));
  tc.innerHTML = list.length
    ? '<div class="neu-card">'+lessonStatHtml(list)+'</div><button class="neu-btn" onclick="courseGoToVocab('+l.id+')">Vokabeln der Lektion ansehen</button>'
    : '<div class="neu-card neu-sub">Für diese Lektion sind noch keine Vokabeln verknüpft.</div>';
};

/* ---------- Statistik im neuen Stil ---------- */
const PHASE_COL = ['var(--ph0)', 'var(--ph1)', 'var(--ph2)', 'var(--ph3)'];
const LV_COL = ['var(--lvn)','var(--lv0)','var(--lv1)','var(--lv2)','var(--lv3)','var(--lv4)','var(--lv5)','var(--lv6)'];
const pct0 = (a,b) => b ? Math.round(100*a/b) : 0;
async function loadActivityBars(N){
  const key = 'act' + N;
  if(_cache[key] && Date.now() - _cache[key].t < 120000) return _cache[key].d;
  const berlin = d => berlinDay(d);
  const midnight = new Date(); midnight.setHours(0,0,0,0);
  const since = new Date(midnight); since.setDate(since.getDate() - N);
  const days = {};
  for(let page = 0; page < 30; page++){
    const r = await sbApi('review_log?user_id=eq.'+currentUser.id+'&select=correct,created_at&created_at=gte.'+since.toISOString()+'&order=created_at.desc&limit=1000&offset='+(page*1000));
    (r || []).forEach(x => { const k = berlin(new Date(x.created_at)); const e = days[k] || (days[k] = {a:0, c:0}); e.a++; if(x.correct) e.c++; });
    if(!r || r.length < 1000) break;
  }
  const list = [];
  for(let i = N; i >= 0; i--){ const d = new Date(midnight); d.setDate(d.getDate() - i); const e = days[berlin(d)] || {a:0, c:0}; list.push({d, a:e.a, c:e.c}); }
  _cache[key] = {t: Date.now(), d: list};
  return list;
}
const WD = ['So','Mo','Di','Mi','Do','Fr','Sa'];
function barChart(items, opts){
  // items: [{v, c?, label, hot, act, tip, num}] — c = Teilwert (richtig) für gestapelte Balken, tip = Text beim Antippen
  // opts: {avg, sum:[[Titel, Wert],…], def}. Bis 7 Balken: Zahlen über und Beschriftung unter den Balken.
  // Darüber: Balken ohne Zahlen, Durchschnittslinie, Datumsachse, Antippen/Wischen zeigt die Werte.
  opts = opts || {};
  const n = items.length, max = Math.max(1, ...items.map(x => x.v)), H = 96;
  const stack = x => {
    const h = Math.round(x.v / max * H), hc = x.c != null && x.v ? Math.round(h * x.c / x.v) : h;
    return x.v ? (x.c != null
      ? '<i style="height:'+(h-hc)+'px;background:#5a4c2e"></i><i style="height:'+hc+'px;background:var(--gold)"></i>'
      : '<i style="height:'+h+'px;background:'+(x.hot?'var(--gold2)':'var(--bar)')+'"></i>') : '';
  };
  const sum = opts.sum ? '<div class="neu-sumrow">'+opts.sum.map(([t, v]) => '<div><small>'+t+'</small><b>'+v+'</b></div>').join('')+'</div>' : '';
  if(n <= 7){
    const body = items.map(x => '<div class="b'+(x.hot?' hot':'')+'"'+(x.act?' onclick="'+x.act+'"':'')+'><b>'+(x.v?fmtN(x.v):'')+'</b><div class="col">'+stack(x)+'</div><span>'+(x.label||'')+'</span></div>').join('');
    return '<div class="neu-bars">'+body+'</div>'+sum;
  }
  const showNums = items.some(x => x.num != null) && n <= 14;
  const body = items.map(x => '<div class="b'+(x.hot?' hot':'')+'" data-tip="'+escHtml(x.tip||'')+'">'+(showNums?'<b>'+(x.num||'')+'</b>':'')+'<div class="col">'+stack(x)+'</div></div>').join('');
  const avg = opts.avg ? '<div class="avg" style="bottom:'+Math.round(opts.avg/max*H)+'px"><em>Ø '+fmtN(Math.round(opts.avg))+(opts.avgUnit||'')+'</em></div>' : '';
  const idx = [0, 1, 2, 3, 4].map(k => Math.round(k * (n-1) / 4));
  const axis = '<div class="neu-axis">'+idx.map(i => '<span>'+(items[i].ax || '')+'</span>').join('')+'</div>';
  return '<div class="neu-chart"><div class="neu-bars multi'+(n>30?' thin':'')+'" onpointerdown="neuBarsTap(event,this)" onpointermove="if(event.buttons)neuBarsTap(event,this)">'+body+avg+'</div>'+axis
    + '<div class="neu-tip">'+(opts.def || 'Balken antippen: Werte anzeigen')+'</div></div>'+sum;
}
window.neuBarsTap = function(ev, el){
  const bars = el.querySelectorAll('.b'); if(!bars.length) return;
  const r = el.getBoundingClientRect();
  const i = Math.max(0, Math.min(bars.length-1, Math.floor((ev.clientX - r.left) / r.width * bars.length)));
  bars.forEach((b, k) => b.classList.toggle('sel', k === i));
  const t = el.parentElement.querySelector('.neu-tip'); if(t) t.textContent = bars[i].dataset.tip || '';
};
function winChips(cur, fn){ return '<div style="display:flex;gap:.35rem">'+[7,14,30,90].map(n => '<span class="neu-chip'+(n===cur?' on':'')+'" style="min-height:32px;padding:0 .65rem" onclick="'+fn+'('+n+')">'+n+'</span>').join('')+'</div>'; }
window.neuSetFc = function(n){ forecastWindow = n; showStats(); };
window.neuSetAct = function(n){ activityWindow = n; renderActivityCard(); };
window.neuFilterOffStats = function(){ try{ filterLessonDropdown('all'); }catch(e){ cLesson = 'all'; } showStats(); };

function renderActivityCard(){
  const el = $('neu-act-body'); if(!el) return;
  const N = activityWindow;
  $('neu-act-chips').innerHTML = winChips(N, 'neuSetAct');
  el.innerHTML = '<div class="neu-skbars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>';
  loadActivityBars(N).then(full => {
    if(!$('neu-act-body') || N !== activityWindow) return;
    // full = N volle Tage vor heute + heute; der Durchschnitt zählt nur volle Tage (heute ist noch nicht vorbei)
    const prior = full.slice(0, N), list = full.slice(1);
    const tot = prior.reduce((s,x)=>s+x.c, 0), avg = tot / N, mx = Math.max(0, ...prior.map(x=>x.c)), act = prior.filter(x=>x.c>0).length;
    const dm = d => d.getDate()+'.'+(d.getMonth()+1)+'.';
    const sum = [['Ø pro Tag', fmtN(Math.round(avg))], ['Bester Tag', fmtN(mx)], ['Aktive Tage', act+' von '+N]];
    let items, opts = {sum};
    if(N >= 90){
      items = [];
      for(let i = 0; i < list.length; i += 7){
        const part = list.slice(i, i+7), c = part.reduce((s,x)=>s+x.c,0), per = Math.round(c / part.length);
        items.push({v:c, num:fmtN(per), ax:dm(part[0].d), tip:'Woche ab '+dm(part[0].d)+': '+fmtN(c)+' richtig, Ø '+fmtN(per)+' pro Tag'});
      }
      opts.avg = items.reduce((s,x)=>s+x.v,0) / items.length; opts.avgUnit = ' / Woche';
      opts.def = 'Balken = Woche, Zahl = Ø pro Tag. Antippen: Details';
    } else {
      items = list.map((x,i) => ({v:x.c, hot:i===list.length-1, label: N <= 7 ? (i===list.length-1 ? 'Heute' : WD[x.d.getDay()]) : '', ax: dm(x.d),
        tip: (i===list.length-1 ? 'Heute' : WD[x.d.getDay()]+' '+dm(x.d))+': '+fmtN(x.c)+' richtig (von '+fmtN(x.a)+' beantwortet)'}));
      opts.avg = avg;
    }
    el.innerHTML = barChart(items, opts);
  }).catch(e => { const b = $('neu-act-body'); if(b) b.innerHTML = '<div style="color:var(--red);font-size:.85rem">Fehler: '+escHtml(e.message)+'</div>'; });
}

window.showStats = function(){
  reset('stats');
  if(!_courseLoaded){ loadCourseData().then(() => { if(cMode === 'stats') showStats(); }).catch(()=>{}); }
  const c = $('exercise-content'); if(!c) return;
  const all = cLesson === 'all';
  const base = all ? ALL_VOCAB : gv();
  // Vokabel-Stufen: 0 = ohne Fälligkeit, 1..7 = L0..L6
  const vb = [0,0,0,0,0,0,0,0]; let vPts = 0;
  const todayD = new Date(); todayD.setHours(0,0,0,0);
  const N = forecastWindow;
  const fc = new Array(N).fill(0); let fcBlocked = 0;
  const dueByBucket = [0,0,0,0,0,0,0,0];
  const dayIdx = d => { const nd = new Date(d); nd.setHours(0,0,0,0); const diff = Math.round((nd - todayD) / 86400000); return diff < 0 ? 0 : diff; };
  base.forEach(v => {
    const p = srsProgress[v.id], st = p && p.next_review;
    const lv = st ? (p.level||0) : -1;
    const idx = !st ? 0 : (lv === 0 ? 1 : Math.min(lv+1, 7));
    vb[idx]++; if(st) vPts += Math.min(lv,6);
    if(st){ const di = dayIdx(p.next_review); if(di < N){ if(isQueueBlocked(v)) fcBlocked++; else fc[di]++; } if(srsIsDue(v) && !isQueueBlocked(v)) dueByBucket[idx]++; }
  });
  const cb = [0,0,0,0,0,0,0,0]; let cPts = 0, cTotal = 0, cActive = 0;
  if(all){
    cTotal = courseFlattenChunks().reduce((s,ch) => s + ch.srsItems.length, 0);
    Object.values(COURSE_EX_PROGRESS).forEach(p => {
      const lv = Math.min(p.correct_count||0, 6); const idx = lv === 0 ? 1 : Math.min(lv+1, 7);
      cb[idx]++; cActive++; cPts += lv;
      if(p.next_review){ const nd = courseParseTs(p.next_review); const di = dayIdx(nd); if(di < N) fc[di]++; if(isDueByDay(nd)) dueByBucket[idx]++; }
    });
    cb[0] = Math.max(0, cTotal - cActive);
  }
  const vTotal = base.length, vNew = vb[0], vStarted = vTotal - vNew;
  const phase = b => [b[0], b[1]+b[2]+b[3], b[4]+b[5], b[6]+b[7]];
  const vp = phase(vb), cp = phase(cb);
  const weighted = ((vb[1]+cb[1])*3 + (vb[2]+cb[2])*2 + (vb[3]+cb[3])) / 3;
  const d = dueCounts();
  const smoothMax = ALL_VOCAB.filter(v => { const p = srsProgress[v.id]; return p && p.next_review && p.level >= 3; }).length;
  const recalcMax = ALL_VOCAB.filter(v => { const p = srsProgress[v.id]; return p && p.next_review && p.last_reviewed; }).length;
  const nextChunk = (all && _courseLoaded) ? statsNextLockedChunk() : null;
  const courseVocabLeft = statsCourseVocabQueue().length;

  const legend = (p, act, tip) => '<div class="neu-leg">'+['Neu','Anfänger','Fortgeschritten','Profi'].map((l,i) =>
    '<div'+(i===0 && act ? ' class="act" onclick="'+act+'" title="'+escHtml(tip||'')+'"' : '')+'><u style="background:'+PHASE_COL[i]+'"></u><span>'+l+'</span><b>'+fmtN(p[i])+'</b></div>').join('')+'</div>';
  const segBar = p => { const t = p.reduce((a,x)=>a+x,0) || 1; return '<div class="neu-seg2">'+p.map((x,i) => x ? '<i style="width:'+(x/t*100)+'%;background:'+PHASE_COL[i]+'"></i>' : '').join('')+'</div>'; };
  const kpi = (label, a, b) => '<div><div class="neu-sub">'+label+'</div><div class="neu-kpi'+(b && a>=b ? ' ok':'')+'">'+pct0(a,b)+' %</div></div>';
  const prog = (title, started, total, p, act, tip) => '<div class="neu-prog-block"><div style="font-weight:700;margin-bottom:.5rem">'+title+'</div>'
    + '<div style="display:flex;gap:1.6rem">'+kpi('gestartet', started, total)+kpi('davon Profi', p[3], started)+'</div>'
    + segBar(p) + legend(p, act, tip) + '</div>';

  const fcItems = fc.map((v,i) => { const dd = new Date(todayD); dd.setDate(dd.getDate()+i);
    const dm = dd.getDate()+'.'+(dd.getMonth()+1)+'.';
    const label = N <= 7 ? (i===0 ? 'Heute' : i===1 ? 'Morgen' : WD[dd.getDay()]) : '';
    return {v, label, hot:i===0, act: '', ax: i===0 ? 'Heute' : dm,
      tip: (i===0 ? 'Heute' : WD[dd.getDay()]+' '+dm)+': '+fmtN(v)+' fällig'}; });
  const fcTotal = fc.reduce((a,x)=>a+x,0), fcMax = Math.max(0, ...fc);
  const fcSum = [['Gesamt', fmtN(fcTotal)], ['Ø pro Tag', fmtN(Math.round(fcTotal / N))], ['Spitze', fmtN(fcMax)]];
  const lvTot = vb.map((x,i) => x + cb[i]), lvSum = lvTot.reduce((a,x)=>a+x,0) || 1;
  const hints = ['ohne Fälligkeit','fällig','Wdh. in 1 T','3 T','7 T','14 T','30 T','90 T'];
  const lvRows = lvTot.map((n,i) => '<div class="neu-lvrow"><u style="background:'+LV_COL[i]+'"></u><span>'+(i===0?'Neu':'Stufe '+(i-1))+'</span><em>'+hints[i]+'</em><b>'+fmtN(n)+'</b><s'+(dueByBucket[i]?' style="color:var(--red)"':'')+'>'+(dueByBucket[i]?fmtN(dueByBucket[i])+' fällig':'')+'</s></div>').join('');

  c.innerHTML = '<div class="neu-wrap">'
    + '<div style="font-size:1.5rem;font-weight:700;margin:.2rem 0 .6rem">Statistik</div>'
    + (all ? '' : '<div style="margin-bottom:.6rem"><span class="neu-chip on" onclick="neuFilterOffStats()">Filter: '+escHtml(cLesson==='COURSEVOCAB'?'Kurs-Lektion':cLesson)+' ✕</span></div>')
    + '<div class="neu-row2" style="margin-bottom:.7rem">'
    +   '<div class="neu-card" style="margin:0;padding:.7rem .9rem"><div class="neu-sub">Fällig</div><div class="neu-kpi" style="font-size:1.6rem">'+fmtN(d.voc + (all ? d.course : 0))+'</div></div>'
    +   '<div class="neu-card" style="margin:0;padding:.7rem .9rem"><div class="neu-sub">Erledigt</div><div class="neu-kpi" id="neu-st-today" style="font-size:1.6rem"><span class="neu-skel" style="width:2.4rem;height:1.3rem"></span></div></div>'
    +   '<div class="neu-card" style="margin:0;padding:.7rem .9rem"><div class="neu-sub">Serie</div><div class="neu-kpi" id="neu-st-streak" style="font-size:1.6rem"><span class="neu-skel" style="width:2rem;height:1.3rem"></span></div></div>'
    + '</div>'
    + (all ? newStuffHint() : '')
    + '<div class="neu-card"><div class="neu-ch">Fortschritt</div>'
    +   prog('Vokabeln', vStarted, vTotal, vp, '', '')
    +   (all ? '<div style="height:1px;background:var(--border);margin:1rem 0"></div>'+prog('Übungen', cActive, cTotal, cp, '', '') : '')
    + '</div>'
    + '<div class="neu-card"><div class="neu-ch">Meilensteine</div><div id="neu-miles"></div><div id="neu-forecast" class="neu-sub" style="margin-top:.7rem"></div></div>'
    + '<div class="neu-card"><div class="neu-ch" style="display:flex;justify-content:space-between;align-items:center;gap:.5rem"><span>Fällig</span></div>'
    +   '<div style="margin:.2rem 0 .7rem">'+winChips(N, 'neuSetFc')+'</div>'
    +   barChart(fcItems, {sum: fcSum, avg: fcTotal / N, def: 'Balken antippen: fällig an dem Tag'}) + (fcBlocked ? '<div class="neu-sub" style="margin-top:.5rem">'+fmtN(fcBlocked)+' in der Partner-Queue gesperrt</div>' : '')
    + '</div>'
    + (all ? '<div class="neu-card"><div class="neu-ch">Aktivität</div><div id="neu-act-chips" style="margin:.2rem 0 .7rem"></div><div id="neu-act-body"></div></div>' : '')
    + (all ? '<div id="neu-partner" class="neu-card" style="display:flex;align-items:center;gap:.8rem;cursor:pointer" onclick="setMode(\'partnerqueue\')"><div class="neu-sub">Prüf-Aktivität wird geladen …</div></div>' : '')
    + '<div class="neu-card"><div class="neu-ch">Stufen</div><div class="neu-seg2" style="height:16px;margin:.2rem 0 .8rem">'+lvTot.map((x,i) => x ? '<i style="width:'+(x/lvSum*100)+'%;background:'+LV_COL[i]+'"></i>' : '').join('')+'</div>'
    +   '<details class="neu-filter" style="margin:0;border:none;background:none;padding:0"><summary style="min-height:40px">Alle Stufen anzeigen</summary>'+lvRows+'</details></div>'
    + '<div class="neu-row2" style="margin-bottom:.8rem"><button class="neu-btn ghost" onclick="statsStartMode(\'lessons\')">Lektions-Übersicht</button><button class="neu-btn ghost" style="border-color:#3b4f7a;color:var(--blue)" onclick="statsStartMode(\'course\')">Kurs-Übersicht</button></div>'
    + '<details class="neu-filter"><summary>Weitere Werkzeuge</summary><div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:.6rem">'
    +   '<button class="neu-btn line" style="flex:1;min-width:10rem" onclick="if(confirm(\'Fälligkeiten glätten? (betrifft bis zu '+smoothMax+' Vokabeln)\'))smoothSchedule();">Glätten<small>bis zu '+fmtN(smoothMax)+' Einträge</small></button>'
    +   '<button class="neu-btn ghost" style="flex:1;min-width:10rem;border-color:var(--red);color:var(--red)" onclick="if(confirm(\'Alle Fälligkeiten neu berechnen? (betrifft bis zu '+recalcMax+' Vokabeln)\'))recalcAllNextReview();">Alle neu berechnen<small>bis zu '+fmtN(recalcMax)+' Einträge</small></button>'
    + '</div><div id="smooth-result" style="font-size:.85rem;color:var(--muted)"></div></details>'
    + '</div>';
  if(all){ loadPartnerLine(); renderActivityCard(); }
  renderMilestones(vStarted, vTotal, vp[3]);
  Promise.all([loadActivity(), loadDayCounts()]).then(([a, dc]) => { const t = $('neu-st-today'), s = $('neu-st-streak'); if(t) t.textContent = fmtN(dc.today); if(s) s.innerHTML = a.streak ? flame(a.streak) + a.streak : '–'; }).catch(() => {});
};

/* ---------- Erster Einstieg: nach dem Laden auf die Startseite ---------- */
let landed = false;
const _hide = window.loadOverlayHide;
window.loadOverlayHide = function(){
  _hide.apply(this, arguments);
  try{
    const app = $('app-screen');
    if(!landed && typeof currentUser !== 'undefined' && currentUser && !currentUser.is_partner && app && app.style.display === 'block'){ landed = true; goHome(); }
  }catch(e){}
};

buildChrome();
})();


/* ---------- Antwort-Paare im neuen Stil ---------- */
window.renderPairsItem = function(){
  const c = document.getElementById('exercise-content');
  if(!c) return;
  if(!_pairsItems.length){
    c.innerHTML = '<div class="neu-card" style="text-align:center;color:var(--muted)">Noch keine festen Antwort-Formeln erfasst.</div>';
    return;
  }
  if(_pairsIdx >= _pairsItems.length){
    const n = _pairsC + _pairsW;
    c.innerHTML = '<div class="neu-card" style="text-align:center;padding:1.6rem 1rem">'
      + '<div style="font-size:1.5rem;font-weight:700;color:var(--gold2)">'+_pairsC+' von '+n+' richtig</div>'
      + '<div class="neu-sub" style="margin:.3rem 0 1.2rem">Antwort-Paare geschafft</div>'
      + '<button class="neu-btn" onclick="showPairsMode()">Nochmal</button>'
      + '<button class="neu-btn ghost" style="margin-top:.6rem" onclick="neuGoHome()">Fertig</button></div>';
    return;
  }
  const ex = _pairsItems[_pairsIdx], md = ex.meta || {};
  let h = '<div class="neu-sub" style="margin:.2rem 0 .5rem">Antwort-Paare · '+(_pairsIdx+1)+' von '+_pairsItems.length+'</div>'
    + '<div class="neu-sub" style="margin-bottom:.5rem">'+escHtml(ex.instruction||'Was antwortet man darauf?')+'</div>'
    + '<div class="neu-card" style="font-size:1.25rem;padding:1.2rem 1rem;text-align:center">'+escHtml(ex.prompt||'')
    + (_pairsRevealed && md.prompt_de ? '<div class="neu-sub" style="margin-top:.5rem">'+escHtml(md.prompt_de)+'</div>' : '') + '</div>';
  if(!_pairsRevealed){
    h += '<button class="neu-btn line" onclick="pairsReveal()">Antwort zeigen</button>';
  } else {
    h += '<div class="neu-card" style="border-color:var(--gold-d);font-size:1.25rem;color:var(--gold2);text-align:center;padding:1.2rem 1rem">'+escHtml(ex.solution||'—')
      + (md.solution_de ? '<div class="neu-sub" style="margin-top:.5rem">'+escHtml(md.solution_de)+'</div>' : '') + '</div>'
      + '<div class="neu-row2"><button class="neu-btn ghost" style="border-color:var(--red);color:var(--red)" onclick="pairsNext(false)">Falsch</button>'
      + '<button class="neu-btn" style="background:var(--green);color:#0b1a10" onclick="pairsNext(true)">Richtig</button></div>';
  }
  c.innerHTML = h;
};


/* ---------- Anmeldung: wechselnde Grafik (zufällig, nie zweimal hintereinander dieselbe) ---------- */
(function(){
  const G='#c9a84c', G2='#e8c96a';
  const B='#5b8fc7';
const sky=`<svg viewBox="0 0 220 100" width="220"><g style="fill:var(--surface)" stroke="${G}" stroke-width="2" stroke-linejoin="round"><path d="M6 96V62h30v34M40 96V44h34v52M78 96V68h26v28M108 96V52h30v44M142 96V70h28v26M174 96V58h38v38"/><path d="M40 44a17 14 0 0 1 34 0M108 52a15 12 0 0 1 30 0" stroke="${B}"/></g><g fill="${G2}"><rect x="50" y="58" width="6" height="10" rx="3"/><rect x="118" y="66" width="6" height="10" rx="3"/><rect x="186" y="72" width="7" height="12" rx="3.5"/><rect x="14" y="74" width="5" height="9" rx="2.5"/></g><path d="M0 98h220" stroke="${G}" stroke-width="2"/><g fill="none" stroke="${G2}" stroke-width="2"><path d="M178 20a11 11 0 1 0 6 18a9 9 0 1 1-6-18z" fill="${G2}" stroke="none"/></g></svg>`;
const arches=`<svg viewBox="0 0 220 110" width="220"><g fill="none" stroke="${G}" stroke-width="2.2">${[[20,40],[75,60],[145,40]].map(([x,w])=>`<path d="M${x} 104V${70-w/2+20}a${w/2} ${w/2} 0 0 1 ${w} 0V104"/>`).join('')}<path d="M75 104V70a30 30 0 0 1 60 0v34" stroke="${G2}" stroke-width="3"/><path d="M85 104V72a20 20 0 0 1 40 0v32" opacity=".5"/><path d="M0 104h220"/></g><circle cx="105" cy="38" r="3" fill="${G2}"/></svg>`;
const olive=(()=>{const x0=14,y0=66,x1=206,y1=30,ang=Math.atan2(y1-y0,x1-x0);let g='';for(let i=0;i<7;i++){const t=(i+.6)/7.4,x=x0+(x1-x0)*t,y=y0+(y1-y0)*t;const d=ang*180/Math.PI;for(const sgn of [-1,1]){const cx=x+Math.sin(ang)*-sgn*-14*1+Math.cos(ang)*6*(sgn>0?1:-1)*0,cy=y+Math.cos(ang)*-sgn*14*-1*-1;const rot=d+sgn*62+90-90;g+=`<ellipse cx="${x+(-Math.sin(ang))*sgn*13*-1}" cy="${y+Math.cos(ang)*sgn*13*-1}" rx="4.5" ry="12" transform="rotate(${d+90+sgn*-55} ${x+(-Math.sin(ang))*sgn*13*-1} ${y+Math.cos(ang)*sgn*13*-1})" fill="none" stroke="${G2}" stroke-width="2"/>`}}
return `<svg viewBox="0 0 220 90" width="220"><path d="M${x0} ${y0}L${x1} ${y1}" stroke="${G}" stroke-width="2.5"/>${g}<circle cx="70" cy="52" r="6" fill="${B}"/><circle cx="128" cy="38" r="6" fill="${B}"/></svg>`})();
const sea=`<svg viewBox="0 0 220 100" width="220"><path d="M60 62a50 50 0 0 1 100 0z" fill="${G}" opacity=".9"/>${[0,1,2,3].map(i=>`<path d="M0 ${68+i*9} q13.75 -8 27.5 0 t27.5 0 t27.5 0 t27.5 0 t27.5 0 t27.5 0 t27.5 0 t27.5 0" fill="none" stroke="${i%2?B:G2}" stroke-width="2" opacity="${1-i*.18}"/>`).join('')}<g transform="translate(110 38)"><path d="M0 -14a14 14 0 1 0 0 28a11 11 0 1 1 0 -28z" style="fill:var(--surface)" transform="translate(-4 0)"/></g></svg>`;

  const arts = [sky, arches, olive, sea];
  let lo, lod;
  // Pro Anmeldung genau ein Motiv (Anmeldeseite + Ladebildschirm zeigen dasselbe); bei jedem Laden
  // und nach jedem Abmelden wird ein anderes gewählt.
  function apply(){
    let last = -1;
    try{ last = parseInt(localStorage.getItem('neu-login-art'),10); if(isNaN(last)) last = -1; }catch(e){}
    let i = Math.floor(Math.random()*arts.length);
    if(i === last) i = (i + 1 + Math.floor(Math.random()*(arts.length-1))) % arts.length;
    try{ localStorage.setItem('neu-login-art', String(i)); }catch(e){}
    const el = document.querySelector('#login-screen .login-flag');
    if(el){
      el.innerHTML = arts[i];
      el.style.cssText = 'display:flex;justify-content:center;margin-bottom:.9rem;font-size:1rem';
      el.setAttribute('aria-hidden','true');
    }
    lo = document.getElementById('load-overlay');
    if(lo && !lod){
      lod = document.createElement('div');
      lod.setAttribute('aria-hidden','true');
      lod.style.cssText = 'display:flex;justify-content:center';
      lo.insertBefore(lod, lo.firstChild);
    }
    if(lod) lod.innerHTML = arts[i];
    const ls = document.getElementById('login-screen');
    // Mit gültiger Sitzung bleibt die Anmeldekarte verborgen (kein Aufblitzen vor dem Ladebildschirm);
    // sie erscheint erst, wenn die Wiederanmeldung scheitert (Skript setzt dann display zurück) oder man abmeldet.
    if(ls && !(typeof loadSession === 'function' && loadSession())) ls.classList.add('neu-ready');
  }
  apply();
  { const ls = document.getElementById('login-screen');
    if(ls) new MutationObserver(() => { if(ls.style.display !== 'none') ls.classList.add('neu-ready'); }).observe(ls, {attributes:true, attributeFilter:['style']}); }
  ['doLogout','doPartnerLogout'].forEach(n => {
    const f = window[n];
    if(typeof f === 'function') window[n] = function(){ const r = f.apply(this, arguments); apply(); return r; };
  });
})();


/* ---------- Lernkarte: feste Höhe, lange Inhalte schrumpfen die Schrift (oberer Block springt nicht) ---------- */
(function(){
  function fit(){
    const card = document.querySelector('#exercise-content .q-card');
    if(!card) return;
    const items = card.querySelectorAll('.q-arabic,.q-text,.q-sub');
    items.forEach(e => e.style.removeProperty('font-size'));
    for(let k = 0; k < 10 && card.scrollHeight > card.clientHeight + 1; k++){
      items.forEach(e => { const fs = parseFloat(getComputedStyle(e).fontSize); e.style.setProperty('font-size', Math.max(11, fs * .9) + 'px', 'important'); });
    }
  }
  const _rf = window.rFlash;
  window.rFlash = function(){ const r = _rf.apply(this, arguments); fit(); setTimeout(fit, 350); return r; };
  document.addEventListener('focusin', () => setTimeout(fit, 120));
  document.addEventListener('focusout', () => setTimeout(fit, 400));
})();


/* ---------- Kurs-Karte: Frage-/Aufgabenblock mit fester Höhe (Eingabefeld und Leiste springen nicht) ---------- */
(function(){
  const STOP = new Set(['course-drill-question','course-solution-box','course-grade-box','course-input','feedback']);
  function wrap(){
    const card = document.querySelector('#exercise-content .neu-ccard');
    if(!card) return;
    let box = card.querySelector('.neu-cq');
    if(!box){
      // Anweisungen, die nur die Kopfzeile (Aufgabentyp) wiederholen, entfallen — Anweisungen mit Inhalt bleiben
      // (Muster, „dann in den Plural“, Hinweise …). Nur Anzeige; die Daten bleiben unverändert.
      const badge = card.firstElementChild ? card.firstElementChild.textContent : '';
      const hasPattern = [...card.children].slice(1).some(k => / – /.test(k.textContent) && !k.id);
      const redundant = t => {
        if(/Übersetzen/.test(badge) && /^Übersetze(n Sie)?( ins Tunesische)?\.?$/i.test(t)) return true;
        if(/Übersetzen/.test(badge) && /^Übersetzen Sie nach dem Muster\.?$/i.test(t) && !hasPattern) return true;
        if(/Merksatz/.test(badge) && /^Merksatz$/i.test(t)) return true;
        if(/Feste Antwort/.test(badge) && /^(Feste Formel: )?Was antwortet man( darauf)?\?$/i.test(t)) return true;
        return false;
      };
      [...card.children].slice(1).forEach(k => { if(!k.id && redundant(k.textContent.trim())) k.remove(); });
      const kids = [...card.children], take = [];
      for(let i = 1; i < kids.length; i++){ if(STOP.has(kids[i].id) || kids[i].classList.contains('feedback')) break; take.push(kids[i]); }
      if(!take.length) return;
      // Hinweiszeilen (klein im Altcode) und die eigentliche Aufgabe unterscheiden und größer setzen
      take.forEach(k => k.classList.add(parseFloat(getComputedStyle(k).fontSize) < 15 ? 'cq-i' : 'cq-p'));
      box = document.createElement('div'); box.className = 'neu-cq';
      card.insertBefore(box, take[0]);
      take.forEach(k => box.appendChild(k));
    }
    fit(box);
  }
  // Passt der Inhalt nicht in die feste Höhe, wird die Schrift in wenigen Schritten verkleinert (höchstens auf ~78 %), danach scrollt der Block
  function fit(box){
    const kids = [...box.children];
    kids.forEach(k => k.style.removeProperty('font-size'));
    const base = kids.map(k => parseFloat(getComputedStyle(k).fontSize));
    for(let n = 1; n <= 3 && box.scrollHeight > box.clientHeight + 1; n++){
      kids.forEach((k, i) => k.style.setProperty('font-size', (base[i] * Math.pow(.92, n)) + 'px', 'important'));
    }
  }
  const _rc = window.rCourseEx;
  window.rCourseEx = function(){ const r = _rc.apply(this, arguments); wrap(); setTimeout(wrap, 350); return r; };
  document.addEventListener('focusin', () => setTimeout(wrap, 120));
  document.addEventListener('focusout', () => setTimeout(wrap, 400));
})();


/* ---------- Tageswerte schon im Ladebildschirm holen (Ring, Serie, Schnitte stehen dann sofort) ---------- */
(function(){
  const f = window.loadCourseLessonOptions;
  if(typeof f !== 'function') return;
  window.loadCourseLessonOptions = async function(){
    const r = await f.apply(this, arguments);
    try{
      loadOverlayUpdate('Tageswerte laden…', 99, 'Tagesziel, Serie, Schnitte');
      // Start aus dem Zwischenspeicher: nicht warten, die Startseite zeigt Platzhalter und füllt sich selbst
      if(typeof _rcMode !== 'undefined' && _rcMode === 'cache'){ window.neuActivity().catch(() => {}); window.neuDayCounts().catch(() => {}); return r; }
      // höchstens 40 s warten, danach lädt die Startseite die Werte selbst nach
      await Promise.race([Promise.all([window.neuActivity(), window.neuDayCounts()]), new Promise(res => setTimeout(res, 40000))]);
    }catch(e){}
    return r;
  };
})();


/* ---------- Kurs: Lösung gegliedert statt als Fließtext („Tounsi — Deutsch“ -> Tounsi / Deutsch) ---------- */
(function(){
  const TYPES = ['translate_de_tn','fill_blank','build_dialog','answer_pattern'];
  const PAREN = /^(.*?)\s*\(([^—]+)—\s*(.*)\)\s*$/;
  // html = bereits maskierte Lösung (ggf. mit Hervorhebungen im Tounsi-Teil)
  function format(html, ex){
    if(!ex || !TYPES.includes(ex.exercise_type) || !html) return null;
    if(ex.exercise_type === 'answer_pattern' && PAREN.test(ex.solution || '')) return null;   // schon in drei Zeilen gegliedert
    let tn, de;
    const i = html.indexOf(' — ');
    if(i > 0){ tn = html.slice(0, i); de = html.slice(i + 3); }
    else {
      const m = html.match(/^(.*?) – (?=[A-ZÄÖÜ])(.*)$/);
      // „Tounsi (Deutsch)“ ohne Strich: die Klammer am Ende ist die deutsche Übersetzung
      const p = !m && html.match(/^(.+?)\s+\(([A-ZÄÖÜ][^()]*)\)(<\/mark>)?\s*$/);
      if(!m && !p) return null;
      if(m){ tn = m[1]; de = m[2]; } else { tn = p[1] + (p[3] ? '</mark>' : ''); de = p[2]; }
    }
    if(ex.exercise_type === 'answer_pattern') tn = tn.replace(/ \/ /g, '<br>');   // mehrere mögliche Antworten untereinander
    tn = tn.replace(/\? – /g, '?<br>');             // Frage und Antwort auf Tounsi untereinander
    de = de.replace(/ – (?=[A-ZÄÖÜ])/g, '<br>');   // z. B. Frage und Antwort auf Deutsch untereinander
    return '<span class="neu-sol"><span class="l">Tounsi</span><span class="tn">'+tn+'</span><span class="l">Deutsch</span><span class="de">'+de+'</span></span>';
  }
  const _sol = window.courseSolutionHtml;
  if(typeof _sol === 'function') window.courseSolutionHtml = function(ex){
    const html = _sol.apply(this, arguments);
    return format(html, ex) || (ex && ex.exercise_type === 'answer_pattern' && PAREN.test(ex.solution || '') && typeof courseExSolutionHtml === 'function' ? courseExSolutionHtml(ex) : html);
  };
  const _ex = window.courseExSolutionHtml;
  if(typeof _ex === 'function') window.courseExSolutionHtml = function(ex){
    const f = ex && ex.exercise_type !== 'answer_pattern' ? format(escHtml(ex.solution || ''), ex) : (ex && !PAREN.test(ex.solution || '') ? format(escHtml(ex.solution || ''), ex) : null);
    return f ? f + (typeof courseMetaGermanHtml === 'function' ? courseMetaGermanHtml(ex) : '') : _ex.apply(this, arguments);
  };
})();


/* ---------- Vokabeln fällig setzen: Anzahl wählbar, Vorschlag bearbeitbar (Haken pro Vokabel) ---------- */
(function(){
  let st = null;
  const LSK = 'act-n';
  const close = () => { const o = document.getElementById('act-overlay'); if(o) o.remove(); st = null; };
  function rows(){
    if(!st) return '';
    if(st.loading) return '<div class="neu-sub" style="text-align:center;padding:1.2rem">Lade Vorschlag …</div>';
    if(!st.picked.length) return '<div class="neu-sub" style="text-align:center;padding:1.2rem">Keine passenden Vokabeln ohne Fälligkeit gefunden.</div>';
    return st.picked.map(x => {
      const v = VOCAB_BY_ID[x.id] || {}, off = st.excluded.has(x.id);
      return '<label class="act-row'+(off?' off':'')+'"><input type="checkbox" '+(off?'':'checked')+' data-id="'+x.id+'">'
        + '<span class="ar">'+escHtml(v.ar||'')+'</span><span class="mid"><b>'+escHtml(v.en||'')+'</b><i>'+escHtml(v.tr||'')+'</i></span><span class="src">'+escHtml(x.src||'')+'</span></label>';
    }).join('');
  }
  function paint(){
    const o = document.getElementById('act-overlay'); if(!o || !st) return;
    const sel = st.picked.filter(x => !st.excluded.has(x.id)).length;
    o.querySelector('.act-list').innerHTML = rows();
    o.querySelector('.act-count').textContent = st.loading ? '' : sel+' von '+st.picked.length+' ausgewählt';
    const go = o.querySelector('.act-go'); go.textContent = 'Fällig setzen ('+sel+')'; go.disabled = st.loading || !sel;
    o.querySelectorAll('.act-list input').forEach(cb => cb.onchange = () => { const id = parseInt(cb.dataset.id, 10); if(cb.checked) st.excluded.delete(id); else st.excluded.add(id); paint(); });
  }
  async function load(){
    st.loading = true; paint();
    try{ st.picked = await statsPickVocab(st.n); }catch(e){ st.picked = []; showToast('Fehler: '+e.message, 'err'); }
    st.loading = false; paint();
  }
  window.openActivateDialog = function(){
    if(!currentUser){ showToast('Fehler: nicht eingeloggt', 'err'); return; }
    close();
    let n = 10; try{ n = parseInt(localStorage.getItem(LSK), 10) || 10; }catch(e){}
    st = {n, picked: [], excluded: new Set(), loading: true};
    const o = document.createElement('div'); o.id = 'act-overlay';
    o.innerHTML = '<div class="act-box"><div class="act-head"><div style="font-size:1.1rem;font-weight:700;color:var(--gold2)">Vokabeln fällig setzen</div>'
      + '<div class="neu-sub" style="margin:.1rem 0 .5rem">Erst Vokabeln mit Kursbezug, danach aus dem Quellenabgleich. Haken raus = nicht fällig setzen.</div>'
      + '<div style="display:flex;gap:.5rem;align-items:center"><span class="neu-sub" style="white-space:nowrap">Anzahl</span><input class="act-n" type="number" inputmode="numeric" min="1" max="200" value="'+n+'"><button class="neu-btn ghost act-reload" style="min-height:44px;width:auto;padding:0 .9rem">Vorschlag laden</button></div>'
      + '<div class="act-count neu-sub" style="margin-top:.5rem"></div></div>'
      + '<div class="act-list"></div>'
      + '<div class="act-foot"><button class="neu-btn ghost act-cancel" style="flex:1">Abbrechen</button><button class="neu-btn act-go" style="flex:1.4" disabled>Fällig setzen</button></div></div>';
    document.body.appendChild(o);
    const inp = o.querySelector('.act-n');
    const reload = () => { const v = Math.max(1, Math.min(200, parseInt(inp.value, 10) || 10)); inp.value = v; try{ localStorage.setItem(LSK, String(v)); }catch(e){} st.n = v; load(); };
    o.querySelector('.act-reload').onclick = reload;
    inp.addEventListener('keydown', e => { if(e.key === 'Enter'){ inp.blur(); reload(); } });
    inp.addEventListener('change', reload);
    o.querySelector('.act-cancel').onclick = close;
    o.addEventListener('click', e => { if(e.target === o) close(); });
    o.querySelector('.act-go').onclick = async () => {
      const sel = st.picked.filter(x => !st.excluded.has(x.id));
      if(!sel.length) return;
      const go = o.querySelector('.act-go'); go.disabled = true; go.textContent = 'Schreibe …';
      try{
        await statsActivateApply(sel);
        showToast('✓ '+sel.length+' Vokabeln fällig gesetzt', 'ok');
      }catch(e){ showToast('Fehler: '+e.message, 'err'); }
      close();
      if(cMode === 'home') goHome(); else if(cMode === 'stats') showStats();
    };
    load();
  };
  window.statsActivateVocab = () => window.openActivateDialog();
})();

/* ===== Einheitliche Linien-Symbole: ersetzt Emojis im sichtbaren Text durch SVG ===== */
(function(){
  const P = {
    volume:'<path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>',
    mute:'<path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="m16 9 5 6M21 9l-5 6"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    star:'<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    book:'<path d="M12 6c-2-1.5-5-2-9-2v14c4 0 7 .5 9 2 2-1.5 5-2 9-2V4c-4 0-7 .5-9 2zM12 6v14"/>',
    books:'<path d="M4 4h4v16H4zM10 4h4v16h-4z"/><path d="m16 6 4-1 3 14-4 1z" transform="translate(-2 0)"/>',
    cap:'<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.500 6-3v-4.500"/>',
    link:'<path d="M10 14a4 4 0 0 0 5.700 0l3-3a4 4 0 0 0-5.700-5.700l-1 1"/><path d="M14 10a4 4 0 0 0-5.700 0l-3 3a4 4 0 0 0 5.700 5.700l1-1"/>',
    warn:'<path d="M12 3 2 20h20z"/><path d="M12 10v5M12 17.500v.5"/>',
    hourglass:'<path d="M6 3h12M6 21h12M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9"/>',
    bulb:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.500 10.900c.7.600 1 1.300 1 2.100h5c0-.8.300-1.500 1-2.100A6 6 0 0 0 12 3z"/>',
    flag:'<path d="M5 21V4M5 4h12l-2 4 2 4H5"/>',
    repeat:'<path d="m17 2 4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/>',
    bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    chat:'<path d="M21 12a8 8 0 0 1-11.600 7.100L4 20l1-4.500A8 8 0 1 1 21 12z"/>',
    sparkle:'<path d="M12 3l1.800 5.200L19 10l-5.200 1.800L12 17l-1.800-5.200L5 10l5.200-1.800z"/><path d="M19 17v4M17 19h4"/>',
    pencil:'<path d="M4 20l1-4L16.500 4.500a2.100 2.100 0 0 1 3 3L8 19z"/><path d="m14 7 3 3"/>',
    aa:'<path d="M3 18 8 6l5 12M5 14h6M15 18l3.500-8 3 8M16.500 15.500h4"/>',
    check:'<path d="m5 12.500 4.500 4.500L19 7.500"/>',
    checkc:'<circle cx="12" cy="12" r="9"/><path d="m8 12.500 3 3 5-6"/>',
    xc:'<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/>',
    x:'<path d="m6 6 12 12M18 6 6 18"/>',
    help:'<circle cx="12" cy="12" r="9"/><path d="M9.500 9.500a2.500 2.500 0 1 1 3.500 2.300c-.7.400-1 1-1 1.700M12 17v.5"/>',
    dice:'<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8.500 8.500h.01M15.500 8.500h.01M12 12h.01M8.500 15.500h.01M15.500 15.500h.01"/>',
    mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    shuffle:'<path d="M3 6h3c6 0 6 12 12 12h3M3 18h3c2 0 3.500-1 4.700-2.500M21 6h-3c-2 0-3.500 1-4.700 2.500M18 3l3 3-3 3M18 15l3 3-3 3"/>',
    lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    bars:'<path d="M5 21V11M12 21V4M19 21v-7"/>',
    hand:'<path d="M8 12V5.500a1.500 1.500 0 0 1 3 0V11M11 10V4a1.500 1.500 0 0 1 3 0v6M14 10V5.500a1.500 1.500 0 0 1 3 0V13a7 7 0 0 1-7 7c-3 0-4.500-1.500-6-4l-1-2a1.500 1.500 0 0 1 2.500-1.500L8 14"/>',
    compass:'<circle cx="12" cy="12" r="9"/><path d="m15.500 8.500-2 5-5 2 2-5z"/>',
    save:'<path d="M5 4h11l3 3v13H5z"/><path d="M8 4v5h7V4M8 20v-6h8v6"/>',
    target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    flame:'<path d="M12 3c1 3.500 5 5.500 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 .200 1.500 1 2 1.500 2C10 8 11 5 12 3z"/>',
    brain:'<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 4 3 3 0 0 0 1.500 5A3 3 0 0 0 9 20V4zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 4 3 3 0 0 1-1.500 5A3 3 0 0 1 15 20V4z"/>',
    file:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/>',
    box:'<path d="M3 8l9-5 9 5v8l-9 5-9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
    archive:'<rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v10h14V9M10 13h4"/>',
    clip:'<rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4h6v3H9zM9 12h6M9 16h4"/>',
    puzzle:'<path d="M10 4a2 2 0 1 1 4 0v2h4v4h-2a2 2 0 1 0 0 4h2v4h-4v-2a2 2 0 1 0-4 0v2H6v-4h2a2 2 0 1 0 0-4H6V6h4z"/>',
    ruler:'<path d="m4 16 12-12 4 4L8 20z"/><path d="m8 12 2 2M11 9l2 2M14 6l2 2"/>',
    cart:'<circle cx="9" cy="20" r="1.200"/><circle cx="18" cy="20" r="1.200"/><path d="M3 4h3l2.500 11h10l2-8H7"/>',
    eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    inbox:'<path d="M3 13l3-8h12l3 8v6H3z"/><path d="M3 13h5l1 3h6l1-3h5"/>',
    skip:'<path d="m5 5 8 7-8 7zM16 5v14"/>'
  };
  const M = {'🔊':'volume','🔇':'mute','📅':'calendar','⭐':'star','🌟':'star','🔍':'search','📖':'book','📚':'books','🎓':'cap','🔗':'link','⚠️':'warn','⚠':'warn','⏳':'hourglass','💡':'bulb','🚩':'flag','🏳️':'flag','🔁':'repeat','⚡':'bolt','➕':'plus','💬':'chat','🎉':'sparkle','👏':'sparkle','✏️':'pencil','✎':'pencil','🔤':'aa','🔠':'aa','✅':'checkc','✔️':'check','❌':'xc','✖️':'x','❓':'help','🎲':'dice','📬':'mail','🔀':'shuffle','🔒':'lock','📊':'bars','🙋':'hand','🧭':'compass','💾':'save','🎯':'target','💪':'flame','🧠':'brain','📄':'file','📦':'box','🗄':'archive','📋':'clip','🧩':'puzzle','📐':'ruler','🛒':'cart','👁':'eye','📭':'inbox','⏭':'skip'};
  const SM = {}; Object.keys(M).forEach(k => { SM[k.replace(/\uFE0F/g,'')] = M[k]; }); Object.keys(SM).forEach(k => { M[k] = SM[k]; });
  const DOT = {'🟡':'var(--gold)','🔴':'#c0392b','🟠':'#d9822b','🔵':'#3a7bc8','⚪':'var(--muted)'};
  const keys = Object.keys(M).map(k=>k.replace(/\uFE0F/g,'')).filter((k,i,a)=>a.indexOf(k)===i).concat(Object.keys(DOT)).sort((a,b)=>b.length-a.length).map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));
  const RE = new RegExp('('+keys.join('|')+')\\uFE0F?','g');
  const SKIP = {SCRIPT:1,STYLE:1,TEXTAREA:1,INPUT:1,OPTION:1,SELECT:1,TITLE:1};
  function svg(name){ return '<svg class="neu-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+P[name]+'</svg>'; }
  function html(sym){
    if(DOT[sym]) return '<span class="neu-ic neu-dot" style="background:'+DOT[sym]+'"></span>';
    return svg(M[sym]);
  }
  function fix(root){
    if(!root || root.nodeType === 8) return;
    if(root.nodeType === 3){ root = root.parentNode; if(!root) return; }
    if(root.nodeType !== 1 || SKIP[root.tagName] || root.closest('option,select,textarea,[data-noicon]')) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {acceptNode(n){
      const p = n.parentNode; if(!p || SKIP[p.tagName]) return NodeFilter.FILTER_REJECT;
      RE.lastIndex = 0; return RE.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT; }});
    const list = []; while(w.nextNode()) list.push(w.currentNode);
    list.forEach(n => {
      const p = n.parentNode; if(!p || p.closest('option,select,textarea,[data-noicon]')) return;
      const tmp = document.createElement('span');
      tmp.innerHTML = n.nodeValue.replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])).replace(RE, m => html(m.replace(/️$/,'').length ? m.replace(/️$/,'') : m));
      const frag = document.createDocumentFragment(); while(tmp.firstChild) frag.appendChild(tmp.firstChild);
      p.replaceChild(frag, n);
    });
  }
  let busy = false;
  const mo = new MutationObserver(muts => {
    if(busy) return; busy = true;
    try{ muts.forEach(m => { m.addedNodes.forEach(n => fix(n)); if(m.type === 'characterData') fix(m.target); }); }finally{ busy = false; }
  });
  function start(){ fix(document.body); mo.observe(document.body, {childList:true, subtree:true, characterData:true}); }
  if(document.body) start(); else document.addEventListener('DOMContentLoaded', start);
  window.neuIcons = fix;
})();


/* ===== Arabische Schrift: Schriftart, Größe, Vokalzeichen ===== */
(function(){
  const LS = { get(k, d){ try{ const v = localStorage.getItem(k); return v === null ? d : v; }catch(e){ return d; } }, set(k, v){ try{ localStorage.setItem(k, v); }catch(e){} } };
  const HARAKAT = /[\u064B-\u065F\u0670\u06D6-\u06ED]/g;
  const HAS = /[\u064B-\u065F\u0670\u06D6-\u06ED]/;
  const orig = new Map();   // Textknoten -> Originaltext, solange Vokalzeichen ausgeblendet sind
  const on = () => LS.get('neu-arv', '1') === '1';
  const SKIP = {SCRIPT:1, STYLE:1, TEXTAREA:1, INPUT:1, OPTION:1, SELECT:1};
  function apply(){
    const r = document.documentElement;
    const f = LS.get('neu-arf', 'naskh'); if(f === 'naskh') r.removeAttribute('data-arf'); else r.setAttribute('data-arf', f);
    r.style.setProperty('--ars', LS.get('neu-ars', '1'));
  }
  function strip(root){
    if(on()) return;
    if(root && root.nodeType === 3) root = root.parentNode;
    if(!root || root.nodeType !== 1 || SKIP[root.tagName] || root.closest('textarea,input,[contenteditable],[data-noicon]')) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {acceptNode(n){
      const p = n.parentNode; if(!p || SKIP[p.tagName]) return NodeFilter.FILTER_REJECT;
      return HAS.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT; }});
    const list = []; while(w.nextNode()) list.push(w.currentNode);
    list.forEach(n => { orig.set(n, n.nodeValue); n.nodeValue = n.nodeValue.replace(HARAKAT, ''); });
  }
  function restore(){ orig.forEach((v, n) => { if(n.isConnected) n.nodeValue = v; }); orig.clear(); }
  let busy = false;
  new MutationObserver(muts => {
    if(busy || on()) return; busy = true;
    try{ muts.forEach(m => m.addedNodes.forEach(n => strip(n))); }finally{ busy = false; }
  }).observe(document.documentElement, {childList:true, subtree:true});
  window.arPrev = function(){ const t = 'مَرْحَبًا بِكُمْ'; return on() ? t : t.replace(HARAKAT, ''); };
  const prev = () => { const e = document.getElementById('neu-arprev'); if(e) e.textContent = window.arPrev(); };
  window.neuSetArf = function(v){ LS.set('neu-arf', v); apply(); setMode('more'); };
  window.neuSetArs = function(v){ LS.set('neu-ars', v); apply(); setMode('more'); };
  window.neuToggleArv = function(){
    LS.set('neu-arv', on() ? '0' : '1');
    if(on()) restore(); else strip(document.body);
    setMode('more');
  };
  apply();
  if(!on()) document.addEventListener('DOMContentLoaded', () => strip(document.body));
})();

/* ===== Dialoge: Sprecher farblich getrennt ===== */
(function(){
  const orig = window.mdLite; if(typeof orig !== 'function') return;
  const SPK = '<span style="color:var(--gold2);font-weight:700">';
  window.mdLite = function(s, isDialog){
    let html = orig(s, isDialog);
    if(!isDialog || html.indexOf(SPK) < 0) return html;
    // pro Dialogfeld (Sprechblock) werden Sprecher in der Reihenfolge ihres Auftretens nummeriert
    return html.split('<div style="background:var(--surface2);border-radius:6px;padding:.5rem .65rem;margin-bottom:.5rem">').map((part, i) => {
      if(i === 0) return part;
      const names = [];
      part = part.replace(/<div style="margin-bottom:\.3rem"><span style="color:var\(--gold2\);font-weight:700">([^<]*?):<\/span>/g, (m, n) => {
        let k = names.indexOf(n); if(k < 0){ names.push(n); k = names.length - 1; }
        return '<div class="neu-spkline s'+(k % 4)+'"><span class="neu-spk">'+n+':</span>';
      });
      return '<div class="neu-dlg">' + part;
    }).join('');
  };
})();

/* ===== Partner-Check: Motivation und Bilder für Semia ===== */
(function(){
  const berlinKey = d => berlinDay(d);
  function berlinMidnightISO(){
    const key = berlinKey(new Date()), u = new Date(key + 'T00:00:00Z');
    const wall = u.toLocaleString('sv-SE', {timeZone:'Europe/Berlin'});          // Berliner Uhrzeit zu diesem UTC-Zeitpunkt
    const off = Date.parse(wall.replace(' ', 'T') + 'Z') - u.getTime();
    return new Date(u.getTime() - off).toISOString();
  }
  let today = null;   // {day, n}: heute geprüfte Wörter (ohne „Übersprungen“)
  async function loadToday(){
    const day = berlinKey(new Date());
    if(today && today.day === day) return today.n;
    let n = 0;
    try{ n = await sbApiCount('vocabulary?partner_status=in.(approved,rejected,unknown)&status_updated_at=gte.'+berlinMidnightISO()+'&select=id'); }catch(e){}
    today = {day, n: n || 0};
    return today.n;
  }
  // Bilder: die Sonne öfter, die anderen abwechselnd
  const POOL = ['sun','sun','sun','jasmin','tea','cat','moon','olive','sea'];
  let lastArt = null;
  function pickArt(){ let k; do{ k = POOL[Math.floor(Math.random() * POOL.length)]; }while(k === lastArt && POOL.length > 1); lastArt = k; return k; }
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const isSemia = () => !!(currentUser && currentUser.is_partner);
  function message(n, block){
    if(isSemia()){
      if(n >= 100) return pick(['Über 100 Wörter heute, Semi! Go Semi, go Semi! Ya3tik es-sa77a!', 'Hundert und mehr — du bist unglaublich, Semi!']);
      if(n >= 50) return pick(['Schon über 50 Wörter, Semi. Go Semi, go Semi!', 'Halbe Hundert geschafft. Bravo, Semi!']);
      if(n >= 30) return pick(['Du bist im Fluss, Semi! Go Semi, go Semi!', 'Drei Blöcke und mehr — danke, Semi!']);
      if(n > block) return pick(['Noch ein Block, Semi. Go Semi, go Semi!', 'Yalla Semi, das läuft!']);
      return pick(['Go Semi, go Semi! Mit jedem Wort wird der Trainer besser.', 'Danke, Semi! Ya3tik es-sa77a.']);
    }
    if(n >= 100) return pick(['Über 100 Wörter heute — das ist wirklich stark. Ya3tik es-sa77a!', 'Hundert und mehr! Danke, dass du dir so viel Zeit nimmst.']);
    if(n >= 50) return pick(['Schon über 50 Wörter heute. Das hilft dem Trainer sehr.', 'Halbe Hundert geschafft — bravo!']);
    if(n >= 30) return pick(['Drei Blöcke und mehr heute — danke, das ist eine große Hilfe.', 'Du bist richtig im Fluss. Weiter so!']);
    if(n > block) return pick(['Schön, dass du weitermachst. Jedes geprüfte Wort zählt.', 'Noch ein Block geschafft. Danke dir!', 'Yalla, das läuft gut!']);
    return pick(['Danke! Mit jedem geprüften Wort wird der Trainer besser.', 'Schön, dass du dabei bist. Ya3tik es-sa77a!', 'Gut gemacht — das hilft uns beiden beim Lernen.']);
  }
  const _init = window.partnerInit;
  window.partnerInit = function(){ loadToday(); return _init.apply(this, arguments); };
  const _act = window.partnerAct;
  window.partnerAct = async function(status){
    const r = await _act.apply(this, arguments);
    if(today && /^(approved|rejected|unknown)$/.test(status)) today.n++;
    return r;
  };
  // Karte: Zeile „Heute schon N geprüft · noch M offen“
  const _card = window.partnerRenderCard;
  window.partnerRenderCard = function(v, existing){
    const r = _card.apply(this, arguments);
    const p = document.querySelector('.partner-progress');
    if(p && !existing){
      const line = document.createElement('div'); line.className = 'neu-ptoday';
      const base = n => n ? 'Heute schon '+n+' geprüft' : 'Los geht’s — der erste Block wartet';
      const cheer = () => { if(!isSemia() || typeof _pIdx === 'undefined') return ''; return _pIdx === 0 ? 'Go Semi, go Semi!' : _pIdx === 4 ? 'Halbzeit, Semi! Go Semi, go Semi!' : _pIdx === 9 ? 'Letzte Karte, Semi — du schaffst das!' : ''; };
      const paint = n => { const c = cheer(); line.textContent = c || base(n); };
      paint(today ? today.n : 0);
      p.insertAdjacentElement('afterend', line);
      loadToday().then(paint);
    }
    return r;
  };
  // Zusammenfassung: Bild und Nachricht statt Party-Emoji
  const _sum = window.partnerRenderSummary;
  window.partnerRenderSummary = function(){
    const r = _sum.apply(this, arguments);
    const icon = document.querySelector('.partner-done-icon');
    if(icon && window.neuArt){
      const block = (typeof _pResults !== 'undefined' && _pResults.length) || 10;
      icon.outerHTML = '<div class="neu-art partner-art" aria-hidden="true">'+window.neuArt[pickArt()]+'</div>';
      const t = document.querySelector('.partner-done-text');
      const m = document.createElement('div'); m.className = 'neu-pmsg'; m.textContent = '…';
      if(t) t.insertAdjacentElement('afterend', m);
      loadToday().then(n => { m.textContent = message(n, block) + ' Heute: ' + n + ' geprüft.'; });
    }
    return r;
  };
})();

/* ===== Fortschrittszeile „X  3 / 12 ▬▬“: in allen Übungen die einzige (kleine) obere Leiste ===== */
(function(){
  const X = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="m6 6 12 12M18 6 6 18"/></svg>';
  let busy = false;
  function levelChip(){
    try{
      const ex = (typeof exList !== 'undefined' && exList) ? exList[cIdx] : null; if(!ex) return '';
      let lvl = 0, started = false;
      if(ex.exercise){ const p = COURSE_EX_PROGRESS[ex.exercise.id]; started = !!p; lvl = Math.min((p && p.correct_count) || 0, 6); }
      else if(ex.v && ex.v.id){ const p = srsProgress[ex.v.id]; started = !!(p && p.next_review); lvl = (p && p.level) || 0; }
      else return '';
      const col = started ? 'var(--gold)' : 'var(--border)';
      let bars = '';
      for(let k = 1; k <= 6; k++){ const h = 3 + k * 2; bars += '<rect x="'+((k-1)*4)+'" y="'+(14-h)+'" width="2.6" height="'+h+'" rx="1" fill="'+(started && k <= lvl ? 'var(--gold)' : 'var(--border)')+'"/>'; }
      return '<span class="neu-pl-lv" title="Aktuelle Stufe dieser Übung"><svg viewBox="0 0 24 14" aria-hidden="true">'+bars+'</svg>'+(started ? 'Stufe '+lvl : 'Neu')+'</span>';
    }catch(e){ return ''; }
  }
  function line(){
    if(busy) return; busy = true;
    try{
      const c = document.getElementById('exercise-content'); if(!c) return;
      let el = document.getElementById('neu-progline');
      const sess = document.body.classList.contains('neu-session');
      const txt = (((document.getElementById('ex-progress') || {}).textContent || '').trim()) || (((document.getElementById('neu-prog-n') || {}).textContent || '').trim());
      const m = txt.match(/^(\d+)\s*\/\s*(\d+)$/);
      if(!sess || !m){ if(el) el.remove(); return; }
      const pct = Math.max(0, Math.min(100, Math.round(parseInt(m[1], 10) / parseInt(m[2], 10) * 100)));
      const html = '<button type="button" class="neu-pl-x" onclick="neuLeave()" aria-label="Beenden">'+X+'</button><span>'+m[1]+' / '+m[2]+'</span><i><b style="width:'+pct+'%"></b></i><em></em>';
      if(!el){ el = document.createElement('div'); el.id = 'neu-progline'; }
      if(el.dataset.k !== txt){ el.innerHTML = html; el.dataset.k = txt; }
      const lv = levelChip(), slot = el.querySelector('em');
      if(slot && slot.dataset.k !== lv){ slot.innerHTML = lv; slot.dataset.k = lv; }
      if(c.firstChild !== el) c.insertBefore(el, c.firstChild);
      document.body.classList.toggle('neu-mix', cMode === 'mix');
    } finally { busy = false; }
  }
  ['rFlash', 'rCourseEx'].forEach(n => {
    const f = window[n];
    if(typeof f === 'function') window[n] = function(){ const r = f.apply(this, arguments); try{ line(); }catch(e){} return r; };
  });
  const c = document.getElementById('exercise-content');
  if(c) new MutationObserver(() => { try{ line(); }catch(e){} }).observe(c, {childList:true});
  const p = document.getElementById('ex-progress');
  if(p) new MutationObserver(() => { try{ line(); }catch(e){} }).observe(p, {childList:true, characterData:true, subtree:true});
  setInterval(() => { try{ line(); }catch(e){} }, 500);
})();


/* ===== Hinweise: Offline-Stand, Aktualisierung läuft, neue Version ===== */
(function(){
  function bar(id, cls){
    let e = document.getElementById(id);
    if(!e){ e = document.createElement('div'); e.id = id; e.className = 'neu-pill ' + (cls || ''); document.body.appendChild(e); }
    return e;
  }
  function fmt(t){
    const d = new Date(t), now = new Date();
    const same = d.toDateString() === now.toDateString();
    return (same ? 'heute' : d.toLocaleDateString('de-DE', {day:'numeric', month:'numeric'})) + ', ' + d.toLocaleTimeString('de-DE', {hour:'2-digit', minute:'2-digit'}) + ' Uhr';
  }
  // t = Zeitstempel des gespeicherten Stands; null = Hinweis ausblenden
  window.neuOfflineHint = function(t){
    const e = bar('neu-offline', 'off');
    if(t == null){ e.style.display = 'none'; return; }
    e.innerHTML = '<b>Offline</b> – Stand von ' + fmt(t);
    e.style.display = 'block';
  };
  window.neuBusyHint = function(on){
    const e = bar('neu-busy', 'busy');
    e.textContent = 'Aktualisiere …';
    e.style.display = on ? 'block' : 'none';
  };
  window.neuUpdateHint = function(){
    if(document.getElementById('neu-update')) return;
    const e = bar('neu-update', 'upd');
    e.innerHTML = 'Neue Version – <button type="button" onclick="location.reload()">neu laden</button>';
    e.style.display = 'block';
  };
  window.addEventListener('offline', () => { if(window._neuOffNote !== 1){ window._neuOffNote = 1; } });
})();
