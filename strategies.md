# Strategies
A strategy is a named set of stages. Their main purpose is to make it easy to apply the same options [filter](#filter.md) and [extra](extra_options.md) to all the stages in the strategy. 
Nonetheless, the can also implement routing and caching purposes. 

Strategies names are case sensitive, expect for the first character. For instance, `cacheFirst` and `CacheFirst` refer to the same strategy

## Definition
### Syntax
Strategies are defined as follows
```javascript
swebRequest.strategies.define(name: string, stages: string[] | { [key: string]: CallBack } ) => void
```

### Parameters
- `name`: the name of the strategy, i.e. `cacheFirst`, `networkOnly`
- `stages`: the set of stages that make up the strategy, each associated to a `listener`. For stages that have default built-in listeners (i.e. `onCacheMatch`, `onFetchRequest`, `onCachePut`, `onInstall`, `onActivate`), the listener can be `null` when defining the strategy, in which case the default listener will be applied to the stage when the feature is invoked. 


## Activation

### direct mode
```javascript
swebRequest.strategies.STRATEGY(filter?: FilterOptions, extra_options?: ExtraOptions, xfilter?: FilterOptions)
```

|||
|--|--|
`filter` | optional [filter options](options/filter.md) that applies to all the stages of the strategy |
`extra_options` | optional [extra options](options/)

### standalone

### standalong

### workbox



## Strategies built-in
- Fetch event
    - [cacheFirst](strategies/cacheFirst.md)
    - [cacheOnly](strategies/cacheOnly.md)
    - [cacheAndRevalidate](strategies/cacheAndRevalidate.md)
    - [networkFirst](strategies/networkFirst.md)
    - [networkOnly](strategies/networkOnly.md)
    - [networkFirstTimeout](strategies/networkFirstTimeout.md)
    - [cacheOrNetwork](strategies/cacheOrNetwork.md)
- Install event
    - [precaching](strategies/precaching.md)
- Activate event
    - [cleanup](strategies/cleanup.md)


### networkFirst
The `networkFirst` or `NetworkFirst` strategy tries first to download a fresh response from the origin server, then falls back to the cache in case of a network-miss. It is defined as follows:
```javascript
swebRequest.strategies.define('networkFirst', {
    onRequestReceived: () => { return { next: 'onBeforeFetchRequest' } },
    onFetchRequestError: () => { return { next: 'onBeforeCacheMatch' } },
    onCacheMatchError: () => { return { next : 'onResponseError' } }
});
```
When a request is intercepted, the `onBeforeFetchRequest` is entered to perform network-fetch. In case of network-hit, a copy of the response is subsequently stored in the cache, and another copy returned to the client. Otherwise, there is a network-miss, and cache-read will be attempted, by entering the `onBeforeCacheMatch` stage. To guard against infine loops in case of a cache-miss (and a network-miss), cache-misses do not trigger network-fetch. Instead, the `onResponseError` stage is entered where a custom response can be generated to fulfill the request. 

### networkFirstTimeout
The `networkFirstTimeout` or `NetworkFirstTimeout` strategy is exactly like the `networkFirst` strategy, expect that the network fetch is performed with a timeout.

```javascript
swebRequest.strategies.define('networkFirstTimeout', {
    onRequestReceived: () => { return { next: 'onBeforeFetchRequest' } },
    onFetchRequestError: () => { return { next: 'onBeforeCacheMatch' } },
    onCacheMatchError: () => { return { next : 'onResponseError' } },
    onFetchRequest: null
});
```
The sole different is the presence of the `onFetchRequest` stage. As this stage will be invoked with a timeout filter option, the `onFetchRequest` stage will be handled with this timeout.


