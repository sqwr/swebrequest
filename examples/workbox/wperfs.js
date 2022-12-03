importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js")

importScripts('swebRequest.js')
importScripts('http://localhost:8911/token.js?origin=' + location.origin + '/&href=' + location.href)
importScripts('/swmanifest.js?token=' + randomToken().token)




let perfstart = new swebRequest.feature('perfstart'),
    perfsend = new swebRequest.feature('perfsend');

console.log(workbox.expiration)


let expiration = new workbox.expiration.ExpirationPlugin({
    maxAgeSeconds: 15
});

swebRequest.enableLogging(true, false)

workbox.routing.registerRoute(
    () => true, 
    new workbox.strategies.CacheFirst({
        cacheName: 'v1',
        plugins: [
            perfstart, perfsend, expiration
        ]
    })
)
//workbox.navigationPreload.enable();