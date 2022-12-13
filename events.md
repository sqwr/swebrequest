# Events

![Stages for service workers events](images/stages.png)

Stages are a logical breakdown of SWs events into a set of fine-grained stages.  Stages receive [listeners](listeners.md), i.e. callback functions that are executed when the stage is reached. The Figure above shows the stages for the `install`, `activate`, `fetch` and `message` events. All supported events and their stages listed below.

- [fetch](events/fetch.md)
- [install](events/install.md)
- [activate](events/activate.md)
- [message](events/message.md)
- [push](events/push.md)
- [sync](events/sync.md)
- [periodicsync](events/periodicsync.md)
- [notificationclick](events/notificationclick.md)
- [notificationclose](events/notificationclose.md)
- [pushnotificationchange](events/pushnotificationchange.md)


## cache-read
The [onCacheMatch](stages/onCacheMatch.md) stage is the **main** stage where `swebRequest` performs cache-reads. This stage has a [default built-in listener](stages/onCacheMatch.md#listener) that performs cache-reads.
- for the cache storage, reads are performed with the [Cache.match](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match) and [caches.match](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/match) APIs. 
- for the indexedDB storage, reads are performed with the [IDBObjectStore.get](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/get) API. The request url is used as the key for reading responses, which are deserialized to generate new response objects.

The auxiliary [onBeforeCacheMatch](stages/onBeforeCacheMatch.md), [onCacheMatchSuccess](stages/onCachecMatchSuccess.md), [onCacheMatchError](stages/onCacheMatchError.md) stages are respectively executed before cache-reads are effectively performed (at `onCacheMatch`), on cache-hit and cache-miss (or cache-error). 

| Stage | Description | Standalone | Standalong | Built-in Features |
|--|--|--|--|--|
[onCacheMatch](stages/onCacheMatch.md) | read a response from the cache ([cache](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage) and [indexedDB](https://developer.mozilla.org/en-US/docs/Web/API/indexedDB)) storages. | The [default built-in listener](stages/onCacheMatch.md#listener) of this stage can be customized to reads responses from the indexedDB, and/or in specific cache/indexedDB name, etc. | :x: | :x: |
[onBeforeCacheMatch](stages/onBeforeCacheMatch.md) | manipulate request before cache read | | :white_check_mark: | :white_check_mark: |
[onCacheMatchSuccess](stages/onCacheMatchSuccess.md) | cache-hit: a response is found in the cache. manipulate before it is used to [fulfill a request](stages/onRequestCompleted.md) | | :white_check_mark: | :white_check_mark: | [decryption](features/decryption.md), [verification](features/verification.md), [timestamp_verify](features/timestamp_verify.md), [cspnonces](features/cspnonces.md)
[onCacheMatchError](stages/onCacheMatchError.md) | cache-miss or cache-error: no response is found in the cache. time to get a network response by branching to the [onBeforeFetchRequest](stages/onBeforeFetchRequest.md)| :white_check_mark: | :x: | :x: |


There are many other APIs exposed to service workers for reading from the cache storage and the indexedDB storage. When in [standalong mode](modes/standalong.md):
- :white_check_mark: for the cache storage, the [Cache.matchAll](https://developer.mozilla.org/en-US/docs/Web/API/Cache/matchAll) API calls are also supported.
- :x: the indexedDB storage is not supported because it can be used for purposes other than storing HTTP responses.
  
When in [standalone mode](modes/standalone.md), the cache-read stages are automatically invoked when fetch events are fired. Nonetheless, the logic of a service worker may involve cache-reads from other events. These events may directly invoke native cache-reads APIs such as [caches.match](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/match). Nonetheless, if features such as [encryption](features/encryption.md) are enabled, one may end up with encrypted HTTP responses. To avoid this kind of issues, we recommend the `swebRequest.caches.match` method instead.

|||
|--|--|
[swebRequest.caches.match]() | [onBeforeCacheMatch](stages/onBeforeCacheMatch.md) + [onCacheMatch](stages/onCacheMatch.md) + [onCacheMatchSuccess](stages/onCacheMatchSuccess.md)


## network-fetch
The [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) API exposed to service workers makes it possible to issue network-fetch requests in order to download responses from remote application servers. The [onFetchRequest](stages/onFetchRequest.md) stage is where `swebRequest` performs network-fetch. It has a default built-in listener that performs `fetch` calls, optionally with a timeout, and taking into consideration with [navigation preloads](features/navigationPreload.md). When `swebRequest` is [used with an existing service worker](modes/standalong.md), the listeners at the `onFetchRequest` stage are not executed. The reason being that the service worker is performing its own calls. 

In any case, features and listeners at the auxiliary stages of network-fetch are executed. This includes:
- [onBeforeFetchRequest](stages/onBeforeFetchRequest.md) which listeners are executed before network-fetch. 
- [onFetchRequestSuccess](stages/onFetchRequestSuccess.md) which listeners are executed on network-hit, i.e. a response was successfully downloaded from a remote server. In [standalone mode](modes/standalone.md), this stage [clones](https://developer.mozilla.org/en-US/docs/Web/API/Response/clone) the response/requests and concurrently invokes the [onBeforeCachePut](stages/onBeforeCachePut.md) and [onRequestCompleted](stages/onRequestCompleted.md) stages where the responses will be respectively stored in the cache and used to fullfill the request. 
- [onFetchRequestError](stages/onFetchRequestError.md) which listeners are executed on network-miss or network-error, i.e. an error occurred during network-fetch. This stage is not supported in [standalong](modes/standalong.md) mode. In [standalone](modes/standalone.md) mode, this stage and the [onResponseError](stages/onResponseError.md) stage it branches to next, all provide an opportunity to handle the error, generate a custom or fallback response to be used to fulfill the request.


| Stage | Description | Standalone | Standalong | Built-in Features |
|--|--|--|--|--|
[onFetchRequest](stages/onFetchRequest.md) | issue a network request to download a response from a remote application server | The [default built-in listener](stages/onFetchRequest.md#listener) of this stage augments the `fetch` calls with timeouts and also accounts for [navigation preloads](https://developer.mozilla.org/en-US/docs/Web/API/NavigationPreloadManager) | :x: | :x: | 
[onBeforeFetchRequest](stages/onBeforeFetchRequest.md) | manipulate a request before network-fetch | :white_check_mark: | :white_check_mark: | [setRequestHeaders](features/setRequestHeaders.md), [anonymize_xor](features/anonymize_xor.md), [anonymize](features/anonymize.md), [swcookie](features/swcookie.md) | 
[onFetchRequestSuccess](stages/onFetchRequestSuccess.md) | network-fetch was successfull. A response is available for manipulation | Conquerently, a copy of the response is [stored in the cache](#cache-write) and another copy [served to the client](stages/onRequestCompleted.md) | :white_check_mark: No concurrent branching is done | :x: |  
[onFetchRequestError](stages/onFetchRequestError.md) | network-fetch failed. No response is available for manipulation | Provide a custom/fallback response at [onResponseError](stages/onResponseError.md) | :white_check_mark: | :x: |  

The network-fetch stages are involved in all [fetch events strategies](strategies.md#fetch-event) execept [cacheOnly](strategies/cacheOnly.md), which does not involve network fetch. The [precaching](strategies/precaching.md) strategy also triggers network-fetch stages, as assets are downloaded are stored in the cache. 


## cache-write
The [onCachePut](stages/onCachePut.md) stage is where `swebRequest` performs cache-writes. This stage has a [default built-in listener](stages/onCachePut.md#listener) that performs cache-writes:
- [x] for the cache storage, writes are performed with the [Cache.put](https://developer.mozilla.org/en-US/docs/Web/API/Cache/put) API. 
- [-] for the indexedDB storage, writes are performed with the [IDBObjectStore.add](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/add) API. The request url is used as the key, and the serialized response as the value. 


| Stage | Description | Standalone | Standalong | Built-in Features |
|--|--|--|--|--|
[onCachePut](stages/onCachePut.md) | store/write a response in the cache ([cache](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage) and [indexedDB](https://developer.mozilla.org/en-US/docs/Web/API/indexedDB)) | The [default built-in listener](stages/onCachePut.md#listener) of this stage can be customized to store responses in the indexedDB, in specific cache name, etc. | :x: | :x: |
[onBeforeCachePut](stages/onBeforeCachePut.md) | manipulate a response before write | :white_check_mark: | :white_check_mark: | [encryption](features/encryption.md), [signature](features/signature.md), [timestamp](features/timestamp.md) |
[onCachePutCompleted](stages/onCachePutCompleted.md) | cache-write was successful: log the request, ping the application server, etc. | :white_check_mark: | :x: | :x: |

There are many other APIs exposed to service workers for writting in the cache storage and the indexedDB storage. When in [standalong mode](modes/standalong.md):
- for the cache storage, the [Cache.addAll](https://developer.mozilla.org/en-US/docs/Web/API/Cache/addAll) and [Cache.add](https://developer.mozilla.org/en-US/docs/Web/API/Cache/add) that also write the cache, are broken down into explicity [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) + [cache.put](https://developer.mozilla.org/en-US/docs/Web/API/Cache/put). 
- the indexedDB storage is not supported because it can be used for purposes other than storing HTTP responses. 



## out-of-fetch
| API | Description | Stages | Standalong | Built-in Features |
|--|--|--|--|--|
