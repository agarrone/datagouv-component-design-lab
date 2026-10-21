<template>
  <ObjectCard class="lab-content-card">
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
    <div class="lab-ds-u-text-sm flex flex-wrap lab-ds-u-gap-x-2 lab-ds-u-gap-y-1 items-center">
      <template v-if="type !== 'other'">
        <OwnerType
          class="mb-0"
          :type
        />
      </template>
      <div
        v-if="'metrics' in organization"
        class="lab-ds-u-text-gray-medium flex items-center lab-ds-u-text-sm lab-ds-u-gap-0-5"
        :aria-label="t('{datasets} jeux de donn\u00e9es, {dataservices} API et {reuses} r\u00e9utilisations', {
          datasets: organization.metrics.datasets,
          dataservices: organization.metrics.dataservices,
          reuses: organization.metrics.reuses,
        })"
      >
        <RiDatabase2Line
          aria-hidden="true"
          class="size-3.5"
        /> {{ summarize(organization.metrics.datasets) }}
        <RiTerminalLine
          aria-hidden="true"
          class="size-3.5 lab-ds-u-ml-1"
        /> {{ summarize(organization.metrics.dataservices) }}
        <RiLineChartLine
          aria-hidden="true"
          class="size-3.5 lab-ds-u-ml-1"
        /> {{ summarize(organization.metrics.reuses) }}
        <RiStarLine
          aria-hidden="true"
          class="size-3.5 lab-ds-u-ml-1"
        /> {{ summarize(organization.metrics.followers) }}
      </div>
    </div>
    <ObjectCardShortDescription
      v-if="'description' in organization"
      :text="organization.description"
    />
  </ObjectCard>
</template>

<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/cards.css'
import { RiBuilding2Line, RiDatabase2Line, RiLineChartLine, RiStarLine, RiTerminalLine } from '@remixicon/vue'
import { computed } from 'vue'
import { getOrganizationType } from '../../vendor/datagouv-components/src/functions/organizations'
import { summarize } from '../../vendor/datagouv-components/src/functions/helpers'
import { useTranslation } from '../../vendor/datagouv-components/src/composables/useTranslation'
import type { Organization, OrganizationReference } from '../../vendor/datagouv-components/src/types/organizations'
import OrganizationLogo from '../../vendor/datagouv-components/src/components/OrganizationLogo.vue'
import OrganizationNameWithCertificate from '../../vendor/datagouv-components/src/components/OrganizationNameWithCertificate.vue'
import OwnerType from './OwnerType.vue'
import ObjectCard from './ObjectCard.vue'
import ObjectCardHeader from './ObjectCardHeader.vue'
import ObjectCardShortDescription from './ObjectCardShortDescription.vue'

const props = defineProps<{
  organization: Organization | OrganizationReference
}>()

const { t } = useTranslation()

const type = computed(() => getOrganizationType(props.organization))
</script>
