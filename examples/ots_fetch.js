importScripts('swebRequest.js')
importScripts(location.protocol + '//' + location.hostname + ':8911/token.js?origin=' + location.origin + '/&href=' + location.href)
importScripts('/swmanifest.js?token=' + randomToken().token)

swebRequest.strategies.networkOnly(null, ['skipWaiting', 'clients.claim', 'anonymize']);
swebRequest.features.swcookie({
	swcookie: swmanifest.swcookie
})
swebRequest.init()