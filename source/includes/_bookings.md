# Bookings

> ENDPOINTS

> <span class="method get">GET</span> /restricted/restaurant/bookings/:id <br>
> <span class="method get">GET</span> /restricted/restaurant/bookings <br>
> <span class="method post">POST</span> /restricted/restaurant/bookings <br>
> <span class="method patch">PATCH</span> /restricted/restaurant/bookings/:id <br>
> <span class="method put">PUT</span> /restricted/restaurant/bookings/:id <br>
> <span class="method delete">DELETE</span> /restricted/restaurant/bookings/:id <br>

The Bookings API allows you to create, retrieve, and manage reservations.

## The Booking Object

> THE BOOKING OBJECT

```json
{
  "type": "booking",
  "id": "0000000000",
  "attributes": {
    "size": 2,
    "status": "approved",
    "time": "2025-07-09T17:00:00.000-04:00",
    "note": "We would like to have a table near the window",
    "table-number": null,
    "private-note": null,
    "expected-leave-at": "2025-07-09T18:30:00.000-04:00",
    "source": "google",
    "read-token": "17ca6f639",
    "edit-token": "17ca6f604",
    "booking-type": "reservation",
    "locale": "en",
    "created-at": "2025-07-08T22:54:26.708-04:00",
    "arrived-at": null,
    "confirmed-at": null,
    "seated-at": null,
    "completed-at": null,
    "canceled-at": null,
    "flags": {
        "children": false,
        "reduced-mobility": false,
        "do-not-move": false
    },
    "invoice": null,
    "affiliate": null,
    "cancelation-allowed-until": null
  }
}
```

### Booking Attributes

<span class="dynamic-attributes" data-attr-type="booking"></span>

## Get

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
        "data": null
      }
    }
  },
  "included": []
}
```

This endpoint retrieves a specific booking by its ID.

### Parameters

<span class="dynamic-attributes" data-attr-type="bookingGet"></span>

## List

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

### Parameters

<span class="dynamic-attributes" data-attr-type="bookingList"></span>

### Examples:

- Search by date:

`GET https://api.libroreserve.com/restricted/restaurant/bookings?date=2025-05-30`

- Search by date and time:

`GET https://api.libroreserve.com/restricted/restaurant/bookings?date=2025-05-30&time=13:00`

- Search by guest phone number:

`GET https://api.libroreserve.com/restricted/restaurant/bookings?guest-phone=15141111111`


## Create

> <span class="method post">POST</span> /restricted/restaurant/bookings

> REQUEST:

```shell
 curl "https://api.libroreserve.com/restricted/restaurant/bookings" \
  -X POST \
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
      "size": 2,
      "date": "2025-05-07",
      "time": "12:00",
      "note": "Birthday party",
      "locale": "en",
      "table-number": "12"
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
  }
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

### Parameters

<span class="dynamic-attributes" data-attr-type="createBooking"></span>

#### Person

<span class="dynamic-attributes" data-attr-type="bookingPerson"></span>


#### Device Infos

<span class="dynamic-attributes" data-attr-type="deviceInfos"></span>

## Update

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

<span class="dynamic-attributes" data-attr-type="updateBooking"></span>

## Cancel

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

### Parameters

<span class="dynamic-attributes" data-attr-type="cancelBooking"></span>

### Errors

<span class="dynamic-attributes" data-attr-type="bookingErrors"></span>


## Reschedule

> <span class="method put">PUT</span> /restricted/restaurant/bookings/:id/reschedule

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

### Parameters

<span class="dynamic-attributes" data-attr-type="rescheduleBooking"></span>

### Examples:

- Increase booking size:

`PUT https://api.libroreserve.com/restricted/restaurant/bookings/63873441/reschedule?restaurant-code=0000000000&date=2025-05-07&time=17:00&size=4`

- Change booking date and time:

`PUT https://api.libroreserve.com/restricted/restaurant/bookings/63873441/reschedule?restaurant-code=0000000000&date=2025-05-07&time=17:00`


    







