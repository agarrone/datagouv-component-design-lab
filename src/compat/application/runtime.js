// Adaptateurs locaux pour l’exécution des composants Nuxt dans le laboratoire.
// Aucune action ne contacte l’application ou ne modifie un compte réel.
import {ref,computed,toValue,defineComponent,h,inject,provide,getCurrentInstance} from 'vue';
import * as fixtures from '../../fixtures';
import {responseFor} from '../../demoApi';
import sourceLock from '../../../upstream.lock.json';
export {Teleport,Transition,TransitionGroup,Suspense,KeepAlive} from 'vue';
export {useTranslation} from './translation';
const defaultRoute=()=>({path:'/datasets/demo-dataset/',fullPath:'/datasets/demo-dataset/',params:{id:'demo-dataset',oid:'demo-org',dataset:'demo-dataset',slug:'demo',rid:'demo-resource'},query:{},hash:'',name:'demo'});
export const useRoute=()=> (getCurrentInstance() && inject('application-preview-route',null)) || defaultRoute();
export const useRouter=()=> (getCurrentInstance() && inject('application-preview-router',null)) || ({resolve:to=>({href:typeof to==='string'?to:'#',fullPath:typeof to==='string'?to:'#',path:typeof to==='string'?to.split('?')[0]:'/',query:{}}),push:async()=>{},replace:async()=>{},back:()=>{},currentRoute:ref(useRoute()),beforeEach:()=>()=>{},getRoutes:()=>[]});
export const onBeforeRouteLeave=()=>{},onBeforeRouteUpdate=()=>{};
const me={...fixtures.user,active:true,roles:['admin'],email:'camille@example.test',organizations:[fixtures.organization],metrics:{datasets:24,reuses:8,followers:32},permissions:{},notifications_paused:false};
const states=new Map();
export function useState(key,initial=()=>null){if(!states.has(key))states.set(key,ref(initial()));return states.get(key);}
export const useMe=()=>ref(me),useMaybeMe=useMe;
export const isAdmin=()=>true,isMeAdmin=()=>true,isUserOrgAdmin=()=>true;
export const loadMe=async()=>me;
export const useLogout=()=>async()=>{};
export const useRuntimeConfig=()=>({public:{title:'data.gouv.fr',apiBase:(typeof location==='undefined'?'http://localhost':location.origin)+'/demo-api',apiBaseUrl:'/demo-api',baseUrl:'https://www.data.gouv.fr',siteUrl:'https://www.data.gouv.fr',enableAuth:false,enableNotifications:false,features:{},geopf:{},sentry:{},search:{},captcheta:{style:'demo'},commonFrequencies:['annual','monthly'],licenses:{Ouvertes:[{value:'lov2',recommended:true}]},readOnly:false,baseDomain:'data.gouv.fr',apiBaseExternal:'https://www.data.gouv.fr',schemasSite:{name:'schema.data.gouv.fr',url:'https://schema.data.gouv.fr'},guidesUrl:'#',forumUrl:'#'},app:{baseURL:'/'}});
export const useAppConfig=()=>({theme:{},features:{},isFrenchGovernment:true,commitId:sourceLock.commit.slice(0,7)});
export const useInstance=()=>ref({name:'data.gouv.fr',title:'data.gouv.fr',url:'https://www.data.gouv.fr',features:{},metrics:{datasets:24,organizations:12,reuses:8}});
const pagination=data=>({data,total:data.length,page:1,page_size:20,next_page:null,previous_page:null});
export function demoResponse(url,options={}) {
 const raw=String(toValue(url)||'');
 const path=(raw.startsWith('http') ? new URL(raw).pathname : raw).split('?')[0];
 if(path.includes('/notifications/resolve'))return (options.body?.scopes || []).map(scope=>({scope,state:'none',effective:false,muted:false,heard_types:[],rules:[]}));
 if(path.includes('captchetat'))return {uuid:'demo-captcha',imageb64:'/demo/captcha.svg'};
 if(path.includes('/contacts/roles'))return [{id:'contact',label:'Contact'}];
 if(path.includes('/reports/reasons'))return [{id:'spam',value:'spam',label:'Contenu indésirable'}];
 if(path.includes('/geopf/status/'))return {push:{datastore_id:null,datasheet_url:null},pull:{status:null,last_synced_at:null,error:null,task_id:null},pushable:[],offerings:[]};
 if(path.includes('/datasets/licenses'))return [fixtures.license];
 if(path.includes('/resources/'))return /\/resources\/[^/]+\/$/.test(path)?fixtures.resource:pagination([fixtures.resource]);
 if(path.includes('/me/api_tokens'))return [];
 if(path.includes('/datasets/extensions'))return ['csv','json','geojson','xlsx','ods'];
 if(path.includes('/datasets/schemas'))return [fixtures.schema];
 if(path.includes('/spam/reasons'))return [{id:'spam',label:'Contenu indésirable',value:'spam'}];
 if(path.includes('/reuses/types'))return [{id:'visualization',label:'Visualisation'}];
 if(path.includes('/reuses/topics'))return [{id:'society',label:'Société'}];
 if(path.includes('/transfer/'))return [];

 if(path.includes('/datasets/frequencies'))return [{id:'annual',label:'Annuelle'},{id:'monthly',label:'Mensuelle'}];
 if(path.includes('/organizations/roles'))return [{id:'admin',label:'Administrateur',description:'Gérer l’organisation'},{id:'editor',label:'Éditeur',description:'Publier des données'}];
 if(path.includes('/harvest/source/preview'))return {id:'demo-job',status:'done',items:[],errors:[],stats:{added:0,updated:0,deleted:0,skipped:0,failed:0},source:{id:'demo-harvester',name:'Catalogue de démonstration'},created_at:'2026-10-01',data:{data:[],next_page:null},links:{},href:'#'};
 if(path.includes('/harvest/backends'))return [{id:'dcat',label:'DCAT',name:'DCAT',config:{},schema:{},filters:[],features:[],extra_configs:[]}];
 if(path.includes('/reuses/')&&!path.endsWith('/reuses/'))return fixtures.reuse;
 if(path.includes('/discussion/')||path.includes('/discussions/'))return pagination([{...fixtures.discussion,permissions:{close:true,edit:true,delete:true},discussion:fixtures.discussion.discussion.map(c=>({...c,id:'demo-comment',permissions:{edit:true,delete:true},spam:false}))}]);
 if(path.includes('reason_categories'))return [{value:'personal_data',label:'Données personnelles'},{value:'other',label:'Autre'}];
 if(path.includes('notifications'))return pagination([]);
 if(path.includes('/me')||path.includes('/auth'))return me;
 if(path.includes('site'))return {id:'demo-site',title:'Données publiques',slug:'demo',blocs:[],pages:[],menus:[],settings:{},organization:fixtures.organization};
 if(path.includes('/organizations/')&&!path.endsWith('/organizations/'))return fixtures.organization;
 if(path.includes('/datasets/')&&!path.endsWith('/datasets/')&&!path.includes('/resources/'))return fixtures.datasetFull || fixtures.dataset;
 if(path.includes('/dataservices/')&&!path.endsWith('/dataservices/'))return fixtures.dataservice;
 if(path.includes('/users/')&&!path.endsWith('/users/'))return me;
 if(path.includes('datasets'))return pagination([fixtures.dataset]);
 if(path.includes('dataservices'))return pagination([fixtures.dataservice]);
 if(path.includes('organizations'))return pagination([fixtures.organization]);
 if(path.includes('users'))return pagination([me]);
 if(path.includes('reuses'))return pagination([fixtures.reuse]);
 if(path.includes('resources'))return pagination([fixtures.resource]);
 if(path.includes('metrics'))return {data:fixtures.stats,...fixtures.organization.metrics};
 return responseFor(path,options.query || {});
}
export async function $fetch(url,options){return demoResponse(url,options);}
$fetch.create=()=>$fetch;
$fetch.raw=async(url,options)=>({_data:demoResponse(url,options),headers:new Headers(),status:200});
export function useAPI(url,options={}) {const result={data:ref(demoResponse(url,options)),error:ref(null),status:ref('success'),pending:ref(false),refresh:async()=>{},execute:async()=>{},clear:()=>{}};return Object.assign(Promise.resolve(result),result);}
export const useFetch=useAPI;
export function useAsyncData(key,callback){if(typeof key==='function')callback=key;const data=ref(null);const result={data,error:ref(null),status:ref('success'),pending:ref(false),refresh:async()=>{},execute:async()=>{}};return Object.assign(Promise.resolve().then(async()=>{data.value=await callback?.();return result;}),result);}
const api=Object.assign($fetch,{raw:$fetch.raw});
export function useNuxtApp(){return {$api:api,$fetch:api,$i18n:{t:text=>text,locale:ref('fr')},$config:useRuntimeConfig(),$toast:{success:()=>{},error:()=>{},info:()=>{}},provide:()=>{},hook:()=>{}};}
export const usePostApiWithCsrf=()=>api;
export const navigateTo=async()=>{};
export const createError=info=>new Error(typeof info==='string'?info:info?.statusMessage || 'Erreur de démonstration');
export const showError=()=>{},useHead=()=>{},useSeoMeta=()=>{},definePageMeta=()=>{},captureException=()=>{};
export const useLoadingIndicator=()=>({start:()=>{},finish:()=>{},isLoading:ref(false)});
export const useRequestURL=()=>new URL('https://www.data.gouv.fr');
export const useRequestHeaders=()=>({});
export const useCookie=()=>ref(null);
export const useSiteLegacy=()=>ref({id:'demo-site',title:'Les données publiques',name:'data.gouv.fr',slug:'demo',blocs:[],pages:[],menus:[],organization:fixtures.organization});
export const useNotifications=()=>({notifications:ref([]),pendingNotifications:ref([]),nextPage:ref(null),notificationsCombinedList:ref([]),notificationsToRead:ref(0),loadNotifications:async()=>{},loadMoreNotifications:async()=>{},refreshNotifications:async()=>{},refreshPendingNotifications:async()=>{},unreadCount:ref(0),refresh:async()=>{},markAsRead:async()=>{}});
export const useNotificationSettings=()=>{
 const rules=new Map(),paused=ref(false);
 const key=(scope,event)=>JSON.stringify([scope,event]);
 const resolved=(scope,event)=>{const value=rules.get(key(scope,event));return {scope,event,heard:value!==false,muted:value===false,partial:false,reasons:value===false?[]:['explicit_subscriber'],followed_events:[],heard_types:['discussion.new'],subject:{title:fixtures.dataset.title}};};
 return {settings:ref({}),paused,refresh:async()=>{},save:async()=>{},follow:async(scope,event,enabled)=>{rules.set(key(scope,event),enabled);return resolved(scope,event);},mute:async({scope,event})=>{rules.set(key(scope,event),false);},setRule:async({scope,event},value)=>{if(value===null)rules.delete(key(scope,event));else rules.set(key(scope,event),value);},resolveFollows:async(scopes,event)=>scopes.map(scope=>resolved(scope,event))};
};
export const useMarkAsRead=()=>({markWithoutActionAsRead:async()=>{},markAsRead:async notification=>{if(!notification.requires_action)notification.handled_at=new Date().toISOString();},loading:ref(false)});
export const useLinkPreview=()=>({preview:ref(null),loading:ref(false),fetchPreview:async()=>{}});
export const useLinkPreviewProvider=()=>{};
export const NuxtLink=defineComponent({inheritAttrs:false,props:['to','external'],setup:(p,{attrs,slots})=>()=>h('a',{...attrs,href:typeof p.to==='string'?p.to:'#',onClick:e=>e.preventDefault()},slots.default?.())});
export const NuxtImg=defineComponent({inheritAttrs:false,props:['src','alt','width','height'],setup:(p,{attrs})=>()=>h('img',{...attrs,src:p.src || '/demo/organization.svg',alt:p.alt || '',width:p.width,height:p.height})});
export const NuxtPicture=NuxtImg;
export const ClientOnly=defineComponent({setup:(_,ctx)=>()=>ctx.slots.default?.()});
export const NuxtPage=ClientOnly;

export const captureMessage=()=>{};

export const useSite=()=>useAPI('/api/1/site/');
