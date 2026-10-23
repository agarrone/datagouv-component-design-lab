<script setup lang="ts">
import '../shared/foundations.css'
import {computed,ref,watch} from 'vue'
import type {OrganizationOrSuggest} from '../../vendor/datagouv-components/src/types/organizations'
import Placeholder from './Placeholder.vue'
const props=defineProps<{organization:OrganizationOrSuggest;sizeClass:string}>()
const thumbnail=computed(()=>('logo_thumbnail' in props.organization?props.organization.logo_thumbnail:'image_url' in props.organization?props.organization.image_url:null))
const failed=ref(false)
watch(thumbnail,()=>failed.value=false)
</script>
<template><div :class="[sizeClass,'lab-identity-logo']"><img v-if="thumbnail && !failed" :src="thumbnail" alt="" @error="failed=true"/><Placeholder v-else type="Organization" class="lab-organization-fallback"/></div></template>
<style scoped>.lab-identity-logo{flex-shrink:0;overflow:hidden}.lab-identity-logo img,.lab-organization-fallback{width:100%;height:100%;object-fit:contain}</style>
