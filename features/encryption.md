# Encryption 
The `encryption` feature encrypts HTTP responses before cache writes. 
It should be combined with the [decryption](decryption.md) feature. 


## runtime options
||| 
|--|--| 
| `randomBytes` |  a string of random bytes to used to derive the cryptographic key that will be used to perform encryption. It is accessed in the feature listener under `details.filter.randomBytes`



## Examples 
Working examples of the `encryption` feature. These are the ones deployed on the [demo website](https://swebrequest.doitsec.net/sqwrfeatures.htm). 
||||
|--|--|--|
[standalone](../examples/encryption.js) | [standalong](../examples/uencryption.js) | [workbox](../examples/wencryption.js)
|||

Following are more example usages

- direct activation [standalone or standalong]
```javascript
swebRequest.features.encryption({ randomBytes: "r@nd0m3" }) 
```
- standalone
```javascript
swebRequest.init({ encryption: { randomBytes: "r@nd0m3" } })
```
- standalong
```javascript
swebRequest.usefeatures({ encryption: { randomBytes: "r@nd0m3" } })
```
- workbox
```javascript
new workbox.strategies.CacheFirst({ plugins: [ 
    new swebRequest.commons.plugin("encryption", { randomBytes: "r@nd0m3" })
]})
```

## Scheme
![Encryption scheme](../images/crypto.png)

## Definition
```javascript
swebRequest.features.define('encryption', async (details: Details): Promise<Details> => {
    let plainText = await Utils.serializeResponseForEncryption(details.request.url, details.responseBody, details.responseHeaders, details.response.status, details.response.statusText)
    if (!thiself.encryptionKey)
        thiself.encryptionKey = await Utils.importSecretKey(Uint8Array.from(details.filter.randomBytes.split('')))
    let iv = Utils.generateIV();
    let cipherText = await Utils.encryption(thiself.encryptionKey, iv, plainText)
    let encresponseheaders: { [key: string]: any } = {}
    encresponseheaders['last-modified'] = btoa(await Utils.arrayBufferToString(iv));
    return {
        responseHeaders: encresponseheaders,
        responseBody: cipherText
    }
}, ['onBeforeCachePut'], { rtypes: ['default', 'basic', 'cors'] }, ['responseHeaders', 'responseBody=arrayBuffer']);
```



### listener

The plain text is an object made of the request url (`details.request.url`), the original response body (`details.response.body`), the serialized response headers (`details.responseHeaders`), the response status (`details.response.status`) and statusText (`details.response.statusText`). The plain text is serialized into an arrayBuffer, the format suitable for encryption. The random bytes, held in the `randomBytes` runtime option are used to derive the encryption key. Then a random initialization vector (IV) is generated in the browser. Finally, encryption is performed with the key, the IV and the plain text, yielding  the cipherText. The returned object is made of the cipherText, a the IV stored in the CORS-safelisted `last-modified` response header. They will serve to generate a new response header that will be stored in the stored in the cache. 


### stages 
||| 
|--|--| 
`onBeforeCachePut` | [the stage](../stages/onBeforeCachePut.md) the stage right before [cache write](../stages/onCachePut.md)


### filter options
||| 
|--|--| 
`rtypes` | `['default', 'basic', 'cors']`: encryption can be applied on all responses whose bodies can be read, this includes same-origin and successful CORS responses


### extra options
||| 
|--|--|
`responseHeaders` | the response headers will be serialized and included in the `details` object passed to the listener
`responseBody=arrayBuffer` | the response body serialized as an arrayBuffer 


### return object
||| 
|--|--|
`responseHeaders` | the CORS-safelisted `last-modified` header hold the IV
`responseBody`| the cipher text

These properties will be used to generate a new response object, that will be stored in the cache. 



## See also
- [randombytes](../utils/randombytes.md)
- [randomvalues](randomvalues.md)
- [decryption](decryption.md)
- [signature](signature.md)
- [verification](verification.md)
- [Cloudflare Workers](../contexts/cloudflare.md)
- [fetch event](../events/fetch.md)
