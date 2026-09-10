---
name: git-issue-workflow
description: Break a plan or spec into independently-grabbable tickets on the project issue tracker using tracer-bullet vertical slices. Use when user wants to convert a plan into tickets, create implementation tickets, or break down work.
---

# Git Issue Workflow

Break a plan into independently-grabbable tickets using vertical slices (tracer bullets).

## Issue Model

An issue is one tracker ticket with one clear outcome.

### Leaf Issue

- use type `feature`, `bugfix`, or `update`
- contain no sub-issues
- have exactly one `area:*` label
- should be independently buildable and verifiable

### Issue with Sub-Issues

- use type `story`
- group multiple child issues needed to deliver one larger user outcome
- may have multiple `area:*` labels
- must use area labels that match the union of child issue areas
- should describe coordination, dependency order, and the larger acceptance target

If a leaf issue appears to need multiple areas, split it into a `story` with one-area child issues.

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

- `feature`, `bugfix`, and `update` must have exactly one `area:*` label.
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

Slices may be `HITL` or `AFK`. HITL slices require human interaction, such as an architectural decision or a design review. AFK slices can be implemented and merged without human interaction. Prefer AFK over HITL where possible.

<vertical-slice-rules>
- Each slice delivers a narrow but complete path through every layer needed for that slice
- A completed slice is demoable or verifiable on its own
- Prefer many thin slices over few thick ones
- Avoid vague/layer-only tickets like "build frontend", "create database", "add backend", or "make page better"
</vertical-slice-rules>

### 4. Quiz the user

Present the proposed breakdown as a numbered list. For each slice, show:

- **Title**: short descriptive name
- **Execution**: HITL / AFK
- **User stories covered**: which user stories this addresses (if the source material has them)

Ask the user:

- Does the granularity feel right? (too coarse / too fine)
- Are the dependency relationships correct?
- Should any slices be merged or split further?
- Are the correct slices marked as HITL and AFK?

Iterate until the user approves the breakdown.

### 5. Publish the tickets to the issue tracker

For each approved slice, publish a new ticket to the issue tracker. Use the issue body template below. These tickets are considered ready for AFK agents, so publish them with the correct triage label unless instructed otherwise.

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
7. If the user asked for Ready tickets, open the project `Status` field showing `Backlog`, choose the `Ready` option, and verify the page contains `Status` followed by `Ready`.
8. Verify the created issue by reading it back with the GitHub connector or the browser page.

Use the GitHub connector for reads and for writes only when it is already known to have write access. Use `gh issue create` only when browser control is unavailable and `gh` is installed/authenticated. Ask the user to reconnect/update GitHub App permissions only when browser and `gh` are both unavailable.

## Output Format

Every issue and sub-issue needs the shared template fields below. Add type-specific details without replacing shared fields:

- `feature`: capability, entry point, permissions, relevant states.
- `bugfix`: steps to reproduce, expected, actual, regression check, affected scope.
- `update`: current behavior, change, reason, migration/rollback when relevant.
- `story`: child list, dependency order, coordination notes, larger acceptance target.

### Issue format

Use for `feature`, `bugfix`, or `update`.

Use this full format for every leaf issue and child/sub-issue. Story summaries do not replace full child issue bodies.

#### Issue Title

**Type**
feature / bugfix / update

**Labels**
Exactly one `type:*` and exactly one `area:*`.

Example: `type:feature`, `area:app`

**Parent**
A reference to the parent issue on the issue tracker if the source was an existing issue; otherwise omit this section.

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

**Type-Specific Details**
- `feature`: capability, entry point, permissions, relevant states.
- `bugfix`: steps to reproduce, expected, actual, regression check, affected scope.
- `update`: current behavior, change, reason, migration/rollback when relevant.

### Issue with sub-issues format

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
- [ ] Larger outcome check that proves the story is complete after child issues are done.

**Corner Cases**
- Unusual but important situations to consider.

**Sub-Issues**
- Summary list of child issues by type, title, and one-line outcome.
- Each child issue must also be created or output separately with the full leaf issue format above.

**Dependency Order**
1. Child ticket or dependency.

Avoid specific file paths or code snippets in ticket bodies because they go stale fast. Exception: if a prototype produced a snippet that encodes a decision more precisely than prose can, inline only the decision-rich part and note that it came from a prototype.

Use the configured tracker hierarchy for sub-issues when available; otherwise list child issues in the story body.

Do NOT close or modify any parent issue.
