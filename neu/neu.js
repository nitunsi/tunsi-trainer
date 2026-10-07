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
  ear:    svg('<path d="M11 5 6 9H3v6h3l5 4zM15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>')
};
const FONT = {S:16, M:18, L:20};
function applyFont(){ document.documentElement.style.fontSize = (FONT[LS.get('neu-font','M')] || 18) + 'px'; }
applyFont();
const SESSION = ['flash','coursesrs','mix','pairs','listen'];
const HASPROG = ['flash','coursesrs','mix','listen'];
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

/* ---------- Startseite „Heute“ ---------- */
const _cache = {};
async function loadActivity(){
  if(_cache.act && Date.now() - _cache.act.t < 120000) return _cache.act;
  const berlin = d => d.toLocaleDateString('en-CA', {timeZone:'Europe/Berlin'});
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
  const first = await fetchPage(0);
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
  const berlin = d => d.toLocaleDateString('en-CA', {timeZone:'Europe/Berlin'});
  const now = new Date();
  const todayKey = berlin(now);
  const yest = new Date(now); yest.setDate(yest.getDate() - 1);
  const yKey = berlin(yest);
  let saved = null;
  try{ saved = JSON.parse(LS.get('neu-days', 'null')); }catch(e){}
  const counts = {};
  let sinceISO;
  if(saved && saved.c && saved.upTo){
    Object.assign(counts, saved.c);
    // Berliner Mitternacht des Tages nach upTo liegt höchstens 3 Stunden vor 00:00 UTC dieses Tages
    sinceISO = new Date(new Date(saved.upTo + 'T00:00:00Z').getTime() + 86400000 - 3*3600000).toISOString();
  } else {
    sinceISO = new Date(now.getTime() - 91*86400000).toISOString();
  }
  const fresh = {};
  for(let page = 0; page < 40; page++){
    const r = await sbApi('review_log?user_id=eq.'+currentUser.id+'&select=created_at&created_at=gte.'+sinceISO+'&order=created_at.desc&limit=1000&offset='+(page*1000));
    (r || []).forEach(x => { const k = berlin(new Date(x.created_at)); fresh[k] = (fresh[k] || 0) + 1; });
    if(!r || r.length < 1000) break;
  }
  const lowest = saved && saved.upTo ? saved.upTo : '';
  Object.keys(fresh).forEach(k => { if(k > lowest) counts[k] = fresh[k]; });
  const today = counts[todayKey] || 0;
  // nur erledigte Tage (bis gestern) und höchstens 100 Tage merken
  const keep = {};
  const limit = new Date(now.getTime() - 100*86400000);
  Object.keys(counts).forEach(k => { if(k <= yKey && new Date(k + 'T12:00:00Z') >= limit) keep[k] = counts[k]; });
  LS.set('neu-days', JSON.stringify({upTo: yKey, c: keep}));
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
  _cache.dc = {t: Date.now(), today, avgs};
  return _cache.dc;
}
// Immer das höchste übertroffene Fenster zeigen (90 vor 30 vor 14 vor 7)
function motivation(planned, avgs){
  for(const n of [90, 30, 14, 7]){
    if(avgs[n] > 0 && planned > avgs[n]) return {n, avg: Math.round(avgs[n]), pct: Math.round((planned / avgs[n] - 1) * 100)};
  }
  return null;
}

function goHome(){
  reset('home');
  const c = $('exercise-content'); if(!c) return;
  const d = dueCounts(), total = d.voc + d.course;
  const goal = parseInt(LS.get('neu-goal','100'), 10) || 100;
  const empty = total === 0;
  c.innerHTML = '<div class="neu-wrap neu-home">'
    + lessonFilterChip()
    + '<div class="neu-card" style="display:flex;align-items:center;gap:.9rem;padding:.8rem 1rem">'
    +   '<div id="neu-ring">'+ring(0, 76, 8, 'var(--gold)', '…')+'</div>'
    +   '<div style="flex:1;min-width:0"><div class="neu-sub">Tagesziel (Antworten)</div><div id="neu-goal-t" style="font-size:1.15rem;font-weight:700;margin:1px 0">… von '+goal+'</div><div id="neu-streak" class="neu-sub">&nbsp;</div></div>'
    + '</div>'
    + '<div id="neu-motiv"></div>'
    + (empty
      ? '<div class="neu-card" style="text-align:center;padding:.8rem"><div style="font-size:1.15rem;font-weight:700;color:var(--gold2)">Alles erledigt</div><div class="neu-sub" style="margin-top:.2rem">Nächste Wiederholung: <b style="color:var(--text)">'+nextDueText()+'</b></div></div>'
      : '<button class="neu-btn" style="min-height:56px;font-size:1.1rem;margin:0 0 .6rem" onclick="setMode(\'mix\')">Los geht’s · '+fmtN(total)+' fällig</button>')
    + '<div class="neu-row2" style="margin-bottom:.6rem">'
    +   '<button class="neu-btn ghost" style="flex-direction:column;align-items:flex-start;min-height:76px;padding:.6rem .9rem" '+(d.voc?'':'disabled')+' onclick="setMode(\'flash\')"><span class="neu-sub">Vokabeln</span><span style="font-size:1.5rem;line-height:1.1">'+fmtN(d.voc)+'</span><small>fällig'+(d.blocked?' · '+fmtN(d.blocked)+' gesperrt':'')+'</small></button>'
    +   '<button class="neu-btn ghost" style="flex-direction:column;align-items:flex-start;min-height:76px;padding:.6rem .9rem;border-color:#3b4f7a" '+(d.course?'':'disabled')+' onclick="setMode(\'coursesrs\')"><span class="neu-sub" style="color:var(--blue)">Kurs</span><span style="font-size:1.5rem;line-height:1.1">'+fmtN(d.course)+'</span><small>fällig</small></button>'
    + '</div>'
    + '<div id="neu-partner" class="neu-card" style="display:flex;align-items:center;gap:.8rem;cursor:pointer;padding:.7rem 1rem" onclick="setMode(\'partnerqueue\')"><div class="neu-sub">Partner wird geladen …</div></div>'
    + '<div class="neu-chips" style="padding-bottom:0">'
    +   '<span class="neu-chip" onclick="statsActivateVocab(10)">10 Vokabeln neu</span>'
    +   '<span class="neu-chip" onclick="statsUnlockNextChunk()">Nächster Abschnitt</span>'
    +   '<span class="neu-chip" onclick="openPullForward()">Vorziehen</span>'
    +   '<span class="neu-chip" onclick="setMode(\'listen\')">Höraufgabe</span>'
    + '</div>'
    + '</div>';
  loadPartnerLine();
  loadActivity().then(a => {
    const r = $('neu-ring'); if(!r || cMode !== 'home') return;
    const p = a.today / goal;
    r.innerHTML = ring(p, 76, 8, p >= 1 ? 'var(--green)' : 'var(--gold)', Math.min(999, Math.round(p*100)) + ' %');
    $('neu-goal-t').textContent = fmtN(a.today) + ' von ' + fmtN(goal);
    $('neu-streak').textContent = a.streak ? a.streak + ' Tag' + (a.streak===1?'':'e') + ' in Folge' : 'Noch keine Serie';
  }).catch(() => { const s = $('neu-streak'); if(s) s.textContent = ''; });
  // Motivation: heute geplant = heute schon beantwortet + noch fällig
  loadDayCounts().then(dc => {
    const el = $('neu-motiv'); if(!el || cMode !== 'home') return;
    const planned = dc.today + total;
    const m = motivation(planned, dc.avgs);
    if(!m) return;
    el.innerHTML = '<div class="neu-card" style="border-color:var(--gold-d);background:rgba(201,168,76,.08);padding:.7rem 1rem"><div style="font-weight:700;color:var(--gold2)">Über deinem '+m.n+'-Tage-Schnitt</div><div class="neu-sub" style="margin-top:2px">Heute geplant: <b style="color:var(--text)">'+fmtN(planned)+'</b> · Schnitt: '+fmtN(m.avg)+' (+'+m.pct+' %)</div></div>';
  }).catch(() => {});
}
window.neuGoHome = goHome;
window.neuDayCounts = loadDayCounts;

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
    +   li('cards','Vokabelkarten',"setMode('flash')") + li('ear','Höraufgabe (Audio)',"setMode('listen')") + li('repeat','Kurs-Wiederholung',"setMode('coursesrs')") + li('mix','Mix',"setMode('mix')") + li('pairs','Antwort-Paare',"setMode('pairs')")
    + '</div>'
    + '<div class="neu-h">Vokabeln pflegen</div><div class="neu-card neu-list" style="padding:.3rem .9rem">'
    +   li('plus','Vokabel hinzufügen',"setMode('addvocab')") + li('bolt','Aktivierung',"setMode('activate')") + li('book','Lektionen',"setMode('lessons')")
    + '</div>'
    + '<div class="neu-h">Prüfen und Quellen</div><div class="neu-card neu-list" style="padding:.3rem .9rem">'
    +   li('search','Prüfungen',"setMode('dupes')") + li('inbox','Partner-Queue',"setMode('partnerqueue')") + li('check','Partner-Check',"setMode('partnercheck')") + li('compass','Quellenabgleich',"setMode('quellen')") + li('abc','Transliterationsregeln',"setMode('translitregeln')") + li('save','Export',"setMode('export')")
    + '</div>'
    + '<div class="neu-h">Darstellung und Lernen</div><div class="neu-card">'
    +   '<div class="neu-cap">Schriftgröße</div>'+seg([['S','Klein'],['M','Mittel'],['L','Groß']], font, "neuSetFont('%v')")
    +   '<div class="neu-cap" style="margin-top:1rem">Tagesziel (Antworten pro Tag)</div>'+seg([[50,'50'],[100,'100'],[150,'150'],[200,'200']], goal, "neuSetGoal(%v)")
    +   '<div class="neu-list" style="margin-top:.6rem"><div class="li"><span class="sp">Audio beim Aufdecken abspielen</span>'+sw(audioAutoplay, "toggleAudioAutoplay();showMore()")+'</div>'
    +   '<div class="li"><span class="sp">Vibration bei Richtig und Falsch</span>'+sw(vib, "neuToggleVib()")+'</div></div>'
    +   '<div class="neu-cap" style="margin-top:1rem">Lektion einschränken</div>'
    +   '<select id="neu-lesson" onchange="neuLesson(this.value)" style="width:100%;min-height:48px;background:var(--surface2);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:0 .7rem;font-size:1rem">'+lessonOpts+'</select>'
    + '</div>'
    + '<div class="neu-h">Konto</div><div class="neu-card neu-list" style="padding:.3rem .9rem">'
    +   '<div class="li"><span class="sp neu-sub">'+escHtml(currentUser ? currentUser.username : '')+' · '+APP_VERSION+' (neu)</span></div>'
    +   li('swap','Zum alten Design',"location.href='trainer-alt.html'") + li('bug','Debug',"toggleDebug()") + li('out','Abmelden',"doLogout()")
    + '</div>'
    + '</div>';
  const sel = $('neu-lesson');
  if(sel){ sel.value = cLesson; if(sel.value !== cLesson) sel.value = 'all'; }
}
window.neuSetFont = function(k){ LS.set('neu-font', k); applyFont(); showMore(); };
window.neuSetGoal = function(n){ LS.set('neu-goal', String(n)); showMore(); };
window.neuToggleVib = function(){ LS.set('neu-vib', LS.get('neu-vib','0') === '1' ? '0' : '1'); if(LS.get('neu-vib') === '1' && navigator.vibrate) navigator.vibrate(30); showMore(); };
window.neuLesson = function(v){ const s = $('lesson-select'); if(s) s.value = v; try{ filterLessonDropdown(v); }catch(e){} goHome(); };

/* Vibration (Android), standardmäßig aus */
function vibe(ok){ if(LS.get('neu-vib','0') === '1' && navigator.vibrate) navigator.vibrate(ok ? 15 : [40,40,40]); }
const _srsAnswer = window.srsAnswer;
if(_srsAnswer) window.srsAnswer = function(v, ok){ vibe(ok); return _srsAnswer.apply(this, arguments); };
const _courseExAnswer = window.courseExAnswer;
if(_courseExAnswer) window.courseExAnswer = function(ex, ok){ vibe(ok); return _courseExAnswer.apply(this, arguments); };

/* ---------- Höraufgaben im normalen Lernen (Richtung „Audio → Deutsch“) ---------- */
// Nur bei eingeschaltetem Ton (Lautsprecher-Schalter unten) und eingeschalteter Einstellung, nur für Vokabeln mit Audio.
window.neuPickDir = function(v, lvl){
  const base = lvl >= 3 ? 'de2ar' : (Math.random() > .5 ? 'ar2de' : 'de2ar');
  if(!audioAutoplay || LS.get('neu-listen','1') !== '1' || !v.au) return base;
  return Math.random() < (lvl >= 3 ? 0.15 : 0.34) ? 'au2de' : base;
};
window.neuToggleListen = function(){ LS.set('neu-listen', LS.get('neu-listen','1') === '1' ? '0' : '1'); showMore(); };

/* ---------- Leerer Zustand in der Sitzung ---------- */
function nothingDue(){
  const c = $('exercise-content'); if(!c) return;
  const sn = $('sticky-next'); if(sn) sn.style.display = 'none';
  c.innerHTML = '<div class="neu-wrap" style="text-align:center;padding-top:2rem">'
    + '<div style="font-size:1.5rem;font-weight:700;color:var(--gold2)">Alles erledigt</div>'
    + '<div class="neu-sub" style="margin:.5rem 0 1.4rem">Nichts fällig. Nächste Wiederholung: <b style="color:var(--text)">'+nextDueText()+'</b></div>'
    + '<div style="display:flex;flex-direction:column;gap:.7rem;text-align:left">'
    +   '<button class="neu-btn" onclick="statsActivateVocab(10)">10 Vokabeln fällig setzen</button>'
    +   '<button class="neu-btn blue" onclick="statsUnlockNextChunk()">Nächsten Kurs-Abschnitt freischalten</button>'
    +   '<button class="neu-btn line" onclick="openPullForward()">Vorziehen</button>'
    +   '<button class="neu-btn ghost" onclick="neuGoHome()">Zur Startseite</button>'
    + '</div></div>';
  $('ex-type-label').textContent = ''; $('ex-progress').textContent = '';
}
window.showNothingDue = nothingDue;
window.showCourseNothingDue = nothingDue;

/* ---------- Abschluss nach einem Block ---------- */
window.showRes = function(){
  const pct = score.t > 0 ? Math.round(score.c / score.t * 100) : 0;
  const msgs = pct >= 90 ? ['مَشَاءَ الله! Māsha allah!', 'زِين بَرشَة! Zin barsha!']
    : pct >= 70 ? ['مْلِيح بَرشَة Mli7 barsha!', 'هَكَّة نَعرَف! Hakka na3ref!']
    : pct >= 50 ? ['شْوَيَّة شْوَيَّة Shwayya shwayya', 'عَاوِد مَرَّة أُخرى 3awid marra okhra']
    : ['يَالَّة، عَاوِد! Yalla, 3awid!', 'صَبرَا جَمِيل Sabra jmil'];
  const r = $('result-screen');
  r.innerHTML = '<div class="neu-res">'
    + ring(pct/100, 150, 12, pct >= 70 ? 'var(--green)' : 'var(--gold)', score.c + ' / ' + score.t)
    + '<div class="msg">'+(pct>=70?'Gut gemacht':'Weiter üben')+' · '+pct+' %</div>'
    + '<div class="sub">'+msgs[Math.floor(Math.random()*msgs.length)]+'</div>'
    + '<div class="rows"><div><span>Richtig</span><b style="color:var(--green)">'+score.c+'</b></div><div><span>Falsch</span><b style="color:var(--red)">'+score.w+'</b></div><div><span>Gesamt</span><b>'+score.t+'</b></div></div>'
    + '<div style="width:100%;display:flex;flex-direction:column;gap:.7rem"><button class="neu-btn" onclick="restartExercise()">Noch einen Block</button><button class="neu-btn ghost" onclick="closeResult();neuGoHome()">Fertig für heute</button></div>'
    + '</div>';
  r.classList.add('show');
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
    + '<div class="neu-card"><div class="neu-cap">Gesamt</div>'+line('Vokabeln', vocStat([...allV.values()]))+line('Übungen', exStat(allItems))+'</div>'
    + '<div class="neu-card" style="padding:.2rem .9rem">'+nodes+'</div>'
    + '</div>';
};

/* ---------- Vokabelliste als Karten ---------- */
const NEUF = {due:false, neu:false, audio:false, flag:false, select:false};
window.neuChipsHtml = function(){
  const c = (k, l) => '<span class="neu-chip'+(NEUF[k]?' on':'')+'" data-k="'+k+'" onclick="neuVChip(\''+k+'\')">'+l+'</span>';
  return '<div class="neu-chips" id="neu-vchips">'+c('due','Fällig')+c('neu','Ohne Fälligkeit')+c('audio','Mit Audio')+c('flag','Markiert')+'</div>';
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
window.showVocabList = function(){ NEUF.due = NEUF.neu = NEUF.audio = NEUF.flag = NEUF.select = false; return _svl.apply(this, arguments); };

window.renderVocabTableRows = function(){
  const vocabFull = vocabFilteredFull;
  const el = $('vocab-table'); if(!el) return;
  el.classList.toggle('neu-sel', NEUF.select);
  const top = '<div style="display:flex;justify-content:space-between;align-items:center;margin:.1rem 0 .6rem;min-height:40px;font-size:.9rem;color:var(--muted)">'
    + (NEUF.select ? '<label style="display:flex;align-items:center;gap:.5rem;cursor:pointer"><input type="checkbox" id="vl-check-all" onchange="toggleSelectAll(this)" style="width:20px;height:20px"> Alle</label>' : '<span>'+fmtN(vocabFull.length)+(vocabFull.length === 1 ? ' Vokabel' : ' Vokabeln')+'</span>')
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
      + '<div class="ar">'+v.ar+'</div>'
      + '<div class="mid"><div class="t1">'+escHtml(v.en)+'</div><div class="t2 neu-mono">'+escHtml(v.tr)+conj+'</div><div class="t2">'+v.ls+flag+(psIcon?' · '+psIcon:'')+'</div></div>'
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
const _restart = window.restartExercise;
window.restartExercise = function(){ if(cMode === 'listen'){ closeResult(); startListen(); return; } return _restart.apply(this, arguments); };


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
const PHASE_COL = ['#3a3228', '#7a6330', '#b0913f', '#e8c96a'];
const LV_COL = ['#4a4034','#6f6246','#8c7536','#a68a3a','#c4a449','#d6b755','#e8c96a','#f6de8e'];
const pct0 = (a,b) => b ? Math.round(100*a/b) : 0;
async function loadActivityBars(N){
  const key = 'act' + N;
  if(_cache[key] && Date.now() - _cache[key].t < 120000) return _cache[key].d;
  const berlin = d => d.toLocaleDateString('en-CA', {timeZone:'Europe/Berlin'});
  const midnight = new Date(); midnight.setHours(0,0,0,0);
  const since = new Date(midnight); since.setDate(since.getDate() - (N-1));
  const days = {};
  for(let page = 0; page < 30; page++){
    const r = await sbApi('review_log?user_id=eq.'+currentUser.id+'&select=correct,created_at&created_at=gte.'+since.toISOString()+'&order=created_at.desc&limit=1000&offset='+(page*1000));
    (r || []).forEach(x => { const k = berlin(new Date(x.created_at)); const e = days[k] || (days[k] = {a:0, c:0}); e.a++; if(x.correct) e.c++; });
    if(!r || r.length < 1000) break;
  }
  const list = [];
  for(let i = N-1; i >= 0; i--){ const d = new Date(midnight); d.setDate(d.getDate() - i); const e = days[berlin(d)] || {a:0, c:0}; list.push({d, a:e.a, c:e.c}); }
  _cache[key] = {t: Date.now(), d: list};
  return list;
}
const WD = ['So','Mo','Di','Mi','Do','Fr','Sa'];
function barChart(items, opts){
  // items: [{v, c?, label, hot, act}] — c = Teilwert (richtig) für gestapelte Balken
  const max = Math.max(1, ...items.map(x => x.v));
  const H = 96, thin = items.length > 16, nums = items.length <= 14 && max < 1000;
  const body = items.map(x => {
    const h = Math.round(x.v / max * H);
    const hc = x.c != null && x.v ? Math.round(h * x.c / x.v) : h;
    const bar = x.v ? (x.c != null
      ? '<i style="height:'+(h-hc)+'px;background:#5a4c2e"></i><i style="height:'+hc+'px;background:var(--gold)"></i>'
      : '<i style="height:'+h+'px;background:'+(x.hot?'var(--gold2)':'#6f6246')+'"></i>') : '';
    return '<div class="b'+(x.hot?' hot':'')+'"'+(x.act?' onclick="'+x.act+'"':'')+'>'+(nums?'<b>'+(x.v?fmtN(x.v):'')+'</b>':'')+'<div class="col">'+bar+'</div>'+(thin?'':'<span>'+(x.label||'')+'</span>')+'</div>';
  }).join('');
  let axis = '';
  if(thin){
    const n = items.length, pick = [0, Math.floor(n/2), n-1].map(i => items[i].ax || '');
    axis = '<div class="neu-axis"><span>'+pick[0]+'</span><span>'+pick[1]+'</span><span>'+pick[2]+'</span></div>';
  }
  return '<div class="neu-bars'+(thin?' thin':'')+'">'+body+'</div>'+axis;
}
function winChips(cur, fn){ return '<div style="display:flex;gap:.35rem">'+[7,14,30,90].map(n => '<span class="neu-chip'+(n===cur?' on':'')+'" style="min-height:32px;padding:0 .65rem" onclick="'+fn+'('+n+')">'+n+'</span>').join('')+'</div>'; }
window.neuSetFc = function(n){ forecastWindow = n; showStats(); };
window.neuSetAct = function(n){ activityWindow = n; renderActivityCard(); };
window.neuFilterOffStats = function(){ try{ filterLessonDropdown('all'); }catch(e){ cLesson = 'all'; } showStats(); };

function renderActivityCard(){
  const el = $('neu-act-body'); if(!el) return;
  const N = activityWindow;
  $('neu-act-chips').innerHTML = winChips(N, 'neuSetAct');
  el.innerHTML = '<div class="neu-sub" style="padding:1.2rem 0;text-align:center">Lade …</div>';
  loadActivityBars(N).then(list => {
    if(!$('neu-act-body') || N !== activityWindow) return;
    let items;
    if(N >= 90){
      items = [];
      for(let i = 0; i < list.length; i += 7){ const part = list.slice(i, i+7); const a = part.reduce((s,x)=>s+x.a,0), c = part.reduce((s,x)=>s+x.c,0); items.push({v:a, c, label:(part[0].d.getDate())+'.'+(part[0].d.getMonth()+1)+'.'}); }
      items = items.map((x,i) => ({...x, label: i % 3 === 0 ? x.label : '', ax: x.label}));
    } else {
      items = list.map((x,i) => ({v:x.a, c:x.c, hot:i===list.length-1, label: N <= 14 ? (i===list.length-1 ? 'Heute' : WD[x.d.getDay()]) : '', ax: x.d.getDate()+'.'+(x.d.getMonth()+1)+'.'}));
    }
    el.innerHTML = barChart(items);
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
    const label = N <= 14 ? (i===0 ? 'Heute' : i===1 ? 'Morgen' : WD[dd.getDay()]) : '';
    return {v, label, hot:i===0, act: i===0 ? 'openPullForward()' : '', ax: i===0 ? 'Heute' : dd.getDate()+'.'+(dd.getMonth()+1)+'.'}; });
  const lvTot = vb.map((x,i) => x + cb[i]), lvSum = lvTot.reduce((a,x)=>a+x,0) || 1;
  const hints = ['ohne Fälligkeit','fällig','Wdh. in 1 T','3 T','7 T','14 T','30 T','90 T'];
  const lvRows = lvTot.map((n,i) => '<div class="neu-lvrow"><u style="background:'+LV_COL[i]+'"></u><span>'+(i===0?'Neu':'Stufe '+(i-1))+'</span><em>'+hints[i]+'</em><b>'+fmtN(n)+'</b><s'+(dueByBucket[i]?' style="color:var(--red)"':'')+'>'+(dueByBucket[i]?fmtN(dueByBucket[i])+' fällig':'')+'</s></div>').join('');

  c.innerHTML = '<div class="neu-wrap">'
    + '<div style="font-size:1.5rem;font-weight:700;margin:.2rem 0 .6rem">Statistik</div>'
    + (all ? '' : '<div style="margin-bottom:.6rem"><span class="neu-chip on" onclick="neuFilterOffStats()">Filter: '+escHtml(cLesson==='COURSEVOCAB'?'Kurs-Lektion':cLesson)+' ✕</span></div>')
    + '<div class="neu-row2" style="margin-bottom:.7rem">'
    +   '<div class="neu-card" style="margin:0;padding:.7rem .9rem"><div class="neu-sub">Fällig</div><div class="neu-kpi" style="font-size:1.6rem">'+fmtN(d.voc + (all ? d.course : 0))+'</div></div>'
    +   '<div class="neu-card" style="margin:0;padding:.7rem .9rem"><div class="neu-sub">Erledigt</div><div class="neu-kpi" id="neu-st-today" style="font-size:1.6rem">…</div></div>'
    +   '<div class="neu-card" style="margin:0;padding:.7rem .9rem"><div class="neu-sub">Serie</div><div class="neu-kpi" id="neu-st-streak" style="font-size:1.6rem">…</div></div>'
    + '</div>'
    + (all && weighted < 25 ? '<div class="neu-card" style="border-color:var(--red);background:rgba(201,76,76,.08);padding:.6rem .9rem;color:var(--red);font-size:.9rem">Anfänger-Puffer wird knapp (noch '+Math.round(weighted)+'). Neuen Stoff hinzufügen: tippe unten bei „Neu“.</div>' : '')
    + '<div class="neu-card"><div class="neu-ch">Fortschritt</div>'
    +   prog('Vokabeln', vStarted, vTotal, vp, all ? 'statsActivateVocab(10)' : '', '10 Vokabeln fällig setzen: erst mit Kursbezug ('+fmtN(courseVocabLeft)+' offen), danach aus dem Quellenabgleich')
    +   (all ? '<div style="height:1px;background:var(--border);margin:1rem 0"></div>'+prog('Übungen', cActive, cTotal, cp, nextChunk ? 'statsUnlockNextChunk()' : '', nextChunk ? 'Nächsten Kurs-Abschnitt freischalten: K'+nextChunk.lesson.course_number+' · '+(nextChunk.chunkLabel||nextChunk.chunkKey) : '') : '')
    + '</div>'
    + '<div class="neu-card"><div class="neu-ch" style="display:flex;justify-content:space-between;align-items:center;gap:.5rem"><span>Fällig</span><span style="display:flex;gap:.5rem;align-items:center"><span class="neu-chip" style="min-height:32px;padding:0 .7rem" onclick="openPullForward()">Vorziehen</span></span></div>'
    +   '<div style="margin:.2rem 0 .7rem">'+winChips(N, 'neuSetFc')+'</div>'
    +   barChart(fcItems) + (fcBlocked ? '<div class="neu-sub" style="margin-top:.5rem">'+fmtN(fcBlocked)+' in der Partner-Queue gesperrt</div>' : '')
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
  loadActivity().then(a => { const t = $('neu-st-today'), s = $('neu-st-streak'); if(t) t.textContent = fmtN(a.today); if(s) s.textContent = a.streak ? a.streak + ' T' : '–'; }).catch(() => {});
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
const sky=`<svg viewBox="0 0 220 100" width="220"><g fill="#14110e" stroke="${G}" stroke-width="2" stroke-linejoin="round"><path d="M6 96V62h30v34M40 96V44h34v52M78 96V68h26v28M108 96V52h30v44M142 96V70h28v26M174 96V58h38v38"/><path d="M40 44a17 14 0 0 1 34 0M108 52a15 12 0 0 1 30 0" stroke="${B}"/></g><g fill="${G2}"><rect x="50" y="58" width="6" height="10" rx="3"/><rect x="118" y="66" width="6" height="10" rx="3"/><rect x="186" y="72" width="7" height="12" rx="3.5"/><rect x="14" y="74" width="5" height="9" rx="2.5"/></g><path d="M0 98h220" stroke="${G}" stroke-width="2"/><g fill="none" stroke="${G2}" stroke-width="2"><path d="M178 20a11 11 0 1 0 6 18a9 9 0 1 1-6-18z" fill="${G2}" stroke="none"/></g></svg>`;
const arches=`<svg viewBox="0 0 220 110" width="220"><g fill="none" stroke="${G}" stroke-width="2.2">${[[20,40],[75,60],[145,40]].map(([x,w])=>`<path d="M${x} 104V${70-w/2+20}a${w/2} ${w/2} 0 0 1 ${w} 0V104"/>`).join('')}<path d="M75 104V70a30 30 0 0 1 60 0v34" stroke="${G2}" stroke-width="3"/><path d="M85 104V72a20 20 0 0 1 40 0v32" opacity=".5"/><path d="M0 104h220"/></g><circle cx="105" cy="38" r="3" fill="${G2}"/></svg>`;
const olive=(()=>{const x0=14,y0=66,x1=206,y1=30,ang=Math.atan2(y1-y0,x1-x0);let g='';for(let i=0;i<7;i++){const t=(i+.6)/7.4,x=x0+(x1-x0)*t,y=y0+(y1-y0)*t;const d=ang*180/Math.PI;for(const sgn of [-1,1]){const cx=x+Math.sin(ang)*-sgn*-14*1+Math.cos(ang)*6*(sgn>0?1:-1)*0,cy=y+Math.cos(ang)*-sgn*14*-1*-1;const rot=d+sgn*62+90-90;g+=`<ellipse cx="${x+(-Math.sin(ang))*sgn*13*-1}" cy="${y+Math.cos(ang)*sgn*13*-1}" rx="4.5" ry="12" transform="rotate(${d+90+sgn*-55} ${x+(-Math.sin(ang))*sgn*13*-1} ${y+Math.cos(ang)*sgn*13*-1})" fill="none" stroke="${G2}" stroke-width="2"/>`}}
return `<svg viewBox="0 0 220 90" width="220"><path d="M${x0} ${y0}L${x1} ${y1}" stroke="${G}" stroke-width="2.5"/>${g}<circle cx="70" cy="52" r="6" fill="${B}"/><circle cx="128" cy="38" r="6" fill="${B}"/></svg>`})();
const sea=`<svg viewBox="0 0 220 100" width="220"><path d="M60 62a50 50 0 0 1 100 0z" fill="${G}" opacity=".9"/>${[0,1,2,3].map(i=>`<path d="M0 ${68+i*9} q13.75 -8 27.5 0 t27.5 0 t27.5 0 t27.5 0 t27.5 0 t27.5 0 t27.5 0 t27.5 0" fill="none" stroke="${i%2?B:G2}" stroke-width="2" opacity="${1-i*.18}"/>`).join('')}<g transform="translate(110 38)"><path d="M0 -14a14 14 0 1 0 0 28a11 11 0 1 1 0 -28z" fill="#1a1612" transform="translate(-4 0)"/></g></svg>`;

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
