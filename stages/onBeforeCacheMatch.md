# onBeforeCacheMatch
The `onBeforeCacheMatch` stage is the entry stage of the `cache-read` stages. This is a convenient stage where requests can be manipulated prior to cache-reads performed at the next [onCacheMatch](onCacheMatch.md) stage. 

Features at this stage work on in all [modes](../modes.md). 


## Next stage
- [onCacheMatch](onCacheMatch.md)

## Preceeding stages
- [onRequestReceived](onRequestReceived.md): according to the default [cacheFirst](../strategies/cacheFirst.md) strategy.
- [onFetchRequestError](onFetchRequestError.md): Network-first strategies (i.e. [networkFirst](../strategies/networkFirst.md)) that experience a network-error (at `onFetchRequestError`) will branch back to [`onBeforeCacheMatch`] in order to perform cache-read. 
  


