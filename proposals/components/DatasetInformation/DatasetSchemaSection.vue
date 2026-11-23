<template>
  <div
    v-if="schemas && schemas.length"
    class="proposal-metadata-section"
  >
    <div class="proposal-metadata-heading-row proposal-schema-heading">
      <Tooltip
        v-if="config.schemasSiteUrl && config.schemasSiteName"
        as="span"
        class="proposal-schema-info"
        :aria-label="t('À propos des schémas de données')"
      >
        <RiInformationLine class="lab-ds-icon" data-icon-size="base" aria-hidden="true" focusable="false" />
        <template #tooltip>
          {{ t("Les schémas de données permettent de décrire des modèles de données, découvrez comment les schémas améliorent la qualité des données et quels sont les cas d'usages possibles sur") }}
          <AppLink :to="config.schemasSiteUrl" external>{{ config.schemasSiteName }}</AppLink>.
        </template>
      </Tooltip>
      <h3 class="proposal-metadata-heading">
        {{ t('Schéma de données') }}
      </h3>
    </div>
    <div class="proposal-schema-list">
      <SchemaCard
        v-for="schema in schemas"
        :key="schema.name || schema.url"
        :schema="schema"
        show-links
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import '../../shared/foundations.css'
import '/proposals/shared/metadata.css'

import { computed, unref } from 'vue'
import { RiInformationLine } from '@remixicon/vue'
import { useTranslation } from '/vendor/datagouv-components/src/composables/useTranslation'
import { useComponentsConfig } from '/vendor/datagouv-components/src/config'
import { useFetch } from '/vendor/datagouv-components/src/functions/api'
import { useGetCatalog } from '/vendor/datagouv-components/src/functions/schemas'
import type { Dataset, DatasetV2, DatasetV2WithFullObject } from '/vendor/datagouv-components/src/types/datasets'
import type { RegisteredSchema, Schema } from '/vendor/datagouv-components/src/types/schemas'
import SchemaCard from '/vendor/datagouv-components/src/components/SchemaCard.vue'
import Tooltip from '/vendor/datagouv-components/src/components/Tooltip.vue'
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
.proposal-schema-heading{align-items:center}
.proposal-schema-info{display:inline-flex;align-items:center;justify-content:center;flex:none;line-height:0;color:var(--lab-ds-text-secondary)}
.proposal-schema-info :deep(> span){display:inline-flex;align-items:center;justify-content:center}
.proposal-schema-info :deep(svg){width:var(--lab-ds-icon);height:var(--lab-ds-icon)}
</style>
