<template>
  <span v-if="!statut">-</span>
  <CdataLink
    v-else-if="linksToData && url"
    :to="url"
    external
    target="_blank"
    rel="noopener"
    class="proposed-hvd-link fr-raw-link"
  >
    <AdminBadge
      :type="type"
      :icon-right="RiExternalLinkLine"
      size="sm"
      :no-wrap="false"
      icon-size="size-3.5"
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
import { RiExternalLinkLine } from '@remixicon/vue'
import CdataLink from '../../../../vendor/cdata-components/CdataLink.vue'
import AdminBadge from '../AdminBadge/AdminBadge.vue'
type AdminBadgeType = 'primary'|'secondary'|'success'|'warning'|'danger'|'default'|'pink'|'teal'

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
.proposed-hvd-link { text-decoration:underline; text-underline-offset:3px; }
.proposed-hvd-link::after { content:none !important; }
.proposed-hvd-link:focus-visible { outline:var(--lab-ds-focus-width) solid var(--lab-ds-focus); outline-offset:var(--lab-ds-focus-offset); }
</style>
