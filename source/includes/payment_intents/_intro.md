# Payment Intents

Payment Intents are objects that track the lifecycle of a payment transaction initiated by a partner on behalf of their customer. They represent the intent to collect a payment and track the state of that payment through its lifecycle.

## The PaymentIntent object

> Example PaymentIntent object

```json
{
  "id": "pi_a1b2c3d4e5f6",
  "amount_cents": 1000,
  "currency": "USD",
  "status": "requires_payment_method",
  "partner_id": "123",
  "restaurant_code": "rest_abc123",
  "payment_type": "no-show",
  "provider": null,
  "external_reference": null,
  "collect_url": null,
  "subject_type": "Booking",
  "subject_id": "456",
  "created_at": "2025-09-11T15:30:00Z",
  "updated_at": "2025-09-11T15:30:00Z"
}
```

### Attributes

Attribute | Type | Description
--------- | ---- | -----------
id | string | Unique identifier for the payment intent. Always starts with `pi_`.
amount_cents | integer | Amount in cents to be collected.
currency | string | Three-letter ISO currency code, in uppercase (e.g., "USD").
status | string | Status of the payment intent. One of: `requires_payment_method`, `processing`, `succeeded`, `failed`, `canceled`.
partner_id | string | ID of the partner initiating the payment.
restaurant_code | string | Code of the restaurant associated with this payment.
payment_type | string | Type of payment being collected. One of: `no-show`, `ticketing`.
provider | string | Payment provider to be used (optional).
external_reference | string | External reference ID for the payment (optional).
collect_url | string | URL where the customer can complete the payment (optional).
subject_type | string | Type of object this payment is associated with (polymorphic).
subject_id | string | ID of the object this payment is associated with (polymorphic).
created_at | datetime | When the payment intent was created.
updated_at | datetime | When the payment intent was last updated.

### Payment Intent Status Flow

The payment intent status follows this lifecycle:

1. `requires_payment_method` - Initial state, waiting for payment method
2. `processing` - Payment is being processed
3. `succeeded` - Payment was successful
4. `failed` - Payment failed
5. `canceled` - Payment was canceled
