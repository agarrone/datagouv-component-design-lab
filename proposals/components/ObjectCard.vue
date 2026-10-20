<template>
  <article
    class="lab-object-card fr-enlarge-link"
    :class="articleClass"
  >
    <slot name="badge" />
    <div class="lab-object-card-layout">
      <div
        v-if="$slots.media"
        class="lab-object-card-media"
      >
        <div
          class="lab-object-card-media-frame"
          :class="mediaContainerClass"
        >
          <slot name="media" />
        </div>
      </div>
      <div class="lab-object-card-body">
        <slot />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import '../shared/cards.css'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  articleClass?: string | string[] | Record<string, boolean>
  mediaSize?: 'sm' | 'lg' | 'xl'
}>(), {
  mediaSize: 'sm',
})

const mediaContainerClass = computed(() => {
  if (props.mediaSize === 'xl') {
    return 'lab-object-card-media-xl'
  }
  if (props.mediaSize === 'lg') {
    return 'lab-object-card-media-lg'
  }
  return 'lab-object-card-media-sm'
})
</script>
