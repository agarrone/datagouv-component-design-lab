<template>
  <div
    v-if="schemas && schemas.length"
    class="proposal-metadata-section"
  >
    <h3 class="proposal-metadata-heading">
      {{ t('Schéma de données') }}
    </h3>
    <div class="proposal-schema-list">
      <SchemaCard
        v-for="schema in schemas"
        :key="schema.name || schema.url"
        :schema="schema"
        show-links
        title-level="h4"
      />
      <p
        v-if="config.schemasSiteUrl && config.schemasSiteName"
        class="proposal-schema-help"
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

import { computed, unref } from 'vue'
import { useTranslation } from '/vendor/datagouv-components/src/composables/useTranslation'
import { useComponentsConfig } from '/vendor/datagouv-components/src/config'
import { useFetch } from '/vendor/datagouv-components/src/functions/api'
import { useGetCatalog } from '/vendor/datagouv-components/src/functions/schemas'
import type { Dataset, DatasetV2, DatasetV2WithFullObject } from '/vendor/datagouv-components/src/types/datasets'
import type { RegisteredSchema, Schema } from '/vendor/datagouv-components/src/types/schemas'
import SchemaCard from '/proposals/components/SchemaCard.vue'
import TranslationT from '/vendor/datagouv-components/src/components/TranslationT.vue'
import AppLink from '/proposals/components/AppLink.vue'

const props = defineProps<{
  dataset: Dataset | DatasetV2 | DatasetV2WithFullObject
}>()

const { t } = useTranslation()
const config = useComponentsConfig()

const { data } = await useFetch<Array<Schema>>(`/api/2/datasets/${props.dataset.id}/schemas/`)
let catalog: Array<RegisteredSchema> = []
try {
  catalog = await useGetCatalog()()
}
catch {
  catalog = []
}
const schemas = computed(() => (unref(data) || []).map((schema) => {
  const registered = schema.name ? catalog.find(item => item.name === schema.name) : null
  return registered ? { ...registered, ...schema } : {
    ...schema,
    title: schema.name || schema.url || t('Schéma de données'),
    description: '',
    labels: [],
    examples: [],
  }
}))
</script>

<style scoped>
.proposal-schema-list{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--lab-metadata-row-gap)}
.proposal-schema-help{grid-column:1/-1;margin:0;color:var(--lab-ds-text-secondary);font-size:var(--lab-ds-text-body);line-height:var(--lab-ds-leading-body)}
</style>
