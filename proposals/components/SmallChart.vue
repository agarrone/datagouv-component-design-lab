<script setup lang="ts">
import '../shared/foundations.css'
import { computed } from 'vue'
import EChartsSparkline from '../shared/EChartsSparkline.vue'

const props = withDefaults(defineProps<{
  data: Record<string, number>
  height?: number
  lastWithLowEmphasis?: boolean
  showAxisLabel?: boolean
  type: 'line' | 'bar'
  width?: number | string
}>(), {
  height: 64,
  lastWithLowEmphasis: false,
  showAxisLabel: true,
  width: 120,
})

const points = computed(() => Object.entries(props.data || {})
  .filter(([date, value]) => Number.isFinite(value) && Number.isFinite(Date.parse(date)))
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([date, value]) => ({ date, value })))
const widthStyle = computed(() => typeof props.width === 'number' ? `${props.width}px` : props.width)
const formatDate = (date?: string) => date
  ? new Intl.DateTimeFormat('fr-FR', { month: '2-digit', year: '2-digit', timeZone: 'UTC' }).format(new Date(date))
  : '—'
const description = computed(() => points.value
  .map(point => `${formatDate(point.date)} : ${new Intl.NumberFormat('fr-FR').format(point.value)}`)
  .join(' ; '))
</script>

<template>
  <figure class="lab-small-chart" :style="{ width: widthStyle }">
    <EChartsSparkline
      v-if="points.length"
      :points="points"
      :type="type"
      :height="height"
      :last-with-low-emphasis="lastWithLowEmphasis"
      :show-x-axis="showAxisLabel"
    />
    <div v-else class="lab-small-chart-empty" :style="{ height: `${height}px` }">—</div>
    <figcaption class="sr-only">Historique : {{ description || 'aucune donnée disponible' }}</figcaption>
  </figure>
</template>

<style scoped>
.lab-small-chart{max-width:100%;margin:0;color:var(--lab-ds-text);font-family:var(--lab-ds-font-sans)}
.lab-small-chart-empty{display:grid;place-items:center;border-bottom:var(--lab-ds-stroke) solid var(--lab-ds-border);color:var(--lab-ds-text-muted)}
</style>
