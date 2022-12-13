importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js")

importScripts('swebRequest.js')
let anonymize = new swebRequest.commons.plugin('anonymize')

workbox.routing.registerRoute( 
    () => true, 
    new workbox.strategies.NetworkOnly({
        plugins: [ anonymize ]
    })
)