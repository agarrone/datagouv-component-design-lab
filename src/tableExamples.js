import * as fixtures from './fixtures';
function snapshot(value,parents=new Set()){if(!value||typeof value!=='object')return value;if(parents.has(value))return undefined;const next=new Set(parents).add(value);return Array.isArray(value)?value.map(item=>snapshot(item,next)):Object.fromEntries(Object.entries(value).map(([key,item])=>[key,snapshot(item,next)]));}
const f=snapshot(fixtures);
export const tableVariants={
 'cdata/AdminTable/Table/AdminTable':[['Standard',{}],['Chargement',{loading:true}],['Colonnes fixes',{fixed:true}]].map(([label,props],i)=>({key:`table-${i}`,label,props})),
 'cdata/AdminTable/Table/AdminTableTh':[['Sans tri',{}],['Tri disponible',{sorted:null}],['Croissant',{sorted:'asc'}],['Décroissant',{sorted:'desc'}]].map(([label,props],i)=>({key:`table-th-${i}`,label,props})),
 'TabularExplorer/TabularCell':[['Texte',{value:'Rennes',columnType:'text'}],['Nombre',{value:1234567,columnType:'number'}],['Zéro',{value:0,columnType:'number'}],['Année',{value:2026,columnType:'year'}],['Date',{value:'2026-10-22',columnType:'date'}],['Valeur manquante',{value:null,columnType:'text'}],['Vrai',{value:true,columnType:'boolean'}],['Faux',{value:false,columnType:'boolean'}],['Catégorie',{value:'Transport',columnType:'categorical'}],['Texte long',{value:'Un intitulé long qui reste disponible dans le détail de cellule de l’explorateur.',columnType:'text'}]].map(([label,props],i)=>({key:`table-cell-${i}`,label,props})),
};

for(const [name,prop,item] of [['AdminDatasetsTable','datasets',f.dataset],['AdminDataservicesTable','dataservices',f.dataservice],['AdminReusesTable','reuses',f.reuse]]) {
 const id=`cdata/AdminTable/${name}/${name}`;
 tableVariants[id]=[['Standard',{[prop]:[item],sortedBy:'title',sortDirection:'asc'}],['Vide',{[prop]:[],sortedBy:'title',sortDirection:'asc'}]].map(([label,props],i)=>({key:`${name}-${i}`,label,props}));
}
