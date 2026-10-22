<template>
  <div
    v-if="organization"
    class="lab-card-owner flex-initial"
  >
    <DetailsPopover
      v-if="showDetails && organizationUrl !== null"
      button-class="lab-organization-trigger"
      :button-props="{ title: t('À propos de cette organisation') }"
    >
      <OrganizationNameWithCertificate :organization size="sm" />
      <template #toggletip>
        <section class="lab-organization-details">
          <p class="lab-quality-details-title">{{ organization.name }}</p>
          <p v-if="organizationDescription">{{ organizationDescription }}</p>
          <AppLink :to="organizationUrl || organization.page" class="lab-proposal-link">{{ t("Voir la page de l’organisation") }}</AppLink>
        </section>
      </template>
    </DetailsPopover>
    <AppLink
      v-else-if="organizationUrl !== null"
      class="lab-proposal-link link lab-ds-u-text-sm flex items-center relative z-[2]"
      :to="organizationUrl || organization.page"
    >
      <OrganizationNameWithCertificate
        :organization
        size="sm"
      />
    </AppLink>
    <span
      v-else
      class="lab-ds-u-text-sm flex items-center"
    >
      <OrganizationNameWithCertificate
        :organization
        size="sm"
        color-class="lab-ds-u-text-gray-title"
      />
    </span>
  </div>
  <div
    v-else-if="ownerName"
    class="lab-card-owner"
  >
    {{ ownerName }}
  </div>
</template>

<script setup lang="ts">
import '../shared/foundations.css'
import { computed } from 'vue'
import DetailsPopover from '../shared/QualityDetailsPopover.vue'
import { useTranslation } from '../../vendor/datagouv-components/src/composables/useTranslation'
import type { RouteLocationRaw } from 'vue-router'
import { getOwnerName } from '../../vendor/datagouv-components/src/functions/owned'
import type { OrganizationReference } from '../../vendor/datagouv-components/src/types/organizations'
import type { UserReference } from '../../vendor/datagouv-components/src/types/users'
import AppLink from '../../vendor/datagouv-components/src/components/AppLink.vue'
import OrganizationNameWithCertificate from '../../vendor/datagouv-components/src/components/OrganizationNameWithCertificate.vue'

const props = defineProps<{
  showDetails?: boolean
  organization?: OrganizationReference | null
  owner?: UserReference | null
  // undefined falls back to organization.page; pass null to render plain, non-linked text
  organizationUrl?: RouteLocationRaw | null
}>()

const { t } = useTranslation()
const organizationDescription = computed(() => (props.organization as (OrganizationReference & {description?: string}) | null)?.description)

const ownerName = computed(() => {
  if (!props.owner) return ''
  return getOwnerName({ organization: null, owner: props.owner })
})
</script>

<style scoped>
.lab-card-owner { min-width:0; color:var(--lab-ds-text-secondary); font:var(--lab-ds-weight-regular) var(--lab-ds-text-body)/var(--lab-ds-leading-control) var(--lab-ds-font-sans); overflow-wrap:anywhere; }
.lab-card-owner :deep(.truncate) { white-space:normal; overflow:visible; text-overflow:clip; }
.lab-card-owner :deep(a) { color:var(--lab-ds-text-secondary); background-image:none; text-decoration:underline; text-underline-offset:var(--lab-ds-space-optical); }
.lab-card-owner :deep(a:focus-visible) { outline:var(--lab-ds-focus-width) solid var(--lab-ds-focus); outline-offset:var(--lab-ds-focus-offset); }
</style>
