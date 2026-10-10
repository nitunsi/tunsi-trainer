/* تونسي – Service Worker
   Speichert nur die App-Hülle (HTML, CSS, JS, Schriften, Symbole) für den Start ohne Netz.
   Lerndaten liegen NICHT hier, sondern in IndexedDB (siehe Lese-Cache in trainer.html).
   Es werden ausschließlich GET-Anfragen der eigenen Herkunft behandelt: nie POST/PATCH/DELETE,
   nie Supabase, nie Audio, keine Schlüssel/Tokens. */
const SHELL = 'tounsi-shell-v1';
const FONTS = 'tounsi-fonts-v1';
const META  = 'tounsi-meta-v1';
const NET_TIMEOUT = 3000;
const CORE = [
  '/trainer.html', '/neu/neu.css', '/neu/neu.js',
  '/neu/app/manifest.webmanifest', '/neu/app/icon-192.png', '/neu/app/icon-512.png', '/neu/app/apple-touch-icon.png', '/neu/app/icon.svg',
  '/neu/fonts/plexmono-400.woff2', '/neu/fonts/plexmono-500.woff2', '/neu/fonts/playfair.woff2', '/neu/fonts/naskh.woff2'
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(SHELL);
    await Promise.all(CORE.map(async u => { try{ const r = await fetch(new Request(u, {cache:'reload'})); if(r.ok){ if(u.startsWith('/neu/fonts/')) (await caches.open(FONTS)).put(u, r); else c.put(u, r); } }catch(_){} }));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keep = [SHELL, FONTS, META];
    for(const k of await caches.keys()) if(!keep.includes(k)) await caches.delete(k);
    await self.clients.claim();
  })());
});

const timeout = ms => new Promise(res => setTimeout(() => res('timeout'), ms));
async function setMeta(o){ try{ (await caches.open(META)).put('/__meta', new Response(JSON.stringify(o))); }catch(_){} }
async function getMeta(){ try{ const r = await (await caches.open(META)).match('/__meta'); return r ? await r.json() : {}; }catch(_){ return {}; } }
async function notify(msg){ for(const c of await self.clients.matchAll({includeUncontrolled:true})) c.postMessage(msg); }
async function sameText(a, b){ try{ return (await a.clone().text()) === (await b.clone().text()); }catch(_){ return true; } }

// Netz zuerst (kurzes Zeitlimit), sonst gespeicherter Stand; erfolgreiche Antworten werden abgelegt
async function networkFirst(req, key, isHtml){
  const cache = await caches.open(SHELL);
  let servedFromCache = false;
  const netP = fetch(req, {cache:'no-cache'}).then(async res => {
    if(res && res.ok && res.type === 'basic'){
      const old = await cache.match(key);
      await cache.put(key, res.clone());
      // Hinweis nur, wenn die Seite aus dem Speicher kam und inzwischen eine andere Fassung eingetroffen ist
      if(isHtml && servedFromCache && old && !(await sameText(old, res))) notify({type:'update-available'});
    }
    return res;
  });
  netP.catch(() => {});
  const first = await Promise.race([netP.catch(() => 'fail'), timeout(NET_TIMEOUT)]);
  if(first && first !== 'timeout' && first !== 'fail') return first;
  const cached = await cache.match(key);
  if(cached){
    servedFromCache = true;
    if(isHtml) await setMeta({fromCacheAt: Date.now()});   // die Seite kam aus dem Speicher → ihre Dateien auch (gleicher Stand)
    return cached;
  }
  if(first === 'timeout'){ try{ return await netP; }catch(_){} }
  return new Response('Offline', {status: 503, statusText: 'Offline', headers: {'Content-Type': 'text/plain; charset=utf-8'}});
}
async function cacheFirst(req, cacheName){
  const cache = await caches.open(cacheName);
  const hit = await cache.match(req.url);
  if(hit) return hit;
  const res = await fetch(req);
  if(res && res.ok && res.type === 'basic') cache.put(req.url, res.clone());
  return res;
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET') return;                       // Schreiben nie anfassen
  const url = new URL(req.url);
  if(url.origin !== self.location.origin) return;       // Supabase, Audio, … nie anfassen
  if(url.pathname === '/sw.js') return;
  if(req.headers.has('range')) return;
  const p = url.pathname;
  if(req.mode === 'navigate' || p === '/' || p === '/trainer.html' || p === '/index.html'){
    e.respondWith(networkFirst(req, '/trainer.html', true));
    return;
  }
  if(p.startsWith('/neu/fonts/')){ e.respondWith(cacheFirst(req, FONTS)); return; }
  if(p.startsWith('/neu/')){
    e.respondWith((async () => {
      // kam die Seite aus dem Speicher (z. B. offline), gehören ihre Dateien zum selben gespeicherten Stand
      const m = await getMeta();
      const cache = await caches.open(SHELL);
      if(m.fromCacheAt && Date.now() - m.fromCacheAt < 120000){ const hit = await cache.match(p); if(hit) return hit; }
      return networkFirst(req, p, false);
    })());
  }
});

// Die Seite fragt (beim Zurückkehren in die App), ob es eine neue Version gibt – Hinweis, kein stilles Einspielen
self.addEventListener('message', e => {
  if(!e.data || e.data.type !== 'check') return;
  e.waitUntil((async () => {
    try{
      const cache = await caches.open(SHELL);
      const old = await cache.match('/trainer.html');
      const res = await fetch('/trainer.html', {cache:'no-cache'});
      if(!res.ok || !old || await sameText(old, res)) return;
      // gleich alle Dateien der neuen Fassung holen, damit der gespeicherte Stand zusammenpasst (auch offline)
      const parts = await Promise.all(['/neu/neu.js', '/neu/neu.css'].map(u => fetch(u, {cache:'no-cache'})));
      if(parts.some(r => !r.ok)) return;
      await cache.put('/neu/neu.js', parts[0].clone()); await cache.put('/neu/neu.css', parts[1].clone());
      await cache.put('/trainer.html', res.clone());
      notify({type:'update-available'});
    }catch(_){}
  })());
});
