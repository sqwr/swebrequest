#  Usage modes
`swebRequest` usage modes refer to whether one is writing a brand new service worker, or has an existing service worker to be augmented with security and privacy features. 
A goog number of service worker events can only be registered once. More precisely, only the first instance of the registration will be considered while the subsequent registrations will be ignored. This is the case for the `install`, `activate` and the `fetch` which we recall is the core of `swebRequest`. 

## Standalone mode
In the `standalone` mode (the recommended usage mode), `swebRequest` will transparently register those events, and then execute stages, listeners, enabled features and perform enabled routing strategies. In particular, the `indexedDB` storage usage can be enabled whenever necessary, to accomodate more advanced types of HTTP responses (to `POST`, `PUT` methods for instance) 


## Standalong modes
In the `standalong` mode on the contrary, `swebRequest` assumes that the registration of the different events (`fetch`, `install`, `activate`), and routing is done by the existing service worker. This also implies that the original service worker is transparently performing common API calls itself, such as cache operations (i.e. `caches.match`, `cache.put`, `cache.addAll`) and network fetch (i.e. `fetch`). Consequently, the stages where those APIs calls were performed in the `standalone` mode, will no more be executed in the `standalong` mode. That is the case of the `onCacheMatch`, `onCachePut`, `onFetchRequest`, `onInstall`, and `onActivate` stages. This means that any features defined at those stages ***WILL NOT BE ENABLED***. Fortunately, `swebRequest` has been designed so that ***MOST FEATURES*** can be implemented on the stages before and after those common APIs call stages.
Therefore, in order to apply enabled features, `swebRequest` will place hooks around the original events registration and common API calls done by existing service workers. Then, before the original call occurs, `swebRequest` can execute appropriate features. Then the original call can be performed by the existing service worker. Then after the original call `swebRequest` will  execute appropriate features, before returning the original API call. Technically, this is done with the JavaScript Proxy API.


 
In particular, there are limitations on what one can do depending on whether
In the `standalone` mode, 
-  idea of the modes builds on the fact that some service workers events
The different modes refer to whether `swebRequest` is being used
- to 
First, get a copy of `swebRequest` on [Github](https://github.com/sqwr/swebrequest/)

```javascript
importScripts("swebRequest.js");
```
## Standalone
This mode refers to using `swebRequest` to write 
```javascript
swebRequest.init(_features?: { [type: string]: FilterOptions }, _strategies?: { [type: string]: FilterOptions }, _stages?: { [type: string]: FilterOptions }, _standalone?: boolean, _phases?: { [type: string ]: boolean } )
```

### Supported events and stages

### Standalong
```javascript
swebRequest.usefeatures()
```


### Workbox


## Syntax


## Examples

### Standalone 
#### Registration of the fetch event
```javascript
self.addEventListener(this.name, (event: any) => {
    event.respondWith(new Promise((resolve, reject) => {
        let odetails: Details = { request: event.request, response: undefined, phase: this.name, event: event }
        this.execute(odetails).then((fdetails: Details) => {
            try { console.log("RESPONSE TO ", fdetails.request?.url, ' COMES FROM', fdetails.event.responsefrom) } catch(e) {}
            resolve((fdetails && fdetails.response) || new Response())
        }).catch(reject);
    }));
});
```

#### Registration of the activate event
```javascript
self.addEventListener('install', event => {
    event.waitUntil(swebRequest.stages.onBeforeInstall.execute({
        phase: 'install',
        event: event
    }));
});
```


#### Registration of the activate event
```javascript
self.addEventListener('activate', event => {
    event.waitUntil(swebRequest.stages.onBeforeActivate.execute({
        phase: 'activate',
        event: event
    }));
});
```
        
#### Registration of the push event

```javascript
self.addEventListener('push', (event: any) => {
    this.execute({
        phase: 'push',
        data: event.data,
        event: event
    }).then((details: Details) => {
        if (details && details.notification) {
            try {
                let noptions: { [key: string]: any } = {}
                for (let nkey in details.notification)
                    if (nkey != 'title' && nkey != 'url') 
                        noptions[nkey] = details.notification[nkey];
                const notification = new self.Notification(details.notification.title, noptions);
                if (details.notification.url) {
                    notification.addEventListener('click', () => {
                        self.clients.openWindow(details.notification.url);
                    });
                }
                self.registration.showNotification(notification).then(() => {}).catch(() => {});
            } catch(e) {}
        }
    }).catch(e => {
        console.error("Error while handling the push stages", e);
    })
});
```
