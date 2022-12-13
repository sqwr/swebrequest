# cacheOnly
The `cacheOnly` or `CacheOnly` strategy borbids the use of the network even on cache-miss.


## Runtime options
The possible options are all those of the stages it applies to.

## Examples
Working examples of the `cacheOnly` strategy. These are the ones deployed on the [demo website](https://swebrequest.doitsec.net/sqwrstrategies.htm). 

||||
|--|--|--|
[standalone](../examples/cacheOnly.js) | [standalong](../examples/ucacheOnly.js) | [workbox](../examples/wcacheOnly.js)
|||

- activate directly (standlaone)
```javascript
swebRequest.strategies.cacheOnly();
```
- Standalone
```javascript
swebRequest.init(null, {
    cacheOnly: null
})
```
- standalong
```javascript
self.addEventListener('fetch', event => {
    event.respondWith(swebRequest.commons.strategy.CacheOnly({ event: event }))
});
```
- Workbox
```javascript
workbox.routing.registerRoute(
    () => true, new workbox.strategies.CacheOnly()
)
```

## Definition
```javascript
swebRequest.strategies.define('cacheOnly', {
    onCacheMatchError: () => { return { next: 'onResponseError' } }
});
```
It reads as ***even when there is a cache-miss, do not perform network-fetch***. As shown in the Figure above, when there is a cache-miss, the `onCacheMatchError` stage is entered, and after that stage, the network-stages are handled. As the `cacheOnly` does not perform network fetch, the `onCacheMatchError` stage rather branches tot he `onResponseError` stage. This is a stage where one can provide a custom or fallback response to be served to the client at the subsequent `onRequestCompleted` stage.
This strategy works best when responses have been precached. One should also consider generating custom or fallback responses in case of cache-misses. 


## See also 
- [onCacheMatch](../stages/onCacheMatch.md)
- [onCachePut](../stages/onCachePut.md)
