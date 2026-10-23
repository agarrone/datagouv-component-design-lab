<template>
  <span v-if="!statut">-</span>
  <div v-else-if="linksToData && url" class="lab-hvd-status">
    <AdminBadge :type="type" size="sm" :no-wrap="false">{{ statut }}</AdminBadge>
    <CdataLink :to="url" external target="_blank" rel="noopener noreferrer" class="proposed-hvd-link fr-raw-link">
      {{ t('Voir les données') }}
    </CdataLink>
  </div>
  <AdminBadge
    v-else
    :type="type"
    size="sm"
    :no-wrap="false"
  >
    {{ statut }}
  </AdminBadge>
</template>

<script setup lang="ts">
import '../../../shared/foundations.css'
import {useTranslation} from '../../../../vendor/datagouv-components/src/composables/useTranslation'
import CdataLink from '/proposals/components/AppLink.vue'
import AdminBadge from '../AdminBadge/AdminBadge.vue'
type AdminBadgeType = 'primary'|'secondary'|'success'|'warning'|'danger'|'default'|'pink'|'teal'

const {t}=useTranslation()

// Presentation only: the status → colour / links-to-data mapping is owned by the
// hosting page (single source of truth in its STATUTS list) and passed in.
defineProps<{
  statut: string | null
  url: string | null
  type: AdminBadgeType
  linksToData: boolean
}>()
</script>

<style scoped>
.lab-hvd-status { display:flex; flex-wrap:wrap; align-items:center; gap:var(--lab-ds-space-8); }
.proposed-hvd-link { display:inline-flex; align-items:center; gap:var(--lab-ds-space-4); min-height:var(--lab-ds-control-compact); font:var(--lab-ds-weight-regular) var(--lab-ds-text-caption)/var(--lab-ds-leading-caption) var(--lab-ds-font-sans); text-decoration:underline; text-underline-offset:var(--lab-ds-space-optical); }
.proposed-hvd-link::after { content:none !important; }
.proposed-hvd-link:focus-visible { outline:var(--lab-ds-focus-width) solid var(--lab-ds-focus); outline-offset:var(--lab-ds-focus-offset); }
</style>
