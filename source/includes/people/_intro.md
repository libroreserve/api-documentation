# Person

> ENDPOINTS

> <span class="method get">GET</span> /restricted/people/:id <br>
> <span class="method patch">PATCH</span> /restricted/people/:id <br>

The People API allows you to retrieve and update people data.

## The Person Object

> THE PERSON OBJECT

```json
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
}
```

### Person
<span class="dynamic-attributes" data-attr-type="personId"></span>

#### Person Attributes
<span class="dynamic-attributes" data-attr-type="person"></span>
