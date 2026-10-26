<script setup lang="ts">
import '../../shared/foundations.css'
import '../../shared/remaining-navigation.css'
import { Tab } from '@headlessui/vue'
</script>
<template>
  <Tab v-slot="{ selected }" as="template">
    <button type="button" class="lab-tab" :data-selected="selected"><slot /></button>
  </Tab>
</template>
<style scoped>
.lab-tab { display:inline-flex; align-items:center; justify-content:center; gap:var(--lab-ds-space-8); min-height:var(--lab-ds-control); padding:var(--lab-ds-space-8) var(--lab-ds-space-12); border:var(--lab-ds-stroke) solid transparent; border-radius:var(--lab-ds-radius); color:var(--lab-ds-text-secondary); background:transparent; font:var(--lab-ds-weight-medium) var(--lab-ds-text-body)/var(--lab-ds-leading-control) var(--lab-ds-font-sans); white-space:nowrap; }
.lab-tab[data-selected=true] { color:var(--lab-ds-brand); border-color:var(--lab-ds-brand); background:var(--lab-ds-surface); }
.lab-tab:focus-visible { outline:var(--lab-ds-focus-width) solid var(--lab-ds-focus); outline-offset:calc(-1 * var(--lab-ds-focus-width)); }
.lab-tab:disabled { color:var(--lab-ds-text-muted); cursor:default; --hover-tint:transparent; }
@media(hover:hover) { .lab-tab:not(:disabled):not([data-selected=true]):hover { background:var(--lab-ds-surface-subtle); color:var(--lab-ds-brand); } }
:deep(.lab-ds-icon) { flex-shrink:0; }
</style>
