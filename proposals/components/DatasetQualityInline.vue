<template>
  <div class="lab-quality-inline">
  <Toggletip
    :styled-button="false"
    button-class="lab-quality-trigger lab-quality-trigger-inline lab-quality-trigger-link"
    :button-props="{ title: t('Qualité des métadonnées') }"
  >
    <span class="lab-quality-trigger-label">
      <span>{{ t('Métadonnées') }}</span>
    </span>
    <template #toggletip>
        <DatasetQualityTooltipContent :quality />
      </template>
    </Toggletip>
  </div>
</template>

<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/quality.css'
import type { Quality } from '../../vendor/datagouv-components/src/types/datasets'
import DatasetQualityTooltipContent from './DatasetQualityTooltipContent.vue'
import Toggletip from '../shared/QualityDetailsPopover.vue'
import { useTranslation } from '../../vendor/datagouv-components/src/composables/useTranslation'

defineProps<{
  quality: Quality
}>()

const { t } = useTranslation()
</script>
