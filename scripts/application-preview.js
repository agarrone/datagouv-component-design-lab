import {createApp,h,nextTick} from 'vue';
import {createRouter,createMemoryHistory} from 'vue-router';
import Demo from '../src/Demo.vue';
import PreviewVersion from '../src/PreviewVersion.vue';
import {badgeVariants} from '../src/badgeExamples.js';
import {qualityVariants} from '../src/qualityExamples.js';
import {cardVariants} from '../src/cardExamples.js';
import {adminSidebarVariants} from '../src/adminSidebarExamples.js';
import {avatarVariants} from '../src/avatarExamples.js';
import {translate} from '../src/compat/application/translation';
import {$fetch,useRuntimeConfig} from '../src/compat/application/runtime';
import inventory from '../data/components.json';
import '@gouvfr/dsfr/dist/dsfr.min.css';
const params=new URLSearchParams(location.search);
const all=inventory.filter(c=>params.get('origin')==='all'?true:params.get('origin')==='library'?c.origin!=='cdata':c.origin==='cdata');
const selection=params.get('ids')?.split(',');
const components=selection ? all.filter(c=>selection.includes(c.id)) : all.slice(Number(params.get('start')||0),Number(params.get('end')||all.length));
const results=document.querySelector('#results'),progress=document.querySelector('#progress');
const delay=ms=>new Promise(r=>setTimeout(r,ms));
const variants=params.get('variants')==='quality'?qualityVariants:params.get('variants')==='cards'?cardVariants:params.get('variants')==='sidebar'?adminSidebarVariants:params.get('variants')==='avatars'?avatarVariants:params.get('variants')==='badges'?badgeVariants:{};
const cases=components.flatMap(c=>variants[c.id]?variants[c.id].map(v=>({...c,case:v.label,props:v.props})):[c]);
for(const c of cases){
 const errors=[],warnings=[];
 const root=document.querySelector('#mount');
 const router=createRouter({history:createMemoryHistory(),routes:[{path:'/:pathMatch(.*)*',component:{render:()=>null}}]});
 const app=createApp({render:()=>h(PreviewVersion,{version:params.get('version')==='proposal'?'proposal':'current'},()=>h(Demo,{name:c.id,sampleProps:c.props}))});
 app.config.globalProperties.$t=translate;
 app.config.globalProperties.$api=$fetch;app.config.globalProperties.$config=useRuntimeConfig();
 app.config.errorHandler=(e,vm,info)=>errors.push(String(e?.stack || e)+' | '+info);
 app.config.warnHandler=message=>{if(/Failed to resolve component|Property .*not defined|Missing required prop|Invalid prop/.test(message))warnings.push(message);};
 const unhandled=event=>{errors.push(String(event.reason?.stack || event.reason));event.preventDefault();};
 window.addEventListener('unhandledrejection',unhandled);
 app.use(router);
 try {
  app.mount(root);
  for(let attempt=0;attempt<100;attempt++){
   await delay(100);await nextTick();
   if(!root.textContent.includes('Chargement de l’exemple'))break;
  }
  await delay(250);await nextTick();
  if(root.textContent.includes('Chargement de l’exemple'))errors.push('Délai de chargement dépassé');
 }catch(e){errors.push(String(e.stack || e));}
 const entry=document.createElement('pre');
 entry.dataset.component=c.id;entry.dataset.errors=errors.length;entry.dataset.warnings=warnings.length;
 entry.textContent=JSON.stringify({id:c.id,case:c.case,errors,warnings,text:root.textContent.slice(0,180),elements:root.querySelectorAll('*').length});
 results.append(entry);
 app.unmount();root.innerHTML='';window.removeEventListener('unhandledrejection',unhandled);
 progress.textContent=`${results.children.length} / ${cases.length}`;
}
progress.dataset.complete='true';
