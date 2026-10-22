<template>
  <th class="lab-table-th" scope="col" :aria-sort="sorted==='asc'?'ascending':sorted==='desc'?'descending':sortable?'none':undefined">
    <div
      class="flex items-center whitespace-nowrap"
      :class="{
        'justify-between': !align,
        'justify-start': align === 'left',
        'justify-center': align === 'center',
        'justify-end': align === 'right',
      }"
    >
      <slot />
      <BrandedButton
        v-if="sortable"
        color="tertiary"
        size="2xs"
        class="shrink-0 ml-2"
        icon-only
        :icon="sorted === 'asc' ? RiArrowUpLine : RiArrowDownLine"
        :class="sorted ? '' : 'opacity-50'"
        :title="sorted === 'desc' ? t('Trier par ordre croissant') : t('Trier par ordre décroissant')"
        @click="toggleSort"
      />
    </div>
  </th>
</template>

<script setup lang="ts">
import '../../../../shared/foundations.css'
import '../../../../shared/tables.css'
import BrandedButton from '../../../BrandedButton.vue'
import {useTranslation} from '../../../../../vendor/datagouv-components/src/composables/useTranslation'
import { RiArrowDownLine, RiArrowUpLine } from '@remixicon/vue'
import { computed } from 'vue'
import type { SortDirection } from '~/types/types'

export type AdminTableThProps = {
  sorted?: SortDirection | null
  align?: 'left' | 'center' | 'right'
}

const props = defineProps<AdminTableThProps>()

const emit = defineEmits<{
  (event: 'sort', direction: SortDirection): void
}>()

const { t } = useTranslation()

const sortable = computed(() => props.sorted !== undefined)

function toggleSort() {
  if (props.sorted === 'desc') {
    return emit('sort', 'asc')
  }
  return emit('sort', 'desc')
}
</script>

