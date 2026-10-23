<script setup lang="ts">
import '../../../shared/foundations.css'
defineProps<{required:boolean}>()
</script>
<template><span v-if="required" class="lab-required" aria-hidden="true">*</span><span v-if="required" class="sr-only"> (obligatoire)</span></template>
<style scoped>.lab-required{color:var(--lab-ds-danger-text);font-weight:var(--lab-ds-weight-medium)}</style>
