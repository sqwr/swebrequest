importScripts('swebRequest.js')
importScripts('swebrequestdomparserloader.js');


swebRequest.init({
  secureswsregistration: null,
  injectscripts: { scriptstoinject: ['/injectedscript.js'] },
  precaching: { caches: ['v1'], assets: ['dfont.ttf', 'script.js', 'style.css', 'caches.js', 'profile.JPG', '/'] }
})

swebRequest.enableLogging(true, true)