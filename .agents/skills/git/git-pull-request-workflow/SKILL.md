---
name: git-pull-request-workflow
description: Create pull requests for GitHub issue-based work.
---

# Git Pull Request Workflow

## Pull Request

Create a PR from the current issue or sub-issue branch.
Follow `docs/development-workflow.md` for delivery authority and completion.
Target the verified integration branch (`development` by default). Reuse an
existing PR for the branch. Stories get no PR; their children deliver the work.

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
- OpenSpec change/archive reference or inline issue plan.
- Acceptance evidence, relevant review findings, and unrun checks.

Only use a closing keyword when the PR fully completes the issue.
Do not use a closing keyword for the parent story. Verify issue closure after
merge, especially when the target is not the repository default branch.
Merge only with explicit authority and current required CI/review evidence;
otherwise leave In Review. Never treat PR creation as issue completion.
