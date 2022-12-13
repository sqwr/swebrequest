importScripts('swebRequest.js')

swebRequest.usefeatures({ 
	anonymize_xor: null, skipWaiting: null, 'clients.claim': null
});

//swebRequest.enableLogging(true, true)

self.addEventListener('install', event => {});
self.addEventListener('activate', event => {});
self.addEventListener('fetch', event => {
	//event.respondWith(fetch(event.request))
  	event.respondWith(swebRequest.commons.strategy.NetworkOnly({ event: event } ))
});