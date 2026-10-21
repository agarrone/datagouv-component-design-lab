<template>
  <div class="lab-quality-block">
  <Toggletip
    :styled-button="false"
    button-class="lab-quality-trigger lab-quality-trigger-block"
    :button-props="{ title: t('Qualité des métadonnées') }"
  >
    <span class="lab-quality-trigger-label">
      <RiInformationLine data-icon-size="base" focusable="false" class="lab-quality-info lab-ds-icon" aria-hidden="true" />
      <span>{{ t('Métadonnées') }}</span>
    </span>
    <QualityScore :score="quality.score" class="w-full" />
    <template #toggletip>
      <DatasetQualityTooltipContent :quality />
    </template>
  </Toggletip>
  <template v-if="!hideWarnings">
    <ul class="lab-quality-warnings">
      <QualityItemWarning
        :quality-item="quality.dataset_description_quality"
        :message="t('Description des données non renseignée')"
      />
      <QualityItemWarning
        :quality-item="quality.resources_documentation"
        :message="t('Documentation des fichiers manquante')"
      />
      <QualityItemWarning
        :quality-item="quality.license"
        :message="t('Licence non renseignée')"
      />
      <QualityItemWarning
        :quality-item="quality.update_frequency && quality.update_fulfilled_in_time"
        :message="quality.update_frequency ? t('Fréquence de mise à jour non respectée') : t('Fréquence de mise à jour non renseignée')"
      />
      <QualityItemWarning
        :quality-item="quality.has_open_format"
        :message="t('Formats de fichiers non standards')"
      />
      <QualityItemWarning
        :quality-item="quality.temporal_coverage"
        :message="t('Couverture temporelle non renseignée')"
      />
      <QualityItemWarning
        :quality-item="quality.spatial"
        :message="t('Couverture spatiale non renseignée')"
      />
      <QualityItemWarning
        :quality-item="quality.all_resources_available"
        :message="t('Certains fichiers ne sont pas disponibles')"
      />
    </ul>
  </template>
  </div>
</template>

<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/quality.css'
import { RiInformationLine } from '@remixicon/vue'
import type { Quality } from '../../vendor/datagouv-components/src/types/datasets'
import QualityItemWarning from './QualityItemWarning.vue'
import QualityScore from './QualityScore.vue'
import Toggletip from '../shared/QualityDetailsPopover.vue'
import DatasetQualityTooltipContent from './DatasetQualityTooltipContent.vue'
import { useTranslation } from '../../vendor/datagouv-components/src/composables/useTranslation'

withDefaults(defineProps<{
  quality: Quality
  hideWarnings?: boolean
}>(), {
  hideWarnings: true,
})

const { t } = useTranslation()
</script>
