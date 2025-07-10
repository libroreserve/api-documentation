## Get Booking

> <span class="method get">GET</span> /restricted/restaurant/bookings/:id

> REQUEST:

```shell
curl "https://api.libroreserve.com/restricted/restaurant/bookings/63873441" \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.libro-restricted-v2+json" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```


> RESPONSE:

```json
{
  "data": {
    "id": "63873433",
    "type": "booking",
    "attributes": {
      "size": 2,
      "status": "seated",
      "time": "2025-04-30T10:45:00.000-04:00",
      "note": "",
      "table-number": null,
      "note": "Birthday party",
      "private-note": "",
      "expected-leave-at": "2025-04-30T12:15:00.000-04:00",
      "source": "dashboard",
      "read-token": "17cb72002",
      "edit-token": "17cb72018",
      "booking-type": "reservation",
      "locale": null,
      "created-at": "2025-04-30T10:51:01.730-04:00",
      "arrived-at": "2025-04-30T10:51:01.729-04:00",
      "confirmed-at": null,
      "seated-at": null,
      "completed-at": null,
      "canceled-at": "2025-05-06T17:32:19.190-04:00"
    },
    "relationships": {
      "person": {
        "data": {
          "id": "XXXXXXXXX",
          "type": "person"
        }
      },
      "restaurant": {
        "data": {
          "id": "XXXX",
          "type": "restaurant"
        }
      },
      "recommendation": {
        "data": {
          "id": "XXXXXXXXX",
          "type": "recommendation"
        }
      },
      "experience": {
        "data": {
          "id": "XXXXXXXXX",
          "type": "experience"
        }
      }
    }
  },
  "included": []
}
```

This endpoint retrieves a specific booking by its ID.

### Path Parameters

<span class="dynamic-attributes" data-attr-type="bookingGet"></span>