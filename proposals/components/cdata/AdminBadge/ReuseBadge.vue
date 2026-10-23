<script setup lang="ts">
import '../../../shared/foundations.css'
import {computed} from 'vue'
import {useTranslation} from '../../../../vendor/datagouv-components/src/composables/useTranslation'
import AdminBadge from './AdminBadge.vue'
import type { Reuse, ReuseV2 } from '@datagouv/components-next'
type AdminBadgeType = 'primary'|'secondary'|'success'|'warning'|'danger'|'default'|'pink'|'teal'

const props = defineProps<{
  reuse: Reuse | ReuseV2
}>()

const { t } = useTranslation()

const status = computed<{ label: string, type: AdminBadgeType }>(() => {
  if (props.reuse.deleted) {
    return {
      label: t('Supprimé'),
      type: 'danger',
    }
  }
  else if (props.reuse.archived) {
    return {
      label: t('Archivé'),
      type: 'warning',
    }
  }
  else if (props.reuse.private) {
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
