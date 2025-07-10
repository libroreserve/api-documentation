# Resources

Description de la resource

> ENDPOINTS

> <span class="method get">GET</span> /restricted/resources <br>
> <span class="method post">POST</span> /restricted/resources <br>
> <span class="method get">GET</span> /restricted/resources/:id <br>
> <span class="method patch">PATCH</span> /restricted/resources/:id <br>
> <span class="method put">PUT</span> /restricted/resources/:id <br>
> <span class="method delete">DELETE</span> /restricted/resources/:id

## The Resource Object

> THE RESOURCE OBJECT

```json
{
  "type": "resource",
  "id": "0000000000",
  "attributes": { /* resource attributes */ },
  "relationships": { /* resource relationships */ }
}
```

### Attributes

<span class="dynamic-attributes" data-attr-type="resource"></span>

## Get

This endpoint retrieves a specific resource by its ID.

### Parameters

<span class="dynamic-attributes" data-attr-type="getResource"></span>

> <span class="method get">GET</span> /restricted/restaurants?restaurant-code=QC01621448XXXX

> REQUEST:

```shell
curl "https://api.libroreserve.com/restricted/restaurants?restaurant-code=QC016214487921" \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.libro-restricted-v2+json" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

> REQUEST BODY:

```json
{
  "data": {
    "id": "0000000000",
    "type": "resource",
    "attributes": { /* resource attributes */ },
  }
}

```

> RESPONSE:

```json
{
  "data": {
    "id": "0000000000",
    "type": "resource",
    "attributes": { /* resource attributes */ },
    "relationships": { /* resource relationships */ }
  }
}
```



