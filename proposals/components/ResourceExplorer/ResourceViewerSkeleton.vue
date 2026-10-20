<template>
  <div :class="fullscreen ? 'flex min-h-0 flex-1 flex-col' : ''">
    <!-- Header and tabs are the real ones: everything they show comes from the
         resource we already hold, so there is nothing to wait for. Only the preview
         body below is a placeholder. -->
    <ResourceViewerHeader
      :dataset
      :resource
      :resources
      :resource-to
      :explore-to="exploreTo"
      :resource-external-url="resourceExternalUrl"
      :replace
      :fullscreen
    />

    <!-- Inert copy of the viewer's tab row: same components, so the pills keep their
         exact size and labels, but nothing to select until the viewer resolves. -->
    <TabGroup
      size="sm"
      aria-hidden="true"
      class="pointer-events-none"
    >
      <div class="flex shrink-0 items-center border-b border-gray-default p-2">
        <TabList class="max-w-full overflow-x-auto">
          <Tab
            v-for="tab in tabsOptions"
            :key="tab.key"
          >
            {{ tab.label }}
          </Tab>
        </TabList>
      </div>
    </TabGroup>

    <!-- Tabular preview: the same toolbar + table skeleton the data tab shows while
         TabularExplorer loads. Other previews fall back below. -->
    <TabularSkeleton
      v-if="previewKind === 'tabular'"
      :fill="fullscreen"
    />

    <!-- PDF preview: the same A4 skeleton the PdfPreview shows while pdfjs loads. -->
    <PdfSkeleton
      v-else-if="previewKind === 'pdf'"
      :fill="fullscreen"
    />

    <!-- Other non-tabular previews (JSON, map…) — a simple placeholder for now. -->
    <div
      v-else
      class="p-4"
      :class="fullscreen ? 'min-h-0 flex-1' : ''"
      role="status"
      :aria-label="t('Chargement de l\'aperçu…')"
    >
      <div
        class="w-full rounded bg-gray-200"
        :class="fullscreen ? 'h-full' : 'h-96'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PdfSkeleton from '../../../vendor/datagouv-components/src/components/ResourceAccordion/PdfSkeleton.vue'
import TabularSkeleton from '../../../vendor/datagouv-components/src/components/TabularExplorer/TabularSkeleton.vue'
import TabGroup from '../../../vendor/datagouv-components/src/components/Tabs/TabGroup.vue'
import TabList from '../../../vendor/datagouv-components/src/components/Tabs/TabList.vue'
import Tab from '../../../vendor/datagouv-components/src/components/Tabs/Tab.vue'
import ResourceViewerHeader from '../../../vendor/datagouv-components/src/components/ResourceExplorer/ResourceViewerHeader.vue'
import { useTranslation } from '../../../vendor/datagouv-components/src/composables/useTranslation'
import { useResourceCapabilities } from '../../../vendor/datagouv-components/src/composables/useResourceCapabilities'
import type { RouteLocationRaw } from 'vue-router'
import type { Resource } from '../../../vendor/datagouv-components/src/types/resources'
import type { Dataset, DatasetV2 } from '../../../vendor/datagouv-components/src/types/datasets'

const props = defineProps<{
  resource: Resource
  dataset: Dataset | DatasetV2
  resources?: Resource[]
  resourceTo?: (resource: Resource) => RouteLocationRaw
  exploreTo?: (resource: Resource) => string
  resourceExternalUrl?: (resource: Resource) => string
  replace?: boolean
  fullscreen?: boolean
}>()

const { t } = useTranslation()
// `previewKind` is the viewer's own decision, so the skeleton always picks the
// shape the resolved viewer will show.
const { previewKind, tabsOptions } = useResourceCapabilities(
  () => props.resource,
  () => props.dataset,
)
</script>
