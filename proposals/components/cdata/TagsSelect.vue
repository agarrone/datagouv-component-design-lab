<template>
  <div>
    <SearchableSelect
      v-model="tags"
      :label="t('Mots clés')"
      :placeholder="t('Chercher un mot clé…')"
      :get-option-id="(tag: Tag) => tag.text"
      :allow-new-option="toTag"
      :suggest="suggestTags"
      :multiple="true"
      class="!mb-0"

      :error-text
      :warning-text
    >
      <template #option="{ option: tag }">
        {{ tag.text }}
      </template>
    </SearchableSelect>
    <div
      v-if="tags.length"
      class="lab-selected-tags"
    >
      <button
        v-for="tag in tags"
        :key="tag.text"
        class="design-lab-tag lab-selected-tag"
        :aria-label="t('Supprimer {tag}', {tag:tag.text})"
        type="button"
        @click="removeTag(tag)"
      >
        {{ tag.text }}
        <RiCloseLine class="lab-ds-icon" data-icon-size="compact" aria-hidden="true" focusable="false" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import '../../shared/foundations.css'
import '../../shared/badge.css'
import {RiCloseLine} from '@remixicon/vue'
import {useTranslation,useNuxtApp} from '../../../src/compat/application/runtime'
import SearchableSelect from '../Form/SearchableSelect.vue'
import type { Tag } from '../../../vendor/cdata-runtime/types/types'

defineProps<{
  errorText?: string | null
  warningText?: string | null
}>()
const tags = defineModel<Array<Tag>>({ required: true })

const { t } = useTranslation()
const { $api } = useNuxtApp()

async function suggestTags(query: string) {
  return await $api<Array<Tag>>('/api/1/tags/suggest/', {
    query: {
      q: query,
      size: 5,
    },
  })
}
function removeTag(tag: Tag) {
  tags.value = tags.value.filter(otherTag => otherTag.text !== tag.text)
}

function toTag(query: string): Tag {
  return {
    text: query.toLocaleLowerCase().replace(/ /g, '-'),
  }
}
</script>
