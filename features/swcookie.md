# swcookie 
The `swcookie` feature adds the `x-sw-cookie` header to outgoing same-origin requests. 
Its value can be a unique token, leveraged server-side to complement and fight defenses against CRSF attacks, etc.
See [swmanifest](../utils/swmanifest.md) for discussions and potential usages of this kind of header, or more generally the fact that service workers and custom headers they add to outgoing same-origin requests could serve as a mechanism for attesting the origin of requests received server-side. 

## runtime options
||| 
|--|--| 
`swcookie` |  a string of random characters to be sent with outgoing **same-origin** requests, as the value of a `x-sw-cookie` header. The option is available to the listener under `details.filter.swcookie`
`proxyfetchmetadata` | a boolean. when set to `true`,  the `x-sec-fetch-dest` and `x-sec-fetch-mode` headers are added with a copy of the request [type](https://developer.mozilla.org/en-US/docs/Web/API/Request/destination) and [mode](https://developer.mozilla.org/en-US/docs/Web/API/Request/mode) as their values respectively.


## Examples
Working examples of the `swcookie` feature. These are the ones deployed on the [demo website](https://swebrequest.doitsec.net/sqwrfeatures.htm). 

||||
|--|--|--|
[standalone](../examples/swcookie.js) | [standalong](../examples/uswcookie.js) | [workbox](../examples/wswcookie.js) 
|||

- activate directly [standalone or standalong]
```javascript
swebRequest.features.swcookie( { 
    swcookie: 'r@nd0m321', proxyfetchmetadata: true
}) 

```

- standalone
```javascript
swebRequest.init({ 
    swcookie: { swcookie: 'r@nd0m321', proxyfetchmetadata: true }
})
```

- standalong
```javascript
swebRequest.usefeatures({ 
   swcookie: { swcookie: 'r@nd0m321', proxyfetchmetadata: true }
})
```

- workbox
```javascript
new workbox.strategies.CacheFirst({ plugins: [ 
    new swebRequest.commons.plugin("swcookie", { 
        swcookie: 'r@nd0m321', proxyfetchmetadata: true
    })
]})
```


## Definition
```javascript
swebRequest.features.define('swcookie',  async (details: Details): Promise<Details> => {
    details.requestHeaders['x-sw-cookie'] = details.filter.swcookie;
    if (details.filter.proxyfetchmetadata) {
        details.requestHeaders['x-sec-fetch-dest'] = details.request?.destination
        details.requestHeaders['x-sec-fetch-mode'] = details.request?.mode
    }
    return { requestHeaders: details.requestHeaders }
}, ['onBeforeFetchRequest'], { origins: ['same-origin'] }, ['requestHeaders']);
```


### listener
The `x-sw-cookie` header is added to the original set of request headers. Optionally, copies of fetch meta data can be added to the modified request, because those headers are [lost when requests are modified by service workers](../utils/fetchmetadata.md)


### stages 
||| 
|--|--| 
`onBeforeFetchRequest` | [the stage](../stages/onBeforeFetchRequest.md) the stage right before [network fetch](../stages/onFetchRequest.md)


### filter options
||| 
|--|--| 
`origins` | `['same-origin']`: the headers are added only to same-origin requests


### extra options
||| 
|--|--|
`requestHeaders` | the new headers are added to the serialized request headers passed to the listener


### return object
||| 
|--|--|
`requestHeaders` | the new request headers, augmented with the new one(s)

The headers will be combined to the original request body to build a new request object passed onto next listeners. 


## See also
- [setRequestHeaders](setRequestHeaders.md)

