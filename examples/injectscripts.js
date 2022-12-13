importScripts('swebRequest.js')
importScripts('swebrequestdomparserloader.js');
importScripts('swebrequestmanifestloader.js')

swebRequest.features.perfstart();

swebRequest.init({
	//injectscripts: { scriptstoinject: ['alert(1)'], inlinescripts: true },
	//cspnonces: null,
	injectscripts: { scriptstoinject: ['/injectedscript.js'] }, 
	//originpolicies: { originpolicies: swmanifest.originpolicies },
	skipWaiting: null, 'clients.claim': null,
	precaching: { assets: ['dfont.ttf', 'script.js', 'style.css', 'caches.js', 'profile.JPG', '/'] }
});


swebRequest.features.perfsend();
swebRequest.enableLogging(true, false)