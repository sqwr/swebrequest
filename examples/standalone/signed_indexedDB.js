importScripts('swebRequest.js')
importScripts('swebrequestmanifestloader.js')


swebRequest.init({
	perfstart: null, perfsend: null,
	signature:    { randomBytes: atob(swmanifest.randomBytes) },
	verification: { randomBytes: atob(swmanifest.randomBytes) },
	precaching: { 
		storage: 'indexedDB',
		rtypes: ['default', 'basic', 'cors'], 
		caches: ['sop-cache'],
		assets: ['dfont.ttf', 'script.js', 'style.css', 'caches.js', 'profile.JPG', '/'] 
	}
}, {
	cacheFirst: { 
		storage: 'indexedDB',
		rtypes: ['default', 'basic', 'cors'], 
		caches: ['sop-cache']
	}
})

swebRequest.enableLogging(true, false)
