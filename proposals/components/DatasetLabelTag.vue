<template>
  <component
    :is="url ? AppLink : 'span'"
    :to="url"
    :class="[url ? 'design-lab-tag' : 'design-lab-badge', {'proposed-dataset-label--link':url}]"
    class="proposed-dataset-label"
  >
    <img
      v-if="img"
      :src="img"
      alt=""
      :class="{ 'lab-ds-u-bg-white lab-ds-u-rounded-full': url }"
    >
    {{ badge.label }}
  </component>
</template>

<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/badge.css'
import { computedAsync } from '@vueuse/core'
import type { RouteLocationRaw } from 'vue-router'
import AppLink from '/proposals/components/AppLink.vue'
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
.proposed-dataset-label { gap:var(--lab-ds-space-4); border-radius:var(--lab-ds-radius-pill); }
.proposed-dataset-label img { width:var(--lab-ds-icon-compact); height:var(--lab-ds-icon-compact); object-fit:contain; flex-shrink:0; }
.proposed-dataset-label--link { color:var(--lab-ds-tag-link-text); background:var(--lab-ds-tag-link-bg); text-decoration:none; text-underline-offset:var(--lab-ds-space-optical); }
.proposed-dataset-label--link:hover { background:var(--lab-ds-tag-hover-bg); }
.proposed-dataset-label--link:focus-visible { outline:var(--lab-ds-focus-width) solid var(--lab-ds-focus); outline-offset:var(--lab-ds-focus-offset); }
</style>
