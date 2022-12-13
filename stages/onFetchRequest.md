# onFetchRequest
The main stage for doing network-fetch, i.e. calling the [fetch method](https://developer.mozilla.org/en-US/docs/Web/API/fetch) with a request URL in order to download a response from an origin server. The [default built-in listener](#listener) accounts for [navigation preloads](../features/navigationPreload.md) that it can enable it not yet the case. It can be configured to make requests with a timeout. Requests can also be made with a timeout, this eases the implementation of strategies such as [networkFirstTimeout](../strategies/networkFirstTimeout.md).

This stage is only intended for making network-fetch. Therefore, it is recommended not to implement features directly at it, but rather do so at the auxiliary [onBeforeFetchRequest](onBeforeFetchRequest.md), [onFetchRequestSuccess](onFetchRequestSuccess.md) and [onFetchRequestError](onFetchRequestError.md) stages.


## Next stages
- [onFetchRequestSuccess](onFetchRequestSuccess.md): in network-hit, i.e. downloading a response was successful
- [onFetchRequestError](onFetchRequestError.md): in network-miss, i.e. an error occurred hile downloading a response


## Runtime options
|||
|--|--|
`timeout` | maximum time to wait for the network request to complete 
`navigationPreload` | enable navigation preload if not yet the case. The [navigationPreload](../features/navigationPreload.md) can be activated instead to achieve the same goal.


## Examples
This stage is not supported in [standalong mode](../modes/standalong.md). 
Here is an example that makes the request with a timeout.
- with [addListener](../stages.md#addlistener)
```javascript
swebRequest.onFetchRequest.addListener(null, { timeout: 5000 })
```
Allow 5s for responses to be available.

- with [swebRequest.init](../modes/standalone.md)
```javascript
swebRequest.init(null, null, {
    onFetchRequest: { timeout: 5000 } 
})
```


## Network-fetch from other events
The `onFetchRequest` stage, where network-fetch is performed, is invoked to store HTTP download responses over the network, when `fetch` events are fired. 
However, nothing prevents a service worker from making network-fetch out-of-fetch-events. For instance, the logic of a service worker may involve network-fetch when a message is received (push or post message), or network-fetch to transmit pending requests during background synching. This is achieved with the `swebRequest.fetch` method described below. Under the hoods, this method will successively execute the listeners and features registred at the [onBeforeFetchRequest](onBeforeFetchRequest.md), [onFetchRequest](onFetchRequest.md), [onFetchRequestSuccess](onFetchRequestSuccess.md) and [onFetchRequestError](onFetchRequestError.md) stages.

```javascript
swebRequest.fetch(odetails: Request | Details): Promise<Response>
```
### Parameters
If `input` a [details](../details.md) object, a request object or a request URL string. 

### Return value
A promise that resolves to a response object, just like the native [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/fetch).

## State information
When the response is successfully downloaded from the network, the `details.event.responsefrom` property is set to `network`. This state information is globally readable from subsequent listeners. 



## listener
```javascript
async  (details) {
    let cfresponse = undefined;
    if (details.request) {
        try {
            try {
                if (details.filter && details.filter.navigationPreload) {
                    if (!(await self.registration.navigationPreload.getState()).enabled)
                        await self.registration.navigationPreload.enable()
                }
            } catch(e) {}
            if (details.event && details.event.preloadResponse)
                cfresponse = await details.event.preloadResponse
            else {  
                if (details.filter && details.filter.timeout) {
                    cfresponse = await makeTimedFetch(details.request.clone(), details.filter.timeout);
                } else {
                    cfresponse = await fetch(details.request)
                }
            }
        } catch(e) {}
    }
    if (cfresponse) {
        try { details.event.responsefrom = 'network'; } catch(e) {}
        return { response: cfresponse, next: 'onFetchRequestSuccess' }
    } else
        return { response: cfresponse, next: 'onFetchRequestError' }
}
```
Navigation preload is enabled if not yet the case. Then, preloaded responses are considered if they are ready. If no preloaded responses are there, then if there is a timeout, fetch is made with the timeout. Otherwise, [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) is directly invoked with the request...
If network-fetch was successful, `details.event.responsefrom` state is set to `network` meaning that the response is coming from the network [and not the cache](onCacheMatch.md#state-information). The next stage is chosen depending on network-hit (`onFetchRequestSuccess`) or network-error (`onFetchRequestError`). 

