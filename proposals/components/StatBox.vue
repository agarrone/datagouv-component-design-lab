<script setup lang="ts">
import { computed } from 'vue'
import '../shared/foundations.css'
import StatSparkline from '../shared/StatSparkline.vue'

const props = defineProps<{
  title: string
  data?: Record<string, number> | null
  type: 'line' | 'bar'
  size?: 'sm'
  summary?: number | null
  since?: string | null
}>()

const density = computed(() => props.size === 'sm' ? 'compact' : 'standard')
const points = computed(() => Object.entries(props.data || {})
  .filter(([date, value]) => Number.isFinite(value) && /^\d{4}-\d{2}-\d{2}$/.test(date))
  .map(([date, value]) => ({ date, value: Number(value) }))
  .sort((a, b) => a.date.localeCompare(b.date)))
const summaryValue = computed(() => {
  if (props.summary !== undefined) return props.summary
  if (props.data === null) return null
  return points.value.reduce((total, point) => total + point.value, 0)
})
const latest = computed(() => points.value.at(-1) || null)
const number = new Intl.NumberFormat('fr-FR')
const compactNumber = new Intl.NumberFormat('fr-FR', { notation: 'compact', maximumFractionDigits: 2 })
const month = new Intl.DateTimeFormat('fr-FR', { month: 'short', year: 'numeric', timeZone: 'UTC' })
const fullNumber = (value: number) => number.format(value)
const shortNumber = (value: number) => compactNumber.format(value)
const monthLabel = (value: string) => month.format(new Date(`${value}T00:00:00Z`))
const historyLabel = computed(() => points.value.map(point => `${monthLabel(point.date)} : ${fullNumber(point.value)}`).join(' ; '))
</script>

<template>
  <article class="lab-stat-box" :data-density="density" :aria-label="title">
    <p class="lab-stat-box-title">{{ title }}</p>

    <div class="lab-stat-box-main">
      <div class="lab-stat-box-summary">
        <span v-if="summaryValue === null" class="lab-stat-box-skeleton lab-stat-box-skeleton--value" aria-label="Valeur en cours de chargement" />
        <span v-else class="lab-stat-box-value" :title="fullNumber(summaryValue)">{{ shortNumber(summaryValue) }}</span>
      </div>

      <div class="lab-stat-box-chart">
        <span v-if="data === null" class="lab-stat-box-skeleton lab-stat-box-skeleton--chart" aria-label="Historique en cours de chargement" />
        <template v-else-if="points.length">
          <StatSparkline :points="points" :type="type" />
          <span class="sr-only">Historique : {{ historyLabel }}</span>
        </template>
        <span v-else class="lab-stat-box-empty">Aucun historique</span>
      </div>
    </div>

    <div v-if="since || latest" class="lab-stat-box-meta">
      <span v-if="since">Depuis {{ monthLabel(since) }}</span>
      <span v-if="latest"><strong>{{ fullNumber(latest.value) }}</strong> en {{ monthLabel(latest.date) }}</span>
    </div>
  </article>
</template>

<style scoped>
.lab-stat-box{box-sizing:border-box;display:grid;align-content:start;gap:var(--lab-ds-space-12);min-width:0;padding:var(--lab-ds-space-16);border:var(--lab-ds-stroke) solid var(--lab-ds-border);border-radius:var(--lab-ds-radius);background:var(--lab-ds-surface);color:var(--lab-ds-text);font-family:var(--lab-ds-font-sans)}
.lab-stat-box-title{min-width:0;margin:0;color:var(--lab-ds-text);font:var(--lab-ds-weight-medium) var(--lab-ds-text-body)/var(--lab-ds-leading-control) var(--lab-ds-font-sans);overflow-wrap:anywhere}
.lab-stat-box-main{display:grid;grid-template-columns:minmax(0,auto) minmax(88px,1fr);align-items:end;gap:var(--lab-ds-space-12);min-width:0}
.lab-stat-box-summary,.lab-stat-box-chart{display:flex;align-items:center;min-width:0;min-height:var(--lab-ds-space-32)}
.lab-stat-box-value{display:block;max-width:100%;font:var(--lab-ds-weight-medium) var(--lab-ds-text-heading)/var(--lab-ds-leading-heading) var(--lab-ds-font-sans);font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.lab-stat-box-chart{width:100%}
.lab-stat-box-empty{color:var(--lab-ds-text-muted);font:var(--lab-ds-weight-regular) var(--lab-ds-text-caption)/var(--lab-ds-leading-caption) var(--lab-ds-font-sans)}
.lab-stat-box-meta{display:flex;align-items:baseline;justify-content:space-between;gap:var(--lab-ds-space-8);flex-wrap:wrap;min-width:0;color:var(--lab-ds-text-secondary);font:var(--lab-ds-weight-regular) var(--lab-ds-text-caption)/var(--lab-ds-leading-caption) var(--lab-ds-font-sans);font-variant-numeric:tabular-nums}
.lab-stat-box-meta strong{color:inherit;font-weight:var(--lab-ds-weight-medium)}
.lab-stat-box-skeleton{display:block;border-radius:var(--lab-ds-radius-technical);background:linear-gradient(90deg,var(--lab-ds-surface-subtle) 25%,var(--lab-ds-surface-active) 50%,var(--lab-ds-surface-subtle) 75%);background-size:200% 100%;animation:lab-stat-loading var(--lab-ds-duration-shimmer) linear infinite}
.lab-stat-box-skeleton--value{width:72px;height:var(--lab-ds-space-24)}
.lab-stat-box-skeleton--chart{width:100%;height:var(--lab-ds-space-32)}
.lab-stat-box[data-density=compact]{gap:var(--lab-ds-space-8);padding:var(--lab-ds-space-12)}
.lab-stat-box[data-density=compact] .lab-stat-box-main{grid-template-columns:minmax(0,auto) minmax(64px,1fr);gap:var(--lab-ds-space-8)}
.lab-stat-box[data-density=compact] .lab-stat-box-summary,.lab-stat-box[data-density=compact] .lab-stat-box-chart{min-height:var(--lab-ds-space-24)}
.lab-stat-box[data-density=compact] .lab-stat-box-value{font-size:var(--lab-ds-text-title);line-height:var(--lab-ds-leading-title)}
.lab-stat-box[data-density=compact] :deep(.lab-stat-sparkline){height:var(--lab-ds-space-24)}
.lab-stat-box[data-density=compact] .lab-stat-box-skeleton--chart{height:var(--lab-ds-space-24)}
@keyframes lab-stat-loading{to{background-position:-200% 0}}
@media(prefers-reduced-motion:reduce){.lab-stat-box-skeleton{animation:none}}
</style>
