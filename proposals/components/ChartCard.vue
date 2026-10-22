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
      <CardMedia :src="chart.image" :alt="chart.title" kind="chart" />
    </template>

    <ObjectCardHeader
      :icon="chartIcon"
      :url="chartUrl || chart.page"
    >
      {{ chart.title }}
    </ObjectCardHeader>

    <div
      v-if="chart.organization || chart.owner"
      class="lab-ds-u-text-sm flex flex-wrap lab-ds-u-gap-x-2 lab-ds-u-gap-y-1 items-center"
    >
      <ObjectCardOwner
        :organization="chart.organization"
        :owner="chart.owner"
        :organization-url="organizationUrl"
      />
      <TranslationT
        tag="p"
        class="lab-ds-u-text-sm whitespace-normal mb-0 lab-ds-u-text-gray-medium"
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
    <div class="lab-card-metrics flex flex-wrap items-center lab-ds-u-text-sm lab-ds-u-text-gray-medium lab-ds-u-mt-1">
      <p
        class="lab-ds-u-text-sm mb-0 flex items-center lab-ds-u-gap-0-5"
        :aria-label="t('{n} vues | {n} vue | {n} vues', chart.metrics.views)"
      >
        <RiEyeLine data-icon-size="compact" focusable="false"
          aria-hidden="true"
          class=" lab-ds-icon"
        />{{ summarize(chart.metrics.views) }}
      </p>
    </div>

    <slot />
  </ObjectCard>
</template>

<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/cards.css'
import { computed } from 'vue'
import { RiBarChartBoxLine, RiDeleteBinLine, RiEyeLine, RiLineChartLine, RiLockLine } from '@remixicon/vue'
import type { RouteLocationRaw } from 'vue-router'
import type { Chart } from '../../vendor/datagouv-components/src/types/visualizations'
import { summarize } from '../../vendor/datagouv-components/src/functions/helpers'
import { useTranslation } from '../../vendor/datagouv-components/src/composables/useTranslation'
import CardMedia from '../shared/CardMedia.vue'
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
