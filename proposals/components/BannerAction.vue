<script lang="ts">
export { bannerActionTypeKey } from '../../vendor/datagouv-components/src/components/BannerAction.vue'
</script>

<script setup lang="ts">
import '../shared/foundations.css'
import { computed, provide } from 'vue'
import { RiInformationLine, RiAlertLine, RiErrorWarningLine } from '@remixicon/vue'
import { bannerActionTypeKey } from '../../vendor/datagouv-components/src/components/BannerAction.vue'

const props = defineProps<{
  type: 'primary' | 'danger' | 'warning'
  title?: string
}>()

// Preserve the original key consumed by BrandedButton.
provide(bannerActionTypeKey, props.type)
const icon = computed(() => ({ primary: RiInformationLine, warning: RiAlertLine, danger: RiErrorWarningLine }[props.type]))
</script>

<template>
  <div class="group proposed-banner-action" :data-banner-action-type="type">
    <component data-icon-align="start" data-icon-size="base" :is="icon" class="proposed-banner-action__icon lab-ds-icon" aria-hidden="true" focusable="false" />
    <div class="proposed-banner-action__content">
      <div class="proposed-banner-action__title"><slot name="title">{{ title }}</slot></div>
      <div v-if="$slots.default" class="proposed-banner-action__description"><slot /></div>
    </div>
    <div v-if="$slots.button" class="proposed-banner-action__actions"><slot name="button" /></div>
  </div>
</template>

<style scoped>
.proposed-banner-action {
  --banner-surface: var(--lab-ds-info-bg);
  --banner-border: var(--lab-ds-info-border);
  --banner-accent: var(--lab-ds-info-text);
  display: grid;
  grid-template-columns: 16px minmax(0, 1fr) auto;
  align-items: start;
  gap: var(--lab-ds-space-12);
  box-sizing: border-box;
  width: 100%;
  padding: var(--lab-ds-space-16);
  border: var(--lab-ds-stroke) solid var(--banner-border);
  border-radius: var(--lab-ds-radius);
  background: var(--banner-surface);
  color: var(--banner-accent);
  font-family: var(--lab-ds-font-sans);
  font-size: var(--lab-ds-text-body);
  line-height: var(--lab-ds-leading-body);
  container-type: inline-size;
}
.proposed-banner-action[data-banner-action-type="warning"] {
  --banner-surface: var(--lab-ds-warning-bg);
  --banner-border: var(--lab-ds-warning-border);
  --banner-accent: var(--lab-ds-warning-text);
}
.proposed-banner-action[data-banner-action-type="danger"] {
  --banner-surface: var(--lab-ds-danger-bg);
  --banner-border: var(--lab-ds-danger-border);
  --banner-accent: var(--lab-ds-danger-text);
}
.proposed-banner-action__icon {
  width: var(--lab-ds-icon);
  height: var(--lab-ds-icon);
  margin-top: var(--lab-ds-space-optical);
}
.proposed-banner-action__content { min-width: 0; overflow-wrap: anywhere; }
.proposed-banner-action__title { font-weight: 700; }
.proposed-banner-action__description { margin-top: var(--lab-ds-space-4); }
.proposed-banner-action__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--lab-ds-space-8);
  align-self: center;
  min-width: 0;
  max-width: 100%;
}
@container (max-width: 480px) {
  .proposed-banner-action__content { grid-column: 2 / -1; }
  .proposed-banner-action__actions { grid-column: 2 / -1; }
}
</style>
