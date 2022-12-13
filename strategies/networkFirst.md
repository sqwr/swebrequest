# networkFirst

The `networkFirst` or `NetworkFirst` strategy is the opposite of the default [cacheFirst](cacheFirst.md) routing strategy followed in `swebRequest`: network fetch is attempted first. In case of network-miss, cache-read is performed. Copies of network responses are saved in the cache when the fetch is successful


## Runtime options
The possible options are all those of the stages it applies to.


## Examples
Working examples of the `networkFirst` strategy. These are the ones deployed on the [demo website](https://swebrequest.doitsec.net/sqwrstrategies.htm). 
||||
|--|--|--|
[standalone](../examples/networkFirst.js) | [standalong](../examples/unetworkFirst.js) | [workbox](../examples/wnetworkFirst.js)
|||

- activate directly (standalone)
```javascript
swebRequest.strategies.networkFirst();
```
- standalone
```javascript
swebRequest.init(null, {
    networkFirst: null
})
```
- standalong
```javascript
self.addEventListener('fetch', event => {
    event.respondWith(swebRequest.commons.strategy.networkFirst({ event: event }))
});
```
- Workbox
```javascript
workbox.routing.registerRoute(
    () => true, new workbox.strategies.NetworkFirst()
)
```

## Definition
```javascript
swebRequest.strategies.define('networkFirst', {
    onRequestReceived: () => { return { next: 'onBeforeFetchRequest' } },
    onFetchRequestError: () => { return { next: 'onBeforeCacheMatch' } },
    onCacheMatchError: () => { return { next : 'onResponseError' } },
    onFetchRequest: null
});
```
After the fetch event is fired with a request, the `onRequestReceived` stage is first entered. At this point, the request filtered. Then the [network-fetch](stages.md#network-fetch) stages are handled to download a fresh response from the origin server. In case of a network-hit, a copy of the response is sent to the [cache-write](stages.md#cache-write) stages where it will be stored in the cache. Then, another copy is served to the client, by entering the the cache `onRequestCompleted` stage. 
In case of the network-miss, the [cache read](stages.md#cache-read) stages are executed. If there is a response in the cache (cache-hit), it is served to the client, by entering the `onRequestCompleted` stage. Otherwise - in case of a cache-miss , in order to avoid infinite loops, the `onResponseError` stage is entered. This stage is represents an opportunity for the service worker to provide a custom or fallback response to fulfill the request. 

## See also 
- [onRequestReceived](../stages/onRequestReceived.md)
- [onFetchRequestError](../stages/onFetchRequestError.md)
- [onCacheMatchError](../stages/onCacheMatchError.md)
- [onFetchRequest](../stages/onFetchRequest.md)
- [onBeforeFetchRequest](../stages/onBeforeFetchRequest.md)
- [onBeforeCacheMatch](../stages/onBeforeCacheMatch.md)
- [onResponseError](../stages/onResponseError.md)
