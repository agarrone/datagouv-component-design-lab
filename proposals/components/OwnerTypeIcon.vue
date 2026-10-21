<script setup lang="ts">
import {computed} from 'vue'
import {getOrganizationTypes,type OrganizationTypes,type UserType} from '/vendor/datagouv-components/src/functions/organizations'
const props=defineProps<{type:OrganizationTypes|UserType}>()
const types=getOrganizationTypes()
const icon=computed(()=>types.find(item=>item.type===props.type)?.icon)
</script>
<template><component v-if="icon" :is="icon" class="proposed-owner-type-icon" aria-hidden="true" focusable="false" /></template>
<style scoped>.proposed-owner-type-icon{width:16px;height:16px;flex:none;vertical-align:middle;color:inherit}</style>
