# Work Session dual-target maintenance

This repository maintains two platform-specific Work Session Skills:

- Claude source: `.claude/skills/work-session/`
- Codex source: `skills/work-session/`

Every semantic Work Session change updates both source trees in the same task. Preserve equivalent contracts rather than byte-copying platform adapters: Claude uses `CLAUDE.md` and discoverable Claude Skills; Codex uses `AGENTS.md`, context-free execution units, and one persistent App State Keeper session.

Initial activation stays explicit-only: Claude keeps `disable-model-invocation: true`, and Codex keeps `agents/openai.yaml` with `allow_implicit_invocation: false`. An incomplete active ledger is durable prior authorization for recovery and continuation; it must not require another Work Session command. Both runtime packages remain free of hooks, scripts, executables, bootstrap helpers, preflight, automatic companion management, per-file digests, checksums, and parallel identity stores.

Worker selection is host-owned. Work Session specifies role capabilities, permissions, scope, isolation, context, and lifetime; the Claude Code/Codex host selects models, effort, identities/types, tools, concurrency, and dispatch. The public sources require no user-level Agent template, Codex type registration, alias, route table, or model verification gate.

Do not recreate a Work Session verifier, harness, scorer, protocol, fixture suite, generated benchmark wrapper, matrix, freeze, synthetic smoke, or evidence program. Work Session behavior is evaluated only from a real explicitly invoked Work Session on a genuine task by inspecting its actual trajectory/context: time to construction, autonomous recovery, absence of repeated authorization, absence of identity-matrix detours, and absence of fixed-count review/QA self-termination.

Project instructions may receive only one minimal managed Work Session recovery pointer plus the locator-only task block. The pointer contains no task, implementation, progress, phase, or quality-plan truth. Never copy the full Skill, state contract, quality rules, review prompt, PRD, design, or acceptance content into `CLAUDE.md` or `AGENTS.md`.

Repository source changes do not imply editing personal Skills, Agents, templates, settings, registrations, Git history, or remotes. Machine-local installation, commit, and push each require an explicit user request.
