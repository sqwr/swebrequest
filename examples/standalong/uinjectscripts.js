importScripts('swebRequest.js')
importScripts('swebrequestdomparserloader.js');


swebRequest.usefeatures({
	injectscripts: { scriptstoinject: ['alert(1)'], inlinescripts: true },
	//cspnonces: null,
	//originpolicies: { originpolicies: swmanifest.originpolicies },
	precaching: { caches: ['v1'], assets: ['dfont.ttf', 'script.js', 'style.css', 'caches.js', 'profile.JPG', '/'] },
	skipWaiting: null, 'clients.claim': null
});

//swebRequest.enableLogging(true, true)


self.addEventListener('install', event => {});
self.addEventListener('activate', event => {});
self.addEventListener('fetch', event => {
  	event.respondWith(swebRequest.commons.strategy.CacheFirst({ event: event, cacheName: 'v1' }));
});