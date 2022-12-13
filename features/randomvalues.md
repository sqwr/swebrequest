# Generate random values: bytes and tokens
The `randomvalues` feature generates random values, in particular random bytes, used by crypto features such [encryption](encryption.md), [decryption](decryption.md), [signature](signature.md) or [verification](verification.md). The same feature can also be used to generate random token that that can be used to randomize a known URL (i.e. `swmanifest.js`), making it accessible to the context (i.e. the SW) that knows the token. 

This feature is meant to be used within Cloudflare Workers. See its in action in the [Cloudflare workers contexts](../contexts/cloudflare.md#generate-randomvalues)


## runtime options
|||
|--|--|
`maxAge` | an optional max age to be set to the response of the generated random bytes. The default age is `31536000`, which corresponds to 365 days.


## Examples

- direct activation [standalone or standalong]
```javascript
swebRequest.features.randomvalues() 
```

- standalone
```javascript
swebRequest.init({ randomvalues: null })
```

- standalong
```javascript
swebRequest.usefeatures({ randomvalues: null })
```

- workbox
This feature cannot be used as a plugin in Workbox, because it executes at the `onRequestReceived` stage. See [Discussion on workbox limitations](../modes/workbox.md#limitations)


## Definition
```javascript
swebRequest.features.define('randomvalues', async (details: Details) => {
    // 1. We need the origin, href, and referer from the URL
    let rvalues = '',
        rstatus = 403,
        rstatusText = 'Forbidden',
        rheaders = {};
    if (details.request ) {
        let uparams = new URL(details.request.url),
            uorigin = decodeURIComponent(uparams.searchParams.get('origin') || ''),
            uhref = decodeURIComponent(uparams.searchParams.get('href') || ''),
            referer = decodeURIComponent(details.request.headers.get('referer') || ''),
            utoken = uparams.searchParams.has('token'),
            usecure = uparams.searchParams.has('secure') && uparams.searchParams.get('secure')?.toLowerCase() == 'true',
            umaxage = uparams.searchParams.has('maxage') && uparams.searchParams.get('maxage');
        let securegeneration = usecure || (details.filter && details.filter.secure);
        let maxAge = ((details.filter && details.filter.maxAge) || 3600 * 24 * 365);
        if (umaxage) {
            let umn = Number(umaxage); 
            if ((!isNaN(umn)) && umn > 0)
                maxAge = umn;
        }
        if ((!referer) && (!securegeneration))
            referer = uhref;
        if ( uhref && uorigin && referer &&
                uhref.startsWith(uorigin) && uorigin !== uhref && 
                (uhref == referer || uorigin == referer) ) {
            if (utoken || (details.filter && details.filter.token))
                rvalues = await Utils.generateRandomValues(referer, uhref, uorigin, 96, 'randomToken');
            else
                rvalues = await Utils.generateRandomValues(referer, uhref, uorigin, 32, 'randomBytes');
            rstatus = 200;
            rstatusText = 'OK';
            rheaders = {
                'content-type': 'application/javascript',
                'cache-control': "private, max-age=" + maxAge,
                'x-swr-cloudflare-worker': true,
                'x-swr-secure-randomvalues': securegeneration
            };
        }
    }
    return { 
        response: new Response(rvalues, {
            status: rstatus,
            statusText: rstatusText,
            headers: rheaders
        }),
        next: 'onRequestCompleted'
    }
}, ['onRequestReceived']);
```

### listener
From the request URL, are extracted the following parameters
- `origin`: the origin on the SW context, better encoded with [encodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)
- `href`: the SW URL, better encoded with [encodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)
- `secure=true`: add this parameter to the URL if you are sure that your SW has a [Referrer-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy) that instructs the browser to send `Referer` header to the Cloudflare worker when fetching the random bytes. The value of this header must be the whole SW URL. This implies that the Referrer-Policy must have one of the two `unsafe-url` or `no-referrer-when-downgrade`. The presence of the `referer` header prevents the Cloudflare Worker from generating the random bytes if there is a mismatch between the value of the `referer` header and that of the `href` parameter in the URL (see the code snippet above)
- `maxage`: By default, the random bytes response has a `Cache-Control: private, max-age=31536000` header, meaning that the bytes are cached for a year. The SW can change this default age by providing the `maxage` parameter in the URL with the desired age (in seconds), i.e `maxage=86400` for 24h or `maxage=2592000` for 30 days, etc.

The `origin` and `href` parameters in the request URL must be present. They will be leveraged to  generate and defensively protect the random bytes, making them only accessible to the right SWs. The other arguments are optional. 
The `href` must start with the `origin`. Additionally, if the `referer` header is present, its value must either match be exactly the  `origin` parameter value or the `href` parameter value. When all those checks pass, the [generateRandomValues](#secure-generation-and-defensive-protection-of-the-random-bytes) is invoked to generate and defensively protect the random bytes.


### stages 
||| 
|--|--| 
`onRequestReceived` | the [stage](../stages/onRequestReceived.md) right when the request is intercepted. 


### return object
||| 
|--|--|
`response` | the response with the random bytes

A couple of additional informative headers are also included in the response.
- `x-swr-cloudflare-worker`: is a boolean that indicates whether the random bytes have been generated by a Cloudflare Worker
- `x-swr-secure-randomvalues`: a boolean indicating whether the **secure** generation option was enabled. 



## See also
- [randombytes](../utils/randombytes.md)
- [Cloudflare Workers](../contexts/cloudflare.md)
- [encryption](../features/encryption.md)
- [decryption](../features/decryption.md)
- [signature](../features/signature.md)
- [verification](../features/verification.md)
- [fetch event](../events/fetch.md)


## Secure generation and defensive protection of the random bytes
The following code snippet shows how random bytes are securely generated, and defensively protected. 
```javascript
async function generateRandomValues(referer, href, origin, size, funcname) {
  return `
    let  ${funcname} = (function () {
      if (location.href !== "${href}" && location.origin + '/' != "${origin}")
        return;
      let _innerFunction = function() {
        if (location.origin + '/' == "${referer}" || location.href == "${referer}")
          return "${btoa(await arrayBufferToString(generateIV(size || 32)))}";
        return null;
      }
      return function(){
        return _innerFunction();
      }
    })();
  `
}
```
- `funcname` is fixed by the `swebRequest` and can either be `randomBytes` (if random bytes are being generated) or `randomToken` (if a random token is being generated). 
- `size`: 32 for random bytes 
- `href`: the service worker URL
- `origin`: the service worker origin