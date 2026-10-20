<script setup lang="ts">
import UnicodeLoader from '../shared/UnicodeLoader.vue'
withDefaults(defineProps<{color?: 'primary' | 'white'}>(), {color:'primary'})
</script>
<template><span class="proposed-loader" :class="{'proposed-loader--white':color==='white'}" role="status" aria-label="Chargement en cours"><UnicodeLoader /></span></template>
<style scoped>
.proposed-loader { display:inline-flex; align-items:center; justify-content:center; min-width:40px; height:24px; font-size:12px; color:#777; vertical-align:middle; }
.proposed-loader--white { color:#fff; }
</style>
