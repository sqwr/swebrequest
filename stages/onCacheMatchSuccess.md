# onCacheMatchSuccess
This stage, the cache-hit stage, is the next stage entered when a response is successfully read from the cache at [onCacheMatch](onCacheMatch.md)

[Features](../features.md) that can be implemented at this stage are all those that revert the effects of dual features that manipulated the requests/responses before cache writes, at the [onBeforeCachePut](../stages/onBeforeCachePut.md) stage. 

## Features implemented at this stage 
- [decryption](../features/decryption.md)
- [verification](../features/verification.md)
- [timestamp_verify](../features/timestamp_verify.md)
- [cspnonces](../features/cspnonces.md)


## See also
- [fetch event](../events/fetch.md)
- [onBeforeCachePut](../stages/onBeforeCachePut.md)