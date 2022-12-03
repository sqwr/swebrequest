importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js")

importScripts('swebRequest.js')
importScripts('swebrequestmanifestloader.js')
importScripts('swebrequestdomparserloader.js');




let encryption = new swebRequest.commons.plugin('encryption', {
        randomBytes: atob(swmanifest.randomBytes)
    }),
    decryption = new swebRequest.commons.plugin('decryption', {
        randomBytes: atob(swmanifest.randomBytes)
    }),
    signature = new swebRequest.commons.plugin('signature', {
        randomBytes: atob(swmanifest.randomBytes)
    }),
    verification = new swebRequest.commons.plugin('verification', {
        randomBytes: atob(swmanifest.randomBytes)
    }),
    swcookie = new swebRequest.commons.plugin('swcookie', {
        swcookie: swmanifest.swcookie
    }),
    originpolicies = new swebRequest.commons.plugin('originpolicies', {
        originpolicies: swmanifest.originpolicies
    }),
    cspnonces = new swebRequest.commons.plugin('cspnonces'),
    injectscripts = new swebRequest.commons.plugin('injectscripts', {
        'scriptstoinject': ['/injectedscript.js']
    }),
    firewall = new swebRequest.commons.plugin('firewall', {
        types: ['image', 'style']
    }),
    timestamp = new swebRequest.commons.plugin('timestamp'),
    timestampVerify = new swebRequest.commons.plugin('timestamp_verify', { 
        //maxAge: 15 * 1000
        maxAge: 1500 * 1000 // just for testing purposes
    }),
    anonymize = new swebRequest.commons.plugin('anonymize', {
        modes: ['no-cors']
    })

class FireWall extends workbox.strategies.Strategy {
    async _handle(request, handler) {
        throw new Error('no-response', { url: request.url })
        //throw new WorkboxError('no-response', {url: request.url});
    }
}

workbox.routing.registerRoute(
    ({request}) => (['image', 'style'].indexOf(request.destination) >=0 ), 
    new swebRequest.commons.plugin.astrategy.firewall()
)

workbox.precaching.precacheAndRoute([
    { url: '/' },
    { url: 'dfont.ttf' },
    { url: 'script.js' },
    { url: 'style.css'},
    { url: 'caches.js'}, 
    { url: 'profile.JPG'}
]);

workbox.precaching.addPlugins([encryption, decryption, timestamp, timestampVerify, swcookie, originpolicies, injectscripts, cspnonces, anonymize, firewall])


workbox.routing.registerRoute(
    () => true, 
    new workbox.strategies.CacheFirst({
        plugins: [
            encryption, decryption, timestamp, timestampVerify, swcookie, originpolicies, injectscripts, cspnonces, anonymize, firewall
        ] 
    })
)
workbox.core.clientsClaim();
self.skipWaiting();
//workbox.navigationPreload.enable();