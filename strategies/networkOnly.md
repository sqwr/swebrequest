# networkOnly
The `networkOnly` or `NetworkOnly` strategy does not use the cache.

## Runtime options


## Examples
Working examples of the `networkOnly` strategy. These are the ones deployed on the [demo website](https://swebrequest.doitsec.net/sqwrstrategies.htm). 
||||
|--|--|--|
[standalone](../examples/networkOnly.js) | [standalong](../examples/unetworkOnly.js) | [workbox](../examples/wnetworkOnly.js)
|||

- activate directly (standalone)
```javascript
swebRequest.strategies.networkOnly();
```
- standalone
```javascript
swebRequest.init(null, {
    networkOnly: null
})
```
- standalong
```javascript
self.addEventListener('fetch', event => {
    event.respondWith(swebRequest.commons.strategy.networkOnly({ event: event }))
});
```
- Workbox
```javascript
workbox.routing.registerRoute(
    () => true, new workbox.strategies.networkOnly()
)
```


## Definition
The `networkOnly` strategy is simply defined as follows:
```javascript
swebRequest.strategies.define('networkOnly', {
    onRequestReceived: () => { return { next: 'onBeforeFetchRequest' } },
    onBeforeCachePut: () => { return { next: 'onCachePutCompleted' } }
});
```
It reads: When a request is intercepted (at the `onRequestRecieved` stage), perform  network-fetch  (by entering the `onBeforeFetchRequest` stage). When the `onBeforeCachePut` stage is about to entered with a copy of the response to be stored in the cache, do not effectively perform cache-write at the next `onCachePut` stage, but rather jump to the `onCachePutCompleted` stage. 



## See also 
- [onRequestReceived](../stages/onRequestReceived.md)
- [onBeforeFetchRequest](../stages/onBeforeFetchRequest.md)
- [onBeforeCachePut](../stages/onBeforeCachePut.md)


