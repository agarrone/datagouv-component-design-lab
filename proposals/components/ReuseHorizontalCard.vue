<template>
  <ObjectCard class="lab-content-card lab-catalog-card" media-size="lg">


    <template #media>
      <CardMedia :src="reuse.image" :alt="reuse.title" kind="reuse" />
    </template>

    <div class="lab-card-heading-row">
    <ObjectCardHeader
      :icon="RiLineChartLine"
      :url="reuseUrl || reuse.page"
    >
      {{ reuse.title }}
    </ObjectCardHeader>


      <ObjectCardBadge
        v-if="reuse.private"
        :icon="RiLockLine"
      >
        {{ t('Brouillon') }}
      </ObjectCardBadge>

      <ObjectCardBadge
        v-else-if="reuse.archived"
        :icon="RiArchiveLine"
        tone="secondary"
      >
        {{ t('Archivé') }}
      </ObjectCardBadge>
    </div>

    <div
      v-if="reuse.organization || reuse.owner"
      class="lab-ds-u-text-sm flex flex-wrap lab-ds-u-gap-x-2 lab-ds-u-gap-y-1 items-center"
    >
      <ObjectCardOwner
        show-details
        :organization="reuse.organization"
        :owner="reuse.owner"
        :organization-url="organizationUrl"
      />
    </div>

    <div class="lab-card-update-row">
      <TranslationT tag="div" class="lab-card-updated" keypath="Publié {date}"><template #date><FormattedDate :date="reuse.created_at" format="relative" :options="{dateStyle:'medium'}" /></template></TranslationT>
    </div>
    <ReuseDetails :reuse />
    <ObjectCardShortDescription :text="reuse.description" />

    <slot />
  </ObjectCard>
</template>

<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/cards.css'
import { RiArchiveLine, RiLineChartLine, RiLockLine } from '@remixicon/vue'
import type { RouteLocationRaw } from 'vue-router'
import type { Reuse, ReuseV2 } from '../../vendor/datagouv-components/src/types/reuses'
import { useTranslation } from '../../vendor/datagouv-components/src/composables/useTranslation'
import ReuseDetails from './ReuseDetails.vue'
import TranslationT from '../../vendor/datagouv-components/src/components/TranslationT.vue'
import FormattedDate from '../../vendor/datagouv-components/src/components/FormattedDate.vue'
import CardMedia from '../shared/CardMedia.vue'
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
