<script setup lang="ts">
import '../shared/foundations.css'
import {RiInformationLine} from '@remixicon/vue'
import DetailsPopover from '../shared/QualityDetailsPopover.vue'
withDefaults(defineProps<{buttonProps?:object;buttonClass?:string;noMargin?:boolean;styledButton?:boolean}>(),{styledButton:true})
</script>
<template>
 <DetailsPopover :button-props="buttonProps" :button-class="buttonClass || (styledButton?'lab-icon-details-trigger':'lab-details-trigger')">
  <slot><RiInformationLine class="lab-ds-icon" data-icon-size="base" aria-hidden="true" focusable="false" /><span class="sr-only">Afficher les informations</span></slot>
  <template #toggletip="scope"><slot name="toggletip" v-bind="scope" /></template>
 </DetailsPopover>
</template>
