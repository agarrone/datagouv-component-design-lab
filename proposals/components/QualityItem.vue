<template>
 <li class="lab-quality-item">
  <p class="lab-status-line" :data-status="passed ? 'success' : 'warning'">
   <component data-icon-align="start" data-icon-size="base" focusable="false" :is="passed ? RiCheckLine : RiAlertLine" class="lab-ds-icon" aria-hidden="true" />
   <span>{{ passed ? messagePassed : messageFailed }}</span>
  </p>
 </li>
</template>
<script setup lang="ts">
import '../shared/foundations.css'
import {RiCheckLine,RiAlertLine} from '@remixicon/vue'
import '../shared/quality.css'
import '../shared/status.css'
defineProps<{passed?:boolean|null,messagePassed:string,messageFailed:string}>()
</script>
