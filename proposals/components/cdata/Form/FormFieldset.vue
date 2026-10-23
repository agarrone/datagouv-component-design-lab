<script setup lang="ts">
import '../../../shared/foundations.css'
import {useId} from 'vue'
const legendId=useId()
defineProps<{legend:string;noMarginsAndPadding?:boolean}>()
</script>
<template><fieldset class="lab-form-fieldset" :aria-labelledby="legendId"><legend :id="legendId">{{legend}}</legend><div v-if="$slots.legendAside" class="lab-legend-aside"><slot name="legendAside"/></div><slot/></fieldset></template>
<style scoped>.lab-form-fieldset{min-width:0;margin:0;padding:0;border:0;display:flex;flex-direction:column;gap:var(--lab-ds-space-16);font:var(--lab-ds-weight-regular) var(--lab-ds-text-body)/var(--lab-ds-leading-body) var(--lab-ds-font-sans)}legend{padding:0;margin-bottom:var(--lab-ds-space-12);font-weight:var(--lab-ds-weight-medium);color:var(--lab-ds-text)}.lab-legend-aside{color:var(--lab-ds-text-secondary)}</style>
