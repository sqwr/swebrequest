# API

## `init`

### Syntax
```javascript
swebRequest.init(features?, strategies?, stages?, standalone?, phases?)
```

### Parameters
- `features`: optional
- `strategies`: optional
- `stages`: optional
- `standalone`: optional
- `phases`: optional

### Examples


## `usefeatures`

### Syntax
```javascript
swebRequest.usefeatures(features?, strategies?, stages?)
```


### Parameters
- `features`: optional
- `strategies`: optional
- `stages`: optional

### Examples


## addListener

### Syntax
```javascript
swebRequest.STAGENAME.addListener(listener?, filter?, extra?, xfilter?, prepend?)
```

### Parameters
- `STAGENAME`: 
- `listener`: optional
- `filter`: optional 
- `extra`: optional
- `xfilter`: optional
- `prepend`: optional


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


## `features.define`

### Syntax


### Parameters


### Examples



## Syntax
The main API of `swebRequest` is shown below
```javascript
swebRequest.init(features?, strategies?, stages?, standalone?, phases?); // standalone usage
swebRequest.usefeatures(features?, strategies?, stages?); // standalong usage
swebRequest.[stage].addListener(listener?, filter?, extra?, xfilter?, prepend?); // add callbacks
swebRequest.features.define(name, listener, stages?, filter?, extra?, xfilter?); // 
swebRequest.strategies.define(name, stages); // 
swebRequest.strategies.[STRATEGY](filter?, extra?, xfilter?)
swebRequest.commons.plugin(feature, filter?); //Workbox usage
swebRequest.features.[FEATURE](filter?, extra?, xfilter?)
```
where:
