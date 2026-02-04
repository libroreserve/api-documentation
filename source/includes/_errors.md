# Common Errors

The Libro API uses the following HTTP status codes:

HTTP Code | Meaning
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

## Error Response Format

> Example error response:

```json
{
  "error": "validation.service.slots-unavailable-not-specific",
  "code": "2005",
  "message": "Party size is outside the allowed range for online booking. Please contact the restaurant directly."
}
```

Error responses include the following fields:

Field | Description
----- | -----------
error | A machine-readable error key for backwards compatibility
code | A unique error code for programmatic error handling
message | A human-readable description of the error

## Error Codes

The API uses structured error codes to help you programmatically handle errors. Error codes are grouped into ranges by category:

### Restaurant-level Errors (1xxx)

Code | Error Key | Description
---- | --------- | -----------
1001 | validation.restaurant.login-required | Customer login is required for this restaurant
1002 | validation.restaurant.recaptcha-required | Recaptcha verification is required
1003 | validation.restaurant.recaptcha-invalid | Invalid recaptcha response format
1004 | validation.restaurant.recaptcha-failed | Recaptcha verification failed
1005 | You must select a restaurant | Restaurant selection is required
1006 | You must select a date & time | Date and time selection is required

### Service/Availability Errors (2xxx)

Code | Error Key | Description
---- | --------- | -----------
2001 | validation.service.slots-unavailable-not-specific | The requested time slot is not available
2002 | validation.service.slots-unavailable-not-specific | The booking window for this time has closed
2003 | validation.service.slots-unavailable-not-specific | Not enough availability for the requested party size
2004 | validation.service.slots-unavailable-not-specific | Not enough availability at the requested time
2005 | validation.service.slots-unavailable-not-specific | Party size is outside the allowed range for online booking
2006 | exception.no-table | No suitable table is available for this reservation
2007 | validation.service.date-out-of-range | The requested date is outside the booking window
2008 | service-not-found | The requested date and time is not available

### Booking Data Errors (3xxx)

Code | Error Key | Description
---- | --------- | -----------
3001 | validation.experience.unavailable | The selected experience is not available at this restaurant
3001 | experience-not-found | The selected experience is not available at this restaurant
3002 | validation.classifications.invalid-restaurant | One or more classifications are not valid for this restaurant
3003 | validation.booking.invalid | Booking validation failed
3004 | validation.offer.empty | A prepaid offer selection is required for this reservation

### Operation Errors (4xxx)

Code | Error Key | Description
---- | --------- | -----------
4001 | validation.booking.not-cancelable | This booking cannot be canceled via the API

<aside class="notice">
The <code>error</code> field is provided for backwards compatibility. We recommend using the <code>code</code> field for programmatic error handling as it provides more specific information.
</aside>