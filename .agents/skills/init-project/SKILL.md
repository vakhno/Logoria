---
name: init-project
description: Grill the user to establish the basic product logic needed for durable product context and coherent initial GitHub backlog issues when beginning a new project or product direction. Do not use for planning or implementing a selected feature.
---

# Initialize a Project

Build the product foundation before feature-level planning begins. This is a
collaborative discovery and documentation workflow, not implementation.

“Basic product logic” means the user-visible behavior and rules needed to
understand the product and divide it into meaningful backlog candidates. It is
not source-code logic or a detailed specification.

## Invocation

Invoking `$init-project` is sufficient. The user may add a short product idea,
but does not need to ask for grilling, documentation, or backlog preparation;
those behaviors are part of this skill.

## Outcome

- `PRODUCT.md` contains confirmed product truth and explicit open decisions.
- `CONTEXT.md` contains only confirmed technical context that changed during
  discovery.
- The product foundation explains enough of the actors, goals, workflows,
  boundaries, terminology, permissions, states, and durable rules to produce
  coherent issue descriptions.
- The user receives a rough backlog of candidate issues, each with only a
  title and description. Approved candidates may then be published as basic
  GitHub issues.

## Workflow

1. Follow `AGENTS.md`. Quickly inspect `PRODUCT.md` and `CONTEXT.md` only to
   distinguish confirmed project context from boilerplate. When they are blank
   or template-only, do not read their examples as product research; begin
   discovery with the user. When confirmed context exists, read only the
   sections relevant to the stated product direction.
2. Use `grill-me` to establish the missing product foundation. Ask one question
   at a time, provide a recommended answer, and resolve dependent decisions in
   order. Keep the interview focused on the problem, actors and their goals,
   desired outcomes, end-to-end workflows, system boundary, initial scope,
   canonical terms, roles and permissions, meaningful lifecycle states,
   durable rules, failure or recovery behavior that changes the product,
   success signals, and open decisions. Do not descend into feature
   implementation or technical design unless it changes the product boundary.
3. Track confirmed decisions, proposed defaults, and unresolved questions in
   the conversation. Ask only for facts that cannot be verified from the
   repository. Distinguish evidence from assumptions, and record unknowns as
   open decisions rather than inventing answers. Stop grilling when the
   information is sufficient to distinguish backlog candidates and describe
   each candidate's actor, desired outcome, and reason for existing.
4. Summarize the resulting product foundation and ask the user to confirm it
   before writing documentation or drafting the backlog.
5. Update `PRODUCT.md` with confirmed product purpose, users, workflows,
   terminology, scope, roles or access rules, durable product rules, and open
   decisions as applicable.
6. Replace boilerplate in `CONTEXT.md` only when a confirmed decision adds or
   changes technical architecture, repository boundaries, environment,
   commands, or constraints.
7. Use `git-backlog-issue-workflow` to draft a rough backlog. Every candidate
   must contain only a title and description. The description should briefly
   identify the relevant actor, desired product outcome, and why it matters,
   without becoming a user-story template or detailed ticket. Keep candidates
   product-oriented and small enough to discuss independently.
8. Present the documentation changes and the backlog for human review, then
   stop.
9. Only after the user explicitly approves the candidates and asks to publish
   them, create exactly those basic GitHub issues with their approved titles
   and descriptions. Do not silently enrich, merge, split, label, or reorder
   them during publication.
10. Report the created issue references and stop. Feature planning is a
    separate workflow.

## Boundaries

- Do not write implementation code, create a branch, create an OpenSpec
  change, or create a GitHub Project.
- Do not create GitHub issues before the user has reviewed and explicitly
  approved the draft backlog for publication.
- Do not add issue labels, dependencies, acceptance criteria, edge cases, or
  implementation details to rough backlog candidates.
- A user selects a backlog item before feature planning begins. For that item,
  use `openspec-explore` when meaningful uncertainty remains; otherwise use
  `openspec-propose`. Do not use either workflow for the entire unselected
  backlog.
- OpenSpec creates planning artifacts; it does not automatically enrich the
  selected GitHub issue. After the user approves the OpenSpec artifacts, use a
  separate tracker-update workflow to add the agreed scope, acceptance checks,
  edge cases, dependencies, and OpenSpec reference to the existing issue.
  Follow `docs/development-workflow.md` thereafter: create/resume the issue
  branch before writing OpenSpec artifacts, then review, enrich, and implement.
