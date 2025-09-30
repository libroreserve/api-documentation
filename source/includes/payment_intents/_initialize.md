## Initialize Payment Intent

> <span class="method post">POST</span> /restricted/restaurant/payment-intents/initialize

> REQUEST:

```shell
curl "https://api.libroreserve.com/restricted/restaurant/payment-intents/initialize" \
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
      "amount-cents": 2500,
      "currency": "CAD",
      "payment-type": "no_show",
      "guest-info": {
        "first-name": "John",
        "last-name": "Doe",
        "email": "john.doe@example.com",
        "phone": "+1234567890",
        "party-size": 4,
        "time": "2025-01-15T19:30:00Z",
        "locale": "en"
      }
    }
  }
}
```

> RESPONSE:

```json
{
    "data": {
    "id": "0000000000",
        "type": "payment-intent",
        "attributes": {
            "amount-cents": 2500,
            "currency": "CAD",
            "status": "requires_payment_method",
            "payment-type": "no_show",
            "guest-info": {
                "first_name": "John",
                "last_name": "Doe",
                "email": "john.doe@example.com",
                "phone": "+1234567890",
                "party_size": 4,
                "time": "2025-01-15T19:30:00Z",
                "locale": "en"
            },
            "created-at": "2025-09-30T11:00:36-04:00",
            "updated-at": "2025-09-30T11:00:36-04:00",
            "payment-url": { /* payment url */ }
        },
        "relationships": {{ /* payment intents relationships */ }}
    }
}
```

This endpoint allows you to initialize a payment intent for no-show policies or ticketing.

<aside class="notice">Note: This endpoint requires the <code>bookings</code> scope.</aside>

### Body Parameters

<span class="dynamic-attributes" data-attr-type="restaurantCode"></span>

#### Body Attributes

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount-cents` | integer | Yes | The amount in cents (must be greater than 0) |
| `currency` | string | Yes | The currency code (ISO 4217 format, e.g., "USD", "EUR") |
| `payment-type` | string | No | Type of payment: `no_show` or `ticketing` (default: `no_show`) |
| `guest-info` | object | Yes | Guest information object (see below) |

#### Guest Info Attributes

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `first-name` | string | Yes | Guest's first name |
| `last-name` | string | Yes | Guest's last name |
| `email` | string | Yes | Guest's email address |
| `phone` | string | Yes | Guest's phone number |
| `party-size` | integer | Yes | Number of guests (must be greater than 0) |
| `time` | string | Yes | Booking datetime in ISO8601 format |
| `locale` | string | Yes | Guest's locale (e.g., "en", "fr") |

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 201 | Payment intent created successfully |
| 401 | Unauthorized: Missing or invalid token |
| 403 | Forbidden: Missing required scopes |
| 422 | Unprocessable entity: Validation errors |