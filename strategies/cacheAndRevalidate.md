# cacheAndRevalidate
The `cacheAndRevalidate`  (`CacheAndRevalidate`, `staleWhileRevalidate` or `StaleWhileRevalidate`) strategy can be understood as a [cacheFirst](cacheFirst.md) strategy that additional performs network fetch and cache writes: cached responses are served but also updated with fresh network ones.

## Runtime options
The possible options are all those of the stages it applies to.


## Examples
Working examples of the `cacheAndRevalidate` strategy. These are the ones deployed on the [demo website](https://swebrequest.doitsec.net/sqwrstrategies.htm). 
||||
|--|--|--|
[standalone](../examples/staleWhileRevalidate.js) | [standalong](../examples/ustaleWhileRevalidate.js) | [workbox](../examples/wstaleWhileRevalidate.js)
|||

- activate directly (standalone)
```javascript
swebRequest.strategies.cacheAndRevalidate();
```
- standalone
```javascript
swebRequest.init(null, {
    cacheAndRevalidate: null
})
```
- standalong
```javascript
self.addEventListener('fetch', event => {
    event.respondWith(swebRequest.commons.strategy.cacheAndRevalidate({ event: event }))
});
```
- Workbox
```javascript
workbox.routing.registerRoute(
    () => true, new workbox.strategies.StaleWhileRevalidate()
)
```

## Definition
```javascript
swebRequest.strategies.define('cacheAndRevalidate', {
    onCacheMatchSuccess: () => { return { parallels : ['onBeforeFetchRequest'] } }
})
```
While following the default [cacheFirst](cacheFirst.md) strategy, if there is a cache-hit, still perform network-fetch, and subsequently cache-writes stages. 

## See also 
- [onCacheMatch](../stages/onCacheMatch.md)
- [onCachePut](../stages/onCachePut.md)
- [onFetchRequest](../stages/onFetchRequest.md)
