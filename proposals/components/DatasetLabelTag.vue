<template>
  <component
    :is="url ? AppLink : 'span'"
    :to="url"
    class="design-lab-badge proposed-dataset-label"
    :class="{
      'proposed-dataset-label--link': url,
      'proposed-dataset-label--static': !url,
    }"
  >
    <img
      v-if="img"
      :src="img"
      alt=""
      :class="{ 'bg-white rounded-full': url }"
    >
    {{ badge.label }}
  </component>
</template>

<script setup lang="ts">
import '../shared/badge.css'
import { computedAsync } from '@vueuse/core'
import type { RouteLocationRaw } from 'vue-router'
import AppLink from '../../vendor/datagouv-components/src/components/AppLink.vue'
import type { TranslatedBadge } from '../../vendor/datagouv-components/src/types/badges'

const props = defineProps<{
  badge: TranslatedBadge
  url?: string | RouteLocationRaw
}>()

const img = computedAsync(async () => {
  const labelImages = import.meta.glob('../../vendor/datagouv-components/assets/labels/*.svg', {
    query: '?url',
    import: 'default',
  })
  const src = Object.keys(labelImages).find(path => path.includes(props.badge.kind))
  return src && labelImages[src] ? await labelImages[src]() as string : undefined
})
</script>

<style scoped>
.proposed-dataset-label { border-radius:999px; gap:6px; }
.proposed-dataset-label img { width:16px; height:16px; object-fit:contain; flex-shrink:0; }
.proposed-dataset-label--link { color:#000091; border-color:#b8c7ff; background:#e8edff; text-decoration:underline; text-underline-offset:2px; }
.proposed-dataset-label--link:hover { background:#c2d1ff; }
.proposed-dataset-label--link:focus-visible { outline:2px solid #0a76f6; outline-offset:2px; }
</style>
