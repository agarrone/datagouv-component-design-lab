<template>
  <section class="lab-quality-details">
  <p class="lab-quality-details-title">
    {{ t("Qualité des métadonnées :") }}
  </p>
  <ul class="lab-quality-criteria">
    <QualityItem
      :passed="quality.has_description"
      :message-passed="t('Description renseignée')"
      :message-failed="t('Description non renseignée')"
      
    />
    <QualityItem
      :passed="quality.has_machine_documentation"
      :message-passed="t('Documentation machine (OpenAPI) disponible')"
      :message-failed="t('Documentation machine (OpenAPI) manquante')"
      
    />
    <QualityItem
      :passed="quality.has_technical_documentation"
      :message-passed="t('Documentation technique renseignée')"
      :message-failed="t('Documentation technique manquante')"
      
    />
    <QualityItem
      :passed="quality.has_business_documentation"
      :message-passed="t('Documentation métier renseignée')"
      :message-failed="t('Documentation métier manquante')"
      
    />
    <QualityItem
      :passed="quality.license"
      :message-passed="t('Licence renseignée')"
      :message-failed="t('Licence non renseignée')"
      
    />
    <QualityItem
      :passed="quality.has_contact_point"
      :message-passed="t('Point de contact renseigné')"
      :message-failed="t('Point de contact non renseigné')"
      
    />
    <QualityItem
      :passed="quality.has_base_api_url"
      :message-passed="t(`URL de base de l'API renseignée`)"
      :message-failed="t(`URL de base de l'API non renseignée`)"
      
    />
    <QualityItem
      :passed="quality.availability_documented"
      :message-passed="t('Disponibilité documentée')"
      :message-failed="t('Disponibilité non documentée')"
      
    />
    <QualityItem
      :passed="quality.rate_limiting_documented"
      :message-passed="t(`Limite d'appels documentée`)"
      :message-failed="t(`Limite d'appels non documentée`)"
      
    />
    <QualityItem
      :passed="quality.access_conditions_clear"
      :message-passed="t(`Conditions d'accès claires`)"
      :message-failed="t(`Conditions d'accès non précisées`)"
      
    />
  </ul>
  <div v-if="config.datasetQualityGuideUrl" class="lab-quality-guide">
    <AppLink :href="config.datasetQualityGuideUrl" target="_blank" rel="noopener">{{ t('En savoir plus sur cet indicateur') }}</AppLink>
  </div>
  </section>
</template>

<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/quality.css'
import AppLink from './AppLink.vue'
import {useComponentsConfig} from '../../vendor/datagouv-components/src/config'
import type { DataserviceQuality } from '../../vendor/datagouv-components/src/types/dataservices'
import { useTranslation } from '../../vendor/datagouv-components/src/composables/useTranslation'
import QualityItem from './QualityItem.vue'

defineProps<{
  quality: DataserviceQuality
}>()

const { t } = useTranslation()
const config = useComponentsConfig()
</script>
