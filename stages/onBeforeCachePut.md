# onBeforeCachePut
This is the entry stage of cache-writes stages, that also include [onCachePut](onCachePut.md) and [onCachePutCompleted](onCachePutCompleted.md). It is a convenient stage that preceeds effective cache-writes operations done at [onCachePut](onCachePut.md). This is the perfect place to implement features thta manipulate responses and requests before cache-writes. In general, these features have dual counterparts that revert their effects at the [onCacheMatchSuccess](../stages/onCachecMatchSuccess.md) stage, after cache-reads. 

## Next stage
- [onCachePut](onCachePut.md)

## Preceeding stage
- [onFetchRequestSuccess](onFetchRequestSuccess.md)

## Features
Features at this stage work on in all [modes](../modes.md). 
- [encryption](../features/encryption.md)
- [signature](../features/verification.md)
- [timestamp](../features/timestamp_verify.md)
The features at this stage usually have dual counterparts at the [onCacheMatchSuccess](onCacheMatchSuccess.md) to revert their effect. For instance, [decryption](../features/decryption.md) reverts the effect of [encryption](../features/encryption.md) feature. 


## See also
- [fetch event](../events/fetch.md)
- [onCacheMatchSuccess](../stages/onCachecMatchSuccess.md)
