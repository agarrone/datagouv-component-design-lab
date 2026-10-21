<template>
  <div ref="sentinel">
    <slot>
      <div class="flex items-center justify-center lab-ds-u-p-4">
        <span role="status" class="inline-flex items-center lab-ds-u-gap-3 lab-ds-u-text-loader lab-ds-u-text-muted">
          <UnicodeLoader
            style="font-size:var(--lab-ds-text-caption); min-width:var(--lab-ds-control)"
            aria-hidden="true"
          />
          <ShimmerText :text="t('Chargement…')" />
        </span>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import '../shared/foundations.css'
import { onMounted, onUnmounted, useTemplateRef, watch } from 'vue'
import UnicodeLoader from '../shared/UnicodeLoader.vue'
import ShimmerText from '../shared/ShimmerText.vue'
import { useTranslation } from '../../vendor/datagouv-components/src/composables/useTranslation'

const props = defineProps<{
  root?: HTMLElement | null
}>()

const emit = defineEmits<{
  intersect: []
}>()

const { t } = useTranslation()

const sentinelRef = useTemplateRef<HTMLElement>('sentinel')
let observer: IntersectionObserver | null = null

function setupObserver() {
  observer?.disconnect()
  const el = sentinelRef.value
  if (!el) return
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        emit('intersect')
      }
    },
    { root: props.root ?? null, rootMargin: '200px' },
  )
  observer.observe(el)
}

onMounted(setupObserver)
watch([sentinelRef, () => props.root], setupObserver)
onUnmounted(() => observer?.disconnect())
</script>
