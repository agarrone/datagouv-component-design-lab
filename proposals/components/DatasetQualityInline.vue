<template>
  <div class="lab-quality-inline">
  <Toggletip
    :styled-button="false"
    button-class="lab-quality-trigger lab-quality-trigger-inline"
    :button-props="{ title: t('Qualité des métadonnées') }"
  >
    <span class="lab-quality-trigger-label">
      <RiInformationLine class="lab-quality-info" aria-hidden="true" />
      <span>{{ t('Métadonnées') }}</span>
    </span>
    <QualityScore :score="quality.score" />
    <template #toggletip>
        <DatasetQualityTooltipContent :quality />
      </template>
    </Toggletip>
  </div>
</template>

<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/quality.css'
import { RiInformationLine } from '@remixicon/vue'
import type { Quality } from '../../vendor/datagouv-components/src/types/datasets'
import QualityScore from './QualityScore.vue'
import DatasetQualityTooltipContent from './DatasetQualityTooltipContent.vue'
import Toggletip from '../shared/QualityDetailsPopover.vue'
import { useTranslation } from '../../vendor/datagouv-components/src/composables/useTranslation'

defineProps<{
  quality: Quality
}>()

const { t } = useTranslation()
</script>
