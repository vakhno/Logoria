# Agent Rules

This file is the always-loaded instruction layer for AI coding agents working in
this repository. Keep it short, current, and limited to behavior that should
apply on almost every task.

## Context

Read only the context needed for the task.

- `PRODUCT.md`: product purpose, users, positioning, workflows, and open product
  decisions.
- `CONTEXT.md`: architecture, stack, routes, commands, environment, and
  implementation constraints.
- `DESIGN.md`: visual design, UX, copy, accessibility, or frontend polish.
- This root `AGENTS.md` is the only agent instruction file. Do not add nested
  `AGENTS.md` or `CLAUDE.md` files unless the user explicitly asks.

## Operating Rules

- Follow the user's latest instruction when it conflicts with older context.
- Prefer existing project patterns over new ones.
- Keep changes focused on the requested behavior.
- Avoid new dependencies unless the existing stack cannot reasonably solve the problem.
- Do not edit generated files, lockfiles, migrations, or deployment config unless the task requires it.
- Preserve user changes in the worktree. Do not revert unrelated edits.
- Ask one concise question only when a missing decision blocks safe progress.

## Implementation Rules

- Read the affected code before editing.
- Reuse existing helpers, types, schemas, route constants, components, and test utilities.
- Put business logic, validation, data access, and UI state in the layers documented by `CONTEXT.md`.
- Keep public APIs, persisted data, and user-facing behavior backward compatible unless the task explicitly changes them.
- Treat auth, authorization, database writes, payments, secrets, migrations, and data deletion as high-risk changes.
- Add comments only when they clarify non-obvious logic or a deliberate constraint.

## Validation

Run the smallest checks that prove the change.

- Docs only: review the rendered Markdown when practical.
- Normal code: run the repository lint and typecheck commands from `CONTEXT.md`.
- Non-trivial logic: add or run a focused test that would fail if the behavior regressed.
- UI changes: verify the relevant screen or component, including keyboard/focus and a narrow viewport when practical.
- API, auth, database, realtime, or security changes: run the relevant integration or e2e check when practical.
- If a required check cannot run, report the command and the reason.

## Security

- Never commit secrets, tokens, private keys, or real credentials.
- Validate untrusted input at the server or trusted boundary.
- Derive identity and permissions from trusted session/auth state, not client-provided fields.
- Avoid logging sensitive personal data, credentials, tokens, or full request payloads.
- Treat dependency, CORS, cookie, header, environment, and deployment changes as security-relevant.

## Collaboration

- For broad or ambiguous work, state the intended approach before making large edits.
- For reviews, lead with bugs, risks, regressions, and missing tests.
- For completed work, summarize changed files, checks run, and any remaining risk.
- Keep explanations concise and concrete.

## Maintenance

Update `CONTEXT.md` when product rules, architecture boundaries, commands,
environment variables, test strategy, or known constraints change.
