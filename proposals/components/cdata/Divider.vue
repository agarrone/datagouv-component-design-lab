<script setup lang="ts">
import '../../shared/foundations.css'
defineProps<{color?:string}>()
</script>
<template><div class="lab-divider" :role="$slots.default ? undefined : 'separator'"><span class="lab-divider-line" :class="color" aria-hidden="true"/><span v-if="$slots.default" class="lab-divider-label"><slot/></span><span class="lab-divider-line" :class="color" aria-hidden="true"/></div></template>
<style scoped>.lab-divider{display:flex;align-items:center;gap:var(--lab-ds-space-12);width:100%}.lab-divider-line{height:1px;flex:1;background:var(--lab-ds-border)}.lab-divider-label{color:var(--lab-ds-text-secondary);font:var(--lab-ds-weight-regular) var(--lab-ds-text-caption)/var(--lab-ds-leading-caption) var(--lab-ds-font-sans)}</style>
