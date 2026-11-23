import {RiInformationLine} from '@remixicon/vue';
const examples=(id,values)=>values.map(([label,props],index)=>({id,key:`${id}-badge-${index}`,label,props}));
const publication=key=>[
 ['Public',{[key]:{private:false}}],
 ['Brouillon',{[key]:{private:true}}],
 ['Archivé',{[key]:{private:true,...(key==='dataservice'?{archived_at:'2026-10-20'}:{archived:true})}}],
 ['Supprimé',{[key]:{private:true,...(key==='dataservice'?{deleted_at:'2026-10-20',archived_at:'2026-10-20'}:{deleted:true,archived:true})}}],
];
export const badgeVariants={
 'Tag':examples('Tag',[['Tag de catégorie',{type:'secondary'}],['Avec icône',{type:'secondary',icon:RiInformationLine}],
 ['Cliquable · lien',{href:'#Tag'}],['Cliquable · bouton',{clickable:true}],
 ['Sélectionnable · non sélectionné',{selectable:true}],['Sélectionnable · sélectionné',{selectable:true,selected:true}],
 ['Supprimable',{dismissible:true,label:'Données ouvertes'}],
 ['Cliquable · désactivé',{clickable:true,disabled:true}],['Sélectionnable · désactivé',{selectable:true,selected:true,disabled:true}],
 ['Supprimable · désactivé',{dismissible:true,label:'Données ouvertes',disabled:true}]]),
 'DatasetLabelTag':examples('DatasetLabelTag',[
 ['Label',{badge:{kind:'hvd',label:'Données de forte valeur'}}],
 ['Label avec lien',{badge:{kind:'hvd',label:'Données de forte valeur'},url:'https://www.data.gouv.fr/datasets/base-adresse-nationale'}],
 ['Libellé long',{badge:{kind:'example',label:'Un label au libellé particulièrement long pour vérifier le retour à la ligne'}}],
 ]),
 'Badge':examples('Badge', ['neutral','primary','success','warning','yellow','danger','pink','teal'].flatMap(tone=>['xs','sm'].map(size=>[`${tone} · ${size}`,{tone,size}]))),
 'AccessTypeBadge':examples('AccessTypeBadge',['open','open_with_account','restricted'].map(accessType=>[accessType,{accessType}])),
 'DatasetBadge':examples('DatasetBadge',publication('dataset')),
 'DataserviceBadge':examples('DataserviceBadge',publication('dataservice')),
 'ReuseBadge':examples('ReuseBadge',publication('reuse')),
 'cdata/Harvesters/JobBadge':examples('cdata/Harvesters/JobBadge',['pending','initializing','initialized','processing','done','done-errors','failed'].map(status=>[status,{job:{status}}])),
 'cdata/Harvesters/HarvesterBadge':examples('cdata/Harvesters/HarvesterBadge',[
 ['Supprimé',{harvester:{deleted:true,active:true,validation:{state:'accepted'}}}],
 ['Inactif',{harvester:{active:false,validation:{state:'accepted'}}}],
 ['Refusé',{harvester:{active:true,validation:{state:'refused'}}}],
 ['En attente de validation',{harvester:{active:true,validation:{state:'pending'}}}],
 ['Sans job',{harvester:{active:true,validation:{state:'accepted'},last_job:null}}],
 ['Dernier job terminé',{harvester:{active:true,validation:{state:'accepted'},last_job:{status:'done'}}}],
 ]),
 'ObjectStatusBadge':examples('ObjectStatusBadge',['public','private','archived','deleted'].map(status=>[status,{status}])),
};
