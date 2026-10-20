<template>
  <ObjectCard class="lab-content-card" media-size="xl">
    <template #badge>
      <ObjectCardBadge
        v-if="chart.deleted_at"
        :icon="RiDeleteBinLine"
      >
        {{ t('Supprimé') }}
      </ObjectCardBadge>
      <ObjectCardBadge
        v-else-if="chart.private"
        :icon="RiLockLine"
      >
        {{ t('Brouillon') }}
      </ObjectCardBadge>
    </template>

    <template #media>
      <img
        v-if="chart.image"
        :src="chart.image"
        class="w-full h-full object-cover"
        :alt="chart.title"
      >
      <Placeholder
        v-else
        type="Chart"
        class="w-full h-full"
      />
    </template>

    <ObjectCardHeader
      :icon="chartIcon"
      :url="chartUrl || chart.page"
    >
      {{ chart.title }}
    </ObjectCardHeader>

    <div
      v-if="chart.organization || chart.owner"
      class="text-sm flex flex-wrap gap-x-2 gap-y-1 items-center"
    >
      <ObjectCardOwner
        :organization="chart.organization"
        :owner="chart.owner"
        :organization-url="organizationUrl"
      />
      <TranslationT
        tag="p"
        class="text-sm whitespace-normal mb-0 text-gray-medium"
        keypath="Mis à jour {date}"
      >
        <template #date>
          <FormattedDate
            :date="chart.last_modified"
            format="relative"
            :options="{ dateStyle: 'medium' }"
          />
        </template>
      </TranslationT>
    </div>

    <ObjectCardShortDescription :text="chart.description" />
    <div class="lab-card-metrics flex flex-wrap items-center text-sm text-gray-medium mt-1">
      <p
        class="text-sm mb-0 flex items-center gap-0.5"
        :aria-label="t('{n} vues | {n} vue | {n} vues', chart.metrics.views)"
      >
        <RiEyeLine
          aria-hidden="true"
          class="size-3.5"
        />{{ summarize(chart.metrics.views) }}
      </p>
    </div>

    <slot />
  </ObjectCard>
</template>

<script setup lang="ts">
import '../shared/cards.css'
import { computed } from 'vue'
import { RiBarChartBoxLine, RiDeleteBinLine, RiEyeLine, RiLineChartLine, RiLockLine } from '@remixicon/vue'
import type { RouteLocationRaw } from 'vue-router'
import type { Chart } from '../../vendor/datagouv-components/src/types/visualizations'
import { summarize } from '../../vendor/datagouv-components/src/functions/helpers'
import { useTranslation } from '../../vendor/datagouv-components/src/composables/useTranslation'
import Placeholder from '../../vendor/datagouv-components/src/components/Placeholder.vue'
import FormattedDate from '../../vendor/datagouv-components/src/components/FormattedDate.vue'
import ObjectCard from './ObjectCard.vue'
import ObjectCardBadge from './ObjectCardBadge.vue'
import ObjectCardHeader from './ObjectCardHeader.vue'
import ObjectCardOwner from './ObjectCardOwner.vue'
import ObjectCardShortDescription from './ObjectCardShortDescription.vue'
import TranslationT from '../../vendor/datagouv-components/src/components/TranslationT.vue'

const props = defineProps<{
  chart: Chart
  chartUrl?: RouteLocationRaw
  organizationUrl?: RouteLocationRaw
}>()

const { t } = useTranslation()

const chartIcon = computed(() => {
  return props.chart.series[0]?.type === 'line' ? RiLineChartLine : RiBarChartBoxLine
})
</script>
