# firewall

The `firewall` feature is meant to filter and cancel requests right when they are intercepted. It is implemented at the `onRequestReceived` stage. 



## Examples
Working examples of the `firewall` feature. This is the one deployed on  are the ones deployed on the [a Cloudflare worker](../contexts/cloudflare.md). 
||||
|--|--|--|
[standalone](../examples/firewall.js) | [standalong](../examples/ufirewall.js) | [workbox](../examples/wfirewall.js) 
|||

Following are more example usages

- enabling directly [standalone or standalong]
```javascript
swebRequest.features.firewall({ types: 'image' })
```
- standalone
```javascript
swebRequest.init({
    firewall: { types: 'image' } 
})
```
- standalong
```javascript
swebRequest.usefeatures({
    firewall: { types: 'image' } 
})
```
- workbox
N/A. See [limitations](../modes/workbox.md#limitations)

## Definition
```javascript
swebRequest.features.define('firewall', async (details) => {
    return { cancel : true, response: undefined }
}, ['onRequestReceived']);
```

### listener
The feature simply consists in cancelling a request, or jumping to the final [onRequestCompleted](../stages/onRequestCompleted.md) stage.

## return value
|||
|--|--|
`cancel: true` | immediate jump to the exit `onRequestCompleted` stage. All intermediate stages and their listeners will be ignored
`response: undefined` | an empty response will be served to the client
