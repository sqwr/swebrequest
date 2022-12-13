# Precaching
The `precaching` strategy is a convenient way of precaching assets during the [installation phase](../events/install.md)

## Runtime options
|||
|--|--|
`assets` | array of assets to precache. 
`caches` | optional array of caches where to store assets

These runtime options are those of the [onInstall](../stages/onInstall.md) stage that is part of the `precaching` strategy.

## Examples
Working examples of the `precaching`  with the [cacheFirst](cacheFirst.md) strategy. These are the ones deployed on the [demo website](https://swebrequest.doitsec.net/sqwrstrategies.htm). 
||||
|--|--|--|
[standalone](../examples/cacheFirst.js) | [standalong](../examples/ucacheFirst.js) | [workbox](../examples/wcacheFirst.js)
|||

- direct activation (standalone)
```javascript
swebRequest.strategies.precaching({
    assets: ['/', 'main.js', 'main.css', 'logo.png']
})
```
- standalone
```javascript
swebRequest.init(null, {
    precaching: { assets: ['/', 'main.js', 'main.css', 'logo.png'] }
})
```
- standalong
Rather use the [precaching feature](../features/precaching.md)
- workbox
it has its own way or precaching assets. 

## Definition
```javascript
swebRequest.strategies.define('precaching', ['onBeforeInstall', 'onInstall', 'onInstallCompleted'])
```
This strategy is a convenient way for precaching assets

## See also
- [onBeforeInstall](../stages/onBefore)