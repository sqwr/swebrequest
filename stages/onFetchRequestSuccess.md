# onFetchRequestSuccess

`onFetchRequestSuccess` is the stage executed when a network response is successfully downloaded. 

## Next stages
This stage copies the request and responses objects then branches concurrently to:
- [onBeforeCachePut](onBeforeCachePut.md), the entry stage of cache-writes. Requests/responses can be manipulated, then passed to [onCachePut](onCachePut.md) where cache-writes will be effectively performed.
- [onRequestCompleted](onRequestCompleted.md): the exit stage of [fetch event](../events/fetch.md) where the response is served to the client

## Preceeding stage
- [onFetchRequest](onFetchRequest.md)

## Features
- [proxyrewriteresponses](../features/proxyrewriteresponses.md)

## See also
- [fetch event](../events/fetch.md)