<template>
  <div
    :id
    class="lab-content-card lab-schema-card relative border bg-white"
    :class="{
      'border-gray-default': !selected && !active,
      'border-datagouv': selected && !active,
      'border-blue-outline': active,
    }"
    :role="selectable ? 'option' : undefined"
    :tabindex="selectable ? -1 : undefined"
    :aria-selected="selectable && selected"
  >
    <h3 class="lab-card-heading flex items-start gap-2 pr-8">
      <RiNodeTree class="size-4 shrink-0 mt-1" />
      {{ schema.title }}
    </h3>
    <p
      v-for="label in schema.labels"
      :key="label"
      class="flex items-center gap-1 text-sm mb-0"
    >
      <span class="flex items-center gap-1 text-gray-medium">
        <RiInformationLine class="size-3" /> {{ t('Label :') }}
      </span>
      <span>{{ label }}</span>
    </p>
    <p class="flex items-center gap-1 text-sm mb-0">
      <span class="flex items-center gap-1 text-gray-medium">
        <RiInformationLine class="size-3" /> {{ t('Standard :') }}
      </span>
      <span>{{ schema.schema_type }}</span>
    </p>
    <p class="text-sm mt-2 mb-0 text-gray-medium">
      {{ schema.description }}
    </p>
    <p
      v-if="showLinks"
      class="mt-4 mb-0 flex flex-col gap-2 text-sm"
    >
      <AppLink
        class="link"
        target="_blank"
        :to="getDocumentation(schema.name)"
      >
        {{ t('Lire la documentation du schéma') }}
      </AppLink>
      <AppLink
        v-for="example in schema.examples"
        :key="example.path"
        class="link"
        target="_blank"
        :to="example.path"
      >
        {{ example.title }}
      </AppLink>
      <AppLink
        class="link"
        target="_blank"
        :to="`${config.baseUrl}/datasets/search?schema=${schema.name}`"
      >
        {{ t('Explorer les fichiers sur data.gouv.fr') }}
      </AppLink>
    </p>
    <RiCheckLine
      v-if="selected"
      class="size-6 fill-datagouv absolute top-4 right-4"
    />
  </div>
</template>

<script setup lang="ts">
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
