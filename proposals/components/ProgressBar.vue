<template>
 <div class="lab-quality-meter" :role="valid ? 'meter' : undefined" :aria-valuenow="valid ? bounded : undefined" :aria-valuemin="valid ? 0 : undefined" :aria-valuemax="valid ? max : undefined">
  <div class="lab-quality-meter-fill" :class="barClass || 'lab-quality-fill-neutral'" :style="{width:percentage+'%'}" />
  <slot />
 </div>
</template>
<script setup lang="ts">
import {computed} from 'vue'
import '../shared/quality.css'
const props=withDefaults(defineProps<{value:number,max?:number,barClass?:string}>(),{max:1,barClass:''})
const valid=computed(()=>Number.isFinite(props.value) && Number.isFinite(props.max) && props.max>0)
const bounded=computed(()=>Math.min(props.max,Math.max(0,props.value)))
const percentage=computed(()=>valid.value?bounded.value/props.max*100:0)
</script>
