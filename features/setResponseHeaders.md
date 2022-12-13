# setResponseHeaders

The `setResponseHeaders` feature adds headers to incoming (same-origin) responses. These could be responses from the remote application server, the browser cache or from the service worker cache storage. The headers can include security headers such as [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) that will be enforced by browsers to fight attacks such as [XSS](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting). The [originpolicies](originpolicies.md) is a special feature that dedicated to adding security policy headers to responses.


## runtime options
||| 
|--|--| 
`headers` |  an object literal of custom header names/values pairs to be added to **same-origin** responses. The custom headers are available to the listener under `details.filter.headers`

## Examples
Working examples of the `setResponseHeaders` feature. These are the ones deployed on the [demo website](https://swebrequest.doitsec.net/sqwrfeatures.htm). 
||||
|--|--|--|
[standalone](../examples/responseheaders.js) | [standalong](../examples/uresponseheaders.js) | [workbox](../examples/wresponseheaders.js)
|||

- activate directly [standalone or standalong]
```javascript
swebRequest.features.setResponseHeaders( { 
    headers: { 'content-security-policy': "default-src 'self'; object-src 'none'; base-uri 'self' " }
}) 

```

- standalone
```javascript
swebRequest.init({ 
    setResponseHeaders: { 
        headers: { 'content-security-policy': "default-src 'self'; object-src 'none'; base-uri 'self' " } 
    }
})
```

- standalong
```javascript
swebRequest.usefeatures({ 
   setResponseHeaders: { 
        headers: { 'content-security-policy': "default-src 'self'; object-src 'none'; base-uri 'self' " } 
    }
})
```

- workbox
```javascript
new workbox.strategies.CacheFirst({ plugins: [ 
    new swebRequest.commons.plugin("setResponseHeaders", { 
        headers: { 'content-security-policy': "default-src 'self'; object-src 'none'; base-uri 'self' " }
    })
]})
```

## Definition
```javascript
swebRequest.features.define('setResponseHeaders', async (details: Details): Promise<Details> => {
    if (details.responseHeaders) {
        for (let header in details.filter.headers)
            details.responseHeaders[header] = details.filter.headers[header]
        return { responseHeaders: details.responseHeaders }
    } else {
        let oheaders = new Headers(details.response.headers);
        for (let header in details.filter.headers)
            oheaders.append(header, details.filter.headers[header])
        return { responseHeaders: oheaders }
    }
}, ['onRequestCompleted'], { rtypes: ['default', 'basic', 'cors'], origins: ['same-origin'] })
```


### listener
Each header name/value pair is added to the origin response headers. We handle raw headers where the [Headers.append](https://developer.mozilla.org/en-US/docs/Web/API/Headers/append) method in used to add the new headers, without overriding existing values.  


### stages 
||| 
|--|--| 
`onRequestCompleted` | [the stage](../stages/onRequestCompleted.md) the stage right before response is used to fulfill a request


### filter options
||| 
|--|--| 
`origins` | `['same-origin']`: the headers are added only to same-origin responses, but this can be extended to CORS responses as well. 


### filter options
||| 
|--|--| 
`rtypes` | `['default', 'basic', 'cors']`: response headers can be applied to all (same-origin and cors) responses whose headers can be manipulated. H



### return object
||| 
|--|--|
`responseHeaders` | the new responses headers, augmented with the new one(s)

The headers will be combined to the original response body to build a new response object passed onto next listeners. 



## See also
- [originpolicies](originpolicies.md)
- [swcookie](swcookie.md)
- [setRequestHeaders](setRequestHeaders.md)
