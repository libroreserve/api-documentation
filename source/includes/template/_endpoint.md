## Action Resource

> <span class="method put">GET</span> /restricted/restaurant/resource/:id

> REQUEST:

```shell
curl "https://api.libroreserve.com/restricted/restaurant/bookings/63873441/reschedule" \
  -X PUT \
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
      "date": "2025-05-07",
      "time": "17:00",
      "booking-experience-id": 123,
      "size": 2
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

This endpoint allows you to reschedule a booking. It will be used to increase/descrease booking size, change date and time or change booking experience.

### (Path or Query or Body) Parameters

<span class="dynamic-attributes" data-attr-type="rescheduleBooking"></span>

### Examples

- Increase booking size:

`PUT https://api.libroreserve.com/restricted/restaurant/bookings/63873441/reschedule?restaurant-code=0000000000&date=2025-05-07&time=17:00&size=4`

- Change booking date and time:

`PUT https://api.libroreserve.com/restricted/restaurant/bookings/63873441/reschedule?restaurant-code=0000000000&date=2025-05-07&time=17:00`


    
