importScripts('swebRequest.js')

swebRequest.init({ 
    perfstart: null, perfsend: null,
    navigationPreload: null, 
    skipWaiting: null
}, { networkOnly: null });


swebRequest.enableLogging(true, false)