# Usage modes

- [standalone](standalone/index.md)
- [standalong](standalong/index.md)
- [workbox](workbox/index.md)

## Methods
- [init]()

## Syntax
```javascript
swebRequest.init(features?, strategies?, stages?, standalone?, phases?)
swebRequest.usefeatures(features?, strategies?, stages?)
```

### Parameters
- `features`: an optional object literal of feature names, each associated to [filter options](../../options/filter/index.md) to be applied to it.
- `strategies`: an optional object literal of strategy names, each associated to [filter options](../../options/filter/index.md) to be applied to all the stages of the strategy.
- `stages`: an optional object literal of stage names, each associated to [filter options](../../options/filter/index.md) to be applied to it.
- `standalone`: an optional boolean, which defaults to `true` for `standalone` mode, and `false` for `standalong` mode 



## Examples
