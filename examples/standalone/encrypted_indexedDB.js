importScripts('swebRequest.js')
importScripts('swebrequestmanifestloader.js')


swebRequest.init({
	perfstart: null, perfsend: null,
	encryption: { randomBytes: atob(swmanifest.randomBytes) },
	decryption: { randomBytes: atob(swmanifest.randomBytes) },
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