# perfstart
The `perfstart` and `perfsend` features are used in tandem to measure the performance of `swebRequest`. 

## Definition
```javascript
swebRequest.features.define('perfstart', async (details: Details): Promise<Details> => {
    details.event.start = self.performance.now()
    return {}
}, ['onRequestReceived'])

swebRequest.features.define('perfsend', async (details: Details): Promise<Details> => {
    // @ts-ignore
    try { swebRequest.LoggingFeatures('perfs', details.request.url + ',' + details.event.start + ',' + performance.now()); } catch(e) {}
    return {}
}, ['onRequestCompleted'])
```

### listener
The `perfstart` feature executes first when the request is intercepted. It stores in the `event` object, a start time. Then, when the `perfsend` feature executes at the final stage, the difference between the current time and the start time gives the time it tooks to fullfill the request. 

