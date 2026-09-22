# Development Workflow

This is the single process for features, bugfixes, updates, and stories. Skills
supply techniques within it; they do not create competing approval gates,
specifications, or task lists. OpenSpec ownership is in [openspec.md](openspec.md).
Commands and validation requirements are in [../CONTEXT.md](../CONTEXT.md).

## Execution contract

Before implementation, record the run's scope in the selected issue or story:
allowed issues, dependency order, execution mode, integration branch, permitted
delivery actions, and stop condition. Reuse explicit authorization already given
in the conversation; do not ask for it again. Backlog approval does not settle
every future product decision.

- **Interactive (HITL):** the human resolves material product decisions and
  approves implementation scope. Routine implementation, tests, and corrections
  within that scope proceed without separate approvals for each step.
- **Automatic (AFK):** the human authorizes a bounded issue or story outcome.
  The agent selects unblocked children, plans, reviews, implements, tests, and
  repairs within that boundary. Record whether issue publication/updates,
  commits, pushes, PR creation, merging, and issue closure are authorized.
  AFK describes interaction needs; it does not itself grant merge permission.

The integration branch is `development` under the current Git workflow. Verify
it exists; a different target requires an explicit run/project decision. No
implementation directly on `development`, `main`, or `master`.

Human decisions are required for unresolved product intent, expanded scope,
external contract changes outside the agreement, or actions beyond the run's
authority. Routine technical choices follow existing patterns. Security-sensitive
implementation may be automated within an agreed design with focused checks;
production migrations, destructive operations, deployment, and spending require
their own authorization unless explicitly covered already.

Example future run request:

> Develop story #N in automatic mode against development. Work through its
> approved children in dependency order. You may update those issues, create
> branches, commit, push, and open PRs. Stop each child at a reviewed, validated
> PR; merging remains human-owned. Continue with independent unblocked children.

For completion without that handoff, explicitly authorize merging eligible PRs
and closing verified issues in the run request. Required checks, reviews, and
branch protection still apply; never bypass them.

This document does not start a background runner or authorize the whole backlog.
A persistent runner needs a separately configured automation using the same
scope, limits, and resume rules.

## Project preparation

Prepare the repository and delivery environment once before product
initialization. It does not define product scope or start implementation.

1. Paste the canonical repository URL. Run:

   ```sh
   git remote get-url origin
   ```

   Confirm it points to that repository (ignore an optional `.git` suffix).
2. Open the repository URL in the browser. Confirm the signed-in account can
   view the correct repository and has required access.
3. Replace the placeholder repository URL in `AGENTS.md` with the verified
   canonical repository URL.
4. From the repository root, run:

   ```sh
   corepack enable
   docker --version
   docker compose version
   pnpm install
   pnpm run lint
   pnpm run typecheck
   pnpm run build
   ```

   Stop for failed commands. Preserve existing local changes.
5. Ensure `master` exists. If `development` is missing and remote changes are
   authorized, create it from `master`:

   ```sh
   git checkout master
   git pull --ff-only origin master
   git checkout -b development
   git push -u origin development
   ```

   If it already exists, run:

   ```sh
   git checkout development
   git pull --ff-only origin development
   ```

## Project initialization

1. Run `$init-project` with an optional short product idea.
2. Answer the product-foundation questions one at a time.
3. Review and confirm the proposed product foundation.
4. Update `PRODUCT.md` and only the relevant technical sections of
   `CONTEXT.md`.
5. Draft the basic backlog. Each candidate contains only a title and
   description.
6. Review and approve the backlog.
7. Publish only the approved candidates as basic GitHub issues.

Initialization does not create an OpenSpec change, implementation branch, or
code. Basic backlog issues are product-level placeholders, not
implementation-ready tickets.

## Select and shape work

Read the selected issue, comments, related issues, relevant code/docs, and existing
OpenSpec changes. Use `$git-issue-workflow` for tracker decomposition/enrichment.

If one independently verifiable change delivers the outcome, keep a leaf issue.
Otherwise convert the existing issue to a `story`, preserving its number and
discussion. Record parent acceptance, child boundaries, dependency order, and
human decision gates. In interactive mode approve the decomposition together.
In automatic mode the agent may decompose within the approved outcome and
publication authority.

Children are vertical slices, not frontend/backend task buckets. A leaf may
carry multiple area labels when one behavior spans those areas. Split by
independent outcomes, delivery size, or genuinely separate approval needs.
Design-source work may precede implementation when approval is a real dependency.
Do not split solely because two packages change.

Create/link children once in dependency order; reuse matching existing issues.
Draft children remain Backlog with a narrow outcome and blockers; enrich just
before implementation. The rough-backlog skill is for initial idea candidates,
not a second child-specification pass. Stories get no implementation branch,
duplicate task list, or automatic parent OpenSpec change.

## One leaf delivery loop

1. **Resume and claim.** Re-read live issue/PR state, dependencies, branch and
   working tree, and active change. Resume existing work before creating more.
   Use one owner per issue. Preserve unrelated local edits; isolate work if the
   checkout is occupied. Select by explicit priority, dependency order, then
   issue number. A dependency is satisfied when its outcome is verified and
   available on the integration branch, not just when its PR opens or issue closes.
2. **Clarify and classify.** Use `$grill-with-docs` for unresolved product/domain
   decisions and `$openspec-explore` for technical uncertainty; avoid duplicate
   interviews. For bugs, use `$diagnose` to reproduce, minimize, and establish
   the cause. Stop questioning when scope, acceptance, and important risks are clear.
3. **Plan.** Use OpenSpec for new workflows, cross-cutting or uncertain changes,
   and changed access rules or persisted data. Small understood changes may
   record the plan/checks in the issue: the same loop with fewer artifacts.
   Create/resume the issue branch before writing change artifacts. Use
   `$openspec-propose`, then `$openspec-update-change` for revisions. Link the issue.
4. **Review readiness.** Check requirements against existing contracts, task
   coverage, dependencies, verification feasibility, and risks. Resolve unsupported
   assumptions. Interactive mode obtains scope approval; automatic mode records
   agent review against the approved outcome. Enrich the existing issue with
   acceptance summary, plan reference, execution mode, blockers, and test approach.
   Do not add a second specification or duplicate task list.
5. **Implement and test.** Mark In Progress; use `$openspec-apply-change` when
   a change exists. Use `$tdd` inside implementation for non-trivial behavior:
   one failing behavioral test, minimal implementation, then the next behavior.
   Reuse interfaces/test boundaries agreed during planning without re-approval.
   For bugs, demonstrate the regression check fails before the fix when practical.
   Do not force test-first work for copy/docs.
6. **Verify and review.** Run required lint/typecheck and focused tests from
   `CONTEXT.md`; check relevant UI, keyboard/focus, and narrow viewport behavior.
   Run relevant integration/e2e checks. Review the final diff against acceptance
   AND repository/security conventions in a separate pass; another agent is not
   required. Fix findings and rerun affected checks. Changed scope returns to
   planning; routine corrections stay in this loop.
7. **Reconcile documentation.** Update affected durable docs and changed plans.
   Sync OpenSpec deltas into current specs; validate change and specs before
   archiving completed work. Commit specs, archive, docs, code, and tests on the
   same branch. Archive means locally completed history, not proof of merge.
8. **Deliver.** Inspect/stage only scoped files, commit, push, and open/update the
   issue PR under the run's delivery authority. Include acceptance evidence,
   commands/results, unrun checks, and issue/change references. Move to In Review.
   Re-read CI/review results for the current revision and resolve failures.
   Merge only with authority, required checks/reviews satisfied, no unresolved
   blocking findings, and a compatible base. After base updates or conflict
   resolution rerun affected checks. Missing required evidence blocks automatic merge.
9. **Close and continue.** Verify actual merge into the intended branch and the
   accepted outcome. Close the leaf and mark Done if authorized. Closing keywords
   may not close issues for a non-default integration branch: verify explicitly.
   Select the next eligible child within the authorized set.

## Readiness, status, and completion

Use existing project Status options; do not invent labels/field values to run
this process. Record extra details in the issue body.

| Status | Evidence required |
| --- | --- |
| Backlog | Approved candidate or a child still being clarified/planned |
| Ready | Authorized scope, explicit acceptance/plan, satisfied blockers, feasible verification, no pending required human decision |
| In Progress | An owner implementing the ready scope |
| In Review | PR exists with verification and review evidence |
| Done | Merged into integration branch and acceptance verified |
| Released | Actual release/deployment verified separately |

Readiness is a predicate, not just a label. Basic tickets, generated task lists,
and creating issues do not establish readiness. Record blockers with the current
status; do not mark Done when required checks are missing.

A story completes only when children have landed AND combined acceptance passes
on integrated code. Verify the whole outcome; child tests alone are insufficient.
Record evidence, resolve integration defects through the same leaf loop, then
close the parent if authorized. Human acceptance is needed only for checks
assigned to a human or unresolved decisions.

## Resume, retries, and stopping

Keep one current checkpoint in the issue body (or PR during review): issue/parent,
owner, branch/base, change path or inline plan, approval scope, completed acceptance
checks, latest tested revision/results, PR link, blocker, next action. Verify it
against live Git/CI/tracker state when resuming. If remote updates are unavailable,
report the checkpoint to the user; do not claim it was saved remotely.

Before retrying an uncertain publish, push, PR, merge, or close, read back its
result. Reuse matching artifacts rather than blindly recreate them.

Continue while a useful next action is in scope. After two unsuccessful repair
attempts for the same failure, diagnose with new evidence before further edits.
If no new testable hypothesis results, checkpoint the blocker instead of repeating.
Stop for exhausted run limits, missing required services/credentials, unresolved
decisions/authority, or no eligible work. Independent children may continue while
another awaits review. Use an available monitoring mechanism for pending CI/review;
do not claim a background loop exists unless configured.

## Skill integration

- `git-issue-workflow` owns tracker schema/hierarchy; `to-tickets` is its
  plan-to-ticket entry point. OpenSpec owns substantial-change specifications;
  the selected issue remains the delivery record.
- Matt skills use `PRODUCT.md` terminology here; `CONTEXT.md` remains technical.
  Repository configuration is here and in `AGENTS.md`; setup skills must preserve
  it rather than generate a competing workflow or label scheme.
- Existing authorization satisfies skill approval steps for that same scope.
  Explicit exploration-only requests remain exploration-only. Generated OpenSpec
  skills supply CLI mechanics; project policy lives here and in
  `openspec/config.yaml` so regeneration does not erase it.
