importScripts('swebRequest.js')

swebRequest.usefeatures({
	setResponseHeaders: {
		modes: ['navigate'], headers: { "content-security-policy": "script-src https: http: * 'unsafe-eval' 'wasm-unsafe-eval' 'unsafe-inline' data: blob: javascript:" }
	},
	precaching: { caches: ['v1'], assets: ['dfont.ttf', 'script.js', 'style.css', 'caches.js', 'profile.JPG', '/'] },
  	skipWaiting: null, 'clients.claim': null
})

//swebRequest.enableLogging(true, true)

self.addEventListener('install', event => {})
self.addEventListener('activate', event => {})
self.addEventListener('fetch', event => {
    event.respondWith(swebRequest.commons.strategy.CacheFirst({ event: event, cacheName: 'v1' }));
});