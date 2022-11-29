# Filter options



## Matching options

### Request properties options
Optional options for filtering requests

| Property | Description | Types / Values | 
--- | --- | --- | 
`urls` | string or array of [matching request URLs patterns](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns) | `"<all_urls>"` (matches all), `"*://*.example.com/*.html"`, ... |
`types` | string or array of matching [request types](https://developer.mozilla.org/en-US/docs/Web/API/Request/destination) | `"<all_types>"` (matches all), `"document"`, `"script"`, `"image"`, `"style"`, etc. | 
`modes` | string or array of matching [request modes](https://developer.mozilla.org/en-US/docs/Web/API/Request/mode) | `"<all_modes>"` (matches all), `"navigate"`, `"same-origin"`, `"cors"`, `"no-cors"` |
`origins` | string or array of matching request origin, as compared to the service worker origin | `"<all_origins>"` (matches all), `"same-origin"`, `"cross-origin"`, `"subdomains"`, `"same-site"` (this option must be complemented with a `topsite` option, a string specifying the [topsite or effective TLD + 1](https://wiki.mozilla.org/Public_Suffix_List) to be compared to) | 
`methods` | string or array of matching [request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) | `"<all_methods>"` (matches all), `"GET"`, `"POST"`, `"PUT"`, etc.
`/` | string or array of matching [request URL pathnames](https://developer.mozilla.org/en-US/docs/Web/API/URL/pathname) | `"<all_paths>"` (matches all), `"/*.html"`, `"/*.js"`, `"/*.png"`
`#` | string or array of matching [request URL hashes](https://developer.mozilla.org/en-US/docs/Web/API/URL/hash) | `"<all_hashes"` (matches all), `"value"`, ...
`?` | string, array or literal object of matching [request parameter names and values](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams) | `"func"`, `[ "func", "r", "q" ]`, `{ func: "eval" }`, etc.
`clients` | string, array or literal object of [matching clients URL](https://developer.mozilla.org/en-US/docs/Web/API/Client/url) and [types](https://developer.mozilla.org/en-US/docs/Web/API/Client/type) | `"<all_urls>"` (matches all), `"*://*.example.com/*"`, `{ urls: "*://*.example.com/*", types: ["window", "worker"] }` |
`clients.urls` | string or array of [matching clients URL](https://developer.mozilla.org/en-US/docs/Web/API/Client/url) | `"<all_urls>"` (matches all), `"*://*.example.com/*"`
`clients.types` | string or array of [matching clients types](https://developer.mozilla.org/en-US/docs/Web/API/Client/type) | `"<all_types>"` (matches all), `"window"`, `"worker"`, `"sharedworker"`
`referers` | string or array of matching [request referers](https://developer.mozilla.org/en-US/docs/Web/API/Request/referrer) | `"<all_urls>"` (matches all), `"*://*.example.com/*.html"`, ... | 


### Response properties options

| Property | Description | Types / Values | 
--- | --- | --- |
`rtypes` | string or array of matching response types | `"<all_types>"` (matches all), `"basic"`, `"cors"`, `"opaque"`, `"default"`
`statuses` | number or array of matching response statuses | `200`, `[ 400, 599 ]`, `[ 200, [ 300, 399 ] ]` etc.



### Network state options

| Property | Description | Types / Values | 
--- | --- | --- | 
`online` | [browser network state](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine) | `true` for online and `false` for `offline`


### Filter as a function

| Property | Description | Types / Values | 
--- | --- | --- | 
`func` | define custom filtering logic | `(details: Details) => boolean` returns `true` for matching, and false otherwise |


## Runtime options

### Cache storage options

| Property | Description | Types / Values | 
--- | --- | --- | 
`caches` | string or array of cache names to access | `"v1"`, `["assets", "v2"]`, etc. |
`assets` | array of request (URLs or objects) to precache | `[ "/", "/main.js", new Request("/main.css") ]` |
`storage` | string of type cache | `"cache"` for the [cache](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage) and `"indexedDB"` for [indexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB)

### Network fetch options

| Property | Description | Types / Values | 
--- | --- | --- |
`timeout` | number in milliseconds to be used when making fetch | `2000` (2 seconds), `10000` (10 seconds) |
`navigationPreload` | boolean to enable navigation preload, and used preloaded response | `true` or `false` |



### Features options

| Property | Description | Types / Values | 
--- | --- | --- | 


## Filter as a function
