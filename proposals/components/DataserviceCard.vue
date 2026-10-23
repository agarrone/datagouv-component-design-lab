<template>
  <ObjectCard class="lab-content-card lab-catalog-card"
    :article-class="{
      'border-tabular-api': isTabularApi,
      'lab-ds-u-border-gray-default': !isTabularApi,
    }"
  >


    <template #media>
      <OrganizationLogo
        v-if="dataservice.organization"
        :organization="dataservice.organization"
        size-class="size-12"
      />
      <Avatar
        v-else-if="dataservice.owner"
        :user="dataservice.owner"
        :size="48"
      />
      <Placeholder
        v-else
        type="Dataservice"
        class="size-12"
      />
    </template>

    <div class="lab-card-heading-row">
    <ObjectCardHeader
      :icon="isTabularApi ? RiSparklingLine : RiTerminalLine"
      :url="dataserviceUrl || dataservice.self_web_url"
      :title-tag="titleTag"
    >
      {{ dataservice.title }}
    </ObjectCardHeader>


      <ObjectCardBadge
        v-if="dataservice.private"
        :icon="RiLockLine"
      >
        {{ t('Brouillon') }}
      </ObjectCardBadge>

      <ObjectCardBadge
        v-else-if="dataservice.archived_at"
        :icon="RiArchiveLine"
        tone="warning"
      >
        {{ t('Archivé') }}
      </ObjectCardBadge>

      <ObjectCardBadge
        v-else-if="dataservice.access_type === 'restricted'"
        tone="warning"
        :icon="RiLockLine"
      >
        {{ t('Accès restreint') }}
      </ObjectCardBadge>

      <ObjectCardBadge
        v-else-if="dataservice.access_type === 'open_with_account'"
        tone="yellow"
        :icon="RiPassValidLine"
      >
        {{ t('Ouvert avec un compte') }}
      </ObjectCardBadge>
    </div>
    <div class="lab-card-details">
      <ObjectCardOwner show-details :organization="dataservice.organization" :owner="dataservice.owner" :organization-url="organizationUrl" />
      <div class="lab-card-update-row">
        <TranslationT tag="div" class="lab-card-updated" keypath="Mis à jour {date}">
          <template #date><FormattedDate :date="dataservice.metadata_modified_at" format="relative" :options="{dateStyle:'medium'}" /></template>
        </TranslationT>
      </div>
    </div>
    <div class="lab-card-metadata-row" :class="{'lab-card-has-quality':dataservice.quality}">
    <DataserviceQualityInline
      v-if="dataservice.quality"
      :quality="dataservice.quality"
    />

      <div class="lab-card-metrics flex flex-wrap items-center lab-ds-u-gap-3 lab-ds-u-text-gray-medium">
        <p
          class="lab-ds-u-text-sm mb-0 flex items-center lab-ds-u-gap-0-5"
          :aria-label="t('{n} vues | {n} vue | {n} vues', dataservice.metrics.views)"
        >
          <RiEyeLine data-icon-size="compact" focusable="false"
            aria-hidden="true"
            class=" lab-ds-icon"
          />{{ summarize(dataservice.metrics.views) }}
        </p>
        <p
          class="lab-ds-u-text-sm mb-0 flex items-center lab-ds-u-gap-0-5"
          :aria-label="t('{n} abonnés | {n} abonné | {n} abonnés', dataservice.metrics.followers)"
        >
          <RiStarLine data-icon-size="compact" focusable="false"
            aria-hidden="true"
            class=" lab-ds-icon"
          />{{ summarize(dataservice.metrics.followers) }}
        </p>
      </div>
    </div>
    <ObjectCardShortDescription
      v-if="showDescription"
      :text="dataservice.description"
    />
    <slot />
  </ObjectCard>
</template>

<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/cards.css'
import { computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import { RiArchiveLine, RiEyeLine, RiLockLine, RiPassValidLine, RiSparklingLine, RiStarLine, RiTerminalLine } from '@remixicon/vue'
import { useComponentsConfig } from '../../vendor/datagouv-components/src/config'
import { summarize } from '../../vendor/datagouv-components/src/functions/helpers'
import type { Dataservice } from '../../vendor/datagouv-components/src/types/dataservices'
import type { TitleTag } from '../../vendor/datagouv-components/src/types/ui'
import { useTranslation } from '../../vendor/datagouv-components/src/composables/useTranslation'
import OrganizationLogo from '../../vendor/datagouv-components/src/components/OrganizationLogo.vue'
import Avatar from './Avatar.vue'
import Placeholder from '../../vendor/datagouv-components/src/components/Placeholder.vue'
import ObjectCard from './ObjectCard.vue'
import ObjectCardBadge from './ObjectCardBadge.vue'
import ObjectCardHeader from './ObjectCardHeader.vue'
import ObjectCardOwner from './ObjectCardOwner.vue'
import ObjectCardShortDescription from './ObjectCardShortDescription.vue'
import DataserviceQualityInline from './DataserviceQualityInline.vue'
import FormattedDate from '../../vendor/datagouv-components/src/components/FormattedDate.vue'
import TranslationT from '../../vendor/datagouv-components/src/components/TranslationT.vue'

type Props = {
  dataservice: Dataservice
  dataserviceUrl?: RouteLocationRaw
  // undefined falls back to the organization's data.gouv.fr page; pass null to render plain, non-linked text
  organizationUrl?: RouteLocationRaw | null
  showDescription?: boolean
  titleTag?: TitleTag
}

const props = withDefaults(defineProps<Props>(), {
  showDescription: true,
})

const { t } = useTranslation()

const config = useComponentsConfig()
const isTabularApi = computed(() => {
  return config.tabularApiDataserviceId === props.dataservice.id
})
</script>

<style scoped>
.border-tabular-api {
  border-color: var(--lab-ds-text-secondary) !important;
}
</style>
