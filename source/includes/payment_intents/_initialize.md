## Initialize Payment Intent

> <span class="method post">POST</span> /restricted/payment-intents/initialize

> REQUEST:

```shell
curl "https://api.libroreserve.com/restricted/payment-intents/initialize" \
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
      "amount_cents": 2500,
      "currency": "CAD",
      "payment_type": "no_show",
      "guest_info": {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "phone": "+1234567890",
        "party_size": 4,
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
            "amount_cents": 2500,
            "currency": "CAD",
            "status": "requires_payment_method",
            "payment_type": "no_show",
            "guest_info": {
                "first_name": "John",
                "last_name": "Doe",
                "email": "john.doe@example.com",
                "phone": "+1234567890",
                "party_size": 4,
                "time": "2025-01-15T19:30:00Z",
                "locale": "en"
            },
            "created_at": "2025-09-30T11:00:36-04:00",
            "updated_at": "2025-09-30T11:00:36-04:00",
            "payment_url": { /* payment url */ }
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
| `amount_cents` | integer | Yes | The amount in cents (must be greater than 0) |
| `currency` | string | Yes | The currency code (ISO 4217 format, e.g., "USD", "EUR") |
| `payment_type` | string | No | Type of payment: `no_show` or `ticketing` (default: `no_show`) |
| `guest_info` | object | Yes | Guest information object (see below) |

#### Guest Info Attributes

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `first_name` | string | Yes | Guest's first name |
| `last_name` | string | Yes | Guest's last name |
| `email` | string | Yes | Guest's email address |
| `phone` | string | Yes | Guest's phone number |
| `party_size` | integer | Yes | Number of guests (must be greater than 0) |
| `time` | string | Yes | Booking datetime in ISO8601 format |
| `locale` | string | Yes | Guest's locale (e.g., "en", "fr") |

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 201 | Payment intent created successfully |
| 401 | Unauthorized: Missing or invalid token |
| 403 | Forbidden: Missing required scopes |
| 422 | Unprocessable entity: Validation errors |

### Using the Payment URL

The `payment_url` returned in the response is the URL you should send your users to so they can complete the payment authorization. You have two integration options:

#### Option 1: Iframe Integration

You can embed the payment URL in an iframe on your site:

```html
<iframe src="PAYMENT_URL" width="100%" height="600px"></iframe>
```

When the user completes the payment authorization, we will send a `postMessage` to the parent window that you can listen for:

```javascript
window.addEventListener('message', (event) => {
  if (event.data.status === 'payment_success') {
    const paymentIntentId = event.data.paymentIntentId;
    // Close the iframe and continue with booking creation
  }
});
```

The message structure is:
```
{
  status: 'payment_success',
  paymentIntentId: 'INTENT_ID'
}
```

#### Option 2: Redirect Integration

You can redirect the user directly to the payment URL. To specify where the user should be redirected after completing the payment authorization, include a `redirect_url` query parameter:

`https://payment-url.example.com?redirect_url=https://yoursite.com/booking/complete`

After the user completes payment authorization, he will be redirected to the URL you provided.