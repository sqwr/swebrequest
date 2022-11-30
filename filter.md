# Filter options

Filter options are primarily meant to 

We refer to the filter options objects as `filter` or `filter_options` and to their types as `Filter` or `FilterOptions`.


## Matching options
Before executing a listener, the filter options in this category are checked against the listener [parameter](details.md#parameter). For listeners that handle requests and responses, many filter options can be declaratively used to specify matching patterns. For other types of listeners, a custom filter function can be provided to decide on whether the listener should be executed or not. Notably, as service workers execute even offline, there is the special `online` option to  


### Request properties options
Optional options for filtering requests. These properties are meaningful to listeners that manipulate requests objects, in particular those of the fetch stages. These filter options are matched against the listener `details.request` properties. 

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
These properties can be provided to filter listeners that manipulate response objects, as they are included in the listener `details.response` paramater. Mind the `rtypes` for response types, as `types` was already used for request types.  

| Property | Description | Types / Values | 
--- | --- | --- |
`rtypes` | string or array of matching response types | `"<all_types>"` (matches all), `"basic"`, `"cors"`, `"opaque"`, `"default"`
`statuses` | number or array of matching response statuses | `200`, `[ 400, 599 ]`, `[ 200, [ 300, 399 ] ]` etc.



### Network state options
Service workers work even when the user browser is offline. One can use this filter option to decide whether a listener is executed or not depending on the network stage. 

| Property | Description | Types / Values | 
--- | --- | --- | 
`online` | [browser network state](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine) | `true` for online and `false` for `offline`


### Filter as a function
In case the declarative properties provided above do not meet your needs, you can write your own filter function.
If you have additional runtime options to be inclueded in the same `filter` option, you can specify the custom filter function under `filter.func` as shown in the Table below. Otherwise, the whole `filter` option can be specified as a function (with the same signature as `filter.func`). 

| Property | Description | Types / Values | 
--- | --- | --- | 
`func` | define custom filtering logic | `(details: Details) => boolean` returns `true` for matching, and false otherwise |

As one can observe, the filter function is passed the exact same [details](#details.md) as listeners. Unless it is absolutely necessary, one should prefer rather doing the filtering directly within the listener function, and continue its execution is all the conditions of the custom filter functions are met.

## Runtime options
Filter options represent the mechanism by which runtime options are passed to listeners. Indeed, as all filter options are added to the [details.filter](details.md#runtime-properties) of listener parameters, one can add custom options to filters and recover them at runtime under `details.filter`

### Cache storage options

| Property | Description | Types / Values | 
--- | --- | --- | 
`caches` | string or array of cache names to access | `"v1"`, `["assets", "v2"]`, etc. |
`assets` | array of request (URLs or objects) to precache | `[ "/", "/main.js", new Request("/main.css") ]` |
`storage` | string of type cache | `"cache"` for the [cache](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage) and `"indexedDB"` for [indexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB)

### Network fetch options
Making [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) requests with options. `swebRequest`
| Property | Description | Types / Values | 
--- | --- | --- |
`timeout` | number in milliseconds to be used when making fetch | `2000` (2 seconds), `10000` (10 seconds) |
`navigationPreload` | boolean to enable navigation preload, and used preloaded response | `true` or `false` |



## Filter as a function

| Property | Description | Types / Values | 
--- | --- | --- |
`func` |  a custom function that returns a boolean to indicate a match | `(details: Details) => boolean` |

The `filter` option can be an object with the properties described above. 

### Features options

| Property | Description | Types / Values | 
--- | --- | --- | 
