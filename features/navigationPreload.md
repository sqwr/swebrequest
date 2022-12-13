# navigationPreload
The `navigationPreload` feature enables [navigation preload](https://developer.mozilla.org/en-US/docs/Web/API/NavigationPreloadManager) and uses preloaded respones. Note that preloaded responses do not benefit features that manipulate requests: [setRequestHeaders](setRequestHeaders.md), [swcookie](swcookie.md)


## Examples
Working examples of the `navigationPreload` feature.
||||
|--|--|--|
[standalone](../examples/navigationPreload.js) | [standalong](../examples/unavigationPreload.js) | [workbox](../examples/wnavigationPreload.js) 
|||

Following are more example usages

- activate directly [standalone or standalong]
```javascript
swebRequest.features.navigationPreload() 
```

- standalone
```javascript
swebRequest.init({ navigationPreload: null })
```

- standalong
```javascript
swebRequest.usefeatures({ navigationPreload: null })
```

- workbox
Workbox has its own way for handling navigation preloads. 

## Definition
```javascript
swebRequest.features.define('navigationPreload', async (details) => {
    if (details.phase == 'activate' && self.registration.navigationPreload)
        await self.registration.navigationPreload.enable();
    else if (details.phase == 'fetch' && details.event) {
        let presponse = await details.event.preloadResponse
        if (presponse) {
            return { 
                response: presponse, 
                next: 'onFetchRequestSuccess'
            }
        }
    }
    return {}
}, ['onActivateCompleted', 'onBeforeFetchRequest'], { modes: ['navigate'] })
```

### listener
Navigation preload is enabled during the activation phase, at the [onActivateCompleted](../stages/onActivateCompleted.md) stage. Then, during [before network fetch](../stages/onBeforeFetchRequest.md), if the preloaded response is available, it is used, instead of issuing a direct network request again.

### stages 
||| 
|--|--| 
`onActivateCompleted` | the navigation preload is enabled at this stage
`onBeforeFetchRequest` | the preloaded response is read at this stage and used, instead of issuing a network-fetch request

### filter options
||| 
|--|--|
`modes` | `navigate`: only navigation requests are concerned by navigation preloads.


## See also
- [setRequestHeaders](setRequestHeaders.md)
- [swcookie](swcookie.md)
- [activate event](../events/activate.md)
- [fetch event](../events/fetch.md)