import * as f from './fixtures';
const longTitle='Données territoriales détaillées : population, équipements et services publics des communes françaises — millésime 2026';
const longOrganization={...f.organization,name:'Observatoire national des territoires et des politiques publiques locales'};
const examples=(id,values)=>values.map(([label,props],i)=>({id,key:`card-${id}-${i}`,label,props}));
const definitions={DatasetCard:['dataset',f.dataset],DataserviceCard:['dataservice',f.dataservice],ReuseCard:['reuse',f.reuse],ReuseHorizontalCard:['reuse',f.reuse],OrganizationCard:['organization',f.organization],OrganizationHorizontalCard:['organization',f.organization],ChartCard:['chart',f.chart],PostCard:['post',f.post],TopicCard:['topic',f.topic],DiscussionMessageCard:['discussion',f.discussion]};
export const cardVariants=Object.fromEntries(Object.entries(definitions).map(([id,[prop,value]])=>[id,examples(id,[
 ['Standard',{[prop]:value}],
 ['Titre et producteur longs',{[prop]:{...value,title:longTitle,name:longTitle,organization:longOrganization}}],
 ['Sans média ni description',{[prop]:{...value,logo_thumbnail:null,logo:null,image:null,organization:null,owner:null,description:'',description_short:'',headline:'',content:''}}],
])]));
cardVariants.DatasetCard.push(...examples('DatasetCard-states',[
 ['Brouillon',{dataset:{...f.dataset,private:true}}],['Archivé',{dataset:{...f.dataset,archived:true}}],
 ['Sans description affichée',{dataset:f.dataset,showDescriptionShort:false}],
]));
cardVariants.DataserviceCard.push(...examples('DataserviceCard-states',[
 ['Accès restreint',{dataservice:{...f.dataservice,access_type:'restricted'}}],
 ['Ouvert avec compte',{dataservice:{...f.dataservice,access_type:'open_with_account'}}],
 ['Brouillon',{dataservice:{...f.dataservice,private:true}}],
 ['Archivé',{dataservice:{...f.dataservice,archived_at:'2026-10-01'}}],
 ['Sans description affichée',{dataservice:f.dataservice,showDescription:false}],
]));
for(const id of ['ReuseCard','ReuseHorizontalCard'])cardVariants[id].push(...examples(id+'-states',[
 ['Brouillon',{reuse:{...f.reuse,private:true}}],['Archivé',{reuse:{...f.reuse,archived:true}}],
]));
cardVariants.SchemaCard=examples('SchemaCard',[
 ['Lecture',{schema:f.schema,showLinks:true}],
 ['Option sélectionnée',{schema:f.schema,selectable:true,selected:true}],
 ['Option active au clavier',{schema:f.schema,selectable:true,active:true}],
 ['Titre et description longs',{schema:{...f.schema,title:longTitle,description:longTitle.repeat(2)},showLinks:true}],
]);
for(const [id,prop,value] of [['PostCard','post',f.post],['ChartCard','chart',f.chart],['ReuseCard','reuse',f.reuse],['ReuseHorizontalCard','reuse',f.reuse]])cardVariants[id].push(...examples(id+'-media',[
 ['Sans image',{[prop]:{...value,image:null}}],
 ['Image indisponible',{[prop]:{...value,image:'/demo/card-image-unavailable.png'}}],
]));
for(const [wrapper,source] of [['cdata/Dataservices/Card/Card','DataserviceCard'],['cdata/Reuses/ReuseCard','ReuseCard']])cardVariants[wrapper]=cardVariants[source].map(v=>({...v,id:wrapper,key:wrapper+'-'+v.key}));
// Some legacy demo fixtures contain back references. Keep each example independent
// and serializable for the code panel, without changing those shared fixtures.
function snapshot(value,parents=new Set()) {
 if(value===null || typeof value!=='object')return value;
 if(parents.has(value))return undefined;
 parents.add(value);
 const result=Array.isArray(value)?value.map(v=>snapshot(v,parents)):Object.fromEntries(Object.entries(value).map(([key,v])=>[key,snapshot(v,parents)]));
 parents.delete(value);return result;
}
for(const variants of Object.values(cardVariants))for(const variant of variants)variant.props=snapshot(variant.props);
