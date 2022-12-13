importScripts('swebRequest.js')


swebRequest.init({
	perfstart: null, perfsend: null,
	precaching: {
		assets: ['dfont.ttf', 'script.js', 'style.css', 'caches.js', 'profile.JPG', '/'],
		storage: 'indexedDB', caches: ['sop-cache'], rtypes: ['default', 'basic', 'cors']
	}
}, {
	cacheFirst: { 
		storage: 'indexedDB', 
		rtypes: ['default', 'basic', 'cors'],
		caches: ['sop-cache']
	}
})


swebRequest.enableLogging(true, false)

