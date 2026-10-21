<template>
  <div class="design-lab-badge lab-owner-type" :class="colorClass" :data-size="size">
    <OwnerTypeIcon
      :type="type"
      class="lab-owner-type-icon"
    />
    <div class="design-lab-badge__text">
      {{ name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import '../shared/badge.css'
import '../shared/quality.css'
import { computed } from 'vue'
import { findOrganizationType, type OrganizationTypes, type UserType } from '../../vendor/datagouv-components/src/functions/organizations'
import OwnerTypeIcon from './OwnerTypeIcon.vue'

const props = withDefaults(defineProps<{
  type: OrganizationTypes | UserType
  size?: 'base' | 'sm' | 'xs'
  color?: 'black' | 'gray'
}>(), {
  size: 'sm',
  color: 'gray',
})

const colorClass = computed(() => {
  return {
    black: 'lab-owner-type-black',
    gray: 'lab-owner-type-gray',
  }[props.color]
})

const name = computed(() => findOrganizationType(props.type).label)
</script>
