<script setup lang="ts">
import '../shared/foundations.css'
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  text: string
  headRatio?: number
  minCharsBeforeTruncate?: number
}>(), {
  headRatio: 0.6,
  minCharsBeforeTruncate: 24,
})

const root = ref<HTMLElement>()
const visibleText = ref(props.text)
const truncated = ref(false)
let observer: ResizeObserver | undefined

function measuredWidth(text: string, style: CSSStyleDeclaration) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (!context) return text.length * Number.parseFloat(style.fontSize)
  context.font = style.font || `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
  return context.measureText(text).width
}

function candidate(length: number) {
  const head = Math.max(1, Math.ceil(length * props.headRatio))
  const tail = Math.max(1, length - head)
  return `${props.text.slice(0, head)}…${props.text.slice(-tail)}`
}

function update() {
  const element = root.value
  if (!element || !props.text || props.text.length <= props.minCharsBeforeTruncate) {
    visibleText.value = props.text
    truncated.value = false
    return
  }

  const available = element.clientWidth
  const style = getComputedStyle(element)
  if (!available || measuredWidth(props.text, style) <= available) {
    visibleText.value = props.text
    truncated.value = false
    return
  }

  let low = 2
  let high = Math.max(2, props.text.length - 1)
  let best = candidate(2)
  while (low <= high) {
    const middle = Math.floor((low + high) / 2)
    const value = candidate(middle)
    if (measuredWidth(value, style) <= available) {
      best = value
      low = middle + 1
    } else {
      high = middle - 1
    }
  }
  visibleText.value = best
  truncated.value = true
}

watch(() => [props.text, props.headRatio, props.minCharsBeforeTruncate], () => nextTick(update))
onMounted(() => {
  observer = new ResizeObserver(update)
  if (root.value) observer.observe(root.value)
  update()
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <span
    ref="root"
    class="proposal-middle-truncate"
    :data-truncated="truncated"
    :aria-label="text"
    :data-full-text="text"
  ><span aria-hidden="true">{{ visibleText }}</span></span>
</template>

<style scoped>
.proposal-middle-truncate {
  display: inline-block;
  width: max-content;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
}
</style>
