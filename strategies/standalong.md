# Common routing strategies for the standalong mode
The [strategies](../strategies.md) are meant to be used in the standalone mode. Workbox has its own implementation of routing strategies. Now, there is no routing strategies for the standalong mode. That is the gap that the strategies proposed here intend to fill. One can use those strategies. As they work with the standalong mode, those strategies

- the strategies listed here do not involve stages. one can see them like simple functions, that are invoked to perform 
- they have to be transparently invoked by