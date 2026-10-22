import {stats} from './fixtures';
const base={title:'Téléchargements',type:'line',data:stats,summary:3380,since:'2026-04-01'};
export const statVariants={StatBox:[
 ['Standard',base],
 ['Compact',{...base,size:'sm'}],
 ['Histogramme',{...base,type:'bar'}],
 ['Chargement',{...base,summary:null,data:null}],
 ['Historique en chargement',{...base,data:null}],
 ['Valeurs nulles',{...base,summary:0,data:{'2026-09-01':0,'2026-10-01':0}}],
 ['Aucun historique',{...base,summary:undefined,data:{},since:null}],
 ['Total sans historique',{...base,summary:1234,data:{}}],
 ['Dernier mois à zéro',{...base,summary:120,data:{'2026-09-01':120,'2026-10-01':0}}],
 ['Correction négative',{...base,summary:90,type:'bar',data:{'2026-09-01':120,'2026-10-01':-30}}],
 ['Grand nombre et intitulé long',{...base,title:'Téléchargements des ressources de l’organisation sur la période sélectionnée',summary:1234567890}],
 ['Mois reçus dans le désordre',{...base,summary:undefined,data:{'2026-10-01':300,'2026-08-01':100,'2026-09-01':200}}],
].map(([label,props],i)=>({key:`statbox-${i}`,label,props}))};
