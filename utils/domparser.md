# DOM Parser
There is no native [DOM Parser](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser) in service workers context. Therefore, the [cspnonces](../features/cspnonces.md) and [injectscripts](../features/injectscripts.md) that manipulate HTML content have to load an external library for doing DOM manipulation.

| DOM Parser | Description | Module |
|--|--|--|
`WASM` | This DOM parser uses the [Rust lol_html](https://crates.io/crates/lol_html) crate provided by Cloudflare. We have implemented functions for injecting scripts in web pages and refreshing csp nonces. Then, compiled the result into Web Assembly module that can be loaded in browsers and on the edge | [swebrequestwasmain.wasm](../lib/swebrequestwasmain.wasm)
`Cheerio` | This DOM parser uses the [NPM Cheerio](https://github.com/cheeriojs/cheerio) module, one of the fastest JavaScript DOM parser. | [swebrequestcheerio.js](../lib/swebrequestcheerio.js)

CSP nonces are generated with [crypto.getRandomValues](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues) when Cheerio is used, and with [Rust rand](https://crates.io/crates/rand). The generated nonces are 96 bytes long before encoding. This is 6x more than what the [CSP specification](https://www.w3.org/TR/CSP3/#security-considerations) recommends. 
 

## Security and performance considerations
The `WASM` module is ~10x faster than `Cheerio`. So we recommend the `WASM` module to the extent possible. There is a convenient [dom parser loader module](../lib/swebrequestdomparserloader.js) for attempting to load first the `WASM` module, and only falling back to the `Cheerio` one in case of an issue. 

However, compiling and executing WASM modules in Chromium-browsers require CSPs to be relaxed, with at least the `wasm-unsafe-eval` or in the worst case, the `unsafe-eval` token. So if your service worker has a CSP, consider adding the `wasm-unsafe-eval` token to it (or in the worst case the `unsafe-eval` token). Browsers such as Safari or Firefox do not have such a requirement. See [MDN discussion](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#unsafe_webassembly_execution) on this topic. 
