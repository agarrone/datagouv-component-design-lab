<script setup lang="ts">
import '../../../shared/foundations.css'
import '../../../shared/application-cards.css'
import type {Component} from 'vue'
defineProps<{title:string;description:string;icon?:Component}>()
</script>
<template><div class="lab-aux-card lab-audience-card"><component v-if="icon" :is="icon" class="lab-ds-icon" data-icon-size="major" aria-hidden="true" focusable="false" /><h3 class="lab-aux-heading">{{title}}</h3><p class="lab-aux-description">{{description}}</p></div></template>
