---
title: Libro API Reference

language_tabs: # must be one of https://github.com/rouge-ruby/rouge/wiki/List-of-supported-languages-and-lexers
  - shell
  - ruby
  - python
  - javascript

toc_footers:
  - "To get an API access, please contact:"
  - <a href="mailto:admin@libroreserve.com">admin@libroreserve.com</a>

includes:
  - errors

search: true

code_clipboard: true

meta:
  - name: description
    content: Documentation for the Libro API
---

# Introduction

Welcome to the **Libro API** — your comprehensive toolkit for integrating restaurant reservation management into your applications. This documentation provides detailed guidance on accessing our API endpoints for booking management, restaurant information, and customer data.

## Getting Started

The Libro API uses RESTful principles with JSON:API-compliant responses. All data is exchanged in JSON format, and authentication is handled through OAuth 2.0 bearer tokens.

### 🔐 Authentication & Access

To begin your integration:

1. **Request API Access**: Contact us at <a href="mailto:admin@libroreserve.com">admin@libroreserve.com</a> to be added to our partner program
2. **Obtain OAuth Credentials**: You'll receive client ID and secret for authentication
3. **Set Up Your Environment**: Choose between production or staging based on your development phase

If you require a staging environment for development and testing, please specify this in your access request.

### 🌐 Environment URLs

| Environment | Base URL | Purpose |
|------------|----------|----------|
| Production | `https://api.libroreserve.com` | Live system integration |
| Staging | `https://api.staging.libro.app` | Testing and development |

### ⚠️ Technical Requirements

- **API Versioning**: Always include the Accept header in your requests to specify the API version: `application/vnd.libro-restricted-v2+json`
- **Response Format**: All responses follow the JSON:API specification for consistent data formatting
- **HTTPS Required**: All communication must use secure HTTPS connections
- **Redirect Security**: **only for production** Callback URLs must use HTTPS; HTTP-based callbacks (e.g., `http://mywebsite/callback/libro`) are not supported

# Authentication

> Example of OAuth authentication flow:

```ruby
require 'oauth2'

# Step 1: Get authorization URL
client = OAuth2::Client.new(
  'CLIENT_ID',
  'CLIENT_SECRET',
  site: 'https://accounts.libroreserve.com',
  authorize_url: '/oauth/authorize',
  token_url: '/oauth/token'
)

authorize_url = client.auth_code.authorize_url(
  redirect_uri: 'https://app.example.io/oauth/callback',
  scope: 'bookings people'
)

# Step 2: Redirect user to authorize_url
# ... user authorizes app and is redirected back ...

# Step 3: Exchange code for access token
code = params[:code] # From callback
token = client.auth_code.get_token(
  code,
  redirect_uri: 'https://app.example.io/oauth/callback'
)

# Step 4: Use access token for API requests
response = token.get('/v2/restricted/bookings')
```

```python
import requests

# Step 4: Use access token for API requests
headers = {
    'Authorization': f'Bearer {access_token}',
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.libro-restricted-v2+json'
}

response = requests.get(
    'https://api.libroreserve.com/v2/restricted/bookings',
    headers=headers
)
```

```javascript
// Step 4: Use access token for API requests
fetch('https://api.libroreserve.com/v2/restricted/bookings', {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.libro-restricted-v2+json'
  }
})
.then(response => response.json())
.then(data => console.log(data));
```

```shell
# Using the access token for API requests
curl "https://api.libroreserve.com/v2/restricted/bookings" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -H "Accept: application/vnd.libro-restricted-v2+json" \
  -H "Content-Type: application/json"
```

## OAuth Implementation Guide

Libro API uses OAuth 2.0 for secure authentication. Follow these steps to integrate with our API.

### Step 1: Request API Credentials

Before implementing the OAuth flow, you need to obtain your client credentials:

1. Contact us at <a href="mailto:admin@libroreserve.com">admin@libroreserve.com</a> to request integration access
2. Provide your redirect URIs and the API permission scopes you need
3. We will provide you with a `CLIENT_ID` for your application

If you need a sandbox account for development purposes, please mention this in your request.

#### Available Scopes

| Category | Scope | Description |
|----------|-------|-------------|
| **Bookings** | `bookings:get` | Permission to view booking information |
| | `bookings:create` | Permission to create new bookings |
| | `bookings:update` | Permission to modify existing bookings |
| | `bookings:cancel` | Permission to cancel bookings |
| **Restaurants** | `restaurants` | Access restaurant information |
| **People** | `people:create` | Permission to create customer profiles |
| | `people:update` | Permission to update customer information |
| **Reviews** | `reviews` | Access to review data |

### Step 2: Implement the Authorization Request

Create a "Connect" or "Link Account" button in your application that directs users to the Libro authorization URL:

```html
<a href="https://accounts.libroreserve.com/oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&response_type=code&scope=REQUESTED_SCOPES">
  Connect to Libro
</a>
```

<aside class="notice">
For the staging environment, use <code>accounts.staging.libro.app</code> instead of <code>accounts.libroreserve.com</code>
</aside>

#### Parameters

Parameter | Required | Description
--------- | -------- | -----------
client_id | Yes | Your application's CLIENT_ID
redirect_uri | Yes | URL-encoded callback URL that was pre-registered with Libro
response_type | Yes | Must be set to `code`
scope | Yes | Space-separated list of permission scopes (e.g., `bookings people`)
state | Recommended | Arbitrary string to maintain state between request and callback

### Step 3: Handle the Authorization Callback

After the user authorizes your application, they will be redirected to your `redirect_uri` with an authorization code:

```
https://app.example.io/oauth/callback?code=AUTHORIZATION_CODE
```

If you provided a `state` parameter in your request, it will be returned unmodified in the callback.

### Step 4: Exchange Code for Access Token

Make a server-to-server POST request to exchange the authorization code for an access token:

```http
POST https://accounts.libroreserve.com/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
client_id=CLIENT_ID&
client_secret=CLIENT_SECRET&
code=AUTHORIZATION_CODE&
redirect_uri=ENCODED_REDIRECT_URI
```

#### Response

A successful request will return JSON containing the access token:

```json
{
  "access_token": "ACCESS_TOKEN",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "REFRESH_TOKEN",
  "scope": "bookings people"
}
```

<aside class="notice">
The <code>expires_in</code> value is expressed in seconds (3600 = 1 hour).
</aside>

### Step 5: Make Authenticated API Requests

Include the access token in the Authorization header for all API requests:

```http
GET https://api.libroreserve.com/v2/restricted/bookings
Authorization: Bearer ACCESS_TOKEN
Accept: application/vnd.libro-restricted-v2+json
Content-Type: application/json
```

### Step 6: Refreshing Expired Tokens

When the access token expires, use the refresh token to obtain a new one without user interaction:

```http
POST https://accounts.libroreserve.com/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token&
client_id=CLIENT_ID&
client_secret=CLIENT_SECRET&
refresh_token=REFRESH_TOKEN
```

#### Response

```json
{
  "access_token": "NEW_ACCESS_TOKEN",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "NEW_REFRESH_TOKEN",
  "scope": "bookings people"
}
```

<aside class="warning">
Store refresh tokens securely. If a refresh token becomes invalid, the user will need to go through the authorization process again.
</aside>

### Error Handling

Implement proper error handling for OAuth flows. Common errors include:

- Invalid authorization code
- Expired refresh token
- Invalid redirect URI
- Insufficient scope

Ensure your application can gracefully handle these errors and prompt users to reauthorize when necessary.

# Restaurants API

## Get Restaurants

> Example request to retrieve restaurants:

```shell
curl "https://api.libroreserve.com/restricted/restaurants" \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.libro-restricted-v2+json" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

```ruby
require 'uri'
require 'net/http'
require 'json'

url = URI("https://api.libroreserve.com/restricted/restaurants")
http = Net::HTTP.new(url.host, url.port)
http.use_ssl = (url.scheme == 'https')

request = Net::HTTP::Get.new(url)
request["Content-Type"] = "application/json"
request["Accept"] = "application/vnd.libro-restricted-v2+json"
request["Authorization"] = "Bearer ACCESS_TOKEN"

response = http.request(request)
restaurants = JSON.parse(response.body)
```

```python
import requests

url = "https://api.libroreserve.com/restricted/restaurants"

headers = {
    "Content-Type": "application/json",
    "Accept": "application/vnd.libro-restricted-v2+json",
    "Authorization": "Bearer ACCESS_TOKEN"
}

response = requests.get(url, headers=headers)
restaurants = response.json()
```

```javascript
fetch('https://api.libroreserve.com/restricted/restaurants', {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.libro-restricted-v2+json',
    'Authorization': `Bearer ${accessToken}`
  }
})
.then(response => response.json())
.then(data => console.log(data));
```

> The above command returns JSON structured like this:

```json
{
  "data": [
    {
      "type": "restaurant",
      "id": "0000000000",
      "attributes": {
        "name": "Example Restaurant",
        "active": true,
        "code": "ZZ000000000000",
        "latitude": 45.5001,
        "longitude": -73.5665,
        "tz": "America/Montreal",
        "created-at": "2024-01-01T12:00:00.0-04:00",
        "online-booking-lead-months": 6,
        "cancelation-delay": 86400,
        "service-scopes": [
          {
              "name": "Diner",
              "startTime": "10:00",
              "endTime": "15:00"
          },
          {
              "name": "Souper",
              "startTime": "15:00",
              "endTime": "03:00"
          }
        ]
      }
    }
  ]
}
```

Retrieve a list of restaurants accessible to the authenticated user.

### HTTP Request

`GET https://api.libroreserve.com/restricted/restaurants`

### Headers

Header | Required | Description
------ | -------- | -----------
Content-Type | Yes | Must be set to `application/json`
Accept | Yes | Must be set to `application/vnd.libro-restricted-v2+json`
Authorization | Yes | OAuth bearer token: `Bearer ACCESS_TOKEN`

### Response Attributes

Attribute | Type | Description
--------- | ---- | -----------
name | string | The restaurant's name
active | boolean | Whether the restaurant is currently active in the system
code | string | Unique restaurant code
latitude | number | Geographic latitude coordinate
longitude | number | Geographic longitude coordinate
tz | string | Time zone of the restaurant's location
created-at | string | ISO 8601 timestamp of when the restaurant was added to the system
online-booking-lead-months | integer | Number of months in advance customers can make reservations
cancelation-delay | integer or null | Minimum time (in seconds) before the reservation when cancellation is allowed; null means cancellations are not permitted
service-scopes | array | List of service periods with their start and end times

### Service Scopes

Each service scope represents a distinct service period offered by the restaurant (e.g., lunch, dinner).

Attribute | Type | Description
--------- | ---- | -----------
name | string | Name of the service period
startTime | string | Start time in 24-hour format (HH:MM)
endTime | string | End time in 24-hour format (HH:MM)

<aside class="notice">
Service scopes are important for determining available reservation time slots.
</aside>

# Bookings API

The Bookings section of our API offers comprehensive endpoints for managing restaurant reservations.

## Booking Object

> Example of a booking object:

```json
{
  "size": 2,
  "status": "arrived",
  "time": "2025-04-30T10:45:00.000-04:00",
  "note": "",
  "table-number": "12",
  "private-note": "Team Building reservation",
  "expected-leave-at": "2025-05-06T21:00:00.000-04:00",
  "source": "dashboard",
  "read-token": "17cb72002",
  "edit-token": "17cb72018",
  "booking-type": "reservation",
  "created-at": "2025-04-30T10:51:01.730-04:00",
  "arrived-at": "2025-05-06T18:55:00.000-04:00",
  "confirmed-at": "2025-05-01T10:00:01.730-04:00",
  "seated-at": "2025-05-06T19:00:00.000-04:00",
  "completed-at": "2025-05-06T21:10:00.000-04:00",
  "canceled-at": null,
  "cancelation-allowed-until": 1753740000
}
```

### Booking Attributes

Attribute | Type | Description
--------- | ---- | -----------
size | number | Number of guests in the booking
time | string | Scheduled arrival time in ISO 8601 format
table-number | string | Assigned table number
private-note | string | Internal note for restaurant staff (read-only)
locale | string | Guest's preferred language (BCP 47 code, e.g., "en", "fr-CA")
note | string | Public note visible to the guest
status | string | Current status of the booking (e.g., "arrived") (read-only)
booking-type | string | Type of booking (e.g., "walkin", "reservation") (read-only)
source | string | Booking source (e.g., "dashboard", "widget") (read-only)
created-at | string | When the booking was created (ISO 8601) (read-only)
arrived-at | string | When the guest arrived (ISO 8601) (read-only)
expected-leave-at | string | Expected time of departure (ISO 8601) (read-only)
confirmed-at | string or null | When the booking was confirmed (read-only)
seated-at | string or null | When the guest was seated (read-only)
completed-at | string or null | When the booking was completed (read-only)
canceled-at | string or null | When the booking was canceled (read-only)
cancelation-allowed-until | timestamp or null | The exact timestamp until which the reservation can be canceled; null if cancellation is not allowed

## Authentication

All Bookings endpoints require authentication. To access these endpoints, you must include a valid authorization header with your OAuth token.

## List Bookings

> Example request to list bookings:

```http
GET https://api.libroreserve.com/restricted/restaurant/bookings?date=2025-05-30
Content-Type: application/json
Accept: application/vnd.libro-restricted-v2+json
Authorization: Bearer ACCESS_TOKEN
```

```shell
curl "https://api.libroreserve.com/restricted/restaurant/bookings?date=2025-05-30" \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.libro-restricted-v2+json" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

```ruby
require 'uri'
require 'net/http'
require 'json'

url = URI("https://api.libroreserve.com/restricted/restaurant/bookings?date=2025-05-30")
http = Net::HTTP.new(url.host, url.port)
http.use_ssl = (url.scheme == 'https')

request = Net::HTTP::Get.new(url)
request["Content-Type"] = "application/json"
request["Accept"] = "application/vnd.libro-restricted-v2+json"
request["Authorization"] = "Bearer ACCESS_TOKEN"

response = http.request(request)
bookings = JSON.parse(response.body)
```

```python
import requests

url = "https://api.libroreserve.com/restricted/restaurant/bookings"
params = {"date": "2025-05-30"}

headers = {
    "Content-Type": "application/json",
    "Accept": "application/vnd.libro-restricted-v2+json",
    "Authorization": "Bearer ACCESS_TOKEN"
}

response = requests.get(url, headers=headers, params=params)
bookings = response.json()
```

```javascript
fetch('https://api.libroreserve.com/restricted/restaurant/bookings?date=2025-05-30', {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.libro-restricted-v2+json',
    'Authorization': `Bearer ${accessToken}`
  }
})
.then(response => response.json())
.then(data => console.log(data));
```

Retrieve a list of bookings based on various filters and pagination options.

### HTTP Request

`GET https://api.libroreserve.com/restricted/restaurant/bookings`

### Query Parameters

Parameter | Type | Required | Description
--------- | ---- | -------- | -----------
restaurant-code | string | Yes | The unique code of the restaurant
date | string (YYYY-MM-DD) | No | Filter bookings by date
time | string (HH:MM) | No | Filter bookings by specific time
started-after | string (ISO 8601) | No | Filter bookings after this timestamp
started-before | string (ISO 8601) | No | Filter bookings before this timestamp
guest-email | string | No | Filter bookings by guest email
guest-phone | string | No | Filter bookings by guest phone number
status | string | No | Filter by booking status
page | integer | No | Page number for pagination (default: 1)
page-size | integer | No | Number of results per page (default: 25, max: 100)

### Search Examples

You can search for bookings using various parameters such as date, time, time range, or guest information:

- Search by date: `?date=2025-05-30`
- Search by date and time: `?date=2025-05-30&time=13:00`
- Search by guest phone number: `?guest-phone=15141111111`

## Create a Booking

> Example request to create a booking:

```http
POST https://api.libroreserve.com/restricted/restaurant/bookings
Content-Type: application/json
Accept: application/vnd.libro-restricted-v2+json
Authorization: Bearer ACCESS_TOKEN
```

```json
{
  "restaurant-code": "QC016214487921",
  "data": {
    "attributes": {
      "size": 2,
      "date": "2025-05-07",
      "time": "12:00",
      "note": "It will be my Birthday party",
      "locale": "en",
      "table-number": "12"
    },
    "relationships": {
      "person": {
        "data": {
          "type": "people",
          "attributes": {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john@doe.com",
            "phone": "5141111111",
            "preferred-communication-channel": "email",
            "locale": "en"
          }
        }
      }
    }
  },
  "device-infos": {
    "id": "XXXXXXXXXXX",
    "ip": "192.168.1.1"
  }
}
```

Create a new reservation for a restaurant.

### HTTP Request

`POST https://api.libroreserve.com/restricted/restaurant/bookings`

### Request Parameters

Parameter | Type | Required | Description
--------- | ---- | -------- | -----------
restaurant-code | string | Yes | Unique identifier for the restaurant
data.attributes.size | integer | Yes | Number of guests for the booking
data.attributes.date | string (YYYY-MM-DD) | Yes | Date of the reservation
data.attributes.time | string (HH:MM) | Yes | Time of the reservation
data.attributes.note | string | No | Public note for the booking
data.attributes.locale | string | No | Guest's preferred language (BCP 47 code)
data.attributes.table-number | string | No | Specific table number if applicable
data.relationships.person.data.type | string | Yes | Must be "people"
data.relationships.person.data.attributes.first_name | string | Yes | Guest's first name
data.relationships.person.data.attributes.last_name | string | Yes | Guest's last name
data.relationships.person.data.attributes.email | string | Conditional* | Guest's email address
data.relationships.person.data.attributes.phone | string | Conditional* | Guest's phone number
data.relationships.person.data.attributes.preferred-communication-channel | string | No | Preferred contact method ("email" or "phone")
data.relationships.person.data.attributes.locale | string | No | Guest's language preference
device-infos | object | No | Information about the device making the request

<aside class="notice">* At least one of email or phone must be provided.</aside>

## Update a Booking

> Example request to update a booking:

```http
PATCH https://api.libroreserve.com/restricted/restaurant/bookings/63873441
Content-Type: application/json
Accept: application/vnd.libro-restricted-v2+json
Authorization: Bearer ACCESS_TOKEN
```

```json
{
  "restaurant-code": "QC016214487921",
  "data": {
    "attributes": {
      "note": "It will be my Birthday party",
      "locale": "en",
      "table-number": "12"
    },
    "relationships": {
      "person": {
        "data": {
          "type": "people",
          "attributes": {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john@doe.com",
            "phone": "5141111111",
            "preferred-communication-channel": "email",
            "locale": "en"
          }
        }
      }
    }
  },
  "device-infos": {
    "id": "XXXXXXXXXXX",
    "ip": "192.168.1.1"
  }
}
```

Update details of an existing booking. This endpoint allows you to modify booking details but not the date and time (use the Reschedule endpoint for that).

### HTTP Request

`PATCH https://api.libroreserve.com/restricted/restaurant/bookings/:id`

### URL Parameters

Parameter | Description
--------- | -----------
id | The ID of the booking to update

### Request Parameters

Parameter | Type | Required | Description
--------- | ---- | -------- | -----------
restaurant-code | string | Yes | Unique identifier for the restaurant
data.attributes.note | string | No | Public note for the booking
data.attributes.locale | string | No | Guest's preferred language (BCP 47 code)
data.attributes.table-number | string | No | Specific table number if applicable
data.relationships.person.data.type | string | Yes | Must be "people"
data.relationships.person.data.attributes.first_name | string | No | Guest's first name
data.relationships.person.data.attributes.last_name | string | No | Guest's last name
data.relationships.person.data.attributes.email | string | No | Guest's email address
data.relationships.person.data.attributes.phone | string | No | Guest's phone number
data.relationships.person.data.attributes.preferred-communication-channel | string | No | Preferred contact method ("email" or "phone")
device-infos | object | No | Information about the device making the request

## Reschedule a Booking

> Example request to reschedule a booking:

```http
PUT https://api.libroreserve.com/restricted/restaurant/bookings/63873441/reschedule
Content-Type: application/json
Accept: application/vnd.libro-restricted-v2+json
Authorization: Bearer ACCESS_TOKEN
```

```json
{
  "restaurant-code": "QC016214487921",
  "data": {
    "attributes": {
      "size": 2,
      "date": "2025-05-07",
      "time": "12:00",
      "table-number": "12",
      "experience": 4253
    }
  },
  "device-infos": {
    "id": "XXXXXXXXXXX",
    "ip": "192.168.1.1"
  }
}
```

Reschedule an existing booking to a new date, time, or party size.

### HTTP Request

`PUT https://api.libroreserve.com/restricted/restaurant/bookings/:id/reschedule`

### URL Parameters

Parameter | Description
--------- | -----------
id | The ID of the booking to reschedule

### Request Parameters

Parameter | Type | Required | Description
--------- | ---- | -------- | -----------
restaurant-code | string | Yes | Unique identifier for the restaurant
data.attributes.size | integer | Yes | New number of guests for the booking
data.attributes.date | string (YYYY-MM-DD) | Yes | New date for the reservation
data.attributes.time | string (HH:MM) | Yes | New time for the reservation
data.attributes.table-number | string | No | New table number if applicable
data.attributes.experience | integer | No | Experience ID if applicable
device-infos | object | No | Information about the device making the request

## Retrieve a Booking

> Example request to retrieve a booking:

```http
GET https://api.libroreserve.com/restricted/restaurant/bookings/63873441
Content-Type: application/json
Accept: application/vnd.libro-restricted-v2+json
Authorization: Bearer ACCESS_TOKEN
```

Retrieve detailed information about a specific booking.

### HTTP Request

`GET https://api.libroreserve.com/restricted/restaurant/bookings/:id`

### URL Parameters

Parameter | Description
--------- | -----------
id | The ID of the booking to retrieve

## Cancel a Booking

> Example request to cancel a booking:

```http
DELETE https://api.libroreserve.com/restricted/restaurant/bookings/63873441
Content-Type: application/json
Accept: application/vnd.libro-restricted-v2+json
Authorization: Bearer ACCESS_TOKEN
```

Cancel an existing booking.

### HTTP Request

`DELETE https://api.libroreserve.com/restricted/restaurant/bookings/:id`

### URL Parameters

Parameter | Description
--------- | -----------
id | The ID of the booking to cancel

### Response

A successful cancellation will return a 204 No Content response.

### Error Responses

If a booking is not cancelable (either due to the current time being past the `cancelation-allowed-until` timestamp or because it's not permitted by the restaurant), a 409 Conflict error will be returned with the message: 

"This booking could not be canceled."

> Example response for a booking list:

```json
{
  "data": [
    {
      "id": "123",
      "type": "bookings",
      "attributes": {
        "date": "2025-07-10",
        "time": "19:30:00",
        "size": 4,
        "status": "confirmed",
        "note": "Anniversaire",
        "locale": "fr"
      },
      "relationships": {
        "person": {
          "data": { "type": "people", "id": "456" }
        },
        "restaurant": {
          "data": { "type": "restaurants", "id": "789" }
        }
      }
    }
  ],
  "included": [
    {
      "id": "456",
      "type": "people",
      "attributes": {
        "first_name": "Jean",
        "last_name": "Dupont",
        "email": "jean.dupont@example.com",
        "phone": "+33123456789"
      }
    },
    {
      "id": "789",
      "type": "restaurants",
      "attributes": {
        "name": "Le Bistrot Parisien",
        "code": "bistrot-parisien"
      }
    }
  ]
}
```

This endpoint returns a paginated list of bookings that the authenticated user has access to.

### Query Parameters

Parameter | Required | Description
--------- | ------- | -----------
restaurant-code | no | Filter bookings by restaurant code
start-date | no | Filter bookings from this date (format YYYY-MM-DD)
end-date | no | Filter bookings until this date (format YYYY-MM-DD)
status | no | Filter bookings by status (approved, canceled, confirmed, noshow, pending, seated, etc.)
page | no | Page number for pagination (default: 1)
per-page | no | Number of items per page (default: 25, max: 100)

## Create a Booking

```http
POST /v2/restricted/bookings HTTP/1.1
Host: api.local.libro.app
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
```

```ruby
require 'rest-client'

headers = {
  'Authorization' => 'Bearer YOUR_ACCESS_TOKEN',
  'Content-Type' => 'application/json'
}

payload = {
  'restaurant-code': 'bistrot-parisien',
  'data': {
    'attributes': {
      'date': '2025-07-15',
      'time': '20:00:00',
      'size': 4,
      'note': 'Anniversaire',
      'locale': 'fr'
    },
    'relationships': {
      'person': {
        'data': {
          'type': 'people',
          'attributes': {
            'first_name': 'Jean',
            'last_name': 'Dupont',
            'email': 'jean.dupont@example.com',
            'phone': '+33123456789'
          }
        }
      }
    }
  }
}

response = RestClient.post 'https://api.local.libro.app/v2/restricted/bookings', payload.to_json, headers
```

```javascript
const headers = {
  'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
  'Content-Type': 'application/json'
};

const payload = {
  'restaurant-code': 'bistrot-parisien',
  'data': {
    'attributes': {
      'date': '2025-07-15',
      'time': '20:00:00',
      'size': 4,
      'note': 'Anniversaire',
      'locale': 'fr'
    },
    'relationships': {
      'person': {
        'data': {
          'type': 'people',
          'attributes': {
            'first_name': 'Jean',
            'last_name': 'Dupont',
            'email': 'jean.dupont@example.com',
            'phone': '+33123456789'
          }
        }
      }
    }
  }
};

fetch('https://api.local.libro.app/v2/restricted/bookings', {
  method: 'POST',
  headers,
  body: JSON.stringify(payload)
})
.then(response => response.json())
.then(data => console.log(data));
```

> The response will return the created booking object:

```json
{
  "data": {
    "id": "123",
    "type": "bookings",
    "attributes": {
      "date": "2025-07-15",
      "time": "20:00:00",
      "size": 4,
      "status": "confirmed",
      "note": "Anniversaire",
      "locale": "fr"
    },
    "relationships": {
      "person": {
        "data": { "type": "people", "id": "456" }
      },
      "restaurant": {
        "data": { "type": "restaurants", "id": "789" }
      }
    }
  },
  "included": [
    {
      "id": "456",
      "type": "people",
      "attributes": {
        "first_name": "Jean",
        "last_name": "Dupont",
        "email": "jean.dupont@example.com",
        "phone": "+33123456789"
      }
    },
    {
      "id": "789",
      "type": "restaurants",
      "attributes": {
        "name": "Le Bistrot Parisien",
        "code": "bistrot-parisien"
      }
    }
  ]
}
```

### Request Parameters

Parameter | Type | Required | Description
--------- | ---- | ------- | -----------
restaurant-code | String | yes | Code of the restaurant to create the booking for
data.attributes.date | Date | yes | Booking date (format YYYY-MM-DD)
data.attributes.time | Time | yes | Booking time (format HH:MM:SS)
data.attributes.size | Integer | yes | Number of people (party size)
data.attributes.note | String | no | Note for the restaurant staff
data.attributes.locale | String | no | Locale for the booking
data.attributes.booking-experience-id | Integer | no | ID of the associated experience
data.relationships.person.data.type | String | yes | Resource type ("people")
data.relationships.person.data.id | Integer | no* | ID of an existing person
data.relationships.person.data.attributes | Object | no* | Attributes to create a new person

*At least one of these two (id or attributes) must be provided

## Get a Specific Booking

```http
GET /v2/restricted/bookings/:bid HTTP/1.1
Host: api.local.libro.app
Authorization: Bearer YOUR_ACCESS_TOKEN
```

```ruby
require 'rest-client'

headers = {
  'Authorization' => 'Bearer YOUR_ACCESS_TOKEN',
  'Content-Type' => 'application/json'
}

response = RestClient.get 'https://api.local.libro.app/v2/restricted/bookings/123', headers
```

```javascript
const headers = {
  'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
  'Content-Type': 'application/json'
};

fetch('https://api.local.libro.app/v2/restricted/bookings/123', { headers })
  .then(response => response.json())
  .then(data => console.log(data));
```

> The response will return the booking details:

```json
{
  "data": {
    "id": "123",
    "type": "bookings",
    "attributes": {
      "date": "2025-07-15",
      "time": "20:00:00",
      "size": 4,
      "status": "confirmed",
      "note": "Anniversaire",
      "locale": "fr"
    },
    "relationships": {
      "person": {
        "data": { "type": "people", "id": "456" }
      },
      "restaurant": {
        "data": { "type": "restaurants", "id": "789" }
      },
      "experience": {
        "data": { "type": "experiences", "id": "101" }
      }
    }
  },
  "included": [
    {
      "id": "456",
      "type": "people",
      "attributes": {
        "first_name": "Jean",
        "last_name": "Dupont",
        "email": "jean.dupont@example.com",
        "phone": "+33123456789"
      }
    },
    {
      "id": "789",
      "type": "restaurants",
      "attributes": {
        "name": "Le Bistrot Parisien",
        "code": "bistrot-parisien"
      }
    },
    {
      "id": "101",
      "type": "experiences",
      "attributes": {
        "name": "Menu Dégustation"
      }
    }
  ]
}
```

## Update a Booking

```http
PATCH /v2/restricted/bookings/:bid HTTP/1.1
Host: api.local.libro.app
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
```

```ruby
require 'rest-client'

headers = {
  'Authorization' => 'Bearer YOUR_ACCESS_TOKEN',
  'Content-Type' => 'application/json'
}

payload = {
  'restaurant-code': 'bistrot-parisien',
  'data': {
    'attributes': {
      'status': 'confirmed',
      'note': 'Anniversaire avec gâteau surprise'
    }
  }
}

response = RestClient.patch 'https://api.local.libro.app/v2/restricted/bookings/123', payload.to_json, headers
```

```javascript
const headers = {
  'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
  'Content-Type': 'application/json'
};

const payload = {
  'restaurant-code': 'bistrot-parisien',
  'data': {
    'attributes': {
      'status': 'confirmed',
      'note': 'Anniversaire avec gâteau surprise'
    }
  }
};

fetch('https://api.local.libro.app/v2/restricted/bookings/123', {
  method: 'PATCH',
  headers,
  body: JSON.stringify(payload)
})
.then(response => response.json())
.then(data => console.log(data));
```

### Request Parameters

Parameter | Type | Required | Description
--------- | ---- | ------- | -----------
restaurant-code | String | yes | Restaurant code
data.attributes.status | String | no | Booking status (approved, canceled, confirmed, noshow, pending, seated, etc.)
data.attributes.note | String | no | Note for the restaurant staff
data.attributes.locale | String | no | Locale for the booking

## Reschedule a Booking

```http
PUT /v2/restricted/bookings/:bid/reschedule HTTP/1.1
Host: api.local.libro.app
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
```

```ruby
require 'rest-client'

headers = {
  'Authorization' => 'Bearer YOUR_ACCESS_TOKEN',
  'Content-Type' => 'application/json'
}

payload = {
  'restaurant-code': 'bistrot-parisien',
  'data': {
    'attributes': {
      'date': '2025-07-16',
      'time': '19:30:00',
      'size': 4
    }
  }
}

response = RestClient.put 'https://api.local.libro.app/v2/restricted/bookings/123/reschedule', payload.to_json, headers
```

```javascript
const headers = {
  'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
  'Content-Type': 'application/json'
};

const payload = {
  'restaurant-code': 'bistrot-parisien',
  'data': {
    'attributes': {
      'date': '2025-07-16',
      'time': '19:30:00',
      'size': 4
    }
  }
};

fetch('https://api.local.libro.app/v2/restricted/bookings/123/reschedule', {
  method: 'PUT',
  headers,
  body: JSON.stringify(payload)
})
.then(response => response.json())
.then(data => console.log(data));
```

### Request Parameters

Parameter | Type | Required | Description
--------- | ---- | ------- | -----------
restaurant-code | String | yes | Restaurant code
data.attributes.date | Date | yes | New booking date (format YYYY-MM-DD)
data.attributes.time | Time | yes | New booking time (format HH:MM:SS)
data.attributes.size | Integer | yes | New party size
data.attributes.booking-experience-id | Integer | no | ID of the new associated experience
data.attributes.table-number | String | no | Assigned table number

## Cancel a Booking

```http
DELETE /v2/restricted/bookings/:bid HTTP/1.1
Host: api.local.libro.app
Authorization: Bearer YOUR_ACCESS_TOKEN
```

```ruby
require 'rest-client'

headers = {
  'Authorization' => 'Bearer YOUR_ACCESS_TOKEN',
  'Content-Type' => 'application/json'
}

response = RestClient.delete 'https://api.local.libro.app/v2/restricted/bookings/123', headers
```

```javascript
const headers = {
  'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
  'Content-Type': 'application/json'
};

fetch('https://api.local.libro.app/v2/restricted/bookings/123', {
  method: 'DELETE',
  headers
})
.then(response => response.json())
.then(data => console.log(data));
```

> If the cancellation is successful, the response will return the booking with a "canceled" status:

```json
{
  "data": {
    "id": "123",
    "type": "bookings",
    "attributes": {
      "date": "2025-07-15",
      "time": "20:00:00",
      "size": 4,
      "status": "canceled",
      "note": "Anniversaire",
      "locale": "fr"
    },
    "relationships": {
      "person": {
        "data": { "type": "people", "id": "456" }
      },
      "restaurant": {
        "data": { "type": "restaurants", "id": "789" }
      }
    }
  }
}
```
