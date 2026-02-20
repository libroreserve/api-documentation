## List Restaurants

> <span class="method get">GET</span> /restricted/restaurants

> REQUEST:

```shell
curl "https://api.libroreserve.com/restricted/restaurants" \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.libro-restricted-v2+json" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```



> RESPONSE:

```json
{
  "data": [
    {
      "id": "0000000000",
      "type": "restaurant",
      "attributes": { /* restaurant attributes */ }
    },
    {
      "id": "0000000001",
      "type": "restaurant",
      "attributes": { /* restaurant attributes */ }
    }
  ]
}
```

This endpoint retrieves all restaurants available to your connected account. You can filter results by name, geographic location, or features.

### Query Parameters

<span class="dynamic-attributes" data-attr-type="restaurantList"></span>

### Examples

- Search by name:

`GET https://api.libroreserve.com/restricted/restaurants?query=Chez Marcel`

- Search by location (nearby restaurants sorted by distance):

`GET https://api.libroreserve.com/restricted/restaurants?latitude=45.5017&longitude=-73.5673&radius=10&unit=km`

- Filter by features:

`GET https://api.libroreserve.com/restricted/restaurants?features=bookings,orders`

- Sort by name:

`GET https://api.libroreserve.com/restricted/restaurants?sort=name:asc`

See [Pagination](#pagination) for more details.
