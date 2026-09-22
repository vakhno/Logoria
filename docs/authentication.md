# Authentication

This document describes the implemented sign-in and session configuration.
Route access and redirects are defined in `docs/routes.md`.

## Ownership

| Area | Location |
| --- | --- |
| Shared authentication configuration and helpers | `shared/auth` |
| Backend authentication handler | `apps/backend/src/auth` |
| Frontend session helpers | `apps/frontend/src/lib/auth-server.ts` and `apps/frontend/src/lib/auth-client.ts` |
| Authentication API route constants | `shared/routes/src/index.ts` |
| Frontend rewrite for authentication requests | `apps/frontend/next.config.js` |

## Providers

| Provider | Purpose | Status |
| --- | --- | --- |
| Google OAuth | User sign-in | Enabled |

## Sessions

- The authentication service is the source of truth for user identity and
  session validity.
- Server-rendered frontend code obtains the current session through
  `getServerSession()`.
- Session-cookie caching is enabled for 30 minutes. This cache duration is not
  the same as the server session's expiry policy.
- Signing out clears the active session through the authentication client.

## Authentication endpoints and redirects

- Authentication endpoints are served below `/api/auth/*`.
- The frontend rewrites these requests to the backend API service.
- The sign-in screen accepts an internal `redirectTo` path and passes it to the
  Google sign-in flow after prefixing it with the application's base URL.

## Security configuration

- Authentication configuration uses secure cookies by default.
- Cookie settings, trusted origins, OAuth credentials, bearer tokens,
  administrative capabilities, and rate limits are security-sensitive
  configuration.

## Maintenance

Update this document when changing a provider, authentication endpoint,
session/cookie behavior, redirect handling, trusted origin, or authentication
security configuration. Update `docs/routes.md` when the change also affects
route access or redirect behavior.
