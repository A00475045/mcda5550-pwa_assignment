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
        console.log('2')
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
          console.log('3', response, event.request)
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            if(url.pathname === '/addTask'){
              // console.log("========================",url.pathname)
              cache.put('/getTasks' , clonedResponse);
            }else{
            // console.log("&&&&&&&&&&&&&&&&&&&&&&&&", url.pathname, clonedResponse )
            cache.put(url.pathname , clonedResponse);
          }
          });
          if (!event.request.url.endsWith('offline.html')) {
            response.clone().json().then((data) => {
              // const url = new URL(event.request.url);
              
              if(url.pathname === '/addTask'){
                console.log("----------",url.pathname)
                
                // localStorage.setItem('/getTasks', JSON.stringify(data));  
              }else {

              // if(localStorage.setItem(url.pathname, JSON.stringify(data))){
                // console.log(url.pathname, JSON.stringify(data))
              // }
            }
            });
          }
        }
        console.log(response);
        return response;
      }).catch(() => {
        console.log('5')

        if (cachedResponse) {
        // console.log('1')
        return cachedResponse;
      }

        if (!navigator.onLine) {
          console.log('6')
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
