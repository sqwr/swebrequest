# Features
Features are basically named callback functions. Contrary to callback functions defined via [addListener](../stages/methods/addListener/index.md) which are automatically added to the runtime, i.e. the list of callbacks of the related stage, callback functions defined by features are only added to the runtime, once they are effectively **enabled** or **used**.

## Define

### Syntax
Features are defined as follows
```javascript
swebRequest.features.define(name, listener, stages?, filter?, extra?, xfilter)
```


## Enable

### Syntax