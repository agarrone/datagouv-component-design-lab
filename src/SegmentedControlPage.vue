<script setup>
import { computed, ref } from 'vue';
import ComponentExample from './ComponentExample.vue';
import ComponentOptions from './ComponentOptions.vue';
import SegmentedContext from './SegmentedContext.vue';
import { segmentedVariants, segmentedUsage } from './segmentedExamples';
import { issues } from './referenceData';
import audit from '../data/audit-statuses.json';
import { auditStatuses } from './auditStatus';
import lock from '../upstream.lock.json';
const props = defineProps({ component: Object, code: String, error: String, proposals: Array });
defineEmits(['open-issue','prepare-proposal']);
const options = ref({});
const status = auditStatuses.find(status=>status.id===audit.SegmentedControl)?.label || 'À auditer';
const findings = issues.filter(issue=>issue.components.includes('SegmentedControl'));
const sections = [{id:'overview',label:'Aperçu'},{id:'variants',label:'Variantes'},{id:'states',label:'États et interactions'},{id:'context',label:'Dans son contexte'},{id:'options',label:'Options'},{id:'audit',label:'Incohérences'},{id:'proposals',label:'Propositions'},{id:'source',label:'Code source'}];
function scroll(id) { document.getElementById(`segmented-${id}`)?.scrollIntoView({block:'start',behavior:'auto'}); }
const usageCode = computed(()=>segmentedUsage(options.value));
const contextCode = `<script setup>\nimport { ref } from 'vue'\nimport { SegmentedControl } from '@datagouv/components-next'\nimport { RiEditLine, RiEyeLine } from '@remixicon/vue'\n\nconst mode = ref('edit')\nconst choices = [\n  { value: 'edit', label: 'Modifier', icon: RiEditLine },\n  { value: 'preview', label: 'Prévisualiser', icon: RiEyeLine },\n]\n<`+`/script>\n\n<template>\n  <div class="flex justify-end">\n    <SegmentedControl v-model="mode" :options="choices" />\n  </div>\n</template>`;
</script>
<template>
  <article class="component-document">
    <header class="component-document-heading"><div class="document-title-line"><h1>SegmentedControl</h1><span class="audit-status" :data-status="audit.SegmentedControl">{{ status }}</span></div><p class="intro">Choisir une valeur parmi plusieurs options exclusives, dans une barre de contrôles.</p><div class="detail-meta"><span class="origin-label">Bibliothèque datagouv-components</span><a :href="component.sourceUrl" target="_blank" rel="noopener noreferrer">Source d’origine ↗</a><span>Référence {{ lock.commit.slice(0,7) }}</span></div></header>
    <div class="document-layout"><div class="document-content">
      <section id="segmented-overview" class="document-section"><h2>Aperçu</h2><p>Présentation standard, sur une piste grise. Les choix de cet exemple sont fictifs.</p><ComponentExample name="SegmentedControl" label="Aperçu principal" :sample-props="options" :code="usageCode" /></section>
      <section id="segmented-variants" class="document-section"><h2>Variantes</h2><p>Un seul composant, configuré avec les options existantes <code>underline</code> et <code>grow</code>.</p><section v-for="variant in segmentedVariants" :key="variant.id" class="document-variant"><h3>{{ variant.title }}</h3><p>{{ variant.description }}</p><ComponentExample name="SegmentedControl" :label="variant.title" :sample-props="variant.props" :code="segmentedUsage(variant.props)" /></section></section>
      <section id="segmented-states" class="document-section"><h2>États et interactions</h2><ul class="document-list"><li><strong>Sélection :</strong> un seul choix actif, piloté par <code>v-model</code>.</li><li><strong>Survol et focus :</strong> à observer directement dans les aperçus, avec la souris et la touche Tab.</li><li><strong>Clavier :</strong> les flèches gauche et droite, Début et Fin changent le choix sélectionné.</li></ul><p>Le composant ne déclare pas d’option <code>disabled</code> ou <code>loading</code>.</p></section>
      <section id="segmented-context" class="document-section"><h2>Dans son contexte</h2><p>Dans cdata, le composant permet notamment de choisir entre Modifier et Prévisualiser une présentation d’organisation. L’exemple ci-dessous reprend ces choix dans un assemblage simplifié.</p><ComponentExample name="SegmentedControl" label="Mode de présentation" :code="contextCode"><SegmentedContext /></ComponentExample><a class="document-source-link" :href="`${lock.repository}/blob/${lock.commit}/pages/organizations/%5Boid%5D/presentation.vue#L7`" target="_blank" rel="noopener noreferrer">Voir cet usage dans cdata ↗</a></section>
      <section id="segmented-options" class="document-section"><h2>Options</h2><p>Les réglages modifient l’aperçu principal. Les exemples de variantes conservent leur configuration.</p><ComponentOptions :component="component" v-model="options" /></section>
      <section id="segmented-audit" class="document-section"><h2>Incohérences à examiner</h2><article v-for="issue in findings" :key="issue.id" class="document-finding"><span class="status">{{ issue.status }}</span><h3>{{ issue.title }}</h3><p>{{ issue.observation }}</p><button @click="$emit('open-issue',issue.id)">Voir le constat et ses sources →</button></article></section>
      <section id="segmented-proposals" class="document-section"><div class="document-section-title"><h2>Propositions <span>({{ proposals.length }})</span></h2><button class="button" @click="$emit('prepare-proposal')">Préparer une proposition</button></div><p v-if="!proposals.length">Aucune proposition pour ce composant.</p><article v-for="proposal in proposals" :key="proposal.id" class="proposal"><span class="status">{{ proposal.status }}</span><h3>{{ proposal.title }}</h3><p>{{ proposal.problem }}</p><p>{{ proposal.intention }}</p><a v-if="proposal.reviewUrl && /^https:\/\//.test(proposal.reviewUrl)" :href="proposal.reviewUrl" target="_blank" rel="noopener noreferrer">Consulter la revue ↗</a></article></section>
      <section id="segmented-source" class="document-section"><h2>Code source</h2><p>Implémentation d’origine de la bibliothèque, distincte du code d’utilisation des exemples.</p><details class="document-source"><summary>Afficher SegmentedControl.vue</summary><pre v-if="code"><code>{{ code }}</code></pre><p v-else>{{ error || 'Chargement…' }}</p></details></section>
    </div><nav class="document-toc" aria-label="Dans cette fiche"><span>Dans cette fiche</span><button v-for="section in sections" :key="section.id" @click="scroll(section.id)">{{ section.label }}</button></nav></div>
  </article>
</template>
