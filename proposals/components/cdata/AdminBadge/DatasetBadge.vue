<script setup lang="ts">
import '../../../shared/foundations.css'
import {computed} from 'vue'
import {useTranslation} from '../../../../vendor/datagouv-components/src/composables/useTranslation'
import AdminBadge from './AdminBadge.vue'
import type { Dataset, DatasetV2, DatasetV2WithFullObject } from '@datagouv/components-next'
type AdminBadgeType = 'primary'|'secondary'|'success'|'warning'|'danger'|'default'|'pink'|'teal'

const props = defineProps<{
  dataset: Dataset | DatasetV2 | DatasetV2WithFullObject
}>()

const { t } = useTranslation()

const status = computed<{ label: string, type: AdminBadgeType }>(() => {
  if (props.dataset.deleted) {
    return {
      label: t('Supprimé'),
      type: 'danger',
    }
  }
  else if (props.dataset.archived) {
    return {
      label: t('Archivé'),
      type: 'secondary',
    }
  }
  else if (props.dataset.private) {
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
