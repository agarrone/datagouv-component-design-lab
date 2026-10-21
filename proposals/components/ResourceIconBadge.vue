<template>
  <span
    :class="[iconColor, '[&_svg]:fill-current']"
    class="lab-resource-icon-badge"
  >
    <component
      :is="iconComponent"
      class="size-4"
      aria-hidden="true"
    />
  </span>
</template>

<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/quality.css'
import { computed } from 'vue'
import File from '../../vendor/datagouv-components/src/components/Icons/File.vue'
import { getResourceFormatIcon, getResourceIconColor } from '../../vendor/datagouv-components/src/functions/resources'
import type { Resource } from '../../vendor/datagouv-components/src/types/resources'

const props = defineProps<{
  resource: Resource
}>()

// Render the icon directly (not via ResourceIcon which forces a gray color) so the
// colored badge can tint it through currentColor + [&_svg]:fill-current.
const iconComponent = computed(() => (props.resource.format ? getResourceFormatIcon(props.resource.format) : null) ?? File)
const iconColor = computed(() => getResourceIconColor(props.resource.format))
</script>
