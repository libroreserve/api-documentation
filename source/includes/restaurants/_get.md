## Get Restaurant

This endpoint retrieves a specific restaurant by its code.

### Query Parameters

<span class="dynamic-attributes" data-attr-type="restaurantGet"></span>


> <span class="method get">GET</span> /restricted/restaurants?restaurant-code=QC01621448XXXX

> REQUEST:

```shell
curl "https://api.libroreserve.com/restricted/restaurants?restaurant-code=QC016214487921" \
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
    }
  ]
}
```