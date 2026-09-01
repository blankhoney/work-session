'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { freshState, readState, sessionKey, statePath, writeState } = require('../src/state.cjs');

test('session state keys are reversible and path-safe', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'optimizer-state-'));
  try {
    const ids = ['session-123', '../../etc/passwd\\..', '会话/🔒/résumé'];
    for (const id of ids) {
      const key = sessionKey(id);
      assert.equal(key, Buffer.from(id, 'utf8').toString('hex'));
      assert.equal(Buffer.from(key, 'hex').toString('utf8'), id);
      assert.match(key, /^[0-9a-f]+$/);
      assert.equal(path.dirname(statePath(id, root)), path.join(root, 'sessions'));
      assert.equal(path.basename(statePath(id, root)), `${key}.json`);
    }

    assert.equal(sessionKey(), sessionKey('unknown'));
    assert.equal(sessionKey(''), sessionKey('unknown'));

    const expected = freshState();
    expected.lastPromptContext = '会话/🔒/résumé';
    writeState(ids[2], expected, root);
    assert.deepEqual(readState(ids[2], root), expected);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
