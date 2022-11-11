# Details
Object passed to listener callback functions. 
- properties related to requests and response objects
- 

## Properties related to requests and response objects
Requests and response objects are presents in [fetch](../stages/fetch/index.md)

##### `request`
> The raw [request object](https://developer.mozilla.org/en-US/docs/Web/API/Request) object, accessible under `details.request`


##### `url`
> The request [url](https://developer.mozilla.org/en-US/docs/Web/API/Request/url) string, accessible under `details.url`


##### `response`
> The raw [response object](https://developer.mozilla.org/en-US/docs/Web/API/Response) object, accessible under `details.response`

##### `responseHeaders`
> The serialized response [headers](https://developer.mozilla.org/en-US/docs/Web/API/Response/headers), accessible under `details.responseHeaders`. Note that by default, the `responseHeaders` in only included in the `details` object, unless the `responseHeaders` [extra option](../options/extra/index.md) was provided when the listener is 

##### `requestHeaders`


##### `filter`


##### `data`


##### `event`


##### `phase`


##### `extra_options`


##### ``