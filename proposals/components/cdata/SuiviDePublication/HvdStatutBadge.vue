<template>
  <span v-if="!statut">-</span>
  <CdataLink
    v-else-if="linksToData && url"
    :to="url"
    external
    :external-icon="false"
    target="_blank"
    rel="noopener noreferrer"
    class="proposed-hvd-badge-link fr-raw-link"
    :aria-label="`${statut} — ${t('Voir les données')} (nouvelle fenêtre)`"
  >
    <AdminBadge
      :type="type"
      size="sm"
      :no-wrap="false"
      :icon-right="RiExternalLinkLine"
    >
      {{ statut }}
    </AdminBadge>
  </CdataLink>
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
import {RiExternalLinkLine} from '@remixicon/vue'
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
.proposed-hvd-badge-link { --hover-tint:transparent; --active-tint:transparent; display:inline-flex; width:fit-content; max-width:100%; color:inherit; text-decoration:none; background-color:transparent; background-image:none; }
.proposed-hvd-badge-link::after { content:none !important; }
.proposed-hvd-badge-link:hover { color:inherit; background-color:transparent!important; }
.proposed-hvd-badge-link:hover :deep(.design-lab-badge__text) { text-decoration:underline; text-decoration-thickness:var(--lab-ds-stroke); text-underline-offset:var(--lab-ds-space-optical); }
.proposed-hvd-badge-link:focus-visible { outline:var(--lab-ds-focus-width) solid var(--lab-ds-focus); outline-offset:var(--lab-ds-focus-offset); }
</style>
