# Stages
Stages are a breakdown of events service workers can react to. They are the core of `swebRequest`. The events currently supported include:
- [fetch](fetch/index.md)
- [install](install/index.md)
- [activate](activate/index.md)
- [message](message/index.md)
Events not yet supported but that we would consider in the future include:
- [push](https://developer.mozilla.org/en-US/docs/Web/API/PushEvent)
- [sync](https://developer.mozilla.org/en-US/docs/Web/API/SyncEvent)
- [BroadcastChannel](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)


## Methods
The common methods of stages are:
- [addListener](addListener/index.md)
- [hasListener]()
## Examples
```
swebRequest.onFetchRequest.addListener();
```