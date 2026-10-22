<script setup lang="ts">
import './foundations.css'
import {computed} from 'vue'
const props=defineProps<{points:{date:string,value:number}[];type:'line'|'bar'}>()
const minimum=computed(()=>Math.min(0,...props.points.map(p=>p.value)))
const maximum=computed(()=>Math.max(0,...props.points.map(p=>p.value))||1)
const y=(value:number)=>30-(value-minimum.value)/(maximum.value-minimum.value||1)*28
const baseline=computed(()=>y(0))
const positions=computed(()=>props.points.map((p,i)=>({x:props.points.length===1?60:2+i/(props.points.length-1)*116,y:y(p.value),value:p.value})))
const line=computed(()=>positions.value.map((p,i)=>(i?'L':'M')+p.x+','+p.y).join(' '))
const barWidth=computed(()=>Math.min(12,112/Math.max(1,props.points.length)-2))
</script>
<template>
 <svg class="lab-stat-sparkline" viewBox="0 0 120 32" preserveAspectRatio="none" aria-hidden="true" focusable="false" data-icon-size="custom">
  <line x1="0" x2="120" :y1="baseline" :y2="baseline" class="lab-stat-baseline" />
  <template v-if="type==='bar'">
   <rect v-for="(point,i) in positions" :key="i" :x="(i+.5)*120/positions.length-barWidth/2" :y="Math.min(point.y,baseline)" :width="Math.max(1,barWidth)" :height="Math.abs(baseline-point.y)" class="lab-stat-bar" />
  </template>
  <template v-else>
   <path :d="line" class="lab-stat-line" />
   <circle v-if="positions.length" :cx="positions[positions.length-1].x" :cy="positions[positions.length-1].y" r="2" class="lab-stat-bar" />
  </template>
 </svg>
</template>
<style scoped>
.lab-stat-sparkline{display:block;width:100%;height:var(--lab-ds-space-32);overflow:visible}
.lab-stat-baseline{stroke:var(--lab-ds-border);stroke-width:1;vector-effect:non-scaling-stroke}
.lab-stat-line{fill:none;stroke:var(--lab-ds-brand);stroke-width:2;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke}
.lab-stat-bar{fill:var(--lab-ds-brand)}
</style>
