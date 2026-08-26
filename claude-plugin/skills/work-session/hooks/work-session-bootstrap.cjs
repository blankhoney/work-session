#!/usr/bin/env node
'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const VERSION = 1;
const PLUGINS = [
  {
    name: 'ponytail',
    id: 'ponytail@ponytail',
    marketplace: 'ponytail',
    repo: 'DietrichGebert/ponytail',
    codexRef: null,
  },
  {
    name: 'i-have-adhd',
    id: 'i-have-adhd@i-have-adhd',
    marketplace: 'i-have-adhd',
    repo: 'ayghri/i-have-adhd',
    codexRef: 'main',
  },
];
const MAX_STATE_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const MAX_PLAN_AGE_MS = 30 * 60 * 1000;

function fail(message) {
  process.stderr.write(`Work Session bootstrap: ${message}\n`);
  process.exitCode = 1;
}

function parseArgs(argv) {
  const out = { mode: argv[2] || 'hook' };
  for (let i = 3; i < argv.length; i += 2) {
    const key = argv[i];
    if (!key || !key.startsWith('--') || i + 1 >= argv.length) break;
    out[key.slice(2)] = argv[i + 1];
  }
  return out;
}

function readStdin() {
  return new Promise((resolve) => {
    let body = '';
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      resolve(body);
    };
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => { body += chunk; });
    process.stdin.on('end', finish);
    process.stdin.on('error', finish);
    process.stdin.resume();
    setTimeout(finish, 1500).unref();
  });
}

function safeJson(text, fallback = null) {
  try { return JSON.parse(String(text || '').replace(/^﻿/, '')); } catch { return fallback; }
}

function sha(value) {
  return crypto.createHash('sha256').update(String(value)).digest('hex');
}

function stateRoot() {
  return process.env.WORK_SESSION_BOOTSTRAP_STATE_DIR
    || path.join(os.tmpdir(), `work-session-bootstrap-${process.getuid?.() ?? 'user'}`);
}

function validateSessionId(sessionId) {
  if (!/^[A-Za-z0-9._:-]{1,200}$/.test(sessionId)) throw new Error('invalid session_id');
  return sessionId;
}

function statePath(sessionId) {
  return path.join(stateRoot(), `${sha(validateSessionId(sessionId))}.json`);
}

function ensureStateRoot() {
  fs.mkdirSync(stateRoot(), { recursive: true, mode: 0o700 });
  try { fs.chmodSync(stateRoot(), 0o700); } catch {}
}

function cleanOldState() {
  let names = [];
  try { names = fs.readdirSync(stateRoot()); } catch { return; }
  const now = Date.now();
  for (const name of names) {
    if (!/^[a-f0-9]{64}\.json$/.test(name)) continue;
    const target = path.join(stateRoot(), name);
    try {
      if (now - fs.statSync(target).mtimeMs > MAX_STATE_AGE_MS) fs.unlinkSync(target);
    } catch {}
  }
}

function atomicWrite(target, data, mode = 0o600) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const tmp = path.join(path.dirname(target), `.${path.basename(target)}.${process.pid}.${crypto.randomBytes(4).toString('hex')}`);
  fs.writeFileSync(tmp, data, { encoding: 'utf8', mode });
  fs.renameSync(tmp, target);
  try { fs.chmodSync(target, mode); } catch {}
}

function writeState(state) {
  ensureStateRoot();
  atomicWrite(statePath(state.sessionId), `${JSON.stringify(state, null, 2)}\n`);
}

function readState(sessionId) {
  return safeJson(fs.readFileSync(statePath(sessionId), 'utf8'));
}

function canonicalRoot(value) {
  if (!value || !path.isAbsolute(value)) throw new Error('WorkRoot must be absolute');
  const resolved = path.resolve(value);
  return fs.realpathSync(resolved);
}

function exactInvocation(host, prompt) {
  const value = String(prompt || '').trim();
  return host === 'claude'
    ? /^\/work-session(?:\s+[^\r\n]*)?$/.test(value)
    : /^\$work-session(?:\s+[^\r\n]*)?$/.test(value);
}

function run(bin, args, cwd, options = {}) {
  const result = spawnSync(bin, args, {
    cwd,
    env: process.env,
    encoding: 'utf8',
    timeout: options.timeout || 120000,
    maxBuffer: 8 * 1024 * 1024,
  });
  if (result.error || result.status !== 0) {
    const detail = (result.stderr || result.stdout || result.error?.message || 'unknown failure').trim();
    throw new Error(`${path.basename(bin)} ${args.join(' ')} failed: ${detail}`);
  }
  return result.stdout;
}

function hostBin(host) {
  return host === 'claude'
    ? (process.env.WORK_SESSION_CLAUDE_BIN || 'claude')
    : (process.env.WORK_SESSION_CODEX_BIN || 'codex');
}

function homeDir() {
  return process.env.HOME || os.homedir();
}

function claudeDir() {
  return process.env.CLAUDE_CONFIG_DIR || path.join(homeDir(), '.claude');
}

function codexDir() {
  return process.env.CODEX_HOME || path.join(homeDir(), '.codex');
}

function readJsonFile(target, fallback = {}) {
  try {
    const parsed = safeJson(fs.readFileSync(target, 'utf8'));
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : fallback;
  } catch { return fallback; }
}

function writeJsonFile(target, value) {
  atomicWrite(target, `${JSON.stringify(value, null, 2)}\n`);
  JSON.parse(fs.readFileSync(target, 'utf8'));
}

function updateClaudeSettings(target, scope) {
  const settings = readJsonFile(target, {});
  settings.enabledPlugins = settings.enabledPlugins && typeof settings.enabledPlugins === 'object'
    ? settings.enabledPlugins : {};
  settings.skillOverrides = settings.skillOverrides && typeof settings.skillOverrides === 'object'
    ? settings.skillOverrides : {};
  for (const plugin of PLUGINS) {
    settings.enabledPlugins[plugin.id] = scope === 'project';
    settings.skillOverrides[plugin.name] = scope === 'project' ? 'on' : 'off';
  }
  writeJsonFile(target, settings);
}

function tomlSectionBounds(lines, section) {
  const header = `[${section}]`;
  const start = lines.findIndex((line) => line.trim() === header);
  if (start < 0) return null;
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i += 1) {
    if (/^\s*\[/.test(lines[i])) { end = i; break; }
  }
  return { start, end };
}

function setTomlBool(text, section, key, value) {
  const trailing = String(text || '').endsWith('\n');
  const lines = String(text || '').split(/\r?\n/);
  if (trailing) lines.pop();
  const rendered = `${key} = ${value ? 'true' : 'false'}`;
  const bounds = tomlSectionBounds(lines, section);
  if (!bounds) {
    if (lines.length && lines[lines.length - 1].trim()) lines.push('');
    lines.push(`[${section}]`, rendered);
  } else {
    let found = -1;
    const pattern = new RegExp(`^\\s*${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*=`);
    for (let i = bounds.start + 1; i < bounds.end; i += 1) {
      if (pattern.test(lines[i])) { found = i; break; }
    }
    if (found >= 0) lines[found] = rendered;
    else lines.splice(bounds.end, 0, rendered);
  }
  return `${lines.join('\n')}\n`;
}

function setTomlString(text, section, key, value) {
  const trailing = String(text || '').endsWith('\n');
  const lines = String(text || '').split(/\r?\n/);
  if (trailing) lines.pop();
  const escaped = String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  const rendered = `${key} = "${escaped}"`;
  const bounds = tomlSectionBounds(lines, section);
  if (!bounds) {
    if (lines.length && lines[lines.length - 1].trim()) lines.push('');
    lines.push(`[${section}]`, rendered);
  } else {
    const pattern = new RegExp(`^\\s*${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*=`);
    let found = -1;
    for (let i = bounds.start + 1; i < bounds.end; i += 1) {
      if (pattern.test(lines[i])) { found = i; break; }
    }
    if (found >= 0) lines[found] = rendered;
    else lines.splice(bounds.end, 0, rendered);
  }
  return `${lines.join('\n')}\n`;
}

function tomlBool(text, section, key) {
  const lines = String(text || '').split(/\r?\n/);
  const bounds = tomlSectionBounds(lines, section);
  if (!bounds) return null;
  const pattern = new RegExp(`^\\s*${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*=\\s*(true|false)\\s*(?:#.*)?$`);
  for (let i = bounds.start + 1; i < bounds.end; i += 1) {
    const match = lines[i].match(pattern);
    if (match) return match[1] === 'true';
  }
  return null;
}

function tomlString(text, section, key) {
  const lines = String(text || '').split(/\r?\n/);
  const bounds = tomlSectionBounds(lines, section);
  if (!bounds) return null;
  const pattern = new RegExp(`^\\s*${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*=\\s*"([^"]*)"\\s*(?:#.*)?$`);
  for (let i = bounds.start + 1; i < bounds.end; i += 1) {
    const match = lines[i].match(pattern);
    if (match) return match[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  }
  return null;
}

function updateCodexPluginConfig(target, enabled) {
  let text = '';
  try { text = fs.readFileSync(target, 'utf8'); } catch {}
  for (const plugin of PLUGINS) {
    text = setTomlBool(text, `plugins."${plugin.id}"`, 'enabled', enabled);
  }
  atomicWrite(target, text);
}

function codexProjectSection(workRoot) {
  const escaped = workRoot.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  return `projects."${escaped}"`;
}

function updateCodexTrust(target, workRoot) {
  let text = '';
  try { text = fs.readFileSync(target, 'utf8'); } catch {}
  text = setTomlString(text, codexProjectSection(workRoot), 'trust_level', 'trusted');
  atomicWrite(target, text);
}

function stripFrontmatter(text) {
  return String(text).replace(/^---[^\S\r\n]*\r?\n[\s\S]*?\r?\n---[^\S\r\n]*(?:\r?\n|$)/, '').replace(/(?:\r?\n)+$/, '');
}

function walkForSkill(root, name, depth = 0) {
  if (!root || depth > 7) return null;
  let stat;
  try { stat = fs.lstatSync(root); } catch { return null; }
  if (stat.isSymbolicLink()) return null;
  if (stat.isFile()) return path.basename(root) === 'SKILL.md' ? root : null;
  if (!stat.isDirectory()) return null;
  const direct = path.join(root, 'skills', name, 'SKILL.md');
  if (fs.existsSync(direct)) return direct;
  let entries = [];
  try { entries = fs.readdirSync(root, { withFileTypes: true }); } catch { return null; }
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.isSymbolicLink()) continue;
    if (entry.name === 'node_modules' || entry.name.startsWith('.git')) continue;
    const found = walkForSkill(path.join(root, entry.name), name, depth + 1);
    if (found) return found;
  }
  return null;
}

function candidateSkillRoots(host, pluginEntry) {
  const roots = [];
  if (pluginEntry?.installPath) roots.push(pluginEntry.installPath);
  if (pluginEntry?.source?.path) roots.push(pluginEntry.source.path);
  if (pluginEntry?.marketplaceSource?.sourceType === 'local') roots.push(pluginEntry.marketplaceSource.source);
  if (host === 'claude') roots.push(path.join(claudeDir(), 'plugins', 'cache'));
  else roots.push(path.join(codexDir(), 'plugins', 'cache'));
  roots.push(path.join(homeDir(), '.agents', 'vendor'));
  return [...new Set(roots.map((root) => path.resolve(root)))];
}

function locateSkill(host, plugin, entry) {
  for (const root of candidateSkillRoots(host, entry)) {
    const found = walkForSkill(root, plugin.name);
    if (found) return fs.realpathSync(found);
  }
  return null;
}

function claudeInventory(workRoot) {
  const output = run(hostBin('claude'), ['plugin', 'list', '--available', '--json'], workRoot, { timeout: 30000 });
  const parsed = safeJson(output, {});
  if (Array.isArray(parsed)) return { installed: parsed, available: parsed };
  if (!Array.isArray(parsed.installed) || !Array.isArray(parsed.available)) {
    throw new Error('unexpected Claude plugin list JSON');
  }
  return parsed;
}

function codexInventory(workRoot) {
  const output = run(hostBin('codex'), ['-C', workRoot, 'plugin', 'list', '--available', '--json'], workRoot, { timeout: 30000 });
  const parsed = safeJson(output, {});
  if (!Array.isArray(parsed.installed) || !Array.isArray(parsed.available)) {
    throw new Error('unexpected Codex plugin list JSON');
  }
  return parsed;
}

function preflightClaude(workRoot) {
  const inventory = claudeInventory(workRoot);
  const userSettingsPath = path.join(claudeDir(), 'settings.json');
  const projectSettingsPath = path.join(workRoot, '.claude', 'settings.json');
  const userSettings = readJsonFile(userSettingsPath, {});
  const projectSettings = readJsonFile(projectSettingsPath, {});
  const actions = [];
  const skills = {};
  const details = {};
  const known = readJsonFile(path.join(claudeDir(), 'plugins', 'known_marketplaces.json'), {});

  for (const plugin of PLUGINS) {
    const entries = inventory.installed.filter((entry) => entry.id === plugin.id);
    const projectEntry = entries.find((entry) => {
      try { return entry.projectPath && canonicalRoot(entry.projectPath) === workRoot; } catch { return false; }
    });
    const anyEntry = entries[0] || inventory.available.find((entry) => (entry.id || entry.pluginId) === plugin.id);
    const userOff = userSettings.skillOverrides?.[plugin.name] === 'off'
      && userSettings.enabledPlugins?.[plugin.id] !== true;
    const projectOn = projectSettings.skillOverrides?.[plugin.name] === 'on'
      && projectSettings.enabledPlugins?.[plugin.id] === true;

    if (!userOff) actions.push({ type: 'claude-user-off', plugin: plugin.id });
    if (!known[plugin.marketplace]) actions.push({ type: 'claude-marketplace-add', plugin: plugin.id, repo: plugin.repo });
    if (!projectEntry) actions.push({ type: 'claude-project-install', plugin: plugin.id });
    else if (!projectEntry.enabled) actions.push({ type: 'claude-project-enable', plugin: plugin.id });
    if (!projectOn) actions.push({ type: 'claude-project-settings-on', plugin: plugin.id });

    skills[plugin.name] = locateSkill('claude', plugin, projectEntry || anyEntry);
    details[plugin.name] = { downloaded: Boolean(skills[plugin.name]), projectEnabled: Boolean(projectEntry?.enabled && projectOn), userOff };
  }
  return { host: 'claude', workRoot, actions, skills, details };
}

function preflightCodex(workRoot) {
  const inventory = codexInventory(workRoot);
  const userConfigPath = path.join(codexDir(), 'config.toml');
  const projectConfigPath = path.join(workRoot, '.codex', 'config.toml');
  let userConfig = '';
  let projectConfig = '';
  try { userConfig = fs.readFileSync(userConfigPath, 'utf8'); } catch {}
  try { projectConfig = fs.readFileSync(projectConfigPath, 'utf8'); } catch {}
  const actions = [];
  const skills = {};
  const details = {};
  const trusted = tomlString(userConfig, codexProjectSection(workRoot), 'trust_level') === 'trusted';
  if (!trusted) actions.push({ type: 'codex-project-trust', plugin: 'WorkRoot' });

  for (const plugin of PLUGINS) {
    const entry = inventory.installed.find((item) => item.pluginId === plugin.id);
    const available = inventory.available.find((item) => item.pluginId === plugin.id);
    const userOff = tomlBool(userConfig, `plugins."${plugin.id}"`, 'enabled') === false;
    const projectOn = tomlBool(projectConfig, `plugins."${plugin.id}"`, 'enabled') === true;
    const marketplacePresent = new RegExp(`^\\s*\\[marketplaces\\.${plugin.marketplace.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\]\\s*$`, 'm').test(userConfig)
      || Boolean(entry || available);

    if (!userOff) actions.push({ type: 'codex-user-off', plugin: plugin.id });
    if (!marketplacePresent) actions.push({ type: 'codex-marketplace-add', plugin: plugin.id, repo: plugin.repo, ref: plugin.codexRef });
    if (!entry) actions.push({ type: 'codex-plugin-add', plugin: plugin.id });
    if (!projectOn) actions.push({ type: 'codex-project-on', plugin: plugin.id });

    skills[plugin.name] = locateSkill('codex', plugin, entry || available);
    details[plugin.name] = { downloaded: Boolean(skills[plugin.name]), projectEnabled: Boolean(entry && projectOn), userOff };
  }
  return { host: 'codex', workRoot, actions, skills, details };
}

function preflight(host, workRoot) {
  return host === 'claude' ? preflightClaude(workRoot) : preflightCodex(workRoot);
}

function fingerprint(plan) {
  return sha(JSON.stringify({ host: plan.host, workRoot: plan.workRoot, actions: plan.actions }));
}

function renderActions(actions) {
  return actions.length
    ? actions.map((action, index) => `${index + 1}. ${action.type}: ${action.plugin}${action.repo ? ` (${action.repo})` : ''}`).join('\n')
    : 'none';
}

function quoteShell(value) {
  return `'${String(value).replace(/'/g, `'"'"'`)}'`;
}

function applyCommand(state) {
  return [
    'node', quoteShell(__filename), 'apply',
    '--host', quoteShell(state.host),
    '--session', quoteShell(state.sessionId),
    '--work-root', quoteShell(state.workRoot),
    '--nonce', quoteShell(state.nonce),
  ].join(' ');
}

function combinedRules(plan) {
  const sections = [];
  for (const plugin of PLUGINS) {
    const target = plan.skills[plugin.name];
    if (!target || !fs.existsSync(target)) throw new Error(`${plugin.name} SKILL.md is unavailable`);
    sections.push(`## ${plugin.name} (session activation)\n\n${stripFrontmatter(fs.readFileSync(target, 'utf8'))}`);
  }
  return [
    'WORK_SESSION_BOOTSTRAP/v1 READY',
    'Apply both rulesets for the rest of this session. They do not make Work Session implicitly invocable.',
    ...sections,
  ].join('\n\n');
}

function hookContext(eventName, text) {
  return {
    hookSpecificOutput: {
      hookEventName: eventName,
      additionalContext: text,
    },
  };
}

function extractCommand(input) {
  const toolInput = input?.tool_input || input?.toolInput || {};
  const command = toolInput.command ?? toolInput.cmd ?? toolInput.script;
  if (Array.isArray(command)) return command.join(' ');
  return typeof command === 'string' ? command.trim() : '';
}

function pluginById(id) {
  return PLUGINS.find((plugin) => plugin.id === id);
}

function applyClaude(plan) {
  const bin = hostBin('claude');
  const userSettings = path.join(claudeDir(), 'settings.json');
  const projectSettings = path.join(plan.workRoot, '.claude', 'settings.json');
  if (plan.actions.some((action) => action.type === 'claude-user-off')) updateClaudeSettings(userSettings, 'user');
  for (const action of plan.actions) {
    const plugin = pluginById(action.plugin);
    if (action.type === 'claude-marketplace-add') run(bin, ['plugin', 'marketplace', 'add', plugin.repo], plan.workRoot);
    if (action.type === 'claude-project-install') run(bin, ['plugin', 'install', plugin.id, '--scope', 'project'], plan.workRoot);
    if (action.type === 'claude-project-enable') run(bin, ['plugin', 'enable', plugin.id, '--scope', 'project'], plan.workRoot);
  }
  if (plan.actions.some((action) => action.type === 'claude-project-settings-on')) updateClaudeSettings(projectSettings, 'project');
  updateClaudeSettings(userSettings, 'user');
}

function applyCodex(plan) {
  const bin = hostBin('codex');
  const userConfig = path.join(codexDir(), 'config.toml');
  const projectConfig = path.join(plan.workRoot, '.codex', 'config.toml');
  updateCodexPluginConfig(userConfig, false);
  if (plan.actions.some((action) => action.type === 'codex-project-trust')) {
    updateCodexTrust(userConfig, plan.workRoot);
  }
  for (const action of plan.actions) {
    const plugin = pluginById(action.plugin);
    if (action.type === 'codex-marketplace-add') {
      const args = ['plugin', 'marketplace', 'add', plugin.repo];
      if (plugin.codexRef) args.push('--ref', plugin.codexRef);
      run(bin, args, plan.workRoot);
    }
    if (action.type === 'codex-plugin-add') run(bin, ['plugin', 'add', plugin.id], plan.workRoot);
  }
  updateCodexPluginConfig(userConfig, false);
  updateCodexPluginConfig(projectConfig, true);
}

function handlePrompt(host, input) {
  const prompt = input.prompt ?? input.user_prompt ?? input.userPrompt;
  if (!exactInvocation(host, prompt)) return null;
  const sessionId = String(input.session_id || input.sessionId || '');
  if (!sessionId) throw new Error('missing session_id');
  const workRoot = canonicalRoot(input.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd());
  ensureStateRoot();
  cleanOldState();
  let old = null;
  try { old = readState(sessionId); } catch {}
  if (old?.emitted && old.host === host && old.workRoot === workRoot) return null;

  const plan = preflight(host, workRoot);
  if (!plan.actions.length) {
    const text = combinedRules(plan);
    writeState({ version: VERSION, sessionId, host, workRoot, emitted: true, createdAt: Date.now() });
    return hookContext('UserPromptSubmit', text);
  }

  const state = {
    version: VERSION,
    sessionId,
    host,
    workRoot,
    nonce: crypto.randomBytes(24).toString('base64url'),
    fingerprint: fingerprint(plan),
    plan,
    emitted: false,
    createdAt: Date.now(),
  };
  state.command = applyCommand(state);
  writeState(state);
  return hookContext('UserPromptSubmit', [
    'WORK_SESSION_BOOTSTRAP/v1 CONFIRMATION_REQUIRED',
    `Host: ${host}`,
    `WorkRoot: ${workRoot}`,
    'The following network/install/config changes are required:',
    renderActions(plan.actions),
    'Run exactly the command below. The Work Session PreToolUse hook must request user confirmation before it executes:',
    state.command,
    'If confirmation is denied, make no changes and continue Work Session without ponytail/i-have-adhd.',
  ].join('\n'));
}

function handlePreTool(host, input) {
  const command = extractCommand(input);
  if (!command.includes(path.basename(__filename)) || !command.includes(' apply ')) return null;
  const match = command.match(/--session\s+'([^']+)'/);
  if (!match) return null;
  let state;
  try { state = readState(match[1]); } catch { return null; }
  const inputSession = String(input.session_id || input.sessionId || '');
  if (!state || state.host !== host || state.sessionId !== inputSession || state.emitted
      || Date.now() - state.createdAt > MAX_PLAN_AGE_MS || command !== state.command) return null;
  return {
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'ask',
      permissionDecisionReason: [
        'Work Session dependency bootstrap requires confirmation.',
        `WorkRoot: ${state.workRoot}`,
        renderActions(state.plan.actions),
        'Deny to continue Work Session without changing dependencies.',
      ].join('\n'),
    },
  };
}

async function hookMode(host) {
  const input = safeJson(await readStdin(), {});
  const event = input.hook_event_name || input.hookEventName;
  let output = null;
  if (event === 'UserPromptSubmit') output = handlePrompt(host, input);
  else if (event === 'PreToolUse') output = handlePreTool(host, input);
  if (output) process.stdout.write(`${JSON.stringify(output)}\n`);
}

function snapshotFile(target) {
  try { return { target, existed: true, data: fs.readFileSync(target) }; }
  catch { return { target, existed: false, data: null }; }
}

function restoreFile(snapshot) {
  if (snapshot.existed) {
    fs.mkdirSync(path.dirname(snapshot.target), { recursive: true });
    const tmp = `${snapshot.target}.work-session-rollback-${process.pid}`;
    fs.writeFileSync(tmp, snapshot.data);
    fs.renameSync(tmp, snapshot.target);
  } else {
    try { fs.unlinkSync(snapshot.target); } catch {}
    try { fs.rmdirSync(path.dirname(snapshot.target)); } catch {}
  }
}

function projectConfigPath(host, workRoot) {
  return host === 'claude'
    ? path.join(workRoot, '.claude', 'settings.json')
    : path.join(workRoot, '.codex', 'config.toml');
}

function enforceUserOff(host) {
  if (host === 'claude') updateClaudeSettings(path.join(claudeDir(), 'settings.json'), 'user');
  else updateCodexPluginConfig(path.join(codexDir(), 'config.toml'), false);
}

function applyMode(args) {
  const host = args.host;
  const sessionId = args.session;
  const nonce = args.nonce;
  if (!['claude', 'codex'].includes(host) || !sessionId || !nonce) throw new Error('invalid apply arguments');
  const workRoot = canonicalRoot(args['work-root']);
  const state = readState(sessionId);
  if (!state || state.version !== VERSION || state.host !== host || state.workRoot !== workRoot
      || state.nonce !== nonce || state.emitted || Date.now() - state.createdAt > MAX_PLAN_AGE_MS) {
    throw new Error('stale or mismatched bootstrap state');
  }
  const current = preflight(host, workRoot);
  if (fingerprint(current) !== state.fingerprint) throw new Error('bootstrap plan changed; invoke Work Session again for a new confirmation');
  const projectSnapshot = snapshotFile(projectConfigPath(host, workRoot));
  try {
    if (host === 'claude') applyClaude(current);
    else applyCodex(current);
    const finalPlan = preflight(host, workRoot);
    if (finalPlan.actions.length) throw new Error(`bootstrap incomplete:\n${renderActions(finalPlan.actions)}`);
    const text = combinedRules(finalPlan);
    state.emitted = true;
    state.completedAt = Date.now();
    writeState(state);
    process.stdout.write(`${text}\n`);
  } catch (error) {
    try { restoreFile(projectSnapshot); } catch {}
    try { enforceUserOff(host); } catch {}
    throw error;
  }
}

(async () => {
  const args = parseArgs(process.argv);
  try {
    if (args.mode === 'hook') await hookMode(args.host);
    else if (args.mode === 'apply') applyMode(args);
    else throw new Error(`unknown mode: ${args.mode}`);
  } catch (error) {
    fail(error?.message || String(error));
  }
})();
