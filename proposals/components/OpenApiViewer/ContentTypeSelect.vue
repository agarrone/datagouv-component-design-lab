<script setup lang="ts">
import '../../shared/foundations.css'
import '../../shared/small-components.css'
import Native from '../../../vendor/datagouv-components/src/components/OpenApiViewer/ContentTypeSelect.vue'
defineOptions({inheritAttrs:false})
</script>
<template>
 <Native v-bind="$attrs" class="lab-small-schema">
  <template v-for="(_,name) in $slots" #[name]="scope"><slot :name="name" v-bind="scope || {}" /></template>
 </Native>
</template>

<style scoped>
:deep(select){min-height:var(--lab-ds-control-compact);background:var(--lab-ds-field-bg);border:0;border-bottom:2px solid var(--lab-ds-field-line);border-radius:var(--lab-ds-radius) var(--lab-ds-radius) 0 0;padding:var(--lab-ds-space-6) var(--lab-ds-space-24) var(--lab-ds-space-6) var(--lab-ds-space-8);color:var(--lab-ds-text);font:var(--lab-ds-weight-regular) var(--lab-ds-text-caption)/var(--lab-ds-leading-caption) var(--lab-ds-font-mono)}
:deep(select:focus-visible){outline:2px solid var(--lab-ds-focus);outline-offset:var(--lab-ds-focus-offset)}
</style>
