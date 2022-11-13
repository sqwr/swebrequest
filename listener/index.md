# Listener callback functions

## Syntax
```javascript
(details: Details) => Promise<Details> | Details
```

Listeners callback functions can be synchronous or asynchronous. 
- They are passed a [details](../details/index.md) object
- They can return nothing (`null`, `undefined`), or a [details](../details/index.md), or a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that resolves to `null`, `undefined` or a [details](../details/index.md) object.


## Execution
The `callback` functions, are executed in the order in which they have been added to the stage, and according to the ordering of stages  is executed in 
## Examples
```javascript

```