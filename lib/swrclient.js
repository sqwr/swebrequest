const swebRequest = (() => {
	async function serializeResponse(response) {
   	 	let result = {
   	 		body: await response.arrayBuffer(),
			status: response.status,
			statusText: response.statusText
		}, headers = {};
		for(let entries of response.headers.entries()){
			headers[entries[0]] = entries[1];
		}
		result.headers = headers;
		return result;
	}
	async function serializeRequest(request) {
		let result = {}, headers = {}
		result.headers = {};
		for(let entries of request.headers.entries()){
			headers[entries[0]] = entries[1];
		}
		result.headers = headers;
		result.destination = request.destination;
		result.credentials = request.credentials;
		result.mode = request.mode;
		result.method = request.method;
		result.referrer = request.referrer;
		result.integrity = request.integrity;
		result.redirect = request.redirect;
		if (['get', 'head'].indexOf(request.method.toLowerCase()) == -1)
			result.body = await request.arrayBuffer()
		return {
			url: request.url,
			init: result
		}
	}
    function receiveMessage(id, callback, event) {
		if (event.data.id == id)
			callback(event)
	}

	function sendMessageToServiceWorker(msg) {
		return new Promise((resolve, reject) => {
			let func = null
			let resolver = (event) => {
				let response = event.data.response 
				if (typeof response == 'object' && 'body' in response)
					resolve(new Response(response.body, { 
						headers: response.headers || {},
						status: response.status || 0,
						statusText: response.statusText || 'OK'
					}))
				else
					resolve(response)
				navigator.serviceWorker.removeEventListener('message', func)
			}
			let id = '___' + Math.random() + '___'
			func = receiveMessage.bind(null, id, resolver)
			navigator.serviceWorker.addEventListener('message', func)
			msg.id = id
            msg.from = 'swebRequest'
			navigator.serviceWorker.controller.postMessage(msg)
		})
	}
	
	async function fetchRequest(request, direct) {
		let msg = { type: 'fetch' }
		if (request instanceof Request)
			msg.request  = await serializeRequest(request)
		else
			msg.url = request
		msg.direct = direct
		return sendMessageToServiceWorker(msg)
	}
	async function fetchncachewrite(request, cachename) {
		let msg = { type: 'fetchncachewrite' }
		msg.cachename = cachename
		if (request instanceof Request)
			msg.request  = await serializeRequest(request)
		else
			msg.url = request
		return sendMessageToServiceWorker(msg)
	}
	async function cacheread(request, cachename) {
		let msg = { type: 'cacheread' }
		msg.cachename = cachename
		if (request instanceof Request)
			msg.request  = await serializeRequest(request)
		else
			msg.url = request
		return sendMessageToServiceWorker(msg)
	}
	async function cachewrite(request, response, cachename) {
		let msg = { type: 'cachewrite' }
		msg.cachename = cachename
		if (request instanceof Request)
			msg.request  = await serializeRequest(request)
		else
			msg.url = request
		if (response instanceof Response)
			msg.response = await serializeResponse(response)
		else
			msg.data = response
		return sendMessageToServiceWorker(msg)
	}
	async function idbread(request, dbname, dbversion) {
		let msg = { type: 'idbread' }
		msg.dbname = dbname 
		msg.dbversion = dbversion
		if (request instanceof Request)
			msg.request  = await serializeRequest(request)
		else
			msg.url = request
		return sendMessageToServiceWorker(msg)
	}
	async function idbwrite(request, response, dbname, dbversion) {
		let msg = { type: 'idbwrite' }
		msg.dbname = dbname 
		msg.dbversion = dbversion
		if (request instanceof Request)
			msg.request  = await serializeRequest(request)
		else
			msg.url = request
		if (response instanceof Response)
			msg.response = await serializeResponse(response)
		else
			msg.data = response
		return sendMessageToServiceWorker(msg)
	}
	async function fetchnidbwrite(request, dbname, dbversion) {
		let msg = { 
			type: 'fetchnidbwrite',
			dbname: dbname,
			dbversion: dbversion 
		}
		if (request instanceof Request)
			msg.request  = await serializeRequest(request)
		else
			msg.url = request
		return sendMessageToServiceWorker(msg)
	}
    return {
        idbread: idbread,
        idbwrite: idbwrite,
        cacheread: cacheread,
        cachewrite: cachewrite,
        fetch: fetchRequest,
        fetchncachewrite: fetchncachewrite,
        fetchnidbwrite: fetchnidbwrite,
    }
}) ();
