importScripts('swebRequest.js')

swebRequest.features.perfstart();

swebRequest.init({
	firewall: { types: ['image', 'style']},
	skipWaiting: null, 'clients.claim': null
})

swebRequest.features.perfsend();
swebRequest.enableLogging(true, false)
