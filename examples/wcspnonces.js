importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js")
importScripts('swebRequest.js')
importScripts('swebrequestdomparserloader.js');


let cspnonces = new swebRequest.commons.plugin('cspnonces')

// Not working to use originpolicies on 
workbox.precaching.precacheAndRoute([ { url: '/' } ]);
workbox.precaching.addPlugins([ cspnonces ])

workbox.routing.registerRoute(
    () => true, 
    new workbox.strategies.CacheFirst({
        plugins: [ cspnonces ] 
    })
)

workbox.core.clientsClaim();
self.skipWaiting();