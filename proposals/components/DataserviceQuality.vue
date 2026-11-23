<template>
  <div class="lab-quality-block">
    <QualityDetailsPopover
      :styled-button="false"
      button-class="lab-quality-trigger lab-quality-trigger-block"
      :button-props="{ title: 'Qualité des métadonnées' }"
    >
      <span class="lab-quality-trigger-label">
        <RiInformationLine data-icon-size="base" focusable="false" class="lab-quality-info lab-ds-icon" aria-hidden="true" />
        <span>Métadonnées</span>
      </span>
      <QualityScore :score="quality.score" class="w-full" />
      <template #toggletip>
        <DataserviceQualityTooltipContent :quality="quality" />
      </template>
    </QualityDetailsPopover>
  </div>
</template>

<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/quality.css'
import { RiInformationLine } from '@remixicon/vue'
import type { DataserviceQuality } from '../../vendor/datagouv-components/src/types/dataservices'
import QualityScore from '../../vendor/datagouv-components/src/components/QualityScore.vue'
import DataserviceQualityTooltipContent from '../../vendor/datagouv-components/src/components/DataserviceQualityTooltipContent.vue'
import QualityDetailsPopover from '../shared/QualityDetailsPopover.vue'

defineProps<{ quality: DataserviceQuality }>()
</script>
