const CACHE_NAME = 'horlolearn-v1';

// Les pages et ressources clés pré-chargées dès la première visite
const PRECACHE_URLS = [
  '/',
  '/theorie',
  '/pratique',
  '/pratique/laboratoire',
  '/pratique/inspection-loupe',
  '/pratique/defi-chronometre',
  '/outils',
  '/quiz',
  '/ressources',
  '/culture',
  '/logos/Logo.jpg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/manifest.json'
];

// 1. Installation : mise en cache des pages principales
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        console.warn('[SW] Pré-cache partiel :', err);
      });
    })
  );
  self.skipWaiting();
});

// 2. Nettoyage des anciens caches lors d'une mise à jour
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
    )
  );
  self.clients.claim();
});

// 3. Interception réseau : Réseau d'abord, sinon Cache Hors-Ligne
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Si la requête réussit, on met à jour une copie dans le cache
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Si pas d'Internet, on sert la page depuis le cache local
        return caches.match(event.request).then((cachedResponse) => {
          return cachedResponse || caches.match('/');
        });
      })
  );
});
