
# Properties of the `details` object as the argument of callback functions

## Requests and response objects properties
> Requests and response objects are found in [fetch](../../stages/events/fetch/index.md), [install](../../stages/events/install/index.md) and [activate](../../stages/events/activate/index.md) stages

- `details.request`: the raw [request object](https://developer.mozilla.org/en-US/docs/Web/API/Request) object
- `details.response`: the raw [response object](https://developer.mozilla.org/en-US/docs/Web/API/Response)
- `details.url`: an alias to the `details.request.url` string
- `details.requestHeaders`: the serialized request [headers](https://developer.mozilla.org/en-US/docs/Web/API/Request/headers), if serialization of request headers was enabled. This is done by adding the string `requestHeaders` to the list of [extra options](../../options/extra/index.md) argument when the callback function was [added](../../stages/methods/addListener/index.md) to the stage.
- `details.responseHeaders`: the serialized response [headers](https://developer.mozilla.org/en-US/docs/Web/API/Response/headers), if serialization of response headers was enabled. This is done by adding the string `responseHeaders` to the list of [extra options](../../options/extra/index.md) argument when the callback function was [added](../../stages/methods/addListener/index.md) to the stage

## Runtime properties
> These properties are always included by the runtime to the `details` passed to callback functions. Their are:
- `details.filter`: a reflection of the [filter](../../options/filter/index.md) options that were passed to the [addListener](../../stages/methods/addListener/index.md) when adding the callback function to the stage. **THIS PROPERTY IS VERY IMPORTANT FOR FEATURES THAT EXPECT RUNTIME ARGUMENTS ONLY PASSED WHEN THE FEATURE IS ENABLED. THEY CAN BE FOUND UNDER THIS PROPERTY**
- `details.extra_options`: a reflection of the [extra](../../options/extra/index.md) options that were to the [addListener](../../stages/methods/addListener/index.md) when adding the callback function to the stage. 
- `details.event`: The raw event object the stage belongs to.
    - [FetchEvent](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent) for the `fetch` event
    - [ExtendableEvent](https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent) for the `install` and `activate` events.
    - [ExtendableMessageEvent](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/message_event) for the `message` event
- `details.phase`: A string name of the event the stage belongs to:
    - `fetch`: for the `fetch` event
    - `install`: for the `install` event
    - `activate`: for the `activate` event
    - `message`: for the `message` event

## Properties related to the `message` event
These propreties are related to the `message` event and its stages. They are just copies of what can be found under `details.event`
- `details.data`: A copy of the received [message data](https://developer.mozilla.org/en-US/docs/Web/API/ExtendableMessageEvent/data). It is an alias of `details.event.data`
- `details.source`: [the client](https://developer.mozilla.org/en-US/docs/Web/API/ExtendableMessageEvent/source) that sent the message. It is an alias of `details.event.source`
- `details.origin`: the [origin](https://developer.mozilla.org/en-US/docs/Web/API/ExtendableMessageEvent/origin) of the client that sent the message. It is an alias of `details.event.origin`