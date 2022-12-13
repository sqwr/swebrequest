importScripts('swebRequest.js')

swebRequest.init({
	perfstart: null, perfsend: null,
}, {
	precaching: { assets: ['dfont.ttf', 'script.js', 'style.css', 'caches.js', 'profile.JPG', '/' ] },
	cacheAndRevalidate: null
});
swebRequest.enableLogging(true, false)