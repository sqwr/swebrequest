# Workbox

## Activating features for all routing strategies
In `swebRequest`, there are globally a single instance of each stage where features and listeners execute. Therefore, no matter the custom routing strategy that applies to a specific types of requests/responses, if this routing passes by a stage where features are activated, those features will be applied to the requests/responses, if there is a match. 

In `Workbox`, routing strategies are independent from one another. The consequence is that features only apply to the strategies where they are added. It is the responsibility of the developer to ensure that features are enabled whenever a strategy is used. Surely, the feature instances can be created once, then added to each routing strategy. See this case in action in [Workbox example](../examples/wallfeatures.js)

## Built-in plugins
The `expiration` plugin timestamps and limits the number of responses written in the cache. Its timestamping part is similar to the [timestamp](../features/timestamp.md) feature of `swebRequest`. However, while the `timestamp` feature stores information in the request object, the `expiration` plugin may use the `indexedDB` storage to store separate information that associate a request to the time when it was stored in the cache. Even though indexedDB has improved in terms of performance, written the time information in the request is still much more efficient than reading this information from the indexedDB. 

