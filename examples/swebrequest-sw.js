importScripts('swebRequest.js')

swebRequest.init({}, {
    networkFirst: { modes: ['navigate'], statuses: [200], caches: ['pages'] },
    cacheAndRevalidate: { types: ['script', 'worker', 'style'], statuses: [200], caches: ['assets'] },
    cacheFirst: { types: ['images'], statuses: [200], caches: ['images'] }
})
