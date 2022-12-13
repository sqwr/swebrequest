# Listeners

Listeners are functions that manipulate objects of types [Details](details.md). They are the core of `swebRequest`. Listeners can be directed [added to stages](stages.md#addlistener), or [defined as features](features.md#definition)

## Syntax

```javascript
(details: Details) => Promise<Details> | Details
```

Listeners callback functions can be synchronous or asynchronous. 
- They are passed a [details](details.md#parameter) object
- They can return nothing (`null`, `undefined`), or a [details](details.md#returnvalue), or a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that resolves to `null`, `undefined` or a [details](details.md#returnvalue) object.


## Execution
1. Before executing a listener:
   - the associated [filter](filter.md) options are checked to ensure that they match the listener [parameter](details.md#parameter)
   - the associated [xfilter](xfilter.md) options are checked to ensure that they **DO NOT** match the listener [parameter](details.md#parameter)
   - the listener parameter is augmented with the properties (i.e. `requestHeaders`, `responseBody`) in accordance with the associated [extra options](extra_options.md)
2. The result of a listener execution is used to construct new (request/response) objects that are passed onto next listeners, until an exit stage is reached. Starting from the entry stage of an event (i.e. [onRequestReceived](stages/onRequestReceived.md) for the fetch event), each stage defines its next stage that is executed when all the listeners at the stage are executed. Next stages are modified by routing strategies. The last listener of the exit stage of the event marks the end of the handling of the event.