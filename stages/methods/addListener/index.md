# addListener

Method that adds a [callback](../../../listener/index.md) function to a [stage](../index.md), with additional options

## Syntax
```javascript
addListener(callback?, filter?, extra_options?, xfilter?, prepend?)
```
### Arguments
- [callback](../../../listener/index.md): function to be executed when the [stage](../stages/index.md) is reached. For stages that have default callback functions, this parameter can be omitted, in which case the default callback will be used
- [filter](../../../options/filter/index.md): optional filter options that requests and responses must match for the `callback` function to be invoked.
- [extra_options](../../../options/extra/index.md): optional extra options, specifying in particular additional properties to be added to the callback `details` parameter
- [xfilter](../../../options/xfilter/index.md): optional option that request and responses must **NOT** match for the `callback` function to be invoked. This is the opposite of the `filter` argument
- `prepend`: a boolean, defaulting to `false`, which states whether the `callback` function should be prepended or appended (default) to the list of `callback`s already added at the stage

### Return value
`undefined`

## See also
