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
      <component data-icon-align="start" data-icon-size="base" focusable="false"
        :is="icon"
        aria-hidden="true"
        class="lab-card-title-icon lab-ds-icon"
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
import '../shared/foundations.css'
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
.lab-card-title { margin:0; font:var(--lab-ds-weight-semibold) var(--lab-ds-text-title)/var(--lab-ds-leading-title) var(--lab-ds-font-sans); min-width:0; }
.lab-card-title-link { display:flex; align-items:flex-start; gap:var(--lab-ds-space-4); width:100%; color:var(--lab-ds-text); background-image:none; font:inherit; text-decoration:none; }
.lab-card-title-text { display:block; min-width:0; overflow-wrap:anywhere; }
.lab-card-title-icon { width:var(--lab-ds-icon); height:var(--lab-ds-icon); flex-shrink:0; margin-top:var(--lab-ds-space-4); }
.lab-card-title-link:focus-visible { outline:var(--lab-ds-focus-width) solid var(--lab-ds-focus); outline-offset:var(--lab-ds-focus-offset); border-radius:var(--lab-ds-radius-technical); }
.lab-card-title-link::after { display:none; }
</style>
