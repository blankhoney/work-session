<p align="center">
  <img src="assets/work-session-title.png" width="460" alt="A hand shaking its own shadow, with bandages binding them together">
</p>

<h1 align="center">Work Session</h1>

<p align="center"><strong>Keep long coding tasks coherent from the first change to final verification.</strong></p>

<p align="center">
  <strong>English</strong> · <a href="README.zh-CN.md">简体中文</a>
</p>

Work Session is an explicit orchestration Skill for Claude Code and OpenAI Codex. A long-running Leader coordinates focused workers, keeps concurrent changes within clear boundaries, brings in independent review, and finishes against the acceptance checks you started with.

## Why Work Session?

- **Stay coherent over long runs** — one Leader carries the task from decomposition through integration and completion.
- **Parallelize without chaos** — independent work can move concurrently while each path keeps a single writer.
- **Review with fresh eyes** — simplification, independent read-only review, and final QA are separated from construction context.
- **Stay in control** — Work Session runs only when you explicitly invoke it.

## How it works

**Understand → Build → Simplify & review → Verify**

Work Session reads the task sources and checks you already have, divides the implementation into bounded pieces, coordinates safe parallel progress, then closes with an independent review and the original final acceptance check. It does not invent new requirements or replace your definition of done.

## Quick Start

### Claude Code

Add the marketplace and install the Skill:

```text
/plugin marketplace add blankhoney/work-session
/plugin install work-session@work-session
```

Invoke it explicitly:

```text
/work-session:work-session
```

### Codex

Add the marketplace and install the Skill:

```bash
codex plugin marketplace add blankhoney/work-session
codex plugin add work-session@work-session
```

Invoke it explicitly:

```text
$work-session
```

Then describe the task and point to any existing PRD, design, or QA files:

```text
Implement the checkout retry feature described in docs/checkout-retries.md.
Use docs/checkout-retries-qa.md as the final acceptance check.
```

## Best for

- Features or refactors that span multiple files and stages
- Tasks with an existing PRD, design, test plan, or acceptance checklist
- Work that benefits from bounded parallel execution
- Changes that deserve an independent final review and exact QA pass

For a typo or a tiny one-file edit, the normal coding flow is usually enough.

## Platforms

| Platform | Explicit invocation |
| --- | --- |
| Claude Code | `/work-session:work-session` |
| OpenAI Codex | `$work-session` |

## License

[0BSD](LICENSE) — use, copy, modify, and distribute for any purpose, with no attribution requirement.
