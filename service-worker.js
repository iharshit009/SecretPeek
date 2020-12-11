var CACHE_NAME = 'my-site-cache-v1';
const CACHE_VERSION = 2.3;

const BASE_CACHE_FILES = [
  '/style.css',
  '/script.js',
  '/index.html',
  '/manifest.json',
  '/public',
];
const OFFLINE_CACHE_FILES = [
  '/style.css',
  '/script.js',
  '/index.html',
];

const MAX_TTL = {
  '/': 3600,
  html: 43200,
  json: 43200,
  js: 86400,
  css: 86400,
};

function installServiceWorker() {
  return Promise.all(
      [caches.open(CACHE_VERSIONS.assets).then((cache) => {
          return cache.addAll(BASE_CACHE_FILES);
      }
          , err => console.error(`Error with ${CACHE_VERSIONS.assets}`, err)),
      caches.open(CACHE_VERSIONS.offline).then((cache) => {
          return cache.addAll(OFFLINE_CACHE_FILES);
      }
          , err => console.error(`Error with ${CACHE_VERSIONS.offline}`, err))]
  )
      .then(() => {
          return self.skipWaiting();
      }, err => console.error("Error with installation: ", err));
}



self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});
