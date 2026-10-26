<template>
  <section class="lab-search-field">
    <label
      class="sr-only"
      :for="id"
    >
      {{ t('Recherche') }}
    </label>
    <input
      :id="id"
      ref="inputRef"
      v-model="q"
      type="search"
      name="q"
      class="lab-input"
      :aria-label="placeholder === null ? t('Rechercher...') : placeholder ?? t('Rechercher...')"
      :placeholder="placeholder === null ? undefined : placeholder ?? t('Rechercher...')"
    >
    <BrandedButton
      class="lab-search-submit"
      :title="t('Rechercher')"
      size="sm"
      color="primary"
      :icon="RiSearchLine"
      icon-only
      type="submit"
    >
      {{ t('Recherche') }}
    </BrandedButton>
  </section>
</template>

<script setup lang="ts">
import '../../shared/foundations.css'
import '../../shared/inputs.css'

import { nextTick, onMounted, useId, useTemplateRef } from 'vue'
import { RiSearchLine } from '@remixicon/vue'
import { useTranslation } from '../../../vendor/datagouv-components/src/composables/useTranslation'
import BrandedButton from '../BrandedButton.vue'

const q = defineModel<string>({ required: true })

const props = withDefaults(defineProps<{
  placeholder?: string | null
  autoFocus?: boolean
}>(), {
  autoFocus: true,
})

const { t } = useTranslation()

const id = useId()

const input = useTemplateRef<HTMLInputElement>('inputRef')

const focus = () => {
  input.value?.focus({
    preventScroll: true,
  })
}

onMounted(async () => {
  if (!props.autoFocus) return
  await nextTick()
  focus()
})
</script>
