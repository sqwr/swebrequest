# Stages
Stages are spots of service workers events where listeners can be added to manipulate events data, i.e. HTTP requests and respones, post message or push notification data, etc. 

## addListener
Method that adds a [listener or callback function](listener.md) function to a stage. See the different [events](events.md) and their related stages. 

### Syntax
```javascript
swebRequest.STAGE.addListener(listener?, filter?, extra_options?, xfilter?, prepend?) => void
```
where `STAGE` is a  is a [stage name](#stage-names):

### parameters
- `listener`: [callback function](listener.md) to be executed when the stage is reached. For stages that have default callback functions, this parameter can be omitted, in which case the default callback will be used. 
- `filter`: optional [filter options](filter.md) that (requests and responses) must be matched against for the `listener` to be executed.
- `extra_options` : optional [extra options](extra_options.md), specifying in particular additional properties to be added to the listener [details parameter](details.md#parameter)
- `xfilter`: optional [xfilter option](xfilter.md) (that request and responses) must **NOT** be matched against for the `listener` to be executed. This is the opposite of the `filter` argument
- `prepend`: a boolean, defaulting to `false`, which states whether the `listener`  should be prepended or appended to the list of `listener`s already added at the stage. Appending is the default ordering of stages listeners.

## Routing
Routing is done according 