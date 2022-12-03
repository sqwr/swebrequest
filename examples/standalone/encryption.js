importScripts('swebRequest.js')
//importScripts('https://swebrequest.serviceworkers.workers.dev/swebRequest.js');
importScripts('swebrequestmanifestloader.js')

swebRequest.init({
    perfstart: null, perfsend: null,
    encryption: { randomBytes: atob(swmanifest.randomBytes) },
    decryption: { randomBytes: atob(swmanifest.randomBytes) },
    skipWaiting: null, 'clients.claim': null,
    precaching: { assets: ['dfont.ttf', 'script.js', 'style.css', 'caches.js', 'profile.JPG', '/'] }
})

swebRequest.enableLogging(true, false)
