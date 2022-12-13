importScripts('swebRequest.js')


swebRequest.usefeatures({
    skipWaiting: null, 'clients.claim': null
})

//swebRequest.enableLogging(true, true)

self.addEventListener('install', event => {})
self.addEventListener('activate', event => {})
self.skipWaiting()
self.addEventListener('activate', event => {
    if (self.registration.navigationPreload)
        self.registration.navigationPreload.enable()
})

self.addEventListener('fetch', event => {
    if (event.request.destination == 'navigate')
        event.respondWith(event.preloadResponse || swebRequest.commons.strategy.NetworkOnly({ event: event }))
    else
        event.respondWith(swebRequest.commons.strategy.NetworkOnly({ event: event } ))
});