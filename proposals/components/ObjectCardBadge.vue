<script setup lang="ts">
import '../shared/foundations.css'
import type {Component} from 'vue'
import '../shared/badge.css'
withDefaults(defineProps<{icon:Component; tone?:'secondary'|'primary'|'warning'}>(),{tone:'secondary'})
</script>
<template><div class="proposed-object-card-badge"><span class="design-lab-badge" :data-tone="tone"><component data-icon-size="compact" :is="icon" class="design-lab-badge__icon lab-ds-icon" aria-hidden="true" focusable="false" /><span class="design-lab-badge__text"><slot /></span></span></div></template>
<style scoped>.proposed-object-card-badge { display:inline-flex; max-width:100%; position:static; transform:none; }</style>
