importScripts('swebRequest.js')
importScripts('swebrequestmanifestloader.js')

swebRequest.init({
    perfstart: null, perfsend: null,
    signature: { randomBytes: atob(swmanifest.randomBytes) },
    verification: { randomBytes: atob(swmanifest.randomBytes) },
    skipWaiting: null, 'clients.claim': null,
    precaching: { assets: ['dfont.ttf', 'script.js', 'style.css', 'caches.js', 'profile.JPG', '/'] }
})

swebRequest.enableLogging(true, false)
