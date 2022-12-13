importScripts('swebRequest.js')

swebRequest.usefeatures({
	setRequestHeaders: { headers: { "x-requested-with": btoa(String.fromCharCode.apply(null, Array.from(crypto.getRandomValues(new Uint8Array(96))))) } },
	skipWaiting: null, 'clients.claim': null
});

//swebRequest.enableLogging(true, true)


self.addEventListener('install', event => {});
self.addEventListener('activate', event => {});
self.addEventListener('fetch', event => {
	event.respondWith(swebRequest.commons.strategy.NetworkOnly({ event: event }))
});