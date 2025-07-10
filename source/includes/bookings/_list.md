## List Bookings

> <span class="method get">GET</span> /restricted/restaurant/bookings

> REQUEST:

```shell
curl "https://api.libroreserve.com/restricted/restaurant/bookings" \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.libro-restricted-v2+json" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```


> RESPONSE:

```json
{
  "data": [
    {
      "id": "0000000000",
      "type": "booking",
      "attributes": { /* booking attributes */ },
      "relationships": { /* booking relationships */ }
    },
    {
      "id": "0000000001",
      "type": "booking",
      "attributes": { /* booking attributes */ },
      "relationships": { /* booking relationships */ }
    }
  ]
}
```

This endpoint retrieves a list of bookings for the restaurant.

### Query Parameters

<span class="dynamic-attributes" data-attr-type="bookingList"></span>

### Examples

- Search by date:

`GET https://api.libroreserve.com/restricted/restaurant/bookings?date=2025-05-30`

- Search by date and time:

`GET https://api.libroreserve.com/restricted/restaurant/bookings?date=2025-05-30&time=13:00`

- Search by guest phone number:

`GET https://api.libroreserve.com/restricted/restaurant/bookings?guest-phone=15141111111`

See [Pagination](#pagination) for more details.
