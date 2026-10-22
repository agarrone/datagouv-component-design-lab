<script setup lang="ts">
import '../../shared/foundations.css'
import '../../shared/tables.css'
import NativeTable from '../../../vendor/datagouv-components/src/components/TabularExplorer/TabularTable.vue'
defineOptions({inheritAttrs:false})
</script>
<template><NativeTable v-bind="$attrs" class="lab-explore-table" /></template>
