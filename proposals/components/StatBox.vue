<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/metadata.css'
import {computed} from 'vue'
import {useTranslation} from '../../vendor/datagouv-components/src/composables/useTranslation'
import EChartsSparkline from '../shared/EChartsSparkline.vue'
const props=defineProps<{title:string;data?:Record<string,number>|null;type:'line'|'bar';size?:'sm';summary?:number|null;since?:string|null}>()
const {t,locale}=useTranslation()
const points=computed(()=>Object.entries(props.data||{}).filter(([date,value])=>Number.isFinite(value)&&Number.isFinite(Date.parse(date))).sort(([a],[b])=>a.localeCompare(b)).map(([date,value])=>({date,value})))
const summary=computed(()=>props.summary!==undefined?props.summary:points.value.length?points.value.reduce((sum,p)=>sum+p.value,0):null)
const summaryLoading=computed(()=>props.summary===null||(props.summary===undefined&&props.data===null))
const validSummary=computed(()=>typeof summary.value==='number'&&Number.isFinite(summary.value))
const fullSummary=computed(()=>validSummary.value?new Intl.NumberFormat(locale,{maximumFractionDigits:2}).format(summary.value as number):t('Indisponible'))
const latest=computed(()=>points.value.at(-1))
const previous=computed(()=>points.value.at(-2))
const trend=computed(()=>{
 if(!latest.value||!previous.value)return null
 const delta=latest.value.value-previous.value.value
 const percent=previous.value.value===0?null:delta/Math.abs(previous.value.value)*100
 return {delta,percent}
})
const formatMonth=(date:string)=>new Intl.DateTimeFormat(locale,{month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(date))
const sinceLabel=computed(()=>props.since&&Number.isFinite(Date.parse(props.since))?formatMonth(props.since):null)
const chartDescription=computed(()=>t('Historique mensuel')+' : '+points.value.map(p=>formatMonth(p.date)+' : '+new Intl.NumberFormat(locale).format(p.value)).join(' ; '))
const trendLabel=computed(()=>{
 if(!trend.value)return null
 const sign=trend.value.delta>0?'+':''
 if(trend.value.percent!==null)return `${sign}${new Intl.NumberFormat(locale,{maximumFractionDigits:0}).format(trend.value.percent)} %`
 return `${sign}${new Intl.NumberFormat(locale,{maximumFractionDigits:2}).format(trend.value.delta)}`
})
</script>
<template>
 <section class="lab-stat-box" :data-size="size || 'standard'" :aria-label="title" :aria-busy="summaryLoading || data===null">
  <header class="lab-stat-header">
   <p class="lab-stat-title">{{title}}</p>
   <p v-if="sinceLabel" class="lab-stat-period">{{t('Depuis')}} {{sinceLabel}}</p>
  </header>
  <div class="lab-stat-value-row">
   <span v-if="summaryLoading" class="lab-stat-skeleton lab-stat-skeleton-value" role="status"><span class="sr-only">{{t('Chargement')}}</span></span>
   <p v-else class="lab-stat-value" :aria-label="fullSummary" :title="validSummary ? fullSummary : undefined">{{validSummary?new Intl.NumberFormat(locale,{notation:'compact',maximumFractionDigits:2}).format(summary as number):'—'}}</p>
   <p v-if="trendLabel" class="lab-stat-trend" :data-direction="trend && trend.delta < 0 ? 'down' : 'up'">
    <span aria-hidden="true">{{trend && trend.delta < 0 ? '↘' : '↗'}}</span> {{trendLabel}}
    <span class="sr-only">{{t('par rapport au mois précédent')}}</span>
   </p>
  </div>
  <span v-if="data===null" class="lab-stat-skeleton lab-stat-skeleton-chart" aria-hidden="true" />
  <figure v-else-if="points.length" class="lab-stat-chart">
   <EChartsSparkline :points="points" :type="type" :height="size === 'sm' ? 56 : 68" show-x-axis />
   <figcaption class="sr-only">{{chartDescription}}</figcaption>
  </figure>
  <div v-else class="lab-stat-chart-empty" :data-size="size || 'standard'">
   <span>{{t('Aucun historique disponible')}}</span>
  </div>
 </section>
</template>
<style scoped>
.lab-stat-box{display:flex;flex-direction:column;min-width:0;color:var(--lab-ds-text);font-family:var(--lab-ds-font-sans)}
.lab-stat-header,.lab-stat-value-row{display:flex;align-items:baseline;justify-content:space-between;gap:var(--lab-ds-space-8);min-width:0}
.lab-stat-title{margin:0;color:var(--lab-ds-text-secondary);font:var(--lab-ds-weight-regular) var(--lab-ds-text-body)/var(--lab-ds-leading-control) var(--lab-ds-font-sans);overflow-wrap:anywhere}
.lab-stat-value-row{margin-top:var(--lab-ds-space-6)}
.lab-stat-value{margin:0;min-width:0;color:var(--lab-ds-text);overflow-wrap:anywhere;font:var(--lab-ds-weight-medium) var(--lab-metadata-value-size)/var(--lab-ds-leading-body) var(--lab-ds-font-sans);font-variant-numeric:tabular-nums}
.lab-stat-trend{display:flex;align-items:center;gap:var(--lab-ds-space-4);margin:0;color:var(--lab-ds-brand);font:var(--lab-ds-weight-medium) var(--lab-ds-text-caption)/var(--lab-ds-leading-caption) var(--lab-ds-font-sans);font-variant-numeric:tabular-nums;white-space:nowrap}
.lab-stat-chart{width:100%;margin:var(--lab-ds-space-12) 0 0}
.lab-stat-chart-empty{display:flex;align-items:center;height:68px;border-bottom:var(--lab-ds-stroke) solid var(--lab-ds-border);color:var(--lab-ds-text-muted);font:var(--lab-ds-weight-regular) var(--lab-ds-text-caption)/var(--lab-ds-leading-caption) var(--lab-ds-font-sans)}.lab-stat-chart-empty[data-size=sm]{height:56px}
.lab-stat-period{margin:0;color:var(--lab-ds-text-secondary);font:var(--lab-ds-weight-regular) var(--lab-ds-text-caption)/var(--lab-ds-leading-caption) var(--lab-ds-font-sans);font-variant-numeric:tabular-nums}
.lab-stat-skeleton{display:block;border-radius:var(--lab-ds-radius-technical);background:var(--lab-ds-surface-active)}
.lab-stat-skeleton-value{width:var(--lab-ds-space-64);height:var(--lab-ds-leading-body)}
.lab-stat-skeleton-chart{width:100%;height:68px;margin-top:var(--lab-ds-space-12)}
</style>
