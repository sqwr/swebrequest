# Extensions
Service workers powered [Manifest v3 Chrome extensions](https://developer.chrome.com/docs/extensions/mv3/service_workers/). Though caching and routing fetch events is not the core of Chrome extensions, `swebRequest` can still be used in those contexts as well. 

All you need to do is to set `"type: module"` in the manifest of the extension
```json
"background": {
    "service_worker": "background.js", "type": "module"
}
```
Now in the `background.js` file that has the logic of the service worker, `swebRequest` can be imported and used as in any other context
```javascript
importScripts('swebRequest.js');
```