# Restaurants

The Restaurants API allows you to access restaurant profiles, manage availability, and retrieve detailed information about dining establishments in the Libro network.

## The Restaurant Object

```json

{
  "type": "restaurant",
  "id": "0000000000",
  "attributes": {
    "name": "Example Restaurant",
    "active": true,
    "code": "ZZ000000000000",
    "latitude": 45.5001,
    "longitude": -73.5665,
    "tz": "America/Montreal",
    "created-at": "2024-01-01T12:00:00.0-04:00",
    "online-booking-lead-months": 6,
    "cancelation-delay": 86400,
    "service-scopes": [
      {
          "name": "Diner",
          "startTime": "10:00",
          "endTime": "15:00"
      },
      {
          "name": "Souper",
          "startTime": "15:00",
          "endTime": "03:00"
      }
    ]
  }
}
```

### Restaurant Attributes

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Unique identifier for the restaurant |
| name | string | Name of the restaurant |
| active | boolean | Whether the restaurant is currently active in the system |
| code | string | Unique restaurant code |
| latitude | number | Geographic latitude coordinate |
| longitude | number | Geographic longitude coordinate |
| tz | string | Restaurant timezone (IANA format) |
| created-at | string | ISO timestamp of when the restaurant was created |
| online-booking-lead-months | integer | Number of months in advance online bookings are accepted |
| cancelation-delay | integer | Cancellation window in seconds (e.g., 86400 = 24 hours) |
| service-scopes | array | Array of service periods with name, startTime and endTime |

## Get
> Request:

```shell
curl "https://api.libroreserve.com/restricted/restaurants?restaurant-code=QC016214487921" \
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
      "type": "restaurant",
      "attributes": { /* restaurant attributes */ }
    }
  ]
}
```

This endpoint retrieves a specific restaurant by its code.

### HTTP Request

`GET https://api.libroreserve.com/restricted/restaurants?restaurant-code=QC01621448XXXX`

### Query Parameters

| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| restaurant-code | string | Restaurant code | Yes |

## List

> Request:

```shell
curl "https://api.libroreserve.com/restricted/restaurants" \
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
      "type": "restaurant",
      "attributes": { /* restaurant attributes */ }
    },
    {
      "id": "0000000001",
      "type": "restaurant",
      "attributes": { /* restaurant attributes */ }
    }
  ]
}
```

This endpoint retrieves all restaurants available to your connected account.

### HTTP Request

`GET https://api.libroreserve.com/restricted/restaurants`


## Get Availability
> Response with experiences:

```json
{
  "2026-07-09": {
    "2026-07-09T11:00:00": [
      {
        "id": 5211,
        "name": {
            "en": "Dinning Room",
            "fr": "Salle à manger"
        }
      }
    ],
    "2026-07-09T11:15:00": [
      {
        "id": 5211,
        "name": {
          "en": "Dinning Room",
          "fr": "Salle à manger"
        }
      }
    ]
  }
}
```

> Response without experiences:

```json
{
  "2026-07-09": {
    "2026-07-09T11:00:00": true,
    "2026-07-09T11:15:00": true,
  }
}
```

This endpoint retrieves restaurant availabilities.

### HTTP Request

`GET https://api.libroreserve.com/restricted/restaurants/seatings?restaurant-code=QC01621448XXXX&date=2026-07-09&size=2`

### Query Parameters

| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| restaurant-code | string | Restaurant code | Yes |
| date | string | Date in YYYY-MM-DD format | Yes |
| size | integer | Party size | Yes |
