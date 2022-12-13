# onCacheMatch

Stage where HTTP responses are read from the cache. This stage has a [default built-in listener](#listener) that performs cache-reads, both in the [cache storage](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage) and the [indexedDB storage](https://developer.mozilla.org/en-US/docs/Web/API/indexedDB). For the indexedDB storage, the request url is the key used to read the serialized responses, which are deserialized in order to generate new response objects. See [onCachePut](onCachePut.md#serialize-http-response-for-the-indexeddb) on how HTTP responses are serialized before writes. [Cloudflare workers](https://developers.cloudflare.com/workers/runtime-apis/cache/) are supported out of the box, with the exception that they do not provide an `indexedDB` storage. For performance reasons, cache reads are done from the unique global cache object exposed to Cloudflare workers. 


If the `onCacheMatch` stage has multiple listeners, the first listener to find a cached response will discard subsequent listeners and jump to the [onCacheMatchSuccess](onCacheMatchSuccess.md). 


## Next stages
- [onCacheMatchSuccess](onCacheMatchSuccess.md): in cache-hit, i.e. reading a cached response was successful
- [onCacheMatchError](onCacheMatchError.md): in cache-miss, i.e. no response was found in the cache, or the response is not usable (as the result of a feature like [decryption](../features/decryption.md), [verification](../features/verification.md), [timestamp_verify](../features/timestamp_verify.md).



## Runtime options
||| 
|--|--| 
`caches` | optional array of cache names to read HTTP responses from. By default, responses are looked up in all cache storage (or indexedDB storage)
`storage` | a string that is either `indexedDB` or `cache` (default). If `storage` is `indexedDB`, it is better to specify a cache name for the `caches` object. That is because the `indexedDB.databases()` method is not supported in browsers such as Firefox. This is a convenient method that returns the names of indexedDB storages, and supported by Chromium and Webkit browsers. In general, since the `indexedDB` storage can also accomodate other types of data, and to avoid searches in all storages, 
`usememory` | stores responses in a memory (i.e. object) and reuse them, instead of attempting a cache search again. These responses will live in memory as long as the service worker is alive. The memory object is reinitialized each time the service worker is destroyed and recreated. 


## Examples
By default, only `GET` responses are stored and read from the cache. If more advanced caching options have to be explicitly done, their cache-read counter parts must be expressed as well. For example, here is how to read `POST` and `PUT` requests from the indexedDB storage `idbv1`, and other types of requests from the cache storage (as done by default)

- with [addListener](../stages.md#addlistener)
```javascript
swebRequest.onCacheMatch.addListener(null, {
    methods: ['POST', 'PUT'], storage: 'indexedDB', caches: ['idbv1']
})
```
- with [swebRequest.init](../modes/standalone.md)
```javascript
swebRequest.init(null, null, {
    onCacheMatch: { methods: ['POST', 'PUT'], storage: 'indexedDB', caches: ['idbv1'] }
})
```

## Strategies that include this stage
- [caching](../strategies/caching.md)
- [cacheFirst](../strategies/cacheFirst.md)
- [cacheOnly](../strategies/cacheOnly.md)
- [cacheAndRevalidate](../strategies/cacheAndRevalidate.md)
- [cacheOrNetwork](../strategies/cacheOrNetwork.md)


## Standalone and standalong modes
In [standalone mode](../modes/standalone.md), the `Cache.matchAll` method is not used. The reason is that `swebRequest` does not handle multiple responses at the same time. 
In [standalong mode](../modes/standalong.md), the `onCacheMatch` stage is not considered. The reason is that we assume the exisiting service worker is already performing cache reads operations itself. 

## Cache-reads from other events
The `onCacheMatch` stage, where cache-reads are performed, is invoked to read HTTP responses in order to fulfill HTTP requests, when `fetch` events are fired. 
However, nothing prevents a service worker from making cache-reads out-of-fetch-events (oofees). For instance, the logic of a service worker may involve cache-reads when a message is received (push or post message), or synching pending requests with an application server. 
This is achieved with the `swebRequest.caches.match` method described below. Under the hoods, this method will successively execute the listeners and features registred at the [onBeforeCacheMatch](onBeforeCacheMatch.md), [onCacheMatch](onCacheMatch.md), [onCacheMatchSuccess](onCacheMatchSuccess.md) and [onCacheMatchError](onCacheMatchError.md) stages.
```javascript
swebRequest.caches.match(input: Request | Details, caches: string, storage: 'cache' | 'indexedDB') : Promise<Response>
```
### Parameters
If `input` a [details](../details.md) object, the other arguments will be ignored.
Otherwise if `input` is a request object or request url, a `details` object will built with the the request, as well as the other `caches` and `storage` arguments as [runtime options](#runtime-options)

### Return value
This method returns a promise that resolves to a response object or `undefined`, just like the native [caches.match API](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/match)



## listener
```javascript
async (details: Details) : Promise<Details>  {
    let cfresponse: Response | undefined = undefined;
    if (details.request) {
        if (details.filter && details.filter.usememory && (details.request.url in inMemory))
            cfresponse = inMemory[details.request.url]
        else {
            if (caches.default) { // very specific to Cloudflare
                cfresponse = await caches.default.match(details.request)
            } else {
                if (details.filter && details.filter.storage == 'indexedDB') {
                    let ccachesnames = (details.filter && details.filter.caches) || ((await indexedDB.databases()).map(e => e.name))
                    for(let ccachesname of ccachesnames) {
                        cfresponse = await IndexedDBUtils.IndexedDBRead(ccachesname as string, null, details.request.url)
                        if (cfresponse) {
                            cfresponse = await IndexedDBUtils.deserializeResponseForIndexedDB(cfresponse)
                            break;
                        }
                    }
                } else {
                    let ccachesnames = (details.filter && details.filter.caches) || []
                    if (ccachesnames.length == 0 || ccachesnames.indexOf('<all_caches>') >= 0){
                        cfresponse = await caches.match(details.request) // no need to clone because POST requests are never stored in the cache
                    } else {
                        // search in all specific caches until a response is found
                        for(let ccachesname of ccachesnames) {
                            let ccache = await caches.open(ccachesname)
                            cfresponse = await ccache.match(details.request)
                            if (cfresponse)
                                break;
                        }
                    }
                }
            }
        }
    }
    if (cfresponse) {
        try { details.event.responsefrom = 'cache'; } catch(e) {}
        return { response: cfresponse, next: 'onCacheMatchSuccess' }
    } else return {}
}
```
Cloudflare workers have a single global cache, where all requests/responses are read. Moreover indexedDB is not supported in this context.  In browsers, we do not have such as limitation. HTTP responses can be read from the cache or from the indexedDB.
If the application has many caches, and no specific cache name is specified (with the `caches` option), then the first response found in one of the caches is returned. 

## Firefox Issue
Note that for the indexedDB, Firefox does not support the [indexedDB.databases](https://developer.mozilla.org/en-US/docs/Web/API/IDBFactory/databases) method that returns the list of all indexedDB storage names. Therefore, it is recommended to always specify a cache name, when dealing with the `indexedDB` storage. 



## State information
When the response is successfully read from the cache, the `details.event.responsefrom` property is set to `cache`. This state information is globally readable from subsequent listeners. 

## Deserialize responses for indexedDB 
```javascript
async function deserializeResponseForIndexedDB(response: Response) {
    return new Response(response.body, {
        headers: response.headers,
        status: response.status, 
        statusText: response.statusText
    });
}
```
The indexedDB storage cannot accomodate raw HTTP responses. They are [serialized](onCachePut.md#serialize-http-response-for-the-indexeddb) before writes. The above function will deserialize and reconstruct a response object after indexedDB reads. 



## cache-reads methods
|||||
|--|--|--|--| 
[caches.match](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/match) | search for a response in all caches and return the first one that matches the request | [onBeforeCacheMatch](onBeforeCacheMatch.md), [onCacheMatchSuccess](onCacheMatchSuccess.md) | [onCacheMatch](onCacheMatch.md)
[Cache.match](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match) | [open a specific cache](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/open) by its name and read and return the first response that matches the request | | [onBeforeCacheMatch](onBeforeCacheMatch.md), [onCacheMatchSuccess](onCacheMatchSuccess.md) | [onCacheMatch](onCacheMatch.md)
[Cache.matchAll](https://developer.mozilla.org/en-US/docs/Web/API/Cache/matchAll) | [open a specific cache](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/open) by its name and read and return all responses that match the request | [onBeforeCacheMatch](onBeforeCacheMatch.md), [onCacheMatchSuccess](onCacheMatchSuccess.md) | [onCacheMatch](onCacheMatch.md)
[IDBObjectStore.get](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/get) | [open a specific indexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IDBFactory/open), and reads the response associated to the request URL. | [onBeforeCacheMatch](onBeforeCacheMatch.md), [onCacheMatchSuccess](onCacheMatchSuccess.md) | [onCacheMatch](onCacheMatch.md)


## 
||| 
|--|--| 
`caches.add` | [onBeforeCachePut](onBeforeCachePut.md)