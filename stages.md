# Stages

## addListener
Method that adds a [listener or callback function](listener.md) function to a stage.

### Syntax
```javascript
swebRequest.STAGE.addListener(listener?, filter?, extra_options?, xfilter?, prepend?) => void
```
where `STAGE` is a  is a [stage name](#stage-names):

### parameters
- `listener`: [callback function](listener.md) to be executed when the stage is reached. For stages that have default callback functions, this parameter can be omitted, in which case the default callback will be used. 
- `filter`: optional [filter options](filter.md) that (requests and responses) must be matched against for the `listener` to be executed.
- `extra_options` : optional [extra options](extra_options.md), specifying in particular additional properties to be added to the listener [details parameter](details.md#parameter)
- `xfilter`: optional [xfilter option](xfilter.md) (that request and responses) must **NOT** be matched against for the `listener` to be executed. This is the opposite of the `filter` argument
- `prepend`: a boolean, defaulting to `false`, which states whether the `listener`  should be prepended or appended to the list of `listener`s already added at the stage. Appending is the default ordering of stages listeners.


## Stage names
- [Cache read](#cache-read)
    - [onBeforeCacheMatch](#onbeforecachematch)
    - [onCacheMatch](#oncachematch)
    - [onCacheMatchSuccess](#oncachematchsuccess)
    - [onCacheMatchError](#oncachematcherror)
- [Cache write](#cache-write)
    - [onBeforeCachePut](#onbeforecacheput)
    - [onCachePut](#oncacheput)
    - [onCachePutCompleted](#oncacheputcompleted)
- [Network fetch](#network-fetch)
    - [onBeforeFetchRequest](#onbeforefetchrequest)
    - [onFetchRequest](#onfetchrequest)
    - [onFetchRequestSuccess](#onfetchrequestsuccess)
    - [onFetchRequestError](#onfetchrequesterror)
- [Fetch event](#fetch-event)
    - [onRequestReceived](#onrequestreceived)
    - [onResponseError](#onresponseerror)
    - [onRequestCompleted](#onrequestcompleted)
- [Install event](#install-event)
    - [onBeforeInstall](#onbeforeinstall)
    - [onInstall](#oninstall)
    - [onInstallCompleted](#oninstallcompleted)
- [Activate event](#activate-event)
    - [onBeforeActivate](#onbeforeactivate)
    - [onActivate](#onactivate)
    - [onActivateCompleted](#onactivatecompleted)
- [Message event](#message-event)
    - [onBeforeMessage](#onbeforemessage)
    - [onMessage](#onmessage)
    - [onMessageCompleted](#onmessagecompleted)
- [Push event](#push-event)
    - [onBeforePush](#onbeforepush)
    - [onPush](#onpush)
    - [onPushCompleted](#onpushcompleted)
- [Sync event](#sync-event)
    - [onBeforeSync](#onbeforesync)
    - [onSync](#onsync)
    - [onSyncCompleted](#onsynccompleted)
- [PeriodicSync event](#periodicsync-event)
    - [onBeforePeriodicSync](#onbeforeperiodicsync)
    - [onPeriodicSync](#onperiodicsync)
    - [onPeriodicSyncCompleted](#onperiodicsynccompleted)
- [Notificationclick event](#notificationclick-event)
    - [onBeforeNotificationClick](#onbeforenotificationclick)
    - [onNotificationClick](#onnotificationclick)
    - [onNotificationClickCompleted](#onnotificationclickcompleted)
- [Notificationclose event](#notificationclose-event)
    - [onBeforeNotificationClose](#onbeforenotificationclose)
    - [onNotificationClose](#onnotificationclose)
    - [onNotificationCloseCompleted](#onnotificationclosecompleted)

## Common API calls stages

### Cache read
The stages in this category perform read operations on the cache, specifically at the `onCacheMatch` stage. The other stages are convenient spots where custom logics can be implemented. 

#### onBeforeCacheMatch
The `onBeforeCacheMatch` stage 

#### onCacheMatch
The `onCacheMatch` stage is the main stage where cache reads are performed. There is a default built-in listener for performing cache reads, both in the cache storage or in the indexedDB. Cache-reads are performed by default in all caches, or one can also pass a specific cache name(s) where to search for responses. The following table summarizes the [runtime filter options](filter.md#runtime-options) that can be passed to this stage to customize the default built-in cache-read listener behavior

| Property | Description | Types / Values | 
--- | --- | --- | 
`caches` | string or array of cache names to access | `"v1"`, `["assets", "v2"]`, etc. |
`storage` | string of type cache | `"cache"` for the [cache](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage) and `"indexedDB"` for [indexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB)

##### Examples
```javascript
swebRequest.onCacheMatch.addListener(null, { caches: "assets" })
```

#### onCacheMatchSuccess
The `onCacheMatchSuccess` stage is entered when there is a cache-hit. This is the best place where performing dual counterparts of actions that were done on the response before it was stored to the cache, i.e. decryption of an encrypted response, verification of a signed response, decompression of a compressed response, verification of the freshness of a timestamped response, refreshing of cached CSP nonces, etc. 

#### onCacheMatchError
The `onCacheMatchError` stage is 


### Network fetch 

#### onBeforeFetchRequest
#### onFetchRequest
#### onFetchRequestSuccess
#### onFetchRequestError

### Cache write

#### onBeforeCachePut
#### onCachePut
#### onCachePutCompleted

## Events specific stages

### fetch event

#### onRequestReceived
#### onResponseError
#### onRequestCompleted


### install event

#### onBeforeInstall
#### onInstall
#### onInstallCompleted


### activate event

#### onBeforeActivate
#### onActivate
#### onActivateCompleted


### message event

#### onBeforeMessage
#### onMessage
#### onMessageCompleted


### push event

#### onBeforePush
#### onPush
#### onPushCompleted



### sync event

#### onBeforeSync
#### onSync
#### onSyncCompleted


### periodicsync event

#### onBeforePeriodicSync
#### onPeriodicSync
#### onPeriodicSyncCompleted

### notificationclick event

#### onBeforeNotificationClick
#### onNotificationClick
#### onNotificationClickCompleted

### notificationclose event

#### onBeforeNotificationClose
#### onNotificationClose
#### onNotificationCloseCompleted


## Routing


