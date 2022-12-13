# onMessage
The `onMessage` stage is the main stage of the [message event](../events/message.md). 
This stage has a [default listener](#listener) for handling specially crafted messages sent by [clients](../utils/swrclient.md). As shown in the [listener](#listener), this messages maps to out-of-fetch-events [cache-read](../stages/onCacheMatch.md#cache-reads-from-other-events), [network fetch](../stages/onFetchRequest.md#network-fetch-from-other-events) and [cache-write](../stages/onCachePut.md#cache-writes-from-other-events). The result of those calls (response objects) are serialized and returned to the client via postmessage at the [onMessageCompleted](onMessageCompleted.md) stage. 

Note that the [default listener](#listener) only handle specially crafted messages sent by the clients. One can also add custom listeners to handle custom messages sent by clients. 

## Next stage
- [onMessageCompleted](onMessageCompleted.md) 

## Strategies
- [postMessage](../strategies/postMessage.md)

## listener
```javascript
async (details) => {
    if (!(details.event.data && details.event.data.from == 'swebRequest')) return details;
    let request = details.event.data.request || details.event.data.url 
    let response = details.event.data.response || new Response(details.event.data.data || details.event.data.body)
    switch(details.event.data.type) {
        case 'fetch':
            details.response = await swebRequest.fetch(request, details.event.data.direct)
            break;
        case 'cacheread':
            details.response = await swebRequest.caches.match(request, details.event.data.cachename)
            break;
        case 'fetchncachewrite':
            details.response = await swebRequest.fetch(request.clone())
            await swebRequest.caches.put(request, details.response, details.event.data.cachename)
            break;
        case 'idbread':
            details.response = await swebRequest.caches.match(request, details.event.data.dbname, 'indexedDB')
            break
        case 'fetchnidbwrite':
            details.response = await swebRequest.fetch(request.clone())
            await swebRquest.caches.put(request, details.event.data.response, details.event.data.dbname, 'indexedDB')
            break				
        default:
            break
    }
    return details;
}
```
The [message event](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/message_event) support in `swebRequest` has been added first of all for compatibility reasons. To illustrate the potential issue, let's consider a web page what is trying to read a cached response. If it does so directly from the page context, it may end with a response encrypted by `swebRequest`. To avoid this issue, the page could rather send a message to the service worker that will read the response, decrypt and potentially send it back to the client. The service worker still retains full control on whether those interactions are allowed or not. As shown in the [listener](#listener), this messages maps to out-of-fetch-events [cache-read](../stages/onCacheMatch.md#cache-reads-from-other-events), [network fetch](../stages/onFetchRequest.md#network-fetch-from-other-events) and [cache-write](../stages/onCachePut.md#cache-writes-from-other-events)
