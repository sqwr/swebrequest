# Install


Load `swebRequest` and optional helper modules in the context of the service worker.
```javascript
importScripts("swebRequest.js");
importScripts("swebrequestdomparserloder.js"); // if using the cspnonces or injectscripts features
```


A copy of `swebRequest` and helper modules can be found in [lib](lib/). One can download and place those modules next to the service worker file.
- [swebRequest.js](lib/swebRequest.js): `swebRequest` with all built-in [features](features.md) [strategies](strategies.md)
- [swebrequestdomparserloader.js](lib/swebrequestdomparserloader.js) a convenient module for loading the WASM (first) and NPM (if error) 
DOM parsers
- [swebrequestwasmain.wasm](lib/swebrequestwasmain.wasm): Web Assembly module for parsing and manipulating HTML content. This module must be loaded when using features such as [cspnonces](features.md#cspnonces) and [injectscripts](features.md#injectscripts). This module is based on the [lol_html Rust crate](https://crates.io/crates/lol_html) provided by Cloudflare. The main downside of this module is that it requires the `wasm-unsafe-eval` or `unsafe-eval` token in CSP, if the service worker is delivered with a [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#unsafe_webassembly_execution). 
- [swebrequestcheerio.js](lib/swebrequestcheerio.js): a fallback module for parsing and manipulating HTML content. The WASM based module must be prefered, as it is way more efficient that this one, which is a browserified version of the [Cheerio](https://www.npmjs.com/package/cheerio). The sole advantage of this module is that it does not require modification of CSP, but it is very slow.

Assuming one has gathered a couple of materials in the 
```javascript
let swmanifest = {
  swcookie: "219653f8f86f861b04771892a2f0d42216c1a5fc158396ac0ec0bb07eaec4ecfb1a3620b7079b0a702b09b9caadf05d2ee47629da2dd16071e6a86a5b8eb98fdca3e97478f0a8e67fe275e80f71deb08e063d031f87b0efd642a9ef7418ef60d", 
  randomBytes: "yQL1TPO7aTs5zpEEw+00XN6+kNUMxUSAHoBLNBes5NY=",
  originpolicies: [{
    matches: { modes: ['navigate'] },
    "content-security-policy": "default-src ws: wss: data: blob: http: https: 'unsafe-inline' 'unsafe-eval'; form-action https: http:; frame-ancestors https:;",
    "permissions-policy": "camera=*, geolocation=*, sync-xhr=*, fullscreen=*, microphone=*, midi=*, document-domain=*"
  }, {
    matches: { types: ['sharedworker', 'worker'] },
    "content-security-policy": "default-src 'self' ws: wss: data: blob: http: https: 'unsafe-inline' 'unsafe-eval';",
    "permissions-policy": "sync-xhr=()"
  }],
  requestHeaders: { "x-sw-token" : "219653f8f86f861b04771892a2f0d42216c1a5fc158396ac0ec0bb07eaec4ecfb1a3620b7079b0a702b09b9caadf05d2ee47629da2dd16071e6a86a5b8eb98fdca3e97478f0a8e67fe275e80f71deb08e063d031f87b0efd642a9ef7418ef60d"},
  responseHeaders: { 
    "content-security-policy": "default-src ws: wss: data: blob: http: https: 'unsafe-inline' 'unsafe-eval'; form-action https: http:; frame-ancestors https:;",
    "permissions-policy": "camera=*, geolocation=*, sync-xhr=*, fullscreen=*, microphone=*, midi=*, document-domain=*"
  },
  scriptstoinject: [""]
};
```


## Standalone
```javascript
swebRequest.init({
    encryption: { randomBytes: "r@nd0m3" },
    decryption: { randomBytes: "r@nd0m3" },
    signature: { randomBytes: "r@nd0m3" },
    verification: { randomBytes: "r@nd0m3" },
    originpolicies: { originpolicies: swmanifest.originpolicies },
    cspnonces: null,
    anonymize_xor: null,
    anonymize: null,
    setRequestHeaders: { headers: swmanfiest.requestHeaders },
    setResponseHeaders: { headers: swmanifest.responseHeaders },
    secureswsregistration: null, // securely register the service worker
    randomvalues: {}
    redirect: { redirecTo: "https://anotherlocation.com/" }
    redirectrequests: {},
    proxyrewriterequests: {},
    proxyrewriteresponses: {}, 
    injectscripts: { scriptstoinject: ['https://cdn.com/injectedscript.js'] },  // inject remote script in all pages
    injectscripts: { scriptstoinject: ['alert(1)'], inlinescripts: true }, // inject inline scripts
    timestamp: null,
    timestamp_verify: { timeout: 5 * 60 * 1000 } // refresh cached responses every 5mn
    perfstart: null,
    perfsend: null
}, {
    cacheFirst: null, // cache-first strategy for all by default
    cacheOnly: { online: false  }, // cache only  when offline
    cacheAndRevalidate: { types:  "script", online: true }, // cache and revalidated for scripts
    cacheOrNetwork: { types:  "font", online: true  }, // cache or network response for fonts
    networkOnly: { modes: "navigate", online: true }, // network only if online, for navigation requests

})
```
`swebRequest` usage modes refer to whether one is writing a brand new service worker, or has an existing service worker to be augmented with security and privacy features provided by `swebRequest`, including the particular case when the service worker is writing with [Workbox](https://developer.chrome.com/docs/workbox/).

 good number of service worker events can only be registered once. More precisely, only the first instance of the registration will be considered while the subsequent registrations will be ignored. This is the case for the `install`, `activate` and the `fetch` which we recall is the core of `swebRequest`. 

