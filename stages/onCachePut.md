# onCachePut
Stage where HTTP requests/responses pairs are stored in the cache. This stage has a [default built-in listener](#listener) that performs cache-writes, both in the [cache storage](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage) and the [indexedDB storage](https://developer.mozilla.org/en-US/docs/Web/API/indexedDB), provided that [storage quota](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria) is not exceeded. [Cloudflare workers](https://developers.cloudflare.com/workers/runtime-apis/cache/) are supported out of the box, with the exception that they do not provide an `indexedDB` storage. For performance reasons, cache writes are done on the unique global cache object exposed to Cloudflare workers.

The cache storage is dedicated to HTTP requests/HTTP responses pairs, while the indexedDB is a more general purpose storage that can accomodate all sort of structured data. Regarding HTTP requests/responses to be stored in the cache, these 2 storage mechanisms can be complementary. The cache storage can only HTTP requests of method `GET`. For instance, `POST` and other types of requests (`PUT`, etc. ) requests cannot be stored here. The `indexedDB` can be used instead. However, this storage cannot store raw HTTP responses. They must be [serialized](#serialize-http-response-for-the-indexeddb). HTTP requests URLs are used as the key to associate the serialized responses in the indexedDB storage. 

## Runtime options
||| 
|--|--| 
`caches` | optional array of cache names to read HTTP responses from. By default, responses are looked up in all cache storage (or indexedDB storage)
`storage` | a string that is either `indexedDB` or `cache` (default). If `storage` is `indexedDB`, it is better to specify a cache name for the `caches` object. That is because the `indexedDB.databases()` method is not supported in browsers such as Firefox. This is a convenient method that returns the names of indexedDB storages, and supported by Chromium and Webkit browsers.

## Next stage
- [onCachePutCompleted](onCachePutCompleted.md)

## Examples
By default, only `GET` responses are stored, in the cache. More advanced caching options have to be explicitly expressed. For example, here is how to store `POST` and `PUT` requests in the indexedDB storage `idbv1`, and other types of requests in the cache storage (as done by default)

- with [addListener](../stages.md#addlistener)
```javascript
swebRequest.onCachePut.addListener(null, {
    methods: ['POST', 'PUT'], storage: 'indexedDB', caches: ['idbv1']
})
```
- with [swebRequest.init](../modes/standalone.md)

```javascript
swebRequest.init(null, null, {
    onCachePut: { methods: ['POST', 'PUT'], storage: 'indexedDB', caches: ['idbv1'] }
})
```


## Strategies that include this stage
- [caching](../strategies/caching.md)
- [cacheFirst](../strategies/cacheFirst.md)
- [cacheOnly](../strategies/cacheOnly.md)
- [cacheAndRevalidate](../strategies/cacheAndRevalidate.md)
- [cacheOrNetwork](../strategies/cacheOrNetwork.md)

## Cache-writes from other events
The `onCachePut` stage, where cache-writes are performed, is invoked to store HTTP responses in in the cache, when `fetch` events are fired. 
However, nothing prevents a service worker from making cache-writes out-of-fetch-events (oofees). For instance, the logic of a service worker may involve cache-writes when a message is received (push or post message), or storing pending requests for future background synching. This is achieved with the `swebRequest.caches.put` method described below. Under the hoods, this method will successively execute the listeners and features registred at the [onBeforeCachePut](onBeforeCachePut.md), [onCachePut](onCachePut.md), and [onCachePutCompleted](onCachePutCompleted.md) stages.

### Syntax
```javascript
swebRequest.caches.put(input: Request | Details, response: Response, cname: string, storage: 'cache' | 'indexedDB')
```
### Parameters
If `input` a [details](../details.md) object, the other arguments will be ignored.
Otherwise if `input` is a request object or request url, a `details` object will built with the request and the response to be stored in the cache. The other `caches` and `storage` arguments will be considered as the [runtime options](#runtime-options) defining where to store the response. 

### Return value
`undefined`, just like the native [cache.put API](https://developer.mozilla.org/en-US/docs/Web/API/Cache/put)


## listener
```javascript
async (details: Details) : Promise<Details>  {
    let cacheWriteDone = false;
    if (details.request && details.response)  {
        // @ts-ignore: TS complains because caches.default is not part of the Cache API in browsers 
        if (caches.default) { // this is specific to Cloudflare workers
            try { 
                // @ts-ignore: TS complains because caches.default is not part of the Cache API in browsers 
                //await caches.default.put(details.request.clone(), details.response.clone())
                await caches.default.put(details.request.clone(), new Response(details.response.body, details.response)) //
                cacheWriteDone = true; 
            } catch(e) {
                console.error("Error writting content in cache with Cloudflare Workers", e);
            }
        } else {
            let pcachesnames = (details.filter && details.filter.caches) || [],
                pallCaches = pcachesnames.indexOf('<all_caches>') >= 0,
                pIndexedDB = details.filter && details.filter.storage == 'indexedDB'
            if (pcachesnames.length == 0 || pallCaches) {
                if (pIndexedDB)
                    // @ts-ignore : problem here is that vscode is not updated
                    pcachesnames = (await indexedDB.databases()).map(e => e.name) as string[]
                else
                    pcachesnames = await caches.keys()
            }
            if (pcachesnames.length == 0)
                    pcachesnames = ['cache_' + Math.random()]
            else if (!pallCaches)
                pcachesnames = pcachesnames.slice(0, 1); // first cache found
            for(let pcachesname of pcachesnames) {
                if (pIndexedDB) {
                    try {
                        await IndexedDBUtils.IndexedDBWrite(pcachesname, null, await IndexedDBUtils.serializeResponseForIndexedDB(details.response.clone(), details.request.url))
                        cacheWriteDone = true;
                    } catch(e) {}
                } else {
                    let ccache = await caches.open(pcachesname)
                    try { 
                        await ccache.put(details.request.clone(), details.response.clone())
                        cacheWriteDone = true; 
                    } catch(e) {}
                }
            }
        }
        try {
            swebRequest.LoggingApis('cache.put',  JSON.stringify([details.request.url, details.request.destination, details.request.mode, details.response.type]) )
        } catch(e) {}
        
    }
    if (cacheWriteDone)
        return { next: 'onCachePutCompleted' } // dummy stage
    else
        return {} // let other listeners attempt to store the response...
}
```
Cloudflare workers have a single global cache, where all requests/responses are stored. Moreover indexedDB is not supported in this context.  In browsers, we do not have such as limitation. HTTP responses can be stored in the cache or serialized and stored in the indexedDB. If not cache name is specified, then responses are stored in the first cache name found.  
The `next` stage entered after successful cache writes is [onCachePutCompleted](onCachePutCompleted.md), unless [storage quota](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria) is exceeded.

## Firefox Issue
Note that for the indexedDB, Firefox does not support the [indexedDB.databases](https://developer.mozilla.org/en-US/docs/Web/API/IDBFactory/databases) method that returns the list of all indexedDB storage names. Therefore, it is recommended to always specify a cache name, when dealing with the `indexedDB` storage. 


## cache-writes methods
||| 
|--|--| 
[Cache.put](https://developer.mozilla.org/en-US/docs/Web/API/Cache/put) | [open a specific cache](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/open) by its name and writes a response, with a request as its key
[Cache.add](https://developer.mozilla.org/en-US/docs/Web/API/Cache/add) | [open a specific cache](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/open) by its name, download a response to the request, and write it in the cache, with the request as its key
[Cache.addAll](https://developer.mozilla.org/en-US/docs/Web/API/Cache/addAll) | [open a specific cache](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/open) by its name, and for each request, download a response, and write it in the cache, with the request as its key
[IDBObjectStore.add](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/add) | [open a specific indexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IDBFactory/open), and writes the response, with the request URL as its key.




## serialize HTTP response for the indexedDB
```javascript
async function serializeResponseForIndexedDB(response: Response, url:string) {
    let result = {
        body: await response.arrayBuffer(),
        status: response.status,
        statusText: response.statusText,
        url: url,
        headers: {}
    }, 
        headers: { [key: string]: any } = {};
    // @ts-ignore
    for(let entries of response.headers.entries()){
        // @ts-ignore
        headers[entries[0]] = entries[1];
    }
    result.headers = headers;
    return result;
}
```
The response body is serialized into an arrayBuffer, and the the response headers into an object literal, associated the header names to their values. The response status and status text are also extracted, and the request header is added to the serialized object. 




## See also
- [fetch event](../events/fetch.md)
