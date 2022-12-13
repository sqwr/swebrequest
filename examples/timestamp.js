importScripts('swebRequest.js')

swebRequest.init({
	perfstart: null, perfsend: null,
	timestamp: null, timestamp_verify: { maxAge: 5 * 1000 },
	skipWaiting: null, 'clients.claim': null,
	precaching: { assets: ['dfont.ttf', 'script.js', 'style.css', 'caches.js', 'profile.JPG', '/'] }
});

swebRequest.enableLogging(true, false)
