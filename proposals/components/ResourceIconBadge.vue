<template>
  <span
    :data-tone="formatTone"
    class="lab-resource-icon-badge"
    role="img"
    :aria-label="resource.format ? `Format ${resource.format.toUpperCase()}` : 'Fichier'"
    :title="resource.format ? resource.format.toUpperCase() : 'Fichier'"
  >
    <component data-icon-size="base" focusable="false"
      :is="iconComponent"
      class=" lab-ds-icon"
      aria-hidden="true"
    />
  </span>
</template>

<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/quality.css'
import { computed } from 'vue'
import File from '../../vendor/datagouv-components/src/components/Icons/File.vue'
import { getResourceFormatIcon } from '../../vendor/datagouv-components/src/functions/resources'
import type { Resource } from '../../vendor/datagouv-components/src/types/resources'

const props = defineProps<{
  resource: Resource
}>()

// Render the icon directly (not via ResourceIcon which forces a gray color) so the
// colored badge can tint it through currentColor + [&_svg]:fill-current.
const iconComponent = computed(() => (props.resource.format ? getResourceFormatIcon(props.resource.format) : null) ?? File)
const formatTone = computed(() => {
  const format = props.resource.format?.toLowerCase() || ''
  if (['csv','xls','xlsx','ods'].includes(format)) return 'teal'
  if (format === 'pdf') return 'danger'
  if (['json','geojson','xml','rdf','jsonl','parquet'].includes(format)) return 'primary'
  if (['zip','gz','7z','tar'].includes(format)) return 'pink'
  return 'secondary'
})
</script>
