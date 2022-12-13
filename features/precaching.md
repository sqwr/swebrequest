# precaching
The `precaching` or `Precaching` feature adds assets in the cache during the [installation phase](../events/install.md). 


## runtime options
|||
|--|--|
`assets` | an array of assets to add to the cache during installation phase

## Examples
Following are more example usages

- activate directly (standalone, standalong)
```javascript
swebRequest.features.precaching({
    assets: [ '/', 'script.js', 'style.css', 'logo.png' ]
})
```
- standalone
```javascript
swebRequest.init({
    precaching: { assets: [ '/', 'script.js', 'style.css', 'logo.png' ] }
})
```
- standalong
```javascript
swebRequest.usefeatures({
    precaching: { assets: [ '/', 'script.js', 'style.css', 'logo.png' ] }
})
```
- workbox
Workbox has its own way of precaching assets, rather as a strategy than a feature or plugin.

## Definition
```javascript
swebRequest.features.define('precaching', null, ['onInstall']);
```

### listener
The `null` [listener](../listeners.md) argument indicates that the default listener of the [onInstall](../stages/onInstall.md) stage will be executed when this feature is activated.

## stages
|||
|--|--|
`onInstall` | The [main stage of the installation phase](../stages/onInstall.md)



## See Also
- [precaching strategy](../strategies/precaching.md)
- [install event](../events/install.md)