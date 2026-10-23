<script setup>
import {ref} from 'vue';
import ComponentBehaviorExamples from './ComponentBehaviorExamples.vue';
import guide from '../data/component-behaviors.json';
const openFamilies=ref(new Set(['cards']));
function toggleFamily(id,event){const next=new Set(openFamilies.value);event.target.open?next.add(id):next.delete(id);openFamilies.value=next;}
</script>
<template>
 <section id="propositions-behaviors" class="reference-section behavior-guide">
  <h2>{{guide.title}}</h2>
  <p>{{guide.status}}</p>
  <p class="behavior-scope">{{guide.scope}}</p>
  <h3>Principes communs</h3>
  <ul><li v-for="rule in guide.principles" :key="rule">{{rule}}</li></ul>
  <p>Chaque fiche précise les états attendus, le clavier, les dépendances à réutiliser et les cas limites. Les valeurs visuelles sont détaillées dans les sections suivantes.</p>
  <details v-for="(family,index) in guide.families" :key="family.id" :open="index===0" class="behavior-family" @toggle="toggleFamily(family.id,$event)">
   <summary><h3>{{family.title}}</h3></summary>
   <div class="behavior-family-content">
    <p>{{family.purpose}}</p>
    <ComponentBehaviorExamples v-if="openFamilies.has(family.id)" :family="family"/>
    <div class="behavior-table-wrap" tabindex="0" role="region" :aria-label="`États et comportements — ${family.title}`">
     <table><caption class="sr-only">États et comportements attendus — {{family.title}}</caption><thead><tr><th scope="col">État</th><th scope="col">Comportement attendu</th></tr></thead><tbody><tr v-for="row in family.states" :key="row.state"><th scope="row">{{row.state}}</th><td>{{row.behavior}}</td></tr></tbody></table>
    </div>
    <h4>Clavier et accessibilité</h4><p>{{family.keyboard}}</p>
    <h4>Composition et dépendances</h4><ul><li v-for="rule in family.composition" :key="rule">{{rule}}</li></ul>
    <h4>Cas limites à vérifier</h4><p>{{family.edgeCases}}</p>
    <p class="behavior-examples"><strong>Voir les composants :</strong><a v-for="example in family.examples" :key="example.id" :href="`#${encodeURIComponent(example.id)}`">{{example.label}}</a></p>
   </div>
  </details>
  <h3>Avant de proposer ou modifier un composant</h3>
  <ol><li>Choisir sa famille et les primitives communes à réutiliser.</li><li>Prévoir les états d’interaction et les états métier pertinents.</li><li>Vérifier le clavier, les textes longs, les données absentes, l’attente, l’erreur et la largeur réelle du conteneur.</li><li>Contrôler les composants parents qui réutilisent la primitive.</li><li>Documenter les exceptions et mettre à jour les variantes du laboratoire.</li></ol>
 </section>
</template>
<style scoped>
.behavior-guide{color:var(--lab-ds-text)}
.behavior-scope{color:var(--lab-ds-text-secondary);padding-left:var(--lab-ds-space-12);border-left:2px solid var(--lab-ds-border-strong)}
.behavior-family{margin-block:var(--lab-ds-space-12);border:1px solid var(--lab-ds-border);border-radius:var(--lab-ds-radius);background:var(--lab-ds-surface)}
.behavior-family summary{padding:var(--lab-ds-space-16);cursor:pointer;color:var(--lab-ds-text)}
.behavior-family summary h3{display:inline;margin:0;font:var(--lab-ds-weight-semibold) var(--lab-ds-text-title)/var(--lab-ds-leading-title) var(--lab-ds-font-sans)}
.behavior-family summary:hover{background:var(--lab-ds-surface-subtle)}
.behavior-family summary:focus-visible,.behavior-table-wrap:focus-visible{outline:2px solid var(--lab-ds-focus);outline-offset:var(--lab-ds-focus-offset)}
.behavior-family[open] summary{border-bottom:1px solid var(--lab-ds-border)}
.behavior-family-content{padding:var(--lab-ds-space-16);font:var(--lab-ds-weight-regular) var(--lab-ds-text-body)/var(--lab-ds-leading-body) var(--lab-ds-font-sans)}
.behavior-family-content>p:first-child{margin-top:0}
.behavior-family-content>h4{margin:var(--lab-ds-space-24) 0 var(--lab-ds-space-8);font:var(--lab-ds-weight-semibold) var(--lab-ds-text-body)/var(--lab-ds-leading-body) var(--lab-ds-font-sans)}
.behavior-table-wrap{overflow:auto}
.behavior-table-wrap table{width:100%;border-collapse:collapse;font-size:inherit;line-height:inherit}
.behavior-table-wrap th,.behavior-table-wrap td{padding:var(--lab-ds-space-12);border-bottom:1px solid var(--lab-ds-border);text-align:left;vertical-align:top}
.behavior-table-wrap thead{background:var(--lab-ds-surface-subtle)}
.behavior-table-wrap th{font-weight:var(--lab-ds-weight-medium)}
.behavior-table-wrap tbody th{width:25%;min-width:8rem}
.behavior-examples{display:flex;gap:var(--lab-ds-space-12);flex-wrap:wrap;align-items:baseline;margin-bottom:0}
.behavior-examples a{color:var(--lab-ds-brand);background-image:none;text-decoration:underline;text-underline-offset:var(--lab-ds-space-optical)}
.behavior-examples a:hover{text-decoration-thickness:2px}
</style>
