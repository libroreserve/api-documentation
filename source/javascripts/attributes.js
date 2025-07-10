document.addEventListener('DOMContentLoaded', function() {
  const attributes = {
    restaurant: [
    { name: 'id', type: 'string', desc: 'Unique identifier for the restaurant', required: true },
    { name: 'name', type: 'string', desc: 'Name of the restaurant', required: true },
    { name: 'active', type: 'boolean', desc: 'Whether the restaurant is currently active in the system' },
    { name: 'code', type: 'string', desc: 'Unique restaurant code' },
    { name: 'latitude', type: 'number', desc: 'Geographic latitude coordinate' },
    { name: 'longitude', type: 'number', desc: 'Geographic longitude coordinate' },
    { name: 'tz', type: 'string', desc: 'Restaurant timezone (IANA format)' },
    { name: 'created-at', type: 'string', desc: 'ISO timestamp of when the restaurant was created' },
    { name: 'online-booking-lead-months', type: 'integer', desc: 'Number of months in advance online bookings are accepted' },
    { name: 'cancelation-delay', type: 'integer', desc: 'Cancellation window in seconds (e.g., 86400 = 24 hours)' },
    { name: 'service-scopes', type: 'array', desc: 'Array of service periods with name, startTime and endTime' }
  ],
  restaurantGet: [
    { name: 'restaurant-code', type: 'string', desc: 'Restaurant code', required: true }
  ],
  restaurantGetAvailability: [
    { name: 'restaurant-code', type: 'string', desc: 'Restaurant code', required: true },
    { name: 'date', type: 'string', desc: 'Date in YYYY-MM-DD format', required: true },
    { name: 'size', type: 'integer', desc: 'Party size', required: true }
  ],
  booking: [
    { name: 'size', type: 'integer', desc: 'Number of guests in the booking' },
    { name: 'time', type: 'string', desc: 'Scheduled arrival time' },
    { name: 'table-number', type: 'string', desc: 'Assigned table number' },
    { name: 'private-note', type: 'string', desc: 'Internal/private note' },
    { name: 'note', type: 'string', desc: 'Public note' },
    { name: 'locale', type: 'string', desc: 'Guest\\\'s preferred language' },
    { name: 'status', type: 'string', desc: 'Current status of the booking', values: ['approved', 'canceled', 'confirmed', 'noshow', 'pending', 'seated', 'partial', 'arrived', 'completed'] },
    { name: 'booking-type', type: 'string', desc: 'Type of booking', values: ['reservation', 'walk-in'] },
    { name: 'source', type: 'string', desc: 'Booking source', values: ['online', 'dashboard', 'google', '...'] },
    { name: 'created-at', type: 'string', desc: 'When the booking was created' },
    { name: 'arrived-at', type: 'string', desc: 'When the guest arrived' },
    { name: 'expected-leave-at', type: 'string', desc: 'Expected time of departure' },
    { name: 'confirmed-at', type: 'string', desc: 'When the booking was confirmed' },
    { name: 'seated-at', type: 'string', desc: 'When the guest was seated' },
    { name: 'completed-at', type: 'string', desc: 'When the booking was completed' },
    { name: 'canceled-at', type: 'string', desc: 'When the booking was canceled' },
    { name: 'cancelation-allowed-until', type: 'string', desc: 'The exact timestamp until which the reservation can be canceled' }
  ],
  bookingGet: [
    { name: 'id', type: 'string', desc: 'Unique identifier for the booking' }
  ],
  bookingList: [
    { name: 'limit', type: 'integer', desc: 'Number of records per request' },
    { name: 'offset', type: 'integer', desc: 'Record offset to start from for pagination' },
    { name: 'updated-after', type: 'datetime', desc: 'Limit results to those updated after this date/time' },
    { name: 'created-after', type: 'datetime', desc: 'Limit results to those created after this date/time' },
    { name: 'started-after', type: 'datetime', desc: 'Limit results to those with a start time after the specified timestamp' },
    { name: 'started-before', type: 'datetime', desc: 'Limit results to those with a start time before the specified timestamp' },
    { name: 'date', type: 'date', desc: 'Retrieve bookings for a specific date in the format YYYY-MM-DD' },
    { name: 'time', type: 'string', desc: 'Retrieve bookings for a specific time in the format HH:mm. This parameter must be used in combination with the date' },
    { name: 'status', type: 'string', desc: 'Retrieve bookings with a specific status (approved, canceled, confirmed, noshow, pending, seated, partial, arrived, completed)' },
    { name: 'guest-id', type: 'integer', desc: 'Guest ID to filter the bookings' }
  ],
  restaurantCode: [
    { name: 'restaurant-code', type: 'string', desc: 'Restaurant code', required: true },
  ],
  createBooking: [
    { name: 'size', type: 'integer', desc: 'Number of guests', required: true },
    { name: 'date', type: 'string', desc: 'Booking date (format YYYY-MM-DD)', required: true },
    { name: 'time', type: 'string', desc: 'Booking time (format HH:MM:SS)', required: true },
    { name: 'note', type: 'string', desc: 'Note for the restaurant staff' },
    { name: 'locale', type: 'string', desc: 'Guest\'s preferred language (BCP 47 code)' },
    { name: 'table-number', type: 'string', desc: 'Table number for the booking' },
    { name: 'booking-experience-id', type: 'integer', desc: 'ID of the booking experience' }
  ],
  updateBooking: [
    { name: 'note', type: 'string', desc: 'Note for the restaurant staff' },
    { name: 'locale', type: 'string', desc: 'Guest\'s preferred language (BCP 47 code)' },
  ],
  personId: [
    { name: 'id', type: 'integer', desc: 'Guest\'s ID', required: true },
  ],
  person: [
    { name: 'first-name', type: 'string', desc: 'Guest\'s first name', required: true },
    { name: 'last-name', type: 'string', desc: 'Guest\'s last name', required: true },
    { name: 'email', type: 'string', desc: 'Guest\'s email address', required: true },
    { name: 'phone', type: 'string', desc: 'Guest\'s phone number', required: true },
    { name: 'preferred-communication-channel', type: 'string', desc: 'Preferred contact method ("email" or "phone")' },
    { name: 'locale', type: 'string', desc: 'Guest\'s language preference' }
  ],
  personUpdate: [
    { name: 'first-name', type: 'string', desc: 'Guest\'s first name' },
    { name: 'last-name', type: 'string', desc: 'Guest\'s last name' },
    { name: 'email', type: 'string', desc: 'Guest\'s email address' },
    { name: 'phone', type: 'string', desc: 'Guest\'s phone number' },
    { name: 'preferred-communication-channel', type: 'string', desc: 'Preferred contact method ("email" or "phone")' },
    { name: 'locale', type: 'string', desc: 'Guest\'s language preference' }
  ],
  bookingErrors: [
    { name: '404', type: 'string', desc: 'Booking not found' },
    { name: '409', type: 'string', desc: 'Booking could not be canceled' }
  ],
  rescheduleBooking: [
    { name: 'date', type: 'string', desc: 'Booking date (format YYYY-MM-DD)', required: true },
    { name: 'time', type: 'string', desc: 'Booking time (format HH:MM:SS)', required: true },
    { name: 'size', type: 'integer', desc: 'Number of guests' },
    { name: 'booking-experience-id', type: 'integer', desc: 'ID of the booking experience' }
  ],
  deviceInfos: [
    { name: 'id', type: 'string', desc: 'Unique identifier for the device' },
    { name: 'ip', type: 'string', desc: 'IP address of the device' }
  ],
  reviews: [
    { name: 'rating', type: 'number', desc: 'Overall rating given by the user' },
    { name: 'ambiance-rating', type: 'number', desc: 'Ambiance rating (if applicable)' },
    { name: 'food-rating', type: 'number', desc: 'Food rating (if applicable)' },
    { name: 'service-rating', type: 'number', desc: 'Service rating (if applicable)' },
    { name: 'menu-rating', type: 'number', desc: 'Menu rating (if applicable)' },
    { name: 'presentation-rating', type: 'number', desc: 'Presentation rating (if applicable)' },
    { name: 'custom-question-1', type: 'string', desc: 'Custom question response (if configured)' },
    { name: 'custom-question-2', type: 'string', desc: 'Custom question response (if configured)' },
    { name: 'description', type: 'string', desc: 'Review text (if provided)' },
    { name: 'reply', type: 'string', desc: 'Response to the review from the restaurant (if provided)' },
    { name: 'source', type: 'string', desc: 'Source of the review (e.g., libro, google)' },
    { name: 'created-at', type: 'string', desc: 'When the review was created' },
    { name: 'updated-at', type: 'string', desc: 'When the review was last updated' },
  ],
  pagination: [
    { name: 'limit', type: 'integer', desc: 'Number of records per request' },
    { name: 'offset', type: 'integer', desc: 'Record offset to start from for pagination' },
    { name: 'page', type: 'integer', desc: 'Current page' },
    { name: 'per-page', type: 'integer', desc: 'Number of records per page' }
  ]
};

const attrTables = document.querySelectorAll('.dynamic-attributes');
  
attrTables.forEach(function(table) {
    const attrType = table.getAttribute('data-attr-type');
    const attrs = attributes[attrType];
    
    if (attrs && attrs.length > 0) {     
      attrs.forEach(function(attr) {
        table.innerHTML += '<div class="stripe-attribute">' +
          '<div class="attr-header">' +
            '<span class="attr-name"><code>' + attr.name + '</code></span>' +
            '<span class="attr-type">' + attr.type + '</span>' +
            '<span class="attr-req">' + (attr.required ? 'Required' : '') + '</span>' +
          '</div>' +
          '<div class="attr-description">' + attr.desc + '</div>' +
          '<div class="attr-values">' + (attr.values ? 'Values: ' + attr.values.join(', ') : '') + '</div>' +
        '</div>';
      });
    }
  });
});
