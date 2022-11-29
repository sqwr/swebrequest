# Details
Object defining the structure of listeners paramaters and return values
In other words, this is a uniform type of objects that listeners receive and return.
We refer to these objects as `details`.

## paramater
Properties that can be found in `details` when passed as a parameter to a listener. Some properties are always present, others are event-, stage-specific or user-defined at runtime.

### All events properties
They describe the fired event. 

| Property | Description | Types / Values | 
--- | --- | --- | 
| `event?` | the fired event i.e. | [FetchEvent](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent), [InstallEvent](https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent), [ActivateEvent](https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent), [ExtendableMessageEvent](https://developer.mozilla.org/en-US/docs/Web/API/ExtendableMessageEvent), [PushEvent](https://developer.mozilla.org/en-US/docs/Web/API/PushEvent), [SyncEvent](https://developer.mozilla.org/en-US/docs/Web/API/SyncEvent), [PeriodicSyncEvent](https://developer.mozilla.org/en-US/docs/Web/API/PeriodicSyncEvent), [NotificationClickEvent](https://developer.mozilla.org/en-US/docs/Web/API/NotificationEvent), [NotificationCloseEvent](https://developer.mozilla.org/en-US/docs/Web/API/Notification/close_event) |
`phase` | the [event type](https://developer.mozilla.org/en-US/docs/Web/API/Event/type) | string, i.e. `fetch`, `install`, `activate`, `message`, `push`, `sync`, `periodicsync`, `notificationclick`, `notificationclose` |

### Runtime properties

| Property | Description | Types / Values | 
--- | --- | --- |
`filter?` | the filter options of the listener | [Filter Options](filter.md) |
`extra_options?` | the extra options of the listener | [Extra Options](extra_options.md) |

### Request object specific properties
These properties appear to `fetch` event stages listeners, usually at all stages. The `request` and `url` property, holding the raw request object, is always included.  The optional `requestHeaders` and `requestBody` properties are only included if the related `requestHeaders` and `requestBody` [extra options](#extra_options.md) are present 

| Property | Description | Types / Values | 
--- | --- | --- | 
`request` | raw request object | [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) | 
`url` | alias of request URL | string, [request.url](https://developer.mozilla.org/en-US/docs/Web/API/Request/url) |
`requestHeaders?` | serialized request headers | [Object literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#object_literals), i.e. `{a: b, c: d, ...}` |
`requestBody?` | serialized request body, i.e. as text (default) | [text](https://developer.mozilla.org/en-US/docs/Web/API/Request/text), [arrayBuffer](https://developer.mozilla.org/en-US/docs/Web/API/Request/arrayBuffer), [json](https://developer.mozilla.org/en-US/docs/Web/API/Request/json), [blob](https://developer.mozilla.org/en-US/docs/Web/API/Request/blob), [formData](https://developer.mozilla.org/en-US/docs/Web/API/Request/formData) | 

### Response objects specific properties
These properties appear to `fetch` event stages listeners, whenever a response is available, i.e. usually after a successful cache-read and network-fetch, or at anytime if the response is generated by the service worker. At this moment, the `response` property, holding the raw response object, is added. The optional `responseHeaders` and `responseBody` properties are only included if the related `responseHeaders` and `responseBody` [extra options](#extra_options.md) are present
 
| Property | Description | Types / Values | 
--- | --- | --- | 
`response?` | raw response object | [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) | 
`responseHeaders?` | serialized response headers | [Object literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#object_literals), i.e. `{}` |
`responseBody?` | serialized response body, i.e. as text (default) | [text](https://developer.mozilla.org/en-US/docs/Web/API/Response/text), [arrayBuffer](https://developer.mozilla.org/en-US/docs/Web/API/Response/arrayBuffer), [json](https://developer.mozilla.org/en-US/docs/Web/API/Response/json), [blob](https://developer.mozilla.org/en-US/docs/Web/API/Response/blob), [formData](https://developer.mozilla.org/en-US/docs/Web/API/Response/formData) |

### Message event specific properties
Properties present when listeners belong to `message` events stages: `onBeforeMessage`, `onMessage`, `onMessageCompleted`.
These properties are simply alias to properties of the same name found in the raw `event` object. There are also custom properties added when the messages are sent by `swebRequest` clients. 

| Property | Description | Types / Values | 
--- | --- | --- | 
`data` | received data | [MessageEvent.data](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent/data)|
`source` | message source | [MessageEvent.source](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent/source)|
`origin` | message origin | [MessageEvent.origin](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent/origin)|
`data.from?` | custom property sent by clients | The value `swebRequest` means that the message is sent by `swebRequest` clients |
`data.id?` | custom property sent by  clients | any value that will be refelected in the response sent by the service worker |


### Push events specific properties
Properties present when listeners belong to `push` events stages: `onBeforePush`, `onPush`, `onPushCompleted`.
These properties are simply alias to properties of the same name found in the raw `event` object. 

| Property | Description | Types / Values | 
--- | --- | --- | 
`data` | received push message data | [PushEvent.data](https://developer.mozilla.org/en-US/docs/Web/API/PushEvent/data) |


### Notificationclick events specific properties
Properties present when listeners belong to `notificationclick` events stages: `onBeforeNotificationClick`, `onNotificationClick`, `onNotificationClickCompleted`.
These properties are simply alias to properties of the same name found in the raw `event` object. 

| Property | Description | Types / Values | 
--- | --- | --- | 
`notification` | notification object that was clicked to fire the event | [NotificationEvent.notification](https://developer.mozilla.org/en-US/docs/Web/API/NotificationEvent/notification) 
`action` | id of clicked notification button | [NotificationEvent.action](https://developer.mozilla.org/en-US/docs/Web/API/NotificationEvent/action) 


### Sync events specific properties
Properties available to the `sync` event stages: `onBeforeSync`, `onSync`, `onSyncCompleted`.

| Property | Description | Types / Values | 
--- | --- | --- | 
`tag` | alias to `SyncEvent.tag` | any, [SyncEvent.tag](https://developer.mozilla.org/en-US/docs/Web/API/SyncEvent/tag)


### PeriodicSync events specific properties
Properties available to the `periodicsync` event stages: `onBeforePeriodicSync`, `onPeriodicSync`, `onPeriodicSyncCompleted`.

| Property | Description | Types / Values | 
--- | --- | --- | 
`tag` | alias to `PeriodicSyncEvent.tag` | any, [PeriodicSyncEvent.tag](https://developer.mozilla.org/en-US/docs/Web/API/PeriodicSyncEvent/tag)



### Standalong strategies specific properties
| Property | Description | Types / Values | 
--- | --- | --- | 
`timeout` | timeout for `networkFirstTimeout` strategy | number of milliseconds |
`cacheName?` | name of cache where to read or write content | string |

See [standalong strategies](#strategies.md) for more details.




## return value
The properties of the `details` object as a return value contain new or modified request/response raw objects, headers or bodies  event-specific information such as post message data, push event notification to be shown to the user, etc. The values of these properties will be passed to subsequent listeners and stages. 
Properties such as `next` or `parallels` guide custom routing, i.e. next stage to jump to or concurrent stages to be handled next. 
Finally, stateful information can be stored in the `event` object. As this property is global, the state information can be consistently accessed by all subsequent listeners. 


### Request object specific properties
These properties can be returned by  `fetch` event stages listeners. They will replace the original ones and passed to subsequent listeners and stages. The `request`, `requestHeaders` and `requestBody`  will override respectively the original raw request, headers and body. 

| Property | Description | Types / Values | 
--- | --- | --- | 
`request?` | raw request object to replay the original one | [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) | 
`requestHeaders?` | serialized request headers | [Object literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#object_literals), i.e. `{a: b, c: d, ...}` |
`requestBody?` | serialized request body, i.e. as text (default) | [text](https://developer.mozilla.org/en-US/docs/Web/API/Request/text), [arrayBuffer](https://developer.mozilla.org/en-US/docs/Web/API/Request/arrayBuffer), [json](https://developer.mozilla.org/en-US/docs/Web/API/Request/json), [blob](https://developer.mozilla.org/en-US/docs/Web/API/Request/blob), [formData](https://developer.mozilla.org/en-US/docs/Web/API/Request/formData) | 

### Response objects specific properties
These properties can be returned by  `fetch` event stages listeners. They will replace the original ones and passed to subsequent listeners and stages. The `response`, `responseHeaders` and `responseBody`  will override respectively the original raw response, headers and body. 

 
| Property | Description | Types / Values | 
--- | --- | --- | 
`response?` | raw response object | [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) | 
`responseHeaders?` | serialized response headers | [Object literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#object_literals), i.e. `{}` |
`responseBody?` | serialized response body, i.e. as text (default) | [text](https://developer.mozilla.org/en-US/docs/Web/API/Response/text), [arrayBuffer](https://developer.mozilla.org/en-US/docs/Web/API/Response/arrayBuffer), [json](https://developer.mozilla.org/en-US/docs/Web/API/Response/json), [blob](https://developer.mozilla.org/en-US/docs/Web/API/Response/blob), [formData](https://developer.mozilla.org/en-US/docs/Web/API/Response/formData) |



### Routing properties
| Property | Description | Types / Values | 
--- | --- | --- | 
`next?` | name of stage to jump to next | string, i.e. `onRequestCompleted`, `onBeforeFetchRequest`, `onBeforeCacheMatch`, etc. }
`parallels?` | stage or set of stages to handle concurrently to the next stage | string, i.e. `onBeforeFetchRequest`, [`onBeforeCachePut`, `onRequestCompleted`] |
`cancel?` | discard all next listeners and stages and jump to the exit stage | boolean: `true`, `false` |

### Message event specific properties
| Property | Description | Types / Values | 
--- | --- | --- | 
`response` | response to send to client data | any |

At the final `onMessageCompleted`, if the `response` property is present in the return object, then `swebRequest` will respond to the client that sent the message by calling `event.source.postMessage` with the following properties
- `response`: just the value of `details.response` as shown abone
- `id`: a reflection of `event.data.id`, an id sent by the client. See [message event specific properties](#message-event-specific-properties)


### Push event specific properties
At the final `onPushCompleted` stage, if those properties are present in the return object, they will be used to generate and show a notification dialog to the user, provided that the user has already granted push notification permission to the origin. The service worker can also navigate the user to a specific URL when they click on the shown notification
| Property | Description | Types / Values | 
--- | --- | --- | 
`notification?` | notification object to be shown to user | object literal | 
`notification?.title` | notification title | [Notification.title](https://developer.mozilla.org/en-US/docs/Web/API/Notification/title) |
`notification?.*` | properties defining the [options](https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification#parameters) to be applied to the notification | [notification?.body](https://developer.mozilla.org/en-US/docs/Web/API/Notification/body), [notification?.tag](https://developer.mozilla.org/en-US/docs/Web/API/Notification/tag), [notification?.icon](https://developer.mozilla.org/en-US/docs/Web/API/Notification/icon), etc. |
`notification?.url?` | URL that will be navigated if the user clicks on the shown notification | string |



### Stateful properties
| Property | Description | Types / Values | 
--- | --- | --- | 
`event.responsefrom` | where the response was read from | `network` or `cache` |

The global `event` property can be used to store some state, that other listeners can access. For instance, whether a response was read from the cache or obtained over the network, we store this information in `event.responsefrom`
The `perfstart` and `perfsend` features also leveraged the `event` object to store the time when a request was first intercepted by the fetch event, and the time when the client is served a response to that request. The difference between these two times help measure the performance of the service worker, in particular when `swebRequest` features are in place. 




## See also
- [Listeners](#listeners.md)
- [Stages](#stages.md)
- [Features](#features.md)