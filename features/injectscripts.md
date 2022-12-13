# injectscripts
The `injectscripts` feature adds JavaScript code to HTML responses. The scripts can be remote or inline scripts, and the feature accounts for CSP nonces. Scripts are prepended (first) in the HTML response. As service workers do not have a native DOM parser, one has to load one of the [WASM or Cheerio](../utils/domparser.md) dom parser modules that are provided along `swebRequest`. 

## runtime options
||| 
|--|--|
`position` | string which value is either `prepend` (default) or `append`, telling how to inject scripts in HTML content. By default, scripts will are prepended first in HTML response
`inlinescripts` | boolean, `true` for inline scripts, and `false` (default) for remote scripts.
`scriptstoinject` | an array of scripts URL (relative or absolute) or string (inline code) to inject in the HTML response. Scripts are added in the order they appear in the array

## Examples
Working examples of the `injectscripts` feature. These are the ones deployed on the [demo website](https://swebrequest.doitsec.net/sqwrfeatures.htm). 

||||
|--|--|--|
[standalone](../examples/injectscripts.js) | [standalong](../examples/uinjectscripts.js) | [workbox](../examples/winjectscripts.js) 
|||

Following are more example usages
- direct activation [standalone or standalong]
```javascript
swebRequest.features.injectscripts({
    scriptstoinject: [" alert('swebRequest injected script'); "], inlinescripts: true
}) 
```
- standalone
```javascript
swebRequest.init({ injectscripts: {
    scriptstoinject: [" alert('swebRequest injected script'); "], inlinescripts: true
} })
```
- standalong
```javascript
swebRequest.usefeatures({ injectscripts: {
    scriptstoinject: [" alert('swebRequest injected script'); "], inlinescripts: true
} })
```
- workbox
```javascript
new workbox.strategies.CacheFirst({ plugins: [ 
    new swebRequest.commons.plugin("injectscripts", {
        scriptstoinject: [" alert('swebRequest injected script'); "], inlinescripts: true
    })
]})
```


## Definition
```javascript
swebRequest.features.define('injectscripts', async (details: Details): Promise<Details> => {
    if (!(self.wasmsqwr || self.cheerio))
        return {}
    let cspnonce = '';
    try {
        let nonces = Utils.extractNoncesFromPolicies(details.responseHeaders['content-security-policy'])
        cspnonce = Object.keys(nonces)[0]
    } catch(e) {}
    if (details.filter.position == 'append') {
        if (self.wasmsqwr) details.responseBody = UtilsWASM.injectScriptsAppend((await details.response.arrayBuffer()), details.filter.scriptstoinject as string[], details.filter.inlinescripts as boolean, cspnonce);
        else if (self.cheerio) details.responseBody = Utils.injectScriptsAppend((await details.response.text()), details.filter.scriptstoinject as string[], details.filter.inlinescripts as boolean, cspnonce)
    } else {
        if (self.wasmsqwr) details.responseBody = UtilsWASM.injectScriptsPrepend((await details.response.arrayBuffer()), details.filter.scriptstoinject as string[], details.filter.inlinescripts as boolean, cspnonce)
        else if (self.cheerio) details.responseBody = Utils.injectScriptsPrepend((await details.response.text()), details.filter.scriptstoinject as string[], details.filter.inlinescripts as boolean, cspnonce)
    }
    return { 
        responseBody: details.responseBody
    }
}, ['onRequestCompleted'], { modes: ['navigate'], rtypes: ['default', 'basic', 'cors'] }, ['responseHeaders']);
```

### listener
If there are CSP nonces, one of them is extracted from the CSP response header. Then, the related response body is passed to [WASM or Cheerio](../utils/domparser.md) module where the scripts will be added (prepended or appended) to the HTML response, inline or remote, with CSP nonces if the response has nonces in its CSP headers. 

### stages 
||| 
|--|--| 
`onRequestCompleted` | [the stage](../stages/onRequestCompleted.md) the stage right before responding to the client. 


### filter options
||| 
|--|--| 
`modes` | `[ 'navigate' ]`: only navigation responses are concerned about scripts injection
`rtypes` | `['default', 'basic', 'cors']`: in general, all responses which body is manipulable can be added can be applied the `injectscripts` feature, but effectively only navigation requests/responses will be applied this feature. 


### extra options
||| 
|--|--|
`responseHeaders` | the response headers will be serialized and included in the `details` object passed to the listener. If there is a CSP, with nonces, one of the nonces will be used and added to the 


### return object
||| 
|--|--|
`responseBody`| the new response body, with the injected code

This property will be combined with other response properties (headers, status, statusText) to generate new response objects that will be passed to subsequent listeners.



## See also
- [DOM Parser](../utils/domparser.md)
- [cspnonces feature](../features/cspnonces.md)