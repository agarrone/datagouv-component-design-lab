<template>
  <ClientOnly>
    <Teleport to="#tooltips">
      <div
        v-if="cell"
        ref="panel"
        class="bg-white border border-black/10 rounded-lg shadow-md w-80 absolute z-[800]"
        :style="floatingStyles"
      >
        <!-- Value -->
        <div class="px-3 pt-3 pb-2 border-b lab-ds-u-border-gray-default">
          <p class="lab-ds-u-text-xs lab-ds-u-text-gray-medium mb-0">
            {{ t('Valeur brute') }}
          </p>
          <p
            class="lab-ds-u-text-xs lab-ds-u-text-gray-title mb-0"
            data-testid="cell-raw-value"
          >
            {{ displayValue }}
          </p>
        </div>

        <!-- Type -->
        <div class="flex items-center gap-2 px-3 py-2 border-b lab-ds-u-border-gray-default">
          <span class="lab-ds-u-text-xs lab-ds-u-text-gray-medium">{{ t('Type') }}</span>
          <span class="inline-flex items-center gap-1 lab-ds-u-bg-gray-some lab-ds-u-rounded px-1.5 py-0.5 lab-ds-u-text-xs lab-ds-u-text-gray-medium">
            <component
              :is="typeIcon"
              class="lab-ds-icon" data-icon-size="compact" focusable="false"
              aria-hidden="true"
            />
            {{ typeLabel }}
          </span>
          <span class="lab-ds-u-text-xs lab-ds-u-text-gray-medium shrink-0">·</span>
          <span class="lab-ds-u-text-xs lab-ds-u-text-gray-medium truncate min-w-0">{{ cell.column }}</span>
        </div>

        <!-- Actions -->
        <div class="p-1">
          <button
            class="flex items-center lab-ds-u-gap-2 w-full px-3 py-2 lab-ds-u-rounded lab-ds-u-text-xs font-medium hover:bg-gray-50"
            @click="filterByValue"
          >
            <RiFilterLine data-icon-size="base" focusable="false"
              class="lab-ds-icon"
              aria-hidden="true"
            />
            {{ t('Filtrer par cette valeur') }}
          </button>
          <CopyButton :text="displayValue" :label="t('Copier la valeur')" :copied-label="t('Valeur copiée')" />
        </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import '/proposals/shared/foundations.css'
import { computed, ref, useTemplateRef, watch } from 'vue'
import { flip, shift, autoUpdate, useFloating } from '@floating-ui/vue'
import { onClickOutside } from '@vueuse/core'
import {
  RiFilterLine,
  RiFileCopyLine,
  RiCheckLine,
} from '@remixicon/vue'
import CopyButton from '/proposals/components/CopyButton.vue'
import { useTranslation } from '/vendor/datagouv-components/src/composables/useTranslation'
import { buildCellValueFilter, buildTypeConfig } from '/vendor/datagouv-components/src/functions/tabular'
import ClientOnly from '/vendor/datagouv-components/src/components/ClientOnly.vue'
import type { ColumnType, ColumnFilters } from '/vendor/datagouv-components/src/components/TabularExplorer/types'

export interface CellInfo {
  column: string
  columnType: ColumnType
  value: unknown
  element: HTMLElement
}

const cell = defineModel<CellInfo | null>('cell', { default: null })
const filters = defineModel<Record<string, ColumnFilters>>('filters', { default: () => ({}) })

const { t } = useTranslation()

const panelRef = useTemplateRef<HTMLElement>('panel')
const anchorRef = ref<HTMLElement | null>(null)

watch(cell, (c) => {
  anchorRef.value = c?.element ?? null
})

const { floatingStyles } = useFloating(anchorRef, panelRef, {
  placement: 'bottom-start',
  middleware: [flip(), shift()],
  whileElementsMounted: autoUpdate,
})

const displayValue = computed(() => {
  if (!cell.value) return ''
  const v = cell.value.value
  if (v == null || v === '') return '–'
  if (typeof v === 'object') return JSON.stringify(v)
  return String(v)
})

const typeConfig = buildTypeConfig(t)

const typeIcon = computed(() => cell.value ? typeConfig[cell.value.columnType].icon : typeConfig.text.icon)
const typeLabel = computed(() => cell.value ? typeConfig[cell.value.columnType].label : '')

function close() {
  cell.value = null
}

function filterByValue() {
  if (!cell.value) return
  const col = cell.value.column
  filters.value = {
    ...filters.value,
    [col]: buildCellValueFilter(cell.value.columnType, cell.value.value, filters.value[col] ?? {}),
  }
  close()
}

onClickOutside(panelRef, (e) => {
  if (!cell.value) return
  const clickedCell = (e.target as HTMLElement).closest('[data-cell]')
  if (clickedCell && clickedCell === cell.value.element) return
  close()
})
</script>
