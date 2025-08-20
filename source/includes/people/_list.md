## List People

> <span class="method get">GET</span> /restricted/people

> REQUEST:

```shell
curl "https://api.libroreserve.com/restricted/people?restaurant-code=QC0000000001" \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.libro-restricted-v2+json" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

> RESPONSE:

```json
{
  "data": [
    {
      "id": "18476003",
      "type": "person",
      "attributes": {
        "first-name": "Johnny",
        "last-name": "Doe",
        "email": "john@gmail.com",
        "phone": "225-951-4433",
        "note": "Lorem Ipsum",
        "tags": ["vvip", "vegan"]
      }
    },
    {
      "id": "18476004",
      "type": "person",
      "attributes": {
        "first-name": "Jane",
        "last-name": "Smith",
        "email": "jane@gmail.com",
        "phone": "225-955-7788",
        "note": "Prefers window seating",
        "tags": ["regular"]
      }
    }
  ],
  "meta": {
    "page": {
      "limit": 25,
      "offset": 0,
      "total": 2
    }
  }
}
```

This endpoint retrieves a list of people associated with a restaurant.

### Query Parameters

<span class="dynamic-attributes" data-attr-type="personList"></span>

### Examples

- Search by phone number:

`GET https://api.libroreserve.com/restricted/people?restaurant-code=QC0000000001&guest-phone=%2B15141111111`

- Paginate results:

`GET https://api.libroreserve.com/restricted/people?restaurant-code=QC0000000001&limit=10&offset=20`

See [Pagination](#pagination) for more details.