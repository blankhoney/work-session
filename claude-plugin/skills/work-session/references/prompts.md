# Launch text

Invoke explicitly:

```text
/i-have-adhd
/ponytail full
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

Leader uses the fixed user-level Worker Agents by type; do not paste or override their model/effort prompts. Retrieval is Luna xhigh, construction/correction is Sol low, fresh simplify/review/final-QA workers are Sol high, and the one named persistent Sidecar Mate is Sol high. Project `CLAUDE.md` carries persistent rules and each brief includes only the relevant self-contained contract.
