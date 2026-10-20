<template>
  <div class="lab-content-card lab-organization-card relative fr-enlarge-link">
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
            color-class="text-gray-title"
            :organization
          />
        </AppLink>
      </div>
      <div class="mt-2 mb-2 flex flex-wrap gap-1 items-center">
        <template v-if="type !== 'other'">
          <OwnerType
            class="mb-0 text-sm"
            :type
          />
        </template>
        <div>
          <div
            v-if="'metrics' in organization"
            class="text-gray-medium flex items-center text-sm gap-0.5"
            :aria-label="t('{datasets} jeux de données, {dataservices} API et {reuses} réutilisations', {
              datasets: organization.metrics.datasets,
              dataservices: organization.metrics.dataservices,
              reuses: organization.metrics.reuses,
            })"
          >
            <RiDatabase2Line
              aria-hidden="true"
              class="size-4 -mt-1"
            /> {{ organization.metrics.datasets }}
            <RiTerminalLine
              aria-hidden="true"
              class="size-4 -mt-1 ml-1"
            /> {{ organization.metrics.dataservices }}
            <RiLineChartLine
              aria-hidden="true"
              class="size-4 -mt-1 ml-1"
            /> {{ organization.metrics.reuses }}
          </div>
        </div>
      </div>
      <div class="lab-organization-description">
        <TextClamp
          v-if="'description' in organization"
          :text="removeMarkdownSync(organization.description)"
          :max-lines="3"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '../shared/cards.css'
import { RiLineChartLine, RiDatabase2Line, RiTerminalLine } from '@remixicon/vue'
import { computed } from 'vue'
import { removeMarkdownSync } from '../../vendor/datagouv-components/src/functions/markdown'
import { getOrganizationType } from '../../vendor/datagouv-components/src/functions/organizations'
import type { Organization, OrganizationReference } from '../../vendor/datagouv-components/src/types/organizations'
import OrganizationLogo from '../../vendor/datagouv-components/src/components/OrganizationLogo.vue'
import TextClamp from '../../vendor/cdata-components/TextClamp.client.vue'
import OwnerType from '../../vendor/datagouv-components/src/components/OwnerType.vue'
import OrganizationNameWithCertificate from '../../vendor/datagouv-components/src/components/OrganizationNameWithCertificate.vue'
import AppLink from '../../vendor/datagouv-components/src/components/AppLink.vue'
import { useTranslation } from '../../vendor/datagouv-components/src/composables/useTranslation'

const props = defineProps<{
  organization: Organization | OrganizationReference
}>()

const { t } = useTranslation()

const type = computed(() => getOrganizationType(props.organization))
</script>
