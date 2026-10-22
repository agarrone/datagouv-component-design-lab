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
.proposed-dataset-label { border-radius:var(--lab-ds-radius-pill); gap:var(--lab-ds-space-6); }
.proposed-dataset-label img { width:var(--lab-ds-icon); height:var(--lab-ds-icon); object-fit:contain; flex-shrink:0; }
.proposed-dataset-label--link { color:var(--lab-ds-brand); border-color:var(--lab-ds-info-border); background:var(--lab-ds-info-bg); text-decoration:underline; text-underline-offset:var(--lab-ds-space-optical); }
.proposed-dataset-label--link:hover { background:var(--lab-ds-info-hover); }
.proposed-dataset-label--link:focus-visible { outline:var(--lab-ds-focus-width) solid var(--lab-ds-focus); outline-offset:var(--lab-ds-focus-offset); }
</style>
