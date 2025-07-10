## List Reviews

> <span class="method get">GET</span> /restricted/restaurant/reviews

> REQUEST:

```shell
curl "https://api.libroreserve.com/restricted/restaurant/reviews?restaurant-code=QCXXXXXXXXXX" \
  -X GET \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.libro-restricted-v2+json" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

> RESPONSE:

```json
{
    "data": [
        {
            "id": "1234567890",
            "type": "review",
            "attributes": { /* review attributes */ },
            "relationships": { /* review relationships */ }
        },
        {
            "id": "1234567891",
            "type": "review",
            "attributes": { /* review attributes */ },
            "relationships": { /* review relationships */ }
        },
        {
            "id": "1234567892",
            "type": "review",
            "attributes": { /* review attributes */ },
            "relationships": { /* review relationships */ }
        }
    ],
    "included": []
}
```

This endpoint allows you to retrieve a list of reviews for a specific restaurant.

### Query Parameters

<span class="dynamic-attributes" data-attr-type="restaurantCode"></span>


    
