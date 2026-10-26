<script setup lang="ts">
import './foundations.css'
import {RiInformationLine} from '@remixicon/vue'
import DetailsPopover from './QualityDetailsPopover.vue'
defineProps<{label:string;text:string}>()
</script>
<template>
 <DetailsPopover button-class="lab-field-help" :button-props="{'aria-label': `Aide : ${label}`}">
  <RiInformationLine class="lab-ds-icon" data-icon-size="base" aria-hidden="true" focusable="false" />
  <template #toggletip><p class="lab-field-help-copy">{{ text }}</p></template>
 </DetailsPopover>
</template>
<style scoped>
.lab-field-help-copy { margin:0; color:var(--lab-ds-text); font:var(--lab-ds-weight-regular) var(--lab-ds-text-body)/var(--lab-ds-leading-body) var(--lab-ds-font-sans); }
</style>
