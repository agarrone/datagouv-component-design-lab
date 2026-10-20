<template>
  <p
    v-if="shortDescription"
    class="lab-card-description"
  >
    {{ shortDescription }}
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { removeMarkdownSync } from '../../vendor/datagouv-components/src/functions/markdown'

const props = withDefaults(defineProps<{
  text?: string | null
  maxLength?: number
}>(), {
  maxLength: 300,
})

// Truncate in JS to avoid sending very long markdown-cleaned text to the DOM.
// The visual clamp is handled by CSS line-clamp-2.
const shortDescription = computed(() => {
  if (!props.text) return ''
  const cleaned = removeMarkdownSync(props.text)
  return cleaned.length > props.maxLength ? cleaned.substring(0, props.maxLength) + '…' : cleaned
})
</script>

<style scoped>
.lab-card-description { display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:2; overflow:hidden; overflow-wrap:anywhere; margin:0; color:#555; font:400 14px/22px Marianne,Arial,sans-serif; }
</style>
