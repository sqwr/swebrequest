# proxyrewriterequests
The `proxyrewriterequests` feature acts like a programmable CDN for content hosted on some back end server. This feature is better combined with the [proxyrewriteresponses](proxyrewriteresponses.md) feature. It is better used within a Cloudflare worker, which plays the role of the proxy for requests coming from a web app in the browser, and destined to fetching content from a back end server. As content will be fetched and stored in the cache on the Cloudflare worker, all the possibilities of `swebRequest`, such as [timestamp feature](timestamp.md), [cache and revalidate strategy](../strategies/cacheAndRevalidate.md) can be enabled to fine-grainly control the content at the CDN. See more details on its deployment as a [Cloudflare worker](../contexts/cloudflare.md). 


## runtime options
||| 
|--|--| 
| `backHost` | a string specifying the URL of the backend hosting content to be proxied. Intercepted requests will be forwarded to that backend server
| `hostedContent` | on object associated resources to their types
| `proxyfetchmetadata` | a boolean indicating wether fetch metadata should be recovered.  The `proxyfetchmetadata` boolean can be set if the request that hits the Cloudflare Worker has been manipulated by a `swebRequest`, via one of the features ([swcookie](swcookie.md), [setRequestHeaders](setRequestHeaders.md), [anonymize](anonymize.md), [anonymize_xor](anonymize_xor.md)) that destroys fetch meta data. See more details about this discussion at [fetchmetadata](../utils/fetchmetadata.md)



## Examples
Working examples of the `proxyrewriterequests` feature. This is the one deployed on  are the ones deployed on the [a Cloudflare worker](../contexts/cloudflare.md). 
||||
|--|--|--|
[standalone](../examples/proxyrewriterequests.js) | [standalong](../examples/uproxyrewriterequests.js) | [workbox](../examples/wproxyrewriterequests.js) 
|||

Following are more example usages

- activate directly [standalone or standalong]
```javascript
swebRequest.features.proxyrewriterequests({
    backHost: 'https://example.com/static/scripts/',
    hostedContent: { 'swebRequest.js': 'application/javascript' }
}) 
```

- standalone
```javascript
swebRequest.init({ proxyrewriterequests: {
    backHost: 'https://example.com/static/scripts/',
    hostedContent: { 'swebRequest.js': 'application/javascript' }
} })
```

- standalong
```javascript
swebRequest.usefeatures({ proxyrewriterequests: {
    backHost: 'https://example.com/static/scripts/',
    hostedContent: { 'swebRequest.js': 'application/javascript' }
}})
```

- workbox
```javascript
workbox.routing.registerRoute( () => true,
  new workbox.strategies.CacheFirst({ plugins: [ 
    new swebRequest.commons.plugin("proxyrewriterequests", {
        backHost: 'https://example.com/static/scripts/',
        hostedContent: { 'swebRequest.js': 'application/javascript' }
    })
    ]
}))
```
## Definition

```javascript
swebRequest.features.define('proxyrewriterequests', (details: Details) => {
    let resourcePath = (new URL(details.request.url)).pathname.slice(1)
    if (!(resourcePath in details.filter.hostedContent)) {
        return { 
            response: new Response(resourcePath, {
                status: 403
            }),
            next: 'onRequestCompleted'
        }
    } else { // let the magic of swebRequest happens: the cache will be used, otherwise, the network
        let nrequest = new Request(details.filter.backHost + resourcePath, details.request);
        if (details.filter && details.filter.proxyfetchmetadata) {
            let rheaders = nrequest.headers;
            if(rheaders.has('x-sec-fetch-dest'))
                rheaders.set('sec-fetch-dest', rheaders.get('x-sec-fetch-dest') as string)
            if(rheaders.has('x-sec-fetch-mode'))
                rheaders.set('sec-fetch-mode', rheaders.get('x-sec-fetch-mode') as string)
            nrequest = new Request(nrequest, { headers: rheaders })
        }
        return { request: nrequest };
    }
}, ['onRequestReceived'])
```

### listener
The relative path of the request sent by the client (browser, service worker) is appended to the backend server URL. Additionnally, this feature can be instructed to restore [fetch meta data headers](../utils/fetchmetadata.md) that may have been impacted if the request was modified by one of the [setRequestHeaders](setRequestHeaders.md), [anonymize](anonymize.md), [anonymize_xor](anonymize_xor.md) or [swcookie](swcookie.md) features. 

### stages 
||| 
|--|--| 
`onRequestReceived` | the [entry stage](../stages/onReques) of the [fetch](../events/fetch.md)


### return object
||| 
|--|--|
`request` | the new request object to be used.

The new request object will be passed onto subsequent listeners and stages.  

### See also
- [proxyrewriteresponses](proxyrewriteresponses.md)
- [Cloudflare workers](../contexts/cloudflare.md)
