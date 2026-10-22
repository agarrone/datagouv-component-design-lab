<script setup lang="ts">
import '../../shared/foundations.css'
import '../../shared/selection.css'
import NativeControl from '../../../vendor/cdata-components/TagsSelect.vue'
defineOptions({inheritAttrs:false})
</script>
<template><div class="lab-selection-app"><NativeControl v-bind="$attrs"><template v-for="(_,name) in $slots" #[name]="scope"><slot :name="name" v-bind="scope || {}" /></template></NativeControl></div></template>
