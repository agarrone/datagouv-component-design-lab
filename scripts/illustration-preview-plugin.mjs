import {parse} from '@vue/compiler-sfc';
import {parse as parseTemplate} from '@vue/compiler-dom';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const folders=['vendor/datagouv-components/src/components/','vendor/cdata-components/','proposals/components/'];
const escapeAttribute=text=>text.replace(/&/g,'&amp;').replace(/"/g,'&quot;');
export function adaptIllustrationSources(code,id){
 if(id.includes('?') || !id.endsWith('.vue') || !folders.some(folder=>id.startsWith(root+folder)))return;
 const {descriptor}=parse(code);if(!descriptor.template)return;
 const ast=parseTemplate(descriptor.template.content),edits=[];
 function visit(node){
  if(node.type===1 && ['img','NuxtImg','nuxt-img'].includes(node.tag))for(const prop of node.props){
   const start=descriptor.template.loc.start.offset+prop.loc.start.offset;
   const end=descriptor.template.loc.start.offset+prop.loc.end.offset;
   if(prop.type===6 && prop.name==='src' && prop.value)edits.push({start,end,text:`:src="${escapeAttribute(`__labIllustration(${JSON.stringify(prop.value.content)})`)}"`});
   if(prop.type===7 && prop.name==='bind' && prop.arg?.content==='src'){
    const expression=prop.exp?.content || 'src';
    edits.push({start,end,text:`:src="${escapeAttribute(`__labIllustration(${expression})`)}"`});
   }
  }
  for(const child of node.children || [])visit(child);
 }
 visit(ast);if(!edits.length)return;
 for(const edit of edits.sort((a,b)=>b.start-a.start))code=code.slice(0,edit.start)+edit.text+code.slice(edit.end);
 const setup="\nimport {usePreviewIllustration} from '/src/usePreviewIllustration.js';\nconst __labIllustration=usePreviewIllustration();\n";
 if(/<script\s+setup\b/.test(code))return code.replace(/(<script\s+setup[^>]*>)/,`$1${setup}`);
 return `<script setup>${setup}</script>\n${code}`;
}
export function illustrationPreviewPlugin(){return {name:'proposed-illustration-sources',enforce:'pre',transform:adaptIllustrationSources};}
