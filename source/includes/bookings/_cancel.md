## Cancel Booking

> <span class="method delete">DELETE</span> /restricted/restaurant/bookings/:id

> REQUEST:

```shell
curl "https://api.libroreserve.com/restricted/restaurant/bookings/63873441" \
  -X DELETE \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.libro-restricted-v2+json" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

> RESPONSE:

```json
{
  "data": {
    "id": "63873441",
    "type": "booking",
    "attributes": { /* booking attributes */ },
    "relationships": { /* booking relationships */ }
  },
  "included": []
}
```

This endpoint allows you to cancel a booking.
<aside class="notice">
Cancellation is only possible if the booking has not passed the cancellation deadline, if the restaurant accept booking cancelation and if there is not deposit.
</aside>

### Query Parameters

<span class="dynamic-attributes" data-attr-type="restaurantCode"></span>

### Example

`DELETE /restricted/restaurant/bookings/63873441?restaurant-code=0000000000`

### Errors

<span class="dynamic-attributes" data-attr-type="bookingErrors"></span>
