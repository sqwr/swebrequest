# anonymize_xor
The `anonymize_xor` feature anonymize cross-origin (third party) requests. It rewrites requests to remove [credentials](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials) (i.e. cookies) and the [referer](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) header. This feature preserves CORS requests. 

## Examples
Working examples of the `anonymize_xor` feature. These are the ones deployed on the [demo website](https://swebrequest.doitsec.net/sqwrfeatures.htm). 
||||
|--|--|--|
[standalone](../examples/anonymize_xor.js) | [standalong](../examples/uanonymize_xor.js) | [workbox](../examples/wanonymize_xor.js)
||| 

Following are more example usages

- direct activation [standalone or standalong]
```javascript
swebRequest.features.anonymize_xor() 
```
- standalone
```javascript
swebRequest.init({ anonymize_xor: null })
```
- standalong
```javascript
swebRequest.usefeatures({ anonymize_xor: null })
```
- workbox
```javascript
new workbox.strategies.NetworkFirst({ plugins: [ 
  new swebRequest.commons.plugin("anonymize_xor")
]})
```

## Definition
```javascript
  swebRequest.features.define('anonymize_xor', async (details: Details): Promise<Details> => {
    return {
        request : new Request (details.request, {
            credentials: 'omit',
            referrer: ''
        })
    }
}, ['onBeforeFetchRequest'], { origins: ['cross-origin'], modes: ['no-cors'] });
```
### listener
Anonymizing a request is as simple as rewritting it so that credentials are removed, and referrer header removed as well. As this applies only to requests of type `no-cors`, CORS requests are not impacted. Requests that are impacted are third party requests to load content such as `<script>, <link>, <img>` in HTML pages.


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
- [anonymize](../features/anonymize.md)