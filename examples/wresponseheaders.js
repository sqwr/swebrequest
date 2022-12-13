importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js")

importScripts('swebRequest.js')

let responseHeaders = new swebRequest.commons.plugin('setResponseHeaders', {
    headers: { "content-security-policy": "script-src https: http: * 'unsafe-eval' 'wasm-unsafe-eval' 'unsafe-inline' data: blob: javascript:" },
    modes: ['navigate']
})

workbox.routing.registerRoute(
    () => true, 
    new workbox.strategies.CacheFirst({
        plugins: [ responseHeaders ] 
    })
)
self.skipWaiting();
workbox.core.clientsClaim();
