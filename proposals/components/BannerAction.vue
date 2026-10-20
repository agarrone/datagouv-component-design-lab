<script lang="ts">
export { bannerActionTypeKey } from '../../vendor/datagouv-components/src/components/BannerAction.vue'
</script>

<script setup lang="ts">
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
    <component :is="icon" class="proposed-banner-action__icon" aria-hidden="true" focusable="false" />
    <div class="proposed-banner-action__content">
      <div class="proposed-banner-action__title"><slot name="title">{{ title }}</slot></div>
      <div v-if="$slots.default" class="proposed-banner-action__description"><slot /></div>
    </div>
    <div v-if="$slots.button" class="proposed-banner-action__actions"><slot name="button" /></div>
  </div>
</template>

<style scoped>
.proposed-banner-action {
  --banner-surface: var(--color-new-info-light, #e8edff);
  --banner-border: #b8c7ff;
  --banner-accent: var(--color-new-info, #0063cb);
  display: grid;
  grid-template-columns: 16px minmax(0, 1fr) auto;
  align-items: start;
  gap: 12px;
  box-sizing: border-box;
  width: 100%;
  padding: 16px;
  border: 1px solid var(--banner-border);
  border-radius: 6px;
  background: var(--banner-surface);
  color: var(--banner-accent);
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
  container-type: inline-size;
}
.proposed-banner-action[data-banner-action-type="warning"] {
  --banner-surface: var(--color-new-warning-light, #ffe9e6);
  --banner-border: #ffc6bd;
  --banner-accent: var(--color-new-warning, #b34000);
}
.proposed-banner-action[data-banner-action-type="danger"] {
  --banner-surface: #fef4f4;
  --banner-border: #ffbdbd;
  --banner-accent: #ce0500;
}
.proposed-banner-action__icon {
  width: 16px;
  height: 16px;
  margin-top: 2.5px;
}
.proposed-banner-action__content { min-width: 0; overflow-wrap: anywhere; }
.proposed-banner-action__title { font-weight: 700; }
.proposed-banner-action__description { margin-top: 4px; }
.proposed-banner-action__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  align-self: center;
  min-width: 0;
  max-width: 100%;
}
@container (max-width: 480px) {
  .proposed-banner-action__content { grid-column: 2 / -1; }
  .proposed-banner-action__actions { grid-column: 2 / -1; }
}
</style>
