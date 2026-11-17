<template>
  <div class="proposal-metadata-section">
    <h3 class="proposal-metadata-heading">{{ t('Informations') }}</h3>
    <DescriptionList class="proposal-metadata-list-balanced">
      <div>
        <DescriptionListTerm>{{ t('Mots-clés') }}</DescriptionListTerm>
        <DescriptionListDetails class="proposal-metadata-tags">
          <AppLink v-for="tag in dataset.tags" :key="tag" :to="getTagUrl(tag)" class="fr-raw-link"><Tag type="secondary">{{ tag }}</Tag></AppLink>
          <span v-if="!dataset.tags?.length">—</span>
        </DescriptionListDetails>
      </div>
      <div>
        <DescriptionListTerm>{{ t('Identifiant') }}</DescriptionListTerm>
        <DescriptionListDetails class="proposal-metadata-identifier proposal-technical-copy">
          <span v-if="dataset.id" class="proposal-technical-line"><code><MiddleTruncate :text="dataset.id" /></code><CopyButton icon-only compact :label="t(`Copier l'identifiant`)" :copied-label="t('Copié')" :text="dataset.id" /></span>
          <span v-else>—</span>
        </DescriptionListDetails>
      </div>
      <div>
        <DescriptionListTerm>{{ t('Licence') }}</DescriptionListTerm>
        <DescriptionListDetails><LicenseBadge v-if="dataset.license" :license="dataset.license" /><span v-else>—</span></DescriptionListDetails>
      </div>
      <div>
        <DescriptionListTerm>{{ t('DOI') }}</DescriptionListTerm>
        <DescriptionListDetails class="proposal-metadata-identifier proposal-technical-copy">
          <span v-if="doi" class="proposal-technical-line"><AppLink :to="`https://doi.org/${doi}`" external class="proposal-doi-link"><code><MiddleTruncate :text="doi" /></code></AppLink><CopyButton icon-only compact :label="t('Copier le DOI')" :copied-label="t('Copié')" :text="doi" /></span>
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
import LicenseBadge from '/proposals/components/LicenseBadge.vue'
import Tag from '/proposals/components/Tag.vue'

const props = defineProps<{ dataset: DatasetV2WithFullObject; tagUrl?: (tag: string) => string | RouteLocationRaw }>()
const { t } = useTranslation()
const config = useComponentsConfig()
const doi = computed(() => props.dataset.doi ?? props.dataset.harvest?.doi ?? null)
function getTagUrl(tag: string): string | RouteLocationRaw {
  if (props.tagUrl) return props.tagUrl(tag)
  const base = config.baseUrl.endsWith('/') ? config.baseUrl.slice(0, -1) : config.baseUrl
  return `${base}/datasets/search?tag=${tag}`
}
</script>
