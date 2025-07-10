# Resources

> ENDPOINTS

> <span class="method get">GET</span> /restricted/restaurant/resource/:id <br>
> <span class="method get">GET</span> /restricted/restaurant/resource <br>
> <span class="method post">POST</span> /restricted/restaurant/resource <br>
> <span class="method patch">PATCH</span> /restricted/restaurant/resource/:id <br>
> <span class="method put">PUT</span> /restricted/restaurant/resource/:id <br>
> <span class="method delete">DELETE</span> /restricted/restaurant/resource/:id <br>

The Resources API allows you to create, retrieve, and manage resources.

## The Resource Object

> THE RESOURCE OBJECT

```json
{
  "type": "resource",
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
    "flags": {
        "children": false,
        "reduced-mobility": false,
        "do-not-move": false
    },
    "invoice": null,
    "affiliate": null,
    "cancelation-allowed-until": null
  }
}
```

### Resource Attributes

<span class="dynamic-attributes" data-attr-type="resource"></span>

## Resource Relationships

Resource object will be returned with the following relationships:

- [Restaurant](#restaurant)
- [Person](#person)
- [Recommendation](#recommendation)
- [Experience](#experience)