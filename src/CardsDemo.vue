<script setup>
import {computed, reactive, ref} from 'vue';
import Demo from './Demo.vue';
import {samples} from './demoRegistry';
import DemoBoundary from './DemoBoundary.vue';
import PreviewVersion from './PreviewVersion.vue';
import PreviewVersionToggle from './PreviewVersionToggle.vue';
import foundations from '../data/proposal-foundations.json';
import '../proposals/shared/foundations.css';
import DatasetCardSkeleton from '../proposals/skeletons/DatasetCardSkeleton.vue';
import DataserviceCardSkeleton from '../proposals/skeletons/DataserviceCardSkeleton.vue';
import OrganizationCardSkeleton from '../proposals/skeletons/OrganizationCardSkeleton.vue';
import OrganizationHorizontalCardSkeleton from '../proposals/skeletons/OrganizationHorizontalCardSkeleton.vue';
import ReuseCardSkeleton from '../proposals/skeletons/ReuseCardSkeleton.vue';
import ReuseHorizontalCardSkeleton from '../proposals/skeletons/ReuseHorizontalCardSkeleton.vue';
import ChartCardSkeleton from '../proposals/skeletons/ChartCardSkeleton.vue';
import PostCardSkeleton from '../proposals/skeletons/PostCardSkeleton.vue';
import TopicCardSkeleton from '../proposals/skeletons/TopicCardSkeleton.vue';
const skeletons={DatasetCard:DatasetCardSkeleton,DataserviceCard:DataserviceCardSkeleton,OrganizationCard:OrganizationCardSkeleton,OrganizationHorizontalCard:OrganizationHorizontalCardSkeleton,ReuseCard:ReuseCardSkeleton,ReuseHorizontalCard:ReuseHorizontalCardSkeleton,ChartCard:ChartCardSkeleton,PostCard:PostCardSkeleton,TopicCard:TopicCardSkeleton};
const loading=reactive({});
const allLoading=computed({get:()=>items.every(({id})=>loading[id]),set:value=>items.forEach(({id})=>loading[id]=value)});
const certified=ref(true);
function demoProps(id) {
 const sample=samples[id] || {};
 const decorate=organization=>({...organization,badges:[...(organization.badges || []).filter(b=>b.kind!=='certified'),...(certified.value?[{kind:'certified'}]:[])]});
 return Object.fromEntries(Object.entries(sample).map(([key,value])=>[key,key==='organization' && value ? decorate(value) : value?.organization ? {...value,organization:decorate(value.organization)} : value]));
}
const core=['DatasetCard','DataserviceCard','OrganizationCard','OrganizationHorizontalCard','ReuseCard','ReuseHorizontalCard','ChartCard','PostCard','TopicCard'].map(id=>({id}));
const adapters=[
 {id:'cdata/Dataservices/Card/Card',target:'DataserviceCard',note:'Cet adaptateur transmet les données, les URL et l’option de description au composant partagé. Peut-on utiliser directement DataserviceCard aux points d’appel, ou conserver cet adaptateur pour centraliser ces valeurs ?'},
 ...[['Dataservice','DataserviceCard'],['Dataset','DatasetCard'],['Organization','OrganizationCard'],['Reuse','ReuseCard']].map(([name,target])=>({id:`cdata/Embeds/${name}Card.global`,target,note:`Ce composant charge les données depuis un slug et gère leur état de chargement avant d’afficher ${target}. Peut-on conserver uniquement cette responsabilité dans un adaptateur léger, avec ${target} pour le rendu ? Un remplacement direct doit préserver ce chargement.`})),
 {id:'cdata/Reuses/ReuseCard',target:'ReuseCard',note:'Ce composant délègue déjà son rendu à ReuseCard et renseigne les URL de réutilisation et d’organisation. Conserve-t-on ce raccourci ou utilise-t-on directement le composant partagé ?'},
 {id:'cdata/dataset/card-lg',target:'DatasetCard',note:'Ce composant délègue déjà son rendu à DatasetCard avec les URL, le style et l’option de description. Peut-on utiliser directement DatasetCard, en conservant ces paramètres ?'},
];
const groups=[{title:'Cartes data.gouv components',items:core},{title:'Cartes cdata : conservation ou mutualisation ?',items:adapters}];
const items=[...core,...adapters];
const proposed=reactive(Object.fromEntries(items.map(({id})=>[id,true])));
const enabledCount=computed(()=>items.filter(({id})=>proposed[id]).length);
const allProposed=computed({get:()=>enabledCount.value===items.length,set:value=>items.forEach(({id})=>{proposed[id]=value;})});
const tokens=Object.fromEntries(foundations.groups.flatMap(g=>g.tokens.map(t=>[t.name,t.value])));
</script>
<template>
 <div class="cards-demo">
  <header><h1>Démo des cartes</h1><p class="intro">Comparer les cartes actuelles et les propositions, puis discuter des variantes à conserver. Les deux versions utilisent les mêmes données de démonstration.</p></header>
  <section class="cards-demo-foundations" aria-labelledby="cards-foundations-title">
   <h2 id="cards-foundations-title">Fondamentaux</h2>
   <dl>
    <div><dt>Typographie</dt><dd>Marianne · texte {{tokens['text-body']}} · titres {{tokens['text-title']}} · métadonnées {{tokens['text-caption']}}</dd></div>
    <div><dt>Hiérarchie des couleurs</dt><dd><span v-for="key in ['text','text-secondary','text-muted']" :key="key" class="cards-demo-swatch"><i :style="{background:tokens[key]}" aria-hidden="true" />{{tokens[key]}}</span></dd></div>
    <div><dt>Espacements</dt><dd>Icône et libellé {{tokens['space-4']}} · contenu de carte {{tokens['space-16']}} · sections {{tokens['space-24']}}</dd></div>
    <div><dt>Rayons concentriques</dt><dd>Cartes et boutons {{tokens.radius}} · média à fleur de carte : rayon extérieur moins bordure. Tags en pilule.</dd></div>
    <div><dt>Icônes</dt><dd>Remix Icon Line · standard {{tokens.icon}} · métadonnées {{tokens['icon-compact']}}</dd></div>
    <div><dt>Interactions</dt><dd>Titre et icône bleus au survol · focus clavier visible · actions secondaires indépendantes.</dd></div>
   </dl>
   <a href="#fondamentaux/propositions">Consulter tous les fondamentaux →</a>
  </section>
  <div class="cards-demo-toolbar"><div><strong>Afficher toutes les propositions</strong><p aria-live="polite">{{enabledCount}} / {{items.length}} propositions activées<span v-if="enabledCount>0 && enabledCount<items.length"> · sélection mixte</span></p></div><PreviewVersionToggle v-model="allProposed" name="toutes les cartes" /></div>
  <label class="cards-demo-toolbar"><span>Organisation certifiée (exemples)</span><input v-model="certified" type="checkbox" /></label>
  <label class="cards-demo-toolbar"><span>Afficher les skeletons des propositions</span><input v-model="allLoading" type="checkbox" /></label>
  <nav aria-label="Sections de la démonstration"><a href="#demo-cartes" @click.prevent="$refs.coreSection?.[0]?.scrollIntoView({behavior:'auto'})">Cartes partagées</a> · <a href="#demo-cartes" @click.prevent="$refs.coreSection?.[1]?.scrollIntoView({behavior:'auto'})">Variantes cdata</a></nav>
  <section v-for="group in groups" ref="coreSection" :key="group.title" class="cards-demo-group">
   <h2>{{group.title}}</h2>
   <article v-for="item in group.items" :key="item.id" class="cards-demo-item">
    <header class="cards-demo-item-heading"><div><h3>{{item.id.split('/').pop()}}</h3><code>{{item.id}}</code></div><div class="cards-demo-item-controls"><label><input v-model="loading[item.id]" type="checkbox" /> Skeleton</label><PreviewVersionToggle v-model="proposed[item.id]" :name="item.id" /></div></header>
    <div class="cards-demo-comparison">
     <section><h4>Avant · version actuelle</h4><div class="cards-demo-stage"><PreviewVersion version="current"><DemoBoundary :name="item.id"><Demo :name="item.id" :sample-props="demoProps(item.id)" /></DemoBoundary></PreviewVersion></div></section>
     <section><h4>{{proposed[item.id]?'Après · proposition':'Version actuelle · proposition désactivée'}}</h4><div class="cards-demo-stage"><component :is="skeletons[item.target || item.id]" v-if="loading[item.id] && proposed[item.id]" /><PreviewVersion v-else :key="proposed[item.id]?'proposal':'current'" :version="proposed[item.id]?'proposal':'current'"><DemoBoundary :name="item.id"><Demo :name="item.id" :sample-props="demoProps(item.id)" /></DemoBoundary></PreviewVersion></div></section>
    </div>
    <aside v-if="item.note" class="cards-demo-comment"><strong>À discuter · conserver cette carte ?</strong><p>{{item.note}}</p><a :href="`#${item.target}`">Voir {{item.target}} dans data.gouv components →</a></aside>
    <footer><a :href="`#${item.id}`">Fiche du composant →</a></footer>
   </article>
  </section>
 </div>
</template>
<style scoped>
.cards-demo-item-controls{display:flex;align-items:center;gap:16px}.cards-demo-item-controls label{display:flex;align-items:center;gap:8px;font-size:12px}.cards-demo{max-width:1400px;margin:auto}.cards-demo-foundations{padding:24px;border:1px solid var(--lab-ds-border);border-radius:var(--lab-ds-radius);background:var(--lab-ds-surface);margin-block:24px}.cards-demo-foundations h2{margin-top:0}.cards-demo-foundations dl{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;margin:0 0 20px}.cards-demo-foundations dt{font-weight:600;margin-bottom:4px}.cards-demo-foundations dd{margin:0;color:var(--lab-ds-text-secondary);font-size:14px}.cards-demo-swatch{display:inline-flex;align-items:center;gap:4px;margin-right:12px}.cards-demo-swatch i{width:12px;height:12px;border-radius:2px}.cards-demo-toolbar,.cards-demo-item-heading{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}.cards-demo-toolbar{padding:16px;background:var(--lab-ds-surface);border:1px solid var(--lab-ds-border);margin-block:24px}.cards-demo-toolbar p{font-size:12px;margin:4px 0 0}.cards-demo-group{margin-top:32px;scroll-margin-top:96px}.cards-demo-item{border:1px solid var(--lab-ds-border);border-radius:var(--lab-ds-radius);background:var(--lab-ds-surface);margin-block:24px;min-width:0}.cards-demo-item-heading{padding:16px;border-bottom:1px solid var(--lab-ds-border)}.cards-demo-item h3{margin:0;font-size:16px}.cards-demo-item code{font-size:12px;overflow-wrap:anywhere}.cards-demo-comparison{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}.cards-demo-comparison>section{min-width:0}.cards-demo-comparison>section+section{border-left:1px solid var(--lab-ds-border)}.cards-demo-comparison h4{margin:0;padding:12px 16px;font-size:12px;color:var(--lab-ds-text-secondary);background:var(--lab-ds-surface-subtle)}.cards-demo-stage{padding:24px;min-width:0}.cards-demo-comment{margin:0 16px 16px;padding:16px;border-left:3px solid var(--lab-ds-info-text);background:var(--lab-ds-info-bg);font-size:14px}.cards-demo-comment p{margin:8px 0}.cards-demo-item footer{padding:12px 16px;border-top:1px solid var(--lab-ds-border);font-size:12px}@media(max-width:900px){.cards-demo-comparison,.cards-demo-foundations dl{grid-template-columns:1fr}.cards-demo-comparison>section+section{border-left:0;border-top:1px solid var(--lab-ds-border)}.cards-demo-stage{padding:16px}}
</style>
