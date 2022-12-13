# Decryption 
The `decryption` feature decrypts HTTP responses after cache reads. 
It should be combined with the [encryption](encryption.md) feature. 

### runtime options
||| 
|--|--| 
| `randomBytes` |  a string of random bytes to used to derive the cryptographic key that will be used to perform decryption. It is accessed in the feature listener under `details.filter.randomBytes`


### examples 
Working examples of the `decryption` feature. These are the ones deployed on the [demo website](https://swebrequest.doitsec.net/sqwrfeatures.htm). 
||||
|--|--|--|
[standalone](../examples/encryption.js) | [standalong](../examples/uencryption.js) | [workbox](../examples/wencryption.js)
|||

Following are more example usages

- activate directly [standalone or standalong]
```javascript
swebRequest.features.decryption({ 
    randomBytes: "r@nd0m3" 
}) 
```

- standalone
```javascript
swebRequest.init({ 
    decryption: { randomBytes: "r@nd0m3" } 
})
```

- standalong
```javascript
swebRequest.usefeatures({ 
    decryption: { randomBytes: "r@nd0m3" } 
})
```

- workbox
```javascript
new workbox.strategies.CacheFirst({ plugins: [ 
    new swebRequest.commons.plugin("decryption", { randomBytes: "r@nd0m3" })
]})
```


## Definition
```javascript
swebRequest.features.define('decryption', async (details: Details): Promise<Details> => {
    try {
        if (!thiself.encryptionKey)
            thiself.encryptionKey = await Utils.importSecretKey(Uint8Array.from(details.filter.randomBytes.split('')))
        let iv =  Utils.stringToArrayBuffer(atob(details.response.headers.get('last-modified'))),
            cipherText = await details.response.arrayBuffer();
        let decipherText = Utils.deserializeResponseAfterDecryption(await Utils.decryption(thiself.encryptionKey, iv, cipherText))
        if (decipherText.url == details.request.url) {
            return {
                response: new Response(Utils.stringToArrayBuffer(decipherText.body), {
                    headers: decipherText.headers,
                    status: decipherText.status,
                    statusText: decipherText.statusText
                })
            }
        }
    } catch(e) {}
    return { next: 'onBeforeFetchRequest', response: undefined }
}, ['onCacheMatchSuccess'], { rtypes: ['default', 'basic', 'cors'] }, ['responseHeaders', 'responseBody=arrayBuffer']);
	
```


### listener
The `decryption` feature recovers the original response that was encrypted. 
The IV that was used to perform the encryption is read from the CORS-safelisted `last-modified` response header. The cipher text is the encrypted response body, read as an arrayBuffer.
The random bytes, held in the `randomBytes` runtime option are used to derive the decryption key. These are the same random bytes used during the encryption process. Then decryption is performed with the key, the IV and the cipher text. The recovered plain text is is deserialized in order to recover the original object before [encryption](encryption.md#listener), that was made of the original request url, response body, headers, status and statusText. Last check before returning the response is to ensure that the original request url matches the request that url that was used to read the encrypted response in the cache. This guards against [reordering attacks](https://swcacheattack.secpriv.wien/swcacheattack_woot21.pdf). Finally, a new response object is generated and returned. It is made of the original response body, headers, status and status text.


### stages 
||| 
|--|--| 
`onCacheMatchSuccess` | the [stage](../stages/onCacheMatchSucces.md) right after [cache read](../stages/onCacheMatch.md)


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
- [randombytes](../utils/randombytes.md)
- [randomvalues](randomvalues.md)
- [encryption](encryption.md)
- [signature](signature.md)
- [verification](verification.md)
- [Cloudflare Workers](../contexts/cloudflare.md)
- [fetch event](../events/fetch.md)
