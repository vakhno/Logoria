# Pre-Development Setup

Complete these steps before project development starts.

## Prerequisites

Install:

- Git
- Node.js
- npm

Verify:

```bash
git --version
node --version
npm --version
```

## 1. Create Repository

If starting from a template:

1. Open the template repository on GitHub.
2. Click **Use this template**.
3. Select **Create a new repository**.
4. Choose repository name and visibility.
5. Click **Create repository**.

If working on an existing repository, skip this step.

## 2. Clone Repository

```bash
git clone <repository-url>
cd <repository-name>
```

## 3. Choose Development Branch

If the project already has a development branch:

```bash
git switch development
```

If the template/new repository only has the default branch, create and push the development branch first:

```bash
git switch -c development
git push -u origin development
```

After that, create feature branches from `development`:

```bash
git switch -c feature/<short-name>
```

## 4. Verify GitHub Access

Ensure you can:

- push branches
- create Pull Requests
- create/manage GitHub Issues
- access GitHub Project board, if used

## 5. Configure GitHub Kanban Project

If using GitHub Kanban Project for planning, create or join the project board.

Recommended columns:

- Backlog
- In Progress
- Review
- Done in Development
- Done in Production

Column meaning:

- **Backlog**: issue exists and should be done later.
- **In Progress**: issue is being worked on now.
- **Review**: implementation is ready for testing/review.
- **Done in Development**: merged into `development` and verified there.
- **Done in Production**: included in a production release on `master`.

Recommended labels:

- `type:feature`
- `type:bugfix`
- `type:update`
- `area:app`
- `area:api`
- `area:design`
- `area:tool`

Label meaning:

- `type:feature`: completely new behavior, page, flow, integration, tool, or logic.
- `type:bugfix`: fix existing behavior that works incorrectly or unexpectedly.
- `type:update`: improve or change existing behavior, UI, performance, order, color, location, dependency, package, or tool choice.
- `area:app`: frontend work: pages, UI, components, forms, client state, accessibility, responsive behavior.
- `area:api`: backend work: API, auth server logic, database access, Socket.IO server logic, background jobs.
- `area:design`: design source work: Figma, Pencil, layout mockups, visual structure, design tokens, user-flow layout changes.
- `area:tool`: project tooling/infrastructure work: `.github`, `.agents`, CI, linting, formatting, build tools, repo config, package/tool migration.
