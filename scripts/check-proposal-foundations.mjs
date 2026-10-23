import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {parse} from '@vue/compiler-sfc';
import {parse as parseTemplate} from '@vue/compiler-dom';
import postcss from 'postcss';
import {foundationTokens} from './proposal-foundations.mjs';
const walk=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(`${dir}/${e.name}`):[`${dir}/${e.name}`]);
const files=walk(fileURLToPath(new URL('../proposals/',import.meta.url))).filter(p=>/\.(vue|css)$/.test(p)&&!p.endsWith('/foundations.css'));
let components=0,icons=0;
const utilitySource=readFileSync(new URL('../proposals/shared/foundation-utilities.css',import.meta.url),'utf8');
for(const file of files){
 const text=readFileSync(file,'utf8');
 assert.doesNotMatch(text,/\bRi[A-Z]\w*Fill\b/,`${file}: utiliser la variante outline Line de l’icône`);
 assert.doesNotMatch(text,/\b(?:text|bg|rounded)-\[/,`${file}: utilitaire arbitraire hors des fondamentaux ; utiliser un jeton partagé`);
 for(const [,name] of text.matchAll(/var\(--lab-ds-([\w-]+)/g))assert.ok(name in foundationTokens,`${file}: jeton inconnu ${name}`);
 assert.doesNotMatch(text,/(?:hover|focus|focus-visible|active|disabled|sm|md|lg):!?lab-ds-u-/,`${file}: variante utilitaire inexistante ; utiliser un sélecteur de proposition explicite`);
 assert.doesNotMatch(text,/[:!]lab-ds-u-rounded/,`${file}: un nom de prop a été remplacé par un utilitaire`);
 let styles=[text];
 if(file.endsWith('.vue')){
  const {descriptor,errors}=parse(text);assert.equal(errors.length,0,`${file}: SFC invalide`);styles=descriptor.styles.map(s=>s.content);
  function checkIcons(node){
   if(node.type===1){
    const boundIs=node.props.find(p=>p.type===7&&p.name==='bind'&&p.arg?.content==='is')?.exp?.content||'';
    const icon=/^Ri[A-Z]/.test(node.tag)||(node.tag==='component'&&(/icon/i.test(boundIs)||/Ri[A-Z]/.test(boundIs)))||node.tag==='svg';
    if(icon){
     icons++;
     // Custom SVG charts retain their own layout; interface icons use the shared class.
     if(!(node.tag==='svg'&&node.props.some(p=>p.type===6&&p.name==='data-icon-size'&&p.value?.content==='custom')))assert.ok(node.props.some(p=>p.type===6&&p.name==='class'&&p.value?.content.split(/\s+/).includes('lab-ds-icon')),`${file}: icône sans la classe commune lab-ds-icon`);
     for(const name of ['data-icon-size','aria-hidden','focusable'])assert.ok(node.props.some(p=>(p.type===6?p.name:p.arg?.content)===name),`${file}: icône sans ${name}`);
     assert.ok(!/Fill$/.test(node.tag),`${file}: préférer une icône Line ou documenter une exception`);
    }
   }
   for(const child of node.children||[])checkIcons(child);
  }
  if(descriptor.template)checkIcons(parseTemplate(descriptor.template.content));

  if(file.includes('/components/')){components++;assert.match(descriptor.scriptSetup?.content||'',/import ['"][^'"]*foundations\.css['"]/,`${file}: importer les fondamentaux`);}
  for(const [,name] of (descriptor.template?.content||'').matchAll(/\b(lab-ds-u-[\w-]+)/g))assert.ok(utilitySource.includes(`.${name}{`),`${file}: utilitaire inconnu ${name}`);
 }
 for(const css of styles)postcss.parse(css).walkDecls(d=>{
  assert.doesNotMatch(d.value, /#[\da-f]{3,8}\b/i,`${file}: couleur hors des jetons (${d.prop})`);
  if(['font-size','font-family','border-radius'].includes(d.prop))assert.ok(/var\(--lab-ds-|^(inherit|initial|unset)$/.test(d.value),`${file}: ${d.prop} hors des jetons (${d.value})`);
  if(/^(padding|margin|gap|row-gap|column-gap)(-|$)/.test(d.prop))assert.doesNotMatch(d.value,/(?<![\w-])(?:2|3|4|6|8|10|12|16|20|24|32|40|48|64)px\b/,`${file}: espacement hors des jetons`);
 });
}
console.log(`${components} propositions : imports, couleurs, typographie, rayons et espacements partagés vérifiés ; ${icons} icônes explicites contrôlées.`);
