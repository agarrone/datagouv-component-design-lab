<template>
 <li v-if="!qualityItem" class="lab-quality-warning">
  <p class="lab-status-line" data-status="warning"><RiAlertLine data-icon-align="start" data-icon-size="base" focusable="false" class="lab-ds-icon" aria-hidden="true" /><span>{{ message }}</span></p>
 </li>
</template>
<script setup lang="ts">
import '../shared/foundations.css'
import {RiAlertLine} from '@remixicon/vue'
import '../shared/quality.css'
import '../shared/status.css'
defineProps<{qualityItem?:boolean,message:string}>()
</script>
