# Work Session bootstrap contract

The globally registered Work Session hooks are inert except for an exact manual `/work-session` activation and its exact bootstrap helper command. They never make the Skill model-invocable.

`UserPromptSubmit` supplies one trusted `WORK_SESSION_BOOTSTRAP/v1` capsule bound to the current `session_id`, canonical WorkRoot, host, nonce, and read-only preflight. It either:

- reports `READY` and injects the installed ponytail and i-have-adhd Skill bodies once for this session; or
- reports `CONFIRMATION_REQUIRED`, the complete mutation/network plan, and one exact helper command.

For `CONFIRMATION_REQUIRED`, run only the capsule command. The `PreToolUse` hook must return `ask`; one host permission confirmation covers the listed helper actions. Never substitute raw plugin, curl, git, config-edit, or install commands. If permission is denied, the command does not run: record that both optional modes were skipped and continue Work Session without changing state.

The helper rechecks plan identity before applying. Claude installs/enables only at project scope while user `skillOverrides`/plugin enablement remain off. A successful helper result contains both stripped rulesets; apply them for the rest of this session. Project dependency enablement may remain for later sessions and third-party hooks may then behave normally.

A missing capsule means the user hook was not loaded. Do not download or change configuration. Explain that a new Claude session is required after hook publication, then continue only if the user accepts skipping the two optional modes.
