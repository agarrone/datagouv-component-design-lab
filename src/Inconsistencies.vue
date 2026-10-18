<script setup>
import { ref, computed, watch } from 'vue';
import { issues } from './referenceData';
import lock from '../upstream.lock.json';
import Demo from './Demo.vue';
import DemoBoundary from './DemoBoundary.vue';
defineEmits(['open-component']);
const props=defineProps({issueId:String});
const filter=ref('all');
const category=ref('all');
watch(()=>props.issueId, id=>{if(id) {filter.value='all';category.value='all';}});
const categories=[...new Set(issues.map(issue=>issue.category))];
const comparisonItem=item=>typeof item==='string'?{id:item,label:item.split('/').pop()}:item;
const shown=computed(()=>issues.filter(issue=>(filter.value==='all'||issue.status===filter.value)&&(category.value==='all'||issue.category===category.value)));
</script>
<template>
 <div class="reference-page"><h1>Incohérences</h1><p class="intro">Écarts relevés dans le code à la référence {{ lock.commit.slice(0,7) }}. Les espacements ajoutés par le catalogue ne sont pas comptés comme des défauts de la bibliothèque. Les points à arbitrer peuvent correspondre à des choix intentionnels ; ils ne sont pas encore des propositions de modification.</p>
 <div class="reference-toolbar"><span>{{ shown.length }} constat{{ shown.length>1?'s':'' }}</span><div class="issue-filters"><select v-model="category" aria-label="Filtrer par thème"><option value="all">Tous les thèmes</option><option v-for="name in categories" :key="name" :value="name">{{ name }}</option></select><select v-model="filter" aria-label="Filtrer les constats"><option value="all">Tous les constats</option><option value="À arbitrer">À arbitrer</option><option value="Confirmé dans le code">Confirmé dans le code</option></select></div></div>
 <article v-for="issue in shown" :key="issue.id" :id="issue.id" class="issue-card"><div class="issue-meta"><span class="status">{{ issue.status }}</span><span>{{ issue.category }}</span></div><h2>{{ issue.title }}</h2><p>{{ issue.observation }}</p><h3>Conséquence</h3><p>{{ issue.impact }}</p>
  <details v-if="issue.comparison" class="issue-comparison"><summary>Comparer les composants</summary><div class="comparison-grid"><section v-for="item in issue.comparison.map(comparisonItem)" :key="item.id"><h4>{{ item.label }}</h4><DemoBoundary :name="item.id"><Demo :name="item.id" :sample-props="item.props" /></DemoBoundary></section></div></details>
  <h3>Piste à valider</h3><p>{{ issue.direction }}</p>
  <div v-if="issue.components.length" class="issue-components"><button v-for="id in issue.components" :key="id" @click="$emit('open-component',id)">{{ id }} →</button></div>
  <details class="issue-evidence"><summary>Vérifier dans le code source</summary><ul><li v-for="ref in issue.evidence" :key="ref.url+ref.text"><a :href="ref.url" target="_blank" rel="noopener noreferrer">{{ ref.label }} ↗</a><code>{{ ref.text }}</code></li></ul></details>
 </article></div>
</template>
