# setRequestHeaders

The `setRequestHeaders` feature adds headers to outgoing (same-origin) requests.
See [swmanifest](../utils/swmanifest.md) for discussions on how service workers and custom headers they add to outgoing same-origin requests could serve as a mechanism for attesting the origin of requests received server-side, and complement defenses against attacks such as CRSF.

## runtime options
||| 
|--|--| 
`headers` |  an object literal of custom header names/values pairs to be sent with outgoing **same-origin** requests. The custom headers are available to the listener under `details.filter.headers`
`proxyfetchmetadata` | a boolean. when set to `true`,  the `x-sec-fetch-dest` and `x-sec-fetch-mode` headers are added with a copy of the request [type](https://developer.mozilla.org/en-US/docs/Web/API/Request/destination) and [mode](https://developer.mozilla.org/en-US/docs/Web/API/Request/mode) as their values respectively.


## Examples
Working examples of the `setRequestHeaders` feature. These are the ones deployed on the [demo website](https://swebrequest.doitsec.net/sqwrfeatures.htm). 
||||
|--|--|--|
[standalone](../examples/requestheaders.js) | [standalong](../examples/urequestheaders.js) | [workbox](../examples/wrequestheaders.js)
|||

Following are more example usages
- activate directly [standalone or standalong]
```javascript
swebRequest.features.setRequestHeaders( { 
    headers: { 'x-request-with': 'swebRequest' }
}) 

```

- standalone
```javascript
swebRequest.init({ 
    setRequestHeaders: { headers: { 'x-request-with': 'swebRequest' } }
})
```

- standalong
```javascript
swebRequest.usefeatures({ 
   setRequestHeaders: { headers: { 'x-request-with': 'swebRequest' } }
})
```

- workbox
```javascript
new workbox.strategies.CacheFirst({ plugins: [ 
    new swebRequest.commons.plugin("setRequestHeaders", { 
            headers: { 'x-request-with': 'swebRequest' }
    })
]})
```

## Definition
```javascript
swebRequest.features.define('setRequestHeaders', async (details: Details): Promise<Details> => {
    if (details.requestHeaders) {
        for (let header in details.filter.headers)
            details.requestHeaders[header] = details.filter.headers[header]
        if (details.filter && details.filter.proxyfetchmetadata) {
            details.requestHeaders['x-sec-fetch-dest'] = details.request?.destination
            details.requestHeaders['x-sec-fetch-mode'] = details.request?.mode
        }
        return { requestHeaders: details.requestHeaders }
    } else {
        let oheaders = new Headers(details.request.headers);
        for (let header in details.filter.headers)
            oheaders.append(header, details.filter.headers[header])
        if (details.filter && details.filter.proxyfetchmetadata) {
            oheaders.set('x-sec-fetch-dest', details.request?.destination)
            oheaders.set('x-sec-fetch-mode', details.request?.mode)
        }
        return { requestHeaders: oheaders }
    }
}, ['onBeforeFetchRequest'], { origins: ['same-origin'] })
```


### listener
Each header name/value pair is added to the origin request headers. We handle raw headers where the [Headers.append](https://developer.mozilla.org/en-US/docs/Web/API/Headers/append) method in used to add the headers, without overriding existing values.  
Optionally, copies of fetch meta data can be added to the modified request, because those headers are [lost when requests are modified by service workers](../utils/fetchmetadata.md)


### stages 
||| 
|--|--| 
`onBeforeFetchRequest` | [the stage](../stages/onBeforeFetchRequest.md) the stage right before [network fetch](../stages/onFetchRequest.md)


### filter options
||| 
|--|--| 
`origins` | `['same-origin']`: the headers are added only to same-origin requests



### return object
||| 
|--|--|
`requestHeaders` | the new request headers, augmented with the new one(s)

The headers will be combined to the original request body to build a new request object passed onto next listeners. 



## See also
- [swcookie](swcookie.md)
