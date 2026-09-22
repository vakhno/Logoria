---
name: git-commit-workflow
description: Create commits for GitHub issue-based work.
---

# Git Commit Workflow

## Commit

Follow `docs/development-workflow.md`. Prior authorization covering commits
satisfies approval; do not repeat it. Inspect staged changes and ensure required
checks/review are complete, then commit scoped staged work as:

`<branch> : <issue title>`

Example:

`feature/55 : Add room invite flow`

Fetch the title from GitHub issue `<issue-number>`. Use the exact issue title unless it is too long.

Only commit staged files. Do not stage unrelated files.
Existing staged files may belong to the user. Inspect the full staged diff and
exclude unrelated work without discarding it; if a safe separation is unclear,
stop before committing. Record any unrun checks rather than claiming success.
