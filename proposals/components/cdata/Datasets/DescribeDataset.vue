<script setup lang="ts">
import '../../../shared/foundations.css'
import '../../../shared/badge.css'
import NativeConsumer from '../../../../vendor/cdata-components/Datasets/DescribeDataset.vue'
defineOptions({inheritAttrs:false})
</script>
<template><div class="lab-badge-consumer"><NativeConsumer v-bind="$attrs"><template v-for="(_,name) in $slots" #[name]="scope"><slot :name="name" v-bind="scope || {}" /></template></NativeConsumer></div></template>
