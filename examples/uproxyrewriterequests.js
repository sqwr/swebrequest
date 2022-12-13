importScripts('swebRequest.js')

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

swebRequest.usefeatures({
    proxyrewriterequests: rewriteproxyFilterOptions,
    proxyrewriteresponses: rewriteproxyFilterOptions
})

self.addEventListener('fetch', event => {
    event.respondWith(swebRequest.commons.strategy.CacheFirst({ event: event, cacheName: 'v1' }));
});