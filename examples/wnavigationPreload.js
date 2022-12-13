importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js")


self.skipWaiting();
workbox.core.clientsClaim();
workbox.navigationPreload.enable();

workbox.routing.registerRoute(
    () => true, 
    new workbox.strategies.NetworkOnly()
)