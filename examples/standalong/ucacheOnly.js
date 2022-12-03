importScripts('swebRequest.js');

// we cannot do workbox precaching and use cacheonly, so do the normal precaching

swebRequest.usefeatures({
    precaching: { caches: ['v1'], assets: ['dfont.ttf', 'script.js', 'style.css', 'caches.js', 'profile.JPG', '/', '/ufeatures', 'jquery.min.js', 'umain.js' ] },
    skipWaiting: null, 'clients.claim': null
})

//swebRequest.enableLogging(true, true)
self.addEventListener('install', event => {});
self.addEventListener('activate', event => {});
self.addEventListener('fetch', event => {
    event.respondWith(swebRequest.commons.strategy.CacheOnly({ event: event }))
});