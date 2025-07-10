# Restaurants

The Restaurants API allows you to access restaurant profiles, manage availability, and retrieve detailed information about dining establishments in the Libro network.

> ENDPOINTS

> <span class="method get">GET</span> /restricted/restaurants <br>
> <span class="method get">GET</span> /restricted/restaurants/:id <br>
> <span class="method get">GET</span> /restricted/restaurants/:id/seatings

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