# Stop That Shit provenance

This project-local source vendors the runtime and canonical shared Skill for
[Stop That Shit](https://github.com/lennney/stop-that-shit).

- Upstream repository: <https://github.com/lennney/stop-that-shit>
- Version tag: [0.0.3](https://github.com/lennney/stop-that-shit/tree/0.0.3)
- Exact upstream commit: [3c18188dca1716a696e4b0a5752cea7781c72f0e](https://github.com/lennney/stop-that-shit/commit/3c18188dca1716a696e4b0a5752cea7781c72f0e)
- Retrieved: 2026-08-15
- License: MIT. The unmodified upstream text is in [LICENSE](LICENSE).

## Vendored files

- `.agents/plugins/marketplace.json`
- `.codex-plugin/plugin.json`
- `assets/stop-icon.svg`
- `hooks/hooks.json`
- `hooks/stop-that-shit.cjs`
- `package.json` (runtime version metadata; no runtime npm dependencies)
- `src/adapters/codex-hooks.cjs`
- `src/adapters/codex-tool-classifier.cjs`
- `src/contracts.cjs`
- `src/control-protocol.cjs`
- `src/controller.cjs`
- `src/decision.cjs`
- `src/hook-policy.cjs`
- `src/runtime-annotations.cjs`
- `src/runtime-audit.cjs`
- `src/runtime-storage.cjs`
- `src/state.cjs`
- `.agents/skills/stop-that-shit/SKILL.md`
- `.agents/skills/stop-that-shit/agents/openai.yaml`
- `LICENSE`

## Local layout and activation

`.agents/skills/stop-that-shit/` is the single copied Skill body. The
`skills/stop-that-shit` relative symlink satisfies the upstream Codex plugin
manifest without duplicating that body. Claude is not given an independent
`stop-that-shit` Skill entry. The Claude work-session entry uses the supporting
symlink `~/.claude/skills/work-session-lead/references/stop-that-shit.md` to this
canonical body; it is progressive disclosure, not another Skill entry. No Claude
Code Guard, hook adapter, or `.claude/settings.json` is included because
upstream 0.0.3 officially implements Codex only.

The plugin manifest, hooks, and runtime retain the upstream root-relative
layout so this project can be used as a local Codex plugin source. Activation
is intentionally not automatic. It still requires explicit local-source
marketplace/plugin commands and the user's Codex Hook trust review (normally
via `/hooks`); `codex plugin marketplace add` and `codex plugin add` were not
run. This round did not change the active Codex Guard source or configuration,
or touch existing peers, sessions, settings, or wrappers.
