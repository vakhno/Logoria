---
name: git-branch-workflow
description: Create issue branches for GitHub issue-based work.
---

# Git Branch Workflow

## Branch

Follow `docs/development-workflow.md`. Existing scope approval or an authorized
automatic run satisfies approval; do not request a separate branch approval.
Inspect the working tree and existing branches first. Resume the matching branch
or use an isolated checkout when needed; never carry unrelated edits into it.
Create the branch from the verified integration branch (`development` by default)
before writing OpenSpec artifacts:

`<type>/<issue-number>`

Allowed types:

- `feature`
- `bugfix`
- `update`

Examples:

- `feature/55`
- `bugfix/88`
- `update/2`

Stories coordinate children and get no branch. Do not implement directly on
`development`, `main`, or `master`. Use the explicit `<type>/<issue-number>`
convention above for this repository.
