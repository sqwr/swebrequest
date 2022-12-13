importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js")

importScripts('swebRequest.js')




let timestamp = new swebRequest.commons.plugin('timestamp'),
    timestampVerify = new swebRequest.commons.plugin('timestamp_verify', {
        maxAge: 5 * 1000
    });

workbox.precaching.precacheAndRoute([
    { url: '/' },
    { url: 'dfont.ttf' },
    { url: 'script.js' },
    { url: 'style.css'},
    { url: 'caches.js'}, 
    { url: 'profile.JPG'}
]);
workbox.precaching.addPlugins([timestamp, timestampVerify])
    
workbox.routing.registerRoute(
    () => true, 
    new workbox.strategies.CacheFirst({
        plugins: [ timestamp, timestampVerify ] 
    })
)

workbox.core.clientsClaim();
self.skipWaiting();