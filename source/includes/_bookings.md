# Bookings

The Bookings API allows you to create, retrieve, and manage reservations.

## The Booking Object

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

| Parameter | Type | Description |
| --- | --- | --- |
| **size** | number | Number of guests in the booking. |
| **time** | string, ISO 8601 | Scheduled arrival time. |
| **table-number** | string | Assigned table number. |
| **private-note** | string, read only | Internal/private note. |
| **note** | string | Public note. |
| **locale** | string, BCP 47 code | Guest’s preferred language (e.g., "en", "fr-CA"). |
| **status** | string, readonly | Current status of the booking (e.g., "arrived"). |
| **booking-type** | string, readonly | Type of booking (e.g., "walkin"). |
| **source** | string, readonly | Booking source (e.g., "dashboard"). |
| **created-at** | string, ISO 8601, readonly | When the booking was created. |
| **arrived-at** | string, ISO 8601, readonly | When the guest arrived. |
| **expected-leave-at** | string, ISO 8601, readonly | Expected time of departure. |
| **confirmed-at** | string or null, readonly | When the booking was confirmed. |
| **seated-at** | string or null, readonly | When the guest was seated. |
| **completed-at** | string or null, readonly | When the booking was completed. |
| **canceled-at** | string or null, readonly | When the booking was canceled. |
| **cancelation-allowed-until** | timestamp or null | The exact timestamp until which the reservation can be canceled. If a timestamp is provided, the reservation is cancelable until that specific time. If null, it means cancellation is not allowed. |

## Get

> Request:

```shell
curl "https://api.libroreserve.com/restricted/restaurant/bookings/63873441" \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.libro-restricted-v2+json" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```


> Response:

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

### HTTP Request

`GET https://api.libroreserve.com/restricted/restaurant/bookings/63873441`


## List

> Request:

```shell
curl "https://api.libroreserve.com/restricted/restaurant/bookings" \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.libro-restricted-v2+json" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```


> Response:

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

### HTTP Request

`GET https://api.libroreserve.com/restricted/restaurant/bookings`

### Query Parameters

| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| **limit** | Integer | Number of records per request | Yes |
| **offset** | Integer | Record offset to start from for pagination | No |
| **updated-after** | DateTime | Limit results to those updated after this date/time | No |
| **created-after** | DateTime | Limit results to those created after this date/time | No |
| **started-after** | DateTime | Limit results to those with a start time after the specified timestamp | No |
| **started-before** | DateTime | Limit results to those with a start time before the specified timestamp | No |
| **date** | Date | Retrieve bookings for a specific date in the format YYYY-MM-DD | No |
| **time** | String | Retrieve bookings for a specific time in the format HH:mm. This parameter must be used in combination with the date | No |
| **status** | String | Retrieve bookings with a specific status (approved, canceled, confirmed, noshow, pending, seated, partial, arrived, completed) | No |
| **guest-id** | Integer | Guest ID to filter the bookings | No |
| **guest-phone** | String | Guest’s phone number in international format | No |
| **guest-email** | String | Guest’s email address | No |
| **restaurant-code** | String |  | No |

### Examples:

- Search by date:

`GET https://api.libroreserve.com/restricted/restaurant/bookings?date=2025-05-30`

- Search by date and time:

`GET https://api.libroreserve.com/restricted/restaurant/bookings?date=2025-05-30&time=13:00`

- Search by guest phone number:

`GET https://api.libroreserve.com/restricted/restaurant/bookings?guest-phone=15141111111`


## Create

> Request:

```shell
 curl "https://api.libroreserve.com/restricted/restaurant/bookings" \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.libro-restricted-v2+json" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

> Request Body:

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

> Response:

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

### HTTP Request

`POST https://api.libroreserve.com/restricted/restaurant/bookings`

### Query Parameters

| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| restaurant-code | string | Code of the restaurant to create the booking for | yes |
| date | string | Booking date (format YYYY-MM-DD) | yes |
| time | string | Booking time (format HH:MM:SS) | yes |
| size | integer | Number of guests | yes |
| note | string | Note for the restaurant staff | no |
| locale | string | Guest's preferred language (BCP 47 code) | no |
| table-number | string | Table number for the booking | no |
| booking-experience-id | integer | ID of the booking experience | no |

#### Person

| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| id | integer | Guest's ID | yes |
| first-name | string | Guest's first name | yes |
| last-name | string | Guest's last name | yes |
| email | string | Guest's email address | yes |
| phone | string | Guest's phone number | yes |
| preferred-communication-channel | string | Preferred contact method ("email" or "phone") | no |
| locale | string | Guest's language preference | no |

#### Device Infos

| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| id | string | Unique identifier for the device | yes |
| ip | string | IP address of the device | yes |


## Update

> Request:

```shell
curl "https://api.libroreserve.com/restricted/restaurant/bookings/63873441" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.libro-restricted-v2+json" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

> Request Body:

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

> Response:

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

### HTTP Request

`PATCH https://api.libroreserve.com/restricted/restaurant/bookings/63873441`

### Query Parameters

| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| restaurant-code | string | Code of the restaurant to update the booking for | yes |
| note | string | Note for the restaurant staff | no |
| locale | string | Guest's preferred language (BCP 47 code) | no |

## Cancel

> Request:

```shell
curl "https://api.libroreserve.com/restricted/restaurant/bookings/63873441" \
  -X DELETE \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.libro-restricted-v2+json" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

> Response:

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
Cancellation is only possible if the booking has not passed the cancellation deadline.
</aside>

### HTTP Request

`DELETE https://api.libroreserve.com/restricted/restaurant/bookings/63873441`

### Query Parameters

| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| restaurant-code | string | Code of the restaurant to cancel the booking for | yes |

### Errors

| Error Code | Description |
|----------|-------------|
| 404 | Booking not found |
| 409 | Booking could not be canceled |


## Reschedule

> Request:

```shell
curl "https://api.libroreserve.com/restricted/restaurant/bookings/63873441/reschedule" \
  -X PUT \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.libro-restricted-v2+json" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

> Request Body:

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

> Response:

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

### HTTP Request

`PUT https://api.libroreserve.com/restricted/restaurant/bookings/63873441/reschedule`

### Query Parameters

| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| restaurant-code | string | Code of the restaurant to reschedule the booking for | yes |
| date | string | Booking date (format YYYY-MM-DD) | yes |
| time | string | Booking time (format HH:MM:SS) | yes |
| size | integer | Number of guests | yes |
| booking-experience-id | integer | ID of the booking experience | no |


    







