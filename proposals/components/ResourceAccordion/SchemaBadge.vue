<script setup lang="ts">
import '../../shared/foundations.css'
import '../../shared/badge.css'
import NativeConsumer from '../../../vendor/datagouv-components/src/components/ResourceAccordion/SchemaBadge.vue'
defineOptions({inheritAttrs:false})
</script>
<template><span class="lab-badge-consumer"><NativeConsumer v-bind="$attrs"><template v-for="(_,name) in $slots" #[name]="scope"><slot :name="name" v-bind="scope || {}" /></template></NativeConsumer></span></template>
