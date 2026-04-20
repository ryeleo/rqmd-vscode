/**
 * tests/bootstrap.test.js
 *
 * Unit tests for bootstrap.js (RQMD-EXT-060).
 * Covers: rqmd present, rqmd missing + uv present, both missing (uv+rqmd),
 *         major mismatch, offline/install failure, concurrent calls.
 *
 * Uses Node 18+ built-in test runner — no extra dependencies.
 * Run: node --test tests/bootstrap.test.js
 */

'use strict';

const { test, describe, beforeEach } = require('node:test');
const assert = require('node:assert/strict');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build a fake ExtensionContext with an in-memory globalState. */
function makeContext(initial = {}) {
    const store = { ...initial };
    return {
        globalState: {
            get: (key) => store[key],
            update: async (key, val) => { store[key] = val; },
            _store: store,   // test-only inspection
        },
    };
}

/**
 * Build a fake vscode module that records calls.
 * Returns { vscode, calls } where calls.info/warn/error track messages shown.
 */
function makeVscode() {
    const calls = { info: [], warn: [], error: [] };
    const vscode = {
        window: {
            showInformationMessage: (msg) => { calls.info.push(msg); return Promise.resolve(); },
            showWarningMessage:     (msg) => { calls.warn.push(msg); return Promise.resolve(); },
            showErrorMessage:       (msg) => { calls.error.push(msg); return Promise.resolve(); },
            createTerminal: () => ({ show: () => {}, sendText: () => {} }),
            createOutputChannel: () => ({ appendLine: () => {} }),
        },
        workspace: { workspaceFolders: undefined },
    };
    return { vscode, calls };
}

/** Require bootstrap fresh (module cache is shared so we use _resetForTesting). */
const bootstrap = require('../bootstrap');
const { ensureRqmd, _resetForTesting, STATE_KEY_MAJOR } = bootstrap;

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------

describe('bootstrap.ensureRqmd', () => {

    beforeEach(() => _resetForTesting());

    // -- Scenario 1: rqmd is already present ---------------------------------
    test('already-present: returns ok + reason-code, no install commands', async () => {
        const { vscode, calls } = makeVscode();
        const ctx = makeContext();

        _resetForTesting({
            vscode,
            toolAvailable: (name) => name === 'rqmd',
            getRqmdMajor: () => 1,
            execSync: () => { throw new Error('execSync must not be called'); },
            refreshUvPath: () => {},
        });

        const result = await ensureRqmd(ctx);

        assert.equal(result.ok, true);
        assert.equal(result.reasonCode, 'already-present');
        assert.equal(calls.info.length, 0, 'No install notification expected');
        // First-seen: major should be persisted
        assert.equal(ctx.globalState._store[STATE_KEY_MAJOR], 1);
    });

    // -- Scenario 2: rqmd missing, uv present --------------------------------
    test('installed-rqmd: rqmd missing + uv present → install rqmd only', async () => {
        const { vscode, calls } = makeVscode();
        const ctx = makeContext();
        const executed = [];

        _resetForTesting({
            vscode,
            toolAvailable: (name) => name === 'uv',   // rqmd absent, uv present
            getRqmdMajor: () => 1,
            execSync: (cmd) => { executed.push(cmd); return ''; },
            refreshUvPath: () => {},
        });

        const result = await ensureRqmd(ctx);

        assert.equal(result.ok, true);
        assert.equal(result.reasonCode, 'installed-rqmd');
        assert.ok(calls.info.some(m => m.includes('Installing rqmd')), 'install notification shown');
        assert.ok(calls.info.some(m => m.includes('rqmd is ready')), 'success notification shown');
        assert.ok(executed.some(c => c.includes('uv tool install')), 'uv tool install was called');
        assert.ok(!executed.some(c => c.includes('astral.sh/uv')), 'uv itself was NOT installed');
    });

    // -- Scenario 3: both missing (uv + rqmd) --------------------------------
    test('installed-uv-and-rqmd: both missing → install uv then rqmd', async () => {
        const { vscode, calls } = makeVscode();
        const ctx = makeContext();
        const executed = [];

        _resetForTesting({
            vscode,
            toolAvailable: () => false,   // nothing available initially
            getRqmdMajor: () => 2,
            execSync: (cmd) => { executed.push(cmd); return ''; },
            refreshUvPath: () => {},
        });

        const result = await ensureRqmd(ctx);

        assert.equal(result.ok, true);
        assert.equal(result.reasonCode, 'installed-uv-and-rqmd');
        assert.ok(executed.some(c => c.includes('astral.sh/uv')), 'uv was installed');
        assert.ok(executed.some(c => c.includes('uv tool install')), 'rqmd was installed via uv');
        assert.ok(calls.info.some(m => m.includes('Installing rqmd')));
        assert.equal(ctx.globalState._store[STATE_KEY_MAJOR], 2);
    });

    // -- Scenario 4: major mismatch ------------------------------------------
    test('major-mismatch: rqmd present on wrong major → warning, ok=false', async () => {
        const { vscode, calls } = makeVscode();
        const ctx = makeContext({ [STATE_KEY_MAJOR]: 1 });  // anchor is v1

        _resetForTesting({
            vscode,
            toolAvailable: (name) => name === 'rqmd',
            getRqmdMajor: () => 2,   // but v2 is installed
            execSync: () => { throw new Error('execSync must not be called'); },
            refreshUvPath: () => {},
        });

        const result = await ensureRqmd(ctx);

        assert.equal(result.ok, false);
        assert.equal(result.reasonCode, 'major-mismatch');
        assert.ok(calls.warn.some(m => m.includes('major 2') && m.includes('major 1')),
            'warning mentions installed vs expected major');
        assert.equal(calls.info.length, 0, 'No install notification on mismatch');
    });

    // -- Scenario 5: offline / network failure --------------------------------
    test('install-failed: execSync throws → ok=false, error notification shown', async () => {
        const { vscode, calls } = makeVscode();
        const ctx = makeContext();

        _resetForTesting({
            vscode,
            toolAvailable: (name) => name === 'uv',
            getRqmdMajor: () => null,
            execSync: () => { throw new Error('network unavailable'); },
            refreshUvPath: () => {},
        });

        const result = await ensureRqmd(ctx);

        assert.equal(result.ok, false);
        assert.equal(result.reasonCode, 'install-failed');
        assert.ok(calls.error.some(m => m.includes('Could not install rqmd')),
            'failure notification shown');
    });

    // -- Scenario 6: concurrent calls share one install ----------------------
    test('concurrent: two simultaneous ensureRqmd calls share one install', async () => {
        const { vscode, calls } = makeVscode();
        const ctx = makeContext();
        let installCount = 0;

        _resetForTesting({
            vscode,
            toolAvailable: (name) => name === 'uv',
            getRqmdMajor: () => 1,
            execSync: (cmd) => {
                if (cmd.includes('uv tool install')) installCount++;
                return '';
            },
            refreshUvPath: () => {},
        });

        // Fire two concurrent calls before the first resolves.
        const [r1, r2] = await Promise.all([ensureRqmd(ctx), ensureRqmd(ctx)]);

        assert.equal(r1.ok, true);
        assert.equal(r2.ok, true);
        assert.equal(installCount, 1, 'uv tool install ran exactly once');
        // Notification debounce: only one "Installing rqmd…" toast.
        const installingCount = calls.info.filter(m => m.includes('Installing rqmd')).length;
        assert.equal(installingCount, 1, 'install notification shown exactly once');
    });

    // -- Scenario 7: RQMD-BUG-006 — subprocess output surfaced on failure ---
    test('RQMD-BUG-006: install-failed logs subprocess stdout/stderr to output channel', async () => {
        const logged = [];
        const { vscode } = makeVscode();
        const mockChannel = { appendLine: (line) => logged.push(line), show: () => {} };
        vscode.window.createOutputChannel = () => mockChannel;

        const ctx = makeContext();
        _resetForTesting({
            vscode,
            toolAvailable: (name) => name === 'uv',
            getRqmdMajor: () => null,
            execSync: () => {
                const err = new Error('install failed');
                err.stdout = Buffer.from('pip: command not found\n');
                err.stderr = Buffer.from('error: process exited with code 1\n');
                throw err;
            },
            refreshUvPath: () => {},
        });

        // Init the output channel so _outputChannel is populated before the install.
        const { initOutputChannel } = require('../bootstrap');
        initOutputChannel(ctx);

        const result = await ensureRqmd(ctx);

        assert.equal(result.ok, false);
        assert.equal(result.reasonCode, 'install-failed');
        assert.ok(logged.some(l => l.includes('pip: command not found')),
            'subprocess stdout must appear in the output channel');
        assert.ok(logged.some(l => l.includes('error: process exited with code 1')),
            'subprocess stderr must appear in the output channel');
    });

});
