# onBeforeMessage
The `onBeforeMessage` is the entry stage of the [message event](../events/message.md).
This stage has a default listener that has been introduced to make it easy for the service worker clients to interact with it via post messages. We have released a [companion service worker client](../lib/swrclient.js) that can be loaded in pages and workers in order to ease those interactions via the set of exposed methods. When those methods are invoked, the companion client will send specically crafted messages to the service worker. In particular, requests and response objects will be serialized before being posted to the service worker. At this `onBeforeMessage` stage, those messages are intercepted, deserialized to reconstruct request and repsonse objets and passed to the [onMessage](onMessage.md) which has a default dedicated listener for handling them. 

Note that the [default listener](#listener) only handle specially crafted messages sent by the clients. One can also add custom listeners to handle custom messages sent by clients. 


## Next stage
- [onMessage](onMessage.md)

## Strategies
- [postMessage](../strategies/postMessage.md)


## listener
```javascript
async (details) => {
    if (!(details.event.data && details.event.data.from == 'swebRequest')) return details;
    if ('request' in details.event.data && 'url' in details.event.data.request)
        details.event.data.request = new Request(details.event.data.request.url, details.event.data.request.init)
    if ('response' in details.event.data && 'body' in details.event.data.response)
        details.event.data.response = new Response(details.event.data.response.body, { 
            headers: details.event.data.response.headers || {},
            status: details.event.data.response.status || 0,
            statusText: details.event.data.response.statusText || 'OK'
        })
    return details
}
```
The distinguishing token for messages sent by the [companion swebRquest client](../utils/swrclient.md) is the `event.data.from` entry  in the message event data which value is `swebRequest`. The messages sent  contain serialized request and response properties, which are used to regenerate request and response objects that are passed onto the [onMessage](onMessage.md) to be processed. 
