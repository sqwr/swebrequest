# onActivate

Stage where assets are deleted from caches or whole caches deleted. This stage has a [default built-in listener](#listener) that performs cache deletions, both in the [cache storage](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage) and the [indexedDB storage](https://developer.mozilla.org/en-US/docs/Web/API/indexedDB). For the indexedDB storage, the request url is the key used to read the serialized responses, which are deserialized in order to generate new response objects. [Cloudflare workers](https://developers.cloudflare.com/workers/runtime-apis/cache/) are supported out of the box, with the exception that they do not provide an `indexedDB` storage. For performance reasons, cache reads are done from the unique global cache object exposed to Cloudflare workers. 


## Runtime options
||| 
|--|--| 
`assets` | optional array of requests URLs or objects to be removed from the cache or indexedDB storage. | See [onInstall](onInstall.md#runtime-options)
`caches` | caches to remove assets from or to be deleted entirely. See [onCacheMatch](onCacheMatch.md#runtime-options)
`storage` | type or storage `cache` or `indexedDB` to cleanup. See  [onCacheMatch](onCacheMatch.md#runtime-options)


## Next stage
- [onActivateCompleted](onActivateCompleted.md)

## Preceeding stage
- [onActivate](onActivate.md)

## Features
- [secureswsregistration](../features/secureswsregistration.md)



## Examples
- with [addListener](../stages.md#addlistener)
```javascript
swebRequest.onActivate.addListener(null, {
    caches: ['v1', 'v2']
})
```
- with [swebRequest.init](../modes/standalone.md)
```javascript
swebRequest.init(null, null, {
    onActivate: { caches: ['v1', 'v2'] }
})
```

## listener
```javascript
async (details) => {
    if (details && details.request) {
        let aurls = (details.filter &&  details.filter.assets) ||  [],
            aIndexedDB = details.filter && details.filter.storage == 'indexedDB',
            acachenames = details.filter && details.filter.caches || [];
        if (caches.default) {
            for (let rurl of aurls)
                await caches.default.delete(rurl);
        } else {
            if (aIndexedDB)
                acachenames = (await indexedDB.databases()).map(e => e.name)  as string[]
            if (acachenames.indexOf('<all_caches>') >= 0)
                acachenames = await caches.keys()
            for(let u=0; u<aurls.length; u++) 
                aurls[u] = (new URL(aurls[u] instanceof Request ? aurls[u].url : aurls[u], self.origin)).href;
            for(let cachename of acachenames) {
                if (aurls.length == 0){
                    if (aIndexedDB) 
                        await IndexedDBUtils.deleteIndexedDB(cachename)
                    else 
                        await caches.delete(cachename)
                } else {
                    if (aIndexedDB) {
                        for (let url of aurls)
                            await IndexedDBUtils.IndexedDBDelete(cachename, null, url)
                    } else {
                        let acache = await caches.open(cachename)
                        for(let request of await acache.keys())
                            if (aurls.indexOf(request.url) >= 0)
                                await acache.delete(request)
                    }
                }
            }
        }
    }
    return {};
}
```
Cloudflare workers have a single global cache, so only specific assets can be deleted from that cache, and not the cache itself. And indexedDB is not supported in this context.  In browsers, we do not have such as limitation. Whole cache names, or specific assets can be removed. 