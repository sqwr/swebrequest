# timestamp_verify
The `timestamp_verify` feature checks whether [timestamp](timestamp.md)ed cached content are still fresh enough to be served to clients. 

### runtime options
||| 
|--|--| 
| `maxAge` |  a number in milliseconds specifying the maximum allowed time cached content can be used. It is accessed in the feature listener under `details.filter.maxAge`


## Examples
Working examples of the `timestamp_verify` feature. These are the ones deployed on the [demo website](https://swebrequest.doitsec.net/sqwrfeatures.htm). 
||||
|--|--|--|
[standalone](../examples/timestamp.js) | [standalong](../examples/utimestamp.js) | [workbox](../examples/wtimestamp.js)
|||


## Definition
```javascript
swebRequest.features.define('timestamp_verify', async (details)  => {
    let maxAge = (details.filter && details.filter.maxAge) || 0,
        timestamp = 0
    try {
        let resHeaders = await Utils.searchCachedOpaqueRequest(details.request)
        timestamp = Number(resHeaders['content-language'])
    } catch(e) {}
    let agediff = Date.now() - timestamp
    if (timestamp && (agediff >= maxAge)) {
        return { 
            next: 'onBeforeFetchRequest', 
            response: undefined 
        };
    }
    return {}
}, ['onCacheMatchSuccess'])
```

### listener
The timestamp in the cached request is extracted (from the `content-language` header) and substracted from the current time (`Date.now()`). If the result is greater than the `maxAge` allowed for the cached content, the cached content will not be used, and a fresh response will be downloaded from the network (by going to the [onBeforeFetchRequest](../stages/onBeforeFetchRequest.md) stage). Otherwise, it is used. 


### stages 
||| 
|--|--| 
`onCacheMatchSuccess` | the [stage](../stages/onCacheMatchSucces.md) right after [cache read](../stages/onCacheMatch.md)


## See also
- [timestamp](timestamp.md)