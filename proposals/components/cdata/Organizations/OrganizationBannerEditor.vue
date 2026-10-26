<script setup lang="ts">
import '../../../shared/foundations.css'
import '../../../shared/remaining-page.css'
import Native from '/vendor/cdata-components/Organizations/OrganizationBannerEditor.vue'
import { ref } from 'vue'
import { forwardProposalRef } from '../../../shared/forwardProposalRef'
defineOptions({ inheritAttrs: false })
const child = ref()
defineExpose(forwardProposalRef(child))
</script>

<template>
  <Native ref="child" v-bind="$attrs" class="lab-remaining-page">
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope || {}" />
    </template>
  </Native>
</template>
