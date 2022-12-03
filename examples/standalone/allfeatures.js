importScripts('swebRequest.js')
importScripts('swebrequestmanifestloader.js')
importScripts('swebrequestdomparserloader.js')


swebRequest.features.perfstart();
swebRequest.init({
  //secureswsregistration: null,
  encryption: { randomBytes: atob(swmanifest.randomBytes) },
  decryption: { randomBytes: atob(swmanifest.randomBytes) },
  //signature: { randomBytes: atob(swmanifest.randomBytes) },
  //verification: { randomBytes: atob(swmanifest.randomBytes) },
  originpolicies: { originpolicies: swmanifest.originpolicies },
  injectscripts: { scriptstoinject: ['/injectedscript.js'] }, 
  timestamp: null,
  //timestamp_verify: { maxAge: 15 * 1000 }, 
  timestamp_verify: { maxAge: 1500 * 1000 }, // for testing purposes
  cspnonces: null,
  swcookie: { swcookie: swmanifest.swcookie },
	firewall: { types: ['image', 'style'] },
	anonymize: { modes: ['no-cors'] },
  skipWaiting: null,
  'clients.claim': null,
  //navigationPreload: null
  precaching: { assets: ['dfont.ttf', 'script.js', 'style.css', 'caches.js', 'profile.JPG', '/'] }
})

// to be sure that this feature is enabled at the end
swebRequest.features.perfsend();
swebRequest.enableLogging(true, false)