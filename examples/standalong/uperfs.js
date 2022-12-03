importScripts('swebRequest.js')

swebRequest.usefeatures({
  perfstart: null, 
  perfsend: null,
  timestamp: { maxAge: 15 * 1000 },
  timestamp_verify: null 
})

swebRequest.enableLogging(true, false)




// cache-first: use cache
self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(resp => {
          return resp || fetch(event.request).then(response => {
            return caches.open('v1').then(cache => {
              cache.put(event.request, response.clone());
              return response;
            });
        });
      })
  );
});