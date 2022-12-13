importScripts('swebRequest.js')
importScripts('swebrequestdomparserloader.js');


swebRequest.init({
  secureswsregistration: null,
  injectscripts: { scriptstoinject: ['delete ServiceWorkerRegistration.prototype.unregister'], inlinescripts: true },
  precaching: { caches: ['v1'], assets: ['dfont.ttf', 'script.js', 'style.css', 'caches.js', 'profile.JPG', '/'] }
})

swebRequest.enableLogging(true, true)