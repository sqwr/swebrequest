# clients.claim
The `clients.claim` feature simply calls [clients.claim()](https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim).


## Examples
- activate directly 
```javascript
swebRequest.features.skipWaiting();
```
- standalone 
```javascript
swebRequest.init({
    skipWaiting: null
})
```
- activate directly 
```javascript
swebRequest.usefeatures({
    skipWaiting: null
})
```
- workbox
```javascript
workbox.core.clientsClaim();
```

## Definition
```javascript
swebRequest.features.define('clients.claim', async (details: Details): Promise<Details> => {
    await self.clients.claim();
    return {}
}, ['onActivateCompleted']);
```

### listener
Simply call `self.clients.claim()`

### Stages
|||
|--|--|
`onActivateCompleted` | executed at the end of the `activate` phase

## See also
- [activate event](../events/activate.md)