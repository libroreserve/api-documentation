# Payment Collection Flows

The payment collection integration supports both synchronous and asynchronous flows to accommodate different integration scenarios. This section explains the differences between these flows, when to use each, and how they work.

## Overview

Libro's payment system uses a hybrid model that supports two types of payment collection:

- **Synchronous Flow:** Payment is initiated and completed during the reservation process (disruptive to the user flow)
- **Asynchronous Flow:** Reservation is created and payment is completed later via a link sent to the guest (non-blocking)

The choice between synchronous and asynchronous flows depends on your integration context and user experience requirements.

## Payment Types

| Payment Type | Purpose | Sync Flow | Async Flow |
|:-------------|:--------|:----------|:-----------|
| **NO_SHOW** | Authorize credit card to protect against no-shows | ✓ Implemented | ✓ Implemented |
| **TICKETING** | Capture payment for events/experience tickets | ✓ Implemented | 🚧 Work in Progress |

## Synchronous Flow

In the synchronous flow, payment authorization or capture happens **during** the reservation process. The user must complete the payment step before the booking can be finalized.

### When to Use Synchronous Flow

- Immediate payment confirmation required before finalizing reservation
- Provides immediate feedback and confirmation to user 
- When you need instant confirmation and payment processing

### PaymentIntent Usage in Sync Flow

The synchronous flow uses a **PaymentIntent** for both NO_SHOW and TICKETING payment types:

- **Sync NO_SHOW:** Uses PaymentIntent ✓
- **Sync TICKETING:** Uses PaymentIntent ✓

### How Synchronous Flow Works

#### Step 1: Check Availability

Call `GET /restricted/restaurant/seatings` to check availability for the desired date and time:

```shell
curl "https://api.libroreserve.com/restricted/restaurant/seatings?restaurant-code=QC01621448XXXX&date=2026-07-09&size=2" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

The response indicates if payment is required:

```json
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
          "payment-type": "NO_SHOW",
          "amount-cents": 2500,
          "payment-delay": 7200
        }
      }
    ]
  }
}
```

If `payment-required` is `false`, proceed directly to booking creation without payment. If `payment-required` contains `NO_SHOW` or `TICKETING`, continue to Step 2.

#### Step 2: Initialize Payment Intent

Call `POST /restricted/payment-intents/initialize` with reservation and guest details:

```json
{
  "restaurant-code": "QC01621448XXXX",
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

The API returns a PaymentIntent with a `payment-url`:

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
      "payment-url": "https://pay.libro.app/..."
    }
  }
}
```

#### Step 3: Display Payment Portal in iFrame or with Redirection

The portal displays:

- **For NO_SHOW:** Credit card authorization form

- **For TICKETING:** Offer selection and payment capture form


**Option 1: Iframe Integration**

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

**Option 2: Redirect Integration**

You can redirect the user directly to the payment URL. To specify where the user should be redirected after completing the payment authorization, include a `redirect_url` query parameter:

`https://payment-url.example.com?redirect_url=https://yoursite.com/booking/complete`

After the user completes payment authorization, he will be redirected to the URL you provided.

#### Step 4: Create Booking with PaymentIntent

Once the user completes payment (via either iframe or redirect), create the booking using the PaymentIntent ID.

Call the booking creation endpoint with the PaymentIntent ID:

```json
{
  "restaurant-code": "QC01621448XXXX",
  "data": {
    "attributes": {
      "time": "2025-01-15T19:30:00Z",
      "party-size": 4,
      "payment-intent-id": "0000000000"
      // ... other booking attributes
    }
  }
}
```

#### Step 5: Booking Approved

- **For NO_SHOW:** Booking is approved with no show authorization confirmed
- **For TICKETING:** Payment is captured, ticket is emitted, and booking is approved

## Asynchronous Flow

In the asynchronous flow, the reservation is **created**, and payment is completed later as a follow-up action. The guest receives a link via SMS or email to complete the payment. If is not completed in time, the link expires and the reservation is automatically canceled.

### When to Use Asynchronous Flow

- Create reservations without disrupting guest experience
- Guest completes payment at their convenience via link

### How Asynchronous Flow Works

#### Step 1: Create Booking

Call the booking creation endpoint with the reservation details.

```json
{
  "restaurant-code": "QC01621448XXXX",
  "data": {
    "attributes": {
      "time": "2025-01-15T19:30:00Z",
      "party-size": 4
      // ... other booking attributes
    }
  }
}
```

#### Step 2: Guest Receives Payment Link

The guest automatically receives a link via SMS or email:

- **For NO_SHOW:** Link to complete no show authorization
- **For TICKETING:** Link to select an offer and complete payment (Work In Progress)

#### Step 3: Guest Completes Payment

The guest clicks the link and completes the payment action:

- **For NO_SHOW:** Enters credit card information for authorization
- **For TICKETING:** Selects an offer and completes payment capture

#### Step 4: Booking Approved

Once the payment is complete:

- **For NO_SHOW:** No-show protection is activated, booking is approved
- **For TICKETING:** Payment is captured, ticket is emitted, booking is approved

#### Step 5: Link Expiration

The payment link expires after the grace period specified in `payment-delay` (from the availabilities endpoint):

- If the guest completes payment within the grace period → Booking is approved
- If the link expires without payment → Booking is automatically cancelled

## Flow Comparison

### Synchronous Flow

```
Partner → Check Availability → Initialize PaymentIntent → Display Portal → Guest Pays → Create Booking → Approved
         (seatings endpoint)   (with reservation info)   (iframe/redirect)              (with intent ID)
```

**Key Characteristics:**

- Payment authorization happens **before** booking creation

- Requires PaymentIntent object (for both NO_SHOW and TICKETING)

- User must complete payment to proceed (via iframe or redirect)

- Immediate confirmation

### Asynchronous Flow

```
Partner → Create Booking → Booking Pending → Send Link → Guest Pays → Booking Approved
         (payment pending)                   (SMS/Email)
```

**Key Characteristics:**

- Booking created **first**

- Guest completes payment at their convenience

- Link has expiration time

- Booking can be automatically cancelled if payment is not completed in time


## Next Steps

- Review the [PaymentIntent Object](#the-payment-intent-object) structure
- Learn how to [Initialize a PaymentIntent](#initialize-payment-intent) for synchronous flows
- Explore the [Bookings API](#bookings) for creating reservations
- Check the [Restaurant Availabilities](#get-restaurant-availability) endpoint for payment requirements
