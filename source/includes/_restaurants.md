# Restaurants

> ENDPOINTS

> <span class="method get">GET</span> /restricted/restaurants <br>
> <span class="method get">GET</span> /restricted/restaurants/:id <br>
> <span class="method get">GET</span> /restricted/restaurants/:id/seatings

The Restaurants API allows you to access restaurant profiles, manage availability, and retrieve detailed information about dining establishments in the Libro network.

## The Restaurant Object

> THE RESTAURANT OBJECT

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

### Attributes

<span class="dynamic-attributes" data-attr-type="restaurant"></span>

## Get

> <span class="method get">GET</span> /restricted/restaurants?restaurant-code=QC01621448XXXX

> REQUEST:

```shell
curl "https://api.libroreserve.com/restricted/restaurants?restaurant-code=QC016214487921" \
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
      "type": "restaurant",
      "attributes": { /* restaurant attributes */ }
    }
  ]
}
```

This endpoint retrieves a specific restaurant by its code.

### Parameters

<span class="dynamic-attributes" data-attr-type="restaurantGet"></span>

## List

> <span class="method get">GET</span> /restricted/restaurants

> REQUEST:

```shell
curl "https://api.libroreserve.com/restricted/restaurants" \
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


## Get Availability

> <span class="method get">GET</span> /restricted/restaurants/seatings

> REQUEST:

```shell
curl "https://api.libroreserve.com/restricted/restaurants/seatings?restaurant-code=QC01621448XXXX&date=2026-07-09&size=2" \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.libro-restricted-v2+json" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

> RESPONSE:

```json
# Response with experiences:
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

```json
# Response without experiences:
{
  "2026-07-09": {
    "2026-07-09T11:00:00": true,
    "2026-07-09T11:15:00": true,
  }
}
```

This endpoint retrieves restaurant availabilities.

### Query Parameters

<span class="dynamic-attributes" data-attr-type="restaurantGetAvailability"></span>

