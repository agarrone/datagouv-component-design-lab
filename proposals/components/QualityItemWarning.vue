<template>
 <li v-if="!qualityItem" class="lab-quality-warning">
  <p><RiAlertLine class="lab-quality-item-icon" aria-hidden="true" /><span>{{ message }}</span></p>
 </li>
</template>
<script setup lang="ts">
import {RiAlertLine} from '@remixicon/vue'
import '../shared/quality.css'
defineProps<{qualityItem?:boolean,message:string}>()
</script>
