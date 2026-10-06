// Folio service worker: lets the app open offline.
// Network first (so updates you push to GitHub show up), cached copy if the
// network is slow or missing. Price look-ups on other sites are not touched.
const CACHE = 'folio-v1';
const ASSETS = [
  './', './index.html', './manifest.webmanifest',
  './anek-latin.woff2', './anek-rupee.woff2',
  './icon-192.png', './icon-512.png', './icon-maskable.png', './apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  // Only clear this app's old caches; other apps on the same github.io site keep theirs.
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('folio-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url), scope = new URL(self.registration.scope);
  if (url.origin !== scope.origin || !url.pathname.startsWith(scope.pathname)) return;

  const net = fetch(req);
  // Keep the cache fresh with whatever the network returns.
  e.waitUntil(net.then(res => {
    if (!res.ok || res.type !== 'basic') return;
    const copy = res.clone();
    return caches.open(CACHE).then(c => c.put(req, copy));
  }).catch(() => {}));

  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = (await cache.match(req, { ignoreSearch: true })) ||
      (req.mode === 'navigate' ? await cache.match('./') : undefined);
    if (!cached) return net;
    const slow = new Promise(r => setTimeout(() => r(cached), 3000));
    return Promise.race([net.catch(() => cached), slow]);
  })());
});
