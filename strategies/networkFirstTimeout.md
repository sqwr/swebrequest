# networkFirstTimeout

The `networkFirstTimeout` or `NetworkFirstTimeout` strategy is a `networkFirst` strategy made with a timeout


## Runtime options
|||
|--|--|
`timeout` | number in milliseconds for the network-fetch, before fallback to the cache 

## Examples
Working examples of the `networkFirstTimeout` strategy. These are the ones deployed on the [demo website](https://swebrequest.doitsec.net/sqwrstrategies.htm). 
||||
|--|--|--|
[standalone](../examples/networkFirstTimeout.js) | [standalong](../examples/unetworkFirstTimeout.js) | [workbox](../examples/wnetworkFirstTimeout.js)
|||

- activate directly (standalone)
```javascript
swebRequest.strategies.networkFirstTimeout({
    timeout: 5000
});
```
- standalone
```javascript
swebRequest.init(null, {
    networkFirstTimeout: { timeout: 5000 }
})
```
- standalong
```javascript
self.addEventListener('fetch', event => {
    event.respondWith(swebRequest.commons.strategy.networkFirstTimeout({ event: event, timeout: 5000 }))
});
```
- Workbox
This strategy does not exist in Workbox

## Definition
```javascript
swebRequest.strategies.define('networkFirstTimeout', {
    onRequestReceived: () => { return { next: 'onBeforeFetchRequest' } },
    onFetchRequestError: () => { return { next: 'onBeforeCacheMatch' } },
    onCacheMatchError: () => { return { next : 'onResponseError' } },
    onFetchRequest: null
});
```
After the fetch event is fired with a request, the `onRequestReceived` stage is first entered. At this point, the request filtered. Then the [network-fetch](stages.md#network-fetch) stages are handled to download a fresh response from the origin server. This is done with a timeout. In case of a network-hit within the timeout, a copy of the response is sent to the [cache-write](stages.md#cache-write) stages where it will be stored in the cache. Then, another copy is served to the client, by entering the the cache `onRequestCompleted` stage. 
In case of the network-miss, the [cache read](stages.md#cache-read) stages are executed. If there is a response in the cache (cache-hit), it is served to the client, by entering the `onRequestCompleted` stage. Otherwise - in case of a cache-miss , in order to avoid infinite loops, the `onResponseError` stage is entered. This stage is represents an opportunity for the service worker to provide a custom or fallback response to fulfill the request. 

## See also 
- [onRequestReceived](../stages/onRequestReceived.md)
- [onFetchRequestError](../stages/onFetchRequestError.md)
- [onCacheMatchError](../stages/onCacheMatchError.md)
- [onFetchRequest](../stages/onFetchRequest.md)
- [onBeforeFetchRequest](../stages/onBeforeFetchRequest.md)
- [onBeforeCacheMatch](../stages/onBeforeCacheMatch.md)
- [onResponseError](../stages/onResponseError.md)
