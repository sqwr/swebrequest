importScripts('swebRequest.js')
importScripts('swebrequestmanifestloader.js')

swebRequest.init({
	perfstart: null, perfsend: null,
	swcookie: { swcookie: swmanifest.swcookie },
	skipWaiting: null, 'clients.claim': null
}, { networkOnly: null })

swebRequest.enableLogging(true, false)
