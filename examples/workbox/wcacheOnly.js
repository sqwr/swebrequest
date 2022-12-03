importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js")

workbox.precaching.precacheAndRoute([
    { url: '/' },
    { url: 'dfont.ttf' },
    { url: 'script.js' },
    { url: 'style.css'},
    { url: 'caches.js'}, 
    { url: 'profile.JPG'},
    { url: '/wfeatures'},
    { url: 'wmain.js'},
    { url: 'jquery.min.js'}
]);

workbox.routing.registerRoute(
    () => true, new workbox.strategies.CacheOnly()
)