<template>
  <AppLink
    v-if="license && license.url"
    :to="license.url"
    class="design-lab-tag lab-license-badge"
  >
    {{ license.title }}
  </AppLink>
  <span
    v-else-if="license"
    class="design-lab-tag lab-license-badge"
  >
    {{ license.title }}
  </span>
</template>

<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/badge.css'
import '../shared/quality.css'
import type { License } from '../../vendor/datagouv-components/src/types/licenses'
import AppLink from '../../vendor/datagouv-components/src/components/AppLink.vue'

defineProps<{
  license: License
}>()
</script>
