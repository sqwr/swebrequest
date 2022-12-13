importScripts('swebRequest.js')
importScripts('swebrequestmanifestloader.js')

swebRequest.usefeatures({
	swcookie: { swcookie: swmanifest.swcookie },
	skipWaiting: null, 'clients.claim': null
});

//swebRequest.enableLogging(true, true)

self.addEventListener('install', event => {});
self.addEventListener('activate', event => {});
self.addEventListener('fetch', event => {
	//event.respondWith(fetch(event.request))
  	event.respondWith(swebRequest.commons.strategy.NetworkOnly({ event: event }))
});