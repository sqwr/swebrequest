# CSP Nonces
For security reasons, the CSP specification requires nonces:
- be unique and fresh for each request
- be at least 128-bits long before encoding
- be generated with cryptographically secure random bytes generators

In fact, an attacker that obtains a nonce can use it to execute malicious code. 
The `cspnonces` feature generates secure nonces to address the following issues:
- globally static nonces: a web framework uses static nonces for many different web sites
- static nonces: a web server sets the same nonce for a web page
- session-based nonces: nonces are custom for user, but do not change for a single user
- intermediate proxies and CDNs: a website user a proxy or CDN which caches responses with nonces
- nonces cached by service workers: nonces are cached by a service worker

## DOMParsing
CSP nonces are both present in the `content-security-policy` header as well as the HTML response body. To replace CSP nonces on the DOM, if string-replacing old nonces would have been efficient, it is potentially error-prone. DOM-parsing is the best solution for replacing nonces in the DOM. Unfortunately, service workers neither have a DOM nor do they have access to a native DOMParser. Ultimately, we resolved to a third party DOM parser. After experimenting with a couple of Node.js parsers such [JSDOM]() or [Cheerio](), we resolve

## 

## Examples

## Implementation details
CSP nonc

## Disclaimer
Does not protect you against dangling and other 
