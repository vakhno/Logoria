---
name: frontend-testing
description: Chooses the smallest useful frontend test coverage across Storybook, Vitest with React Testing Library, integration tests, and Playwright E2E. Use when adding or changing frontend UI, forms, browser state, reusable components, accessibility interactions, or frontend regressions.
---

# Frontend Testing

Use the cheapest check that proves the changed UI behaviour. Do not add tests for trivial one-off markup with no branch, state, interaction, or regression risk.

## Test Picker

- Storybook: use for reusable components, visual variants, and important states such as loading, empty, error, disabled, long text, narrow viewport, and signed-in/signed-out variants.
- Vitest + React Testing Library: use for component rendering branches, form validation, keyboard/focus behaviour, local state transitions, hooks, pure UI helpers, and regressions that do not need a real browser or server.
- Integration tests: use when behaviour crosses frontend modules or depends on shared contracts but still can run faster than a full browser flow.
- Playwright E2E: use for critical user journeys, routing, auth/session behaviour, browser APIs, real accessibility interactions, realtime/reconnect flows, cross-page state, and regressions that only fail in a browser.

## Workflow

1. Read `package.json`, workspace `package.json`, and existing nearby tests before choosing tools.
2. Prefer one focused test at the lowest level that can fail for the bug or changed behaviour.
3. Add Storybook coverage when a reusable component or important UI state changed.
4. Add Playwright only when unit/component tests cannot prove the behaviour.
5. Keep tests observable: query by role, label, visible text, route, and user outcome rather than implementation details.
6. Run the narrowest relevant command first, then the repo-required gate when practical.

## Repo Defaults

- Unit/component: `npm run test:unit`
- Integration: `npm run test:integration`
- E2E: `npm run test:e2e`
- Storybook dev: `npm run storybook`
- Required normal code gates: `npm run lint` and `npm run typecheck`

If a workspace has a narrower script, use that first and report the exact command.

## Do Not

- Do not snapshot broad UI trees unless the repo already relies on that pattern.
- Do not mock the behaviour under test so heavily that the test cannot fail for the real regression.
- Do not use Playwright for pure formatting, simple conditional rendering, or local helper logic.
- Do not skip required checks silently; report blocked or unrun checks as release risk.
