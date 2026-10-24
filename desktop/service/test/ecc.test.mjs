import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { randomUUID, createHash } from 'node:crypto';
import { EccLibrary } from '../ecc.mjs';

async function fixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), 'sheesshh-ecc-test-'));
  const uiDir = path.join(root, 'ui'), stateDir = path.join(root, '.sheesshh');
  await mkdir(path.join(uiDir, 'ecc', 'content'), { recursive: true }); await mkdir(stateDir);
  const content = 'Review a small change and report evidence.';
  const catalog = { source: { repo: 'example/ecc', commit: 'a'.repeat(40) }, items: [{ id: 'role:reviewer', name: 'Reviewer', kind: 'role', path: 'agents/reviewer.md', content: '', contentFile: 'content/part-001.json', sha256: createHash('sha256').update(content).digest('hex') }], workflows: [] };
  await writeFile(path.join(uiDir, 'ecc/catalog.json'), JSON.stringify(catalog));
  await writeFile(path.join(uiDir, 'ecc/content/part-001.json'), JSON.stringify({ 'role:reviewer': content }));
  const session = { id: 'test', agent: 'codex', cwd: root, status: 'running', process: {}, bypass: false };
  const calls = []; const sessions = { get(id) { if (id !== 'test') throw new Error('Missing session'); return session; }, input(...args) { calls.push(args); } };
  return { root, uiDir, stateDir, catalog, session, calls, sessions, ecc: new EccLibrary({ uiDir, stateDir, sessions }) };
}

test('ECC reads only packaged complete content and prepares explicit reference without executing', async () => {
  const f = await fixture();
  assert.equal((await f.ecc.item('role:reviewer')).content, 'Review a small change and report evidence.');
  const prepared = await f.ecc.prepare({ itemIds: ['role:reviewer'], task: 'Review my diff', catalogCommit: f.catalog.source.commit });
  assert.match(prepared.prompt, /ONE-TIME ECC REFERENCE/); assert.match(prepared.prompt, /not permission to install/);
  assert.equal(f.calls.length, 0);
  for (const value of [{ itemIds: ['../secret'], task: 'x' }, { itemIds: [], task: 'x' }, { itemIds: ['role:reviewer'], task: '\x1b[31m' }, { itemIds: ['role:reviewer'], task: '' }]) await assert.rejects(f.ecc.prepare({ catalogCommit: f.catalog.source.commit, ...value }));
  await assert.rejects(f.ecc.prepare({ itemIds: ['role:reviewer'], task: 'x', catalogCommit: 'b'.repeat(40) }));
});

test('favorites/kits persist privately, reject arbitrary data and preserve prior state on failure', async () => {
  const f = await fixture();
  assert.deepEqual(await f.ecc.state(), { favorites: [], kits: [] });
  const state = { favorites: ['role:reviewer'], kits: [{ id: 'review', name: 'Review kit', itemIds: ['role:reviewer'] }] };
  await f.ecc.save(state); assert.deepEqual(await f.ecc.state(), state);
  for (const bad of [{ ...state, command: 'run' }, { ...state, favorites: ['unknown'] }, { ...state, kits: [{ id: '../x', name: 'x', itemIds: [] }] }]) await assert.rejects(f.ecc.save(bad));
  assert.deepEqual(await f.ecc.state(), state);
  assert.deepEqual(JSON.parse(await readFile(path.join(f.stateDir, 'ecc-state.json'))), state);
});

test('explicit sends validate preview, target and durable dedupe; never create agents', async () => {
  const f = await fixture();
  const base = { itemIds: ['role:reviewer'], task: 'Review only', catalogCommit: f.catalog.source.commit };
  const prepared = await f.ecc.prepare(base);
  const value = { ...base, promptHash: prepared.promptHash, requestId: randomUUID(), sessionId: 'test' };
  await assert.rejects(f.ecc.send({ ...value, promptHash: 'changed' }));
  f.session.agent = 'shell'; await assert.rejects(f.ecc.send(value)); f.session.agent = 'codex';
  f.session.bypass = true; await assert.rejects(f.ecc.send(value)); f.session.bypass = false;
  f.session.attention = true; await assert.rejects(f.ecc.send(value)); f.session.attention = false;
  const [first, second] = await Promise.all([f.ecc.send(value), f.ecc.send(value)]);
  assert.equal(first.status, 'delivered'); assert.equal(second.repeated, true); assert.equal(f.calls.length, 1);
  const restarted = new EccLibrary(f); assert.equal((await restarted.send(value)).repeated, true); assert.equal(f.calls.length, 1);
});

test('uncertain terminal write is retained and never repeated', async () => {
  const f = await fixture(); let count = 0;
  f.sessions.input = () => { count++; throw new Error('Lost acknowledgement'); };
  const base = { itemIds: ['role:reviewer'], task: 'Review only', catalogCommit: f.catalog.source.commit };
  const prepared = await f.ecc.prepare(base);
  const value = { ...base, promptHash: prepared.promptHash, requestId: randomUUID(), sessionId: 'test' };
  assert.equal((await f.ecc.send(value)).status, 'uncertain');
  assert.equal((await f.ecc.send(value)).repeated, true); assert.equal(count, 1);
});

test('tampered bundled document fails integrity before sending', async () => {
  const f = await fixture();
  await writeFile(path.join(f.uiDir, 'ecc/content/part-001.json'), JSON.stringify({ 'role:reviewer': 'unexpected replacement' }));
  await assert.rejects(f.ecc.item('role:reviewer'), /integrity/); assert.equal(f.calls.length, 0);
});

test('ECC HTTP routes enforce local authorization and origin; preview does not dispatch', async () => {
  const { createService } = await import('../server.mjs');
  const f = await fixture(); await mkdir(path.join(f.root, 'workspace')); await writeFile(path.join(f.root, 'workspace/workspace.json'), '{"entities":[]}');
  await writeFile(path.join(f.uiDir, 'index.html'), '<html>fixture</html>');
  const service = await createService({ repo: f.root, uiDir: f.uiDir, stateDir: f.stateDir });
  try {
    const headers = { Authorization: `Bearer ${service.token}`, Origin: service.origin, 'Content-Type': 'application/json' };
    const request = (route, data, extra = {}) => fetch(service.origin + '/api/ecc/' + route, { method: data ? 'POST' : 'GET', headers: { ...headers, ...extra }, ...(data ? { body: JSON.stringify(data) } : {}) });
    assert.equal((await request('state', null, { Authorization: '' })).status, 401);
    assert.equal((await request('state', null, { Origin: 'https://untrusted.example' })).status, 403);
    assert.equal((await request('item?id=..%2F.env')).status, 400);
    const result = await request('prepare', { itemIds: ['role:reviewer'], task: 'Inspect only', catalogCommit: f.catalog.source.commit });
    assert.equal(result.status, 200); assert.match((await result.json()).prompt, /Inspect only/);
    assert.equal(service.sessions.list().length, 0);
  } finally { await service.close(); }
});

test('corrupt private state and receipts fail closed instead of erasing dedupe or preferences', async () => {
  const f = await fixture();
  await writeFile(path.join(f.stateDir, 'ecc-state.json'), '{broken');
  await assert.rejects(f.ecc.state(), /could not be read/);
  await assert.rejects(f.ecc.save({ favorites: [], kits: [] }), /could not be read/);
  assert.equal(await readFile(path.join(f.stateDir, 'ecc-state.json'), 'utf8'), '{broken');
  const base = { itemIds: ['role:reviewer'], task: 'Review only', catalogCommit: f.catalog.source.commit };
  const prepared = await f.ecc.prepare(base);
  await writeFile(path.join(f.stateDir, 'ecc-deliveries.json'), '{broken');
  await assert.rejects(f.ecc.send({ ...base, promptHash: prepared.promptHash, requestId: randomUUID(), sessionId: 'test' }), /could not be read/);
  assert.equal(f.calls.length, 0);
});

test('preview normalizes carriage returns exactly like terminal delivery', async () => {
  const f = await fixture();
  const result = await f.ecc.prepare({ itemIds: ['role:reviewer'], task: 'Review\r\nonly', catalogCommit: f.catalog.source.commit });
  assert.ok(!result.prompt.includes('\r'));
  assert.equal(result.promptHash, createHash('sha256').update(result.prompt).digest('hex'));
});
