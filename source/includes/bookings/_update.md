## Update Booking

> <span class="method patch">PATCH</span> /restricted/restaurant/bookings/:id

> REQUEST:

```shell
curl "https://api.libroreserve.com/restricted/restaurant/bookings/63873441" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.libro-restricted-v2+json" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

> REQUEST BODY:

```json
{
  "restaurant-code": "0000000000",
  "data": {
    "attributes": {
      "note": "We would like to have a table near the window",
      "locale": "en"
    }
  }
}
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

This endpoint allows you to update some attributes of a booking.

### Parameters

<span class="dynamic-attributes" data-attr-type="restaurantCode"></span>

#### Body Attributes

<span class="dynamic-attributes" data-attr-type="updateBooking"></span>
