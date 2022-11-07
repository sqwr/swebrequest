# swebRequest features in action

We have set up a website demonstrating most of the features and strategies of `swebRequest`. It can be accessed at https://swebrequest.doitsec.net/home.htm


## Steps to see the effects of `swebRequest`
***The effects of `swebRequest` are logs in the service worker console***. Opening the service workers console logs depends on the browser. 
### Chromium-based browsers
Service worker logs are mixed with other logs and displayed in the [Console panel](https://developer.chrome.com/docs/devtools/open/#shortcuts)

### Firefox
Service workers logs are **NOT** displayed in the normal  [Console Panel](https://firefox-source-docs.mozilla.org/devtools-user/browser_console/index.html#opening-the-browser-console). The service worker must be registered first before one can inspect and view its logs. Therefore, to view service worker logs:
		- First navigate the website that deploys a service worker. This will cause the service worker to be registered in the browser
		- Go to `about:debugging#/runtime/this-firefox`. There is a `Service Workers` Section listing the registered service workers. Make sure the service worker is running, and then click on the `Inspect` button next to 
		- Find the service worker in 

### Safari
