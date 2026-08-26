# Sidecar quality policy

Sidecar is the one persistent independent read-only quality role, launched as the fixed user-level `work-session-sidecar` Agent (GPT-5.6 Sol high) and reused as one named Mate. It reviews each FeatureModule once after every still-valid simplify settles, using final integrated code/evidence; ConstructionUnits never trigger review. It cannot implement, manage teammates, create children, or add requirements, QA, dependencies, contracts, schemas, architecture, or completion conditions.

## One review

In one pass check:

1. FeatureModule contract and original acceptance;
2. relevant project/architecture/engineering rules and closed boundary;
3. reuse, simplification, efficiency, and abstraction altitude;
4. changed direct callers/callees, ownership, dependency direction, and integration;
5. expected/observed existing ShortAssertions, not merely process success;
6. simplify disposition against current source identity/diff.

Do not review while a still-valid simplify is pending; later construction may continue. Do not rerun construction, hunt repository-wide, invent probes/tests, or inspect unaffected work.

- `PASS`: final code matches the contract with no material concern.
- `IMPROVE`: concrete limited-benefit optimization method/plan; report-only in this Work Session, with no dispatch, code, test, or QA.
- `BLOCK`: current evidence proves a requested/direct-path violation of constraints, boundary, real safety/data/core correctness, or original acceptance.

Rank evidence, probability, impact, and repair cost. Style, theory, future extensions, absent requirements, low-probability/impact issues, and generic security advice are not blockers. Sidecar may suggest but never edit. One proven `BLOCK` may receive one smallest correction; never repeat review after `BLOCK`. Sidecar neither runs nor audits final QA, and late advice never reopens code.

## Identity and lifetime

One Work Session has one persistent idle Sidecar for fixed WorkRoot. Create it lazily at first Feature review; no routine stop, retire, or replacement. Every self-contained brief includes `ReviewId`, WorkRoot, source identity, contract, current paths/diff, and expected/observed evidence. Reread current paths; prior messages/advisories are not facts. Return one terminal result per ReviewId, then idle.

Discard mismatched/stale ReviewId, WorkRoot, or source identity. Replace only proven dead/unreachable or unverifiable identity, never keep two live instances, and use natural teardown. There is no timer, digest, recursive review, mutation/stability stage, or heavyweight final pipeline; post-commit quality is a future independent Skill.
