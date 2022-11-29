# Extra options

These options, which we refer to as `extra_options` or `extra` serve to augment listeners parameters with additional properties, as shortcut for enabling features, and routing listeners, or to specify if listeners should be executed asynchronously. 
Extra options can be provided when:
- adding listeners to stages
- defining features
- defining strategies


## Request options
Options for request headers and body to be included in the listener parameter

### requestHeaders
The `requestHeaders` option states that the listener expects the request headers to be serialized - as an object literal of header names/values pairs - and included in its [details parameter](details.md#parameter). The serialized headers will accessed in the listener under the `details.requestHeaders` property. 

### requestBody
The `requestBody` option states that the listener expects the request body to be serialized and included in its [details parameter](details.md#parameter). The serialized body will accessed in the listener under the `details.requestBody` property.
By default, the request body is serialized into its [textual representation](https://developer.mozilla.org/en-US/docs/Web/API/Request/text).
However, a precise repesentation of the body can be explicitly specified:
- `requestBody=text`: for the default [textual representation](https://developer.mozilla.org/en-US/docs/Web/API/Request/text)
- `requestBody=json`: for a [json representation](https://developer.mozilla.org/en-US/docs/Web/API/Request/json)
- `requestBody=arrayBuffer`: for an [arrayBuffer representation](https://developer.mozilla.org/en-US/docs/Web/API/Request/arrayBuffer)
- `requestBody=formData`: for a [formData representation](https://developer.mozilla.org/en-US/docs/Web/API/Request/formData)
- `requestBody=blob`: for a [blob representation](https://developer.mozilla.org/en-US/docs/Web/API/Request/blob)


## Response options
Options for response headers and body to be included in the listener parameter

### responseHeaders
The `responseHeaders` option states that the listener expects the response headers to be serialized - as an object literal of header names/values pairs - and included in its [details parameter](details.md#parameter). The serialized headers will accessed in the listener under the `details.responseHeaders` property. 

### responseBody
The `responseBody` option states that the listener expects the response body to be serialized and included in its [details parameter](details.md#parameter). The serialized body will accessed in the listener under the `details.responseBody` property.
By default, the response body is serialized into its [textual representation](https://developer.mozilla.org/en-US/docs/Web/API/Response/text).
However, a precise repesentation of the body can be explicitly specified:
- `responseBody=text`: for the default [textual representation](https://developer.mozilla.org/en-US/docs/Web/API/Response/text)
- `responseBody=json`: for a [json representation](https://developer.mozilla.org/en-US/docs/Web/API/Response/json)
- `responseBody=arrayBuffer`: for an [arrayBuffer representation](https://developer.mozilla.org/en-US/docs/Web/API/Response/arrayBuffer)
- `responseBody=formData`: for a [formData representation](https://developer.mozilla.org/en-US/docs/Web/API/Response/formData)
- `responseBody=blob`: for a [blob representation](https://developer.mozilla.org/en-US/docs/Web/API/Response/blob)


## Routing options

### next
The `next=STAGE` option is used to specify the next `STAGE` to jump after the the execution of the current listener.

### parallels
The `parallels=STAGE` or `parallels=[STAGE,...,STAGE]` option is used to specify next `STAGE(S)` to be executed concurrently. 

### cancel
The `cancel` option is a jump to the final stage of an `event`. For instance, that is the `onRequestCompleted` stage for the fetch event, or the `onInstallCompleted` for the `install` event.   All remaining stages and listeners will be discarded.

## Features options
Names of features to be enabled can be included in `extra_options`. The runtime will lookup the feature, enable it with potential [filter](filter.md) options if present. 

## Listener execution options

### non-blocking
The `non-blocking` token mandates that the listener be executed asynchronously, and not synchronously (as done by done). In other words, the result of the execution of the listener will not be considered, not even waited for in order to handle subsequent listeners. 
There is also the `blocking` option, but one does not need to specify it, since it corresponds to the default synchronous execution of listeners. 


## See also
- addListener
- features definition
- strategies definition

