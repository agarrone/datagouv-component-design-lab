<template>
  <section class="lab-dataset-quality-details">
    <p>Qualité des métadonnées :</p>
    <ul>
      <QualityItem :passed="quality.dataset_description_quality" message-passed="Description des données renseignée" message-failed="Description des données non renseignée" />
      <QualityItem :passed="quality.resources_documentation" message-passed="Fichiers documentés" message-failed="Documentation des fichiers manquante" />
      <QualityItem :passed="quality.license" message-passed="Licence renseignée" message-failed="Licence non renseignée" />
      <QualityItem :passed="quality.update_frequency && !!quality.update_fulfilled_in_time" message-passed="Fréquence de mise à jour respectée" :message-failed="quality.update_frequency ? 'Fréquence de mise à jour non respectée' : 'Fréquence de mise à jour non renseignée'" />
      <QualityItem :passed="quality.has_open_format" message-passed="Formats de fichiers standards" message-failed="Formats de fichiers non standards" />
      <QualityItem :passed="quality.temporal_coverage" message-passed="Couverture temporelle renseignée" message-failed="Couverture temporelle non renseignée" />
      <QualityItem :passed="quality.spatial" message-passed="Couverture spatiale renseignée" message-failed="Couverture spatiale non renseignée" />
      <QualityItem :passed="quality.all_resources_available" message-passed="Tous les fichiers sont disponibles" message-failed="Certains fichiers ne sont pas disponibles" />
    </ul>
  </section>
</template>

<script setup lang="ts">
import '../shared/foundations.css'
import type { Quality } from '../../vendor/datagouv-components/src/types/datasets'
import QualityItem from '../../vendor/datagouv-components/src/components/QualityItem.vue'

defineProps<{ quality: Quality }>()
</script>

<style scoped>
.lab-dataset-quality-details{display:flex;flex-direction:column;gap:var(--lab-ds-space-12)}
p{margin:0;font-size:var(--lab-ds-text-body);line-height:var(--lab-ds-leading-body);font-weight:var(--lab-ds-weight-semibold)}
ul{display:flex;flex-direction:column;gap:var(--lab-ds-space-8);margin:0;padding:0;list-style:none}
</style>
