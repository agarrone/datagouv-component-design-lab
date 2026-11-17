<template>
  <div class="proposal-metadata-section">
    <h3 class="proposal-metadata-heading">
      {{ t('Intégrer sur votre site') }}
    </h3>
    <CodeBlock
      :code="embedHtml"
      language="HTML"
      :copy-label="t('Copier')"
      :copied-label="t('Copié')"
    />
  </div>
</template>

<script setup lang="ts">
import '../../shared/foundations.css'
import '/proposals/shared/metadata.css'

import { computed } from 'vue'
import { useTranslation } from '/vendor/datagouv-components/src/composables/useTranslation'
import { getDatasetOEmbedHtml } from '/vendor/datagouv-components/src/functions/datasets'
import type { Dataset, DatasetV2, DatasetV2WithFullObject } from '/vendor/datagouv-components/src/types/datasets'
import CodeBlock from '/proposals/components/CodeBlock.vue'

const props = defineProps<{
  dataset: Dataset | DatasetV2 | DatasetV2WithFullObject
}>()

const { t } = useTranslation()

const embedHtml = computed(() => getDatasetOEmbedHtml('dataset', props.dataset.id))
</script>
