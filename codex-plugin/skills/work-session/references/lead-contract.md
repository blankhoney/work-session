# Leader construction contract

## Readiness and contract

Decide from task-source files, current input, project rules/plan, code, git/tasks, and artifacts. Dispatch one narrow read-only retrieval worker only for a missing construction fact/assertion; history/self-reports are clues.

The managed `work-session-task:v1` block contains locators only. Its source files are the task contract: read them at activation, after context compaction/session resume, and before the final gate. Never copy their constraints into that block; derive the runtime contract below from the current files.

Define without adding fields:

```text
Goal: <observable result>
ProjectConstraints: <relevant rules>
ArchitectureRules: <boundaries, interfaces, dependency direction, invariants>
EngineeringPrinciples: <relevant project principles>
ImplementationDetails: <interfaces, call path, dependencies, conventions, necessary facts>
FeatureModule: <one complete user-observable feature>
AllowedScope: <closed modification boundary>
Deliverable: <artifact and concise result>
ShortTest: <existing small check for construction and integrated simplify changes>
ShortAssertions: <exact expected output/state/side effect/error/warning/observation>
FinalAcceptance: <strict completion conditions>
QAObject: <exact original final scenarios/commands/observations/artifacts>
NonGoals: <excluded expansion/testing/defense>
```

`ConstructionUnit` is a related small change set that completes/checks directly, never a split per Case, assertion, branch, line/helper, or UI state. `FeatureModule` includes the feature, related Cases/branches, direct integration, and original acceptance; it may contain several Units. Units use relevant subsets/observations of existing checks; Feature uses the complete check and one original QA object. Unit equals Feature means one simplify.

Only Leader revises the contract from current evidence. Workers and Sidecar cannot add requirements, tests, contracts, schemas, architecture, or completion conditions.

## Brief and dispatch

The host harness owns model, reasoning setting, identity/type, tools, concurrency, and dispatch. Choose execution units by capability rather than a configured name:

- conditional narrow read-only retrieval;
- scoped writable construction/correction, reusable only for unchanged contract/source identity;
- fresh one-shot independent exact-scope simplify;
- fresh one-shot independent bounded audit only when the original task requires it, non-gating and not a Sidecar substitute;
- fresh one-shot independent final QA or failed-item rerun.

Request `fork_turns = "none"` when the native harness supports it; otherwise use the freshest context-isolated execution available. Local templates/registrations are optional and missing configuration never blocks. No execution unit creates children. Simplifier, reviewer, and tester receive no parent turns, prior report, worker chat, or resumed context.

```text
TEMPORARY TASK
Goal: <bounded result>
RelevantConstraints: <relevant project/architecture/engineering rules>
EngineeringDetails: <interfaces, call path, dependencies, conventions, facts>
AllowedScope: <closed boundary>
Deliverable: <exact output>
ShortTest: <existing command/direct check>
ShortAssertions: <specific expected behavior; zero exit is insufficient>
FinalAcceptance: <one final gate>
QAObject: <exact original QA object>
DoNotAdd: <requirements, dependencies, tests, schemas, defense, conditions>
```

Use minimum sufficient concurrency and one writer per path. Expand scope only by Leader decision from evidence. Assertions prove behavior; zero exit, file existence, or confidence is insufficient.

## Asynchronous small-scope simplify

Simplify is one fresh context-free execution unit, not a slash command. It preserves observable behavior, stable/external interfaces, data ownership, dependency direction, schema/config, test intent, and QA object.

For each Unit, prove relevant assertions, mark `construction-complete`, record `SimplifyBaseIdentity` for exact scope, and start one asynchronous simplify. Stable-interface calls/reads and non-overlap construction never wait.

Construction wins overlap. Lateness alone remains valid. Only BaseIdentity/scope drift, overlapping construction conflict, out-of-scope edit, interface/behavior contract change, explicit cancellation, or proven dead work makes a result stale/rejected. Only integrated code changes rerun the same Unit assertions; no-change/stale/rejected run nothing. Never auto-rerun simplify.

After all Units complete, later non-overlap construction continues while every still-valid Unit simplify settles. Integrate valid changes, prove complete Feature assertions, and reach FeatureModule integration cutoff; there is no aggregate simplify.

Each responsible construction worker returns one consolidated existing `MODULE RESULT`: Unit/base identity/contract in `Contract`, scope in `SimplifyScope`, paths/disposition in `SimplifyTouched`, assertions in `ShortTest`/`ShortEvidence`, and raw duration/hidden overlap/finalization wait/blocker in `Remaining`. Do not forward raw opinions or add schema.

## Sidecar and correction

At first Feature review, start one independent read-only Codex App session for fixed WorkRoot. Do not fork Leader turns or require control/verification of a particular model or reasoning setting. Initialize it from `references/workers/sidecar.md` plus a self-contained brief containing `ReviewId`, WorkRoot, source identity, contract, current paths/diff, and expected/observed evidence. Reuse the App-owned session identity and two-way messaging; accept one matching terminal result per ReviewId and reject stale/mismatched identity.

`PASS` closes review. `IMPROVE` is report-only: no dispatch, code, test, or QA. One current proven `BLOCK` may be sent once to a scoped construction worker for the smallest correction; never repeat Sidecar after `BLOCK`.

## MODULE RESULT

```text
MODULE RESULT
Result: <complete | blocked>
Contract: <Unit/Feature level, identity, contract>
Inspected: <important paths/reason>
Changed: <paths/purpose>
Relationships: <callers/callees, ownership, dependency, integration>
ShortTest: <existing check and assertion results>
ShortEvidence: <expected versus observed behavior>
SimplifyScope: <exact paths>
SimplifyTouched: <paths and integrated/no-change/stale/rejected>
Evidence: <smallest inspectable result>
Remaining: <raw/hidden/finalization wait and blocker/note>
```

## Final gate

After integration cutoff, Sidecar, and any correction, reread task-source files. Launch a fresh independent tester with a self-contained context-free brief to run exact original `QAObject`/`FinalAcceptance` once. Add no checks. A failed item may receive one bounded construction repair and only that item is rerun by another fresh tester. Leader may mechanically summarize bounded paths/checks/status/blockers without a mandatory validator/summarizer or invented conclusions.

Never push or create the user's final commit. Optional checkpoints are local coherent-boundary snapshots only when policy permits.
