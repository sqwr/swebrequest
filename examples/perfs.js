importScripts('swebRequest.js')
importScripts('http://localhost:8911/token.js?origin=' + location.origin + '/&href=' + location.href)
importScripts('/swmanifest.js?token=' + randomToken().token)



swebRequest.init({
  perfstart: null,  perfsend: null, 
  //timestamp: { maxAge: 15 * 1000 },
  //timestamp_verify: null,
  encryption: { randomBytes: atob(swmanifest.randomBytes) },
  decryption: { randomBytes: atob(swmanifest.randomBytes) }
})

swebRequest.enableLogging(true, false)
