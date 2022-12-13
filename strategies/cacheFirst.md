# cacheFirst

The `cacheFirst` or `CacheFirst` strategy is the default routing strategy followed in `swebRequest`. cache reads is attempted first. In case of cache-miss, network-fetch is performed. A copy of network responses is saved in the cache, and another copy served to the client. 


## Runtime options
The possible options are all those of the stages it applies to.


## Examples
Working examples of the `cacheFirst` strategy. These are the ones deployed on the [demo website](https://swebrequest.doitsec.net/sqwrstrategies.htm). 
||||
|--|--|--|
[standalone](../examples/cacheFirst.js) | [standalong](../examples/ucacheFirst.js) | [workbox](../examples/wcacheFirst.js)
|||

- activate directly (standalone)
```javascript
swebRequest.strategies.cacheFirst();
```
- standalone
```javascript
swebRequest.init(null, {
    cacheFirst: null
})
```
- standalong
```javascript
self.addEventListener('fetch', event => {
    event.respondWith(swebRequest.commons.strategy.CacheFirst({ event: event }))
});
```
- Workbox
```javascript
workbox.routing.registerRoute(
    () => true, new workbox.strategies.CacheFirst()
)
```

## Definition
```javascript
swebRequest.strategies.define('cacheFirst', ['onCacheMatch', 'onFetchRequest', 'onCachePut'])
```
After the fetch event is fired with a request, the `onRequestReceived` stage is first entered. At this point, the request filtered. Then, the  [cache read](stages.md#cache-read) stages are handled first. If there is a response in the cache (cache-hit), it is served to the client, by entering the `onRequestCompleted` stage. Otherwise - in case of a cache-miss - the [network-fetch](stages.md#network-fetch) stages are handled to download a fresh response from the origin server. In case of a network-hit, a copy of the response is sent to the [cache-write](stages.md#cache-write) stages where it will be stored in the cache. Then, another copy is served to the client, by entering the the cache `onRequestCompleted` stage. 
Other routing strategies are built on the default `cacheFirst` strategy. 

## See also 
- [onCacheMatch](../stages/onCacheMatch.md)
- [onCachePut](../stages/onCachePut.md)
- [onFetchRequest](../stages/onFetchRequest.md)
