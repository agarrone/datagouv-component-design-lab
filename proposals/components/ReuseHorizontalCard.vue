<template>
  <ObjectCard class="lab-content-card" media-size="lg">
    <template #badge>
      <ObjectCardBadge
        v-if="reuse.private"
        :icon="RiLockLine"
      >
        {{ t('Brouillon') }}
      </ObjectCardBadge>
      <ObjectCardBadge
        v-else-if="reuse.archived"
        :icon="RiArchiveLine"
      >
        {{ t('Archivé') }}
      </ObjectCardBadge>
    </template>

    <template #media>
      <img
        v-if="reuse.image"
        :src="reuse.image"
        class="w-full h-full object-cover"
        :alt="reuse.title"
      >
      <Placeholder
        v-else
        type="Reuse"
        class="w-full h-full"
      />
    </template>

    <ObjectCardHeader
      :icon="RiLineChartLine"
      :url="reuseUrl || reuse.page"
    >
      {{ reuse.title }}
    </ObjectCardHeader>

    <div
      v-if="reuse.organization || reuse.owner"
      class="text-sm flex flex-wrap gap-x-2 gap-y-1 items-center"
    >
      <ObjectCardOwner
        :organization="reuse.organization"
        :owner="reuse.owner"
        :organization-url="organizationUrl"
      />
    </div>

    <ObjectCardShortDescription :text="reuse.description" />
    <div class="lab-card-metrics flex flex-wrap items-center text-sm text-gray-medium mt-1">
      <ReuseDetails :reuse />
    </div>

    <slot />
  </ObjectCard>
</template>

<script setup lang="ts">
import '../shared/cards.css'
import { RiArchiveLine, RiLineChartLine, RiLockLine } from '@remixicon/vue'
import type { RouteLocationRaw } from 'vue-router'
import type { Reuse, ReuseV2 } from '../../vendor/datagouv-components/src/types/reuses'
import { useTranslation } from '../../vendor/datagouv-components/src/composables/useTranslation'
import ReuseDetails from '../../vendor/datagouv-components/src/components/ReuseDetails.vue'
import Placeholder from '../../vendor/datagouv-components/src/components/Placeholder.vue'
import ObjectCard from './ObjectCard.vue'
import ObjectCardHeader from './ObjectCardHeader.vue'
import ObjectCardOwner from './ObjectCardOwner.vue'
import ObjectCardShortDescription from './ObjectCardShortDescription.vue'
import ObjectCardBadge from './ObjectCardBadge.vue'

defineProps<{
  reuse: Reuse | ReuseV2
  reuseUrl?: RouteLocationRaw
  // undefined falls back to the organization's data.gouv.fr page; pass null to render plain, non-linked text
  organizationUrl?: RouteLocationRaw | null
}>()

const { t } = useTranslation()
</script>
