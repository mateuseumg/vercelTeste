const CACHE_NAME = 'pi-saude-cache-v1';
const urlsToCache = [
  './',
  './login/login.html',
  './login/login.css',
  './login/login.js',
  './cadastro/cadastro.html',
  './cadastro/cadastro.css',
  './cadastro/cadastro.js',
  './medico/medico.html',
  './paciente/paciente.html',
  './consulta/index.html',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
