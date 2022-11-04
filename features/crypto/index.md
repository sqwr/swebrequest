# Crypto on the cache
The `encryption`, `decryption`, `signature` and `verification` features enables cryptographic confidentially and integrity on HTTP [responses](https://developer.mozilla.org/en-US/docs/Web/API/Response) stored by service workers in the web applications [cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache) in the browser. Complying with the [Same-Origin Policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) and [Fetch specification](https://fetch.spec.whatwg.org/#responses), these cryptographic features can only be applied to HTTP responses whose bodies are readable, i.e. [responses of types](https://developer.mozilla.org/en-US/docs/Web/API/Response/type) `basic`, `cors` and `default`.

### Encryption and decryption
- the `encryption` feature [encrypts](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt) HTTP responses before they are stored in the cache.
- the `decryption` feature [decrypts](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/decrypt) HTTP responses right after they are retrieved from the cache. 

### Signature and verification
- the `signature` feature [signs](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/sign) HTTP responses before 


Encryption is performed with the [`AES-GCM`](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#aes-gcm) algorithm. Storing content in the cache is achieved with [put](https://developer.mozilla.org/en-US/docs/Web/API/Cache/put), [addAll](https://developer.mozilla.org/en-US/docs/Web/API/Cache/addAll) and [add](https://developer.mozilla.org/en-US/docs/Web/API/Cache/add) operations on the [cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache). 

## Runtime options
The `encryption` feature requires a `randomBytes` option that holds  random bytes to be used to perform the encryption on responses. First of all, the entity (i.e. web server, CDN, etc.) that generates the random bytes for a web site MUST be from a different origin than the website. In other words, once should use a trusted third party server or CDN to generate the website. In this settings, there are still many many security requirements for the generation and delivery of the random bytes:
1. `secure`: the random bytes must be generated using `cryptograhpically secure random` algorithms. Many implementations exist for different languages, i.e. the crypto module [for Node.js](https://nodejs.org/api/crypto.html#cryptogetrandomvaluestypedarray) and [JavaScript](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues), [the secrets module for Python](https://docs.python.org/3/library/secrets.html#secrets.token_bytes), etc. 
2. `persistent`: the random bytes must be persisted, for the dual operation, i.e. `decryption` to be properly performed with the same bytes. This is achieved by delivering the HTTP response that holds the random bytes, with a [Cache-control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) response header. The following directives are leveraged:
	- `max-age` directive set to the lifetime of the random bytes in the cache. Note that in browsers, the cache where the random bytes are persisted is not the service workers cache, but rather the browser [HTTP cache](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching).
	- `private` directive to mandate that the random bytes be stored only in browser's cache, and not on intermediate proxies on the response route (i.e. CDN)
	- no `must-revalidate`: to allow the offline use of expired random bytes 
3. `secret`: the random bytes must only be accessible to the right service worker they are destined to. Not even (potentially malicious) scripts running in other same-origin contexts (i.e. web pages, shared and dedicated workers) should have access to the random bytes. This property is achieved by leveraging defensive JavaScript programming, [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) and unforgeable browser properties such as the [Referer header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) and [location](https://developer.mozilla.org/en-US/docs/Web/API/Location) object.

The obove 3 requirements effectively protects the random bytes, making them only accessible to the service worker they were generated for. Additionally, service workers that have a [Referrer-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy) header with certain directives can enjoy more security for the random bytes. 


We have 2 implementations 

## Random bytes generators


## Examples


## 