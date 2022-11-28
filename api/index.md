# API
0. Core 
    1. Listeners
        - callback
            - parameter
            - return value
        - filter
        - extra options
        - xfilter
    2. Stages
        - addListener
    3. Features 
        - definition
    4. Strategies
        - definition
    5. Events
        - fetch
        - install
        - activate
        - message
    6. APIs
        - cache read
        - cache write
        - cache delete
        - fetch
1. Standalone
    1. init
    2. enable features
    3. enable strategies
    4. Hooking
        1. fetch
        2. cacheread
        3. cachewrite
        4. idbread
        5. idbwrite
2. Standalong
    1. usefeatures
    2. enable features
    3. enable strategies
4. Workbox
    1. enable features

1. Standalone usage
    - [swebRequest.init](#init)
2. Standalong usage
    - [swebRequest.usefeatures](#usefeatures)
    - [swebRequest.commons.strategy.STRATEGY](#commonsstrategystrategy)
3. Stages
    - [addListener](#addlistener)
4. Features
    - [swebRequest.features.define](#featuresdefine)
    - [swebRequest.features.FEATURE](#featuresfeature)
5. Strategies
    - [swebRequest.strategies.define](#strategiesdefine)
    - [swebRequest.strategies.STRATEGY](#strategiesstrategy)
6. Workbox
    - [swebRequest.commons.plugin](#commonsplugin)
    - [swebRequest.commons.plugin.astrategy.FEATURE](#commonspluginastrategyfeature)
7. Hooking
    - [swebRequest.fetch](#fetch)
    - [swebRequest.cacheread](#cacheread)


## Syntax

### init
```javascript
swebRequest.init(features?, strategies?, stages?, standalone?, phases?)
```

### usefeatures
```javascript
swebRequest.usefeatures(features?, strategies?, stages?)
```


### addListener
```javascript
swebRequest.[STAGE].addListener(listener?, filter?, extra?, xfilter?, prepend?)
```

### features.define
```javascript
swebRequest.features.define(FEATURE, listener, stages?, filter?, extra?, xfilter?)
```

### features.FEATURE
```javascript
swebRequest.features.[FEATURE](filter?, extra?, xfilter?)
```

### strategies.define
```javascript
swebRequest.strategies.define(STRATEGY, stages)
```


### strategies.STRATEGY
```javascript
swebRequest.strategies.[STRATEGY](filter?, extra?, xfilter?)
```

### commons.plugin
```javascript
new swebRequest.commons.plugin(FEATURE, filter?);
```

### commons.plugin.astrategy.FEATURE
```javascript
new swebRequest.commons.plugin.astrategy.[FEATURE]()
```

### commons.strategy.STRATEGY
```javascript
swebRequest.commons.strategy.[STRATEGY](details)
```

### fetch
```javascript
swebRequest.fetch(details)
```

### cacheread
```javascript
swebRequest.cacheread(details)
```

### cachewrite
```javascript
swebRequest.cachewrite(details)
```

### idbread
```javascript
swebRequest.idbread(details)
```


### idbwrite
```javascript
swebRequest.idbwrite(details)
```


## Parameters
- `FEATURE`: 
- `STRATEGY`:
- `features`: optional
- `strategies`: optional
- `stages`: optional
- `standalone`: optional
- `phases`: optional
- `listener`: optional
- `filter`: optional 
- `extra`: optional
- `xfilter`: optional
- `prepend`: optional
- `details.event`: raw [fetch event]() for `CacheFirst`, `CacheFirst`, `NetworkFirst`, `StaleWhileRevalidate`, `NetworkFirstTimeout`
- `details.cacheName`: string specifying cache name, for `CacheFirst`, `CacheFirst`, `NetworkFirst`, `StaleWhileRevalidate`, `CacheOnly`, `NetworkOnly`, `NetworkFirstTimeout`, `Precaching`
- `details.assets`: array of assets, i.e. requests URLs or objects for `Precaching` strategy
- `details.timeout`: number of milliseconds for `NetworkFirstTimeout`

### Examples
> Enable `encryption` and `decryption` features on navigation requests 
```javascript
swebRequest.onCacheMatch.addListener(null, {
    modes: ["navigate"],
    randomBytes: atob("yQL1TPO7aTs5zpEEw+00XN6+kNUMxUSAHoBLNBes5NY=")
}, ["encryption", "decryption"]);
```

> Enable `cspnonces` and `anonymize_xor` features
```javascript
swebRequest.onCachePut.addListener(null, null, ["cspnonces", "anonymize_xor"])
```




