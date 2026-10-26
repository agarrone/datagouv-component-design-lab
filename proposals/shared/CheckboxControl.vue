<script setup lang="ts">
import './foundations.css'
import {RiCheckLine} from '@remixicon/vue'
defineProps<{checked:boolean;label:string;disabled?:boolean}>()
const emit=defineEmits<{'update:checked':[boolean]}>()
</script>
<template>
 <label class="lab-checkbox" @click.stop>
  <input type="checkbox" :checked :disabled :aria-label="label" @change="emit('update:checked',($event.target as HTMLInputElement).checked)">
  <span class="lab-checkbox-box" aria-hidden="true"><RiCheckLine v-if="checked" class="lab-ds-icon" data-icon-size="compact" aria-hidden="true" focusable="false" /></span><slot />
 </label>
</template>
<style scoped>
.lab-checkbox { display:inline-flex; position:relative; vertical-align:middle; align-items:center; gap:var(--lab-ds-space-8); cursor:pointer; padding:var(--lab-ds-space-4); }
input { position:absolute; opacity:0; inset:0; width:100%; height:100%; margin:0; cursor:inherit; }
.lab-checkbox-box { display:flex; align-items:center; justify-content:center; width:var(--lab-ds-icon); height:var(--lab-ds-icon); border:var(--lab-ds-stroke) solid var(--lab-ds-brand); border-radius:var(--lab-ds-radius-technical); background:var(--lab-ds-surface); color:var(--lab-ds-on-accent); pointer-events:none; }
input:checked + .lab-checkbox-box { background:var(--lab-ds-brand); }
input:focus-visible + .lab-checkbox-box { outline:var(--lab-ds-focus-width) solid var(--lab-ds-focus); outline-offset:var(--lab-ds-focus-offset); }
input:disabled + .lab-checkbox-box { opacity:var(--lab-ds-opacity-disabled); }
</style>
