# Reviews

> ENDPOINTS

> <span class="method get">GET</span> /restricted/restaurant/reviews <br>

The Reviews API allows you to retrieve reviews.

## The Review Object

> THE REVIEW OBJECT

```json
{
  "id": "1234567890",
  "type": "review",
  "attributes": {
      "rating": 5.0,
      "ambiance-rating": 4.0,
      "food-rating": 5.0,
      "service-rating": 5.0,
      "menu-rating": null,
      "presentation-rating": null,
      "custom-question-1": null,
      "custom-question-2": null,
      "description": "Perfect!",
      "reply": "Glad you enjoyed your meal!",
      "source": "libro",
      "created-at": "2024-07-08T10:40:31.660-04:00",
      "updated-at": "2024-07-12T11:50:21.615-04:00"
  }
}
```

### Review Attributes

<span class="dynamic-attributes" data-attr-type="reviews"></span>

## Review Relationships

Review object will be returned with the following relationships:

- [Restaurant](#restaurant)
- [Person](#person)