<script setup lang="ts">
import '../../shared/foundations.css'
import '../../shared/remaining-viewer.css'
import Native from '/vendor/datagouv-components/src/components/Chart/ChartViewer.vue'
import ResponsiveHistogram from '../../shared/ResponsiveHistogram.vue'
import { computed, ref } from 'vue'
import { forwardProposalRef } from '../../shared/forwardProposalRef'
defineOptions({ inheritAttrs: false })
const child = ref()
defineExpose(forwardProposalRef(child))
const props=defineProps<{chart:any;series:any}>()
const isHistogram=computed(()=>props.chart?.series?.length===1&&props.chart.series[0]?.type==='histogram')
</script>

<template>
  <ResponsiveHistogram v-if="isHistogram" ref="child" :chart="chart" :series="series" />
  <Native v-else ref="child" v-bind="$attrs" :chart="chart" :series="series" class="lab-remaining-viewer">
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope || {}" />
    </template>
  </Native>
</template>
