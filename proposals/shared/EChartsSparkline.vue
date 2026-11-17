<script setup lang="ts">
import './foundations.css'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { init, use, type EChartsType } from 'echarts/core'
import { BarChart, LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { SVGRenderer } from 'echarts/renderers'

use([BarChart, LineChart, GridComponent, TooltipComponent, SVGRenderer])

const props = withDefaults(defineProps<{
  points: { date: string; value: number }[]
  type: 'line' | 'bar'
  height?: number
  showTooltip?: boolean
  showXAxis?: boolean
  lastWithLowEmphasis?: boolean
}>(), {
  height: 52,
  showTooltip: true,
  showXAxis: true,
  lastWithLowEmphasis: false,
})

const root = ref<HTMLElement | null>(null)
const values = computed(() => props.points.map(point => point.value))
let chart: EChartsType | null = null
let observer: ResizeObserver | null = null

const month = (date: string) => new Intl.DateTimeFormat('fr-FR', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
}).format(new Date(date))
const shortMonth = (date: string) => new Intl.DateTimeFormat('fr-FR', {
  month: '2-digit',
  year: '2-digit',
  timeZone: 'UTC',
}).format(new Date(date))

function option() {
  const brand = '#000091'
  const muted = '#b6c4e6'
  const series = props.type === 'bar'
    ? {
        type: 'bar',
        data: values.value.map((value, index) => ({
          value,
          itemStyle: {
            color: index === values.value.length - 1
              ? (props.lastWithLowEmphasis ? muted : brand)
              : muted,
            borderRadius: [2, 2, 0, 0],
          },
        })),
        barMaxWidth: 14,
        barCategoryGap: '28%',
      }
    : {
        type: 'line',
        data: values.value,
        smooth: 0.28,
        showSymbol: false,
        symbol: 'circle',
        lineStyle: { color: brand, width: 1.5 },
        itemStyle: { color: brand },
        areaStyle: { color: 'rgba(0, 0, 145, 0.07)' },
        emphasis: { scale: false },
      }

  return {
    animationDuration: 220,
    animationEasing: 'cubicOut',
    grid: { top: 4, right: 20, bottom: props.showXAxis ? 22 : 3, left: 20, containLabel: false },
    xAxis: {
      type: 'category',
      data: props.points.map(point => point.date),
      show: props.showXAxis,
      boundaryGap: props.type === 'bar',
      axisTick: { show: false },
      axisLine: { show: true, lineStyle: { color: '#e5e5e5', width: 1 } },
      axisLabel: {
        color: '#777777',
        fontSize: 12,
        margin: 6,
        interval: (index: number) => {
          const last = props.points.length - 1
          return index === 0 || index === Math.floor(last / 2) || index === last
        },
        formatter: (value: string) => shortMonth(value),
      },
    },
    yAxis: { type: 'value', show: false, scale: true },
    tooltip: props.showTooltip ? {
      trigger: 'axis',
      confine: true,
      backgroundColor: '#161616',
      borderWidth: 0,
      padding: [6, 8],
      textStyle: { color: '#fff', fontFamily: 'Marianne, Arial, sans-serif', fontSize: 12 },
      axisPointer: { type: 'line', lineStyle: { color: '#777777', width: 1 } },
      formatter: (params: Array<{ dataIndex: number; value: number }>) => {
        const point = props.points[params[0]?.dataIndex]
        return point
          ? `${month(point.date)}<br><strong>${new Intl.NumberFormat('fr-FR').format(point.value)}</strong>`
          : ''
      },
    } : { show: false },
    series: [series],
  }
}

function render() {
  if (!root.value || !props.points.length) return
  if (!chart) chart = init(root.value, undefined, { renderer: 'svg' })
  chart.setOption(option(), true)
  chart.resize()
}

onMounted(async () => {
  await nextTick()
  render()
  if (root.value) {
    observer = new ResizeObserver(() => chart?.resize())
    observer.observe(root.value)
  }
})

watch(() => [props.points, props.type, props.height, props.lastWithLowEmphasis, props.showXAxis], async () => {
  await nextTick()
  render()
}, { deep: true })

onBeforeUnmount(() => {
  observer?.disconnect()
  chart?.dispose()
})
</script>

<template>
  <div ref="root" class="lab-echarts-sparkline" :style="{ height: `${height}px` }" aria-hidden="true" />
</template>

<style scoped>
.lab-echarts-sparkline{width:100%;min-width:0}
</style>
