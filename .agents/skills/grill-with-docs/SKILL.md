---
name: grill-with-docs
description: Challenge a plan against the project's domain model, sharpen terminology in PRODUCT.md, and record justified ADRs. Use when stress-testing a plan against documented language and decisions.
---

<what-to-do>

Interview me relentlessly about every aspect of this plan until we reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one-by-one. For each question, provide your recommended answer.

Ask the questions one at a time, waiting for feedback on each question before continuing.

If a question can be answered by exploring the codebase, explore the codebase instead.

</what-to-do>

<supporting-info>

## Domain awareness

In this repository, `PRODUCT.md` (Terminology) is the domain glossary.
`CONTEXT.md` is technical context, not a glossary. Follow
`docs/development-workflow.md` for scope/approval and `docs/openspec.md` for
document ownership. The generic context layouts below do not override that map.
Read template warnings: illustrative product examples are not confirmed facts.

During codebase exploration, also look for existing documentation:

### File structure

Most repos have a single context:

```
/
├── CONTEXT.md
├── docs/
│   └── adr/
│       ├── 0001-event-sourced-orders.md
│       └── 0002-postgres-for-write-model.md
└── src/
```

If a `CONTEXT-MAP.md` exists at the root, the repo has multiple contexts. The map points to where each one lives:

```
/
├── CONTEXT-MAP.md
├── docs/
│   └── adr/                          ← system-wide decisions
├── src/
│   ├── ordering/
│   │   ├── CONTEXT.md
│   │   └── docs/adr/                 ← context-specific decisions
│   └── billing/
│       ├── CONTEXT.md
│       └── docs/adr/
```

Create files lazily. Record resolved terms in `PRODUCT.md` Terminology; preserve
the rest of the product document. Create `docs/adr/` only for a justified ADR.

## During the session

### Challenge against the glossary

When a term conflicts with confirmed terminology in `PRODUCT.md`, resolve the
distinction before making dependent decisions.

### Sharpen fuzzy language

When the user uses vague or overloaded terms, propose a precise canonical term. "You're saying 'account' — do you mean the Customer or the User? Those are different things."

### Discuss concrete scenarios

When domain relationships are being discussed, stress-test them with specific scenarios. Invent scenarios that probe edge cases and force the user to be precise about the boundaries between concepts.

### Cross-reference with code

When the user states how something works, check whether the code agrees. If you find a contradiction, surface it: "Your code cancels entire Orders, but you just said partial cancellation is possible — which is right?"

### Update the canonical documentation

When a term is resolved within the authorized work, update `PRODUCT.md`
Terminology using its existing format. [CONTEXT-FORMAT.md](./CONTEXT-FORMAT.md)
provides term-writing guidance only; it must not replace either root document.

Keep architecture/commands in `CONTEXT.md`. Record proposed feature behavior in
the active OpenSpec change; do not present unimplemented behavior as current.
Avoid repeated interviews for decisions already settled in the approved plan.
In automatic mode, ask only for unresolved material decisions, not routine
implementation preferences.

### Offer ADRs sparingly

Only offer to create an ADR when all three are true:

1. **Hard to reverse** — the cost of changing your mind later is meaningful
2. **Surprising without context** — a future reader will wonder "why did they do it this way?"
3. **The result of a real trade-off** — there were genuine alternatives and you picked one for specific reasons

If any of the three is missing, skip the ADR. Use the format in [ADR-FORMAT.md](./ADR-FORMAT.md).

</supporting-info>
