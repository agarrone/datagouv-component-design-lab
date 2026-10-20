import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {compileScript,compileTemplate,parse} from '@vue/compiler-sfc';
import {adaptIllustrationSources} from './illustration-preview-plugin.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
test('only image sources in native/proposed previews receive a version-aware resolver',()=>{
 const code='<script setup>const image="/demo/user.svg"</script><template><img src="/illustrations/dataset.svg" alt="Données"><img :src="image"><a href="/illustrations/dataset.svg">Lien</a></template>';
 const result=adaptIllustrationSources(code,root+'vendor/cdata-components/Example.vue');
 assert.match(result,/usePreviewIllustration/);
 assert.equal((result.match(/__labIllustration\(/g)||[]).length,2);
 assert.match(result,/<a href="\/illustrations\/dataset.svg">/);
 const {descriptor}=parse(result);assert.ok(compileScript(descriptor,{id:'illustrations'}));
 assert.deepEqual(compileTemplate({source:descriptor.template.content,filename:'Example.vue',id:'illustrations'}).errors,[]);
 assert.equal(adaptIllustrationSources(code,root+'src/AssetFoundations.vue'),undefined);
 assert.equal(adaptIllustrationSources(code,root+'vendor/cdata-components/Example.vue?vue&type=template'),undefined);
});
test('98 exports are local, nonempty, unchanged, uniquely mapped and have traceable Figma nodes',()=>{
 const data=JSON.parse(readFileSync(root+'data/illustration-proposals.json','utf8'));assert.equal(data.assets.length,98);
 const sourceFiles=new Set();
 for(const asset of data.assets){
  assert.match(asset.nodeId,/^\d+:\d+$/);assert.match(asset.url,/^\/proposals\/illustrations\/[a-z0-9-]+\.svg$/);
  const bytes=readFileSync(root+'public'+asset.url);assert.ok(bytes.length>100);assert.match(bytes.toString().slice(0,2200),/<svg\b/);
  assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256);
  for(const file of asset.sourceFiles){assert.ok(!sourceFiles.has(file));sourceFiles.add(file);assert.ok(existsSync(root+'vendor/datagouv-components/assets/illustrations/'+file));}
 }
 assert.equal(sourceFiles.size,98);
 assert.ok(!JSON.stringify(data).includes('/api/mcp/asset/'));
});
import {createIllustrationResolver} from '../src/illustrationURLs.js';
test('current versions and external/data images remain intact; only mapped local proposals change',()=>{
 const resolve=createIllustrationResolver(new Map([['/assets/dataset-hash.svg','/proposals/illustrations/data.svg']]),new Map([['dataset.svg',{url:'/proposals/illustrations/data.svg'}]]));
 assert.equal(resolve('/illustrations/dataset.svg','current'),'/illustrations/dataset.svg');
 assert.equal(resolve('/illustrations/dataset.svg?v=1','proposal'),'/proposals/illustrations/data.svg');
 assert.equal(resolve('/assets/dataset-hash.svg','proposal'),'/proposals/illustrations/data.svg');
 assert.equal(resolve('https://other.example/illustrations/dataset.svg','proposal'),'https://other.example/illustrations/dataset.svg');
 assert.equal(resolve('/demo/territories.svg','proposal'),'/demo/territories.svg');
 assert.equal(resolve('/illustrations/unmapped.svg','proposal'),'/illustrations/unmapped.svg');
 assert.equal(resolve(null,'proposal'),null);
});
