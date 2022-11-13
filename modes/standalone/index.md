# Standalone mode
In this mode, all the different stages, features and strategies of `swebRequest` can be used. 
This mode is enabled by calling the method `swebRequest.init()` whose syntax is shown below

## Syntax
```javascript
swebRequest.init(features?, strategies?, stages?, standalone?, phases?)
```
### Parameters
- `features`: an optional object literal of feature names, each associated to [filter options](../../options/filter/index.md) to be applied to it.
- `strategies`: an optional object literal of strategy names, each associated to [filter options](../../options/filter/index.md) to be applied to all the stages of the strategy.
- `stages`: an optional object literal of stage names, each associated to [filter options](../../options/filter/index.md) to be applied to it.
- `standalone`: an optional boolean, which defaults to `true` for `standalone` mode, and `false` for `standalong` mode 