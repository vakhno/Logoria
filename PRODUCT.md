# Product

<!-- impeccable:product-schema 1 -->

Use this file for durable product truth: who the product serves, what it makes possible, how it is positioned, and what future work must preserve. Do not use it for implementation details, visual design rules, or agent behavior.

## Platform

Describe the primary product platform.

Default value:

- `web`

Expected content:

- `web`, `ios`, `android`, or `adaptive`.
- Any confirmed platform-specific constraint that changes product behavior.

## Users

Describe who the product is for and what situation they are in.

Expected content:

- Primary user segment.
- Secondary user segments, if confirmed.
- User roles and permission differences.
- User goals, urgency, constraints, and success criteria.

## Product Purpose

Describe what the product makes possible and why it exists.

Expected content:

- Core user job.
- Main workflow the product enables.
- Definition of a successful product experience.
- What the product should make easier, faster, safer, clearer, or more valuable.

## Positioning

Describe the product category, market stance, and real differentiator.

Expected content:

- Product category.
- Competing alternatives.
- Core mechanism or advantage.
- Claims that must be supported by evidence.

## Operating Context

Describe the factual environment in which the product is used or evaluated.

Expected content:

- Primary end-to-end workflow.
- Public, private, anonymous, authenticated, realtime, asynchronous, or content-driven usage patterns.
- External tools, systems, documents, people, or rituals involved in the workflow.
- Moderation, review, approval, governance, or compliance needs.

## Capabilities and Constraints

Describe confirmed functionality, non-functional constraints, and unresolved scope.

Default scaffold capabilities:

- Web app shell.
- Home, sign-in, and profile routes.
- User accounts through the scaffold auth layer.
- OAuth sign-in support.
- English and Spanish localization.
- Light, dark, and system theme preference.
- Shared UI primitives and global design tokens.

Expected content:

- MVP capabilities.
- Later capabilities.
- Explicit non-goals.
- Persisted data or domain objects.
- Authorization, privacy, retention, realtime, media, payment, search, notification, or content-management constraints.
- Open product decisions that future work must not silently decide.

## Brand Commitments

Describe durable brand, voice, identity, naming, and claim constraints.

Expected content:

- Product name.
- Tone of voice.
- Logo, naming, or identity constraints.
- Required or forbidden claims.
- Pricing, legal, safety, educational, or credibility claims that are already confirmed.

## Evidence on Hand

Describe the real source material available for future product and design work.

Default scaffold evidence:

- `CONTEXT.md`: implementation context, architecture, commands, and constraints.
- `DESIGN.md`: neutral UI design-system starting point.
- `AGENTS.md`: agent behavior and repository workflow rules.
- Current scaffold screens: home, sign-in, and profile.
- Current scaffold shared packages: auth, components, database, i18n, routes, styles, tests.

Expected content:

- Product briefs.
- Research notes.
- User interviews.
- Analytics.
- Existing screens, demos, or prototypes.
- Testimonials, case studies, benchmarks, press, or partner proof.
- Explicitly missing evidence that must not be fabricated.

## Product Principles

Describe three to five durable product decision rules.

Expected content:

- Principles derived from confirmed product truth.
- Rules that help decide scope, tradeoffs, and user experience behavior.
- No visual recipes, implementation instructions, or generic values.

## Accessibility & Inclusion

Describe product-specific accessibility and inclusion requirements.

Default scaffold baseline:

- Preserve keyboard access and visible focus for interactive UI.
- Do not rely on color alone to communicate state.
- Keep core flows usable at narrow viewports.
- Support the existing localization architecture when adding user-facing copy.

Expected content:

- Accessibility standard or compliance target, if confirmed.
- Known user needs.
- Language, localization, device, input, assistive technology, or low-bandwidth constraints.
- Participation alternatives for users who cannot use a primary interaction mode.
