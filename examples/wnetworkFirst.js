importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js")

// we cannot do workbox precaching and use networkfirst. Precaching means cacheFirst for the precached content
workbox.routing.registerRoute(
    () => true, 
    new workbox.strategies.NetworkFirst()
)