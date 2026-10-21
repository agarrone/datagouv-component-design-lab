<script setup lang="ts">
import '../shared/foundations.css'
import UnicodeLoader from '../shared/UnicodeLoader.vue'
</script>
<template><span class="proposed-inline-loader" role="status" aria-label="Chargement en cours"><UnicodeLoader /></span></template>
<style scoped>
.proposed-inline-loader { display:inline-flex; align-items:center; justify-content:center; min-width:var(--lab-ds-control); height:var(--lab-ds-space-24); font-size:var(--lab-ds-text-caption); vertical-align:middle; color:var(--lab-ds-text-muted); }
</style>
