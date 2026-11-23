<script setup lang="ts">
import {computed} from 'vue'
import {RiCheckboxCircleLine} from '@remixicon/vue'
import '../../shared/foundations.css'
import OrganizationLogo from '../OrganizationLogo.vue'
import Badge from '../../../vendor/datagouv-components/src/components/Badge.vue'
import OrganizationTypeBadge from '../../../vendor/datagouv-components/src/components/OrganizationTypeBadge.vue'
import {getOrganizationType,isOrganizationCertified} from '../../../vendor/datagouv-components/src/functions/organizations'
import type {Organization,OrganizationReference} from '../../../vendor/datagouv-components/src/types/organizations'

const props=withDefaults(defineProps<{
 organization:Organization|OrganizationReference
 logoSizeClass?:string
 nameSize?:'base'|'sm'|'xs'
 nameColor?:string
 logoNoBorder?:boolean
 as?:string
 withLink?:boolean
}>(),{
 logoSizeClass:'',
 logoNoBorder:false,
 withLink:true,
 nameColor:'text-new-primary',
 nameSize:'base',
 as:'div',
})

const organizationType=computed(()=>getOrganizationType(props.organization))
const certified=computed(()=>isOrganizationCertified(props.organization))
const resolvedLogoSizeClass=computed(()=>props.logoSizeClass || ({base:'size-14',sm:'size-12',xs:'size-10'}[props.nameSize]))
</script>

<template>
 <component :is="as" class="proposed-organization-owner" :data-size="nameSize" :data-long-name="organization.name.length > 64">
  <component :is="withLink?'a':'span'" :href="withLink?organization.page:undefined" class="proposed-organization-owner-target" :class="{'is-linked':withLink}">
   <span class="proposed-organization-owner-logo" :class="{'is-framed':!logoNoBorder}" aria-hidden="true">
    <OrganizationLogo :organization="organization" :size-class="resolvedLogoSizeClass" />
   </span>
   <span class="proposed-organization-owner-identity" :class="nameColor">
    <span class="proposed-organization-owner-name">{{ organization.name }}</span>
    <span v-if="organizationType !== 'other' || certified" class="proposed-organization-owner-badges">
     <OrganizationTypeBadge :type="organizationType" />
     <Badge v-if="certified" tone="primary" size="sm" :icon="RiCheckboxCircleLine" medium>Certifié</Badge>
    </span>
   </span>
  </component>
 </component>
</template>

<style scoped>
.proposed-organization-owner{display:block;min-width:0;margin:0;font-family:var(--lab-ds-font-sans);color:var(--lab-ds-text)}
.proposed-organization-owner-target{display:flex;align-items:center;gap:var(--lab-ds-space-12);min-width:0;max-width:100%;color:inherit;text-decoration:none!important;background-image:none!important;--underline-img:none!important}
.proposed-organization-owner[data-long-name=true] .proposed-organization-owner-target{align-items:flex-start}
.proposed-organization-owner-target.is-linked:focus-visible{outline:var(--lab-ds-focus-width) solid var(--lab-ds-focus);outline-offset:var(--lab-ds-focus-offset);border-radius:var(--lab-ds-radius-technical)}
.proposed-organization-owner-logo{display:block;flex:none;line-height:0;background:var(--lab-ds-surface)}
.proposed-organization-owner-logo.is-framed{padding:var(--lab-ds-space-optical);border:var(--lab-ds-stroke) solid var(--lab-ds-border);border-radius:var(--lab-ds-radius)}
.proposed-organization-owner-identity{display:grid;gap:var(--lab-ds-space-6);min-width:0;color:inherit}
.proposed-organization-owner-name{min-width:0;color:inherit;font:var(--lab-ds-weight-regular) var(--lab-ds-text-title)/var(--lab-ds-leading-title) var(--lab-ds-font-sans);white-space:normal;overflow-wrap:anywhere;word-break:normal}
.proposed-organization-owner[data-size=sm] .proposed-organization-owner-name{font-size:var(--lab-ds-text-body);line-height:var(--lab-ds-leading-body)}
.proposed-organization-owner[data-size=xs] .proposed-organization-owner-name{font-size:var(--lab-ds-text-caption);line-height:var(--lab-ds-leading-caption)}
.proposed-organization-owner-target.is-linked .proposed-organization-owner-name{text-decoration:underline;text-decoration-thickness:var(--lab-ds-stroke);text-underline-offset:var(--lab-ds-space-optical)}
.proposed-organization-owner-target.is-linked:hover .proposed-organization-owner-name{color:var(--lab-ds-brand);text-decoration:underline;text-decoration-thickness:var(--lab-ds-stroke);text-underline-offset:var(--lab-ds-space-optical)}
.proposed-organization-owner-badges{display:flex;align-items:center;flex-wrap:wrap;gap:var(--lab-ds-space-4);min-width:0}
@media(max-width:480px){.proposed-organization-owner{gap:var(--lab-ds-space-6)}}
</style>
