# Standalone mode
This is the recommended mode, to be used to write a brand new service worker. It is the mode that gives you the most of `swebRequest`. In this mode, all the different [events](../events.md), [stages](../stages.md), [features](../features.md) and [strategies](../strategies.md) of `swebRequest` can be used. This mode is enabled by calling the method `swebRequest.init()`. 


## swebRequest.init
The method to call to enable the standalone mode. [Features](../features.md) and [strategies](../strategies.md) could be enabled before, and listeners added [stages](../stages.md#addlistener), but unless `swebRequest.init()` is called, none of them will be executed. Nonetheless, features, strategies or stages can also be directly to pass to `swebRequest.init` with their [filter options](../options/filter.md).

### Syntax
```javascript
swebRequest.init(features?, strategies?, stages?, standalone?, phases?)
```
The parameters are described below.
||| 
|--|--|
`features` | an optional object literal of feature names, each associated its [filter options](../options/filter.md) 
`strategies` | an optional object literal of strategy names, each associated [filter options](../options/filter.md) to apply to all the stages of the strategy.
`stages` | an optional object literal of stage names, each associated to [filter options](../../options/filter/index.md) to be applied to it.
`standalone` | an optional boolean, which defaults to `true` for `standalone` mode, and `false` for `standalong` mode 
`phases` | an optional object literal of [event names](../events.md), each associated to a boolean. The goal is to disable events. A `false` value indicates that `swebRequest` should not call [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) on the event. In other words, the stages related to that event will be ignored, and the event disabled. 

## Examples
```javascript
swebRequest.init({
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



Features, strategies can also be enabled before calling `swebRequest.init` as shown in the example below.

```javascript
swebRequest.features.anonymize_xor();
swebRequest.features.encryption({ randomBytes: "r@nd0m321" });
swebRequest.features.decryption({ randomBytes: "r@nd0m321" });
swebRequest.strategies.precaching({ assets: [ '/', 'main.js', 'main.css', 'logo.png' ] })
swebRequest.strategies.cacheOnly({ online: false })
swebRequest.strategies.networkFirst({ online: true })
swebRequest.init();
```

## See also
- [Features](../features.md)
- [Strategies](../strategies.md)
- [Stages](../stages.md)
- [Events](../events.md)
- [Standalong](../modes/standalong.md)
- [Workbox](../modes/workbox.md)