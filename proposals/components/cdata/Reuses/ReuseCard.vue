<template>
  <ReuseCard
    :reuse
    :reuse-url="reuse.page"
    :organization-url="reuse.organization?.page"
  />
</template>

<script setup lang="ts">
import '../../../shared/foundations.css'
import ReuseCard from '../../ReuseCard.vue'
import type { Reuse, ReuseV2 } from '@datagouv/components-next'

defineProps<{
  reuse: Reuse | ReuseV2
}>()
</script>
