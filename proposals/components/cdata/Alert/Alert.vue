<script setup lang="ts">
import '../../../shared/foundations.css'
import {computed} from 'vue'
import {RiInformationLine,RiCheckLine,RiAlertLine,RiErrorWarningLine} from '@remixicon/vue'
import type {AlertSize,AlertType} from '/vendor/cdata-runtime/types/alert'
import type {TitleLevel} from '/vendor/cdata-runtime/types/html'
const props=withDefaults(defineProps<{size?:AlertSize;titleLevel?:TitleLevel;type:AlertType}>(),{size:'md',titleLevel:'h3'})
const icon=computed(()=>({info:RiInformationLine,success:RiCheckLine,warning:RiAlertLine,error:RiErrorWarningLine}[props.type]))
</script>
<template>
 <div class="lab-alert" :data-tone="type" :data-size="size">
  <component :is="icon" class="lab-ds-icon" data-icon-size="base" data-icon-align="start" aria-hidden="true" focusable="false" />
  <div class="lab-alert-content"><component :is="titleLevel" v-if="$slots.title && size!=='sm'" class="lab-alert-title"><slot name="title" /></component><slot /></div>
 </div>
</template>
<style scoped>
.lab-alert { --alert-text:var(--lab-ds-info-text); --alert-bg:var(--lab-ds-info-bg); --alert-border:var(--lab-ds-info-border); display:flex; align-items:flex-start; gap:var(--lab-ds-space-12); padding:var(--lab-ds-space-16); border:var(--lab-ds-stroke) solid var(--alert-border); border-radius:var(--lab-ds-radius); background:var(--alert-bg); color:var(--alert-text); font:var(--lab-ds-weight-regular) var(--lab-ds-text-body)/var(--lab-ds-leading-body) var(--lab-ds-font-sans); }
.lab-alert[data-tone=success] { --alert-text:var(--lab-ds-success-text); --alert-bg:var(--lab-ds-success-bg); --alert-border:var(--lab-ds-success-border); }
.lab-alert[data-tone=warning] { --alert-text:var(--lab-ds-warning-text); --alert-bg:var(--lab-ds-warning-bg); --alert-border:var(--lab-ds-warning-border); }
.lab-alert[data-tone=error] { --alert-text:var(--lab-ds-danger-text); --alert-bg:var(--lab-ds-danger-bg); --alert-border:var(--lab-ds-danger-border); }
.lab-alert[data-size=sm] { padding:var(--lab-ds-space-8) var(--lab-ds-space-12); }
.lab-alert-content { min-width:0; overflow-wrap:anywhere; }
.lab-alert-title { margin:0 0 var(--lab-ds-space-4); font:var(--lab-ds-weight-semibold) var(--lab-ds-text-title)/var(--lab-ds-leading-title) var(--lab-ds-font-sans); color:inherit; }
.lab-alert-content :deep(p:last-child) { margin-bottom:0; }
</style>
