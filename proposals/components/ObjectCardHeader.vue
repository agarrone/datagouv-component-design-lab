<template>
  <component
    :is="titleTag"
    class="lab-card-title"
  >
    <AppLink
      :to="url"
      class="lab-card-title-link"
      :target="target"
    >
      <component
        :is="icon"
        aria-hidden="true"
        class="lab-card-title-icon"
      />
      <span
        class="lab-card-title-text"
        :class="$slots.extra ? 'flex-initial' : 'flex-1'"
      >
        <slot />
      </span>
      <slot name="extra" />
      <span class="absolute inset-0" />
    </AppLink>
  </component>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import type { TitleTag } from '../../vendor/datagouv-components/src/types/ui'
import AppLink from '../../vendor/datagouv-components/src/components/AppLink.vue'

withDefaults(defineProps<{
  icon: Component
  url: RouteLocationRaw
  target?: string
  titleTag?: TitleTag
}>(), {
  titleTag: 'h3',
})
</script>

<style scoped>
.lab-card-title { margin:0; font:600 16px/24px Marianne,Arial,sans-serif; min-width:0; }
.lab-card-title-link { display:flex; align-items:flex-start; gap:8px; width:100%; color:#161616; background-image:none; font:inherit; text-decoration:none; }
.lab-card-title-text { display:block; min-width:0; overflow-wrap:anywhere; }
.lab-card-title-icon { width:16px; height:16px; flex-shrink:0; margin-top:4px; }
.lab-card-title-link:focus-visible { outline:2px solid #000091; outline-offset:4px; border-radius:2px; }
.lab-card-title-link::after { display:none; }
</style>
