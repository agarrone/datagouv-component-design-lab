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
  ['Libellé visible',{text:'demo-dataset',label:'Copier l’identifiant',copiedLabel:'Identifiant copié !'}],['Icône encadrée',{text:'demo-dataset',label:'Copier l’identifiant',copiedLabel:'Identifiant copié !',hideLabel:true}],['Icône seule',{text:'demo-dataset',label:'Copier l’identifiant',copiedLabel:'Identifiant copié !',iconOnly:true}],['Icône à droite',{text:'demo-dataset',label:'Copier l’identifiant',copiedLabel:'Identifiant copié !',reverse:true}],
 ]),
 'cdata/ContactPoint':examples('cdata/ContactPoint',[
  ['Contact par e-mail',{contact:{name:'Équipe des données territoriales',email:'contact@example.org',role:'contact'}}],['Formulaire de contact',{contact:{name:'Service des statistiques territoriales et de l’observation des politiques publiques',contact_form:'https://example.org/contact',role:'publisher'}}],['Sans lien',{contact:{name:'Observatoire des territoires',role:'creator'}}],
 ]),
};
