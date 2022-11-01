# Encryption
The `encryption` feature [encrypts](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt)  HTTP [responses](https://developer.mozilla.org/en-US/docs/Web/API/Response) before they are stored in the [cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache). Encryption is performed with the [`AES-GCM`](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#aes-gcm) algorithm. Complying with the [Same-Origin Policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) and [Fetch specification](https://fetch.spec.whatwg.org/#responses), the `encryption` feature only applies to HTTP responses whose bodies are readable, i.e. responses of types [`basic, cors, default`](https://developer.mozilla.org/en-US/docs/Web/API/Response/type). Storing content in the cache is achieved with [Cache.put](https://developer.mozilla.org/en-US/docs/Web/API/Cache/put), [Cache.addAll](https://developer.mozilla.org/en-US/docs/Web/API/Cache/addAll) and [Cache.add](https://developer.mozilla.org/en-US/docs/Web/API/Cache/add). 

## Runtime options
The `encryption` feature requires a `randomBytes` option that holds  random bytes to be used to perform the encryption on responses. There are many security requirements for the random bytes.
1. `security`: the random bytes must be generated using `cryptograhpically secure random` algorithms. Many implementations exist for different languages, i.e. the crypto module [for Node.js](https://nodejs.org/api/crypto.html#cryptogetrandomvaluestypedarray) and [JavaScript](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues), [the secrets module for Python](https://docs.python.org/3/library/secrets.html#secrets.token_bytes), etc.
2. `persistence`: the random bytes must be persisted, for the dual operation, i.e. `decryption` to be properly performed with the same bytes. This is achieved by delivering the HTTP response that holds the random bytes, with a [Cache-control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) response header with a `max-age` directive set to the lifetime of the random bytes in the cache. Note that in browsers, the cache where the random bytes are persisted is not the service workers cache, but rather the browser [HTTP cache](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
3. `secracy`: the random bytes must only be accessible to the right service worker they are destined to. Not even same-origin (potentially malicious) scripts running in same-origin other contexts (i.e. web pages, shared and dedicated workers) should have access to the random bytes. This property is achieved by leveraging defensive JavaScript programming, [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) and unforgeable browser properties such as the [Referer header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) and [location](https://developer.mozilla.org/en-US/docs/Web/API/Location) object. 

We have 2 implementations 

## Implementation details


## Examples


## 