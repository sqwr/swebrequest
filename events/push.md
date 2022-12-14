# push

The [push event](https://developer.mozilla.org/en-US/docs/Web/API/PushEvent) is supported in `swebRequest`. Add listeners and features to manipulate push messages received from backend servers. 

## Listener parameters and return values
Properties of stages listeners `details` parameters are shown in [details](../details.md)
- [common properties](../details.md#all-events-properties)
- [specific push event stages listeners parameters properties](../details.md#push-event-specific-properties)
- [specific push event stages listeners return properties](../details.md#return-push-event-specific-properties)


## Stages
|||
|--|--|
[onBeforePush](../stages/onBeforePush.md) | entry stage of the push event 
[onPush](../stages/onPush.md) | main stage of the push event 
[onPushCompleted](../stages/onPushCompleted.md) | exit stage of the push event 