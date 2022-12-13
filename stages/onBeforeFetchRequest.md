# onBeforeFetchRequest
The `onBeforeFetchRequest` is the entry stage of network-fetch stages. It is a convenient stage spot suitable for manipulating requests prior to network-fetch. For instance, one could implement a feature that skips the next [onFetchRequest](onFetchRequest.md) stage if the browser is offline. It is the perfect place to implement [features](../features.md) that manipulate requests before network fetch.




## Next stage
- [onFetchRequest](onFetchRequest.md): main stage where network-fetch is effectively done

## Preceeding stages
- [onCacheMatchError](onCacheMatchError.md): when there is a cache-miss. 
- [onInstall](onInstall.md): each asset to precache is passed to the is network-fetched and stored in the cache.
- [onRequestReceived](onRequestReceived.md): for [network fetch strategies](#strategies)


## Features
Features implemented at this stage work on in all [modes](../modes.md). 
- [anonymize_xor](../features/anonymize_xor.md)
- [anonymize](../features/anonymize.md)
- [setRequestHeaders](../features/setRequestHeaders.md)
- [swcookie](../features/swcookie.md)
  
## Strategies 
This is also the first stage reached after [onRequestReceived](onRequestReceived.md) for network(-first) strategies such as:
- [networkFirst](../strategies/networkFirst.md)
- [networkFirstTimeout](../strategies/networkFirstTimeout.md)
- [networkOnly](../strategies/networkOnly.md)
- [cacheOrNetwork](../strategies/cacheOrNetwork.md)
- [precaching](../strategies/precaching.md)

