<script setup lang="ts">
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
      <component :is="icon" v-if="icon" class="proposed-simple-banner__icon" aria-hidden="true" focusable="false" />
      <div class="proposed-simple-banner__content"><slot /></div>
    </template>
    <slot v-else />
  </div>
</template>

<style scoped>
.proposed-simple-banner {
  --banner-surface: #f6f6f6;
  --banner-border: #e5e5e5;
  --banner-accent: #555;
  box-sizing: border-box;
  width: 100%;
  padding: 16px;
  border: 1px solid var(--banner-border);
  border-radius: 6px;
  background: var(--banner-surface);
  color: #161616;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
}
.proposed-simple-banner--text {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.proposed-simple-banner[data-type="primary"] {
  --banner-surface: var(--color-new-info-light, #e8edff);
  --banner-border: #b8c7ff;
  --banner-accent: var(--color-new-info, #0063cb);
}
.proposed-simple-banner[data-type="primary-frame"] {
  --banner-surface: #fff;
  --banner-border: #000091;
  --banner-accent: #000091;
}
.proposed-simple-banner[data-type="warning"] {
  --banner-surface: var(--color-new-warning-light, #ffe9e6);
  --banner-border: #ffc6bd;
  --banner-accent: var(--color-new-warning, #b34000);
}
.proposed-simple-banner[data-type="success"] {
  --banner-surface: #e3fdeb;
  --banner-border: #b8fec9;
  --banner-accent: #18753c;
}
.proposed-simple-banner[data-type="danger"] {
  --banner-surface: #fef4f4;
  --banner-border: #ffbdbd;
  --banner-accent: #ce0500;
}
.proposed-simple-banner[data-type="pink"] {
  --banner-surface: var(--color-pink-softest, #fff0f5);
  --banner-border: var(--color-pink-soft, #ffcae0);
}
.proposed-simple-banner__icon {
  flex: 0 0 16px;
  width: 16px;
  height: 16px;
  margin-top: 2.5px;
  color: var(--banner-accent);
}
.proposed-simple-banner__content {
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
}
</style>
