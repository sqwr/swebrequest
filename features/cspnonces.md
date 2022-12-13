# cspnonces

The `cspnonces` feature generates secure and fresh nonces to replace old and insecure nonces in CSP headers and HTML content. This feature is useful with CSP nonces cached in service workers cache, at browser HTTP cache, at intermediate proxies/CDNs such as Cloudflare, on session-based CSP nonces, or static nonces that are never refreshed. As service workers do not have a native DOM parser, one has to load one of the [WASM or Cheerio](../utils/domparser.md) dom parser modules that are provided along `swebRequest`. 

## Examples
Working examples of the `cspnonces` feature. These are the ones deployed on the [demo website](https://swebrequest.doitsec.net/sqwrfeatures.htm). 
||||
|--|--|--|
[standalone](../examples/cspnonces.js) | [standalong](../examples/ucspnonces.js) | [workbox](../examples/wcspnonces.js)
|||


Following are more example usages
- direct activation [standalone or standalong]
```javascript
swebRequest.features.cspnonces() 
```
- standalone
```javascript
swebRequest.init({ cspnonces: null })
```
- standalong
```javascript
swebRequest.usefeatures({ cspnonces: null })
```
- workbox
```javascript
new workbox.strategies.CacheFirst({ plugins: [ 
    new swebRequest.commons.plugin("cspnonces")
]})
```

## Definition
```javascript
swebRequest.features.define('cspnonces', async (details: Details): Promise<Details> => {
    let cspHeaders = ['content-security-policy', 'content-security-policy-report-only'];
    let noncedPolicies = []
    for(let cspHeader of cspHeaders) {
        let csp = details.responseHeaders[cspHeader] || ''
        if (csp.indexOf("'nonce-") > 0)
            noncedPolicies.push(cspHeader)
    }
    if (noncedPolicies.length > 0) {
        let rbody: string = "";
        let ononces: {[key: string]: string} = {};
        if (self.wasmsqwr) {
            let rbodyononces = UtilsWASM.refreshCSPNonces(await details.response.arrayBuffer());
            rbody = rbodyononces[0]; ononces = rbodyononces[1];
        } else if (self.cheerio) {
            let rbodyononces = Utils.refreshCSPNonces(await details.response.text());
            rbody = rbodyononces[0]; ononces = rbodyononces[1];
        }
        for (let cspHeader of noncedPolicies) {
            let csp = details.responseHeaders[cspHeader]
            for (let ononce in ononces)
                csp = csp.replaceAll(ononce, ononces[ononce])
            details.responseHeaders[cspHeader] =  csp
        }
        return {
            responseHeaders: details.responseHeaders,
            responseBody: rbody
        }
    }
    return {}
}, ['onCacheMatchSuccess'], { modes: ['navigate'], rtypes: ['default', 'basic', 'cors'] }, ['responseHeaders']);
```

### listener 
CSP Nonces are searched for in response headers. Then the related response body is passed to [WASM or Cheerio](../utils/domparser.md) module where new, secure and strong nonces are generated to replace the old ones.


### stages 
||| 
|--|--| 
`onCacheMatchSuccess` | the [stage](../stages/onCacheMatchSucces.md) right after [cache read](../stages/onCacheMatch.md)

The `cspnonces` feature is activated by default on cached CSP nonces. But in order to account for cached nonces (at browser HTTP cache, CDNs, etc.), one can enable it at the [onRequestCompleted](../stages/onRequestCompleted.md) as shown
```javascript
swebRequest.features.cspnonces(null, null, null, ['onRequestCompleted']); 
```
See [features activation](../features.md#direct-activation) for more details about direct activation.

### filter options
||| 
|--|--| 
`rtypes` | `['default', 'basic', 'cors']`: decryption can be applied on all responses whose bodies can be read, this includes same-origin and successful CORS responses


### extra options
||| 
|--|--|
`responseHeaders` | the response headers will be serialized and included in the `details` object passed to the listener
`responseBody=arrayBuffer` | the response body serialized as an arrayBuffer 


### return object
||| 
|--|--|
`response` | the original response before encryption


## See also
- [DOM Parser](../utils/domparser.md)
- [injectscripts feature](../features/injectscripts.md)