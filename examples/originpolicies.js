importScripts('swebRequest.js')
importScripts('swebrequestmanifestloader.js')

swebRequest.features.perfstart();

swebRequest.init({ 
	originpolicies: { originpolicies: swmanifest.originpolicies },
	skipWaiting: null, 'clients.claim': null
})



swebRequest.features.perfsend();
swebRequest.enableLogging(true, false)
//swebRequest.enableLogging(true, true)
