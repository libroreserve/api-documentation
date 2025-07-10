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

This endpoint retrieves all restaurants available to your connected account.
