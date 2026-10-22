<template>
  <div
    v-if="activeFilters.length > 0 || sort || globalSearch"
    class="flex items-center justify-between gap-2"
  >
    <div class="flex min-w-0 flex-wrap items-center gap-1.5">
      <!-- Sort chip -->
      <span
        v-if="sort"
        class="design-lab-tag"
      >
        <component
          :is="sort.direction === 'asc' ? RiArrowUpLine : RiArrowDownLine"
          class="lab-ds-icon" data-icon-size="compact" focusable="false"
          aria-hidden="true"
        />
        <span class="font-medium">{{ sort.column }}</span>
        <span>{{ sort.direction === 'asc' ? t('croissant') : t('décroissant') }}</span>
        <button
          :aria-label="t('Supprimer le tri')"
          class="lab-filter-tag-close"
          @click="sort = null"
        >
          <RiCloseLine
            class="lab-ds-icon" data-icon-size="compact" focusable="false"
            aria-hidden="true"
          />
        </button>
      </span>

      <!-- Global search chip -->
      <span
        v-if="globalSearch"
        class="design-lab-tag"
      >
        <RiSearchLine
          class="lab-ds-icon" data-icon-size="compact" focusable="false"
          aria-hidden="true"
        />
        <span class="font-medium">{{ t('Toutes les colonnes') }}</span>
        <span>{{ t('contient') }} "{{ globalSearch }}"</span>
        <button
          :aria-label="t('Supprimer la recherche')"
          class="lab-filter-tag-close"
          @click="globalSearch = ''"
        >
          <RiCloseLine
            class="lab-ds-icon" data-icon-size="compact" focusable="false"
            aria-hidden="true"
          />
        </button>
      </span>

      <!-- Filter chips -->
      <span
        v-for="af in activeFilters"
        :key="af.column"
        :data-testid="`active-filter-${af.column}`"
        class="design-lab-tag"
      >
        <component
          :is="getColumnDisplay(af.column).icon"
          class="lab-ds-icon" data-icon-size="compact" focusable="false"
          aria-hidden="true"
        />
        <span class="font-medium">{{ af.column }}</span>
        <span>{{ af.label }}</span>
        <button
          :aria-label="t('Supprimer ce filtre')"
          class="lab-filter-tag-close"
          @click="removeFilter(af.column)"
        >
          <RiCloseLine
            class="lab-ds-icon" data-icon-size="compact" focusable="false"
            aria-hidden="true"
          />
        </button>
      </span>
    </div>

    <div class="flex shrink-0 items-center gap-1">
      <!-- A sort alone narrows nothing: the file would be the whole resource, which
           the resource's own download already gives. And with no matching row, the
           API answers an empty file, without even the header. -->
      <BrandedButton
        v-if="(activeFilters.length > 0 || globalSearch) && tableData?.meta.total"
        color="tertiary"
        size="2xs"
        :icon="RiDownloadLine"
        :href="filteredDownloadUrl"
      >
        {{ t('Télécharger les données filtrées') }}
      </BrandedButton>
      <!-- Clear all -->
      <BrandedButton
        v-if="withClear && canReset"
        color="tertiary"
        size="2xs"
        :icon="RiCloseLine"
        @click="reset"
      >
        {{ t('Tout réinitialiser') }}
      </BrandedButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import '../../shared/foundations.css'
import '../../shared/badge.css'
import { RiArrowDownLine, RiArrowUpLine, RiCloseLine, RiDownloadLine, RiSearchLine } from '@remixicon/vue'
import BrandedButton from '../BrandedButton.vue'
import { useTranslation } from '../../../vendor/datagouv-components/src/composables/useTranslation'
import { useTabularContext } from '../../../vendor/datagouv-components/src/components/TabularExplorer/useTabularContext'

// Framing (borders, padding) belongs to the call site, like the toolbar's.
defineProps<{ withClear?: boolean }>()

const { t } = useTranslation()
const { tableData, activeFilters, sort, globalSearch, removeFilter, canReset, reset, getColumnDisplay, filteredDownloadUrl } = useTabularContext()
</script>
