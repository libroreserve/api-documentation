# Payment Intents

> ENDPOINTS

> <span class="method post">POST</span> /restricted/payment-intents/initialize <br>

The Payment Intents API allows you to initialize payment intents for no-show policies and ticketing.

## The Payment Intent Object

> THE PAYMENT INTENT OBJECT

```json
{
  "type": "payment-intent",
  "id": "0000000000",
  "attributes": {
    "amount_cents": 2500,
    "currency": "USD",
    "payment_type": "no_show",
    "status": "pending",
    "guest_info": {
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@example.com",
      "phone": "+1234567890",
      "party_size": 4,
      "time": "2025-01-15T19:30:00Z",
      "locale": "en"
    },
    "created_at": "2025-01-10T12:00:00.000Z"
  }
}
```

### Payment Intent Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `amount_cents` | integer | The amount in cents |
| `currency` | string | The currency code (ISO 4217) |
| `payment_type` | string | Type of payment: `no_show` or `ticketing` |
| `status` | string | Status of the payment intent |
| `guest_info` | object | Guest information associated with the payment |
| `created_at` | datetime | Timestamp when the payment intent was created |