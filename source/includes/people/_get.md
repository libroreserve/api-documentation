## Get Person

> <span class="method get">GET</span> /restricted/people/:id

> REQUEST:

```shell
curl "https://api.libroreserve.com/restricted/people/18476003" \
  -X GET \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.libro-restricted-v2+json" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

> RESPONSE:

```json
{
  "data": {
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
  }
}
```

This endpoint allows you to retrieve a person's details.

### Path Parameters

<span class="dynamic-attributes" data-attr-type="personId"></span>
