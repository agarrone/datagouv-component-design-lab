<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/buttons.css'
import CopyButton from './CopyButton.vue'
import {computed,inject} from 'vue'
import type {Component} from 'vue'
import type {RouteLocationRaw} from 'vue-router'
import {RiExternalLinkLine,RiLoader4Line} from '@remixicon/vue'
import AppLink from '/proposals/components/AppLink.vue'
import {bannerActionTypeKey} from '../../vendor/datagouv-components/src/components/BannerAction.vue'
export type ColorType='primary'|'secondary'|'tertiary'|'warning'|'danger'|'brown-illustration'|'green-illustration'|'white-flat'
defineOptions({inheritAttrs:false})
const props=withDefaults(defineProps<{size?:'2xs'|'xs'|'sm'|'lg'|'xl';color?:ColorType;disabled?:boolean;loading?:boolean;icon?:Component;iconAttrs?:Record<string,string>;href?:string|RouteLocationRaw;newTab?:boolean;iconOnly?:boolean;iconOnlyOnMobile?:boolean;iconRight?:boolean;keepMarginsEvenWithoutBorders?:boolean;type?:'submit'|'button'}>(),{newTab:false,iconOnly:false,iconRight:false,keepMarginsEvenWithoutBorders:false})
const banner=inject(bannerActionTypeKey,null)
const size=computed(()=>props.size||(banner?'xs':'sm'))
const tone=computed(()=>props.color||(banner?({primary:'secondary',warning:'warning',danger:'danger'}[banner]):'primary'))
const inactive=computed(()=>props.disabled||props.loading)
function guard(event:Event){if(inactive.value){event.preventDefault();event.stopImmediatePropagation()}}
</script>
<template>
 <CopyButton v-if="$attrs['data-clipboard-text'] !== undefined" v-bind="$attrs" :text="String($attrs['data-clipboard-text'])" label="Copier le lien" copied-label="Lien copié" :disabled="inactive" />
 <component v-else :is="href?(inactive?'span':AppLink):'button'" v-bind="$attrs" class="lab-button" :data-size="size" :data-tone="tone" :data-loading="!!loading" :data-icon-action="iconOnly" :data-icon-right="iconRight" :to="inactive?undefined:href" :external-icon="false" appearance="control" :type="href?undefined:(type||'button')" :disabled="href?undefined:inactive" :role="href?'link':undefined" :tabindex="href&&inactive?-1:undefined" :aria-disabled="inactive?'true':undefined" :aria-busy="loading?'true':undefined" :aria-label="$attrs['aria-label'] || (iconOnly?$attrs.title:undefined)" :target="href&&newTab?'_blank':undefined" :rel="href&&newTab?'noopener noreferrer':undefined" @click.capture="guard">
  <span v-if="icon||loading" class="lab-button-symbol">
   <RiLoader4Line v-if="loading" class="lab-ds-icon lab-button-spinner" :data-icon-size="size==='lg'||size==='xl'?'major':'base'" aria-hidden="true" focusable="false" />
   <component v-else :is="icon" v-bind="iconAttrs" class="lab-ds-icon" :data-icon-size="size==='lg'||size==='xl'?'major':'base'" aria-hidden="true" focusable="false" />
  </span>
  <span v-if="$slots.default" class="lab-button-label" :class="{'sr-only':iconOnly,'lab-button-label-mobile-hidden':iconOnlyOnMobile&&!!icon}"><slot /></span>
  <RiExternalLinkLine v-if="newTab&&!iconOnly" class="lab-ds-icon" data-icon-size="base" aria-hidden="true" focusable="false" />
  <span v-if="newTab" class="sr-only"> (nouvel onglet)</span>
 </component>
</template>
