# Product

<!-- impeccable:product-schema 1 -->

This is a reusable documentation template. Each section explains what to record and provides a completed example for a fictional team planning application. All users, workflows, research, metrics, and commitments below are illustrative; they are not facts or requirements for the current project.

When adapting this template, replace examples with confirmed product facts and remove sections that do not apply. Label assumptions and planned capabilities explicitly; record unknowns under Open decisions rather than filling them with invented facts.

Keep durable product context here: who the product serves, what it makes possible, and which rules future work must preserve. Visual and interaction decisions belong in `DESIGN.md`; architecture and commands belong in `CONTEXT.md`. Feature specifications and implementation task lists belong in the project issue tracker or their dedicated documents.

## Platform

**Section description:** Identify the supported platforms, delivery channels, and platform scope.

**Project-agnostic example:**

The product is a responsive web application used on desktop and mobile browsers. A public website explains the service, and signed-in users access private team workspaces. Desktop supports detailed planning and review; mobile supports checking status and making quick updates. Native mobile applications and offline editing are outside the first release.

## Users

**Section description:** Describe the primary audience, their goals, current difficulties, and meaningful differences between user groups.

**Project-agnostic example:**

The primary audience is small teams of 3–20 people coordinating shared projects. Team leads need a reliable overview of priorities and blockers. Contributors need to know what they own and update progress quickly. Occasional collaborators need limited access to a specific project without seeing unrelated team information.

Today these users combine spreadsheets, chat messages, and meetings. Their main difficulty is finding the latest status and identifying who should act next.

## Product purpose

**Section description:** Explain the problem the product solves and the outcome it should create for users.

**Project-agnostic example:**

The product gives teams a shared view of planned work, ownership, and progress. It reduces time spent collecting status updates and helps teams notice blocked work before deadlines are missed. The desired outcome is a team that can coordinate its next steps without rebuilding context in every conversation.

## Positioning

**Section description:** State the product category, relevant alternatives, and the specific reason users would choose it.

**Project-agnostic example:**

The product is a lightweight coordination tool for teams that have outgrown personal task lists but do not need an enterprise planning suite. Its alternatives are shared spreadsheets, chat-based coordination, and more complex project management tools. It stands out through quick setup, clear ownership, and a useful overview that requires little ongoing administration.

## Operating context

**Section description:** Describe when and where the product is used, including frequency, devices, interruptions, and collaboration patterns.

**Project-agnostic example:**

Users review project status during weekly planning meetings and update individual work throughout the day. A contributor may use a phone between meetings, while a lead reviews several projects on a desktop. Sessions are often short and interrupted, so filters, unsaved edits, and the user's place in a project should remain understandable when they return.

## Core workflows

**Section description:** Describe the main journeys from their trigger to their successful outcome, including relevant failure or recovery paths. Distinguish existing behavior from planned behavior.

**Project-agnostic example:**

1. **Start a team workspace:** A lead signs in, names a workspace, creates its first project, and invites teammates. The journey succeeds when the team can access a shared project. Invalid invitations show an actionable error.
2. **Coordinate work:** A member creates a work item, assigns an owner, and sets a status and optional due date. The assigned person updates progress and records blockers. The journey succeeds when the next action and its owner are visible.
3. **Review progress:** A lead filters open work by owner or status, reviews blockers, and follows up through a comment. The journey succeeds when the team agrees on the next steps.
4. **Recover archived work:** A member searches archived projects and restores one they are allowed to edit. The journey succeeds when its history and work items are available again.

## Capabilities and scope

**Section description:** Define included capabilities, the initial release boundary, and explicit exclusions.

**Project-agnostic example:**

The first release includes workspaces, invitations, projects, work items, ownership, status changes, comments, activity history, search, filtering, and archiving.

Billing, external integrations, custom automation, time tracking, and offline editing are excluded. A team should be able to complete its planning and status review workflow without those features.

## Constraints and business rules

**Section description:** Record durable rules that limit behavior or determine valid product outcomes.

**Project-agnostic example:**

Every project belongs to one workspace. A work item belongs to one project and may have one responsible owner. Members can edit content only in workspaces they belong to. Archiving preserves project history and allows restoration. A workspace must retain at least one owner; its last owner cannot leave without transferring ownership.

## Terminology

**Section description:** Define terms where ambiguity would change product behavior or naming. Keep one canonical glossary and reference it from other documents.

**Project-agnostic example:**

| Term      | Meaning                                                                       |
| --------- | ----------------------------------------------------------------------------- |
| Workspace | A team area containing members, projects, and settings.                       |
| Project   | A collection of work items organized around a shared goal.                    |
| Work item | A piece of work with a status, optional owner, and optional due date.         |
| Blocked   | A status indicating that work cannot continue until a dependency is resolved. |
| Archive   | Remove a project from active views while preserving its content and history.  |

Use “work item” consistently rather than alternating between “task,” “ticket,” and “issue.” Other documents reference these definitions instead of maintaining separate versions.

## Access and roles

**Section description:** Explain what each user type can see or do and any important restrictions.

**Project-agnostic example:**

| Role    | Allowed actions                                                  | Restrictions                                    |
| ------- | ---------------------------------------------------------------- | ----------------------------------------------- |
| Owner   | Manage workspace settings, membership, projects, and work items. | Cannot remove the last remaining owner.         |
| Member  | Create projects and edit workspace work items.                   | Cannot change ownership or membership settings. |
| Guest   | View explicitly shared projects and add comments.                | Cannot browse other projects or manage members. |
| Visitor | View the public website and start sign-in.                       | Cannot access private workspace content.        |

Guests receive access only after accepting an invitation to a specific project. Sharing a project does not expose other workspace content.

## Brand commitments

**Section description:** Describe the promises users should be able to rely on across the experience.

**Project-agnostic example:**

The product promises clear ownership, understandable history, and useful defaults. Users should know whether a change was saved and who can see it. The product should explain limitations plainly, preserve work during recoverable failures, and avoid forcing unnecessary configuration before users can begin.

## Evidence on hand

**Section description:** List available research or proof, its source, and its limitations. Distinguish observations from assumptions.

**Project-agnostic example:**

In this fictional example, six interviews with small teams found that unclear ownership and scattered status updates were common complaints. Four prototype participants completed project setup without guidance; two struggled to distinguish workspace settings from project settings.

The team has interview notes and prototype recordings but no production retention data. The assumption that clearer ownership reduces coordination meetings remains unvalidated.

## Product principles

**Section description:** State rules that help prioritize work and resolve tradeoffs.

**Project-agnostic example:**

- Make the next action and its owner visible.
- Optimize common updates for short, interrupted sessions.
- Prefer useful defaults over mandatory setup.
- Preserve history and provide recovery for reversible actions.
- Send notifications when the user can take meaningful action.

## Success signals

**Section description:** Define measurable outcomes, how they will be observed, and whether values are targets or validated results.

**Project-agnostic example:**

The initial targets are:

- At least 80% of new team leads create a project and invite a teammate within their first session.
- The median time to the first project is below five minutes.
- At least 70% of active teams return in the fourth week after signup.
- In usability testing, at least 90% of participants identify a blocked item's owner within 30 seconds.

These are proposed targets, not measured results. Activation and retention use product analytics; task completion is evaluated through usability sessions.

## Accessibility and inclusion

**Section description:** Document accessibility goals and audience needs that affect product decisions.

**Project-agnostic example:**

The product targets WCAG 2.2 AA. Teams may include users with limited vision, motor impairments, or slow connections, so core workflows must remain usable for those audiences. Users may work in different languages and time zones. `DESIGN.md` records the interface patterns that support these needs; implementation and verification details live with the relevant code and tests.

## Open decisions

**Section description:** List unresolved questions, their practical impact, and what is needed before making a decision.

**Project-agnostic example:**

- **Guest activity access:** Should guests see project activity history? Decide whether the history can reveal previously private information.
- **Notification defaults:** Which updates require email? Validate frequency with pilot teams before enabling broad notifications.
- **Deletion policy:** Is archiving sufficient for the first release? Confirm retention and recovery expectations before adding permanent deletion.
