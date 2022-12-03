importScripts('swebRequest.js')

swebRequest.features.perfstart();

swebRequest.strategies.cacheFirst({
	storage: 'indexedDB', caches: ['sopassets']
}, null, {
	origins: ['cross-origin'], modes: ['no-cors']
})

swebRequest.features.perfsend();
swebRequest.enableLogging(true, false)

swebRequest.init()