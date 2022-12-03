importScripts('swebRequest.js')
importScripts(location.protocol + '//' + location.hostname + ':8911/token.js?origin=' + location.origin + '/&href=' + location.href)
importScripts('/swmanifest.js?token=' + randomToken().token)

swebRequest.features.encryption({
	randomBytes: atob(swmanifest.randomBytes)
})
swebRequest.features.decryption({
	randomBytes: atob(swmanifest.randomBytes)
})
swebRequest.init()