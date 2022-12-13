# Fetch meta data
[Fetch meta data](https://developer.mozilla.org/en-US/docs/Glossary/Fetch_metadata_request_header) are headers that browsers add to requests that signal to web servers how the request was made and how the response is intended to be used. When service workers modify intercepted requests, the original values of fetch meta data headers will change. This may be an issue if these headers influence any server-side logic. 
To mitigate this issue, features that manipulate same-origin requests can be instructed to make copies of original fetch meta data headers into custom requests headeres as shown in the following table.

| Original header | Custom header |
|--|--|
`sec-fetch-dest` | `x-sec-fetch-dest`
`sec-fetch-mode` | `x-sec-fetch-mode`

Features that manipulate same-origin requests include [setRequestHeaders](../features/setRequestHeaders.md), [swcookie](../features/swcookie.md) and [anonymize](../features/anonymize.md).

The new headers added provide the same information as their original counterparts. In particular if the requests are redirected to a `swebRequest`-powered Cloudflare worker that further forwards request to the origin server, the original fetch medata headers can be recovered. See [proxyrewriteresponses](proxyrewriteresponses.md) and [proxyrewriterequests](proxyrewriterequests.md) for more details