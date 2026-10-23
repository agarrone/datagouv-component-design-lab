<script setup lang="ts">
import '../../shared/foundations.css'
import '../../shared/small-components.css'
import Native from '../../../vendor/datagouv-components/src/components/TabularExplorer/TabularMobileFilters.vue'
defineOptions({inheritAttrs:false})
</script>
<template>
 <Native v-bind="$attrs" class="lab-small-filter">
  <template v-for="(_,name) in $slots" #[name]="scope"><slot :name="name" v-bind="scope || {}" /></template>
 </Native>
</template>
