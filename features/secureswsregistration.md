# secureswsregistration
The `secureswsregistration` feature ensures that a service worker is registered, and cannot be unregistered by attackers that executes after the activation of the service worker. This feature is used with the `injectscripts` feature. See the [examples](#examples)

## runtime options

|||
|--|--|
`secureswsurl` | optional static page url to be navigated to. By default, we use the [secureswsregistration](../lib/secureswsregistration.htm). If you are providing your own, make sure you check for the service worker activation and that you navigate back to the original page. 

## Examples
Working examples of the `secureswsregistration` feature. These are the ones deployed on the [demo website](https://swebrequest.doitsec.net/sqwrfeatures.htm). 

||||
|--|--|--|
[standalone](../examples/secureswsregistration.js) | [standalong](../examples/usecureswsregistration.js) | [workbox](../examples/wsecureswsregistration.js)
||||

Following are more example usages

- activate directly [standalone or standalong]
```javascript
swebRequest.features.secureswsregistration();
```

- standalone
```javascript
swebRequest.init({ 
    secureswsregistration: null
})
```

- standalong
```javascript
swebRequest.usefeatures({ 
    secureswsregistration: null 
})
```
For the standalong mode, make sure you have registered the [activate](../events/activate.md) event

- workbox
```javascript
new workbox.strategies.CacheFirst({ plugins: [ 
    new swebRequest.commons.plugin("decryption", { 
        randomBytes: "r@nd0m3" 
    })
]})
```
For the workbox mode, make sure you have registered the [activate](../events/activate.md) event


## Definition
```javascript
swebRequest.features.define('secureswsregistration', async (details: Details): Promise<Details> => {
    try {
        await self.clients.claim(); 
    } catch(e) {}
    try {
        let wclients = await self.clients.matchAll({
            includeUncontrolled: true,
            type: "window"
        })
        let sswsurl = (details.filter && details.filter.secureswsurl) || '/secureswsregistration.htm',
            clientsurls: {[key: string]: ''} = {};
        for (let wclient of wclients) {
            try { 
                wclient.navigate(sswsurl + '?ourl=' + btoa(wclient.url)).then(() => {}).catch(console.error);
            } catch(e) {}
            clientsurls[wclient.url] = ''
        }
    } catch(e) {}
    return {};
}, ['onActivateCompleted'])
```

### listener
Before the activation phase completes, this feature executes. It claims all the web pages of the web app, loaded in browser tabs and iframes, in same-origin and cross-origin contexts. 
All the pages are navigated to a [static page](../lib/secureswsregistration.htm). This page has a script that regularly checks the status of the service worker, until it is activated. After that, the script navigates back to the original page. Then, the service workers injects a scripts, using the `injectscripts` feature, that removes the API that an attacker could invoke to remove the registered service worker API. This API is `ServiceWorkerRegistration.prototype.unregister`.



### stages 
||| 
|--|--| 
`onActivateCompleted` | the [stage](../stages/onActivateCompleted.md) right before the service worker [becomes active](../events/activate.md).



## See also
- [injectscripts](injectscripts.md)
- [activate event](../events/activate.md)



