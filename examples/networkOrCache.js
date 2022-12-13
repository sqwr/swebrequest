importScripts('swebRequest.js');

swebRequest.init(null, {
	networkOrCache: null, //{ timeout: 2000 },
	precaching: { assets: ['dfont.ttf', 'script.js', 'style.css', 'caches.js', 'profile.JPG', '/' ] }, 
});

swebRequest.enableLogging(false, false)
