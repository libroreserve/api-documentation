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
# Response with experiences and no-show authorization and offer selection are not required.
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
# Response with experiences and an eligible offer is available.
{
  "2025-09-11": {
    "2025-09-11T20:00:00": [
      {
        "id": 4253,
        "name": {
            "en": "Dining Room",
            "fr": "Salle à Diner"
        },
        "payment-required": {
            "payment-type": "TICKETING",
            "amount-cents": 1500,
            "offer": {
                "id": 42,
                "name": "Sunday Night Football",
                "number": "PR123ABC",
                "description": "Come watch the game!"
            }
        }
      }
    ],
    "2025-09-11T20:15:00": [
      {
        "id": 4253,
        "name": {
            "en": "Dining Room",
            "fr": "Salle à Diner"
        },
        "payment-required": {
            "payment-type": "TICKETING",
            "amount-cents": 1500,
            "offer": {
                "id": 42,
                "name": "Sunday Night Football",
                "number": "PR123ABC",
                "description": "Come watch the game!"
            }
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

### Payment Requirements

The `payment-required` attribute indicates whether payment is required for a time slot. When payment is required,
it includes additional details based on the type of payment.

#### Priority Logic

When both offers and no-show policies exist for a time slot, the following priority order applies:

1. **Non-optional offers** (with available tables) → Returns `TICKETING` payment type (overrides no-show policies)
2. **Optional offers + no-show policy** → Returns `TICKETING` payment type (overrides no-show policies)
3. **Optional offers + no policy** → Returns `TICKETING` payment type
4. **No offer + no-show policy** → Returns `NO_SHOW` payment type
5. **No offer + no policy** → Returns `false`

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

### Offers

The following attributes are available if the restaurant has an eligible published offer for the selected time slot.

An offer is only included if it matches the service time, day of week, experience, and the required tables are available.

| Name              | Type    | Description |
|:------------------|:--------|-------------------------------------------------------------------|
| **payment-type**  | string  | Defaults to "TICKETING" when an offer is available                |
| **amount-cents**  | integer | Ticket price in cents for the offer                               |
| **offer**         | object  | Offer details (see below)                                         |

#### Offer Object Attributes

| Name              | Type    | Description |
|:------------------|:--------|-------------------------------------------------------------------|
| **id**            | integer | Unique identifier for the offer                                   |
| **name**          | string  | Display name of the offer                                         |
| **number**        | string  | Offer reference number                                            |
| **description**   | string  | Description of the offer                                          |

### Internal Schedule Availability

> REQUEST (v3, with internal availability):

```shell
curl "https://api.libroreserve.com/restricted/restaurant/seatings?restaurant-code=QC01621448XXXX&date=2026-07-09&size=2" \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.libro-restricted-v3+json" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

> RESPONSE:

```json
# Each availability is flagged with whether it comes from an internal schedule.
{
  "2026-07-09": {
    "2026-07-09T18:00:00": [
      {
        "id": 4253,
        "name": {
            "en": "Dining Room",
            "fr": "Salle à Diner"
        },
        "payment-required": false,
        "internal": false
      }
    ],
    "2026-07-09T18:15:00": [
      {
        "id": 4253,
        "name": {
            "en": "Dining Room",
            "fr": "Salle à Diner"
        },
        "payment-required": false,
        "internal": true
      }
    ]
  }
}
```

Internal schedules are configured by the restaurant for operational use and are normally **hidden from public/online availability**. Each availability entry includes an `internal` boolean that indicates whether the slot comes from an internal schedule.

| Name         | Type    | Description |
|:-------------|:--------|------------------------------------------------------------------------------|
| **internal** | boolean | `true` when the slot comes from an internal schedule (hidden from public/online availability), `false` for regular public availability. |

To receive internal schedule availability, the request must satisfy all of the following:

- Use API **v3** by sending the `Accept: application/vnd.libro-restricted-v3+json` header.
- Use an access token granted the `availability:all` scope. Requests without this scope receive a `403 Forbidden`.
- The restaurant must have internal availability sharing enabled for your application (enabled by default; a restaurant manager can disable it per application).

<aside class="notice">
The <code>internal</code> attribute is only returned by the v3 seatings endpoint. The v2 endpoint never returns internal schedule availability.
</aside>