<script setup lang="ts">
import type {Component} from 'vue'
import '../shared/badge.css'
defineProps<{icon?:Component;type:'secondary'}>()
</script>
<template><span class="design-lab-badge proposed-tag" data-tone="secondary"><component :is="icon" v-if="icon" class="design-lab-badge__icon" aria-hidden="true" focusable="false" /><span class="design-lab-badge__text"><slot /></span></span></template>
<style scoped>.proposed-tag { border-radius:999px; font-weight:400; }</style>
