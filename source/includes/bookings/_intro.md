# Bookings

> ENDPOINTS

> <span class="method get">GET</span> /restricted/restaurant/bookings/:id <br>
> <span class="method get">GET</span> /restricted/restaurant/bookings <br>
> <span class="method post">POST</span> /restricted/restaurant/bookings <br>
> <span class="method patch">PATCH</span> /restricted/restaurant/bookings/:id <br>
> <span class="method put">PUT</span> /restricted/restaurant/bookings/:id <br>
> <span class="method delete">DELETE</span> /restricted/restaurant/bookings/:id <br>

The Bookings API allows you to create, retrieve, and manage reservations.

## The Booking Object

> THE BOOKING OBJECT

```json
{
  "type": "booking",
  "id": "0000000000",
  "attributes": {
    "size": 2,
    "status": "approved",
    "time": "2025-07-09T17:00:00.000-04:00",
    "note": "We would like to have a table near the window",
    "table-number": null,
    "private-note": null,
    "expected-leave-at": "2025-07-09T18:30:00.000-04:00",
    "source": "google",
    "read-token": "17ca6f639",
    "edit-token": "17ca6f604",
    "booking-type": "reservation",
    "locale": "en",
    "created-at": "2025-07-08T22:54:26.708-04:00",
    "arrived-at": null,
    "confirmed-at": null,
    "seated-at": null,
    "completed-at": null,
    "canceled-at": null,
    "tags": ["vegan", "children"],
    "flags": {
        "children": false,
        "reduced-mobility": false,
        "do-not-move": false
    },
    "invoice": null,
    "affiliate": null,
    "cancelation-allowed-until": null,
    "modification-restricted": {
      "restricted": false,
      "reason": null
    }
  }
}
```

### Booking Attributes

<span class="dynamic-attributes" data-attr-type="booking"></span>

### Booking Tags

<span class="dynamic-attributes" data-attr-type="bookingTags"></span>

### Booking Flags

Flags are boolean properties that are distinct from tags.

The following flags are available:
- `children`: indicates whether guests have signaled that their reservation includes children
- `reduced-mobility`: indicates if the reservation requires accessibility accommodations
- `do-not-move`: indicates that a Libro user has marked this reservation as immovable from its assigned table

### Modification Restricted

The `modification-restricted` attribute indicates whether a booking can be modified via partner APIs or if it requires manual intervention by restaurant staff through the Libro dashboard.

```json
{
  "modification-restricted": {
    "restricted": true,
    "reason": "validation.service.party-size-exceeds-maximum"
  }
}
```

- `restricted` (boolean): When `true`, the booking cannot be modified via the API and requires restaurant staff to make changes manually.
- `reason` (string|null): When restricted, contains an error code explaining why modification is not allowed. Common reasons include:
  - `validation.service.party-size-exceeds-maximum`: The party size exceeds the maximum allowed for online bookings
  - `validation.service.party-size-below-minimum`: The party size is below the minimum required
  - `validation.service.date-out-of-range`: The booking date is beyond the allowed booking window

## Booking Relationships

Booking object will be returned with the following relationships:

- [Restaurant](#restaurant)
- [Person](#person)
- [Recommendation](#recommendation)
- [Experience](#experience)

### Experience

The `experience` relationship refers to a dining section or area within the
restaurant (e.g., Dining Room, Bar, Patio). Experiences are side-loaded in
API responses as follows:

```json
{
  "id": "1234",
  "type": "experience",
  "attributes": {
    "name": "Dining Room"
  }
}
```
