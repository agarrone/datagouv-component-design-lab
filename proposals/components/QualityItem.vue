<template>
 <li class="lab-quality-item">
  <p>
   <component data-icon-align="start" data-icon-size="base" focusable="false" :is="passed ? RiCheckLine : RiAlertLine" class="lab-quality-item-icon lab-ds-icon" :class="passed ? 'lab-quality-pass' : 'lab-quality-missing'" aria-hidden="true" />
   <span>{{ passed ? messagePassed : messageFailed }}</span>
  </p>
 </li>
</template>
<script setup lang="ts">
import '../shared/foundations.css'
import {RiCheckLine,RiAlertLine} from '@remixicon/vue'
import '../shared/quality.css'
defineProps<{passed?:boolean|null,messagePassed:string,messageFailed:string}>()
</script>
