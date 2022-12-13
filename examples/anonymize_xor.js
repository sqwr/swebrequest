importScripts('swebRequest.js')

swebRequest.init( { 
	perfstart: null, perfsend: null,
	anonymize_xor: null
}, { networkOnly: null })

swebRequest.enableLogging(true, false)