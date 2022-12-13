# CORS-Safelisted headers

CORS-salisted [request](https://developer.mozilla.org/en-US/docs/Glossary/CORS-safelisted_request_header) and [response](https://developer.mozilla.org/en-US/docs/Glossary/CORS-safelisted_response_header) headers are headers that can be manipulated, both on same-origin and cross-origin requests. In particular, those headers can be manipulated on CORS requests without triggering side-effects such as [preflights](https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request). 


In `swebRequest`, we leveraged those headers to implement crypto features such as [encryption](../features/encryption.md), [decryption](../features/decryption.md) but also with the [timestamp](../features/timestamp.md) feature to store time information. These are [last-modified](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Last-Modified) and [content-language](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Language). 


| CORS-safelisted header | Features |
|--|--|
`last-modified` | [encryption](../features/encryption.md), [decryption](../features/decryption.md), [signature](../features/signature.md), [verification](../features/verification.md)
`content-language` | [timestamp](../features/timestamp.md), [timestamp_verify](../features/timestamp_verify.md)

## Security considerations

At the level of service workers, changing the values of those headers cause no harms to the app. In fact, the `last-modified` header is honored for responses stored in the browser HTTP cache, but is ignored when the response is stored in the service worker cache. 

For the `content-language` header, it is the request one that is changed, and not the one in the response, so there is no effect on the application. 


## See also
- [encryption](../features/encryption.md)
- [decryption](../features/decryption.md)
- [signature](../features/signature.md)
- [verification](../features/verification.md)
- [timestamp](../features/timestamp.md)
- [timestamp_verify](../features/timestamp_verify.md)
