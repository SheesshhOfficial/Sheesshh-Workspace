import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const read = p => readFile(new URL(`../${p}`, import.meta.url));
const text = async p => (await read(p)).toString('utf8');
const json = async p => JSON.parse(await text(p));
const pkg = await json('package.json'), config = await json('src-tauri/tauri.conf.json');
assert.equal(pkg.version, '0.5.3'); assert.equal(config.version, pkg.version);
assert.equal(config.productName, 'Sheesshh Workspace');
assert.equal(config.identifier, 'io.github.sheesshhofficial.workspace');
assert.equal(config.bundle.publisher, 'SheesshhOfficial');
assert.equal(config.bundle.windows.nsis.installerIcon, 'icons/icon.ico');
assert.match(await text('src-tauri/Cargo.toml'), /version = "0\.5\.3"/);
assert.match(await text('src-tauri/Cargo.lock'), /name = "sheesshh-workspace"\nversion = "0\.5\.3"/);
const ico = await read('src-tauri/icons/icon.ico');
assert.deepEqual(ico, await read('src-tauri/icons/chats.ico'));
assert.equal(ico.readUInt16LE(2), 1);
const dimensions = Array.from({ length: ico.readUInt16LE(4) }, (_, n) => ico[6 + 16*n] || 256);
for (const n of [16,32,48,64,128,256]) assert.ok(dimensions.includes(n), `Missing ICO frame ${n}`);
assert.deepEqual(await read('src-tauri/icons/128x128.png'), await read('src-tauri/icons/chats-128x128.png'));
for (const n of [192,512]) {
  const png = await read(`public/assets/mak-mobile-${n}.png`);
  assert.equal(png.readUInt32BE(16), n); assert.equal(png.readUInt32BE(20), n);
}
for (const p of ['src/components/MakLogo.tsx','src-tauri/src/main.rs','src-tauri/src/window_identity.rs','index.html']) {
  assert.doesNotMatch(await text(p), /Mr\. Mak|MR\. MAK/);
}
assert.match(await text('LICENSE'), /Copyright \(c\) 2026 Mr\. Mak Workspace contributors/);
assert.match(await text('desktop/prepare.mjs'), /'LICENSE', 'THIRD_PARTY_NOTICES.md'/);
assert.match(await text('scripts/generate-sheesshh-icons.mjs'), /generate-all-sheesshh-icons\.py/);
const digest = createHash('sha256').update(ico).digest('hex');
console.log(`Sheesshh branding checks passed; version=${pkg.version}; ICO frames=${dimensions}; icoSHA256=${digest}`);
