<template>
  <AdminBadge
    size="xs"
    :type="status.type"
  >
    {{ status.label }}
  </AdminBadge>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {useTranslation} from '../../../../vendor/datagouv-components/src/composables/useTranslation'
import AdminBadge from '../AdminBadge/AdminBadge.vue'
import { throwOnNever } from '@datagouv/components-next'
import type { HarvesterJob, HarvesterJobPreview } from '../../../../vendor/cdata-runtime/types/harvesters'
type AdminBadgeType = 'primary'|'secondary'|'success'|'warning'|'danger'|'default'|'pink'|'teal'

const props = defineProps<{
  job: HarvesterJob | HarvesterJobPreview
}>()

const { t } = useTranslation()

const status = computed<{ label: string, type: AdminBadgeType }>(() => {
  switch (props.job.status) {
    case 'pending':
      return {
        label: t('En attente'),
        type: 'secondary',
      }
    case 'initializing':
      return {
        label: t(`En cours d'initialisation`),
        type: 'primary',
      }
    case 'initialized':
      return {
        label: t('Initialisé'),
        type: 'secondary',
      }
    case 'processing':
      return {
        label: t('En traitement'),
        type: 'primary',
      }
    case 'done':
      return {
        label: t('Terminé'),
        type: 'success',
      }
    case 'done-errors':
      return {
        label: t('Terminé avec des erreurs'),
        type: 'warning',
      }
    case 'failed':
      return {
        label: t('Échoué'),
        type: 'danger',
      }
    default:
      return throwOnNever(props.job.status, 'Unknown job status')
  }
})
</script>
