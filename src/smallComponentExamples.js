import {RiBold} from '@remixicon/vue';
const cases=(id,rows)=>rows.map(([label,props],index)=>({id,key:`small-${id}-${index}`,label,props}));
export const smallComponentVariants={
 'cdata/Required/Required':cases('cdata/Required/Required',[['Obligatoire',{required:true}],['Facultatif',{required:false}]]),
 'cdata/PreviewDashboard/PercentageMeter':cases('cdata/PreviewDashboard/PercentageMeter',[
 ...[0,45,100,-10,140].map(value=>[String(value),{value}]),['Sans valeur',{value:null}],
 ]),
 'cdata/PreviewDashboard/DeltaIndicator':cases('cdata/PreviewDashboard/DeltaIndicator',[
 ...[-12,0,12].map(value=>[String(value),{value,unit:'points'}]),['Sans valeur',{unit:'points'}],
 ]),
 'OpenApiViewer/ContentTypeSelect':cases('OpenApiViewer/ContentTypeSelect',[
 ['Plusieurs formats',{contentTypes:['application/json','application/xml'],modelValue:'application/json'}],
 ['Un format',{contentTypes:['application/json'],modelValue:'application/json'}],['Sans format',{contentTypes:[],modelValue:''}],
 ]),
 Placeholder:cases('Placeholder',['Dataset','Dataservice','Reuse','Organization','Topic','Chart'].map(type=>[type,{type,class:'w-24 h-24'}])),
 OrganizationLogo:cases('OrganizationLogo',[
 ['Logo fourni',{organization:{name:'République française',logo_thumbnail:'/demo/republique-francaise.svg'},sizeClass:'size-16'}],
 ['Sans logo',{organization:{name:'Organisation',logo_thumbnail:null},sizeClass:'size-16'}],
 ['Image indisponible',{organization:{name:'Organisation',logo_thumbnail:'/demo/missing-organization.svg'},sizeClass:'size-16'}],
 ]),
 ExtraAccordion:cases('ExtraAccordion',[
 ['Métadonnées complémentaires',{titleText:'Informations complémentaires',buttonText:'Voir les détails',titleLevel:'h3',extra:{Identifiant:'dataset-123',Source:'Portail national',Version:'2026-10'}}],
 ['Valeurs longues',{titleText:'Informations complémentaires',buttonText:'Voir les détails',titleLevel:'h3',extra:{Identifiant:'identifiant-tres-long-sans-espaces-pour-verifier-le-retour-a-la-ligne-et-la-lisibilite',Configuration:{format:'CSV',compression:false}}}],
 ['Sans donnée',{titleText:'Informations complémentaires',buttonText:'Voir les détails',titleLevel:'h3',extra:{}}],
 ]),
 'cdata/MarkdownEditor/EditorButton':cases('cdata/MarkdownEditor/EditorButton',[['Disponible',{icon:RiBold,'aria-label':'Gras'}],['Désactivé',{icon:RiBold,'aria-label':'Gras',disabled:true}]]),
 'cdata/MarkdownEditor/Milkdown/TableTooltip/TooltipButton':cases('cdata/MarkdownEditor/Milkdown/TableTooltip/TooltipButton',[['Disponible',{icon:RiBold,'aria-label':'Gras'}],['Désactivé',{icon:RiBold,'aria-label':'Gras',disabled:true}]]),
};
