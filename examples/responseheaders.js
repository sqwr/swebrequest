importScripts('swebRequest.js')

swebRequest.features.perfstart();
swebRequest.init({
	setResponseHeaders: {
		headers: { 
			"content-security-policy": "script-src https: http: * 'unsafe-eval' 'wasm-unsafe-eval' 'unsafe-inline' data: blob: javascript:",
			//"cross-origin-opener-policy": "same-origin", "cross-origin-embedder-Policy": "require-corp"
		},
		modes: ['navigate']
	},
	skipWaiting: null, 'clients.claim': null
})

swebRequest.features.perfsend();
swebRequest.enableLogging(true, false)
