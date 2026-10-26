<script setup lang="ts">
import '../shared/foundations.css'
withDefaults(defineProps<{color?:'white'|'alt-grey'}>(),{color:'white'})
</script>
<template><div class="lab-padded-container" :data-color="color"><slot /></div></template>
<style scoped>
.lab-padded-container { min-width:0; padding:var(--lab-ds-space-24); background:var(--lab-ds-surface); color:var(--lab-ds-text); font:var(--lab-ds-weight-regular) var(--lab-ds-text-body)/var(--lab-ds-leading-body) var(--lab-ds-font-sans); }
.lab-padded-container[data-color=alt-grey] { background:var(--lab-ds-surface-subtle); }
</style>
