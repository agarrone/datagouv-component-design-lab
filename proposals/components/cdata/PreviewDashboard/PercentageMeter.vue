<script setup lang="ts">
import '../../../shared/foundations.css'
import {computed} from 'vue'
import ProgressBar from '../../ProgressBar.vue'
const props=withDefaults(defineProps<{value?:number|null}>(),{value:0})
const safeValue=computed(()=>Number.isFinite(Number(props.value))?Math.min(100,Math.max(0,Number(props.value))):0)
</script>
<template><ProgressBar :value="safeValue" :max="100" aria-label="Répartition"/></template>
