# swebRequest client
A companion `swebRequest` code to be loaded and executed in clients contexts (web page, dedicated and shared workers) in order to interact with a `swebRequest`-powered service worker. The interface exposed by [the client](../lib/swrclient.js) consist of APIs (i.e. `swebRequest.fetch` ) that accepts request objects and expects response objects in return. These objects are (de)serialized by the companion during its exchange with the service worker. 

## Examples
- make a fetch via the service worker.
```javascript
( async () => {
    let response = await swebRequest.fetch('/data.json')
}) ();
```
- read an cached response
```javascript
( async () => {
    let response = await swebRequest.cacheread('/data.json')
}) ();
```
- fetch and store response in cache
```javascript
( async () => {
    let response = await swebRequest.fetchandcachewrite('/data.json')
}) ();
```
These calls are made from the contexts of clients...They are forwarded to the service worker that will process them and return a response, all in a single call.

## Loading in clients
Get a copy of [swrclient.js](../lib/swrclient.js)
- loading in web pages
```html
<script src="/swrclient.js" type="application/javascript">
```
- loading in dedicated and shared workers
```javascript
importScripts('/swrclient.js');
```


## API
```javascript
swebRequest.fetch(request: Request, direct: boolean = false) : Promise<Response>
swebRequest.cacheread(request: Request, cachename: string): Promise<Response>
swebRequest.idbread(request: Request, dbname: string, dbversion: number): Promise<Response>
swebRequest.fetchncachewrite(request: Request, cachename: string): Promise<Response>
swebRequest.fetchnidbwrite(request: Request, dbname: string, dbversion: number): Promise<Response>
```
See [onMessage](../stages/onMessage.md#listener) on how those calls are handled by the `swebRequest`. 

The parameters are described as follows:
|||
|--|--|
`request` | request object or URL
`cachename` | cache name string
`dbname` | indexedDB name string
`dbversion`| indexedDB version number 
`direct` | boolean, defaulting to `false`. When `true`, the `swebRequest` will make a direct 
`fetch()` call, without executing listeners at stages [onBeforeFetchRequest](../stages/onBeforeFetchRequest.md), [onFetchRequestSuccess](../stages/onFetchRequestSuccess.md)

Each of these methods will cause a post message to be sent by the client to the service worker.
The message data will have 2 special fields:
|||
|--|--|
`from` | `swebRequest`: meaning that the message is sent from a `swebRequest` client
`id` | a random string that uniquely identifies the message. This is used to map the response that will be sent by the service worker to the message sent, so that the response is properly delivered.
`type` | the name of API, i.e. `fetch`, `cacheread`, `idbread`, `fetchncachewrite`, `fetchnidbwrite`

The calls to all these methods are asynchronous. Note requests and response objects are serialized before they are exchanged between the client and the service worker context. 