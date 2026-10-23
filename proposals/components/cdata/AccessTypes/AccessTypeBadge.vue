<template>
  <AdminBadge
    size="sm"
    :type
    :icon="icon"
  >
    {{ label }}
  </AdminBadge>
</template>

<script setup lang="ts">
import '../../../shared/foundations.css'
import {computed} from 'vue'
import {RiLockUnlockLine,RiPassValidLine,RiLockLine} from '@remixicon/vue'
import {useTranslation} from '../../../../vendor/datagouv-components/src/composables/useTranslation'
import AdminBadge from '../AdminBadge/AdminBadge.vue'
import type { AccessType } from '@datagouv/components-next'
type AdminBadgeType = 'primary'|'secondary'|'success'|'warning'|'danger'|'default'|'pink'|'teal'|'yellow'

const props = defineProps<{ accessType: AccessType }>()

const { t } = useTranslation()

const label = computed(() => {
  return {
    open: t('Ouvert'),
    open_with_account: t('Ouvert avec compte'),
    restricted: t('Restreint'),
  }[props.accessType]
})

const icon = computed(()=>({open:RiLockUnlockLine,open_with_account:RiPassValidLine,restricted:RiLockLine}[props.accessType]))

const type = computed(() => {
  return {
    open: 'success' as AdminBadgeType,
    open_with_account: 'yellow' as AdminBadgeType,
    restricted: 'warning' as AdminBadgeType,
  }[props.accessType]
})
</script>
