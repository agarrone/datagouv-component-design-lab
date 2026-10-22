<script setup lang="ts">
import '../../shared/foundations.css'
import NativeSelect from '../../../vendor/datagouv-components/src/components/Form/SchemaSelect.vue'
defineOptions({inheritAttrs:false})
</script>
<template><NativeSelect v-bind="$attrs" /></template>
