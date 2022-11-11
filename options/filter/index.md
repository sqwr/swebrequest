# Filter options

The properties of HTTP [requests](https://developer.mozilla.org/en-US/docs/Web/API/Request), [responses](https://developer.mozilla.org/en-US/docs/Web/API/Response) and [browser network state](https://developer.mozilla.org/en-US/docs/Web/API/Navigator) must match the `filter` option object in order for a related [stage](../../stage/index.md) [listener callback](../../listener/index.md) function to invoked. 

A missing, `undefined` or `null` filter matches all requests and responses. Likewise, a missing, `undefined` or `null` filter property matches the related request, response or browser property, no matter its value.

## Browser network state
##### `online` 
A [boolean](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine) to match the network state of the browser at the moment the related listener is invoked. This `online` filter option makes a lot of sense because service workers can run even when the user's browser is offline. Once can leverage this option to execute some features depending on the network state of the user. Possible values are:
- `true` - matches an online browser
- `false` - matches an offline browser 

## Request properties filter
The options in this category are meant to match the types of requests a `listener` must be invoked on. 

##### `urls`
An [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) of match patterns for specific set of URLs. We use the same syntax as [web extensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns). Possible patterns include:
- `<all_urls>` : matches any request URL
- `https://*/*` :  matches any `https:` request URL
- `https://*.example.com/*` : matches any `https:` request URL from `example.com` and its subdomains


##### `types`
An array of matching [request types](https://developer.mozilla.org/en-US/docs/Web/API/Request/destination). Example types include:
- `<all_types>` :  special type any type of request. Note that this type is specific to `swebRequest`
- `navigate` : matches navigation requests, i.e. requests for HTML documents displayed in browser tabs
- `script` : matches requests that load scripts, i.e. [script tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) in HTML pages
- `image` : matches requests that load images, i.e. [img tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)
- `style` : matches requests that load stylesheets


##### `modes`
An array of matching [request modes](https://developer.mozilla.org/en-US/docs/Web/API/Request/mode). Example modes include. 
- `<all_modes>`: special value which matches all request modes
- `same-origin`: requests of this mode must be made to a same-origin web server. Service workers are allowed to manipulate these requests, including headers and bodies.
- `cors`: requests of this mode are third-party requests expected to adhere to the [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) mechanism. The successful responses can be manipulated by service workers: the body is readable, and the exposed headers depend on 
- `navigate`: matches navigation requests, i.e. requests that load HTML documents in browser tabs. 
- `no-cors`: these requests are restricted when intercepted by service workers. Regarding headers, only [CORS-safelisted](https://developer.mozilla.org/en-US/docs/Glossary/CORS-safelisted_request_header) can be manipulated. However, the resulting responses, usually of [type opaque](https://developer.mozilla.org/en-US/docs/Web/API/Response/type), cannot be manipulated. 


##### `methods`
An array of [request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods). Examples include:
- `<all_methods>`: special value that matches all methods
- `GET`: common types of requests, without any body
- `POST`: requests that can carry a body
- etc.

##### `referers`
An array of matching [request referer](https://developer.mozilla.org/en-US/docs/Web/API/Request/referrer) URL.
The values of this option are similar to that of the [urls](#urls) option.

##### `origins`
An array of token for matchin the [origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin) of the request against that of the service worker. Possible values are:
- `<all_origins>`: special value that matches all origins
- `same-origin`: a request that has the same [origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin) as the service worker
- `cross-origin`: a request that does not have the same [origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin) as the service worker
- `subdomains`: the request is a subdomain (i.e. `sub.example.com`) of the service worker domain (i.e. `example.com`)
- `same-site`: the service worker and the intercepted request are from a same site, i.e. they share a common topsite name, or [eTLD + 1](https://wiki.mozilla.org/Public_Suffix_List). To perform the check, the [topsite](#topsite) option.

#### `topsite`
A string containing the value of a service worker topsite. This option is used in conjunction with the [origins](#origins) `same-site` value. There are libraries such as [Python3 tld](https://pypi.org/project/tld/) or [NPM tld-extract](https://www.npmjs.com/package/tld-extract) that can be used to compute the eTLD of topsites

##### `/`
A string or array of matching [requests paths](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns#path). The matching patterns are similar to the [urls](#urls) matching patterns just for the path part.
- a string: matching requests must have that path in their URL
- an array of string: matching requests must have at least one of their provided paths in their URLs.

##### `?`
A string, array or object for matching [requests arguments](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams). The matching arguments can be provided as:
- a string: matching requests must carry that string in their arguments list, the value of the argument is not considered
- an array of string values: matching requests must carry **ALL** the arguments of the provided array
- an object of arguments name/value pairs: matching requests must carry **ALL** the arguments names and their related values must also match the provided ones.

##### `#` 
A string or array of matching [request hashes](https://developer.mozilla.org/en-US/docs/Web/API/URL/hash)  provided as:
- a string: matching requests mustch has that hash in their URL
- an array of string values: matching requests must carry **exactly one** of the provided hashes.


## Response properties filter
Filter options for matching [responses properties](https://developer.mozilla.org/en-US/docs/Web/API/Response)
##### `rtypes`
An array of matching [response types](https://developer.mozilla.org/en-US/docs/Web/API/Response/type). Examples types include:
- `<all_types>`: special value matching all response types
- `default`: [responses constructed](https://developer.mozilla.org/en-US/docs/Web/API/Response/Response) by service workers: they can be freely manipulated. 
- `basic`: same-origin responses, whose headers and bodies are freely manipulable by service workesr
- `cors`: CORS-compliant responses: their bodies can be manipulated, and their headers according to the [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) mechanism.
- `opaque`: cross-origin responses of types `no-cors`: they are restricted and cannot be manipulated by service workers. 


##### `statuses`
A code (number), array of (code or array of 2 codes) matching [response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- a single code: matching responses must have the related status code number, i.e. `200`
- a array of (codes or array of 2 codes): matching responses must have one of the provided status code numbers, or be in the range of an array of 2 codes, i.e. [200, [300, 399], 403, [500, 505]]

## Examples

```javascript
{
	urls: 
}
```

## See also
- [runtime options](../runtime/index.md)
- [xfilter options](../xfilter/index.md)
