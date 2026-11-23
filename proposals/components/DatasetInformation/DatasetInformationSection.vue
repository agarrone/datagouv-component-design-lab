<template>
  <div class="proposal-metadata-section">
    <h3 class="proposal-metadata-heading">{{ t('Informations') }}</h3>
    <DescriptionList class="proposal-metadata-list-balanced">
      <div>
        <DescriptionListTerm>{{ t('Mots-clés') }}</DescriptionListTerm>
        <DescriptionListDetails class="proposal-metadata-tags">
          <Tag v-for="tag in dataset.tags" :key="tag" :to="getTagUrl(tag)" class="proposal-metadata-tag">{{ tag }}</Tag>
          <span v-if="!dataset.tags?.length">—</span>
        </DescriptionListDetails>
      </div>
      <div>
        <DescriptionListTerm>{{ t('Identifiant') }}</DescriptionListTerm>
        <DescriptionListDetails class="proposal-metadata-identifier proposal-technical-copy">
          <span v-if="dataset.id" class="proposal-technical-line"><CopyButton icon-only compact :show-tooltip="false" :label="t(`Copier l'identifiant`)" :copied-label="t('Copié')" :text="dataset.id"><code><MiddleTruncate :text="dataset.id" /></code></CopyButton></span>
          <span v-else>—</span>
        </DescriptionListDetails>
      </div>
      <div>
        <DescriptionListTerm>{{ t('Licence') }}</DescriptionListTerm>
        <DescriptionListDetails class="proposal-metadata-identifier proposal-technical-copy">
          <span v-if="licenseTitle" class="proposal-technical-line">
            <template v-if="licenseUrl"><AppLink :to="licenseUrl" external class="proposal-doi-link"><code><MiddleTruncate :text="licenseTitle" /></code></AppLink><CopyButton icon-only compact :show-tooltip="false" :label="t('Copier la licence')" :copied-label="t('Copié')" :text="licenseUrl" /></template>
            <CopyButton v-else icon-only compact :show-tooltip="false" :label="t('Copier la licence')" :copied-label="t('Copié')" :text="licenseTitle"><code><MiddleTruncate :text="licenseTitle" /></code></CopyButton>
          </span>
          <span v-else>—</span>
        </DescriptionListDetails>
      </div>
      <div>
        <DescriptionListTerm>{{ t('DOI') }}</DescriptionListTerm>
        <DescriptionListDetails class="proposal-metadata-identifier proposal-technical-copy">
          <span v-if="doi" class="proposal-technical-line"><AppLink :to="`https://doi.org/${doi}`" external class="proposal-doi-link"><code><MiddleTruncate :text="doi" /></code></AppLink><CopyButton icon-only compact :show-tooltip="false" :label="t('Copier le lien du DOI')" :copied-label="t('Copié')" :text="`https://doi.org/${doi}`" /></span>
          <span v-else>—</span>
        </DescriptionListDetails>
      </div>
      <slot />
    </DescriptionList>
  </div>
</template>

<script setup lang="ts">
import '../../shared/foundations.css'
import '/proposals/shared/metadata.css'
import { computed } from 'vue'
import { useTranslation } from '/vendor/datagouv-components/src/composables/useTranslation'
import { useComponentsConfig } from '/vendor/datagouv-components/src/config'
import type { RouteLocationRaw } from 'vue-router'
import type { DatasetV2WithFullObject } from '/vendor/datagouv-components/src/types/datasets'
import DescriptionList from '/proposals/components/DescriptionList.vue'
import DescriptionListTerm from '/proposals/components/DescriptionListTerm.vue'
import DescriptionListDetails from '/proposals/components/DescriptionListDetails.vue'
import AppLink from '/proposals/components/AppLink.vue'
import CopyButton from '/proposals/components/CopyButton.vue'
import MiddleTruncate from '/proposals/components/MiddleTruncate.vue'
import Tag from '../../../vendor/datagouv-components/src/components/Tag.vue'

const props = defineProps<{ dataset: DatasetV2WithFullObject; tagUrl?: (tag: string) => string | RouteLocationRaw }>()
const { t } = useTranslation()
const config = useComponentsConfig()
const doi = computed(() => props.dataset.doi ?? props.dataset.harvest?.doi ?? null)
const licenseTitle = computed(() => typeof props.dataset.license === 'object'
  ? props.dataset.license?.title || ''
  : props.dataset.license === 'lov2' ? 'Licence Ouverte / Open Licence version 2.0' : props.dataset.license || '')
const licenseUrl = computed(() => typeof props.dataset.license === 'object' ? props.dataset.license?.url || '' : '')
function getTagUrl(tag: string): string | RouteLocationRaw {
  if (props.tagUrl) return props.tagUrl(tag)
  const base = config.baseUrl.endsWith('/') ? config.baseUrl.slice(0, -1) : config.baseUrl
  return `${base}/datasets/search?tag=${tag}`
}
</script>
