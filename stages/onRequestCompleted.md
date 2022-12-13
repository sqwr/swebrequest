# onRequestCompleted
The `onRequestCompleted` is the exit stage of the [fetch event](../events/fetch.md). It is the last stage entered where a response is generated to fulfill an intercepted request. If this stage has many listeners, ultimately manipulating the response, the response returned by the final listener will be used to fulfill the request. 

## Features 
## Features implemented at this stage
- [originpolicies](../features/originpolicies.md)
- [setResponseHeaders](../features/setResponseHeaders.md)
- [swcookie](../features/swcookie.md)
