# proxyrewriteresponses
The `proxyrewriteresponses` feature acts like a programmable CDN for content hosted on some back end server. This feature is better combined with the [proxyrewriterequests](proxyrewriterequests.md) feature. It is better used within a Cloudflare worker, which plays the role of the proxy for requests coming from a web app in the browser, and destined to fetching content from a back end server. As content will be fetched and stored in the cache on the Cloudflare worker, all the possibilities of `swebRequest`, such as [timestamp feature](timestamp.md), [cache and revalidate strategy](../strategies/cacheAndRevalidate.md) can be enabled to fine-grainly control the content at the CDN. See more details on its deployment as a [Cloudflare worker](../contexts/cloudflare.md). 


## runtime options
||| 
|--|--| 
| `backHost` | a string specifying the URL of the backend hosting content to be proxied. Intercepted requests will be forwarded to that backend server
| `hostedContent` | on object associated resources to their types. Note that these are relative paths
| `proxyfetchmetadata` | a boolean indicating wether fetch metadata should be recovered.  The `proxyfetchmetadata` boolean can be set if the request that hits the Cloudflare Worker has been manipulated by a `swebRequest`, via one of the features ([swcookie](swcookie.md), [setRequestHeaders](setRequestHeaders.md), [anonymize](anonymize.md), [anonymize_xor](anonymize_xor.md)) that destroys fetch meta data. See more details about this discussion at [fetchmetadata](../utils/fetchmetadata.md)



## Examples
Working examples of the `proxyrewriteresponses` feature. This is the one deployed on  are the ones deployed on the [a Cloudflare worker](../contexts/cloudflare.md). 
||||
|--|--|--|
[standalone](../examples/proxyrewriterequests.js) | [standalong](../examples/uproxyrewriterequests.js) | [workbox](../examples/wproxyrewriterequests.js) 
|||

Following are more example usages

- activate directly [standalone or standalong]
```javascript
swebRequest.features.proxyrewriteresponses({
    backHost: 'https://example.com/static/scripts/',
    hostedContent: { 'swebRequest.js': 'application/javascript' }
}) 
```

- standalone
```javascript
swebRequest.init({ proxyrewriteresponses: {
    backHost: 'https://example.com/static/scripts/',
    hostedContent: { 'swebRequest.js': 'application/javascript' }
} })
```

- standalong
```javascript
swebRequest.usefeatures({ proxyrewriteresponses: {
    backHost: 'https://example.com/static/scripts/',
    hostedContent: { 'swebRequest.js': 'application/javascript' }
}})
```

- workbox
```javascript
new workbox.strategies.CacheFirst({ plugins: [ 
    new swebRequest.commons.plugin("proxyrewriteresponses", {
        backHost: 'https://example.com/static/scripts/',
        hostedContent: { 'swebRequest.js': 'application/javascript' }
    })
]})
```
## Definition

```javascript
swebRequest.features.define('proxyrewriteresponses', async (details: Details) => {
    let resourcePath = (new URL(details.event.request.url)).pathname.slice(1)
    if (resourcePath in details.filter.hostedContent) {
        details.responseHeaders['content-type'] = details.filter.hostedContent[resourcePath]
        return { responseHeaders: details.responseHeaders }
    }
    return {}
}, ['onFetchRequestSuccess'], {}, ['responseHeaders'])
```

### listener
When a response is returned by the proxied back end server, the CDN just adds the content type to the response. For security reasons, this feature require the hosted content, as well as their associated content type to be declared. This avoids attacks such as [web cache deception](https://www.usenix.org/conference/usenixsecurity22/presentation/mirheidari)

### stages 
||| 
|--|--| 
`onFetchRequestSuccess` | the stage representing a successful fetch. 


### return object
||| 
|--|--|
`responseHeaders` | the `content-type` header is added to the original headers

### See also
- [proxyrewriterequests](proxyrewriterequests.md)
- [Cloudflare workers](../contexts/cloudflare.md)
