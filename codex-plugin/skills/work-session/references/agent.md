<!-- work-session-agent:codex-v3 -->
## Work Session agent contract

### Roles

- **Leader** is the only construction authority: decomposition, briefs, permissions/resources, concurrency/order, progress, classification, integration, review decisions, and retirement.
- **Sidecar** is the only independent quality role: one separate read-only Codex App session for optimization method/plan and evidence classification; no implementation, dispatch, requirements, QA, or children.
- Temporary context-free execution units provide coding, retrieval, bounded audit, tests, behavior-preserving simplification, and non-mechanical summaries. They are not a persistent third role. Leader may mechanically summarize bounded results.
- The host harness owns model, reasoning setting, execution-unit identity/type, tools, concurrency, and dispatch. Local templates/registrations are optional and their absence never blocks Work Session.

### Engineering principles

- Use DDD for real boundaries/rules/invariants without needless domain objects or abstractions. Keep responsibilities explicit; minimize dependencies, states, exceptions, and special rules.
- Solve root causes; no monkey patches, copied logic, hidden fallback, temporary bypass, or unlimited compatibility layers.
- Do not prebuild abstractions, configuration, tests, validation, or defense for absent/minor/low-probability needs. Real safety, permission, data-integrity, irreversible, and core-business correctness are exceptions.
- Keep only cross-task invariants; merge/replace/remove conflicts instead of accumulating one-off policy.

### Construction

- `ConstructionUnit` is a related independently completable/checkable change set, never a split per Case, assertion, branch, line/helper, or UI state. `FeatureModule` is one user-observable feature with related Cases/branches, direct integration, and original acceptance; it may contain several Units.
- Define both from existing inputs without new user fields/tests/schemas/conditions. Units use relevant subsets/observations of existing `ShortTest`/`ShortAssertions`; Feature uses the complete check and one original `QAObject`. Unit equals Feature means one simplify.
- Select workers by capability: conditional narrow read-only retrieval; scoped writable construction/correction; fresh one-shot independent simplify, bounded original-task review, and final QA. Request `fork_turns = "none"` when supported and prohibit child delegation. Resume construction only for unchanged contract/source identity; never resume simplify/review/test.
- At Unit completion, prove relevant assertions, record `SimplifyBaseIdentity`, and run one fresh exact-scope simplify asynchronously. Preserve behavior, stable/external interfaces, ownership, dependency direction, schema/config, test intent, and QA. Stable-interface/non-overlap downstream construction never waits.
- One writer per path; construction wins overlap. Lateness alone is valid. Only BaseIdentity/scope drift, overlapping construction conflict, out-of-scope edit, interface/behavior contract change, explicit cancellation, or proven dead work makes a result stale/rejected. Only integrated code changes rerun assertions; no-change/stale/rejected run nothing.
- Join all still-valid Unit simplifies before Sidecar/final QA, integrate valid changes, prove complete Feature assertions, and reach integration cutoff. There is no aggregate simplify. Consolidate each Unit into one existing `MODULE RESULT`; no raw chat/new schema.
- One independent read-only Sidecar App session reviews final code once. `IMPROVE` is report-only; one proven `BLOCK` may receive one smallest construction correction without repeated review. A fresh tester then runs exact original QA once; a failed item alone may be repaired and rerun by another fresh tester. Advice never reopens code/QA.

### Sidecar and delivery

- Lazily start one independent read-only Codex App session for one WorkRoot; do not fork Leader turns or require a particular model/reasoning setting. Reuse the App-owned session identity with fresh self-contained `ReviewId`/source-identity briefs and two-way follow-ups. Accept one matching result and reject stale identity. Keep it idle between reviews; stop using it at completion without deleting history.
- No small-step tests, phase gates, repeated reviews, extra contracts/schemas, redundant code, or new completion conditions; diagnose only when blocked.
- Never push or create the user's final commit. Optional local checkpoints only at coherent boundaries when policy allows; never amend/rebase/rewrite history.
- Defer modularity, stability, mutation, system-wide verification, and global optimization to a future independent post-commit Skill.
<!-- /work-session-agent -->
