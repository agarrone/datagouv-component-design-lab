import {RiAddLine} from '@remixicon/vue';
const values=[
 ...['primary','secondary','tertiary','warning','danger','white-flat','brown-illustration','green-illustration'].map(color=>[color,{color}]),
 ...['2xs','xs','sm','lg','xl'].map(size=>[`Taille ${size}`,{size}]),
 ['Désactivé',{disabled:true}],['Chargement',{loading:true}],['Avec icône',{icon:RiAddLine}],['Icône à droite',{icon:RiAddLine,iconRight:true}],
 ['Icône seule',{icon:RiAddLine,iconOnly:true,title:'Publier les données','aria-label':'Publier les données'}],
 ['Icône seule en chargement',{icon:RiAddLine,iconOnly:true,loading:true,title:'Publier les données','aria-label':'Publier les données'}],
 ['Icône sur mobile',{icon:RiAddLine,iconOnlyOnMobile:true}],
 ['Lien externe',{href:'https://www.data.gouv.fr',newTab:true}],['Lien désactivé',{href:'https://www.data.gouv.fr',disabled:true}],
 ['Soumission',{type:'submit'}],
];
export const buttonVariants={BrandedButton:values.map(([label,props],index)=>({id:'BrandedButton',key:`button-${index}`,label,props}))};
