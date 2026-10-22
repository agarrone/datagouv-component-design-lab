<script setup lang="ts">
import '../shared/foundations.css'
import type {Component} from 'vue'
import '../shared/badge.css'
defineProps<{icon:Component}>()
</script>
<template><div class="proposed-object-card-badge"><span class="design-lab-badge" data-tone="secondary"><component data-icon-size="compact" :is="icon" class="design-lab-badge__icon lab-ds-icon" aria-hidden="true" focusable="false" /><span class="design-lab-badge__text"><slot /></span></span></div></template>
<style scoped>.proposed-object-card-badge { display:inline-flex; max-width:100%; position:static; transform:none; }</style>
