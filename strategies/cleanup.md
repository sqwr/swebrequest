# cleanup

A strategy for cleaning up assets during the service worker [activation phase](../events/activate.md). 

## Runtime options
|||
|--|--|
`assets` | array of assets to precache. 
`caches` | optional array of caches where to store assets

These runtime options are those of the [onActivate](../stages/onActivate.md) stage that is part of the `cleanup` strategy.

## Examples

- direct activation (standalone)
```javascript
swebRequest.strategies.cleanup({
    caches: ['v1']
})
```
- standalone
```javascript
swebRequest.init(null, {
    cleanup: { assets: ['/', 'main.js', 'main.css', 'logo.png'], caches: ['v1'] }
})
```

- standalong
N/A

- workbox
N/A


## Definition
```javascript
swebRequest.strategies.define('cleanup', ['onBeforeActivate', 'onActivate', 'onActivateCompleted'])
```
This strategy is a convenient way of cleaning up old caches and their assets
