<template>
  <DataserviceCard
    :dataservice
    :show-description
    :style
    :dataservice-url="dataservice.self_web_url"
    :organization-url="dataservice.organization?.page"
  />
</template>

<script setup lang="ts">
import DataserviceCard from '../../../DataserviceCard.vue'
import type { Dataservice } from '@datagouv/components-next'
import type { StyleValue } from 'vue'

withDefaults(defineProps<{
  dataservice: Dataservice
  style?: StyleValue
  showDescription?: boolean
}>(), {
  showDescription: true,
})
</script>
