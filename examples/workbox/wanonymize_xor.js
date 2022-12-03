importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js")

importScripts('swebRequest.js')
let anonymize_xor = new swebRequest.commons.plugin('anonymize_xor')

workbox.routing.registerRoute(
    () => true, 
    new workbox.strategies.NetworkOnly({
        plugins: [ anonymize_xor ]
    })
)