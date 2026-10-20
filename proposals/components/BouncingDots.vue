<script setup lang="ts">
import UnicodeLoader from '../shared/UnicodeLoader.vue'
</script>
<template><span class="proposed-inline-loader" role="status" aria-label="Chargement en cours"><UnicodeLoader /></span></template>
<style scoped>
.proposed-inline-loader { display:inline-flex; align-items:center; justify-content:center; min-width:40px; height:24px; font-size:12px; vertical-align:middle; color:#777; }
</style>
