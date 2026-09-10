---
name: git-kanban-workflow
description: Create and manage a GitHub Projects kanban board for issue-based work. Use when Codex needs to create a GitHub project board, configure Backlog/In Progress/In Review/Done statuses, or move issue items through the project workflow.
---

# Git Kanban Workflow

Create a GitHub Projects board for issue-based work.

## Board

Use GitHub Projects, not classic project boards.

Create or configure:

- View: `Board`
- Field: `Status`
- Status options:
  - `Backlog`
  - `Ready`
  - `In Progress`
  - `In Review`
  - `Done`
  - `Released`

When importing items from a repository, import only open issues.

Do not import:

- Closed issues.
- Pull requests.

## Labels

Configure the repository with the tracker labels from `git-issue-workflow`.

Type labels:

- `type:feature`
- `type:bugfix`
- `type:update`
- `type:story`

Area labels:

- `area:app`
- `area:api`
- `area:tool`

## Items

Use GitHub Issues as project items.

- Leaf issues and sub-issues are implementation items.
- Parent `story` issues are tracking items only.
- Pull requests are linked to issues, not used as primary kanban items.

## Status Flow

Move issue items through the board:

1. New approved issue: `Backlog`
2. Issue is clarified, unblocked, and ready to implement: `Ready`
3. Developer starts the issue branch: `In Progress`
4. Pull request opens for the issue: `In Review`
5. Pull request merges into `development` and the issue closes: `Done`
6. Released or deployed to production: `Released`

## Parent Issues

Parent `story` issues do not get branches or pull requests.

Keep the parent issue open until all child issues are `Done`.

Use a checklist in the parent issue:

- `[ ] #55 Child issue title`
- `[ ] #56 Child issue title`

Move the parent issue to `Done` only after all child issues are closed.

## Pull Requests

Each implementation issue gets one PR to `development`.

Do not create parent branches for story issues.
Do not merge child branches into parent branches.
