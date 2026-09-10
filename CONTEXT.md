# Project Context

Use this file for durable implementation context: stack, architecture, repository layout, commands, environment, validation, and known technical constraints. Do not use it for product strategy, visual design rules, or agent behavior.

## Overview

Describe the repository at a high level.

Default boilerplate:

This repository is an npm/Turbo monorepo for a TypeScript web product scaffold.
The product domain is intentionally not defined in this file. Use `PRODUCT.md`
for product truth and `DESIGN.md` for visual and UX rules.

Expected content:

- Product or application type at a technical level.
- Monorepo or single-app structure.
- Runtime architecture.
- Major technical responsibilities.
- Link to `PRODUCT.md` for product truth.
- Link to `DESIGN.md` for visual and UX rules.

## Stack

Describe the confirmed technology stack.

Default boilerplate:

- Frontend: Next.js 16, React 19, next-intl.
- Backend: NestJS 12 on Express.
- Data: PostgreSQL through Drizzle ORM.
- Auth: Better Auth client and server integration.
- UI: shared React components, shared styles, Tailwind/shadcn-style tokens.
- Tooling: npm workspaces, Turbo, TypeScript build mode, oxlint, oxfmt, Docker Compose.

Expected content:

- Frontend framework and rendering model.
- Backend framework and runtime.
- Database, ORM, cache, queue, storage, or search services.
- Authentication and authorization libraries.
- UI system, styling tools, and component libraries.
- Tooling, package manager, build system, formatter, linter, and test runner.

## Repository Layout

Describe the major directories and ownership boundaries.

Default boilerplate:

```text
/
|-- apps/frontend/      Next.js app, route screens, providers, local assets.
|-- apps/backend/       NestJS API process and Better Auth HTTP handler.
|-- apps/storybook/     Component stories and visual development surface.
|-- shared/auth/        Better Auth config, server/client exports, auth types.
|-- shared/components/  Shared UI primitives and patterns.
|-- shared/db/          Drizzle schema, client, and migration config.
|-- shared/i18n/        Locale constants, messages, routing, request config.
|-- shared/routes/      Shared app/API route constants.
|-- shared/styles/      Global CSS and design tokens.
|-- shared/unit/        Unit test workspace.
|-- shared/integration/ Integration test workspace.
|-- shared/e2e/         Playwright e2e workspace.
|-- AGENTS.md           Root-only agent behavior and quality gates.
|-- PRODUCT.md          Product purpose, users, workflows, positioning, and open decisions.
|-- CONTEXT.md          Implementation briefing, architecture, commands, and constraints.
|-- DESIGN.md           Product UI design system.
`-- package.json        Root npm workspace scripts.
```

There should be one agent instruction file: root `AGENTS.md`. Do not add nested
`AGENTS.md` or `CLAUDE.md` files without an explicit user request.

Expected content:

- App directories.
- Shared packages.
- Test workspaces.
- Config directories.
- Generated directories that should not be edited.
- Documentation files and their responsibilities.

## Public Surface

Describe the externally visible routes, APIs, jobs, commands, packages, or integration points.

Default boilerplate:

Shared route constants live in `shared/routes/src/index.ts`.

Web routes:

- `/` home
- `/signin`
- `/profile`

API routes:

- `/api/auth/*` is handled by Better Auth on the backend.
- The frontend rewrites `/api/auth/:path*` to the API server using
  `INTERNAL_API_URL`, `API_PUBLIC_URL`, or `http://localhost:3002`.

Expected content:

- Web routes.
- API routes.
- Background jobs or scheduled tasks.
- Published packages.
- Webhooks and third-party integration endpoints.
- Stable route or API constants that should be reused by implementation work.

## Architecture Rules

Describe implementation boundaries that should stay stable across changes.

Default boilerplate:

- Use shared package exports instead of duplicating constants, auth helpers,
  i18n helpers, route strings, schemas, or UI primitives inside an app.
- Keep route constants in `shared/routes`; update call sites through the shared
  constant instead of hardcoded strings.
- Keep Better Auth server configuration in `shared/auth` and backend wiring in
  `apps/backend`.
- Keep database schema and Drizzle config in `shared/db`.
- Keep reusable UI in `shared/components`; keep route-level screen composition
  in `apps/frontend/src/screens`.
- Use `DESIGN.md` and `shared/styles/src/globals.css` for product UI tokens.
  Avoid one-off colors, spacing, radii, or motion values in components.
- Do not edit generated files such as `.next/`, `dist/`, `node_modules/`,
  `next-env.d.ts`, or `*.tsbuildinfo`.

Expected content:

- Where business logic belongs.
- Where validation belongs.
- Where data access belongs.
- Where UI state belongs.
- Shared helpers, constants, schemas, and types that should be reused.
- Boundaries that should not be crossed without an explicit design decision.

## Auth And Data Boundaries

Describe security-sensitive identity, permission, and persistence rules.

Default boilerplate:

Auth is security-sensitive:

- Better Auth owns users, sessions, accounts, verification, roles, bans, OAuth
  state, cookies, and bearer/admin plugins.
- User roles are `user` and `admin`; default role is `user`.
- Derive identity and permissions from trusted Better Auth session state, not
  client-provided fields.
- Cookie, CORS, OAuth, trusted-origin, token, and rate-limit changes require
  focused validation.

Database writes are security-sensitive:

- Drizzle schema tables are `user`, `session`, `account`, and `verification`.
- `session.userId` and `account.userId` cascade on user deletion.
- Do not create migrations, push schema, or change persisted fields unless the
  task explicitly requires it.

Expected content:

- Auth provider and session source of truth.
- User roles and permission model.
- Rules for deriving identity.
- Database ownership and migration rules.
- Data deletion, retention, privacy, and audit constraints.
- High-risk areas that require focused validation.

## Environment

Describe required environment variables, runtime ports, and local/deployed service assumptions.

Default boilerplate:

Use committed examples as the source of truth for variable names:

- `.env.local.example`
- `.env.stage.example`
- `.env.production.example`

Known runtime values:

- Frontend dev port: `3001`.
- Backend local API port: `3002` via `API_PORT` or `dev:3002`.
- `API_PUBLIC_URL`, `APP_PUBLIC_URL`, and `INTERNAL_API_URL` control public and
  internal app/API URLs.
- Backend loads `ENV_FILE`, defaulting to `.env.local`.

Never commit real secrets from `.env.local`, `.env.stage`, or `.env.production`.

Expected content:

- Source-of-truth example env files.
- Required variables.
- Optional variables.
- Local development ports.
- Internal versus public URLs.
- Secret-handling rules.

## Commands

List the standard commands contributors and agents should run from the repository root.

Default boilerplate:

| Task               | Command                                |
| ------------------ | -------------------------------------- |
| Install            | `npm install`                          |
| Frontend dev       | `npm run dev --workspace frontend`     |
| Backend dev        | `npm run dev:3002 --workspace backend` |
| Storybook          | `npm run storybook`                    |
| Build              | `npm run build`                        |
| Lint               | `npm run lint`                         |
| Typecheck          | `npm run typecheck`                    |
| Format             | `npm run format`                       |
| Format check       | `npm run format:check`                 |
| Unit tests         | `npm run test:unit`                    |
| Integration tests  | `npm run test:integration`             |
| E2E tests          | `npm run test:e2e`                     |
| Local Docker start | `npm run docker:start:local`           |
| Local Docker stop  | `npm run docker:down:local`            |
| Drizzle generate   | `npm run drizzle:generate`             |
| Drizzle migrate    | `npm run drizzle:migrate`              |
| Drizzle push local | `npm run db:push:local`                |

## Validation

Describe the smallest checks that prove different kinds of changes.

Default boilerplate:

- Docs-only changes: review the changed markdown; no runtime check needed.
- Normal code changes: run `npm run lint` and `npm run typecheck`.
- Shared package changes: add or run the focused unit/integration test workspace
  that covers the changed package.
- Frontend UI changes: verify the route/component in browser or Storybook, and
  check a narrow viewport when practical.
- Auth, database, CORS, cookies, OAuth, or API routing changes: run the relevant
  integration or e2e check when practical and report anything that could not run.

Expected content:

- Docs-only validation.
- Normal code validation.
- Shared package validation.
- Frontend UI validation.
- API validation.
- Auth, database, realtime, payment, security, and deployment validation.
- What to report when a required check cannot run.

## Known Gaps

Describe confirmed missing decisions, missing tests, architectural risks, or undocumented constraints.

Default boilerplate:

- Product domain, audience, positioning, MVP scope, and durable business rules
  are not confirmed yet.
- Product-specific data model is not defined yet.
- Product-specific authorization rules beyond Better Auth roles are not
  documented yet.
- Product-specific realtime, media, search, notification, payment, or content
  architecture is not defined yet.
- Moderation, reporting, privacy, safety, retention, and compliance policies are
  not documented yet.
- Deployment ownership and CI expectations are not documented yet.

Expected content:

- Product decisions that still need to be reflected from `PRODUCT.md`.
- Domain model gaps.
- Authorization gaps.
- Integration or infrastructure gaps.
- Testing gaps.
- Deployment or CI gaps.
- Documentation that must be updated when decisions land.

## ADR Index

Link to architecture decision records when the project has them.

Expected content:

- `docs/adr/0001-example.md`: short description.
- Open decisions that should become ADRs before implementation.
