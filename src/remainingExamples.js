const examples=(id,values)=>values.map(([label,props],i)=>({id,key:`remaining-${id}-${i}`,label,props}));
export const remainingVariants={
 Pagination:examples('Pagination',[
  ['Première page',{page:1,pageSize:10,totalResults:86}],['Page intermédiaire',{page:4,pageSize:10,totalResults:86}],['Dernière page',{page:9,pageSize:10,totalResults:86}],['Une seule page — navigation masquée',{page:1,pageSize:10,totalResults:8}],['Aucun résultat',{page:1,pageSize:10,totalResults:0}],
 ]),
 'Tabs/TabGroup':examples('Tabs/TabGroup',[
  ['Standard',{size:'md',defaultIndex:0}],['Compact',{size:'sm',defaultIndex:0}],
 ]),
 FormattedDate:examples('FormattedDate',[
  ['Date',{date:'2026-10-01',format:'date'}],['Date absente',{date:null}],['Date relative',{date:'2026-10-01T09:00:00Z',format:'relative'}],
 ]),
 PaddedContainer:examples('PaddedContainer',[['Surface blanche',{color:'white'}],['Surface secondaire',{color:'alt-grey'}]]),
 'cdata/Alert/Alert':examples('cdata/Alert/Alert',['info','success','warning','error'].flatMap(type=>['sm','md'].map(size=>[`${type} · ${size}`,{type,size}]))),
 'cdata/Stepper/Stepper':examples('cdata/Stepper/Stepper',[1,2,3].map(currentStep=>[`Étape ${currentStep}`,{steps:['Décrire','Ajouter les fichiers','Publier'],currentStep}])),
 'cdata/Modal/Modal.client':examples('cdata/Modal/Modal.client',[
  ['Fermée',{title:'Informations',opened:false}],['Standard — à ouvrir',{title:'Informations',size:'md'}],['Sans titre visible',{title:'Informations complémentaires',showTitle:false}],['Grand format',{title:'Informations',size:'lg'}],
 ]),
};
