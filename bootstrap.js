/**
 * bootstrap.js — self-healing rqmd installer for the VS Code extension host.
 *
 * Implements:
 *   RQMD-EXT-056  same-major version policy
 *   RQMD-EXT-057  VS Code notification flow
 *   RQMD-EXT-058  unified shim entrypoint / runRqmd helper
 *   RQMD-EXT-059  concurrency lock + session debounce
 *   RQMD-EXT-060  reason-code diagnostics + Output channel logging
 *
 * Public API:
 *   ensureRqmd(context)             → { ok, reasonCode }
 *   runRqmd(context, args, opts?)   → runs rqmd in a terminal after ensureRqmd
 *   _resetForTesting(overrides?)    → resets module state; test-only
 */

'use strict';

const { execSync: _execSync } = require('child_process');
const path = require('path');
const os = require('os');

// vscode is unavailable when running tests outside the extension host.
let _vscodeMod;
try { _vscodeMod = require('vscode'); } catch { _vscodeMod = null; }

// Persisted state key for the last-known installed rqmd major version (EXT-056).
const STATE_KEY_MAJOR = 'rqmd.installedMajor';

const MSG_INSTALLING =
    'Installing rqmd (and uv if it is not available) so this workspace can run rqmd commands.';
const MSG_SUCCESS = 'rqmd is ready. Re-running your command now.';
const MSG_FAILURE =
    'Could not install rqmd automatically. Check network, permissions, or Python toolchain and try again.';

/** @param {number} installed @param {number} expected @returns {string} */
function majorMismatchMsg(installed, expected) {
    return `Installed rqmd major ${installed}, but this workflow expects major ${expected}. Please update manually.`;
}

// ---------------------------------------------------------------------------
// RQMD-EXT-059: Concurrency lock + session debounce
// ---------------------------------------------------------------------------

/** @type {Promise<{ok:boolean,reasonCode:BootstrapReasonCode}>|null} */
let _bootstrapInFlight = null;
let _notificationShownThisSession = false;

// ---------------------------------------------------------------------------
// RQMD-EXT-060: Output channel for reason-code diagnostics
// ---------------------------------------------------------------------------

/** @type {import('vscode').OutputChannel | null} */
let _outputChannel = null;

/** @param {string} msg */
function _log(msg) {
    const ts = new Date().toISOString();
    const line = `[rqmd bootstrap ${ts}] ${msg}`;
    console.log(line);
    if (_outputChannel) _outputChannel.appendLine(line);
}

// ---------------------------------------------------------------------------
// Dependency injection — all I/O goes through _deps so tests can swap pieces.
// ---------------------------------------------------------------------------

function _defaultToolAvailable(name) {
    try {
        _deps.execSync(`which ${name}`, { stdio: 'pipe', shell: true, encoding: 'utf8' });
        return true;
    } catch { return false; }
}

function _defaultGetRqmdMajor() {
    try {
        const out = _deps.execSync('rqmd --version', { stdio: ['pipe','pipe','pipe'], shell: true, encoding: 'utf8' }).trim();
        const m = out.match(/(\d+)\.\d+\.\d+/);
        return m ? parseInt(m[1], 10) : null;
    } catch { return null; }
}

function _defaultRefreshUvPath() {
    try {
        const uvBinDir = _deps.execSync('uv tool bin-dir 2>/dev/null', { stdio: 'pipe', shell: true, encoding: 'utf8' }).trim();
        if (uvBinDir && !process.env.PATH.includes(uvBinDir)) {
            process.env.PATH = `${uvBinDir}${path.delimiter}${process.env.PATH}`;
        }
    } catch {}
    const localBin = path.join(os.homedir(), '.local', 'bin');
    if (!process.env.PATH.includes(localBin)) {
        process.env.PATH = `${localBin}${path.delimiter}${process.env.PATH}`;
    }
}

/** Mutable deps object — swap fields in tests via _resetForTesting(). */
let _deps = {
    vscode: _vscodeMod,
    execSync: _execSync,
    toolAvailable: _defaultToolAvailable,
    getRqmdMajor: _defaultGetRqmdMajor,
    refreshUvPath: _defaultRefreshUvPath,
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * @param {import('vscode').ExtensionContext} context
 * @returns {Promise<{ok: boolean, reasonCode: BootstrapReasonCode}>}
 * @typedef {'already-present'|'installed-rqmd'|'installed-uv-and-rqmd'|'install-failed'|'major-mismatch'} BootstrapReasonCode
 */
async function ensureRqmd(context) {
    if (_bootstrapInFlight !== null) {
        _log('bootstrap already in-flight, queuing behind existing attempt');
        return _bootstrapInFlight;
    }
    _bootstrapInFlight = _doEnsureRqmd(context).finally(() => {
        _bootstrapInFlight = null;
    });
    return _bootstrapInFlight;
}

/** @param {import('vscode').ExtensionContext} context */
async function _doEnsureRqmd(context) {
    _deps.refreshUvPath();

    if (_deps.toolAvailable('rqmd')) {
        const currentMajor = _deps.getRqmdMajor();
        const expectedMajor = context.globalState.get(STATE_KEY_MAJOR);

        if (expectedMajor != null && currentMajor != null && currentMajor !== expectedMajor) {
            const msg = majorMismatchMsg(currentMajor, expectedMajor);
            _log(`reason-code: major-mismatch — ${msg}`);
            _deps.vscode?.window.showWarningMessage(msg);
            return { ok: false, reasonCode: 'major-mismatch' };
        }

        if (currentMajor != null && expectedMajor == null) {
            await context.globalState.update(STATE_KEY_MAJOR, currentMajor);
        }

        _log('reason-code: already-present');
        return { ok: true, reasonCode: 'already-present' };
    }

    // rqmd is missing — begin bootstrap.
    if (!_notificationShownThisSession) {
        _notificationShownThisSession = true;
        _log('starting install — ' + MSG_INSTALLING);
        _deps.vscode?.window.showInformationMessage(MSG_INSTALLING);
    }

    try {
        let reasonCode;

        if (!_deps.toolAvailable('uv')) {
            _log('uv not found, installing uv first');
            _deps.execSync('curl -LsSf https://astral.sh/uv/install.sh | sh', { stdio: 'pipe', shell: true });
            _deps.refreshUvPath();
            reasonCode = 'installed-uv-and-rqmd';
        } else {
            reasonCode = 'installed-rqmd';
        }

        const expectedMajor = context.globalState.get(STATE_KEY_MAJOR);
        const versionSpec = expectedMajor != null ? `rqmd==${expectedMajor}.*` : 'rqmd';
        _log(`installing: uv tool install "${versionSpec}"`);
        _deps.execSync(`uv tool install "${versionSpec}"`, { stdio: 'pipe', shell: true });
        _deps.refreshUvPath();

        const installedMajor = _deps.getRqmdMajor();
        if (installedMajor != null) {
            await context.globalState.update(STATE_KEY_MAJOR, installedMajor);
        }

        _log(`reason-code: ${reasonCode}`);
        _deps.vscode?.window.showInformationMessage(MSG_SUCCESS);
        return { ok: true, reasonCode };
    } catch (err) {
        _log(`reason-code: install-failed — ${err?.message ?? err}`);
        _deps.vscode?.window.showErrorMessage(MSG_FAILURE);
        return { ok: false, reasonCode: 'install-failed' };
    }
}

/**
 * @param {import('vscode').ExtensionContext} context
 * @param {string[]} args
 * @param {{ terminalName?: string, cwd?: string }} [opts]
 * @returns {Promise<boolean>}
 */
async function runRqmd(context, args, opts = {}) {
    const boot = await ensureRqmd(context);
    if (!boot.ok) return false;

    const workspaceFolders = _deps.vscode?.workspace.workspaceFolders;
    const cwd = opts.cwd
        ?? (workspaceFolders && workspaceFolders.length > 0 ? workspaceFolders[0].uri.fsPath : undefined);

    const terminal = _deps.vscode?.window.createTerminal({ name: opts.terminalName ?? 'rqmd', cwd });
    terminal?.show();
    const safeArgs = args.map(a => (a.includes(' ') ? `"${a}"` : a)).join(' ');
    terminal?.sendText(`rqmd ${safeArgs}`);
    return true;
}

/**
 * Initialise the VS Code Output channel for EXT-060 diagnostics.
 * Call once from activate().
 * @param {import('vscode').ExtensionContext} _context  (unused, reserved for future)
 */
function initOutputChannel(_context) {
    if (_deps.vscode && !_outputChannel) {
        _outputChannel = _deps.vscode.window.createOutputChannel('rqmd bootstrap');
    }
}

/**
 * Reset module state and optionally override deps — test use only.
 * @param {Partial<typeof _deps>} [overrides]
 */
function _resetForTesting(overrides = {}) {
    _bootstrapInFlight = null;
    _notificationShownThisSession = false;
    _outputChannel = null;
    _deps = {
        vscode: _vscodeMod,
        execSync: _execSync,
        toolAvailable: _defaultToolAvailable,
        getRqmdMajor: _defaultGetRqmdMajor,
        refreshUvPath: _defaultRefreshUvPath,
        ...overrides,
    };
}

module.exports = { ensureRqmd, runRqmd, initOutputChannel, STATE_KEY_MAJOR, _resetForTesting };
