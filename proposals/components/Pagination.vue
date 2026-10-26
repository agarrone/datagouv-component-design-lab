<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/remaining-navigation.css'
import Native from '/vendor/datagouv-components/src/components/Pagination.vue'
import { ref } from 'vue'
import { forwardProposalRef } from '../shared/forwardProposalRef'
defineOptions({ inheritAttrs: false })
const child = ref()
defineExpose(forwardProposalRef(child))
</script>

<template>
  <Native ref="child" v-bind="$attrs" class="lab-remaining-navigation">
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope || {}" />
    </template>
  </Native>
</template>
