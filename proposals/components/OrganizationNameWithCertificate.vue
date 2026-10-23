<script setup lang="ts">
import '../shared/foundations.css'
import {RiCheckboxCircleLine} from '@remixicon/vue'
import {getOrganizationType,isOrganizationCertified} from '../../vendor/datagouv-components/src/functions/organizations'
import type {Organization,OrganizationReference} from '../../vendor/datagouv-components/src/types/organizations'
import {useComponentsConfig} from '../../vendor/datagouv-components/src/config'
import {useTranslation} from '../../vendor/datagouv-components/src/composables/useTranslation'
import OwnerTypeIcon from './OwnerTypeIcon.vue'
import Tooltip from './Tooltip.vue'
const config=useComponentsConfig(),{t}=useTranslation()
withDefaults(defineProps<{organization:Organization|OrganizationReference;showAcronym?:boolean;showType?:boolean;size?:'xl'|'base'|'sm'|'xs';colorClass?:string;as?:string}>(),{showAcronym:false,showType:true,size:'base',colorClass:'',as:'div'})
</script>
<template><div class="lab-organization-name" :data-size="size"><OwnerTypeIcon v-if="showType" :type="getOrganizationType(organization)"/><component :is="as" class="truncate lab-organization-name-label" :class="colorClass">{{organization.name}}<small v-if="organization.acronym && showAcronym"> {{organization.acronym}}</small></component><Tooltip v-if="isOrganizationCertified(organization)" :aria-label="t(`L'identité de ce service public est certifiée par {certifier}`,{certifier:config.name})"><RiCheckboxCircleLine class="lab-ds-icon" data-icon-size="base" aria-hidden="true" focusable="false"/><template #tooltip>{{t(`L'identité de ce service public est certifiée par {certifier}`,{certifier:config.name})}}</template></Tooltip></div></template>
<style scoped>.lab-organization-name{display:flex;align-items:center;gap:var(--lab-ds-space-4);min-width:0;color:inherit;font:var(--lab-ds-weight-regular) var(--lab-ds-text-title)/var(--lab-ds-leading-title) var(--lab-ds-font-sans)}.lab-organization-name-label{margin:0;min-width:0;line-height:inherit;font-size:inherit;font-weight:inherit}.lab-organization-name[data-size=sm]{font-size:var(--lab-ds-text-body);line-height:var(--lab-ds-leading-body)}.lab-organization-name[data-size=xs],small{font-size:var(--lab-ds-text-caption);line-height:var(--lab-ds-leading-caption)}.lab-organization-name[data-size=xl]{font-size:var(--lab-ds-text-heading);line-height:var(--lab-ds-leading-heading)}svg{width:var(--lab-ds-icon);height:var(--lab-ds-icon);flex-shrink:0}</style>
