# Extra options
An array of strings (tokens), primarily meant to:
- augment the [details](../../details/index.md) object passed to [listeners](../../listener/index.md) with serialized request and response headers and bodies. 
- specify properties that should be included in the object `return`ed by [listener callbacks](../../listener/index.md)
- name features to be enabled


## Augmenting the [details](../../details/index.md) parameter of [listener callbacks](../../listener/index.md)
The tokens in this category are properties that a listener expect to be included in the [details](../../details/index.md) object passed to it as argument when the listener callback function is invoked.
- `requestHeaders`: The request [headers](https://developer.mozilla.org/en-US/docs/Web/API/Request/headers) will be serialized as an object literal with String values and included in [details](../../details/index.md) under `details.requestHeaders`
- `responseHeaders`: the response [headers](https://developer.mozilla.org/en-US/docs/Web/API/Response/headers) will be serialized as an object literal with String values and included in [details](../../details/index.md) under `details.responseHeaders` 
- `requestBody[=bodyType]`: the request [body](https://developer.mozilla.org/en-US/docs/Web/API/Request/body) will be serialized and included in [details](../../details/index.md) under `details.requestBody`. The possible values for the optional [bodyType](https://developer.mozilla.org/en-US/docs/Web/API/Request#instance_methods), which defaults to `text`, are:
	- `text`: a [text](https://developer.mozilla.org/en-US/docs/Web/API/Request/text) representation of the request body. This is the **default value** for `bodyType`, and is particularly suitable for HTML documents.
	- `arrayBuffer`: an [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/API/Request/arrayBuffer) representation of the request body. This representation is very conservative, and should be prefered when manipulating request bodies.
	- `json`: a [JSON](https://developer.mozilla.org/en-US/docs/Web/API/Request/json) representation of the request body, provided that the request body can be parsed into a JSON object. 
	- `formData`: a [FormData](https://developer.mozilla.org/en-US/docs/Web/API/Request/formData) representation of the request body
	- `blob`: a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Request/blob) representation of the request body
- `responseBody[=bodyType]`: the response [body](https://developer.mozilla.org/en-US/docs/Web/API/Response/body) will be serialized and included in [details](../../details/index.md) under `details.responseBody`. The possible values for the optional [bodyType](https://developer.mozilla.org/en-US/docs/Web/API/Response#instance_methods), which defaults to `text`, are:
	- `text`: a [text](https://developer.mozilla.org/en-US/docs/Web/API/Response/text) representation of the response body. This is the **default value** for `bodyType`, and is particularly suitable for HTML documents.
	- `arrayBuffer`: an [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/API/Response/arrayBuffer) representation of the response body. This representation is very conservative, and should be prefered when manipulating response bodies.
	- `json`: a [JSON](https://developer.mozilla.org/en-US/docs/Web/API/Response/json) representation of the response body, provided that the response body can be parsed into a JSON object. 
	- `formData`: a [FormData](https://developer.mozilla.org/en-US/docs/Web/API/Response/formData) representation of the response body
	- `blob`: a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Response/blob) representation of the response body


## Augmenting the [details](../../details/index.md) return objects of [listener callbacks](../../listener/index.md)
The tokens in this category are properties that will be included in the [details](../../details/index.md)  object returned by a listener callback function after its executation.
- `next=stage`: 
	- `details.next = "stage"` is added in the returned object
- `cancel`
	- `details.cancel = true` is added in the returned object
- `parallels=stage1,stage2,...,stageN`:
	- `details.parallels = ["stage1", "stage2", ..., "stageN"]` is added in the returned object


## Asynchronous execution of the [listener callback](../../listener/index.md)
- `non-blocking`: callback will be executed asynchronously, its result will not be waited for, before executing the next callback of the stage.

## Names of features to be enabled
- `feature`: name any feature to be enabled. Be mindful that, if the feature requires runtime options, they must be included in the [filter options](../filter/index.md) of the [addition](../../stages/methods/addListener/index.md) of the callback

## Examples
> Serialized request headers, response headers and response body will be added to the `details` parameter object passed to the callback function. 
```javascript
["requestHeaders", "responseHeaders", "responseBody=arrayBuffer"]
```

> Jump to the `onBeforeFetchRequest` stage to execute its callbacks, and concurrently handle the `onBeforeCacheMatch` stage and its callbacks. 
```javascript
["next=onBeforeFetchRequest", "parallels=onBeforeCacheMatch"]
```

> Enable the `cspnonces`, `anonymize_xor` features
```javascript
["cspnonces", "anonymize_xor"]
```

> Abort the next listeners and stages and jump to the final stage of the event
```javascript
["cancel"]
```

## See also
- [addListener](../../stages/methods/addListener/index.md)
- [features](../../features/index.md)
- [stages](../../stages/index.md)
- [filter options](../filter/index.md)
- [listener](../../listener/index.md)