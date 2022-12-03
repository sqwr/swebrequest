importScripts('swebRequest.js')

swebRequest.init({
	perfstart: null, perfsend: null
}, { networkOnly: null });


swebRequest.enableLogging(true, false)