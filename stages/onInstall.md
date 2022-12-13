# onInstall

Stage where assets are precached. This stage has a [default built-in listener](#listener) that performs assets precaching, both in the [cache storage](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage) and the [indexedDB storage](https://developer.mozilla.org/en-US/docs/Web/API/indexedDB). For the indexedDB storage, the request url is the key used to read the serialized responses, which are deserialized in order to generate new response objects. See [onCachePut](onCachePut.md#serialize-http-response-for-the-indexeddb) on how HTTP responses are serialized before writes. [Cloudflare workers](https://developers.cloudflare.com/workers/runtime-apis/cache/) are supported out of the box, with the exception that they do not provide an `indexedDB` storage. For performance reasons, cache reads are done from the unique global cache object exposed to Cloudflare workers.  
Note that to perform precaching, this stage simply branches to the [onBeforeFetchRequest](onBeforeFetchRequest.md) with each individual asset. As routing is automatically performed, the asset will be network-fetched and stored in the cache. 


## Next stage
- [onInstallCompleted](onInstallCompleted.md)

## Runtime options
||| 
|--|--| 
`assets` | optional array of requests URLs or objects to fetch and cache, in the cache or indexedDB storage. 
`storage` | a string that is either `indexedDB` or `cache` (default). If `storage` is `indexedDB`, it is better to specify a cache name for the `caches` object. That is because the `indexedDB.databases()` method is not supported in browsers such as Firefox. This is a convenient method that returns the names of indexedDB storages, and supported by Chromium and Webkit browsers. In general, since the `indexedDB` storage can also accomodate other types of data, and to avoid searches in all storages, 


## Examples
- with [addListener](../stages.md#addlistener)
```javascript
swebRequest.onInstall.addListener(null, {
    assets: [ '/', 'script.js', 'style.css', 'logo.png' ]
})
```
- with [swebRequest.init](../modes/standalone.md)
```javascript
swebRequest.init(null, null, {
    onInstall: { assets: [ '/', 'script.js', 'style.css', 'logo.png' ] }
})
```



## listener 
```javascript
async (details: Details) : Promise<Details> => {
    let promises = []
    if (details.filter && details.filter.assets && details.filter.assets.length > 0) {
        for(let url of details.filter.assets) {
            let pdetails: Details = { // Verify important to copy things here
                filter: details.filter, 
                request: url instanceof Request ? url: new Request(url),
                response: undefined,
                phase: 'install'
            }
            promises.push(Stage.stages.onBeforeFetchRequest.execute(pdetails))
        }
    }
    try {
        await Promise.all(promises); 
        return Promise.resolve({})
    } catch(e) { 
        return Promise.reject({}); 
    }
}
```
Each individual asset is added to the cache by branching to the `onBeforeFetchRequest` [network-fetch entry stage](onBeforeFetchRequest.md). At this point, the magic and automatic routing of stages will take place: the asset will be downloaded at the [onFetchRequest](onFetchRequest.md) stage, and a copy will be passed to the `onBeforeCachePut` [cache-write entrey stage](onBeforeCachePut.md) and subsequently to the `onCachePut` where the asset will be stored in the cache. At all the stages, features that are enabled will be automatically applied to the asset (i.e. `encryption`). 