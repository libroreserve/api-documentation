# Introduction

Welcome to the **Libro API** — your comprehensive toolkit for integrating restaurant reservation management into your applications. This documentation provides detailed guidance on accessing our API endpoints for booking management, restaurant information, and customer data.

## API Architecture

The Libro API uses RESTful principles with JSON:API-compliant responses. All data is exchanged in JSON format, and authentication is handled through OAuth 2.0 bearer tokens.

### Key Features

- **JSON:API Format**: Standardized response structure for consistent parsing
- **OAuth 2.0 Authentication**: Secure access through bearer tokens
- **Versioned Endpoints**: Explicit versioning through Accept headers
- **Comprehensive Error Handling**: Detailed error messages and codes

### Documentation Conventions

Throughout this documentation, you'll find examples in multiple programming languages. Select your preferred language using the tabs at the top of each code example.

<aside class="notice">
All example code assumes you have already set up authentication with your API key.
</aside>

The API uses resource-oriented URLs, standard HTTP response codes, and accepts request bodies in JSON format.

## Getting API Access

To begin your integration:

1. **Request API Access**: Contact us at <a href="mailto:admin@libroreserve.com">admin@libroreserve.com</a> to be added to our partner program
2. **Obtain OAuth Credentials**: You'll receive client ID and secret for authentication
3. **Set Up Your Environment**: Choose between production or staging based on your development phase

<aside class="notice">
If you're new to integrating with Libro, you'll first need to request API access for our staging environment. We'll provide access to our staging environment, and then we'll need to certify your integration before we can grant you access to our production environment.
</aside>

Here's what is required to get API access:

- Name of your app
- Scopes you need for your integration
- Redirect URIs
