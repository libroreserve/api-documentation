# Pagination

Every resource LIST endpoint returns a paginated list of records, and can use the pagination mechanics.

> Retrieve the first 20 bookings:

> <span class="method get">GET</span> restricted/restaurant/bookings?limit=20&offset=0

> Retrieve the next 20 bookings:

> <span class="method get">GET</span> restricted/restaurant/bookings?limit=20&offset=20

> Retrieve 50 bookings per page:

> <span class="method get">GET</span> restricted/restaurant/bookings?limit=50&offset=0


### Query Parameters

<span class="dynamic-attributes" data-attr-type="pagination"></span>


To paginate through the payload, use the limit and offset parameters. The limit parameter controls the number of records returned in a single request, with a maximum value of 250. The offset parameter specifies the starting point for the query in terms of database records.



