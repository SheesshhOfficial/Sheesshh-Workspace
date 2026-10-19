import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import path from 'node:path';
import os from 'node:os';
import { mkdir, mkdtemp, rm, symlink, writeFile } from 'node:fs/promises';
import { Files } from '../files.mjs';
import { MobileReports } from '../mobile-reports.mjs';

const directoryLink = (target, alias) => symlink(target, alias, process.platform === 'win32' ? 'junction' : 'dir');
async function fixture(t) {
  const repo = await mkdtemp(path.join(os.tmpdir(), 'sheesshh-report-paths-'));
  const servers = [];
  t.after(async () => {
    await Promise.all(servers.map(server => new Promise(resolve => { server.closeAllConnections(); server.close(resolve); })));
    await rm(repo, { recursive: true, force: true });
  });
  const listen = async handler => {
    const server = http.createServer(async (request, response) => {
      try { await handler(request, response); }
      catch (error) { response.writeHead(error.status || 500); response.end(error.message); }
    });
    servers.push(server);
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    return `http://127.0.0.1:${server.address().port}`;
  };
  return { repo, listen };
}

test('desktop report grants reject directory aliases into private state but keep public links', async t => {
  const { repo, listen } = await fixture(t);
  await mkdir(path.join(repo, '.sheesshh')); await mkdir(path.join(repo, 'public'));
  await writeFile(path.join(repo, '.sheesshh', 'settings.json'), '{"private":"fixture only"}');
  await writeFile(path.join(repo, 'public', 'notes.txt'), 'Public report asset');
  await directoryLink(path.join(repo, '.sheesshh'), path.join(repo, 'state-alias'));
  await directoryLink(path.join(repo, 'public'), path.join(repo, 'public-alias'));
  const files = new Files(repo);
  files.uiOrigin = 'http://127.0.0.1:1234';
  files.origin = await listen((request, response) => files.content(request, response, new URL(request.url, files.origin)));
  const base = `${files.origin}/view/${files.repoGrant}/`;
  assert.equal((await fetch(`${base}.sheesshh/settings.json`)).status, 403);
  assert.equal((await fetch(`${base}state-alias/settings.json`)).status, 403);
  const response = await fetch(`${base}public-alias/notes.txt`);
  assert.equal(response.status, 200); assert.equal(await response.text(), 'Public report asset');
});

test('desktop report grants reject a public-looking file alias to .env', async t => {
  const { repo, listen } = await fixture(t);
  await writeFile(path.join(repo, '.env'), 'AUDIT_ONLY=not-a-real-secret');
  try { await symlink(path.join(repo, '.env'), path.join(repo, 'public.txt'), 'file'); }
  catch (error) { if (process.platform === 'win32' && error.code === 'EPERM') { t.skip('File symlinks require Windows Developer Mode.'); return; } throw error; }
  const files = new Files(repo);
  files.uiOrigin = 'http://127.0.0.1:1234';
  files.origin = await listen((request, response) => files.content(request, response, new URL(request.url, files.origin)));
  assert.equal((await fetch(`${files.origin}/view/${files.repoGrant}/public.txt`)).status, 403);
});

async function mobileFixture(t) {
  const { repo, listen } = await fixture(t), report = path.join(repo, 'workspace', 'example');
  await mkdir(report, { recursive: true });
  await writeFile(path.join(report, 'report.html'), '<h1>Public report</h1>');
  const entities = [{ id: 'example', title: 'Example', folder: 'example', steps: [{ name: 'Report', path: 'report.html' }] }];
  const registry = () => writeFile(path.join(repo, 'workspace', 'workspace.json'), JSON.stringify({ entities }));
  await registry();
  const device = { id: 'fixture-device', expires: Date.now() + 60000 };
  const gateway = { repo, active: true, state: { devices: [device] } }, reports = new MobileReports(gateway);
  gateway.origin = await listen((request, response) => reports.serve(request, response, new URL(request.url, gateway.origin)));
  return { repo, report, entities, registry, device, gateway, reports };
}

test('mobile report opening rejects folder aliases outside workspace and into private children', async t => {
  const { repo, report, entities, registry, device, reports } = await mobileFixture(t);
  for (const folder of ['.sheesshh', 'workspace/.private', 'workspace/example/.private']) {
    await mkdir(path.join(repo, folder), { recursive: true });
    await writeFile(path.join(repo, folder, 'notes.md'), 'Private fixture notes');
  }
  await directoryLink(path.join(repo, '.sheesshh'), path.join(repo, 'workspace', 'state-alias'));
  await directoryLink(path.join(repo, 'workspace', '.private'), path.join(repo, 'workspace', 'hidden-alias'));
  await directoryLink(path.join(report, '.private'), path.join(report, 'private-alias'));
  entities.push(
    { id: 'outside', folder: 'state-alias', steps: [{ path: 'notes.md' }] },
    { id: 'hidden', folder: 'hidden-alias', steps: [{ path: 'notes.md' }] },
    { id: 'step', folder: 'example', steps: [{ path: 'private-alias/notes.md' }] },
  );
  await registry();
  for (const entityId of ['outside', 'hidden', 'step']) await assert.rejects(reports.open(device, { entityId }), error => error.status === 403, entityId);
  assert.equal((await reports.open(device, { entityId: 'example' })).kind, 'html');
});

test('mobile report assets reject resolved private paths and retain safe links', async t => {
  const { report, device, gateway, reports } = await mobileFixture(t);
  await mkdir(path.join(report, '.private')); await mkdir(path.join(report, 'public'));
  await writeFile(path.join(report, '.private', 'notes.txt'), 'Private fixture notes');
  await writeFile(path.join(report, 'public', 'notes.txt'), 'Public notes');
  await directoryLink(path.join(report, '.private'), path.join(report, 'private-alias'));
  await directoryLink(path.join(report, 'public'), path.join(report, 'public-alias'));
  const opened = await reports.open(device, { entityId: 'example' }), base = new URL('.', gateway.origin + opened.url);
  assert.equal((await fetch(new URL('private-alias/notes.txt', base))).status, 403);
  const response = await fetch(new URL('public-alias/notes.txt', base));
  assert.equal(response.status, 200); assert.equal(await response.text(), 'Public notes');
});

test('mobile asset aliases cannot disguise an unsupported file type', async t => {
  const { report, device, gateway, reports } = await mobileFixture(t);
  await writeFile(path.join(report, 'private.pem'), 'Fixture only, not a real key');
  try { await symlink(path.join(report, 'private.pem'), path.join(report, 'public.txt'), 'file'); }
  catch (error) { if (process.platform === 'win32' && error.code === 'EPERM') { t.skip('File symlinks require Windows Developer Mode.'); return; } throw error; }
  const opened = await reports.open(device, { entityId: 'example' });
  assert.equal((await fetch(new URL('public.txt', gateway.origin + opened.url))).status, 403);
});

test('mobile public reports still open through a linked repository root', async t => {
  const { repo, device, gateway, reports } = await mobileFixture(t);
  const alias = path.join(repo, 'repository-alias');
  await directoryLink(repo, alias);
  gateway.repo = alias;
  const opened = await reports.open(device, { entityId: 'example' });
  const response = await fetch(gateway.origin + opened.url);
  assert.equal(response.status, 200); assert.match(await response.text(), /Public report/);
});

test('mobile shared assets cannot use a folder alias into private state', async t => {
  const { repo, device, gateway, reports } = await mobileFixture(t);
  await mkdir(path.join(repo, '.sheesshh'));
  await writeFile(path.join(repo, '.sheesshh', 'report.css'), 'Private fixture data');
  await directoryLink(path.join(repo, '.sheesshh'), path.join(repo, 'workspace', '_shared'));
  const opened = await reports.open(device, { entityId: 'example' });
  const url = new URL(opened.url.replace('example/report.html', '_shared/report.css'), gateway.origin);
  assert.equal((await fetch(url)).status, 403);
});
