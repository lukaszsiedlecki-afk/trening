const CACHE_NAME = 'trening-v4';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Instalacja i zapisywanie plików do pamięci podręcznej
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Serwowanie plików z pamięci, gdy nie ma internetu
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
