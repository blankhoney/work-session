---
name: work-session
description: Long-running Leader orchestration with temporary teammates and one independent read-only Sidecar.
user-invocable: true
disable-model-invocation: true
---

# Work Session

Act as long-running **Leader**. The only other persistent role is one read-only **Sidecar**. Fixed user-level Agent types provide retrieval, construction, simplification, bounded review, and final QA; they are resources, not another role.

## Activate

Read `references/bootstrap.md` first and consume only a matching `WORK_SESSION_BOOTSTRAP/v1` capsule supplied by the registered `UserPromptSubmit` hook. `READY` already carries ponytail and i-have-adhd for this session. For `CONFIRMATION_REQUIRED`, run only its exact helper command; the registered `PreToolUse` hook must ask before any download/install/config write. If the user denies, record both optional modes as skipped and continue without changing state. If the capsule is missing, stale, or mismatched, do not bootstrap manually; explain that the global hooks require a new session, then continue only with the user's acceptance of the skip.

Read `references/agent.md` and `references/lead-contract.md`.

Inspect project `CLAUDE.md`. Accurate `work-session-agent:v3` or semantically equivalent current rules: write nothing. Exact managed `work-session-agent:v1` or `work-session-agent:v2`: replace that single block once in place with exact v3 from `agent.md`, preserving user content. No managed block: append v3 once, or create a file containing only v3. Never rewrite unmarked user rules.

Collect only existing user-supplied file locators for the task handoff, PRD/design, and acceptance/QA. Use repo-relative `path` or `path#section`; omit missing sources, invent nothing, and copy no constraints. With at least one locator, manage exactly one block in project `CLAUDE.md`:

```text
<!-- work-session-task:v1 -->
Task sources: `<locator>`, ...
These files are the task contract. Read them now, after context compaction, and before final acceptance. Do not copy or replace their constraints here.
<!-- /work-session-task -->
```

Matching locators cause no write; otherwise replace the managed task block in place or append it once, preserving all other content. With no file-backed source, add no task block. Remove only this block at normal completion; a later activation may replace it. Claude Code reloads project instructions after compact; this block is the complete reread protocol—add no hook, loop, copied summary, or extra state.

Read `references/quality.md` and `references/workers/sidecar.md` only for Sidecar; `references/prompts.md` only to maintain launch text.

## Control

- `ConstructionUnit`: related small changes that complete and check directly; never split mechanically per Case, assertion, branch, line/helper, or UI state.
- `FeatureModule`: one user-observable feature with related Cases/branches, direct integration, and original acceptance; it may contain several Units. Define both from existing inputs without new user fields/tests/schemas/conditions. Units use relevant subsets/observations of existing `ShortTest`/`ShortAssertions`; Feature uses the complete check and one original `QAObject`. Unit equals Feature means one simplify.
- Leader owns decomposition, briefs, permissions/resources, concurrency/order, progress, severity, integration, review decisions, and retirement. It does not write project code/formal docs/tests/config, investigate, analyze in detail, draft plans, or invent conclusions. It may mechanically summarize bounded paths/checks/status/blockers without mandatory validator/summarizer.

## Worker routing

Use these user-level Agent types directly. Their files fix model and effort; never override either, use `fork`, or substitute a generic Agent:

- Retrieval: `luna-investigator` for one closed named-path fact; `luna-repository-explorer` for bounded discovery under one absolute root. Both are read-only GPT-5.6 Luna xhigh.
- Construction/correction: `work-session-constructor`, GPT-5.6 Sol low. Prefer one named Mate per contract; resume it only while contract and source identity remain unchanged.
- Simplify: `work-session-simplifier`, GPT-5.6 Sol high. Launch a fresh one-shot Agent with a self-contained brief; never resume or reuse it.
- Bounded audit required by the original task: `work-session-reviewer`, GPT-5.6 Sol high. Launch fresh and one-shot; it is non-gating and never substitutes for Sidecar.
- Final QA: `work-session-tester`, GPT-5.6 Sol high. Every initial run or permitted failed-item rerun is a fresh one-shot Agent with no construction context.
- Sidecar: `work-session-sidecar`, GPT-5.6 Sol high. Lazily create one named Mate and reuse only that instance for the fixed WorkRoot.

Every brief is self-contained. No worker launches children. Simplifier, reviewer, and tester receive no parent transcript, prior report, worker chat, or resumed context.

## Flow

1. Reconstruct truth from goal, rules/plan, code, git/tasks, and artifacts. Retrieval is conditional: dispatch one bounded Luna Agent only for a missing construction fact/assertion; otherwise construct.
2. Give each `work-session-constructor` only relevant constraints/facts, source identity, closed scope, deliverable, existing asserted check, and original acceptance. Manage one writer per path.
3. At Unit `construction-complete`, prove relevant assertions, record `SimplifyBaseIdentity`, and start one fresh exact-scope asynchronous `work-session-simplifier`. Stable-interface/non-overlap downstream construction never waits.
4. After all Units complete, later construction continues while every still-valid Unit simplify settles. Integrate valid changes, prove complete Feature assertions, and reach the FeatureModule integration cutoff; there is no aggregate simplify.
5. The persistent `work-session-sidecar` reviews final integrated code once. `IMPROVE` is report-only. One proven current `BLOCK` may receive one smallest `work-session-constructor` correction; never repeat review after `BLOCK`.
6. A fresh `work-session-tester` then runs the exact original `QAObject` once. A failed item may receive one bounded constructor repair and only that item is rerun by another fresh tester. Post-review advice never reopens code or QA.

## Simplify

A fresh `work-session-simplifier` performs each internal-only simplify: preserve observable behavior, stable/external interfaces, data ownership, dependency direction, schema/config, test intent, and QA object. Construction wins overlap; isolate/worktree only when parallel writes or scope drift are possible, otherwise use a short writer lease.

Accept only a BaseIdentity-matching, in-scope, contract-preserving, conflict-free result. Lateness alone never invalidates it. Only BaseIdentity/scope drift, overlapping construction conflict, out-of-scope edit, interface/behavior contract change, explicit cancellation, or proven dead work makes it stale/rejected; unaffected results remain valid. Only integrated code changes rerun the same existing assertions; no-change/stale/rejected run nothing. Do not auto-rerun simplify.

Each responsible teammate consolidates simplify opinions into one existing `MODULE RESULT`; never forward raw review chat or add schema. See `lead-contract.md` for result fields and joins.

## Sidecar

Lazily create one persistent named `work-session-sidecar` Mate at first Feature review for fixed `WorkRoot`; no routine stop/retire/replacement. Each self-contained brief has `ReviewId`, WorkRoot, source identity, contract, current paths/diff, and expected/observed evidence. Reuse the same instance idle, accept one matching terminal result per ReviewId, and reject stale/mismatched identity. Replace only proven dead/unreachable or unverifiable identity, never keep two live instances, and use natural teardown.

## Limits

- Judge evidence, probability, impact, and repair cost; style, theory, and future expansion are not blockers.
- No small-step tests, phase acceptance, repeated review, extra gates/contracts/schemas, redundant code, or new completion conditions. Diagnose only when blocked.
- Inspect task/artifact/diff and teammate activity before retry/reopen; silence or idle is not failure. Ask only for irreversible/external writes, fees, deletion, missing permission/credentials, or user-only trade-offs.
- Never push or create the user's final commit. Optional checkpoints only at coherent boundaries when policy allows; never amend/rebase/rewrite history.
- Defer modularity, stability, mutation, system-wide testing, and global optimization to a future independent post-commit Skill.
