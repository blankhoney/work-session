# Leader construction contract

## Session bootstrap

Bootstrap is host/session preparation, not a construction gate or contract field. Accept only the registered hook's `WORK_SESSION_BOOTSTRAP/v1` capsule bound to this session and WorkRoot. `READY` applies its two rulesets once. `CONFIRMATION_REQUIRED` permits only its exact helper command and requires the PreToolUse permission prompt; denial continues without the optional modes and without retry. Missing/stale bootstrap context never authorizes raw install/config commands.

## Readiness and contract

Decide from task-source files, current input, project rules/plan, code, git/tasks, and artifacts. Dispatch one bounded Luna-xhigh `explorer` or `read_only` only for a missing construction fact/assertion; history/self-reports are clues.

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

Only Leader revises the contract from current evidence. Subagents and Sidecar cannot add requirements, tests, contracts, schemas, architecture, or completion conditions.

## Brief and dispatch

Every subagent uses `fork_turns = "none"` and a configured type without model/effort override:

- `explorer` / `read_only`: conditional Luna-xhigh retrieval;
- `work_session_constructor`: Sol-low construction/correction, reusable only for unchanged contract/source identity;
- `work_session_simplifier`: fresh one-shot Sol-high exact-scope simplify;
- `work_session_reviewer`: fresh one-shot Sol-high bounded audit only when the original task requires it; non-gating and not a Sidecar substitute;
- `work_session_tester`: fresh one-shot Sol-high final QA or failed-item rerun.

No subagent creates children. Simplifier, reviewer, and tester receive no parent turns, prior report, worker chat, or resumed context.

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

Simplify is one fresh context-free `work_session_simplifier` subagent, not a slash command. It preserves observable behavior, stable/external interfaces, data ownership, dependency direction, schema/config, test intent, and QA object.

For each Unit, prove relevant assertions, mark `construction-complete`, record `SimplifyBaseIdentity` for exact scope, and start one asynchronous simplify. Stable-interface calls/reads and non-overlap construction never wait.

Construction wins overlap. Lateness alone remains valid. Only BaseIdentity/scope drift, overlapping construction conflict, out-of-scope edit, interface/behavior contract change, explicit cancellation, or proven dead work makes a result stale/rejected. Only integrated code changes rerun the same Unit assertions; no-change/stale/rejected run nothing. Never auto-rerun simplify.

After all Units complete, later non-overlap construction continues while every still-valid Unit simplify settles. Integrate valid changes, prove complete Feature assertions, and reach FeatureModule integration cutoff; there is no aggregate simplify.

Each responsible construction subagent returns one consolidated existing `MODULE RESULT`: Unit/base identity/contract in `Contract`, scope in `SimplifyScope`, paths/disposition in `SimplifyTouched`, assertions in `ShortTest`/`ShortEvidence`, and raw duration/hidden overlap/finalization wait/blocker in `Remaining`. Do not forward raw opinions or add schema.

## Sidecar and correction

At first Feature review, start one independent read-only Codex App session explicitly configured as `gpt-5.6-sol` with reasoning effort `high` for fixed WorkRoot. Verify the returned model/effort/read-only/identity; block if the App tools cannot set or verify them. Do not fork Leader turns. Initialize it from `references/workers/sidecar.md` plus a self-contained brief containing `ReviewId`, WorkRoot, source identity, contract, current paths/diff, and expected/observed evidence. Reuse the App-owned session identity and two-way messaging; accept one matching terminal result per ReviewId and reject stale/mismatched identity.

`PASS` closes review. `IMPROVE` is report-only: no dispatch, code, test, or QA. One current proven `BLOCK` may be sent once to `work_session_constructor` for the smallest correction; never repeat Sidecar after `BLOCK`.

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

After integration cutoff, Sidecar, and any correction, reread task-source files. Launch a fresh `work_session_tester` with `fork_turns = "none"` and a self-contained brief to run exact original `QAObject`/`FinalAcceptance` once. Add no checks. A failed item may receive one bounded constructor repair and only that item is rerun by another fresh tester. Leader may mechanically summarize bounded paths/checks/status/blockers without a mandatory validator/summarizer or invented conclusions.

Never push or create the user's final commit. Optional checkpoints are local coherent-boundary snapshots only when policy permits.
