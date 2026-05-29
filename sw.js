const CACHE_NAME = 'trening-v9';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Instalacja i natychmiastowe wymuszenie nowej wersji
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => {
      return self.skipWaiting(); // MODYFIKACJA v9: Nie czekaj na zamknięcie kart deaktywujących aplikację
    })
  );
});

// Aktywacja i agresywne usuwanie poprzednich cache-y
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => {
      return self.clients.claim(); // MODYFIKACJA v9: Natychmiastowe przejęcie kontroli nad aplikacją
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});