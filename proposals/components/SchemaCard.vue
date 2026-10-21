<template>
  <div
    :id
    class="lab-content-card lab-schema-card relative border lab-ds-u-bg-white"
    :class="{
      'lab-ds-u-border-gray-default': !selected && !active,
      'border-datagouv': selected && !active,
      'border-blue-outline': active,
    }"
    :role="selectable ? 'option' : undefined"
    :tabindex="selectable ? -1 : undefined"
    :aria-selected="selectable && selected"
  >
    <h3 class="lab-card-heading flex items-start lab-ds-u-gap-2 lab-ds-u-pr-8">
      <RiNodeTree data-icon-size="base" focusable="false" aria-hidden="true" class="shrink-0 lab-ds-u-mt-1 lab-ds-icon" />
      {{ schema.title }}
    </h3>
    <p
      v-for="label in schema.labels"
      :key="label"
      class="flex items-center lab-ds-u-gap-1 lab-ds-u-text-sm mb-0"
    >
      <span class="flex items-center lab-ds-u-gap-1 lab-ds-u-text-gray-medium">
        <RiInformationLine data-icon-size="base" focusable="false" aria-hidden="true" class=" lab-ds-icon" /> {{ t('Label :') }}
      </span>
      <span>{{ label }}</span>
    </p>
    <p class="flex items-center lab-ds-u-gap-1 lab-ds-u-text-sm mb-0">
      <span class="flex items-center lab-ds-u-gap-1 lab-ds-u-text-gray-medium">
        <RiInformationLine data-icon-size="base" focusable="false" aria-hidden="true" class=" lab-ds-icon" /> {{ t('Standard :') }}
      </span>
      <span>{{ schema.schema_type }}</span>
    </p>
    <p class="lab-ds-u-text-sm lab-ds-u-mt-2 mb-0 lab-ds-u-text-gray-medium">
      {{ schema.description }}
    </p>
    <p
      v-if="showLinks"
      class="lab-ds-u-mt-4 mb-0 flex flex-col lab-ds-u-gap-2 lab-ds-u-text-sm"
    >
      <AppLink
        class="lab-proposal-link link"
        target="_blank"
        :to="getDocumentation(schema.name)"
      >
        {{ t('Lire la documentation du schéma') }}
      </AppLink>
      <AppLink
        v-for="example in schema.examples"
        :key="example.path"
        class="lab-proposal-link link"
        target="_blank"
        :to="example.path"
      >
        {{ example.title }}
      </AppLink>
      <AppLink
        class="lab-proposal-link link"
        target="_blank"
        :to="`${config.baseUrl}/datasets/search?schema=${schema.name}`"
      >
        {{ t('Explorer les fichiers sur data.gouv.fr') }}
      </AppLink>
    </p>
    <RiCheckLine data-icon-size="major" focusable="false" aria-hidden="true"
      v-if="selected"
      class="lab-schema-selected-icon absolute top-4 right-4 lab-ds-icon"
    />
  </div>
</template>

<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/cards.css'
import { RiCheckLine, RiInformationLine, RiNodeTree } from '@remixicon/vue'
import AppLink from '../../vendor/datagouv-components/src/components/AppLink.vue'
import { useTranslation } from '../../vendor/datagouv-components/src/composables/useTranslation'
import { useGetSchemaDocumentation } from '../../vendor/datagouv-components/src/functions/schemas'
import type { RegisteredSchema } from '../../vendor/datagouv-components/src/types/schemas'
import { useComponentsConfig } from '../../vendor/datagouv-components/src/config'

defineProps<{
  schema: RegisteredSchema
  id?: string
  selectable?: boolean
  // Highlighted by the keyboard inside the listbox, which is not the same as chosen
  active?: boolean
  selected?: boolean
  showLinks?: boolean
}>()

const { t } = useTranslation()
const config = useComponentsConfig()
const getDocumentation = useGetSchemaDocumentation()
</script>
