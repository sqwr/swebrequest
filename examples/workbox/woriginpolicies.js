importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js")

importScripts('swebRequest.js')
importScripts('swebrequestmanifestloader.js')

let originpolicies = new swebRequest.commons.plugin('originpolicies', {
  originpolicies: swmanifest.originpolicies
})

workbox.routing.registerRoute(
    () => true, 
    new workbox.strategies.CacheFirst({
        plugins: [ originpolicies ] 
    })
)
self.skipWaiting();
workbox.core.clientsClaim();
