<script setup lang="ts">
import '../shared/foundations.css'
import { computed, useSlots, Text, Comment, Fragment } from 'vue'
import type { VNode } from 'vue'
import { RiInformationLine, RiCheckboxCircleLine, RiAlertLine, RiErrorWarningLine } from '@remixicon/vue'

const props = defineProps<{
  type: 'primary' | 'primary-frame' | 'warning' | 'gray' | 'danger' | 'success' | 'pink'
}>()

const slots = useSlots()
// Rich slots already compose their own illustrations and layout in cdata.
// Keep their structure intact instead of adding a second icon or wrapper.
function isTextOnly(nodes: VNode[]): boolean {
  return nodes.every(node => node.type === Text || node.type === Comment ||
    (node.type === Fragment && Array.isArray(node.children) && isTextOnly(node.children as VNode[])))
}
const icons = {
  primary: RiInformationLine,
  'primary-frame': RiInformationLine,
  warning: RiAlertLine,
  danger: RiErrorWarningLine,
  success: RiCheckboxCircleLine,
  gray: undefined,
  pink: undefined,
}
const icon = computed(() => icons[props.type])
</script>

<template>
  <div class="proposed-simple-banner" :data-type="type" :class="{'proposed-simple-banner--text': isTextOnly(slots.default?.() || [])}">
    <template v-if="isTextOnly(slots.default?.() || [])">
      <component data-icon-align="start" data-icon-size="base" :is="icon" v-if="icon" class="proposed-simple-banner__icon lab-ds-icon" aria-hidden="true" focusable="false" />
      <div class="proposed-simple-banner__content"><slot /></div>
    </template>
    <slot v-else />
  </div>
</template>

<style scoped>
.proposed-simple-banner {
  --banner-surface: var(--lab-ds-surface-subtle);
  --banner-border: var(--lab-ds-border);
  --banner-accent: var(--lab-ds-text-secondary);
  box-sizing: border-box;
  width: 100%;
  padding: var(--lab-ds-space-16);
  border: var(--lab-ds-stroke) solid var(--banner-border);
  border-radius: var(--lab-ds-radius);
  background: var(--banner-surface);
  color: var(--lab-ds-text);
  font-family: var(--lab-ds-font-sans);
  font-size: var(--lab-ds-text-body);
  line-height: var(--lab-ds-leading-body);
}
.proposed-simple-banner:is([data-type="primary"], [data-type="primary-frame"], [data-type="warning"], [data-type="success"], [data-type="danger"]) {
  color: var(--banner-accent);
}
.proposed-simple-banner--text {
  display: flex;
  align-items: flex-start;
  gap: var(--lab-ds-space-12);
}
.proposed-simple-banner[data-type="primary"] {
  --banner-surface: var(--lab-ds-info-bg);
  --banner-border: var(--lab-ds-info-border);
  --banner-accent: var(--lab-ds-info-text);
}
.proposed-simple-banner[data-type="primary-frame"] {
  --banner-surface: var(--lab-ds-surface);
  --banner-border: var(--lab-ds-brand);
  --banner-accent: var(--lab-ds-brand);
}
.proposed-simple-banner[data-type="warning"] {
  --banner-surface: var(--lab-ds-warning-bg);
  --banner-border: var(--lab-ds-warning-border);
  --banner-accent: var(--lab-ds-warning-text);
}
.proposed-simple-banner[data-type="success"] {
  --banner-surface: var(--lab-ds-success-bg);
  --banner-border: var(--lab-ds-success-border);
  --banner-accent: var(--lab-ds-success-text);
}
.proposed-simple-banner[data-type="danger"] {
  --banner-surface: var(--lab-ds-danger-bg);
  --banner-border: var(--lab-ds-danger-border);
  --banner-accent: var(--lab-ds-danger-text);
}
.proposed-simple-banner[data-type="pink"] {
  --banner-surface: var(--lab-ds-pink-bg);
  --banner-border: var(--lab-ds-pink-border);
}
.proposed-simple-banner__icon {
  flex: 0 0 16px;
  width: var(--lab-ds-icon);
  height: var(--lab-ds-icon);
  margin-top: var(--lab-ds-space-optical);
  color: var(--banner-accent);
}
.proposed-simple-banner__content {
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
}
</style>
