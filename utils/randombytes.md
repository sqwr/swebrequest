#  Secure random bytes for cryptographic features
The crypto [encryption](../features/encryption.md), [decryption](../features/decryption.md), [signature](../features/signature.md) and [verification](../features/verification.md) features require cryptographically secure random bytes that are delivered to websites so as to be only accessible to SWs and persisted in the browser. There are many ways you can get secure random bytes

## Cloudflare Worker
A `swebRequest`-powered Cloudflare worker that serves random bytes for `swebRequest` SWs in the browser, that in essence the summary of this solution. This is done with the [randomvalues](../features/randomvalues.md)
Ours is deployed at `randomvalues.sqwr.workers.dev`.

### Syntax
The code snippet to download the random bytes is shown as follows:
```javascript
importScripts('https://randomvalues.sqwr.workers.dev/?origin=' + encodeURIComponent(location.origin) + '/&href=' + encodeURIComponent(location.href))
```
Note the subtle `/` added at the end of the `origin` parameter. 
The `origin` and `href` parameters in the URL must be present. They will be leveraged to defensively generate and protect the random bytes, making them only accessible to the right SWs. 

- `maxage`: By default, the response has a `Cache-Control: private, max-age=31536000` header, meaning that the bytes are cached for a year. The SW can change this default age by providing the `maxage` parameter in the URL with the desired age (in seconds), i.e `maxage=86400` for 24h or `maxage=2592000` for 30 days.
- `secure=true`: add this parameter to the URL if you are sure that your SW has a `Referrer-Policy` that instructs the browser to send `Referer` header to the Cloudflare worker when fetchin the random bytes. The value of this header must be the whole SW URL. The Referrer-Policy must have one of the two `unsafe-url` or `no-referrer-when-downgrade`. The presence of the `referer` header prevents the Cloudflare Worker from generating the random bytes if there is a mismatch between the value of the `referer` header and that of the `href` parameter in the URL (see the code snippet above)

### Accessing the random bytes
The random bytes are base64 encoded and can be accessed as shown.
```javascript
atob(randomBytes())
```
Before using the random bytes in a browser, one should base64 decode them, with a function like `atob` . The size of the random bytes is of 32 bytes. This is maximum size allowed by the Crypto API in browsers. 

### examples
Here is how a fully functional examples that enables encryption/decryption on a SW cache.
```javascript
importScripts('https://randomvalues.sqwr.workers.dev/?origin=' + encodeURIComponent(location.origin) + '/&href=' + encodeURIComponent(location.href))
swebRequest.init({
    encryption: randomBytes: atob(randomBytes()),
    decryption: randomBytes: atob(randomBytes())
})
```

Here is now signature/verifcation features can be enabled with the random bytes.
```javascript
importScripts('https://randomvalues.sqwr.workers.dev/?origin=' + encodeURIComponent(location.origin) + '/&href=' + encodeURIComponent(location.href))
swebRequest.init({
    signature: randomBytes: atob(randomBytes()),
    verification: randomBytes: atob(randomBytes())
})
```


## 