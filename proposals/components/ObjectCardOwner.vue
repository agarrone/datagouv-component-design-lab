<template>
  <div
    v-if="organization"
    class="lab-card-owner flex-initial"
  >
    <OrganizationLogo v-if="showLogo" :organization="organization" size-class="lab-owner-logo" />
    <DetailsPopover
      v-if="showDetails && organizationUrl !== null"
      button-class="lab-details-trigger lab-organization-trigger"
      :button-props="{ title: t('À propos de cette organisation') }"
    >
      <OrganizationNameWithCertificate :show-certificate="showCertificate" :organization size="sm" />
      <template #toggletip>
        <section class="lab-organization-details">
          <OrganizationCard :organization="organization" compact />
          <AppLink :to="organizationUrl || organization.page" class="lab-proposal-link lab-organization-details-footer">{{ t("Voir la page de l’organisation") }}</AppLink>
        </section>
      </template>
    </DetailsPopover>
    <AppLink
      v-else-if="organizationUrl !== null"
      class="lab-proposal-link link lab-ds-u-text-sm flex items-center relative z-[2]"
      :to="organizationUrl || organization.page"
    >
      <OrganizationNameWithCertificate :show-certificate="showCertificate"
        :organization
        size="sm"
      />
    </AppLink>
    <span
      v-else
      class="lab-ds-u-text-sm flex items-center"
    >
      <OrganizationNameWithCertificate :show-certificate="showCertificate"
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
import OrganizationCard from './OrganizationCard.vue'
import OrganizationLogo from './OrganizationLogo.vue'
import { getOwnerName } from '../../vendor/datagouv-components/src/functions/owned'
import type { OrganizationReference } from '../../vendor/datagouv-components/src/types/organizations'
import type { UserReference } from '../../vendor/datagouv-components/src/types/users'
import AppLink from '/proposals/components/AppLink.vue'
import OrganizationNameWithCertificate from './OrganizationNameWithCertificate.vue'

const props = withDefaults(defineProps<{
  showDetails?: boolean
  showLogo?: boolean
  showCertificate?: boolean
  organization?: OrganizationReference | null
  owner?: UserReference | null
  // undefined falls back to organization.page; pass null to render plain, non-linked text
  organizationUrl?: RouteLocationRaw | null
}>(), { showCertificate: true })

const { t } = useTranslation()
const ownerName = computed(() => {
  if (!props.owner) return ''
  return getOwnerName({ organization: null, owner: props.owner })
})
</script>

<style scoped>
.lab-card-owner { display:flex;align-items:center;gap:var(--lab-ds-space-8);min-width:0; color:var(--lab-ds-text-secondary); font:var(--lab-ds-weight-regular) var(--lab-ds-text-body)/var(--lab-ds-leading-control) var(--lab-ds-font-sans); overflow-wrap:anywhere; }
.lab-card-owner :deep(.truncate) { white-space:normal; overflow:visible; text-overflow:clip; }
.lab-card-owner :deep(a) { color:var(--lab-ds-text-secondary); background-image:none; text-decoration:underline; text-underline-offset:var(--lab-ds-space-optical); }
.lab-card-owner :deep(a:focus-visible) { outline:var(--lab-ds-focus-width) solid var(--lab-ds-focus); outline-offset:var(--lab-ds-focus-offset); }
</style>

<style scoped>
.lab-organization-details{display:flex;flex-direction:column;gap:var(--lab-ds-space-16)}
.lab-organization-details-footer{display:block;border-top:1px solid var(--lab-ds-border);padding-top:var(--lab-ds-space-12);font:var(--lab-ds-weight-medium) var(--lab-ds-text-body)/var(--lab-ds-leading-body) var(--lab-ds-font-sans)}
</style>

<style scoped>.lab-owner-logo{width:var(--lab-ds-space-32);height:var(--lab-ds-space-32)}</style>
