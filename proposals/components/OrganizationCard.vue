<template>
  <div class="lab-content-card lab-catalog-card lab-organization-card relative fr-enlarge-link">
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
      <div class="lab-ds-u-mt-2 lab-ds-u-mb-2 flex flex-wrap lab-ds-u-gap-1 items-center">
        <template v-if="type !== 'other'">
          <OwnerType
            class="mb-0 lab-ds-u-text-sm"
            :type
          />
        </template>
        <div>
      <OrganizationMetrics v-if="'metrics' in organization" :metrics="organization.metrics" />
        </div>
      </div>
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
import OrganizationLogo from '../../vendor/datagouv-components/src/components/OrganizationLogo.vue'
import ObjectCardShortDescription from './ObjectCardShortDescription.vue'
import OwnerType from './OwnerType.vue'
import OrganizationNameWithCertificate from '../../vendor/datagouv-components/src/components/OrganizationNameWithCertificate.vue'
import AppLink from '../../vendor/datagouv-components/src/components/AppLink.vue'

const props = defineProps<{
  organization: Organization | OrganizationReference
}>()

const type = computed(() => getOrganizationType(props.organization))
</script>
