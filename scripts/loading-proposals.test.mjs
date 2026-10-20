import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {parse,compileScript} from '@vue/compiler-sfc';
import ts from 'typescript';
import {createRenderer,nextTick} from 'vue';
const filename=new URL('../proposals/shared/UnicodeLoader.vue',import.meta.url);
const {descriptor}=parse(await readFile(filename,'utf8'));
const compiled=compileScript(descriptor,{id:'loader-test',inlineTemplate:true});
const code=ts.transpileModule(compiled.content,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText.replaceAll('from "vue"',`from ${JSON.stringify(import.meta.resolve('vue'))}`).replaceAll("from 'vue'",`from ${JSON.stringify(import.meta.resolve('vue'))}`);
const {default:Loader}=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
const renderer=createRenderer({createElement:tag=>({tag,children:[]}),insert:(node,parent)=>parent.children.push(node),remove:()=>{},setElementText:(node,text)=>node.text=text,patchProp:()=>{},createText:text=>({text}),createComment:text=>({text}),setText:(node,text)=>node.text=text,parentNode:()=>null,nextSibling:()=>null});
test('Unicode loader stops for reduced motion, resumes on preference changes and cleans up',async()=>{
 const originals={matchMedia:globalThis.matchMedia,setInterval:globalThis.setInterval,clearInterval:globalThis.clearInterval};
 let listener,callback,intervals=0,clears=0,removed=false;
 const media={matches:true,addEventListener:(_,fn)=>listener=fn,removeEventListener:(_,fn)=>{removed=fn===listener}};
 globalThis.matchMedia=()=>media;
 globalThis.setInterval=(fn,delay)=>{assert.equal(delay,80);callback=fn;intervals++;return 1};
 globalThis.clearInterval=()=>{clears++};
 const app=renderer.createApp(Loader),root={children:[]};
 try{
  app.mount(root);assert.equal(intervals,0);
  media.matches=false;listener();assert.equal(intervals,1);
  const initial=root.children[0].text;callback();await nextTick();assert.notEqual(root.children[0].text,initial);
  media.matches=true;listener();await nextTick();assert.equal(root.children[0].text,initial);
  app.unmount();assert.ok(removed);assert.ok(clears>=3);
 }finally{Object.assign(globalThis,originals)}
});
