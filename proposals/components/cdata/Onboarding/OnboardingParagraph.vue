<script setup lang="ts">
import '../../../shared/foundations.css'
import '../../../shared/small-components.css'
import Native from '../../../../vendor/cdata-components/Onboarding/OnboardingParagraph.vue'
defineOptions({inheritAttrs:false})
</script>
<template>
 <Native v-bind="$attrs" class="lab-small-paragraph">
  <template v-for="(_,name) in $slots" #[name]="scope"><slot :name="name" v-bind="scope || {}" /></template>
 </Native>
</template>
