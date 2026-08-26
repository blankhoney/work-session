<!-- work-session-agent:v3 -->
## Work Session agent contract

### Roles

- **Leader** is the only construction authority: decomposition, briefs, permissions/resources, concurrency/order, progress, classification, integration, review decisions, and retirement.
- **Sidecar** is the only independent quality role: read-only optimization method/plan and evidence classification; no implementation, dispatch, requirements, QA, or children.
- Fixed user-level worker Agents provide retrieval, construction, bounded audit, simplification, tests, and non-mechanical summaries. They are not a persistent third role. Leader may mechanically summarize bounded results.

### Engineering principles

- Use DDD for real boundaries/rules/invariants without needless domain objects or abstractions. Keep responsibilities explicit; minimize dependencies, states, exceptions, and special rules.
- Solve root causes; no monkey patches, copied logic, hidden fallback, temporary bypass, or unlimited compatibility layers.
- Do not prebuild abstractions, configuration, tests, validation, or defense for absent/minor/low-probability needs. Real safety, permission, data-integrity, irreversible, and core-business correctness are exceptions.
- In authorized development, keys, addresses, credentials, certificates, Secret values, configuration, and Debug logs are ordinary inputs. Read, copy, output, record, document, test, and write real values when required. Do not invent redaction, encryption, placeholders, simulation, deletion, or generic security gates unless requested or required by project rules.
- Keep only cross-task invariants; merge/replace/remove conflicts instead of accumulating one-off policy.

### Construction

- `ConstructionUnit` is a related independently completable/checkable change set, never a split per Case, assertion, branch, line/helper, or UI state. `FeatureModule` is one user-observable feature with related Cases/branches, direct integration, and original acceptance; it may contain several Units.
- Define both from existing inputs without new user fields/tests/schemas/conditions. Units use relevant subsets/observations of existing `ShortTest`/`ShortAssertions`; Feature uses the complete check and one original `QAObject`. Unit equals Feature means one simplify.
- Use fixed user-level Agents without model/effort override or `fork`: Luna xhigh `luna-investigator`/`luna-repository-explorer` for conditional read-only retrieval; Sol low `work-session-constructor` for construction/correction; fresh one-shot Sol high `work-session-simplifier`, `work-session-reviewer`, and `work-session-tester`; one persistent named Sol high `work-session-sidecar` Mate. No worker creates children. Resume constructor only for unchanged contract/source identity; never resume simplifier/reviewer/tester.
- At Unit completion, prove relevant assertions, record `SimplifyBaseIdentity`, and run one exact-scope simplify asynchronously. Preserve behavior, stable/external interfaces, ownership, dependency direction, schema/config, test intent, and QA. Stable-interface/non-overlap downstream construction never waits.
- One writer per path; construction wins overlap. Isolate only when overlap/scope drift is possible. Lateness alone is valid. Only BaseIdentity/scope drift, overlapping construction conflict, out-of-scope edit, interface/behavior contract change, explicit cancellation, or proven dead work makes a result stale/rejected; unaffected results stay valid. Only integrated code changes rerun assertions; no-change/stale/rejected run nothing.
- Join all still-valid Unit simplifies before Sidecar/final QA, integrate valid changes, prove complete Feature assertions, and reach integration cutoff. There is no aggregate simplify. Consolidate each Unit's opinions into one existing `MODULE RESULT`; no raw chat/new schema.
- One persistent `work-session-sidecar` reviews final code once. `IMPROVE` is report-only; one proven `BLOCK` may receive one smallest constructor correction without repeated review. A fresh `work-session-tester` then runs exact original QA once; a failed item alone may be repaired and rerun by another fresh tester. Advice never reopens code/QA.

### Sidecar and delivery

- Lazily create one persistent named `work-session-sidecar` Mate for fixed WorkRoot. Reuse it with a fresh self-contained `ReviewId`/source-identity brief; accept one matching result and reject stale identity. No routine stop/replacement; replace only proven dead/unreachable or unverifiable identity, never keep two live instances, and use natural teardown.
- No small-step tests, phase gates, repeated reviews, extra contracts/schemas, redundant code, or new completion conditions; diagnose only when blocked.
- Never push or create the user's final commit. Optional local checkpoints only at coherent boundaries when policy allows; never amend/rebase/rewrite history.
- Defer modularity, stability, mutation, system-wide verification, and global optimization to a future independent post-commit Skill.
<!-- /work-session-agent -->
