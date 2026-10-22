<script setup lang="ts">
import '../shared/foundations.css'
import {computed} from 'vue'
import {useTranslation} from '../../vendor/datagouv-components/src/composables/useTranslation'
import StatSparkline from '../shared/StatSparkline.vue'
const props=defineProps<{title:string;data?:Record<string,number>|null;type:'line'|'bar';size?:'sm';summary?:number|null;since?:string|null}>()
const {t,locale}=useTranslation()
const points=computed(()=>Object.entries(props.data||{}).filter(([date,value])=>Number.isFinite(value)&&Number.isFinite(Date.parse(date))).sort(([a],[b])=>a.localeCompare(b)).map(([date,value])=>({date,value})))
const summary=computed(()=>props.summary!==undefined?props.summary:points.value.length?points.value.reduce((sum,p)=>sum+p.value,0):null)
const summaryLoading=computed(()=>props.summary===null||(props.summary===undefined&&props.data===null))
const validSummary=computed(()=>typeof summary.value==='number'&&Number.isFinite(summary.value))
const fullSummary=computed(()=>validSummary.value?new Intl.NumberFormat(locale,{maximumFractionDigits:2}).format(summary.value as number):t('Indisponible'))
const latest=computed(()=>points.value.at(-1))
const formatMonth=(date:string)=>new Intl.DateTimeFormat(locale,{month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(date))
const sinceLabel=computed(()=>props.since&&Number.isFinite(Date.parse(props.since))?formatMonth(props.since):null)
const chartDescription=computed(()=>t('Historique mensuel')+' : '+points.value.map(p=>formatMonth(p.date)+' : '+new Intl.NumberFormat(locale).format(p.value)).join(' ; '))
</script>
<template>
 <section class="lab-stat-box" :data-size="size || 'standard'" :aria-label="title" :aria-busy="summaryLoading || data===null">
  <p class="lab-stat-title">{{title}}</p>
  <div class="lab-stat-main">
   <span v-if="summaryLoading" class="lab-stat-skeleton lab-stat-skeleton-value" role="status"><span class="sr-only">{{t('Chargement')}}</span></span>
   <p v-else class="lab-stat-value" :aria-label="fullSummary" :title="validSummary ? fullSummary : undefined">{{validSummary?new Intl.NumberFormat(locale,{notation:'compact',maximumFractionDigits:2}).format(summary as number):'—'}}</p>
   <span v-if="data===null" class="lab-stat-skeleton lab-stat-skeleton-chart" aria-hidden="true" />
   <figure v-else-if="points.length" class="lab-stat-chart">
    <StatSparkline :points="points" :type="type" />
    <figcaption class="sr-only">{{chartDescription}}</figcaption>
   </figure>
  </div>
  <p v-if="sinceLabel" class="lab-stat-period">{{t('Depuis')}} {{sinceLabel}}</p>
  <p v-if="latest" class="lab-stat-latest"><strong>{{new Intl.NumberFormat(locale,{maximumFractionDigits:2}).format(latest.value)}}</strong> {{t('en')}} {{formatMonth(latest.date)}}</p>
  <p v-else-if="data!==null" class="lab-stat-period">{{t('Aucun historique disponible')}}</p>
 </section>
</template>
<style scoped>
.lab-stat-box{display:flex;flex-direction:column;gap:var(--lab-ds-space-4);min-width:0;padding:var(--lab-ds-space-16);border:var(--lab-ds-stroke) solid var(--lab-ds-border);border-radius:var(--lab-ds-radius);background:var(--lab-ds-surface);color:var(--lab-ds-text);font-family:var(--lab-ds-font-sans)}
.lab-stat-title{margin:0;font:var(--lab-ds-weight-medium) var(--lab-ds-text-body)/var(--lab-ds-leading-control) var(--lab-ds-font-sans);overflow-wrap:anywhere}
.lab-stat-main{display:flex;flex-wrap:wrap;align-items:center;gap:var(--lab-ds-space-16);min-width:0}
.lab-stat-value{margin:0;min-width:0;overflow-wrap:anywhere;font:var(--lab-ds-weight-semibold) var(--lab-ds-text-heading)/var(--lab-ds-leading-heading) var(--lab-ds-font-sans);font-variant-numeric:tabular-nums}
.lab-stat-chart{flex:1;min-width:var(--lab-ds-space-64);max-width:160px;margin:0}
.lab-stat-period,.lab-stat-latest{margin:0;color:var(--lab-ds-text-secondary);font:var(--lab-ds-weight-regular) var(--lab-ds-text-caption)/var(--lab-ds-leading-caption) var(--lab-ds-font-sans);font-variant-numeric:tabular-nums}
.lab-stat-latest strong{color:var(--lab-ds-text);font-weight:var(--lab-ds-weight-medium)}
.lab-stat-skeleton{display:block;border-radius:var(--lab-ds-radius-technical);background:var(--lab-ds-surface-active)}
.lab-stat-skeleton-value{width:var(--lab-ds-space-64);height:var(--lab-ds-leading-heading)}
.lab-stat-skeleton-chart{width:var(--lab-ds-space-64);height:var(--lab-ds-space-32)}
.lab-stat-box[data-size=sm]{padding:var(--lab-ds-space-12)}
.lab-stat-box[data-size=sm] .lab-stat-value{font-size:var(--lab-ds-text-title);line-height:var(--lab-ds-leading-title)}
.lab-stat-box[data-size=sm] .lab-stat-chart{max-width:var(--lab-ds-space-64)}
</style>
