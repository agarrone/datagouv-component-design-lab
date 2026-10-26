<template>
  <ObjectCard class="lab-content-card lab-catalog-card">
    <template v-if="$slots.cover" #cover><slot name="cover" /></template>
    <template #media>
      <OrganizationLogo
        :organization="organization"
        size-class="size-12"
      />
    </template>
    <ObjectCardHeader
      :icon="RiBuilding2Line"
      :url="organization.page"
    >
      <OrganizationNameWithCertificate
        :show-type="false"
        :organization
        size="sm"
        color-class="lab-ds-u-text-gray-title"
      />
    </ObjectCardHeader>
    <div v-if="type !== 'other'" class="lab-card-organization-type">
      <OwnerType :type />
    </div>
    <OrganizationMetrics v-if="'metrics' in organization" :metrics="organization.metrics" show-followers />
    <ObjectCardShortDescription
      v-if="'description' in organization"
      :text="organization.description"
    />
  </ObjectCard>
</template>

<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/cards.css'
import OrganizationMetrics from '../shared/OrganizationMetrics.vue'
import { RiBuilding2Line } from '@remixicon/vue'
import { computed } from 'vue'
import { getOrganizationType } from '../../vendor/datagouv-components/src/functions/organizations'
import type { Organization, OrganizationReference } from '../../vendor/datagouv-components/src/types/organizations'
import OrganizationLogo from './OrganizationLogo.vue'
import OrganizationNameWithCertificate from './OrganizationNameWithCertificate.vue'
import OwnerType from './OwnerType.vue'
import ObjectCard from './ObjectCard.vue'
import ObjectCardHeader from './ObjectCardHeader.vue'
import ObjectCardShortDescription from './ObjectCardShortDescription.vue'

const props = defineProps<{
  organization: Organization | OrganizationReference
}>()

const type = computed(() => getOrganizationType(props.organization))
</script>
