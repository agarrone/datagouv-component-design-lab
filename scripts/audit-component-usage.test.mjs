import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { reconcileUsageStatuses } from './lib/usage-status.mjs';
const load = file => readFile(new URL('../'+file, import.meta.url),'utf8').then(JSON.parse);
const [report, inventory, lock] = await Promise.all(['data/component-usage.json','data/components.json','upstream.lock.json'].map(load));

test('le rapport couvre les deux origines à la référence du lab', () => {
  assert.equal(report.commit, lock.commit);
  assert.deepEqual(Object.keys(report.components).sort(), inventory.map(c=>c.id).sort());
  assert.equal(Object.values(report.summary).reduce((a,b)=>a+b,0),inventory.length);
});
test('les quatre candidats ont été vérifiés séparément des homonymes locaux et des exports', () => {
  const candidates=Object.entries(report.components).filter(([id,c])=>!id.startsWith('cdata/')&&['demo-only','no-runtime-reference'].includes(c.state));
  assert.deepEqual(candidates.map(([id])=>id).sort(),['DiscussionMessageCard','Form/BadgeSelect','PostCard','ResourceAccordion/SchemaLoader']);
  assert.equal(report.components.PostCard.state,'demo-only');
  assert.ok(report.components.PostCard.localNamesakes.some(ref=>ref.file==='components/Post/card.vue'));
  assert.ok(report.components['Form/BadgeSelect'].localNamesakes.some(ref=>ref.file==='components/BadgeSelect.vue'));
  assert.ok(report.components.DiscussionMessageCard.exports.length>0);
  assert.equal(report.components['ResourceAccordion/SchemaLoader'].referenceCount,0);
});
test('imports dynamiques, alias publics et dépendances internes sont pris en compte', () => {
  assert.equal(report.components['Chart/ChartViewerWrapper'].state,'referenced');
  assert.ok(report.components['Chart/ChartViewerWrapper'].runtimeChain.some(ref=>ref.kind==='dynamic-import'));
  assert.ok(report.components.DatasetLabelTag.exports.some(e=>e.name==='LabelTag'));
  assert.equal(report.components.DatasetLabelTag.state,'referenced');
  assert.ok(report.components['TabularExplorer/TabularCellPopover'].runtimeChain.length>1);
});
test('les références produites sont liées au commit vérifié', () => {
  for(const info of Object.values(report.components))for(const ref of [...info.runtimeChain,...info.demoChain,...info.references]) {
    assert.ok(ref.line>0);assert.ok(ref.url.startsWith(`${report.repository}/blob/${report.commit}/`));
    assert.ok(!ref.file.endsWith('/main.ts')&&!ref.file.endsWith('/chart.ts'),'Un export seul ne constitue pas un usage.');
  }
});
test('les changements de statut préservent les décisions et travaux existants', () => {
  const original={unused:'a-auditer',demo:'a-auditer',working:'en-cours',approved:'valide',again:'non-utilise-question',uncertain:'a-auditer'};
  const result=reconcileUsageStatuses(original,{unused:{state:'no-runtime-reference'},demo:{state:'demo-only'},working:{state:'no-runtime-reference'},approved:{state:'demo-only'},again:{state:'referenced'},uncertain:{state:'possible-reference'}});
  assert.deepEqual(result,{unused:'non-utilise-question',demo:'non-utilise-question',working:'en-cours',approved:'valide',again:'a-auditer',uncertain:'a-auditer'});
  assert.equal(original.unused,'a-auditer');
});

test('les composants applicatifs ne sont pas des racines d’usage par leur seule présence',()=>{
 const candidates=Object.entries(report.components).filter(([id,c])=>id.startsWith('cdata/')&&['demo-only','no-runtime-reference'].includes(c.state));
 assert.deepEqual(candidates.map(([id])=>id).sort(),['cdata/Design/ThemeTagFilter','cdata/LogoOnly','cdata/Search/NoResults']);
 assert.equal(report.components['cdata/Design/ThemeTagFilter'].state,'demo-only');
 assert.equal(report.components['cdata/LogoOnly'].state,'demo-only');
 assert.equal(report.components['cdata/Search/NoResults'].referenceCount,0);
 for(const [id,info] of Object.entries(report.components))if(id.startsWith('cdata/')&&info.state==='referenced')assert.ok(info.runtimeChain.length,id);
});
test('les conventions Nuxt sont suivies et les homonymes restent distincts',()=>{
 assert.ok(report.components['cdata/OgImage/Default.takumi'].runtimeChain.some(r=>r.kind==='nuxt-runtime-component'));
 assert.ok(report.components['cdata/Accordion/AccordionGroup.global'].runtimeChain.some(r=>r.kind==='nuxt-auto-import'));
 assert.equal(report.components['cdata/Post/card'].state,'referenced');
 assert.equal(report.components['cdata/BadgeSelect'].state,'referenced');
});
