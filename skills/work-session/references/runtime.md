# Runtime contract

## Truth and recovery

Task sources and accepted amendments own intent; code/tests are implementation evidence; `.work-session/state.md` owns only current construction/recovery state and the latest validation pointers. It never owns method history or replaces task sources, code, ADRs, changelogs, release history, or durable contracts.

After activation, App-session resume, or compaction, reread once: applicable project `AGENTS.override.md`/`AGENTS.md` chain inside `WorkRoot`; current state Snapshot; task sources; relevant code/diff. Incomplete state with `Status: active` or `Status: waiting-user` carries the activating user's authorization for its accepted Outcome and AcceptanceObject across later turns, resume, compaction, interruption, and host-session replacement; none requires another Work Session command or repeated approval. Then trust that state for routine dispatch and result acceptance. Recompare identities only before Candidate freeze and delivery, or when an execution unit reports a conflict or observed drift. If unchanged, do not reinject content; on drift reread changed objects and stale only affected work. User-level instructions remain host-authoritative but are excluded from repository-portable identity.

The activating user has already prepared the plan and task source. Verify nothing beyond what this contract names, and never re-derive a finished handoff.

## State

The persistent scoped-writable State Keeper App session alone writes the state file and exact managed blocks. Before every mutation it compares the exact current `Revision` and `ActiveSession` with its dispatch base; before accepting an execution-unit result it also requires the current Session/StateRevision. A mismatch returns one concrete `CONFLICT` and cannot advance state. It mechanically verifies identity, owned-path scope, and required check pointers; it never judges quality or test meaning, decides `PASS`/`BLOCK`, or becomes another gate. Subagent claims never advance state.

State writes are transport, never a construction critical path: the Leader keeps dispatching independent work while an update is pending. `CONFLICT` retries only that state write after rereading current state; it never cancels or blocks in-flight construction. Return `UPDATED R<n>` or one concrete `CONFLICT`.

For every successful mutation, write the complete next state to a sibling temporary file, close it, then atomically replace `.work-session/state.md`; never modify the canonical file in place. Rewrite only when current truth changes — accepted WorkItem, active/waiting transition, Candidate/gate state, or completion — never per edit, report, `no-change`, stale/rejected result, advisory, retry, or execution-unit chatter.

```markdown
# Work Session State
Schema: work-session.state/1
Status: active | waiting-user | completed
Revision: R<n>
WorkRoot: <. or repository-relative locator from .work-session>
ActiveSession: <session identity | none>
TaskSources: <locators or .work-session/state.md#Task Source>
SourceRevision: <identity>
InstructionRevision: <identity>
CurrentCandidate: <CandidateToken | none>

## Task Source
<inline canonical brief only; otherwise omit>

## Current Snapshot
Outcome: <short target/locator>
AcceptedScope: <compact accepted scope or none>
Current: <current work only or none>
Next: <one action or unresolved user choice or none>
Quality: <current simplify/SidecarCheck/review/QA state only>
Checks: <latest required expected/observed pointers; no raw log>
```

A completed state replaces `Current Snapshot` with a compact `Terminal Snapshot` containing only `Outcome`, `Delivered`, `Checks`, and `Remaining`. Superseded methods, resolved blockers, expired sessions, old Candidates, stale/rejected results, retries, timestamps, execution-unit output, stdout/stderr, review text, and event history never remain in the file.

An existing `work-session.state/1` file with `Evidence Ledger` is a legacy layout, not a new schema. On its next successful mutation, preserve the header, inline Task Source, current Snapshot truth, and latest required check pointers, then atomically rewrite it to this compact layout without a migration prompt or copied history. Unsupported/missing schema enters `waiting-user` for explicit migrate/preserve/relocate choice. Atomic replacement leaves either the old or new complete file. For a pre-existing malformed file, recover current truth from managed task locators, task sources, and code/diff when unambiguous; enter `waiting-user` only when accepted intent cannot be recovered.

Otherwise `waiting-user` is reserved for one concrete decision the Leader cannot own: conflicting or ambiguous task intent, scope/protected-path expansion, an unavailable required permission or credential, an irreversible or outward-facing action not already explicit in the accepted task, or genuinely impossible acceptance. It is never used for interruption, takeover, a missing repeated invocation, an implementation defect, review/QA failure, state-write conflict, or retry count.

Resolve stored WorkRoot to an absolute runtime root. A completed state moved with its repository may start a new session. Never edit `.gitignore`; report when it excludes the state file.

### Lifecycle

A new logical session mints one `SessionId`, stores it as `ActiveSession`, and atomically writes current state. App-session restoration continues that SessionId directly. Any later host that finds incomplete state continues the already-authorized lifecycle automatically: before dispatch, its replacement Keeper conditionally claims the exact current `Revision` and `ActiveSession`, mints the new SessionId, and atomically rewrites current state. Exact-base mismatch permits only one racing claim to succeed; every loser returns `CONFLICT` and becomes inactive without asking the user. A completed claim stales the old Keeper and all old-session results. Never allow two current Keeper claims. If `ActiveSession = none` inside incomplete already-authorized state, start directly; completed state requires a new explicit activation for a new task.

Completion atomically writes `Status: completed`, clears `ActiveSession`, retains only the compact Terminal Snapshot, removes exact managed blocks, and keeps the state file. Interruption retains incomplete state, durable authorization, and both blocks. `waiting-user` keeps the active lifecycle; an ordinary user answer resumes without another Work Session command, and independent work continues meanwhile.

## Identity and ownership

- `SourceRevision`: source locators plus their host-native revision; dirty or inline sources use the host's own diff or content identity.
- `InstructionRevision`: applicable WorkRoot instruction paths plus their host-native revision, excluding exact managed blocks; user home/host config excluded.
- `WorkItemToken`: SourceRevision + InstructionRevision + closed owned paths + base repository revision.
- `CandidateToken`: accepted WorkItemTokens + current repository revision.
- `RunnableTargetIdentity`: CandidateToken + exact project-native artifact/process/deployment identity after required build/integration and any already-authorized deploy/run readiness check.
- `ConsultIdentity`: WorkRoot + SourceRevision + current WorkItemToken/CandidateToken + question ID.

Identity uses host-native revisions and diffs only. Never build per-file digests, checksums, content records, or any parallel identity store. Identity that costs more than a few native lookups is a defect, not diligence.

One writer owns each path. Only overlapping accepted writes or source/instruction/contract drift stale affected in-flight work; disjoint acceptance does not. Reject identity mismatch, out-of-scope edits, cancellation, dead work, and any result whose Session/StateRevision predates the current takeover. Any Candidate-content change creates a new CandidateToken.

## Brief and result

Every fresh context-free execution unit rereads its listed project instructions/files. Briefs contain no parent turns or secret:

```text
WORK ITEM
Mode: construct | integrate | correct | simplify | review | test
WorkRoot / TaskSources: <absolute runtime root; locators>
InstructionPaths: <applicable WorkRoot project instructions>
Session / StateRevision: <identity>
SourceRevision / InstructionRevision: <identities>
WorkItemToken | CandidateToken: <stage identity>
RunnableTargetIdentity: <test mode only; exact runnable candidate-derived target or none>
Goal / RelevantConstraints: <bounded result and rules>
CurrentMethod / KnownFailures: <current only>
AllowedScope / Protected: <closed paths>
RelevantPaths / ExistingChecks: <must read/run>
AcceptanceObject: <source-owned locator; never narrowed>
QualityIDs: <Q-WRITE/Q-SIMPLIFY/Q-REVIEW/Q-QA>
DoNotAdd: <requirements/dependencies/tests/schemas/conditions>
```

Return one envelope, not files/logs:

```text
Status: complete | blocked | stale
Identity: <dispatch/current match>
Changes: <paths/purpose or none>
Contracts: <none | update:path | create:path, with reason>
Checks: <command/assertion; expected/observed>
Risks: <risk, concrete Sidecar question, or none>
Next: <one action or none>
```

## SidecarCheck

Triggers: unresolved architecture/ownership/dependency direction, reuse/local-pattern uncertainty, canonical-contract conflict, identity ambiguity, or cross-component integration uncertainty. Leader first writes one answerable question. Consultation may begin whenever triggered; settlement is only the deadline.

Record `SidecarCheck` only when a consultation actually occurs: `pending:Q<n>` when asked and `answered:Q<n>/<ConsultIdentity>` when returned. There is no per-unit checklist and no `not_needed` bookkeeping; silence means no question arose. Before Candidate freeze, Keeper verifies only that no `pending` consultation remains and that returned memo identity matches.

Keep at most one live Sidecar per uninterrupted session/root; reuse it with self-contained identities and replace only after proven liveness/identity failure. After interruption, treat it as not live without probing and launch fresh only on the next real question. Discard mismatched advice. A late memo overturns settled work only when it names a material defect, and then becomes one bounded correction; otherwise it is advisory and accumulates.

## Gate order

Apply `quality.md` only: `Q-WRITE` → one `Q-SIMPLIFY` per completed WorkItem → no pending consultation → `DevelopmentComplete` → Candidate freeze → dispatch advisory `Q-REVIEW` while establishing the final build/integration and any already-authorized deploy/run target → verify `RunnableTargetIdentity` and readiness → one final `Q-QA`. Q-QA never runs during construction or without a runnable target; review never gates delivery checks. State Keeper records only current gate state and the latest required check pointers; it adds no judgment.

Gates run at WorkItem and Candidate boundaries only. Never insert a gate, checklist, or state rewrite between individual edits inside one WorkItem; per-edit ceremony is the main way this contract fails in practice.

## No secrets

`WorkSessionArtifacts` are managed blocks, state, Task/execution-unit briefs/results, Sidecar memos, review/QA reports, and maintenance docs written by the session. Passwords, tokens, private keys, cookies, `.env` contents, and secret-bearing output never enter them. A relevant brief may name only a host-owned credential alias, least-privilege purpose, and permission boundary; keep no credential registry. Values stay at the host/tool boundary. Accidental output leaves source/location only—never value, hash, or length. If existing task/instruction content has a secret, stop propagation and report it; never silently edit user content. Unavailable mandatory QA/release checks are not `SKIPPED` or success.

