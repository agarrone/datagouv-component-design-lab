<script setup lang="ts">
import '../../shared/foundations.css'
import '../../shared/application-cards.css'

import {useTranslation,type DatasetV2WithFullObject} from '@datagouv/components-next'
import BrandedButton from '../BrandedButton.vue'
import {computed} from 'vue'

import type { ExternalRecommendation } from '../../../vendor/cdata-runtime/types/recommendations'

const props = defineProps<{ dataset: DatasetV2WithFullObject }>()

const { locale } = useTranslation()
const shortLocale = computed(() => locale.split('-')[0])

const recommendation = computed(() => {
  const recommendations = props.dataset.extras['recommendations-externals'] as Array<ExternalRecommendation> || null
  if (!recommendations || !recommendations.length) return

  const recommendation = recommendations[0]

  const locale = shortLocale.value in recommendation.messages ? shortLocale.value : 'fr'
  return {
    id: recommendation.id,
    title: recommendation.messages[locale].title,
    message: recommendation.messages[locale].message,
    button: recommendation.messages[locale].button,
    url: recommendation.id,
  }
})
</script>
<template><div v-if="recommendation" class="lab-aux-card lab-action-card" data-primary="true" data-track-content data-content-name="external recommendations" :data-content-piece="recommendation.id" :data-content-target="recommendation.id"><div class="lab-action-body"><h3 class="lab-aux-heading">{{recommendation.title}}</h3><p class="lab-aux-description">{{recommendation.message}}</p><div class="lab-aux-actions"><BrandedButton :href="recommendation.url" new-tab>{{recommendation.button}}</BrandedButton></div></div></div></template>
