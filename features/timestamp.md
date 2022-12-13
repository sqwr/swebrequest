# timestamp

The `timestamp` feature writes the date when a request was stored in the cache. This feature is should be used in combination with the [timestamp_verify](../features/timestamp_verify.md) feature. 

## Examples 
Working examples of the `timestamp` feature. These are the ones deployed on the [demo website](https://swebrequest.doitsec.net/sqwrfeatures.htm). 
||||
|--|--|--|
[standalone](../examples/timestamp.js) | [standalong](../examples/utimestamp.js) | [workbox](../examples/wtimestamp.js)
|||

Following are more example usages

- activate directly [standalone or standalong]
```javascript
swebRequest.features.timestamp() 
```

- standalone
```javascript
swebRequest.init({ timestamp: null })
```

- standalong
```javascript
swebRequest.usefeatures({ timestamp: null })
```

- workbox
```javascript
workbox.routing.registerRoute( () => true,
  new workbox.strategies.CacheFirst({ plugins: [ 
    new swebRequest.commons.plugin("timestamp")
    ]
}))
```



## Definition
```javascript
swebRequest.features.define('timestamp', async  (details: Details): Promise<Details> => {
    details.requestHeaders['content-language'] = Date.now();
    return { requestHeaders: details.requestHeaders }
}, ['onBeforeCachePut'], {}, ['requestHeaders']);
```

### listener
It sets to the [CORS-safelisted headers](../utils/cors-safelisted.md) `content-language` header, the time when the response is about to be stored in the cache `Date.now()`. Timestamping can be applied to all types of requests, same-origin and cross-origin, no matter their related response types. There is a similar plugin in [Workbox](../utils/workbox.md), but it sometimes store time information in the indexedDB storage, which is less efficient that storing this information in the request iself. 


### stages 
||| 
|--|--| 
`onBeforeCachePut` | [the stage](../stages/onBeforeCachePut.md) the stage right before [cache write](../stages/onCachePut.md)


### extra options
||| 
|--|--|
`requestHeaders` | the request headers will be serialized and included in the `details` object passed to the listener

### return object
||| 
|--|--|
`requestHeaders` | the original request headers augmented with the CORS-safelisted `content-language` header that holds the time stamp

These properties will be used to generate a new response object, that will be stored in the cache. 



## See also
- [timestamp_verify](timestamp_verify.md)
- [CORS-safelisted headers](../utils/cors-safelisted.md)
- [workbox](../utils/workbox.md)