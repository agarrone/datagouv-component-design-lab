<template>
 <div class="lab-card-metadata-row lab-reuse-metadata">
  <span v-if="reuseType" class="lab-card-type">{{ reuseType }}</span>
  <div class="lab-card-metrics lab-card-usage" :class="{'lab-card-usage-only':!reuseType}">
   <p :aria-label="t('{n} vues | {n} vue | {n} vues', reuse.metrics.views)"><RiEyeLine class="lab-ds-icon" data-icon-size="compact" aria-hidden="true" focusable="false" />{{ summarize(reuse.metrics.views) }}</p>
   <p :aria-label="t('{n} abonnés | {n} abonné | {n} abonnés', reuse.metrics.followers)"><RiStarLine class="lab-ds-icon" data-icon-size="compact" aria-hidden="true" focusable="false" />{{ summarize(reuse.metrics.followers) }}</p>
  </div>
 </div>
</template>
<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/cards.css'
import { RiEyeLine, RiStarLine } from '@remixicon/vue'
import { useReuseType } from '../../vendor/datagouv-components/src/composables/useReuseType'
import { summarize } from '../../vendor/datagouv-components/src/functions/helpers'
import type { Reuse, ReuseV2 } from '../../vendor/datagouv-components/src/types/reuses'
import { useTranslation } from '../../vendor/datagouv-components/src/composables/useTranslation'

const props = defineProps<{
  reuse: Reuse | ReuseV2
}>()

const { t } = useTranslation()

const { label: reuseType } = useReuseType(() => props.reuse.type)
</script>
