<script setup lang="ts">
import './foundations.css'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { format, init, use, type EChartsType } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { SVGRenderer } from 'echarts/renderers'

use([BarChart, GridComponent, TooltipComponent, SVGRenderer])

const props = defineProps<{ chart: any; series: { data: Record<string, Array<Record<string, unknown>>>; columns: Record<string, Array<{name:string;type:string}>> } }>()
const root = ref<HTMLElement | null>(null)
const width = ref(800)
let instance: EChartsType | null = null
let observer: ResizeObserver | null = null

const definition = computed(() => props.chart.series?.find((item: any) => item.type === 'histogram') ?? props.chart.series?.[0])
const xKey = computed(() => definition.value?.column_x_name_override ?? props.chart.x_axis?.column_x)
const yKey = computed(() => definition.value?.aggregate_y ? `${definition.value.column_y}__${definition.value.aggregate_y}` : definition.value?.column_y)
const rows = computed(() => definition.value?.resource_id ? (props.series.data[definition.value.resource_id] ?? []) : [])
const points = computed(() => rows.value
  .filter(row => row[xKey.value] !== null && row[xKey.value] !== undefined && Number.isFinite(Number(row[yKey.value])))
  .map(row => ({ category: String(row[xKey.value]), value: Number(row[yKey.value]) })))
const narrow = computed(() => width.value < 560)
const height = computed(() => narrow.value ? Math.max(280, points.value.length * 48 + 72) : 384)

function option() {
  const categories = points.value.map(point => point.category)
  const values = points.value.map(point => point.value)
  const unit = props.chart.y_axis?.unit
  const valueAxisTitle = [props.chart.y_axis?.label, unit].filter(Boolean).join(' · ')
  const categoryAxis = {
    type: 'category' as const,
    data: categories,
    name: narrow.value ? undefined : xKey.value,
    nameTextStyle: { color: '#555555', fontSize: 12 },
    axisTick: { show: false },
    axisLine: { lineStyle: { color: '#aaaaaa' } },
    axisLabel: {
      color: '#555555',
      fontSize: 12,
      interval: 0,
      rotate: !narrow.value && categories.length > 5 ? 24 : 0,
      width: narrow.value ? 116 : 100,
      overflow: 'truncate' as const,
    },
  }
  const valueAxis = {
    type: 'value' as const,
    name: valueAxisTitle || undefined,
    nameLocation: narrow.value ? 'middle' as const : 'end' as const,
    nameGap: narrow.value ? 30 : 14,
    min: props.chart.y_axis?.min ?? 0,
    max: props.chart.y_axis?.max ?? undefined,
    splitNumber: narrow.value ? 3 : 5,
    nameTextStyle: { color: '#555555', fontSize: 12 },
    axisLabel: {
      color: '#555555',
      fontSize: 12,
      hideOverlap: true,
      formatter: (value:number) => new Intl.NumberFormat('fr-FR', { notation: 'compact', maximumFractionDigits: 1 }).format(value),
    },
    splitLine: { lineStyle: { color: '#e5e5e5' } },
  }
  return {
    animationDuration: 260,
    animationEasing: 'cubicOut',
    textStyle: { fontFamily: 'Marianne, Arial, sans-serif' },
    grid: narrow.value
      ? { top: 20, right: 20, bottom: 44, left: 16, containLabel: true }
      : { top: 48, right: 20, bottom: categories.length > 5 ? 72 : 48, left: 20, containLabel: true },
    tooltip: {
      trigger: 'axis',
      confine: true,
      backgroundColor: '#161616',
      borderWidth: 0,
      padding: [6, 8],
      textStyle: { color: '#ffffff', fontSize: 12 },
      axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(0,0,145,.06)' } },
      formatter: (params: Array<{ dataIndex: number }>) => {
        const point = points.value[params[0]?.dataIndex]
        return point ? `${format.encodeHTML(point.category)}<br><strong>${new Intl.NumberFormat('fr-FR').format(point.value)}</strong>` : ''
      },
    },
    xAxis: narrow.value ? valueAxis : categoryAxis,
    yAxis: narrow.value ? { ...categoryAxis, inverse: true } : valueAxis,
    series: [{
      type: 'bar',
      data: values,
      barMaxWidth: narrow.value ? 20 : 48,
      itemStyle: { color: '#000091', borderRadius: narrow.value ? [0, 2, 2, 0] : [2, 2, 0, 0] },
      emphasis: { itemStyle: { color: '#1212ff' } },
    }],
  }
}

function render() {
  if (!root.value) return
  if (!instance) instance = init(root.value, undefined, { renderer: 'svg' })
  instance.setOption(option(), true)
  instance.resize({ height: height.value })
}

function capture() { return instance?.getDataURL() ?? null }
defineExpose({ capture })

onMounted(async () => {
  await nextTick()
  if (!root.value) return
  width.value = root.value.clientWidth
  render()
  observer = new ResizeObserver(entries => {
    width.value = entries[0]?.contentRect.width ?? width.value
    render()
  })
  observer.observe(root.value)
})
watch(() => [props.chart, props.series], render, { deep: true })
onBeforeUnmount(() => { observer?.disconnect(); instance?.dispose() })
</script>

<template>
  <div ref="root" class="lab-responsive-histogram" :style="{ height: `${height}px` }" role="img" :aria-label="chart.title || 'Histogramme'" />
</template>

<style scoped>
.lab-responsive-histogram{width:100%;min-width:0;transition:height 180ms ease-out}
@media(prefers-reduced-motion:reduce){.lab-responsive-histogram{transition:none}}
</style>
