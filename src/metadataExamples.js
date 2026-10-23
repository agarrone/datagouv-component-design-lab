import * as fixtures from './fixtures';
function snapshot(value,parents=new Set()){if(!value||typeof value!=='object')return value;if(parents.has(value))return undefined;const next=new Set(parents).add(value);return Array.isArray(value)?value.map(item=>snapshot(item,next)):Object.fromEntries(Object.entries(value).map(([key,item])=>[key,snapshot(item,next)]));}
const f=snapshot(fixtures);
const dataset=f.datasetFull;
const examples=(id,values)=>values.map(([label,props],i)=>({id,key:`metadata-${id}-${i}`,label,props}));
const prefix='DatasetInformation/';
export const metadataVariants={
 [prefix+'DatasetInformationSection']:examples(prefix+'DatasetInformationSection',[
  ['Informations complètes',{dataset}],
  ['Identifiant et mots-clés longs',{dataset:{...dataset,id:'identifiant-de-jeu-de-donnees-tres-long-pour-verifier-le-retour-a-la-ligne',tags:['couverture-territoriale','population-municipale-des-communes-et-intercommunalites','données ouvertes','mobilités quotidiennes']}}],
  ['Informations facultatives absentes',{dataset:{...dataset,tags:[],license:null}}],
 ]),
 [prefix+'DatasetTemporalitySection']:examples(prefix+'DatasetTemporalitySection',[
  ['Année complète',{dataset}],
  ['Période en cours',{dataset:{...dataset,temporal_coverage:{start:'2024-01-01',end:null}}}],
  ['Fréquence au libellé long',{dataset:{...dataset,frequency:{id:'irregular',label:'Selon les actualisations transmises par les producteurs partenaires'}}}],
  ['Informations facultatives absentes',{dataset:{...dataset,frequency:null,temporal_coverage:null}}],
 ]),
 [prefix+'DatasetSpatialSection']:examples(prefix+'DatasetSpatialSection',[
  ['Couverture nationale',{dataset}],
  ['Plusieurs territoires',{dataset:{...dataset,spatial:{zones:[{name:'Bretagne'},{name:'Pays de la Loire'},{name:'Provence-Alpes-Côte d’Azur'}],granularity:{id:'commune',name:'Commune et arrondissement municipal'}}}}],
  ['Sans zones renseignées',{dataset:{...dataset,spatial:{zones:[],granularity:{id:'country',name:'Pays'}}}}],
  ['Sans couverture spatiale — section masquée',{dataset:{...dataset,spatial:null}}],
 ]),
 [prefix+'DatasetSchemaSection']:examples(prefix+'DatasetSchemaSection',[
  ['Schéma de référence',{dataset}],
  ['Plusieurs schémas',{dataset:{...dataset,id:'metadata-many-schemas'}}],
  ['Sans schéma — section masquée',{dataset:{...dataset,id:'metadata-no-schema'}}],
 ]),
 [prefix+'DatasetEmbedSection']:examples(prefix+'DatasetEmbedSection',[
  ['Code d’intégration',{dataset}],
  ['Identifiant long',{dataset:{...dataset,id:'jeu-de-donnees-population-et-indicateurs-territoriaux-des-communes-francaises'}}],
 ]),
 DateRangeDetails:examples('DateRangeDetails',[
  ['Année',{range:{start:'2025-01-01',end:'2025-12-31'}}],['Plusieurs années',{range:{start:'2022-01-01',end:'2025-12-31'}}],['Mois',{range:{start:'2025-03-01',end:'2025-03-31'}}],['Période précise',{range:{start:'2025-03-12',end:'2025-07-23'}}],['Période en cours',{range:{start:'2025-01-01',end:null}}],
 ]),
 CopyButton:examples('CopyButton',[
  ['Copie désactivée',{text:'demo-dataset',label:'Copier l’identifiant',copiedLabel:'Identifiant copié !',hideLabel:true,disabled:true}],
  ['Libellé visible',{text:'demo-dataset',label:'Copier l’identifiant',copiedLabel:'Identifiant copié !'}],['Icône encadrée',{text:'demo-dataset',label:'Copier l’identifiant',copiedLabel:'Identifiant copié !',hideLabel:true}],['Icône seule',{text:'demo-dataset',label:'Copier l’identifiant',copiedLabel:'Identifiant copié !',iconOnly:true}],['Icône à droite',{text:'demo-dataset',label:'Copier l’identifiant',copiedLabel:'Identifiant copié !',reverse:true}],
 ]),
 'cdata/ContactPoint':examples('cdata/ContactPoint',[
  ['Contact par e-mail',{contact:{name:'Équipe des données territoriales',email:'contact@example.org',role:'contact'}}],['Formulaire de contact',{contact:{name:'Service des statistiques territoriales et de l’observation des politiques publiques',contact_form:'https://example.org/contact',role:'publisher'}}],['Sans lien',{contact:{name:'Observatoire des territoires',role:'creator'}}],
 ]),
};

metadataVariants['ResourceAccordion/Metadata']=examples('ResourceAccordion/Metadata',[
 ['Standard',{resource:f.resource}],['URL longue',{resource:{...f.resource,url:'https://example.org/donnees/observatoire-des-territoires/ressources/indicateurs-de-population/version-annuelle/communes.csv'}}],
 ['Somme de contrôle',{resource:{...f.resource,checksum:{type:'sha256',value:'a1b2c3d4'.repeat(8)}}}],['Sans extras',{resource:{...f.resource,extras:{}}}],['Fichier vide',{resource:{...f.resource,filesize:0}}],
]);
metadataVariants['ResourceAccordion/DataStructure']=examples('ResourceAccordion/DataStructure',[['Colonnes du fichier',{resource:f.resource}],...['empty','error','pending'].map(state=>[({empty:'Sans colonnes',error:'Erreur de chargement',pending:'Chargement'})[state],{resource:{...f.resource,id:`demo-profile-${state}`}}])]);
metadataVariants['ResourceAccordion/Downloads']=examples('ResourceAccordion/Downloads',[
 ['Fichier original',{resource:f.resource,dataset:f.dataset}],
 ['Formats générés',{resource:{...f.resource,extras:{...f.resource.extras,'analysis:parsing:parquet_url':'https://example.org/population.parquet','analysis:parsing:parquet_size':24000,'analysis:parsing:finished_at':'2026-10-01T09:00:00'}},dataset:f.dataset}],
 ['Exports WFS',{resource:{...f.resource,url:'https://example.org/wfs',format:'wfs',extras:{'analysis:parsing:ogc_metadata':{format:'wfs',version:'2.0.0',output_formats:['csv','application/json'],detected_layer:{name:'population',default_crs:'EPSG:4326'}}}},dataset:f.dataset}],['Lien externe',{resource:{...f.resource,format:'url'},dataset:f.dataset}],
 ['Taille inconnue',{resource:{...f.resource,filesize:null,extras:{}},dataset:f.dataset}],
]);
