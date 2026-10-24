import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { EccLibrary } from '../desktop/service/ecc.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ecc = new EccLibrary({ uiDir: path.join(root, 'public'), stateDir: path.join(root, '.cache', 'ecc-check-unused'), sessions: {} });
const catalog = await ecc.catalog();
assert.equal(catalog.items.length, 603);
assert.equal(catalog.source.commit, '90606c8315ee09cafc303515c5f33024db6b9882');
assert.match(await readFile(path.join(root, 'public/ecc/LICENSE'), 'utf8'), /MIT License/);
for (const item of catalog.items) {
  const full = await ecc.item(item.id);
  assert.ok(full.content.length > 0);
  assert.equal(item.instructionOnly, true);
  assert.equal(item.contentTruncated, false);
  assert.ok(['skill', 'role', 'command', 'rule', 'context'].includes(item.kind));
}
for (const flow of catalog.workflows) {
  const prepared = await ecc.prepare({ itemIds: flow.itemIds, task: 'Read the project instructions and review one bounded task. Do not edit files.', catalogCommit: catalog.source.commit });
  assert.ok(prepared.prompt.length <= 48000);
}
console.log(`ECC snapshot verified: ${catalog.items.length} complete instruction documents, ${catalog.workflows.length} usable workflows; no upstream code executed.`);
