# Standalong mode
Use of `swebRequest` with an existing service worker. To properly operate, `swebRequest` and its features must be imported and executed ***before*** the original service worker code. 

The standalong mode assumes that the original service worker does the registration of the different events, i.e. `fetch`, `install`, `activate`, etc. This mode also assumes that the original performs the caching and fetch APIs to manage requests and responses. 
Notably, the `onCacheMatch`, `onCachePut`, `onFetchRequest` and `onInstall`, `onActivate` stages where `swebRequest` performs caching and networking operations in the standalone mode, are ignored (because those operations are performed by the original service worker). 

Finally, jumping from stages to stages is not supported in this `standalong` mode, as well as the [workbox](workbox.md) mode. 

## swebRequest.usefeatures
The method to call to enable the standalone mode. [Features](../stages.md) and [strategies](../strategies.md) could be enabled before, and listeners added [stages](../stages.md#addlistener), but unless `swebRequest.usefeatures()` is called, none of them will be executed. Nonetheless, features, strategies or stages can also be directly to pass to `swebRequest.usefeatures` with their [filter options](../options/filter.md).


### Syntax
```javascript
swebRequest.usefeatures(features?, strategies?, stages?, phases?)
```
The parameters are described below.
||| 
|--|--|
`features` | an optional object literal of feature names, each associated its [filter options](../options/filter.md) 
`strategies` | an optional object literal of strategy names, each associated [filter options](../options/filter.md) to apply to all the stages of the strategy.
`stages` | an optional object literal of stage names, each associated to [filter options](../../options/filter/index.md) to be applied to it.
`phases` | an optional object literal of [event names](../events.md), each associated to a boolean. The goal is to disable events. A `false` value indicates that `swebRequest` should not call [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) on the event. In other words, the stages related to that event will be ignored, and the event disabled. 


## Examples
```javascript
swebRequest.usefeatures({
    anonymize_xor: null,
    encryption: { randomBytes: "r@nd0m321" },
    decryption: { randomBytes: "r@nd0m321" }
}, {
    precaching: { assets: ['/', 'main.js', 'main.css', 'logo.png' ] },
    cacheOnly: { online: false }
    networkFirst: { online: true },
})
```
The [anonymize_xor](../features/anonymize_xor.md), [decryption](../features/decryption.md) and [encryption](../features/encryption.md) features are enabled. The [precaching](../strategies/precaching.md) prefills the cache with a couple of assets. Then when there is network, the [networkFirst](../strategies/networkFirst.md) routing strategy is used, otherwise the [cacheOnly](../strategies/cacheOnly.md) is used. 



Features, strategies can also be enabled before calling `swebRequest.usefeatures` as shown in the example below.

```javascript
swebRequest.features.anonymize_xor();
swebRequest.features.encryption({ randomBytes: "r@nd0m321" });
swebRequest.features.decryption({ randomBytes: "r@nd0m321" });
swebRequest.strategies.precaching({ assets: [ '/', 'main.js', 'main.css', 'logo.png' ] })
swebRequest.strategies.cacheOnly({ online: false })
swebRequest.strategies.networkFirst({ online: true })
swebRequest.usefeatures();
```



## Hooking Service workers APIs
Before the original service worker code executes, `swebRequest` in standalong mode hooks, using the JavaScript Proxy API, a set of APIs corresponding to specific stages, and execute features and listeners registred at those stages. 

|Service worker API hooked | `swebRequest` stages executed |
|--|--|
`EventTarget.prototype.addEventListener` | `onRequestReceived` |
`FetchEvent.prototype.respondWith` | `onRequestCompleted` | 
`fetch` | `onBeforeFetchRequest`, `onFetchRequestSuccess` |
`Cache.prototype.[put,add,addAll]` | `onBeforeCachePut` |
`Cache.prototype.[match,matchAll]`, `CacheStorage.prototype.match` | `onBeforeCacheMatch`, `onCacheMatchSuccess`

Here is how the [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) API is hooked.

```javascript
self.fetch = new Proxy(self.fetch, {
    apply:  function(target, thisArgs, argsList) {
        let request = argsList[0]
        if ((request instanceof Request) && (request.cache === 'only-if-cached') && (request.mode !== 'same-origin')) 
            return target.apply(thisArgs, argsList);
        if (!(request instanceof Request)) 
            request = new Request(...argsList);
        return (async function() {
            let details: Details = { request: request, response: undefined, phase: 'fetch' }
            try {
                details = await Stage.stages.onBeforeFetchRequest.execute(details);
                if (details.request) request = details.request
                details.response = await target.apply(thisArgs, [request.clone()]);
                details = await Stage.stages.onFetchRequestSuccess.execute(details)
                return details.response
            } catch(e) {}
            return undefined;
        })()
    }
})
```
The listeners at the [onBeforeFetchRequest](../stages/onBefore)


### Other Events
Listeners registered at stages of all SWs events, execept the `fetch` event, are executed at the `EventTarget.prototype.addEventListener` hooked API. Again, the listeners will only be executed if the related event is registered by the original service worker. 

## Routing strategies
Recall that in this mode, the original service worker is taking care of the registration of the different events and making the different APIs calls (i.e. caching and networking). This implies that the original service worker is taking care of the routing of HTTP requests. Therefore, it does not really make sense to enable routing strategies such as [cacheFirst](../strategies/cacheFirst.md) or [networkFirst](../strategies/networkFirst.md) because they will not be properly enforced. So we recommend to avoid the [routing strategies](../strategies.md). 

Nonetheless if a strategy includes: a stage that is appears in the [table above](#sws-apis-vs-swebrequest-stages) its listeners will be executed when the stage is reached. But in general, we do not recommend enabling the built-in [routing strategies](../strategies.md) in this mode, because they are not enforced as expected.  

### Specific routing strategies for the standalong mode
These strategies do not involve stages.





## See also
- [Standalone](../modes/standalone.md)
- [Features](../features.md)
- [Stages](../stages.md)
- [Events](../events.md)
- [Strategies](../strategies.md)
- [Workbox](../modes/workbox.md)