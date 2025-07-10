## Get Restaurant Availability

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

