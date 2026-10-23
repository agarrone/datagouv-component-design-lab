<template>
  <section v-if="compact" class="lab-organization-summary">
    <header class="lab-organization-summary-heading">
      <OrganizationLogo :organization="organization" size-class="lab-organization-summary-logo" />
      <OrganizationNameWithCertificate :show-type="false" :organization="organization" as="h3" />
    </header>
    <div v-if="type !== 'other'"><OwnerType :type="type" /></div>
    <OrganizationMetrics v-if="'metrics' in organization && organization.metrics" :metrics="organization.metrics" show-labels />
    <ObjectCardShortDescription v-if="'description' in organization && organization.description" :text="organization.description" />
  </section>
  <div v-else class="lab-content-card lab-catalog-card lab-organization-card relative fr-enlarge-link">
    <div class="lab-organization-banner" />
    <div class="lab-organization-body">
      <div class="lab-organization-logo">
        <OrganizationLogo :organization="organization" size-class="size-14" />
      </div>
      <div class="lab-card-heading">
        <AppLink
          :to="organization.page"
          class="lab-organization-title"
        >
          <OrganizationNameWithCertificate
            :show-type="false"
            color-class="lab-ds-u-text-gray-title"
            :organization
          />
        </AppLink>
      </div>
      <div v-if="type !== 'other'" class="lab-card-organization-type">
        <OwnerType :type />
      </div>
      <OrganizationMetrics v-if="'metrics' in organization" :metrics="organization.metrics" />
      <div class="lab-organization-description">
        <ObjectCardShortDescription v-if="'description' in organization" :text="organization.description" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/cards.css'
import OrganizationMetrics from '../shared/OrganizationMetrics.vue'
import { computed } from 'vue'
import { getOrganizationType } from '../../vendor/datagouv-components/src/functions/organizations'
import type { Organization, OrganizationReference } from '../../vendor/datagouv-components/src/types/organizations'
import OrganizationLogo from './OrganizationLogo.vue'
import ObjectCardShortDescription from './ObjectCardShortDescription.vue'
import OwnerType from './OwnerType.vue'
import OrganizationNameWithCertificate from './OrganizationNameWithCertificate.vue'
import AppLink from '/proposals/components/AppLink.vue'

const props = defineProps<{
  compact?: boolean
  organization: Organization | OrganizationReference
}>()

const type = computed(() => getOrganizationType(props.organization))
</script>

<style scoped>
.lab-organization-summary{display:flex;flex-direction:column;gap:var(--lab-ds-space-12);min-width:0;color:var(--lab-ds-text);font:var(--lab-ds-weight-regular) var(--lab-ds-text-body)/var(--lab-ds-leading-body) var(--lab-ds-font-sans)}
.lab-organization-summary-heading{display:flex;align-items:flex-start;gap:var(--lab-ds-space-12)}
.lab-organization-summary-logo{width:var(--lab-ds-space-48);height:var(--lab-ds-space-48);flex:none;border:1px solid var(--lab-ds-border);border-radius:var(--lab-ds-radius);overflow:hidden}
.lab-organization-summary-heading :deep(.lab-organization-name){flex:1;align-items:flex-start;font-weight:var(--lab-ds-weight-semibold)}
.lab-organization-summary-heading :deep(.lab-organization-name-label){white-space:normal;overflow:visible;text-overflow:clip;overflow-wrap:anywhere}
.lab-organization-summary :deep(.lab-card-metric){gap:var(--lab-ds-space-4)}
.lab-organization-summary :deep(.lab-organization-counts){display:flex;flex-wrap:wrap;gap:var(--lab-ds-space-8) var(--lab-ds-space-16)}
</style>
