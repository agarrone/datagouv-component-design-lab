import { ref, toValue, watchEffect } from 'vue';
import * as f from './fixtures.js';
const page = data => ({data,total:data.length,page:1,page_size:20,next_page:null,previous_page:null});
export function responseFor(url, query = {}) {
 const path=String(url);
 if(path.includes('/profile/') && path.includes('demo-profile-empty')) return {...f.profile,profile:{...f.profile.profile,columns:{}}};
 if(path.includes('/profile/')) return f.profile;
 if(path.includes('/data/')) {
  let data = f.rows.map((r,i)=>({...r,__id:i+1}));
  if(query.or) {
   const conditions=String(query.or).slice(1,-1).split(',').map(c=>c.split(/__(contains|exact)\./));
   data=data.filter(row=>conditions.some(([column,operator,value])=>operator==='contains'?String(row[column]).toLowerCase().includes(String(value).replace(/^"|"$/g,'').toLowerCase()):String(row[column])===value));
  }
  for (const [key,value] of Object.entries(query)) {
   const [col,op] = key.split('__');
   if(op==='contains') data=data.filter(r=>String(r[col]).toLowerCase().includes(String(value).toLowerCase()));
   if(op==='in') data=data.filter(r=>String(value).split(',').includes(String(r[col])));
   if(op==='exact') data=data.filter(r=>String(r[col])===String(value));
   if(op==='sort') data.sort((a,b)=>String(a[col]).localeCompare(String(b[col]),'fr',{numeric:true})*(value==='desc'?-1:1));
  }
  return {data,meta:{page:1,page_size:50,total:data.length},links:{next:null,prev:null,profile:'/demo/profile.json',swagger:'/demo/openapi.json'}};
 }
 if(path.includes('/transfer/')) return [{id:'demo-transfer',user:f.user,owner:{...f.user,class:'User'},recipient:f.organization,subject:{...f.dataset,class:'Dataset'},comment:'Transférer ces données à l’organisation.',created:'2026-10-01',status:'pending'}];
 if(path.includes('/activity/')) return page([{actor:f.user,organization:f.organization,related_to:f.dataset.title,related_to_id:f.dataset.id,related_to_kind:'Dataset',related_to_url:f.dataset.page,created_at:'2026-10-01T09:00:00',label:f.dataset.title,key:'dataset:created',icon:'fr-icon-database-line',extras:{},changes:[]}]);
 if(path.includes('/datasets/')&&path.includes('/schemas/')){if(path.includes('metadata-no-schema'))return [];if(path.includes('metadata-many-schemas'))return [f.schema,{...f.schema,name:'etalab/schema-des-indicateurs-territoriaux-des-communes-et-intercommunalites',url:null,version:'2.0.0'}];}
 if(path.includes('/schemas/')) return path.includes('/api/2/')?[{name:f.schema.name,title:f.schema.title,url:f.schema.url,version:'1.0.0'}]:[f.schema];
 if(path.includes('/licenses/')) return [f.license,{...f.license,id:'cc-by',title:'Creative Commons Attribution'}];
 if(path.includes('/badges/')) return {hvd:'Données de forte valeur','public-service':'Service public'};
 if(path.includes('/granularities/')) return [{id:'country',name:'Pays'},{id:'commune',name:'Commune'}];
 if(path.includes('/extensions/')) return ['csv','json','geojson','xml','pdf'];
 if(path.includes('/topics/')) return [{id:'society',label:'Société'},{id:'transport',label:'Transport'}];
 if(path.includes('/types/')) return [{id:'visualization',label:'Visualisation'},{id:'application',label:'Application'}];
 if(path.includes('/suggest/')) {
  if(path.includes('/organizations/')) return [{id:f.organization.id,name:f.organization.name,image_url:f.organization.logo}];
  if(path.includes('/zones/')) return [{id:'country:fr',name:'France',code:'FR',level:'country'}];
  return [{text:'population',score:1},{text:'territoires',score:1},{text:'communes',score:1}];
 }
 if(path.includes('/resources/')) return query.type && query.type!=='main'?page([]):page([f.resource]);
 if(path.includes('/datasets/')) return {...page([f.dataset]),facets:{}};
 if(path.includes('/dataservices/')) return {...page([f.dataservice]),facets:{}};
 if(path.includes('/reuses/')) return {...page([f.reuse]),facets:{}};
 if(path.includes('/organizations/')) return {...page([f.organization]),facets:{}};
 return page([]);
}
function unwrap(obj) {return Object.fromEntries(Object.entries(toValue(obj)||{}).map(([key,v])=>[key,toValue(v)]));}
export function mockUseFetch(url, options={}) {
 const data=ref(null),status=ref('success'),error=ref(null);
 const update=()=>{
  const path=String(toValue(url));
  if(path.includes('/profile/') && /demo-profile-(error|pending)/.test(path)) { data.value=null; status.value=path.includes('demo-profile-error')?'error':'pending'; error.value=status.value==='error'?new Error('Erreur fictive du profil'):null; return; }
  status.value='success';error.value=null;data.value=responseFor(toValue(url),unwrap(options.params||options.query));
 };
 watchEffect(update);
 return Promise.resolve({data,status,error,refresh:async()=>update(),execute:async()=>update(),clear:()=>{data.value=null;}});
}
export const mockFetch=async(url, options={})=>responseFor(toValue(url),unwrap(options.params||options.query));
