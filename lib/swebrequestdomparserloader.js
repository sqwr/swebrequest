let swebrequestdomparserloader = false;
try {
	if (!swebrequestdomparserloader) {
		importScripts('swebrequestwasmloader.js');
		swebrequestdomparserloader = true;
	}
} catch(e) { console.error("ERROR HERE", e); }

if (!swebrequestdomparserloader) {
	try { importScripts('swebrequestcheerio.js'); } catch(e) {}
}