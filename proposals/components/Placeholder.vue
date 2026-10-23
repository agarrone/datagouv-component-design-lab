<script setup lang="ts">
import '../shared/foundations.css'
import {computed} from 'vue'
import {RiBarChartBoxLine,RiBookShelfLine,RiBuilding2Line,RiDatabase2Line,RiLineChartLine,RiTerminalLine} from '@remixicon/vue'
const props=defineProps<{type:'Dataset'|'Dataservice'|'Reuse'|'Organization'|'Topic'|'Chart'}>()
const icon=computed(()=>({Dataset:RiDatabase2Line,Dataservice:RiTerminalLine,Reuse:RiLineChartLine,Organization:RiBuilding2Line,Topic:RiBookShelfLine,Chart:RiBarChartBoxLine}[props.type]))
</script>
<template><div class="lab-placeholder" aria-hidden="true"><component :is="icon" class="lab-ds-icon" data-icon-size="custom" aria-hidden="true" focusable="false"/></div></template>
<style scoped>.lab-placeholder{display:flex;align-items:center;justify-content:center;background:var(--lab-ds-surface-subtle);color:var(--lab-ds-text-muted)}.lab-placeholder svg{width:50%;height:50%;max-width:var(--lab-ds-space-48);max-height:var(--lab-ds-space-48)}</style>
