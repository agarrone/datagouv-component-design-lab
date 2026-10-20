import {RiInformationLine} from '@remixicon/vue';
const examples=(id,values)=>values.map(([label,props],index)=>({id,key:`${id}-badge-${index}`,label,props}));
const publication=key=>[
 ['Public',{[key]:{private:false}}],
 ['Brouillon',{[key]:{private:true}}],
 ['Archivé',{[key]:{private:true,...(key==='dataservice'?{archived_at:'2026-10-20'}:{archived:true})}}],
 ['Supprimé',{[key]:{private:true,...(key==='dataservice'?{deleted_at:'2026-10-20',archived_at:'2026-10-20'}:{deleted:true,archived:true})}}],
];
export const badgeVariants={
 'Tag':examples('Tag',[['Tag de catégorie',{type:'secondary'}],['Avec icône',{type:'secondary',icon:RiInformationLine}]]),
 'DatasetLabelTag':examples('DatasetLabelTag',[
 ['Label',{badge:{kind:'hvd',label:'Données de forte valeur'}}],
 ['Label avec lien',{badge:{kind:'hvd',label:'Données de forte valeur'},url:'https://www.data.gouv.fr/datasets/base-adresse-nationale'}],
 ['Libellé long',{badge:{kind:'example',label:'Un label au libellé particulièrement long pour vérifier le retour à la ligne'}}],
 ]),
 'cdata/AdminBadge/AdminBadge':examples('cdata/AdminBadge/AdminBadge', ['primary','secondary','success','warning','danger','default','pink','teal'].flatMap(type=>['xs','sm'].map(size=>[`${type} · ${size}`,{type,size}]))),
 'cdata/AccessTypes/AccessTypeBadge':examples('cdata/AccessTypes/AccessTypeBadge',['open','open_with_account','restricted'].map(accessType=>[accessType,{accessType}])),
 'cdata/AdminBadge/DatasetBadge':examples('cdata/AdminBadge/DatasetBadge',publication('dataset')),
 'cdata/AdminBadge/DataserviceBadge':examples('cdata/AdminBadge/DataserviceBadge',publication('dataservice')),
 'cdata/AdminBadge/ReuseBadge':examples('cdata/AdminBadge/ReuseBadge',publication('reuse')),
 'cdata/Harvesters/JobBadge':examples('cdata/Harvesters/JobBadge',['pending','initializing','initialized','processing','done','done-errors','failed'].map(status=>[status,{job:{status}}])),
 'cdata/Harvesters/HarvesterBadge':examples('cdata/Harvesters/HarvesterBadge',[
 ['Supprimé',{harvester:{deleted:true,active:true,validation:{state:'accepted'}}}],
 ['Inactif',{harvester:{active:false,validation:{state:'accepted'}}}],
 ['Refusé',{harvester:{active:true,validation:{state:'refused'}}}],
 ['En attente de validation',{harvester:{active:true,validation:{state:'pending'}}}],
 ['Sans job',{harvester:{active:true,validation:{state:'accepted'},last_job:null}}],
 ['Dernier job terminé',{harvester:{active:true,validation:{state:'accepted'},last_job:{status:'done'}}}],
 ]),
 'cdata/SuiviDePublication/HvdStatutBadge':examples('cdata/SuiviDePublication/HvdStatutBadge',[
 ['Sans statut',{statut:null,url:null,type:'default',linksToData:false}],
 ['Statut fourni par la page',{statut:'Publié',url:null,type:'success',linksToData:false}],
 ['Avec lien vers les données',{statut:'Publié',url:'https://www.data.gouv.fr/datasets/base-adresse-nationale',type:'success',linksToData:true}],
 ]),
 'ObjectCardBadge':examples('ObjectCardBadge',[['Badge dans une carte',{icon:RiInformationLine}]]),
};
