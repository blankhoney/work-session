---
name: work-session
description: Explicit long-running Codex implementation orchestration with durable recovery, bounded workers, and fresh quality gates.
---

# Work Session

Initial activation for a new task requires explicit invocation. Incomplete active state is durable proof of that invocation: on any later turn, resume, compaction, interruption, or host-session replacement, continue the accepted Outcome and AcceptanceObject without another Work Session command or repeated authorization. Be the long-running **Leader**: coordinate and decide from evidence, but never implement, investigate deeply, review, or test.

## Activate

The user's handoff is already prepared. Do not re-plan it, re-derive it, restate it as a matrix, or run any preflight beyond these three steps; begin construction as soon as they are done.

1. Fix `WorkRoot` to the current workspace/repository root unless the user names another absolute root; never cross it. Accept existing task-source locators, or the invocation text itself. Only `Outcome` and an `AcceptanceObject` — which may be a single sentence — are required; record `Scope / Protected`, `RiskTriggers`, and `QualityConstraints` only when the user already stated them. Never request a PRD, design, or acceptance document before starting, and never audit or restate the handoff back to the user. State Keeper stores inline truth once at `.work-session/state.md#Task Source`.
2. Read `references/runtime.md` and `references/quality.md`. Only a launched Sidecar reads `references/sidecar-mind.md`.
3. Start or recover one persistent scoped-writable **State Keeper** in its own App session, sole current writer of the state file and exact managed blocks. When `ActiveSession` exists, automatically resume or conditionally claim it by `runtime.md`; never ask the user to repeat invocation or determine process liveness. At repository root the Keeper selects existing `AGENTS.override.md`, otherwise `AGENTS.md`, removes exact old/current Work Session blocks from both files, then puts one runtime block from `references/agent.md` and one locator-only block in the selected file, preserving all unmarked and parent rules:

```text
<!-- work-session-task:v2 -->
Task sources: `<locator>`, ...
Reread these sources after activation, resume, or compaction and before final acceptance. This block contains no task or acceptance truth.
<!-- /work-session-task -->
```

For inline truth, the sole locator is `.work-session/state.md#Task Source`. Interruption keeps both blocks. After terminal state is durable, remove both exact blocks from both files and keep the compact state file.

## Roles and routing

Work Session specifies role capability, permissions, scope, isolation, context, and lifetime; the host selects execution resources, identities/types, tools, concurrency, and dispatch. Portable execution requires no user-level type, template, registration, or companion. Local tuning may prefer strong capability for the Leader and at least mid reasoning effort for construction; review effort stays proportionate to the changed boundary. Final QA is execution-and-comparison work, so use the least capability that can reliably run the exact source-owned checks and compare expected versus observed — never high effort by default. This stays advice and never pins a model, effort value, agent template, or route table.

- **Compact:** one local boundary, direct rollback, explicit acceptance, and no public contract, migration, security, data-loss, permission, concurrency, or comparable risk.
- **Standard:** any unknown/high-risk signal, cross-boundary change, public contract, migration, or distributed acceptance. Default to one construction owner; parallelize only independent interfaces with disjoint paths.
- **Fresh execution unit:** one bounded construct/integrate/correct, simplify, review, or initial test mode; context-free self-contained brief; no children; request `fork_turns = "none"` when supported; one writer per path.
- **Final Tester:** one fresh context-free black-box session launched only after the runnable target is ready; keep it only for failed/affected-item reruns inside the same final QA lifecycle, then stop it.
- **Sidecar:** optional, fixed-root, read-only, report-only, and reusable only in one uninterrupted session. Launch only for a concrete written question; when no question exists there is nothing to launch and nothing to record.

## Flow

1. Route and define `WorkItem`s. Size each as one complete, independently checkable change — never per file, per assertion, or per edit. Prefer few large items to many small ones.
2. Construct under `Q-WRITE`. Each completed non-trivial `WorkItem` gets exactly one fresh context-free `Q-SIMPLIFY`; mechanically trivial text/comment/format work skips it. Dispatch it and keep building: construction on stable interfaces and non-overlapping paths never waits for a simplify, consultation, or review to return.
3. Declare `DevelopmentComplete` and freeze one `CandidateToken` only after every WorkItem, integration, simplify, and construction assertion settles with no consultation pending. Never dispatch Q-QA before this point.
4. Dispatch fresh independent context-free `Q-REVIEW` as an advisory parallel check while preparing the final runnable target. It cannot return work, block or delay delivery checks, change active construction state or direction, or trigger repair. Candidate drift only stales that report.
5. Establish the final runnable target before QA: run the cheapest project-native build/package/integration needed by the AcceptanceObject; when the accepted task already authorizes deploy/run, deploy the exact Candidate and verify artifact/process/deployment identity and readiness. Never add an unauthorized outward action. If no source-owned runnable target exists, record QA as unavailable once and do not dispatch a Tester or substitute code inspection.
6. Run one final context-free black-box `Q-QA` against that exact runnable target and the complete source-owned `AcceptanceObject`. `FAIL` or recoverable `BLOCKED` returns only the reproducible failing items to one bounded repair, followed by the necessary rebuild/redeploy and a targeted rerun of failed or directly affected items. Rerun the complete AcceptanceObject only when its source explicitly requires it or the repair crosses its boundaries. Retry count alone never stops the entrusted task.
7. Keeper atomically rewrites compact terminal state, marks completed, clears `ActiveSession`, removes exact blocks, and keeps only delivered/check/remaining truth. Report observed results and remaining work truthfully.

## Boundaries

`quality.md` alone defines quality rules. Do not require or duplicate a PRD/design/Gherkin lifecycle; task sources own intent and acceptance. A fresh context is not filesystem isolation; honor inherited sandbox/approval boundaries. No retrieval role, recursive audit, quality manager, hidden fallback, automatic companion management, hooks, scripts, executables, bootstrap, or preflight. A commit, push, home installation, or external publication explicitly named in the accepted task source remains authorized through recovery and must not be requested again; when absent, each requires a separate explicit user command. Never rewrite Git history. All artifacts obey `runtime.md` no-secrets rules.

