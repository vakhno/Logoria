---
name: git-pull-request-workflow
description: Create pull requests for GitHub issue-based work.
---

# Git Pull Request Workflow

## Pull Request

Create a PR from the current issue or sub-issue branch.

Use this PR title:

`<branch> : <issue title>`

Example:

`feature/55 : Add room UI form`

Fetch the title, description, parent issue, and relevant notes from GitHub issue `<issue-number>`.

Include in the PR body:

- Issue link, or both parent issue and sub-issue links.
- Summary of the change.
- Important issue details reviewers need.
- Verification run.

Only use a closing keyword when the PR fully completes the issue.
