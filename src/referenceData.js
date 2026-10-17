import css from '../vendor/datagouv-components/assets/main.css?raw';
import button from '../vendor/datagouv-components/src/components/BrandedButton.vue?raw';
import radio from '../vendor/datagouv-components/src/components/RadioInput.vue?raw';
import searchable from '../vendor/datagouv-components/src/components/Form/SearchableSelect.vue?raw';
import listbox from '../vendor/datagouv-components/src/components/Form/Listbox.vue?raw';
import select from '../vendor/datagouv-components/src/components/Form/SelectGroup.vue?raw';
import quality from '../vendor/datagouv-components/src/components/QualityItem.vue?raw';
import warning from '../vendor/datagouv-components/src/components/QualityItemWarning.vue?raw';
import tailwindTheme from 'tailwindcss/theme.css?raw';
import lock from '../upstream.lock.json';

export const source = { css, button, radio, searchable, listbox, select, quality, warning };
const paths = {css:'assets/main.css',button:'src/components/BrandedButton.vue',radio:'src/components/RadioInput.vue',searchable:'src/components/Form/SearchableSelect.vue',listbox:'src/components/Form/Listbox.vue',select:'src/components/Form/SelectGroup.vue',quality:'src/components/QualityItem.vue',warning:'src/components/QualityItemWarning.vue'};
export function evidence(key, text, label) {
 const index=source[key].indexOf(text);
 const line=index<0?1:source[key].slice(0,index).split('\n').length;
 return {label:label||paths[key].split('/').pop(),text,url:`${lock.repository}/blob/${lock.commit}/datagouv-components/${paths[key]}#L${line}`};
}
export const themeSource = evidence('css','@theme','Styles de la bibliothèque');
export const colors = [...css.matchAll(/--color-([\w-]+):\s*(#[\da-fA-F]+)\s*;/g)].map(([,name,value])=>({name:`--color-${name}`,value:value.toUpperCase(),valid:/^#(?:[\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i.test(value),group:name.startsWith('new-')?'new':'other'}));
export const fonts = [
 {name:'Marianne',token:'--font-marianne',family:'Marianne, Arial, sans-serif',detail:'Famille sans empattement déclarée par la bibliothèque et chargée dans le lab. Graisses disponibles avec le DSFR : 300, 400, 500 et 700.',available:true},
 {name:'Spectral',token:'--font-spectral',family:'Spectral, Georgia, serif',detail:'Famille avec empattements déclarée dans le thème. Le DSFR charge ici les graisses 400 et 900 ; aucun usage systématique n’est imposé par la bibliothèque.',available:true},
 {name:'Noto Sans Mono',token:'--font-mono',family:'"Noto Sans Mono", ui-monospace, monospace',detail:'Famille monospace pour le code. Graisses chargées : 400, 500 et 700.',available:true},
 {name:'URW Gothic',token:'--font-gothic',family:'"URW Gothic", sans-serif',detail:'Famille déclarée dans le thème, mais non chargée dans le lab. Pas d’aperçu substitué.',available:false},
];
export const typography=['xs','sm','base','lg','xl','2xl','3xl','4xl'].map(name=>{
 const match=tailwindTheme.match(new RegExp(`--text-${name}:\\s*([\\d.]+)rem`));
 const rem=Number(match?.[1]||1);return {name:`text-${name}`,rem,pixels:rem*16};
});
export const breakpoints=[...css.matchAll(/--breakpoint-([\w-]+):\s*(\d+)px/g)].map(([,name,value])=>({name,value:Number(value)}));
export const spacing=[1,2,3,4,6,8].map(n=>({token:`${n}`,rem:n*.25,pixels:n*4}));
export const issues=[
 {id:'focus',status:'À arbitrer',category:'Interactions',title:'Plusieurs couleurs pour le focus clavier',observation:'BrandedButton utilise le jeton new-focus, RadioInput un bleu Tailwind, et les enveloppes de SearchableSelect et Listbox déclarent un anneau blanc avec un décalage turquoise. Le code ne définit donc pas un traitement de focus commun à ces contrôles.',impact:'Le repère visuel de navigation peut varier selon le contrôle. Les styles calculés et l’accessibilité de chaque état restent à vérifier dans son contexte.',direction:'Définir un jeton de focus partagé et vérifier les états au clavier, sur fond clair et foncé.',components:['BrandedButton','RadioInput','Form/SearchableSelect','Form/Listbox'],evidence:[evidence('button','focus-visible:ring-new-focus'),evidence('radio','has-[:focus-visible]:ring-blue-500'),evidence('searchable','focus-visible:ring-white/75')]},
 {id:'select-relief',status:'À arbitrer',category:'Formulaires',title:'Un relief différent selon le sélecteur',observation:'SelectGroup repose sur la classe DSFR fr-select. SearchableSelect et Listbox ajoutent une enveloppe shadow-md et utilisent la classe input de la bibliothèque.',impact:'Des champs de sélection voisins peuvent avoir un relief et une bordure différents. Les comportements natifs et recherchables diffèrent ; l’écart visuel peut être volontaire.',direction:'Comparer les sélecteurs côte à côte et décider quels styles doivent être partagés, tout en conservant leurs comportements propres.',components:['Form/SelectGroup','Form/SearchableSelect','Form/Listbox'],evidence:[evidence('select','class="fr-select'),evidence('searchable','shadow-md'),evidence('listbox','shadow-md')],comparison:['Form/SelectGroup','Form/SearchableSelect','Form/Listbox']},
 {id:'warning-icon',status:'À arbitrer',category:'Icônes',title:'Deux tailles d’icône pour un avertissement de qualité',observation:'QualityItem affiche fr-icon-warning-line sans taille explicite. QualityItemWarning ajoute fr-icon--sm au même pictogramme. Les deux composants affichent pourtant leur message avec text-sm.',impact:'Le rapport entre l’icône et le texte varie dans les messages liés à la qualité.',direction:'Valider une taille d’icône d’avertissement commune, ou documenter la distinction entre les deux usages.',components:['QualityItem','QualityItemWarning'],evidence:[evidence('quality','class="fr-icon-warning-line"'),evidence('warning','class="fr-icon-warning-line fr-icon--sm"')]},
 {id:'neutral-tokens',status:'À arbitrer',category:'Couleurs',title:'Des noms proches désignent des gris différents',observation:'Le thème déclare new-gray-medium à #3A3A3A et gray-medium à #666666. Il déclare aussi gray-plain à #3A3A3A. Le mot « medium » n’a donc pas la même valeur selon la famille de jetons.',impact:'Le choix d’un gris peut être ambigu lors de la création ou de la modification d’un composant.',direction:'Clarifier les rôles (texte principal, secondaire, désactivé) et établir une correspondance entre les palettes avant toute migration.',components:['BrandedButton','QualityItem','Form/SearchableSelect'],evidence:[evidence('css','--color-new-gray-medium:'),evidence('css','--color-gray-medium:'),evidence('css','--color-gray-plain:')]},
 {id:'invalid-color',status:'Confirmé dans le code',category:'Couleurs',title:'Une valeur de couleur invalide dans le thème',observation:'Le jeton --color-secondary-dark vaut #66666, une notation hexadécimale de cinq chiffres que CSS ne reconnaît pas.',impact:'Cette valeur est inutilisable comme couleur. Aucun usage direct de ce jeton n’a été relevé dans les fichiers Vue inventoriés ; aucun défaut visuel d’un composant n’est établi ici.',direction:'Confirmer la valeur attendue avec l’équipe avant de corriger le jeton.',components:[],evidence:[evidence('css','--color-secondary-dark:')]},
];
