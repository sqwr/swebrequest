# Origin Policies

This document discusses more in details the the format of origin policies set in the [originpolicies feature](../features/originpolicies.md).


## Supported headers
There is no limitations on the headers that can be part of a [well-formed origin policy](../utils/originpolicies.md). We list here common security policies that can be meaningfully deployed by service workers. 

||| 
|--|--| 
`content-security-policy` | [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) is a defense-in-depth mechanism against XSS and content injection attacks, frame-busting, etc.
`referrer-policy` | The [Referrer-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy) header definies the value of the [referer](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) header
`feature-policy` | Restrict [browser features](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy) that your application and its iframes can use
`permissions-policy` | new header name for `feature-policy`
`x-frame-options` | defines whether [pages can be framed](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options). The `frame-ancestors` directive of the CSP header should be used instead
`cross-origin-embedder-policy` | [COEP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy) 
`cross-origin-opener-policy` | [COOP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy)


Security policies that are meaningless in service workers include:
||| 
|--|--| 
`set-cookie` | ignored by browsers if set by service workers. This header is neither [accessible to service workers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie) or any other JavaScript
`strict-transport-security` | [HSTS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security) meaningless in service workers, because they already execute in secure contexts.
CORS headers | N/A because third party cross-origin requests go through the third party service worker (if it exists), and not from the CORS origin service worker, even though that origin has a service worker in the browser.



## Format
The format of origin policies is an array whose items are object literal containing security headers name/value pairs, and with optional filtering options, i.e. requests/responses to which the policies should be added. 

||||
|--|--|--|
`header` | security header name associated to its value. Many policy headers can appear within an origin policy item.
`matches` | optional matching requests URLs or requests and responses [filter options](../options/filter.md)
`filter`  | optional matching [filter options](../options/filter.md) for requests and responses. 
`exclude_matches` | optional **non** matching requests URLs or requests responses [filter options](../options/filter.md)
`xfilter` | optional **non** matching [filter options](../options/filter.md) for requests and responses 

## Examples
```javascript
[{
    matches: { modes: ['navigate'] },
    "content-security-policy": "default-src ws: wss: data: blob: http: https: 'unsafe-inline' 'unsafe-eval'; form-action https: http:; frame-ancestors https:;",
    "permissions-policy": "camera=*, geolocation=*, sync-xhr=*, fullscreen=*, microphone=*, midi=*, document-domain=*",
    "x-frame-options": "sameorigin",
    "referrer-policy": "same-origin"
  }, {
    matches: { types: ['sharedworker', 'worker'] },
    "content-security-policy": "default-src 'self' ws: wss: data: blob: http: https: 'unsafe-inline' 'unsafe-eval';",
    "permissions-policy": "sync-xhr=()"
  }, {
    "content-securit-policy-report-only": "default-src 'none'; report-uri /cspreports.json"
}]
```
The reader familiar with browser extensions can observe that this format is similar to [content scripts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/content_scripts) of web extensions.

In the first policy item, navigation respones will be set a CSP, feature policy, x-frame-options and referrer-policy headers. The second policy item also set but a different CSP and feature policy header to shared and dedicated workers responses. Finally, the third policy item sets an report-only CSP header to all same-origin responses.

## Multiple policies
When  multiple policy items match a request/responses, all the matching policies will be appended to the responses many times.
For CSP, the result of enforcing multiple policies is to take the intersection of all of them. For Referrer-policy, the [last supported policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy#specify_a_fallback_policy) in a comma-separated listed of policies, is enforced.



