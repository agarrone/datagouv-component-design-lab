<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/metadata.css'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { RiArrowDownSLine, RiArrowUpSLine } from '@remixicon/vue'
import BrandedButton from './BrandedButton.vue'
import CopyButton from './CopyButton.vue'
import MiddleTruncate from './MiddleTruncate.vue'

defineProps<{
  extra: Record<string, unknown>
  titleText: string
  buttonText: string
  titleLevel?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}>()

function display(value: unknown) {
  if (typeof value === 'string') return value
  if (value === null) return 'null'
  if (value === undefined) return '—'
  if (typeof value === 'object') {
    try { return JSON.stringify(value) } catch { return String(value) }
  }
  return String(value)
}
</script>

<template>
  <Disclosure v-slot="{ open }" as="section" class="proposal-metadata-extras">
    <header class="proposal-metadata-heading-row proposal-metadata-extras-heading">
      <component :is="titleLevel || 'h3'" class="proposal-metadata-heading">{{ titleText }}</component>
      <DisclosureButton
        :as="BrandedButton"
        class="proposal-metadata-extras-trigger"
        color="tertiary"
        size="xs"
        :icon="open ? RiArrowUpSLine : RiArrowDownSLine"
      >{{ buttonText }}</DisclosureButton>
    </header>
    <DisclosurePanel>
      <dl class="proposal-metadata-extras-list">
        <div v-for="(value, key) in extra" :key="key">
          <dt class="proposal-metadata-term">{{ key }}</dt>
          <dd class="proposal-metadata-details proposal-metadata-technical proposal-technical-copy">
            <span class="proposal-technical-line"><MiddleTruncate :text="display(value)" /><CopyButton icon-only compact :text="display(value)" :label="`Copier ${key}`" copied-label="Copié" /></span>
          </dd>
        </div>
      </dl>
    </DisclosurePanel>
  </Disclosure>
</template>

<style scoped>
.proposal-metadata-extras{min-width:0}
.proposal-metadata-extras-heading{justify-content:space-between;margin:0}
.proposal-metadata-extras-trigger.lab-button[data-tone="tertiary"]{color:var(--lab-ds-text)!important}
.proposal-metadata-extras-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,max(var(--lab-metadata-column-min),calc((100% - var(--lab-metadata-column-gap))/2))),1fr));gap:var(--lab-metadata-row-gap) var(--lab-metadata-column-gap);margin:var(--lab-metadata-heading-gap) 0 0;padding:var(--lab-metadata-heading-gap) 0 0}
.proposal-metadata-extras-list>div{min-width:0}
</style>
