# Routes

This document defines the access and redirect behavior for current web routes.
Canonical route strings live in `shared/routes/src/index.ts`.

## Access vocabulary

| Audience | Meaning |
| --- | --- |
| Public | Any visitor, including signed-out visitors. |
| Authenticated | Any signed-in user. |
| Personal | The signed-in user accessing only their own account data. |

## Current route access matrix

| Route | Purpose | Audience | Signed-out behavior |
| --- | --- | --- | --- |
| `/` | Home | Public | Render normally. |
| `/signin` | Sign-in flow | Public | Render normally. |
| `/profile` | Current user's profile | Personal | Redirect to `/signin`. |

## Protection rules

Authenticated debate routes use defense in depth:

1. Each protected page validates the server-side session before rendering its
   content.

## Current API access matrix

| Route | Method | Audience | Behavior |
| --- | --- | --- | --- |
| `/api/auth/*` | Varies | Public | Authentication provider endpoints. |

The frontend proxies `/api/*` requests to the backend. API handlers must always
validate authentication and authorization themselves; a frontend route guard is
not an API security boundary.

## Maintenance

Update this document in the same change as any addition, removal, rename, or
access-policy change to a web route.
