# Quickstart

This guide will help you quickly integrate with the Libro API in just a few minutes. By the end, you'll be able to create your first booking.

## Step 1: Get API Access

If you haven't already, request API access by contacting us at <a href="mailto:admin@libroreserve.com">admin@libroreserve.com</a>. You'll receive:

- Client ID and Secret for authentication
- Access to either production or staging environment

## Step 2: Obtain an Access Token

Before making API calls, you need to obtain an OAuth access token:

```shell
curl https://api.libroreserve.com/oauth/token \
  -X POST \
  -d "grant_type=client_credentials&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET"
```

```javascript
const axios = require('axios');

async function getAccessToken() {
  const response = await axios.post('https://api.libroreserve.com/oauth/token', {
    grant_type: 'client_credentials',
    client_id: 'YOUR_CLIENT_ID',
    client_secret: 'YOUR_CLIENT_SECRET'
  });
  
  // Store this token for future requests
  const accessToken = response.data.access_token;
  return accessToken;
}
```

```ruby
require 'rest-client'
require 'json'

def get_access_token
  response = RestClient.post(
    'https://api.libroreserve.com/oauth/token',
    {
      grant_type: 'client_credentials',
      client_id: 'YOUR_CLIENT_ID',
      client_secret: 'YOUR_CLIENT_SECRET'
    }
  )
  
  # Store this token for future requests
  access_token = JSON.parse(response.body)['access_token']
  return access_token
end
```

```python
import requests

def get_access_token():
    response = requests.post(
        'https://api.libroreserve.com/oauth/token',
        data={
            'grant_type': 'client_credentials',
            'client_id': 'YOUR_CLIENT_ID',
            'client_secret': 'YOUR_CLIENT_SECRET'
        }
    )
    
    # Store this token for future requests
    access_token = response.json()['access_token']
    return access_token
```

## Step 3: List Available Restaurants

Once you have an access token, you can retrieve a list of available restaurants:

```shell
curl https://api.libroreserve.com/v2/restaurants \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Accept: application/vnd.libro-restricted-v2+json"
```

```javascript
const axios = require('axios');

async function listRestaurants(accessToken) {
  const response = await axios.get('https://api.libroreserve.com/v2/restaurants', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/vnd.libro-restricted-v2+json'
    }
  });
  
  return response.data.data; // Array of restaurant objects
}
```

```ruby
require 'rest-client'
require 'json'

def list_restaurants(access_token)
  response = RestClient.get(
    'https://api.libroreserve.com/v2/restaurants',
    {
      'Authorization' => "Bearer #{access_token}",
      'Accept' => 'application/vnd.libro-restricted-v2+json'
    }
  )
  
  restaurants = JSON.parse(response.body)['data']
  return restaurants
end
```

```python
import requests

def list_restaurants(access_token):
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Accept': 'application/vnd.libro-restricted-v2+json'
    }
    
    response = requests.get(
        'https://api.libroreserve.com/v2/restaurants',
        headers=headers
    )
    
    restaurants = response.json()['data']
    return restaurants
```

## Step 4: Check Restaurant Availability

Before creating a booking, check if the restaurant has availability for the desired date and time:

```shell
curl "https://api.libroreserve.com/v2/restaurants/rest_123456/availability?date=2025-07-15&party_size=4" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Accept: application/vnd.libro-restricted-v2+json"
```

```javascript
const axios = require('axios');

async function checkAvailability(accessToken, restaurantId, date, partySize) {
  const response = await axios.get(`https://api.libroreserve.com/v2/restaurants/${restaurantId}/availability`, {
    params: {
      date: date,         // Format: YYYY-MM-DD
      party_size: partySize
    },
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/vnd.libro-restricted-v2+json'
    }
  });
  
  return response.data.data; // Available time slots
}
```

```ruby
require 'rest-client'
require 'json'

def check_availability(access_token, restaurant_id, date, party_size)
  response = RestClient.get(
    "https://api.libroreserve.com/v2/restaurants/#{restaurant_id}/availability",
    {
      params: {
        date: date,       # Format: YYYY-MM-DD
        party_size: party_size
      },
      'Authorization' => "Bearer #{access_token}",
      'Accept' => 'application/vnd.libro-restricted-v2+json'
    }
  )
  
  available_times = JSON.parse(response.body)['data']
  return available_times
end
```

```python
import requests

def check_availability(access_token, restaurant_id, date, party_size):
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Accept': 'application/vnd.libro-restricted-v2+json'
    }
    
    params = {
        'date': date,     # Format: YYYY-MM-DD
        'party_size': party_size
    }
    
    response = requests.get(
        f'https://api.libroreserve.com/v2/restaurants/{restaurant_id}/availability',
        headers=headers,
        params=params
    )
    
    available_times = response.json()['data']
    return available_times
```

## Step 5: Create a Booking

Finally, create a booking using an available time slot:

```shell
curl https://api.libroreserve.com/v2/bookings \
  -X POST \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Accept: application/vnd.libro-restricted-v2+json" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "type": "bookings",
      "attributes": {
        "restaurant_id": "rest_123456",
        "date": "2025-07-15",
        "time": "19:00",
        "party_size": 4,
        "customer": {
          "email": "guest@example.com",
          "name": "John Smith",
          "phone": "+15551234567"
        }
      }
    }
  }'
```

```javascript
const axios = require('axios');

async function createBooking(accessToken, bookingDetails) {
  const response = await axios.post('https://api.libroreserve.com/v2/bookings', {
    data: {
      type: 'bookings',
      attributes: bookingDetails
    }
  }, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/vnd.libro-restricted-v2+json',
      'Content-Type': 'application/json'
    }
  });
  
  return response.data.data; // Booking object with ID
}

// Example usage
const bookingDetails = {
  restaurant_id: 'rest_123456',
  date: '2025-07-15',
  time: '19:00',
  party_size: 4,
  customer: {
    email: 'guest@example.com',
    name: 'John Smith',
    phone: '+15551234567'
  }
};

createBooking(accessToken, bookingDetails)
  .then(booking => console.log(`Booking created with ID: ${booking.id}`))
  .catch(error => console.error('Error creating booking:', error));
```

```ruby
require 'rest-client'
require 'json'

def create_booking(access_token, booking_details)
  response = RestClient.post(
    'https://api.libroreserve.com/v2/bookings',
    {
      data: {
        type: 'bookings',
        attributes: booking_details
      }
    }.to_json,
    {
      'Authorization' => "Bearer #{access_token}",
      'Accept' => 'application/vnd.libro-restricted-v2+json',
      'Content-Type' => 'application/json'
    }
  )
  
  booking = JSON.parse(response.body)['data']
  return booking
end

# Example usage
booking_details = {
  restaurant_id: 'rest_123456',
  date: '2025-07-15',
  time: '19:00',
  party_size: 4,
  customer: {
    email: 'guest@example.com',
    name: 'John Smith',
    phone: '+15551234567'
  }
}

booking = create_booking(access_token, booking_details)
puts "Booking created with ID: #{booking['id']}"
```

```python
import requests
import json

def create_booking(access_token, booking_details):
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Accept': 'application/vnd.libro-restricted-v2+json',
        'Content-Type': 'application/json'
    }
    
    payload = {
        'data': {
            'type': 'bookings',
            'attributes': booking_details
        }
    }
    
    response = requests.post(
        'https://api.libroreserve.com/v2/bookings',
        headers=headers,
        data=json.dumps(payload)
    )
    
    booking = response.json()['data']
    return booking

# Example usage
booking_details = {
    'restaurant_id': 'rest_123456',
    'date': '2025-07-15',
    'time': '19:00',
    'party_size': 4,
    'customer': {
        'email': 'guest@example.com',
        'name': 'John Smith',
        'phone': '+15551234567'
    }
}

booking = create_booking(access_token, booking_details)
print(f"Booking created with ID: {booking['id']}")
```

## Next Steps

Congratulations! You've successfully created your first booking with the Libro API. Here are some additional features to explore:

- **Retrieving Booking Details**: Get detailed information about a specific booking
- **Updating Bookings**: Modify existing bookings (change time, party size, etc.)
- **Cancelling Bookings**: Allow customers to cancel their reservations
- **Setting Up Webhooks**: Receive real-time notifications about booking events

For detailed information on these and other features, please refer to the corresponding sections in the documentation.
