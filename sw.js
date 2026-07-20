/* FoodCheck service worker — offline app shell */
const VERSION = 'foodcheck-v9';
const PRECACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;

  // never cache API calls — data must be fresh
  if (url.hostname === 'api.github.com' || url.hostname === 'api.anthropic.com' || url.hostname === 'generativelanguage.googleapis.com' || url.hostname.endsWith('openfoodfacts.org')) return;

  // config bundle must always be fresh
  if (url.origin === location.origin && url.pathname.endsWith('config.enc')) return;

  // app shell + CDN libs: cache-first, refresh in background
  if (url.origin === location.origin || url.hostname === 'cdn.jsdelivr.net') {
    e.respondWith(
      caches.match(e.request).then(cached => {
        const fresh = fetch(e.request).then(resp => {
          if (resp && resp.ok) {
            const copy = resp.clone();
            caches.open(VERSION).then(c => c.put(e.request, copy));
          }
          return resp;
        }).catch(() => cached);
        return cached || fresh;
      })
    );
  }
});
