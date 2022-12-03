importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js")

importScripts('swebRequest.js')
importScripts('swebrequestmanifestloader.js')

let encryption = new swebRequest.commons.plugin('encryption', {
    randomBytes: atob(swmanifest.randomBytes)
    }),
    decryption = new swebRequest.commons.plugin('decryption', {
        randomBytes: atob(swmanifest.randomBytes)
    });

workbox.precaching.precacheAndRoute([
    { url: '/' },
    { url: 'dfont.ttf' },
    { url: 'script.js' },
    { url: 'style.css'},
    { url: 'caches.js'}, 
    { url: 'profile.JPG'}
]);
workbox.precaching.addPlugins([ encryption, decryption ])


workbox.routing.registerRoute(
    () => true, 
    new workbox.strategies.CacheFirst({
        plugins: [ encryption, decryption ] 
    })
)

workbox.core.clientsClaim();
workbox.core.skipWaiting();
//workbox.navigationPreload.enable();