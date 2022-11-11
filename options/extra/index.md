# Extra options
An array of strings (tokens), primarily meant to:
- augment the [details](../../details/index.md) object passed to [listeners](../../listener/index.md) with serialized request and response headers and bodies. 
- provide properties to be included in the object `return`ed by [listener callbacks](../../listener/index.md)
- name features to be enabled


## Augmenting the [details](../../details/index.md) parameter of [listener callbacks](../../listener/index.md)
The tokens in this category are properties that a listener expect to be included in the [details](../../details/index.md) object passed to it as argument when the listener callback function is invoked.


##### `requestHeaders`
> The request [headers](https://developer.mozilla.org/en-US/docs/Web/API/Request/headers) will be serialized as an object literal with String values and included in [details](../../details/index.md) under `details.requestHeaders`


##### `responseHeaders`
> The response [headers](https://developer.mozilla.org/en-US/docs/Web/API/Response/headers) will be serialized as an object literal with String values and included in [details](../../details/index.md) under `details.responseHeaders` 


##### `requestBody[=bodyType]`
> The request [body](https://developer.mozilla.org/en-US/docs/Web/API/Request/body) will be serialized and included in [details](../../details/index.md) under `details.requestBody`. The possible values for the optional [bodyType](https://developer.mozilla.org/en-US/docs/Web/API/Request#instance_methods), which defaults to `text`, are:
- `text`: a [text](https://developer.mozilla.org/en-US/docs/Web/API/Request/text) representation of the request body. This is the **default value** for `bodyType`, and is particularly suitable for HTML documents.
- `arrayBuffer`: an [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/API/Request/arrayBuffer) representation of the request body. This representation is very conservative, and should be prefered when manipulating request bodies.
- `json`: a [JSON](https://developer.mozilla.org/en-US/docs/Web/API/Request/json) representation of the request body, provided that the request body can be parsed into a JSON object. 
- `formData`: a [FormData](https://developer.mozilla.org/en-US/docs/Web/API/Request/formData) representation of the request body
- `blob`: a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Request/blob) representation of the request body

##### `responseBody[=bodyType]`
> The response [body](https://developer.mozilla.org/en-US/docs/Web/API/Response/body) will be serialized and included in [details](../../details/index.md) under `details.responseBody`. The possible values for the optional [bodyType](https://developer.mozilla.org/en-US/docs/Web/API/Response#instance_methods), which defaults to `text`, are:
- `text`: a [text](https://developer.mozilla.org/en-US/docs/Web/API/Response/text) representation of the response body. This is the **default value** for `bodyType`, and is particularly suitable for HTML documents.
- `arrayBuffer`: an [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/API/Response/arrayBuffer) representation of the response body. This representation is very conservative, and should be prefered when manipulating response bodies.
- `json`: a [JSON](https://developer.mozilla.org/en-US/docs/Web/API/Response/json) representation of the response body, provided that the response body can be parsed into a JSON object. 
- `formData`: a [FormData](https://developer.mozilla.org/en-US/docs/Web/API/Response/formData) representation of the response body
- `blob`: a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Response/blob) representation of the response body


## Augmenting the [details](../../details/index.md) return objects of [listener callbacks](../../listener/index.md)
The tokens in this category are properties that will be included in the [details](../../details/index.md)  object returned by a listener callback function after its executation.

##### `next=stage`
> The 

##### `cancel`


##### `non-blocking`


##### `parallels`


## Properties to be included in listener's returned object 

