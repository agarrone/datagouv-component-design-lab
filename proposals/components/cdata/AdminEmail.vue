<script setup lang="ts">
import ProposalTextLink from '/proposals/components/AppLink.vue'
import '../../shared/foundations.css'
import {RiMailLine} from '@remixicon/vue'
import type {User} from '@datagouv/components-next'
defineProps<{user:User}>()
</script>
<template>
 <span v-if="'email' in user && user.email" class="lab-admin-email">
  <RiMailLine class="lab-ds-icon" data-icon-size="compact" aria-hidden="true" focusable="false" />
  <ProposalTextLink class="lab-proposal-link" :href="`mailto:${user.email}`">{{user.email}}</ProposalTextLink>
 </span>
</template>
<style scoped>
.lab-admin-email { display:inline-flex; align-items:baseline; gap:var(--lab-ds-space-4); min-width:0; max-width:100%; color:var(--lab-ds-text-secondary); font:var(--lab-ds-weight-regular) var(--lab-ds-text-caption)/var(--lab-ds-leading-caption) var(--lab-ds-font-sans); }
.lab-admin-email .lab-ds-icon { flex:none; align-self:center; }
.lab-admin-email a { min-width:0; color:inherit; overflow-wrap:anywhere; }
</style>
