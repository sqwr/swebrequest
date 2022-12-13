# cacheOrNetwork

The `cacheOrNetwork` (or `CacheNetwork`) strategy performs network fetch and cache-read concurrently. The first to complete with a response wins and its response is used. 


## Examples
Working examples of the `cacheOrNetwork` strategy. These are the ones deployed on the [demo website](https://swebrequest.doitsec.net/sqwrstrategies.htm). 
||||
|--|--|--|
[standalone](../examples/cacheOrNetwork.js) | [standalong](../examples/ucacheOrNetwork.js) | [workbox](../examples/wcacheOrNetwork.js)
|||

- activate directly (standalone)
```javascript
swebRequest.features.cacheOrNetwork()
```
- standalone
```javascript
swebRequest.init({
    cacheOrNetwork: null
})
```
- standalong
```javascript
self.addEventListener('fetch', event => {
    event.respondWith(swebRequest.commons.strategy.cacheOrNetwork({ event: event }))
});
```
- workbox
Workbox does not have such a strategy


## Definition
The strategy is defined as follows:
```javascript
swebRequest.strategies.define('cacheOrNetwork', {
    onRequestReceived: () => { return { next: 'onBeforeFetchRequest', parallels: ['onBeforeCacheMatch'] } },
    onCacheMatchError: async (details: Details) => {
        if (details.filter && details.filter.timeout)
            await waitingTime(details.filter.timeout) 
        return { next : 'onResponseError' }
    }
})
```
When a request is intercepted at the `onRequestReceived` stage, the network-fetch stages are entered next (via `onBeforeFetchRequest`) and the cache-read stages are entered concurrently (via `onBeforeCacheMatch`). The first concurrent branch to reach `onRequestCompleted` will have its response served to the client. Note the use of an optional timeeout when there is a cache-miss. In fact, cache-misses are very cheap, and likely to complete before network-fetch. In that case, one can provide a time to be waited for. During this time, network-fetch may have been completed with a fresh response to be served to the client. As the cache is also updated with the network response, the next cache-read will likely lead to a cache-hit, and if it is quicker than the network-fetch, then it is used. Note that in any case, the cache is always  updated with a fresh network response (provided that the user browser is online). 

| Runtime options | Description |
|--|--|
`timeout` | time in milliseconds that cache-miss must wait for before branching to the [onResponseError](../stages/onResponseError.md) stage. This time gives the opportunity for the network fetch to complete with a response to be served to the client


## See also 
- [onRequestReceived](../stages/onRequestReceived.md)
- [onCacheMatch](../stages/onCacheMatch.md)
- [onCachePut](../stages/onCachePut.md)
- [onFetchRequest](../stages/onFetchRequest.md)
- [onCacheMatchError](../stages/onCacheMatchError.md)
- [onBeforeCacheMatch](../stages/onBeforeCacheMatch.md)
- [onBeforeFetchRequest](../stages/onBeforeFetchRequest.md)

