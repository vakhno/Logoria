# OpenSpec Workflow

Follow [development-workflow.md](development-workflow.md) for the single delivery
loop and execution authority. OpenSpec manages durable current behavioral specs
in `openspec/specs/` and proposed changes in `openspec/changes/`. Only completed
change artifacts become historical; current specs remain maintained documents.

## When to use it

Use OpenSpec for changes that alter several packages, introduce a new workflow,
change access rules or persisted data, or need a decision record before coding.
For focused fixes and small, well-understood changes, work directly under the
rules in `AGENTS.md`.

## Workflow

In Codex, start with:

```text
$openspec-propose "Describe the change"
```

Use the generated OpenSpec skills to refine, apply, validate, and archive that
change. Run `openspec status` or `openspec validate` in the terminal when a
workflow step requires it.

## Durable documentation

Keep one canonical home per kind of information; link instead of duplicating
normative rules. On a feature branch, current specs describe that branch's
completed behavior. They describe integrated behavior after merge, and deployed
behavior only after release.

| Lasting outcome | Source of truth |
| --- | --- |
| Architecture, commands, constraints | `CONTEXT.md` |
| Route inventory and route implementation/access guidance | `docs/routes.md` |
| Authentication mechanisms, configuration and operational guidance | `docs/authentication.md` |
| Package ownership and exports | Package `README.md` |
| Product purpose, actors, terminology, scope, high-level principles | `PRODUCT.md` |
| Detailed current behavioral requirements and scenarios | `openspec/specs/<capability>/spec.md` |
| Proposed behavior deltas, design, implementation checklist | `openspec/changes/<change>/` |
| Issue scope summary, hierarchy, blockers, authority and status | GitHub issue |
| Rationale for lasting architectural tradeoffs | `docs/adr/`, when justified |
| Design and accessibility rules | `DESIGN.md` |

Archived OpenSpec artifacts provide decision history only.

Read existing guides before adding specs. As a capability becomes covered, move
its detailed normative behavior from guides into its current spec and link back
to that spec; retain useful route inventories, implementation explanations and
operational guidance in the guides. Until covered, existing documented contracts
remain the reference. Do not bulk-invent specs or treat template examples as facts.

## Completion contract

1. Create/resume the issue branch before writing change artifacts. Link the issue
   and reuse its existing change. Do not create a parent change solely for a story.
2. Review and apply under the execution contract. Use TDD inside implementation
   where appropriate; a checked task is not verification evidence.
3. Reconcile implementation-driven decisions into the change and update guides
   for their own responsibilities. Even a small fix without a new change must
   update an existing spec if it changes that spec's behavior.
4. Use `$openspec-sync-specs` before archive. Verify added, changed, removed, and
   renamed requirements while preserving unrelated requirements. Synchronization
   is required here even when the tool offers to skip it.
5. Validate the change and resulting current specs using the installed CLI's
   supported flags. Do not force archival of incomplete or invalid work.
6. Archive the completed change with `$openspec-archive-change`; include current
   specs, archive, affected docs, code, and tests in the same issue PR.
7. Verify actual merge separately. A branch-local archive is not a Done issue.

Never overwrite a conflicting archive. For corrections while its PR is open,
update that branch's matching archive/current specs as needed; materially new
outcomes need a new issue/change. Abandoned PR artifacts must not land as completed
work. Spec Kit is not a second planning system in this repository.
