import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {resolve,relative,dirname} from 'node:path';
import ts from 'typescript';
import {parse} from '@vue/compiler-sfc';
const root=decodeURIComponent(new URL('../',import.meta.url).pathname);
const application=resolve(root,'vendor/cdata-components');
const runtime=resolve(root,'vendor/cdata-runtime');
const adapter='/src/compat/application/runtime.js';
function files(dir) {return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(resolve(dir,e.name)):[resolve(dir,e.name)]);}
const normalize=s=>s.replace(/[^a-z0-9]/gi,'').toLowerCase();
const names=new Map();
for(const file of files(application).filter(f=>f.endsWith('.vue'))) {
 const parts=relative(application,file).replace(/\.(global|client|server|takumi)?\.?vue$/,'').split('/');
 for(let i=0;i<parts.length;i++) {
  let name='';for(const p of parts.slice(i)) if(!normalize(name).endsWith(normalize(p))) name+=p;
  const key=normalize(name);
  if(!names.has(key)) names.set(key,file);
 }
}
const auto=new Map();
for(const file of files(runtime).filter(f=>/\.(ts|js)$/.test(f)&&!f.endsWith('.d.ts'))) {
 const code=readFileSync(file,'utf8');
 for(const match of code.matchAll(/export\s+(?:async\s+)?(?:function|const|class)\s+(\w+)/g)) auto.set(match[1],file);
}
const vueNames=new Set(['ref','shallowRef','reactive','shallowReactive','computed','watch','watchEffect','watchPostEffect','watchSyncEffect','onMounted','onUnmounted','onBeforeMount','onBeforeUnmount','onUpdated','nextTick','toRef','toRefs','toValue','unref','isRef','readonly','provide','inject','useId','useTemplateRef','useAttrs','useSlots','defineAsyncComponent','h','resolveComponent','markRaw','onScopeDispose','effectScope','getCurrentInstance','toRaw','triggerRef','isReactive','isReadonly']);
const mocked=new Set(['useTranslation','useAPI','useNuxtApp','useRuntimeConfig','useAppConfig','useState','useMe','useMaybeMe','useAsyncData','useFetch','useLoadingIndicator','useRoute','useRouter','navigateTo','createError','showError','useHead','useSeoMeta','definePageMeta','useRequestURL','useRequestHeaders','useCookie','useSite','useInstance','usePostApiWithCsrf','useLogout','useNotifications','useNotificationSettings','useMarkAsRead','useLinkPreview','useLinkPreviewProvider','$fetch']);
const builtin=new Set(['nuxtlink','nuxtimg','nuxtpicture','clientonly','teleport','transition','transitiongroup','suspense','keepalive','nuxtpage']);
function url(file){return '/'+relative(root,file);}
function adapt(code,id) {
 code=code.replace(/import type \{ NuxtLinkProps \} from '#app'/g,"type NuxtLinkProps={to?:string | object;href?:string;external?:boolean}");
 code=code.replace(/(['"])(~\/|@\/)([^'"]+)\1/g,(_,quote,prefix,path)=>quote+resolve(path.startsWith('components/')?application:runtime,path.startsWith('components/')?path.slice(11):path)+quote);

 const isVue=id.endsWith('.vue');
 const body=isVue ? parse(code).descriptor.scriptSetup?.content : code;
 const imported=new Set();
 const ast=ts.createSourceFile(id,body || '',ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
 function bindings(node) {if(ts.isIdentifier(node))imported.add(node.text);else if(ts.isObjectBindingPattern(node)||ts.isArrayBindingPattern(node))for(const e of node.elements)if(ts.isBindingElement(e))bindings(e.name);}
 for(const node of ast.statements) {
  if(ts.isImportDeclaration(node)) {if(node.importClause?.name && !node.importClause.isTypeOnly) imported.add(node.importClause.name.text);for(const item of node.importClause?.namedBindings?.elements || []) if(!node.importClause.isTypeOnly && !item.isTypeOnly)imported.add(item.name.text);}
  if(ts.isVariableStatement(node)) for(const d of node.declarationList.declarations) bindings(d.name);
  if((ts.isFunctionDeclaration(node)||ts.isClassDeclaration(node))&&node.name) imported.add(node.name.text);
 }
 const additions=[];
 const source=(body || '')+(isVue ? parse(code).descriptor.template?.content || '' : '');
 function propsBindings(node){if(ts.isPropertySignature(node)&&node.name&&ts.isIdentifier(node.name))imported.add(node.name.text);ts.forEachChild(node,propsBindings);} propsBindings(ast);
 const referenced=new Set([...source.matchAll(/\b([A-Za-z_$][\w$]*)\b/g)].map(m=>m[1]));
 for(const name of referenced) if(!imported.has(name)) {
  if(vueNames.has(name)) additions.push(`import {${name}} from 'vue'`);
  else if(mocked.has(name)) additions.push(`import {${name}} from '${adapter}'`);
  else if(['onBeforeRouteLeave','onBeforeRouteUpdate'].includes(name)) additions.push(`import {${name}} from '${adapter}'`);
  else if(auto.has(name)) additions.push(`import {${name}} from '${url(auto.get(name))}'`);
  else if(['useDebounceFn','useWindowSize','useEventListener','useUrlSearchParams','useDropZone','useIntersectionObserver','useLocalStorage','useMediaQuery','useScroll','useElementBounding','useResizeObserver','useActiveElement','onClickOutside','useClipboard','useThrottleFn'].includes(name)) additions.push(`import {${name}} from '@vueuse/core'`);
 }
 if(source.includes('$fetch')&&!imported.has('$fetch')&&!additions.some(line=>line.includes('{$fetch}')))additions.push(`import {$fetch} from '${adapter}'`);
 if(isVue) {
  const template=parse(code).descriptor.template?.content || '';
  for(const match of template.matchAll(/<([A-Z][\w-]*|[a-z]+-[\w-]+)/g)) {
   const tag=match[1],binding=tag.replace(/(^|-)(\w)/g,(_,a,b)=>b.toUpperCase());
   if(imported.has(tag)||imported.has(binding)) continue;
   const target=names.get(normalize(tag));
   if(target&&target!==id) {const alias='PreviewComponent'+binding; additions.push(`import ${alias} from '${url(target)}'`); code=code.replace(new RegExp('<(/?)'+tag+'(?=[\\s/>])','g'),'<$1'+alias); imported.add(binding);}
   else if(builtin.has(normalize(tag))) {additions.push(`import {${binding}} from '${adapter}'`);imported.add(binding);}
  }
 }
 if(!additions.length)return code;
 if(isVue) return /<script setup/.test(code)?code.replace(/(<script setup[^>]*>)/,`$1\n${additions.join('\n')}\n`):`<script setup>\n${additions.join('\n')}\n</script>\n${code}`;
 return additions.join('\n')+'\n'+code;
}
export function applicationPreviewPlugin() {return {name:'application-preview-nuxt-imports',enforce:'pre',resolveId(source,importer){
 if(importer && source.startsWith('.')) { const full=resolve(dirname(importer.split('?')[0]),source); for(const folder of ['components','utils','composables','types','api','assets']) { const prefix=resolve(root,'vendor',folder)+'/'; if(full.startsWith(prefix))return resolve(folder==='components'?application:resolve(runtime,folder),full.slice(prefix.length)); } }

 if(source==='#components'||source==='#app'||source==='@sentry/nuxt')return resolve(root,'src/compat/application/runtime.js');
 if(source.startsWith('~/components/')||source.startsWith('@/components/'))return resolve(application,source.split('/components/')[1]);
 if(source.startsWith('~/')||source.startsWith('@/')) {
  const path=source.slice(2);
  if(['utils/auth','utils/api','composables/useNotifications.client','composables/useMarkAsRead','composables/useLogout'].includes(path))return resolve(root,'src/compat/application/runtime.js');
  return resolve(runtime,path);
 }
},transform(code,id){if(!id.includes('?') && id.includes('/vendor/datagouv-components/') && id.endsWith('.vue') && code.includes('<TextClamp') && !/import TextClamp/.test(code)) return code.replace(/(<script setup[^>]*>)/,"$1\nimport TextClamp from '/vendor/cdata-components/TextClamp.client.vue'\n");
 if(id.includes('?')||(!id.startsWith(application+'/' )&&!id.startsWith(runtime+'/')))return;return adapt(code,id);}};}
