importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js")
importScripts('swebRequest.js')

let requestHeaders = new swebRequest.commons.plugin('setRequestHeaders', {
     headers: { "x-requested-with": btoa(String.fromCharCode.apply(null, Array.from(crypto.getRandomValues(new Uint8Array(96))))) }
})

workbox.routing.registerRoute(
    () => true, 
    new workbox.strategies.NetworkOnly({
        plugins: [ requestHeaders ] 
    })
)

workbox.core.clientsClaim();
self.skipWaiting();