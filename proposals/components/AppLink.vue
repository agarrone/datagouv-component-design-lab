<script setup lang="ts">
import '../shared/foundations.css'
import {computed,useAttrs,normalizeClass} from 'vue'
import type {RouteLocationRaw} from 'vue-router'
import {RiExternalLinkLine} from '@remixicon/vue'
import NativeLink from '../../vendor/datagouv-components/src/components/AppLink.vue'
defineOptions({inheritAttrs:false})
const props=withDefaults(defineProps<{to?:string|RouteLocationRaw|null;href?:string;replace?:boolean;externalIcon?:boolean;external?:boolean;appearance?:'text'|'control'}>(),{externalIcon:true})
const attrs=useAttrs()
const destination=computed(()=>props.to ?? props.href)
const external=computed(()=>{
 if(props.external)return true
 if(typeof destination.value!=='string' || !/^https?:\/\//i.test(destination.value))return false
 try {const host=new URL(destination.value).hostname;return !['www.data.gouv.fr','data.gouv.fr','localhost','127.0.0.1'].includes(host)}catch{return false}
})
const appearance=computed(()=>props.appearance || (/lab-button|design-lab-tag|lab-card-title|lab-reuse-title|lab-organization-title|lab-aux-title|lab-admin-link|lab-link-card|sidebar|pagination|nav-link/.test(normalizeClass(attrs.class))?'control':'text'))
</script>
<template>
 <component :is="href && to==null ? 'a' : NativeLink" v-bind="{...$attrs,...(href && to==null ? {href} : {to:destination,replace})}" :data-link-kind="destination ? external?'external':'navigation':undefined" :data-link-appearance="destination?appearance:undefined" :class="{'lab-text-link':destination && appearance==='text'}">
  <slot />
  <RiExternalLinkLine v-if="external && externalIcon && appearance==='text'" class="lab-ds-icon lab-link-external-icon" data-icon-size="compact" aria-hidden="true" focusable="false" />
  <span v-if="externalIcon && $attrs.target==='_blank'" class="sr-only"> (nouvel onglet)</span>
 </component>
</template>
