<script setup lang="ts">
import '../shared/foundations.css'
import UnicodeLoader from '../shared/UnicodeLoader.vue'
withDefaults(defineProps<{color?: 'primary' | 'white'}>(), {color:'primary'})
</script>
<template><span class="proposed-loader" :class="{'proposed-loader--white':color==='white'}" role="status" aria-label="Chargement en cours"><UnicodeLoader /></span></template>
<style scoped>
.proposed-loader { display:inline-flex; align-items:center; justify-content:center; min-width:var(--lab-ds-control); height:var(--lab-ds-space-24); font-size:var(--lab-ds-text-caption); color:var(--lab-ds-text-muted); vertical-align:middle; }
.proposed-loader--white { color:var(--lab-ds-on-accent); }
</style>
