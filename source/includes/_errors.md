# Errors

<aside class="notice">
This error section is stored in a separate file in <code>includes/_errors.md</code>. Slate allows you to optionally separate out your docs into many files...just save them to the <code>includes</code> folder and add them to the top of your <code>index.md</code>'s frontmatter. Files are included in the order listed.
</aside>

The Kittn API uses the following error codes:


Error Code | Meaning
---------- | -------
400 | Bad Request -- Your request is invalid.
401 | Unauthorized -- The token is missing or invalid.
402 | Unauthorized -- Your subscription plan does not allow API access, please contact success@libroreserve.com to subscribe the Premium Plan
403 | Forbidden -- The token has expired or is invalid.
404 | Not Found -- The specified resource could not be found.
405 | Method Not Allowed -- The token does not allow access to this endpoint.
406 | Not Acceptable -- You requested a format that isn't json.
409 | Conflict -- The request could not be completed due to a conflict with the current state of the resource.
429 | Too Many Requests -- You're requesting too many resources! Slow down!
500 | Internal Server Error -- We had a problem with our server. Try again later.
503 | Service Unavailable -- We're temporarily offline for maintenance. Please try again later.
