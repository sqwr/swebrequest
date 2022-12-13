importScripts('swebRequest.js');

swebRequest.init({
	perfstart: null, perfsend: null
}, {
	CacheOnly: null, 
	precaching: { assets: ['dfont.ttf', 'script.js', 'style.css', 'caches.js', 'profile.JPG', '/', '/features', 'jquery.min.js', 'main.js' ] }
});

swebRequest.enableLogging(true, false)