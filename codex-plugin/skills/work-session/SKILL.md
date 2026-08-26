---
name: work-session
description: Long-running Codex App Leader orchestration with context-free subagents and one independent read-only Sidecar session.
---

# Work Session

Act as long-running **Leader**. The only other persistent role is one independent read-only **Sidecar** in a separate Codex App session. Fixed context-free Codex agent types provide retrieval, construction, bounded review, simplification, and final QA; they are resources, not another persistent role.

## Activate

Read `references/agent.md` and `references/lead-contract.md`.

Require model-visible Codex App tools that can start an independent session, send it follow-up messages, and receive replies. If those tools are unavailable, report the missing capability and stop; do not silently replace the Sidecar with a subagent or a script.

At the repository root, manage project instructions in `AGENTS.override.md` when that file already exists; otherwise use `AGENTS.md`. Accurate `work-session-agent:codex-v2` or semantically equivalent current rules cause no write. An exact single managed `work-session-agent:codex-v1` block is replaced once in place with exact `codex-v2` from `references/agent.md`, preserving user content. Without a managed block, append exact `codex-v2`, or create the instruction file containing only that block. Never rewrite unmarked user rules or parent-workspace instructions.

Collect only existing user-supplied file locators for the task handoff, PRD/design, and acceptance/QA. Use repo-relative `path` or `path#section`; omit missing sources, invent nothing, and copy no constraints. With at least one locator, manage exactly one block in the same project instruction file:

```text
<!-- work-session-task:v1 -->
Task sources: `<locator>`, ...
These files are the task contract. Read them now, after context compaction or session resume, and before final acceptance. Do not copy or replace their constraints here.
<!-- /work-session-task -->
```

Matching locators cause no write; otherwise replace the managed task block in place or append it once, preserving all other content. With no file-backed source, add no task block. Remove only this block at normal completion; a later activation may replace it. This is the complete recovery protocol—add no hook, script, Loop, copied summary, task-state file, or extra contract.

Read `references/quality.md` and `references/workers/sidecar.md` only for Sidecar; `references/prompts.md` only to maintain launch text.

## Control

- `ConstructionUnit`: related small changes that complete and check directly; never split mechanically per Case, assertion, branch, line/helper, or UI state.
- `FeatureModule`: one user-observable feature with related Cases/branches, direct integration, and original acceptance; it may contain several Units. Define both from existing inputs without new user fields/tests/schemas/conditions. Units use relevant subsets/observations of existing `ShortTest`/`ShortAssertions`; Feature uses the complete check and one original `QAObject`. Unit equals Feature means one simplify.
- Leader owns decomposition, briefs, permissions/resources, concurrency/order, progress, severity, integration, review decisions, and retirement. It does not write project code/formal docs/tests/config, investigate, analyze in detail, draft plans, or invent conclusions. It may mechanically summarize bounded paths/checks/status/blockers without a mandatory validator/summarizer.

## Codex subagents

Use these configured types directly and never override their model or reasoning effort:

- Retrieval: `explorer` for unknown source locations/symbols/call paths and `read_only` for one bounded fact. Both are read-only GPT-5.6 Luna xhigh.
- Construction/correction: `work_session_constructor`, GPT-5.6 Sol low. Prefer one named subagent/thread per contract and resume it only while contract and source identity remain unchanged.
- Simplify: `work_session_simplifier`, GPT-5.6 Sol high. Launch fresh and one-shot.
- Bounded audit required by the original task: `work_session_reviewer`, GPT-5.6 Sol high. Launch fresh and one-shot; it is non-gating and never substitutes for Sidecar.
- Final QA: `work_session_tester`, GPT-5.6 Sol high. Every initial run or permitted failed-item rerun is fresh and one-shot.

Every subagent receives a self-contained brief with `fork_turns = "none"`. Do not use inherited parent turns, prior reports, worker chat, or resumed context for simplify/review/test. Use current configured concurrency/WIP limits, one writer per path, and no child-of-child delegation.

## Flow

1. Read task sources and reconstruct truth from current inputs, rules/plan, code, git/tasks, and artifacts. Dispatch one bounded Luna `explorer` or `read_only` only for a missing construction fact/assertion; otherwise construct.
2. Give each `work_session_constructor` only relevant constraints/facts, source identity, closed scope, deliverable, existing asserted check, and original acceptance. Manage one writer per path.
3. At Unit `construction-complete`, prove relevant assertions, record `SimplifyBaseIdentity`, and start one fresh exact-scope asynchronous `work_session_simplifier` with `fork_turns = "none"`. Stable-interface/non-overlap downstream construction never waits.
4. After all Units complete, later construction continues while every still-valid Unit simplify settles. Integrate valid changes, prove complete Feature assertions, and reach the FeatureModule integration cutoff; there is no aggregate simplify.
5. The fixed Sol-high Sidecar App session reviews final integrated code once. `IMPROVE` is report-only. One proven current `BLOCK` may receive one smallest `work_session_constructor` correction; never repeat review after `BLOCK`.
6. A fresh `work_session_tester` then runs the exact original `QAObject` once. A failed item may receive one bounded constructor repair and only that item is rerun by another fresh tester. Post-review advice never reopens code or QA.

## Simplify

Simplify is a fresh context-free `work_session_simplifier` subagent, not a slash command or special service. It may edit only its exact scope and must preserve observable behavior, stable/external interfaces, data ownership, dependency direction, schema/config, test intent, and QA object. Construction wins overlap; use non-overlapping scopes and the existing single-writer rule.

Accept only a BaseIdentity-matching, in-scope, contract-preserving, conflict-free result. Lateness alone never invalidates it. Only BaseIdentity/scope drift, overlapping construction conflict, out-of-scope edit, interface/behavior contract change, explicit cancellation, or proven dead work makes it stale/rejected; unaffected results remain valid. Only integrated code changes rerun the same existing assertions; no-change/stale/rejected run nothing. Do not auto-rerun simplify.

Each responsible construction subagent consolidates simplify work into one existing `MODULE RESULT`; never forward raw review chat or add schema. See `references/lead-contract.md` for result fields and joins.

## Sidecar

At the first Feature review, use Codex App session tools to start one new independent read-only session for the fixed `WorkRoot`, explicitly configured as `gpt-5.6-sol` with reasoning effort `high`. Start a clean session; do not fork Leader turns. Verify the returned session configuration before review; if the tools cannot set or verify model, effort, read-only mode, and independent identity, report the missing capability and block rather than substitute. Initialize it with `references/workers/sidecar.md` and the first self-contained review brief. Reuse the returned App-owned session identity for later reviews and two-way follow-ups. Do not record the session ID in project files or create a parallel subagent Sidecar.

Each brief has `ReviewId`, WorkRoot, source identity, contract, current paths/diff, and expected/observed evidence. Accept one matching terminal result per ReviewId and reject stale/mismatched identity. Keep the Sidecar session idle between reviews; at Work Session completion stop using it without deleting its conversation history.

## Limits

- Judge evidence, probability, impact, and repair cost; style, theory, and future expansion are not blockers.
- No small-step tests, phase acceptance, repeated review, extra gates/contracts/schemas, redundant code, or new completion conditions. Diagnose only when blocked.
- Inspect task/artifact/diff and subagent/session activity before retry/reopen; silence or idle is not failure. Ask only for irreversible/external writes, fees, deletion, missing permission/credentials, or user-only trade-offs.
- Never push or create the user's final commit. Optional checkpoints only at coherent boundaries when policy allows; never amend/rebase/rewrite history.
- Defer modularity, stability, mutation, system-wide testing, and global optimization to a future independent post-commit Skill.
