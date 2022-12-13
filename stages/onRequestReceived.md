# onRequestReceived
The `onRequestReceived` stage is the entry  stage of the [fetch event](../events/fetch.md). It is the first stage passed the intercepted event and the request that fires the fetch event. This is the perfect place for implementing features such as [firewall](../features/firewall.md) which filter and cancel requests based on their properties. It is also the perfect place to change the 
[default cache-first](../strategies/cacheFirst.md) routing strategy followed by swebReques. 
This is exactly what we have done with network strategies, such as [networkFirst](../strategies/networkFirst.md), where we branch to the [onBeforeFetchRequest stage](onBeforeFetchRequest.md) in order to perform network-fetch first, instead of the default cache-read which is performed first in [cacheFirst](../strategies/cacheFirst.md). 


## Next stage
- [onBeforeCacheMatch](onBeforeCacheMatch.md) 


## Features
Features implemented at this stage include:
- [randomvalues](../features/randomvalues.md)
- [proxyrewriterequests](../features/proxyrewriterequests.md)
- [firewall](../features/firewall.md)
- [perfstart](../features/perfstart.md)


### See also
- [networkFirst strategy](../strategies/networkFirst.md)
- [networkFirstTimeout strategy](../strategies/networkFirstTimeout.md)
- [networkOnly strategy](../strategies/networkOnly.md)

