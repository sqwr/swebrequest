importScripts('swebRequest.js')

swebRequest.init({ 
	perfstart: null, perfsend: null,
	anonymize: null 
}, { networkOnly: null });

swebRequest.enableLogging(true, false)
