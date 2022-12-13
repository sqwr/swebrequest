importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js")

importScripts('swebRequest.js')
importScripts('swebrequestmanifestloader.js')

let signature = new swebRequest.commons.plugin('signature', {
    randomBytes: atob(swmanifest.randomBytes)
    }),
    verification = new swebRequest.commons.plugin('verification', {
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
workbox.precaching.addPlugins([ verification, signature ])


workbox.routing.registerRoute(
    () => true, 
    new workbox.strategies.CacheFirst({
        plugins: [ verification, signature ] 
    })
)

workbox.core.clientsClaim();
workbox.core.skipWaiting();
//workbox.navigationPreload.enable();