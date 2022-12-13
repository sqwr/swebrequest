# onFetchRequestError
The `onFetchRequestError` stage is the network-miss or network-error stage.
Network-error can occur if a request failed to fetch, or the browser is offline, etc. This is convenient stage that provides an opportunity to generate a fallback or custom response. This stage naturally branches to [onResponseError](onResponseError.md). However, [network-first](strateiges) may change this default behavior by rather branching to the [onBeforeCacheMatch](onBeforeCacheMatch.md) stage to attempt a cache read.

## Next stage
- [onResponseError](onResponseError.md)
- [onBeforeCacheMatch](onBeforeCacheMatch.md) when [network-first strategies](#strategies) are activated

## Preceeding stage
- [onFetchRequest](onFetchRequest.md)

## Strategies
- [networkFirst](../strategies/networkFirst.md)
- [networkFirstTimeout](../strategies/networkFirstTimeout.md)

