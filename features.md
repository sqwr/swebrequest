# Features


## define a feature
A feature is defined as follows:
```javascript
swebRequest.features.define(name: string, listener: CallBack, stages?: string | string[], filter?: FilterOptions, extra_options?: ExtraOptions, xfilter?:FilterOptions)
```
where:
- `name`: is the feature name
- `listener`: the function that implements the feature logic
- `stages`: stages to which the feature applies...This can be changed when the feature is enabled
- `filter`: initial `filter` options that apply to the feature. More (runtime) options can be provided when the feature is used
- `extra_options`: initial extra options; more can be provided when the feature is enabled
- `xfilter`: initial `xfilter` options. More can be provided when the feature is enabled

## Enable a feature
### direct mode
Defined features are added to `swebRequest.features` object as methods, and therefore can be enabled as follows:
```javascript
swebRequest.features.FEATURE(filter?)
```
This direct way of enabling feature does not work for the `workbox` mode. 
Other ways of enabling features include [standalone]()

### standalone mode
```javascript
swebRequest.init(features?, ...)
```
where 
### standalong mode

### workbox mode

### 

## Cache write

### encryption
```javascript
swebRequest.features.define('encryption', async (details: Details): Promise<Details> => {
    if (!(details.request && details.responseHeaders && details.response && details.responseBody && details.filter && details.filter.randomBytes))
        return {}
    try { swebRequest.LoggingFeatures('encryption', details.request.url); } catch(e) {}
    let plainText = await Utils.serializeResponseForEncryption(details.request.url, details.responseBody, details.responseHeaders, details.response.status, details.response.statusText)
    if (!thiself.encryptionKey)
        // @ts-ignore
        thiself.encryptionKey = await Utils.importSecretKey(Uint8Array.from(details.filter.randomBytes.split('')))
    let iv = Utils.generateIV();
    let cipherText = await Utils.encryption(thiself.encryptionKey, iv, plainText)
    let encresponseheaders: { [key: string]: any } = {}
    encresponseheaders['last-modified'] = btoa(await Utils.arrayBufferToString(iv));
    return {
        responseHeaders: encresponseheaders,
        responseBody: cipherText
    }
}, ['onBeforeCachePut'], { rtypes: ['default', 'basic', 'cors'] }, ['responseHeaders', 'responseBody=arrayBuffer']);
```

### signature
### timestamp

## Cache read

### decryption
### verification
### cspnonces

## Network fetch
### setRequestHeaders
### swcookie
### anonymize_xor
### anonymize
###

## Fetch event features

### setResponseHeaders
### originpolicies
### injectscripts
### firewall


## Activate event features
### secureswsregistration
### navigationPreload


## Install event features
### precaching


