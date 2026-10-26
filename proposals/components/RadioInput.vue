<template>
  <label
    class="lab-radio"
    :data-selected="isSelected"
    :data-highlighted="highlighted"
  >
    <input
      type="radio"
      :disabled="disabled"
      :name="group?.name.value"
      :value="value"
      :checked="isSelected"
      class="lab-radio-native"
      @change="group?.select(value)"
    >
    <component
      :is="icon"
      v-if="icon && typeof icon !== 'string'"
      class="lab-ds-icon" data-icon-size="base" aria-hidden="true" focusable="false"
    />
    <span
      v-else-if="icon"
      :class="icon"
      aria-hidden="true"
    />
    <span class="lab-radio-label">
      <slot />
    </span>
    <span
      v-if="loading || count !== undefined"
      data-testid="radio-count"
      class="text-xs font-bold px-1 py-0.5 rounded"
      :class="isSelected && highlighted ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'"
    >
      <BouncingDots v-if="loading" />
      <template v-else>{{ formattedCount }}</template>
    </span>
  </label>
</template>

<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/selection.css'

import { computed, inject, type Component } from 'vue'
import { radioGroupInjectionKey } from '../../vendor/datagouv-components/src/components/radioGroupContext'
import { useTranslation } from '../../vendor/datagouv-components/src/composables/useTranslation'
import BouncingDots from './BouncingDots.vue'

type Props = {
  value: string
  count?: number
  loading?: boolean
  icon?: Component | string
  disabled?: boolean
  highlighted?: boolean
}

const props = defineProps<Props>()

const group = inject(radioGroupInjectionKey)
const { locale } = useTranslation()

const isSelected = computed(() => group?.modelValue.value === props.value)


const formattedCount = computed(() => {
  if (props.count === undefined) return ''
  return new Intl.NumberFormat(locale, { notation: 'compact' }).format(props.count)
})
</script>
