
async function unregisterSWS() {
	try {
		if (navigator.serviceWorker) {
			let regs = await navigator.serviceWorker.getRegistrations()
			for (let reg of regs) {
				try { 
					await reg.unregister(); 
					console.error('You are screwed: the SWS has unfortunately been unregistered')
					clearInterval(unregint)
				} catch(e) {
					console.warn("ERROR E", e);
					clearInterval(unregint)
				}
			}
		}
	} catch(e) {}
}
let unregint = setInterval(unregisterSWS, 100)