# Launch text

Invoke explicitly:

```text
/work-session
```

Then provide the current construction inputs:

```text
目标：<最终可观察结果>
项目：<绝对项目根>
项目约束：<现有规范或来源>
架构规范：<边界、接口、依赖方向、不变量或来源>
工程细节：<已有接口、调用路径、依赖、约定和施工前必须知道的事实>
允许范围：<本次可修改的封闭范围>
短测：<施工完成时运行；仅实际整合 simplify 改动后重跑的现有小检查>
短测断言：<期望输出、状态、副作用、错误/警告或直接观察；不能只写“命令成功”>
最终验收：<严格完成条件>
QA 对象：<设计任务时确定的场景、命令、观察或产物>
非目标：<不做的扩展、测试和防御性工作>
```

The host harness chooses models, effort, execution-unit identities, tools, and dispatch. Work Session requires only the stated capabilities and lifecycle: narrow read-only retrieval when needed, scoped writable construction, fresh independent simplify/review/final QA, and one persistent independent read-only Sidecar. No custom Agent template is required.

Optional local tuning may localize this Skill or provide user-owned Agent templates. Prefer a strong-capability model for the long-running Leader and a reasonably capable, cost-appropriate model for bounded construction; these are non-binding recommendations and never override the harness. Project `CLAUDE.md` carries persistent rules and each brief includes only the relevant self-contained contract.
