<script setup lang="ts">
import '../../../shared/foundations.css'
import '../../../shared/application-cards.css'
import NativeCard from '../../../../vendor/cdata-components/FileCard/FileCard.vue'
defineOptions({inheritAttrs:false})
</script>
<template><div class="lab-card-adapter lab-file-card"><NativeCard v-bind="$attrs"><template v-for="(_,name) in $slots" #[name]="scope"><slot :name="name" v-bind="scope || {}" /></template></NativeCard></div></template>
