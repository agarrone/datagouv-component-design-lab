<template>
  <div
    v-if="schemas && schemas.length"
    class="proposal-metadata-section"
  >
    <h3 class="proposal-metadata-heading">
      {{ t('Schéma de données') }}
    </h3>
    <div class="space-y-4">
      <div
        v-for="schema, index in schemas"
        :key="index"
        class="proposal-metadata-schema"
      >
        <p class="lab-ds-u-text-sm mb-0">
          {{ t('Les fichiers du jeu de données suivent le schéma :') }}
          <Tag
            type="secondary"
            :icon="RiCodeBoxLine"
          >
            {{ schema.name || schema.url }}
          </Tag>
        </p>
        <div v-if="schema.url || (schema.name && config.schemasSiteUrl)">
          <BrandedButton :icon-attrs="{class:'lab-ds-icon', 'data-icon-size':'base', focusable:'false'}"
            color="secondary"
            size="xs"
            :icon="RiBook2Line"
            :href="schema.url ? schema.url : `${config.schemasSiteUrl.replace(/\/$/, '')}/${schema.name}`"
          >
            {{ t('Voir la documentation du schéma') }}
          </BrandedButton>
        </div>
      </div>
      <p
        v-if="config.schemasSiteUrl && config.schemasSiteName"
        class="lab-ds-u-text-sm"
      >
        <TranslationT keypath="Les schémas de données permettent de décrire des modèles de données, découvrez comment les schémas améliorent la qualité des données et quels sont les cas d'usages possibles sur {link}">
          <template #link>
            <AppLink
              :to="config.schemasSiteUrl"
              external
            >
              {{ config.schemasSiteName }}
            </AppLink>
          </template>
        </TranslationT>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import '../../shared/foundations.css'
import '/proposals/shared/metadata.css'

import { RiBook2Line, RiCodeBoxLine } from '@remixicon/vue'
import { useTranslation } from '/vendor/datagouv-components/src/composables/useTranslation'
import { useComponentsConfig } from '/vendor/datagouv-components/src/config'
import { useFetch } from '/vendor/datagouv-components/src/functions/api'
import type { Dataset, DatasetV2, DatasetV2WithFullObject } from '/vendor/datagouv-components/src/types/datasets'
import type { Schema } from '/vendor/datagouv-components/src/types/schemas'
import Tag from '/proposals/components/Tag.vue'
import BrandedButton from '/vendor/datagouv-components/src/components/BrandedButton.vue'
import TranslationT from '/vendor/datagouv-components/src/components/TranslationT.vue'
import AppLink from '/vendor/datagouv-components/src/components/AppLink.vue'

const props = defineProps<{
  dataset: Dataset | DatasetV2 | DatasetV2WithFullObject
}>()

const { t } = useTranslation()
const config = useComponentsConfig()

const { data } = await useFetch<Array<Schema>>(`/api/2/datasets/${props.dataset.id}/schemas/`)
const schemas = data
</script>
