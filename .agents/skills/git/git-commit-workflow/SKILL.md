---
name: git-commit-workflow
description: Create commits for GitHub issue-based work.
---

# Git Commit Workflow

## Commit

After human approval, commit staged work as:

`<branch> : <issue title>`

Example:

`feature/55 : Add room invite flow`

Fetch the title from GitHub issue `<issue-number>`. Use the exact issue title unless it is too long.

Only commit staged files. Do not stage unrelated files.
