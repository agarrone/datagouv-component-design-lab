<template>
  <div
    class="lab-field fr-select-group"
    :class="selectGroupClass"
  >
    <label
      v-if="!hideLabel"
      class="fr-label"
      :for="id"
    >
      {{ label }}
      <span
        v-if="required"
        class="text-new-primary"
      >*</span>
      <span
        v-if="hintText"
        class="fr-hint-text" :id="`${id}-hint`"
      >{{ hintText }}</span>
    </label>
    <select
      :id="id"
      v-model="model"
      class="lab-input fr-select"
      :class="{ 'fr-select--error': hasError, 'fr-select--valid': isValid && !hasError }"
      :aria-describedby="[ariaDescribedBy, hintText && !hideLabel ? `${id}-hint` : undefined].filter(Boolean).join(' ') || undefined"
      :aria-invalid="hasError ? true : undefined"
      :aria-label="hideLabel ? label : undefined"
      :required="required"
      :disabled="disabled"
    >
      <option
        v-if="! hideNullOption"
        :value="null"
        disabled
        hidden
      >
        {{ t('Sélectionner une option') }}
      </option>
      <option
        v-for="option in options"
        :key="String(option.value ?? option.label)"
        :value="option.value"
        :disabled="option.disabled"
        :hidden="option.hidden"
      >
        {{ option.label }}
      </option>
    </select>
    <p
      v-if="isValid && !hasError"
      :id="validTextId"
      class="fr-valid-text"
    >
      {{ validText }}
    </p>
    <p
      v-else-if="hasError"
      :id="errorTextId"
      class="fr-error-text"
    >
      {{ errorText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import '../../shared/foundations.css'
import '../../shared/inputs.css'

import { computed, useId } from 'vue'
import { useTranslation } from '../../../vendor/datagouv-components/src/composables/useTranslation'

export type SelectOption = {
  label: string
  value?: string | boolean | null | undefined
  disabled?: boolean
  hidden?: boolean
  selected?: boolean
}

export type SelectGroupProps = {
  disabled?: boolean
  errorText?: string | null
  hasError?: boolean
  hintText?: string
  isValid?: boolean
  label: string
  hideLabel?: boolean
  modelValue?: string | boolean | null
  options: Array<SelectOption>
  required?: boolean
  validText?: string
  hideNullOption?: boolean
}

const model = defineModel<string | boolean | null>()

const props = withDefaults(defineProps<SelectGroupProps>(), {
  disabled: false,
  errorText: '',
  hasError: false,
  hintText: '',
  isValid: false,
  modelValue: undefined,
  required: false,
  validText: '',
  hideLabel: false,
  hideNullOption: false,
})

const { t } = useTranslation()

const id = useId()

const errorTextId = computed(() => id + '-desc-error')
const validTextId = computed(() => id + '-desc-valid')
const ariaDescribedBy = computed(() => props.hasError ? errorTextId.value : props.isValid ? validTextId.value : undefined)

const selectGroupClass = computed(() => {
  return {
    'fr-select-group--disabled': props.disabled,
    'fr-select-group--error': props.hasError,
    'fr-select-group--valid': props.isValid && !props.hasError,
  }
})
</script>
