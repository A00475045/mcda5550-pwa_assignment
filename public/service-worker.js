const CACHE_NAME = 'version-1';
const urlsToCache = ["index.html", "offline.html"];

this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});


this.addEventListener('fetch', (event) => {
  
  let url = new URL(event.request.url);
  
  event.respondWith(
    caches.match(url.pathname).then((cachedResponse) => {

      if (!navigator.onLine) {
        const url = new URL(event.request.url);
        var cachedData; 
           cachedData = localStorage.getItem(url);
        if (cachedData) {
          return new Response(cachedData, {
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }

      return fetch(event.request).then((response) => {
        if (response && response.status === 200) {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            if(url.pathname === '/addTask'){
              cache.put('/getTasks' , clonedResponse);
            }else{
            cache.put(url.pathname , clonedResponse);
          }
          });
          if (!event.request.url.endsWith('offline.html')) {
            response.clone().json().then((data) => {
              if(url.pathname === '/addTask'){
              }else {
            }
            });
          }
        }
        return response;
      }).catch(() => {
        if (cachedResponse) {
        return cachedResponse;
      }

        if (!navigator.onLine) {
          return caches.match('offline.html');
        }
      });
    })
  );
});


this.addEventListener('activate', (event) => {
  const cacheWhiteList = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if (!cacheWhiteList.includes(cacheName)) {
          return caches.delete(cacheName);
        }
      })
    ))
  );
});
