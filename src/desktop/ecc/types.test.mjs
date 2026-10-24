import assert from 'node:assert/strict'
import test from 'node:test'
import { sourceLink, kindLabels } from './types.ts'
const catalog = { source: { repo: 'affaan-m/everything-claude-code', commit: 'a'.repeat(40) } }
test('source links pin an exact revision and encode filenames', () => {
  assert.equal(sourceLink(catalog, 'skills/a b/SKILL.md'), `https://github.com/affaan-m/everything-claude-code/blob/${'a'.repeat(40)}/skills/a%20b/SKILL.md`)
})
test('source links reject non-GitHub and unpinned sources', () => {
  assert.equal(sourceLink({ source: { repo: 'https://evil.example/a/b', commit: 'a'.repeat(40) } }), null)
  assert.equal(sourceLink({ source: { repo: 'a/b', commit: 'main' } }), null)
  assert.equal(sourceLink({ source: { repo: 'javascript:alert(1)', commit: 'a'.repeat(40) } }), null)
})
test('library has exactly the five instruction families', () => {
  assert.deepEqual(Object.keys(kindLabels), ['skill', 'role', 'command', 'rule', 'context'])
})
