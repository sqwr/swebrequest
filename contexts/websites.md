# Websites
Websites in browsers is where `swebRequest` shows all its potential. It can be used in the [modes](../modes.md), but we recommend the [standalone](../modes/standalone.md) for new service workers. If you have a Wordpress website, check out the [wordpress plugin](wordpress.md#plugin) that you can load to enable `swebRequest` and its features in your site. 

Check out [our demos](../demos.md)

```javascript
importScripts('swebRequest.js');
swebRequest.init({
    signature: { randomBytes: "r@nd0m321" },
    verification: { randomBytes: "r@nd0m321" }
})
```
