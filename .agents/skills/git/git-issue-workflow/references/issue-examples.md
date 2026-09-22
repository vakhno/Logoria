# Issue Workflow Examples

These are illustrative issue bodies and URLs. They do not define product
requirements. Replace the examples' titles, labels, links, checks, and plans
with the selected outcome's actual information.

## Choose the hierarchy first

| If the selected outcome... | Create | Why |
| --- | --- | --- |
| Has one complete, independently verifiable outcome | Independent issue | One issue, branch, and PR can deliver it. |
| Needs several independently deliverable outcomes | Parent issue with child issues | The parent exposes order and combined acceptance; each child remains a delivery unit. |
| Touches frontend and backend but still produces one outcome | Independent issue or child issue with both `area:app` and `area:api` | Package boundaries are not a reason to create a story. |

## Independent Issue example

This example has API and UI work but remains one independent issue because one
PR can deliver and verify the complete pagination behavior.

```markdown
# Add pagination to the public debate catalogue

**Type**
feature

**Labels**
`type:feature`, `area:app`, `area:api`

**Goal**
Visitors can move through public debate catalogue pages and understand which
results they are viewing.

**Description**
The catalogue already lists public debate rooms, but the list must remain
usable when it exceeds one page.

**Scope**
- Paginated public catalogue API response.
- Catalogue controls and result state in the frontend.

**Out of Scope**
- Search, filters, and changes to debate visibility.

**Acceptance Checks**
- [ ] A visitor can request a valid page and see its debate rooms.
- [ ] Invalid page parameters use the documented validation behavior.
- [ ] The UI exposes the available next/previous page actions correctly.

**Corner Cases**
- The final page contains fewer results than the page size.
- A requested page has no results.

**Execution and Dependencies**
- AFK under the approved issue delivery scope; merging remains human-owned.
- Blocked by: None.

**Plan and Verification**
- OpenSpec: `openspec/changes/paginated-debate-catalogue`.
- Verify API pagination and the catalogue UI, then run relevant lint, typecheck,
  and focused tests.
- Current checkpoint: owner unassigned; no branch, PR, or blocker yet.
```

There is no `Parent` field because this is independent. Do not split it into
frontend and backend children: those would be layers, not separate outcomes.

## Parent Issue with Child Issue (sub-issue) example

### Parent Issue

This parent coordinates a larger export capability. It has no branch, PR, or
OpenSpec change of its own. Its ordered `Acceptance Checks` list is both the
child progress view and the required implementation order.

```markdown
# Export a debate room transcript

**Type**
story

**Labels**
`type:story`, `area:app`, `area:api`

**Goal**
An authorized participant can download a complete transcript of a debate room.

**Description**
The capability needs a settled export shape, a protected server endpoint, and
a user-facing download flow. Each can be delivered and verified separately.

**Scope**
- Define the exported transcript format.
- Produce the protected export response.
- Make the export available from the debate-room screen.

**Out of Scope**
- Background exports, email delivery, and export history.

**Acceptance Checks**
- [ ] [Decide the transcript export format](https://github.com/owner/repository/issues/101)
- [ ] [Provide an authorized transcript export endpoint](https://github.com/owner/repository/issues/102)
- [ ] [Add transcript download to the debate-room screen](https://github.com/owner/repository/issues/103)
- [ ] On integrated code, an authorized participant can download the agreed
  transcript and an unauthorized visitor cannot.

**Corner Cases**
- A room has no messages.
- A room is unavailable while a user follows an old link.
```

The order prevents rework: the format decision constrains the endpoint; the
endpoint constrains the UI. The first three checks are child links—not duplicate
specifications. The final check verifies the combined product outcome after the
children have merged.

### Child Issue (sub-issue)

Child `#102` from the parent above is a normal implementation issue with one
additional field: `Parent` contains only the parent's full URL.

```markdown
# Provide an authorized transcript export endpoint

**Type**
feature

**Labels**
`type:feature`, `area:api`

**Parent**
https://github.com/owner/repository/issues/100

**Goal**
An authorized debate-room participant can retrieve the agreed transcript export.

**Description**
This delivers the server side of the export story after the export-format child
has established the data shape.

**Scope**
- Protected export route.
- Trusted-session authorization and response validation.
- Focused endpoint tests.

**Out of Scope**
- Browser download controls.
- Changing the agreed export format.

**Acceptance Checks**
- [ ] An authorized participant receives the agreed export response.
- [ ] An unauthenticated or unauthorized request is rejected.
- [ ] Focused API tests cover authorization and an empty transcript.

**Corner Cases**
- A room has no messages.
- The room no longer exists.

**Execution and Dependencies**
- AFK under the approved story delivery scope; merging remains human-owned.
- Blocked by: [#101](https://github.com/owner/repository/issues/101).

**Plan and Verification**
- OpenSpec: `openspec/changes/debate-transcript-export-api`.
- Verify the protected route with focused integration coverage, then run the
  required checks from `CONTEXT.md`.
- Current checkpoint: owner unassigned; no branch, PR, or blocker resolution yet.
```

The other children have their own issue bodies, branches, OpenSpec changes when
warranted, PRs, and verification evidence. The parent has none of those.

## How the workflow runs

1. Read the selected outcome, related issues, current code, and any existing
   OpenSpec changes.
2. Keep it independent if one deliverable outcome is enough. Otherwise preserve
   the selected issue as the parent and create only missing child issues.
3. Write the parent's child links in `Acceptance Checks` in implementation order.
   Add a final combined-outcome check when integration needs separate proof.
4. Create children in that order. Leave new children in `Backlog`; enrich the
   next eligible child before implementation.
5. Deliver one child at a time: branch, OpenSpec where warranted, implementation,
   tests, PR, merge verification, then child closure when authorized.
6. Mark the matching parent checkbox only after its child has landed on the
   integration branch—not just after a PR opens.
7. After all child links are complete, run the parent's combined acceptance check
   on integrated code. Close the parent only when that check passes and closure
   authority exists.

## What belongs where

| Information | Canonical home |
| --- | --- |
| Parent/child relationship and required order | Parent `Acceptance Checks` |
| Child's parent link | Child `Parent` field, full URL only |
| Detailed requirements and implementation tasks | Child OpenSpec change, when one is warranted |
| Issue scope, authority, blockers, checkpoint, and delivery evidence | The relevant issue |
| Branch, PR, and merge evidence | The relevant independent or child issue; never the parent |
