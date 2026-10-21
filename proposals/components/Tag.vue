<script setup lang="ts">
import '../shared/foundations.css'
import type {Component} from 'vue'
import '../shared/badge.css'
defineProps<{icon?:Component;type:'secondary'}>()
</script>
<template><span class="design-lab-badge proposed-tag" data-tone="secondary"><component data-icon-size="compact" :is="icon" v-if="icon" class="design-lab-badge__icon lab-ds-icon" aria-hidden="true" focusable="false" /><span class="design-lab-badge__text"><slot /></span></span></template>
<style scoped>.proposed-tag { border-radius:var(--lab-ds-radius-pill); font-weight:var(--lab-ds-weight-regular); }</style>
