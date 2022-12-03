importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js")

importScripts('swebRequest.js')
importScripts('swebrequestmanifestloader.js')

let swcookie = new swebRequest.commons.plugin('swcookie', {
    swcookie: swmanifest.swcookie
})

workbox.routing.registerRoute(
    () => true, 
    new workbox.strategies.NetworkOnly({
        plugins: [ swcookie ] 
    })
)

workbox.core.clientsClaim();
self.skipWaiting();