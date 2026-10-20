<script setup lang="ts">
import UnicodeLoader from '../shared/UnicodeLoader.vue'
</script>
<template><span class="proposed-inline-loader" role="status" aria-label="Chargement en cours"><UnicodeLoader /></span></template>
<style scoped>
.proposed-inline-loader { display:inline-flex; align-items:center; justify-content:center; width:16px; height:16px; font-size:16px; vertical-align:middle; color:inherit; }
</style>
