import {test} from 'node:test';
import assert from 'node:assert/strict';
import {pageRoute,pageExampleUrl} from '../src/pageExampleLinks.js';
import {readFileSync} from 'node:fs';
test('Nuxt index routes retain the right public path',()=>{
  assert.equal(pageRoute('pages/index.vue'),'/');
  assert.equal(pageRoute('pages/reuses/index.vue'),'/reuses');
  assert.equal(pageRoute('pages/admin/datasets/[id]/index.vue'),'/admin/datasets/:id');
});
test('page evidence covers the inventory and excludes injection-key-only BannerAction paths',()=>{
  const report=JSON.parse(readFileSync(new URL('../data/component-page-examples.json',import.meta.url)));
  const inventory=JSON.parse(readFileSync(new URL('../data/components.json',import.meta.url)));
  assert.deepEqual(Object.keys(report.components).sort(),inventory.map(c=>c.id).sort());
  for(const entry of Object.values(report.components))for(const page of entry.pages){
    assert.ok(page.file.startsWith('pages/'));
    assert.equal(page.chain[0].file,page.file);
    assert.ok(page.chain.every(ref=>ref.url.includes(report.commit)));
  }
  assert.ok(report.components.BannerAction.pages.every(page=>page.chain.every(ref=>!ref.text.includes('bannerActionTypeKey'))));
  assert.equal(report.components['Form/BadgeSelect'].pageCount,0);
});
test('dynamic routes without a concrete example never emit broken live links',()=>{
  assert.equal(pageExampleUrl('pages/admin/datasets/[id].vue'),null);
  assert.equal(pageExampleUrl('pages/support/[...path].vue'),null);
  assert.equal(pageExampleUrl('pages/datasets/[did].vue'),'https://www.data.gouv.fr/datasets/base-adresse-nationale');
});
