importScripts('swebRequest.js');

swebRequest.init({
	perfstart: null, perfsend: null
}, {
	networkOrCache: null, // { timeout: 2000 },
	precaching: { assets: ['dfont.ttf', 'script.js', 'style.css', 'caches.js', 'profile.JPG', '/' ] }, 
});

swebRequest.enableLogging(true, false)
