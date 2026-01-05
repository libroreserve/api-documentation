## Create Booking

> <span class="method post">POST</span> /restricted/restaurant/bookings

> REQUEST:

```shell
 curl "https://api.libroreserve.com/restricted/restaurant/bookings" \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.libro-restricted-v2+json" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

> REQUEST BODY WITH PERSON DATA:

```json

{
  "restaurant-code": "0000000000",
  "data": {
    "attributes": {
      "size": 2,
      "date": "2025-05-07",
      "time": "12:00",
      "note": "Birthday party",
      "locale": "en",
      "table-number": "12",
      "classifications": [{"1": 1}, {"2": 1}]
    },
    "relationships": {
      "person": {
        "data": {
          "type": "people",
          "attributes": {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john@doe.com",
            "phone": "5141111111",
            "preferred-communication-channel": "email",
            "locale": "en"
          }
        }
      }
    }
  },
  "device-infos": {
    "id": "XXXXXXXXXXX",
    "ip": "192.168.1.1"
  },
  "payment-intent-id": 10
}
```

> REQUEST BODY WITH PERSON ID:

```json

{
  "restaurant-code": "0000000000",
  "data": {
    "attributes": {
      "size": 2,
      "date": "2025-05-07",
      "time": "12:00",
      "note": "Birthday party",
      "locale": "en",
      "table-number": "12",
      "classifications": [{"1": 1}, {"2": 1}]
    },
    "relationships": {
      "person": {
        "data": {
          "type": "people",
          "id": 1234567890
        }
      }
    }
  },
  "device-infos": {
    "id": "XXXXXXXXXXX",
    "ip": "192.168.1.1"
  },
  "payment-intent-id": 10
}
```

> RESPONSE:

```json
{
  "data": {
    "id": "0000000000",
    "type": "booking",
    "attributes": {
      "size": 2,
      "status": "approved",
      "time": "2025-05-07T12:00:00.000-04:00",
      "table-number": "3",
      "note": "Birthday party",
      "private-note": null,
      "expected-leave-at": "2025-05-07T13:30:00.000-04:00",
      "source": "widget",
      "read-token": "17cb72339",
      "edit-token": "17cb722f3",
      "booking-type": "reservation",
      "locale": "en",
      "created-at": "2025-05-06T17:13:14.250-04:00",
      "arrived-at": null,
      "confirmed-at": null,
      "seated-at": null,
      "completed-at": null,
      "canceled-at": null
    },
    "relationships": { /* booking relationships */ }
  },
  "included": []
}
```

This endpoint allows you to create a new booking.

<aside class="notice">Note: You can choose rather to pass the ID of a Person or the full Person attributes.</aside>

### Body Parameters

<span class="dynamic-attributes" data-attr-type="restaurantCode"></span>

#### Body Attributes

<span class="dynamic-attributes" data-attr-type="createBooking"></span>

#### Relationship Person

<span class="dynamic-attributes" data-attr-type="personId"></span>

#### Person Attributes

<span class="dynamic-attributes" data-attr-type="person"></span>


#### Device Infos

<span class="dynamic-attributes" data-attr-type="deviceInfos"></span>

#### Payment Intent ID

<span class="dynamic-attributes" data-attr-type="paymentIntentId"></span>

