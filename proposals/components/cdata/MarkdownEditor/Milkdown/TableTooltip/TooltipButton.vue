<script setup lang="ts">
import '../../../../../shared/foundations.css'
import '../../../../../shared/small-components.css'
import type {Component} from 'vue'
defineProps<{icon:Component;label?:string}>()
</script>
<template><button type="button" class="lab-small-editor-button" :aria-label="label || $attrs['aria-label'] || $attrs.title || 'Mettre en forme'"><component :is="icon" class="lab-ds-icon" data-icon-size="base" aria-hidden="true" focusable="false"/><slot/></button></template>
