# Extra options

These options serve to augment listeners parameters with additional properties, as shortcut for enabling features, and routing listeners, or to specify if listeners should be executed asynchronously. We refer to the extra options objects as `extra_options` or `extra`, and to their types as `ExtraOptions` or `Extra`. 
Extra options can be provided when, adding [listeners to stages](../stages.md#addlistener), [defining features](../features.md#definition), [defining strategies](../strategies.md#definition)



| Option | Description | Examples |
|--|--|--|
`responseHeaders` | means that the listener expects the response headers to be serialized - as an object literal of header names/values pairs - and included in its [details parameter](details.md#parameter). The serialized headers will accessed in the listener under the `details.responseHeaders` property. | `responseHeaders` |
`requestHeaders` | means that the listener expects the request headers to be serialized - as an object literal of header names/values pairs - and included in its [details parameter](details.md#parameter). The serialized headers will accessed in the listener under the `details.requestHeaders` property | `requestHeaders` |
`responseBody` | that the listener expects the response body to be serialized and included in its [details parameter](details.md#parameter). The serialized body will accessed in the listener under the `details.responseBody` property. By default (`responseBody`), the response body is serialized into its [textual representation](https://developer.mozilla.org/en-US/docs/Web/API/Response/text). | `responseBody=text`, `responseBody=arrayBuffer`, `responseBody=json`, `responseBody=blob`, `responseBody=formData` for the [default textual](https://developer.mozilla.org/en-US/docs/Web/API/Response/text), [arrayBuffer](https://developer.mozilla.org/en-US/docs/Web/API/Response/arrayBuffer), [json](https://developer.mozilla.org/en-US/docs/Web/API/Response/json), [blob](https://developer.mozilla.org/en-US/docs/Web/API/Response/blob) or [formData](https://developer.mozilla.org/en-US/docs/Web/API/Response/formData) representation of the response body. 
`requestBody` | that the listener expects the request body to be serialized and included in its [details parameter](details.md#parameter). The serialized body will accessed in the listener under the `details.requestBody` property. By default (`requestBody`), the request body is serialized into its [textual representation](https://developer.mozilla.org/en-US/docs/Web/API/Request/text). | `requestBody=text`, `requestBody=arrayBuffer`, `requestBody=json`, `requestBody=blob`, `requestBody=formData` for the [default textual](https://developer.mozilla.org/en-US/docs/Web/API/Request/text), [arrayBuffer](https://developer.mozilla.org/en-US/docs/Web/API/Request/arrayBuffer), [json](https://developer.mozilla.org/en-US/docs/Web/API/Request/json), [blob](https://developer.mozilla.org/en-US/docs/Web/API/Request/blob) or [formData](https://developer.mozilla.org/en-US/docs/Web/API/Request/formData) representation of the response body. 
||||
`next` | specify the next [STAGE](../stages.md) to jump after the the execution of the current listener. | `next=onRequestCompleted`, `next=onBeforeFetchRequest`, `next=onBeforeCacheMatch` |
`parallels` | option is used to specify next [STAGES](../stages.md) to be executed concurrently next | `parallels=onBeforeCachePut` |
`cancel` | jump to the final stage of an `event`. Equivalent to `next=onRequestCompleted` for the [fetch event](../events/fetch.md) | `cancel` |
`non-blocking` | mandates that the listener be executed asynchronously, and not synchronously (as done by default). In other words, the result of the execution of the listener will not be considered, not even waited for in order to handle subsequent listeners. 
`FEATURE` | name of feature to enable | `encryption`, `decryption`, `signature`, `verification` | 


## Examples
|||
|--|--|
require response headers | `["responseHeaders"]` |
require response headers and response body representation as arrayBuffer | `["responseHeaders", "responseBody=arrayBuffer"]`
specify next stage to jump to | `[ "next=onRequestCompleted" ]` 
specify parallel stages | `[ "parallels=onBeforeFetchRequest" ]`
cancel requests and jump to the final `onRequestCompleted` stage | `[ "cancel" ]`

## See also

