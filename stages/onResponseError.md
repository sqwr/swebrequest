# onResponseError
The `onResponseError` is a convient stage dedicated to providing a custom or fallback response when none was provided by  neither [cache-read](onCacheMatch.md) nor [network-fetch](onFetchRequest.md) stages. 


## Next stage
- [onRequestCompleted](onRequestCompleted.md)


## Preceeding stages
- [onFetchRequestError](onFetchRequestError.md):
- [onCacheMatchError](onCacheMatchError.md): in case of of a [cacheOnly](../strategies/cacheOnly.md) strategy, or to avoid infinite loops in network-first straegies such as [networkFirst](../strategies/networkFirst.md), [networkFirstTimeout](../strategies/networkFirstTimeout.md) if both cache and network are unavailable. 


## Strategies
- [cacheOrNetwork](../strategies/cacheOrNetwork.md)
