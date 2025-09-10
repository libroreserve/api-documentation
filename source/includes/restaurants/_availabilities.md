## Get Restaurant Availability

> <span class="method get">GET</span> /restricted/restaurant/seatings

> REQUEST:

```shell
curl "https://api.libroreserve.com/restricted/restaurant/seatings?restaurant-code=QC01621448XXXX&date=2026-07-09&size=2" \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.libro-restricted-v2+json" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

> RESPONSE:

```json
# Response with experiences and no-show authorization is not required.
{
  "2025-09-11": {
    "2025-09-11T16:00:00": [
      {
        "id": 4253,
        "name": {
            "en": "Dining Room",
            "fr": "Salle à Diner"
        },
        "payment-required": false
      }
    ],
    "2025-09-11T16:15:00": [
      {
        "id": 4253,
        "name": {
            "en": "Dining Room",
            "fr": "Salle à Diner"
        },
        "payment-required": false
      }
    ]
  }
}
```

```json
# Response with experiences and no-show authorization is required.
{
  "2025-09-11": {
    "2025-09-11T21:00:00": [
      {
        "id": 4253,
        "name": {
            "en": "Dining Room",
            "fr": "Salle à Diner"
        },
        "payment-required": {
            "payment-type": "NO_SHOW",
            "amount-cents": 25000,
            "payment-delay": 7200
        }
      }
    ],
    "2025-09-11T21:15:00": [
      {
        "id": 4253,
        "name": {
            "en": "Dining Room",
            "fr": "Salle à Diner"
        },
        "payment-required": {
            "payment-type": "NO_SHOW",
            "amount-cents": 25000,
            "payment-delay": 7200
        }
      }
    ]
  }
}
```

```json
# Response without experiences:
{
  "2025-09-11": {
    "2025-09-11T11:00:00": [
      {
        "payment-required": false
      }
    ],
    "2025-09-11T11:15:00": [
      {
        "payment-required": false
      }
    ],
    "2025-09-11T11:30:00": [
      {
        "payment-required": false
      }
    ]
  }
}      
```

This endpoint retrieves restaurant availabilities.
### Query Parameters

<span class="dynamic-attributes" data-attr-type="restaurantGetAvailability"></span>

### No-Show Policies

The following attributes are available if the restaurant has configured a no-show policy for the
selected time slot.

Once a booking is submitted, the guest will receive an email or SMS to confirm the reservation with a credit card.

The deposit grace period defines the amount of time the guest has to enter their credit card information to finalize the reservation. 
If the card details are not provided within this time frame, the pending reservation will be automatically canceled and the table will be released.

| Name              | Type    | Description |
|:------------------|:--------|-------------------------------------------------------------|
| **payment-type**  | string  | Defaults to "NO_SHOW"                                       |
| **amount-cents**  | integer | Payment amount in cents that will be charged for a no-show  |
| **payment-delay** | integer | Deposit Request Grace Period in seconds                     |