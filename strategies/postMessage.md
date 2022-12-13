# postMessage
The `postMessage` stage applies to the [message event stages](../events/message.md)


## Definition
```javascript
swebRequest.strategies.define('postMessage', ['onBeforeMessage', 'onMessage', 'onMessageCompleted'])
```
A convenient way of applying the same filter options to the the `message` event stages