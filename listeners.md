# Listeners

Listeners are functions that manipulate objects of types [Details](details.md). They are the core of `swebRequest`. 
Listeners can be directed added to stages, or defined as features. 
There are also default built-in listeners at stages such as:
- `onCacheMatch` for performing caches reads, both in the cache storage or in the indexedDB
- `onFetchRequest` for performing network fetches, both with or without timeouts, with or without navigation preloads enabled
- `onBeforeCachePut` for performing cache-reads, both in the cache storage or in the indexedDB


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

2. The listener is executed

- the 
