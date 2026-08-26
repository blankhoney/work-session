<p align="center">
  <img src="assets/work-session-logo.svg" width="240" alt="A hand shaking its own shadow, with bandages binding them together">
</p>

<h1 align="center">Work Session Skill</h1>

Prompt-only Work Session orchestration for Claude Code and OpenAI Codex.

The two variants preserve the same workflow contract while using each platform's native instruction and worker surfaces. This repository contains no hooks, executables, install scripts, evaluation logs, harnesses, or generated reports.

## Layout

```text
.claude-plugin/marketplace.json       Claude marketplace
claude-plugin/                        Claude Skill-only plugin
  .claude-plugin/plugin.json
  skills/work-session/
.agents/plugins/marketplace.json      Codex marketplace
codex-plugin/                         Codex Skill-only plugin
  .codex-plugin/plugin.json
  skills/work-session/
LICENSE
```

## Claude Code installation

After this repository is published to GitHub:

```text
/plugin marketplace add blankhoney/work-session
/plugin install work-session@work-session
```

Invoke explicitly:

```text
/work-session:work-session
```

The Claude Skill remains explicit-only through `disable-model-invocation: true`.

Validate or test a local clone:

```bash
claude plugin validate --strict .claude-plugin/marketplace.json
claude plugin validate --strict claude-plugin
claude --plugin-dir ./claude-plugin
```

## Codex installation

After this repository is published to GitHub:

```bash
codex plugin marketplace add blankhoney/work-session
codex plugin add work-session@work-session
```

Invoke explicitly:

```text
$work-session
```

The Codex Skill remains explicit-only through `agents/openai.yaml` with `allow_implicit_invocation: false`.

Codex's bundled `$skill-installer` can also install only the Skill directory:

```text
Use $skill-installer to install https://github.com/blankhoney/work-session/tree/main/codex-plugin/skills/work-session
```

## Distribution boundary

Only these runtime packages are installable:

- `claude-plugin/`
- `codex-plugin/`

PRDs, project history, logs, evaluation fixtures, test harnesses, local settings, and generated artifacts do not belong in this repository.

## License

[0BSD](LICENSE) — use, copy, modify, and distribute for any purpose, with no attribution requirement.
