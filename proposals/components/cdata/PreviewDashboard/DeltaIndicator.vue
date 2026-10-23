<script setup lang="ts">
import '../../../shared/foundations.css'
import {computed} from 'vue'
import {useTranslation} from '../../../../src/compat/application/translation'
import { RiArrowDownLine, RiArrowUpLine } from '@remixicon/vue'
import type { DeltaUnit } from '../../../../vendor/cdata-runtime/utils/previewDashboard'
import { formatDelta, getDeltaDirection, roundDelta } from '../../../../vendor/cdata-runtime/utils/previewDashboard'

const props = defineProps<{
  value?: number
  unit: DeltaUnit
}>()

const { t } = useTranslation()

const direction = computed(() => getDeltaDirection(roundDelta(props.value ?? 0, props.unit)))

const colorClass = computed(() => {
  if (direction.value === 'up') return 'lab-delta-positive'
  if (direction.value === 'down') return 'lab-delta-negative'
  return 'lab-delta-neutral'
})

const directionLabel = computed(() => {
  if (direction.value === 'up') return t('en hausse')
  if (direction.value === 'down') return t('en baisse')
  return t('stable')
})


</script>
<template>
  <span
    v-if="value != null"
    class="lab-delta"
    :class="colorClass"
  >
    <component
      :is="direction === 'up' ? RiArrowUpLine : RiArrowDownLine"
      v-if="direction !== 'neutral'"
      class="lab-delta-icon lab-ds-icon" data-icon-size="compact" focusable="false"
      aria-hidden="true"
    />
    {{ formatDelta(value, unit) }}
    <span class="sr-only"> ({{ directionLabel }})</span>
  </span>
</template>


<style scoped>.lab-delta{display:inline-flex;align-items:center;gap:var(--lab-ds-space-4);font:var(--lab-ds-weight-medium) var(--lab-ds-text-caption)/var(--lab-ds-leading-caption) var(--lab-ds-font-mono);font-variant-numeric:tabular-nums}.lab-delta-icon{width:var(--lab-ds-icon-compact);height:var(--lab-ds-icon-compact)}.lab-delta-positive{color:var(--lab-ds-success-text)}.lab-delta-negative{color:var(--lab-ds-danger-text)}.lab-delta-neutral{color:var(--lab-ds-text-secondary)}</style>