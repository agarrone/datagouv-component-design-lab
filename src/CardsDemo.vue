<script setup>
import {ref} from 'vue';
import Demo from './Demo.vue';
import {samples} from './demoRegistry';
import DemoBoundary from './DemoBoundary.vue';
import PreviewVersion from './PreviewVersion.vue';
import foundations from '../data/proposal-foundations.json';
import '../proposals/shared/foundations.css';
const certified=ref(true);
function demoProps(id) {
 const sample=samples[id] || {};
 const decorate=organization=>({...organization,badges:[...(organization.badges || []).filter(b=>b.kind!=='certified'),...(certified.value?[{kind:'certified'}]:[])]});
 return Object.fromEntries(Object.entries(sample).map(([key,value])=>[key,key==='organization' && value ? decorate(value) : value?.organization ? {...value,organization:decorate(value.organization)} : value]));
}
const core=['DatasetCard','DataserviceCard','OrganizationCard','ReuseCard','ChartCard','PostCard','TopicCard'].map(id=>({id}));
const adapters=[
 {id:'cdata/Dataservices/Card/Card',target:'DataserviceCard',note:'Adaptateur cdata conservé : il transmet les données, les URL et l’option de description au composant partagé.'},
 ...[['Dataservice','DataserviceCard'],['Dataset','DatasetCard'],['Organization','OrganizationCard'],['Reuse','ReuseCard']].map(([name,target])=>({id:`cdata/Embeds/${name}Card.global`,target,note:`Adaptateur cdata conservé : il charge les données depuis un slug et gère leur état de chargement avant d’afficher ${target}.`})),
 {id:'cdata/Reuses/ReuseCard',target:'ReuseCard',note:'Adaptateur cdata conservé : il délègue le rendu à ReuseCard et renseigne les URL de réutilisation et d’organisation.'},
 {id:'cdata/dataset/card-lg',target:'DatasetCard',note:'Adaptateur cdata conservé : il délègue le rendu à DatasetCard avec les URL, le style et l’option de description.'},
];
const groups=[{title:'Cartes data.gouv components',items:core},{title:'Adaptateurs cdata',items:adapters}];
const tokens=Object.fromEntries(foundations.groups.flatMap(g=>g.tokens.map(t=>[t.name,t.value])));
</script>
<template>
 <div class="cards-demo">
  <header><h1>Démo des cartes</h1><p class="intro">Présenter les cartes intégrées dans cdata. La version du composant amont fait foi : les anciennes propositions du lab ont été retirées.</p></header>
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
  <label class="cards-demo-toolbar"><span>Organisation certifiée (exemples)</span><input v-model="certified" type="checkbox" /></label>
  <nav aria-label="Sections de la démonstration"><a href="#demo-cartes" @click.prevent="$refs.coreSection?.[0]?.scrollIntoView({behavior:'auto'})">Cartes partagées</a> · <a href="#demo-cartes" @click.prevent="$refs.coreSection?.[1]?.scrollIntoView({behavior:'auto'})">Variantes cdata</a></nav>
  <section v-for="group in groups" ref="coreSection" :key="group.title" class="cards-demo-group">
   <h2>{{group.title}}</h2>
   <article v-for="item in group.items" :key="item.id" class="cards-demo-item">
    <header class="cards-demo-item-heading"><div><h3>{{item.id.split('/').pop()}}</h3><code>{{item.id}}</code></div><span class="audit-status" data-status="valide">Validé</span></header>
    <div class="cards-demo-stage"><PreviewVersion version="current"><DemoBoundary :name="item.id"><Demo :name="item.id" :sample-props="demoProps(item.id)" /></DemoBoundary></PreviewVersion></div>
    <aside v-if="item.note" class="cards-demo-comment"><strong>Composant amont adopté</strong><p>{{item.note}}</p><a :href="`#${item.target}`">Voir {{item.target}} dans data.gouv components →</a></aside>
    <footer><a :href="`#${item.id}`">Fiche du composant →</a></footer>
   </article>
  </section>
 </div>
</template>
<style scoped>
.cards-demo{max-width:1400px;margin:auto}.cards-demo-foundations{padding:24px;border:1px solid var(--lab-ds-border);border-radius:var(--lab-ds-radius);background:var(--lab-ds-surface);margin-block:24px}.cards-demo-foundations h2{margin-top:0}.cards-demo-foundations dl{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;margin:0 0 20px}.cards-demo-foundations dt{font-weight:600;margin-bottom:4px}.cards-demo-foundations dd{margin:0;color:var(--lab-ds-text-secondary);font-size:14px}.cards-demo-swatch{display:inline-flex;align-items:center;gap:4px;margin-right:12px}.cards-demo-swatch i{width:12px;height:12px;border-radius:2px}.cards-demo-toolbar,.cards-demo-item-heading{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}.cards-demo-toolbar{padding:16px;background:var(--lab-ds-surface);border:1px solid var(--lab-ds-border);margin-block:24px}.cards-demo-group{margin-top:32px;scroll-margin-top:96px}.cards-demo-item{border:1px solid var(--lab-ds-border);border-radius:var(--lab-ds-radius);background:var(--lab-ds-surface);margin-block:24px;min-width:0}.cards-demo-item-heading{padding:16px;border-bottom:1px solid var(--lab-ds-border)}.cards-demo-item h3{margin:0;font-size:16px}.cards-demo-item code{font-size:12px;overflow-wrap:anywhere}.cards-demo-stage{padding:24px;min-width:0}.cards-demo-comment{margin:0 16px 16px;padding:16px;border-left:3px solid var(--lab-ds-info-text);background:var(--lab-ds-info-bg);font-size:14px}.cards-demo-comment p{margin:8px 0}.cards-demo-item footer{padding:12px 16px;border-top:1px solid var(--lab-ds-border);font-size:12px}@media(max-width:900px){.cards-demo-foundations dl{grid-template-columns:1fr}.cards-demo-stage{padding:16px}}
</style>
