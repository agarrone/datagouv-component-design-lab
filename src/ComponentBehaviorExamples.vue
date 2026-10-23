<script setup>
import Demo from './Demo.vue';
import PreviewVersion from './PreviewVersion.vue';
import LinkStatesExamples from './LinkStatesExamples.vue';
defineProps({family:{type:Object,required:true}});
const examples={
 cards:[{id:'DatasetCard',label:'Carte de jeu de données',hint:'Toute la carte mène au jeu de données ; le producteur et les métadonnées gardent leurs panneaux indépendants.'}],
 buttons:[{id:'BrandedButton',label:'Actions et états',hint:'Compare les boutons disponibles, désactivés et en attente.'},{id:'CopyButton',label:'Copie',props:{iconOnly:true},hint:'Survole ou focalise le bouton, puis copie la valeur : la confirmation apparaît après la réussite.'}],
 inputs:[{id:'cdata/InputGroup/InputGroup',label:'Champ de saisie',props:{label:'Nom du jeu de données',modelValue:'Population des communes',hintText:'Un titre précis et compréhensible.',type:'text',required:true}},{id:'cdata/InputGroup/InputGroup',label:'Champ en erreur',props:{label:'Titre obligatoire',modelValue:'',required:true,hasError:true,errorText:'Renseignez un titre avant de continuer.'}},{id:'cdata/InputGroup/InputGroup',label:'Champ désactivé',props:{label:'Valeur indisponible',modelValue:'Population des communes',disabled:true}},{id:'Form/SelectGroup',label:'Sélection',hint:'Ouvre le sélecteur et parcours les options au clavier.'}],
 badges:[{id:'cdata/AccessTypes/AccessTypeBadge',label:'État informatif',props:{accessType:'open_with_account'}},{id:'Tag',label:'Tag sélectionnable',props:{selectable:true},hint:'Clique pour sélectionner ou désélectionner le tag.'},{id:'Tag',label:'Tag supprimable',props:{dismissible:true,label:'Données ouvertes'},hint:'La croix retire le tag de cet exemple.'}],
 details:[{id:'Tooltip',label:'Aide au survol et au focus',hint:'Survole ou focalise la commande. Échap ferme l’aide.'},{id:'Toggletip',label:'Information au clic',hint:'Clique pour ouvrir ; Échap ou un clic extérieur ferme le panneau.'}],
 banners:[{id:'SimpleBanner',label:'États sémantiques'},{id:'BannerAction',label:'Message avec action'}],
 loading:[{id:'LoadingBlock',label:'Attente',props:{status:'pending',data:null}},{id:'cdata/Search/NoResults',label:'Aucun résultat'}],
 tables:[{id:'cdata/AdminTable/Table/AdminTable',label:'Tableau de données',hint:'En-tête, séparations et alignements communs, avec des données fictives.'}],
 disclosures:[{id:'ExtraAccordion',label:'Informations complémentaires',props:{titleText:'Informations complémentaires',buttonText:'Voir les détails',titleLevel:'h3',extra:{Source:'Observatoire des territoires',Version:'2026-10'}},hint:'Ouvre et ferme les détails, avec le clic ou Entrée / Espace.'}],
 identity:[{id:'Avatar',label:'Avatar'},{id:'OrganizationLogo',label:'Logo disponible',props:{organization:{name:'République française',logo_thumbnail:'/demo/republique-francaise.svg'},sizeClass:'size-16'}},{id:'OrganizationLogo',label:'Sans logo',props:{organization:{name:'Organisation',logo_thumbnail:null},sizeClass:'size-16'}}],
 metrics:[{id:'ProgressBar',label:'Progression intermédiaire',props:{value:0.6,max:1}},{id:'ProgressBar',label:'Valeur nulle',props:{value:0,max:1}},{id:'ProgressBar',label:'Maximum',props:{value:1,max:1}},{id:'StatBox',label:'Indicateur statistique'}],
 modals:[{id:'cdata/Modal/ModalWithButton',label:'Ouvrir et fermer un dialogue',props:{title:'Consulter les informations',size:'sm'},hint:'Le dialogue actuel illustre le mécanisme : ouvre-le, parcours ses commandes au clavier puis ferme-le. Il ne dispose pas encore de proposition visuelle.'}],
};
</script>
<template>
 <div class="behavior-live-examples">
  <h4 class="behavior-live-heading">Exemples interactifs</h4>
  <p class="behavior-live-intro">{{family.id==='modals'?'Composant actuel · données fictives.':'Composants proposés · données fictives.'}}</p>
  <PreviewVersion version="proposal">
   <div v-if="family.id==='links'" class="demo-content"><LinkStatesExamples/></div>
   <div v-else class="behavior-example-list">
    <article v-for="(example,index) in examples[family.id] || []" :key="`${example.id}-${index}`" class="behavior-example">
     <h5>{{example.label}}</h5>
     <div class="behavior-example-preview"><Demo :name="example.id" :sample-props="example.props"/></div>
     <p v-if="example.hint" class="behavior-example-hint">{{example.hint}}</p>
    </article>
   </div>
  </PreviewVersion>
 </div>
</template>
<style scoped>
.behavior-live-examples{margin-block:var(--lab-ds-space-24)}
.behavior-live-heading{margin:0 0 var(--lab-ds-space-8);font:var(--lab-ds-weight-semibold) var(--lab-ds-text-title)/var(--lab-ds-leading-title) var(--lab-ds-font-sans)}
.behavior-live-intro,.behavior-example-hint{font:var(--lab-ds-weight-regular) var(--lab-ds-text-caption)/var(--lab-ds-leading-caption) var(--lab-ds-font-sans);color:var(--lab-ds-text-secondary)}
.behavior-example-list{display:grid;gap:var(--lab-ds-space-16)}
.behavior-example{min-width:0;border:1px solid var(--lab-ds-border);border-radius:var(--lab-ds-radius);padding:var(--lab-ds-space-16);background:var(--lab-ds-surface)}
.behavior-example>h5{margin:0 0 var(--lab-ds-space-16);font:var(--lab-ds-weight-medium) var(--lab-ds-text-body)/var(--lab-ds-leading-body) var(--lab-ds-font-sans)}
.behavior-example-preview{min-width:0}
.behavior-example-hint{margin:var(--lab-ds-space-12) 0 0}
</style>
