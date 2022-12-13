# Origin policies
The `originpolicies` feature adds security policies to responses, read from the service worker cache, the browser HTTP cache, an intermediate proxy such as a CDN, or from the origin application server. The headers can include security headers such as [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) that will be enforced by browsers to fight attacks such as [XSS](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).  See  [origin policies format](../utils/originpolicies.md) for more details details about the format of the origin policies handled in this feature.


## runtime options
||| 
|--|--| 
| `originpolicies` | an array of origin policy headers and matching requests filters. See [origin policies](../utils/originpolicies.md) for more details details about the format of the origin policies handled in this feature.



## Examples 
Working examples of the `originpolicies` feature. These are the ones deployed on the [demo website](https://swebrequest.doitsec.net/sqwrfeatures.htm). 
||||
|--|--|--|
[standalone](../examples/originpolicies.js) | [standalong](../examples/uoriginpolicies.js) | [workbox](../examples/woriginpolicies.js) 
|||

Following are more example usages

- direct activation [standalone or standalong]
```javascript
swebRequest.features.originpolicies({ 
    originpolicies: [{
        matches: { modes: ['navigate'] },
        "content-security-policy": "default-src ws: wss: data: blob: http: https: 'unsafe-inline' 'unsafe-eval'; form-action https: http:; frame-ancestors https:;",
        "permissions-policy": "camera=*, geolocation=*, sync-xhr=*, fullscreen=*, microphone=*, midi=*, document-domain=*",
        "x-frame-options": "sameorigin",
        "referrer-policy": "same-origin"
    }, {
        matches: { types: ['sharedworker', 'worker'] },
        "content-security-policy": "default-src 'self' ws: wss: data: blob: http: https: 'unsafe-inline' 'unsafe-eval';",
        "permissions-policy": "sync-xhr=()"
    }]
}) 
```

- standalone
```javascript
swebRequest.init({ 
     originpolicies: [{
        matches: { modes: ['navigate'] },
        "content-security-policy": "default-src ws: wss: data: blob: http: https: 'unsafe-inline' 'unsafe-eval'; form-action https: http:; frame-ancestors https:;",
        "permissions-policy": "camera=*, geolocation=*, sync-xhr=*, fullscreen=*, microphone=*, midi=*, document-domain=*",
        "x-frame-options": "sameorigin",
        "referrer-policy": "same-origin"
    }, {
        matches: { types: ['sharedworker', 'worker'] },
        "content-security-policy": "default-src 'self' ws: wss: data: blob: http: https: 'unsafe-inline' 'unsafe-eval';",
        "permissions-policy": "sync-xhr=()"
    }]
})
```

- standalong
```javascript
swebRequest.usefeatures({ 
    originpolicies: [{
        matches: { modes: ['navigate'] },
        "content-security-policy": "default-src ws: wss: data: blob: http: https: 'unsafe-inline' 'unsafe-eval'; form-action https: http:; frame-ancestors https:;",
        "permissions-policy": "camera=*, geolocation=*, sync-xhr=*, fullscreen=*, microphone=*, midi=*, document-domain=*",
        "x-frame-options": "sameorigin",
        "referrer-policy": "same-origin"
    }, {
        matches: { types: ['sharedworker', 'worker'] },
        "content-security-policy": "default-src 'self' ws: wss: data: blob: http: https: 'unsafe-inline' 'unsafe-eval';",
        "permissions-policy": "sync-xhr=()"
    }]
})
```

- workbox
```javascript
new workbox.strategies.CacheFirst({ plugins: [ 
    new swebRequest.commons.plugin("originpolicies", { 
         originpolicies: [{
            matches: { modes: ['navigate'] },
            "content-security-policy": "default-src ws: wss: data: blob: http: https: 'unsafe-inline' 'unsafe-eval'; form-action https: http:; frame-ancestors https:;",
            "permissions-policy": "camera=*, geolocation=*, sync-xhr=*, fullscreen=*, microphone=*, midi=*, document-domain=*",
            "x-frame-options": "sameorigin",
            "referrer-policy": "same-origin"
        }, {
            matches: { types: ['sharedworker', 'worker'] },
            "content-security-policy": "default-src 'self' ws: wss: data: blob: http: https: 'unsafe-inline' 'unsafe-eval';",
            "permissions-policy": "sync-xhr=()"
        }]
    })]
})
```


## Definition
```javascript
swebRequest.features.define('originpolicies', async (details: Details): Promise<Details> => {
    if (!(details.response && details.request))
        return {}
    let headers = new Headers(details.response.headers);
    let matchingPolicies = await Utils.getMatchingOriginPolicies(details);
    let atLeastOnePolicy = false
    for(let policy in matchingPolicies) { 
        atLeastOnePolicy = true;
        for (let pol of matchingPolicies[policy]) {
            headers.append(policy, pol)
        }
    }
    if (atLeastOnePolicy) {
        return { responseHeaders: headers }
    }
    return {}
}, ['onRequestCompleted'], { modes: ['same-origin', 'navigate'], rtypes: ['default', 'basic', 'cors'] });
```


### listener
Adding origin policies works on same-origin and navigation responses. The raw headers are manipulated, instead of the serialized ones. That is because the raw headers makes it easy to append additional headers without overriding potentially existing ones (i.e. a CSP from a remote server, and a CSP in the origin policy). The policies that match requests and responses are appended to the response. See  [origin policies](../utils/originpolicies.md) for more details details about the format of the origin policies handled in this feature.



### stages 
||| 
|--|--| 
`onRequestCompleted` | [the stage](../stages/onRequestCompleted.md) the stage right before a response is generated to fulfill an HTTP request. 


### filter options
||| 
|--|--| 
`rtypes` | `['default', 'basic', 'cors']`: adding security policies to responses can be done on any manipulable solution... can be applied on all responses whose bodies can be read, this includes same-origin and successful CORS responses

### return object
||| 
|--|--|
`responseHeaders` | the original response headers are augmented with the security headers in the origin policy



## See also
- [originpolicies format](../utils/originpolicies.md)
- [setResponseHeaders](../features/setResponseHeaders.md)