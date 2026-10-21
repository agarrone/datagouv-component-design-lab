<template>
  <ObjectCard class="lab-content-card">
    <template #badge>
      <ObjectCardBadge
        v-if="dataset.private"
        :icon="RiLockLine"
      >
        {{ t('Brouillon') }}
      </ObjectCardBadge>
      <ObjectCardBadge
        v-else-if="dataset.archived"
        :icon="RiArchiveLine"
      >
        {{ t('Archivé') }}
      </ObjectCardBadge>
    </template>

    <template #media>
      <OrganizationLogo
        v-if="dataset.organization"
        :organization="dataset.organization"
        size-class="size-12"
      />
      <Avatar
        v-else-if="dataset.owner"
        :user="dataset.owner"
        :size="48"
      />
      <Placeholder
        v-else
        type="Dataset"
        class="size-12"
      />
    </template>
    <ObjectCardHeader
      :icon="RiDatabase2Line"
      :url="datasetUrl || dataset.page"
      :target="datasetUrlInNewTab ? '_blank' : undefined"
      :title-tag="titleTag"
    >
      {{ dataset.title }}
      <template
        v-if="dataset.acronym"
        #extra
      >
        <small class="flex-1 lab-ds-u-ml-2">{{ dataset.acronym }}</small>
      </template>
    </ObjectCardHeader>
    <div
      v-if="dataset.organization || dataset.owner"
      class="lab-ds-u-text-sm flex flex-wrap lab-ds-u-gap-x-2 lab-ds-u-gap-y-1 items-center"
    >
      <ObjectCardOwner
        :organization="dataset.organization"
        :owner="dataset.owner"
        :organization-url="organizationUrl"
      />
      <TranslationT
        tag="div"
        class="w-full md:w-auto lab-ds-u-text-gray-medium whitespace-normal"
        keypath="Mis à jour {date}"
      >
        <template #date>
          <FormattedDate
            :date="dataset.last_update"
            format="relative"
            :options="{ dateStyle: 'medium' }"
          />
        </template>
      </TranslationT>
    </div>
    <slot>
      <ObjectCardShortDescription
        v-if="showDescriptionShort"
        :text="getDescriptionShort(props.dataset)"
      />
    </slot>
    <div class="lab-card-metrics flex flex-wrap items-center lab-ds-u-text-sm lab-ds-u-text-gray-medium">
      <div class="flex lab-ds-u-text-gray-medium">
        <DatasetQualityInline :quality="dataset.quality" />
      </div>
      <div class="lab-card-metrics flex flex-wrap items-center lab-ds-u-gap-3">
        <p
          class="lab-ds-u-text-sm mb-0 flex items-center lab-ds-u-gap-0-5"
          :aria-label="t('{n} vues | {n} vue | {n} vues', dataset.metrics.views)"
        >
          <RiEyeLine
            aria-hidden="true"
            class="size-3.5"
          />{{ summarize(dataset.metrics.views) }}
        </p>
        <p
          class="lab-ds-u-text-sm mb-0 flex items-center lab-ds-u-gap-0-5"
          :aria-label="t('{n} téléchargements des ressources | {n} téléchargement des ressources | {n} téléchargements des ressources', dataset.metrics.resources_downloads)"
        >
          <RiDownloadLine
            aria-hidden="true"
            class="size-3.5"
          />{{ summarize(dataset.metrics.resources_downloads) }}
        </p>
        <p
          class="lab-ds-u-text-sm mb-0 flex items-center lab-ds-u-gap-0-5"
          :aria-label="t('{n} réutilisations | {n} réutilisation | {n} réutilisations', dataset.metrics.reuses)"
        >
          <RiLineChartLine
            aria-hidden="true"
            class="size-3.5"
          />{{ summarize(dataset.metrics.reuses) }}
        </p>
        <p
          class="lab-ds-u-text-sm mb-0 flex items-center lab-ds-u-gap-0-5"
          :aria-label="t('{n} abonnés | {n} abonné | {n} abonnés', dataset.metrics.followers)"
        >
          <RiStarLine
            aria-hidden="true"
            class="size-3.5"
          />{{ summarize(dataset.metrics.followers) }}
        </p>
      </div>
    </div>

  </ObjectCard>
</template>

<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/cards.css'
import type { RouteLocationRaw } from 'vue-router'
import { RiArchiveLine, RiDatabase2Line, RiDownloadLine, RiEyeLine, RiLineChartLine, RiLockLine, RiStarLine } from '@remixicon/vue'
import type { Dataset, DatasetV2 } from '../../vendor/datagouv-components/src/types/datasets'
import type { TitleTag } from '../../vendor/datagouv-components/src/types/ui'
import { summarize } from '../../vendor/datagouv-components/src/functions/helpers'
import { getDescriptionShort } from '../../vendor/datagouv-components/src/functions/description'
import { useTranslation } from '../../vendor/datagouv-components/src/composables/useTranslation'
import DatasetQualityInline from './DatasetQualityInline.vue'
import Avatar from './Avatar.vue'
import Placeholder from '../../vendor/datagouv-components/src/components/Placeholder.vue'
import OrganizationLogo from '../../vendor/datagouv-components/src/components/OrganizationLogo.vue'
import ObjectCardOwner from './ObjectCardOwner.vue'
import ObjectCard from './ObjectCard.vue'
import ObjectCardBadge from './ObjectCardBadge.vue'
import ObjectCardHeader from './ObjectCardHeader.vue'
import ObjectCardShortDescription from './ObjectCardShortDescription.vue'
import FormattedDate from '../../vendor/datagouv-components/src/components/FormattedDate.vue'
import TranslationT from '../../vendor/datagouv-components/src/components/TranslationT.vue'

type Props = {
  dataset: Dataset | DatasetV2
  datasetUrl?: RouteLocationRaw
  datasetUrlInNewTab?: boolean
  // undefined falls back to the organization's data.gouv.fr page; pass null to render plain, non-linked text
  organizationUrl?: RouteLocationRaw | null
  showDescriptionShort?: boolean
  titleTag?: TitleTag
}

const props = withDefaults(defineProps<Props>(), {
  showDescriptionShort: true,
})

const { t } = useTranslation()
</script>
