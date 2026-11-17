<script setup>
import Demo from './Demo.vue';
import DemoBoundary from './DemoBoundary.vue';

defineProps({
  resource: { type: Object, required: true },
  dataset: { type: Object, required: true },
});

const sections = [
  { id: 'ResourceAccordion/Metadata', title: 'Métadonnées du fichier' },
  { id: 'ResourceAccordion/DataStructure', title: 'Structure des données' },
  { id: 'ResourceAccordion/Downloads', title: 'Formats et téléchargements' },
];
</script>

<template>
  <div class="ideal-resource-metadata proposal-metadata-surface">
    <section v-for="section in sections" :key="section.id" class="proposal-metadata-section ideal-resource-section">
      <h3 class="proposal-metadata-heading">{{ section.title }}</h3>
      <DemoBoundary :name="`ideal-${section.id}`">
        <Demo :name="section.id" :sample-props="{ resource, dataset }" contextual />
      </DemoBoundary>
    </section>
  </div>
</template>

<style scoped>
.ideal-resource-metadata{min-width:0;container-type:inline-size}
.ideal-resource-section:first-child{padding-top:0}
.ideal-resource-section:last-child{padding-bottom:0;border-bottom:0}
.ideal-resource-metadata :deep(.demo-content){padding:0;background:transparent}
@container (max-width:600px){.ideal-resource-section{padding-block:var(--lab-ds-space-16)}}
</style>
