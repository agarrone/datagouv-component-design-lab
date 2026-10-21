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
        <DataserviceQualityTooltipContent :quality />
      </template>
    </Toggletip>
  </div>
</template>

<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/quality.css'
import { RiInformationLine } from '@remixicon/vue'
import type { DataserviceQuality } from '../../vendor/datagouv-components/src/types/dataservices'
import QualityScore from './QualityScore.vue'
import DataserviceQualityTooltipContent from './DataserviceQualityTooltipContent.vue'
import Toggletip from '../shared/QualityDetailsPopover.vue'
import { useTranslation } from '../../vendor/datagouv-components/src/composables/useTranslation'

defineProps<{
  quality: DataserviceQuality
}>()

const { t } = useTranslation()
</script>
