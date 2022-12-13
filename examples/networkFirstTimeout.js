importScripts('swebRequest.js')

swebRequest.init({
	perfstart: null, perfsend: null
}, {
	precaching: { assets: ['dfont.ttf', 'script.js', 'style.css', 'caches.js', 'profile.JPG', '/' ] },
	networkFirstTimeout: { timeout: 0.1 * 1000 } // 100 ms
});

swebRequest.enableLogging(true, false)