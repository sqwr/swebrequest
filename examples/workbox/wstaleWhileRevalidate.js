importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js")

// we cannot do workbox precaching and use cacheandrevalidate, so do the normal precaching
self.addEventListener('install', event => {
    event.waitUntil((async () => {
        let cache = await caches.open('v1');
        return cache.addAll( [ 'dfont.ttf', 'script.js', 'style.css', 'caches.js', 'profile.JPG', '/' ] )
    })())
})

workbox.routing.registerRoute(
    () => true, new workbox.strategies.StaleWhileRevalidate()
)