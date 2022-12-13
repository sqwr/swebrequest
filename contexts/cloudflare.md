# Cloudflare workers
Cloudflare workers implement the SWs API, making it possible to write workers with `swebRequest`, and use its features. The [NPM package](https://www.npmjs.com/package/@serviceworkers/swebrequest) version of `swebRequest`, named `@serviceworkers/swebrequest` should be used. See [Cloudflare worker](https://developers.cloudflare.com/workers/) documentation on to configure and write Cloudflare workers. We have deployed 2 Cloudflare workers leveraging the `randomvalues`, `proxyrewriterequests` and `proxyrewriterequests` features. 



## Generate randomvalues
The whole code that deploys the [randomvalues](../features/randomvalues.md) feature within a Cloudflare worker takes only a handful lines of codes. 

```javascript
import * as swr from '@serviceworkers/swebrequest'
console.log(swr); // very important in order to have swebRequest in the globalThis
// @ts-ignore
const swebRequest = globalThis.swebRequest || {}
swebRequest.init({ randomvalues: null })
```
We have effectively deployed a Cloudflare worker  at `randomvalues.sqwr.workers.dev`. See [how to leverage this worker to serve the random bytes for your SW](../utils/randombytes.md)
Here is a quick way to load the random bytes

```javascript
importScripts('https://randomvalues.sqwr.workers.dev/?origin=' + encodeURIComponent(location.origin) + '/&href=' + encodeURIComponent(location.href))
```


## Cloudflare Workers as programmable CDNs
The [swebRequest library and helper modules](../lib/) hosted on Github are made proxied through a Cloudflare worker in a high performance programmable CDN. The resources will be cached by the workers, and quickly served by clients (browsers) invoking them. The worker is deployed at `https://swebrequest.sqwr.workers.dev/`.
Here is the whole code of this worker. 

```javascript
import * as swr from '@serviceworkers/swebrequest'
console.log(swr); // very important in order to have swebRequest in the globalThis
// @ts-ignore
const swebRequest = globalThis.swebRequest || {}
const rewriteproxyFilterOptions = {
    backHost: 'https://raw.githubusercontent.com/sqwr/swebrequest/main/lib/',
    hostedContent: {
        'swebRequest.js': 'application/javascript',
        'swebrequestcheerio.js': 'application/javascript',
        'swebrequestwasmloader.js': 'application/javascript',
        'swebrequestwasmain.wasm': 'application/wasm',
        'swebrequestdomparserloader.js': 'application/javascript',
        'swrclient.js': 'application/javascript'
    }
}
swebRequest.init({
    proxyrewriterequests: rewriteproxyFilterOptions,
    proxyrewriteresponses: rewriteproxyFilterOptions
})
```
The `backHost` defines the location of the resources in the back end (here on Github). Then it is very important to indicate the MIME types of the resources hosted on the backend. Most of our resources are JavaScript files, and a WASM module. Finally:
- the `proxyrewriterequests` feature receives the requests sent by the service workers in browsers, i.e. `https://swebrequest.sqwr.workers.dev/swebRequest.js`. The request is rewritten (the request path) is simply appended to the back end host URL, i.e. `https://raw.githubusercontent.com/sqwr/swebrequest/main/lib/swebRequest.js`. The request is then sent to the back end to download the resource. 
- the `proxyrewriteresponses` feature receives the response sent back by the back end server. Its main purpose is to set the content type that corresponds to the proxied resource. This feature fixes and uses the content type specified in its runtime options. This guards against potential security issues that have been described in the [cache and confused paper](https://www.usenix.org/system/files/sec20-mirheidari.pdf)

Since `swebRequest` is used in standalone mode, the proxied resources are automatically cached, and served from the cache if available. 

|||
|--|--|
`https://swebrequest.sqwr.workers.dev/swebRequest.js` | loading [swebRequest.js](../lib/swebRequest.js) via Cloudflare Worker
`https://swebrequest.sqwr.workers.dev/swebrequestdomparserloader.js` | loading [swebrequestdomparserloader.js](../lib/swebrequestdomparserloader.js) via Cloudflare Worker
`https://swebrequest.sqwr.workers.dev/swrclient.js` | loading [swrclient.js](../lib/swrclient.js) via Cloudflare Worker
`https://swebrequest.sqwr.workers.dev/swebrequestcheerio.js` | loading [swebrequestcheerio.js](../lib/swebrequestcheerio.js) via Cloudflare Worker
`https://swebrequest.sqwr.workers.dev/swebrequestwasmloader.js` | loading [swebrequestwasmloader.js](../lib/swebrequestwasmloader.js) via Cloudflare Worker
`https://swebrequest.sqwr.workers.dev/swebrequestwasmain.wasm` | loading [swebrequestwasmain.wasm](../lib/swebrequestwasmain.wasm) via Cloudflare Worker


Here is how to import `swebRequest.js` via the Cloudflare Worker. 
```javascript
importScripts("https://swebrequest.sqwr.workers.dev/swebRequest.js")
```