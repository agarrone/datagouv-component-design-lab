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
import File from './Icons/File.vue'
import { getResourceFormatIcon, getResourceIconColor } from '../../vendor/datagouv-components/src/functions/resources'
import type { Resource } from '../../vendor/datagouv-components/src/types/resources'

const props = defineProps<{
  resource: Resource
}>()

// Render the icon directly (not via ResourceIcon which forces a gray color) so the
// colored badge can tint it through currentColor + [&_svg]:fill-current.
const iconComponent = computed(() => (props.resource.format ? getResourceFormatIcon(props.resource.format) : null) ?? File)
// Keep the upstream format families as the source of truth; only their palette changes.
const formatTone = computed(() => {
  const originalColor = getResourceIconColor(props.resource.format)
  if (originalColor.includes('#c3fad5')) return 'green'
  if (originalColor.includes('#e6eefe')) return 'primary'
  if (originalColor.includes('#fce164')) return 'yellow'
  if (originalColor.includes('#fee7fc')) return 'pink'
  return 'secondary'
})
</script>
