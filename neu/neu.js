/* ===== Tounsi Trainer — neues Design: Logik-Schicht =====
   Wird nur von trainer-neu.html geladen (nach dem Hauptskript). Überschreibt einzelne
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
  document.body.classList.toggle('neu-nohdr', mode==='home' || mode==='more');
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

function goHome(){
  reset('home');
  const c = $('exercise-content'); if(!c) return;
  const d = dueCounts(), total = d.voc + d.course;
  const goal = parseInt(LS.get('neu-goal','100'), 10) || 100;
  const empty = total === 0;
  c.innerHTML = '<div class="neu-wrap">'
    + lessonFilterChip()
    + '<div class="neu-card" style="display:flex;align-items:center;gap:1rem;padding:1.1rem">'
    +   '<div id="neu-ring">'+ring(0, 92, 9, 'var(--gold)', '…')+'</div>'
    +   '<div style="flex:1;min-width:0"><div class="neu-sub">Tagesziel</div><div id="neu-goal-t" style="font-size:1.25rem;font-weight:700;margin:2px 0">… von '+goal+' Antworten</div><div id="neu-streak" class="neu-sub">&nbsp;</div></div>'
    + '</div>'
    + (empty
      ? '<div class="neu-card" style="text-align:center;padding:1.4rem"><div style="font-size:1.3rem;font-weight:700;color:var(--gold2)">Alles erledigt</div><div class="neu-sub" style="margin-top:.4rem">Nächste Wiederholung: <b style="color:var(--text)">'+nextDueText()+'</b></div></div>'
      : '<button class="neu-btn" style="min-height:60px;font-size:1.15rem;margin:.2rem 0 .8rem" onclick="setMode(\'mix\')">Los geht’s · '+fmtN(total)+' fällig</button>')
    + '<div class="neu-row2" style="margin-bottom:.8rem">'
    +   '<button class="neu-btn ghost" style="flex-direction:column;align-items:flex-start;min-height:92px;padding:.9rem" '+(d.voc?'':'disabled')+' onclick="setMode(\'flash\')"><span class="neu-sub">Vokabeln</span><span style="font-size:1.8rem">'+fmtN(d.voc)+'</span><small>fällig'+(d.blocked?' · '+fmtN(d.blocked)+' gesperrt':'')+'</small></button>'
    +   '<button class="neu-btn ghost" style="flex-direction:column;align-items:flex-start;min-height:92px;padding:.9rem;border-color:#3b4f7a" '+(d.course?'':'disabled')+' onclick="setMode(\'coursesrs\')"><span class="neu-sub" style="color:var(--blue)">Kurs</span><span style="font-size:1.8rem">'+fmtN(d.course)+'</span><small>fällig</small></button>'
    + '</div>'
    + '<div id="neu-partner" class="neu-card" style="display:flex;align-items:center;gap:.8rem;cursor:pointer" onclick="setMode(\'partnerqueue\')"><div class="neu-sub">Partner wird geladen …</div></div>'
    + '<div class="neu-card"><div class="neu-cap">Mehr Stoff</div><div style="display:flex;gap:.5rem;flex-wrap:wrap">'
    +   '<span class="neu-chip" onclick="statsActivateVocab(10)">10 Vokabeln neu</span>'
    +   '<span class="neu-chip" onclick="statsUnlockNextChunk()">Nächster Kurs-Abschnitt</span>'
    +   '<span class="neu-chip" onclick="openPullForward()">Vorziehen</span>'
    +   '<span class="neu-chip" onclick="setMode(\'listen\')">Höraufgabe</span>'
    + '</div></div>'
    + '</div>';
  loadPartnerLine();
  loadActivity().then(a => {
    const r = $('neu-ring'); if(!r || cMode !== 'home') return;
    const p = a.today / goal;
    r.innerHTML = ring(p, 92, 9, p >= 1 ? 'var(--green)' : 'var(--gold)', Math.min(999, Math.round(p*100)) + ' %');
    $('neu-goal-t').textContent = fmtN(a.today) + ' von ' + fmtN(goal) + ' Antworten';
    $('neu-streak').textContent = a.streak ? a.streak + ' Tag' + (a.streak===1?'':'e') + ' in Folge' : 'Noch keine Serie';
  }).catch(() => { const s = $('neu-streak'); if(s) s.textContent = ''; });
}
window.neuGoHome = goHome;

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
    +   li('swap','Zum alten Design',"location.href='trainer.html'") + li('bug','Debug',"toggleDebug()") + li('out','Abmelden',"doLogout()")
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
  const nodes = COURSE_LESSONS.map(l => {
    const lc = chunks.filter(ch => ch.lessonId === l.id);
    const items = lc.reduce((s,ch) => s.concat(ch.srsItems), []);
    const total = items.length;
    const unlocked = items.filter(e => COURSE_EX_PROGRESS[e.id]).length;
    const mastered = items.filter(e => COURSE_EX_PROGRESS[e.id] && (COURSE_EX_PROGRESS[e.id].correct_count||0) >= 4).length;
    const state = total === 0 ? 'read' : mastered >= total ? 'done' : unlocked > 0 ? 'run' : 'lock';
    if(state === 'run' && nextId === null) nextId = l.id;
    if(state !== 'done' && state !== 'read' && firstOpen === null) firstOpen = l.id;
    const frac = total ? mastered / total : 0;
    const col = state === 'done' ? 'var(--green)' : state === 'run' ? 'var(--gold)' : 'var(--border)';
    const txt = state === 'done' ? '✓' : state === 'read' ? '–' : Math.round(frac*100);
    const sub = state === 'read' ? 'nur Lesen' : state === 'done' ? 'abgeschlossen' : state === 'run' ? fmtN(mastered)+' von '+fmtN(total)+' Übungen gemeistert' : 'noch nicht freigeschaltet';
    const lv = lessonVocab(l);
    const stats = (lv.length ? line('Vokabeln', vocStat(lv)) : '') + (total ? line('Übungen', exStat(items)) : '');
    return '<div class="neu-node'+(state==='lock'?' lock':'')+'" onclick="showCourseLesson('+l.id+')">'
      + '<div class="top">'+ring(state==='lock'?0:frac, 54, 6, col, txt)
      + '<div class="tx"><div class="t1">Lektion '+l.course_number+'</div><div class="t2">'+escHtml(cleanTitle(l.title))+'</div><div class="t3" style="color:'+(state==='run'?'var(--gold2)':'var(--muted)')+'">'+sub+'</div></div>'
      + '<div style="color:var(--muted);font-size:1.3rem">›</div></div>'
      + (stats ? '<div class="st">'+stats+'</div>' : '')
      + (lv.length ? '<div style="margin-top:.6rem"><span class="neu-chip" onclick="event.stopPropagation();courseGoToVocab('+l.id+')">Vokabeln der Lektion</span></div>' : '')
      + '</div>';
  }).join('');
  const target = COURSE_LESSONS.find(l => l.id === (nextId !== null ? nextId : firstOpen));
  c.innerHTML = '<div class="neu-wrap">'
    + '<div style="font-size:1.5rem;font-weight:700;margin:.2rem 0 .6rem">Kurs</div>'
    + (target ? '<div class="neu-card" style="display:flex;align-items:center;gap:.8rem"><div style="flex:1;min-width:0"><div class="neu-sub">Weiter mit</div><div style="font-size:1.05rem;font-weight:700">L'+target.course_number+' · '+escHtml(cleanTitle(target.title))+'</div></div><button class="neu-btn blue" style="width:auto;min-height:46px;padding:0 1.2rem" onclick="setMode(\'coursesrs\')">Lernen</button></div>' : '')
    + '<div class="neu-card"><div class="neu-cap">Gesamt</div>'+line('Vokabeln', vocStat([...allV.values()]))+line('Übungen', exStat(allItems))+'</div>'
    + '<div class="neu-card" style="padding:.2rem .9rem">'+nodes+'</div>'
    + '</div>';
};

/* ---------- Vokabelliste als Karten ---------- */
window.renderVocabTableRows = function(){
  const vocabFull = vocabFilteredFull;
  const el = $('vocab-table'); if(!el) return;
  if(!vocabFull.length){ el.innerHTML = '<div style="text-align:center;color:var(--muted);padding:2rem">Keine Vokabeln gefunden</div>'; vocabTableRenderedIds = []; return; }
  const vocab = vocabFull.slice(0, vocabVisibleCount);
  vocabTableRenderedIds = vocab.map(v => v.id);
  const countLabel = vocab.length < vocabFull.length ? 'Zeige '+fmtN(vocab.length)+' von '+fmtN(vocabFull.length)+' Vokabeln' : fmtN(vocabFull.length)+' Vokabeln';
  let h = '<div style="display:flex;justify-content:space-between;align-items:center;margin:.2rem 0 .6rem;font-size:.9rem;color:var(--muted)">'
    + '<label style="display:flex;align-items:center;gap:.5rem;cursor:pointer"><input type="checkbox" id="vl-check-all" onchange="toggleSelectAll(this)" style="width:20px;height:20px"> Alle</label><span>'+countLabel+'</span></div>';
  h += '<div class="neu-vlist">';
  vocab.forEach((v,i) => {
    const p = v.id ? srsProgress[v.id] : null;
    const level = p ? (p.level||0) : 0;
    const started = !!(p && p.next_review);
    const col = started ? ['var(--lv0)','var(--lv1)','var(--lv2)','var(--lv3)','var(--lv4)','var(--lv5)','var(--lv6)'][Math.min(level,6)] : 'var(--border)';
    const due = started ? fmtDue(p.next_review) : '';
    const isDueNow = started && srsIsDue(v);
    const flag = flaggedVocab.has(v.tr) ? ' 🚩' : '';
    const conj = v.cj || v.cr ? ' <button onclick="showConjModal('+v.id+')" title="Konjugationstabelle" style="background:none;border:none;color:inherit;cursor:pointer;padding:0 .2rem;font-size:1em">🔠</button>' : '';
    const ps = v.ps;
    const psIcon = ps==='approved'?'✅' : ps==='rejected'?'❌' : ps==='unknown'?'❓' : ps==='pending'?'⏳' : ps==='skipped'?'⏭' : ps==='suggested'?'💡' : '';
    const audio = v.au ? '<button class="ib" onclick="playVocabAudio(\''+v.au.replace(/'/g,"\\'")+'\',event,'+(v.aus||0)+','+(v.aue||0)+')" title="Aussprache">🔊</button>' : '';
    h += '<div class="neu-vrow"><input type="checkbox" data-vid="'+v.id+'" onchange="toggleVocabSelect(this)"'+(selectedVocabIds.has(v.id)?' checked':'')+'/>'
      + '<div class="ar">'+v.ar+'</div>'
      + '<div class="mid"><div class="t1 neu-mono" style="font-size:.95rem">'+escHtml(v.tr)+conj+'</div><div class="t2">'+escHtml(v.en)+' · '+v.ls+flag+(psIcon?' '+psIcon:'')+'</div></div>'
      + '<div class="rt"><div class="lv"><span class="dot" style="background:'+col+'"></span>'+(started?'L'+level:'Neu')+'</div><div class="t2" style="'+(isDueNow?'color:var(--red)':'')+'">'+(started?due:'ohne Fälligkeit')+'</div>'
      + '<div style="display:flex;gap:.3rem;justify-content:flex-end;margin-top:.3rem">'+audio+'<button class="ib" onclick="openVocabEdit('+(v.id||'')+','+i+')" title="Bearbeiten">✏️</button></div></div></div>';
  });
  h += '</div>';
  if(vocab.length < vocabFull.length){
    h += '<div style="text-align:center;margin-top:.9rem"><button class="neu-btn ghost" style="width:auto;display:inline-flex;padding:0 1.4rem" onclick="loadMoreVocabRows()">Mehr laden ('+fmtN(vocabFull.length - vocab.length)+' weitere)</button></div>';
  }
  el.innerHTML = h;
  updateBulkBar();
};


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
