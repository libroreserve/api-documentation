# Webhooks

Webhooks allow your application to receive real-time notifications when events occur in Libro. Instead of polling the API for changes, Libro will send HTTP POST requests to your configured endpoint whenever relevant events happen.

## Overview

When you configure a webhook for a restaurant, Libro will send HTTP POST requests to your specified URL whenever resources are updated. Each webhook request includes:

- A JSON payload following the same JSON:API format as the equivalent API resources
- An `X-Libro-Signature` header for verifying the request authenticity (when a signing secret is configured)
- Standard HTTP headers including `Content-Type: application/json`

## Responding to Webhooks

Your endpoint should return a `2xx` status code to acknowledge receipt of the webhook. If Libro receives a non-2xx response or the request times out, it may retry the webhook delivery.

<aside class="notice">
Ensure your webhook endpoint responds quickly to avoid timeouts.
</aside>
