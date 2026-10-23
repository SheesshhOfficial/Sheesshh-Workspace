import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

// Tauri restores the unpatched build after bundling. Permit only its exact NSIS
// marker replacement, never arbitrary executable differences or changed length.
// https://github.com/tauri-apps/tauri/blob/dev/crates/tauri-bundler/src/bundle.rs
export function verifyNsisBinary(original, packaged) {
  const from = Buffer.from('__TAURI_BUNDLE_TYPE_VAR_UNK');
  const to = Buffer.from('__TAURI_BUNDLE_TYPE_VAR_NSS');
  const offset = original.indexOf(from);
  if (offset < 0) throw new Error('Expected original Tauri bundle marker missing.');
  const expected = Buffer.from(original);
  to.copy(expected, offset);
  if (!expected.equals(packaged)) throw new Error('Packaged executable differs beyond the documented Tauri NSIS marker.');
  return { byteComparison: 'PASS', bundleMarker: 'NSS', markerOffset: offset };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(JSON.stringify(verifyNsisBinary(readFileSync(process.argv[2]), readFileSync(process.argv[3]))));
}
