<template>
  <!-- Editable segments rather than a text input: the value never goes through a
       locale-dependent parse, and the day/month/year order follows the locale. -->
  <DateFieldRoot
    v-slot="{ segments }"
    v-model="model"
    v-model:placeholder="placeholder"
    :locale="locale"
    granularity="day"
    :min-value="minValue"
    class="lab-date-field"
    :class="model ? 'text-gray-title' : 'text-gray-medium'"
    :aria-label="label"
  >
    <DateFieldInput
      v-for="(item, index) in segments"
      :key="`${index}-${item.part}`"
      :part="item.part"
      class="lab-date-segment"
    >
      {{ item.value }}
    </DateFieldInput>
  </DateFieldRoot>
</template>

<script setup lang="ts">
import '../../shared/foundations.css'
import '../../shared/selection.css'

import { DateFieldInput, DateFieldRoot } from 'reka-ui'
import type { DateValue } from '@internationalized/date'
import { useTranslation } from '../../../vendor/datagouv-components/src/composables/useTranslation'

defineProps<{
  label: string
  minValue?: DateValue
}>()

const model = defineModel<DateValue | undefined>()
// Shared with the calendar and the other field: it is the month on display.
const placeholder = defineModel<DateValue>('placeholder', { required: true })

const { locale } = useTranslation()
</script>
