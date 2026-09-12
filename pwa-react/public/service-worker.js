const CACHE_NAME = "react-pwa-v1";

// Archivos cacheables (son estáticos)
const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.json",
  "/profile-picture.png",
];

//* Evento install (cuando se va a cargar el Service Worker)
self.addEventListener("install", (e) => {
  e.waitUntil(
    // Cargar recursos iniciales en la caché
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL);
    }),
  );
});

//* Evento activate (cuando se cargó el Service Worker)
//? Se usa para eliminar versiones antiguas de caché
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      );
    }),
  );
});

//* Evento fetch (descarga de recursos)
self.addEventListener("fetch", (e) => {
  const request = e.request;

  //? HTML (Network First)
  if (request.mode === "navigate") {
    e.respondWith(
      fetch(request)
        .then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, resClone));
          return res;
        })
        .catch(() => caches.match(request)), // Devolver caché si hubo un fallo.
    );
  }

  //? CSS, JS, Images (Caché First)
  const destination = request.destination;

  if (
    destination === "script" ||
    destination === "style" ||
    destination === "image"
  ) {
    e.respondWith(
      // Primero se consulta en la caché
      caches.match(request).then((cacheResponse) => {
        if (cacheResponse) {
          return cacheResponse;
        }

        // Si no hubo respuesta hacer fetch
        return fetch(request).then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, resClone));
          return res;
        });
      }),
    );
  }
});
