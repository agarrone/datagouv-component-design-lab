<template>
  <div class="lab-quality-block">
  <Toggletip
    :styled-button="false"
    button-class="lab-quality-trigger lab-quality-trigger-block"
    :button-props="{ title: t('Qualité des métadonnées') }"
  >
    <span class="lab-quality-trigger-label">
      <RiInformationLine data-icon-size="base" focusable="false" class="lab-quality-info lab-ds-icon" aria-hidden="true" />
      <span>{{ t('Métadonnées') }}</span>
    </span>
    <QualityScore :score="quality.score" class="w-full" />
    <template #toggletip>
      <DataserviceQualityTooltipContent :quality />
    </template>
  </Toggletip>
  <template v-if="!hideWarnings">
    <ul class="lab-quality-warnings">
      <QualityItemWarning
        :quality-item="quality.has_description"
        :message="t('Description non renseignée')"
      />
      <QualityItemWarning
        :quality-item="quality.has_machine_documentation"
        :message="t('Documentation machine (OpenAPI) manquante')"
      />
      <QualityItemWarning
        :quality-item="quality.has_technical_documentation"
        :message="t('Documentation technique manquante')"
      />
      <QualityItemWarning
        :quality-item="quality.has_business_documentation"
        :message="t('Documentation métier manquante')"
      />
      <QualityItemWarning
        :quality-item="quality.license"
        :message="t('Licence non renseignée')"
      />
      <QualityItemWarning
        :quality-item="quality.has_contact_point"
        :message="t('Point de contact non renseigné')"
      />
      <QualityItemWarning
        :quality-item="quality.has_base_api_url"
        :message="t(`URL de base de l'API non renseignée`)"
      />
      <QualityItemWarning
        :quality-item="quality.availability_documented"
        :message="t('Disponibilité non documentée')"
      />
      <QualityItemWarning
        :quality-item="quality.rate_limiting_documented"
        :message="t(`Limite d'appels non documentée`)"
      />
      <QualityItemWarning
        :quality-item="quality.access_conditions_clear"
        :message="t(`Conditions d'accès non précisées`)"
      />
    </ul>
  </template>
  </div>
</template>

<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/quality.css'
import { RiInformationLine } from '@remixicon/vue'
import type { DataserviceQuality } from '../../vendor/datagouv-components/src/types/dataservices'
import QualityScore from './QualityScore.vue'
import QualityItemWarning from './QualityItemWarning.vue'
import DataserviceQualityTooltipContent from './DataserviceQualityTooltipContent.vue'
import Toggletip from '../shared/QualityDetailsPopover.vue'
import { useTranslation } from '../../vendor/datagouv-components/src/composables/useTranslation'

withDefaults(defineProps<{
  quality: DataserviceQuality
  hideWarnings?: boolean
}>(), {
  hideWarnings: false,
})

const { t } = useTranslation()
</script>
