# hasListener
Method that checks whether a [callback](../../../listener/index.md) has been added to a [stage](../index.md)

## Syntax
```javascript
(callback: CallBack): boolean
```
### Arguments
- [callback](../../../listener/index.md): function to be searched for among the callback functions added to the [stage](../index.md).

### Return value
a boolean:
- `true`: if the callback was found among the stage callback functions
- `false`: otherwise