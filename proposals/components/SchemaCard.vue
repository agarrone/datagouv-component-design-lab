<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/cards.css'
import '../shared/metadata.css'

import { computed } from 'vue'
import { RiCheckLine, RiNodeTree } from '@remixicon/vue'
import type { RegisteredSchema, Schema } from '/vendor/datagouv-components/src/types/schemas'
import { useComponentsConfig } from '/vendor/datagouv-components/src/config'
import { useGetSchemaDocumentation } from '/vendor/datagouv-components/src/functions/schemas'
import AppLink from './AppLink.vue'
import Tag from './Tag.vue'

type DisplaySchema = Partial<RegisteredSchema> & Schema & {
  title?: string
  description?: string
  labels?: string[]
  examples?: Array<{ path: string; title: string }>
  schema_type?: 'tableschema' | 'jsonschema'
}

const props = withDefaults(defineProps<{
  schema: DisplaySchema
  id?: string
  selectable?: boolean
  active?: boolean
  selected?: boolean
  showLinks?: boolean
  titleLevel?: 'h3' | 'h4' | 'h5' | 'h6'
}>(), { titleLevel: 'h3' })

const config = useComponentsConfig()
const getDocumentation = useGetSchemaDocumentation()
const title = computed(() => props.schema.title || props.schema.name || props.schema.url || 'Schéma de données')
const identifier = computed(() => props.schema.name || props.schema.url || '—')
const documentationUrl = computed(() => props.schema.name ? getDocumentation(props.schema.name) : props.schema.url || null)
const typeLabel = computed(() => props.schema.schema_type === 'jsonschema' ? 'JSON Schema' : props.schema.schema_type === 'tableschema' ? 'Table Schema' : null)
</script>

<template>
  <article
    :id="id"
    class="lab-object-card lab-schema-card"
    :class="{ 'lab-schema-card-active': active }"
    :role="selectable ? 'option' : undefined"
    :tabindex="selectable ? -1 : undefined"
    :aria-selected="selectable ? !!selected : undefined"
  >
    <header class="lab-schema-heading">
      <RiNodeTree class="lab-ds-icon lab-schema-icon" data-icon-size="base" aria-hidden="true" focusable="false" />
      <component :is="titleLevel" class="lab-card-heading">{{ title }}</component>
      <RiCheckLine v-if="selected" class="lab-ds-icon lab-schema-selected" data-icon-size="base" aria-hidden="true" focusable="false" />
    </header>

    <p class="lab-schema-identifier proposal-metadata-technical">{{ identifier }}</p>

    <div v-if="schema.labels?.length || typeLabel" class="lab-schema-tags" aria-label="Caractéristiques du schéma">
      <Tag v-for="label in schema.labels" :key="label" type="secondary">{{ label }}</Tag>
      <Tag v-if="typeLabel" type="secondary">{{ typeLabel }}</Tag>
    </div>

    <p v-if="schema.description" class="lab-schema-description">{{ schema.description }}</p>

    <footer v-if="showLinks" class="lab-schema-links">
      <AppLink v-if="documentationUrl" :to="documentationUrl" target="_blank">Lire la documentation</AppLink>
      <AppLink v-for="example in schema.examples || []" :key="example.path" :to="example.path" target="_blank">{{ example.title }}</AppLink>
      <AppLink v-if="schema.name" :to="`${config.baseUrl}/datasets/search?schema=${schema.name}`" target="_blank">Voir les jeux de données</AppLink>
    </footer>
  </article>
</template>

<style scoped>
.lab-schema-card{display:flex;flex-direction:column;gap:var(--lab-ds-space-8)}
.lab-schema-heading{display:flex;align-items:flex-start;gap:var(--lab-ds-space-8);min-width:0}
.lab-schema-heading .lab-card-heading{flex:1;min-width:0}
.lab-schema-icon,.lab-schema-selected{flex:none;margin-top:var(--lab-ds-space-4)}
.lab-schema-selected{color:var(--lab-ds-brand)}
.lab-schema-identifier,.lab-schema-description{margin:0}
.lab-schema-identifier{color:var(--lab-ds-text)}
.lab-schema-description{color:var(--lab-ds-text-secondary);font:var(--lab-ds-weight-regular) var(--lab-ds-text-body)/var(--lab-ds-leading-body) var(--lab-ds-font-sans)}
.lab-schema-tags{margin:0}
.lab-schema-links{display:flex;flex-wrap:wrap;gap:var(--lab-ds-space-8) var(--lab-ds-space-16);margin-top:var(--lab-ds-space-8);font-size:var(--lab-ds-text-body);line-height:var(--lab-ds-leading-control)}
.lab-schema-card-active{outline:var(--lab-ds-focus-width) solid var(--lab-ds-focus);outline-offset:var(--lab-ds-focus-offset)}
</style>
