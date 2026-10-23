<script setup lang="ts">
import '../../shared/foundations.css'
import '../../shared/application-cards.css'
import {RiExternalLinkLine} from '@remixicon/vue'
import CdataLink from '/proposals/components/AppLink.vue'
defineProps<{to:string;external?:boolean}>()
</script>
<template><CdataLink :to="to" appearance="control" :external-icon="false" :external="external" :target="external?'_blank':undefined" :rel="external?'noopener noreferrer':undefined" class="lab-link-card"><slot /><RiExternalLinkLine v-if="external" class="lab-ds-icon" data-icon-size="compact" aria-hidden="true" focusable="false" /><span v-if="external" class="sr-only"> (nouvel onglet)</span></CdataLink></template>
