<template>
  <div class="proposal-metadata-section">
    <h3 class="proposal-metadata-heading">
      {{ t('Temporalité') }}
    </h3>
    <DescriptionList class="proposal-metadata-list-balanced">
      <div>
        <DescriptionListTerm>{{ t('Création') }}</DescriptionListTerm>
        <DescriptionListDetails>
          <FormattedDate v-if="dataset.created_at" :date="dataset.created_at" /><span v-else>—</span>
        </DescriptionListDetails>
      </div>
      <div>
        <DescriptionListTerm>{{ t('Dernière modification de la fiche') }}</DescriptionListTerm>
        <DescriptionListDetails>
          <FormattedDate v-if="dataset.last_modified" :date="dataset.last_modified" /><span v-else>—</span>
        </DescriptionListDetails>
      </div>
      <div>
        <DescriptionListTerm>{{ t('Fréquence') }}</DescriptionListTerm>
        <DescriptionListDetails>{{ dataset.frequency?.label || '—' }}</DescriptionListDetails>
      </div>
      <div>
        <DescriptionListTerm>{{ t('Prochaine mise à jour prévue') }}</DescriptionListTerm>
        <DescriptionListDetails>
          <FormattedDate v-if="dataset.frequency_date" :date="dataset.frequency_date" /><span v-else>—</span>
        </DescriptionListDetails>
      </div>
      <div>
        <DescriptionListTerm>{{ t('Couverture temporelle') }}</DescriptionListTerm>
        <DescriptionListDetails>
          <DateRangeDetails v-if="dataset.temporal_coverage" :range="dataset.temporal_coverage" /><span v-else>—</span>
        </DescriptionListDetails>
      </div>
      <div>
        <DescriptionListTerm>{{ t('Dernière mise à jour des ressources') }}</DescriptionListTerm>
        <DescriptionListDetails>
          <FormattedDate v-if="dataset.last_update" :date="dataset.last_update" /><span v-else>—</span>
        </DescriptionListDetails>
      </div>
      <slot />
    </DescriptionList>
  </div>
</template>

<script setup lang="ts">
import '../../shared/foundations.css'
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
