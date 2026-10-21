<script setup lang="ts">
import '../shared/foundations.css'
import type {Component} from 'vue'
import '../shared/badge.css'
defineProps<{icon:Component}>()
</script>
<template><div class="proposed-object-card-badge"><span class="design-lab-badge" data-tone="secondary"><component :is="icon" class="design-lab-badge__icon" aria-hidden="true" focusable="false" /><span class="design-lab-badge__text"><slot /></span></span></div></template>
<style scoped>.proposed-object-card-badge { position:absolute; top:0; left:16px; transform:translateY(-50%); max-width:calc(100% - 32px); }</style>
