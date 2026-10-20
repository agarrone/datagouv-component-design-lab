<template>
  <div
    v-if="organization"
    class="lab-card-owner flex-initial"
  >
    <AppLink
      v-if="organizationUrl !== null"
      class="link text-sm flex items-center relative z-[2]"
      :to="organizationUrl || organization.page"
    >
      <OrganizationNameWithCertificate
        :organization
        size="sm"
      />
    </AppLink>
    <span
      v-else
      class="text-sm flex items-center"
    >
      <OrganizationNameWithCertificate
        :organization
        size="sm"
        color-class="text-gray-title"
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
import { computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import { getOwnerName } from '../../vendor/datagouv-components/src/functions/owned'
import type { OrganizationReference } from '../../vendor/datagouv-components/src/types/organizations'
import type { UserReference } from '../../vendor/datagouv-components/src/types/users'
import AppLink from '../../vendor/datagouv-components/src/components/AppLink.vue'
import OrganizationNameWithCertificate from '../../vendor/datagouv-components/src/components/OrganizationNameWithCertificate.vue'

const props = defineProps<{
  organization?: OrganizationReference | null
  owner?: UserReference | null
  // undefined falls back to organization.page; pass null to render plain, non-linked text
  organizationUrl?: RouteLocationRaw | null
}>()

const ownerName = computed(() => {
  if (!props.owner) return ''
  return getOwnerName({ organization: null, owner: props.owner })
})
</script>

<style scoped>
.lab-card-owner { min-width:0; color:#555; font:400 14px/20px Marianne,Arial,sans-serif; overflow-wrap:anywhere; }
.lab-card-owner :deep(.truncate) { white-space:normal; overflow:visible; text-overflow:clip; }
.lab-card-owner :deep(a) { color:#555; background-image:none; text-decoration:underline; text-underline-offset:3px; }
.lab-card-owner :deep(a:focus-visible) { outline:2px solid #000091; outline-offset:2px; }
</style>
