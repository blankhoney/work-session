# Quality contract

Unique source for `Q-WRITE`, `Q-SIMPLIFY`, `Q-REVIEW`, and `Q-QA`; other runtime files reference these IDs instead of copying the rules. Discard every `STALE` conclusion and never merge stale conclusions. `Q-SIMPLIFY` and `Q-REVIEW` are one-shots and are not auto-rerun; `Q-QA` reruns only under its section after the required identity or method change.

## Q-WRITE

Before editing, read applicable project rules, task sources, current state, the full owned scope, direct relationships, and relevant tests/config. Trace the real flow and fix the shared root cause. Prefer deletion, existing code, native behavior, and installed dependencies. Preserve clear ownership/dependency direction, stable interfaces/schemas, compatibility, failures, acceptance, trust boundaries, data integrity, security, and accessibility where relevant. Do not widen scope or add speculative requirements, dependencies, tests, schemas, defenses, or fallbacks.

Ask first whether the thing needs to exist at all, and say so in one line when it does not. Stop at the first solution that works: reuse before writing, standard library before dependency, one line before fifty. Verification stays proportionate to what it verifies — when a check, harness, matrix, or evidence protocol grows larger than the thing it validates, that is a planning defect, so report it, stop building that machinery, and continue the task with the smallest direct check. Reread this section after every context compaction; the discipline is the contract, not a mood.

Non-trivial logic leaves the smallest repository-native runnable check that would fail on regression. Report expected and observed behavior, not exit status alone.

Choose one maintenance-contract result:

- `none`: code/types/tests/schema already make the rule clear.
- `update:<nearest existing path>`: a durable, non-obvious cross-file invariant, ownership/dependency direction, public format, compatibility window, or failure/rollback rule needs recording.
- `create:<path>`: required only when no suitable durable document exists.

A note contains only context, invariant, owner, failure behavior, change conditions, and verification. Session history and review output are not architecture documentation.

## Q-SIMPLIFY

After each non-trivial completed `WorkItem` — not after each file or edit — one fresh exact-scope worker applies the host-native simplify capability when available, only inside the released scope and without children. Remove only implementation demonstrably unnecessary to current behavior. Preserve behavior, stable interfaces, ownership, dependency direction, schema/config, tests, acceptance, security, and contract docs. Only text/comment/format-only or mechanically proven non-semantic work is trivial; behavioral change or uncertainty is non-trivial. Never redesign, broaden scope, add requirements, or hide failures.

Return `no-change` or exact edits with the same assertions. The owner never waits for it: construction continues on stable interfaces and non-overlapping paths while it runs. Lateness alone remains valid. Identity drift, overlap, out-of-scope edits, contract change, cancellation, or dead work stales/rejects only that result. `no-change`, stale/rejected, and unintegrated results are not written to state. Only integrated edits change the Candidate and rerun assertions. Never auto-rerun or add an aggregate insurance pass.

## Q-REVIEW

After all writes, simplifies, and SidecarChecks settle, dispatch one fresh independent read-only Reviewer while the Leader prepares the final build/integration and runnable target. It never waits for, starts, or runs alongside an early QA. It receives no parent transcript, writer chat, prior report, or old rationale. It reads project rules, task sources, current state Snapshot, applicable canonical architecture/contract documents, complete Candidate diff/target, sufficient surrounding code and direct relationships, and relevant tests/config. Claimed checks are unverified. Inspect unchanged code only for a concrete change-raised risk; `PASS` is valid.

Check relevant dimensions:

1. requirement fit, correctness, integrity, lifecycle/error/resource behavior;
2. boundaries, dependency direction/cycles, ownership, stable contracts, layering, integration;
3. responsibility/cohesion, divergent change, feature envy, inappropriate intimacy, shared mutable state;
4. change amplification, duplicated business rules, implicit order/config/schema coupling;
5. leaky/shallow/speculative abstraction, primitive obsession, needless state/parameters, dead code, hidden fallback, premature DRY.

A smell only triggers investigation. Report a concrete current issue introduced or materially worsened by the Candidate only when it has a reproducible input/call path, meaningful impact, evidence, and smallest corrective direction. Exclude pre-existing issues, theory, generic practice, intentional behavior, numerical size preferences, and forced findings.

Anchor every finding to a specific line of this Candidate's diff. Having confirmed one defect pattern, check every other instance of that pattern within this review and report them together.

```text
Result: PASS | ADVISORY | STALE
Identity: <CandidateToken match/mismatch>
RequirementFit: <evidence>
Correctness: <evidence>
Architecture: <boundaries/ownership/dependencies/integration>
Maintainability: <cohesion/coupling/abstraction/simplicity>
Findings: <deduplicated current findings with locators/scenarios or none>
StaleReason: <identity reason or none>
```

`ADVISORY` is report-only. No review result can return work, change active construction state or direction, trigger repair, delay QA, or affect completion. One materially severe finding that names a reproducible acceptance, data-integrity, or security-boundary defect may be surfaced to the user once without waiting for an answer; it remains advisory. Only the user's acceptance as a task amendment or an independent Q-QA failure can return work. No answer or a late finding stays in final `Remaining` and never reopens the Candidate or QA. `STALE` is discarded and is never redispatched solely to obtain a report. Reviewer never edits, dispatches, creates children, or runs final QA.

## Q-QA

Q-QA is a terminal acceptance action, never a construction activity. Do not dispatch it until `DevelopmentComplete`, all simplifies/integration have settled, the final Candidate has passed the required project-native build/package/integration checks, and an exact `RunnableTargetIdentity` exists. When the accepted task authorizes deploy/run, establish that identity only after deploying or starting the exact Candidate and verifying readiness. Review never gates this boundary.

If the repository and accepted task provide no source-owned runnable target, do not launch a Tester: record `QA: UNAVAILABLE` once with the missing boundary and continue truthful delivery unless runtime acceptance is mandatory. Never replace runtime QA with source inspection, diff review, inferred behavior, or another review agent.

Start one fresh black-box Tester session bound to the current CandidateToken, exact RunnableTargetIdentity, and complete original source-owned `AcceptanceObject`, including only source-accepted amendments. It receives no implementation rationale or review report and may read only the acceptance sources and target-facing commands/configuration required to execute them; it cannot inspect implementation code as a substitute, edit code/tests, invent or narrow requirements, add checks/dependencies/schemas, reinterpret outcomes, or audit the Reviewer.

Run every mandatory item once against the runnable target and report expected versus observed. Missing tooling/input or a target that cannot execute a mandatory item is `BLOCKED`, never `SKIPPED` or pass.

```text
Result: PASS | FAIL | BLOCKED | STALE
CandidateIdentity: <CandidateToken match/mismatch>
RunnableTargetIdentity: <artifact/process/deployment identity>
AcceptanceObject: <source locator/revision>
Checks: <each mandatory item and observed result>
Failure: <smallest reproducible mismatch or none>
Evidence: <small target-facing pointers; no raw log or source analysis>
```

`FAIL` or recoverable `BLOCKED` returns only the reproducible failed items to one bounded repair. Candidate changes require Q-WRITE, non-trivial Q-SIMPLIFY, a new CandidateToken, and the necessary rebuild/redeploy/readiness check before any rerun. Reuse the same Tester session only inside this final QA lifecycle and rerun the failed items plus directly affected acceptance items; do not repeat unaffected checks. Rerun the complete AcceptanceObject only when its source explicitly requires it or the repair crosses its boundaries. Never rerun against an unchanged Candidate/target or unchanged method. A mandatory item unavailable only because of a user-owned permission or decision enters `waiting-user`; a repository with no runnable boundary records `UNAVAILABLE` in final `Remaining`, never pass.

