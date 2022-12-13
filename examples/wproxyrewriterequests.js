importScripts('swebRequest.js')
importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js")


workbox.routing.registerRoute(
    () => true, new workbox.strategies.CacheFirst()
)
const rewriteproxyFilterOptions = {
    backHost: 'https://raw.githubusercontent.com/sqwr/swebrequest/main/lib/',
    hostedContent: {
        'swebRequest.js': 'application/javascript',
        'swebrequestcheerio.js': 'application/javascript',
        'swebrequestwasmloader.js': 'application/javascript',
        'swebrequestwasmain.wasm': 'application/wasm',
        'swebrequestdomparserloader.js': 'application/javascript'
    }
}

let proxyrewriterequests = new swebRequest.commons.plugin('proxyrewriterequests', rewriteproxyFilterOptions),
    proxyrewriteresponses = new swebRequest.commons.plugin('proxyrewriteresponses', rewriteproxyFilterOptions);


workbox.routing.registerRoute(
    () => true, 
    new workbox.strategies.CacheFirst({
        plugins: [
            proxyrewriterequests, proxyrewriteresponses
        ] 
    })
)