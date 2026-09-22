---
name: to-tickets
description: Turn a plan into tracker issues using this repository's canonical Git issue workflow.
---

# To Tickets

Break a plan into independently-grabbable, end-to-end vertical slices. Follow
`docs/development-workflow.md`, then read and apply the complete repository
tracker schema in [git-issue-workflow](../git/git-issue-workflow/SKILL.md).
That linked skill is the canonical source for GitHub issue bodies, type and area
labels, story hierarchy, child linking, browser publishing, status transitions,
checkpoints, and closure. This entry point must preserve its full structure.

## Ticket rules

- A leaf issue has one independently verifiable outcome and type `feature`,
  `bugfix`, or `update`.
- A `story` coordinates children for a larger outcome and has no branch or PR.
- Split by independently deliverable outcomes, not by frontend/backend layers.
  A leaf may carry every applicable `area:*` label.
- Keep detailed requirements and task checklists in OpenSpec when a change exists;
  the issue records scope, acceptance summary, dependencies, plan reference,
  authority, verification evidence, and current checkpoint.
- Draft children stay Backlog. Set Ready only when the repository readiness
  criteria pass. AFK means the bounded run can implement the issue; it does not
  authorize merge.

## Required issue structure

For each implementation-ready leaf, use the full structure from
`git-issue-workflow`:

```markdown
**Type**
feature / bugfix / update

**Labels**
One `type:*` and all applicable `area:*` labels.

**Parent**
For a child issue, the full URL of its parent. Omit for an independent issue.

**Goal**
Observable completed outcome.

**Description**
Why this slice exists and how it fits the outcome.

**Scope**
- Included work.

**Out of Scope**
- Explicit exclusions.

**Acceptance Checks**
- [ ] Concrete, observable proof of completion.

**Corner Cases**
- Important unusual conditions.

**Execution and Dependencies**
- HITL/AFK, run authority, decision gates, and blockers.

**Plan and Verification**
- OpenSpec change reference or concise inline plan.
- Test boundaries/checks and delivery evidence.
- Owner, branch/base, tested revision, PR, blocker, and next action.
```

A story records its larger goal and an ordered, linked child checklist in
`Acceptance Checks`; include a combined-outcome check when needed. Use the
canonical publishing procedure and exact type-specific details from
`git-issue-workflow`; do not invent a second format here.

In interactive mode, obtain approval of material decomposition decisions. In an
authorized automatic run, proceed within the agreed parent outcome and ask only
for a missing material decision or authority. Reuse matching issues and update
the selected parent in place. Do not close it until all child outcomes are merged
and its combined acceptance checks pass on integrated code.
