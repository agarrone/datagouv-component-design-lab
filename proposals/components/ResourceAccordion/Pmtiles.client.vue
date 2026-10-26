<script setup lang="ts">
import '../../shared/foundations.css'
import '../../shared/remaining-resource.css'
import Native from '/vendor/datagouv-components/src/components/ResourceAccordion/Pmtiles.client.vue'
import { ref } from 'vue'
import { forwardProposalRef } from '../../shared/forwardProposalRef'
defineOptions({ inheritAttrs: false })
const child = ref()
defineExpose(forwardProposalRef(child))
</script>

<template>
  <Native ref="child" v-bind="$attrs" class="lab-remaining-resource">
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope || {}" />
    </template>
  </Native>
</template>
