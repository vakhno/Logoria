---
name: git-issue-workflow
description: Decompose a selected outcome into story children, enrich existing issues from an agreed plan, and maintain tracker hierarchy using vertical slices.
---

# Git Issue Workflow

Break a plan into independently-grabbable tickets using vertical slices (tracer bullets).

Follow `docs/development-workflow.md` for the execution contract and readiness.
This skill owns issue schemas, not a second planning workflow. For an existing
issue, update it in place. For a broad outcome, convert that issue to a story
and create only missing children. For approved OpenSpec artifacts, enrich the
existing leaf with a concise acceptance summary and link to the change; keep
detailed requirements and task progress in OpenSpec.

## Issue Model

An issue is one tracker ticket with one clear outcome.

Hierarchy role and work type are separate:

- **Independent issue:** has no parent or sub-issues. Use type `feature`,
  `bugfix`, or `update`.
- **Parent issue:** groups child issues under one larger outcome. Use type
  `story` and no implementation branch or OpenSpec change of its own.
- **Child issue:** belongs to one parent and contains no sub-issues. Use type
  `feature`, `bugfix`, or `update`.

Independent and child issues use the same delivery fields. The only structural
difference is that a child includes the parent issue URL. A parent uses its
`Acceptance Checks` to list linked child issues as checkboxes in required
implementation order, followed by any checks needed to verify the combined
outcome.

### Independent and Child Issues

- use type `feature`, `bugfix`, or `update`
- contain no sub-issues
- have one or more `area:*` labels for affected responsibilities
- should be independently buildable and verifiable
- include `Parent` only for a child issue

### Parent Issue

- use type `story`
- group multiple child issues needed to deliver one larger user outcome
- may have multiple `area:*` labels
- must use area labels that match the union of child issue areas
- use an ordered, linked child checklist in `Acceptance Checks` to communicate
  dependency order and progress
- include a combined-outcome acceptance check when child completion alone does
  not prove that the larger outcome works

Multiple areas do not require a story. Split by independently verifiable outcomes
or meaningful size; keep each vertical slice complete across its necessary layers.

## Worked examples

Read [references/issue-examples.md](references/issue-examples.md) when deciding
whether an outcome needs a parent, or when drafting or enriching a parent or
child body. The examples demonstrate the hierarchy and delivery flow; replace
their placeholder URLs and product details rather than copying them as facts.

## Labels

Use only configured tracker labels. For this project, default to:

### Type Labels

- `type:feature`
- `type:bugfix`
- `type:update`
- `type:story`

Use exactly one `type:*` label for every issue.

- `type:feature`: new behavior, page, flow, integration, tool, or logic.
- `type:bugfix`: existing behavior is incorrect or unexpectedly broken.
- `type:update`: change existing behavior, UI, config, dependency, tooling, copy, performance, or infrastructure.
- `type:story`: parent issue for a larger user outcome that needs child issues.

### Area Labels

- `area:app`
- `area:api`
- `area:tool`

- `area:app`: frontend pages, UI, components, forms, client state, accessibility, responsive behavior, design source work, layout mockups, visual structure, design tokens, and user-flow layout changes.
- `area:api`: backend API, auth server logic, database access, Socket.IO server logic, background jobs.
- `area:tool`: project tooling/infrastructure such as CI, linting, formatting, build tools, repo config, package/tool migration, documentation.

Use area labels by issue type:

- `feature`, `bugfix`, and `update` have one or more applicable `area:*` labels.
- `story` may have multiple `area:*` labels.
- `story` area labels must match the combined areas of its child issues.

## Design-Source Work

For UI/page work:

- Use `area:app` for both design-source and implementation work on frontend UI.
- If code is the source of truth, create one `area:app` leaf ticket when the work is small.
- If Figma/Pencil/template is the source of truth and must be updated first, create a `story`.
- In that story, create an `area:app` design-source child before the `area:app` implementation child.
- If visual approval is useful but not blocking, keep one implementation ticket.
- Do not force a `story` for a simple static page, copy update, layout tweak, or component change.

## Process

### 1. Gather context

Work from whatever is already in the conversation context. If the user passes an issue reference (issue number, URL, or path) as an argument, fetch it from the issue tracker and read its full body and comments.

### 2. Explore the codebase (optional)

If you have not already explored the codebase, do so to understand the current state of the code. Ticket titles and descriptions should use the project's domain glossary vocabulary, and respect ADRs in the area you're touching.

### 3. Draft vertical slices

Break the plan into **tracer bullet** tickets. Each ticket is a thin vertical slice that cuts through all integration layers end-to-end, not a horizontal slice of one layer.

Slices may be `HITL` or `AFK`. HITL marks an unresolved human decision or assigned
human acceptance check. AFK means implementable under the run's execution contract;
it does not grant merge authority. Record specific blockers and decision gates.

<vertical-slice-rules>
- Each slice delivers a narrow but complete path through every layer needed for that slice
- A completed slice is demoable or verifiable on its own
- Prefer many thin slices over few thick ones
- Avoid vague/layer-only tickets like "build frontend", "create database", "add backend", or "make page better"
</vertical-slice-rules>

### 4. Review the breakdown

Present the proposed breakdown as a numbered list. For each slice, show:

- **Title**: short descriptive name
- **Execution**: HITL / AFK
- **User stories covered**: which user stories this addresses (if the source material has them)

In interactive mode, ask the user as needed:

- Does the granularity feel right? (too coarse / too fine)
- Are the dependency relationships correct?
- Should any slices be merged or split further?
- Are the correct slices marked as HITL and AFK?

In interactive mode, iterate until the user approves the breakdown. In an
authorized automatic run, review it against the agreed parent outcome yourself
and proceed within that scope. Ask only for missing material decisions or authority.

### 5. Publish the tickets to the issue tracker

Within publication authority, reuse matching issues and create only missing
children in dependency order. Link parent/children and blockers, reading back each
write before retrying uncertain results. Draft children stay Backlog until planned.
Use the full template when enriching them; do not mark them Ready just because
they were created. Apply Ready only when the canonical readiness criteria pass.

#### GitHub browser publishing

For this repo, prefer the logged-in GitHub browser session for creating issues. The Codex GitHub connector may be able to read issues while failing writes with:

- `GitHub API error 403`
- `Resource not accessible by integration`
- an installed-account/installation result that does not include the target repo owner

This is a connector write-permission problem, not an issue-body problem. Do not stop after that error.

Use this browser flow:

1. Open `https://github.com/<owner>/<repo>/issues/new` in the logged-in GitHub browser/Chrome session.
2. Fill `input[placeholder="Title"]` with the issue title.
3. Fill `textarea[aria-label="Markdown value"]` with the exact Markdown body.
4. Submit from the body textarea with `Ctrl+Enter`. Use this even if the visible `Create` button is present, because GitHub's React button can fail to navigate under automation.
5. Confirm the URL changed to `/issues/<number>`.
6. Wait a few seconds for GitHub project automation to add the issue.
7. If Ready was requested and the readiness criteria pass, set project Status to Ready and verify it. Otherwise retain Backlog and record the blocker.
8. Verify the created issue by reading it back with the GitHub connector or the browser page.

Use the GitHub connector for reads and for writes only when it is already known to have write access. Use `gh issue create` only when browser control is unavailable and `gh` is installed/authenticated. Ask the user to reconnect/update GitHub App permissions only when browser and `gh` are both unavailable.

## Output Format

Every independent, parent, and child issue needs the applicable template fields
below. Add type-specific details without replacing shared fields:

- `feature`: capability, entry point, permissions, relevant states.
- `bugfix`: steps to reproduce, expected, actual, regression check, affected scope.
- `update`: current behavior, change, reason, migration/rollback when relevant.
- `story`: ordered linked child checklist, coordination notes, larger acceptance target.

### Independent or child issue format

Use for `feature`, `bugfix`, or `update`.

Use this full format when enriching a leaf for implementation. Draft children
may contain just their outcome, scope boundary, parent, and blockers until planned.
Story summaries do not replace implementation-ready child bodies.

#### Issue Title

**Type**
feature / bugfix / update

**Labels**
Exactly one `type:*` and one or more applicable `area:*` labels.

Example: `type:feature`, `area:app`

**Parent**
For a child issue, the full URL of its parent issue. Omit this section for an
independent issue.

**Goal**
Short description of the outcome: what should exist or be true when this ticket is done.

**Description**
Short context explaining why this issue exists and how it fits the larger request.

**Scope**
- Work included in this ticket.

**Out of Scope**
- Work explicitly excluded from this ticket.

**Acceptance Checks**
- [ ] Concrete check proving the ticket is done correctly.

**Corner Cases**
- Unusual but important situations to consider.

**Execution and Dependencies**
- HITL or AFK; link the run's scope/authority and any human decision gate.
- Blocked by: issue references, or None.

**Plan and Verification**
- OpenSpec change reference, or a concise inline plan for a small change.
- Observable checks and relevant test boundaries; record evidence during delivery.
- Current checkpoint: owner, branch/base, tested revision, PR, blocker, next action.

**Type-Specific Details**
- `feature`: capability, entry point, permissions, relevant states.
- `bugfix`: steps to reproduce, expected, actual, regression check, affected scope.
- `update`: current behavior, change, reason, migration/rollback when relevant.

### Parent issue format

Use only for `story`.

#### Story Title

**Type**
story

**Labels**
Exactly one `type:story` and one or more `area:*` labels matching the child issue areas.

Example: `type:story`, `area:app`, `area:api`

**Goal**
Short description of the larger outcome.

**Description**
Short context explaining why this story exists and how the child issues deliver it.

**Scope**
- Work included in the story.

**Out of Scope**
- Work explicitly excluded from this story.

**Acceptance Checks**
- [ ] [Child issue title](https://github.com/owner/repository/issues/123)
- [ ] [Next child issue title](https://github.com/owner/repository/issues/124)
- [ ] Combined-outcome check that proves the story works after its children are complete, when needed.

List child issues in the order they should be implemented to satisfy dependencies
and avoid conflicting work. The checklist is the canonical child summary,
dependency order, and progress view for the parent.

**Corner Cases**
- Unusual but important situations to consider.

Avoid specific file paths or code snippets in ticket bodies because they go stale fast. Exception: if a prototype produced a snippet that encodes a decision more precisely than prose can, inline only the decision-rich part and note that it came from a prototype.

Use the configured tracker hierarchy for sub-issues when available; otherwise list child issues in the story body.

Update the selected parent when decomposition, linking, or progress tracking is
within the request/run authority; preserve its identity and unrelated discussion.
Close it only after all children land and combined acceptance passes, with closure
authority. Never close a parent merely because its child tickets were created.
