importScripts('swebRequest.js')


swebRequest.init({
	perfstart: null, perfsend: null,
	skipWaiting: null, 'clients.claim': null,
	setRequestHeaders: { headers: { "x-requested-with": btoa(String.fromCharCode.apply(null, Array.from(crypto.getRandomValues(new Uint8Array(96))))) } },
}, { networkOnly: null } )

swebRequest.enableLogging(true, false)
