<template>
  <div class="proposal-metadata-section">
    <h3 class="proposal-metadata-heading">
      {{ t('Informations') }}
    </h3>
    <DescriptionList>
      <div v-if="dataset.tags && dataset.tags.length">
        <DescriptionListTerm>{{ t('Mots-clés') }}</DescriptionListTerm>
        <DescriptionListDetails class="flex flex-wrap gap-2 items-start">
          <AppLink
            v-for="tag in dataset.tags"
            :key="tag"
            class="fr-raw-link"
            :to="getTagUrl(tag)"
          >
            <Tag type="secondary">
              {{ tag }}
            </Tag>
          </AppLink>
        </DescriptionListDetails>
      </div>
      <div>
        <DescriptionListTerm>{{ t('Identifiant') }}</DescriptionListTerm>
        <DescriptionListDetails class="proposal-metadata-identifier">
          {{ dataset.id }}
          <CopyButton
            
            :label="t(`Copier l'identifiant`)"
            :copied-label="t('Identifiant copié !')"
            :text="dataset.id"
            :hide-label="true"
          />
        </DescriptionListDetails>
      </div>
      <div v-if="dataset.license">
        <DescriptionListTerm>{{ t('Licence') }}</DescriptionListTerm>
        <DescriptionListDetails>
          <LicenseBadge :license="dataset.license" />
        </DescriptionListDetails>
      </div>
      <slot />
    </DescriptionList>
  </div>
</template>

<script setup lang="ts">
import '/proposals/shared/metadata.css'

import { useTranslation } from '/vendor/datagouv-components/src/composables/useTranslation'
import { useComponentsConfig } from '/vendor/datagouv-components/src/config'
import type { DatasetV2WithFullObject } from '/vendor/datagouv-components/src/types/datasets'
import DescriptionList from '/proposals/components/DescriptionList.vue'
import DescriptionListTerm from '/proposals/components/DescriptionListTerm.vue'
import DescriptionListDetails from '/proposals/components/DescriptionListDetails.vue'
import AppLink from '/vendor/datagouv-components/src/components/AppLink.vue'
import CopyButton from '/proposals/components/CopyButton.vue'
import LicenseBadge from '/proposals/components/LicenseBadge.vue'
import Tag from '/proposals/components/Tag.vue'

const props = defineProps<{
  dataset: DatasetV2WithFullObject
  tagUrl?: (tag: string) => string
}>()

const { t } = useTranslation()
const config = useComponentsConfig()

function getTagUrl(tag: string): string {
  if (props.tagUrl) {
    return props.tagUrl(tag)
  }
  const base = config.baseUrl.endsWith('/') ? config.baseUrl.slice(0, -1) : config.baseUrl
  return `${base}/datasets/search?tag=${tag}`
}
</script>
