# anonymize
The `anonymize` feature anonymize all requests. It rewrites requests to remove [credentials](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials) (i.e. cookies) and the [referer](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) header. 



## Examples
Working examples of the `anoymize` feature. These are the ones deployed on the [demo website](https://swebrequest.doitsec.net/sqwrfeatures.htm). 
||||
|--|--|--|
[standalone](../examples/anoymize.js) | [standalong](../examples/uanoymize.js) | [workbox](../examples/wanoymize.js)
||| 

Following are more example usages

- direct activation [standalone or standalong]
```javascript
swebRequest.features.anonymize() 
```
- standalone
```javascript
swebRequest.init({ anonymize: null })
```
- standalong
```javascript
swebRequest.usefeatures({ anonymize: null })
```
- workbox
```javascript
new workbox.strategies.NetworkFirst({ plugins: [ 
    new swebRequest.commons.plugin("anonymize")
]})
```

## Definition
```javascript
swebRequest.features.define('anonymize', async (details: Details): Promise<Details> => {
    if (details.request.mode == 'no-cors') { // because of an error on xorg stylesheets
        return {
            request: new Request(details.request.url, {
                credentials: 'omit',
                mode: 'no-cors',
                referrer: details.request.referrer,
                //referrer: '',
            })
        }
    } else {
        if (details.filter?.proxyfetchmetadata) {
            let headers = new Headers(details.request.headers)
            headers.set('x-sec-fetch-dest', details.request?.destination)
            headers.set('x-sec-fetch-mode', details.request?.mode)
            return {
                request : new Request (details.request, {
                    credentials: 'omit',
                    mode: details.request.mode == 'navigate' ? 'same-origin' : details.request.mode,
                    referrer: details.request.referrer,
                    headers: headers
                })
            }
        } else {
            return {
                request : new Request (details.request, {
                    credentials: 'omit',
                    mode: details.request.mode == 'navigate' ? 'same-origin' : details.request.mode,
                    referrer: details.request.referrer
                })
            }
        }
    }
}, ['onBeforeFetchRequest']);
```
### listener
Anonymizing a request is as simple as rewritting it so that credentials are removed. CORS requests are also impacted. Features that manipulate requests impact [fetch meta data](../utils/fetchmetadata.md). A solution is to make copies of the original impacted meta data headers into custom header. 


## runtime options
||| 
|--|--| 
`proxyfetchmetadata` | an optional boolean. when set to `true`,  the `x-sec-fetch-dest` and `x-sec-fetch-mode` headers are added with a copy of the request [type](https://developer.mozilla.org/en-US/docs/Web/API/Request/destination) and [mode](https://developer.mozilla.org/en-US/docs/Web/API/Request/mode) as their values respectively.



### stages 
||| 
|--|--| 
`onBeforeFetchRequest` | [the stage](../stages/onBeforeFetchRequest.md) before [network fetch](../stages/onFetchRequest.md)


### filter options
||| 
|--|--| 
`origins` | `cross-origin`: the `anonymize_xor` feature applies only to third party requests
`modes` | `no-cors` mode preserves CORS requests. This types of requests are essentially request to load content of type `<scrpipt>`, `<link>`, `<img>` embedded in HTML documents


### return object
||| 
|--|--|
`request` | the new request, anonymized

The new request (anonymized request) will be used to generate a new response object, that will be stored in the cache. 


## See also
- [anonymize_xor](../features/anonymize_xor.md)