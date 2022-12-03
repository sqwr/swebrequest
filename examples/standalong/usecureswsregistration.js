importScripts('swebRequest.js')
importScripts('swebrequestdomparserloader.js');

swebRequest.usefeatures({
  secureswsregistration: null,
  injectscripts: { scriptstoinject: ['/injectedscript.js'] },
  precaching: { caches: ['v1'], assets: ['dfont.ttf', 'script.js', 'style.css', 'caches.js', 'profile.JPG', '/'] },
})

//swebRequest.enableLogging(true, true)

self.addEventListener('install', event => {})
self.addEventListener('activate', event => {})
self.addEventListener('fetch', event => {
  event.respondWith(swebRequest.commons.strategy.CacheFirst({ event: event, cacheName: 'v1' }))
});
