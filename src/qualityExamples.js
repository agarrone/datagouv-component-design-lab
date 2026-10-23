import {quality,license,resource} from './fixtures';
const examples=(id,values)=>values.map(([label,props],i)=>({id,key:`quality-${id}-${i}`,label,props}));
const full={...quality,score:1,...Object.fromEntries(Object.entries(quality).filter(([,v])=>typeof v==='boolean').map(([key])=>[key,true]))};
const missing={...quality,score:0,...Object.fromEntries(Object.entries(quality).filter(([,v])=>typeof v==='boolean').map(([key])=>[key,false]))};
export const qualityVariants={
 AppLink:examples('AppLink',[
 ['Navigation interne',{to:'/datasets'}],['Lien externe',{to:'https://www.systeme-de-design.gouv.fr/'}],['Nouvel onglet',{to:'https://www.systeme-de-design.gouv.fr/',target:'_blank',rel:'noopener noreferrer'}],['Sans destination',{to:null}],
 ]),
 Toggletip:examples('Toggletip',[['Informations au clic',{styledButton:false}]]),
 'cdata/AccessTypes/AccessTypePanel':examples('cdata/AccessTypes/AccessTypePanel',[
 ...['open','open_with_account','restricted'].map(access_type=>[access_type,{object:{access_type,access_audiences:[{role:'local_authority_and_administration',condition:'yes'},{role:'company_and_association',condition:'under_condition'},{role:'private',condition:'no'}],authorization_request_url:'https://www.data.gouv.fr'}}]),
 ['Sans précision',{object:{access_type:null,access_audiences:[]}}],
 ['Publics non renseignés',{object:{access_type:'restricted',access_audiences:[]}}],
 ['Label masqué',{hideAccessLabel:true,object:{access_type:'open',access_audiences:[]}}],
 ]),
 'cdata/AdminEmail':examples('cdata/AdminEmail',[
 ['Standard',{user:{email:'camille.martin@example.org'}}],['Adresse longue',{user:{email:'contact.observatoire.des.territoires.et.des.politiques.publiques@example.org'}}],['Sans adresse',{user:{email:''}}],
 ]),
 'cdata/Dataservices/AccessAudienceCondition':examples('cdata/Dataservices/AccessAudienceCondition',[
 ...['local_authority_and_administration','company_and_association','private'].flatMap(audience=>['yes','under_condition','no'].map(condition=>[`${({local_authority_and_administration:'Collectivités et administrations',company_and_association:'Entreprises et associations',private:'Particuliers'})[audience]} · ${({yes:'Oui',under_condition:'Sous condition',no:'Non'})[condition]}`,{audience,condition}])),
 ]),
 LicenseBadge:examples('LicenseBadge',[
 ['Licence avec lien',{license}],['Sans lien',{license:{...license,url:''}}],
 ['Intitulé long',{license:{...license,title:'Licence ouverte de réutilisation des informations publiques — version internationale 2.0'}}],
 ]),
 OwnerType:examples('OwnerType',[
 ...['public-service','local-authority','association','company','other','user'].map(type=>[type,{type}]),
 ...['base','sm','xs'].map(size=>[size,{type:'public-service',size}]),
 ['Texte principal',{type:'local-authority',color:'black'}],
 ]),
 ResourceIconBadge:examples('ResourceIconBadge',[
 ...['csv','geojson','json','pdf','png','zip','inconnu',''].map(format=>[format||'Sans format',{resource:{...resource,format}}]),
 ]),
 QualityScore:examples('QualityScore',[
 ...[0,0.3,0.66,2/3,0.78,1].map(score=>[`${Math.round(score*100)} %${score===2/3?' · seuil Bon':''}`,{score}]),
 ]),
 ProgressBar:examples('ProgressBar',[
 ['Zéro',{value:0}],['Valeur intermédiaire',{value:0.65}],['Maximum',{value:1}],
 ['Autre échelle',{value:65,max:100,barClass:'bg-new-primary'}],
 ]),
 QualityItem:examples('QualityItem',[
 ['Critère satisfait',{passed:true,messagePassed:'Licence renseignée',messageFailed:'Licence non renseignée'}],
 ['Critère manquant',{passed:false,messagePassed:'Licence renseignée',messageFailed:'Licence non renseignée'}],
 ['Critère non renseigné',{passed:null,messagePassed:'Documentation disponible',messageFailed:'Documentation non renseignée'}],
 ['Libellé long',{passed:false,messagePassed:'Documentation disponible',messageFailed:'La documentation technique des fichiers et des champs du jeu de données doit être complétée pour faciliter leur réutilisation.'}],
 ]),
 QualityItemWarning:examples('QualityItemWarning',[
 ['Avertissement visible',{qualityItem:false,message:'Documentation des fichiers manquante'}],
 ['Critère satisfait — aucun avertissement',{qualityItem:true,message:'Documentation des fichiers manquante'}],
 ['Message long',{qualityItem:false,message:'La fréquence de mise à jour des données n’est pas respectée ; vérifiez la date de publication et les informations renseignées.'}],
 ]),
};
for(const id of ['DatasetQuality','DataserviceQuality','DatasetQualityInline','DataserviceQualityInline','DatasetQualityTooltipContent','DataserviceQualityTooltipContent']){
 qualityVariants[id]=examples(id,[['Qualité partielle',{quality}],['Tous les critères satisfaits',{quality:full}],['Tous les critères manquants',{quality:missing}]]);
 if(['DatasetQuality','DataserviceQuality'].includes(id))qualityVariants[id].push(...examples(id+'-warnings',[
 ['Avertissements affichés',{quality,hideWarnings:false}],['Avertissements masqués',{quality,hideWarnings:true}],
 ]));
}
