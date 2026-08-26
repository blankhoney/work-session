<p align="center">
  <img src="assets/work-session-title.png" width="460" alt="A hand shaking its own shadow, with bandages binding them together">
</p>

<h1 align="center">Work Session</h1>

<p align="center"><strong>让长期编码任务从第一处改动到最终验收始终保持连贯。</strong></p>

<p align="center">
  <a href="README.md">English</a> · <strong>简体中文</strong>
</p>

Work Session 是面向 Claude Code 和 OpenAI Codex 的显式编排 Skill。一个长期运行的 Leader 会协调边界清晰的执行者，管理安全的并行修改，引入独立审查，并以任务原有的验收标准完成收口。

## 为什么使用 Work Session？

- **长任务不失去主线** — 由同一个 Leader 持续负责拆分、集成与完成。
- **并行但不混乱** — 相互独立的工作可以同时推进，同一路径始终只保留一个写入者。
- **用新鲜视角把关** — 简化、独立只读审查和最终 QA 与施工上下文分离。
- **始终由你控制** — 只有显式调用时，Work Session 才会运行。

## 工作方式

**理解 → 施工 → 简化与审查 → 验收**

Work Session 会读取你已经提供的任务来源和检查标准，把实现拆成边界明确的工作，协调安全的并行推进，最后通过独立审查和原始验收完成收口。它不会自行发明新需求，也不会替换你的完成标准。

## 快速开始

### Claude Code

添加 Marketplace 并安装 Skill：

```text
/plugin marketplace add blankhoney/work-session
/plugin install work-session@work-session
```

显式调用：

```text
/work-session:work-session
```

### Codex

添加 Marketplace 并安装 Skill：

```bash
codex plugin marketplace add blankhoney/work-session
codex plugin add work-session@work-session
```

显式调用：

```text
$work-session
```

然后描述任务，并附上已有的 PRD、设计或 QA 文件路径：

```text
实现 docs/checkout-retries.md 中描述的结账重试功能。
使用 docs/checkout-retries-qa.md 作为最终验收标准。
```

## 适合场景

- 跨多个文件和阶段的功能开发或重构
- 已有 PRD、设计、测试计划或验收清单的任务
- 适合拆成明确边界并行推进的工作
- 需要独立最终审查和精确 QA 的改动

如果只是修正错别字或完成很小的单文件改动，普通编码流程通常已经足够。

## 支持平台

| 平台 | 显式调用方式 |
| --- | --- |
| Claude Code | `/work-session:work-session` |
| OpenAI Codex | `$work-session` |

## 许可证

[0BSD](LICENSE) — 可为任何目的使用、复制、修改和分发，无需署名。
