<template>
  <div class="proposal-metadata-section">
    <div class="proposal-metadata-heading-row">
      <h3 class="proposal-metadata-heading">
        {{ t('Intégrer sur votre site') }}
      </h3>
      <CopyButton
        :hide-label="true"
        :label="t('Copier le code embarqué')"
        :copied-label="t('Code embarqué copié !')"
        :text="embedHtml"
      />
    </div>
    <textarea
      ref="textAreaRef"
      :aria-label="t('Code HTML pour intégrer le jeu de données')"
      rows="2"
      spellcheck="false"
      class="proposal-metadata-code proposal-embed-code"
      :value="embedHtml"
      readonly="true"
      @click="selectContent"
    />
  </div>
</template>

<script setup lang="ts">
import '../../shared/foundations.css'
import '/proposals/shared/metadata.css'

import { ref, computed } from 'vue'
import { useTranslation } from '/vendor/datagouv-components/src/composables/useTranslation'
import { getDatasetOEmbedHtml } from '/vendor/datagouv-components/src/functions/datasets'
import type { Dataset, DatasetV2, DatasetV2WithFullObject } from '/vendor/datagouv-components/src/types/datasets'
import CopyButton from '/proposals/components/CopyButton.vue'

const props = defineProps<{
  dataset: Dataset | DatasetV2 | DatasetV2WithFullObject
}>()

const { t } = useTranslation()
const textAreaRef = ref<HTMLTextAreaElement | null>(null)

const embedHtml = computed(() => getDatasetOEmbedHtml('dataset', props.dataset.id))

function selectContent(e: Event) {
  (e.target as HTMLTextAreaElement).select()
}
</script>
