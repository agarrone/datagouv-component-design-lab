<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue'
const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
const frame = ref(0)
let media: MediaQueryList | undefined
let timer: ReturnType<typeof setInterval> | undefined
function sync() {
  clearInterval(timer)
  frame.value = 0
  if (!media?.matches) timer = setInterval(() => { frame.value = (frame.value + 1) % frames.length }, 80)
}
onMounted(() => {
  media = matchMedia('(prefers-reduced-motion: reduce)')
  media.addEventListener('change', sync)
  sync()
})
onUnmounted(() => { clearInterval(timer); media?.removeEventListener('change', sync) })
</script>
<template><span class="unicode-loader" aria-hidden="true">{{frames[frame]}}</span></template>
<style scoped>
.unicode-loader { display:inline-flex; align-items:center; justify-content:center; width:1em; height:1em; flex-shrink:0; font-family:monospace; font-size:inherit; line-height:1; }
</style>
