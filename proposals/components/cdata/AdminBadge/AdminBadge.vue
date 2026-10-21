<script setup lang="ts">
import '../../../shared/foundations.css'
import type {Component} from 'vue'
import '../../../shared/badge.css'
withDefaults(defineProps<{
  type:'primary'|'secondary'|'success'|'warning'|'danger'|'default'|'pink'|'teal'
  size:'xs'|'sm'
  icon?:Component
  iconRight?:Component
  noWrap?:boolean
  iconSize?:string
}>(),{noWrap:true})
</script>
<template>
  <span class="design-lab-badge" :data-tone="type" :data-size="size" :class="{'proposed-badge--nowrap':noWrap}">
    <component :is="icon" v-if="icon" class="proposed-badge-icon" :class="iconSize || 'design-lab-badge__icon'" aria-hidden="true" focusable="false" />
    <span class="design-lab-badge__text"><slot /></span>
    <component :is="iconRight" v-if="iconRight" class="proposed-badge-icon" :class="iconSize || 'design-lab-badge__icon'" aria-hidden="true" focusable="false" />
  </span>
</template>
<style scoped>
.proposed-badge-icon { flex-shrink:0; }
.design-lab-badge[data-size=xs] { min-height:var(--lab-ds-icon-major); padding:0 var(--lab-ds-space-6); }
.proposed-badge--nowrap { white-space:nowrap; }
</style>
