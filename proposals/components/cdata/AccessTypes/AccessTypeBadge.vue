<template>
  <AdminBadge
    size="sm"
    :type
  >
    {{ label }}
  </AdminBadge>
</template>

<script setup lang="ts">
import '../../../shared/foundations.css'
import {computed} from 'vue'
import {useTranslation} from '../../../../vendor/datagouv-components/src/composables/useTranslation'
import AdminBadge from '../AdminBadge/AdminBadge.vue'
import type { AccessType } from '@datagouv/components-next'
type AdminBadgeType = 'primary'|'secondary'|'success'|'warning'|'danger'|'default'|'pink'|'teal'

const props = defineProps<{ accessType: AccessType }>()

const { t } = useTranslation()

const label = computed(() => {
  return {
    open: t('Ouvert'),
    open_with_account: t('Ouvert avec compte'),
    restricted: t('Restreint'),
  }[props.accessType]
})

const type = computed(() => {
  return {
    open: 'success' as AdminBadgeType,
    open_with_account: 'warning' as AdminBadgeType,
    restricted: 'warning' as AdminBadgeType,
  }[props.accessType]
})
</script>
