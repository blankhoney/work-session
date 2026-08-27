<h1 align="center">Work Session</h1>

<p align="center"><strong>One Lead. Bounded builders. Independent review. Original QA.</strong></p>

<p align="center">
  <strong>English</strong> · <a href="README.zh-CN.md">简体中文</a>
</p>

Work Session is a long-task orchestration Skill for Claude Code and Codex. A persistent Lead keeps the original goal in view while focused workers build, simplify, review, and verify the result.

It is meant for substantial implementation—not a typo or a tiny one-file edit.

## Why Work Session?

- **Stay aligned across a long task** — one Lead keeps the requirements, design, code, and acceptance criteria connected from start to finish.
- **Parallelize without collisions** — bounded work can run concurrently, while each path keeps a single writer.
- **Separate construction from judgment** — fresh simplification, an independent read-only Sidecar, and fresh final QA do not grade their own work.
- **Run only when asked** — Work Session is explicit-only on both platforms.

## Quick Start

### Claude Code

```text
/plugin marketplace add blankhoney/work-session
/plugin install work-session@work-session
```

Start a new session, then invoke the Skill explicitly:

```text
/work-session:work-session
```

### Codex

```bash
codex plugin marketplace add blankhoney/work-session
codex plugin add work-session@work-session
```

Start a new session, then invoke the Skill explicitly:

```text
$work-session
```

Point it to the task sources you already have:

```text
Implement the checkout retry feature in docs/checkout-retries.md.
Follow docs/architecture.md and use docs/checkout-retries.feature for final acceptance.
```

## How it works

<p align="center">
  <img src="assets/work-session-flow.svg" width="1100" alt="Four-step Work Session workflow: understand and split, build bounded units in parallel, simplify and review independently, then run the original QA and deliver">
</p>

### 1. Understand and split

The Lead reads the task sources, current code, project rules, and original QA. It turns the goal into coherent, directly checkable units without inventing new requirements.

### 2. Build without collisions

Focused workers implement bounded units. Non-overlapping work may run in parallel, but each path always has one writer and the Lead owns integration.

### 3. Simplify and review independently

A fresh, exact-scope simplifier cleans up each completed unit while other safe work continues. After integration, an independent read-only Sidecar reviews the current result once.

### 4. Verify the original goal

A fresh tester runs the original acceptance object. Only evidence-backed failures receive a bounded repair; the Lead then closes the session with the observed result.

## Optional Companion Skills

- **[`ponytail`](https://github.com/DietrichGebert/ponytail)** can reinforce the smallest implementation that actually works and resist speculative complexity.
- **[`i-have-adhd`](https://github.com/ayghri/i-have-adhd)** can keep progress, blockers, and next actions short, direct, and easy to scan.

Both are optional and independently managed. Work Session does not check, install, configure, enable, or invoke them.

## Best for

- Features or refactors spanning multiple files and stages
- Work backed by requirements, design, architecture rules, or explicit acceptance criteria
- Tasks that benefit from bounded parallel construction and continuous coordination
- Changes that need independent review and final verification against the original goal

For a routine change of a few dozen lines, the normal coding flow is usually enough.

## Platforms

| Platform | Explicit invocation |
| --- | --- |
| Claude Code | `/work-session:work-session` |
| Codex | `$work-session` |

## License

[0BSD](LICENSE) — use, copy, modify, and distribute for any purpose, with no attribution requirement.
