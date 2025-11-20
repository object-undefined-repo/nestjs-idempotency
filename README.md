# NestJS Idempotency Example

This project demonstrates the concept of idempotency in API design using NestJS. It includes two controllers: `idempotent` and `not_idempotent`, each illustrating different behaviors regarding repeated requests.

## What is Idempotency?

**Idempotency** is a property of certain operations in which performing the same operation multiple times produces the same result as performing it once. In the context of APIs, an idempotent endpoint ensures that making the same request multiple times will not have additional side effects after the initial request.

For example, creating a resource with the same unique identifier multiple times should not create duplicate resources if the endpoint is idempotent.

## How Idempotency Works in the Interceptor

The `idempotency_interceptor` checks for an idempotency key in incoming requests. If a request with the same key was already processed, it returns the stored response instead of executing the handler again. This prevents duplicate processing and ensures safe retries.

## Controllers

### Idempotent Controller (`idempotent.controller.ts`)
- **Purpose:** Demonstrates an endpoint that is idempotent.
- **Behavior:** Multiple identical requests (with the same idempotency key or unique identifier) will have the same effect as a single request. No duplicate processing or resource creation occurs.
- **Use Case:** Useful for operations like payment processing, resource creation, or any action where duplicate processing must be avoided.

### Not Idempotent Controller (`not_idempotent.controller.ts`)
- **Purpose:** Demonstrates an endpoint that is not idempotent.
- **Behavior:** Each request, even if identical, is processed independently. Repeated requests may result in duplicate actions or resource creation.
- **Use Case:** Useful for operations where each request should be treated as a new action, such as logging events or appending to a list.

## Usage

- Use the `idempotent` endpoint to ensure safe retries and avoid duplicate processing.
- Use the `not_idempotent` endpoint to see the effects of non-idempotent operations.

---

For more details, see the source code in the `src/api` directory.