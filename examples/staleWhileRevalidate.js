importScripts('swebRequest.js')

swebRequest.init({
	perfstart: null, perfsend: null,
}, {
	StaleWhileRevalidate: null,
	precaching: { assets: ['dfont.ttf', 'script.js', 'style.css', 'caches.js', 'profile.JPG', '/' ] }
});

swebRequest.enableLogging(true, false)
