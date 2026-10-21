<template>
  <div
    v-if="dataset.spatial"
    class="proposal-metadata-section"
  >
    <h3 class="proposal-metadata-heading">
      {{ t('Couverture spatiale') }}
    </h3>
    <DescriptionList>
      <div v-if="dataset.spatial.zones && dataset.spatial.zones.length">
        <DescriptionListTerm>{{ t('Zones') }}</DescriptionListTerm>
        <DescriptionListDetails>{{ zonesDisplay }}</DescriptionListDetails>
      </div>
      <div v-if="dataset.spatial.geom">
        <DescriptionListTerm>{{ t('Couverture géographique') }}</DescriptionListTerm>
        <DescriptionListDetails>
          <slot
            name="map"
            :geojson="dataset.spatial.geom"
          />
        </DescriptionListDetails>
      </div>
      <div v-if="dataset.spatial.granularity">
        <DescriptionListTerm>{{ t('Granularité de la couverture territoriale') }}</DescriptionListTerm>
        <DescriptionListDetails>{{ dataset.spatial.granularity.name }}</DescriptionListDetails>
      </div>
      <slot />
    </DescriptionList>
  </div>
</template>

<script setup lang="ts">
import '../../shared/foundations.css'
import '/proposals/shared/metadata.css'

import { computed } from 'vue'
import { useTranslation } from '/vendor/datagouv-components/src/composables/useTranslation'
import type { DatasetV2WithFullObject } from '/vendor/datagouv-components/src/types/datasets'
import DescriptionList from '/proposals/components/DescriptionList.vue'
import DescriptionListTerm from '/proposals/components/DescriptionListTerm.vue'
import DescriptionListDetails from '/proposals/components/DescriptionListDetails.vue'

const props = defineProps<{
  dataset: DatasetV2WithFullObject
}>()

const { t } = useTranslation()

const zonesDisplay = computed(() => {
  if (!props.dataset.spatial?.zones?.length) return ''
  const names = props.dataset.spatial.zones.map(z => z.name)
  return humanJoin(names)
})

function humanJoin(source: Array<string>): string {
  const array = [...source]
  if (!array.length) return ''
  if (array.length === 1) return array[0]!
  const last = array.pop()!
  return `${array.join(', ')} ${t('et')} ${last}`
}
</script>
