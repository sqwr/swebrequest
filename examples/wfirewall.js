importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js")
importScripts('swebRequest.js')

workbox.routing.registerRoute(
    ({request}) => (['image', 'style'].indexOf(request.destination) >=0 ), 
    new swebRequest.commons.plugin.astrategy.firewall()
)

workbox.routing.registerRoute(
    () => true, 
    new workbox.strategies.CacheFirst()
)

workbox.core.clientsClaim();
self.skipWaiting();