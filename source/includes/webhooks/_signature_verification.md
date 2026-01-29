## Signature Verification

When your webhook has a signing secret configured, Libro signs every webhook request using HMAC-SHA256. This allows you to verify that the request came from Libro and hasn't been tampered with.

### The Signature Header

> Example Signature Header

```
X-Libro-Signature: t=1705123456,v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd
```

Each signed webhook request includes an `X-Libro-Signature` header with two components:

| Component | Description |
|-----------|-------------|
| `t` | Unix timestamp (seconds since epoch) when the signature was generated |
| `v1` | The HMAC-SHA256 signature |

### How the Signature is Computed

The signature is computed by:

1. Concatenating the timestamp and the raw request body with a period: `{timestamp}.{payload}`
2. Computing an HMAC-SHA256 hash using your signing secret as the key
3. Encoding the result as a lowercase hexadecimal string

### Verifying Signatures

To verify a webhook signature:

1. Extract the timestamp (`t`) and signature (`v1`) from the `X-Libro-Signature` header
2. Check that the timestamp is within your tolerance window (we recommend 5 minutes / 300 seconds)
3. Recreate the signed payload by concatenating the timestamp and the raw request body: `{timestamp}.{payload}`
4. Compute the expected signature using HMAC-SHA256 with your signing secret
5. Compare your computed signature with the signature in the header

### Timestamp Tolerance

The timestamp in the signature header allows you to reject old webhook deliveries, protecting against replay attacks. We recommend a tolerance of **5 minutes (300 seconds)**.

If a webhook arrives with a timestamp outside your tolerance window, reject it and return a `4xx` status code.

### Security Best Practices

1. **Always verify signatures** - Never process webhook payloads without verifying the signature first
2. **Validate the timestamp** - Reject webhooks with timestamps that are too old or in the future
3. **Keep your signing secret secure** - Store it securely and never expose it in client-side code
4. **Use HTTPS** - Always use HTTPS endpoints for your webhooks
