<template>
  <div class="proposal-metadata-section">
    <h3 class="proposal-metadata-heading">
      {{ t('Temporalité') }}
    </h3>
    <DescriptionList>
      <div>
        <DescriptionListTerm>{{ t('Création') }}</DescriptionListTerm>
        <DescriptionListDetails>
          <FormattedDate :date="dataset.created_at" />
        </DescriptionListDetails>
      </div>
      <div v-if="dataset.frequency">
        <DescriptionListTerm>{{ t('Fréquence') }}</DescriptionListTerm>
        <DescriptionListDetails>{{ dataset.frequency.label }}</DescriptionListDetails>
      </div>
      <div v-if="dataset.temporal_coverage">
        <DescriptionListTerm>{{ t('Couverture temporelle') }}</DescriptionListTerm>
        <DescriptionListDetails>
          <DateRangeDetails :range="dataset.temporal_coverage" />
        </DescriptionListDetails>
      </div>
      <div>
        <DescriptionListTerm>{{ t('Dernière mise à jour') }}</DescriptionListTerm>
        <DescriptionListDetails>
          <FormattedDate :date="dataset.last_update" />
        </DescriptionListDetails>
      </div>
      <slot />
    </DescriptionList>
  </div>
</template>

<script setup lang="ts">
import '/proposals/shared/metadata.css'

import { useTranslation } from '/vendor/datagouv-components/src/composables/useTranslation'
import type { DatasetV2WithFullObject } from '/vendor/datagouv-components/src/types/datasets'
import DescriptionList from '/proposals/components/DescriptionList.vue'
import DescriptionListTerm from '/proposals/components/DescriptionListTerm.vue'
import DescriptionListDetails from '/proposals/components/DescriptionListDetails.vue'
import DateRangeDetails from '/proposals/components/DateRangeDetails.vue'
import FormattedDate from '/vendor/datagouv-components/src/components/FormattedDate.vue'

defineProps<{
  dataset: DatasetV2WithFullObject
}>()

const { t } = useTranslation()
</script>
