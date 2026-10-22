<script setup lang="ts">
import '../../shared/foundations.css'
import '../../shared/tables.css'
import NativeSearch from '../../../vendor/datagouv-components/src/components/TabularExplorer/TabularSearchInput.vue'
defineOptions({inheritAttrs:false})
</script>
<template><NativeSearch v-bind="$attrs" class="lab-explore-search" /></template>
