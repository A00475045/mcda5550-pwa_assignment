
// const CACHE_NAME = 'version-1';
// const urlsToCache = ["index.html", "offline.html"]

// this.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       console.log("Opened Cache");
//       return cache.addAll(urlsToCache);
//     })
//   )
// })

// this.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request).then((res) => {
//       return fetch(event.request).catch(() => caches.match('offline.html'));
//     })
//   )
// })

// this.addEventListener('activate', (event) => {
//   const cacheWhiteList = [];
//   cacheWhiteList.push(CACHE_NAME);

  
//   event.waitUtil(
//     caches.keys().then((cacheNames) => Promise.all(
//       cacheNames.map((cacheName) => {
//         if(!cacheWhiteList.includes(cacheName)){
//           return caches.delete(cacheName);
//         }
//       })
//     ))
//   )
// })


//-----------------------
const CACHE_NAME = 'version-1';
const urlsToCache = ["index.html", "offline.html"];

this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // console.log("Opened Cache");
      return cache.addAll(urlsToCache);
    })
  );
});

this.addEventListener('fetch', (event) => {
  

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // If the request is found in the cache, return the cached response
      if (cachedResponse) {
        // console.log('1')
        return cachedResponse;
      }

      // If the device is offline, try to load data from localStorage
      if (!navigator.onLine) {
        // console.log('inside the online thing')
        const url = event.request.url;
        const cachedData = localStorage.getItem(url);
        if (cachedData) {
          return new Response(cachedData, {
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }

      // Otherwise, fetch the request from the network
      return fetch(event.request).then((response) => {
        // If the response is valid, clone it and store it in the cache
        if (response && response.status === 200) {
          // console.log('3', response, event.request)
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request , clonedResponse);
          });
          // Store the data in localStorage
          if (!event.request.url.endsWith('offline.html')) {
            // console.log('4')
            response.clone().json().then((data) => {
              localStorage.setItem(event.request.url, JSON.stringify(data));
            });
          }
        }
        // console.log(response);
        return response;
      }).catch(() => {
        // If fetching fails and the device is offline, return the offline page
        if (!navigator.onLine) {
          // console.log('5')
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
