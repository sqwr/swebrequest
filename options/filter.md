# Filter 

Filter options serve 2 purposes:
1. to determine if the listener they relate to must be executed. A missing filter or a filter whose value is `null` or `undefined` matches the related property
   - Network state: `online`
   - [Request object properties](https://developer.mozilla.org/en-US/docs/Web/API/Request): `urls, types, modes, types, referers/referrers, methods, clients, clients.urls, clients.types, paths, ?/parameters/search, hash/#`
   - [Response object properties](https://developer.mozilla.org/en-US/docs/Web/API/Response): `rtypes`, `statuses`
2. to pass [runtime options/data/information](runtime.md) to: 
   - [stage listener](../stages.md#addlistener) activation
   - [feature](../features.md#activation) activation
   - [strategy](../strategies.md#activation) activation


Filter options applies to listeners, and can appeared at:
- [addListener](../stages.md#addlistener) method for adding callbacks to stages
- features [definition](../features.md#definition) and [activation](../features.md#activation) 
- strategies [definition](../strategies.md#definition) and [activation](../strategies.md#activation)

| Option | Description | Examples | Wildcard values |
|--|--|--|--|
`online` | a boolean to match the network state of the browser at the moment the related listener is invoked. This `online` filter option makes a lot of sense because SWs can run even when the user's browser is offline. One can leverage this option to execute some features and choose routing strategies depending on the browser network state. | `{online:true}` matches an online browser, and `{ online: false}` an offline browser | N/A
|||
`urls` | a single or array of matching patterns of Request URLs. We use the same syntax as [web extensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns) | `https://*/*`, `https://*.example.com/*` | `<all_urls>`
`types` | a single or array of matching [request types](https://developer.mozilla.org/en-US/docs/Web/API/Request/destination) | `navigate`, `script`, `image` | `<all_types>`
`modes` | a single or array of matching [request modes](https://developer.mozilla.org/en-US/docs/Web/API/Request/mode) | `same-origin`, `cors`, `navigate`, `no-cors` | `<all_modes>`
`clients` |  a single, array or object of matching patterns of Request clients. A single or array is an alias for `clients.urls`. For an object, the properties are `clients.urls` and `clients.types`  | `https://*/*`, `https://*.example.com/*`, `{ urls: '<all_urls>', types: [ 'worker', 'sharedworker' ]}` | `<all_urls>`
`clients.urls` |  a single or array of matching patterns of Request URLs. We use the same syntax as [web extensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns) | `https://*/*`, `https://*.example.com/*` | `<all_urls>`
`clients.types` | a single or array of matchin [client types](https://developer.mozilla.org/en-US/docs/Web/API/Client/type) | `window, worker, sharedworker` | `<all_types>`
`methods` | a single or an array of [request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) | `GET`, `POST`, `PUT` | `<all_methods>`
`referers` | a single or array of matching [request referer](https://developer.mozilla.org/en-US/docs/Web/API/Request/referrer) URL. The values of this option are similar to that of the `urls` filter | `https://*/*`, `https://*.example.com/*` | `<all_urls>`
`origins` | a single or array of token for matchin the [origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin) of the request against that of the service worker | `same-origin` (a request that has the same [origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin) as the service worker); `cross-origin` (a request that does not have the same [origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin) as the service worker),` same-site` (the service worker and the intercepted request are from a same site, i.e. they share a common topsite name, or [eTLD + 1](https://wiki.mozilla.org/Public_Suffix_List). To perform the check, the `topsite` option, `subdomains` (the request is a subdomain (i.e. `sub.example.com`) of the service worker domain (i.e. `example.com`))  | `<all_origins>` |
`topsite` | a string containing the value of a service worker topsite. This option is used in conjunction with the [origins](#origins) `same-site` value. There are libraries such as [Python3 tld](https://pypi.org/project/tld/) or [NPM tld-extract](https://www.npmjs.com/package/tld-extract) that can be used to compute the eTLD of topsites | `example.com` | N/A
`paths` or `/` | a string or array of matching [requests paths](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns#path). The matching patterns are similar to the `urls` matching patterns just for the path part. | `/*`, `/*.html` | `<all_paths>`
`?` or `parameters` or `search` | a string, array or object for matching [requests arguments](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams). The matching arguments can be provided as (i) a string: matching requests must carry that string in their arguments list, the value of the argument is not considered; (ii) an array of string values: matching requests must carry **ALL** the arguments of the provided array; (iii) an object of arguments name/value pairs: matching requests must carry **ALL** the arguments names and their related values must also match the provided ones.
`#` or `hash` | a string or array of matching [request hashes](https://developer.mozilla.org/en-US/docs/Web/API/URL/hash)  provided as (i) a string: matching requests must has that hash in their URL; (ii) an array of string values: matching requests must carry **exactly one** of the provided hashes. 
|||
`rtypes` | a single or array of matching [response types](https://developer.mozilla.org/en-US/docs/Web/API/Response/type) | `basic, cors, opaque, default` | `<all_types>` |
`statuses` or `status` | a code (number), array of (code or array of 2 codes) matching [response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status). (i) single code: matching responses must have the related status code number; (ii) an array of (codes or array of 2 codes): matching responses must have one of the provided status code numbers, or be in the range of an array of 2 codes | `200`, `[200, [300, 399], 403, [500, 505]]` 

### Filter as a function
In case the declarative properties provided above do not meet your needs, you can write your own filter function. If you have additional runtime options to be inclueded in the same `filter` option, you can specify the custom filter function under `filter.func` as shown in the Table below. Otherwise, the whole `filter` option can be specified as a function (with the same signature as `filter.func`). 

| Property | Description | Types / Values | 
--- | --- | --- | 
`func` | define custom filtering logic | `(details: Details) => boolean` returns `true` for matching, and false otherwise |

As one can observe, the filter function is passed the exact same [details](#details.md) as listeners. Unless it is absolutely necessary, one should prefer rather doing the filtering directly within the listener function, and continue its execution is all the conditions of the custom filter functions are met

## Examples
Examples of filters that specify when a listener, feature or strategy is executed.

|||
|--|--|
when the browser is online | `{ online: true }`
navigation requests | `{ modes: 'navigate' }` 
image requests | `{ types: 'image' }` 
responses of manipulable body | `{ rtypes: ['basic', 'default', 'cors' ] }`
same origin requests | `{ origins: 'same-origin' }`
requests with bodies | `{ methods: ['POST', 'PUT' ] }`
successful responses | `{ status: 200 }`