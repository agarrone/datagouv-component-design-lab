<script setup>
import Demo from './Demo.vue';
import DemoBoundary from './DemoBoundary.vue';
import MetadataExtras from '../proposals/components/MetadataExtras.vue';

defineProps({ dataset: { type: Object, required: true } });

const sections = [
  { id: 'DatasetInformation/DatasetInformationSection', key: 'general' },
  { id: 'DatasetInformation/DatasetTemporalitySection', key: 'time' },
  { id: 'DatasetInformation/DatasetSpatialSection', key: 'space' },
  { id: 'DatasetInformation/DatasetSchemaSection', key: 'schema' },
  { id: 'DatasetInformation/DatasetEmbedSection', key: 'embed' },
];
</script>

<template>
  <div class="ideal-dataset-metadata proposal-metadata-surface">
    <DemoBoundary v-for="section in sections" :key="section.id" :name="`ideal-${section.id}`">
      <div class="ideal-dataset-region" :data-region="section.key">
        <Demo :name="section.id" :sample-props="{ dataset }" contextual />
      </div>
    </DemoBoundary>
    <div v-if="Object.keys(dataset.extras || {}).length" class="ideal-dataset-region" data-region="extras">
      <section class="proposal-metadata-section ideal-dataset-extras">
        <MetadataExtras
          :extra="dataset.extras"
          title-text="Extras du jeu de données"
          button-text="Voir les extras"
          title-level="h3"
        />
      </section>
    </div>
  </div>
</template>

<style scoped>
.ideal-dataset-metadata{min-width:0;container-type:inline-size}
.ideal-dataset-region{min-width:0}
.ideal-dataset-metadata :deep(.demo-content),.ideal-dataset-metadata :deep(.demo-generic){font-size:var(--lab-ds-text-body);line-height:var(--lab-ds-leading-body)}
.ideal-dataset-metadata :deep(.demo-content){padding:0;background:transparent}
.ideal-dataset-region :deep(.proposal-metadata-section){padding-block:var(--lab-ds-space-24)}
.ideal-dataset-region:first-child :deep(.proposal-metadata-section){padding-top:0}
.ideal-dataset-region:last-child :deep(.proposal-metadata-section){padding-bottom:0;border-bottom:0}
.ideal-dataset-metadata :deep(.proposal-metadata-list){grid-template-columns:repeat(2,minmax(0,1fr))}
.ideal-dataset-metadata :deep(.proposal-metadata-list-balanced){grid-template-columns:repeat(2,minmax(0,1fr))}
@container (max-width: 700px){
  .ideal-dataset-metadata :deep(.proposal-metadata-list){grid-template-columns:repeat(2,minmax(0,1fr))}
}
@container (max-width: 460px){
  .ideal-dataset-region :deep(.proposal-metadata-section){padding-block:var(--lab-ds-space-16)}
  .ideal-dataset-region:first-child :deep(.proposal-metadata-section){padding-top:0}
  .ideal-dataset-region:last-child :deep(.proposal-metadata-section){padding-bottom:0}
  .ideal-dataset-metadata :deep(.proposal-metadata-list),.ideal-dataset-metadata :deep(.proposal-metadata-list-balanced){grid-template-columns:1fr}
}
</style>
