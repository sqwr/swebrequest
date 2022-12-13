# skipwaiting
The `clients.claim` feature simply calls [clients.claim](https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim) at the end of the [activation phase](../events/activate.md)


## Examples
- activate directly 
```javascript
swebRequest.features['clients.claim']();
```
- standalone 
```javascript
swebRequest.init({
    'clients.claim': null
})
```
- activate directly 
```javascript
swebRequest.usefeatures({
    'clients.claim': null
})
```
- workbox
```javascript
self.skipWaiting();
```

## Definition
```javascript
swebRequest.features.define('skipWaiting', async (details)=> {
    await self.skipWaiting();
}, ['onInstallCompleted']);
```

### listener
Simply call `self.skipWaiting()`

### Stages
|||
|--|--|
`onInstallCompleted` | executed at the end of the `install` phase

## See also
- [install event](../events/install.md)