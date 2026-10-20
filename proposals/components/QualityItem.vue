<template>
 <li class="lab-quality-item">
  <p>
   <component :is="passed ? RiCheckLine : RiAlertLine" class="lab-quality-item-icon" :class="passed ? 'lab-quality-pass' : 'lab-quality-missing'" aria-hidden="true" />
   <span>{{ passed ? messagePassed : messageFailed }}</span>
  </p>
 </li>
</template>
<script setup lang="ts">
import {RiCheckLine,RiAlertLine} from '@remixicon/vue'
import '../shared/quality.css'
defineProps<{passed?:boolean|null,messagePassed:string,messageFailed:string}>()
</script>
