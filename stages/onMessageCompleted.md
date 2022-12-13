# onMessageCompleted
The `onMessageCompleted` is the exit stage of the message event. This stage has a [default listener](#listener) for handling responses to specially crafted messages sent by [clients](../utils/swrclient.md). The result of those calls (response objects) are serialized and returned to the client via postmessage.

Note that the [default listener](#listener) only handle specially crafted messages sent by the clients. One can also add custom listeners to handle custom messages sent by clients. 


## Preceeding stage
- [onMessage](onMessage.md)

## Strategies
- [postMessage](../strategies/postMessage.md)


## listener
```javascript
 async (details: Details): Promise<Details> => {
    if (!(details.event.data && details.event.data.from == 'swebRequest')) return details;
    if ('response' in details)
        return { response: await serializeResponseForIndexedDB(details.response) }
    return details;
}
```



