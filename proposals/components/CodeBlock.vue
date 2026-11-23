<script setup lang="ts">
import '../shared/foundations.css'
import '/proposals/shared/metadata.css'

import { computed } from 'vue'
import { useTranslation } from '/vendor/datagouv-components/src/composables/useTranslation'
import CopyButton from '/proposals/components/CopyButton.vue'

const props = withDefaults(defineProps<{
  code: string
  language?: string
  copyLabel?: string
  copiedLabel?: string
}>(), {
  language: 'CODE',
  copyLabel: '',
  copiedLabel: '',
})

const { t } = useTranslation()
const visibleCopyLabel = computed(() => props.copyLabel || t('Copier'))
const visibleCopiedLabel = computed(() => props.copiedLabel || t('Copié'))
</script>

<template>
  <div class="proposal-code-block">
    <div class="proposal-code-block-toolbar">
      <span class="proposal-code-block-language">{{ language }}</span>
      <CopyButton
        class="proposal-code-block-copy"
        icon-only
        :show-tooltip="false"
        :label="visibleCopyLabel"
        :copied-label="visibleCopiedLabel"
        :text="code"
      />
    </div>
    <pre class="proposal-code-block-pre" tabindex="0"><code>{{ code }}</code></pre>
  </div>
</template>

<style scoped>
.proposal-code-block {
  width: 100%;
  min-width: 0;
  overflow: hidden;
  border: var(--lab-ds-stroke) solid var(--lab-ds-border);
  border-radius: var(--lab-ds-radius-technical);
  background: var(--lab-ds-surface);
}

.proposal-code-block-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: var(--lab-ds-control-compact);
  padding-inline: calc(var(--lab-ds-space-8) + var(--lab-ds-space-2)) var(--lab-ds-space-2);
  border-bottom: var(--lab-ds-stroke) solid var(--lab-ds-border);
}

.proposal-code-block-language {
  color: var(--lab-ds-text-secondary);
  font: var(--lab-ds-weight-regular) var(--lab-ds-text-caption)/var(--lab-ds-leading-caption) var(--lab-ds-font-mono);
  text-transform: uppercase;
}

.proposal-code-block-pre {
  box-sizing: border-box;
  max-height: 176px;
  margin: 0;
  padding: calc(var(--lab-ds-space-8) + var(--lab-ds-space-2)) var(--lab-ds-space-12);
  overflow: auto;
  background: transparent;
  color: var(--lab-ds-text-secondary);
  font: var(--lab-ds-weight-regular) var(--lab-ds-text-caption)/var(--lab-ds-leading-control) var(--lab-ds-font-mono);
  white-space: pre;
}

.proposal-code-block-pre code {
  color: inherit;
  font: inherit;
}

.proposal-code-block-pre:focus-visible {
  outline: var(--lab-ds-focus-width) solid var(--lab-ds-focus);
  outline-offset: calc(-1 * var(--lab-ds-focus-width));
}

.proposal-code-block :deep(.proposal-copy-button) {
  min-height: var(--lab-ds-control-compact);
  padding: var(--lab-ds-space-6) var(--lab-ds-space-8);
  border-radius: var(--lab-ds-radius-technical);
  color: var(--lab-ds-text-secondary);
  font: var(--lab-ds-weight-regular) var(--lab-ds-text-caption)/var(--lab-ds-leading-caption) var(--lab-ds-font-sans);
}

.proposal-code-block :deep(.proposal-copy-button svg) {
  width: var(--lab-ds-icon-compact);
  height: var(--lab-ds-icon-compact);
}
</style>
