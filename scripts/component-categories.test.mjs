import test from 'node:test';
import assert from 'node:assert/strict';
import inventory from '../data/components.json' with {type:'json'};
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import ts from 'typescript';
// Compiler les imports JSON comme Vite, pour exécuter le classement sous Node.
const file=new URL('../src/typePages.js',import.meta.url);
const source=ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
const exported={};
new Function('require','exports',source)(createRequire(file),exported);
const {visibleTypePages}=exported;
import applicationCategories from '../src/applicationCategories.json' with {type:'json'};

test('chaque composant appartient à une catégorie visible et chaque lien existe',()=>{
 const ids=Object.values(visibleTypePages).flatMap(p=>p.sections.flatMap(s=>s.items.map(i=>i.id)));
 const known=new Set(inventory.map(c=>c.id));
 assert.deepEqual(inventory.filter(c=>!ids.includes(c.id)).map(c=>c.id),[]);
 assert.deepEqual([...new Set(ids.filter(id=>!known.has(id)))],[]);
 for(const page of Object.values(visibleTypePages))for(const section of page.sections){
  assert.ok(section.items.length,`Section vide : ${section.title}`);
  assert.equal(new Set(section.items.map(i=>i.key)).size,section.items.length,`Clés dupliquées : ${section.title}`);
 }
});
test('le classement applicatif couvre les composants cdata une seule fois',()=>{
 const ids=Object.values(applicationCategories).flat();
 assert.deepEqual([...ids].sort(),inventory.filter(c=>c.origin==='cdata').map(c=>c.id).sort());
 assert.ok(!('application' in visibleTypePages));
});
