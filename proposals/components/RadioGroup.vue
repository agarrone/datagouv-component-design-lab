<template>
  <fieldset class="lab-radio-group">
    <legend
      v-if="legend"
      class="fr-label mb-2"
    >
      {{ legend }}
    </legend>
    <slot />
  </fieldset>
</template>

<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/selection.css'

import { provide, toRef } from 'vue'
import { radioGroupInjectionKey } from '../../vendor/datagouv-components/src/components/radioGroupContext'

const props = defineProps<{
  modelValue: string
  name: string
  legend?: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

provide(radioGroupInjectionKey, {
  name: toRef(() => props.name),
  modelValue: toRef(() => props.modelValue),
  select: (value: string) => emit('update:modelValue', value),
})
</script>
