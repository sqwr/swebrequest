# Properties of the `details` object as returned by callback functions

## Requests and response objects properties
> Requests and response objects are found in [fetch](../../stages/events/fetch/index.md), [install](../../stages/events/install/index.md) and [activate](../../stages/events/activate/index.md) stages

- `details.request`: a new raw [request object](https://developer.mozilla.org/en-US/docs/Web/API/Request) object to be used. This request will replace the original one, and passed to subsequent listeners and stages.
- `details.response`: a new raw [response object](https://developer.mozilla.org/en-US/docs/Web/API/Response) to be used. This response will replace the original one, and passed to subsequent listeners and stages.
- `details.requestHeaders`: new request [headers](https://developer.mozilla.org/en-US/docs/Web/API/Request/headers) to be used in lieu of the original ones. This can an literal object with headers name/values pairs, or an instance of [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers). The runtime will generate a new request object, with the new headers.
- `details.responseHeaders`: new response [headers](https://developer.mozilla.org/en-US/docs/Web/API/Response/headers) to be used in lieu of the original ones. This can an literal object with headers name/values pairs, or an instance of [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers). The runtime will generate a new response object, with the new headers.
- `details.cancel`: a boolean, when `true`, mandates that the runtime ignores subsequent callbacks and stages and jump directly to the final stage of the related event.
    - `true`: jump to the final stage of the related event:
        - for the `fetch` event, [onRequestCompleted](../../stages/events/fetch/onRequestCompleted/index.md) is the final stage
        - for the `install` event, [onInstallCompleted](../../stages/events/install/onInstallCompleted/index.md) is the final stage
        - for the `activate` event, [onActivateCompleted](../../stages/events/activate/onInstallCompleted/index.md) is the final stage
        - for the `message` event, [onMessageCompleted](../../stages/events/message/onMessageCompleted/index.md) is the final stage
- `details.parallels`: stages to be handled ***concurrently*** while continuing the normal execution of stages:
    - a string specifying a single stage name to be handled concurrently
    - an array of stage names to be handled concurrently
