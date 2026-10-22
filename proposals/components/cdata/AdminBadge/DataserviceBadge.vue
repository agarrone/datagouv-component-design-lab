<script setup lang="ts">
import '../../../shared/foundations.css'
import {computed} from 'vue'
import {useTranslation} from '../../../../vendor/datagouv-components/src/composables/useTranslation'
import AdminBadge from './AdminBadge.vue'
import type { Dataservice } from '@datagouv/components-next'
type AdminBadgeType = 'primary'|'secondary'|'success'|'warning'|'danger'|'default'|'pink'|'teal'

const props = defineProps<{
  dataservice: Dataservice
}>()

const { t } = useTranslation()

const status = computed<{ label: string, type: AdminBadgeType }>(() => {
  if (props.dataservice.deleted_at) {
    return {
      label: t('Supprimé'),
      type: 'secondary',
    }
  }
  else if (props.dataservice.archived_at) {
    return {
      label: t('Archivé'),
      type: 'secondary',
    }
  }
  else if (props.dataservice.private) {
    return {
      label: t('Brouillon'),
      type: 'secondary',
    }
  }
  else {
    return {
      label: t('Public'),
      type: 'primary',
    }
  }
})
</script>

<template>
  <AdminBadge
    size="xs"
    :type="status.type"
  >
    {{ status.label }}
  </AdminBadge>
</template>
