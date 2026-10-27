import definitions from '../data/component-options.json';
import inventory from '../data/components.json';
import {notificationVariants} from './notificationExamples';
import * as f from './fixtures';
import {RiDatabase2Line} from '@remixicon/vue';
import {toChartForm} from '../vendor/datagouv-components/src/functions/charts';
const empty=()=>null;
const fixtureFor=(name,type='')=>{
 const n=(name+' '+type).toLowerCase();
 if(type==='ChartForm')return toChartForm(f.chart);
 if(type.includes('PaginatedArray')){const item=type.includes('Organization')?f.organization:type.includes('Dataservice')?f.dataservice:type.includes('Reuse')?f.reuse:f.dataset;return {data:[item],page:1,page_size:20,total:1,next_page:null,previous_page:null};}
 if(name==='subject')return {...f.dataset,class:'Dataset'};
 if(name==='comment')return {...f.discussion.discussion[0],id:'demo-comment',posted_by:f.user,permissions:{edit:true,delete:true},spam:false};
 if(n.includes('form'))return {...f.datasetFull,...f.resource,...f.post,access_type:'open',access_audiences:{local_authority_and_administration:'yes',company_and_association:'under_condition',private:'no'},access_type_reason_category:'other',access_type_reason:'',tags:[],spatial_zones:[],spatial_granularity:null,owned:{organization:f.organization,owner:null},file:null,resource:f.resource,schema_url:null,checksum_type:null,checksum_value:null,backend:'dcat',filters:[],features:{},configs:[],schedule:'',autoarchive:false,active:true,images:[],datasets:[],dataservices:[],content:'Les données publiques.',extras:{},resources:[],blocs:[],links:[],frequency:'annual',contact_points:[],organization:f.organization};
 if(n.includes('accessaudience'))return {local_authority_and_administration:'yes',company_and_association:'under_condition',private:'no'};
 if(name==='request'||n.includes('invitation'))return {id:'demo-request',user:f.user,organization:f.organization,created:'2026-10-01',comment:'Je souhaite contribuer aux données.',email:'camille@example.test',status:'pending',recipient:f.organization,owner:f.user,subject:f.dataset};
 if(n.includes('organization'))return f.organization;
 if(n.includes('dataservice'))return f.dataservice;
 if(n.includes('dataset'))return {...(f.datasetFull || f.dataset),permissions:{edit:true,delete:true},resources:[f.resource]};
 if(n.includes('resource'))return {...f.resource,permissions:{edit:true,delete:true},extras:{...f.resource.extras},file:{name:'population.csv',size:12400,type:'text/csv'},isNew:false};
 if(n.includes('reuse'))return f.reuse;
 if(n.includes('user')||n.startsWith('me ')||n.includes('actor'))return {...f.user,email:'camille@example.test',about:'Une utilisatrice de démonstration.',roles:['admin'],organizations:[f.organization],metrics:{datasets:24,reuses:8,followers:32},website:'https://example.test'};
 if(n.includes('discussion')||n.includes('thread'))return {...f.discussion,permissions:{close:true,delete:true,edit:true},discussion:f.discussion.discussion.map(c=>({...c,permissions:{edit:true,delete:true},spam:false}))};
 if(n.includes('post'))return f.post;
 if(n.includes('chart'))return f.chart;
 if(n.includes('quality'))return f.quality;
 if(n.includes('license'))return f.license;
 if(n.includes('schema'))return f.schema;
 if(n.includes('object')||n.includes('subject'))return f.datasetFull || f.dataset;
 if(n.includes('contact'))return {id:'demo-contact',name:'Équipe des données',email:'contact@example.test',contact_form:'',role:'contact'};
 if(n.includes('site'))return {id:'demo-site',title:'Données publiques',name:'data.gouv.fr',blocs:[],pages:[],menus:[],settings:{},organization:f.organization};
 if(n.includes('bloc')||n.includes('block'))return {id:'demo-bloc',type:'markdown',title:'Les données publiques',subtitle:'Comprendre les territoires',content:'Des données ouvertes pour tous.',children:[],config:{},items:[],links:[]};
 if(n.includes('notification'))return {id:'demo-notification',type:'follow',subject:f.dataset,actor:f.user,organization:f.organization,created_at:'2026-10-01',data:{},read:false};
 if(n.includes('job'))return {id:'demo-job',status:'done',created_at:'2026-10-01',started_at:'2026-10-01',ended_at:'2026-10-01',items:[],errors:[],stats:{added:2,updated:3,deleted:0,skipped:0,failed:0},harvester:{id:'demo-harvester',name:'Catalogue de démonstration'}};
 if(n.includes('harvest'))return {id:'demo-harvester',name:'Catalogue de démonstration',url:'https://example.test/catalogue',backend:'dcat',status:'active',organization:f.organization,config:{},validation:{state:'accepted'},last_job:null};
 return {id:'demo-item',title:'Données des territoires',name:'Démonstration',label:'Population',description:'Des données fictives pour examiner ce composant.',url:'#',slug:'demo',type:'dataset',organization:f.organization,metrics:{},items:[],data:[],children:[],permissions:{}};
};
export function makeApplicationSamples(){return Object.fromEntries(inventory.filter(c=>c.origin==='cdata').map(c=>{
 const props={};
 for(const p of definitions[c.id]?.props || []) {
  if(p.default!==null && p.default!==undefined && !p.model)continue;
  if(!p.required && !p.model)continue;
  const t=p.type||'';
  if(t==='Date'){props[p.name]=new Date('2026-10-01T09:00:00');continue;}
  if(p.name==='combinator'){props[p.name]='and';continue;}
  if(p.name==='t'||t.includes('TranslationFunction')){props[p.name]=text=>text;continue;}
  if(t.startsWith('Set<')){props[p.name]=new Set();continue;}
  if(p.name==='unit'){props[p.name]='%';continue;}
  if(t.includes('boolean')&&t.includes('null')){props[p.name]=false;continue;}
  if(p.name==='scope'){props[p.name]={class:'Dataset',id:f.dataset.id};continue;}
  if(['to','href'].includes(p.name)){props[p.name]='#';continue;}
  if(p.name==='sortedBy'){props[p.name]='created';continue;}
  if(p.name==='sortDirection'){props[p.name]='asc';continue;}
  if(t.includes("DiscussionSubject['class']")){props[p.name]='Dataset';continue;}
  if(t==='AlertType'){props[p.name]='info';continue;}
  if(['page','pageSize','totalResults','total','count'].includes(p.name)){props[p.name]=p.name==='page'?1:24;continue;}
  if(p.name==='status'){props[p.name]='success';continue;}
  if(/icon/i.test(p.name)&&t==='string'){props[p.name]='fr-icon-database-line';continue;}
  if(/icon/i.test(p.name)||t==='Component'){props[p.name]=RiDatabase2Line;continue;}
  if(p.name==='actionsAlignment'){props[p.name]='start';continue;}
  if(p.name==='objectType'){props[p.name]='Dataset';continue;}
  if(p.name==='formInfo'){continue;}
  if(/Alignment|AdminBadgeType|AccessType$|ObjectType|Status$/.test(t)){props[p.name]=t==='AccessType'?'open':t==='AdminBadgeType'?'success':'dataset';continue;}

  if(t.includes('=>')||/^\(/.test(t)){props[p.name]=empty;continue;}
  if(p.choices?.length){props[p.name]=p.choices[0];continue;}
  if(t==='boolean'){props[p.name]=false;continue;}
  if(t==='number'){props[p.name]=24;continue;}
  if(t==='string'||/^string \|/.test(t)){props[p.name]=/id/i.test(p.name)?'demo-item':/url|href|to$/i.test(p.name)?'#':/title|label|name/i.test(p.name)?'Données des territoires':/type/i.test(p.name)?'dataset':'Exemple de démonstration';continue;}
  if(t.includes('[]')||t.startsWith('Array<')){props[p.name]=[];continue;}
  props[p.name]=fixtureFor(p.name,t);
 }
 if(c.id.includes('Datasets/Structured/') && 'schema' in props)props.schema=null;
 if(c.id==='cdata/Datasets/CompleteResourcePublicationStep')props.resource={...f.resource,dataset:{id:f.dataset.id,page:f.dataset.page}};
 if(c.id==='cdata/Metrics/AdminPage')props.organization=f.organization;
 if(c.id.startsWith('cdata/Notifications/')&&props.notification){props.notification=Object.assign({},props.notification,{type:c.id.endsWith('ValidateHarvester')?'harvest.source.accepted':c.id.endsWith('NewBadge')?'organization.badge.certified':'discussion.new',details:{organization:f.organization,dataset:f.dataset,reuse:f.reuse,dataservice:f.dataservice,discussion:{...f.discussion,self_web_url:'#'},request_user:f.user,request_organization:f.organization,transfer_owner:f.user,transfer_recipient:f.organization,transfer_subject:f.dataset,source:{id:'demo-harvest',name:'Catalogue de démonstration'}}});}
 if(c.id==='cdata/TransferRequest')props.transfer={id:'demo-transfer',user:f.user,owner:f.user,recipient:f.organization,subject:f.dataset,comment:'Transférer ces données à l’organisation.',created:'2026-10-01'};
 if(c.id==='cdata/Brand/BrandBanner')Object.assign(props,{backgroundImage:'/demo/territories.svg',title:'Les données des territoires',subtitle:'Explorer les données publiques',ctaLabel:'Découvrir',ctaUrl:'#'});
 if(c.id==='cdata/Required/Required')props.required=true;
 if(c.id==='cdata/CdataLink')props.to='#';
 if(c.id==='cdata/DatasetAssignmentTable')Object.assign(props,{datasets:[f.dataset],modelValue:new Set([f.dataset.id])});
 if(c.id==='cdata/RadioButtons')props.options=[{value:'all',label:'Tous'},{value:'datasets',label:'Données'},{value:'api',label:'API'}];
 if(c.id.includes('/MarkdownEditor/')) Object.assign(props,{id:'demo-editor',value:'Des **données ouvertes** pour les territoires.'});
 if(c.id.includes('FullPageTabs')||c.id.includes('TabLinks'))props.links=[{href:'/datasets/demo-dataset/',label:'Présentation',count:24},{href:'/datasets/demo-dataset/resources/',label:'Données',count:12}];
 if(notificationVariants[c.id])Object.assign(props,cloneApplicationSample(notificationVariants[c.id][0].props));
 return [c.id,props];
}));}
export const applicationSamples=makeApplicationSamples();

export function cloneApplicationSample(value) {
 const seen=new WeakMap();
 function clone(v){if(!v||typeof v!=='object')return v;if(v.render||v.setup)return v;if(seen.has(v))return seen.get(v);if(v instanceof Set)return new Set(v);if(v instanceof Date)return new Date(v);const out=Array.isArray(v)?[]:{};seen.set(v,out);for(const [key,item] of Object.entries(v))out[key]=clone(item);return out;}
 return clone(value);
}
