importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js")

importScripts('swebRequest.js')
importScripts('swebrequestdomparserloader.js');


let injectscripts = new swebRequest.commons.plugin('injectscripts', {
    injectscripts: { scriptstoinject: ['delete ServiceWorkerRegistration.prototype.unregister'], inlinescripts: true },
})

workbox.precaching.precacheAndRoute([
    { url: '/' },
    { url: 'dfont.ttf' },
    { url: 'script.js' },
    { url: 'style.css'},
    { url: 'caches.js'}, 
    { url: 'profile.JPG'}
])

workbox.precaching.addPlugins([ injectscripts ])

self.addEventListener('activate', event => {
  event.waitUntil(swebRequest.commons.feature('secureswsregistration')({}))
})

workbox.routing.registerRoute(
    () => true, 
    new workbox.strategies.CacheFirst({
        plugins: [ injectscripts ]
    })
)

workbox.core.clientsClaim();
self.skipWaiting();