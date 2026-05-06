# Changelog

## April 2026

### Async TICKETING Flow Now Available

**Update** - The asynchronous TICKETING payment flow is now fully implemented. Previously marked as "Work in Progress", this flow allows guests to select an offer and complete ticket payment via a link sent by SMS or email after the booking is created.

See the [Payment Collection Flows](#payment-collection-flows) section for complete details on both sync and async flows.

### Payment Intent Datetime Format

**Breaking Change** - The `time` parameter in the Payment Intents API now expects a datetime **without** a timezone marker. Use the restaurant's local time in ISO 8601 format with no `Z` suffix and no UTC offset (e.g., `2025-01-15T19:30:00`). This matches the format returned by the seatings endpoint.

## February 2026

### Restaurant List Filtering and Sorting

**New Feature** - The List Restaurants endpoint now supports filtering and sorting options:

- **Search by name** using the `query` parameter
- **Search by location** using `latitude`, `longitude`, `radius`, and `unit` parameters — results are sorted by distance
- **Filter by features** using the `features` parameter
- **Sort results** using the `sort` parameter (e.g., `sort=name:asc`)

See the [List Restaurants](#list-restaurants) section for the full list of query parameters.

### People Endpoint Sorting

**Update** - The List People endpoint now returns results sorted by ID in descending order (most recently created first).

### Webhook Signature Verification

**New Feature** - Libro now signs webhook requests using HMAC-SHA256 when a signing secret is configured. Each request includes an `X-Libro-Signature` header with:

- `t`: Unix timestamp when the signature was generated
- `v1`: The HMAC-SHA256 signature

To verify a signature, concatenate the timestamp and the raw request body with a period (`{timestamp}.{payload}`), compute the HMAC-SHA256 hash using your signing secret, and compare with the `v1` value. We recommend rejecting webhooks with a timestamp older than **5 minutes**.

See the [Webhooks](#webhooks) section for full verification details and security best practices.

### Updated Error Codes

**Update** - The following error codes have been added and removed:

Added:
- `1005` — `restaurant_required`
- `1006` — `date_time_required`
- `2008` — `service_not_found`
- `3001` — variant for `experience_not_found`

Removed:
- `4002` — `payment_failed` (no longer in use)

See the [Error Codes](#error-codes) section for the complete list.

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
