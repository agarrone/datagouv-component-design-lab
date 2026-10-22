<template>
  <div class="lab-quality-inline">
  <Toggletip
    :styled-button="false"
    button-class="lab-quality-trigger lab-quality-trigger-inline lab-quality-trigger-link"
    :button-props="{ title: t('Qualité des métadonnées') }"
  >
    <span class="lab-quality-trigger-label">
      <RiInformationLine data-icon-size="base" focusable="false" class="lab-quality-info lab-ds-icon" aria-hidden="true" />
      <span>{{ t('Métadonnées') }}</span>
    </span>
    <QualityScore :score="quality.score" :show-value="false" />
    <RiArrowDownSLine class="lab-ds-icon" data-icon-size="compact" aria-hidden="true" focusable="false" />
    <template #toggletip>
        <DatasetQualityTooltipContent :quality />
      </template>
    </Toggletip>
  </div>
</template>

<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/quality.css'
import { RiArrowDownSLine, RiInformationLine } from '@remixicon/vue'
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
