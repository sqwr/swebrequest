importScripts('swebRequest.js')
importScripts('swebrequestmanifestloader.js')
importScripts('swebrequestdomparserloader.js');


swebRequest.usefeatures({
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
  precaching: { caches: ['v1'], assets: ['dfont.ttf', 'script.js', 'style.css', 'caches.js', 'profile.JPG', '/'] },
  skipWaiting: null, 'clients.claim': null
})

//swebRequest.enableLogging(true, true)

self.addEventListener('install', event => {})
self.addEventListener('activate', event => {})
self.addEventListener('fetch', event => {
    event.respondWith(swebRequest.commons.strategy.CacheFirst({ event: event, cacheName: 'v1' } ));
});