# Changelog

## January 2026

### Structured Error Codes

**New Feature** - API error responses now include structured error codes to help you programmatically handle errors.

Error responses include three fields:

- `code`: A unique error code (e.g., "2005")
- `message`: A human-readable description
- `error`: The legacy error key for backwards compatibility

Error codes are grouped into ranges:

- **1xxx**: Restaurant-level errors (authentication, configuration)
- **2xxx**: Service/availability errors (slots, capacity)
- **3xxx**: Booking data errors (validation)
- **4xxx**: Operation errors (cancel, payment)

See the [Error Codes](#error-codes) section for the complete list.

### Booking Modification Restricted Attribute

**New Feature** - The Booking object now includes a `modification-restricted` attribute that indicates whether a booking can be modified via partner APIs.

When `restricted` is `true`, the booking requires manual intervention by restaurant staff through the Libro dashboard. The `reason` field provides a specific error code explaining why the booking cannot be modified programmatically.

See the [Modification Restricted](#modification-restricted) section in the Booking documentation for details.

## October 2025

### Payment Intents API

**New Feature** - We've added a new Payment Intents flow to the API, allowing you to initialize payment intents for no-show protection and ticketing scenarios.

Key features:

- Initialize payment intents with booking details
- Support for Stripe and Moneris payment processing
- Secure payment handling for reservations

See the [Payment Intents](#payment-intents) section for complete documentation and integration examples.
