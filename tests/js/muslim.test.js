// JS tests — run: node --test tests/js/muslim.test.js  (Node 18+)
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import muslim from 'sahih-muslim';

describe('Muslim', () => {
  it('has hadiths', () => { assert.ok(muslim.length > 0); });
  it('get(1) returns hadith', () => { const h = muslim.get(1); assert.ok(h); assert.equal(h.id, 1); });
  it('get(999999) returns undefined', () => { assert.equal(muslim.get(999999), undefined); });
  it('getByChapter(1) returns array', () => { const h = muslim.getByChapter(1); assert.ok(Array.isArray(h)); assert.ok(h.length > 0); });
  it('search returns results', () => { assert.ok(muslim.search('prayer').length > 0); });
  it('search limit works', () => { assert.ok(muslim.search('prayer', 5).length <= 5); });
  it('getRandom returns hadith', () => { const h = muslim.getRandom(); assert.ok(h.id); });
  it('index access works', () => { assert.ok(muslim[0].id); });
  it('metadata has title', () => { assert.ok(muslim.metadata.english.title); });
  it('chapters is array', () => { assert.ok(Array.isArray(muslim.chapters)); });
});
