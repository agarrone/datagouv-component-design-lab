<script setup lang="ts">
import '../../shared/foundations.css'
import '../../shared/application-cards.css'
import CdataLink from '../../../vendor/cdata-components/CdataLink.vue'
defineProps<{to:string;external?:boolean}>()
</script>
<template><CdataLink :to="to" :external="external" :target="external?'_blank':undefined" :rel="external?'noopener noreferrer':undefined" class="lab-link-card"><slot /><span v-if="external" class="sr-only"> (nouvel onglet)</span></CdataLink></template>
