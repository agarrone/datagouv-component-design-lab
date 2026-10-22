<template>
  <Listbox v-model="model">
    <div class="lab-selection relative min-w-0">
      <div
        ref="floatingReference"
        class="relative w-full cursor-default overflow-hidden bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
      >
        <ListboxButton class="lab-input input shadow-input text-sm flex items-center gap-2">
          <slot name="button">
            <div class="w-full flex items-center justify-between gap-2">
              <div
                class="truncate"
                :class="{ 'text-new-disabled-text': isDisabled(model) }"
              >
                {{ displayValue(model) }}
              </div>
              <RiArrowDownSLine data-icon-size="base" aria-hidden="true" focusable="false" class="lab-ds-icon flex-none size-4 justify-self-end" />
            </div>
          </slot>
        </ListboxButton>
      </div>

      <Teleport to="#tooltips">
      <ListboxOptions
        ref="popover"
        :style="floatingStyles"
        class="lab-selection-menu"
      >
        <ListboxOption
          v-for="option in options"
          :key="getOptionId(toValue(option))"
          v-slot="{ active, selected }"
          as="template"
          :value="option"
          :disabled="isDisabled(toValue(option))"
        >
          <li
            class="relative cursor-default select-none py-2 pr-4 list-none flex items-center gap-2 text-gray-900"
            :class="{
              'bg-gray-lower': active && !isDisabled(toValue(option)),
              'text-new-disabled-text': isDisabled(toValue(option)),
              'pl-2': selected,
              'pl-6': !selected,
            }"
          >
            <div class="flex items-center justify-center aspect-square">
              <RiCheckLine
 data-icon-size="base" aria-hidden="true" focusable="false"                v-if="selected"
                class="lab-ds-icon size-4"
                :class="isDisabled(toValue(option)) ?' text-new-disabled-text' : 'text-new-primary'"
              />
            </div>
            <slot
              name="option"
              v-bind="{ option, active }"
            >
              {{ displayValue(option) }}
            </slot>
          </li>
        </ListboxOption>
      </ListboxOptions>
      </Teleport>
    </div>
  </Listbox>
</template>

<script setup lang="ts" generic="T extends string | number | object">
import '../../shared/foundations.css'
import '../../shared/selection.css'
import '../../shared/inputs.css'

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { useFloating, autoUpdate, autoPlacement, size } from '@floating-ui/vue'
import { toValue, useTemplateRef } from 'vue'
import { RiArrowDownSLine, RiCheckLine } from '@remixicon/vue'

withDefaults(defineProps<{
  options?: Array<T>
  getOptionId?: (option: T) => string | number
  displayValue: (option: T | null) => string
  isDisabled?: (option: T | null) => boolean
}>(), {
  getOptionId: (option: T): string | number => {
    if (typeof option === 'string') return option
    if (typeof option === 'number') return option
    if (typeof option === 'object' && 'id' in option) return option.id as string

    throw new Error('Please set getOptionId()')
  },
  isDisabled: (option: T | null): boolean => {
    if (option && typeof option === 'object' && 'disabled' in option) return option.disabled as boolean

    return false
  },
})

const model = defineModel<T | null>({ required: true })

const referenceRef = useTemplateRef('floatingReference')
const floatingRef = useTemplateRef<InstanceType<typeof ListboxOptions>>('popover')
const { floatingStyles } = useFloating(referenceRef, floatingRef, {
  strategy: 'fixed',
  middleware: [size({padding:16,apply({rects,elements,availableWidth,availableHeight}){
    Object.assign(elements.floating.style,{width:`${Math.max(0,Math.min(rects.reference.width,availableWidth))}px`,maxHeight:`${Math.max(0,Math.min(240,availableHeight))}px`})
  }}),autoPlacement({
    allowedPlacements: ['bottom-start', 'bottom', 'bottom-end'],
    crossAxis: true,
  })],
  whileElementsMounted: autoUpdate,
})
</script>
