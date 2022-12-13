# Workbox
Use of `swebRequest` features as plugin for a SW written in [Workbox](https://developer.chrome.com/docs/workbox/).
Workbox focuses a lot on caching and routing strategies. Nonetheless, it has a concept of plugins defined by implementing a couple of callback functions. This concept has been leverage to provide a mapping between Workbox plugin callback functions and `swebRequest` stages. This makes it possible to use most of `swebRequest` features with service workers specifically written with Workbox. 



## Mapping Workbox vs. swebRequest
The following table list the stages in `swebRequest` which are mapped to [Workbox plugins callacks](https://developer.chrome.com/docs/workbox/using-plugins/#methods-for-custom-plugins)

| Workbox callback function | `swebRequest` stages executed |
|--|--|
`handlerWillStart` | `onRequestReceived`
`cacheWillUpdate` | `onBeforeCachePut` 
`cachedResponseWillBeUsed` | `onCacheMatchSuccess`
`requestWillFetch` | `onBeforeFetchRequest`
`fetchDidSucceed` | `onFetchRequestSuccess`
`handlerWillRespond` | `onRequestCompleted`


## Limitations

### Repeating features at all features
In `swebRequest`, features execute at specific stages. Therefore, they execute independently of routing strategies. In Workbox, strategies execute independently from each other, and there are no stages. In other words, features have to be repeated at all the strategies enabled, if necessary. This is potentially error-prone. The [standalone](../modes/standalone.md) and [standalong](../modes/standalong.md) modes.  


### Requests cancellations
Listeners and features that use cancel requests are not supported in Workbox. In general, jumping from stages to stages is not supported. In particular, requests cancellation have to be implemented with strategies, instead of plugins. Here is a simple strategy that cancels requests in Workbox. 
#### Definition
```javascript
class FireWall extends workbox.strategies.Strategy {
    async _handle(request, handler) {
        throw new Error('no-response', { url: request.url })
    }
}
```
The strategy just throws an error, which will abort the request. 
This strategy is defined under `swebRequest.commons.plugin.astrategy.firewall()` as shown

#### Usage 
```javascript
workbox.routing.registerRoute(
    ({request}) => (['image', 'style'].indexOf(request.destination) >=0 ), 
    new swebRequest.commons.plugin.astrategy.firewall()
)
```
Images and stylesheets are blocked. 