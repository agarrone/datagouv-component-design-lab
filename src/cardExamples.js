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
cardVariants.ChartCard.push(...examples('ChartCard-states',[
 ['Supprimé',{chart:{...f.chart,deleted_at:'2026-10-01'}}],
 ['Brouillon',{chart:{...f.chart,private:true}}],
]));
for(const [wrapper,source] of [['cdata/Dataservices/Card/Card','DataserviceCard'],['cdata/Reuses/ReuseCard','ReuseCard']])cardVariants[wrapper]=cardVariants[source].map(v=>({...v,id:wrapper,key:wrapper+'-'+v.key}));
const appCardExamples={
 'cdata/ActionCard/ActionCard':[['Standard',{title:'Publier des données',content:'Préparez les fichiers et leurs métadonnées avant la publication.',icon:'/proposals/illustrations/data.svg',actionsAlignment:'start'}],['Mise en avant',{title:'Compléter la description',content:'Une description précise facilite la réutilisation.',icon:'/proposals/illustrations/book.svg',actionsAlignment:'end',type:'primary'}]],
 'cdata/Elections/ElectionCard':[['Avec image',{title:'Les données des élections',description:'Résultats et informations publiques sur les scrutins.',to:'#',image:'/demo/territories.svg'}],['Sans image',{title:'Les données des élections',description:'Résultats et informations publiques sur les scrutins.',to:'#',image:''}]],
 'cdata/Onboarding/OnboardingAudienceCard':[['Standard',{title:'Pour les producteurs',description:'Publiez et documentez vos données.'}],['Texte long',{title:longTitle,description:longTitle}]],
 'cdata/Onboarding/OnboardingFeatureCard':[['Petite',{title:'Explorez les données',description:'Consultez les ressources et préparez leur réutilisation.',image:'/proposals/illustrations/chart.svg',size:'small'}],['Grande',{title:'Explorez les données',description:'Consultez les ressources et préparez leur réutilisation.',image:'/proposals/illustrations/chart.svg',size:'large',color:'green'}],['Sans illustration',{title:'Explorez les données',description:'Les contenus restent lisibles sans illustration.'}]],
 'cdata/Support/Card':[['Avec illustration',{title:'Documentation',description:'Trouvez les réponses à vos questions.',image:'/proposals/illustrations/book.svg'}],['Sans illustration',{title:'Documentation',description:'Trouvez les réponses à vos questions.',image:''}]],
 'cdata/Brand/BrandCard':[['Carte',{title:'Un service de données publiques',description:'Un point d’accès aux données et aux outils.',size:'medium',border:true}],['Grande',{title:'Un service de données publiques',description:'Un point d’accès aux données et aux outils.',size:'large',border:true}]],
 'cdata/Post/card':[['Sans image',{post:{...f.post,image:null}}],['Avec image',{post:f.post}]],
 'cdata/dataset/card-lg':[['Standard',{dataset:f.dataset}],['Sans description',{dataset:f.dataset,showDescription:false}]],
 'cdata/RecommendationExternal':[['Recommandation',{dataset:{...f.dataset,extras:{'recommendations-externals':[{id:'https://example.org',source:'edito',score:1,reason:'edito',type:'external',messages:{fr:{title:'Découvrez un service associé',message:'Un outil pour réutiliser ces données.',button:'Découvrir le service'}}}]}}}],['Aucune recommandation',{dataset:f.dataset}]],
 'cdata/RecommendationsDatasets':[['Recommandations',{dataset:{...f.dataset,extras:{recommendations:[{id:f.dataset.id,source:'edito',score:1,reason:'edito',type:'dataset'}]}}}],['Aucune recommandation',{dataset:f.dataset}]],
 'cdata/RecommendationsReuses':[['Recommandations',{dataset:{...f.dataset,extras:{'recommendations-reuses':[{id:f.reuse.id}]}}}],['Aucune recommandation',{dataset:f.dataset}]],
};
for(const [id,values] of Object.entries(appCardExamples))cardVariants[id]=examples(id,values);
cardVariants['cdata/FileCard/FileCard']=examples('cdata/FileCard/FileCard',[
 ['Fichier distant',{modelValue:{...f.resource,title:'Population des communes',filetype:'remote',url:'https://example.org/population.csv',resource:f.resource,file:null,schema:{name:'etalab/population'}},extensions:['csv']}],
 ['Sans nom ni actions',{modelValue:{...f.resource,title:'',filetype:'remote',url:'https://example.org/population.csv',resource:f.resource,file:null},extensions:['csv'],hideActions:true}],
]);
cardVariants.ObjectCardOwner=examples('ObjectCardOwner',[
 ['Producteur cliquable',{organization:f.organization}],
 ['Producteur en texte simple',{organization:f.organization,organizationUrl:null}],
]);
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
for(const id of ['PostCard','ReuseCard','ReuseHorizontalCard','cdata/Reuses/ReuseCard'])cardVariants[id][0].label='Avec image';

cardVariants.TopicCard.push(...examples('TopicCard-options',[
 ['Sans logo',{topic:f.topic,showLogo:false}],
 ['Sans statistiques',{topic:f.topic,showStats:false}],
 ['Compteurs à zéro',{topic:{...f.topic,nb_datasets:0,nb_dataservices:0,nb_reuses:0}}],
 ['Sans producteur',{topic:{...f.topic,organization:null,owner:null}}],
]));
