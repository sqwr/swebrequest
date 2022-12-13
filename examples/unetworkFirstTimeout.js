importScripts('swebRequest.js');

swebRequest.usefeatures({
    precaching: { caches: ['v1'], assets: ['dfont.ttf', 'script.js', 'style.css', 'caches.js', 'profile.JPG', '/'] },
    skipWaiting: null, 'clients.claim': null
})

//swebRequest.enableLogging(true, true)

self.addEventListener('install', event => {})
self.addEventListener('activate', event => {})
self.addEventListener('fetch', event => {
    event.respondWith(swebRequest.commons.strategy.NetworkFirstTimeout({ event: event, cacheName: 'v1', timeout: 10 * 1000 }))
});