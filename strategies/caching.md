# caching
The `caching` strategy is a convenient way of applying the same options (types of requests, cache names) during both [cache-reads](../stages/onCacheMatch.md) and [cache-writes](../stages/onCachePut.md)

## stages 
||| 
|--|--|
[onCacheMatch](../stages/onCacheMatch.md) | cache-reads
[onCachePut](../stages/onCachePut.md) | cache-writes

We recommend using this strategy in order to define 

## runtime options
Any options applicable to the `onCacheMatch` and `onCachePut` stages. This includes for instance, `storage`, `caches`. We

## Examples
- direct
```javascript
swebRequest.features.caching({
    storage: 'indexedDB', methods: ['POST', 'PUT'], caches: ['idbv1']
})
```
- standalone
```javascript
swebRequest.init(null, {
    caching: { storage: 'indexedDB', methods: ['POST', 'PUT'], caches: ['idbv1'] }
})
```

- standalong
N/A
- workbox
N/A

## Definition
```javascript
swebRequest.strategies.define('caching', ['onCacheMatch', 'onCachePut']);
```
