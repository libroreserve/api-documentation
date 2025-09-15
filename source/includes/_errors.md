# Common Errors

The Libro API uses the following error codes:


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
422 | Unprocessable Entity -- The request could not be completed due to a validation error.
429 | Too Many Requests -- You're requesting too many resources!
500 | Internal Server Error -- We had a problem with our server. Try again later.

`validation.offer.empty` indicates that the selected time slot requires payment through the ticketing system before a reservation can be completed.