# @shared/routes

Canonical frontend and API route constants shared across the application.

## Owns

- Web route paths
- API route paths

## Usage

```ts
import { APP_ROUTES } from "@shared/routes";

router.push(APP_ROUTES.profile);
```

## Rules

- Do not hardcode shared route strings outside this package.
- Add a route constant when a path is used by more than one module.
- Update `CONTEXT.md` when adding, removing, or renaming a public route.
- Update `docs/routes.md` when a route's purpose, redirect behavior, or access
  policy changes.

## Exports

| Export       | Purpose                         |
| ------------ | ------------------------------- |
| `APP_ROUTES` | Canonical frontend route paths. |
| `API_ROUTES` | Canonical API route paths.      |
