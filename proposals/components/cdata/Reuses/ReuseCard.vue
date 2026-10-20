<template>
  <ReuseCard
    :reuse
    :reuse-url="reuse.page"
    :organization-url="reuse.organization?.page"
  />
</template>

<script setup lang="ts">
import ReuseCard from '../../ReuseCard.vue'
import type { Reuse, ReuseV2 } from '@datagouv/components-next'

defineProps<{
  reuse: Reuse | ReuseV2
}>()
</script>
